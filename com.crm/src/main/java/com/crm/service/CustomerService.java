package com.crm.service;

import java.util.List;

import com.crm.model.Customer;

public interface CustomerService {
	public Customer createCustomer(Customer customer);
	public List<Customer> getAllCustomers(); 
}