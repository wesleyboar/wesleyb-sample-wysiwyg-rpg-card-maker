// TODO: Propogate class name(s) from parent component

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
const { useState } = React;

/**
 * A form/kind/shape input field as a select dropdown
 * @param {Object} props
 * @param {String} props.value - Field value i.e. the form/kind/shape
 * @param {String} props.id - Field identifier
 * @param {String} props.label - Field name for humans
 * @param {String} props.desc - Field description
 * @param {OptionGroupList} props.shapes - The available form choices
 */
function ShapeInput( props ) {
	const { id, label, desc, shapes: shapeSetList } = props;
	const [ value, setValue ] = useState( props.value );

	function handleChange( e ) {
		setValue( e.target.value );
	}

	return (
		<React.Fragment>
			<label htmlFor={id}
				title={desc}>{label}</label>
			<select id={id} className="c-card__metadata"
				value={value} onChange={handleChange}>
				{shapeSetList.map( ( shapeSet, i ) =>
					<optgroup key={i}
						label={shapeSet.label}>
						{shapeSet.options.map( ( shape, j ) =>
							<option key={j}
								name={"ident_shape_" + shape.value}
								value={shape.value}>{shape.label}</option>
						)}
					</optgroup>
				)}
			</select>
			<output htmlFor={id} className="c-card__figure"
				data-value={value}></output>
		</React.Fragment>
	);
}
