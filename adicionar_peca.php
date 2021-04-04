<?php
    require_once("conexao.php");
    
    if (isset($_POST['table'])){
        $table = $_POST['table'];
        
        $json = file_get_contents("json/tabelas/$table.json");
        $json_tabela = json_decode($json);


        $columns = "";
        foreach($json_tabela[0] as $coluna){
            $columns .= "$coluna";
            if ($coluna != end($json_tabela[0])){
                $columns .= ", ";
            }
        }
        

        $atributes = "";
        foreach($json_tabela[0] as $coluna){
            $atributes .= "'$_POST[$coluna]'";
            if ($coluna != end($json_tabela[0])){
                $atributes .= ", ";
            }
        }
        
        $inserir = "INSERT INTO $table($columns)VALUES ($atributes)";

        print($inserir);
        
        $insert = mysqli_query($conecta, $inserir);
        if(!$insert){
            die("Erro no Banco de Dados");
        }else{
            header("location: certo.html");
        }
        
    }
?>