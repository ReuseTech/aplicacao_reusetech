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

    $tabela = $_GET[table];
    $barramento_array = array();
    foreach($consulta as $table){
        $nome_tabela = $table[Tables_in_dbreusetech];
        if(strpos($nome_tabela, "barramento") !== False and strpos($nome_tabela, $tabela) !== False and strpos($nome_tabela, "fk_") === False){
            $consultar_pecas = "select * from $table[Tables_in_dbreusetech]";
            $consulta_pecas = mysqli_query($conecta, $consultar_pecas);
    
            while($row = mysqli_fetch_assoc($consulta_pecas)){
                //echo "$table[Tables_in_dbreusetech]";
                
                $barramento = array();
                $barramento_tipo = array();
                foreach(array_keys($row) as $contador){
                    //print($contador . ": " . $row[$contador]);
                    array_push($barramento, $row[$contador]);
                    array_push($barramento_tipo, $contador);
                }
                array_push($barramento_array, $barramento);
            }
        }
    }
    $json_barammento = json_encode(array($barramento_array, $barramento_tipo));
    echo "$json_barammento";
    die();
?>
