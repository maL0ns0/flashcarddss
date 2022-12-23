import { createSlice } from '@reduxjs/toolkit';
import {addQuizzId} from '../topics/TopicsSlice'
import { v4 as uuidv4 } from 'uuid';

//{ id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}.

const initialState = {
    quizzes: []
}

const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {
        addQuiz: (state, action) => {
            //Agregando el id
            action.payload.quizId = uuidv4();
            state.quizzes.push(action.payload);
        },
    }
});



export const selectAllQuizzes = state => state.quizzes.quizzes;

export const { addQuiz } = quizzesSlice.actions;

export const createquiz = (qz) => {
    return (dispatch) => {
        dispatch( addQuiz(qz) );
        dispatch( addQuizzId(qz));
    }
}

export default quizzesSlice.reducer;

