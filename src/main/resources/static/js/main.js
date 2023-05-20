var width = window.innerWidth;
var height = window.innerHeight;
var body_margin = (width * 15) / 100;
var body_width = (width * 70) / 100;

$(document).ready(function() {
    $("body").css("background-size", width + "px " + 400 + "px");
   
    var loading = $('<img alt="loading" id="loadingImg" src="resources/image/ajax-loader.gif">').appendTo(document.body).hide();
    
    $(window)
    	.ajaxStart(function(){
		   loading.show();
		   wrapWindowByMask();
		})
		.ajaxStop(function(){
		   loading.hide();
		   $('#mask').hide();
		});
});

$(window).resize(function() {
    width = window.innerWidth;
    height = window.innerHeight;
    body_margin = (width * 15) / 100;
    body_width = (width * 70) / 100;
    if (width > 1250) {
        $("body").css("background-size", width + "px " + 400 + "px");
    }
});

function wrapWindowByMask(){
	//화면의 높이와 너비를 구한다.
	var maskHeight = $(document).height();  
	var maskWidth = $(window).width();  
	
	//마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
	$('#mask').css({'width':maskWidth,'height':maskHeight});  
	
	//애니메이션 효과 - 일단 1초동안 까맣게 됐다가 80% 불투명도로 간다.
//	$('#mask').fadeIn(1000);      
	$('#mask').fadeTo("slow", 0.8);
}

////////////////

function select(num) {
	switch (num) {
	case 1:
		$(".event1").css("display", "inline");
		$(".rec").css("font-weight", "900");
		$(".event2").css("display", "none");
		$(".eg").css("font-weight", "normal");
		$(".event3").css("display", "none");
		$(".link").css("font-weight", "normal");
		
		$(".rec").css("color", "green");
		$(".eg").css("color", "black");
		$(".link").css("color", "black");
//		document.getElementByClassName(".event1").scrollIntoView();
		break;
	case 2:
		$(".event1").css("display", "none");
		$(".rec").css("font-weight", "normal");
		$(".event2").css("display", "inline");
		$(".eg").css("font-weight", "900");
		$(".event3").css("display", "none");
		$(".link").css("font-weight", "normal");
		
		$(".rec").css("color", "black");
		$(".eg").css("color", "green");
		$(".link").css("color", "black");
//		document.getElementByClassName(".event2").scrollIntoView();
		break;
	case 3:
		$(".event1").css("display", "none");
		$(".rec").css("font-weight", "normal");
		$(".event2").css("display", "none");
		$(".eg").css("font-weight", "normal");
		$(".event3").css("display", "inline");
		$(".link").css("font-weight", "900");
		
		$(".rec").css("color", "black");
		$(".eg").css("color", "black");
		$(".link").css("color", "green");
//		document.getElementByClassName(".event3").scrollIntoView();
		break;
	}
}
function click(num) {
	switch (num) {
	case 1:
		$(".result").css("display", "none");
        $("#results1").css("display", "inline");
        document.getElementById("results1").scrollIntoView();
		break;
	case 2:
		$(".result").css("display", "none");
        $("#results2").css("display", "inline");
        document.getElementById("results2").scrollIntoView();
		break;
	case 3:
		$(".result").css("display", "none");
        $("#results3").css("display", "inline");
        document.getElementById("results3").scrollIntoView();
		break;
	case 4:
		$(".result").css("display", "none");;
        $("#result4").css("display", "inline");
        document.getElementById("results4").scrollIntoView();
		break;
	case 5:
		$(".result").css("display", "none");
        $("#results5").css("display", "inline");
        document.getElementById("results5").scrollIntoView();
		break;
	case 6:
		$(".result").css("display", "none");
        $("#results6").css("display", "inline");
        document.getElementById("results6").scrollIntoView();
		break;
	case 7:
		$(".result").css("display", "none");
        $("#results7").css("display", "inline");
        document.getElementById("results7").scrollIntoView();
		break;
	case 8:
		$(".result").css("display", "none");
        $("#results8").css("display", "inline");
        document.getElementById("results8").scrollIntoView();
		break;
	}
}

