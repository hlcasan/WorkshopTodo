/* Handler for the display of todo items
	Uses the var itemRaw which comes json-encoded from the DB through todo.php.
*/

var todo = function () {
	
	var php = "php/todo.php";
	
	var xhr = new XMLHttpRequest();
	var formData = new FormData();
	formData.append("u",window.localStorage.getItem("userid"));
	var itemRaw = new Array();

    xhr.open("POST", php, true);
    xhr.onreadystatechange = function() {
        console.log('readyState: ' + xhr.readyState);
        console.log('status: ' + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Everything ok, get the images
            itemRaw = JSON.parse(xhr.responseText);
			console.log(itemRaw); // handle response.

			//Clean up the html
			document.getElementById('todo').innerHTML = "";
			
			//Dump items in the DOM
			for (let c in itemRaw) {
				console.log(c);
				
				//Container div
				let itemDIV = document.createElement('div');
				itemDIV.className = "item";
				
				//Complete Item
				let linkP = document.createElement('p');
				let link = document.createElement('a');
				link.href = "php/complete.php?i="+itemRaw[c].ID;
				link.innerHTML = "&#10004;"; // Makes this ✔
				linkP.appendChild(link);

				//itemP
				let itemP = document.createElement('p');
				itemP.innerHTML = itemRaw[c].Description;
								
				//Organize the structure and dump in html
				itemDIV.appendChild(linkP);
				itemDIV.appendChild(itemP);
				document.getElementById('todo').appendChild(itemDIV);

				/* HTML looks like this
				<div class="item">
					<p><a href="…">Complete</a></p>
					<p>…</p>
				</div>
				*/

			}
        }
	};
	xhr.send(formData);
};

