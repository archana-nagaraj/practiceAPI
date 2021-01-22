// Planning:
// Get Zomato API Key -> Done
// Read the user input - Cuisine Type
// Find the details about the City we are in (Zomato) -> Done
// Find establishment types, i.e., type of place where we would like to dine.
// Find cuisine we would like to have.
// Find food joint(s)/ restaurant(s) based on information collected above.



var zomato_api_key = "5bb1aedf9a190120f2dd61a33a8368b1";

/* User input */
//var cityName = "Sunnyvale";
//var cuisineType = "italian";
var cuisineInputEl = $("#cuisineType");
var cityInputEl = $("#cityInput");
var searchBtnEl = $("#btn");
function restaurantSearch() {
    searchBtnEl.on('click', function() {
      cuisineType = cuisineInputEl.val().trim();
      cityName = cityInputEl.val().trim();
      if (cityName === '' || cuisineType === '') {
        return;
      }
      cityInputEl.val('');
      cuisineInputEl.val('');
      getData_City(cityName, cuisineType);
    });
  }

// Write a fetch request to the Zomato API

var getData_City = function(cityName){
    var apiUrl = 'https://developers.zomato.com/api/v2.1/cities?q=' +cityName;
    // make a request to the url

    fetch(apiUrl, {method: "GET", 
    headers: {
        "user-key": zomato_api_key
    }})
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data.location_suggestions[0].id);
        getData_Restaurants(data.location_suggestions[0].id, cuisineType);
    });
}
//getData_City();

var getData_Restaurants = function(id, cuisineType){
    var apiUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=' +id +'&entity_type=city&cuisines='+ cuisineType;
   
    fetch(apiUrl, {method: "GET", 
    headers: {
        "user-key": zomato_api_key
    }})
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
        for (var i = 0; i< data.restaurants.length; i++){
            console.log(data.restaurants[i].restaurant.name);
            console.log(data.restaurants[i].restaurant.cuisines);
            console.log(data.restaurants[i].restaurant.establishment[0]);
            console.log(data.restaurants[i].restaurant.location.address);
        }
    });
}

var getData_Cuisines = function(){
    var apiUrl = 'https://developers.zomato.com/api/v2.1/cuisines?city_id=10823';
   
    fetch(apiUrl, {method: "GET", 
    headers: {
        "user-key": zomato_api_key
    }})
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
        for (var i = 0; i< data.cuisines.length; i++){
            console.log(data.cuisines[i].cuisine.cuisine_id);
            console.log(data.cuisines[i].cuisine.cuisine_name);
           
        }
    });

};





//restaurantSearch();
getData_Cuisines();