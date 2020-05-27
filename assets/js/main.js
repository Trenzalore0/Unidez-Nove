let id = localStorage.getItem('id');
let nome = localStorage.getItem('nome');
let email = localStorage.getItem('email');
let log = document.querySelector('.log a');
let panel = document.querySelector('.painel');
let main = document.querySelector('.sempainel');

function logado() {
  log.href = "";
  log.addEventListener('click', function(event) {
    event.preventDefault();
    if(panel.style.display == "block") {
      panel.style.display = "none";
      main.style.marginTop = "0px";
    } else {
      panel.style.display = "block";
      main.style.marginTop = "-40px";
    }
  });
}

if(id == null) {
  if(document.title == 'Login') {
    log.href = "index.html";
    log.textContent = 'Voltar para a Home';
  } else {
    log.href = "account.html";
    log.textContent = 'Logar / Cadastrar';
  }
} else {
  log.textContent = `olá ${nome}!`;
  logado();
}
