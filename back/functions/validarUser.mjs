'use strict';
import moment from "moment";

const validarUser = (user) => {

  const validado = {
    nome: user.nome,
    emailCel: user.emailCel,
    senha: user.senha,
    confirmarSenha: user.confirmarSenha,
    localizacao: user.localizacao,
    dataNascimento: user.dataNascimento,
    tipoConta: null
  };

  /** INICIO DAS VALIDAÇÕES **/      
  const erros = [];

  const regex = {   
    nome: /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+(\s[A-Za-zÀ-ÖØ-öø-ÿ\s']+)+$/u,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    senha: /^.{6,}$/,
    celular: /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/
  };

  if(validado.emailCel) {
    validado.emailCel = validado.emailCel.trim(); // Limpa espaços em branco no inicio e final do e-mail.
    validado.emailCel = validado.emailCel.toLowerCase(); // Padroniza o e-mail em minúsculo.
    if(validado.emailCel >= 11 && validado.emailCel <= 16) validado.emailCel = validado.emailCel.replace(/[^\w\s]/gi, '');
  };

  
  if(!validado.nome || validado.nome === undefined || validado.nome === null || !regex.nome.test(validado.nome)) {
    erros.push({error: "Nome inválido!"});
  };

  if((validado.emailCel || validado.emailCel !== undefined || validado.emailCel !== null) &&  validado.emailCel?.length === 11 && regex.celular.test(validado.emailCel) ){
    validado.tipoConta = "telefone";
  } else if((validado.emailCel || validado.emailCel !== undefined || validado.emailCel !== null) && regex.email.test(validado.emailCel)){
    validado.tipoConta = "email";
  }else {
    erros.push({ error: "E-mail ou Celular inválido!" });
  };

  if(!validado.localizacao || validado.localizacao === undefined || validado.localizacao === null) {
    erros.push({error: "Localização inválida! A localização é predefinida."});
  };

  if (!validado.dataNascimento || validado.dataNascimento === undefined || validado.dataNascimento === null) {
    erros.push({ error: "Data de nascimento inválida!" });
  } else {
    const dataNascimento = moment(validado.dataNascimento, 'YYYY-MM-DD');
    if (!dataNascimento.isValid() || dataNascimento.isAfter(moment()) || !dataNascimento.isBefore(moment().subtract(5, 'years'))) {
      erros.push({ error: "Data de nascimento inválida! No mínimo 5 anos de idade." });
    }
  };

  if(!validado.senha || validado.senha === undefined || validado.senha === null || validado.senha !== validado.confirmarSenha || validado.senha <= 6 ||  !regex.senha.test(validado.senha) ) {
    erros.push({error: "Senha inválida! A senha deve ter no minimo 6 caracteres."});
  };

  if(!validado.tipoConta || validado.tipoConta === undefined || validado.tipoConta === null) {
    erros.push({error: "Email ou Celular não inserido."});
  };
  
  /* FINAL DAS VALIDAÇÕES */ 
  return erros?.length > 0 ? erros : validado;   
};

export default validarUser;