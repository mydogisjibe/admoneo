$("document").ready(function(){
    $(".submit").click(function(event){
        addEvent(event);
    });
});
var text1="";
function addEvent(event){
     
      if ($('#name').val()==0||$('#event').val()==0||$('#message').val()==0||$('#email').val()==0||$('#date').val()==0)submitPressError(event);
     else{
         text1=$("#name").val()+ "'s "+ $("#event").val()+" is on "+ $("#date").val()+"! You'll tell them: \"" + $("#message").val() + "\" at their email (" + $("#email").val()+").";
      submitPressSuccess();
   }

   
}

function submitPressSuccess(){
    sweetAlert({   title: "You Remembered!",   text: text1,   type: "success",   confirmButtonText: "Cool" });
    
}
function submitPressError(event){
    event.preventDefault();
    sweetAlert({   title: "Boxes not filled!",   text: "Not all of the textboxes have been filled in.",   type: "error",   confirmButtonText: "Ok" });
}

