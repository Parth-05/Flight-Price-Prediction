# Flight Price Prediction System
![flight-price-predictor](https://github.com/Parth-05/Flight-Price-Prediction/assets/102514687/ba632602-84af-4260-ab8d-6bc013373d79)


## Project Description

The Flight Price Prediction System is an end-to-end solution designed to predict flight prices using advanced data analysis and machine learning techniques. This project integrates data processing, predictive modeling, and full-stack development to provide users with accurate flight price predictions. The system is capable of analyzing various factors that influence flight prices and delivering predictions through a user-friendly interface.

Live Project Link: https://flight-price-predictor-08xr.onrender.com/

## Technologies and Languages Used

- **Python**: For data processing, analysis, and implementing the prediction algorithms.
- **JavaScript (React)**: For creating a dynamic and responsive user interface.
- **Flask**: For building the backend and handling communication between the frontend and data processing components.
- **Jupyter Notebook**: Environment for developing and testing the predictive models.
- **pandas**: For data manipulation and preprocessing.
- **numpy**: For numerical computations and data handling.
- **scikit-learn**: For implementing machine learning algorithms.

## Project Architecture

1. **Data Collection**:
    - Data is collected and preprocessed using Python libraries such as pandas and numpy.
    
2. **Data Processing and Modeling**:
    - The data is processed to extract meaningful features.
    - Machine learning models are developed using scikit-learn to predict flight prices based on the processed data.
    
3. **Backend Development**:
    - Flask is used to build the backend server, which handles requests from the frontend and communicates with the predictive models.
    
4. **Frontend Development**:
    - React is utilized to create a user-friendly interface where users can input flight details and receive price predictions.
    - The UI fetches data from the Flask backend and displays the predicted flight prices to the user.
    
5. **Deployment**:
    - The entire system is deployed to ensure seamless integration between the frontend and backend, providing users with real-time flight price predictions.

## How to Run the Project

1. Clone the repository:
    git clone https://github.com/Parth-05/flight-price-prediction.git
    
2. Navigate to the project directory:
    cd flight-price-prediction
    
3. Install the required dependencies:
    pip install -r requirements.txt
    
4. Run the Flask backend:
    flask run
    
5. Navigate to the `client` directory and install frontend dependencies:
    cd client
    npm install
    
6. Start the React frontend:
    npm start
    
7. Open `http://localhost:3000` in your web browser to access the user interface.

## Conclusion

This project showcases the integration of various technologies and libraries to build an effective flight price prediction system. It demonstrates the application of data science and full-stack development skills to solve real-world problems.
