const minhaPromise = function(url) {
  return new Promise( function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
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

let login = document.querySelector('.login input[type="submit"]');
let cad = document.querySelector('.cadastrar input[type="submit"]');

login.onclick = function() {
  let logEmail = document.querySelector('.login input[type="email"]');
  let logSenha = document.querySelector('.login input[type="password"]');
  let logUrl = `http://localhost/Unidez-Nove/assets/php/main.php?logEmail=${logEmail.value}&logSenha=${logSenha.value}`;
  minhaPromise(logUrl)
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err)
    })
}

cad.onclick = function() {
  let cadNome = document.querySelector('.cadastrar input[type="text"]');
  let cadEmail = document.querySelector('.cadastrar input[type="email"]');
  let cadSenha = document.querySelectorAll('.cadastrar input[type="password"]');
  console.log(cadNome);
  if(cadSenha[0].value === cadSenha[1].value) {
    let cadUrl = `http://localhost/Unidez-Nove/assets/php/main.php?cadNome=${cadNome}&cadEmail=${cadEmail}&cadSenha=${cadSenha[0].value}`;
    console.log(cadUrl);
  }
}
