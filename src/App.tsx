import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PokemonListPage from "./pages/PokemonListPage.tsx";
import FavoriteListPage from "./pages/FavoriteListPage.tsx";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<PokemonListPage/>}/>
                    <Route path="/favorite" element={<FavoriteListPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
