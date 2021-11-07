// rafce
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decoode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decode = jwt_decoode(response.data.accessToken);
      // console.log(decode);
      setName(decode.name);
    } catch (error) {}
  };
  return (
    <div className="container mt-5">
      <h1>Welcome Back: {name}</h1>
    </div>
  );
};

export default Dashboard;
