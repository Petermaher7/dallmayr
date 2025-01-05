import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Style.css';

function Cart() {
  const { state } = useLocation();
  const { location, attendance, departure, delay, extraTime } = state || {}; 
  const people = [
    { name: "Omar Kapary", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Ahmed Kapary", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Moatz Mohamed", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Ziad Al Said", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Khaled Ali", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Mohamed Khaled", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Mohamed Ali", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Ali Alkhwanky", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Islam Osama", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Mohamed Medhat", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Abdalrahman Ashraf", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Mohamed Tarek", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Mohamed Ragaay", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 },
    { name: "Amr Kandel", location: location || "", attendance: attendance || "", departure: departure || "", delay: delay || 0, extraTime: extraTime || 0 }
  ];

  return (
    <div className="cart text-light">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Attendance</th>
            <th>Depature</th>
            <th>Delay</th>
            <th>Additional</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>
                <Link className='text-light'
                  to={{
                    pathname: `/CartDetails/${person.name}`,
                    state: { person }  
                  }}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.location}</td>
              <td>{person.attendance}</td>
              <td>{person.departure}</td>
              <td>{person.delay ? `${person.delay / 60000} min` : '0 min'}</td>
              <td>{person.extraTime ? `${person.extraTime / 60000} min` : '0 min'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
