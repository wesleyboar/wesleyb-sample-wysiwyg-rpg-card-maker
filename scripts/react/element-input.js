// TODO: Use `nanoid` for unique IDs for JSX attribute `key`—requires processing

// NOTE: If processing, use `import`
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import CustomTypes from './custom-types.js';
// import * as allElements from '../elements.json';
const { useState, useEffect } = window.React, React = window.React;
const PropTypes = window.PropTypes;
const CustomTypes = window.CustomTypes;
const allElements = window.getJSONSync('scripts/elements.json');
const { Select } = window;

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
 * @param {String} [props.labelClassName] - The `className` for the `label`
 * @param {ElementInput~onChange} [props.onChange] - Callback on value change
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the primary form element
 * @return {React.Component}
 */
function ElementInput( props ) {
	const { id, label, desc, value: initialValue, elements: options = allElements, labelClassName, onChange, ...jsxAttrs } = props;
	const [ value, setValue ] = useState( initialValue );

	// FAQ: We can manage change internally and externally
	function handleChange( e ) {
		setValue( e.target.value );
	}
	useEffect(() => {
		if ( onChange ) onChange( value );
	}, [ value ]);

	return (
		<React.Fragment>
			<label htmlFor={id} className={labelClassName}
				title={desc}>{label}</label>
			<Select id={id} options={options} value={value}
				onChange={handleChange} {...jsxAttrs} />
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
