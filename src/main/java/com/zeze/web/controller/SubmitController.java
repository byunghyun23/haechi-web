package com.zeze.web.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.zeze.web.service.ContractService;
import com.zeze.web.service.IssuesService;
import com.zeze.web.service.VulnerabilityService;
import com.zeze.web.vo.ContractCountVO;
import com.zeze.web.vo.IssuesVO;
import com.zeze.web.vo.VulnerabilityVO;

@Controller
public class SubmitController {
	
	@Inject
	private ContractService contractService;
	@Inject
	private IssuesService issuesService;
	@Inject
	private VulnerabilityService vulnerabilityService;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> submit(@RequestBody String json) {
		JSONParser parser = new JSONParser();
		JSONObject jsonObject = null;
		try {
			jsonObject = (JSONObject) parser.parse(json); 
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		String solidity = (String) jsonObject.get("input");
		
		// System.out.println("@@@@@@@" + solidity);
		
		String hostName = "localhost";
		int port = 5757;
		Socket socket = new Socket();
		SocketAddress address = new InetSocketAddress(hostName, port);
		
		String result = "";
		try {
			socket.connect(address);
			
			byte[] confirm = {1};
			
			OutputStream outputData = socket.getOutputStream();
			InputStream inputData = socket.getInputStream();
			
			// 코드 용량 송신
			byte[] bytesSolidity = solidity.getBytes();
			String count = Integer.toString(bytesSolidity.length);
			byte[] bytesCount = count.getBytes();
			// System.out.println("Controller solidiyCount : " + count);
			outputData.write(bytesCount);
			
    		// 코드 용량 송신 확인
			inputData.read(confirm);
			
			// 코드 송신
			// System.out.println("Controller solidity: " + solidity);
			
            int max = 65000;
            int loopSize = bytesSolidity.length;
            // System.out.println("loopSize : " + loopSize);
            int loopCount = 0;
            int remain = 0;

            loopCount = loopSize / max;
            remain = loopSize % max;
            
            int i = 0;
            for(i = 0; i < loopCount; i++) {
            	outputData.write(bytesSolidity, (i * max), max);
            }
            outputData.write(bytesSolidity, (i * max), remain);
            
    		// System.out.println("loopCount : " + loopCount);
    		// System.out.println("remain : " + remain);
    		
			// 결과 용량 수신
    		byte[] receiveBuffer = new byte[1024];
    		inputData.read(receiveBuffer);
    		String strSize = new String(receiveBuffer);
    		strSize = strSize.trim();
    		int size = 0;
    		size = Integer.parseInt(strSize);
    		// System.out.println("Controller resultCount : " + size);
    		
    		// 결과 용량 수신 확인
    		outputData.write(confirm);
    		
			// 결과 수신
    		byte[] bytesResult = new byte[size];
    		inputData.read(bytesResult);
    		result = new String(bytesResult);
    		// System.out.println("Controller result: " + result);
    		
			socket.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		result = result.trim();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("output", result);
		
		System.out.println("result : " + result);
		
		parser = new JSONParser();
		jsonObject = null;
		try {
			jsonObject = (JSONObject) parser.parse(result);
		} catch (ParseException e) {
			e.printStackTrace();
			
		}
		
		HashMap<String,Object> resultMap = new Gson().fromJson(jsonObject.toString(), HashMap.class);

		
//		// DB Connection
//		try {
//			IssuesVO issuesVO = issuesService.selectCount();
//			System.out.println("issues count : " + issuesVO.getIssuesCount());
//			
//			ContractCountVO contractVO = contractService.selectCount();
//			System.out.println("contract count : " + contractVO.getContractCount());
//			
//			List<VulnerabilityVO> vulnerabilityVOList = vulnerabilityService.selectAll();
//			for (VulnerabilityVO vo : vulnerabilityVOList) {
//				System.out.println(vo.getId() + " : " + vo.getTitle() + " : " + vo.getContent());
//			}
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		return resultMap;
	}
}
