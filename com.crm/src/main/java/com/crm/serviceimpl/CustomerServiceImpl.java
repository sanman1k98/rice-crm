package com.crm.serviceimpl;

import java.util.List;

import com.crm.dao.CustRepo;
import com.crm.model.Customer;
import com.crm.service.CustomerService;

public class CustomerServiceImpl implements CustomerService{
	
	private CustRepo customerRepository;
	
	@Override
	public Customer createCustomer(Customer customer) {
		return this.customerRepository.save(customer);
	}

	@Override
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}
}
