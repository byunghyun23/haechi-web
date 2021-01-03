<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.Vector"%>
<%@ page import = "java.util.Map" %>
<%@ page import = "java.util.ArrayList" %>
<%@ page import = "java.util.HashMap" %>
<%@ page import = "java.util.List" %>
<!DOCTYPE html>
<html>
    <head>
        <title>HAECHI - Smart Contract Scanner</title>
        <link rel="shortcut icon" type = "image/x-icon" href = "./zeze.ico">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link type = "text/css" rel = "stylesheet" href = "./resources/css/main.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="./resources/js/js.js?v=<%=System.currentTimeMillis()%>"></script>
		
        <style>
            table {
                border-collapse: collapse;
            }
            .tr {
                border-bottom: 1px solid rgb(219, 217, 245);
            }
            td {
                padding: 10px;
                font-size: 1.2rem;
            }
            #1 {
            	font-size: font-size: 2rem;
            }
            .left {
				float: left;
			}
			.title1 {
				font-size: 2.3rem;
			}
			.comment2 {
				font-size: 1.5rem;
			}
			.content4 {
				float: left;
				font-size: 1.3rem;
			}
        </style>
    </head>
    <body>
    	<div id = "temp" style = "display:none;"></div>
        <div id = "main">
            <div id = "header">
            </div>
            <div id = "nav">
                <div class = "nav_list">
                    <ul class = nav_ul>
                        <li class = "nav_list1">
                            <a id = "home" class = "nav_link1" href = "/"> HAECHI </a></li>
                       
                        <!-- <li class = "right_nav" class = "nav_list1">
                            <a class = "nav_link6" href = "javascript:"> LOGIN </a>
                        </li>
                        <li class = "right_nav" class = "nav_list1"><a href = "javascript:"> VULNERABILITY </a></li>
                         -->
                    </ul>  
                </div>
            </div>
            <div id = "desc">
            	<span id = "keyword">HAECHI</span> automatically checks Smart Contracts for vulnerabilities and bad practices - it <span id = "highlight"></span>gives a detailed explanation of the problem. We already use it in our security audits. HAECHI engine is now 
            	<a id = "oc" href = "https://github.com/PLASS-Lab/SmartContractWeaknessAnalyzer">open source</a>
            </div>
            <div id = "issue">
            	<br>
            	<%
            	%>
            	<span id = "num_of_scan">${contractCount}</span> Contracts scanned<br>
            	<span id = "num_of_issue">${issuesCount}</span> Issues found<br>
            </div>
            
            <div id = "inputs">
            	<form id = "solidiyForm" name = "solidityForm" action = "javascript:onSubmit('${contractCount}', '${issuesCount}')" method="POST">
            		<p class = "title">Solidity Code</p>
					<input id = "scan" type = "submit" value = "SCAN" style="height:45px; width:200px;">
					
					<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js"></script>  -->
					<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js"></script>
					
					<!-- Ace $(".ace_text-layer").text()ê° íì¤í¸ì-->
					<!--  $('.ace_content').text()  -->
					<!-- $(".ace_gutter-layer").children().eq(2).css("background-color","red");  $(".ace_text-layer").children().eq(2).css("background-color","red");-->

					<style type="text/css" media="screen">
					pre {
						overflow: hidden;
					}

				    #editor {
				    	position: absolute;
				        width: 100%;
				        height: 450px;
				    }
					</style>
					
					<pre id="editor">
