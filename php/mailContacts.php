<?php
if($_POST)
{
    $to_email = "info@1kamin.ru"; // Recipient email, Replace with own email here
	$from_email = "postmaster@1kamin.ru"; // Sender email, Replace with own email here
    $subject = "С сайта 1kamin";
	
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        
        $output = json_encode(array( 
            'type'=>'error',
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); 
    } 
    
    //Sanitize input data using PHP filter_var().
    $user_name      = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
    $user_phone      = filter_var($_POST["user_phone"], FILTER_SANITIZE_STRING);
    $user_email     = filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
    $message        = filter_var($_POST["msg"], FILTER_SANITIZE_STRING);
    
	
	
    //additional php validation
    if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ 
        $output = json_encode(array('type'=>'error', 'text' => 'Пожалуйста, введите настоящий email :)'));
        die($output);
    }   
    if(strlen($message)<3){ 
        $output = json_encode(array('type'=>'error', 'text' => 'Слишком короткое сообщение. Пожалуйста, введите хоть что-нибудь :)'));
        die($output);
    }
    
    //email body
	$message_body  = '<html><body>';
    $message_body .= '<p><b>Имя:</b> ' . $user_name .  '</p>' ;
    $message_body .= '<p><b>E-mail:</b> ' . $user_email .  '</p>' ;
    $message_body .= '<p><b>Тел:</b> ' . $user_phone .  '</p>' ;
	$message_body .= '<p><b>Сообщение:</b><br>' . $message . '</p>';
	$message_body .= '</body></html>';
    	
	$headers = "From: $user_name <$from_email>\r\n". 
               "MIME-Version: 1.0" . "\r\n" . 
               "Content-type: text/html; charset=UTF-8" . "\r\n"; 
    
	$message = html_entity_decode($message);
    $send_mail = mail($to_email, $subject, $message_body, $headers);
    
//    // try to send better mail
//    $headers2 = "From: $user_name <$user_email>\r\n".
//    "MIME-Version: 1.0" . "\r\n" .
//    "Content-type: text/html; charset=UTF-8" . "\r\n";
//    $send_mail = mail($to_email, $subject, $message_body, $headers2);
    
    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Success!'));
        die($output);
    }
}
?>
