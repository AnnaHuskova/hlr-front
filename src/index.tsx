import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import ReactGA from "react-ga4"; // подключаем гугл аналитику
import envVars from "./js/env";
import './styles.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
// подключаем гугл аналитику
//If GA token is set in ENV, enable analytics 
// if(envVars.REACT_APP_GA4_ID !== undefined) {
//   ReactGA.initialize(envVars.REACT_APP_GA4_ID);
// }

root.render(
	<React.StrictMode>
		<BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
