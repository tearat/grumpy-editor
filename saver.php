<?php
    if ( !empty($_POST['data']) )
    {
        $file = 'posts.json';
        $data = $_POST['data'];
        file_put_contents($file, $data);
    }
?>