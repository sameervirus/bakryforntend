import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-print',
	templateUrl: './print.component.html',
	styleUrls: ['./print.component.css'],
})
export class PrintComponent implements OnInit {
	@Output() print = new EventEmitter<boolean>();

	today = new Date();
	data: any;
	title = 'Work Sheet';
	constructor() {}

	ngOnInit(): void {}

	hasPrint() {
		this.print.emit(true);
	}
}
