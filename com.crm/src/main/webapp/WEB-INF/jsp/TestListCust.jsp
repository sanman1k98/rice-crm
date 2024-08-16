<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> --%>  
    
    <%-- <%@ taglib prefix="c" uri="jakarta.tags.core" %> --%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>My JSP Here</title>
 <%-- <link href="<c:url value="/resources/css/bootstrap.min.css" />"
 rel="stylesheet">  --%>
<%@ page isELIgnored="false"%>
 <%-- <script src="<c:url value="/resources/js/jquery-1.11.1.min.js" />"></script>
<script src="<c:url value="/resources/js/bootstrap.min.js" />"></script> --%>
</head>
<body>
<table>

<forEach var="tempCustomer" items="${custlist}">
<tr>

	${custlist}
        <%-- <td>${tempCustomer.custname}</td>
        <td>${tempCustomer.country}</td>
        <td>${tempCustomer.address}</td>
        <td>${tempCustomer.zipandstate}</td>
        <td>${tempCustomer.parentacc}</td>
        <td>${tempCustomer.accsens}</td>
        <td>${tempCustomer.marketname}</td>
        <td>${tempCustomer.coverage}</td>
        <td>${tempCustomer.subsegment}</td> --%></tr>
</forEach>
</table>
</body>
</html>