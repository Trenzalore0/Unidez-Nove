<?php
header('Access-Control-Allow-Origin: *');

header('Content-Type: application/json');

$obj->id = "2";

$obj->nome = "Trenzalore";

echo json_encode($obj);