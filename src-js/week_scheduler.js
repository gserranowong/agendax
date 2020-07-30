import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import range from 'range';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {DAYS_OF_WEEK, ID_TO_INDEX, INDEX_TO_CALENDAR_LABEL} from './constants';
import CoreGrid from './purescript/CoreGrid';

function SlotInput(props) {
    return <td className={props.className}
               onMouseDown={() => props.updater.setSelectMode(props.day.id, props.index)}
               onMouseOver={() => props.updater.extendLocation(props.day.id, props.index)}
               onMouseUp={() => props.updater.setInactive(props.day.id, props.index)}
    ></td>
}

function isMatching(state, current_location) {

    const initial = state.initial;
    const end = state.end;

    const initial_location = {x: initial.index, y: ID_TO_INDEX[initial.id]};
    const final_location = {x: end.index, y: ID_TO_INDEX[end.id]};

    const min_location = {
        x: Math.min(initial_location.x, final_location.x),
        y: Math.min(initial_location.y, final_location.y)
    }
    const max_location = {
        x: Math.max(initial_location.x, final_location.x),
        y: Math.max(initial_location.y, final_location.y)
    }

    return ((min_location.x <= current_location.x) && (current_location.x <= max_location.x)) &&
        ((min_location.y <= current_location.y) && (current_location.y <= max_location.y))
}

function isActive(props) {
    const locations = props.updater.currentState.pairs;

    if (locations.length > 0) {

        const current_location = {x: props.index, y: ID_TO_INDEX[props.day.id]};

        const matching_locations = locations.map(location => isMatching(location, current_location));

        return matching_locations.reduce((acc, match) => acc || match, false);

    }
    return false;
}

const TimeSlotInput = styled(SlotInput)`
background-color: ${props => isActive(props) ? 'rgba(107, 193, 255)' : 'rgba(253, 255, 237)'};
padding: '2px 10px';
bordered-radius: 3;
`;

function useCalendar() {

    const states = {};

    const calendar_range = range.range(0, 24);

    DAYS_OF_WEEK.forEach((day) => {
        states[day.id] = []
        calendar_range.forEach(i => {
            const [state, setState] = useState(false);
            states[day.id].push([state, setState]);
        })
    })


    return [states, (index, id) => {
        const [state, setState] = states[id][index]
        setState(!state);
    }];
}

function useHoldStateMachine() {

    let grid = CoreGrid.initializeGrid(7)(24);

    const [state, setState] = useState(grid);
    return {
        setSelectMode: (id, index) => {

            const old_pairs = state.pairs;
            old_pairs.push({
                initial: {id: id, index: index},
                end: {id: id, index: index}
            });

            setState({state: 'ONSELECT', pairs: old_pairs});

        },
        setInactive: (id, index) => {
            const old_pairs = state.pairs;
            const last_location = old_pairs.pop();

            old_pairs.push({
                initial: last_location.initial,
                end: {id: id, index: index}
            });

            setState({state: 'INACTIVE', pairs: old_pairs})
        },
        extendLocation: (id, index) => {
            if (state.state === 'ONSELECT') {
                const old_pairs = state.pairs;
                const last_location = old_pairs.pop();

                old_pairs.push({
                    initial: last_location.initial,
                    end: {id: id, index: index}
                });

                setState({state: 'ONSELECT', pairs: old_pairs})
            }
        },
        currentState: state
    }

}

const initial_range = []

function Calendar(props) {

    const updater = useHoldStateMachine();
    const [calendar, setCalendar] = useCalendar();
    const isCellActive = useState()

    return (<Table className={props.className} bordered>
        <thead>
        <tr>
            <th>Day of Week</th>
            {
                DAYS_OF_WEEK.map(day => <th key={day.id}>
                    {day.name}
                </th>)
            }
        </tr>
        </thead>
        <tbody>

        {calendar_range.map(index => {

            return (<tr key={index}>
                <td>
                    {INDEX_TO_CALENDAR_LABEL[index]}
                </td>
                {
                    DAYS_OF_WEEK.map(day =>
                        <TimeSlotInput key={day.id} day={day} index={index} active={calendar[day.id][index][0]}
                                       setCalendar={setCalendar}
                                       updater={updater}
                        />
                    )
                }
            </tr>)
        })}

        <tr>

        </tr>
        </tbody>
    </Table>)
}

export default styled(Calendar)`
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    text-align: center;
`
