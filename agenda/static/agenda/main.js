
add_date_picker = function(id_name){

    const input = document.getElementById(id_name);
    const datepicker = new TheDatepicker.Datepicker(input);
    datepicker.render();
    return datepicker
}

window.onload = function () {
    add_date_picker('id_start_date');
    add_date_picker('id_end_date');
};

