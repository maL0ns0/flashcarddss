import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from '../features/topics/TopicsSlice';

export default configureStore({
    reducer: {
        topics: topicsReducer
    },
})