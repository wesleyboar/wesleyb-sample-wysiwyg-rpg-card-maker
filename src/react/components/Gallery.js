import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Gallery.css';

// Components
import WrappedElementList from './WrappedElementList';
import ElementList from './ElementList';

// Services
import { joinClassNames } from '../../_shared/services/markup.js';

/**
 * Create markup for children
 * @param {Array.<React.Element>} children - A list of children
 * @param {Boolean} shouldWrap - Whether to create a wrapper for child
 * @param {Object} [jsxProps] - Extra `props` to give each element
 * @return {Array.<React.Element>}
 */
function getChildrenMarkup( children, shouldWrap, jsxProps ) {
	if ( shouldWrap )
		return <WrappedElementList elements={children} {...jsxProps} />;
	else
		return <ElementList elements={children} {...jsxProps} />;
}

/**
 * An attribute input field as a range
 *
 * - If `tagName` is provided, then gallery children have a wrapper.
 * - If `shouldWrapChildren` is `true`, then `child…` props apply to wrapper.
 * @param {Object} props
 * @param {Array.<React.Element>} props.children - Internal markup i.e. child elements
 * @param {String} [props.tagName=React.Fragment] - The markup tag for the component
 * @param {String} [props.className] - The `className` for the markup tag in which to wrap the attribute (requires `tagName`)
 * @param {Boolean} [props.shouldWrapChildren=false] - Whether to create children should wrap provided children elements
 * @param {String} [props.childTagName] - The markup tag for the each child
 * @param {String} [props.childClassName] - The `className` for the each child
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the root element
 * @return {React.Component}
 */
function Gallery( props ) {
	const { children, tagName, className, shouldWrapChildren, childTagName, childClassName, ...markupAttrs } = props;
	const childrenMarkup = getChildrenMarkup( children, shouldWrapChildren, {
		tagName: childTagName,
		className: joinClassNames(['c-gallery__item', childClassName ])
	});
	const TagName = tagName || React.Fragment;

	return (
		<TagName {...markupAttrs}
			className={joinClassNames(['c-gallery', className ])}>
			{childrenMarkup}
		</TagName>
	);
}
Gallery.propTypes = {
	children: PropTypes.array.isRequired,

	tagName: PropTypes.string,
	className: PropTypes.string,
	shouldWrapChildren: PropTypes.bool,
	childTagName: PropTypes.string,
	childClassName: PropTypes.string,
};

export default Gallery;
