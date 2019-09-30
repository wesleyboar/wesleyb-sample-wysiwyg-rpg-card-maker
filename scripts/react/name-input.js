// TODO: Consider combining `NameInput` and `DescInput` into `TextInput`

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
// import * as defaultValues from '../entity-elements.json';
const useState = React.useState;

/**
 * A static name input field
 * @param {Object} props
 * @param {String} props.value - Field value i.e. the name
 * @param {String} props.id - HTML `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {String} [props.labelClassName] - The `className` for the `label`
 */
function NameInput( props ) {
	const { id, label, desc, value, labelClassName, ...fieldAttrs } = props;

	return (
		<React.Fragment>
			<label htmlFor={id}
				title={desc}
				className={labelClassName}>{label}</label>
			<input id={id} {...fieldAttrs}
				type="text" defaultValue={value} />
		</React.Fragment>
	);
}
