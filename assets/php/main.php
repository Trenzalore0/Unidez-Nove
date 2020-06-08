<?php

include 'conn.php';
header('Content-Type: application/json');

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
            } else {
                $usu['email'] = $resu['email'];
                $usu['senha'] = "senha incorreta";
            }
        }
    } else {
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
} else if(isset($_GET['gCriador']) && isset($_GET['gConteudo'])) {
    $criador = htmlspecialchars($_GET['gCriador']);
    $conteudo = htmlspecialchars($_GET['gConteudo']);
    $query = mysqli_query($conn, "INSERT INTO comentarios (id_criador, conteudo) VALUES ('$criador', '$conteudo')");
    if($query == True) {
        $query1 = mysqli_query($conn, "SELECT * FROM comentarios");
        if(mysqli_num_rows($query1) > 0) {
            $i = 0;
            while($resu = mysqli_fetch_array($query1)) {
                $usu['idcomentario'] = $resu['id'];  
                $usu['idcriador'] = $resu['id_criador']; 
                $usu['comentario'] = $resu['conteudo'];
                $comentario[$i] = $usu;
                $i++;
            }
        }
    }
    $obj['comentarios'] = $comentario;
} else if(isset($_GET['rComent']) && isset($_GET['rCriador']) && isset($_GET['rConteudo'])) {
    $comentario = htmlspecialchars($_GET['rComent']);
    $conteudo = htmlspecialchars($_GET['rConteudo']);
    $criador = htmlspecialchars($_GET['rCriador']);
    $query = mysqli_query($conn, "INSERT INTO respostas (conteudo, id_criador, id_comentario) VALUES ('$conteudo', '$criador', '$comentario')");
    if($query == true) {
        $usu['criado'] = true;
    } else {
        $usu['criado'] = false;
    }
    $obj['resposta'] = $usu;
} else if(isset($_GET['userId'])) {
    $user = htmlspecialchars($_GET['userId']);
    $query = mysqli_query($conn, "SELECT * FROM users WHERE id = '$user'");
    if(mysqli_num_rows($query) > 0) {      
        while($resu = mysqli_fetch_array($query)) { 
            $usu['usuario'] = $resu['nome'];
        }
    }
    $obj = $usu;
} else if(isset($_GET['comentId'])) {
    $comentario = htmlspecialchars($_GET['comentId']);
    $query = mysqli_query($conn, "SELECT * FROM respostas WHERE id_comentario = '$comentario'");
    if(mysqli_num_rows($query) > 0) {
        $i = 0;
        while($resu = mysqli_fetch_array($query)) {
            $usu['id'] = $resu['id'];
            $usu['criador'] = $resu['id_criador'];
            $usu['conteudo'] = $resu['conteudo'];
            $usu['comentario'] = $resu['id_comentario'];
            $resposta[$i] = $usu;
            $i++;
        }
        $obj['respostas'] = $resposta;
    } else {
        $obj['respostas'] = null;
    }
} else {
    $query1 = mysqli_query($conn, "SELECT * FROM comentarios");
    if(mysqli_num_rows($query1) > 0) {
        $i = 0;
        while($resu = mysqli_fetch_array($query1)) {
            $usu['idcomentario'] = $resu['id'];  
            $usu['idcriador'] = $resu['id_criador']; 
            $usu['comentario'] = $resu['conteudo'];
            $comentario[$i] = $usu;
            $i++;
        }
    }
    $obj['comentarios'] = $comentario;
}

mysqli_close($conn);
echo json_encode($obj);
