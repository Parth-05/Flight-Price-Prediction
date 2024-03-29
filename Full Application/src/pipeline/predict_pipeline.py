import sys
import os
import pandas as pd
from src.exception import CustomException
from src.utils import load_object

class PredictPipeline:
    def __init__(self):
        pass

    def predict(self,features):
        try:
            model_path=os.path.join("artifacts","model.pkl")
            preprocessor_path=os.path.join('artifacts','preprocessor.pkl')
            print("Before Loading")
            model=load_object(file_path=model_path)
            print("Model: ", model)
            preprocessor=load_object(file_path=preprocessor_path)
            print("preprocessor: ", preprocessor)
            print("After Loading")
            print('Features: ', features)
            data_scaled=preprocessor.transform(features)
            print('Data Scaled: ', data_scaled)
            preds=model.predict(data_scaled)
            # preds=model.predict(preprocessor)
            print('Preds: ', preds)
            return preds
        
        except Exception as e:
            raise CustomException(e,sys)



class CustomData:
    def __init__(
            self,
            airline: str,
            total_stops: int,
            journey_date: int,
            journey_month: int,
            dep_hr: int,
            dep_min: int,
            arr_hr: int,
            arr_min: int,
            dur_hr: int,
            dur_min: int,
            source: str,
            destination: str,
            ) :
        
        self.airline = airline
        self.total_stops = total_stops
        self.journey_date = journey_date
        self.journey_month = journey_month
        self.dep_hr = dep_hr
        self.dep_min = dep_min
        self.arr_hr = arr_hr
        self.arr_min = arr_min
        self.dur_hr = dur_hr
        self.dur_min = dur_min
        self.source = source
        self.destination = destination

    
    def get_data_as_data_frame(self):
        try:
            custom_data_input_dict = {
                "Airline": [self.airline],
                "Total_Stops": [self.total_stops],
                "Journey_day": [self.journey_date],
                "Journey_month": [self.journey_month],
                "Dep_hour": [self.dep_hr],
                "Dep_min": [self.dep_min],
                "Arrival_hour": [self.arr_hr],
                "Arrival_min": [self.arr_min],
                "Duration_hours": [self.dur_hr],
                "Duration_mins": [self.dur_min],
                "Source": [self.source],
                "Destination": [self.destination]
            }

            return pd.DataFrame(custom_data_input_dict)

        except Exception as e:
            raise CustomException(e, sys)
