# Components

## Rules

### 1. Import Styles Before Components

Import "parent" component styles before importing "child" components, so that "child" component styles are loaded after "parent" component styles.

For CSS to cascade properly, "child" components should be able to override "parent" components. _If CSS does **not** cascade properly, inexperienced devs may abuse specificity to override values._

- **`Card.js`**
	```javascript
	// Styles
	import '…/Card.css';
	```

	- **`Card.css`**
		```css
		@import "…/c-card.css";
		```
		- **`c-card.css`**
			```css
			.c-card {
				/* Initial standard value */
				--option-height: 4rem;
			}
			```
		```css
		.c-card--options-count-1 {
			/* Use value that may be overridden */
			margin-top: var(--option-height);
		}
		```

	```javascript
	// Components
	import Toggle from '…/Toggle';
	```

	- **`Toggle.js`**
		```javascript
		// Styles
		import '…/Toggle.css';
		```

		- **`Toggle.css`**
			```css
			import "…/c-toggle.css";
			```
			- **`c-toggle.css`**
				```css
				.c-toggle {
					/* Initial standard values */
					--margin--vert: 0;
					--margin--horz: 0;

					/* Use values that may be overridden */
					margin-block: var(--margin--vert);
					margin-inline: var(--margin--horz);
				}
				```
			```css
			.c-card {
				/* Initial custom values */
				--c-toggle-height: 3.1rem;
				--c-toggle-margin--vert: 0.25em;
				--c-toggle-margin--horz: 0;
			
				/* Override `c-card.css` */
				--option-height: calc( var(--c-toggle-height) + var(--c-toggle-margin--vert) );
			}
			.c-toggle {
				/* Override `c-toggle.css` */
				--margin--vert: var(--c-toggle-margin--vert);
				--margin--horz: var(--c-toggle-margin--horz);
			}
			```
