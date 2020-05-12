let id = localStorage.getItem('id');
let log = document.querySelector('.log a');

if(id == null) {
  log.textContent = 'Logar / Cadastrar';
} else {
  let nome = localStorage.getItem('nome');
  log.textContent = `olá ${nome}!`;
}

