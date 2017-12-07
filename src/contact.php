<?php

function has_header_injection($str) {
  return preg_match( "/[\r\n]/", $str );
}

$formMsg = "";

if (!empty($_POST["name"]) && !empty($_POST["email"]) && !empty($_POST["message"])) {
  $name = trim(htmlspecialchars($_POST["name"]));
  $email = trim(htmlspecialchars($_POST["email"]));
  $msg = htmlspecialchars($_POST["message"]);
  
  if (
    has_header_injection ($name) ||
    has_header_injection ($email)
  ) {
    die ();
  }
  
  $to = "jibanez.romany74@gmail.com";

  $subject = "<h2> $name has sent you an email </h2>";

  $message = "
    <h4> Name: $name </h4>
    <h4> Email: $email </h4>
    <p> $msg </p>
  ";

  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
  $headers .= "From: " . $name . " <" . $email . ">\r\n";
  $headers .= "X-Priority: 1\r\n";
  $headers .= "X-MSMail-Priority: High\r\n\r\n";

  $message = wordwrap($message, 72);

  mail(
    $to,
    $subject,
    $message,
    $headers
  );

  echo "<p> Your message was sent successfully! </p>";
} else {
  echo "<p> There was an error processing your message!  Please try again.  Make sure to fill in all fields with the correct information. </p>";
}
?>