<?php
    session_start();
    isset($_SESSION["user"]) or header("location:pages/login.html");
?> 
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="css/default_page_style.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/style.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=BioRhyme&display=swap" rel="stylesheet">
    
    <title>Aplicativo ReuseTech</title>
</head>
<body>
    <header>
        <img src="images/reusetech.png" alt="ReuseTech">
        <h1>ReuseTech</h1>
    </header>
    <main>
        <h1 id="title">Gerenciar Estoque</h1>
        <div id="funcoes">
            <a href="GerenciarEstoque/Pc/vizualizarPCs.php">
                <h1>Visualizar Estoque de PCs</h1>
                <p>Click aqui para visualizar o nosso estoque de PCs</p>
            </a>
        </div>
        <div id="funcoes">
            <a href="GerenciarEstoque/Pc/adicionarPc.php">
                <h1>Adicionar PC</h1>
                <p>Click aqui para adicionar um pc em nosso estoque</p>
            </a>
        </div>
        <div id="funcoes">
            <a href="./GerenciarEstoque/Pecas/visualizar.html">
                <h1>Visualizar Estoque de Peças</h1>
                <p>Click aqui para visualizar o nosso estoque de peças</p>
            </a>
        </div>
        <div id="funcoes">
            <a href="./GerenciarEstoque/Pecas/listaDePecas.php">
                <h1>Adicionar Peça do Estoque</h1>
                <p>Click aqui para adicionar peças em nosso estoque</p>
            </a>
        </div>

        <h1 id="title">Gerenciar Barramentos/FKs das Peças</h1>
        <div id="funcoes">
            <a href="./GerenciarBarramentosEFKs/visualizarBarramentosEFKs.html">
                <h1>Visualizar Barramentos/FKs</h1>
                <p>Click aqui para visualizar os barramentos ou FKs cadastrados</p>
            </a>
        </div>
        <div id="funcoes">
            <a href="./GerenciarBarramentosEFKs/listaDeBarramentosEFKs.php">
                <h1>Adicionar Barramentos/FKs</h1>
                <p>Click aqui para adicionar um barramento ou FK</p>
            </a>
        </div>

        <h1 id="title">Gerenciar Usuários</h1>
        <div id="funcoes">
            <a href="./GerenciarUsuarios/visualizarUsuarios.html">
                <h1>Visualizar Usuários</h1>
                <p>Click aqui para visualizar os usuários</p>
            </a>
        </div>
        <div id="funcoes">
            <a href="./GerenciarUsuarios/inserirUsuario.php?table=usuario">
                <h1>Adicionar Usuários</h1>
                <p>Click aqui para adicionar um novo usuário</p>
            </a>
        </div>
        <div class="sair">
            <a href="php/sair.php"><input type="button" value="Sair"></a>
        </div>
    </main>
    <footer>
        <div id='footer_titles'>
            <h2>ReuseTech</h2>
            <h3>Sistema de Gerenciamento de Estoque</h3>
        </div>
    </footer>
</body>
</html>