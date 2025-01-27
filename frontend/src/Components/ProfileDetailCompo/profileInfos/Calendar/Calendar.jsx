import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Button, Typography, Container } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

const DatePicker = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate(); // Hook to navigate between pages

  // Simulate fetching reserved dates from an API
  useEffect(() => {
    async function fetchReservedDates() {
      try {
        // Replace with your API endpoint
        const response = await fetch('/api/reserved-dates');
        const data = await response.json();
        setReservedDates(data.map((date) => new Date(date))); // Convert to Date objects
      } catch (error) {
        console.error('Error fetching reserved dates:', error);
      }
    }
    fetchReservedDates();
  }, []);

  // Handle date click
  const handleDateClick = (clickedDate) => {
    if (reservedDates.some((date) => date.getTime() === clickedDate.getTime())) {
      return; // Prevent selecting reserved dates
    }

    setSelectedDates((prevDates) => {
      if (prevDates.some((date) => date.getTime() === clickedDate.getTime())) {
        // If date already selected, remove it
        return prevDates.filter((date) => date.getTime() !== clickedDate.getTime());
      } else {
        // Add selected date
        return [...prevDates, clickedDate];
      }
    });
  };

  const handleReserveClick = () => { //here is to passe the date that was selected by the user zo the form page
    if (selectedDates) {
      // Navigate to the form page with the selected date as state
      navigate('/form', { state: { selectedDates } });
    } else {
      alert('Please select a date to reserve.');
    }
  };
  //in the form page we should 
  /*import { useLocation } from 'react-router-dom';

const FormPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedDate = new Date(params.get('date'));

  return (
    <div>
      <h2>Reservation Form</h2>
      <p>Your selected reservation date is: {selectedDate.toLocaleDateString()}</p>
    </div>
  );
};*/

  return (
    <Container style={{marginTop:"50px" , display:"grid" , placeItems:"center"}}>
      <Typography variant="h4" gutterBottom style={{color:"#D08E70"}}>
        <b>Reserve Your Place Now</b>
      </Typography>
      <Calendar
      
        onChange={setDate}
        value={date}
        onClickDay={handleDateClick}
        tileClassName={({ date, view }) => {
          // Highlight reserved dates in red
          if (reservedDates.some((reservedDate) => reservedDate.getTime() === date.getTime())) {
            return 'reserved';
          }
          // Highlight selected dates
          if (selectedDates.some((selectedDate) => selectedDate.getTime() === date.getTime())) {
            return 'highlighted';
          }
        }}
        tileDisabled={({ date, view }) => {
          // Disable reserved dates
          return reservedDates.some((reservedDate) => reservedDate.getTime() === date.getTime());
        }}
      />
      <Button variant="contained" color="primary" onClick={handleReserveClick} style={{marginTop:"30px" , borderRadius:"20px" , backgroundColor:"#D08E70"}}>
        Reserver
      </Button>
      <Typography variant="body1" style={{ marginTop: '20px', color:"#D08E70" }}>
        <b>Selected Dates: {selectedDates.map((d) => d.toLocaleDateString()).join(', ')}</b>
      </Typography>
    </Container>
  );
};

export default DatePicker;
