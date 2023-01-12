<?php

class Database
{
    protected $table = "";
    public function __construct()
    {
        $this->connection = $this->connect();
    }

    public function connect()
    {
        try {
            $dsn = "mysql:host=localhost;dbname=my_cgpa_calculator";
            $connection = new PDO($dsn, 'root', 'sijuade');
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Connection Sucessful";
            return $connection;
        } catch (PDOException $e) {
            echo "Error: {$e->getMessage()}";
        }
    }


    public function insert($data)
    {
        $preparedData = $this->prepared($data);
        $column = implode(',', array_keys($data));
        $preparedColumn = implode(',', array_keys($preparedData));
        $query = "INSERT INTO $this->table($column) VALUES($preparedColumn)";
        try {
            $stmt = $this->connection->prepare($query);
            $stmt->execute($preparedData);
            return true;
        } catch (PDOException $e) {
            echo "Error During Inserting: {$e->getMessage()}";
        }
    }

    public function exist($data)
    {
        $preparedData = $this->prepared($data);
        $column = implode(',', array_keys($data));
        $preparedColumn = implode(',', array_keys($preparedData));
        $query = "SELECT COUNT(*) FROM $this->table WHERE  $column = $preparedColumn";
        try {
            $stmt = $this->connection->prepare($query);
            $stmt->execute($preparedData);
            $result = $stmt->fetch(PDO::FETCH_COLUMN);
            return $result;
        } catch (PDOException $e) {
            echo "Error During Checking: {$e->getMessage()}";
        }
    }

    public function update($data, $id)
    {
        $preparedData = $this->prepared($data);
        $column = array_keys($data);
        $preparedColumn = array_keys($preparedData);
        $setField = [];
        foreach ($column as $key => $value) {
            $val = "$value=$preparedColumn[$key]";
            array_push($setField, $val);
        }
        $stringnifySetField = implode(",", $setField);
        $query = "UPDATE $this->table SET $stringnifySetField,updated_at = CURRENT_TIMESTAMP WHERE id = '$id'";
        try {
            $stmt = $this->connection->prepare($query);
            $result = $stmt->execute($preparedData);
            return $result;
        } catch (PDOException $e) {
            echo "Error During Updating: {$e->getMessage()}";
        }
    }

    public function fetch($data)
    {
        $preparedData = $this->prepared($data);
        $column = implode(',', array_keys($data));
        $preparedColumn = implode(',', array_keys($preparedData));
        $query = "SELECT * FROM $this->table WHERE  $column = $preparedColumn";
        try {
            $stmt = $this->connection->prepare($query);
            $stmt->execute($preparedData);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $e) {
            echo "Error During Fetching: {$e->getMessage()}";
        }
    }



    public function prepared($array)
    {
        $statement = [];
        foreach ($array as $key => $item) {
            $statement[":$key"] = $item;
        }
        return $statement;
    }

    public function __destruct()
    {
        $this->connection = null;
    }
}
