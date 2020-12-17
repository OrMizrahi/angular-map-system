import { createReducer, on } from '@ngrx/store';
import { resetEvents, addNewEvent } from '../actions/event.actions';
import { eventsInitialState } from '../app.state';

const _eventsReducer = createReducer(
	eventsInitialState,
	on(addNewEvent, (state, { newEvent }) => ({
		...state,
		events: [...state.events, newEvent],
	})),
	on(resetEvents, (state) => ({
		...state,
		events: [],
	}))
);

export function eventsReducer(state, action) {
	return _eventsReducer(state, action);
}
