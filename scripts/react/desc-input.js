// NOTE: If processing, use `import`
// import PropTypes from 'prop-types';
const PropTypes = window.PropTypes;

// NOTE: The code of `NameInput` and `DescInput` are very similar, but the features may diverge; so, await further similarity before merging.
/**
 * A static description input field
 * @param {Object} props
 * @param {String} props.id - HTML `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {String} [props.value] - Field value i.e. the description
 * @param {String} [props.labelClassName] - The `className` for the `label`
 */
function DescInput( props ) {
	const { id, label, desc, value, labelClassName, ...fieldAttrs } = props;

	return (
		<React.Fragment>
			<label htmlFor={id}
				title={desc}
				className={labelClassName}>{label}</label>
			<textarea id={id} {...fieldAttrs}
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
