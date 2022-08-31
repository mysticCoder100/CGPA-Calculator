<?php
require_once 'function.php';
require_once  __DIR__ . '/./cgpaCalculator.php';
require_once __DIR__ . './db.php';
require_once __DIR__ . './user.php';
$db = new Database();
session_start();

$user = [
    'username' => 'test',
    'password' => 'test'
];


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST["getLevels"])) {
        echo json_encode(
            [
                ['level' => 100, 'semester' => 'First'],
                ['level' => 100, 'semester' => 'Second'],
                ['level' => 200, 'semester' => 'First'],
                ['level' => 200, 'semester' => 'Second'],
                ['level' => 300, 'semester' => 'First']
            ]
        );
    } else if (isset($_POST["saveRecord"])) {
        $result = [];
        $checkEmptyInUnitAndScore = [];
        $checkCourseCodeField = [];
        foreach ($_POST['courses'] as $item => $value) {
            foreach ($value as $content => $detail) {
                if (empty($detail)) {
                    array_push($result, true);
                }
                if (!is_numeric($detail) && ($content == 'unit' || $content == 'score')) {
                    array_push($checkEmptyInUnitAndScore, true);
                }
                if (is_numeric($detail) && ($content == 'code')) {
                    array_push($checkCourseCodeField, true);
                }
            }
        }

        if (count($result) > 0) {
            echo json_encode([
                'message' => 'Kindly Fill in all fields',
                'status' => 'error'
            ]);
        } else if (count($checkCourseCodeField) > 0) {
            echo json_encode([
                'message' => 'The Course Code Fields Must not Contain Numbers Only',
                'status' => 'error'
            ]);
        } else if (count($checkEmptyInUnitAndScore) > 0) {
            echo json_encode([
                'message' => 'The Unit and Score Field Must Contain only Numbers',
                'status' => 'error'
            ]);
        } else {
            $data = [];
            foreach ($_POST['courses'] as $key => $value) {
                foreach ($value as $item => $inner) {
                    $value[$item] = sanitizeString($inner);
                }
                $data[$key] = $value;
            }
            $cgpaCalculator = new CgpaCalculator($data);
            echo json_encode([
                'message' => $cgpaCalculator->getGpa(),
                'status' => 'result'
            ]);
        }
    } else if (isset($_POST['inSession'])) {
        if (!isset($_SESSION['username'])) {
            echo json_encode(['session' => false]);
            return;
        } else if (isset($_POST["logout"])) {
            session_destroy();
        }
        echo json_encode(['session' => true]);
    } else if (isset($_POST["login"])) {
        array_pop($_POST);
        $data = array_map('sanitizeString', $_POST);
        $user = new User($data);
        $empty = [];
        foreach ($_POST as $key => $value) {
            if (empty(post($key))) {
                array_push($empty, true);
            }
        }
        if (count($empty) > 0) {
            echo json_encode([
                'message' => 'Kindly Fill all Fields',
                'status' => 'error'
            ]);
        } else {
            $login = $user->login();
            if ($login && ($login['password'] == $data['password'])) {
                $_SESSION['username'] = $login['username'];
                echo json_encode([
                    'message' => 'Login Sucessfull',
                    'status' => 'success'
                ]);
            } else {
                echo json_encode([
                    'message' => 'Invalid Username or Password',
                    'status' => 'error'
                ]);
            }
        }
    } else if (isset($_POST["register"])) {
        array_pop($_POST);
        $data = array_map('sanitizeString', $_POST);
        $user = new User($data);
        $empty = [];
        foreach ($_POST as $key => $value) {
            if (empty(post($key))) {
                array_push($empty, true);
            }
        }
        if (count($empty) > 0) {
            echo json_encode([
                'message' => 'Kindly Fill all Fields',
                'status' => 'error'
            ]);
        } else if ($user->checkIfExists('email', $data['email']) > 0) {
            echo json_encode([
                'message' => 'Email Already exists',
                'status' => 'error'
            ]);
        } else if ($user->checkIfExists('username', $data['uname']) > 0) {
            echo json_encode([
                'message' => 'Username Already exists',
                'status' => 'error'
            ]);
        } else if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            echo json_encode([
                'message' => 'Kindly Input A Valid Email',
                'status' => 'error'
            ]);
        } else if (strlen($data['uname']) < 4 || strlen($data['uname']) > 10) {
            echo json_encode([
                'message' => 'username length must be between four(4) and ten(10)',
                'status' => 'error'
            ]);
        } else if (strlen($data['pword']) !== 8) {
            echo json_encode([
                'message' => 'Password must be eight(8) character long',
                'status' => 'error'
            ]);
        } else if ($data['pword'] !== $data['cpword']) {
            echo json_encode([
                'message' => 'Password Mismatch',
                'status' => 'error'
            ]);
        } else {
            $register = $user->register();
            if ($register == true) {
                echo json_encode([
                    'message' => 'Account Sucessfully Created',
                    'status' => 'success',
                    'registered' => true
                ]);
            } else {
                echo json_encode([
                    'message' => 'An Error Occured',
                    'status' => 'error'
                ]);
            }
        }
    }
}