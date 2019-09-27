// TODO: Migrate `../card.js` manipulation of external `data-value` to here
// TODO: Propogate class name(s) from parent component

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
// import * as allElements from '../elements.json';
const useState = React.useState;
const allElements = getJSONSync('scripts/elements.json');

/**
 * An element input field as a select dropdown
 * @param {Object} props
 * @param {String} props.value - Field value i.e. the element
 * @param {String} props.id - Field identifier
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {OptionList} [props.elements=allElements] - The available element choices
 */
function ElementInput( props ) {
	const elements = props.elements || allElements;
	const { id, label, desc, value } = props;

	return (
		<React.Fragment>
			<label htmlFor={id}
				title={desc}>{label}</label>
			<select id={id} className="c-card__metadata"
				defaultValue={value}>
				{elements.map( ( element, i ) =>
					<option key={i}
						name={"ident_element_" + element.value}
						value={element.value}>{element.label}</option>
				)}
			</select>
		</React.Fragment>
	);
}
