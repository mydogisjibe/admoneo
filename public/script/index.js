//var link = "//admoneo-matthewgaim.c9users.io/form?reminder_name=potato&reminder_event=myEvent&reminder_message=This+is+my+message&reminder_email=bob%40bob.com&reminder_date=2016-02-14&reminder_id=0"
function populateList(){
    $.get("/api/mydogisjibe", function (data) {
        

         for (var i=0;i<data.length;i++){
             var link = "/form?reminder_name="+encodeURIComponent(data[i].recipient)+"&reminder_event="+encodeURIComponent(data[i].event)+"&reminder_message="+encodeURIComponent(data[i].message)+"&reminder_email="+encodeURIComponent(data[i].email)+"&reminder_date="+encodeURIComponent(data[i].date)+"&reminder_id=0";
             
             var recipient = '<li class="recipient">Recipient: '+data[i].recipient+'</li>';
             var events = '<li class="events">Event: '+data[i].event+'</li>';
             var additional = '<li class="additional">Additional Message: '+data[i].message+'</li>';
             var email = '<li class="email">Email: '+data[i].email+'</li>';
             var date = '<li class="date">Date: '+data[i].date+'</li>';
             
             var list = '<ul>'+recipient+events+additional+email+date+'</ul>';
             var td = '<td  href="'+link+'" class="center" id="center'+i+'">'+list+'</td>';
             var tr = '<tr><td class="left"><button class="delete btn btn-danger" id="button'+i+'" td>Delete</button>'+td+'</tr>';
             
             
             $("table").append(tr);
         }
        

           $(".delete").click(function(event){
               event.preventDefault();
                var num =($(this).attr('id')).substring(6,7);
                num=parseInt(num,10);
                $.ajax({
                    url: '/api/mydogisjibe',
                    type: 'delete',
                    dataType: 'json',
                    success: function (data) {
                        emptyList();
                        populateList();
                        return false;
                    },
                    data: JSON.stringify({remindNum: num})
                });
                return false;
            });
            $("td").click(function(event) {
                e.preventDefault();
                if($(this).attr("href") != undefined){
                    window.location.href = $(this).attr("href");
                }
                else{
                    return false;
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