import React from 'react';
import MyComponent from './MyComponent';
import BarChart from './BarChart';

const App = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <BarChart />
      <MyComponent/>
    </div>
  );
};

export default App;
