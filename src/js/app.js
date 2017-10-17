// Add the map
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.484225, lng: -3.701123},
        zoom: 15
    });
}