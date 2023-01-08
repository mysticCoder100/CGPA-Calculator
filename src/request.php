<?php
session_start();
require_once __DIR__ . "/./Controllers/RegisterController.php";
require_once __DIR__ . "/./Controllers/LoginController.php";
require_once __DIR__ . "/./Controllers/LogoutController.php";
require_once __DIR__ . "/./Models/Users.php";

if (isset($_POST["register"])) {
    (new RegisterController())->register($_POST);
} else if (isset($_POST["login"])) {
    (new LoginController())->login($_POST);
} else if (isset($_POST["exist"])) {
    (new RegisterController())->exists($_POST);
} else if (isset($_POST["logout"])) {
    (new LogoutController())->logout();
}