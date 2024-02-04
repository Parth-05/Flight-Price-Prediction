import { PREDICT_PRICE_REQUEST, PREDICT_PRICE_SUCCESS, PREDICT_PRICE_FAILURE } from "../constants/PredictPriceConstants";

const initialState = {
    loading: false,
    predictedPrice: null,
    error: null,
  };

  export const predictPriceReducer = (state = initialState, action) => {
    switch (action.type) {
      case PREDICT_PRICE_REQUEST:
        return { ...state, loading: true, error: null };
      case PREDICT_PRICE_SUCCESS:
        return { ...state, loading: false, predictedPrice: action.payload };
      case PREDICT_PRICE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };