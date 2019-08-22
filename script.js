// FAQ: Remind debugger when state is cleaned
console.log('App has been initialized or reloaded.');

/** Classes for the CSS */
const CLASSNAMES = {
  neg: 'is-negative',
  pos: 'is-positive'
}

/** Clone a template
 *  _If supported, use standard `<template>` manipulation. Otherwise, clone node._
 * @property {HTMLElement} template
 */
function cloneTemplate( template ) {
  return ( template.content )
    ? document.importNode( template.content, true )
    : template.cloneNode( true );
}

/** Clone templates into place */
function applyTemplates() {
  const templates = [ ...document.querySelectorAll('template[data-append-to-output-for]') ];

  templates.forEach( ( template ) => {
    const outputs = document.querySelectorAll(`output[for="${template.dataset.appendToOutputFor}"]`);

    outputs.forEach( ( output ) => {
      const clone = cloneTemplate( template );

      /* NOTE: In Chrome 76 and Firefox 78, an emptied `<template>` is seemingly appended */
      output.appendChild( clone );
    });
  });
}

/** Assign classname(s) based on value
 * @parameter {Number|String} value
 * @parameter {HTMLOutputElement|HTMLElement} input
 */
function assignClassFromValue( value, element ) {
  if ( value > 0 ) {
    element.classList.add( CLASSNAMES.pos );
    element.classList.remove( CLASSNAMES.neg );
  } else {
    element.classList.add( CLASSNAMES.neg );
    element.classList.remove( CLASSNAMES.pos );
  }
}

/** Set element value based on element type and attributes
 * @parameter {Number|String} value
 * @parameter {HTMLOutputElement|HTMLElement} input
 */
function setValue( value, element ) {
  const expectsValueAsData = ( element.dataset.value !== undefined );

  if ( expectsValueAsData ) {
    element.dataset.value = value;
  } else {
    element.value = value;
  }
}

/** Update outputs that only requires the given input
 * @parameter {HTMLInputElement|HTMLSelectElement|HTMLTextareaElement} input
 */
function updateOutputs( input ) {
  const outputs = [ ...document.querySelectorAll(`
    output[for="${input.id}"],
    [data-output-for="${input.id}"]
  `) ];

  outputs.forEach( ( output ) => {
    // RFE: Format value via a function (it could use switch or if statement/s)
    const value = input.value;

    setValue( value, output );
    assignClassFromValue( value, output );
  });
}

/** Initialize application of user input */
function init() {
  const form = document.getElementById('wysiwyg-in');
  // SEE: https://jsperf.com/queryselectorall-by-tags-v-concat-getelementsbytagname
  const inputs = [].concat(
    [ ...form.getElementsByTagName('input') ],
    [ ...form.getElementsByTagName('textarea') ],
    [ ...form.getElementsByTagName('select') ],
  );

  applyTemplates();

  inputs.forEach( ( input ) => {
    updateOutputs( input );

    input.addEventListener('input', function ( e ) {
      updateOutputs( e.target );
    });
  });
}

init();