var lugares = [
	{
        nombre: "Cines La Vaguada",
        lat: 40.482837,
		long: -3.707618,
        placeID: "ChIJfcPuDJwpQg0RUGr2lxan8DA"
    },
    {
        nombre: "Cinesa Manoteras",
        lat: 40.486345,
        long:-3.665740,
        placeID: "ChIJMXa3qDohQg0RXPRJGqfP9ls"
    },
    {
        nombre: "Autocine Fuencarral",
        lat: 40.485569,
        long:-3.678341,
        placeID: "ChIJU5xT7FwpQg0RYOKcJVNVB0s"
    },
    {
        nombre: "Kinépolis Diversia",
        lat: 40.530067,
        long:-3.639312 ,
        placeID: "ChIJHyaMsV0sQg0RoRzZUkypj5E"
    },
    {
        nombre: "Cine Plaza norte 2",
        lat: 40.541287,
        long:-3.615794,
        placeID: "ChIJZ1V8C94sQg0R4FhCviwku6s"
    }

];


var Map ='';
// create 1 lugar for every object in lugares
var lugar = function(data) {    
	var self = this;
	this.name = data.nombre;
	this.lat = data.lat;
	this.long = data.long;
    this.placeID = data.placeID;
    this.address = '';
    this.telf = '';
	this.visible = ko.observable(true);

	
    //create InfoWindow
	this.InfoWindow = new google.maps.InfoWindow({content: self.contentString});
    
    //create service places
    var service = new google.maps.places.PlacesService(Map);

    
        
    
    service.getDetails({
        placeId: data.placeID
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            self.address = place.formatted_address;
            self.telf = place.formatted_phone_number;
        }
    });
    

    //  Markers
	this.Marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.lat, data.long),
			map: Map,
            icon: 'images/cinemaImage.png',
			title: data.nombre
	});
    
    
    //eventListener that creates the windows.
	this.Marker.addListener('click', function(){
		self.contentString = '<div class="info-window-content"><div class="title"><b>' + data.nombre + "</b></div>" +
        '<div class="content">Address: ' + self.address + "</div>" +
        '<div class="content">Phone: ' + self.telf + "</div>" +
        '<div class="content">Lat: ' + self.lat + "</div>" +
        '<div class="content">Long: ' + self.long + "</div></div>";
        self.InfoWindow.setContent(self.contentString);
		self.InfoWindow.open(Map, this);		
		self.Marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ self.Marker.setAnimation(null); }, 3550);

	});
    
    
    
    //filter Markers
	this.showMarker = ko.computed(function() {
		if(this.visible() === true) {
			this.Marker.setMap(Map);
		} else {
			this.Marker.setMap(null);
		}
		return true;
	}, this);

    
    
    
	this.animacion = function(place) {
		google.maps.event.trigger(self.Marker, 'click');
	};
    
    $('#nav-icon').click(function(){
        if($(this).hasClass("open")){
            $(this).removeClass('open');            
            $("#search").css("left", "-50vw");
        } else{
            $(this).toggleClass('open');    
            $("#search").css("left", 0);
        }
        
	});
    
};



function viewModel() {
	var self = this;

    // variables observables 
	this.searchTerm = ko.observable("");
	this.listaLugares = ko.observableArray([]);
    
    // lat-lang Map  + zoom
	Map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.484225, lng: -3.701123},
        zoom: 12
    });

//Handler error
ko.onError = function(error) {
    alert("Error --> ", error);
};
    
    //Add lugar to the array listaLugares
	lugares.forEach(function(paramLugar){
		self.listaLugares.push( new lugar(paramLugar));
	});
    
    
    //filter list
	this.filtrarLista = ko.computed( function() {
		var filter = self.searchTerm().toLowerCase();
		if (!filter) {
			self.listaLugares().forEach(function(paramLugar){
				paramLugar.visible(true);
			});
			return self.listaLugares();
		} else {
			return ko.utils.arrayFilter(self.listaLugares(), function(paramLugar) {
				var string = paramLugar.name.toLowerCase();
				var result = (string.search(filter) >= 0);
				paramLugar.visible(result);
				return result;
			});
		}
	}, self);

}


//beginning
function init() {
	ko.applyBindings(new viewModel());
}


//errorMap
function errorMap(){
    alert("Google maps has failed.");
}