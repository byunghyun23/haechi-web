package com.web.haechi.mapper;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.web.haechi.vo.ContractCountVO;

@Repository
@Mapper
public interface ContractDAO {
	public ContractCountVO selectCount() throws Exception;
	public ContractCountVO selectMAX() throws Exception;
	public void insertContract(HashMap<Object, Object> map) throws Exception;
}