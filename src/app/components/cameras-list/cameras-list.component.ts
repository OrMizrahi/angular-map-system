import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Camera } from 'src/app/models/camera';
import { MapService } from 'src/app/services/map.service';
import { selectCamera } from 'src/app/store/actions/camera.actions';
import { resetEvents } from 'src/app/store/actions/event.actions';
import { AppState } from 'src/app/store/app.state';
import { getCameras } from '../../store/selectors/app.selectors';

@Component({
	selector: 'app-cameras-list',
	templateUrl: './cameras-list.component.html',
	styleUrls: ['./cameras-list.component.scss'],
})
export class CamerasListComponent implements OnInit {
	cameras$: Observable<Camera[]>;

	constructor(private store: Store<AppState>, private mapService: MapService) {
		this.cameras$ = this.store.select(getCameras);
	}
	selectCamera(selectedCam: Camera) {
		this.mapService.clearAllEventsCircles();
		this.mapService.zoomCamera(selectedCam.location);
		this.mapService.addMarkerCaption(selectedCam);

		this.store.dispatch(selectCamera({ selectedCam }));
		this.store.dispatch(resetEvents());
	}
	ngOnInit(): void {}
}
