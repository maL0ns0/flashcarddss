import './newQuizForm.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectAllTopics } from '../topics/TopicsSlice.js';
import { useSelector, useDispatch } from "react-redux";
import { createquiz } from './QuizzesSlice.js';
import { v4 as uuidv4 } from 'uuid';
import { addCard } from '../cards/CardsSlice';


export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const navigate = useNavigate();
  const topics = useSelector(selectAllTopics);
  const dispatch = useDispatch();

  
  const cardsWtIds = () => {
    return cards.map(card => ({...card, id:uuidv4()}))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    //{ name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}.
    if (name.length === 0) {
      return;
    }

    const nwCards = cardsWtIds();
    const cardIds = nwCards.map(c => c.id);

    let qz = {
      name,
      topicId,
      cardIds
    }

    dispatch(createquiz(qz))
    
    //Agregamos las cartas
    for(let nwCard of nwCards){
      dispatch( addCard(nwCard) )
    }
    navigate('/quizzes')
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section className="form-section newQuizFrm">
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={ (e) => setTopicId(e.currentTarget.value) }
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button className='addButton' onClick={addCardInputs}>Add a Card</button>
          <button className='button'>Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
