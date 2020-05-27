let exit = document.querySelector('.painel input');
let caixa = document.querySelector('.caixa_de_comentario');
let area_comentarios = document.querySelector('.comentarios');

pegarComents(null, null, true);

exit.onclick = function() {
  localStorage.removeItem('id');
  localStorage.removeItem('nome');
  localStorage.removeItem('email');
  window.location.reload();
}

caixa.addEventListener('keypress', function(event) {
  if(event.key == 'Enter') {
    if(id != null) {
      pegarComents(id ,caixa.value, false);
      caixa.value = "";
    } else {
      window.location = 'account.html';
    }
  }
});

function criarComentario(id ,texto, nome) {
  let unificada = document.createElement('div');
  unificada.className = id;

  let comentario = document.createElement('div');
  comentario.className = 'comentario';

  let criador = document.createElement('div');
  criador.className = 'criador texto center';
  criador.textContent = nome;
  comentario.appendChild(criador);

  let divisoria = document.createElement('div');
  divisoria.className = 'divisoria';
  comentario.appendChild(divisoria);

  let conteudo = document.createElement('div');
  conteudo.className = 'conteudo texto center';
  conteudo.textContent = texto;
  comentario.appendChild(conteudo);

  unificada.appendChild(comentario);

  let center = document.createElement('div');
  center.className = 'centro';

  let resposta = document.createElement('input');
  resposta.className = 'resposta';
  resposta.type = 'text';
  resposta.placeholder = 'digite aqui...';
  resposta.id = id;
  resposta.addEventListener('keypress', function(event) {
    if(event.key == 'Enter') {
      if(id != null) {
        funcResposta(resposta);
        resposta.value = "";
      } else {
        window.location = 'account.html';
      }
    }
  });

  center.appendChild(resposta);
  unificada.appendChild(center);
  area_comentarios.appendChild(unificada);
}

function funcResposta(objeto) {
  console.log(objeto);
}

function pegarComents(id ,texto, podemodificar) {
  let url = '';
  if(podemodificar == true) {
    area_comentarios.innerHTML = "";
    minhaPromise(url)
    .then(function(data) {
      let arr = data.comentarios;
      if(arr.length != 0) {
        for(let i = 0; i < arr.length; i++) {
          minhaPromise(`userId=${arr[i].idcriador}`)
          .then(function(data) {
            criarComentario(arr[i].idcomentario, arr[i].comentario, data.usuario);
          })
        }
      }
    })
  } else {
    url = `gCriador=${id}&gConteudo=${texto}`;
    minhaPromise(url)
      .then(function(data) {
        let arr = data.comentarios;
        for(let i = 0; i < arr.length; i++) {
          console.log(arr.length, i);
          if((i+1) == arr.length) {
            minhaPromise(`userId=${arr[i].idcriador}`)
            .then(function(data) {
              criarComentario(arr[i].idcomentario, arr[i].comentario, data.usuario);
            })
          }
        }
      });
  }
}