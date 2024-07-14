package com.crm.customer.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {
	
	@RequestMapping("/")
	public String hello() {
		
		return "Hello saravanan how are you";
		
	}

}
