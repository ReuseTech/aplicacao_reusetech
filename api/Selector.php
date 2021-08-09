<?php
class Selector{
    private $mysqli;
    
    function __construct(){
        $this->mysqli = new mysqli("localhost", "root","anthonypro","dbreusetech");
        if ($this->mysqli->connect_errno) {
            echo "Falha ao conectar com o MySQL: " . $this->mysqli->connect_error;
            die();
        }
    }

    function get_table_information($table){
        $rows_information = array();

        if($table === null){
            return null;
        }
        foreach($table as $row){
            $key = $row['Field'];
            $rows_information["$key"] = $row['Type'];
        }
        return $rows_information;
    }
    function get_table_not_null($table){
        $rows_not_null = array();

        if($table === null){
            return null;
        }
        foreach($table as $row){
            $key = $row['Field'];
            $rows_not_null["$key"] = $row['Null'];
        }
        return $rows_not_null;
    }
    function get_tables_names(){
        $tables_names = array();
        
        $query_result = $this->mysqli->query("show tables") or die("Falha ao buscar tabelas no banco de dados");
        while($table = $query_result->fetch_row()){
            array_push($tables_names, $table[0]);
        }
        return $tables_names;
    }
    function get_table_rows($table_name){
        $table_columns = array();

        $query_result = $this->mysqli->query("SELECT * FROM $table_name") or die("Falha ao buscar a tabela $table_name");
        while($row = $query_result->fetch_assoc()){
            array_push($table_columns, $row);
        }
        return $table_columns;
    }

    function get_table($table_name){
        $table_columns = array();

        $query_result = $this->mysqli->query("SHOW COLUMNS FROM $table_name") or die("Falha ao buscar a tabela $table_name");
        while($row = $query_result->fetch_assoc()){
            array_push($table_columns, $row);
        }
        return $table_columns;
    }
    function get_table_s_bus($table_name){
        $bus_columns = array();

        if($query_result = $this->mysqli->query("SHOW COLUMNS FROM barramento_$table_name")){
            while($row = $query_result->fetch_assoc()){
                array_push($bus_columns, $row);
            }
            return $bus_columns;
        }
        return null;
    }

}
//$selector = new Selector();
//print_r($selector->get_table_rows('placa_mae'));
?>