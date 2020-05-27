function minhaPromise(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest(); 
    xhr.open('GET', `../php/main.php?${url}`); //http://badwolf.epizy.com/
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