pragma solidity^0.4.25;
contract TxUserWallet 
{    
    address owner;    
    function TxUserWallet() public { 
        owner = msg.sender;    
    }    
    function transferTo(address dest, uint amount) public {
        require(tx.origin == owner);
        dest.transfer(amount);   
    }
}
					</pre>
					<script>
					var editor = ace.edit("editor");
					editor.setTheme("ace/theme/nord_dark");
					editor.session.setMode("ace/mode/javascript");
					</script>
					<!-- Ace -->

            		<!-- <textarea class="form-control" spellcheck="false" autofocus id = "solidity" name = 'solidity' rows = "32" cols  ="70" style = "resize:none; width: 100%;"></textarea> -->
            	</form>
            </div>
            <div class = "side" id = "release">
            	<p class = "title">News</p><br><br><br>
            	<ul id = "release_ul">
            		<%
            			/*
            			Vector<NewsBean> newsList = nMgr.getNews();
            			int newsCount = newsList.size();
            			for(int i = newsCount - 1; i >= 0; i--) {
            				NewsBean bean = newsList.get(i);
            				String title = bean.getTitle();
            				String date = bean.getDate();
            				String content = bean.getContent();
            				*/
            				String title = "title";
            				String date = "date";
            				String content = "content";
            		%>
	                <li>
	                   <p class = "release_title"><%=title%></p>
	                   <p class = "release_date"><%=date%></p>
	                   <p class = "release_text"><%=content%></p>        
	                </li>
					<%
            			// }
					%>
	           </ul>
            </div>
            <div class = "side" id = "check">
				<p class = "title">Results</p><br><br><br>
				 <%
           			// Object cId = session.getAttribute("results");
            		
            		/*
            			Vector<VulnerabilityBean> vulnerabilityList = vMgr.getVulnerabilitys();
            			int vulnerabilityCount = vulnerabilityList.size();
            			List<String> titleList = new ArrayList<String>();
            			List<String> contentList = new ArrayList<String>();
            			
            			for(int i = 0; i < vulnerabilityCount; i++) {
            				VulnerabilityBean bean = vulnerabilityList.get(i);
            				String title = bean.getTitle();
            				String content = bean.getContent();
            				int implement = bean.getImplement();
            				titleList.add(title);
            				contentList.add(content);
            				
            			}
            		*/
            		
        			List<String> titleList = new ArrayList<String>();
        			List<String> contentList = new ArrayList<String>();
        			for (int i = 0; i < 8; i++) {
        				titleList.add("1");
        				contentList.add("1");
        			}
	            %>
            	<ul id = "release_ul">
           			<li>
		                <a class = "result_link" href = "javascript:click(1)">
		                   <p id = "title1" class = "error_title"><%= titleList.get(0)%></p>
		                </a>       
		                   <p id = "content1" class = "release_text"><%= contentList.get(0)%></p>
		                   <p id = "line1" class = "release_date"></p>
		            </li>
           			<li>
		                <a class = "result_link" href = "javascript:click(2)">
		                   <p id = "title2" class = "error_title"><%= titleList.get(1)%></p>  
		                </a>   
		                   <p id = "content2" class = "release_text"><%= contentList.get(1)%></p>
		                   <p id = "line2" class = "release_date"></p>
		                  
		            </li>
		            <li>
		                <a class = "result_link" href = "javascript:click(3)">
		                   <p id = "title3" class = "error_title"><%= titleList.get(2)%></p>     
		                </a>
		                   <p id = "content3" class = "release_text"><%= contentList.get(2)%></p>
		                   <p id = "line3" class = "release_date"></p>
		            </li>
		            <!-- 
		            <li>
		                <a class = "result_link" href = "javascript:click(4)">
		                   <p id = "title4" class = "error_title"><%= titleList.get(3)%></p>     
		                </a>
		                   <p id = "content4" class = "release_text"><%= contentList.get(3)%></p>
		                   <p id = "line4" class = "release_date"></p>
  
		            </li>
		             -->
		            <li>
		                <a class = "result_link" href = "javascript:click(5)">
		                   <p id = "title5" class = "error_title"><%= titleList.get(4)%></p>     
		                </a>
		                   <p id = "content5" class = "release_text"><%= contentList.get(4)%></p>
		                   <p id = "line5" class = "release_date"></p>
  
		            </li>
       				<li>
		                <a class = "result_link" href = "javascript:click(6)">
		                   <p id = "title6" class = "error_title"><%= titleList.get(5)%></p>  
		                </a>   
		                   <p id = "content6" class = "release_text"><%= contentList.get(5)%></p>
		                   <p id = "line6" class = "release_date"></p>
  
		            </li>
		            <li>
		                <a class = "result_link" href = "javascript:click(7)">
		                   <p id = "title7" class = "error_title"><%= titleList.get(6)%></p> 
		                </a>     
		                   <p id = "content7" class = "release_text"><%= contentList.get(6)%></p>
		                   <p id = "line7" class = "release_date"></p>
 
		            </li>
		            <li>
		                <a class = "result_link" href = "javascript:click(8)">
		                   <p id = "title8" class = "error_title"><%= titleList.get(7)%></p>  
		                </a>    
		                   <p id = "content8" class = "release_text"><%= contentList.get(7)%></p>
		                   <p id = "line8" class = "release_date"></p> 
		            </li>				            				            
	           </ul>
	           
            </div> <!-- side -->
            <div id = "results1" class = "result">
				<div class = "title1">DoSAttack</div><br>
				<div class = "comment2">The exception is to protect the data caused by bad transactions. However, an attacker could use an exception code to prevent the contract from doing this.</div>
				<div class = "menu3"><br>
					<a class = "result_link" href = "javascript:select(1)">
						<div class = "left" class = "rec">
							RECOMMENDATION
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(2)">
						<div class = "left" class = "eg">
							EXAMPLE
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(3)">
						<div class = "left" class = "link">
							LINKS
						</div>
					</a>
				</div>
				<div class = "event1">
					This can be prevented by separating the vulnerable parts of DoS attack into separate transactions.
				</div>
				<div class = "event2">
					<pre>
