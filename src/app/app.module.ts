import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from  '@angular/common/http';
import { ItineraryplannerComponent } from './itineraryplanner/itineraryplanner.component';
import { PlacecardComponent } from './itineraryplanner/placecard/placecard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransitdetailsComponent } from './itineraryplanner/transitdetails/transitdetails.component';
//import { AngularFireAuthModule } from 'angularfire2/auth'

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthService } from './auth.service';
import { UniversalsearchComponent } from './shared/universalsearch/universalsearch.component';
import { LoginComponent } from './shared/login/login.component';

// 2. Add your credentials from step 1
const config = {
  apiKey: "AIzaSyA666HwM41fnge6KKaHBML5xbRqlVzf6o0",
  authDomain: "tourauth.firebaseapp.com",
  databaseURL: "https://tourauth.firebaseio.com",
  projectId: "tourauth",
  storageBucket: "tourauth.appspot.com",
  messagingSenderId: "1061804188487",
  appId: "1:1061804188487:web:b0290983aed3778ba06262"
};



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ItineraryplannerComponent,
    PlacecardComponent,
    TransitdetailsComponent,
    AuthenticationComponent,
    UniversalsearchComponent,
    LoginComponent, 
       
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
