<?php
 
    $json = $_POST["json"];
    $file = fopen("puntuaciones.json", "w");
    fwrite($file, $json  . PHP_EOL);
    fclose($file);
?>
