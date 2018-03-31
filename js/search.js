//function that submits search value with api to return results, prints to the DOM
function searchSubmit(event){
  //prevent page reload
  event.preventDefault();

  //remove existing elements if present
  if (document.querySelector('.error')){
    document.querySelector('.error').remove();
  }  
  if (document.querySelector('.albumlist')){
    document.querySelector('h2').remove();
    document.querySelector('.albumlist').remove();
  }

  //variables for storing api string
  var url= 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=';
  var userSearch = search.value;
  var key = '&api_key=068ec181234c62e77ca06d86e89bf24d&format=json';

  //construct string and fetch response
  fetch(url+userSearch+key)
    .then(function(response) {
      //turn response into a JSON object
      return response.json();
    })
    .then(function(myJson) {
      if (myJson.hasOwnProperty('error')){
        var error = `<p class="error">${myJson.message}</p>`;
        document.querySelector('section').insertAdjacentHTML('afterbegin', error);
      } else {
        var header = `<h2>Showing results for "${myJson.topalbums['@attr'].artist}"</h2>`;
        document.querySelector('section').insertAdjacentHTML('afterbegin', header);

        //create a string to store adjacentHTML
        var output = `<ul class="albumlist">`;
        //create list items for 9 albums
        for (var i = 0; i < 9; i++) {
          output +=
          ` <li>
              <img src="${myJson.topalbums.album[i].image[3]['#text']}">
              <h3>${myJson.topalbums.album[i].name}</h3>
              <p>${myJson.topalbums.album[i].artist.name}</p>
              <p><a href="${myJson.topalbums.album[i].url}">${myJson.topalbums.album[i].name}</a></p>
            </li>`
        }
        output += `</ul>`;

        document.querySelector('h2').insertAdjacentHTML('afterend', output);
      }
    })
    .catch(error => console.error(error));
}
var search = document.querySelector('#search');
var form = document.querySelector('form');

//when form is submitted, run searchSubmit()
form.addEventListener('submit', searchSubmit);
