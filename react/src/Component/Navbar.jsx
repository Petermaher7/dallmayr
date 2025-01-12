import React, { useState, useEffect } from 'react';
import './Style.css';
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
  const locationsData = {
    "ابوت": { lat: 30.017944, lng: 31.424389 },
    "مابي": { lat: 30.016889, lng: 31.413944 },
    "بكير": { lat: 30.025833, lng: 31.478806 },
    "ليفين سكوير": { lat: 30.046194, lng: 31.485389 },
    "فيوز": { lat: 30.027750, lng: 31.483083 },
    "ادرس": { lat: 30.025750, lng: 31.493555 },
    "الفطيم التجمع": { lat: 30.017694, lng: 31.497250 },
    "امازون السويس": { lat: 30.087278, lng: 31.461944 },
    "امازون العاشر": { lat: 30.227056, lng: 31.720833 },
    "الفطيم ستي سنتر": { lat: 30.080000, lng: 31.366667 },
    "كابيتال اكتوبر": { lat: 30.024472, lng: 31.013861 },
    "بسكو مصر اكتوبر": { lat: 29.925111, lng: 30.890833 },
    "انبي": { lat: 30.044083, lng: 31.340278 },
    "المقر": { lat: 29.980528, lng: 31.309000 },
    "المختبر القريه الذكيه": { lat: 30.078222, lng: 31.012583 }
  };

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
    if (!location || location.trim() === '') {
      setErrorMessage("Please select a location");
      return false; 
    }

    if (locationsData[location]) {
      const { lat, lng } = locationsData[location];

      if (userCoords) {
        const distance = getDistance(userCoords.latitude, userCoords.longitude, lat, lng);
        if (distance < 100) {
          setIsMatch(true);
          setErrorMessage('Your location is valid');
          return true; 
        } else {
          setIsMatch(false);
          setErrorMessage('Your location is invalid');
          return false; 
        }
      }
    } else {
      setErrorMessage("The selected location is not valid or not in the list.");
      return false; 
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

  const handleLogin = async (e) => {
    e.preventDefault();

    const locationIsValid = await validateLocation(); 
    if (!locationIsValid) return; 

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
          <option>ابوت</option>
          <option>مابي</option>
          <option>بكير</option>
          <option>ليفين سكوير</option>
          <option>فيوز</option>
          <option>ادرس</option>
          <option>الفطيم التجمع</option>
          <option>امازون السويس</option>
          <option>امازون العاشر</option>
          <option>الفطيم ستي سنتر</option>
          <option>كابيتال اكتوبر</option>
          <option>بسكو مصر اكتوبر</option>
          <option>انبي</option>
          <option>المقر</option>
          <option>المختبر القريه الذكيه</option>
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

        {isLoggedIn && loginTime && (
          <div>
            <p>وقت الدخول: {new Date(loginTime).toLocaleTimeString()}</p>
          </div>
        )}
        {logoutTime && (
          <div>
            <p>وقت الخروج: {logoutTime}</p>
            {delayTime !== null && (
              <p>الوقت الإضافي: {extraTime / 1000} ثواني</p>
            )}
          </div>
        )}

        <Link className='m-3' to="/admin">Admin</Link>
      </div>
    </div>
  );
}

export default Navbar;
