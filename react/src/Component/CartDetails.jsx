import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

function CartDetails() {
  const { name } = useParams();
  const { state } = useLocation(); 
  const person = state?.person; 

  if (!person) {
    return <div className='text-light'>No data available for {name}</div>;
  }

  return (
    <div>
      <h2>Details for {person.name || name}</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Attendance</th>
            <th>Departure</th>
            <th>Delay</th>
            <th>Additional</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{person.name}</td>
            <td>{person.location}</td>
            <td>{person.attendance}</td>
            <td>{person.departure}</td>
            <td>{person.delay ? `${person.delay / 60000} min` : '0 min'}</td>
            <td>{person.extraTime ? `${person.extraTime / 60000} min` : '0 min'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CartDetails;
