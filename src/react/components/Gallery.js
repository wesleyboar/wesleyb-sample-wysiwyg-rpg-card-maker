// TODO: Extract `WrappedElementList` and `ElementList`
// TODO: Use `React.Children.map( children, … )`, not `children.map( … )`
import React from 'react';
import PropTypes from 'prop-types';

// Services
import * as idService from '../../_shared/services/id.js';

// Styles
import './Gallery.css';

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
			{elements.map(( element, i ) => {
				id = element.props.id;
				key = idService.create( id, [], i );
				// FAQ: Element props take priority
				tagName = element.props.tagName || props.tagName;
				// FAQ: Element props must not be overridden
				className = props.className + ' ' + element.props.className;
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

/**
 * Create markup for children
 * @param {Array.<React.Element>} children - A list of children
 * @param {Boolean} shouldWrap - Whether to create a wrapper for child
 * @param {Object} [extraProps] - Extra `props` to give each element
 * @return {Array.<React.Element>}
 */
function getChildrenMarkup( children, shouldWrap, extraProps ) {
	if ( shouldWrap )
		return <WrappedElementList elements={children} {...extraProps} />;
	else
		return <ElementList elements={children} {...extraProps} />;
}

/**
 * An attribute input field as a range
 * @param {Object} props
 * @param {Array.<React.Element>} props.children - Internal markup i.e. child elements
 * @param {String} [props.tagName="div"] - The markup tag for the component
 * @param {Boolean} [props.shouldWrapChildren=false] - Wether to create children should wrap provided children elements
 * @param {String} [props.childTagName] - The markup tag for the each child (if `shouldWrapChildren={true}`, tag is for wrapper; otherwise, child is passed value as `tagName` property)
 * @param {String} [props.childClassName] - The `className` for the each child (if `shouldWrapChildren={true}`, class is for wrapper; otherwise, child is passed value as `className` property)
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the primary form element
 * @return {React.Component}
 */
function Gallery( props ) {
	const { children, tagName, shouldWrapChildren, childTagName, childClassName, ...markupAttrs } = props;
	const childrenMarkup = getChildrenMarkup( children, shouldWrapChildren, {
		tagName: childTagName,
		className: childClassName
	});
	const TagName = tagName || React.Fragment;

	return (
		<TagName {...markupAttrs}>
			{childrenMarkup}
		</TagName>
	);
}
Gallery.propTypes = {
	children: PropTypes.array.isRequired,

	tagName: PropTypes.string,
	shouldWrapChildren: PropTypes.bool,
	childTagName: PropTypes.string,
	childClassName: PropTypes.string,
};

export default Gallery;
