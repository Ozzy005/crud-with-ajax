<?php

try
{
    $con = new PDO('mysql:dbname=teste_vaga;host=localhost','rafael','775123');
    $con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'));

    $sql = "INSERT INTO users(name, birth, cpf, phone, email, address, city, country, obs)
    VALUES (:nome, :birth, :cpf, :phone, :email, :address, :city, :country, :obs)";

    $stm = $con->prepare($sql);

    $param = [
        ':nome' => $data->name,
        ':birth' => $data->birth,
        ':cpf' => $data->cpf,
        ':phone' => $data->phone,
        ':email' => $data->email,
        ':address' => $data->address,
        ':city' => $data->city,
        ':country' => $data->country,
        ':obs' => $data->obs
    ];

    $stm->execute($param);
}
catch(Exception $e)
{
    http_response_code(500);
}

