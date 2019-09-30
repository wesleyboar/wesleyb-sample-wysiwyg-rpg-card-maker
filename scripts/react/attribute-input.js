// TODO: Propogate class name(s) from parent component

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
const useState = React.useState;

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
 * @param {String} props.value - Field value
 * @param {String} props.id - Field identifier
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {Number} props.min - Value minimum
 * @param {Number} props.max - Value maximum
 * @param {Number} [props.step] - Value increment
 */
function AttributeInput( props ) {
	const { id, label, desc, ...inputAttrs } = props;
	const [ value, setValue ] = useState( props.value );
	const [ signClassName, setSignClassName ] = useState('');

	// FAQ: The value prop must not be passed directly
	delete inputAttrs.value;

	function handleChange( e ) {
		setValue( e.target.value );
	}

	useEffect(() => {
		setSignClassName( ( value > 0 ) ? CLASSNAMES_AI.pos : CLASSNAMES_AI.neg );
	}, [ value ]);

	return (
		<React.Fragment>
			<label htmlFor={id}
				className="c-card__attr-key"
				title={desc}>{label}</label>
			<input id={id}
				className="c-card__attr-input"
				type="range" {...inputAttrs}
				value={value} onChange={handleChange} />
			<output htmlFor={id}
				className={"c-card__attr-value " + signClassName}>{value}</output>
		</React.Fragment>
	);
}
