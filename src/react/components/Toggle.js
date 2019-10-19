import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Toggle.css';

// Services
import { joinClassNames } from '../../_shared/services/markup';

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
 * @param {String} [props.className] - Additional `className` for the markup tag of the root element
 * @param {String} [props.fieldClassName] - Additional `className` for the input field
 * @param {String} [props.labelClassName] - Additional `className` for the label text
 * @param {Toggle~onChange} [props.onChange] - Callback on state change
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the primary form element
 * @return {React.Component}
 */
function Toggle( props ) {
	const { id, label, desc, onChange, isOn: initialState, className, fieldClassName, labelClassName, ...markupAttrs } = props;
	const [ isOn, setIsOn ] = React.useState( initialState );

	// FAQ: We can manage change internally and externally
	function handleChange( e ) {
		setIsOn( e.target.checked );
	}
	React.useEffect(() => {
		if ( onChange ) onChange( isOn );
	}, [ isOn ]);

	return (
		<button role="presentation none"
			className={joinClassNames(['c-toggle', className])}
			type="button" tabIndex="-1" {...markupAttrs}>
			<input id={id}
				className={joinClassNames(['c-toggle__field', fieldClassName ])}
				type="checkbox" tabIndex="0"
				checked={isOn} onChange={handleChange} />
			<label htmlFor={id}
				className={joinClassNames(['c-toggle__label', labelClassName ])}
				title={desc}>{label}</label>
		</button>
	);
}
Toggle.defaultProps = {
	className: '',
	fieldClassName: '',
	labelClassName: '',
};
Toggle.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,

	isOn: PropTypes.bool,
	onChange: PropTypes.func,
	className: PropTypes.string,
	fieldClassName: PropTypes.string,
	labelClassName: PropTypes.string,
}

export default Toggle;
