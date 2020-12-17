import { Camera } from '../models/camera';
import { Event } from '../models/event';

export interface AppState {
	cameras: CameraReducerState;
	events: EventReducerState;
}
export interface CameraReducerState {
	cameras: Camera[];
	selectedCamera: Camera;
}
export interface EventReducerState {
	events: Event[];
}

export const camerasInitialState: CameraReducerState = {
	cameras: [
		{
			id: 1,
			name: 'Big Ben Tower',
			location: [51.5, -0.124658],
		},
		{
			id: 2,
			name: 'Westminster Abbey',
			location: [51.49, -0.127585],
		},
		{
			id: 3,
			name: 'Tower Bridge',
			location: [51.5, -0.075335],
		},
		{
			id: 4,
			name: 'London Bridge',
			location: [51.507, -0.087823],
		},
		{
			id: 5,
			name: 'Hide Park',
			location: [51.507, -0.165838],
		},
		{
			id: 6,
			name: 'Buckingham Palace',
			location: [51.501, -0.141911],
		},
		{
			id: 7,
			name: 'Trafalgar Square',
			location: [51.508, -0.128076],
		},
	],
	selectedCamera: null,
};

export const eventsInitialState: EventReducerState = { events: [] };
