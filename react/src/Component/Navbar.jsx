import React, { useState, useEffect } from 'react';
import './Style.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isChecked, setIsChecked] = useState(false);
  const [location, setLocation] = useState('');
  const [isMatch, setIsMatch] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userCoords, setUserCoords] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [loginTime, setLoginTime] = useState(null); 
  const [logoutTime, setLogoutTime] = useState(null); 
  const [delayTime, setDelayTime] = useState(null); 
  const [extraTime, setExtraTime] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (loginTime) {
      const timeElapsed = Date.now() - loginTime; 
      const eightHoursInMillis = 8 * 60 * 60 * 1000; 
      if (timeElapsed >= eightHoursInMillis) {
        setIsLoggedIn(false); 
      }
    }
  }, [loginTime]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoords({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location", error);
          setErrorMessage("تعذر الحصول على الموقع الجغرافي.");
        }
      );
    } else {
      setErrorMessage("متصفحك لا يدعم الحصول على الموقع الجغرافي.");
    }
  };

  const validateLocation = async () => {
    const apiKey = 'e6ecd471587742109864f469a9378040';
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

    try {
      const response = await axios.get(geocodeUrl);
      const data = response.data;

      if (data.status === 'OK') {
        const locationData = data.results[0];
        const { lat, lng } = locationData.geometry.location;

        if (userCoords) {
          const distance = getDistance(userCoords.latitude, userCoords.longitude, lat, lng);
          if (distance < 100) {
            setIsMatch(true);
            setErrorMessage('your location is true');
          } else {
            setIsMatch(false);
            setErrorMessage('your location is false');
          }
        } else {
          setErrorMessage("لا يمكن التحقق من الموقع الفعلي حتى يتم الحصول عليه.");
        }
      } else {
        setIsMatch(false);
        setErrorMessage('your location is false');
      }
    } catch (error) {
      setErrorMessage('حدث خطأ أثناء الاتصال بـ Google Maps API.');
    }
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; 
    return distance;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const currentTime = Date.now();
    setLoginTime(currentTime); 
    setIsLoggedIn(true); 
    navigate('/cart', { state: { location, currentTime: new Date().toLocaleTimeString() } });
  };

  const handleLogout = () => {
    const currentLogoutTime = new Date().toLocaleTimeString();
    setLogoutTime(currentLogoutTime); 

    const loginTimeMillis = new Date(loginTime).getTime();
    const logoutTimeMillis = new Date().getTime();

    const timeDifference = logoutTimeMillis - loginTimeMillis;
    const eightHoursInMillis = 8 * 60 * 60 * 1000; 

    let calculatedDelay = 0;
    let calculatedExtraTime = 0;

    if (timeDifference > eightHoursInMillis) {
      calculatedDelay = timeDifference - eightHoursInMillis; 
      calculatedExtraTime = calculatedDelay; 
    }

    setDelayTime(calculatedDelay);
    setExtraTime(calculatedExtraTime);

    setIsLoggedIn(false); 
    setLoginTime(null); 

    navigate('/cart', {
      state: { location, attendance: new Date(loginTime).toLocaleTimeString(), departure: currentLogoutTime, delay: calculatedDelay, extraTime: calculatedExtraTime }
    });
  };

  return (
    <div className="main">
      <input
        type="checkbox"
        id="chk"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)} />
      <div className={`signup ${isChecked ? 'active' : ''}`}>
        <form>
          <label htmlFor="chk"><img src="/image/2.png" alt="Sign Up" /> Sign up</label>
        </form>
      </div>
      <div className={`login ${isChecked ? 'active' : ''}`}>
        <form id="loginForm" onSubmit={handleLogin}>
          <label htmlFor="chk">Login</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="UserName"
            required />
          <input
            id="password"
            type="password"
            name="pswd"
            placeholder="Password"
            required />
        </form>
        <select
          id="Location"
          name="languages"
          className="can"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            validateLocation();
          }}
        >
          <option>Location</option>
          <option>المختبر</option>
          <option>ستي سنتر الماظه</option>
          <option> ابوت التجمع</option>
          <option> امازون العاشر من رمضان</option>
          <option>امازون السويس</option>
          <option> التجمع</option>
          <option>  كابيتال اكتوبر</option>
          <option>  بسكو مصر اكتوبر</option>
          <option> ليفين اسكوير التجمع</option>
          <option>فيوز التجمع </option>
          <option>  المقر</option>
          <option>انبي</option>
          <option>ليله القدر</option>
          <option disabled>امازون</option>
          <option>طريق السويس</option>
          <option>العاشر من رمضان</option>
          <option disabled>المعادي</option>
          <option>المقر</option>
        </select>
        <button type="submit">Login</button>

        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}

        {userCoords && (
          <div>
            <p>الموقع الفعلي للمستخدم: </p>
            <p>خط العرض: {userCoords.latitude}</p>
            <p>خط الطول: {userCoords.longitude}</p>
          </div>
        )}
        {errorMessage && (
          <div>
            <p style={{ color: 'red' }}>{errorMessage}</p>
          </div>
        )}
        <Link className='m-3' to="/admin">Admin</Link>
      </div>
    </div>
  );
}

export default Navbar;
