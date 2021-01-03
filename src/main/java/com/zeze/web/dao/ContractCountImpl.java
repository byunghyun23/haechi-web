package com.zeze.web.dao;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.zeze.web.vo.ContractCountVO;

@Repository
public class ContractCountImpl implements ContractCountDAO{
	private static final String namespace="com.zeze.web.contractMapper";
	
	@Inject
	private SqlSession sqlSession;
	
	@Override
	public ContractCountVO selectCount() throws Exception {
		return sqlSession.selectOne(namespace + ".selectCount");
	}
}
