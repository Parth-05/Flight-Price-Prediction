import { PREDICT_PRICE_REQUEST, PREDICT_PRICE_SUCCESS, PREDICT_PRICE_FAILURE } from "../constants/PredictPriceConstants";
import axios from "axios";

export const predictPrice = (
    airline,
    total_stops,
    journey_date,
    journey_month,
    dep_hr,
    dep_min,
    arr_hr,
    arr_min,
    dur_hr,
    dur_min,
    source,
    destination
    ) => async(dispatch) => {
        try {
            dispatch({ type: PREDICT_PRICE_REQUEST });
      
            const config = { headers: { "Content-Type": "application/json" } };
        
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}`,
                { airline,
                    total_stops,
                    journey_date,
                    journey_month,
                    dep_hr,
                    dep_min,
                    arr_hr,
                    arr_min,
                    dur_hr,
                    dur_min,
                    source,
                    destination },
                config
          );
          dispatch({ type: PREDICT_PRICE_SUCCESS, payload: response.data });
          return response.data;
        } catch (error) {
            dispatch({ type: PREDICT_PRICE_FAILURE, payload: error.message });
        }
    }