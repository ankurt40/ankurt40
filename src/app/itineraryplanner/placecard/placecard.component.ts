import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'src/app/place';

@Component({
  selector: 'app-placecard',
  templateUrl: './placecard.component.html',
  styleUrls: ['./placecard.component.css']
})
export class PlacecardComponent implements OnInit {

  constructor() { }

  @Input()
  places: Place[];

  markers = [];
  
  ngOnInit(): void {
  }


  markerFunction(id){
    for (var i in this.markers){
        var markerID = this.markers[i].options.title;

         if (markerID == id){
          this.markers[i].openPopup();
              };
       }
  }



}
