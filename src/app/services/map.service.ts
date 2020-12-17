import { Injectable } from '@angular/core';
import { Camera } from '../models/camera';
import { Event } from '../models/event';
declare let L: any;
@Injectable({
	providedIn: 'root',
})
export class MapService {
	constructor() {}

	private map: any;
	private cameraMarkerDict = new Map();
	private eventCircles = new Array<any>();
	private mapCirclesToEvents = new Map();

	initMap() {
		this.map = L.map('map').setView([51.505, -0.11], 13);
		L.tileLayer(
			'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib3I3NzciLCJhIjoiY2tpbnBzcHVpMHIwZTMzcDN4ajdlcWl1cyJ9.tUqQsqUE7Pwk9hfYfEMSaw',
			{
				maxZoom: 18,
				id: 'mapbox/streets-v11',
				tileSize: 512,
				zoomOffset: -1,
				accessToken:
					'pk.eyJ1Ijoib3I3NzciLCJhIjoiY2tpbnBzcHVpMHIwZTMzcDN4ajdlcWl1cyJ9.tUqQsqUE7Pwk9hfYfEMSaw',
			}
		).addTo(this.map);
	}

	drawMarker(camera: Camera) {
		//if this cam already has a marker, no need to set it again
		if (this.cameraMarkerDict.has(camera.name)) return;

		const marker = L.marker(camera.location).addTo(this.map);
		this.cameraMarkerDict.set(camera.name, marker);
	}

	addEventCircle(event: Event) {
		const circle = L.circle(event.geoLocation, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			radius: 150,
		}).addTo(this.map);

		this.eventCircles.push(circle);

		//event location is uniqe per event
		this.mapCirclesToEvents.set(event.geoLocation.join(), circle);
	}
	clearAllEventsCircles() {
		this.eventCircles.forEach((circle) => {
			this.map.removeLayer(circle);
		});
		this.mapCirclesToEvents.clear();
	}

	showCaptionEventCircle(camLocation: number[]) {
		const key = camLocation.join();
		const circleToShow = this.mapCirclesToEvents.get(key);
		circleToShow.bindPopup('<b>You clicked me!</b>').openPopup();
	}

	zoomCamera(camLocation: number[]) {
		this.map.setView(camLocation, 14);
	}
	addMarkerCaption(selectedCam: Camera) {
		const marker = this.cameraMarkerDict.get(selectedCam.name);
		marker
			.bindPopup(
				`<b>${selectedCam.name}</b><br><span>${selectedCam.location[0]},${selectedCam.location[1]}</span>`
			)
			.openPopup();
	}
}
