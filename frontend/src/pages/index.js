import React from 'react';

const IndexPage = () => {
  return (
    <div>
      <h1>Welcome to Pokémon Card Scanner</h1>
      <button onClick={() => (window.location.href = '/scan')}>Go to Scan</button>
    </div>
  );
};

export default IndexPage;
