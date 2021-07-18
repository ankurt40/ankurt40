function showdaydetails(evt, dayName, day) {
	// alert(JSON.stringify(dayName));
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(dayName).style.display = "block";
	evt.currentTarget.className += " active";
	currentday = day;
	initMap(day);
}

function removeElement(index, day) {

	masterData[day - 1].splice(index, 1);

	totalTimeSpent = 0.00;
	initMap(day);

}

function revalidatewaypoints(directionsService, directionsDisplay) {
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

	if (day > numberofdays) {
		// alert("Overview");
		// alert(JSON.stringify(directionResponseMap));

		directionsDisplay.setDirections(null);
		for (var i = 1; i <= numberofdays; i++) {

			renderDirections(directionsRenderer[i], directionResponseMap[i], i);
		}

		// getHotelsSuggestion(directionsDisplay, currentcity);
		plotStartPointEndPoint();

	} else {
		totalTimeSpent = 0;

		loadwaypoints(masterData[day - 1], directionsService,
				directionsDisplay, day);
	}

}

function sorttimeline(directionsService, directionsDisplay, day) {
	$(function() {
		var id = "#sortable" + day;
		$(id).sortable({
			placeholder : "ui-state-highlight",

			stop : function(event, ui) {

				setTimeout(function() {
					revalidatewaypoints(directionsService, directionsDisplay);
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
	console.log('waypts :: ' + JSON.stringify(waypts));

	for (var i = 0; i < waypts.length - 1; i++) {
		var from;
		var to;

		from = JSON.stringify(waypts[i]).split("\"")[3];
		to = JSON.stringify(waypts[i + 1]).split("\"")[3];

		gettransitdetails(directionsService, directionsDisplay, from, to, i,
				day);

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
	 * renderDirections( directionsRenderer[i], null,i);
	 *  }
	 */

	// 
	start = datadaywise[0].pdt_display_name;
	end = datadaywise[datadaywise.length - 1].pdt_display_name;
	// waypts.splice(-1, 1)
	waypts.shift();

	// alert("start"+ start+" end "+ end);
	setTimeout(
			function() {

				displayRoute(directionsService, directionsDisplay, start, end,
						waypts, day);
				document.getElementById('totaltraveltime').innerHTML = 'Total time needed :: '
						+ totalTimeSpent + ' mins';

			}, 500);

}

function displayRoute(directionsService, directionsDisplay, start, end, waypts,
		day) {
	// console.log('Start :: ' + JSON.stringify(start));
	// console.log('End :: ' + JSON.stringify(end));
	// console.log('Waypoints :: ' + JSON.stringify(waypts));
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
			strokeColor : routeColour
		},
		markerOptions : {
			icon : icon
		}
	});

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

function renderDirections(directionsRenderer, result, day) {
	// alert(result +" day " + day);
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
			strokeColor : routeColour
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

function getHotelsSuggestion(directionsDisplay, city) {
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

function plotPlaces(placesList) {
	// alert(hotelList.length);
	// var bounds = new google.maps.LatLngBounds();
	var infoWindowArray = [];
	var marker;
	var infowindow = new google.maps.InfoWindow({
		maxWidth : 350
	});

	for (var i = 0; i < placesList.length; i++) {
		// alert(JSON.stringify(placesList[i]['pdt_lat']));
		var position = {				
			lat : parseFloat(placesList[i]['pdt_lat']),
			lng : parseFloat(placesList[i]['pdt_lng'])
		};

		console.log(position);
		// bounds.extend(position);

		marker = new google.maps.Marker(
				{
					position : position,
					map : map,
					title : placesList[i]['pdt_display_name'],
					icon : 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png',
					animation : google.maps.Animation.DROP
				});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
											
				var contentString = "<div class='map_info_wrapper'>" +
						"<div class='img_wrapper'><img  height='50' width='50' src="+placesList[i]['pdt_place_image']+"></div>"+
									
				"<div class='property_content_wrap'>"+
			       
			    "<div class='property_title'>"+
			    "<span>"+placesList[i]['pdt_display_name']+"</span>"+
			    "</div>"+

			    /*"<div class='property_price'>"+
			    "<span>"+placesList[i]['pdt_display_name']+"</span>"+
			    "</div>"+

			    "<div class='property_bed_type'>"+
			    "<span>"+placesList[i]['pdt_display_name']+"</span>"+
			    "<ul><li>"+placesList[i]['pdt_display_name']+"</li></ul>"+
			    "</div>"+

			    "<div class='property_listed_date'>"+
			    "<span>Listed on "+placesList[i]['pdt_display_name']+"</span>"+
			    "</div>"+*/
			    "<div></div>";

				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			}
		})(marker, i));

	}
	// map.fitBounds(bounds);
}


