<?php
class Login{
    private $user;
    private $password;
    private $mysqli;

    function __construct($user, $password){
        $this->user = $user;
        $this->password = $password;

        $this->mysqli = new mysqli("localhost", "root","anthonypro","dbreusetech");
        if ($this->mysqli->connect_errno) {
            echo "Falha ao conectar com o MySQL: " . $this->mysqli->connect_error;
            die();
        }
    }

    function get_user(){
        $query_result = "SELECT * FROM usuario WHERE login = '{$this->user}' AND senha = '{$this->password}'";

        if($user = $this->mysqli->query($query_result)){
            return $user->fetch_assoc();                
        }
        else{
            die("Falha ao consultar os usuários");
        }      
    }
    function log_in(){
        session_start();

        $user_information = $this->get_user();

        if(empty($user_information)){
            die("Login Sem Sucesso, Tente Novamente");
        }else{
            $_SESSION["user"] = $user_information["login"];
            header("location:../index.php");
        }
    }
}
$login = new Login($_POST['user'], $_POST['password']);
$login->log_in();
?>