package com.web.haechi.controller;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.web.haechi.service.ContractImpl;
import com.web.haechi.service.IssuesImpl;
import com.web.haechi.service.NewsImpl;
import com.web.haechi.service.VulnerabilityImpl;
import com.web.haechi.vo.ContractCountVO;
import com.web.haechi.vo.IssuesCountVO;
import com.web.haechi.vo.NewsVO;

//import com.google.gson.Gson;

@Controller
public class MainController {
	
	@Autowired
	private ContractImpl contractImpl;
	@Autowired
	private IssuesImpl issuesImpl;
	@Autowired
	private NewsImpl newsImpl;
	
	@RequestMapping(value="/", produces = "application/text; charset=utf8")
    public String main(Locale locale, Model model) {
		// DB Connection
		try {
			IssuesCountVO issuesCountVO = issuesImpl.selectCount();
			System.out.println("issues count : " + issuesCountVO.getIssuesCount());
			model.addAttribute("issuesCount", issuesCountVO.getIssuesCount() );
			
			ContractCountVO contractCountVO = contractImpl.selectCount();
			System.out.println("contract count : " + contractCountVO.getContractCount());
			model.addAttribute("contractCount", contractCountVO.getContractCount() );
			
			List<NewsVO> newsVOList = newsImpl.selectAll();
			
			model.addAttribute("news", newsVOList);
//					List<VulnerabilityVO> vulnerabilityVOList = vulnerabilityService.selectAll();
//					for (VulnerabilityVO vo : vulnerabilityVOList) {
//						System.out.println(vo.getId() + " : " + vo.getTitle());
//					}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
				
        return "index";
    }
	
	
}




