import React from 'react';
import PropTypes from 'prop-types';

// NOTE: The code of `NameInput` and `DescInput` are very similar, but the features may diverge; so, await further similarity before merging.
/**
 * A static name input field
 * @param {Object} props
 * @param {String} props.id - Markup `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {String} [props.value] - Field value i.e. the name
 * @param {String} [props.labelClassName] - The `className` for the `label`
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the primary form element
 * @return {React.Component}
 */
function NameInput( props ) {
	const { id, label, desc, value, labelClassName, ...markupAttrs } = props;

	return (
		<React.Fragment>
			<label htmlFor={id}
				title={desc}
				className={labelClassName}>{label}</label>
			<input id={id} {...markupAttrs}
				type="text" defaultValue={value} />
		</React.Fragment>
	);
}
NameInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	
	value: PropTypes.string,
	labelClassName: PropTypes.string,
}

export default NameInput;
