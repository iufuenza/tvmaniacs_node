var cheerio = require('cheerio');

//This is a module, which make this code behave as an API
//Lo siguiente es un modulo, lo que nos permite tener variables
//locales y que hace que el archivo se comporte como una API

	
	//getInfo receives an html file and returns the actor's information in JSON format
	//getInfo recibe el html y devuelve la info del actor en formato JSON
module.exports.getInfo = function(html) {
	var _id, name, last_name, bio, pic, birth_date, birth_place, series;
	var $ = cheerio.load(html);

	//Obtengo el id del actor del tag con el link a la página 
	pattern = /\d{7}/;
	var _id = $('link[rel = "canonical"]').attr("href").match(pattern);
	_id = parseInt(_id);
	
	var complete_name = $('span[itemprop="name"]').html().split(' ');
	first_name = complete_name[0];
	complete_name.splice(0,1);
	last_name = complete_name.join(' ');
	
	var born_info = $('#name-born-info');
	birth_date = $('time', born_info).attr('datetime');
	//1956-12-31
	birth_place = $('a', born_info).last().html();
	
	bio = $('.inline[itemprop="description"]').html();
	pic = $('#name-poster').attr('src');
	
	//solo filmografia como actor, por eso el first()
	var filmo = $(".filmo-category-section").first().children().filter(":contains('(TV Series)')");
	series = new Array(filmo.length);


	//Obtenemos el id de las series en las que actuado el actor
	filmo.each(function(index, elem){
		// series[index] = {};
		// series[index]["name"] = $(this).find('a').first().html();
		// var year = $(this).find('.year_column').html().split(';');
		// series[index]["year"] = year[1];

		pattern = /\d{7}/;
		series[index] = parseInt($(this).find('a').attr('href').match(pattern));
	});
	
	return {
		"_id": _id,
		"first_name": first_name,
		"last_name": last_name,
		"bio": bio, 
		"pic": pic,						//direccion a un recurso del media server??
		"birth_date": birth_date,
		"birth_place": birth_place,
		"series": series
			/*[
			{
				"name": "House M.D.", 
				"year": 2004
			}
			]*/
	}
};

//getLinks receives an html file and returns all links categorized
//getLinks recibe el html y devuelve todos los links categorizados	
module.exports.getLinks = function(html) {
	var $ = cheerio.load(html);
	var pageURL = $('link[rel="canonical"]').attr('href');
	links = [];
	
	//actors list from birth date links (monthday and year)
	var birth_date = $('#name-born-info time a');
	birth_date.each(function(index, elem){
		var url = checkURL(pageURL,this.attr('href'));
		links.push({
			"url": url,
			"site": "IMDB",
			"type": "actors_list"
		 });
	});
	
	var filmo = $(".filmo-category-section").first().children().filter(":contains('(TV Series)')");
	series = new Array(filmo.length);
	filmo.each(function(index, elem){
		var url = checkURL(pageURL,$(this).find('a').attr('href'));
		links.push({
			"url": url,
			"site": "IMDB",
			"type": "series"
		});
	});
	/*
		{
			"url":"http://...",
			"site": "IMDB"/"Metacritic",
			"type": "actor" / "series" / "episode" / "episodes_list" / "actors_list"
		}
	*/
	return links;
};

var checkURL = function(pageURL,url) {
	if (url.slice(0,1) == '?'){
		return pageURL+url;
	}
	return "www.imdb.com"+url;
	
};
	

// module.exports.getInfo = function(html) {
//     return getInfo(html);
// };
// module.exports.getLinks = function(html) {
//     return getLinks(html);
// };
