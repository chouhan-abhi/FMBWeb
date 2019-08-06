
function initMap(){
		var toggle=true;
		document.getElementById('busSearch').addEventListener('click', function(){
			if(toggle == false){
				document.getElementById('searchBar').style.display='none';
				toggle=true;
			}
			else{
				document.getElementById('searchBar').style.display='block';
				toggle=false;
			}

		});
    
	//start map
		var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: 23.231688, lng: 77.432965},
          disableDefaultUI: true
        });



	getLocation();
	//Get users location
	function getLocation(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(userMarker);
		}
		else{
			alert('Please, Enable your location');
		}
	}

	var userLat;
	var userLong;
	//marker function
	function userMarker(position){

		//userLong = 23.231790;  position.coords.longitude;
		//userLat = 77.432985;   position.coords.latitude;
		var marker = new google.maps.Marker({
			position:{lat:23.231790, lng:77.432985},
			map:map,
			icon:'marker.png'
		});
		marker.addListener('click', function(){
			marker.setAnimation(google.maps.Animation.BOUNCE);
		});
		
	}

	//custom marker
	  var image = {
        url: 'busstop.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(64,64),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(32, 64)
        };

	//Bus stop marker function
	function busStop(lat ,long, info){
		var stop = new google.maps.Marker({
			position:{lat:lat, lng:long},
			map:map,
			icon:image
		});

		var infoWindow = new google.maps.InfoWindow({
			content:info
		});
		stop.addListener('click', function(){
			infoWindow.open(map,stop);
			routeToStop();
		});
		
	}	

	/*var url= {'https://roads.googleapis.com/v1/snapToRoads',{
		path:path.join('|'),
		interpolate:true,
		key:AIzaSyCqms7EP0PjAoV7ZxKg3PbIB2-d3EYpw2w}
	}*/


  	var pathValues = [];

	function routeToStop(){	
		var APILink = 'https://maps.googleapis.com/maps/api/directions/json?origin=23.232927859523198,77.43420123161893&destination=23.233266300000004,77.4345122&key=AIzaSyB0TXUy-6rMSBJCo_EanmOhjyp1CxqnhDM';
	  	fetch(APILink)
	  	.then((res) => res.json())
		.then(function(data){
				findingWayToStop(data);
		    	drawSnappedPolyline();
			});
	}

	function runSnapToRoad(path) {
	    for (var i = 0; i < path.getLength(); i++) {
	    pathValues.push(path.getAt(i).toUrlValue());
	  }
	}
	document.getElementById('tr4').addEventListener('click', BUStr4);
	document.getElementById('Bus306').addEventListener('click', BUS306);
	document.getElementById('Bus303').addEventListener('click', BUS303);


	var userMapInfo = localStorage.getItem("parseMap");
	if(userMapInfo == 'TR4'){
		userMapInfo = 'done';
		BUStr4();
	}
	if(userMapInfo == '303'){		
		userMapInfo = 'done';
		BUS303();
	}

	function BUStr4(){
		fetch('https://roads.googleapis.com/v1/snapToRoads?path=23.232946, 77.434180|23.234118, 77.437973| 23.232761, 77.441868|23.229588, 77.442031|23.224294, 77.442091|23.221894, 77.442120|23.216243, 77.441952|23.210681, 77.443930|23.204160, 77.445968|23.199811, 77.447683|23.192204, 77.450287|23.183787, 77.454531|23.178392, 77.457924|23.171309, 77.462403|23.168360, 77.464495|23.165297, 77.466757|23.161695, 77.469489|23.161695, 77.469489|23.151431, 77.476945|23.144689, 77.482077|23.136259, 77.488476|23.136259, 77.488476|23.116576, 77.503087|23.105958, 77.510643|23.103875, 77.512080|23.096424, 77.517795&interpolate=true&key=AIzaSyCqms7EP0PjAoV7ZxKg3PbIB2-d3EYpw2w')
		.then((res) => res.json())
		.then(function(data){
				processSnapToRoadResponse(data);
		    	drawSnappedPolyline(1);
			});
		document.getElementById('ackBlack').style.display='block';
		document.getElementById('searchBar').style.display='none';
	}


	function BUS303(){
		fetch('https://roads.googleapis.com/v1/snapToRoads?path=23.232112, 77.432208|23.231570, 77.432788|23.232782, 77.434054|23.233423, 77.435116|23.234113, 77.437980|23.232970, 77.441886|23.232289, 77.441993|23.231737, 77.446274|23.231861, 77.450321|23.242382, 77.450201|23.252348, 77.450040|23.251678, 77.454739|23.251570, 77.456123|23.268464, 77.457958|23.268444, 77.457936|23.270445, 77.458247|23.273342, 77.460564|23.275698, 77.463708&interpolate=true&key=AIzaSyCqms7EP0PjAoV7ZxKg3PbIB2-d3EYpw2w')
		.then((res) => res.json())
		.then(function(data){
				processSnapToRoadResponse(data);
		    	drawSnappedPolyline(2);
			});

		document.getElementById('ackBlue').style.display='block';
		document.getElementById('searchBar').style.display='none';
	}

	function BUS306(){
		fetch('https://roads.googleapis.com/v1/snapToRoads?path=23.230121, 77.433603|23.232822, 77.434097|23.232861, 77.441950|23.231895, 77.446499|23.231678, 77.450362|23.231501, 77.459717|23.229568, 77.459760|23.229568, 77.466197|23.231994, 77.467292|23.232033, 77.471776|23.236233, 77.472656|23.239442, 77.472956|23.244371, 77.472871|23.248827, 77.470918|23.249320, 77.476154|23.250798, 77.479394|23.255983, 77.478428|23.260931, 77.474995|23.275026, 77.464180&interpolate=true&key=AIzaSyCqms7EP0PjAoV7ZxKg3PbIB2-d3EYpw2w')
		.then((res) => res.json())
		.then(function(data){
				processSnapToRoadResponse(data);
		    	drawSnappedPolyline(3);
			});

		document.getElementById('ackRed').style.display='block';
		document.getElementById('searchBar').style.display='none';
	}

	var snappedCoordinates = [];
	var reverseCoordinates = [];
	var th;	

	function processSnapToRoadResponse(results) {
        for (var i = 1; i < results.snappedPoints.length; i++) {
    	  th =results.snappedPoints.length -i;

    	  var latlong ={lat: results.snappedPoints[i].location.latitude, lng: results.snappedPoints[i].location.longitude};      
          snappedCoordinates.push(latlong);
          
          var reverselatlong ={lat: results.snappedPoints[th].location.latitude, lng: results.snappedPoints[th].location.longitude};      
          reverseCoordinates.push(reverselatlong);
          //distanceBCoords(23.231790, 77.432985, coordlat, coordlong);
        }	
    }

    function animateCircle(line) {
        var count = 0;
        window.setInterval(function() {
        count = (count + 1) % 400;

            var icons = line.get('icons');
            icons[0].offset = (count / 2) + '%';
            line.set('icons', icons);
        	}, 500);
      	}

    // Draws the snapped polyline (after processing snap-to-road response).
	function drawSnappedPolyline(caseNo) {
		var colorValue;
		var title;
		if (caseNo == 1) {
			title = 'BUS tr4';
		   colorValue = '#000000';
	    }
	    else if(caseNo == 2){
			title = 'BUS 303';
	    	colorValue = '#0D47A1';
	    }
	    else{
			title = 'BUS 306';
	    	colorValue = '#C51162';
	    }
	    var lineSymbol = {
	          path: google.maps.SymbolPath.CIRCLE,
	          scale: 7,
          	  title:title,
	          strokeColor: colorValue
	        };

        var flightPath = new google.maps.Polyline({
          path: snappedCoordinates,
          geodesic: true,
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
          strokeColor: colorValue,
          strokeOpacity: 1.0,
          strokeWeight: 4
        });

        var reversePath = new google.maps.Polyline({
          path: reverseCoordinates,
          geodesic: true,
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
          title:title,
          strokeColor: colorValue,
          strokeOpacity: 1.0,
          strokeWeight: 4
        });

       // busStop(nearestLat, nearestLong, msg);
        animateCircle(flightPath);
        animateCircle(reversePath);
        flightPath.setMap(map);
        reversePath.setMap(map);
        snappedCoordinates = [];
        reverseCoordinates = [];
	}

	
	var nearestLat;
	var nearestLong;
	var distance = 5.0000;
	var msg;
	
	function degreesToRadians(degrees) {
	  return degrees * Math.PI / 180;
	}

	function distanceBCoords(lat1, lon1, lat2, lon2) {
	  var earthRadiusKm = 6371;
	  var latitude2 = lat2;
	  var dLat = degreesToRadians(lat2-lat1);
	  var dLon = degreesToRadians(lon2-lon1);

	  lat1 = degreesToRadians(lat1);
	  lat2 = degreesToRadians(lat2);

	  var a = Math.sin(dLat/2) * Math.sin(dLat/2)  +Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var difference = earthRadiusKm * c;
	  

	  if(distance>difference){
	  	distance= difference;
	  	nearestLong=lon2;
	  	nearestLat=latitude2;
	  	var inMeters = (distance*1000); 
	  	msg = '<h2>nearest stop<br>' + inMeters + 'meters away </h2>';
	  }
	}

}