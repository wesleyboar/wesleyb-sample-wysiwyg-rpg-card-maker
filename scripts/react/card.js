// TODO: Propogate class names to child components
// TODO: Encapsulate logic for:
//       - disable `fieldset`
//       - immunize `fieldset` against disabling
// TODO: Create `Field` component (that should default to `div`, but can be any tag)
// TODO: Create `FieldSet` component (that should default to `fieldset`, but can be any tag)
// FAQ: Can not use `<fieldset>` with `display: flex`
// SEE: https://bugs.chromium.org/p/chromium/issues/detail?id=375693

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
// import * as defaultValues from '../default-values.json';
// import * as itemShapes from '../item-shapes.json';
const useState = React.useState;
const defaultValues = getJSONSync('scripts/default-values.json');
const itemShapes = getJSONSync('scripts/item-shapes.json');

/**
 * The identity of an RPG entity
 * @typedef {Object} IdentityProps
 * @prop {String} name - Entity name for humans
 * @prop {String} form - Entity form i.e. appearance
 * @prop {String} desc - Entity description
 * @prop {String} element - Entity elemental enchantment
 */
/**
 * The attributes of an RPG entity
 * @typedef {Object} AttributeProps
 * @prop {String} power - Entity attribute of strength/weakness
 * @prop {String} speed - Entity attribute of fastness/slowness
 * @prop {String} defense - Entity attribute of vulernerability
 */

/**
 * A customizable RPG card for an item
 * @param {Object} props
 * @param {IdentityProps} props.identity
 * @param {AttributeProps} props.attribute
 */
function Card( props ) {
	const { identity, attribute } = props;

	return (
		<form id="card" className="c-card c-card--opts-count-1"
			data-output-for="card-ident-element" data-value="">
			<fieldset id="card-ident">
				<legend>Card Identity</legend>

				<NameInput id="card-ident-name" label="Name"
					desc="The name of the enchanted item"
					value={identity.name} />

				<ShapeInput id="card-ident-shape" label="Form"
					desc="The common form of the enchanted item"
					value={identity.shape} shapes={itemShapes} />

				<DescInput id="card-ident-desc" label="Name"
					desc="A description of the enchanted item"
					value={identity.desc} />

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

			<fieldset id="card-opts" className="c-card--opts-list js-immune">
				<Toggle id="card-preview-toggle" label="Preview Card"
					desc="Preview approximate final state of card" />
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