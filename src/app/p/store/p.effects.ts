import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, withLatestFrom, map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';

import * as ProjectActions from '../store/p.actions';
import * as fromProject from '../store/p.reducers';
import { Project } from '../../shared/project.model';

@Injectable()
export class PEffects {
  @Effect()
  projectFetch = this.actions$
    .ofType(ProjectActions.FETCH_PROJECTS)
    .pipe(switchMap((action: ProjectActions.FetchProjects) => {
      return this.httpClient.get<Project[]>('https://assignment-managment.firebaseio.com/projects.json', {
        observe: 'body',
        responseType: 'json'
      });
    }), map(
      (projects) => {
        console.log(projects);
        return {
          type: ProjectActions.SET_PROJECTS,
          payload: projects
        };
      }
    ));

  @Effect({dispatch: false})
  projectStore = this.actions$
    .ofType(ProjectActions.STORE_PROJECTS)
    .pipe(withLatestFrom(this.store.select('projects')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', 'https://assignment-managment.firebaseio.com/projects.json',
         state.projects, {reportProgress: true});
        return this.httpClient.request(req);
      }));

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromProject.FeatureState>) {
  }
}
