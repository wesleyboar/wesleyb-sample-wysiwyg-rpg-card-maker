import PropTypes from 'prop-types';

// Data
import { MEDIA_DATA_TYPE } from '../../_shared/typedef.js';

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

/** @type {Options} */
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

/* Miscellaneous */

/** @type {MediaDataType} */
CustomTypes.MediaDataType = PropTypes.oneOf( Object.values( MEDIA_DATA_TYPE ) );

/** @type {MediaDataIdent} */
CustomTypes.MediaDataIdent = PropTypes.oneOfType([
	PropTypes.bool,
	PropTypes.string,
	PropTypes.number,
]);

/** @type {MediaData} */
CustomTypes.MediaData = PropTypes.exact({
	ident: CustomTypes.MediaDataIdent,
	type: CustomTypes.MediaDataType,
	source: PropTypes.string,
});

export default CustomTypes;