contract TestLoop {
    address owner = msg.sender;
    uint i = 5;

    function testWhile(uint amount) public{
        while(i > 0) {
            require(tx.origin == owner);
            msg.sender.transfer(amount);
            i--;
        }
    }
}

					</pre>
				</div>
				<div class = "event3">
					<a class = "result_link" href = "http://consensys.github.io/smart-contract-best-practices/known_attacks/#dos-with-unexpected-revert">
						1. Known Attacks : DoS with revert
					</a>
				</div><br><br>
            </div>
            <div id = "results2" class = "result">
				<div class = "title1">None Access Modifier</div><br>
				<div class = "comment2">Solidity defaults to the internal accessor of the contract's internal variables, and the function to public.</div>
				<div class = "menu3"><br>
					<a class = "result_link" href = "javascript:select(1)">
						<div class = "left" class = "rec">
							RECOMMENDATION
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(2)">
						<div class = "left" class = "eg">
							EXAMPLE
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(3)">
						<div class = "left" class = "link">
							LINKS
						</div>
					</a>
				</div>
				<div class = "event1">
					When writing solidity code, the access specifier must be explicitly stated.
				</div>
				<div class = "event2">
					<pre>
contact WalletLibrary {

    function initWallet(address[] owners, uint required, uint daylimit) {
        //
    }

    function initMultiowned(address[] owners, uint required) {
        //
    }
}					
					</pre>
				</div>
				<div class = "event3">
					<a class = "result_link" href = "http://solidity.readthedocs.io/en/v0.4.24/common-patterns.html#restricting-access">
						1. Restricting Access
					</a>
				</div><br><br>
            </div>
            <div id = "results3" class = "result">
				<div class = "title1">Overflow</div><br>
				<div class = "comment2">Overflow is a flaw that causes errors or program security vulnerabilities when a process enters data that exceeds the maximum size when storing data.</div>
				<div class = "menu3"><br>
					<a class = "result_link" href = "javascript:select(1)">
						<div class = "left" class = "rec">
							RECOMMENDATION
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(2)">
						<div class = "left" class = "eg">
							EXAMPLE
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(3)">
						<div class = "left" class = "link">
							LINKS
						</div>
					</a>
				</div>
				<div class = "event1">
					Check the boundary before using the data to eliminate the possibility of defects.
				</div>
				<div class = "event2">
					<pre>
contract Overflow {
    uint public max = 2**256 - 1;

    function incerement() public {
        max += 1;
    }
}
					</pre>
				</div>
				<div class = "event3">
					<a class = "result_link" href = "http://consensys.github.io/smart-contract-best-practices/known_attacks/#integer-overflow-and-underflow">
						1. Integer Overflow and Underflow 
					</a>
				</div><br><br>
            </div>
            <div id = "results4" class = "result">
				<div class = "title1">Underflow</div><br>
				<div class = "comment2">Underflow is a flaw that causes errors or program security vulnerabilities when a process enters data that exceeds the maximum size when storing data.</div>
				<div class = "menu3"><br>
					<a class = "result_link" href = "javascript:select(1)">
						<div class = "left" class = "rec">
							RECOMMENDATION
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(2)">
						<div class = "left" class = "eg">
							EXAMPLE
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(3)">
						<div class = "left" class = "link">
							LINKS
						</div>
					</a>
				</div>
				<div class = "event1">
					Check the boundary before using the data to eliminate the possibility of defects.
				</div>
				<div class = "event2">
					<pre>
contract Underflow {
    uint public zero = 0;

    function decrement() public {
        zero -= 1;
    }
}					
					</pre>
				</div>
				<div class = "event3">
					<a class = "result_link" href = "http://consensys.github.io/smart-contract-best-practices/known_attacks/#integer-overflow-and-underflow">
						1. Integer Overflow and Underflow 
					</a>
				</div><br><br>
            </div>
            <div id = "results5" class = "result">
				<div class = "title1">Reentrancy</div><br>
				<div class = "comment2">When the user manages the Ether balance remitted to the contract by user, a problem may occur if the balance is withdrawn using a function.</div>
				<div class = "menu3"><br>
					<a class = "result_link" href = "javascript:select(1)">
						<div class = "left" class = "rec">
							RECOMMENDATION
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(2)">
						<div class = "left" class = "eg">
							EXAMPLE
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(3)">
						<div class = "left" class = "link">
							LINKS
						</div>
					</a>
				</div>
				<div class = "event1">
					Use 'mutex' to disable reentry.
				</div>
				<div class = "event2">
					<pre>
contract Mallory {
    SimpleDAO dao;
    mapping (address => uint) userBalance;

    function func() public {
        dao.withdraw();
    }
    function() external { 
        dao.withdraw();
    }
    function testFunc() public {
        dao.withdraw();
        func();
    }
    function notitle() public {
        dao.withdraw();
    }
    function getBalance(address u) public view returns(uint){
        return userBalance[u];
    }
}

