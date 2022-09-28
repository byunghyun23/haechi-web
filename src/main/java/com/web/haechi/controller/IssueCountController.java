package com.web.haechi.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.web.haechi.service.ContractImpl;
import com.web.haechi.service.IssuesImpl;
import com.web.haechi.service.VulnerabilityImpl;
import com.web.haechi.vo.ContractCountVO;
import com.web.haechi.vo.IssuesCountVO;
import com.web.haechi.vo.VulnerabilityVO;

@Controller
public class IssueCountController {

	@Autowired
	private ContractImpl contractImpl;
	@Autowired
	private IssuesImpl issuesImpl;
	@Autowired
	private VulnerabilityImpl vulnerabilityImpl;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/issueCount", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getIssueCount() {
		Map<String, Object> map = new HashMap<String, Object>();
		
		// DB Connection
		try {
			IssuesCountVO issuesCountVO = issuesImpl.selectCount();
//			System.out.println("issues count : " + issuesVO.getIssuesCount());
			map.put("issuesCount", issuesCountVO.getIssuesCount());
			
			ContractCountVO contractCountVO = contractImpl.selectCount();
//			System.out.println("contract count : " + contractVO.getContractCount());
			map.put("contractCount", contractCountVO.getContractCount());
			
			List<VulnerabilityVO> vulnerabilityVOList = vulnerabilityImpl.selectAll();
			for (VulnerabilityVO vo : vulnerabilityVOList) {
//				System.out.println(vo.getId() + " : " + vo.getTitle());
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return map;
	}
}
