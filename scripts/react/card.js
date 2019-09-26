// TODO: Break up componnent into smaller components

// NOTE: If processing, use `import`
// import React, { useState } from 'react';
// import * as defaultValues from '../default-values.json';
const useState = React.useState;
const defaultValues = getJSONSync('scripts/default-values.json');

function Card() {
	const [name, setName] = useState(defaultValues.identity.name);
	const [form, setForm] = useState(defaultValues.identity.form);
	const [desc, setDesc] = useState(defaultValues.identity.desc);
	const [element, setElement] = useState(defaultValues.identity.element);

	const [power, setPower] = useState(defaultValues.attribute.power);
	const [speed, setSpeed] = useState(defaultValues.attribute.speed);
	const [defense, setDefense] = useState(defaultValues.attribute.defense);

	return (
		<form id="card" className="c-card c-card--opts-count-1"
			data-output-for="card-ident-element" data-value="">
			<fieldset id="card-ident">
				<legend>Card Identity</legend>

				<label htmlFor="card-ident-name"
					title="The name of the enchanted item">Name</label>
				<input id="card-ident-name" className="c-card__name"
					type="text" defaultValue={name} />

				<label htmlFor="card-ident-form"
					title="The common form of the enchanted item">Form</label>
				<select id="card-ident-form" className="c-card__metadata" defaultValue={form}>
					<optgroup label="Clothing">
						<option name="ident_form_boot" value="boot">Boot</option>
						<option name="ident_form_hat" value="hat">Hat</option>
						<option name="ident_form_glove" value="glove">Glove</option>
						<option name="ident_form_mask" value="mask">Mask</option>
					</optgroup>
				</select>
				<output htmlFor="card-ident-form" className="c-card__figure"
					data-value=""></output>

				<label htmlFor="card-ident-desc"
					title="A description of the enchanted item">Description</label>
				<textarea id="card-ident-desc" className="c-card__desc" defaultValue={desc}></textarea>

				<label htmlFor="card-ident-element"
					title="The elemental power of the enchanted item">Element</label>
				<select id="card-ident-element" className="c-card__metadata" defaultValue={element}>
					<option name="ident_element_earth" value="earth">Earth</option>
					<option name="ident_element_wind" value="water">Water</option>
					<option name="ident_element_air" value="air">Air</option>
					<option name="ident_element_fire" value="fire">Fire</option>
				</select>
			</fieldset>

			<fieldset id="card-attr" className="c-card__attr-list">
				<legend>Card Attributes</legend>
		
				<div className="c-card__attr">
					<label htmlFor="card-attr-power" className="c-card__attr-key"
						title="How many units stronger or weaker">Power</label>
					<input id="card-attr-power" className="c-card__attr-input"
						type="range" min="-3" max="3" step="1" defaultValue={power} />
					<output htmlFor="card-attr-power" className="c-card__attr-value">?</output>
				</div>

				<div className="c-card__attr">
					<label htmlFor="card-attr-speed" className="c-card__attr-key"
						title="How many units faster or slower">Speed</label>
					<input id="card-attr-speed" className="c-card__attr-input"
						type="range" min="-3" max="3" step="1" defaultValue={speed} />
					<output htmlFor="card-attr-speed" className="c-card__attr-value">?</output>
				</div>

				<div className="c-card__attr">
					<label htmlFor="card-attr-defense" className="c-card__attr-key"
						title="How many units less or more vulnerable">Defense</label>
					<input id="card-attr-defense" className="c-card__attr-input"
						type="range" min="-3" max="3" step="1" defaultValue={defense} />
					<output htmlFor="card-attr-defense" className="c-card__attr-value">?</output>
				</div>
			</fieldset>

			<fieldset id="card-opts" className="c-card--opts-list js-immune">
				<label title="Approximate final state of card">
					<input name="card_preview" type="checkbox" /><span>Preview Card</span>
				</label>
			</fieldset>
		</form>
	);
}

ReactDOM.render(
	<Card />,
	document.getElementById('card--react')
);

// TODO: Let React manage `init`
initDynamicBehaviourForCard();