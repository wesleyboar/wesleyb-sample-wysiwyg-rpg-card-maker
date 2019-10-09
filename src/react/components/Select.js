import React from 'react';
import PropTypes from 'prop-types';

// Data
import CustomTypes from '../services/custom-types.js';

// Services
import { getKey } from '../../_shared/scripts/react-helpers.js';

/**
 * Create markup for options based on given data format
 * @param {OptionList|OptionGroupList} options A list of option objects
 * @return {React.Element}
 */
function getOptionsMarkup( options ) {
	const testOption = options[ 0 ];
	const isLikeOptionList = ( testOption.value != undefined);
	const isLikeOptionGroupList = ( testOption.options != undefined);

	if ( isLikeOptionGroupList ) return <OptionGroupList options={options} />;
	else if ( isLikeOptionList ) return <OptionList options={options} />;
}

/**
 * Options (grouped) for a select dropdown field
 * @param {Object} props
 * @param {OptionGroupList} props.options - A list of available option groups
 * @return {React.Component}
 */
function OptionGroupList( props ) {
	const { options } = props;
	let key;

	return (
		<React.Fragment>
			{options.map( ( group, i ) => {
				key = getKey( group.id, [ group.label ], i );
				return (
					<optgroup label={group.label} key={group.id || key || i}>
						<OptionList options={group.options} />
					</optgroup>
				);
			})}
		</React.Fragment>
	);
}
OptionGroupList.propTypes = {
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
	let key;

	return (
		<React.Fragment>
			{options.map( ( option, i ) => {
				key = getKey( option.id, [ option.label, option.value ], i );
				return (
					<option value={option.value} key={key}>
						{option.label || option.value}
					</option>
				);
			})}
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
	const [ value, setValue ] = React.useState( initialValue );
	const optionsMarkup = getOptionsMarkup( options );

	// FAQ: The default DOM value for `select` element that is unknown to React
	React.useEffect(() => {
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

export default Select;
export {
	OptionGroupList,
	OptionList
};
