<?php
    session_start();
    isset($_SESSION["user"]) or header("location:./login.php");

    echo "<pre>";
    print_r($_POST);
    echo "</pre>";
    
    
    Class Inserter{
        private $table_name;
        private $table_info;
        private $mysqli;

        function __construct($file_path) {
            $this->table_name = "armazenamento";
            //$this->table_name = $_POST['table'];

            $json = file_get_contents($file_path);
            $this->table_info = json_decode($json);

            $this->mysqli = new mysqli("localhost", "root","anthonypro","dbreusetech");
            if ($this->mysqli->connect_errno) {
                echo "Falha ao conectar com o MySQL: " . $this->mysqli->connect_error;
                die();
            }
        }
        
        function insert() {
            $insert_query = $this->createInsertQuery();
            $this->mysqli->query($insert_query) or die("Falha ao adicionar ao banco de dados");
        }

        function createInsertQuery(){
            $column = $this->createInsertColumns($this->table_info);
            $atributes = $this->createInsertAtributes($this->table_info);

            return "INSERT INTO $this->table_name($column) VALUES($atributes)";
        }
        function createInsertColumns($table_info) {
            $columns = "";
            foreach($table_info as $column => $column_type){
                $columns .= "$column";
                if ($column != end($table_info)){
                    $columns .= ", ";
                }
            }

            return $columns;
        }
        function createInsertAtributes($table_info) {
            $atributes = "";
            print_r($table_info);
            foreach($table_info as $coluna){
                $atributes .= "'$_POST[$coluna]'";
                if ($coluna != end($table_info)){
                    $atributes .= ", ";
                }
            }

            return $atributes;
        }
    }
    $inserter = new Inserter("api/cache/tabelas/" . "armazenamento" . ".json");
    //$inserter = new Inserter("../api/cache/" . $_POST['table'] . ".json");
    $inserter->insert();

    header("location: certo.html");
    /*


        $table = $_POST['table'];
        $table_fk = "fk_".$table."_barramento";
        $barramento = $_POST['barramento'];
        


        $json_fk = file_get_contents("json/tabelas/$table_fk.json");
        $json_tabela_fk = json_decode($json_fk);




        
        for($i = 0; $i < sizeof(array_count_values($barramento)); $i++){
            $atributes = "";
            $atributes .= array_keys(array_count_values($barramento))[$i] . ", ";
            $atributes .= array_count_values($barramento)[array_keys(array_count_values($barramento))[$i]];
            
            $inserir_fk = createQueryTabela($table_fk, $json_tabela_fk)."("."LAST_INSERT_ID(),".$atributes.")";
            print($inserir_fk);
            echo "<br>";
            $insert = mysqli_query($conecta, $inserir_fk);
            if(!$insert){
                die("Erro no Banco de Dados2");
            }
        }
        
    
    */
?>