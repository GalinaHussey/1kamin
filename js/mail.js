$(document).ready(function() {
                  
                  
                  
                  
    	
	/* Contact Form */
	$('#sendToAdmin').on("click",  function() {
                         
                         
                         
        var proceed = true;  		
			
                         $(".form-control").each(function(){
                                                 $(this).removeClass("has-error");
                                                 if(!$.trim($(this).val())){
                                                 $(this).addClass("has-error");
                                                 proceed = false;
                                                 }
                                                 
                                                 var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                                                 if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                                                 $(this).addClass("has-error");    
                                                 proceed = false;             
                                                 }   
                                                 });
       
        if(proceed) 
        {
            post_data = {
                'user_name'   		: $('#user-username').val(),
                 'user_phone'           : $('#user-phone').val(),
                'user_email'    	: $('#user-email').val(),
                'msg'          	 	: $('#submission-summary').val()
            };
                
        
                         $.post('/php/mailContacts.php', post_data, function(response){
                                
                                if(response.type == 'error'){
                                var error = '<div class="panel panel-danger"><div class="panel-body" style="margin-top: 10px;  font-size: 15px;">'+ response.text +'</div></div>'
                                $("#errorMessage").html(error).slideDown();
                                }else{
                                $("#contactForm").slideUp();
                                $("#errorMessage").slideUp();
                                $("#contactResults").slideDown();
                                }
                                
                                setTimeout(func, 1);
                                
                                function func() {
                                
                                if(response.type == 'error'){
             
                                }else{
                                /* $(".form-control").val(''); */
                                }
                                
                                }
                                
                                
                                
                                
                                }, 'json');
                         
                         
                         
            
            
        }
    });    
	$("#content").on("keyup", ".form-control", function(){
		$(this).closest(".form-group").removeClass("has-error");
        $("#errorMessage").slideUp();
	});	
});
