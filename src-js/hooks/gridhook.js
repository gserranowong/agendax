import {useState} from "react";
import * as CoreGrid from "../purescript/CoreGrid";
import {DAYS_OF_WEEK, ID_TO_INDEX, INDEX_TO_CALENDAR_LABEL,DAYS_IN_WEEK,DAY_DIVISION} from '../constants';

export default function useGrid() {

    const [grid, setState] = useState(() => {
        return {state: CoreGrid.INACTIVE.value, cells: CoreGrid.initializeGrid(DAY_DIVISION)(DAYS_IN_WEEK)};
    });

    return ({
        setSelectMode: (cell_info) => {
            const next_range = {begin: cell_info.position, end: cell_info.position};
            const nextGrid = CoreGrid.next(CoreGrid.ONSELECT.value)(grid.cells)(next_range);
            setState({...{state: CoreGrid.ONSELECT.value, cells: nextGrid}, ...next_range});
        },
        setInactive: (cell_info) => {
            const next_range = {begin: grid.begin, end: cell_info.position};
            const nextGrid = CoreGrid.next(CoreGrid.INACTIVE.value)(grid.cells)(next_range);

            setState({...{state: CoreGrid.INACTIVE.value, cells: nextGrid}})

        },
        extendLocation: (cell_info) => {
            if (grid.state instanceof CoreGrid.ONSELECT) {
                const next_range = {begin: grid.begin, end: cell_info.position};

                const nextGrid = CoreGrid.next(grid.state)(grid.cells)(next_range);

                setState({...{state: CoreGrid.ONSELECT.value, cells: nextGrid}, ...next_range})
            }
        },
        forceRange: (next_range,b) => {

            const nextGrid = CoreGrid.next(CoreGrid.TOGGLE.value)(grid.cells)(next_range);
            setState({...{state: grid.state, cells: nextGrid}, begin: grid.begin, end: grid.end});
        },
        grid: grid
    });
}

