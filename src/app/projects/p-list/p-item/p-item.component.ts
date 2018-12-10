import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../shared/project.model';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromProject from '../../store/p.reducers';
import * as ProjectActions from '../../store/p.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-p-item',
  templateUrl: './p-item.component.html',
  styleUrls: ['./p-item.component.css']
})
export class PItemComponent implements OnInit {
  @Input() project: Project;
  @Input() index: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromProject.FeatureState>) {}

  ngOnInit() {
  }

  onEditProject() {
    this.router.navigate([this.index, 'edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteProject() {
    this.store.dispatch(new ProjectActions.DeleteProject(this.index));
    this.store.dispatch(new ProjectActions.StoreProjects());
    this.router.navigate(['/projects/list']);
  }
}
