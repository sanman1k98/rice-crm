<%-- <%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

</body>
</html> --%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert Employee</title>
<style>

body{
	background-color: whitesmoke ;
}
.container{
	/* border: 1px solid lightblue; */
	border-radius: 8px;	
 	height: 375px;
 	align: center;
    padding: 16px;
	position: absolute;
	left: 450px;
	top:75px;
	background-color: lightblue;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
h2{
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.add:hover{
	opacity: 0.8;
}
.add{
	background-color: #04AA6D;
	color: white;
  	padding: 10px 20px;
  	margin: 10px 0;
  	border: 5px;
  	cursor: pointer;
  	position: absolute;
  	top:500px;	  
  	left: 550px;
  	border-radius: 5px;
}
.home{
	background-color: gold;
	color: black;
	padding: 6px 20px;
	margin: 10px 0;
  	border: 5px;
  	cursor: pointer;
  	position: absolute;
  	top: 50px;	  
  	left: 1000px;
  	border-radius: 5px;
}
.home:hover{
	opacity: 0.7;
}
p{
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	position: absolute;
	top: 5px;
	left: 1000px;
}

.logout{
	background-color:red;
	position: absolute;
	top:50px;
	left: 1100px;
	color: white;
	margin: 10px ;
	padding: 6px 10px;
	border: none;
	cursor: pointer;
	border-radius:5px;
}
.logout:hover{
	opacity:0.7;
}
</style>
</head>
<script>
	function validate(event) {
	console.log("inside validate...");
	alert("hi this is onblur for name...");
	      var key = event.which || event.keyCode || 0;
	      return ((key >= 65 && key <= 92) || 
	              (key >= 97 && key <= 124) || k==32){
		
	}
		function check(){
			alert("inside onblur...");
			var phno = document.getElementById("phno").value;
			 alert("length of phone no. given..: "+phno.length);
			if(phno.length < 10 ){
				document.getElementById("phno").innerHTML = "please enter 10 digit phone number";
				phno.focus();
				return false;
			}
		}
		/* var x = document.getElementById("phno");
		
		if(x.length>10 && x.length<10 && isNaN(x))
			document.form.innerHTML = "please enter 10 digit phone number"
			x.focus();		
	} */
	</script>
<%
HttpSession s = request.getSession();
String name = s.getAttribute("name").toString();
%>

	
	<body>
	<h2 align=center>Add Employee</h2>
	<p align="right">UserName : <%=name%></p>
	<form action="addEmployee" method="post">
	<div class="container">
 	
	<label for="name">Name</label>
	<input type="text" placeholder="enter customer name" name="name" onblur="return validate(event)" ></br></br>
	<label for="name">Country</label>
	<input type="text" placeholder="enter country" name="country" onblur="return validate(event)" ></br></br>
	<label for="name">Address</label>
	<input type="text" placeholder="enter address" name="address" onblur="return validate(event)" ></br></br>
	<label for="name">Zip/State</label>
	<input type="text" placeholder="enter zip/state" name="zip/state" onblur="return validate(event)" ></br></br>
	<!-- <label for="password">Password</label>
	<input type="password" placeholder="enter emp password" name="password"></br></br> -->
	<!-- <label for="age">Age</label>
	<input type="number" placeholder="enter emp age" name="age"></br></br>
	<label for="dob">Date of Birth: </label>
	<input type="date" placeholder="enter emp dob" name="dob"></br></br>
	<label for="sal">Salary</label>
	<input type="number" placeholder="enter emp salary" name="sal"></br></br>
	<label for="dept">Department</label>
	<input type="text" placeholder="enter emp Department" name="dept"></br></br>
	<label for="phno">Phone Number</label>
	<input type="number" placeholder="please enter 10 digits" id = "phno" onblur="check()" name="phno"></br></br>
	<label for="email">Email</label>
	<input type="email" placeholder="enter emp Email" name="email"></br></br>
	<label for="jdate">Joining Date</label>
	<input type="date" placeholder="enter emp joiningdate" name="jdate"></br></br>
	<label for="desig">Designation</label>
	<input type="text" placeholder="enter emp designation" name="desig"></br></br> -->

	</div></br></br>
	<div class="btn">
	
	<button class="home" onclick="document.forms[0].action = 'LandingPage.jsp'; return true;" value="HOME"/>HOME</button>
	<!-- <button class="logout" onclick = "document.forms[0].action = 'logout.jsp' ; return true;">LOGOUT</button> -->
	
	<input type="submit" class="add" value="Add Employee">
	</div>
	</form>
	
	</body>
	
	</html>