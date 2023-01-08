<?php
require_once  __DIR__ . '/../vendor/autoload.php';
require_once  __DIR__ . '/../Models/Users.php';
require_once __DIR__ . '/../Auth/Filter.php';
require_once __DIR__ . '/./../Auth/Auth.php';

use Rakit\Validation\validator;

class RegisterController
{
    public function __construct()
    {
        $this->validator = new Validator();
    }

    public function register($fields)
    {
        array_pop($fields);
        $validation = $this->validator->make($fields, [
            'firstname' => 'required|min:3',
            'lastname' => 'required|min:3',
            'middlename' => 'min:3',
            'email' => 'required|email',
            "username" => 'required|min:3|max:8',
            "userPassword" => 'required|min:4|max:10',
            "confirmPassword" => 'required|same:userPassword',
            "gender" => 'required|min:1|max:1',
        ]);
        $validation->validate();
        if ($validation->fails()) {
            $GLOBALS['error'] = $validation->errors()->firstOfAll();
            return;
        }

        $check = (new Auth([
            "email" => $fields['email'],
            "username" => $fields['username']
        ]))->check();
        if ($check) {
            $GLOBALS['error'] = $check;
            return;
        }
        $image = ($fields['gender'] == "M") ? "male.jpeg" : "female.jpeg";
        $remove = ["confirmPassword"];
        $newField = Filter::remove($fields, $remove);
        $newField['image'] = $image;
        $newField['userPassword'] = password_hash($newField['userPassword'], PASSWORD_DEFAULT);
        $register = (new Users)->insert($newField);
        if ($register) {
            header("Location: login.php");
        }
    }

    public function exists($fields)
    {
        array_pop($fields);
        echo (new Users)->exist($fields);
    }
}
