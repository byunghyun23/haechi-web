package com.zeze.web.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.zeze.web.service.ContractService;
import com.zeze.web.service.IssuesService;
import com.zeze.web.service.VulnerabilityService;
import com.zeze.web.vo.ContractCountVO;
import com.zeze.web.vo.IssuesVO;
import com.zeze.web.vo.VulnerabilityVO;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Inject
	private ContractService contractService;
	@Inject
	private IssuesService issuesService;
	@Inject
	private VulnerabilityService vulnerabilityService;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		// DB Connection
		try {
			IssuesVO issuesVO = issuesService.selectCount();
			System.out.println("issues count : " + issuesVO.getIssuesCount());
			model.addAttribute("issuesCount", issuesVO.getIssuesCount() );
			
			ContractCountVO contractVO = contractService.selectCount();
			System.out.println("contract count : " + contractVO.getContractCount());
			model.addAttribute("contractCount", contractVO.getContractCount() );
			
//			List<VulnerabilityVO> vulnerabilityVOList = vulnerabilityService.selectAll();
//			for (VulnerabilityVO vo : vulnerabilityVOList) {
//				System.out.println(vo.getId() + " : " + vo.getTitle());
//			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
				
		
		return "home";
	}
	
}
