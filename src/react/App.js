import React from 'react';
import defaultValues from '../_shared/default-values.json';

// Components
import Card from './components/Card.js';

class App extends React.Component {
	render(){
		return (
			<Card id="card" {...defaultValues} />
		);
	}
}

export default App;