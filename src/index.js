import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/configStore';
import { Provider } from 'react-redux';
import * as signalR from '@aspnet/signalr'
import i18n from './i18n';
// Code kết nối đến server lắng nghe sự kiện từ server
export const connection = new signalR.HubConnectionBuilder().withUrl(`http://movieapi.cyberlearn.vn/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();
connection.start().then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}).catch(error => {
    console.log(error)
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
