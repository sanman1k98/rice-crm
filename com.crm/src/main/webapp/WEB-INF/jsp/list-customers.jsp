<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
 pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>javaguides.net</title>
<link href="<c:url value="/resources/css/bootstrap.min.css" />"
 rel="stylesheet">
<%@ page isELIgnored="false"%>
<script src="<c:url value="/resources/js/jquery-1.11.1.min.js" />"></script>
<script src="<c:url value="/resources/js/bootstrap.min.js" />"></script>
</head>
<body>
 <div class="container">
  <div class="col-md-offset-1 col-md-10">
   <h3 class="text-center">Spring MVC 5 + Spring Data JPA 2 + JSP +
    MySQL Example - Customer Management</h3>
   <hr />

   <input type="button" value="Add Customer"
    onclick="window.location.href='showForm'; return false;"
    class="btn btn-primary" /> <br />
   <br />
   <div class="panel panel-info">
    <div class="panel-heading">
     <div class="panel-title">Customer List</div>
    </div>
    <div class="panel-body">
     <table class="table table-striped table-bordered">
      <tr>
       <th>Customer Name</th>
       <th>Country</th>
       <th>Address</th>
       <th>Zip & State</th>
       <th>Parent Account</th>
       <th>Account Sensible</th>
       <th>Market Name</th>
       <th>Coverage</th>
       <th>SubSegment</th>
      </tr>

      <!-- loop over and print our customers -->
      <c:forEach var="tempCustomer" items="${custlist}">

       <%-- <!-- construct an "update" link with customer id -->
       <c:url var="updateLink" value="/customer/updateForm">
        <c:param name="customerId" value="${tempCustomer.id}" />
       </c:url>

       <!-- construct an "delete" link with customer id -->
       <c:url var="deleteLink" value="/customer/delete">
        <c:param name="customerId" value="${tempCustomer.id}" />
       </c:url> --%>

       <tr>
        <td>${tempCustomer.custname}</td>
        <td>${tempCustomer.country}</td>
        <td>${tempCustomer.address}</td>
        <td>${tempCustomer.zipandstate}</td>
        <td>${tempCustomer.parentacc}</td>
        <td>${tempCustomer.accsens}</td>
        <td>${tempCustomer.marketname}</td>
        <td>${tempCustomer.coverage}</td>
        <td>${tempCustomer.subsegment}</td>
        
        

        <%-- <td>
         <!-- display the update link --> <a href="${updateLink}">Update</a>
         | <a href="${deleteLink}"
         onclick="if (!(confirm('Are you sure you want to delete this customer?'))) return false">Delete</a>
        </td> --%>

       </tr>

      </c:forEach>

     </table>

    </div>
   </div>
  </div>

 </div>
 <div class="footer">
  <p>Footer</p>
 </div>
</body>

</html>