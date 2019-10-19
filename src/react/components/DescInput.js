import React from 'react';
import PropTypes from 'prop-types';

// NOTE: The code of `NameInput` and `DescInput` are very similar, but the features may diverge; so, await further similarity before merging.
/**
 * A static description input field
 * @param {Object} props
 * @param {String} props.id - Markup `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {String} [props.value] - Field value i.e. the description
 * @param {String} [props.labelClassName] - The `className` for the label text
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the primary form element
 * @return {React.Component}
 */
function DescInput( props ) {
	const { id, label, desc, value, labelClassName, ...markupAttrs } = props;

	return (
		<React.Fragment>
			<label htmlFor={id} className={labelClassName}
				title={desc}>{label}</label>
			<textarea id={id} {...markupAttrs}
				type="text" defaultValue={value} />
		</React.Fragment>
	);
}
DescInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	
	value: PropTypes.string,
	labelClassName: PropTypes.string,
}

export default DescInput;
