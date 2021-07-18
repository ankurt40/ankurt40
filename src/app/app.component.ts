import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterPreloader } from '@angular/router';
import { AuthService } from './auth.service';
import { Place } from './place';
import { PlaceService } from './place.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
    '../assets/css/bootstrap.min.css',
    '../assets/css/owl.carousel.min.css',
    '../assets/css/magnific-popup.css',
    '../assets/css/themify-icons.css',
    '../assets/css/nice-select.css',
    '../assets/css/flaticon.css',
    '../assets/css/gijgo.css',
    '../assets/css/animate.css',
    '../assets/css/slick.css',
    '../assets/css/slicknav.css',
    '../assets/css/style.css',
    '../assets/css/NewTimeLine.css',
    '../assets/css/popuo-box.css',
    '../assets/css/map.css',
    '../assets/css/numberofdaysselectstyle.css',
    '../assets/css/font-awesome.min.css']
})
export class AppComponent implements OnInit {
 
  
 
  constructor(
    public placeService:PlaceService,
    public authService: AuthService,
    private router: Router)
  {
  
  }

  ngOnInit(): void {
     }


  
      
}
