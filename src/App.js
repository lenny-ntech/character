import React from 'react';
import { HashRouter, Route, Routes, Link } from "react-router-dom";

import Character from './Character';
import Spells from './Spells';

const App = () => {
	return (
		<div className="App">
			<HashRouter>
				<div className="nav">
				<Link to="/">Character</Link>
				<Link to="/spells">Spells</Link>
				</div>
			
				<Routes>
					<Route exact path="/" element={<Character />} />
					<Route path="/spells" element={<Spells />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
