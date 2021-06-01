<?php
    session_start();
    isset($_SESSION["user"]) or header("location:../php/login.php");
?>

<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Placa Mãe - ReuseTech</title>
        <link rel="stylesheet" href="../css/main.css">
        <link rel="stylesheet" href="../css/header.css">
        <link rel="stylesheet" href="../css/form.css">
        <link rel="stylesheet" href="../css/pecas.css">
        <link rel="stylesheet" href="../css/responsive.css">
    </head>
    <body>
        <header>
            <img src="../images/reusetech.png" alt="ReuseTech">
            <h1>ReuseTech</h1>
        </header>
        <form action="../php/insert_piece.php" method="POST">
                <!-- conteúdo criado via javascript -->
        </form>
        <div class="sair">
            <a href="adicionar.html"><input type="button" value="Voltar"></a>
        </div>
        <script src="../javascript/adicionar_peca.js"></script>
    </body>
</html>
