import React from 'react';
import ReactDOM from 'react-dom';
import WeekScheduler from "./week_scheduler";



document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<WeekScheduler disabled={false}/>, document.getElementById('week_scheduler'));
    document.getElementById("is_recurrent").onclick=toggleWeekScheduler;
});

function toggleWeekScheduler(){
    let totalInputs = document.getElementById('week_scheduler').getElementsByTagName("input");
    if (document.getElementById('is_recurrent').checked) {
        ReactDOM.render(<WeekScheduler disabled={false}/>, document.getElementById('week_scheduler'));
        document.getElementById('week_scheduler').style.display = "block";
    }else{
        ReactDOM.render(<WeekScheduler disabled={true}/>, document.getElementById('week_scheduler'));
        document.getElementById('week_scheduler').style.display = "none";
    }
}
