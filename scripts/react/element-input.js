// TODO: Migrate `../card.js` manipulation of external `data-value` to here

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
// import * as defaultValues from '../entity-elements.json';
const useState = React.useState;
const defaultElements = getJSONSync('scripts/entity-elements.json');

/**
 * An element input field as a select dropdown
 * @param {Object} props
 * @param {String} props.value - Field value i.e. the element
 * @param {String} props.id - Field identifier
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {Array.<{value: String, label: String}>} [props.elements] - The available element choices (defaults to all elements)
 */
function ElementInput( props ) {
	const elements = props.elements || defaultElements;
	const { id, label, desc, value } = props;

	return (
		<React.Fragment>
			<label htmlFor={id}
				title={desc}>{label}</label>
			<select id={id} className="c-card__metadata"
				defaultValue={value}>
				{elements.map( ( element, index ) =>
					<option key={index}
						name={"ident_element_" + element.value}
						value={element.value}>{element.label}</option>
				)}
			</select>
		</React.Fragment>
	);
}
