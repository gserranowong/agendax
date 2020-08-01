import React from 'react';
import ReactDOM from 'react-dom';
import WeekScheduler from "./week_scheduler";



document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<WeekScheduler/>, document.getElementById('week_scheduler'));
});