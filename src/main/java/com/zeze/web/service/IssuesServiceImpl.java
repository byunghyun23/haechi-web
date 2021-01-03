package com.zeze.web.service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.zeze.web.dao.IssuesDAO;
import com.zeze.web.vo.IssuesVO;

@Service
public class IssuesServiceImpl implements IssuesService{
	@Inject
	private IssuesDAO dao;
	
	@Override
	public IssuesVO selectCount() throws Exception {
		return dao.selectCount();
	}
}
