package com.crm.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.crm.dao.CustRepo;
//import com.crm.service.CustomerService;
import com.crm.model.Customer;
import com.crm.service.CustomerService;
import com.crm.serviceimpl.CustomerServiceImpl;
import com.crm.service.CustomerService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@Controller

public class CustomerController {

	@Autowired
	private CustRepo custrepo;
	
//	@Autowired
//	ModelAndView mv;
	
	@GetMapping("/addcustomer")
	public String addCust() {
		return "Add";
	}	

	@PostMapping("/addCustomerSubmit")
	@ResponseBody
	public ModelAndView addCustSubmit(Customer custom) {
		custrepo.save(custom);	
		ModelAndView mv = new ModelAndView();
		mv.setViewName("TestListCust");
		return mv;
	}
	
	@GetMapping("/listcustomers")
	public ModelAndView getAllCustomers() {
		List<Customer> custlist = custrepo.findAll();
		System.out.println(custlist);
		ModelAndView mv = new ModelAndView();
		mv.addObject("custlist", custlist);
		mv.setViewName("TestListCust");
		return mv;		
	}
	
	@GetMapping("/mytest")
	public String myTestPage() {
		return "MyFile";
	}
}