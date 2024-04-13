import React, { useEffect, useState } from 'react';
import { calculateNextBirthdayDetails, calculateAgeDetails } from './calculations';
import './BirthDate.css'
import logo from "./assets/logo.png"
import logo1 from "./assets/logo1.jpg"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const BirthDate = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [data, setData] = useState({});
  const [nextBirthday, setNextBirthday] = useState({});

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  };

  function handleDate(dateobj) {
    const dateFormate = formatDate(dateobj)
    setDate(dateFormate)
  }

  useEffect(() => {
    const ageDetails = calculateAgeDetails(date);
    setData(ageDetails);

    const nextBirthdayDetails = calculateNextBirthdayDetails(date);
    setNextBirthday(nextBirthdayDetails);
  }, [date]);

  return (
    <div className='main-container'>
      <div className='bday-container'>
        <span>Select Birthday Date</span>
        {/* <input className='date-input' type="date" value={date} onChange={(e) => setDate(e.target.value)} /> */}
        <LocalizationProvider className="css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root" dateAdapter={AdapterDayjs}>
          <DatePicker
            className='date-input'
            onChange={handleDate}
            defaultValue={dayjs(new Date().toISOString().slice(0, 10))}
          />
        </LocalizationProvider>
      </div>
      <div className='container'>
        <div className='current current-container'>
          <label>Age</label>
          <span >{data.years} <span style={{ fontSize: "25px" }}>Years</span></span>
          <div className='next-bday'>
            <span>{data.months} months</span>
            <span>|</span> <span>{data.day} Days</span>
          </div>
        </div>
        <div className='next'>
          <label className='next-bday-title'>Next Birthday</label>
          <label><img className="bday-icon" src={logo1} alt={logo} /></label>
          <span className='next-bday-container'> {nextBirthday.dayOfWeek}</span>
          <div className='next-bday next-bday-container'>
            <span>{nextBirthday.months} months</span>
            <span>|</span> <span>{nextBirthday.days} Days</span>
          </div>
        </div>
      </div>

      <div >
        <div className='summary'>
          <span>Summary</span>
        </div>
        <div className='details'>
          <div className='content'>
            <span>Years</span>
            <p>{data.years}</p>
          </div>
          <div className='content'>
            <span>Months</span>
            <p>{data.totalMonths}</p>
          </div>
          <div className='content'>
            <span>Weeks</span>
            <p>{data.weeks}</p>
          </div>
          <div className='content'>
            <span>Days</span>
            <p>{data.days}</p>
          </div>
          <div className='content'>
            <span>Hours</span>
            <p>{data.hours}</p>
          </div>
          <div className='content'>
            <span>Minutes</span>
            <p>{data.minutes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BirthDate;
