import React from 'react';
import PropTypes from 'prop-types';

// Services
import * as idService from '../../_shared/services/id.js';
import { joinClassNames } from '../../_shared/services/markup';

/** The markup tag used if markup is needed but not defined **/
const defaultTagName = 'div';

/**
 * A generic list of elements
 * @param {Object} props
 * @param {Array.<React.Element>} props.elements - A list of elements
 * @param {String} [props.tagName=React.Fragment] - The markup tag for the each element
 * @param {String} [props.className] - The `className` for the each element
 * @return {Array.<React.Element>}
 */
function WrappedElementList( props ) {
	const { elements, tagName: TagName = React.Fragment, className } = props;
	const tagAttrs = {};

	let id, identifiers = [], key;

	// Avoid passing illegal attributes to `React.Fragment`
	if ( TagName !== React.Fragment && className ) {
		tagAttrs.className = joinClassNames(['c-attr-input', className]);
	}

	return (
		<React.Fragment>
			{React.Children.map( elements, ( element, i ) => {
				id = element.props.key || element.props.id;
				identifiers = [];
				key = idService.create( id, identifiers, i );
				idService.warn( id, `${props.tagName}.${className}`);

				return (
					<TagName key={key} {...tagAttrs}>
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
