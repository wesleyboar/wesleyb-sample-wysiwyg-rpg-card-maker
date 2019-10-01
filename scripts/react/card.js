// TODO: Document, for all components, {...markupAttrs} properties

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
// import ReactDom from 'react';
// import CustomTypes from './custom-types.js';
// import * as defaultValues from '../default-values.json';
// import * as itemShapes from '../item-shapes.json';
const { useState, useEffect } = window.React;
const ReactDOM = window.ReactDOM;
const CustomTypes = window.CustomTypes;
const defaultValues = window.getJSONSync('scripts/default-values.json');
const itemShapes = window.getJSONSync('scripts/item-shapes.json');

/** Dynamically-applied CSS class names */
const CLASSNAMES = {
  isPreview: 's-card-preview'
}

/**
 * A customizable RPG card for an item
 * @param {Object} props
 * @param {IdentityProps} [props.identity] - Properties that identify the entity
 * @param {AttributesProps} [props.attributes] - Properties of the entity's effect
 */
function Card( props ) {
	const { identity = {}, attributes= {}, ...markupAttrs } = props;
	const [ shouldPreview, setShouldPreview ] = useState( false );
	const [ element, setElement ] = useState( identity.element );
	const [ previewClassName, setPreviewClassName ] = useState('');

	function handlePreviewToggleChange( isActive ) {
		setShouldPreview( isActive );
	}

	useEffect(() => {
		setPreviewClassName( ( shouldPreview ) ? CLASSNAMES.isPreview : '' );
	}, [ shouldPreview ]);

	return (
		<form {...markupAttrs}
			className={"c-card c-card--opts-count-1 " + previewClassName}
			data-output-for="card-ident-element" data-value={element}>
			<fieldset id="card-ident" disabled={shouldPreview}>
				<legend>Card Identity</legend>

				<NameInput id="card-ident-name"
					label="Name"
					desc="The name of the enchanted item"
					className="c-card__name"
					value={identity.name} />

				<ShapeInput id="card-ident-shape"
					label="Form"
					desc="The common form of the enchanted item"
					className="c-card__metadata"
					outputClassName="c-card__figure"
					value={identity.shape} shapes={itemShapes}
					placeholder="Choose a shape"
					required />

				<DescInput id="card-ident-desc"
					label="Description"
					desc="A description of the enchanted item"
					className="c-card__desc"
					value={identity.desc} />

				<ElementInput id="card-ident-element"
					label="Element"
					desc="The elemental power of the enchanted item"
					className="c-card__metadata"
					placeholder="Choose an element"
					value={element}
					onChange={ value => setElement( value )} />
			</fieldset>

			{/* FAQ: Can not use `<fieldset>` with `display: flex` */}
			{/* SEE: https://bugs.chromium.org/p/chromium/issues/detail?id=375693 */}
			<section id="card-attr" className={"c-card__attr-list " + previewClassName}
				role="group" aria-labelledby="card-attr-list-title" disabled={shouldPreview}
				data-replaced-tag="fieldset">
				<span id="card-attr-list-title"
					data-replaced-tag="legend">Card Attributes</span>

				<div className="c-card__attr">
					<AttributeInput id="card-attr-power"
						label="Power"
						desc="How many units stronger or weaker"
						min={-3} max={3} step={1} value={attributes.power}
						className="c-card__attr-input"
						labelClassName="c-card__attr-key"
						outputClassName="c-card__attr-value" />
				</div>

				<div className="c-card__attr">
					<AttributeInput id="card-attr-speed"
						label="Speed"
						desc="How many units faster or slower"
						min={-3} max={3} step={1} value={attributes.speed}
						className="c-card__attr-input"
						labelClassName="c-card__attr-key"
						outputClassName="c-card__attr-value" />
				</div>

				<div className="c-card__attr">
					<AttributeInput id="card-attr-defense"
						label="Defense"
						desc="How many units less or more vulnerable"
						min={-3} max={3} step={1} value={attributes.defense}
						className="c-card__attr-input"
						labelClassName="c-card__attr-key"
						outputClassName="c-card__attr-value" />
				</div>
			</section>

			<fieldset id="card-opts" className="c-card--opts-list">
				<Toggle id="card-preview-toggle"
					label="Preview Card"
					desc="Preview approximate final state of card"
					className="c-card__opt-toggle"
					name="card_preview"
					isOn={shouldPreview}
					onChange={handlePreviewToggleChange} />
			</fieldset>
		</form>
	);
}
Card.propTypes = {
	identity: CustomTypes.IdentityProps,
	attributes: CustomTypes.AttributeProps,
}

ReactDOM.render(
	<Card id="card" {...defaultValues} />,
	document.getElementById('card--react')
);
