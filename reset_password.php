<?php
require_once __DIR__ . '/./src/autoload.php';
$db = new Database();
$data = array_map('sanitizeString', $_GET);
$emailExists = (new User($data))->checkIfExists('email', $data['email']);
$inforgetPassword = (new User($data))->checkIfInForgetPassword();
$forgetDetail = (new User($data))->selectFromForgetPassword();
if (
    count($data) != 2 ||
    $emailExists == 0 ||
    $inforgetPassword == 0 ||
    $data['href'] !== $forgetDetail['forget_link']
) {
    header('Location: index.php');
} else if ($forgetDetail['now'] > $forgetDetail['expired_on']) {
    (new User($data))->deleteFromForgetPassword();
    $message = <<< Expired
            <main style="
                display: flex;
                height: 100%;
                width: 100%;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            ">
                <h3>Link Expired</h3>
                <p>You Can Request for a forget password Link by clicking the link below</p>
                <a href="/#forget-password" target="_blank" rel="noopener noreferrer">Forget Password</a>
            </main>
    Expired;
    die($message);
}

?>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> </title>
        <base href="/">
        <link rel="stylesheet" href="./assets/style/style.css">
        <link rel="stylesheet" href="http://localhost:100/fontawesome/css/all.min.css">
        <noscript>
            kindly enable javscript in your brower to continue your exploration thank you.
        </noscript>
    </head>

    <body>

        <main class="reset-password">
            <form id="resetForm" method="POST">
                <h4>Reset Password</h4>
                <label>Password</label>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" name="password" id="pword">
                    <span class="see"><i class="fa fa-eye" aria-hidden="true"></i></span>
                </div>
                <input type="email" class="form-control" placeholder="" name="email" id="" value="<?= $data['email'] ?>" hidden>
                <label>Confirm Password</label>
                <div class="form-group">
                    <input type="password" placeholder="Confirm Password" class="form-control" name="cpword" id="cpword">
                    <span class="see"><i class="fa fa-eye" aria-hidden="true"></i></span>
                </div>
                <button type="submit" class="btn">Reset Password</button>
            </form>
        </main>

        <script src="http://localhost:100/jquery.js"></script>
        <script src="http://localhost:100/fontawesome/js/all.min.js"></script>
        <script src="http://localhost:100/md5.js"></script>
        <script src="./assets/script/reset_password.js" type="module"></script>
    </body>

</html>