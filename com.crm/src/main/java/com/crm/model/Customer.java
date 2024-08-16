package com.crm.model;

import org.springframework.boot.autoconfigure.domain.EntityScan;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;  
import lombok.Builder;

//@Data
//@NoArgsConstructor
//@AllArgsConstructor
@Entity
//@Builder

public class Customer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String custname;
	private String country;
	private String address;
	private String zipandstate;
	private String parentacc;
	private String accsens;
	private String marketname;
	private String coverage;
	private String subsegment;	
	
	public Customer() {
		}
	
	public Customer(long id, String custname, String country, String address, String zipandstate, String parentacc,
			String accsens, String marketname, String coverage, String subsegment) {
		super();
		this.id = id;
		this.custname = custname;
		this.country = country;
		this.address = address;
		this.zipandstate = zipandstate;
		this.parentacc = parentacc;
		this.accsens = accsens;
		this.marketname = marketname;
		this.coverage = coverage;
		this.subsegment = subsegment;
	}
	public long getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCustname() {
		return custname;
	}
	public void setCustname(String custname) {
		this.custname = custname;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getZipandstate() {
		return zipandstate;
	}
	public void setZipandstate(String zipandstate) {
		this.zipandstate = zipandstate;
	}
	public String getParentacc() {
		return parentacc;
	}
	public void setParentacc(String parentacc) {
		this.parentacc = parentacc;
	}
	public String getAccsens() {
		return accsens;
	}
	public void setAccsens(String accsens) {
		this.accsens = accsens;
	}
	public String getMarketname() {
		return marketname;
	}
	public void setMarketname(String marketname) {
		this.marketname = marketname;
	}
	public String getCoverage() {
		return coverage;
	}
	public void setCoverage(String coverage) {
		this.coverage = coverage;
	}
	public String getSubsegment() {
		return subsegment;
	}
	public void setSubsegment(String subsegment) {
		this.subsegment = subsegment;
	}
	@Override
	public String toString() {
		return "Customer [id=" + id + ", custname=" + custname + ", country=" + country + ", address=" + address
				+ ", zipandstate=" + zipandstate + ", parentacc=" + parentacc + ", accsens=" + accsens + ", marketname="
				+ marketname + ", coverage=" + coverage + ", subsegment=" + subsegment + "]";
	}
}