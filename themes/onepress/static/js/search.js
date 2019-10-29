
var index;

var search_term = window.location.search.substring(3).split('+').join(" ")

get_index = function(){
  var start_time = Date.now()
  $.getJSON("/index.json", function(json) {
      index = elasticlunr(function () {
      this.addField('title');
      this.addField('tags');
      this.addField('content');
      this.addField('description');
      this.setRef('ref');
   });
   console.log(json);
   $.each(json, function (key, val) {
     if(val.content.length !== 0 && val.description.length !== 0){
       index.addDoc(val);
     }
   });
});
console.log('Indexing done in ' + (Date.now() - start_time) + ' ms') 
//callback();
};

get_index();



display_results = function(){
  console.log(index);
  $('#search-results').empty();
  var search_term = window.location.search.substring(3).split('+').join(" ")
  var results = index.search(search_term, {
      fields: {
          title: {boost: 3},
          description: {boost: 2},
          content: {boost: 1}
      }
  });
  console.log(results);
  for (var i = 0; i < results.length; i++) { 
        var article = '<article class = \"list">';
        var headline =  '\"><h2 class=\"title\">' + results[i].doc['title'] + '</h2></a>';
        var link = '<a href = \"' + results[i].doc['ref'];
        var img = '\"><img class=\"image\" src=\"' + results[i].doc['imageURL'] +'\"></a>';
        var intro = '<span class=\"intro\">' + results[i].doc['description'] + '</span>';
        var readmore = '\" class="read-more">Read More</a>';
        var card = article + link + headline + link + img + intro + link + readmore + '</article>';
        
        $('#search-results').append(card);
    } 
}

setTimeout(display_results, 200);
