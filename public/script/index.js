function populateList(){
    $.get("/api/mydogisjibe", function (data) {
        
        for (var i=0;i<data.length;i++){
            var link = "/form?reminder_name="+encodeURIComponent(data[i].recipient)+"&reminder_event="+encodeURIComponent(data[i].event)+"&reminder_message="+encodeURIComponent(data[i].message)+"&reminder_email="+encodeURIComponent(data[i].email)+"&reminder_date="+encodeURIComponent(data[i].date)+"&reminder_id=0";
            
            var recipient  = $("<li>", {"class": "recipient" , text: "Recipient: "          + data[i].recipient});
            var events     = $("<li>", {"class": "events"    , text: "Event: "              + data[i].event    });
            var additional = $("<li>", {"class": "additional", text: "Additional Message: " + data[i].message  });
            var email      = $("<li>", {"class": "email"     , text: "Email: "              + data[i].email    });
            var date       = $("<li>", {"class": "date"      , text: "Date: "               + data[i].date     });
             
            var list         = $("<ul>").append(recipient, events, additional, email, date);
            var listSquare   = $("<td>", {href: link, "class": "center", id: "center"+i}).append(list);
            
            var deleteButton = $("<button>", {"class": "delete btn btn-danger", id:"button"+i, text: "Delete"});
            var deleteSquare = $("<td>", {"class": "left"}).append(deleteButton);
            var tr   = $("<tr>").append(deleteSquare, listSquare);
            
            $("table").append(tr);
        }
        

        $(".delete").click(function(event){
            event.preventDefault();
            var num = ($(this).attr('id')).substring(6,7);
            num=parseInt(num,10);
            $.ajax({
                url: '/api/mydogisjibe',
                type: 'delete',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: function (data) {
                    emptyList();
                    populateList();
                },
                data: JSON.stringify({remindNum: num})
            });
        });
            
        $("td").click(function(event) {
            event.preventDefault();
            if($(this).attr("href") != undefined){
                window.location.href = $(this).attr("href");
            }
        });
            
        function emptyList(){
            $("td").remove();
        } 
                   
    });
}

$(document).ready(function(){
    populateList();
});