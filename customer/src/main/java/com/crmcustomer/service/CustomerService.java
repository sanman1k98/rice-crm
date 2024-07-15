package com.crmcustomer.service;



import com.customer.dto.Customer;
import java.util.List;


public interface CustomerService {
	
		Customer createCustomer(Customer customer);
		List<Customer> getAllCustomers(); 
}