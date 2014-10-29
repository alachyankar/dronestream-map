(function($) {

var places;
var url = 'http://www.api.dronestre.am/data?callback=?';

function parseStrikes(data) { 
    var result = []
    $(data).each(function(id,element){
        var lat = element.lat;
        var long = element.lon;
        var weightDeath = element.deaths_max;
        var weightedLocation = {
            location : new google.maps.LatLng(lat, long),
            weight = weightDeath
        };
        result.push(weightedLocation);
    })
    return result;
}

    
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
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var pointArray = new google.maps.MVCArray(parseStrikes(json.strike));

        
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: pointArray
        });

        heatmap.setMap(map);
        }
        google.maps.event.addDomListener(window, 'load', initialize);
        $.each(parseStrikes(json.strike),function(index,data) {
            pointArray
     })}),
 }

ajaxGet()
})(jQuery);