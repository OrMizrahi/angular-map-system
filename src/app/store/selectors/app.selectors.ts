import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const selectCameras = (state: AppState) => state.cameras;
const selectEvents = (state: AppState) => state.events;
const selectSelectedCamera = (state: AppState) => state.cameras;

export const getCameras = createSelector(
	selectCameras,
	(state) => state.cameras
);
export const getEvents = createSelector(selectEvents, (state) => state.events);
export const getSelectedCamera = createSelector(
	selectSelectedCamera,
	(state) => state.selectedCamera
);
