// TODO: Implement with polyfill for native Web Components

// NOTE: If processing, use `import`
// import * as defaultValues from '../default-values.json';
const defaultValues = getJSONSync('scripts/default-values.json');

class CardElement extends HTMLElement {
	constructor() {
		super();

		let template = document.getElementById('card-template');
		let templateContent = template.content;

		// TODO: Figure out what should be in Shadow DOM and what should not
		this/*.attachShadow({ mode: 'open'})*/
			.appendChild( templateContent.cloneNode( true ));
	}
}
window.customElements.define('card-element', CardElement );

// TODO: Let Web Component manage `init`
initDynamicBehaviourForCard();
