// TODO: Break up component into smaller components

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
// import * as defaultValues from '../default-values.json';
const useState = React.useState;
const defaultValues = getJSONSync('scripts/default-values.json');

/**
 * The identity of an RPG entity
 * @typedef {Object} IdentityProps
 * @property {String} name - Entity name for humans
 * @property {String} form - Entity form i.e. appearance
 * @property {String} desc - Entity description
 * @property {String} element - Entity elemental enchantment
 */
/**
 * The attributes of an RPG entity
 * @typedef {Object} AttributeProps
 * @property {String} power - Entity attribute of strength/weakness
 * @property {String} speed - Entity attribute of fastness/slowness
 * @property {String} defense - Entity attribute of vulernerability
 */

/**
 * A customizable RPG card
 * @param {Object} props
 * @param {IdentityProps} props.identity
 * @param {AttributeProps} props.attribute
 */
function Card( props ) {
	const { identity, attribute } = props;
	
	/* FAQ: Can not use `<fieldset>` with `display: flex` */
	/* SEE: https://bugs.chromium.org/p/chromium/issues/detail?id=375693 */
	return (
		<form id="card" className="c-card c-card--opts-count-1"
			data-output-for="card-ident-element" data-value="">
			<fieldset id="card-ident">
				<legend>Card Identity</legend>

				<template>TODO: Extract content below to static component</template>
				<label htmlFor="card-ident-name"
					title="The name of the enchanted item">Name</label>
				<input id="card-ident-name" className="c-card__name"
					type="text" defaultValue={identity.name} />

				<template>TODO: Extract content below to dynamic component</template>
				<label htmlFor="card-ident-form"
					title="The common form of the enchanted item">Form</label>
				<select id="card-ident-form" className="c-card__metadata"
					defaultValue={identity.form}>
					<optgroup label="Clothing">
						<option name="ident_form_boot" value="boot">Boot</option>
						<option name="ident_form_hat" value="hat">Hat</option>
						<option name="ident_form_glove" value="glove">Glove</option>
						<option name="ident_form_mask" value="mask">Mask</option>
					</optgroup>
				</select>
				<output htmlFor="card-ident-form" className="c-card__figure"
					data-value=""></output>

				<template>TODO: Extract content below to static component</template>
				<label htmlFor="card-ident-desc"
					title="A description of the enchanted item">Description</label>
				<textarea id="card-ident-desc" className="c-card__desc" defaultValue={identity.desc}></textarea>

				<ElementInput id="card-ident-element" label="Element"
					desc="The elemental power of the enchanted item"
					value={identity.element} />
			</fieldset>

			<section id="card-attr" className="c-card__attr-list"
				role="group" aria-labelledby="card-attr-list-title">
				<legend>Card Attributes</legend>

				<div className="c-card__attr">
					<AttributeInput id="card-attr-power" label="Power"
						desc="How many units stronger or weaker"
						min="-3" max="3" step="1" value={attribute.power} />
				</div>

				<div className="c-card__attr">
					<AttributeInput id="card-attr-speed" label="Speed"
						desc="How many units faster or slower"
						min="-3" max="3" step="1" value={attribute.speed} />
				</div>

				<div className="c-card__attr">
					<AttributeInput id="card-attr-defense" label="Defense"
						desc="How many units less or more vulnerable"
						min="-3" max="3" step="1" value={attribute.defense} />
				</div>
			</section>

			<template>TODO: Extract content of fieldset below to dynamic component</template>
			<fieldset id="card-opts" className="c-card--opts-list js-immune">
				<button role="presentation none" className="c-card__opt-toggle"
					type="button" tabIndex="-1">
				<input id="card-preview-toggle" name="card_preview"
					type="checkbox"
					tabIndex="0" />
				<label htmlFor="card-preview-toggle"
					title="Approximate final state of card">Preview Card</label>
				</button>
			</fieldset>
		</form>
	);
}

ReactDOM.render(
	<Card {...defaultValues} />,
	document.getElementById('card--react')
);

// TODO: Let React manage `init`
initDynamicBehaviourForCard();