<!DOCTYPE html>
<?php
require_once __DIR__ . '/./src/request.php';
if (isset($_SESSION['user'])) {
    header("Location: /");
}
?>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Forget Password</title>
        <?php require_once('./base/style.php') ?>
        <link rel="stylesheet" href="./assets/styles/css/forgetpassword.css">
    </head>

    <body>


        <main id="forgetPassword">
            <form action="<?= $_SERVER['PHP_SELF'] ?>" method="POST" id="forgetPasswordForm" class="login-form">

                <img src="./assets/images/logo.png" alt="logo">

                <?php if (isset($userError)) { ?>
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    <strong><?= $userError ?></strong>
                </div>
                <?php } ?>

                <div class="fields">
                    <div class="input-container ">
                        <div class="input-field  <?= isset($error['email']) ? "error" : "" ?>">
                            <span><i class="fa fa-user" aria-hidden="true"></i></span>
                            <input type="email" name="email" id="email" class="form-control" placeholder="Email" aria-describedby="helpId" value="<?= $_POST['email'] ?? "" ?>">
                        </div>
                        <?php if (isset($error['email'])) { ?>
                        <p class="response__error"> <?= $error['email'] ?> </p>
                        <?php } ?>
                    </div>

                    <div class="tail">
                        <button class="btn btn-primary" name="forgetPassword" type="submit">
                            Send
                            <i class="fa fa-paper-plane" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <footer>
                    <p>Developed by Abdul-Azeem <a href=""> <i class="fab fa-whatsapp" aria-hidden="true"></i> </a></p>
                </footer>
            </form>
        </main>



        <?php require_once('./base/script.php') ?>
        <script src="./assets/scripts/login.js" type="module"></script>
    </body>

</html>