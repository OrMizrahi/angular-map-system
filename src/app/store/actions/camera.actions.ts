import { createAction, props } from '@ngrx/store';
import { Camera } from '../../models/camera';

export const addNewCamera = createAction(
	'[add-new-camera Component] addNewCamera',
	props<{ newCam: Camera }>()
);

export const selectCamera = createAction(
	'[cameras-list Component] selectCamera',
	props<{ selectedCam: Camera }>()
);
