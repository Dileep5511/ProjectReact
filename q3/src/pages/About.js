import { useState } from "react";
import React from 'react'
import axios from 'axios';
import "./table.css"


var result = [];

function asc() {
  let sortedProducts = result.sort(
    (p1, p2) => (p1.rating < p2.rating) ? 1 : (p1.rating > p2.rating) ? -1 : 0);

  console.log( "sorted ", sortedProducts);
}

export default function About() {
  const [city, setCity] = useState('');
  const [shipdata, setShipdata] = useState([]);

  async function postData(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/shipperprocess", {
        city
      }).then(function (response) {
        console.log(response.data);
        setShipdata(response.data);
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={postData}>
      <label for="select1">Shipper City : </label>
      <select name="city" id="select1" value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="flag">Select Start City</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Chennai">Chennai</option>
        <option value="Bangalore">Bangalore</option>
      </select>

      <button type="submit" onclick="asc()">Submit</button>
      <h4 id="distance">City : {city}</h4>
      <button onClick={asc}>Sort</button>

      <table>
          <th>Rating</th>
        {shipdata.map(ship => (
          <tr key={ship.shipperId}>
            <td>{ship.shipperId}</td>
            <td> {ship.rating} </td>
          </tr>
        ))}
      </table>
    </form>
  )
}