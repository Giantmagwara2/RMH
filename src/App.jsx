// App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Welcome to RocVille Media House</h1>
      {/* Render child routes */}
      <Outlet />
    </div>
  );
}

export default App;