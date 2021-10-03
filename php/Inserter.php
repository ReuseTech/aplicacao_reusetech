<?php
Class Inserter{
    private $table_name;
    private $table_info;
    private $mysqli;

    function __construct($file_path) {
        $this->table_name = $_POST['table'] == null ? $_POST['table'] : $_GET['table'];

        $json = file_get_contents($file_path);
        $this->table_info = json_decode($json);

        $this->mysqli = new mysqli("172.17.0.2", "root","anthonypro","dbreusetech");
        if ($this->mysqli->connect_errno) {
            echo "Falha ao conectar com o MySQL: " . $this->mysqli->connect_error;
            die();
        }

        if(isset($_POST['id'])) {
            $_POST['id'] = null;
        }
    }
    
    function insert($insertQuery) {
        $this->mysqli->query($insertQuery) or die("Falha ao adicionar " . $insertQuery ." ao banco de dados");
    }

    function createInsertQuery(){
        $atributes = $this->createInsertAtributes($this->table_info);

        return "INSERT INTO $this->table_name VALUES($atributes)";
    }

    function createUpdateQueryById($id){
        $setQuery = $this->createUpdateSet($_GET);


        return "UPDATE $this->table_name SET $setQuery WHERE id = $id";
    }

    function createUpdateSet($typeAndField) {
        unset($typeAndField['Enviar']);
        unset($typeAndField['table']);
        $setQuery = '';

        foreach($typeAndField as $type => $field) {
            if($type != 'table') {
                $setQuery .= "`$type`" . "=" . "'$field'";
            
                if ($type !== end(array_keys($typeAndField))){
                    $setQuery .= ", ";
                }
            }
        }
        
        return $setQuery;
    }

    function createInsertAtributes($table_info) {
        $atributes = "";
        foreach($table_info as $column => $columnType){
            if(isset($_POST[$column])) {
                $atributes .= "'$_POST[$column]'";
                $table_info_to_array = array_keys(get_object_vars($table_info));
                if ($column !== end($table_info_to_array)){
                    $atributes .= ", ";
                }
            } else {
                $atributes .= "NULL";
                $table_info_to_array = array_keys(get_object_vars($table_info));
                if ($column !== end($table_info_to_array)){
                    $atributes .= ", ";
                }
            }
        }

        return $atributes;
    }
    function createBusesInsertQueries($busesIds) {
        if($busesIds != null and $busesIds != []) {
            $busesIdsAndQuantity = (array_count_values($busesIds));
            $busesIdsAndQuantity = $this->removeEmptyKeys($busesIdsAndQuantity);
    
            $busesInsertQueries = array();
    
            for($i = 0; $i < sizeof($busesIdsAndQuantity); $i++){
                $atributes = "LAST_INSERT_ID(), ";
                $atributes .= array_keys($busesIdsAndQuantity)[$i] . ", ";
                $atributes .= $busesIdsAndQuantity[array_keys($busesIdsAndQuantity)[$i]];
                
                $insertBusQuery = "INSERT INTO fk_" . $this->table_name . "_barramento VALUES($atributes)";
                array_push($busesInsertQueries, $insertBusQuery);
            }
            return $busesInsertQueries;
        }
        else return null;

    }
    function removeEmptyKeys($array) {
        unset($array['']);
        return $array;
    }
    
    function createUpdateId__PcByTableNameAndId($tableName, $id) {
        return "UPDATE $tableName SET id__pc = LAST_INSERT_ID() where id = $id";
    }

}
?>