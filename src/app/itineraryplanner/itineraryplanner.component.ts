import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from '../place';
import { PlaceService } from '../place.service';
import * as L from 'leaflet';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
//import {GoogleMapsAPIWrapper} from '@agm/core';


@Component({
  selector: 'app-itineraryplanner',
  templateUrl: './itineraryplanner.component.html',
  styleUrls: ['./itineraryplanner.component.css']
})
export class ItineraryplannerComponent implements OnInit, AfterViewInit {


  title = 'Iternary Planner';
  places: Place[][] = [];
  place = new String;
  start: String = "";
  end: String = "";
  numberofdays: number = 1;
  counter = Array;
  totalTimeSpent: number = 1;
  private map;


  //Creating tab buttons
  //var tabbuttonsstr='';
  tabdata = '';
  time: Date = new Date();
  currentday = 0;
  waypts = [];
  markers = [];
  latlng = [];

  directionResponseMap = {};
  //alert(JSON.stringify(alldata));
  //directionsService = new google.maps.DirectionsService;
  //directionsDisplay = new google.maps.DirectionsRenderer;
  directionsRenderer = [];

  constructor(private http: HttpClient,
    private placeService: PlaceService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngOnInit(): void {

    this.placeService.loadPlaces.subscribe(data => {
      this.loadPlaces();
    });

    this.loadPlaces();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }


  loadPlaces() {
    this.place = localStorage.getItem("place");
    this.start = localStorage.getItem("start");
    this.end = localStorage.getItem("end");
    this.numberofdays = parseInt(localStorage.getItem("numberofdays"));

    this.places = [];
    this.placeService.getAllPlaces(this.place, this.start, this.end, this.numberofdays).subscribe((dayArray: any) => {

      var day = <Array<any>>dayArray;
      for (var i: number = 0; i < day.length; i++) {
        this.places[i] = [];
        day[i].forEach((element: Place) => {
          this.places[i].push(element);
        });

      }

      //Load the first day
      this.initMap1(0);
      this.showdaydetails(0);

    },
      (error) => {
        var i = 0;
        console.log(error);

      });
  }

  initMap1(day) {
    this.currentday = day;
    this.time.setHours(9);
    this.time.setMinutes(0);
    //var timeline;
    console.log('init map called for Day' + day);

    if (day > this.numberofdays) {

      for (var i = 0; i <= this.numberofdays; i++) {
        this.renderDirections(this.directionsRenderer[i],
          this.directionResponseMap[i], i);
      }

      //getHotelsSuggestion(currentcity);
      //plotStartPointEndPoint();

    } else {
      this.totalTimeSpent = 0;

      //sorttimeline(directionsService, directionsDisplay, day);

      // Diaplay path on map
      this.displayRoute(day);
    }

  }




  // gettransitdetails(start,end,count,day) {
  //        var tempTravalTime;
  //        var timeSpentinthisPlace;

  //             // timeSpentinthisPlace = parseInt(masterData[day][count].duration_of_visit,10);
  //             // alert("getting transti details start : "+start+ " " + end);
  //             this.directionsService.route({
  //             origin: start,
  //             destination: end,
  //             provideRouteAlternatives: true,
  //             travelMode: 'TRANSIT'
  //          }, function(response, status) {
  //            if (status === 'OK') {
  //         	   //var route = response.routes[0];
  //         	   var stepsdata =response.routes[0].legs[0].steps;

  //          	  var stepdata  ='<ul>';
  //          	  tempTravalTime=JSON.stringify(response.routes[0].legs[0].duration.text).replace(/(^")|("$)/g, '');

  //          	 document.getElementById('day'+day+'duration'+count).innerHTML=tempTravalTime;
  //          	 var timeinMin;
  // 				if (tempTravalTime.includes("hour" ) &&  tempTravalTime.includes("min" )  )
  // 						{
  // 					 var hrs =tempTravalTime.split("h")[0]*60  ;
  // 				     var min =	 tempTravalTime.split("min")[0].split(" ")[0]*1;

  // 					timeinMin =hrs+min;

  // 					}
  // 				else
  // 				{
  // 					var min =	 tempTravalTime.split("min")[0].split(" ")[0]*1;
  // 					timeinMin =min;

  // 					}
  //          	 this.totalTimeSpent=this.totalTimeSpent+timeinMin+timeSpentinthisPlace;

  //                  for (var i = 0; i < stepsdata.length; i++) {


  //         		   if ('WALKING' == JSON.stringify(stepsdata[i].travel_mode).replace(/(^")|("$)/g, ''))
  //         		   {
  //         			   stepdata += '<li><img  height="14" width="11" src="http://127.0.0.1:8000/static/images/icons/manwaking15x25.png">'+
  //         			   ' '+JSON.stringify(stepsdata[i].duration.text).replace(/(^")|("$)/g, '')+' '+
  //         			   ' | '+ JSON.stringify(stepsdata[i].instructions).replace(/(^")|("$)/g, '').split(',')[0]+
  //         			   '</li>';

  //         		   }
  //         		   else if ('TRANSIT' == JSON.stringify(stepsdata[i].travel_mode).replace(/(^")|("$)/g, ''))
  //         		   {
  //             		stepdata +='<li><img  height="14" width="11" src="'+JSON.stringify(stepsdata[i].transit.line.vehicle.icon).replace(/(^")|("$)/g, '')+'">'+
  //         			'-'+ JSON.stringify(stepsdata[i].transit.line.short_name).replace(/(^")|("$)/g, '')+
  //         		        ' | '+JSON.stringify(stepsdata[i].transit.arrival_stop.displayname).replace(/(^")|("$)/g, '')+
  //         		   	   '</li>';

  //                      }

  //         		   }

  //           	 stepdata+= '</ul>';
  //           	// alert(stepdata);
  //         	     document.getElementById('day'+day+'transitPopup'+count).innerHTML=stepdata;

  //             	} else {
  //          	window.alert('Error Found When Fetching Transit Details between ' +start +" and "+ end +" . And the error is" +status);
  //          	}
  //          	});

  //   }

  renderDirections(directionsRenderer, result, day) {
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
      polylineOptions: {
        strokeColor: routeColour, draggable: true
      },
      markerOptions: {
        icon: icon
      }
    });
    setTimeout(function () {

      directionsRenderer.setMap(this.map);
      directionsRenderer.setDirections(result);

    }, 500);

  }

  showdaydetails(day) {
    console.log("Day Name " + day);
    var temp = this.numberofdays + 2;
    var dayName = 'day' + day;

    //This block is to display data per day
    if (day < temp) {
      // var i, tabcontent, tablinks;


      // tabcontent = document.getElementsByClassName("tabcontent");
      // for (i = 0; i < tabcontent.length; i++) {
      // 	tabcontent[i].style.display = "none";
      // }

      // tablinks = document.getElementsByClassName("tablinks");
      // for (i = 0; i < tablinks.length; i++) {
      // 	tablinks[i].className = tablinks[i].className
      // 			.replace(" active", "");
      // }

      // document.getElementById(dayName).style.display = "block";
      //evt.currentTarget.className += " active";




      this.currentday = day;
      this.initMap1(day);
    }

    //This block is for download
    else {

      let mailId = prompt('Please enter your mail Id');
      //console.log(masterData);
      // $.ajax({
      // 			url : "http://localhost/tour/index.php?/AjaxController/generateIternary",
      // 			type : "post",
      // 			data : {
      // 				mailId : mailId,
      //                     currentcity : currentcity,
      // 				placesData : JSON.stringify(masterData)
      // 			},

      // 			cache : false,
      // 			success : function(response) {
      // 				alert("RESPONSE" + response);
      // 				//alert('Iternary sent to mail id ::' + mailId);
      // 				//window.location.href = response;
      // 				window.open(response, '_blank');
      // 			}
      // 		});

      // let bar = confirm('Iternary will be sent to this mail id');
      // console.log(foo, bar);
    }

  }

  removeElement(index, day) {

    this.places[day - 1].splice(index, 1);
    this.totalTimeSpent = 0.00;
    this.initMap1(day);

  }

  revalidatewaypoints() {
    // alert('day'+currentday);
    var array = document.getElementById('day' + this.currentday)
      .getElementsByTagName('input');

    // console.log('array'+JSON.stringify(array));

    var newAllData = [];

    for (var i = 0; i < array.length; i++) {
      var currentVal = array[i].id.split("placecb")[1];

      newAllData.push(this.places[this.currentday - 1][currentVal]);
    }
    // /alert(newAllData);
    this.places[this.currentday - 1] = newAllData;
    // alert(allData.length);
    this.initMap1(this.currentday);
  }


  // sorttimeline(directionsService, directionsDisplay, day) {
  //   console.log(directionsDisplay);
  // 	$(function() {
  // 		var id = "#sortable" + day;
  // 		$(id).sortable({
  // 			placeholder : "ui-state-highlight",
  // 			stop : function(event, ui) {
  // 				setTimeout(function() {
  // 					this.revalidatewaypoints();
  // 				}, 1000);
  // 			}
  // 		});
  // 		$("#sortable").disableSelection();
  // 	});
  // }


  displayRoute(day) {
    let datadaywise = [];
    datadaywise = this.places[day];
    this.waypts = [];
    console.log('display route' + day);
    var iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';

    var iconType = L.icon({
      iconUrl: iconUrl,
      shadowUrl: '',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    for (var i = 0; i < datadaywise.length; i++) {

      this.latlng = [];
      this.latlng = [parseFloat(datadaywise[i].lat), parseFloat(datadaywise[i].lng)];
      this.waypts.push(this.latlng);

      L.NumberedDivIcon = L.Icon.extend({
        options: {
          // EDIT THIS TO POINT TO THE FILE AT http://www.charliecroom.com/marker_hole.png (or your own marker)
          iconUrl: '',
          number: '',
          shadowUrl: null,
          iconSize: new L.Point(25, 41),
          iconAnchor: new L.Point(13, 41),
          popupAnchor: new L.Point(0, -33),
          /*
          iconAnchor: (Point)
          popupAnchor: (Point)
          */
          className: 'leaflet-div-icon'
        },
  
        createIcon: function () {

      //     <span class="fa-stack">
      //     <!-- The icon that will wrap the number -->
      //     <span class="fa fa-circle-o fa-stack-2x"></span>
      //     <!-- a strong element with the custom content, in this case a number -->
      //     <strong class="fa-stack-1x">
      //         2    
      //     </strong>
      // </span>



      var fa_stack_div = document.createElement('span');
      fa_stack_div.setAttribute("class", "fa_stack");

      var icon = document.createElement('span');
      icon.setAttribute("class", "fas fa-map-marker fa-3x");
      icon.setAttribute("style", "color:#4c6ef5");

      var number = document.createElement('strong');
      number.setAttribute("class", "fa-stack-1x");
      number.setAttribute("style", "color:white;top: 8%");
      number.innerHTML = this.options['number'] || '';

      // div.appendChild(img);
      fa_stack_div.appendChild(icon);
      fa_stack_div.appendChild(number);
      this._setIconStyles(fa_stack_div, 'icon');   
      return fa_stack_div;
        },
  
        //you could change this to add a shadow like in the normal marker if you really wanted
        createShadow: function () {
          return null;
        }
      });
    
  

      // var iconRed = L.icon({
      //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      //   shadowUrl: '',
      //   iconSize: [25, 41],
      //   iconAnchor: [12, 41],
      //   popupAnchor: [1, -34],
      //   shadowSize: [41, 41]
      // });

      // var marker = L.marker(
      //   this.latlng,
      //   {
      //     icon: iconRed,
      //     title: String(datadaywise[i].displayname),
      //     alt: i
      //   }
      // );

      //Note that the text could also be letters instead of numbers if that's more appropriate
      var marker = new L.Marker(this.latlng, {
        icon:	new L.NumberedDivIcon({number: i+1})
      });

      marker.addTo(this.map);
      //L.marker(latlng, {icon: marker}).addTo(map);

      marker.addTo(this.map).bindPopup("<div class='card' style='width:200px'>  <img class='card-img-top'  src='" + datadaywise[i].image + "' alt='Card image' style='width:100%'>   <div class='card-body'>   <a  href='#' class='card-text'>" + String(datadaywise[i].displayname) + "</a> </div>  </div>");
      this.markers.push(marker);

    }
    console.log(this.waypts);
    //L.Routing.control({  waypoints: waypts ,icon: iconType}).addTo(map);

    var polyline = L.polyline(this.waypts).addTo(this.map);
    var polyline = L.polyline(this.waypts);
    const poly = [polyline];
    const bounds = poly.map(p => p.getBounds());
    this.map.fitBounds(bounds);

  }


  timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    var finalStr = '';
    if (rhours != 0) {
      finalStr += rhours + " hr ";
    }
    if (rminutes != 0) {
      finalStr += rminutes + " mins"
    }
    return finalStr;
  }

  
}
