import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { predictPriceReducer } from './reducers/PredictPriceReducer';
import {composeWithDevTools} from "redux-devtools-extension";

const reducers = combineReducers({
    predictedPrice: predictPriceReducer
});

const middleware = [thunk];

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;