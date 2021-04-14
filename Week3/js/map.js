var map = L.map('map').setView([37.850033,-113.6500523], 2);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		let data = [
			{
				'title':'FIFA World Cup 2022',
				'description': 'Lusail Stadium; Qatar',
				'lat': 25.4209,
				'lon': 51.4904
			},
			{
				'title':'Olympics 2021',
				'description': 'Japan National Stadium; Tokyo, Japan',
				'lat': 35.6779,
				'lon': 139.7145
			},
			{
				'title':'Tour De France 2021',
				'description': 'Champs-Élysées; Paris, France',
				'lat': 48.870502,
				'lon': 2.304897
			},
			{
				'title':'The Super Bowl 2021',
				'description': 'Raymond James Stadium; Tampa, Florida',
				'lat': 27.9759,
				'lon': -82.5033
			},
			{
				'title':'Wimbledon 2021',
				'description': 'All England Club; London, England',
				'lat': 51.4343,
				'lon': 0.2145
			},
			{
				'title':'Rugby World Cup 2021',
				'description': 'Eden Park; Auckland, New Zealand',
				'lat': -36.87166318,
				'lon': 174.740163706
			}		
		]

var cuteIcon = new L.Icon({
	iconUrl: 'https://freepikpsd.com/wp-content/uploads/2019/10/map-icon-vector-png-5-Transparent-Images-Free.png',
	iconSize: [30, 30],
});


// create a feature group for markers
let myMarkers = L.featureGroup();




		data.forEach(function(item,index){
			let marker = L.marker([item.lat,item.lon],{icon: cuteIcon})
				.bindPopup(item.title+'<br>'+item.description)
				.openPopup();

			myMarkers.addLayer(marker)


			$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.title}</div>`) 


		});

myMarkers.addTo(map)


// define layers
let layers = {
	"My Markers": myMarkers
}

// add layer control box
L.control.layers(null,layers).addTo(map)

map.fitBounds(myMarkers.getBounds())


function flyToIndex(index){
	map.flyTo([data[index].lat,data[index].lon],12)
	myMarkers.getLayers()[index].openPopup()

}