package com.web.haechi.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.haechi.mapper.NewsDAO;
import com.web.haechi.vo.NewsVO;

@Service
@Transactional
public class NewsImpl {
	@Autowired
	NewsDAO newsDAO;
	
	public List<NewsVO> selectAll() throws Exception {
		return newsDAO.selectAll();
	}
}
