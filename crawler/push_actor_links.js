var sqlite3 = require("sqlite3").verbose();
// var utils = require("../config/utils.js");
var dbStore = require('../scraper/db_store');
var config = require('../config/config.json'); //Load config values

//function that enqueues IMDB actors when all the links are already visited
module.exports.pushImdbActorLinks = function() {
	//start with link starting in http://www.imdb.com/name/nm0000001/
	console.log("Push 10 actor links");
	var db = new sqlite3.Database(config["db_file"]);
  // var db = utils.links_db;
	var links = new Array(); 
	db.serialize(function() {
        // Get all actor_links rows in db
         var id_lookup;
         var num_links = 0;
         var links = new Array(); 
         var actor_query = "SELECT * FROM links WHERE url = ? "
        	for(var i = 0; i < 20; i++){
        		id_lookup = getRandomInt(1,5999999);
        		var url = "www.imdb.com/name/nm" + pad(id_lookup,7) +"/";
        		console.log(url);
        		db.get(actor_query,"http://"+url, function (err,rows){
        			console.log(rows);
        			if(!rows){
        				links.push({"url" : url,
        						"site" : "IMDB",
        						"type" : "actor"});
        				num_links++;
        			}        			
        		}); 
        	}	
        	console.log(num_links+" links added to db");
	});
   dbStore.storeInLocalDB(links, config["access"]["Local"]);
}
//formatear un nro para que quede de forma 0000000
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

