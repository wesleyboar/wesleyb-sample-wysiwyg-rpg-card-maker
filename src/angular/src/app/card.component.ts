import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

// Data
import { IdentityProps, AttributeProps, ElementName } from '../../../_shared/types';

/** Dynamically-applied CSS class names */
const CLASSNAMES = {
	isPreview: 's-card-preview'
}

interface ToggleChangeFunc {
	( event: Event ): void;
}

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
	@Input() identity: IdentityProps;
	@Input() attributes: AttributeProps;

	shouldPreview: boolean = false;
	element: ElementName;

	ngOnInit() {
		this.element = this.identity.element;
	}

	get previewClassName() {
		return ( this.shouldPreview ) ? CLASSNAMES.isPreview : '';
	}

	handleElementChange( value ) {
		this.element = value;
	}
	handlePreviewToggleChange( isActive ) {
		this.shouldPreview = isActive;
	}
}
