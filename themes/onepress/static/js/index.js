var index;

var search_term = window.location.search.substring(3).split('+').join(" ")

function get_index(){
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
     // I filter out a some items here if they are not needed
     if(val.content.length !== 0 && val.description.length !== 0){
       index.addDoc(val);
     }
   })
});
}
