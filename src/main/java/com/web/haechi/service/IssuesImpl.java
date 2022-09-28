package com.web.haechi.service;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.haechi.mapper.ContractDAO;
import com.web.haechi.mapper.IssuesDAO;
import com.web.haechi.vo.IssuesCountVO;

@Service
@Transactional
public class IssuesImpl {
	@Autowired
	IssuesDAO issuesDAO;
	
	public IssuesCountVO selectCount() throws Exception {
		return issuesDAO.selectCount();
	}
	
	public void insertIssue(HashMap<Object, Object> map) throws Exception {
		issuesDAO.insertIssue(map);
	}
}
