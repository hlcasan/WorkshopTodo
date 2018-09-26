/* Handler to add an item
	Calls addItem.php to dump items in DB
*/

var addForm = document.getElementById("addF");

addForm.addEventListener('submit', function(event) {
	event.preventDefault();

	var php = "php/addItem.php";

	var xhr = new XMLHttpRequest();
    var formData = new FormData(addForm);
    formData.append("u",window.localStorage.getItem("userid")); //set the user id from localstorage

    xhr.open("POST", php, true);
    xhr.onreadystatechange = function() {
        //console.log('readyState: ' + xhr.readyState);
        //console.log('status: ' + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
			// Everything ok, get the response
			console.log(xhr.responseText);

            // Call a refresh of the todo list
            todo(); 
        }
	};
	xhr.send(formData);
});

