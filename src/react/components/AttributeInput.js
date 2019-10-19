import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './AttributeInput.css';

// Services
import { joinClassNames } from '../../_shared/services/markup';

/** Dynamically-applied CSS class names */
const CLASSNAMES = {
  neg: 'is-negative',
  pos: 'is-positive'
}

/**
 * Called when input/field value changes
 * @callback AttributeInput~onChange
 * @param {String} value - Field value
 */

/**
 * An attribute input field as a range
 *
 * - If `tagName` is provided, then attribute markup has a wrapper.
 * @param {Object} props
 * @param {String} props.id - Markup `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {Number} props.min - Value minimum
 * @param {Number} props.max - Value maximum
 * @param {Number} [props.step] - Value increment
 * @param {String} [props.value=0] - Field value
 * @param {String} [props.key] - React `key` attribute
 * @param {String} [props.tagName=React.Fragment] - The markup tag in which to wrap the attribute
 * @param {String} [props.className] - The `className` for the markup tag in which to wrap the attribute (requires `tagName`)
 * @param {String} [props.fieldClassName] - The `className` for the input field
 * @param {String} [props.labelClassName] - The `className` for the label text
 * @param {String} [props.outputClassName] - The `className` for the `output`
 * @param {AttributeInput~onChange} [props.onChange] - Callback on value change
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the primary form element
 * @return {React.Component}
 */
function AttributeInput( props ) {
	const { id, label, desc, value: initialValue = 0, key, tagName: TagName = React.Fragment, className, fieldClassName, labelClassName, outputClassName, onChange, ...markupAttrs } = props;
	const [ value, setValue ] = React.useState( initialValue );
	const [ signClassName, setSignClassName ] = React.useState('');
	const tagAttrs = {};

	function handleChange( e ) {
		setValue( e.target.value );
	}
	React.useEffect(() => {
		if ( onChange ) onChange( value );
    // 13: Determine and evaluate type of value
		setSignClassName( ( value > 0 ) ? CLASSNAMES.pos : CLASSNAMES.neg );
	}, [ value ]);

	// Avoid passing illegal attributes to `React.Fragment`
	if ( TagName !== React.Fragment && className ) {
		tagAttrs.className = joinClassNames(['c-attr-input', className]);
	}

	return (
		<TagName key={key} {...tagAttrs}>
			<label htmlFor={id}
				className={joinClassNames(['c-attr-input__key', labelClassName ])}
				title={desc}>{label}</label>
			<input id={id}
				className={joinClassNames(['c-attr-input__field', fieldClassName ])}
				type="range" {...markupAttrs}
				value={value} onChange={handleChange} />
			<output htmlFor={id}
				className={joinClassNames(['c-attr-input__value', outputClassName, signClassName ])}>
				{value}
			</output>
		</TagName>
	);
}
AttributeInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,

	step: PropTypes.number,
	value: PropTypes.number,
	tagName: PropTypes.string,
	className: PropTypes.string,
	fieldClassName: PropTypes.string,
	labelClassName: PropTypes.string,
	outputClassName: PropTypes.string,
	onChange: PropTypes.func,
}

export default AttributeInput;
