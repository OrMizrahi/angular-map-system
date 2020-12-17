import { createReducer, on } from '@ngrx/store';
import { camerasInitialState } from '../app.state';
import { addNewCamera, selectCamera } from '../actions/camera.actions';

const _cameraReducer = createReducer(
	camerasInitialState,
	on(addNewCamera, (state, { newCam }) => ({
		...state,
		cameras: [...state.cameras, { ...newCam, id: state.cameras.length + 1 }],
	})),
	on(selectCamera, (state, { selectedCam }) => ({
		...state,
		selectedCamera: selectedCam,
	}))
);

export function cameraReducer(state, action) {
	return _cameraReducer(state, action);
}
