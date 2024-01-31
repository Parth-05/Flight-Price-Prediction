import sys
import os
from dataclasses import dataclass
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from src.exception import CustomException
from src.logger import logging
from src.utils import save_object

@dataclass
class DataTransformationConfig:
    preprocessor_obj_file_path = os.path.join('artifacts', 'preprocessor.pkl')

class DataTransformation:
    def __init__(self):
        self.data_transformation_config = DataTransformationConfig()

    def get_data_transformer_object(self, train_df):
        try:
            train_df['Destination'] = train_df['Destination'].replace('New Delhi', 'Delhi')

            train_df.dropna(inplace = True)
            
            train_df["Journey_day"] = pd.to_datetime(train_df.Date_of_Journey, format="%d/%m/%Y").dt.day
            train_df["Journey_month"] = pd.to_datetime(train_df["Date_of_Journey"], format = "%d/%m/%Y").dt.month
            train_df.drop(["Date_of_Journey"], axis = 1, inplace = True)
            
            # Extracting Hours
            train_df["Dep_hour"] = pd.to_datetime(train_df["Dep_Time"]).dt.hour
            # Extracting Minutes
            train_df["Dep_min"] = pd.to_datetime(train_df["Dep_Time"]).dt.minute
            # Now we can drop Dep_Time as it is of no use
            train_df.drop(["Dep_Time"], axis = 1, inplace = True)

            # Extracting Hours
            train_df["Arrival_hour"] = pd.to_datetime(train_df.Arrival_Time).dt.hour
            # Extracting Minutes
            train_df["Arrival_min"] = pd.to_datetime(train_df.Arrival_Time).dt.minute
            # Now we can drop Arrival_Time as it is of no use
            train_df.drop(["Arrival_Time"], axis = 1, inplace = True)

            # Assigning and converting Duration column into list
            duration = list(train_df["Duration"])

            for i in range(len(duration)):
                if len(duration[i].split()) != 2:    # Check if duration contains only hour or mins
                    if "h" in duration[i]:
                        duration[i] = duration[i].strip() + " 0m"   # Adds 0 minute
                    else:
                        duration[i] = "0h " + duration[i]           # Adds 0 hour

            duration_hours = []
            duration_mins = []
            for i in range(len(duration)):
                duration_hours.append(int(duration[i].split(sep = "h")[0]))    # Extract hours from duration
                duration_mins.append(int(duration[i].split(sep = "m")[0].split()[-1]))   # Extracts only minutes from duration

            # Adding duration_hours and duration_mins list to train_df dataframe

            train_df["Duration_hours"] = duration_hours
            train_df["Duration_mins"] = duration_mins

            train_df.drop(["Duration"], axis = 1, inplace = True)
            
            # numerical_columns = list((train_df.drop(columns=['Price'],axis=1)).columns)
            
            # Label encoding total_stops
            train_df.replace({"non-stop": 0, "1 stop": 1, "2 stops": 2, "3 stops": 3, "4 stops": 4}, inplace = True)
            numerical_columns = [
                'Total_Stops', 
                'Journey_day', 
                'Journey_month', 
                'Dep_hour', 
                'Dep_min',
                'Arrival_hour',
                'Arrival_min',
                'Duration_hours',
                'Duration_mins'   
                ]

            categorical_columns = [
                "Airline",
                "Source",
                "Destination"
            ]

            num_pipeline = Pipeline(
                steps=[
                ("imputer",SimpleImputer(strategy="median")),
                ("scaler",StandardScaler())
                ]
            )

            cat_pipeline=Pipeline(

                steps=[
                ("imputer",SimpleImputer(strategy="most_frequent")),
                ("one_hot_encoder",OneHotEncoder()),
                ("scaler",StandardScaler(with_mean=False))
                ]
            )

            logging.info(f"Categorical columns: {categorical_columns}")
            logging.info(f"Numerical columns: {numerical_columns}")
            
            preprocessor = ColumnTransformer(
                [
                ("num_pipeline",num_pipeline, numerical_columns),
                ("cat_pipeline", cat_pipeline, categorical_columns)
                ]
            )
            return preprocessor
        except Exception as e:
            raise CustomException(e, sys)
        
    def clean_df(self, df):
        df['Destination'] = df['Destination'].replace('New Delhi', 'Delhi')
        # Date_of_Journey
        df["Journey_day"] = pd.to_datetime(df.Date_of_Journey, format="%d/%m/%Y").dt.day
        df["Journey_month"] = pd.to_datetime(df["Date_of_Journey"], format = "%d/%m/%Y").dt.month
        df.drop(["Date_of_Journey"], axis = 1, inplace = True)

        # Dep_Time
        df["Dep_hour"] = pd.to_datetime(df["Dep_Time"]).dt.hour
        df["Dep_min"] = pd.to_datetime(df["Dep_Time"]).dt.minute
        df.drop(["Dep_Time"], axis = 1, inplace = True)

        # Arrival_Time
        df["Arrival_hour"] = pd.to_datetime(df.Arrival_Time).dt.hour
        df["Arrival_min"] = pd.to_datetime(df.Arrival_Time).dt.minute
        df.drop(["Arrival_Time"], axis = 1, inplace = True)

        # Duration
        duration = list(df["Duration"])

        for i in range(len(duration)):
            if len(duration[i].split()) != 2:    # Check if duration contains only hour or mins
                if "h" in duration[i]:
                    duration[i] = duration[i].strip() + " 0m"   # Adds 0 minute
                else:
                    duration[i] = "0h " + duration[i]           # Adds 0 hour

        duration_hours = []
        duration_mins = []
        for i in range(len(duration)):
            duration_hours.append(int(duration[i].split(sep = "h")[0]))    # Extract hours from duration
            duration_mins.append(int(duration[i].split(sep = "m")[0].split()[-1]))   # Extracts only minutes from duration

        # Adding Duration column to test set
        df["Duration_hours"] = duration_hours
        df["Duration_mins"] = duration_mins
        df.drop(["Duration"], axis = 1, inplace = True)

        # Additional_Info contains almost 80% no_info
        # Route and Total_Stops are related to each other
        df.drop(["Route", "Additional_Info"], axis = 1, inplace = True)

        # Replacing Total_Stops
        df.replace({"non-stop": 0, "1 stop": 1, "2 stops": 2, "3 stops": 3, "4 stops": 4}, inplace = True)

        return df

    def initiate_data_transformation(self,train_path,test_path):
        try:
            train_df=pd.read_csv(train_path)
            test_df=pd.read_csv(test_path)

            logging.info("Read train and test data completed")

            logging.info("Obtaining preprocessing object")

            preprocessing_obj=self.get_data_transformer_object(train_df)


            target_column_name="Price"
            input_feature_train_df=train_df.drop(columns=[target_column_name],axis=1)
            target_feature_train_df=train_df[target_column_name]

            input_feature_test_df=test_df.drop(columns=[target_column_name],axis=1)
            target_feature_test_df=test_df[target_column_name]

            logging.info(
                f"Applying preprocessing object on training dataframe and testing dataframe."
            )

            input_feature_train_arr=preprocessing_obj.fit_transform(input_feature_train_df)
            input_feature_test_arr=preprocessing_obj.transform(self.clean_df(input_feature_test_df))
            print("Done with fit transform")

            train_arr = np.c_[
                input_feature_train_arr, np.array(target_feature_train_df)
            ]
            test_arr = np.c_[input_feature_test_arr, np.array(target_feature_test_df)]

            logging.info(f"Saved preprocessing object.")

            save_object(

                file_path=self.data_transformation_config.preprocessor_obj_file_path,
                obj=preprocessing_obj
            )

            return (
                train_arr,
                test_arr,
                self.data_transformation_config.preprocessor_obj_file_path,
            )
        
        except Exception as e:
            raise CustomException(e, sys)