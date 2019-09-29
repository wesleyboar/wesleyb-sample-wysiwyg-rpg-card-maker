// TODO: Propogate class name(s) from parent component

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
const useState = React.useState;

/**
 * This callback is displayed as part of the Requester class.
 * @callback Toggle~onIsActiveChange
 * @param {Boolean} isActive - Whether toggle is on/active
 */

/**
 * A toggle widget that should cause side effect(s)
 * @param {Object} props
 * @param {String} props.id - Field identifier
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {Boolean} props.isActive - Whether toggle is on/active
 * @param {Toggle~onIsActiveChange} props.onIsActiveChange - Callback on state change
 */
function Toggle( props ) {
	const { id, label, desc, isActive, onIsActiveChange } = props;

	function handleChange( event ) {
		onIsActiveChange( event.target.checked );
	}

	return (
		<button role="presentation none" className="c-card__opt-toggle"
			type="button" tabIndex="-1">
			<input id={id} name="card_preview"
				type="checkbox" tabIndex="0"
				checked={isActive} onChange={handleChange} />
			<label htmlFor={id}
				title={desc}>{label}</label>
		</button>
	);
}