contract SimpleDAO {
    Mallory mallory;
    mapping (address => uint) public credit;

    function withdraw() public {
        Mallory mal;
        address adrr;
        mallory.testFunc(); 
        mal.func();
        adrr = tx.origin;
    }
}			
					</pre>
				</div>
				<div class = "event3">
					<a class = "result_link" href = "http://consensys.github.io/smart-contract-best-practices/known_attacks/#reentrancy">
						1. Reentrancy
					</a>
				</div><br><br>
            </div>
            <div id = "results6" class = "result">
				<div class = "title1">Transfer Ether</div><br>
				<div class = "comment2">If the external calling code is written inside the function, you can use it without considering the characteristics of each function to make unexpected external calling.</div>
				<div class = "menu3"><br>
					<a class = "result_link" href = "javascript:select(1)">
						<div class = "left" class = "rec">
							RECOMMENDATION
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(2)">
						<div class = "left" class = "eg">
							EXAMPLE
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(3)">
						<div class = "left" class = "link">
							LINKS
						</div>
					</a>
				</div>
				<div class = "event1">
					Using address.transfer () to only handle Ether currently sent can prevent unexpected security risks.
				</div>
				<div class = "event2">
					<pre>
contract SimpleDAO {
  mapping (address => uint) public credit;
    
  function donate(address to) payable public{
    credit[to] += msg.value;
  }
    
  function withdraw(uint amount) public{
    if (credit[msg.sender]>= amount) {
      require(msg.sender.call.value(amount)());
      credit[msg.sender]-=amount;
    }
  }  
  
}					
					</pre>
				</div>
				<div class = "event3">
					<a class = "result_link" href = "https://swcregistry.io/docs/SWC-107">
						1. SWC-107 : Reentrancy
					</a>
				</div><br><br>
            </div>
            <div id = "results7" class = "result">
				<div class = "title1">Use tx.origin</div><br>
				<div class = "comment2">tx.origin contains the value of the initial producer address of the transaction.</div>
				<div class = "menu3"><br>
					<a class = "result_link" href = "javascript:select(1)">
						<div class = "left" class = "rec">
							RECOMMENDATION
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(2)">
						<div class = "left" class = "eg">
							EXAMPLE
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(3)">
						<div class = "left" class = "link">
							LINKS
						</div>
					</a>
				</div>
				<div class = "event1">
					Avoid using tx.origin and if you need to know the origin address, you can solve it by connecting the address you originally distributed the contract to as a parameter.
				</div>
				<div class = "event2">
					<pre>
contract TxUserWallet {

    address owner;

    function TxUserWallet() public {
        owner = msg.sender;
    }

    function transferTo(address dest, uint amount) public {
        require(tx.origin == owner);
        dest.transfer(amount);
    }
}
					</pre>
				</div>
				<div class = "event3">
					<a class = "result_link" href = "http://swcregistry.io/docs/SWC-115">
						1. SWC-115 : Authorization through tx.origin
					</a>
				</div><br><br>
            </div>
            <div id = "results8" class = "result">
				<div class = "title1">Multiple Inheritance</div><br>
				<div class = "comment2">Solidity handles the most recently inherited contract if ambiguity occurs in multiple inheritance relationships.</div>
				<div class = "menu3"><br>
					<a class = "result_link" href = "javascript:select(1)">
						<div class = "left" class = "rec">
							RECOMMENDATION
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(2)">
						<div class = "left" class = "eg">
							EXAMPLE
						</div>
					</a>
					<a class = "result_link" href = "javascript:select(3)">
						<div class = "left" class = "link">
							LINKS
						</div>
					</a>
				</div>
				<div class = "event1">
					When using inheritance in Solidity, the compiler does not recognize it as an error, so avoid multiple inheritance to prevent unintended errors.
				</div>
				<div class = "event2">
					<pre>
contract owned {
    function owned() public {
        owner = msg.sender;
    }
    address owner;
}

contract mortal is owned {
    function kill() public {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }
}

contract Base1 is mortal {
    function kill() public {
        super.kill();
    }
}

contract Base2 is mortal {
    function kill() public {
        super.kill();
    }
}

contract Final is Base1, Base2 {
    
}
					</pre>
				</div>
				<div class = "event3">
					<a class = "result_link" href = "https://solidity.readthedocs.io/en/v0.4.24/contracts.html#multiple-inheritance-and-linearization">
						1. Multiple Inheritance and Linearization
					</a>
				</div><br><br>
            </div>
         
            
        </div>
        <div id = "mask"></div>
        <div id = "blank"> </div>
        <div id = "footer">
            <div id = "footer_content">
            	Copyright 2019. PL
            </div>
        </div>

		

    </body>
</html>
