const senhaUm = document.querySelector("#senhaUm");
const senhaDois = document.querySelector("#senhaDois");
const submitButton = document.querySelector("#submitEsqueci");
const validacaoSenha = document.querySelector("#validacaoSenha");

senhaDois.addEventListener("keyup", () => {
    const regexSenha = /^.{6,}$/;  
    if (regexSenha.test(senhaUm.value.trim()) && senhaUm.value === senhaDois.value) {
      submitButton.disabled = false;
      validacaoSenha.textContent = ""; // Limpa a mensagem
    } else {
      submitButton.disabled = true;
      validacaoSenha.textContent = "Senhas não coincidentes"; // Mostra a mensagem quando as senhas não estão iguais
    }
  });
