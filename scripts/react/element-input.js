// TODO: Consider using `defaultProps`, not `props.elements || allElements`

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
// import * as allElements from '../elements.json';
const { useState } = React;
const allElements = getJSONSync('scripts/elements.json');

/**
 * Called when input/field value changes
 * @callback ElementInput~onChange
 * @param {Boolean} value - Field value i.e. the element
 */

/**
 * An element input field as a select dropdown
 * @param {Object} props
 * @param {String} props.value - Field value i.e. the element
 * @param {String} props.id - HTML `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {OptionList} [props.elements=allElements] - The available element choices
 * @param {ElementInput~onChange} props.onChange - Callback on state change
 * @param {String} [props.labelClassName] - The `className` for the `label`
 * @param {String} [props.optionNamePrefix] - A prefix for the `name` of `option` tags
 */
function ElementInput( props ) {
	const elements = props.elements || allElements;
	const { id, label, desc, value, onChange, labelClassName, optionNamePrefix, ...fieldAttrs } = props;

	function handleChange( e ) {
		onChange( e.target.value );
	}

	return (
		<React.Fragment>
			<label htmlFor={id} className={labelClassName}
				title={desc}>{label}</label>
			<select id={id} {...fieldAttrs}
				value={value} onChange={handleChange}>
				{elements.map( ( element, i ) =>
					<option key={i}
						name={optionNamePrefix + element.value}
						value={element.value}>{element.label}</option>
				)}
			</select>
		</React.Fragment>
	);
}
