<?php

declare(strict_types=1);
require_once __DIR__ . './vendor/autoload.php';

class Email
{
    public function __construct(array $props = [])
    {
        $this->props = $props;
        // echo json_encode($_POST);
        $this->transport = (new Swift_SmtpTransport('smtp.gmail.com', 587, 'tls'))
            ->setUsername('abdulazeemabdulazeez@gmail.com')
            ->setPassword('lagftfolfdapgdsx');
        // Create the Mailer using your created Transport
        $this->mailer = new Swift_Mailer($this->transport);
    }

    public function sendForgotPassword()
    {
        $body = $this->forgetPassword($this->props['redirect']);
        // Create a message
        $message = (new Swift_Message('Forget Password'))
            ->setFrom(['abdulazeemabdulazeez@gmail.com' => 'noreply'])
            ->setTo([$this->props['email']])
            ->setBody($body, 'text/html');
        // Send the message
        $result = $this->mailer->send($message);
        return $result;
    }

    private function forgetPassword($redirected): string
    {
        $message = <<< HTML
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="">
                <main style="color: #1a3e50;">
                   <h3>You Have requested for a forget Passsword</h3>
                   <h2>Kindly Ignore</h2>
                   <h3>If you didn't make such request</h3>
                   <h2> OR Copy the link below or click on it to reset your password</h2>
                    <a href="$redirected">$redirected</a>
            </main>
            </body>

            </html>
        HTML;

        return $message;
    }
}