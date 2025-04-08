<?php

    $db = array();
    $file = fopen("ODBC_Conn.txt", "r");

    # feof() function for PHP checks if the "end-of-file" (EOF) has been reached for an open file. So we can use !feof to read line by line until the end
    while (!feof($file)) {
        $db[] = trim(fgets($file, filesize("ODBC_Conn.txt")));
    }
    fclose($file);

    $ODBC_Conn = odbc_connect("DRIVER={ODBC Driver 17 for SQL Server};Server=$db[0];Database=$db[1];", $db[3], $db[4]);

?>