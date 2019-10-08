import React from 'react';
import defaultValues from '../_shared/default-values.json';

// Components
import Card from './components/Card.js';

// Styles
// import './App.css';

class App extends React.Component {
	render(){
		return(
			<React.Fragment>
				<header>
					<h1><abbr title="What You See is What You Get">WYSIWYG</abbr> Card Maker</h1>
					<p>Fake card. Fake game. Real fun.</p>
				</header>

				<p>Create a custom card for an imaginary trading card game.</p>

				<Card id="card" {...defaultValues} />
			</React.Fragment>
		);
	}
}

export default App;