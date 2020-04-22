const minhaPromise = function() {
  return new Promise( function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://trenzalore.epizy.com/main.php');
    const text = { 'comand':'PUSH' };
    xhr.send(null);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject('Error!');
        }
      }
    }
  });
}

minhaPromise()
  .then( function(data) {
    console.log(data.id);
  })
  .catch( function(error) {
    console.warn(error);
  })
