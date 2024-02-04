from flask import Flask, request, render_template, jsonify
from flask_cors import cross_origin
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from src.pipeline.predict_pipeline import CustomData, PredictPipeline

application = Flask(__name__)

app = application

## Route for Home Page
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predictdata', methods=['GET', 'POST'])
@cross_origin()
def predict_datapoint():
    if request.method == 'GET':
        return render_template('home.html')
    else:
        json_data = request.get_json()
        print('Json data: ', json_data)
        data = CustomData(
            # airline=request.form.get('airline'),
            # total_stops = request.form.get('total_stops'),
            # journey_date = request.form.get('journey_date'),
            # journey_month = request.form.get('journey_month'),
            # dep_hr = request.form.get('dep_hr'),
            # dep_min = request.form.get('dep_min'),
            # arr_hr = request.form.get('arr_hr'),
            # arr_min =  request.form.get('arr_min'),
            # dur_hr = request.form.get('dur_hr'),
            # dur_min = request.form.get('dur_min'),
            # source = request.form.get('source'),
            # destination = request.form.get('destination')
            airline=json_data.get('airline'),
            total_stops = json_data.get('total_stops'),
            journey_date = json_data.get('journey_date'),
            journey_month = json_data.get('journey_month'),
            dep_hr = json_data.get('dep_hr'),
            dep_min = json_data.get('dep_min'),
            arr_hr = json_data.get('arr_hr'),
            arr_min =  json_data.get('arr_min'),
            dur_hr = json_data.get('dur_hr'),
            dur_min = json_data.get('dur_min'),
            source = json_data.get('source'),
            destination = json_data.get('destination')
        )

        pred_df=data.get_data_as_data_frame()
        print(pred_df)
        print("Before Prediction")

        predict_pipeline=PredictPipeline()
        print("Mid Prediction")
        results=predict_pipeline.predict(pred_df)
        print("Results: ", results)
        print("after Prediction")
        # return render_template('home.html',results=results[0])
        return str(results[0])
    
if __name__=="__main__":
    app.run(host="0.0.0.0")    