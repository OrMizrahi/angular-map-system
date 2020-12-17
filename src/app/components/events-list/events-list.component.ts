import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Camera } from 'src/app/models/camera';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { MapService } from 'src/app/services/map.service';
import { resetEvents } from 'src/app/store/actions/event.actions';
import { AppState } from 'src/app/store/app.state';
import {
	getEvents,
	getSelectedCamera,
} from 'src/app/store/selectors/app.selectors';

@Component({
	selector: 'app-events-list',
	templateUrl: './events-list.component.html',
	styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit, OnDestroy {
	events$: Observable<Event[]>;
	selectedCamName: string;
	private selectedCam$: Observable<Camera>;
	private selectedCamSub: Subscription;

	constructor(
		private store: Store<AppState>,
		private eventsService: EventService,
		private mapService: MapService
	) {
		this.events$ = this.store.select(getEvents);
		this.selectedCam$ = this.store.select(getSelectedCamera);
	}

	ngOnInit(): void {
		//on every selection of a cemera, need to reset the events
		this.selectedCamSub = this.selectedCam$.subscribe((camera: Camera) => {
			//first time camera will be undefined so we dont want to dispatch
			if (camera) {
				this.eventsService.generateRandomEvents(camera);
				this.selectedCamName = camera.name;
			}
		});
	}

	handleEventClick(event: Event) {
		this.mapService.zoomCamera(event.geoLocation);
		this.mapService.showCaptionEventCircle(event.geoLocation);
	}

	ngOnDestroy() {
		this.selectedCamSub.unsubscribe();
	}
}
