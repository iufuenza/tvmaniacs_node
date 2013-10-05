var cheerio = require('cheerio');

//This is a module, which make this code behave as an API
//Lo siguiente es un modulo, lo que nos permite tener variables
//locales y que hace que el archivo se comporte como una API
(function() {
	

		//getLinks receives an html file and returns all links categorized
	//getLinks recibe el html y devuelve todos los links categorizados	
		var getLinks = function(html)
		{
			var $ = cheerio.load(html);
			links = [];
			
			//actors list 
			var actors = $('.results .name a');
			actors.each(function(index, elem){
				links.push({
					"url": this.attr('href'),
					"site": "IMDB",
					"type": "actors_list"
				 });
			});

			//linkt to next page
			var next_page = $('#right .pagination a');
			
				links.push({
					"url": next_page.attr('href'),
					"site": "IMDB",
					"type": "actors_list"
				 
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
		

    module.exports.getLinks = function(html) {
        return getLinks(html);
    };

}());