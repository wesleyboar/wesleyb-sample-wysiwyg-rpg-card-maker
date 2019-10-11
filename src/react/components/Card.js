import React from 'react';

// Components
import NameInput from './NameInput';
import ShapeInput from './ShapeInput';
import DescInput from './DescInput';
import ElementInput from './ElementInput';
import Gallery from './Gallery';
import AttributeInput from './AttributeInput';
import Toggle from './Toggle';

// Data
import CustomTypes from '../services/custom-types.js';
import itemShapes from '../../_shared/item-shapes.json';

/** Dynamically-applied CSS class names */
const CLASSNAMES = {
  isPreview: 's-card-preview'
}

/**
 * A customizable RPG card for an item
 * @param {Object} props
 * @param {IdentityProps} [props.identity] - Properties that identify the entity
 * @param {AttributesProps} [props.attributes] - Properties of the entity's effect
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the root element
 * @return {React.Component}
 */
function Card( props ) {
	const { identity = {}, attributes= {}, ...markupAttrs } = props;
	const [ shouldPreview, setShouldPreview ] = React.useState( false );
	const [ element, setElement ] = React.useState( identity.element );
	const [ previewClassName, setPreviewClassName ] = React.useState('');

	function handlePreviewToggleChange( isActive ) {
		setShouldPreview( isActive );
	}

	React.useEffect(() => {
		setPreviewClassName( ( shouldPreview ) ? CLASSNAMES.isPreview : '' );
	}, [ shouldPreview ]);

	return (
		<form {...markupAttrs}
			className={"c-card c-card--opts-count-1 " + previewClassName}
			data-output-for="card-ident-element" data-value={element}>
			<fieldset disabled={shouldPreview} id="card-ident">
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
			<section disabled={shouldPreview} id="card-attr"
				role="group" aria-labelledby="card-attr-list-title"
				data-replaced-tag="fieldset">
				<span id="card-attr-list-title"
					data-replaced-tag="legend">Card Attributes</span>

				<Gallery tagName="ul" className="c-gallery"
					childTagName="li" childClassName="c-gallery__item">
					<AttributeInput id="card-attr-power"
						label="Power"
						desc="How many units stronger or weaker"
						min={-3} max={3} step={1} value={attributes.power}
						className="c-attr-input"
						fieldClassName="c-attr-input__field"
						labelClassName="c-attr-input__key"
						outputClassName="c-attr-input__value" />

					<AttributeInput id="card-attr-speed"
						label="Speed"
						desc="How many units faster or slower"
						min={-3} max={3} step={1} value={attributes.speed}
						className="c-attr-input"
						fieldClassName="c-attr-input__field"
						labelClassName="c-attr-input__key"
						outputClassName="c-attr-input__value" />

					<AttributeInput id="card-attr-defense"
						label="Defense"
						desc="How many units less or more vulnerable"
						min={-3} max={3} step={1} value={attributes.defense}
						className="c-attr-input"
						fieldClassName="c-attr-input__field"
						labelClassName="c-attr-input__key"
						outputClassName="c-attr-input__value" />
				</Gallery>
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

export default Card;
