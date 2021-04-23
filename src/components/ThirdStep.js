import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import csc from 'country-state-city';
import axios from 'axios';
import { BASE_API_URL } from '../utils/consants';


const ThirdStep = (props) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [] = useState();

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const result = await csc.getAllCountries();
        let allCountries = [];
        allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name
        }));
        // if property isoCode does not exist, set an empty object
        const [{ isoCode: firstCountry } = {}] = allCountries;
        setCountries(allCountries);
        setSelectedCountry(firstCountry);
        setIsLoading(false);
      } catch (error) {
        setCountries([]);
        setIsLoading(false);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await csc.getStatesOfCountry(selectedCountry);
        let allStates = [];
        allStates = result?.map(({ isoCode, name }) => ({
          isoCode,
          name
        }));
        console.log({ allStates });
        const [{ isoCode: firstState = '' } = {}] = allStates;
        setCities([]);
        setSelectedCity('');
        setStates(allStates);
        setSelectedState(firstState);
      } catch (error) {
        setStates([]);
        setCities([]);
        setSelectedCity('');
      }
    };
    getStates();
  }, [selectedCountry]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <Form className="input-form" onSubmit={handleSubmit}>
      <div className="col-md-6 offset-md-3">
        <Form.Group controlId="country">
          {isLoading && (
            <p className="loading">Loading countries. Please wait...</p>
          )}
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            name="country"
            value={selectedCountry}
            onChange={(event) => setSelectedCountry(event.target.value)}
          >
            {countries.map(({ isoCode, name }) => (
              <option value={isoCode} key={isoCode}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      <Form.Group>
        <Form.Label>State</Form.Label>
        <Form.Control
        as="select"
        name="state"
        value= {selectedState}
        onChange={(event) => setSelectedState(event.target.value)}
        >
          {states.length > 0 ? 
          (
            states.map(({isoCode, name}) => (
              <option value={isoCode} key={isoCode}>
                {name}
              </option>
            ))
          ): (
            <option value="" key="">
              No state fonund
            </option>
          )}
        </Form.Control>
      </Form.Group>
      </div>
    </Form>
  );

};

export default ThirdStep;