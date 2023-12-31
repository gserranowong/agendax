import range from 'range';



export const DAYS_OF_WEEK = [
    {id: 'L', name: 'Lunes'},
    {id: 'M', name: 'Martes'},
    {id: 'Mi', name: 'Miercoles'},
    {id: 'J', name: 'Jueves'},
    {id: 'V', name: 'Viernes'},
    {id: 'S', name: 'Sabado'},
    {id: 'D', name: 'Domingo'},
]

export const ID_TO_INDEX = {}

DAYS_OF_WEEK.forEach((day, index) => {
    ID_TO_INDEX[day.id] = index;
})

export const INDEX_TO_CALENDAR_LABEL = [];

const interval = 30;
range.range(0, 48).forEach(index=>{

    let hours = Math.floor(index/2);
    let minutes = index%2===1 ? 30 : 0;
    let ampm = index >= 12 ? "PM" : "AM";
    INDEX_TO_CALENDAR_LABEL.push(`${hours}:${minutes} ${ampm}`);

})

export const DAYS_IN_WEEK = 7;
export const DAY_DIVISION = 48;