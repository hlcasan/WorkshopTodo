<?php

//Libraries
require_once("db_connect.php");

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	
	$tbl = "HLCTodoItem";//change table name as required
	$insertedRows = 0;
	
	//create arrays
	$item = $_GET['i'];

	$query = "UPDATE $tbl SET Completed = 1 WHERE ID = ?";

	//prepare statement, execute, store_result
	if($insertStmt = $dbi->prepare($query)){
		//update bind parameter types & variables as required
		//s=string, i=integer, d=double, b=blob
		$insertStmt->bind_param("i", $item);
		$insertStmt->execute();
		$insertedRows += $insertStmt->affected_rows;
	}
	else {
		echo "Error";
	}
	
	echo($insertedRows);
	$insertStmt->close();
	$dbi->close();

// Return to main page
header("Location: ../index.html");

?>