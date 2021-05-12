<?php
class Selector{
    private $tables = array();
    private $connection;
    
    function __construct(){
        require_once("php/Connection.php");
        $this->connection = new Connection();
    }

    function get_all_tables(){
        if(empty($this->tables)){
            if(mysqli_query($this->connection->connect_to_db(), "show tables")){
                $tables_query = mysqli_query($this->connection->connect_to_db(), "show tables");
    
                while($table = mysqli_fetch_row($tables_query)){
                    array_push($this->tables, $table[0]);
                }
                return $this->tables;
            }
            else{
                die("Falha ao buscar tabelas no banco de dados");
            }
        }
        else{
            return $this->tables;
        }

    }
    function get_all_rows($table){
        $query = mysqli_query($this->connection->connect_to_db(), "SHOW COLUMNS FROM $table");
        $rows = array();

        while($row = mysqli_fetch_assoc($query)){
            array_push($rows, $row);
        }
        return $rows;
    }

    function get_all_bus(){
        
    }
}

//$selector = new Selector();
//print_r($selector->get_all_rows("placa_mae"));
?>