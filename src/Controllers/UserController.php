<?php
require_once  __DIR__ . '/../vendor/autoload.php';
require_once  __DIR__ . '/../Models/Users.php';

use Rakit\Validation\validator;

class UserController
{
    public function __construct()
    {
        $this->validator = new Validator();
    }

    public static function getDetails()
    {

        $user = new Users();
        return $user = $user->fetch(["id" => $_SESSION['user']]);
    }

    public function updateRecords($fields)
    {

        $validation = $this->validator->make($fields, [
            'firstname' => 'required|min:3',
            'lastname' => 'required|min:3',
            'middlename' => 'min:3',
            'email' => 'required|email',
        ]);
        $validation->validate();
        if ($validation->fails()) {
            echo json_encode(["msg" => $validation->errors()->firstOfAll(), "status" => "error"]);
            return;
        }

        $update = ((new Users())->update($fields, $_SESSION['user']));
        if ($update) {
            echo json_encode(["msg" => "Record Sucessfully Updated", "status" => "success"]);
        } else {
            echo json_encode(["msg" => "An error Occured during records update", "status" => "error"]);
        }
    }

    public function updateInformation($fields)
    {

        $validation = $this->validator->make($fields, [
            'level' => 'required|numeric|min:3',
            'course_duration' => 'required|numeric',
            'semester' => 'required|numeric',
        ]);

        $validation->validate();
        if ($validation->fails()) {
            echo json_encode(["msg" => $validation->errors()->firstOfAll(), "status" => "error"]);
            return;
        }

        $update = ((new Users())->update($fields, $_SESSION['user']));
        if ($update) {
            echo json_encode(["msg" => "Record Sucessfully Updated", "status" => "success"]);
        } else {
            echo json_encode(["msg" => "An error Occured during records update", "status" => "error"]);
        }
    }

    public function resetPassword($fields)
    {
        $validation = $this->validator->make($fields, [
            "userPassword" => 'required|min:4|max:10',
            "oldPassword" => 'required|min:4|max:10',
            "confirmPassword" => 'required|same:userPassword'
        ]);
        $validation->validate();
        $user = $this->getDetails();
        if ($validation->fails()) {
            echo json_encode([
                "msg" => $validation->errors()->firstOfAll(),
                "status" => "error"
            ]);
            return;
        } else if (!password_verify($fields['oldPassword'], $user['userPassword'])) {
            echo json_encode([
                "msg" => ["oldPassword" => "The Password is Incorrect"],
                "status" => "error"
            ]);
            return;
        }


        $update = ((new Users())->update([
            "userPassword" => password_hash($fields["userPassword"], PASSWORD_DEFAULT)
        ], $_SESSION['user']));
        if ($update) {
            echo json_encode(["msg" => "Record Sucessfully Updated", "status" => "success"]);
        } else {
            echo json_encode(["msg" => "An error Occured during records update", "status" => "error"]);
        }
    }

    public function uploadProfileImage($fields)
    {
        $validation = $this->validator->validate($fields, [
            "image" => "uploaded_file|max:100k|mimes:jpeg,png,jpg"
        ]);
        $validation->validate();
        if ($validation->fails()) {
            echo json_encode([
                "msg" => $validation->errors()->firstOfAll(),
                "status" => "error"
            ]);
            return;
        }
        $trmpImage = ["male.jpeg", "female.jpeg"];
        $tempFile = $fields["image"]["tmp_name"];
        $username = $this->getDetails()['username'];
        $extension =  explode("/", $fields["image"]["type"])[1];
        $fileName = $username . rand(1, 709) . "." . $extension;
        $dir = __DIR__ . "\.\..\..\assets\images\users\\";
        $path = $dir . $fileName;

        if (!in_array($this->getDetails()['image'], $trmpImage)) {
            unlink($dir . $this->getDetails()['image']);
        }
        $upload = move_uploaded_file($tempFile, $path);
        if ($upload) {
            $imageUpload = (new Users())->update(["image" => $fileName], $_SESSION['user']);
            echo json_encode([
                "msg" => "Image Updated Sucessfully",
                "img" => $fileName,
                "status" => "success"
            ]);
        } else {
            echo json_encode([
                "msg" => ["image" => "An Error Occured"],
                "status" => "error"
            ]);
        }
    }
}