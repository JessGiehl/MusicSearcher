//api key
//068ec181234c62e77ca06d86e89bf24d
//shared secret
//39d97b73c3f233ac2a2d4e1872510019

fetch('http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=068ec181234c62e77ca06d86e89bf24d&format=json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log('data', myJson);
    var output = `<ul>`;

    for (var i = 0; i < 9; i++) {
      output +=
      ` <li>
          <h3>${myJson.topalbums.album[i].name}</h3>
        </li>`
    }
    output += `</ul>`;

    document.querySelector('h2').insertAdjacentHTML('afterend', output);

  })
  .catch(error => console.error(error));
