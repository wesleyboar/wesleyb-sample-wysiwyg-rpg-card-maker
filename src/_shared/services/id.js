/**
 * Return the most unique **and** stable identifier available
 * @param {Number|String} id - A unique and reliable ID (ideal)
 * @param {Array.<Number|String>} identifiers - List of entities to concatenate into a key
 * @param {Number} [index] - The current index of the option in a list
 * @param {String} [separator="-"] - The character to place between identifiers
 * @return {String}
 */
export function create( id, identifiers, index, separator = '-' ) {
	const canUseId = canUse( id );
	const identifier = identifiers.filter( alt => alt ).join( separator );
	const generatedId = ( canUseId ) ? id : ( identifier || index );

	if ( ! canUseId ) console.debug(`Using generated ID: ${generatedId}`);

	return generatedId;
}

/**
 * Warn if a given "id" is invalid
 * @param {Object} id - The "id" property that should exist
 * @param {String} identifier - How to identify item to user
 */
export function warn( id, identifier= "Each item" ) {
	const canUseId = canUse( id );

	if ( ! canUseId ) console.warn(`${identifier} unique ID is ${id}`);
}

/**
 * Whether a given value can be used as an "id"
 *
 * This function is very generous. It is not exported for users,
 * because they may expect it to do more than it does.
 * @param {Object} id - The value to check
 */
function canUse( id ) {
	// FAQ: Catch `undefined` or `null`, but not `0` nor `false`
	return ( id != null );
}
