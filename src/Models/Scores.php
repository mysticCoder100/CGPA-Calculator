<?php
require_once __DIR__ . '/./Database.php';

class Scores extends Database
{
    protected $table = "scores";
    public function __construct()
    {
        parent::__construct();
    }

    public function getLastRecords($data)
    {
        $preparedData = $this->prepared($data);
        $column = implode(',', array_keys($data));
        $preparedColumn = implode(',', array_keys($preparedData));
        $query = "SELECT * FROM $this->table WHERE  $column = $preparedColumn ORDER BY created_at DESC LIMIT 3";
        try {
            $stmt = $this->connection->prepare($query);
            $stmt->execute($preparedData);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $e) {
            echo "Error During Fetching: {$e->getMessage()}";
        }
    }
}