// NOTE: If processing, use `import`
// import React, { useState } from 'react';
const { useState } = React;

/**
 * A form/kind/shape input field as a select dropdown
 * @param {Object} props
 * @param {String} props.value - Field value i.e. the form/kind/shape
 * @param {String} props.id - HTML `id` attribute for field
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {OptionGroupList} props.shapes - The available form choices
 * @param {String} [props.labelClassName] - The `className` for the `label`
 * @param {String} [props.outputClassName] - The `className` for the `output`
 * @param {String} [props.optionNamePrefix] - A prefix for the `name` of `option` tags
 */
function ShapeInput( props ) {
	const { id, label, desc, shapes: shapeSetList, labelClassName, outputClassName, optionNamePrefix, ...fieldAttrs } = props;
	const [ value, setValue ] = useState( props.value );

	function handleChange( e ) {
		setValue( e.target.value );
	}

	return (
		<React.Fragment>
			<label htmlFor={id} className={labelClassName}
				title={desc}>{label}</label>
			<select id={id} {...fieldAttrs}
				value={value} onChange={handleChange}>
				{shapeSetList.map( ( shapeSet, i ) =>
					<optgroup key={i}
						label={shapeSet.label}>
						{shapeSet.options.map( ( shape, j ) =>
							<option key={j}
								name={optionNamePrefix + shape.value}
								value={shape.value}>{shape.label}</option>
						)}
					</optgroup>
				)}
			</select>
			<output htmlFor={id} className={outputClassName}
				data-value={value}></output>
		</React.Fragment>
	);
}
