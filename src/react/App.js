import React from 'react';
import defaultValues from '../_shared/default-values.json';

// Components
import Card from './components/Card.js';

class App extends React.Component {
	render(){
		return (
			<React.Fragment>
				<p id="intro" className="c-intro">Create a custom card for an imaginary trading card game.</p>

				<Card id="card" {...defaultValues} />
			</React.Fragment>
		);
	}
}

export default App;