import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Camera } from '../../models/camera';
import { addNewCamera } from '../../store/actions/camera.actions';
import { AppState } from '../../store/app.state';

@Component({
	selector: 'app-add-camera',
	templateUrl: './add-camera.component.html',
	styleUrls: ['./add-camera.component.scss'],
})
export class AddCameraComponent implements OnInit {
	ngOnInit(): void {}
	constructor(private fb: FormBuilder, private store: Store<AppState>) {}

	form = this.fb.group({
		name: new FormControl('Regents Park', Validators.required),
		latitude: new FormControl('51.532317', [
			Validators.required,
			Validators.pattern(/\-?\d*\.?\d{1,2}/),
		]),
		longitude: new FormControl('-0.156942', [
			Validators.required,
			Validators.pattern(/\-?\d*\.?\d{1,2}/),
		]),
	});

	onSubmit() {
		const newCam: Camera = {
			id: 0,
			name: this.form.value.name,
			location: [+this.form.value.latitude, +this.form.value.longitude],
		};
		this.store.dispatch(addNewCamera({ newCam }));
	}
}
