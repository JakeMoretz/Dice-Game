/* eslint-disable react/jsx-key */
import './App.css';
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Die from './components/Die';

export default function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
        const allHeld = dice.every((item) => item.isHeld);
        const singleValue = dice[0].value;
        const allSameValue = dice.every((item) => item.value === singleValue);

        if (allHeld && allSameValue) {
            setTenzies(true);
        }
    }, [dice]);

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
        if (!tenzies) {
            setDice((prevState) =>
                prevState.map((item) => {
                    return item.isHeld ? item : generateDice();
                })
            );
        } else {
            setTenzies(false);
            setDice(allNewDice());
        }
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
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="description">
                Roll until all dice are the same. <br /> Click each die to
                freeze it at its current value between rolls.
            </p>
            <section className="die-container">{diceElements}</section>
            <button onClick={rollDice} className="roll-btn">
                {tenzies ? <p>reset game</p> : <p>Roll</p>}
            </button>
        </main>
    );
}
