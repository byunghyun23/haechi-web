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
import com.zeze.web.vo.ContractCountVO;
import com.zeze.web.vo.IssuesVO;
import com.zeze.web.vo.VulnerabilityVO;

@Controller
public class IssueCountController {

	@Inject
	private ContractService contractService;
	@Inject
	private IssuesService issuesService;
	@Inject
	private VulnerabilityService vulnerabilityService;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/issueCount", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getIssueCount() {
		Map<String, Object> map = new HashMap<String, Object>();
		
		// DB Connection
		try {
			IssuesVO issuesVO = issuesService.selectCount();
//			System.out.println("issues count : " + issuesVO.getIssuesCount());
			map.put("issuesCount", issuesVO.getIssuesCount());
			
			ContractCountVO contractVO = contractService.selectCount();
//			System.out.println("contract count : " + contractVO.getContractCount());
			map.put("contractCount", contractVO.getContractCount());
			
			List<VulnerabilityVO> vulnerabilityVOList = vulnerabilityService.selectAll();
			for (VulnerabilityVO vo : vulnerabilityVOList) {
				System.out.println(vo.getId() + " : " + vo.getTitle());
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return map;
	}
}
