import React from 'react';
import { SyncLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container mt-10 ">
      <SyncLoader color="#36D7B7" size={15} margin={8} />
    </div>
  );
};

export default LoadingSpinner;
