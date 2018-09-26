<?php

//Libraries
require_once("db_connect.php");

    if ($dbi) {
        // SQL query
        $q = "SELECT ID, Username FROM HLCTodoUsers WHERE Username = ? AND Password = ?";

        // Array to translate to json
        $rArray = array();

        if ($stmt = $dbi->prepare($q)) {
            //Prepare input
            $user = $_POST['Username'];
            $pass = $_POST['Password'];
            $stmt->bind_param("ss",$user,$pass);

            //Prepare output
            $stmt->execute();
            $stmt->store_result();
            $stmt->bind_result($rId,$rUsername);

            //Collect results
            while($r = $stmt->fetch()) {
                $rArray[] = [
                    "ID"=>$rId,
                    "Username"=>$rUsername];
            }
            
            //Encode JSON
            echo json_encode($rArray);
            
            $stmt->close();
        }
        else {
            echo "no execute statement";
        }

    }
    else {
        echo "Connection Error: " . mysqli_connect_error();
    }
    mysqli_close($dbi);

?>
