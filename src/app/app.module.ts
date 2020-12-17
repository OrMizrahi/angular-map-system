import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { CamerasListComponent } from './components/cameras-list/cameras-list.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { cameraReducer } from './store/reducers/camera.reducer';
import { eventsReducer } from './store/reducers/event.reducers';
import { AddCameraComponent } from './components/add-camera/add-camera.component';

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		CamerasListComponent,
		EventsListComponent,
		AddCameraComponent,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		StoreModule.forRoot({
			cameras: cameraReducer,
			events: eventsReducer,
		}),
		StoreDevtoolsModule.instrument({}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
