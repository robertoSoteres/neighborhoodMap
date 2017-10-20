
//Data
var lugares = [
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
    },
    {
        nombre: "Kinépolis Diversia",
        lat: 40.530067,
        long:-3.639312 
    },
    {
        nombre: "Cine Plaza norte 2",
        lat: 40.541287,
        long:-3.615794 
    }

];


// create 1 lugar for every object in lugares
var lugar = function(data) {    
	var self = this;
	this.name = data.nombre;
	this.lat = data.lat;
	this.long = data.long;

	this.visible = ko.observable(true);

	
    //create infoWindow
	this.infoWindow = new google.maps.InfoWindow({content: self.contentString});
    
    // markers
	this.marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.lat, data.long),
			map: map,
            icon: 'images/cinemaImage.png',
			title: data.nombre
	});

    
    //eventListener that creates the windows.
	this.marker.addListener('click', function(){
		self.contentString = '<div class="info-window-content"><div class="title"><b>' + data.nombre + "</b></div>" +
        '<div class="content">Lat: ' + self.lat + "</div>" +
        '<div class="content">Long: ' + self.long + "</div></div>";
        self.infoWindow.setContent(self.contentString);
		self.infoWindow.open(map, this);		
		self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ self.marker.setAnimation(null); }, 3550);

	});
    
    
    
    //filter markers
	this.showMarker = ko.computed(function() {
		if(this.visible() === true) {
			this.marker.setMap(map);
		} else {
			this.marker.setMap(null);
		}
		return true;
	}, this);

    
    
    
	this.animacion = function(place) {
		google.maps.event.trigger(self.marker, 'click');
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
    
    // lat-lang map  + zoom
	map = new google.maps.Map(document.getElementById('map'), {
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
