//Podriamos pasar parametros por linea de comandos, la carpeta dnd estan los html, el .js dnd esta el acceso a la bdd
// (por los passwords y eso) y la cantidad de tiempo de cada cuanto rato revisa si hay
//nuevos archivos.


var fs = require('fs');

var metacriticActorProcesser = require('./processers/metacritic/metacritic_actor');


//obtener info de actor metacriticIMDB. Check!
var html_actor = fs.readFileSync('./html_test_files/metacritic/actors/metacritic_actor.html')



var actor = metacriticActorProcesser.getInfo(html_actor);
//console.log("Actor Info:")
//console.log(actor);

//obtener links de actor imdb. Check!
//var links_actor = metacriticActorProcesser.getLinks(html_actor);
//console.log("Actor Links:")
//console.log(links_actor);
/*
var imdbSeriesProcesser = require('./imdb_series');

//obtener info de series imdb. Check!
var html_series = fs.readFileSync('./html_test_files/imdb/series/imdb_series.html')
var series = imdbSeriesProcesser.getInfo(html_series);
console.log("Series Info:")
console.log(series);



var links_series = imdbSeriesProcesser.getLinks(html_series);
console.log("Series Links:")
console.log(links_series);

var imdbActorsListProcesser = require('./imdb_episodes_list');
//obtener lista de actores imdb.
var html_actors_list = fs.readFileSync('./html_test_files/imdb/episodes_lists/imdb_episodes_list.html')


var links_actors_list = imdbActorsListProcesser.getLinks(html_actors_list);
console.log("Episiodekjnsk link:");
console.log(links_actors_list);
*/
