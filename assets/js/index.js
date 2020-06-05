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
  console.log(seletor, nome);
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
  minhaPromise(`rComent=${objeto.id}&rCriador=${id}&rConteudo=${objeto.value}`)
    .then(function(data) {
      if(data.resposta.criado == true) {
        addResposta(objeto.id, objeto.value, nome, 10);
      }
    })
}

async function pegarComents(id ,texto, podemodificar) {
  let url = '';
  if(podemodificar == true) {
    area_comentarios.innerHTML = "";
    await minhaPromise(url)
    .then(function(data) {
      let arr = data.comentarios;
      if(arr.length != 0) {
        for(let i = 0; i < arr.length; i++) {
          minhaPromise(`userId=${arr[i].idcriador}`)
            .then(function(data) {
              criarComentario(arr[i].idcomentario, arr[i].comentario, data.usuario);
              minhaPromise(`comentId=${arr[i].idcomentario}`)
                .then(function(data) {
                  if(data.respostas != null || data.respostas != 0) {
                    let array = data.respostas;
                    for(let j = 0; j < array.length; j++) {
                      minhaPromise(`userId=${array[j].criador}`).then(function(data) {
                        addResposta(array[j].comentario, array[j].conteudo, data.usuario, array[j].id);
                      })
                      
                    }
                  }
                })
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
              minhaPromise(`comentId=${arr[i].idcomentario}`)
              .then(function(data) {
                if(data.respostas != null || data.respostas != 0) {
                  let array = data.respostas;
                  for(let j = 0; j < array.length; j++) {
                    minhaPromise(`userId=${array[j].criador}`).then(function(data) {
                      addResposta(array[j].comentario, array[j].conteudo, data.usuario, array[j].id);
                    })
                    
                  }
                }
              })
            })
          }
        }
      });
  }
}