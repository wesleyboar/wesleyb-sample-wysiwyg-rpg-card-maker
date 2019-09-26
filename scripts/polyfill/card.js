// TODO: Implement with polyfill for native Web Components

// NOTE: If processing, use `import`
// import * as defaultValues from '../default-values.json';
const defaultValues = getJSONSync('scripts/default-values.json');

class CardElement extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();

		let template = document.getElementById('card-template');
		let templateContent = template.content;

		this.attachShadow({ mode: 'open'})
				.appendChild( templateContent.cloneNode( true ));
	}
}
window.customElements.define('card-element', CardElement );

// TODO: Let Web Component manage `init`
initDynamicBehaviourForCard();
