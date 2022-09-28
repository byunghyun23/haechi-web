package com.web.haechi.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.haechi.mapper.ContractDAO;
import com.web.haechi.vo.ContractCountVO;

@Service
@Transactional
public class ContractImpl {
	@Autowired
	ContractDAO contractDAO;
	
	public ContractCountVO selectCount() throws Exception {
		return contractDAO.selectCount();
	}
	
	public ContractCountVO selectMAX() throws Exception {
		return contractDAO.selectMAX();
	}
	
	public void insertContract(HashMap<Object, Object> map) throws Exception {
		contractDAO.insertContract(map);
	}
}
