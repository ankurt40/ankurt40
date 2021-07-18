function showdaydetails(evt, dayName, day) {
	var temp = parseInt(numberofdays) + 2;

	if (day < temp) {

		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className
					.replace(" active", "");
		}
		document.getElementById(dayName).style.display = "block";
		evt.currentTarget.className += " active";
		currentday = day;
		initMap(day);

	}

	else {

		let	mailId = prompt('Please enter your mail Id');
		//console.log(masterData);

		$.ajax({
					url : "http://localhost/tour/index.php?/AjaxController/generateIternary",
					type : "post",
					data : {
						mailId : mailId,
                        currentcity : currentcity,
						placesData : JSON.stringify(masterData)
					},

					cache : false,
					success : function(response) {
						alert("RESPONSE" + response);
						//alert('Iternary sent to mail id ::' + mailId);
						//window.location.href = response;
						window.open(response, '_blank');

					}

				});

		// let bar = confirm('Iternary will be sent to this mail id');
		// console.log(foo, bar);
	}

}

function removeElement(index, day) {

	masterData[day - 1].splice(index, 1);
	totalTimeSpent = 0.00;
	initMap(day);

}

function revalidatewaypoints() {
	// alert('day'+currentday);
	var array = document.getElementById('day' + currentday)
			.getElementsByTagName('input');

	// console.log('array'+JSON.stringify(array));

	var newAllData = [];

	for (var i = 0; i < array.length; i++) {
		var currentVal = array[i].id.split("placecb")[1];

		newAllData.push(masterData[currentday - 1][currentVal]);
	}
	// /alert(newAllData);
	masterData[currentday - 1] = newAllData;
	// alert(allData.length);
	initMap(currentday);
}

function initMap(day) {
	var timeline;
	console.log("day :" + day + "numberofdays"+ numberofdays);
	if (day > numberofdays) {
		// This seaction will be called when Overview button called.

		// directionsDisplay.setDirections(null);

		for (var day = 1; day <= numberofdays; day++) {

            console.log(masterData[day - 1]);
			// Generate Way Point UI
			timeline = timeline + generateWayPoint(masterData[day - 1], day);

			renderDirections(directionsRenderer[day],
					directionResponseMap[day], day);
		}

		// Display Waypoint
		var timelineid = 'timelinedataday' + day;
		document.getElementById(timelineid).innerHTML = timeline;

		// getHotelsSuggestion(currentcity);
		//plotStartPointEndPoint();

	} else {
		totalTimeSpent = 0;

		timeline = generateWayPoint(masterData[day - 1], day);

		// Display Waypoint
		var timelineid = 'timelinedataday' + day;
		document.getElementById(timelineid).innerHTML = timeline;

		// add to sortable JS
		sorttimeline(directionsService, directionsDisplay, day);

		// Diaplay path on map
		createwaypointsfromtransitcalculation(directionsService,
				directionsDisplay, masterData[day - 1], day);
	}

}

function sorttimeline(directionsService, directionsDisplay, day) {
	$(function() {
		var id = "#sortable" + day;
		$(id).sortable({
			placeholder : "ui-state-highlight",

			stop : function(event, ui) {

				setTimeout(function() {
					revalidatewaypoints();
				}, 1000);

			}

		});

		$("#sortable").disableSelection();

	});

}

