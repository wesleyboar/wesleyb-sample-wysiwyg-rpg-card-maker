import React from 'react';
import PropTypes from 'prop-types';

// Services
import * as idService from '../../_shared/services/id.js';
import { joinClassNames } from '../../_shared/services/markup';

/**
 * A generic list of elements
 * @param {Object} props
 * @param {Array.<React.Element>} props.elements - A list of elements
 * @param {String} [props.tagName] - The markup tag for the each element
 * @param {String} [props.className] - The `className` for the each element
 * @return {Array.<React.Element>}
 */
function ElementList( props ) {
	const { elements } = props;

	let id;
	let key;
	let tagName;
	let className;

	return (
		<React.Fragment>
			{React.Children.map( elements, ( element, i ) => {
				id = element.props.id;
				key = idService.create( id, [], i );
				// FAQ: Element props take priority
				tagName = element.props.tagName || props.tagName;
				// FAQ: Element props must not be overridden
				className = joinClassNames([ props.className, element.props.className ]);
				idService.warn( id, `${tagName}.${className}`);

				return React.cloneElement( element, { key, tagName, className });
			})}
		</React.Fragment>
	);
}
ElementList.propTypes = {
	elements: PropTypes.array.isRequired,

	tagName: PropTypes.string,
	className: PropTypes.string,
};

export default ElementList;
