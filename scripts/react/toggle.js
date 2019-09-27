// TODO: Migrate `../card.js` manipulation of `disabled` attribute to here
// TODO: Propogate class name(s) from parent component

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
const useState = React.useState;

/**
 * A toggle widget that should cause side effect(s)
 * @param {Object} props
 * @param {String} props.id - Field identifier
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 */
function Toggle( props ) {
	const { id, label, desc } = props;

	return (
		<button role="presentation none" className="c-card__opt-toggle"
			type="button" tabIndex="-1">
			<input id={id} name="card_preview"
				type="checkbox" tabIndex="0" />
			<label htmlFor={id}
				title={desc}>{label}</label>
		</button>
	);
}
