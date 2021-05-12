<?php
    session_start();
    if(!isset($_SESSION["user"])){
        header("location:pages/login.html");
    }
?> 
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplicativo ReuseTech</title>
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
            <a href="pages/visualizar.html">
                <h1>Visualizar Estoque</h1>
                <p>Click aqui para visualizar o nosso estoque de peças</p>
            </a>
        </div>
        <div id="funcoes">
            <a href="pages/adicionar.html">
                <h1>Adicionar Peça do Estoque</h1>
                <p>Click aqui para adicionar peças em nosso estoque</p>
            </a>
        </div>
        <div class="sair">
            <a href="php/sair.php"><input type="button" value="Sair"></a>
        </div>
    </main>
</body>
</html>