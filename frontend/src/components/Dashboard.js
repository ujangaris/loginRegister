// rafce
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decoode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const history = useHistory();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decode = jwt_decoode(response.data.accessToken);
      // console.log(decode);
      setName(decode.name);
      setExpire(decode.exp);
    } catch (error) {
      if (error.response) {
        history.push('/');
      }
    }
  };
  // ini cara menggunakan axios interceptorsnya
  const axiosJWT = axios.create();
  // akhir cara menggunakan axios interceptorsnya
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://localhost:5000/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decode = jwt_decoode(response.data.accessToken);
        setName(decode.name);
        setExpire(decode.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get('http://localhost:5000/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };
  return (
    <div className="container mt-5">
      <h1>Welcome Back: {name}</h1>
      <button onClick={getUsers} className="button is-info">
        Get users
      </button>
    </div>
  );
};

export default Dashboard;
