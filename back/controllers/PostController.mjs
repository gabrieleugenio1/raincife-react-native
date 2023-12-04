'use strict';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import validarUser from '../functions/validarUser.mjs';
import Users from '../models/User.mjs';
import { Op, fn } from 'sequelize';
import enviarEmail from '../functions/enviarEmail.mjs';
import gerarCodigo from '../functions/gerarCodigo.mjs';
import Codigo from '../models/Codigo.mjs';
import moment from 'moment';
import validarUserAlteracao from '../functions/validarUserAlteracao.mjs';
export default class PostController {

    static async cadastro (req, res) {
        const user = req.body;
        const validacao = validarUser(user); 
         if(validacao?.emailCel) {
            const salt = genSaltSync(10);
            const senhaCriptografada = hashSync(validacao.senha, salt); 
            const totalUsers = await Users.count();
            try {
                if(validacao?.tipoConta === "email") {        
                    await Users.create({nome: validacao.nome, email: validacao.emailCel, senha: senhaCriptografada, 
                        dataNascimento: validacao.dataNascimento, morro: validacao.localizacao, tipo: totalUsers === 0 ? "admin" : "comum"});    
                } else {             
                    await Users.create({nome: validacao.nome, telefone: validacao.emailCel, senha: senhaCriptografada, 
                        dataNascimento: validacao.dataNascimento,morro: validacao.localizacao, tipo: totalUsers === 0 ? "admin" : "comum"});    
                };
                req.flash("success", ["Conta criada com sucesso!"]);
                return res.status(201).redirect("/login");     
            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                  req.flash("erros", ["Email ou telefone já está cadastrado."]);
                  return res.status(400).redirect("/cadastro");     
                } else {                 
                  console.error('Ocorreu um erro ao inserir os dados:', error);
                };
            };                
        };  
        req.flash("erros", validacao ?? ["Dados inválidos ou faltando."]);      
        return res.status(400).redirect("/cadastro");     
    };

    static async login (req, res) {
        const { emailCel, senha } = req.body;

        if (!emailCel || !senha) {
          req.flash("erros", ["Login ou senha inválidos."]);
          return res.status(400).redirect("/login");
        }
        
        await Users.findOne({
          where: {
            [Op.or]: [
              { email: emailCel },
              { telefone: emailCel }
            ]
          }
        }).then(user => {
          if (user) {
            if (compareSync(senha, user.senha)) {
              req.session.user = {
                id: user.id,
                nome: user.nome,
                email: user.email,
                telefone: user.telefone,
                morro: user.morro,
                tipo: user.tipo,
                dataNascimento: user.dataNascimento
              };
              return res.status(200).redirect("/home");
            } else {
              req.flash("erros", ["Login ou senha inválidos."]);
              return res.status(400).redirect("/login");
            }
          } else {
            req.flash("erros", ["Login ou senha inválidos."]);
            return res.status(400).redirect("/login");
          }
        });
    };

    static async envioLink (req, res) {
      const email = req.body.email;
        if(email) {
        const codigo = gerarCodigo();
        const usuarioEmail = await Users.findOne({where:{email: email}})      
        if(usuarioEmail) {
          const codigoEmail = await Codigo.create({codigo:codigo, dataGerada: fn('NOW'), UserId:usuarioEmail.id}); 
          const link = req.headers.host + '/esqueci-senha?codigo=' + codigoEmail.codigo + '&' + `email=${usuarioEmail.email}`;
          await enviarEmail(link, usuarioEmail.email, req.protocol);            
          req.flash('success',['Link para recuperação enviado, caso não encontre, verifique a caixa de spam.']);
          return res.status(200).redirect("/esqueci-senha");
        }
      }
      req.flash('erros',['Falha ao enviar link.']);
      return res.status(400).redirect("/esqueci-senha");  
    }

    static async criarNovaSenha (req, res) {
      const { senhaUm, senhaDois, CodigoHidden, emailQuery} = req.body;

      if(senhaUm === senhaDois && senhaUm?.length >= 6 && CodigoHidden){
          const dataAtual = moment(Date.now());
          let horarioToken;
          let diferenca;
          const salt = genSaltSync(10);
          const senhaCriptografada = hashSync(senhaUm, salt);
          const emailUser = await Codigo.findOne({
            raw: true,
            include: { model: Users },
            where: { codigo: CodigoHidden },
            order: [['dataGerada', 'DESC']]
          });
          if(emailUser) horarioToken = moment(emailUser.dataGerada), diferenca = dataAtual.diff(horarioToken, 'minutes');
          console.log("diferença: " + diferenca);
          if(diferenca <= 5 && (emailUser.ativo === true || emailUser.ativo === 1) && emailQuery === emailUser['User.email']) {
              await Users.update({senha:senhaCriptografada}, {where: {email: emailUser['User.email']}})
              await Codigo.update({ativo:false}, {where: {UserId: emailUser['User.id'], codigo: CodigoHidden}})
              req.flash('success',['Alteração feita com sucesso!']);
              return res.status(200).redirect("/");
          };
          req.flash('erros',['Código expirado ou inexistente.']);
          return res.status(400).redirect("/esqueci-senha");
      };
      req.flash('erros',['Insira uma senha valida.']);
      return res.status(400).redirect(`/esqueci-senha?codigo=${CodigoHidden}`);
  };

  static async alterarUser (req, res) {
    const validado = validarUserAlteracao(req.body);
    const id = req.params.id;
    const tipo = req.body.tipo;  
    const formId = req.body.id;

    if (id === undefined || id === null || id !== formId) {
        req.flash('erros',['Erro ao alterar conta.'])
      return res.status(400).redirect("/admin");}

    if(validado?.[0]?.error){
      req.flash('erros',validado[0].error);
      return res.status(400).redirect(`/admin`);
    }
    const user = await Users.findByPk(id);
    if(!user){
      req.flash('erros',['Erro ao alterar conta.'])
      return res.status(400).redirect("/admin");
    }

    const countAdmin = await Users.count({where: {tipo: "admin"}});
    if(countAdmin === 1 && tipo === "comum" && user.tipo === "admin") {
      req.flash('erros',['Erro ao alterar conta. Não é possível alterar o tipo de conta quando só há um administrador.'])
      return res.status(400).redirect("/admin");
    }

    validado.tipo = tipo;
    
    await Users.update(validado, {where: {id: id}});
    req.flash('success',['Conta alterada com sucesso.']);
    return res.status(200).redirect(`/admin`);
  
  };

  static async deleteUser (req, res) {
    const id = req.params.id;
    if (id === undefined || id === null) return res.status(400).redirect("/admin");
    const user = await Users.findByPk(id);
    if(!user){
      req.flash('erros',['Erro ao deletar conta.'])
      return res.status(400).redirect("/admin");
    }

    const countAdmin = await Users.count({where: {tipo: "admin"}});
    
    if(countAdmin === 1 && user.tipo === "admin") {
      req.flash('erros',['Erro ao deletar conta. Não é possível deletar quando há apenas um administrador.'])
      return res.status(400).redirect("/admin");
    }

    await Users.destroy({where: {id: id}});
    req.flash('success',['Conta deletada com sucesso.']);
    return res.status(200).redirect(`/admin`);
  
  };

}
