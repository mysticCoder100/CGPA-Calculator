<?php
require_once 'function.php';
require_once './cgpaCalculator.php';
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
        foreach ($_POST['courses'] as $item => $value) {
            foreach ($value as $content => $detail) {
                if (empty($detail)) {
                    array_push($result, true);
                }
                if (!is_numeric($detail) && ($content == 'unit' || $content == 'score')) {
                    array_push($checkEmptyInUnitAndScore, true);
                }
            }
        }

        if (count($result) > 0) {
            echo json_encode([
                'message' => 'Kindly Fill in all fields',
                'status' => 'error'
            ]);
        } else if (count($checkEmptyInUnitAndScore) > 0) {
            echo json_encode([
                'message' => 'The Unit and Score Field Must Contain only Numbers',
                'status' => 'error'
            ]);
        } else {
            print_r($_POST['courses']);
            $data = [];
            foreach ($_POST['courses'] as $key => $value) {
                foreach ($value as $item => $inner) {
                    // $value[$item] = sanitizeString($inner);
                    $value[$item] = htmlspecialchars($inner);
                }
                $data[$key] = $value;
            }
            echo htmlspecialchars("yureu>>");
            print_r($data);
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
        if (post('username') === $user['username'] && post('password') === $user['password']) {
            $_SESSION["username"] = post('username');
            echo json_encode(['message' => 'login', 'status' => 'success']);
        }
    }
}