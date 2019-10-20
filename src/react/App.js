import React from 'react';

// Styles
import './App.css';

// Components
import Card from './components/Card.js';

// Data
import exampleData from '../_shared/data/example/card--item.json';

class App extends React.Component {
	render(){
		return (
			<React.Fragment>
				<p id="intro" className="c-intro">Create a custom card for an imaginary trading card game.</p>

				<Card id="card" {...exampleData} />
			</React.Fragment>
		);
	}
}

export default App;