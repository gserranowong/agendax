import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import range from 'range';

const DAYS_OF_WEEK = [{'value': 'L', 'name': 'Lunes'},
    {'value': 'M', 'name': 'Martes'},
    {'value': 'Mi', 'name': 'Miercoles'},
    {'value': 'J', 'name': 'Jueves'},
    {'value': 'V', 'name': 'Viernes'},
    {'value': 'S', 'name': 'Sabado'},
    {'value': 'D', 'name': 'Domingo'}];

const UPPER_LIMIT = 5;

function increase_count(count) {
    return count === UPPER_LIMIT ? count : count + 1;
}

function decrease_count(count) {
    return count === 0 ? count : count - 1;
}

function DayPicker(props) {

    const [count, setCount] = useState(0);

    return (<>
        {
            range.range(count).map((number) => <tr key={number.toString()}>
                <td><DaySchedule id={number} name={`scheduler_input_${props.name}_${number}`}/></td>
            </tr>)
        }
        <div className="row">
            <div className="col">
                <i type="button" className="fas fa-plus" name="action"
                   onClick={() => setCount(increase_count(count))}>
                </i>
            </div>
            <div className="col">
                <i type="button" className="fas fa-minus" name="action"
                   onClick={() => setCount(decrease_count(count))}>

                </i>
            </div>
        </div>
    </>);
}

function CardPicker(props) {
    const [show, setShow] = useState(false);
    return (<div className="card">
        <div className="card-header" id="headingOne">
            <h2 className="mb-0">
                <button className="btn btn-block text-left" type="button"
                        data-toggle="collapse"
                        data-target={`#data_target_${props.name}`} aria-expanded="true"
                        aria-controls={`collapes${props.name}`}
                        onClick={() => setShow(~show)}
                >
                    {props.name}
                </button>
            </h2>
        </div>
        <div id={`#data_target_${props.name}`} className={show ? "collapse show" : "collapse"}
             aria-labelledby="headingOne"
             data-parent={`#card_${props.name}`}>
            <div className="card-body">
                <DayPicker name={props.name}/>
            </div>
        </div>
    </div>);
}

function DateTimePicker(props) {
    return (<div className="input-group date col" id={props.name} data-target-input="nearest">
        <input type={props.type} name={props.name} className="form-control datetimepicker-input"
               data-target={`#${props.name}`}/>
        <div className="input-group-append" data-target={`#${props.name}`} data-toggle="datetimepicker">
            <div className="input-group-text"><i className="far fa-calendar-alt"/></div>
        </div>
    </div>);
}

function DaySchedule(props) {
    return (<div className="form-group row">
        <DateTimePicker name={`start_${props.name}`}/>
        <DateTimePicker name={`end_${props.name}`}/>
    </div>);
}

function WeekScheduler(props) {
    return (<div>
        {
            DAYS_OF_WEEK.map((day) => {
                return (<div id={`card_${day.name}`}>
                    <CardPicker name={day.name}/>
                </div>);
            })
        }
    </div>);
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<WeekScheduler/>, document.getElementById('week_scheduler'));
});
