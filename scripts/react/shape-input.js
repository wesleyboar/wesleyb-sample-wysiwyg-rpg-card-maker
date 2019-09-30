// TODO: Consider running `setValue` on load
// TODO: Remove ineffectual `name` attribute
// TODO: Support optional `onChange`, even if unused currently

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import CustomTypes from './custom-types.js';
const { useState } = window.React;
const PropTypes = window.PropTypes;
const CustomTypes = window.CustomTypes;

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
 */
function ShapeInput( props ) {
	const { id, label, desc, shapes: shapeSetList, placeholder, labelClassName, outputClassName, optionNamePrefix, ...fieldAttrs } = props;
	const [ value, setValue ] = useState( props.value );

	let placeholderMarkup = '';

	function handleChange( e ) {
		setValue( e.target.value );
	}

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
}