function createwaypointsfromtransitcalculation(directionsService,
		directionsDisplay, datadaywise, day) {

	waypts = [];
	var arrayindex = day - 1;

	for (var i = 0; i < datadaywise.length; i++) {

		var id = "day" + day + "placecb" + i;
		var checkBox = document.getElementById(id);

		if (true == checkBox.checked) {

			waypts.push({
				location : checkBox.value,
				stopover : true

			});

		}

	}
	//console.log('waypts :: ' + JSON.stringify(waypts));

	for (var i = 0; i < waypts.length - 1; i++) {
		var from;
		var to;

		from = JSON.stringify(waypts[i]).split("\"")[3];
		to = JSON.stringify(waypts[i + 1]).split("\"")[3];

		//gettransitdetails(directionsService, directionsDisplay, from, to, i,day);

	}

	/*
	 * if (1< day & day < numberofdays) // alert(day); { var previousdayCount =
	 * masterData[day - 2].length; start = masterData[day - 2][previousdayCount -
	 * 1].pdt_display_name; end = datadaywise[datadaywise.length -
	 * 1].pdt_display_name; waypts.splice(-1, 1) } if (1 == day) // alert(day); {
	 * 
	 * end = datadaywise[datadaywise.length - 1].pdt_display_name;
	 * waypts.splice(-1, 1) }
	 * 
	 * if (day == numberofdays) // alert(day); { var previousdayCount =
	 * masterData[day - 2].length; start = masterData[day - 2][previousdayCount -
	 * 1].pdt_display_name; end = endPoint; }
	 */

	// alert("start :: " + start + " End :: " + end);
	/*
	 * for (var i = 1; i <= numberofdays; i++) {
	 * 
	 * renderDirections( directionsRenderer[i], null,i); }
	 */

	// 
	
	
	start = datadaywise[0].name;
	end = datadaywise[datadaywise.length - 1].name;
	
	waypts.splice(-1, 1);
	waypts.shift();

	//console.log(start,end,waypts);
	// alert("start"+ start+" end "+ end);
	setTimeout(function() {

		displayRoute(directionsService, directionsDisplay, start, end, waypts,
				day);

		/*
		 * document.getElementById('totaltraveltime').innerHTML = 'Total time
		 * needed :: ' + totalTimeSpent + ' mins';
		 */

	}, 500);

}


//This function plots Individual day
function displayRoute(directionsService, directionsDisplay, start, end, waypts,	day) {
	 console.log('Start :: ' + JSON.stringify(start));
	 console.log('End :: ' + JSON.stringify(end));
	 console.log('Waypoints :: ' + JSON.stringify(waypts));
	var routeColour;
	var icon;
	if (day == 1) {
		routeColour = 'red';
		icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png'
	} else if (day == 2) {
		routeColour = 'blue';
		icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png'
	} else if (day == 3) {
		routeColour = 'green';
		icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png'
	} else if (day == 4) {
		routeColour = 'yellow';
		icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_yellow.png'
	}

	directionsDisplay.setOptions({
		polylineOptions : {
			strokeColor : routeColour  ,draggable : true
		}
		});

	
	directionsDisplay.setRouteIndex(day);
	
	directionsService
			.route(
					{
						origin : start,
						destination : end,
						waypoints : waypts,
						optimizeWaypoints : false,

						travelMode : 'WALKING'
					},
					function(response, status) {
						if (status === 'OK') {

							directionsDisplay.setDirections(response);
							directionResponseMap[day] = response;

							// Below code will be called to render all overview
							// renderDirections(response ,day);

						} else {
							window
									.alert(' CalculateAndDisplayRoute  Directions request failed due to  '
											+ status);
						}

					});

}

function displayRoutePolyline() {
	var flightPlanCoordinates = [ {
		lat : 37.772,
		lng : -122.214
	}, {
		lat : 21.291,
		lng : -157.821
	}, {
		lat : -18.142,
		lng : 178.431
	}, {
		lat : -27.467,
		lng : 153.027
	} ];
	var flightPath = new google.maps.Polyline({
		path : flightPlanCoordinates,
		geodesic : true,
		strokeColor : '#FF0000',
		strokeOpacity : 1.0,
		strokeWeight : 2
	});

	flightPath.setMap(map);
}

