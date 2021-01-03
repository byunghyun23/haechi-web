package com.zeze.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zeze.web.service.ContractService;
import com.zeze.web.service.IssuesService;
import com.zeze.web.service.VulnerabilityService;
import com.zeze.web.vo.VulnerabilityVO;

@Controller
public class IssueInfoColtroller {
	@Inject
	private VulnerabilityService vulnerabilityService;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/issueInfo", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getIssueInfo() {
		Map<String, Object> map = new HashMap<String, Object>();
		// DB Connection
		try {
			
			List<VulnerabilityVO> vulnerabilityVOList = vulnerabilityService.selectAll();
			for (VulnerabilityVO vo : vulnerabilityVOList) {
				System.out.println(vo.getId() + " : " + vo.getTitle() + " : " + vo.getContent());
				map.put(vo.getTitle(), vo.getContent());
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
}
