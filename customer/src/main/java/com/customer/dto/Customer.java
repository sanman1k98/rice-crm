package com.customer.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class Customer {
	
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@Entity
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private String customerName;
	private String country;
	private String Address;;
	private String ZipandState;
	

}