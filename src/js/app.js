// Add the map
var lugares =[
    {
        nombre: "Cines La Vaguada",
        lat: 40.482837,
		long: -3.707618
    },
    {
        nombre: "Cinesa Manoteras",
        lat: 40.486345,
        long:-3.665740 
    },
    {
        nombre: "Autocine Fuencarral",
        lat: 40.485569,
        long:-3.678341 
    }
]
var map;

var markers = [];




var lugar = function(data){
    var self = this;
    this.nombre = ko.observable(data.nombre);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.long);
    this.visible = ko.observable(true);
      
    this.contenidoWindow = '<div class="info-window-content"><div class="title"><b>' + data.nombre + "</b></div><div class='lat'>" + data.lat +"</div><div class='lng'>"+ data.long +"</div></div>";
    
    this.window = new google.maps.InfoWindow({content: self.contenidoWindow});
    
  

    this.marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.lat, data.long),
			map: map,
			title: data.nombre
	});
    
    this.marker.setMap(map);
    
    this.marker.addListener('click', function() {
        self.window.open(this.map, self.marker);
    });

}



var viewModel = function(){
    var self = this;
    this.locationList = ko.observableArray([]);
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.484225, lng: -3.701123},
        zoom: 15
    });
    lugares.forEach(function(placeItem){
        self.locationList.push(new lugar(placeItem));            
    });    
    console.log(self.locationList()[2].marker.title);
}




function init(){
    ko.applyBindings(new viewModel());    
}