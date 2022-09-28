package com.web.haechi.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.web.haechi.service.VulnerabilityImpl;
import com.web.haechi.vo.VulnerabilityVO;

@Controller
public class IssueInfoColtroller {
	@Autowired
	private VulnerabilityImpl vulnerabilityImpl;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/issueInfo", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getIssueInfo() {
		Map<String, Object> map = new HashMap<String, Object>();
		// DB Connection
		try {
			
			List<VulnerabilityVO> vulnerabilityVOList = vulnerabilityImpl.selectAll();
			for (VulnerabilityVO vo : vulnerabilityVOList) {
//				System.out.println(vo.getId() + " : " + vo.getTitle() + " : " + vo.getContent());
				Map<String, Object> subMap = new HashMap<String, Object>();
				subMap.put("comment", vo.getComment());
				subMap.put("content", vo.getContent());
				subMap.put("recommendation", vo.getRecommendation());
				subMap.put("example", vo.getExample());
				subMap.put("links", vo.getLinks());
				subMap.put("href", vo.getHref());
				map.put(vo.getTitle(), subMap);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
}
