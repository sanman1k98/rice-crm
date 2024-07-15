package com.crm.customer.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crmcustomer.service.CustomerService;
import com.customer.dto.Customer;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/customers")
public class CustomerController {
	
	 private CustomerService customerservice;
	 
	 @PostMapping("/addcustomer")
	 public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer)
	 {
		 Customer savedCustomer = customerservice.createCustomer(customer);
		return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
	 }
	 
		/*
		 * @GetMapping("{id}") public ResponseEntity<Customer>
		 * getCustomerById(@PathVariable("id") Long userId){ Customer customer =
		 * customerservice.getUserById(userId); return new ResponseEntity<>(customer,
		 * HttpStatus.OK); }
		 */
	 public ResponseEntity<List<Customer>> getAllCustomer(){
	        List<Customer> customers = customerservice.getAllCustomers();
	        return new ResponseEntity<>(customers, HttpStatus.OK);
	    }
	
}
