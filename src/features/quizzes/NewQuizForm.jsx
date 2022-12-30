import './newQuizForm.css';
import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { selectAllTopics } from '../topics/TopicsSlice.js';
import { useSelector, useDispatch } from "react-redux";
import { createquiz } from './QuizzesSlice.js';
import { v4 as uuidv4 } from 'uuid';
import { addCard } from '../cards/CardsSlice';

const rd_reducer = (rd_state, rd_action) => {
  switch(rd_action.type){
    case 'setName':
      return {...rd_state, name: rd_action.payload}
    case 'addCardInputs':
    {
      let nwCards = [...rd_state.cards, { front: "", back: "" }];
      return {...rd_state, cards: nwCards }
    }
    case 'removeCard':
    {
      let nwCards = rd_state.cards.filter((card, i) => rd_action.payload !== i)
      return {...rd_state, cards: nwCards}
    }  
    case 'updateCardState':
      {
        const {index, side, value} = rd_action.payload
        const newCards = rd_state.cards.slice()
        newCards[index][side] = value
        return {...rd_state, cards: newCards}
      }
    case 'setTopicId':
      return {...rd_state, topicId: rd_action.payload}
    default:
      throw new Error('Accion no definida en useReducer')
  }
}

export default function NewQuizForm() {
  
  const [rd_state, rd_dispatch] = useReducer(rd_reducer, 
    {name:'', cards:[], topicId: ''}
  );
  
  const navigate = useNavigate();
  const topics = useSelector(selectAllTopics);
  const dispatch = useDispatch();

  const cardsWtIds = () => {
    return rd_state.cards.map(card => ({...card, id:uuidv4()}))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rd_state.name.length === 0) {
      return;
    }

    const nwCards = cardsWtIds();
    const cardIds = nwCards.map(c => c.id);

    let qz = {
      name: rd_state.name,
      topicId: rd_state.topicId,
      cardIds
    }

    dispatch(createquiz(qz))
    
    for(let nwCard of nwCards){
      dispatch( addCard(nwCard) )
    }
    navigate('/quizzes')
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    rd_dispatch({ type:'addCardInputs' })
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    rd_dispatch({type: 'removeCard', payload: index})
  };

  const updateCardState = (index, side, value) => {
    rd_dispatch({ type: 'updateCardState', payload: {index, side, value}})
  };

  return (
    <section className="form-section newQuizFrm">
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={ rd_state.name }
          onChange={(e) => rd_dispatch({type: 'setName', payload: e.currentTarget.value})}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={ (e) => rd_dispatch({type: 'setTopicId', payload: e.currentTarget.value }) }
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {rd_state.cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={rd_state.cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={rd_state.cards[index].back}
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
