// TODO: Consider using `defaultProps`, not `props.elements || allElements`
// TODO: Have `ShapeInput` and `ElementInput` share new `Select` component

// NOTE: If processing, use `import`
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import CustomTypes from './custom-types.js';
// import * as allElements from '../elements.json';
const { useState, useEffect } = window.React;
const PropTypes = window.PropTypes;
const CustomTypes = window.CustomTypes;
const allElements = window.getJSONSync('scripts/elements.json');

/**
 * Called when input/field value changes
 * @callback ElementInput~onChange
 * @param {String} value - Field value i.e. the element
 */

/**
 * An element input field as a select dropdown
 * @param {Object} props
 * @param {String} props.id - HTML `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {String} [props.value] - Field value i.e. the element
 * @param {String} [props.placeholder] - Realization of the `placeholder` attribute for the `select` dropdown
 * @param {OptionList} [props.elements=allElements] - The available element choices
 * @param {String} [props.labelClassName] - The `className` for the `label`
 * @param {ElementInput~onChange} [props.onChange] - Callback on value change
 */
function ElementInput( props ) {
	const elements = props.elements || allElements;
	const { id, label, desc, placeholder, labelClassName, onChange, value: initialValue, ...fieldAttrs } = props;
	const [ value, setValue ] = useState( initialValue );

	// FAQ: We can manage change internally and externally
	function handleChange( e ) {
		setValue( e.target.value );
	}
	useEffect(() => {
		if ( onChange ) onChange( value );
	}, [ value ]);
	// FAQ: The default DOM value for select element that is unknown to React
	useEffect(() => {
		if ( ! value ) setValue( document.getElementById( id ).value );
	});

	let placeholderMarkup = '';
	if ( placeholder ) {
		placeholderMarkup = (
			<option hidden>{placeholder}</option>
		);
	}

	return (
		<React.Fragment>
			<label htmlFor={id} className={labelClassName}
				title={desc}>{label}</label>
			<select id={id} {...fieldAttrs}
				value={value} onChange={handleChange}>
				{placeholderMarkup}
				{elements.map( ( element, i ) =>
					<option key={i} value={element.value}>{element.label || element.value}</option>
				)}
			</select>
		</React.Fragment>
	);
}
ElementInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,

	value: PropTypes.string,
	placeholder: PropTypes.string,
	elements: CustomTypes.OptionList,
	labelClassName: PropTypes.string,
	onChange: PropTypes.func,
}
