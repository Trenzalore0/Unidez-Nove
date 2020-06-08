let exit = document.querySelector('.painel input');
let caixa = document.querySelector('.caixa_de_comentario');
let area_comentarios = document.querySelector('.comentarios');
let trocar = true;
let quantidade = 0;
let tempo = 1000;
let idComents = [];
let idResp = [];

exit.onclick = function() {
  localStorage.removeItem('id');
  localStorage.removeItem('nome');
  localStorage.removeItem('email');
  window.location.reload();
}

caixa.addEventListener('keypress', function(event) {
  if(event.key == 'Enter') {
    if(id != null) {
      pegarComents(id, caixa.value, false);
      caixa.value = "";
    } else {
      window.location = 'account.html';
    }
  }
});

function criarComentario(id_comen ,texto, nome) {
  let unificada = document.createElement('div');
  unificada.className = id_comen;

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

  let coments = document.createElement('div');
  coments.className = 'respostas';
  coments.id = `centro${id_comen}`;

  let resposta = document.createElement('input');
  resposta.className = 'resposta';
  resposta.type = 'text';
  resposta.placeholder = 'digite aqui...';
  resposta.id = id_comen;
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

  coments.appendChild(resposta);
  center.appendChild(coments);
  unificada.appendChild(center);
  area_comentarios.appendChild(unificada);
}

function addResposta(comentario, texto, nome, id_resposta) {
  let seletor = '#centro' + comentario;
  let centro = document.querySelector(seletor);
  
  let resposta = document.createElement('div');
  resposta.className = 'comentarioResp';
  resposta.id = id_resposta;

  let criador = document.createElement('div');
  criador.className = 'criador texto center';
  criador.textContent = nome;
  resposta.appendChild(criador);

  let divisoria = document.createElement('div');
  divisoria.className = 'divisoria';
  resposta.appendChild(divisoria);

  let conteudo = document.createElement('div');
  conteudo.className = 'conteudo texto center';
  conteudo.textContent = texto;
  resposta.appendChild(conteudo);

  centro.appendChild(resposta);
}

function funcResposta(objeto) {
  let texto = objeto.value;
  minhaPromise(`rComent=${objeto.id}&rCriador=${id}&rConteudo=${texto}`);
}

function pegarComents(id ,texto, podemodificar) {
  let url = '';
  if(podemodificar == true) {
    area_comentarios.innerHTML = "";
    minhaPromise(url)
    .then(function(data) {
      let arr = data.comentarios;
      if(arr.length != 0) {
        quantidade = arr.length;
        for(let i = 0; i < arr.length; i++) {
          colocarComents(arr[i]);
        }
      }
    })
    trocar = false
  } else if(id == null && texto == null) {
      minhaPromise(url)
        .then(function(data) {
          let arr = data.comentarios;
          for(let i = 0; i < arr.length; i++) {
            if((i+1) == arr.length  && quantidade < arr.length) {
              quantidade = arr.length;
              colocarComents(arr[i]);
            }
          }
        })
  } else {
    url = `gCriador=${id}&gConteudo=${texto}`;
    minhaPromise(url)
      .then(function(data) {
        let arr = data.comentarios;
        for(let i = 0; i < arr.length; i++) {
          if((i+1) == arr.length  && quantidade < arr.length) {
            quantidade = arr.length;
            colocarComents(arr[i]);
          }
        }
      });
  }
}

function colocarComents(coment) {
  minhaPromise(`userId=${coment.idcriador}`)
    .then(function(data) {
      criarComentario(coment.idcomentario, coment.comentario, data.usuario);
      pegarResp(coment.idcomentario);
    })
}

function pegarResp(id_comentario) {
  let verificador = false;
  for(let i = 0; i < idComents.length; i++) {
    if(id_comentario == idComents[i]) {
      verificador = true;
    }
  }
  if(verificador == false) {
    idComents.push(id_comentario);
  }
  minhaPromise(`comentId=${id_comentario}`)
  .then(function(data) {
    if(data.respostas !== null || data.respostas.length !== 0) {
      let array = data.respostas;
      for(let j = 0; j < array.length; j++) {  
        let verificador2 = false;
        for(let num = 0; num < idResp.length; num++) {
          if(array[j].id == idResp[num]) {
            verificador2 = true;
          }
        }
        if(verificador2 == false) {
          idResp.push(array[j].id);
          minhaPromise(`userId=${array[j].criador}`).then(function(data) {
            addResposta(array[j].comentario, array[j].conteudo, data.usuario, array[j].id);
          })
        } 
      }
    }
  })
}

function Websocket() {
  
  for(let i = 0; i < idComents.length; i++) {
    pegarResp(idComents[i]);

  }
  if(id !== null) {
    pegarComents(null, null, trocar);
  } else {
    pegarComents(null, null, trocar);
  }
}

setInterval(function() {
  Websocket();
}, tempo);
