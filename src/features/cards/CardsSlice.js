import { createSlice } from '@reduxjs/toolkit';

//{ id: '123', front: 'front of card', back: 'back of card'}
const initialState = {
    cards: []
}

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers:{
        addCard:(state, action) => {
            state.cards.push(action.payload)
        }
    }
})

export const selectAllCards = state => state.cards.cards;
export const { addCard } = cardsSlice.actions;
export default cardsSlice.reducer;