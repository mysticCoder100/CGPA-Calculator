<?php
require_once  __DIR__ . '/../vendor/autoload.php';
require_once  __DIR__ . '/../Models/Users.php';
require_once __DIR__ . '/../Auth/Filter.php';




use Rakit\Validation\validator;

class LoginController
{
    protected $validator;
    public function __construct()
    {
        $this->validator = new Validator();
    }

    public function login($fields)
    {
        array_pop($fields);
        $validation = $this->validator->make($fields, [
            "username" => 'required|min:3|max:8',
            "userPassword" => 'required|min:4|max:10',
        ]);
        $validation->validate();
        if ($validation->fails()) {
            $GLOBALS['error'] = $validation->errors()->firstOfAll();
            return;
        }

        $remove = ["userPassword"];
        $newField = Filter::remove($fields, $remove);
        $user = (new Users)->fetch($newField);
        if (!($user && password_verify($fields['userPassword'], $user['userPassword']))) {
            $GLOBALS['userError'] = "Invalid Username or Password";
        } else {
            print_r($user);
            $_SESSION['user'] = $user['id'];
            header("Location: /");
        }
    }
}