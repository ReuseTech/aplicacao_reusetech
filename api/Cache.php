<?php
class Cache{
    private $selector;

    function __construct(){
        require_once("api/Selector.php");
        $this->selector = new Selector();
    }
    function delete_old_cache(){
        $file_path = "api/cache/tables_list.json";
        unlink($file_path) or die("falha ao excluir cache");
        foreach(glob("api/cache/tabelas/*.json") as $file_path) {
            unlink($file_path) or die("falha ao excluir cache");
        }
    }
    function create_tables_list_cache(){
        $tables_json = json_encode($this->selector->get_tables_names());
        $file_path = "api/cache/tables_list.json";
        file_put_contents($file_path, $tables_json) or die("Falha ao criar lista de tabelas em arquivo json");
    }
    function create_tables_rows_cache(){
        $tables = $this->selector->get_tables_names();
        foreach($tables as $table){
            $file_path = "api/cache/tabelas/$table.json";
            $table_information_json = json_encode($this->selector->get_table_information($this->selector->get_table($table)));
            file_put_contents($file_path, $table_information_json) or die("Falha ao criar informações da tabela $table em arquivo json");
        }
    }
}

session_start();
isset($_SESSION["user"]) or header("location:login.php");

$cache = new Cache();

$cache->delete_old_cache();
$cache->create_tables_list_cache();
$cache->create_tables_rows_cache();

header('Location: ../pages/adicionar.html');
?> 