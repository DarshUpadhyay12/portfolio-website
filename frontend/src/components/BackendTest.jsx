import React, { useState, useEffect } from 'react';

const BackendTest = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('/api/message');
        if (!response.ok) {
          throw new Error('Failed to fetch message');
        }
        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Backend Connection Test</h3>
      <p>Message from Flask backend: <strong>{message}</strong></p>
      <p>This component is making a request to <code>/api/message</code></p>
    </div>
  );
};

export default BackendTest;
