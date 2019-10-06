// NOTE: If processing, use `import`
// import PropTypes from 'prop-types';
const PropTypes = window.PropTypes;

const CustomTypes = {};

/* Option Structures */

/** @type {Option} */
CustomTypes.Option = PropTypes.exact({
	label: PropTypes.string,
	value: PropTypes.string.isRequired,
});
/** @type {OptionList} */
CustomTypes.OptionList = PropTypes.arrayOf( CustomTypes.Option );

/** @type {OptionGroup} */
CustomTypes.OptionGroup = PropTypes.exact({
	label: PropTypes.string,
	options: CustomTypes.OptionList.isRequired,
});
/** @type {OptionGroupList} */
CustomTypes.OptionGroupList = PropTypes.arrayOf( CustomTypes.OptionGroup );

/** @type {OptionList|OptionGroupList} */
CustomTypes.Options = PropTypes.oneOfType([
	CustomTypes.OptionList,
	CustomTypes.OptionGroupList,
]);

/* Card Properties */

/** @type {IdentityProps} */
CustomTypes.IdentityProps = PropTypes.exact({
	name: PropTypes.string,
	shape: PropTypes.string,
	desc: PropTypes.string,
	element: PropTypes.string,
});

/** @type {AttributeProps} */
CustomTypes.AttributeProps = PropTypes.exact({
	power: PropTypes.number,
	speed: PropTypes.number,
	defense: PropTypes.number,
});
