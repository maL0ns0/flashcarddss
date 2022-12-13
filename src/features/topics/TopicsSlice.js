import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    topics: []
}

const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        addTopic:{
            reducer: (state, action) => {
                state.topics.push(action.payload);
            },
            prepare(name, icon){
                return{
                    payload: {
                        id: uuidv4(),
                        name,
                        icon,
                        quizIds:[]
                    }
                }
            }
        }
    }
});

export const selectAllTopics = state => state.topics.topics;

export const { addTopic } =  topicsSlice.actions;
export default topicsSlice.reducer;