import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Home.css'
import { predictPrice } from '../redux/actions/PredictPriceAction';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    const title = 'Flight Price Predictor';

    // const predictedPriceSelector = useSelector((state) => state.predictPrice)
    const predictedPriceFromRedux = useSelector((state) => state?.predictedPrice);
    const [predictedPrice, setPredictedPrice] = useState('');
    const [isPriceVisible, setIsPriceVisible] = useState(false);

    const dispatch = useDispatch();

    const [airline, setAirlineValue] = useState('');
    const handleAirlineValueChange = (event, newValue) => {
        setAirlineValue(newValue)
    }

    const [total_stops, setTotalStops] = useState();
    const handleTotalStopsChange = (event) => {
        setTotalStops(event.target.value)
    }

    const [journey_date, setJourneyDate] = useState();
    const handleJourneyDateValueChange = (event) => {
        setJourneyDate(event.target.value);
    }

    const [journey_month, setJourneyMonth] = useState();
    const handleJourneyMonthValueChange = (event) => {
        setJourneyMonth(event.target.value)
    }

    const [dep_hr, setDepartureHours] = useState();
    const handleDepartureHoursValueChange = (event) => {
        setDepartureHours(event.target.value)
    }

    const [dep_min, setDepartureMinutes] = useState();
    const handleDepartureMinutesValueChange = (event) => {
        setDepartureMinutes(event.target.value)
    }

    const [arr_hr, setArrivalHours] = useState();
    const handleArrivalHoursValueChange = (event) => {
        setArrivalHours(event.target.value)
    }

    const [arr_min, setArrivalMinutes] = useState();
    const handleArrivalMinutesValueChange = (event) => {
        setArrivalMinutes(event.target.value)
    }

    const [dur_hr, setDurationHours] = useState();
    const handleDurationHoursValueChange = (event) => {
        setDurationHours(event.target.value)
    }
    
    const [dur_min, setDurationMinutes] = useState();
    const handleDurationMinutesValueChange = (event) => {
        setDurationMinutes(event.target.value)
    }

    const [source, setSource] = useState('');
    const handleSourceValueChange = (event, newValue) => {
        setSource(newValue)
    }

    const [destination, setDestination] = useState('');
    const handleDestinationValueChange = (event, newValue) => {
        setDestination(newValue)
    }

    const airlinesOptions = [
        "Air India",
        "GoAir",
        "IndiGo",
        "Jet Airways",
        "Jet Airways Business",
        "Multiple carriers",
        "Multiple carriers Premium economy",
        "SpiceJet",
        "Trujet",
        "Vistara",
        "Vistara Premium economy"
    ]

    const sourceOptions = [
        "Chennai",
        "Delhi",
        "Kolkata",
        "Banglore"
    ]

    const destinationOptions = [
        "Chennai",
        "Delhi",
        "Kolkata",
        "Banglore"
    ]

    const handlePredictPrice = async () => {
         dispatch(predictPrice(
            airline, 
            parseInt(total_stops),
            parseInt(journey_date),
            parseInt(journey_month),
            parseInt(dep_hr),
            parseInt(dep_min),
            parseInt(arr_hr),
            parseInt(arr_min),
            parseInt(dur_hr),
            parseInt(dur_min),
            source,
            destination
            ))
            setIsPriceVisible(true);

            console.log(predictedPriceFromRedux)
    }

    useEffect(() => {
        if (predictedPriceFromRedux) {
            setPredictedPrice(predictedPriceFromRedux?.predictedPrice);
            setIsPriceVisible(true);
        }
        console.log(predictedPriceFromRedux)
    }, [predictedPriceFromRedux]);

    return (
        <>
            <div className='title-container'>
                {title}
            </div>
            <div className='box-container'>
                <div className='form-container'>

                    <div className="row-container">
                    {/* Airlines */}
                    <Autocomplete className='text-field'
                        disablePortal
                        id="airline"
                        options={airlinesOptions}
                        onChange={handleAirlineValueChange}
                        renderInput={(params) => <TextField {...params} label="Airline" />}
                    />
                    {/* Total Stops */}
                    <TextField
                        className='text-field'
                        id="total_stops"
                        label="Total Stops"
                        variant="outlined"
                        required
                        value={total_stops}
                        onChange={handleTotalStopsChange}
                        type="number"
                    />
                    </div>
                    <div className="row-container">
                    {/* Journey Date */}
                    <TextField
                        className='text-field'
                        id="journey_date"
                        label="Journey Date"
                        variant="outlined"
                        required
                        value={journey_date}
                        onChange={handleJourneyDateValueChange}
                        type="number"
                    />
                    {/* Journey Month */}
                    <TextField
                        className='text-field'
                        id="journey_month"
                        label="Journey Month"
                        variant="outlined"
                        required
                        value={journey_month}
                        onChange={handleJourneyMonthValueChange}
                        type="number"
                    />
                    </div>
                    <div className="row-container">
                    {/* Departure Hours */}
                    <TextField
                        className='text-field'
                        id="dep_hr"
                        label="Departure Time (in hours)"
                        variant="outlined"
                        required
                        value={dep_hr}
                        onChange={handleDepartureHoursValueChange}
                        type="number"
                    />
                    {/* Departure Minutes */}
                    <TextField
                        className='text-field'
                        id="dep_min"
                        label="Departure Minutes (in mins)"
                        variant="outlined"
                        required
                        value={dep_min}
                        onChange={handleDepartureMinutesValueChange}
                        type="number"
                    />
                    </div>
                    <div className="row-container">
                    {/* Arrival Hours */}
                    <TextField
                        className='text-field'
                        id="arr_hr"
                        label="Arrival Hours"
                        variant="outlined"
                        required
                        value={arr_hr}
                        onChange={handleArrivalHoursValueChange}
                        type="number"
                    />
                    {/* Arrival Minutes */}
                    <TextField
                        className='text-field'
                        id="arr_min"
                        label="Arrival Minutes"
                        variant="outlined"
                        required
                        value={arr_min}
                        onChange={handleArrivalMinutesValueChange}
                        type="number"
                    />
                    </div>
                    <div className="row-container">
                    {/* Duration Hours */}
                    <TextField
                        className='text-field'
                        id="dur_hr"
                        label="Duration Hours"
                        variant="outlined"
                        required
                        value={dur_hr}
                        onChange={handleDurationHoursValueChange}
                        type="number"
                    />
                    {/* Duration Minutes */}
                    <TextField
                        className='text-field'
                        id="dur_min"
                        label="Duration Minutes"
                        variant="outlined"
                        required
                        value={dur_min}
                        onChange={handleDurationMinutesValueChange}
                        type="number"
                    />
                    </div>
                    <div className="row-container">
                    {/* Source */}
                    <Autocomplete className='text-field'
                        disablePortal
                        id="source"
                        options={sourceOptions}
                        onChange={handleSourceValueChange}
                        renderInput={(params) => <TextField {...params} label="Source" />}
                    />
                    {/* Destination */}
                    <Autocomplete className='text-field'
                        disablePortal
                        id="source"
                        options={destinationOptions}
                        onChange={handleDestinationValueChange}
                        renderInput={(params) => <TextField {...params} label="Destination" />}
                    />
                    </div>
                    <div className='login-btn-container'>
                        <Button className='login-btn' variant="contained" onClick={handlePredictPrice}>Predict Price</Button>
                    </div>
                    
                    {predictedPriceFromRedux?.predictedPrice && <div>Predicted price of the Flight is <b>Rs. {predictedPriceFromRedux?.predictedPrice}</b></div>}
                </div>
            </div>



        </>
    )
}

export default Home