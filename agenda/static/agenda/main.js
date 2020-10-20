$(function () {
    $('.date').datetimepicker({
        'format': 'YYYY-MM-DD HH:mm:ss'
    });
});

function toogleTypeEvent(){
    if (document.getElementById('is_recurrent').checked) {
        document.getElementById('week_scheduler').style.display = "block";
    }else{
        document.getElementById('week_scheduler').style.display = "none";
    }
}