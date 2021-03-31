<!-- Passar para o PHP-->
<?php
    
    //Iniciando Variavel de sessão
    session_start();
    //Mandar de volta para a tela de login caso não tenha passado por ela
    if(!isset($_SESSION["user"])){
        header("location:login.php");
    }
     
    require_once("../conexao.php");

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
    
    //criando um arquivo .json
    $file = "../json/pecas.json ";
    if(!file_put_contents($file, $teste)){
        die ("Deu errado");
    }
    header('Location: ../adicionar.html');   
?> 