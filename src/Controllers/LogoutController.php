<?php
class LogoutController
{

    public  function logout()
    {
        $location = $this->handler();
        session_destroy();
        echo json_encode(["location" => $location]);
    }

    public function handler()
    {
        if (isset($_SESSION['user'])) {
            $location = "login.php";
        } else {
            $location = "register.php";
        }
        return $location;
    }
}
