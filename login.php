<!DOCTYPE html>
<?php
require_once __DIR__ . '/./src/request.php';
if (isset($_SESSION['user'])) {
    header("Location: /");
}
?>
<html lang="en">

    <html>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login</title>
        <?php require_once('./base/style.php') ?>
        <link rel="stylesheet" href="./assets/styles/css/login.css">
        </head>

        <body>

            <main id="login">
                <form action="<?= $_SERVER['PHP_SELF'] ?>" method="POST" id="loginForm" class="login-form">

                    <img src="./assets/images/logo.png" alt="logo">

                    <?php if (isset($userError)) { ?>
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        <strong><?= $userError ?></strong>
                    </div>
                    <?php } ?>

                    <div class="fields">
                        <div class="input-container ">
                            <div class="input-field  <?= isset($error['username']) ? "error" : "" ?>">
                                <span><i class="fa fa-user" aria-hidden="true"></i></span>
                                <input type="text" name="username" id="uname" class="form-control" placeholder="Username" aria-describedby="helpId" value="<?= $_POST['username'] ?? "" ?>">
                            </div>
                            <?php if (isset($error['username'])) { ?>
                            <p class="response__error"> <?= $error['username'] ?> </p>
                            <?php } ?>
                        </div>

                        <div class="input-container ">
                            <div class="input-field  <?= isset($error['userPassword']) ? "error" : "" ?>">
                                <span><i class="fa fa-lock" aria-hidden="true"></i></span>
                                <input type="password" name="userPassword" id="pword" class="form-control" placeholder="Password" aria-describedby="helpId">
                                <span class="eye"> <i class="fa fa-eye" aria-hidden="true"></i> </span>
                            </div>
                            <?php if (isset($error['userPassword'])) { ?>
                            <p class="response__error"> <?= $error['userPassword'] ?> </p>
                            <?php } ?>
                        </div>

                        <div class="tail">
                            <div class="short-links">
                                <a href="register.php"> Don't have an account?</a>
                                <a href="./forget_password.php"> Forgot Password?</a>
                            </div>
                            <button class="btn btn-primary" name="login" type="submit">
                                Login
                                <i class="fas fa-sign-in-alt"></i>
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