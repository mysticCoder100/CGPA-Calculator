<?php
session_start();
require_once __DIR__ . "/./Controllers/RegisterController.php";
require_once __DIR__ . "/./Controllers/LoginController.php";
require_once __DIR__ . "/./Controllers/LogoutController.php";
require_once __DIR__ . "/./Controllers/CalculatorController.php";
require_once __DIR__ . "/./Controllers/UserController.php";
require_once __DIR__ . '/./library/function.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fields = array_map("sanitizeString", $_POST);
    if (isset($_POST["register"])) {
        (new RegisterController())->register($fields);
    } else if (isset($_POST["login"])) {
        (new LoginController())->login($fields);
    } else if (isset($_POST["exist"])) {
        (new RegisterController())->exists($fields);
    } else if (isset($_POST["logout"])) {
        (new LogoutController())->logout();
    } else if (isset($_POST["calculate"])) {
        array_pop($fields);
        new CalculatorController($fields);
    } else if (isset($_POST['getDetails'])) {
        echo json_encode(UserController::getDetails());
    } else if (isset($_POST['update'])) {
        array_pop($fields);
        (new UserController())->updateRecords($fields);
    } else if (isset($_POST["uploadImage"]) && isset($_FILES['image'])) {
        (new UserController())->uploadProfileImage($_FILES);
    } else if (isset($_POST["addDetails"])) {
        array_pop($fields);
        (new UserController())->updateInformation($fields);
    } else if (isset($_POST['resetpassword'])) {
        array_pop($fields);
        (new UserController())->resetPassword($fields);
    } else if (isset($_POST["fetchScores"])) {
        CalculatorController::getRecords();
    } else if (isset($_POST["fetchLatest"])) {
        CalculatorController::getLatestRecord();
    } else if (isset($_POST["forgetPassword"])) {
        array_pop($fields);
        print_r($fields);
    }
}