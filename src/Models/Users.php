<?php
require_once __DIR__ . '/./Database.php';

class Users extends Database
{
    protected $table = "users";
    public function __construct()
    {
        parent::__construct();
    }
}
