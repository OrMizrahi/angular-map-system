import { Injectable } from '@angular/core';
import { Camera } from '../models/camera';
import { Description, Event } from '../models/event';
import { sample } from 'lodash';
import { addNewEvent } from '../store/actions/event.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EventService {
	constructor(private store: Store<AppState>) {}

	private eventsNotification: Subject<Event> = new Subject<Event>();
	private interval: number;

	getEventNotificationSub() {
		return this.eventsNotification.asObservable();
	}

	generateRandomEvents(camera: Camera) {
		//first clear the interval
		if (this.interval) {
			window.clearInterval(this.interval);
		}

		this.interval = window.setInterval(() => {
			const newEvent = this.createEvent(camera);
			this.eventsNotification.next(newEvent);
		}, 10000);
	}

	private createEvent(camera: Camera): Event {
		const newEvent: Event = {
			description: this.generateRandomDesc(),
			geoLocation: this.generateCloseLocation(camera.location),
			time: new Date(),
		};
		this.store.dispatch(addNewEvent({ newEvent }));
		return newEvent;
	}

	private generateRandomDesc(): string {
		return sample(Object.values(Description));
	}
	private generateCloseLocation(camLocation: number[]): number[] {
		return [
			+camLocation[0] + Math.random() * 0.005 - 0.001,
			+camLocation[1] + Math.random() * 0.005 - 0.001,
		];
	}
}
