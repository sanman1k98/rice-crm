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
<title>Login Success..</title>
	<script src="script.js"></script>

<style> 

h2{
	position: absolute;
	left: 450px;
	align: center;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.heading{
	/* border: 1px solid gold; */
	background-color: black;
	height: 40px;
	width: 100%;
	font-size: 15px;
	position: relative;
	top: 0px;
	font-positon: 10px;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.bottom{
	border:none;
	background-color: red;
	height: 35px;
	width: 100%;
	position: absolute;
	bottom: 0;
	color: white;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.container{
	height: 100px;
    padding: 16px;
	position: absolute;
	left: 500px;
	top:100px;	
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.add{
	background-color: lightgreen;
	margin: 10px;
	padding: 10px;
	border: none;
	width: 60%;
	cursor: pointer;
	border-radius:5px;
}
/* .update{
	background-color: gold;
	margin: 10px;
	padding: 10px;
	border: none;
	width: 100%;
	cursor: pointer;
	border-radius:5px;
} */
.view{
	background-color: lightblue;
	margin: 10px;
	padding: 10px;
	border: none;
	width: 60%;
	cursor: pointer;
	border-radius:5px;
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
	top:5px;
	left: 600px;
	color: white;
	margin: 10px;
	padding: 10px;
	border: none;
	cursor: pointer;
	border-radius:5px;
}
.logout:hover{
	opacity:0.7px;
}
.copy{
position: absolute;
bottom: 300px;
left:500px;
}
</style>
</head>
<%-- <%
HttpSession s = request.getSession();
String name = s.getAttribute("name").toString();

/* request.getSession("name",name); */
%> --%>
<form name="Landing">
<body>
	<div class="heading">
	<br/><p><center>Welcome</center></p>
	 <%-- <p align="right">UserName : <%=name%></p> --%>
	</div>
	<h2>CUSTOMER RELATIONSHIP MANAGEMENT</h2>
	
	<div class = "container">
	<%-- <%if(name.equals("Admin")){ %>
	<button class="add" onclick="document.forms[0].action = 'Add.jsp'; return true;">Add Employee Details</button></br></br><%}%> --%>
	<button class="add" onclick="document.forms[0].action = 'Add.jsp'; return true;">Add Customer Details</button>
	<!-- <button class="update" onclick = "document.forms[0].action = 'Update.jsp'; return true;">Update Employee Details</button></br></br> -->
	<button class="view" onclick = "document.forms[0].action = 'View.jsp'; return true;">View Customer Details</button></br></br>
<!-- 	<button class="logout" onclick = "document.forms[0].action = 'logout.jsp' ; return true;">LOGOUT</button> -->
	</div>
	<div class="bottom">
	<p class="copy" align="center">&copy Rights Reserved 2023</p>
	</div>
	</form>
	</body>
	</html>