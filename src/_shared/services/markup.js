
/**
 * Join members of class name array with a space, excluding empty elements
 * @param {Array.<String>} classNames - List of class names to join
 */
export function joinClassNames( classNames ) {
	const joinedClassNames = classNames.filter( className => {
		return className || false;
	}).join(' ');

	return joinedClassNames;
}
