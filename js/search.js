//function to get search value out of url
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//function to find if search query string is present in url
function queryFinder() {
  var field = 'search';
  var url = window.location.href;
  if(url.indexOf('?' + field + '=') != -1){
    search = getParameterByName('search');
    return true;
  }
  else if(url.indexOf('&' + field + '=') != -1) {
    search = getParameterByName('search');
    return true;
  }
  return false;
}

//function that submits usersearch input with api to return results, prints to the DOM
function searchSubmit(){
  console.log('hi!');
  console.log(search);
  var url= 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=';
  var userSearch = search.value;
  var key = '&api_key=068ec181234c62e77ca06d86e89bf24d&format=json';

  fetch(url+userSearch+key)
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
}
//stores search string globally
var search;
//only run searchsubmit if query string is present
if (queryFinder()){
  searchSubmit();
}
