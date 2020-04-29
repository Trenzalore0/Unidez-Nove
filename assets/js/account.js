const minhaPromise = function(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.status);
        }
      }
    }
  });
}

let login = document.querySelector('.login input[type="submit"]');
let cad = document.querySelector('.cadastrar input[type="submit"]');

let logEmail = document.querySelector('.login input[type="email"]');
let logSenha = document.querySelector('.login input[type="password"]');

login.onclick = function() {
  let logUrl = `http://localhost/Unidez-Nove/assets/php/main.php?logEmail=${logEmail.value}&logSenha=${logSenha.value}`;
  minhaPromise(logUrl)
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err)
    });
}

let cadNome = document.querySelector('.cadastrar input[type="text"]');
let cadEmail = document.querySelector('.cadastrar input[type="email"]');
let cadSenha = document.querySelectorAll('.cadastrar input[type="password"]');
cad.onclick = function() {
  if(cadSenha[0].value == cadSenha[1].value) {
    let cadUrl = `http://localhost/Unidez-Nove/assets/php/main.php?cadNome=${cadNome.value}&cadEmail=${cadEmail.value}&cadSenha=${cadSenha[0].value}`; 
    console.log(cadUrl);
  }
}
