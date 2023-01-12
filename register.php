<!DOCTYPE html>
<?php require_once './src/request.php';
if (isset($_SESSION['user'])) {
    header("Location: /");
}
?>
<html lang="en">

    <html>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Register</title>
        <?php require_once('./base/style.php') ?>
        <link rel="stylesheet" href="./assets/styles/css/register.css">
        </head>

        <body>

            <main id="register">
                <form action="<?= $_SERVER['PHP_SELF'] ?>" id="loginForm" method="POST" class="login-form">

                    <img src="./assets/images/logo.png" alt="logo">

                    <div class="fields">

                        <div class="input-container">
                            <div class="input-field <?= isset($error['firstname']) ? "error" : "" ?> ">
                                <span><i class="far fa-user" aria-hidden="true"></i></span>
                                <input type="text" name="firstname" id="fname" class="form-control" placeholder="First Name" aria-describedby="helpId" value="<?= $_POST['firstname'] ?? "" ?>">
                            </div>
                            <?php if (isset($error['firstname'])) { ?>
                            <p class="response__error"> <?= $error['firstname'] ?> </p>
                            <?php } ?>
                        </div>

                        <div class="input-container ">
                            <div class="input-field  <?= isset($error['lastname']) ? "error" : "" ?>">
                                <span><i class="far fa-user" aria-hidden="true"></i></span>
                                <input type="text" name="lastname" id="lname" class="form-control" placeholder="Last Name" aria-describedby="helpId" value="<?= $_POST['lastname'] ?? "" ?>">
                            </div>
                            <?php if (isset($error['lastname'])) { ?>
                            <p class="response__error"> <?= $error['lastname'] ?> </p>
                            <?php } ?>
                        </div>


                        <div class="input-container  ">
                            <div class="input-field <?= isset($error['middlename']) ? "error" : "" ?>">
                                <span><i class="far fa-user" aria-hidden="true"></i></span>
                                <input type="text" name="middlename" id="mname" class="form-control" placeholder="Middle Name" aria-describedby="helpId" value="<?= $_POST['middlename'] ?? "" ?>">
                            </div>
                            <?php if (isset($error['middlename'])) { ?>
                            <p class="response__error"> <?= $error['middlename'] ?> </p>
                            <?php } ?>
                        </div>

                        <div class="input-container ">
                            <div class="input-field  <?= isset($error['email']) ? "error" : "" ?>">
                                <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
                                <input type="email" name="email" id="email" class="form-control" placeholder="Email" aria-describedby="helpId" value="<?= $_POST['email'] ?? "" ?>">
                            </div>
                            <?php if (isset($error['email'])) { ?>
                            <p class="response__error"> <?= $error['email'] ?> </p>
                            <?php } ?>
                        </div>


                        <div class="input-container  ">

                            <div class="input-form">
                                <label for="">Gender: </label>

                                <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                    <input type="radio" class="btn-check" name="gender" value="M" id="btncheck1" autocomplete="off" checked>
                                    <label class="btn btn-outline-primary" for="btncheck1">Male</label>

                                    <input type="radio" class="btn-check" name="gender" value="F" id="btncheck2" autocomplete="off">
                                    <label class="btn btn-outline-primary" for="btncheck2">Female</label>
                                </div>
                            </div>

                            <?php if (isset($error['gender'])) { ?>
                            <p class="response__error"> <?= $error['gender'] ?> </p>
                            <?php } ?>

                        </div>

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

                        <div class="input-container ">
                            <div class="input-field  <?= isset($error['confirmPassword']) ? "error" : "" ?>">
                                <span><i class="fa fa-lock" aria-hidden="true"></i></span>
                                <input type="password" name="confirmPassword" id="pword" class="form-control" placeholder="Confirm Password" aria-describedby="helpId">
                                <span class="eye"> <i class="fa fa-eye" aria-hidden="true"></i> </span>
                            </div>
                            <?php if (isset($error['confirmPassword'])) { ?>
                            <p class="response__error"> <?= $error['confirmPassword'] ?> </p>
                            <?php } ?>
                        </div>

                        <div class="tail">
                            <div class="short-links">
                                <a href="login.php"> already have an account?</a>
                            </div>
                            <button class="btn btn-primary" id="registerSubmit" name="register" type="submit">Register</button>
                        </div>
                    </div>

                    <footer>
                        <p> Developed by Abdul-Azeem <a href="#"> <i class="fab fa-whatsapp" aria-hidden="true"></i> </a></p>
                    </footer>
                </form>
            </main>


            <?php require_once('./base/script.php') ?>
            <script src="./assets/scripts/register.js" type="module"></script>
        </body>

    </html>