function renderDirections(directionsRenderer, result, day) {
	 //console.throw("renderDirections");
	var routeColour;
	var icon;
	if (day == 1) {
		routeColour = 'red';
		icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png'
	} else if (day == 2) {
		routeColour = 'blue';
		icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png'
	} else if (day == 3) {
		routeColour = 'green';
		icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png'
	} else if (day == 4) {
		routeColour = 'yellow';
		icon = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_yellow.png'
	}

	directionsRenderer.setOptions({
		polylineOptions : {
			strokeColor : routeColour, draggable : true
		},
		markerOptions : {
			icon : icon
		}
	});
	setTimeout(function() {

		directionsRenderer.setMap(map);
		directionsRenderer.setDirections(result);

	}, 500);

}

function showTransitDetails(id, day) {
	var popup = document.getElementById("day" + day + "transitPopup" + id);
	popup.classList.toggle("show");
}

function getHotelsSuggestion(city) {
	var hotelList = [];
	// alert('currentcity for hotel search ajax is :'+ currentcity);
	$
			.ajax({
				url : "http://localhost/new-project/index.php?/AjaxController/suggesthotels/"
						+ currentcity,
				type : "POST",
				data : "currentcity=" + currentcity,
				cache : false,
				success : function(response) {

					hotelList = JSON.parse(response);

					// console.log(hotelList);
					plotHotels(hotelList);

				}
			});

}

function plotHotels(hotelList) {
	// alert(hotelList.length);
	// var bounds = new google.maps.LatLngBounds();
	var infoWindowArray = [];
	var marker;
	var infowindow = new google.maps.InfoWindow({
		maxWidth : 150
	});

	for (var i = 0; i < hotelList.length; i++) {
		var position = {
			lat : parseFloat(hotelList[i][8]),
			lng : parseFloat(hotelList[i][9])
		};

		// console.log(contentString);
		// bounds.extend(position);

		marker = new google.maps.Marker(
				{
					position : position,
					map : map,
					title : hotelList[i][3],
					icon : 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png',
					animation : google.maps.Animation.DROP
				});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				var contentString = '<div id="content">' + '</div>'
						+ '<div><img  height="120" width="120" src="'
						+ hotelList[i][10] + '"></div>' + '<h6>'
						+ hotelList[i][3] + '</h6>' + '<div id="bodyContent">'
						+ '</div>';

				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			}
		})(marker, i));

	}
	// map.fitBounds(bounds);
}

function plotStartPointEndPoint() {
	// alert(hotelList.length);
	// var bounds = new google.maps.LatLngBounds();
	var infoWindowArray = [];
	var marker;
	var infowindow = new google.maps.InfoWindow({
		maxWidth : 150
	});

	for (var i = 0; i < 2; i++) {
		if (i == 0) {
			var position = {
				lat : 49.0096906,
				lng : 2.5479245
			};
			titleStr = 'Start of the Trip';
			icon = 'https://www.google.com/mapfiles/ms/icons/green.png';
		} else {
			var position = {
				lat : 48.84430380000001,
				lng : 2.3743773
			};
			titleStr = 'Trip End';
			icon = 'https://www.google.com/mapfiles/ms/icons/red.png';
		}

		marker = new google.maps.Marker({
			position : position,
			map : map,
			title : titleStr,
			icon : icon,
			animation : google.maps.Animation.DROP
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				var contentString = '<div id="content">' + '</div>'
						+ '<div><img  height="120" width="120" src="'
						+ hotelList[i][10] + '"></div>' + '<h6>'
						+ hotelList[i][3] + '</h6>' + '<div id="bodyContent">'
						+ '</div>';

				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			}
		})(marker, i));

	}
	// map.fitBounds(bounds);
}

function timeConvert(n) {
	
	
	var num = n;
	var hours = (num / 60);
	var rhours = Math.floor(hours);
	var minutes = (hours - rhours) * 60;
	var rminutes = Math.round(minutes);
 var finalStr='';
  if (rhours != 0)
	  {
	  finalStr += rhours + " hr ";
	  }
 if ( rminutes != 0)
	 {
	 finalStr +=  rminutes + " mins"
	 }
	return  finalStr;
	}



