/**
 * Return the most unique **and** stable identifier available
 * @param {Number|String} id - A unique and reliable ID (ideal)
 * @param {Array.<Number|String>} [alternatives] - List of entities to concatenate into a key
 * @param {Number} [index] - The current index of the option in a list
 * @param {String} [separator="-"] - The character to place between alternatives
 * @return {String}
 */
export function getKey( id, alternatives, index, separator = '-' ) {
	let alternative = alternatives.filter( alt => alt ).join( separator );

	return id || alternative || index;
}
