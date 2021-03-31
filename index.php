<?php
    //Iniciando Variavel de sessão
    session_start();
    //Mandar de volta para a tela de login caso não tenha passado por ela
    if(!isset($_SESSION["user"])){
        header("location:login.php");
    }
?> 
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplicativo ReuseTech</title>
    <!--LINKS CSS-->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <header>
        <img src="images/reusetech.png" alt="ReuseTech">
        <h1>ReuseTech</h1>
    </header>
    <main>
        <div id="funcoes">
            <a href="visualizar.php">
                <h1>Visualizar Estoque</h1>
                <p>Click aqui para visualizar o nosso estoque de peças</p>
            </a>
        </div>
        <div id="funcoes">
            <a href="adicionar.php">
                <h1>Adicionar Peça do Estoque</h1>
                <p>Click aqui para adicionar peças em nosso estoque</p>
            </a>
        </div>
        <div class="sair">
            <a href="sair.php"><input type="button" value="Sair"></a>
        </div>
    </main>
</body>
</html>