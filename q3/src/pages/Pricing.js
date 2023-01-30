import { useState } from "react";
import React from 'react'
import axios from 'axios';
export default function Pricing() {

        const [source, setSource] = useState('');
        const [destination, setDestination] = useState('');
        const [distance, setDistance] = useState('');

        async function postData(e){
                e.preventDefault();
                console.log("data :",source,destination);
                try{
                        await axios.post("http://localhost:8080/distance",{
                                source,
                                destination
                        }).then(function(response){
                                console.log(response.data.cost);
                                setDistance(response.data.cost);
                                // console.log(distance);
                        })
                }catch(error){
                        console.log(error);
                }
        }
        
        return (
                <form onSubmit={postData}>
                        <label for="select1">Source : </label>
                        <select name="source" id="select1" value={source} onChange={(e) => setSource(e.target.value)}>
                                <option value="flag">Select Start City</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Kolkata">Kolkata</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Bangalore">Bangalore</option>
                        </select>

                        <label for="select2">Destination : </label>
                        <select name="destination" id="select2" value={destination} onChange={(e) => setDestination(e.target.value)}>
                                <option value="flag">Select End City</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Kolkata">Kolkata</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Bangalore">Bangalore</option>
                        </select>

                        <button type="submit" >Submit</button>
                        <h4 id="distance">Distance : {distance}</h4>
                </form>
                
        )
}


