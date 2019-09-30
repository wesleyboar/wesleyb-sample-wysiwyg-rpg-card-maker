// NOTE: If processing, use `import`
// import React, { useState } from 'react';
const { useState} = React;

/**
 * Called when toggle is toggled
 * @callback Toggle~onChange
 * @param {Boolean} isOn - Whether toggle is on/active
 */

/**
 * A toggle widget that should cause side effect(s)
 * @param {Object} props
 * @param {String} props.id - HTML `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {Boolean} props.isOn - Whether toggle is on/active
 * @param {Toggle~onChange} props.onChange - Callback on state change
 */
function Toggle( props ) {
	const { id, label, desc, isOn, onChange, name, ...fieldAttrs } = props;

	function handleChange( e ) {
		onChange( e.target.checked );
	}

	return (
		<button role="presentation none" {...fieldAttrs}
			type="button" tabIndex="-1">
			<input id={id} name={name}
				type="checkbox" tabIndex="0"
				checked={isOn} onChange={handleChange} />
			<label htmlFor={id}
				title={desc}>{label}</label>
		</button>
	);
}
