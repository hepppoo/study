<?php
    mb_http_output('utf-8');
    mb_internal_encoding('utf-8');
    header('Content-Type: text/xml;charset=UTF-8');
    //郵便番号検索APIにアクセスして、住所情報を取得
    print(file_get_contents('http://zip.cgis.biz/xml/zip.php?zn='.$_GET['zip']));
