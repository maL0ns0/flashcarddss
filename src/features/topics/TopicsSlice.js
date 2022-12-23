import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    topics: []
}

const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        addQuizzId: {
            reducer: (state, action) => {
                const {quizId, topicId} = action.payload;
                const theTopic = state.topics.find(t => t.id === topicId)
                if(theTopic) theTopic.quizIds.push(quizId)
            }
        },
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

export const { addTopic, addQuizzId } =  topicsSlice.actions;
export default topicsSlice.reducer;