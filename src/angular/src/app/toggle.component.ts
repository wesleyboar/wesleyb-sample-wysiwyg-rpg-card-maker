import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

// Data
import { ChangeFunc } from '../../../_shared/types';

@Component({
	selector: 'toggle',
	templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class ToggleComponent {
	@Input() fieldId: string;
	@Input() label: string;
	@Input() desc: string;
	@Input() isOn?: boolean;
	@Input() className?: string;
	@Input() fieldClassName?: string;
	@Input() labelClassName?: string;

	@Output() isOnChange? = new EventEmitter<string>();

	handleChange: ChangeFunc = function ( e ) {
		// We must handle value change internally
		this.isOn = (<HTMLInputElement>e.target).checked;
		// We must allow consumer to handle value change
		this.isOnChange.emit( this.isOn );
	}
}