function onSubmit(contractCount, issuesCount) {
	$(".result").css("display", "none");
	
	var solidity = "";
	var count = 0;
	/*
	$('.ace_line').each(function(index, item) {
		solidity += $(item).text() + "\r\n";
	});
	*/
	var editor = ace.edit("editor");
	solidity = editor.getSession().getValue();
	
	var formData = {
		input : solidity
	};
	
	
	// issueLine
	var err = false;
	
	$.ajax({            	
    	url: "http://localhost:8080/submit",
		type: "POST",
		data: JSON.stringify(formData),
//		async: false,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
	        success : function(data){
	        	
	            // alert(JSON.stringify(data));
//	            console.log(JSON.stringify(data));
	         	var Range = ace.require('ace/range').Range;
	         	
	         	var selected = -1
	         	
	   	        for (var key in data) {
//	   	        	console.log(key, data[key]);
	   	        	
	   	        	// 에러 확인
	   	        	if ("error" == key) {
	   	        		alert(key + ' : ' + data[key]);
	   	        		err = true;
	   	        		break;
	   	        	}
	   	        	
	   	        	var result = data[key];
	   	        	
//	   	        	console.log(result);
	   	        	switch (key) {
	   	        	case "DoSAttack" :
					    if(result == null) {
					    	$("#line1").html("Not yet implemented");
					    }
					    else if(result.length === 0) {
					    	$("#line1").html("None");
					    }
					    else {
					    	var list = "<ul style = 'list-style:none'>";
					    	var last = 1; 
					    	
					    	for (var i = 0; i < result.length; i++) {
					    		last = result[i];
					    		editor.session.addMarker(new Range(last - 1, 0, last - 1, 1), "myMarker", "fullLine");
					    		list += "<li class='line'><a href='javascript:void(0);' onclick='editor.focus(); editor.gotoLine(" + last + ");'>[" + last + "]</a></li>";
					    	}
					    	list += "</ul>";
					    	$("#line1").html(list);
					    	editor.focus();
					    	editor.gotoLine(last);
					    	
					    	selected = 1;
					    }
					    
	   	        		break;
	   	        	case "None Access Modifier" :
					    if(result == null) {
					    	$("#line2").html("Not yet implemented");
					    }
					  	else if(result.length === 0) {
					    	$("#line2").html("None");
					    }
					    else {
					    	var list = "<ul style = 'list-style:none'>";
					    	var last = 1; 
					    	
					    	for (var i = 0; i < result.length; i++) {
					    		last = result[i];
					    		editor.session.addMarker(new Range(last - 1, 0, last - 1, 1), "myMarker", "fullLine");
					    		list += "<li class='line'><a href='javascript:void(0);' onclick='editor.focus(); editor.gotoLine(" + last + ");'>[" + last + "]</a></li>";
					    	}
					    	list += "</ul>";
					    	$("#line2").html(list);
					    	editor.focus();
					    	editor.gotoLine(last);
					    	
					    	selected = 2;
					    }
					    
	   	        		break;
	   	        	case "Overflow" :
					    if(result == null) {
					    	$("#line3").html("Not yet implemented");
					    }
					  	else if(result.length === 0) {
					    	$("#line3").html("None");
					    }
					    else {
					    	var list = "<ul style = 'list-style:none'>";
					    	var last = 1; 
					    	
					    	for (var i = 0; i < result.length; i++) {
					    		last = result[i];
					    		editor.session.addMarker(new Range(last - 1, 0, last - 1, 1), "myMarker", "fullLine");
					    		list += "<li class='line'><a href='javascript:void(0);' onclick='editor.focus(); editor.gotoLine(" + last + ");'>[" + last + "]</a></li>";
					    	}
					    	list += "</ul>";
					    	$("#line3").html(list);
					    	editor.focus();
					    	editor.gotoLine(last);
					    	
					    	selected = 3;
					    }
					    
	   	        		break;
	   	        	case "Underflow" :
					    if(result == null) {
					    	$("#line4").html("Not yet implemented");
					    }
					  	else if(result.length === 0) {
					    	$("#line4").html("None");
					    }
					    else {
					    	var list = "<ul style = 'list-style:none'>";
					    	var last = 1; 
					    	
					    	for (var i = 0; i < result.length; i++) {
					    		last = result[i];
					    		editor.session.addMarker(new Range(last - 1, 0, last - 1, 1), "myMarker", "fullLine");
					    		list += "<li class='line'><a href='javascript:void(0);' onclick='editor.focus(); editor.gotoLine(" + last + ");'>[" + last + "]</a></li>";
					    	}
					    	list += "</ul>";
					    	$("#line4").html(list);
					    	editor.focus();
					    	editor.gotoLine(last);
					    	
					    	selected = 4;
					    }
					    
	   	        		break;
	   	        	case "Reentrancy" :
	  					if(result == null) {
	  						$("#line5").html("Not yet implemented");
	  					}
	  					else if(result.length === 0) {
						    	$("#line5").html("None");
						    }
	  					else {
	  						var list = "<ul style = 'list-style:none'>";
					    	var last = 1; 
					    	
					    	for (var i = 0; i < result.length; i++) {
					    		last = result[i];
					    		editor.session.addMarker(new Range(last - 1, 0, last - 1, 1), "myMarker", "fullLine");
					    		list += "<li class='line'><a href='javascript:void(0);' onclick='editor.focus(); editor.gotoLine(" + last + ");'>[" + last + "]</a></li>";
					    	}
					    	list += "</ul>";
					    	$("#line5").html(list);
					    	editor.focus();
					    	editor.gotoLine(last);
					    	
					    	selected = 5;
	  					}
	  					
	   	        		break;
	//   	        	case "Reentrancy : Transfer Ether" :
	   	        	case "Transfer Ether" :
					    if(result == null) {
					    	$("#line6").html("Not yet implemented");
					    }
					  	else if(result.length === 0) {
					    	$("#line6").html("None");
					    }
					    else {
					    	var list = "<ul style = 'list-style:none'>";
					    	var last = 1; 
					    	
					    	for (var i = 0; i < result.length; i++) {
					    		last = result[i];
					    		editor.session.addMarker(new Range(last - 1, 0, last - 1, 1), "myMarker", "fullLine");
					    		list += "<li class='line'><a href='javascript:void(0);' onclick='editor.focus(); editor.gotoLine(" + last + ");'>[" + last + "]</a></li>";
					    	}
					    	list += "</ul>";
					    	$("#line6").html(list);
					    	editor.focus();
					    	editor.gotoLine(last);
					    	
					    	selected = 6;
						}
					    
	   	        		break;
	//   	        	case "tx-origin" :
	   	        	case "Use tx.origin" :
					    if(result == null) {
					    	$("#line7").html("Not yet implemented");
					    }
					    else if(result.length === 0) {
					    	$("#line7").html("None");
					    }
					    else {
					    	var list = "<ul style = 'list-style:none'>";
					    	var last = 1; 
					    	
					    	for (var i = 0; i < result.length; i++) {
					    		last = result[i];
					    		editor.session.addMarker(new Range(last - 1, 0, last - 1, 1), "myMarker", "fullLine");
					    		list += "<li class='line'><a href='javascript:void(0);' onclick='editor.focus(); editor.gotoLine(" + last + ");'>[" + last + "]</a></li>";
					    	}
					    	list += "</ul>";
					    	$("#line7").html(list);
					    	editor.focus();
					    	editor.gotoLine(last);
					    	
					    	selected = 7;
					    }
					    
	   	        		break;
	//   	        	case "Contract characteristics : Multiple Inheritance" :
	   	        	case "Multiple Inheritance" :
					    if(result == null) {
					    	$("#line8").html("Not yet implemented");
					    }
					  	else if(result.length === 0) {
					    	$("#line8").html("None");
					    }
					    else {
					    	var list = "<ul style = 'list-style:none'>";
					    	var last = 1; 
					    	
					    	for (var i = 0; i < result.length; i++) {
					    		last = result[i];
					    		editor.session.addMarker(new Range(last - 1, 0, last - 1, 1), "myMarker", "fullLine");
					    		list += "<li class='line'><a href='javascript:void(0);' onclick='editor.focus(); editor.gotoLine(" + last + ");'>[" + last + "]</a></li>";
					    	}
					    	list += "</ul>";
					    	$("#line8").html(list);
					    	editor.focus();
					    	editor.gotoLine(last);
					    	
					    	selected = 8;
					    }
					    
	   	        		break;
	   	        	}
	   	        }
   	        
	         	if (err == false) {
	         		$("#release").hide();
		   	     	$("#check").show();
		   	     	
		   	     	if (selected != -1) {
		   	     		click(selected);
		   	     		select(1);
		   	     	}
		   	     	
		   	     	
		   	     	// issueInfo
		   			$.ajax({            	
		   		    	url: "http://localhost:8080/issueInfo",
		   				type: "GET",
//		   				data: JSON.stringify(formData),
		   				dataType: "json",
		   				global: false,
		   				contentType: "application/json; charset=utf-8",
		   			        success : function(info_data){
//		   			        	console.log('issueInfo success')
//		   			        	console.log(data);
		   			        	
		   			        	for (var title in info_data) {
//		   			        		console.log('results')
//		   			   	        	console.log(title, data[title]);
		   			   	        	
		   			   	        	var subMap = info_data[title];
		   			   	        	var comment = subMap['comment'];
		   			   	        	var content = subMap['content'];
		   			   	        	var recommendation = subMap['recommendation'];
		   			   	        	var example = subMap['example'];
		   			   	        	var links = subMap['links'];
		   			   	        	var href = subMap['href'];
		   			   	        	
		   			   	        	switch (title) {
		   			   	        	case "DoSAttack" :
		   			   	        		$("#title1").html(title);
		   				   	        	$("#content1").html(content);
		   				   	        	$("#results1 > .title1").html(title);
		   				   	        	$("#results1 > .comment2").html(comment);
		   				   	        	$("#results1 > .event1").html(recommendation);
		   				   	        	$("#results1 > .event2 > pre").html(example);
		   				   	        	$("#results1 > .event3 > a").html(links);
		   				   	        	$("#results1 > .event3 > a").attr('href', href);
		   			   	        		break;
		   			   	        	case "None Access Modifier" :
		   			   	        		$("#title2").html(title);
		   				   	        	$("#content2").html(content);
		   				   	        	$("#results2 > .title1").html(title);
		   				   	        	$("#results2 > .comment2").html(comment);
		   				   	        	$("#results2 > .event1").html(recommendation);
		   				   	        	$("#results2 > .event2 > pre").html(example);
		   				   	        	$("#results2 > .event3 > a").html(links);
		   				   	        	$("#results2 > .event3 > a").attr('href', href);
		   			   	        		break;
		   			   	        	case "Overflow" :
		   			   	        		$("#title3").html(title);
		   				   	        	$("#content3").html(content);
		   				   	        	$("#results3 > .title1").html(title);
		   				   	        	$("#results3 > .comment2").html(comment);
		   				   	        	$("#results3 > .event1").html(recommendation);
		   				   	        	$("#results3 > .event2 > pre").html(example);
		   				   	        	$("#results3 > .event3 > a").html(links);
		   				   	        	$("#results3 > .event3 > a").attr('href', href);
		   			   	        		break;
		   			   	        	case "Reentrancy" :
		   			   	        		$("#title5").html(title);
		   				   	        	$("#content5").html(content);
		   				   	        	$("#results5 > .title1").html(title);
		   				   	        	$("#results5 > .comment2").html(comment);
		   				   	        	$("#results5 > .event1").html(recommendation);
		   				   	        	$("#results5 > .event2 > pre").html(example);
		   				   	        	$("#results5 > .event3 > a").html(links);
		   				   	        	$("#results5 > .event3 > a").attr('href', href);
		   			   	        		break;
		   			   	        	case "Transfer Ether" :
		   			   	        		$("#title6").html(title);
		   				   	        	$("#content6").html(content);
		   				   	        	$("#results6 > .title1").html(title);
		   				   	        	$("#results6 > .comment2").html(comment);
		   				   	        	$("#results6 > .event1").html(recommendation);
		   				   	        	$("#results6 > .event2 > pre").html(example);
		   				   	        	$("#results6 > .event3 > a").html(links);
		   				   	        	$("#results6 > .event3 > a").attr('href', href);
		   			   	        		break;
		   			   	        	case "Use tx.origin" :
		   			   	        		$("#title7").html(title);
		   				   	        	$("#content7").html(content);
		   				   	        	$("#results7 > .title1").html(title);
		   				   	        	$("#results7 > .comment2").html(comment);
		   				   	        	$("#results7 > .event1").html(recommendation);
		   				   	        	$("#results7 > .event2 > pre").html(example);
		   				   	        	$("#results7 > .event3 > a").html(links);
		   				   	        	$("#results7 > .event3 > a").attr('href', href);
		   			   	        		break;
		   			   	        	case "Multiple Inheritance" :
		   			   	        		$("#title8").html(title);
		   				   	        	$("#content8").html(content);
		   				   	        	$("#results8 > .title1").html(title);
		   				   	        	$("#results8 > .comment2").html(comment);
		   				   	        	$("#results8 > .event1").html(recommendation);
		   				   	        	$("#results8 > .event2 > pre").html(example);
		   				   	        	$("#results8 > .event3 > a").html(links);
		   				   	        	$("#results8 > .event3 > a").attr('href', href);
		   			   	        		break;
		   			   	        	}
		   			   	        	
		   			        	}
		   			        
		   			        	
		   			        },
		   			     	error : function(request,status,error){
		   			     		alert("issueInfo request : " + JSON.stringify(request) + " status : " + status + " error : " + error);
		   			     	}
		   			});
		   			
		   			// issueCount
		   			$.ajax({            	
		   		    	url: "http://localhost:8080/issueCount",
		   				type: "GET",
//		   				data: JSON.stringify(formData),
		   				dataType: "json",
		   				contentType: "application/json; charset=utf-8",
		   			        success : function(issueCount_data){
		   			        	
//		   			        	console.log("issueCount success");
//		   			        	console.log(data);
		   			        	$('#num_of_scan').text(issueCount_data.contractCount);
		   			        	$('#num_of_issue').text(issueCount_data.issuesCount);
		   			        	
		   			        },
		   			     	error : function(request,status,error){
		   			     		alert("issueCount request : " + JSON.stringify(request) + " status : " + status + " error : " + error);
		   			     	}
		   			});
		   			
		   			
	         	}
	   	        
	        },
	     	error : function(request,status,error){
	     		alert("issueLine request : " + JSON.stringify(request) + " status : " + status + " error : " + error);
	     	}
	});
	
	
}

