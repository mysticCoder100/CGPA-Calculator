<?php
session_start();
require_once __DIR__ . "/./Controllers/RegisterController.php";
require_once __DIR__ . "/./Controllers/LoginController.php";
require_once __DIR__ . "/./Controllers/LogoutController.php";
require_once __DIR__ . "/./Controllers/UserController.php";

if (isset($_POST["register"])) {
    (new RegisterController())->register($_POST);
} else if (isset($_POST["login"])) {
    (new LoginController())->login($_POST);
} else if (isset($_POST["exist"])) {
    (new RegisterController())->exists($_POST);
} else if (isset($_POST["logout"])) {
    (new LogoutController())->logout();
} else if (isset($_POST["calculate"])) {
    array_pop($_POST);
    echo json_encode($_POST);
} else if (isset($_POST['getDetails'])) {
    echo json_encode(UserController::getDetails());
} else if (isset($_POST['update'])) {
    array_pop($_POST);
    (new UserController())->updateRecords($_POST);
} else if (isset($_POST["uploadImage"]) && isset($_FILES['image'])) {
    (new UserController())->uploadProfileImage($_FILES);
} else if (isset($_POST["addDetails"])) {
    array_pop($_POST);
    (new UserController())->updateInformation($_POST);
} else if (isset($_POST['resetpassword'])) {
    array_pop($_POST);
    (new UserController())->resetPassword($_POST);
}