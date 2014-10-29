(function($) {

var places;
var url = 'http://www.api.dronestre.am/data?callback=?';


    
 function ajaxGet() {
     $.ajax({
        type: 'GET',
        url: url,
        async: false,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp'}).done(function(json) {
            console.log(json.strike);
        }).fail(function(e) {
            console.log(e.message);
        }).always(function(json) {

         function initialize() {

            var mapOptions = {
            zoom: 5,
            center: new google.maps.LatLng(25.774546, 65.433523),
            mapTypeId: google.maps.MapTypeId.SATTELITE
            };   

            map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);

             // Construct the circle for each value in citymap.
             // Note: We scale the area of the circle based on the population.


            $.each(json.strike, function(index,element){
                var lat = element.lat;
                var long = element.lon;
                var location = new google.maps.LatLng(lat, long);
                var deaths = element.deaths_max;
                console.log(deaths);
                var popOptions = {
                    strokeColor : '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: map,
                    center: location,
                    radius: deaths * 1000
                };

                var cityCircle = new google.maps.Circle(popOptions);
            })
        };
         google.maps.event.addDomListener(window, 'load', initialize);
        })
 }

ajaxGet()
})(jQuery);
