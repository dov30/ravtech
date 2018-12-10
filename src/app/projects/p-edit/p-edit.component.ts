import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as ProjectActions from '../store/p.actions';
import * as fromProject from '../store/p.reducers';
import { Observable } from 'rxjs';
import { Project } from '../../shared/project.model';

import * as fromCustomer from '../../customers/store/c.reducers';
import { Customer } from '../../shared/customer.model';

@Component({
  selector: 'app-p-edit',
  templateUrl: './p-edit.component.html',
  styleUrls: ['./p-edit.component.css']
})
export class PEditComponent implements OnInit {
  projectState: Observable<fromProject.State>;
  allProjects: Project[];
  listLength: number;

  id: number;
  editMode = false;
  projectForm: FormGroup;
  projectTypes = ['Milestone', 'T&M', 'other'];

  customerState: Observable<fromCustomer.State>;
  allCustomers: Customer[];
  customerList: Customer[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromProject.FeatureState>,
    private customerStore: Store<fromCustomer.FeatureState>) {
  }

  ngOnInit() {
    this.customerState = this.customerStore.select('customers');
    this.customerState.subscribe(res => {
      this.allCustomers = res.customers;
      this.customerList = res.customers;
    });
    // Accepts the projects list length to give an ID for a new project.
    this.projectState = this.store.select('projects');
    this.projectState.subscribe(res => {
      this.allProjects = res.projects;
      this.listLength = this.allProjects.length + 1;
    });
    console.log(this.listLength);

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
    let pId = this.id;
    if (!this.editMode) {
      pId = this.listLength;
    }
    let pCustomerName = '';
    let pProjectName = '';
    let pProjectType = '';



    if (this.editMode) {
      this.store.select('projects')
        .pipe(take(1))
        .subscribe((projectState: fromProject.State) => {
          const project = projectState.projects[this.id];
          pId = this.id + 1;
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

  onSearchCustomers(value) {
    this.customerList = this.filter(value);
    console.log(this.customerList);

  }

  filter(value: string): Customer[] {
    return this.allCustomers.filter(emp => {
      return emp.name.toLocaleLowerCase().startsWith(value.toLowerCase());
    });
  }

  customerValue(value) {
  console.log(value);

  }
}
