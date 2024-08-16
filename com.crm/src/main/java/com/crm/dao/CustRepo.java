package com.crm.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crm.model.Customer;

public interface CustRepo extends JpaRepository<Customer, Long> {
}