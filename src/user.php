<?php
class User
{
    public function __construct($data)
    {
        $this->attributes = $data;
        foreach ($data as $key => $value) {
            $this->$key = $value;
        }
    }

    public static function checkIfExists($column, $count)
    {
        $query = "SELECT COUNT(*) FROM users WHERE $column = :$column ";
        $data = [
            $column => $count
        ];
        $count = $GLOBALS['db']->countItem($query, $data);
        return $count;
    }

    public function register()
    {
        $removed = ['cpword'];
        $data = $this->removePart($this->attributes, $removed);
        $query = "INSERT INTO users(first_name, last_name,email,username,password) VALUES(:fname,:lname,:email,:uname,:pword)";
        $save = $GLOBALS['db']->insert($query, $data);
        return $save;
    }

    public function login()
    {
        $removed = ['password'];
        $data = $this->removePart($this->attributes, $removed);
        $query = "SELECT * FROM users WHERE username = :username";
        $result = $GLOBALS['db']->fetchOne($query, $data);
        return $result;
    }

    private function removePart($data, $removed)
    {
        foreach ($removed as $item) {
            if (array_key_exists($item, $data)) {
                unset($data[$item]);
            }
        }
        return $data;
    }
    public function deleteFromForgetPassword()
    {
        $query = "DELETE FROM forget_password WHERE email = :email";
        $data = [
            'email' => $this->attributes['email']
        ];
        return $GLOBALS['db']->insert($query, $data);
    }
    public function insertIntoForgetPassword()
    {
        $query = "INSERT INTO forget_password(email) VALUES(:email)";
        $data = [
            'email' => $this->attributes['email']
        ];
        return $GLOBALS['db']->insert($query, $data);
    }
    public function selectFromForgetPassword()
    {
        $query = "SELECT *, NOW() now FROM forget_password WHERE email = :email";
        $data = [
            'email' => $this->attributes['email']
        ];
        return $GLOBALS['db']->fetchOne($query, $data);
    }

    public function checkIfInForgetPassword()
    {
        $query = "SELECT COUNT(*) FROM forget_password WHERE email = :email";
        $data = [
            'email' => $this->attributes['email']
        ];
        $count = $GLOBALS['db']->countItem($query, $data);
        return $count;
    }

    public function updatePassword()
    {
        $query = "UPDATE users SET password = :password WHERE email = :email";
        $data = [
            'email' => $this->attributes['email'],
            'password' => $this->attributes['password'],
        ];
        return $GLOBALS['db']->insert($query, $data);
    }
}