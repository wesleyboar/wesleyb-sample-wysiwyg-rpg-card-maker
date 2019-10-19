import React from 'react';
import PropTypes from 'prop-types';

// Components
import Select from './Select.js';

// Data
import CustomTypes from '../services/custom-types.js';
import allElements from '../../_shared/elements.json';

/**
 * Called when input/field value changes
 * @callback ElementInput~onChange
 * @param {String} value - Field value i.e. the element
 */

/**
 * An element input field as a select dropdown
 * @param {Object} props
 * @param {String} props.id - Markup `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {String} [props.value] - Field value i.e. the element
 * @param {OptionList|OptionGroupList} [props.elements=allElements] - The available element choices
 * @param {String} [props.placeholder] - Realization of the `placeholder` attribute for the `select` dropdown
 * @param {String} [props.labelClassName] - The `className` for the label text
 * @param {ElementInput~onChange} [props.onChange] - Callback on value change
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the primary form element
 * @return {React.Component}
 */
function ElementInput( props ) {
	const { id, label, desc, value: initialValue, elements: options = allElements, labelClassName, onChange, ...jsxProps } = props;
	const [ value, setValue ] = React.useState( initialValue );

	// We must handle value change internally
	function handleChange( value ) {
		setValue( value );
	}
	// We must allow consumer to handle value change
	React.useEffect(() => {
		if ( onChange ) onChange( value );
	}, [ value ]);

	return (
		<React.Fragment>
			<label htmlFor={id} className={labelClassName}
				title={desc}>{label}</label>
			<Select id={id} options={options} value={value}
				onChange={handleChange} {...jsxProps} />
		</React.Fragment>
	);
}
ElementInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,

	value: PropTypes.string,
	placeholder: PropTypes.string,
	elements: CustomTypes.Options,
	labelClassName: PropTypes.string,
	onChange: PropTypes.func,
}

export default ElementInput;
