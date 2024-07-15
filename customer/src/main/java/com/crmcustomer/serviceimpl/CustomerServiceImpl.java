package com.crmcustomer.serviceimpl;

import java.util.List;

import com.crmcustomer.service.CustomerService;
import com.customer.dao.CustomerRepository;
import com.customer.dto.Customer;

public class CustomerServiceImpl implements CustomerService {

	private CustomerRepository customerRepository;
	
	@Override
	public Customer createCustomer(Customer customer) {
		return customerRepository.save(customer);
	}

	@Override
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}
}
