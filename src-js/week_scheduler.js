import React from 'react';
import ReactDOM from 'react-dom';
import range from 'range';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {DAYS_OF_WEEK, ID_TO_INDEX, INDEX_TO_CALENDAR_LABEL,DAYS_IN_WEEK,DAY_DIVISION} from './constants';
import useGrid from "./hooks/gridhook";

function SlotInput(props) {
    return <td className={props.className}
               onMouseDown={() => props.grid_manager.setSelectMode(props.cell_info)}
               onMouseOver={() => props.grid_manager.extendLocation(props.cell_info)}
               onMouseUp={() => props.grid_manager.setInactive(props.cell_info)}
    >
        {
            props.cell_info.is_active && <input type="hidden" name={`scheduler(${props.cell_info.position.h},${props.cell_info.position.v})`}/>
        }
    </td>
}

const TimeSlotInput = styled(SlotInput)`
    background-color: ${props => props.cell_info.is_selected ? 'rgba(204, 255, 204)' : props.cell_info.is_active ? 'rgba(107, 193, 255)' : 'rgba(253, 255, 237)'};
    padding: '2px 10px';
    bordered-radius: 3;
`;

function WeekScheduler(props) {

    const cell_grid_manager = useGrid();

    const days_range = range.range(0, DAYS_IN_WEEK);
    const time_range = range.range(0, DAY_DIVISION);

    return (<Table className={props.className} bordered>
        <thead>
        <tr>
            <th>Day of Week</th>
            {
                DAYS_OF_WEEK.map((day,index) => <th key={day.id} onClick={()=>{
                    cell_grid_manager.forceRange({begin:{v:index+1,h:1},end:{v:index+1,h:DAY_DIVISION}},true);
                }}>
                                                                                {day.name}
                                                                            </th>)
            }
        </tr>
        </thead>
        <tbody>

        {time_range.map((h) => {
            return (<tr key={h}>
                <td onClick={()=>{
                    cell_grid_manager.forceRange({begin:{v:1,h:h+1},end:{v:DAYS_IN_WEEK,h:h+1}},true);
                }}>
                    {INDEX_TO_CALENDAR_LABEL[h]}
                </td>
                {
                    days_range.map((v) => {
                        let grid_index = h * DAYS_IN_WEEK + v;
                        let cell_info = cell_grid_manager.grid.cells[grid_index];

                        return <TimeSlotInput key={grid_index}
                                              grid_manager={cell_grid_manager}
                                              cell_info={cell_info}
                        />;

                    })
                }
            </tr>);

        })}

        <tr>

        </tr>
        </tbody>
    </Table>)
}

export default styled(WeekScheduler)`
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    text-align: center;
`
