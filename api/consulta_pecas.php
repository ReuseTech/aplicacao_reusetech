<?php
    require_once("../conexao.php");

    session_start();

    if(!isset($_SESSION["user"])){
        header("location:login.php");
    }
    
    $consultar = "show tables";

    $consulta = mysqli_query($conecta, $consultar);
    if(!$consulta){
        die("Erro no Banco de Dados");
    }
    $tabela_columns = array();
    $tabela_values = array();
    $tabela_names = array();
    foreach($consulta as $table){
        $nome_tabela = $table[Tables_in_dbreusetech];
            $consultar_pecas = "select * from $table[Tables_in_dbreusetech]";
            $consulta_pecas = mysqli_query($conecta, $consultar_pecas);

            while($row = mysqli_fetch_assoc($consulta_pecas)){

                $columns = array();
                $values = array();
                foreach(array_keys($row) as $contador){
                    array_push($columns, $contador);
                    array_push($values, $row[$contador]);
                }
                array_push($tabela_columns, $columns);
                array_push($tabela_values, $values);
                array_push($tabela_names, $table[Tables_in_dbreusetech]);
            }
        
    }
    $json_barammento = json_encode(array($tabela_columns, $tabela_values, $tabela_names));
    echo "$json_barammento";
    die();
?>