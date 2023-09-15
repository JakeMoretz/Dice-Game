/* eslint-disable react/jsx-key */
import './App.css';
import React from 'react';
import { nanoid } from 'nanoid';
import Die from './components/Die';

export default function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

     React.useEffect(() => {
        const allHeld = dice.every(item => item.isHeld)
        const firstValue = dice[0].value
        const allHeldValues = dice.every(item => item.value === firstValue)

        if(allHeld && allHeldValues) {
            setTenzies(true)
            console.log("you won!")
        }
     }, [dice])

    function generateDice() {
        return {
            value: Math.floor(Math.random() * 6) + 1,
            isHeld: false,
            id: nanoid(),
        };
    }

    function allNewDice() {
        const diceRolls = [];
        for (let i = 0; i < 10; i++) {
            diceRolls.push(generateDice());
        }
        return diceRolls;
    }

    function rollDice() {
        setDice((prevState) =>
            prevState.map((item) => {
                return item.isHeld ? item : generateDice();
            })
        );
    }

    function holdDice(id) {
        setDice((prevState) =>
            prevState.map((item) => {
                return item.id === id
                    ? { ...item, isHeld: !item.isHeld }
                    : item;
            })
        );
    }

    const diceElements = dice.map((item) => {
        return (
            <Die
                handleHold={() => holdDice(item.id)}
                key={item.id}
                value={item.value}
                isHeld={item.isHeld}
                id={item.id}
            />
        );
    });

    return (
        <main className="main-container">
            <h1>Tenzies</h1>
            <p>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <section className="die-container">{diceElements}</section>
            <button onClick={rollDice} className="roll-btn">
                Roll
            </button>
        </main>
    );
}
