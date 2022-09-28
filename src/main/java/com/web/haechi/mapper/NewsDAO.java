package com.web.haechi.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.web.haechi.vo.NewsVO;

@Repository
@Mapper
public interface NewsDAO {
	public List<NewsVO> selectAll() throws Exception;
}
