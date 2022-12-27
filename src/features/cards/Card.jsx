import './card.css';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllCards } from "./CardsSlice.js";

export default function Card({ id }) {
  const cards = useSelector(selectAllCards); // replace this with a call to your selector to get all the cards in state
  const card = cards.find(card => card.id === id);
  const [flipped, setFlipped] = useState(false);

  return (
    <li>
      <button className={`card ${flipped? 'flipped' : 'no-flipped'}`} onClick={(e) => setFlipped(!flipped)}>
        {flipped ? card.back : card.front}
      </button>
    </li>
  );
}
