var width = window.innerWidth;
var height = window.innerHeight;
var body_margin = (width * 15) / 100;
var body_width = (width * 70) / 100;

$(document).ready(function() {
    $("body").css("background-size", width + "px " + 400 + "px");
   
    var loading = $('<img alt="loading" id="loadingImg" src="./resources/image/ajax-loader.gif">').appendTo(document.body).hide();
    
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
	//$('#mask').fadeIn(1000);      
	$('#mask').fadeTo("slow",0.6);    
}

////////////////

function select(num) {
	switch (num) {
	case 1:
		$(".event1").css("display", "inline");
		$(".event2").css("display", "none");
		$(".event3").css("display", "none");
		
		$(".rec").css("color", "green");
		$(".ec").css("color", "black");
		$(".link").css("color", "black");
		document.getElementByClassName(".event1").scrollIntoView();
		break;
	case 2:
		$(".event1").css("display", "none");
		$(".event2").css("display", "inline");
		$(".event3").css("display", "none");
		
		$(".rec").css("color", "black");
		$(".ec").css("color", "green");
		$(".link").css("color", "black");
		document.getElementByClassName(".event2").scrollIntoView();
		break;
	case 3:
		$(".event1").css("display", "none");
		$(".event2").css("display", "none");
		$(".event3").css("display", "inline");
		
		$(".rec").css("color", "black");
		$(".ec").css("color", "black");
		$(".link").css("color", "green");
		document.getElementByClassName(".event3").scrollIntoView();
		break;
	}
}
function click(num) {
	switch (num) {
	case 1:
        $("#results1").css("display", "inline");
        $("#results2").css("display", "none");
        $("#results3").css("display", "none");
        $("#results4").css("display", "none");
        $("#results5").css("display", "none");
        $("#results6").css("display", "none");
        $("#results7").css("display", "none");
        $("#results8").css("display", "none");
        document.getElementById("results1").scrollIntoView();
		break;
	case 2:
        $("#results1").css("display", "none");
        $("#results2").css("display", "inline");
        $("#results3").css("display", "none");
        $("#results4").css("display", "none");
        $("#results5").css("display", "none");
        $("#results6").css("display", "none");
        $("#results7").css("display", "none");
        $("#results8").css("display", "none");
        document.getElementById("results2").scrollIntoView();
		break;
	case 3:
        $("#results1").css("display", "none");
        $("#results2").css("display", "none");
        $("#results3").css("display", "inline");
        $("#results4").css("display", "none");
        $("#results5").css("display", "none");
        $("#results6").css("display", "none");
        $("#results7").css("display", "none");
        $("#results8").css("display", "none");
        document.getElementById("results3").scrollIntoView();
		break;
	case 4:
        $("#result1").css("display", "none");
        $("#result2").css("display", "none");
        $("#result3").css("display", "none");
        $("#result4").css("display", "inline");
        $("#result5").css("display", "none");
        $("#result6").css("display", "none");
        $("#result7").css("display", "none");
        $("#result8").css("display", "none");
        document.getElementById("results4").scrollIntoView();
		break;
	case 5:
        $("#results1").css("display", "none");
        $("#results2").css("display", "none");
        $("#results3").css("display", "none");
        $("#results4").css("display", "none");
        $("#results5").css("display", "inline");
        $("#results6").css("display", "none");
        $("#results7").css("display", "none");
        $("#results8").css("display", "none");
        document.getElementById("results5").scrollIntoView();
		break;
	case 6:
        $("#results1").css("display", "none");
        $("#results2").css("display", "none");
        $("#results3").css("display", "none");
        $("#results4").css("display", "none");
        $("#results5").css("display", "none");
        $("#results6").css("display", "inline");
        $("#results7").css("display", "none");
        $("#results8").css("display", "none");
        document.getElementById("results6").scrollIntoView();
		break;
	case 7:
        $("#results1").css("display", "none");
        $("#results2").css("display", "none");
        $("#results3").css("display", "none");
        $("#results4").css("display", "none");
        $("#results5").css("display", "none");
        $("#results6").css("display", "none");
        $("#results7").css("display", "inline");
        $("#results8").css("display", "none");
        document.getElementById("results7").scrollIntoView();
		break;
	case 8:
        $("#results1").css("display", "none");
        $("#results2").css("display", "none");
        $("#results3").css("display", "none");
        $("#results4").css("display", "none");
        $("#results5").css("display", "none");
        $("#results6").css("display", "none");
        $("#results7").css("display", "none");
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
	
	
	// issueCount
	$.ajax({            	
    	url: "http://localhost:8080/web/issueCount",
		type: "GET",
//		data: JSON.stringify(formData),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
	        success : function(data){
	        	console.log("success!!!");
	        	console.log(data);
	        	$('#num_of_scan').text(data.contractCount);
	        	$('#num_of_issue').text(data.issuesCount);
	        },
	     	error : function(request,status,error){
	     		alert("issueCount request : " + JSON.stringify(request) + " status : " + status + " error : " + error);
	     	}
	});
	
	// issueInfo
	$.ajax({            	
    	url: "http://localhost:8080/web/issueInfo",
		type: "GET",
//		data: JSON.stringify(formData),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
	        success : function(data){
	        	console.log("success");
	        	console.log(data);
	        	
	        	for (var key in data) {
	   	        	console.log(key, data[key]);
	   	        	
	   	        	var result = data[key];
	   	        	
	   	        	switch (key) {
	   	        	case "DoSAttack" :
	   	        		$("#title1").html(key);
		   	        	$("#content1").html(result);
	   	        		break;
	   	        	case "None Access Modifier" :
	   	        		$("#title2").html(key);
		   	        	$("#content2").html(result);
	   	        		break;
	   	        	case "Overflow" :
	   	        		$("#title3").html(key);
		   	        	$("#content3").html(result);
	   	        		break;
	   	        	case "Reentrancy" :
	   	        		$("#title5").html(key);
		   	        	$("#content5").html(result);
	   	        		break;
	   	        	case "Transfer Ether" :
	   	        		$("#title6").html(key);
		   	        	$("#content6").html(result);
	   	        		break;
	   	        	case "Use tx.origin" :
	   	        		$("#title7").html(key);
		   	        	$("#content7").html(result);
	   	        		break;
	   	        	case "Multiple Inheritance" :
	   	        		$("#title8").html(key);
		   	        	$("#content8").html(result);
	   	        		break;
	   	        	}
	        	}
	        },
	     	error : function(request,status,error){
	     		alert("issueInfo request : " + JSON.stringify(request) + " status : " + status + " error : " + error);
	     	}
	});
	
	// issueLine
	$.ajax({            	
    	url: "http://localhost:8080/web/submit",
		type: "POST",
		data: JSON.stringify(formData),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
	        success : function(data){
	            // alert(JSON.stringify(data));
	            console.log(JSON.stringify(data));
	         	var Range = ace.require('ace/range').Range;
	        
   	        for (var key in data) {
   	        	console.log(key, data[key]);
   	        	
   	        	var result = data[key];
   	        	
   	        	console.log(result);
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
  					}
   	        		break;
   	        	case "Reentrancy : Transfer Ether" :
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
					    }
   	        		break;
   	        	case "tx-origin" :
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
					    }
   	        		break;
   	        	case "Contract characteristics : Multiple Inheritance" :
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
					    }
   	        		break;
   	        	}
   	        }
   	        
   	        $("#release").hide();
   	     	$("#check").show();
   	     	
   	     	
			    //$("#num_of_scan").html(json.contracts);
			    //$("#num_of_issue").html(json.issues);
			    
	        },
	     	error : function(request,status,error){
	     		alert("issueLine request : " + JSON.stringify(request) + " status : " + status + " error : " + error);
	     	}
	});
}

