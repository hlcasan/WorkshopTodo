/* Handler for the UI elements in different cases.
    This can be written differently, it’s all front-end stuff
    */


// Function to reset the UI
let resetUI = function () {
    // Do we have a user?
    let u = window.localStorage.getItem("userid") ? true : false;

    //Show without a user
    document.querySelector("#loginContainer").style.display = u ? "none" : "block";

    //Show with a user
    document.querySelector("#welcomeContainer").style.display = u ? "block" : "none";
    document.querySelector("#addItemContainer").style.display = u ? "block" : "none";
    //document.querySelector("#todo").style.display = u ? "block" : "none";
    
    //Update occurances of the username
    document.querySelector(".welcome").innerHTML = "Welcome " + window.localStorage.getItem("username") + "!";

}

document.getElementById("addBttn").addEventListener("click",function() {
    document.querySelector("#addForm").classList.remove("hide");
    document.querySelector("#Description").focus();
});

//Initial call
resetUI();
