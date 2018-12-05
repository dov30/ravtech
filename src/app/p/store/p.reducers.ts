// import { PersonalInformation } from '../pi.model';
// import { Guarantor } from '../../shared/guarantor.model';
import * as ProjectActions from './p.actions';
import * as fromApp from '../../store/app.reducers';
import { Project } from '../../shared/project.model';

export interface FeatureState extends fromApp.AppState {
  projectStata: State;
}

export interface State {
  projects: Project[];
}

const initialState: State = {
  projects: [
  ]
};

export function PReducer(state = initialState, action: ProjectActions.ProjectActions) {
  switch (action.type) {
    case (ProjectActions.SET_PROJECTS):
      return {
        ...state,
        projects: [...action.payload]
      };
    case (ProjectActions.ADD_PROJECT):
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case (ProjectActions.UPDATE_PROJECT):
      const project = state.projects[action.payload.index];
      const updatedProject = {
        ...project,
        ...action.payload.updatedProject
      };
      const projects = [...state.projects];
      projects[action.payload.index] = updatedProject;
      return {
        ...state,
        projects: projects
      };
    case (ProjectActions.DELETE_PROJECT):
      const oldProjects = [...state.projects];
      oldProjects.splice(action.payload, 1);
      return {
        ...state,
        projects: oldProjects
      };
    default:
      return state;
  }
}
