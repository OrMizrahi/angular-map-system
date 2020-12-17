export enum Description {
	Accident = 'Accident',
	Demonstration = 'Demonstration',
	SuspiciousObject = 'Suspicious Object',
}

export interface Event {
	time: Date;
	geoLocation: Array<number>;
	description: string;
}
