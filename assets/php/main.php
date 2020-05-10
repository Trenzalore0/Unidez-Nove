<?php

//header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$conn = mysqli_connect('remotemysql.com:3306', 'VO8Zv3eZMb', 'EKJFEVlRwl', 'VO8Zv3eZMb');

if(isset($_GET['logEmail']) && isset($_GET['logSenha'])) {
    $email = htmlspecialchars($_GET['logEmail']);
    $senha = htmlspecialchars($_GET['logSenha']);
    $query = mysqli_query($conn, "SELECT * FROM users WHERE email = '$email'");
    if(mysqli_num_rows($query) > 0) {      
        while($resu = mysqli_fetch_array($query)) {    
            if($resu['senha'] == $senha) {
                $usu['id'] = $resu['id'];
                $usu['nome'] = $resu['nome'];
                $usu['email'] = $resu['email'];
                $usu['senha'] = $resu['senha'];
            }
            else {
                $usu['email'] = $resu['email'];
                $usu['senha'] = "senha incorreta";
            }
        }
    }
    else {
        $usu['email'] = "email não cadastrado";
    }
    $obj['usuario'] = $usu;
} else if(isset($_GET['cadNome']) && isset($_GET['cadEmail']) && isset($_GET['cadSenha'])) {
    $nome = htmlspecialchars($_GET['cadNome']);
    $email = htmlspecialchars($_GET['cadEmail']);
    $senha = htmlspecialchars($_GET['cadSenha']);
    $query = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
    if(mysqli_num_rows($query) == 1) {
        $usu['email'] = "email já cadastrado";
    } else {
        $query1 = mysqli_query($conn, "INSERT INTO users (nome, email, senha, adm) VALUES ('$nome', '$email', '$senha', '0')");
        if($query1 == True) {
            $usu['email'] = $email;
        }
    }
    $obj['usuario'] = $usu;
}

echo json_encode($obj);