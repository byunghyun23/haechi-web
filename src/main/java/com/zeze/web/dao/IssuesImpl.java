package com.zeze.web.dao;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.zeze.web.vo.IssuesVO;

@Repository
public class IssuesImpl implements IssuesDAO{
	private static final String namespace="com.zeze.web.issuesMapper";
	
	@Inject
	private SqlSession sqlSession;
	
	@Override
	public IssuesVO selectCount() throws Exception {
		return sqlSession.selectOne(namespace + ".selectCount");
	}
}
