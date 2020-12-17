import { createAction, props } from '@ngrx/store';
import { Event } from '../../models/event';

export const resetEvents = createAction('[map component] resetEvents');
export const addNewEvent = createAction(
	'[event-service Service] addNewEvent',
	props<{ newEvent: Event }>()
);
