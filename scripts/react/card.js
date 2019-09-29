// TODO: Propogate class names to child components
// TODO: Create `Field` component (that should default to `div`, but can be any tag)
// TODO: Create `FieldSet` component (that should default to `fieldset`, but can be any tag)
// FAQ: Can not use `<fieldset>` with `display: flex`
// SEE: https://bugs.chromium.org/p/chromium/issues/detail?id=375693

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
// import * as defaultValues from '../default-values.json';
// import * as itemShapes from '../item-shapes.json';
const { useState, useEffect } = React;
const defaultValues = getJSONSync('scripts/default-values.json');
const itemShapes = getJSONSync('scripts/item-shapes.json');

/** Dynamically-applied CSS class names */
const CLASSNAMES = {
  isPreview: 's-card-preview'
}

/**
 * A customizable RPG card for an item
 * @param {Object} props
 * @param {IdentityProps} props.identity
 * @param {AttributeProps} props.attribute
 */
function Card( props ) {
	const { identity, attribute } = props;
	const [ shouldPreview, setShouldPreview ] = useState( false );
	const [ element, setElement ] = useState( identity.element );
	const [ previewClassName, setPreviewClassName ] = useState('');

	function handleIsActiveChange( isActive ) {
		setShouldPreview( isActive );
	}

	useEffect(() => {
		setPreviewClassName( ( shouldPreview ) ? CLASSNAMES.isPreview : '' );
	}, [ shouldPreview ]);

	return (
		<form id="card" className={"c-card c-card--opts-count-1 " + previewClassName}
			data-output-for="card-ident-element" data-value={element}>
			<fieldset id="card-ident" disabled={shouldPreview}>
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
					value={element}
					onChange={ value => setElement( value ) } />
			</fieldset>

			<section id="card-attr" className={"c-card__attr-list" + previewClassName}
				role="group" aria-labelledby="card-attr-list-title" disabled={shouldPreview}>
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

			<fieldset id="card-opts" className="c-card--opts-list">
				<Toggle id="card-preview-toggle" label="Preview Card"
					desc="Preview approximate final state of card"
					isOn={shouldPreview}
					onChange={handleIsActiveChange} />
			</fieldset>
		</form>
	);
}

ReactDOM.render(
	<Card {...defaultValues} />,
	document.getElementById('card--react')
);
