<?php
require_once  __DIR__ . '/../Models/Users.php';
class Auth
{
    public function __construct(array $props)
    {
        $this->props = $props;
    }


    public function check()
    {
        $error = [];
        foreach ($this->props as $key => $item) {
            if ((new Users)->exist([$key => $item]) > 0) {
                $error[$key] = ucfirst($key) . " Already exists";
            }
        }
        if (count($error) > 0) {
            return $error;
        } else {
            return false;
        }
    }
}
