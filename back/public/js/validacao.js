const nomeInput = document.querySelector("#nome");
const submitButton = document.querySelector("#submitCadastro");
const validacaoNome = document.querySelector("#validacaoNome");

nomeInput.addEventListener("keyup", () => {
  const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+(\s[A-Za-zÀ-ÖØ-öø-ÿ\s']+)+$/u;

  if (regexNome.test(nomeInput.value.trim())) {
    submitButton.disabled = false;
    validacaoNome.textContent = ""; // Limpa a mensagem
  } else {
    submitButton.disabled = true;
    validacaoNome.textContent = "Insira pelo menos seu sobrenome"; // Mostra a mensagem quando não insere o nome com sobrenome
  }
});

const senhaUm = document.querySelector("#senha");
const senhaDois = document.querySelector("#confirmarSenha");
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
