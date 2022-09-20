<?php

require "PHPMailer.php";
require "SMTP.php";
require "Exception.php";

$title = "Заявка на обртаный звонок с SitDownPls";

$c = true;

$title = "Заказ на обратный звонок";
foreach ($_POST as $key => $value) {
  if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
    $body .= "
    " . ( ( $c = !$c ) ? '<tr style="background-color: #c450f9">':'<tr style="background-color: #f6b6f6;">' ) . "
      <td style='padding: 10px; border: 1px solid #89f9a9'><b>$key</b></rd>
      <td style='padding: 10px; border: 1px solid #89f9a9'>$value</td>
    </tr>
    ";
  }
}

$body = "<table style='width:100%;'>$body</table>";

$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->Charset = "UTF-8";
  $mail->SMTPAuth = true;

  $mail->Host = 'smtp.gmail.com';
  $mail->Username = 'alexandr311003@gmail.com';
  $mail->Password = '';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;

  $mail->setFrom('alexandr311003@gmail.com', 'SitDownPls');

  $mail->addAddress('viadimir.semenikhin@yandex.ru');

  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();

} catch (Exception $e) {
  $status = "Сообщение не было отправлено причина ошибки: {$mail -> ErrorInfo}";
}
