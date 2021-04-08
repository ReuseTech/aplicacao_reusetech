<!-- Passar para o PHP-->
<?php
    
    //Iniciando Variavel de sessão
    session_start();
    //Mandar de volta para a tela de login caso não tenha passado por ela
    if(!isset($_SESSION["user"])){
        header("location:login.php");
    }
     
    require_once("../conexao.php");

//ATUALIZANDO AS PEÇAS DISPONÍVEIS PARA SEREM ADICIONADAS

    //comando mysql para pegar todas as tabelas existentes
    $consultar = "show tables";
    
    //faz a consulta no banco de dados
    $consulta = mysqli_query($conecta, $consultar);
    if(!$consulta){
        die("Erro no Banco de Dados");
    };
    
    //passa o resultado da consulta para um array
    $pecas = array();
    while($row = mysqli_fetch_assoc($consulta)[Tables_in_dbreusetech]){
            array_push($pecas, "$row");
        
    }
    //passando o array para um json
    $teste = json_encode($pecas);
    
    //exclui o arquivo antigo
    $file = "../json/pecas.json";
    unlink($file);
    foreach (glob("../json/tabelas/*.json") as $filename) {
        unlink($filename);
     }

    //criando um arquivo .json
    if(!file_put_contents($file, $teste)){
        die ("Deu errado");
    }

//ATUALIZANDO AS INFORMAÇÕES PARA A CRIAÇÃO DOS FORMULÁRIOS

    //repetindo a criação de um .json para cada tabela
    foreach($pecas as $row){
        
            $query = mysqli_query($conecta, "SHOW COLUMNS FROM $row");

            //criando o array com rows da tabela
            $tabela = array();
            $tabela_tipos = array();
            while($linha = mysqli_fetch_assoc($query)){
                if($linha[Field] != 'id' and $linha[Field] != 'id__pc'){
                    array_push($tabela, "$linha[Field]");
                    array_push($tabela_tipos, "$linha[Type]");
                } 
            }
    
            //passando o array para um .json
            $teste_tabela = json_encode(array($tabela, $tabela_tipos));
    
            //criadno um arquivo .json
            $file = "../json/tabelas/$row.json";
            if (!file_put_contents($file, $teste_tabela)){
                die("Deu errado");
            }
        
    }

    //volta à página anterior
    header('Location: ../adicionar.html');   
?> 