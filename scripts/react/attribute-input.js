// TODO: Consider using `defaultProps`, not `props.value || 0`

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
const { useState, useEffect } = window.React;
const PropTypes = window.PropTypes;

/** Dynamically-applied CSS class names */
/* TODO: Get rid of `_AI`… */
/* NOTE: The `type="text/babel"` does not have the isolation effect of `type="module"` */
/* WARN: No hackless solution exists on the Internet, yet; but, babel has a PR… */
/* SEE: https://github.com/babel/babel/pull/8410 */
const CLASSNAMES_AI = {
  neg: 'is-negative',
  pos: 'is-positive'
}

/**
 * An attribute input field as a range
 * @param {Object} props
 * @param {String} props.id - HTML `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {Number} props.min - Value minimum
 * @param {Number} props.max - Value maximum
 * @param {Number} [props.step] - Value increment
 * @param {String} [props.value=0] - Field value
 * @param {String} [props.labelClassName] - The `className` for the `label`
 * @param {String} [props.outputClassName] - The `className` for the `output`
 */
function AttributeInput( props ) {
	const { id, label, desc, labelClassName, outputClassName, ...fieldAttrs } = props;
	const [ value, setValue ] = useState( props.value || 0 );
	const [ signClassName, setSignClassName ] = useState('');

	// FAQ: The value prop must not be passed directly
	delete fieldAttrs.value;

	function handleChange( e ) {
		setValue( e.target.value );
	}

	useEffect(() => {
		setSignClassName( ( value > 0 ) ? CLASSNAMES_AI.pos : CLASSNAMES_AI.neg );
	}, [ value ]);

	return (
		<React.Fragment>
			<label htmlFor={id}
				className={labelClassName}
				title={desc}>{label}</label>
			<input id={id}
				type="range" {...fieldAttrs}
				value={value} onChange={handleChange} />
			<output htmlFor={id}
				className={outputClassName + " " + signClassName}>{value}</output>
		</React.Fragment>
	);
}
AttributeInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	
	step: PropTypes.number,
	value: PropTypes.number,
	labelClassName: PropTypes.string,
	outputClassName: PropTypes.string,
}
