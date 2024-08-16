<!DOCTYPE html>
<html>
<style>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 30%;
  padding: 7px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
/* Add a background color when the inputs get focus */
input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}
/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%%;
  opacity: 0.9;
}

button:hover {
  opacity:1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
  border-radius: 5px;
}

.opt{
	position: absolute;
	right: 600px;
}
/* Float cancel and signup buttons and add an equal width */
.cancelbtn, .signupbtn {
	
  float: left;
  width: 50%;
  border-radius: 5px;
}

/* Add padding to container elements */
.container {
  padding: 16px;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 130%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: #474e5d;
  padding-top: 70px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
   margin: 5% auto 15% auto;  /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
  border-radius: 5px;
}

/* Style the horizontal ruler */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
 
/* The Close Button (x) */
.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.addbtn{
border-radius: 5px;}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn, .signupbtn {
     width: 100%;
  }
}
</style>
<body>

<br><br>

<h2 align="center">Add Customer Form</h2>

<br><br>

<button class="addbtn" onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Add Customer</button>


<div id="id01" class="modal">
  <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
  
  <form class="modal-content" action="/addCustomerSubmit" method="post">
    <div class="container">
    
      <h1>Add Customer</h1>
      <p>Please fill in this form to create a customer.</p>
      <hr>
      
      <label for="custname"><b>Name</b></label>
      <input type="text" placeholder="Enter name" name="custname" required>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
      <label for="parentacc">Parent Account</label>
	<input type="text" placeholder="parent account" name="parentacc"><br>

      <label for="country"><b>Country</b></label>
      <input type="text" placeholder="Enter Country" name="country" required>&nbsp;&nbsp;&nbsp;&nbsp;
      
      <label for="accsens">AccountSensitivity</label>
	  <input type="text" placeholder="account sensitivity" name="accsens"><br>

      <label for="address"><b>Address</b></label>
      <input type="text" placeholder="Address" name="address" required>&nbsp;&nbsp;&nbsp;&nbsp;
    
    <label for="marketname">Market Name</label>&nbsp;&nbsp;&nbsp;
	<input type="text" placeholder="enter market name" name="marketname"><br>
      
      <label for="zipandstate"><b>Zip&State</b></label>
      <input type="text" placeholder="Zip&State" name="zipandstate" required>&nbsp;&nbsp;&nbsp;&nbsp;
      
    <label for="coverage">Coverage</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<input type="text" placeholder="enter coverage" name="coverage"><br>
	
	<label for="subsegment">Client Sub Segment</label>
	<input type="text" placeholder="enter client subsegment" name="subsegment"><br>
	
	</div>
      
      <label>
        <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
      </label>

      <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>

      <div class="clearfix">
        <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
        <button type="submit" class="signupbtn" onclick="myclick()">Add customer</button>
      </div>
    </div>
  </form>
</div>

<script>
// Get the modal
var modal = document.getElementById('id01');
funciton myclick(){
	alert(document.getElementByName("custName"));
	
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
</script>

</body>
</html>
