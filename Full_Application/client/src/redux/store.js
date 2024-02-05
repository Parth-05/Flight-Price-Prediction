// import { createStore, applyMiddleware, combineReducers } from 'redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { predictPriceReducer } from './reducers/PredictPriceReducer';
// import {composeWithDevTools} from "redux-devtools-extension";

const reducers = combineReducers({
    predictedPrice: predictPriceReducer
});

// const middleware = [thunk];

// const store = createStore(
//     reducers,
//     composeWithDevTools(applyMiddleware(...middleware))
// )

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
}
)

export default store;