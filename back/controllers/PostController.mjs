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
                return res.status(201).json({success: "Conta criada com sucesso!"});     
            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                  return res.status(400).json({error: "Email ou telefone já cadastrado."});     
                } else {                 
                  console.error('Ocorreu um erro ao inserir os dados:', error);
                };
            };                
        };     
        return res.status(400).json({error: "Dados inválidos ou faltando."});     
    };

    static async login (req, res) {
        const { emailCel, senha } = req.body;

        if (!emailCel || !senha) {
          return res.status(400).json({error: "Login ou senha inválidos."});
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
              return res.status(200).json({success: "Login efetuado com sucesso!"});
            } else {
              return res.status(400).json({error: "Login ou senha inválidos."});
            }
          } else {
            return res.status(400).json({error: "Login ou senha inválidos."});
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
          return res.status(200).json({success: "Link para recuperação enviado, caso não encontre, verifique a caixa de spam."});
        }
      }
      return res.status(400).json({error: "Falha ao enviar link."});  
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
              return res.status(200).json({success: "Alteração feita com sucesso!"});
          };
          return res.status(400).json({error: "Código expirado ou inexistente."});
      };
      return res.status(400).json({error: "Insira uma senha valida."});
  };

  static async alterarUser (req, res) {
    const validado = validarUserAlteracao(req.body);
    const id = req.params.id;
    const tipo = req.body.tipo;  
    const formId = req.body.id;

    if (id === undefined || id === null || id !== formId) {
      return res.status(400).json({error: "Erro ao alterar conta."});
    }

    if(validado?.[0]?.error){
      return res.status(400).json({error: "Erro ao alterar conta."});
    }
    const user = await Users.findByPk(id);
    if(!user){
      return res.status(400).json({error: "Erro ao alterar conta."});
    }

    const countAdmin = await Users.count({where: {tipo: "admin"}});
    if(countAdmin === 1 && tipo === "comum" && user.tipo === "admin") {
      return res.status(400).json({error: "Erro ao alterar conta. Não é possível alterar o tipo de conta quando só há um administrador."});
    }

    validado.tipo = tipo;
    
    await Users.update(validado, {where: {id: id}});
    return res.status(200).json({success: "Conta alterada com sucesso."});
  
  };

  static async deleteUser (req, res) {
    const id = req.params.id;
    if (id === undefined || id === null) return res.status(400).json("/admin");
    const user = await Users.findByPk(id);
    if(!user){
      return res.status(400).json({error: "Erro ao deletar conta."});
    }

    const countAdmin = await Users.count({where: {tipo: "admin"}});
    
    if(countAdmin === 1 && user.tipo === "admin") {
      return res.status(400).json({error: "Erro ao deletar conta. Não é possível deletar quando há apenas um administrador."});
    }
    await Users.destroy({where: {id: id}});
    return res.status(200).json({success: "Conta deletada com sucesso."});
  
  };

}
