import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { PlaceService } from 'src/app/place.service';

@Component({
  selector: 'app-universalsearch',
  templateUrl: './universalsearch.component.html',
  styleUrls: ['./universalsearch.component.css']
})
export class UniversalsearchComponent implements OnInit {

  constructor(
    public placeService:PlaceService,
    private router: Router)
  {

   
  
  }

  title = 'tourweb';
  citysearch = "Mumbai";
  start = "";
  end = "";
  numberofdays="2";
  lastkeydown1: number = 0;
  ngOnInit(): void {
  }
 
  cityList: any[] = [];

  onChange(newValue) {
    console.log(newValue);
    this.citysearch = newValue;    
}


getCitySuggestion(event)
{ 
  this.citysearch=event;

  if (this.citysearch.length > 0) { 
      this.cityList = [];
     
       //Get the user data from users.json
       this.placeService.getCitySuggestion(this.citysearch).subscribe(
        data => {
          Object.assign(this.cityList, data);
        },
        error => {
          console.log("Something wrong here");
        });    
    
  }
}

  getDestination() {      

    if (this.citysearch.trim()  != "") {        
            
      localStorage.setItem("place",this.citysearch); 
      localStorage.setItem("start",this.start);  
      localStorage.setItem("end",this.end); 
      localStorage.setItem("numberofdays",this.numberofdays); 

      this.placeService.loadPlaces.next(true);
      this.router.navigate(["/planner"] ); 
     

  }
    else {
      alert('Provide a valid place name');
    }
    document.getElementById('exampleModalCenter')?.click();
     }   
     



}
