package com.web.haechi.mapper;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.web.haechi.vo.IssuesCountVO;

@Repository
@Mapper
public interface IssuesDAO {
	public IssuesCountVO selectCount() throws Exception;
	public void insertIssue(HashMap<Object, Object> map) throws Exception;
}
