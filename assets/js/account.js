function metadeJanela() {
  return(`${(window.document.body.scrollWidth / 2) - 200}px`);
};

function erroGerado(objeto) {
  let span = document.createElement('span');
  span.id = 'span';
  span.style.backgroundColor = '#fa000090';
  span.style.left = metadeJanela();
  if(objeto == logEmail) {
    span.textContent = 'Email não cadastrado!';
  } else if(objeto == logSenha) {
    span.textContent = 'Senha Incorreta!';
  } else if(objeto == cadEmail) {
    span.textContent = 'Email já cadastrado!';
  } else if(objeto == cadSenha) {
    span.textContent = 'As senhas não coincidem!';
  }
  window.document.body.appendChild(span);
  setTimeout(function() {
    span.style.display = 'none'; 
  }, 5000);
}

function Session() {
  let jaLogou = localStorage.getItem('id');
  if(jaLogou == null) {
    return true;
  } else {
    return false;
  }
}

function certoGerado(objeto, mensagem) {
  let span = document.createElement('span');
  span.id = 'span';
  span.style.backgroundColor = '#00fa0090';
  span.style.left = metadeJanela();
  if(objeto == logEmail) {
    span.textContent = `Sejá bem vindo! ${mensagem}!`;
  } else if(objeto == cadEmail) {
    span.textContent = 'Cadastrado com sucesso!';
  } 
  window.document.body.appendChild(span);
  setTimeout(function() {
    span.style.display = 'none'; 
  }, 5000);
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
  if(Session() == true) {
    minhaPromise(`logEmail=${logEmail.value}&logSenha=${logSenha.value}`)
      .then(function(data) {
        if(data.usuario.email == logEmail.value) {
          if(data.usuario.senha == logSenha.value) {
            certoGerado(logEmail, data.usuario.nome);
            localStorage.setItem('id', data.usuario.id);
            localStorage.setItem('nome', data.usuario.nome);
            localStorage.setItem('email', data.usuario.email);
            setTimeout(function() {
              window.location.replace('index.html');
            }, 2000);
          }
          else {
            erroGerado(logSenha);
          }
        }
        else {
          erroGerado(logEmail);
        }
      })
      .catch(function(err) {
        console.warn(err);
      });
  } else {
    window.location.replace('index.html');
  }
})

cad.addEventListener('submit', function(event) {
  event.preventDefault();
  if(Session() == true) {
    if(cadSenha.value == cadConSenha.value) {
      minhaPromise(`cadNome=${cadNome.value}&cadEmail=${cadEmail.value}&cadSenha=${cadSenha.value}`)
      .then(function(data) {
        if(data.usuario.email == cadEmail.value) {
          certoGerado(cadEmail);
          console.log(data);
        } else {
          erroGerado(cadEmail);
        }
      })
      .catch(function(err) {
        console.warn(err);
      });
    } else {
      erroGerado(cadSenha);
    }
  }
})

let footer = document.querySelector('footer');
footer.style.position = 'fixed';
footer.style.top = '93vh';