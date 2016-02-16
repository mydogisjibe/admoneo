$(document).ready(function(){
    $("form").submit(function(){
        
        // If the form is valid, send the form. After form gets back, alert success,
        // after success is alerted, link back to home page.
        if(formIsValid()){
            sendForm(function(){
                alertSuccess(function(){
                    window.location.href = "/";
                });
            });
        }
        else {
            alertError();
        }
        
        return false;
    });
});


function formIsValid(event){
      return !($('#name').val()==0||$('#event').val()==0||$('#message').val()==0||$('#email').val()==0||$('#date').val()==0);
}

function alertSuccess(callback){
    var text = $("#name").val()+ "'s "+ $("#event").val()+" is on "+ $("#date").val()+"! You'll tell them: \"" + $("#message").val() + "\" at their email (" + $("#email").val()+").";

    sweetAlert({
        title: "You Remembered!",
        text: text,
        type: "success",
        confirmButtonText: "Cool"
    }, callback);
    
}
function alertError(event){
    event.preventDefault();
    sweetAlert({
        title: "Boxes not filled!",
        text: "Not all of the textboxes have been filled in.",
        type: "error",
        confirmButtonText: "Ok"
    });
}

function sendForm(callback){
    var reminder = {
            recipient: $("#name").val(),
            event: $("#event").val(),
            message: $("#message").val(),
            email: $("#email").val(),
            date: $("#date").val(),
    };
    var reminderId = $("#id").val();
    
    
    var data = {reminder: reminder};
    if(reminderId != -1){
        data.remindNum = reminderId;
        $.ajax({
            url: '/api/mydogisjibe',
            type: 'put',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: callback,
            data: JSON.stringify(data)
        });
    }
    else{
        $.ajax({
            url: '/api/mydogisjibe',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: callback,
            data: JSON.stringify(data)
        });
    }
}
