<?php
    session_start();
    isset($_SESSION["user"]) or header("location:../php/login.php");
?>

<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Adicionar Peça - ReuseTech</title>
        <link rel="stylesheet" href="../css/main.css">
        <link rel="stylesheet" href="../css/header.css">
        <link rel="stylesheet" href="../css/adicionar.css">
        <link rel="stylesheet" href="../css/responsive.css">
    </head>
    <body>
        <header>
            <img src="images/reusetech.png" alt="ReuseTech">
            <h1>ReuseTech</h1>
        </header>
        <main>
            <div class="recarregar sair">
                <a href="../api/Cache.php"><input type="button" value="Recarregar tabelas disponíveis"></a>
            </div>
            <div class="coluna">
                <!-- conteúdo criado via javascript -->
            </div>
            <div class="sair">
                <a href="../index.php"><input type="button" value="Voltar"></a>
            </div>
        </main>
        <script src="../javascript/show_table_list.js"></script>
    </body>
</html>