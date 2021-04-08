<?php
    require_once("conexao.php");
    
    function createQueryTabela($table, $json_tabela){
        $columns = "";
        foreach($json_tabela[0] as $coluna){
            $columns .= "$coluna";
            if ($coluna != end($json_tabela[0])){
                $columns .= ", ";
            }
        }
        
        return "INSERT INTO $table($columns)VALUES";
    }

    if (isset($_POST['table'])){
        $table = $_POST['table'];
        $table_fk = "fk_".$table."_barramento";
        $barramento = $_POST['barramento'];
        
        $json = file_get_contents("json/tabelas/$table.json");
        $json_tabela = json_decode($json);

        $json_fk = file_get_contents("json/tabelas/$table_fk.json");
        $json_tabela_fk = json_decode($json_fk);

        $atributes = "";
        foreach($json_tabela[0] as $coluna){
            $atributes .= "'$_POST[$coluna]'";
            if ($coluna != end($json_tabela[0])){
                $atributes .= ", ";
            }
        }

        $inserir = createQueryTabela($table, $json_tabela)."(".$atributes.")";
        $insert = mysqli_query($conecta, $inserir);
        if(!$insert){
            die("Erro no Banco de Dados");
        }
        
        for($i = 0; $i < sizeof(array_count_values($barramento)); $i++){
            $atributes = "";
            $atributes .= array_keys(array_count_values($barramento))[$i] . ", ";
            $atributes .= array_count_values($barramento)[array_keys(array_count_values($barramento))[$i]];
            
            $inserir_fk = createQueryTabela($table_fk, $json_tabela_fk)."("."LAST_INSERT_ID(),".$atributes.")";
            print($inserir_fk);
            echo "<br>";
            $insert = mysqli_query($conecta, $inserir_fk);
            if(!$insert){
                die("Erro no Banco de Dados");
            }
        }
        echo "<br>";
        header("location: certo.html");
    }
?>