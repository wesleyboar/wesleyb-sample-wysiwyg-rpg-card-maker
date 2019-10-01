// TODO: Have `ShapeInput` and `ElementInput` share new `Select` component
// TODO: Use `nanoid` for unique IDs for JSX attribute `key`—requires processing

// NOTE: If processing, use `import`
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import CustomTypes from './custom-types.js';
const { useState, useEffect } = window.React, React = window.React;
const PropTypes = window.PropTypes;
const CustomTypes = window.CustomTypes;
const { Select } = window;

/**
 * Called when input/field value changes
 * @callback ShapeInput~onChange
 * @param {String} value - Field value i.e. the shape
 */

/**
 * A form/kind/shape input field as a select dropdown
 * @param {Object} props
 * @param {String} props.id - Markup `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {OptionList|OptionGroupList} props.shapes - The available form choices
 * @param {String} [props.value] - Field value i.e. the form/kind/shape
 * @param {String} [props.placeholder] - Realization of the `placeholder` attribute for the `select` dropdown
 * @param {String} [props.labelClassName] - The `className` for the `label`
 * @param {String} [props.outputClassName] - The `className` for the `output`
 * @param {ShapeInput~onChange} [props.onChange] - Callback on value change
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the primary form element
 * @return {React.Component}
 */
function ShapeInput( props ) {
	const { id, label, desc, shapes: options, value: initialValue, labelClassName, outputClassName, onChange, ...jsxAttrs } = props;
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
			<output htmlFor={id} className={outputClassName}
				data-value={value}></output>
		</React.Fragment>
	);
}
ShapeInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	shapes: CustomTypes.Options.isRequired,

	value: PropTypes.string,
	placeholder: PropTypes.string,
	labelClassName: PropTypes.string,
	outputClassName: PropTypes.string,
	onChange: PropTypes.func,
}
