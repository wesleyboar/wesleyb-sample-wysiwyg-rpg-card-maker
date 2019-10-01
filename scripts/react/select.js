// TODO: Use `nanoid` for unique IDs for JSX attribute `key`—requires processing
// TODO: Migrate from `key={….id || i}` to `key={…id}` (must split markup)

// NOTE: If processing, use `import`
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import CustomTypes from './custom-types.js';
const { useState, useEffect } = window.React, React = window.React;
const PropTypes = window.PropTypes;
const CustomTypes = window.CustomTypes;

/**
 * Create markup for options based on given data format
 * @param {OptionList|OptionGroupList} options A list of option objects
 * @return {React.Element}
 */
function getOptionsMarkup( options ) {
	const testOption = options[ 0 ];
	const isLikeOptionList = ( testOption.value != undefined);
	const isLikeOptionGroupList = ( testOption.options != undefined);

	if ( isLikeOptionGroupList ) return <OptGroupList options={options} />;
	else if ( isLikeOptionList ) return <OptionList options={options} />;
}

/**
 * Options (grouped) for a select dropdown field
 * @param {Object} props
 * @param {OptionGroupList} props.options - A list of available option groups
 * @return {React.Component}
 */
function OptGroupList( props ) {
	const { options } = props;

	return (
		<React.Fragment>
			{options.map( ( group, i ) =>
				<optgroup key={group.id || group.label + "_" + group.value || i}
					label={group.label}>
					<OptionList options={group.options} />
				</optgroup>
			)}
		</React.Fragment>
	);
}
OptGroupList.propTypes = {
	options: CustomTypes.OptionGroupList.isRequired,
}

/**
 * Options (not grouped) for a select dropdown field
 * @param {Object} props
 * @param {OptionList} props.options - A list of available options
 * @return {React.Component}
 */
function OptionList( props ) {
	const { options } = props;

	return (
		<React.Fragment>
			{options.map( ( option, j ) =>
				<option key={option.id || option.label + "_" + option.value || j}
					value={option.value}>{option.label || option.value}</option>
			)}
		</React.Fragment>
	);
}
OptionList.propTypes = {
	options: CustomTypes.OptionList.isRequired,
}

/**
 * A select dropdown field
 * @param {Object} props
 * @param {String} props.id - Markup `id` attribute for field
 * @param {OptionList|OptionGroupList} props.options - The available options
 * @param {String} [props.value] - Field value i.e. the form/kind/shape
 * @param {String} [props.placeholder] - Realization of the `placeholder` attribute for the `select` dropdown
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the select element
 * @return {React.Component}
 */
function Select( props ) {
	const { id, options, value: initialValue, placeholder, ...markupAttrs } = props;
	const [ value, setValue ] = useState( initialValue );
	const optionsMarkup = getOptionsMarkup( options );

	// FAQ: The default DOM value for `select` element that is unknown to React
	useEffect(() => {
		if ( ! value ) setValue( document.getElementById( id ).value );
	});

	let placeholderMarkup;
	if ( placeholder ) {
		placeholderMarkup = (
			<option hidden>{placeholder}</option>
		);
	}

	return (
		<select id={id} value={value} {...markupAttrs}>
			{placeholderMarkup}
			{optionsMarkup}
		</select>
	);
}
Select.propTypes = {
	id: PropTypes.string.isRequired,
	options: CustomTypes.Options.isRequired,

	value: PropTypes.string,
	placeholder: PropTypes.string,
}