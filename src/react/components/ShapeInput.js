import React from 'react';
import PropTypes from 'prop-types';

// Components
import Select from './Select.js';
import MediaOutput from './MediaOutput.js';

// Data
import CustomTypes from '../services/custom-types.js';
import shapeMediaDataList from '../../_shared/data/media/shapes--item.json';

/**
 * Called when input/field value changes
 * @callback ShapeInput~onChange
 * @param {String} value - Field value i.e. the shape
 */

/**
 * Get media data that matches the given identifier
 * @param {MediaDataIdent} ident - The identifier of the desired media data
 * @param {MediaDataList} list - The list of media data
 */
function getMediaData( ident, list ) {
	return list.find( data => data.ident === ident );
}

/**
 * A form/kind/shape input field as a select dropdown
 * @param {Object} props
 * @param {String} props.id - Markup `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {OptionList|OptionGroupList} props.shapes - The available form choices
 * @param {String} [props.value] - Field value i.e. the form/kind/shape
 * @param {String} [props.placeholder] - Realization of the `placeholder` attribute for the `select` dropdown
 * @param {String} [props.labelClassName] - The `className` for the label text
 * @param {String} [props.outputClassName] - The `className` for the `output`
 * @param {ShapeInput~onChange} [props.onChange] - Callback on value change
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the primary form element
 * @return {React.Component}
 */
function ShapeInput( props ) {
	const { id, label, desc, shapes: options, value: initialValue, labelClassName, outputClassName, onChange, ...jsxProps } = props;
	const [ value, setValue ] = React.useState( initialValue );
	const initialStyle = getMediaData( value, shapeMediaDataList );
	const [ mediaData, setMediaData ] = React.useState( initialStyle );

	// We must handle value change internally
	function handleChange( value ) {
		setValue( value );
	}
	// We must allow consumer to handle value change
	React.useEffect(() => {
		let newMediaData = getMediaData( value, shapeMediaDataList );

		console.info('ShapeInput', { value, newMediaData });

		setMediaData( newMediaData );
		if ( onChange ) onChange( value );
	}, [ value ]);

	return (
		<React.Fragment>
			<label htmlFor={id} className={labelClassName}
				title={desc}>{label}</label>
			<Select id={id} options={options} value={value}
				onChange={handleChange} {...jsxProps} />
			<MediaOutput htmlFor={id} className={outputClassName}
				mediaData={mediaData} />
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

export default ShapeInput;
