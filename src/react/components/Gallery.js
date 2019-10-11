// TODO: Use `React.Children.map( children, … )`, not `children.map( … )`
import React from 'react';
import PropTypes from 'prop-types';

// Components
import WrappedElementList from './WrappedElementList';
import ElementList from './ElementList';

// Styles
import './Gallery.css';

/** The markup tag used if markup is needed but not defined **/
const defaultTagName = 'div';

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
 * _If either `tagName` or `className` is provided, the markup will be wrapped in an element that uses those properties._
 * @param {Object} props
 * @param {Array.<React.Element>} props.children - Internal markup i.e. child elements
 * @param {String} [props.tagName=React.Fragment||"div"] - The markup tag for the component
 * @param {String} [props.className] - The `className` for the markup tag in which to wrap the attribute
 * @param {Boolean} [props.shouldWrapChildren=false] - Wether to create children should wrap provided children elements
 * @param {String} [props.childTagName] - The markup tag for the each child (if `shouldWrapChildren={true}`, tag is for wrapper; otherwise, child is passed value as `tagName` property)
 * @param {String} [props.childClassName] - The `className` for the each child (if `shouldWrapChildren={true}`, class is for wrapper; otherwise, child is passed value as `className` property)
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the primary form element
 * @return {React.Component}
 */
function Gallery( props ) {
	const { children, tagName, className, shouldWrapChildren, childTagName, childClassName, ...markupAttrs } = props;
	const childrenMarkup = getChildrenMarkup( children, shouldWrapChildren, {
		tagName: childTagName,
		className: childClassName
	});
	const TagName = tagName || ( className ) ? defaultTagName : React.Fragment;

	return (
		<TagName {...markupAttrs}>
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
