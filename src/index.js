import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

import {WeatherProvider} from './providers/WeatherProvider'

ReactDOM.render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>,
  document.getElementById('root')
);