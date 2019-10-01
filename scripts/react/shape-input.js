// TODO: Remove ineffectual `name` attribute
// TODO: Have `ShapeInput` and `ElementInput` share new `Select` component

// NOTE: If processing, use `import`
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import CustomTypes from './custom-types.js';
const { useState, useEffect } = window.React;
const PropTypes = window.PropTypes;
const CustomTypes = window.CustomTypes;

/**
 * Called when input/field value changes
 * @callback ShapeInput~onChange
 * @param {String} value - Field value i.e. the shape
 */

/**
 * A form/kind/shape input field as a select dropdown
 * @param {Object} props
 * @param {String} props.id - HTML `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {OptionGroupList} props.shapes - The available form choices
 * @param {String} [props.value] - Field value i.e. the form/kind/shape
 * @param {String} [props.placeholder] - Realization of the `placeholder` attribute for the `select` dropdown
 * @param {String} [props.labelClassName] - The `className` for the `label`
 * @param {String} [props.outputClassName] - The `className` for the `output`
 * @param {String} [props.optionNamePrefix] - A prefix for the `name` of `option` tags
 * @param {ShapeInput~onChange} [props.onChange] - Callback on value change
 */
function ShapeInput( props ) {
	const { id, label, desc, shapes: shapeSetList, placeholder, labelClassName, outputClassName, optionNamePrefix, onChange, value: initialValue, ...fieldAttrs } = props;
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
			<option name={optionNamePrefix + "undefined"} hidden>{placeholder}</option>
		);
	}

	return (
		<React.Fragment>
			<label htmlFor={id} className={labelClassName}
				title={desc}>{label}</label>
			<select id={id} {...fieldAttrs}
				value={value} onChange={handleChange}>
				{placeholderMarkup}
				{shapeSetList.map( ( shapeSet, i ) =>
					<optgroup key={i}
						label={shapeSet.label}>
						{shapeSet.options.map( ( shape, j ) =>
							<option key={j}
								name={optionNamePrefix + shape.value}
								value={shape.value}>{shape.label || shape.value}</option>
						)}
					</optgroup>
				)}
			</select>
			<output htmlFor={id} className={outputClassName}
				data-value={value}></output>
		</React.Fragment>
	);
}
ShapeInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	shapes: CustomTypes.OptionGroupList.isRequired,

	value: PropTypes.string,
	placeholder: PropTypes.string,
	labelClassName: PropTypes.string,
	outputClassName: PropTypes.string,
	optionNamePrefix: PropTypes.string,
	onChange: PropTypes.func,
}
