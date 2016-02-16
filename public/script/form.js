$(document).ready(function(){
    $("form").submit(function(){
        var reminder = {
            recipient: $("#name").val(),
            event: $("#event").val(),
            message: $("#message").val(),
            email: $("#email").val(),
            date: $("#date").val(),
        };
        var reminderId = $("#id").val();
        
        var data = {reminder: reminder};
        console.dir(data);
        if(reminderId != -1){
            data.remindNum = reminderId;
            $.ajax({
                url: '/api/mydogisjibe',
                type: 'put',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: function (data) {
                    window.location.href = "/";
                },
                data: JSON.stringify(data)
            });
        }
        else{
            $.ajax({
                url: '/api/mydogisjibe',
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: function (data) {
                    window.location.href = "/";
                },
                error : function(xhr, status){
                    console.log(status);
                },
                data: JSON.stringify(data)
            });
        }
        return true;
    });
});