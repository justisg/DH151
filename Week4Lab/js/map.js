// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
let path = "data/PubLibs.csv";
let markers = L.featureGroup();

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
    readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}

function mapCSV(data){
	
    let circleOptions = {
        radius: 6,
        weight: 1,
        color: 'white',
        fillColor: 'blue',
        fillOpacity: 1
    }

	data.data.forEach(function(item,index){
		let marker = L.circleMarker([item.latitude,item.longitude],circleOptions)
        .on('mouseover',function(){
			this.bindPopup(`${item.title}<br><img src="${item.thumbnail_url}">`).openPopup()
        })

		markers.addLayer(marker)

	$('.sidebar').append(`<img src="${item.thumbnail_url}" onClick="panToImage(${index})">`)
	})

	markers.addTo(map);

	map.fitBounds(markers.getBounds());	
}

function panToImage(index){
	map.setZoom(17);
	map.panTo(markers.getLayers()[index]._latlng);
}

