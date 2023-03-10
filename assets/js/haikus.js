$(document).ready(function(){ 
  // getRandomGroup(function() {
  //   generateHaikuSameGroup();
  // });
  // $.when(getRandomGroup()).then(generateHaikuSameGroup());
  //let groupNum = getRandomGroup();
  getRandomHaikuNewGroup(false);

  var generate = document.getElementById("generate");
  var change = document.getElementById("change");
  
  generate.addEventListener('click', function(){
    animation(1);
    // getRandomHaikuNewGroup(true);
  })

  change.addEventListener('click', function(){
    animation(2);
    // getRandomHaikuNewGroup(false);
  })

});

function getRandomHaikuNewGroup(sameGroup){
  url = routeUrl + '/haiku';
  fetch(url)
  .then((response) => {
      if(!response.ok){ // Before parsing (i.e. decoding) the JSON data,
                          // check for any errors.
          // In case of an error, throw.
          throw new Error("Something went wrong!");
      }
      // console.log(response);
      return response.json(); // Parse the JSON data.
  })
  .then((data) => {
          //console.log(data['group_num']);
          if(sameGroup){
              generateHaikuSameGroup(document.querySelector("#groupnum").innerHTML);
          }else{
              if(data['group_num'] == document.querySelector("#groupnum").innerHTML){
                getRandomHaikuNewGroup(false);
              }else{
                document.querySelector("#groupnum").innerHTML = data['group_num'];
                generateHaikuSameGroup(data['group_num']);
              }
          }
          //document.querySelector('#groupnum').innerHTML = data['group_num'];
  })
  .catch((error) => {
          // This is where you handle errors.
          console.error("Error group haiku");
          return 0;
  });
}

function getHaikuText(num, id_haiku){
  //console.log(group_num);
  fetch(routeUrl + '/haiku/text', { 'body': JSON.stringify({ 'num': num, 'id_haiku': id_haiku }), method: 'POST'})
  .then((response) => {
      if(!response.ok){ // Before parsing (i.e. decoding) the JSON data,
                          // check for any errors.
          // In case of an error, throw.
          throw new Error("Something went wrong!");
      }
      //console.log(response.json());
      return response.json(); // Parse the JSON data.
  })
  .then((data) => {
          // This is where you handle what to do with the response.
          
          id = "#line" + num;
          //console.log(id)
          document.querySelector(id).innerHTML = data['text'];

  })
  .catch((error) => {
          // This is where you handle errors.
          console.error("Error text haiku");
  });
}

function getRandomHaiku(num, group_num){
  //console.log(group_num);
  fetch(routeUrl +  '/haiku/textGroup/' + group_num)
  .then((response) => {
      if(!response.ok){ // Before parsing (i.e. decoding) the JSON data,
                          // check for any errors.
          // In case of an error, throw.
          throw new Error("Something went wrong!");
      }
      //console.log(response.json());
      return response.json(); // Parse the JSON data.
  })
  .then((data) => {
          // This is where you handle what to do with the response.
          getHaikuText(num, data['id_haiku']);
  })
  .catch((error) => {
          // This is where you handle errors.
          console.error("Error text haiku");
  });
}

function getHaikuAuthorGroup(group_num){
  //console.log(group_num);
  url = routeUrl + '/haiku/authorGroup/' + group_num;
  //console.log(url);
  fetch(url)
  .then((response) => {
      if(!response.ok){
          throw new Error("Something went wrong!");
      }
      //console.log(response.json());
      return response.json(); // Parse the JSON data.
  })
  .then((data) => {
    //console.log(data[0]['id_author']);
    document.querySelector("#author1").innerHTML = '';
    document.querySelector("#author2").innerHTML = '';
    getHaikuAuthor(data[0]['id_author'], true);
    if(data.length > 1){
      getHaikuAuthor(data[1]['id_author'], false);
    }
      
  })
  .catch((error) => {
          // This is where you handle errors.
          console.error("Error author group");
  });
}

function getHaikuAuthor(id_author, onlyOne){
  //console.log(group_num);
  fetch(routeUrl + '/haiku/author/' + id_author)
  .then((response) => {
      if(!response.ok){ // Before parsing (i.e. decoding) the JSON data,
                          // check for any errors.
          // In case of an error, throw.
          throw new Error("Something went wrong!");
      }
      //console.log(response.json());
      return response.json(); // Parse the JSON data.
  })
  .then((data) => {
          
          if(onlyOne){
            document.querySelector("#author1").innerHTML = data['first_name'] + " " + data['name'];
            
          }else{
            document.querySelector("#author2").innerHTML = " et " + data['first_name'] + " " + data['name'];
          }
  })
  .catch((error) => {
          // This is where you handle errors.
          console.error("Error author haiku");
  });
}

function generateHaikuSameGroup(group_num){
  getHaikuAuthorGroup(group_num);
  for(i = 1 ; i < 4 ; i++){
      getRandomHaiku(i, group_num);
  }
}

function animation(mode){
  play();
  if(mode == 1){
    setTimeout(getRandomHaikuNewGroup(true), 500);
  }else{
    setTimeout(getRandomHaikuNewGroup(false), 500);
  }
  setTimeout(anim, 500);
}

function play() {
   
    document.querySelector("#line1").className = "flex-child";
    document.querySelector("#line2").className = "flex-child";
    document.querySelector("#line3").className = "flex-child";

    window.requestAnimationFrame(function(time) {
      window.requestAnimationFrame(function(time) {
        document.querySelector("#line1").className = "flex-child animate";
        document.querySelector("#line2").className = "flex-child animate";
        document.querySelector("#line3").className = "flex-child animate";

      });
    });   
}

function anim() {

  window.requestAnimationFrame(function(time) {
    window.requestAnimationFrame(function(time) {
      document.querySelector("#line1").className = "flex-child animate come";
      document.querySelector("#line2").className = "flex-child animate come";
      document.querySelector("#line3").className = "flex-child animate come";
    });
  });
}