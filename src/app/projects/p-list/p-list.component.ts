import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromProject from '../store/p.reducers';
import { Project } from '../../shared/project.model';

@Component({
  selector: 'app-p-list',
  templateUrl: './p-list.component.html',
  styleUrls: ['./p-list.component.css']
})

export class PListComponent implements OnInit {
  projectState: Observable<fromProject.State>;
  allProjects: Project[];
  projectList: Project[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromProject.FeatureState>) {
  }

  ngOnInit() {
    this.projectState = this.store.select('projects');
    this.projectState.subscribe(res => {
      this.allProjects = res.projects;
      this.projectList = res.projects;
    });
  }
  onSearch(value) {
    this.projectList = this.filter(value);
  }

  filter(value: string): Project[] {
    return this.allProjects.filter(pro => {
      return pro.projectName.toLocaleLowerCase().startsWith(value.toLowerCase());
    });
  }
}
