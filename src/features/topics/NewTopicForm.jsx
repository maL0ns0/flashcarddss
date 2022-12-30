import './newTopicForm.css'
import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTopic } from './TopicsSlice'
import { ALL_ICONS } from "../../data/icons";

const rd_reducer = (rd_state, rd_action) => {
  switch(rd_action.type){
    case 'setName':
      return {...rd_state, name: rd_action.payload}
    case 'setIcon':
      return {...rd_state, icon: rd_action.payload}
    default:
      throw new Error();
  }
}

export default function NewTopicForm() {
  
  //El segundo argumento es el estado inicial, como no usaremos
  //useState todo lo pondremos en un objeto
  const [rd_state, rd_dispatch] = useReducer(rd_reducer, {name:'', icon:''});
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rd_state.name.length === 0) {
      return;
    }
    
    dispatch(addTopic(rd_state.name, rd_state.icon));
    navigate('/topics')
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1 className="titleTwo">Create a new topic</h1>
        <div className="form-section">
          <input
            id="topic-name"
            type="text"
            value={rd_state.name}
            onChange={(e) => rd_dispatch({type:'setName', payload: e.currentTarget.value})}
            placeholder="Topic Name"
          />
          <select
            onChange={(e) => rd_dispatch({type:'setIcon', payload: e.currentTarget.value})}
            required
            defaultValue="default"
          >
            <option value="default" disabled hidden>
              Choose an icon
            </option>
            {ALL_ICONS.map(({ name, url }) => (
              <option key={url} value={url}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button className="addTopicBtn">Add Topic</button>
      </form>
    </section>
  );
}
