import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromProject from '../store/p.reducers';

@Component({
  selector: 'app-p-list',
  templateUrl: './p-list.component.html',
  styleUrls: ['./p-list.component.css']
})

export class PListComponent implements OnInit {
  projectState: Observable<fromProject.State>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromProject.FeatureState>) {
  }

  ngOnInit() {
    this.projectState = this.store.select('projects');
    console.log(this.projectState);

  }
}
