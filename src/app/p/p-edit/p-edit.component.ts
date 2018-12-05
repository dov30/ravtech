import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as ProjectActions from '../store/p.actions';
import * as fromProject from '../store/p.reducers';
// import { Guarantor } from '../../shared/guarantor.model';

@Component({
  selector: 'app-p-edit',
  templateUrl: './p-edit.component.html',
  styleUrls: ['./p-edit.component.css']
})
export class PEditComponent implements OnInit {

  id: number;
  editMode = false;
  projectForm: FormGroup;
  projectTypes = ['Milestone', 'T&M', 'other'];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromProject.FeatureState>) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = + params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {

    if (this.editMode) {
      this.store.dispatch(new ProjectActions.UpdateProject({
        index: this.id,
        updatedProject: this.projectForm.value
      }));
    this.store.dispatch(new ProjectActions.StoreProjects());
    } else {
      this.store.dispatch(new ProjectActions.AddProject(this.projectForm.value));
    this.store.dispatch(new ProjectActions.StoreProjects());
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/projects/list'], { relativeTo: this.route });
  }

  private initForm() {
    let pId;
    let pCustomerName = '';
    let pProjectName = '';
    let pProjectType = '';



    if (this.editMode) {
      this.store.select('projects')
        .pipe(take(1))
        .subscribe((projectState: fromProject.State) => {
          const project = projectState.projects[this.id];
          pId = project.id;
          pCustomerName = project.customerName;
          pProjectName = project.projectName;
          pProjectType = project.projectType;
        });
    }

    this.projectForm = new FormGroup({
      'id': new FormControl(pId),
      'customerName': new FormControl(pCustomerName, Validators.required),
      'projectName': new FormControl(pProjectName, Validators.required),
      'projectType': new FormControl(pProjectType, Validators.required),

    });
  }
}
