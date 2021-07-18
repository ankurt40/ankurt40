import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  API_URL: string = "api/";

  constructor(private httpClient: HttpClient) { }

  getAllPlaces(place,start,end,numberofdays) {

  //return this.httpClient.get("http://127.0.0.1:8000/getPlaceNames/?city=" + place + "&format=json");
  // return this.httpClient.get("http://127.0.0.1:8000/allPlaces/?city=" + place + "&format=json");
  return this.httpClient.get("http://127.0.0.1:8000/getSuggestion/?place="+place+"&start="+start+"&end="+end+"&numberofdays="+numberofdays+"&format=json");
  }

  getPlace(placeId) {
    return this.httpClient.get(`${this.API_URL + 'products'}/${placeId}`)
  }


  getCitySuggestion(place)    {
    return this.httpClient.get("http://127.0.0.1:8000/getCitySuggestion/?city="+place+"&format=json");
    }

  
  loadPlaces=new Subject();


}
 
