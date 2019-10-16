import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Toggle.css';

/**
 * Called when toggle is toggled
 * @callback Toggle~onChange
 * @param {Boolean} isOn - Whether toggle is on/active
 */

/**
 * A toggle widget that should cause side effect(s)
 * @param {Object} props
 * @param {String} props.id - Markup `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {Boolean} [props.isOn] - Whether toggle is on/active
 * @param {String} [props.fieldClassName] - The `className` for the input field
 * @param {String} [props.labelClassName] - The `className` for the label text
 * @param {Toggle~onChange} [props.onChange] - Callback on state change
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the primary form element
 * @return {React.Component}
 */
function Toggle( props ) {
	const { id, label, desc, onChange, isOn: initialState, fieldClassName, labelClassName, ...markupAttrs } = props;
	const [ isOn, setIsOn ] = React.useState( initialState );

	// FAQ: We can manage change internally and externally
	function handleChange( e ) {
		setIsOn( e.target.checked );
	}
	React.useEffect(() => {
		if ( onChange ) onChange( isOn );
	}, [ isOn ]);

	return (
		<button role="presentation none" {...markupAttrs}
			type="button" tabIndex="-1">
			<input id={id} className={fieldClassName}
				type="checkbox" tabIndex="0"
				checked={isOn} onChange={handleChange} />
			<label htmlFor={id} className={labelClassName}
				title={desc}>{label}</label>
		</button>
	);
}
Toggle.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,

	isOn: PropTypes.bool,
	onChange: PropTypes.func,
	fieldClassName: PropTypes.string,
	labelClassName: PropTypes.string,
}

export default Toggle;
