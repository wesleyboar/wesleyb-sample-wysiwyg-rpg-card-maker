// TODO: Propogate class name(s) from parent component
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
 * @param {String} props.id - Field identifier
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {OptionList} [props.elements=allElements] - The available element choices
 * @param {ElementInput~onChange} props.onChange - Callback on state change
 */
function ElementInput( props ) {
	const elements = props.elements || allElements;
	const { id, label, desc, value, onChange } = props;

	function handleChange( e ) {
		onChange( e.target.value );
	}

	return (
		<React.Fragment>
			<label htmlFor={id}
				title={desc}>{label}</label>
			<select id={id} className="c-card__metadata"
				value={value} onChange={handleChange}>
				{elements.map( ( element, i ) =>
					<option key={i}
						name={"ident_element_" + element.value}
						value={element.value}>{element.label}</option>
				)}
			</select>
		</React.Fragment>
	);
}
