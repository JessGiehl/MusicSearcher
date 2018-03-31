//function that submits search value with api to return results, prints to the DOM
function searchSubmit(event){
  //prevent page reload
  event.preventDefault();
  console.log(search.value);

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
      //create a string to store adjacentHTML
      var output = `<ul>`;
      //create list items for 9 albums
      for (var i = 0; i < 9; i++) {
        output +=
        ` <li>
            <img src="${myJson.topalbums.album[i].image[2]['#text']}">
            <h3>${myJson.topalbums.album[i].name}</h3>
            <p>${myJson.topalbums.album[i].artist.name}</p>
            <a href="${myJson.topalbums.album[i].url}">${myJson.topalbums.album[i].name}</a>
          </li>`
      }
      output += `</ul>`;

      document.querySelector('h2').insertAdjacentHTML('afterend', output);

    })
    .catch(error => console.error(error));
}
var search = document.querySelector('#search');
var form = document.querySelector('form');

//when form is submitted, run searchSubmit()
form.addEventListener('submit', searchSubmit);
