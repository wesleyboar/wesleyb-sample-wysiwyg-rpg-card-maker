import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

// TODO: Import and register `SelectComponent` into `app.module`
// import { SelectComponent } from './select.component';

// Data
import { Options, ChangeFunc } from '../../../_shared/types';
import elementOptions from '../../../_shared/data/elements.json';

@Component({
	selector: 'element-input',
	templateUrl: './element-input.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class ElementInputComponent {
	@Input() id: string;
	@Input() label: string;
	@Input() desc: string;
	@Input() value?: string = 'test';
	@Input() elements?: Options = elementOptions;
	@Input() placeholder?: string;
	@Input() labelClassName?: string;

	@Output() valueChange? = new EventEmitter<string>();

	handleChange: ChangeFunc = function ( e ) {
		// We must handle value change internally
		this.value = (<HTMLInputElement>e.target).value;
		// We must allow consumer to handle value change
		this.valueChange.emit( this.value );
	}
}
