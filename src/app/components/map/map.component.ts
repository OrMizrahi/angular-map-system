import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { MapService } from 'src/app/services/map.service';
import { Camera } from '../../models/camera';
import { AppState } from '../../store/app.state';
import { getCameras } from '../../store/selectors/app.selectors';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
	private cameras$: Observable<Camera[]>;

	//subs
	private cameraSub: Subscription;
	private eventsSub: Subscription;

	constructor(
		private store: Store<AppState>,
		private mapService: MapService,
		private eventService: EventService
	) {
		this.cameras$ = this.store.select(getCameras);
	}

	ngOnInit() {
		this.mapService.initMap();
		this.showMarkers();
		this.registerCirclesForEvents();
	}
	private showMarkers() {
		//draw markets to all cameras
		this.cameraSub = this.cameras$.subscribe((cameras) => {
			cameras.forEach((cam: Camera) => {
				this.mapService.drawMarker(cam);
			});
		});
	}
	private registerCirclesForEvents() {
		this.eventsSub = this.eventService
			.getEventNotificationSub()
			.subscribe((event: Event) => {
				this.mapService.addEventCircle(event);
			});
  }
  

	ngOnDestroy() {
		this.cameraSub.unsubscribe();
		this.eventsSub.unsubscribe();
	}
}
