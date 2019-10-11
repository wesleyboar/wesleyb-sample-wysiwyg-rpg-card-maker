// TODO: Use `React.Children.map( children, … )`, not `children.map( … )`
import React from 'react';
import PropTypes from 'prop-types';

// Services
import * as idService from '../../_shared/services/id.js';

/** The markup tag used if markup is needed but not defined **/
const defaultTagName = 'div';

/**
 * A generic list of elements
 * @param {Object} props
 * @param {Array.<React.Element>} props.elements - A list of elements
 * @param {String} [props.tagName] - The markup tag for the each element
 * @param {String} [props.className] - The `className` for the each element
 * @return {Array.<React.Element>}
 */
function WrappedElementList( props ) {
	const { elements, tagName, className } = props;
	const TagName = tagName || defaultTagName;

	let id;
	let key;

	return (
		<React.Fragment>
			{elements.map(( element, i ) => {
				id = element.props.id;
				key = idService.create( id, [], i );
				idService.warn( id, `${tagName}.${className}`);

				return (
					<TagName key={key} className={className}>
						{element}
					</TagName>
				);
			})}
		</React.Fragment>
	);
}
WrappedElementList.propTypes = {
	elements: PropTypes.array.isRequired,

	tagName: PropTypes.string,
	className: PropTypes.string,
};

export default WrappedElementList;
