import React from 'react';
import PropTypes from 'prop-types';

// Data
import CustomTypes from '../services/custom-types.js';

// Services
import * as idService from '../../_shared/services/id.js';

/**
 * Create markup for options based on given data format
 * @param {OptionList|OptionGroupList} options - A list of option objects
 * @return {Array.<React.Element>}
 */
function getOptionsMarkup( options ) {
	const testOption = options[ 0 ];
	const isLikeOptionList = ( testOption.value != undefined);
	const isLikeOptionGroupList = ( testOption.options != undefined);

	if ( isLikeOptionGroupList ) return <OptionGroupList options={options} />;
	else if ( isLikeOptionList ) return <OptionList options={options} />;
}

/**
 * List of <optgroup>'s for a <select> dropdown field
 * @param {Object} props
 * @param {OptionGroupList} props.options - A list of available option groups
 * @return {React.Component}
 */
function OptionGroupList( props ) {
	const { options } = props;

	let identifiers = [];
	let key;

	return (
		<React.Fragment>
			{options.map(( group, i ) => {
				identifiers = [ group.label ];
				key = idService.create( group.id, identifiers, i );

				// NOTE: Too noisy and its okay to have no ID
				// idService.warn( group.id, `optgroup[label="${group.label}"]` );
				return (
					<optgroup key={key} label={group.label} data-key={key}>
						<OptionList options={group.options} groupLabel={group.label} />
					</optgroup>
				);
			})}
		</React.Fragment>
	);
}
OptionGroupList.propTypes = {
	options: CustomTypes.OptionGroupList.isRequired,
};

/**
 * List of <option>'s for a <select> dropdown field
 * @param {Object} props
 * @param {OptionList} props.options - A list of available options
 * @param {OptionList} [props.groupLabel] - The label of the parent <optgroup>
 * @return {React.Component}
 */
function OptionList( props ) {
	const { options, groupLabel } = props;

	let identifiers = [];
	let key;

	return (
		<React.Fragment>
			{options.map(( option, i ) => {
				identifiers = [ groupLabel, option.label, option.value ];
				key = idService.create( option.id, identifiers, i );

				// NOTE: Too noisy and its okay to have no ID
				// idService.warn( option.id, `option[value="${option.value}"]` );
				return (
					<option key={key} value={option.value} data-key={key}>
						{option.label || option.value}
					</option>
				);
			})}
		</React.Fragment>
	);
}
OptionList.propTypes = {
	options: CustomTypes.OptionList.isRequired,

	groupLabel: PropTypes.string,
};

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
};

export default Select;
export {
	OptionGroupList,
	OptionList
};
