package com.zeze.web.service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.zeze.web.dao.ContractCountDAO;
import com.zeze.web.vo.ContractCountVO;

@Service
public class ContractServiceImpl implements ContractService{
	@Inject
	private ContractCountDAO dao;
	
	@Override
	public ContractCountVO selectCount() throws Exception {
		return dao.selectCount();
	}
}
