/* eslint-disable react/jsx-key */
import './App.css';
import React from 'react';
import { nanoid } from 'nanoid'
import Die from './components/Die';

export default function App() {
    const [dice, setDice] = React.useState(allNewDice());

    function allNewDice() {
        const diceRolls = []
        for (let i = 0; i < 10; i++) {
            diceRolls.push({
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: nanoid()
            })
            
        } return diceRolls
    }
    

    function rollDice() {
        setDice(allNewDice())
    }

    const diceElements = dice.map((item) => {
        return <Die key = {item.id} value={item.value} />;
    });

    return (
        <main className="main-container">
            <section className="die-container">
                {diceElements}
            </section>
            <button 
                onClick={rollDice}
                className="roll-btn">Roll</button>
        </main>
    );
}
