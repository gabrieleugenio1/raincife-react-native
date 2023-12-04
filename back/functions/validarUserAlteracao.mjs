'use strict';
import moment from "moment";

export default function validarUserAlteracao (user) {

  const validado = {
    nome: user.nome,
    dataNascimento: user.dataNascimento,
  };

  const regex = {   
    nome: /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+(\s[A-Za-zÀ-ÖØ-öø-ÿ\s']+)+$/u
  };

  /** INICIO DAS VALIDAÇÕES **/      
  const erros = [];


  if(validado.emailCel) {
    validado.emailCel = validado.emailCel.trim(); // Limpa espaços em branco no inicio e final do e-mail.
    validado.emailCel = validado.emailCel.toLowerCase(); // Padroniza o e-mail em minúsculo.
    if(validado.emailCel >= 11 && validado.emailCel <= 16) validado.emailCel = validado.emailCel.replace(/[^\w\s]/gi, '');
  };

  
  if(!validado.nome || validado.nome === undefined || validado.nome === null || !regex.nome.test(validado.nome)) {
    erros.push({error: "Nome inválido!"});
  };


  if (!validado.dataNascimento || validado.dataNascimento === undefined || validado.dataNascimento === null) {
    erros.push({ error: "Data de nascimento inválida!" });
  } else {
    const dataNascimento = moment(validado.dataNascimento, 'YYYY-MM-DD');
    if (!dataNascimento.isValid() || dataNascimento.isAfter(moment()) || !dataNascimento.isBefore(moment().subtract(5, 'years'))) {
      erros.push({ error: "Data de nascimento inválida! No mínimo 5 anos de idade." });
    }
  };

  
  /* FINAL DAS VALIDAÇÕES */ 
  return erros?.length > 0 ? erros : validado;   
};

