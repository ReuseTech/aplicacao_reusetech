<?php
session_start();
isset($_SESSION["user"]) or header("location:login.php");

require_once("Selector.php");
$selector = new Selector();

echo(json_encode($selector->get_table_information($selector->get_table($_GET['table']))));
die();
?> 
