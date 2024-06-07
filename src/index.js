import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ViewProvider } from './context/ViewProvider';
import { UserProvider } from './context/UserProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ViewProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ViewProvider>
);

