/** Classes for the CSS */
const CLASSNAMES = {
  neg: 'is-negative',
  pos: 'is-positive',
  disabled: 's-card-preview',
  immune: 'js-immune'
}

/** Toggle state of form (disabled or enabled i.e. preview or not)
 * @parameter {Boolean} shouldDisable
 * @parameter {HTMLFormElement} form
 */
function toggleState( shouldDisable, form ) {
  const fieldsets = [ ...form.getElementsByTagName('fieldset') ]
    .filter( fieldset => ! fieldset.classList.contains( CLASSNAMES.immune ) );

  if ( shouldDisable ) {
    document.body.classList.add( CLASSNAMES.disabled );
    fieldsets.forEach( fieldset => fieldset.disabled = true );
  } else {
    document.body.classList.remove( CLASSNAMES.disabled );
    fieldsets.forEach( fieldset => fieldset.disabled = false );
  }
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
  const form = document.getElementById('card');
  const toggle = form.card_preview;
  // SEE: https://jsperf.com/queryselectorall-by-tags-v-concat-getelementsbytagname
  const inputs = [].concat(
    [ ...form.getElementsByTagName('input') ],
    [ ...form.getElementsByTagName('textarea') ],
    [ ...form.getElementsByTagName('select') ],
  );

  // Support value changes
  inputs.forEach( ( input ) => {
    updateOutputs( input );

    input.addEventListener('change', function ( e ) {
      updateOutputs( e.target );
    });
  });

  // Support state toggling
  toggleState( toggle.checked, form );
  toggle.addEventListener('change', function ( e ) {
    toggleState( toggle.checked, form );
  });
}

init();