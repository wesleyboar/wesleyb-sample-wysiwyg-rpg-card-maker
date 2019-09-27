// RFC: Consider combining `NameInput` and `DescInput` into `TextInput`
// TODO: Propogate class name(s) from parent component

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
// import * as defaultValues from '../entity-elements.json';
const useState = React.useState;

/**
 * A static name input field
 * @param {Object} props
 * @param {String} props.value - Field value i.e. the name
 * @param {String} props.id - Field identifier
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 */
function NameInput( props ) {
	const { id, label, desc, value } = props;

	return (
		<React.Fragment>
			<label htmlFor={id}
				title={desc}>{label}</label>
			<input id={id} className="c-card__name"
				type="text" defaultValue={value} />
		</React.Fragment>
	);
}
