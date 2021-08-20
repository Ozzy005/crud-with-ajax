<?php

try
{
    $con = new PDO('mysql:dbname=teste_vaga;host=localhost','rafael','775123');
    $con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT id, name, email FROM users ORDER BY id";
    $stm = $con->prepare($sql);
    $stm->execute();

    $data = $stm->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
}
catch(Exception $e)
{
    http_response_code(500);
}