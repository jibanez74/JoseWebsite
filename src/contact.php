<?php

function has_header_injection($str) {
  return preg_match( "/[\r\n]/", $str );
}

if (isset($_POST["name"]) && isset($_POST["message"]) && isset($_POST["email"])) {
  $name = trim(htmlspecialchars($_POST['name']));
  $email = trim(htmlspecialchars($_POST['email']));
  $msg = htmlspecialchars($_POST['message']);

  if (
    has_header_injection($name) ||
    has_header_injection($email)
  ) {
    die ();
  }

  $toJose = "jibanez.romany74@gmail.com";
  $toMiguel = "miguelnoyac@gmail.com";

  $subject = $name.'with email'.$email.'sent you a message';

  $message = "
    <h4> $name </h4>
    <h4> $email </h4>
    <p> $msg </p>
  ";

  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
  $headers .= "From: " . $name . " <" . $email . ">\r\n";
  $headers .= "X-Priority: 1\r\n";
  $headers .= "X-MSMail-Priority: High\r\n\r\n";

  $message = wordwrap($message, 72);

  mail($toJose, $subject, $message, $headers);
  mail($toMiguel, $subject, $message, $headers);
}
?>
