import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transitdetails',
  templateUrl: './transitdetails.component.html',
  styleUrls: ['./transitdetails.component.css']
})
export class TransitdetailsComponent implements OnInit {

  @Input()
  index : number;

  @Input()
  currentday : number;

  constructor() { }

  ngOnInit(): void {
  }


   
showTransitDetails(id, day) {
	var popup = document.getElementById("day" + day + "transitPopup" + id);
	popup.classList.toggle("show");
}

}
