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
}
