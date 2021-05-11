<?php
    require_once("../conexao.php");

    session_start();

    if(!isset($_SESSION["user"])){
        header("location:login.php");
    }
    $table = $_GET['table'];
    
    $consultar = "select * from $table";

    $consulta = mysqli_query($conecta, $consultar);
    if(!$consulta){
        die("Erro no Banco de Dados");
    }
    $tabela_values = array();
    $columns = array();
    while($row = mysqli_fetch_assoc($consulta)){
        $tabela_columns = array(array_keys($row));
        foreach(array_keys($row) as $contador){
            $values = array();
            foreach(array_keys($row) as $contador){
                array_push($values, $row[$contador]);
            }
        }   
        array_push($tabela_values, $values);
    }
    $json_barammento = json_encode(array($tabela_columns, $tabela_values));
    echo "$json_barammento";
    die();
?>