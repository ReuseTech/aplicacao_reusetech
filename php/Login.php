<?php
class Login{
    private $user;
    private $password;
    private $connection;

    function __construct($user, $password){
        $this->user = $user;
        $this->password = $password;

        require_once("Connection.php");
        $this->connection = new Connection();
    }

    function get_user(){
        $user_query = "SELECT * FROM usuario WHERE login = '{$this->user}' AND senha = '{$this->password}'";

        if(mysqli_query($this->connection->connect_to_db(), $user_query)){
            return mysqli_query($this->connection->connect_to_db(), $user_query);                
        }
        else{
            die("Falha ao consultar os usuários");
        }      
    }
    function log_in(){
        session_start();

        $user_information = mysqli_fetch_assoc($this->get_user());

        if(empty($user_information)){
            die("Login Sem Sucesso, Tente Novamente");
        }else{
            $_SESSION["user"] = $user_information["login"];
            header("location:../pages/index.php");
        }
    }
}
$login = new Login($_POST['user'], $_POST['password']);
$login->log_in();
?>