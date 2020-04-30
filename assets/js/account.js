function minhaPromise(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest(); 
    xhr.open('GET', `../php/main.php?${url}`);
    xhr.send(null);

    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr);
        }
      }
    }
  });
}

let login = document.querySelector('.login');
let cad = document.querySelector('.cadastrar');

let logEmail = document.getElementById('logEmail');
let logSenha = document.getElementById('logSenha');

let cadNome = document.getElementById('cadNome');
let cadEmail = document.getElementById('cadEmail');
let cadSenha = document.getElementById('cadSenha');
let cadConSenha = document.getElementById('cadConSenha');

login.addEventListener('submit', function(event) {
  event.preventDefault();
  minhaPromise(`logEmail=${logEmail.value}&logSenha=${logSenha.value}`)
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.warn(err);
    });
})

cad.addEventListener('submit', function(event) {
  event.preventDefault();
  if(cadSenha.value == cadConSenha.value) {
    let cadUrl = `cadNome=${cadNome.value}&cadEmail=${cadEmail.value}&cadSenha=${cadSenha.value}`; 
    minhaPromise(cadUrl)
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.warn(err);
    });
  }
})
