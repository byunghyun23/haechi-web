package com.web.haechi.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.web.haechi.service.ContractImpl;
import com.web.haechi.service.IssuesImpl;
import com.web.haechi.service.VulnerabilityImpl;
import com.web.haechi.vo.ContractCountVO;
import com.web.haechi.vo.VulnerabilityVO;

@Controller
public class SubmitController {
	@Autowired
	private ContractImpl contractImpl;
	
	@Autowired
	private VulnerabilityImpl vulnerabilityImpl;
	
	@Autowired
	private IssuesImpl issuesImpl;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> submit(@RequestBody String json, HttpServletRequest request) {
		JSONParser parser = new JSONParser();
		JSONObject jsonObject = null;
		try {
			jsonObject = (JSONObject) parser.parse(json); 
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		String solidity = (String) jsonObject.get("input");
		String ip = request.getRemoteAddr();
//		System.out.println("solidity code : " + solidity);
		
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
			
			byte[] bytesSolidity = solidity.getBytes();
			String count = Integer.toString(bytesSolidity.length);
			byte[] bytesCount = count.getBytes();
			// System.out.println("Controller solidiyCount : " + count);
			outputData.write(bytesCount);
			
			inputData.read(confirm);
			
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
    		
    		byte[] receiveBuffer = new byte[1024];
    		inputData.read(receiveBuffer);
    		String strSize = new String(receiveBuffer);
    		strSize = strSize.trim();
    		int size = 0;
    		size = Integer.parseInt(strSize);
    		// System.out.println("Controller resultCount : " + size);
    		
    		outputData.write(confirm);
    		
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
		if ("error".equals(result)) {
			System.out.println("Generate Error.");
			new Exception();
		}
		
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
		
		HashMap<String, Object> resultMap = new Gson().fromJson(jsonObject.toString(), HashMap.class);
		
		try {
			if (!resultMap.containsKey("error")) {
				// solidity code 저장
				int contractId = -1;
				
				HashMap<Object, Object> contractMap = new HashMap<Object, Object>();
				contractMap.put("code", solidity);
				contractMap.put("ip", ip);
				try {
					contractImpl.insertContract(contractMap);
				} catch (Exception e2) {
					// TODO Auto-generated catch block
					contractId = -2;
					e2.printStackTrace();
				}
				
				if (contractId != -2) {
					try {
						ContractCountVO contractCountVO = contractImpl.selectMAX();
						contractId = contractCountVO.getContractCount();
					} catch (Exception e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
				}
				
				
				List<VulnerabilityVO> vulnerabilityVOList;
				vulnerabilityVOList = vulnerabilityImpl.selectAll();
				
				HashMap<Object, Object> vulnerabilityMap = new HashMap<Object, Object>();
				
				for (VulnerabilityVO vo : vulnerabilityVOList) {
					vulnerabilityMap.put(vo.getTitle(), vo.getId());
				}
				
				for(Map.Entry<String, Object> element : resultMap.entrySet() ){
				    String key = element.getKey();
				    Object value = element.getValue();
				    int vulnerabilityId = (int) vulnerabilityMap.get(key);
				    
				    ArrayList<Double> lineList = (ArrayList<Double>) value;
				    
				    if (lineList != null) {
				    	for (double line : lineList) {
				    		// issue 저장
				    		if (contractId != -2 && contractId != -1) {
				    			HashMap<Object, Object> issueMap = new HashMap<Object, Object>();
					    		issueMap.put("contracId", contractId);
					    		issueMap.put("vulnerabilityId", vulnerabilityId);
					    		issueMap.put("line", (int) line);
					    		issuesImpl.insertIssue(issueMap);
				    		}
					    }
				    }
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resultMap;
	}
}
