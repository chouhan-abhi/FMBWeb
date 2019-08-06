var list =document.getElementById('mainRoutes');
function getText(){	
	var origin = document.getElementById("formRoute").elements[0].value;
	var destination = document.getElementById("formRoute").elements[1].value;
	


	var link ='https://maps.googleapis.com/maps/api/directions/json?origin='+ origin +'&destination='+ destination +'&key=AIzaSyCqms7EP0PjAoV7ZxKg3PbIB2-d3EYpw2w' 
	fetch(link)
	.then((res) => res.json())
	.then(function(data){
		console.log(data);
		var status = data.status;

		if(status == "OK"){
			var summary = data.routes[0].summary;
			document.getElementById('valueTime').innerHTML = data.routes[0].legs[0].distance.text;
			document.getElementById('valueDistance').innerHTML = data.routes[0].legs[0].duration.text;
			document.getElementById('routeDetail').innerHTML = summary;
			
			if(summary == 'Hoshangabad Rd'){
				document.getElementById('busNo').innerHTML = 'TR4';
				var getInput = "TR4";
  				localStorage.setItem("parseMap",getInput);
			}
			else if( summary == 'Kalibadi Rd and Piplani Rd' || summary == 'Kalibadi Rd' ){
				document.getElementById('busNo').innerHTML = '307';
				var getInput = "303";
  				localStorage.setItem("parseMap",getInput);
			}
			else if( summary == 'NH27'){
				document.getElementById('busNo').innerHTML = '309';
			}
			else if( summary == 'Ayodhya Bypass Rd'){
				document.getElementById('busNo').innerHTML = '309';
			}
			else if( summary == 'NH46 and Ayodhya Bypass Rd'){
				document.getElementById('busNo').innerHTML = 'TR4 > 306';
				var getInput = "TR4";
  				localStorage.setItem("parseMap",getInput);
			}
			else if( summary == 'VIP Road'){
				document.getElementById('busNo').innerHTML = 'TR1';
			}
			else if( summary == 'Kolar Rd'){
				document.getElementById('busNo').innerHTML = 'SR1';
			}	
			else if( summary == 'Habibganj Rd/Hoshangabad Rd/Obedulla Ganj Rd'){
				document.getElementById('busNo').innerHTML = '307 or TR1';

			}
			else if( summary == 'DRM Rd/Saket Nagar Main Rd'){
				document.getElementById('busNo').innerHTML = 'SR-2';
			}
			else if( summary == 'NH46'){
				document.getElementById('busNo').innerHTML = 'TR4 > 307';
			}
			else if( summary == 'Obedulla Ganj Rd and Hoshangabad Rd'){
				document.getElementById('busNo').innerHTML = 'SR-2';
			}
			else if( summary == 'Hoshangabad Rd and Obedulla Ganj Rd'){
				document.getElementById('busNo').innerHTML = 'SR-2';
			}
			else{
				document.getElementById('routeDetail').innerHTML = 'We are unable to search this query';	
			}
			alert('updated');

			document.getElementById('busNo').addEventListener('click', function(){
				window.open("Home.html","_self");
			});
		}
		else{
			document.getElementById('routeDetail').innerHTML = 'Please, Enter valid location';
		}
	});
}
	


