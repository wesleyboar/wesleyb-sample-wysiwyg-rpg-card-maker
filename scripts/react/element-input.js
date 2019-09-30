// TODO: Consider running `setValue` on load
// TODO: Consider using `defaultProps`, not `props.elements || allElements`
// TODO: Make `onChange` optional, even if used currently

// NOTE: If processing, use `import`
// import PropTypes from 'prop-types';
// import CustomTypes from './custom-types.js';
// import * as allElements from '../elements.json';
const PropTypes = window.PropTypes;
const CustomTypes = window.CustomTypes;
const allElements = window.getJSONSync('scripts/elements.json');

/**
 * Called when input/field value changes
 * @callback ElementInput~onChange
 * @param {Boolean} value - Field value i.e. the element
 */

/**
 * An element input field as a select dropdown
 * @param {Object} props
 * @param {String} props.id - HTML `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {String} [props.value] - Field value i.e. the element
 * @param {String} [props.placeholder] - Realization of the `placeholder` attribute for the `select` dropdown
 * @param {OptionList} [props.elements=allElements] - The available element choices
 * @param {ElementInput~onChange} props.onChange - Callback on state change
 * @param {String} [props.labelClassName] - The `className` for the `label`
 * @param {String} [props.optionNamePrefix] - A prefix for the `name` of `option` tags
 */
function ElementInput( props ) {
	const elements = props.elements || allElements;
	const { id, label, desc, onChange, value, placeholder, labelClassName, optionNamePrefix, ...fieldAttrs } = props;

	let placeholderMarkup = '';

	function handleChange( e ) {
		onChange( e.target.value );
	}

	if ( placeholder ) {
		placeholderMarkup = (
			<option name={optionNamePrefix + "undefined"} hidden>{placeholder}</option>
		);
	}

	return (
		<React.Fragment>
			<label htmlFor={id} className={labelClassName}
				title={desc}>{label}</label>
			<select id={id} {...fieldAttrs}
				value={value} onChange={handleChange}>
				{placeholderMarkup}
				{elements.map( ( element, i ) =>
					<option key={i}
						name={optionNamePrefix + element.value}
						value={element.value}>{element.label || element.value}</option>
				)}
			</select>
		</React.Fragment>
	);
}
ElementInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	
	value: PropTypes.string,
	elements: CustomTypes.OptionList,
	labelClassName: PropTypes.string,
	optionNamePrefix: PropTypes.string,
}
