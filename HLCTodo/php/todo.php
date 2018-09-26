<?php 
// THIS IS A TODO LIST

//Libraries
require_once("db_connect.php");
require_once("get_username.php");

// GET THE ITEMS FROM DB
if ($dbi) {
    // SQL query
    $q = "SELECT ID,Description,User 
        FROM HLCTodoItem 
        WHERE Completed = b'0' AND User = ? 
        ORDER BY Timestamp";

    // Array to translate to json
    $rArray = array();

    if ($stmt = $dbi->prepare($q)) {

        //Set the user param
		$user = $_POST['u'];
		$stmt->bind_param("i",$user);

        //Prepare output
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($rId,$rDesc,$rUser);

        //Collect results
        while($stmt->fetch()) {
            $rArray[] = [
                "ID"=>$rId,
                "Description"=>$rDesc,
                "User"=>$rUser,
                "Username"=>get_username($rUser)];
        }
        
        //Encode JSON
        echo json_encode($rArray);
        
        $stmt->close();        
    }
    else {
        echo "no execute statement";
    }
}
//Inform user if error
else {
        echo "Connection Error: " . mysqli_connect_error();
}
//Close connection
mysqli_close($dbi);
    
?>