import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = '';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCghDi9uLdJ70cjBB8o3_apPmTaAe2CNIg',
      authDomain: 'assignment-managment.firebaseio.com'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
