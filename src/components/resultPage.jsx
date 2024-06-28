import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResultPage = () => {
  const { id } = useParams();
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState('Processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/simulation_result/${id}`);
        const data = response.data;
        setStatus(data.status);
        if (data.status === 'Completed') {
          setResults(data.results);
        } else if (data.status === 'Error') {
          setError(data.error);
        }
      } catch (err) {
        setError(err.response ? err.response.data.detail : err.message);
      }
    };

    const pollResults = () => {
      fetchResults();
      if (status === 'Processing') {
        setTimeout(pollResults, 5000); // Poll every 5 seconds
      }
    };

    pollResults();
  }, [id, status]);

  if (status === 'Processing') {
    return <div>Processing your request...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Results for Simulation ID: {id}</h1>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default ResultPage;
