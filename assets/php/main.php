<?php

$conn = mysqli_connect('remotemysql.com:3306', 'VO8Zv3eZMb', 'EKJFEVlRwl', 'VO8Zv3eZMb');

if(isset($_GET['logEmail']) && isset($_GET['logSenha'])) {

    $email = htmlspecialchars($_GET['logEmail']);

    $senha = htmlspecialchars($_GET['logSenha']);

    $query = mysqli_query($conn, "SELECT * FROM `users` WHERE `email` = '{$email}';");

    if(mysqli_num_rows($query) > 0) {
        
        while($resu = mysqli_fetch_array($query)) {
            
            if($resu['email'] == $email) {
                
                $usu->id = $resu['id'];

                $usu->nome = $resu['nome'];

                $usu->email = $resu['email'];

                $usu->senha = $resu['senha'];

                $obj->usuario = $usu;

            }

        }

    }

}

else if(isset($_GET['cadNome']) && isset($_GET['cadEmail']) && isset($_GET['cadSenha'])) {

    $usu->nome = htmlspecialchars($_GET['cadNome']);

    $usu->email -htmlspecialchars($_GET['cadEmail']);

    $usu->senha = htmlspecialchars($_GET['cadSenha']);

    $obj->usuario = $usu;

}

header('Content-Type: application/json');

echo json_encode($obj);