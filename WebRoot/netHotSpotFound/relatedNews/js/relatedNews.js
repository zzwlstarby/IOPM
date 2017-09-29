$(function(){
	var sTime = "";
	var eTime = "";
	var infoType = "";
	var emotion = "";
	var first_id = "2";
	var second_id = "3";
	var hot_id = null;
	var spread = "";
	if($('#hot_id').val() != ""){
		hot_id = $('#hot_id').val()
		}
	console.log($("#key").val());
	console.log(hot_id);
	$('input[class="mess"]:checked').each(function(){// 得到信息来源部分checkbox的value
		infoType+=$(this).val()+',';
	});
	$('input[class="box"]:checked').each(function(){// 得到情感部分checkbox的value
		emotion+=$(this).val()+',';
	});
	$('input[id="spread"]:checked').each(function(){// 得到传播途径checkbox的value
		spread+=$(this).val()+',';
	});
	//小三角
	$('.sort img').each(function(index){
		$('.sort img').eq(index).click(function(){
			if($(this).attr('src') == "/IOPM/netHotSpotFound/relatedNews/images/selectArrowdown.png"){
				$(this).attr('src','/IOPM/netHotSpotFound/relatedNews/images/selectArrowup.png');
				$('.header-C').find('.sort').find('input').val(index);
				console.log($('.header-C').find('.sort').find('input').val());
				getRelated(1,$("#key").val(),hot_id,index);
			}else{
				$(this).attr('src','/IOPM/netHotSpotFound/relatedNews/images/selectArrowdown.png');
				$('.header-C').find('.sort').find('input').val(index);
				getRelated(1,$("#key").val(),hot_id,index);
			}
		})
	})
	
	// 对分类进行渲染 将分类点击获得的值封在隐藏域里
	$.ajax({
		url:'/IOPM/RelatedNews/RelatedNewsAction_getAllFirst.action',
	    type:'post',
	    dataType:'json',
	    async:false,
	    data:{},
	    success:function(data){
	    	html=`<dt>涉广电：</dt>
	    	      <dd class="select">
			      <a href="javasript:;">全部</a><input type="hidden" value="">
		          </dd>`;
	    	$.each(data,function(i,p){
	    		html+=`
		    	
				<dd>
					<a href="javasript:;">${p.zero_name}</a><input type="hidden" value="${p.zero_id}">
				</dd>
				`;
	    	})
	    	$(".analyDiv-one").html(html);
	    	// 点击一级分类显示二级
	    	$('.analyDiv-one dd').each(function(){
	    		if($(this).index() == 1){
	    			$(this).click(function(){
	    				$(this).addClass('select');
	    				$(this).siblings('dd').removeClass('select');
	    				$("#firstCal").val("");
	    				$("#secondCal").val("");
	    				$("#thirdCal").val("");
	    				$('.analyDiv-two').slideUp();
	    				$('.analyDiv-three').slideUp();
	    				getTotal();
	    				getNegativeTotal();
	    			})
	    		}else{
	    			$(this).click(function(){
	    				$(this).addClass('select');
	    				$(this).siblings('dd').removeClass('select');
	    				$("#firstCal").val("");
	    				$("#secondCal").val("");
	    				$("#thirdCal").val("");
	    				var first=$(this).find("input").val();
	    				$("#firstCal").val(first);
	    				getTotal();
	    				getNegativeTotal();
	    				$.ajax({
	    					url:"/IOPM/RelatedNews/RelatedNewsAction_getAllSecond.action",
	    					type:"post",
	    					async:false,
	    					data:{'zero_id':$("#firstCal").val()},
	    					dataType:"json",
	    					success:function(data){
	    						
	    						html=`<dd class="select">
								      <a href="javasript:;">全部</a><input type="hidden" value=""/>
								      </dd>`;
	    						$.each(data,function(i,p){
	    							html+=`<dd>
									       <a href="javasript:;">${p.first_classify}</a><input type="hidden" value="${p.first_classify_id}"/>
									       </dd>`;
	    						})
	    						$(".analyDiv-two").html(html);
	    						//分类2
	    						$('.analyDiv-two dd').each(function(){
	    							if($(this).index() == 0){
	    								$(this).click(function(){
	    									$(this).addClass('select');
	    									$("#secondCal").val("");
	    				    				$("#thirdCal").val("");
	    									$(this).siblings('dd').removeClass('select');
	    									$('.analyDiv-three').slideUp();
	    									getTotal();
	    				    				getNegativeTotal();
	    								})
	    							}else{
	    								$(this).click(function(){
	    									$(this).addClass('select');
	    									$("#secondCal").val("");
	    				    				$("#thirdCal").val("");
	    									var second=$(this).find("input").val();
	    									$("#secondCal").val(second);						
	    									$(this).siblings('dd').removeClass('select');
	    									getTotal();
	    				    				getNegativeTotal();
	    									$.ajax({
	    										url:"/IOPM/RelatedNews/RelatedNewsAction_getAllThird.action",
	    										type:"post",
	    										async:false,
	    										data:{'first_classify_id':$("#secondCal").val()},
	    										dataType:"json",
	    										success:function(data){
	    											var html=`<dd class="select">
	    											          <a href="javasript:;">全部</a><input type="hidden" value=""/>
	    											          </dd>`;
	    											$.each(data,function(i,p){
	    												html+=`<dd>
	    												       <a href="javasript:;">${p.second_classify}</a><input type="hidden" value="${p.second_classify_id}"/>
	    												       </dd>`;
	    											})
	    											$(".analyDiv-three").html(html);
	    											 // 分类3
	    											$('.analyDiv-three dd').each(function(){
	    												$(this).click(function(){
	    													$("#thirdCal").val("");
	    													$(this).addClass('select');
	    													var third=$(this).find("input").val();
	    													$("#thirdCal").val(third);
	    													$(this).siblings('dd').removeClass('select');
	    													getTotal();
	    								    				getNegativeTotal();
	    												})
	    											})
	    										}
	    									})
	    									
	    									$('.analyDiv-three').slideDown();
	    								})
	    							}
	    						})
	    						
	    					}
	    				})	    				
	    				$('.analyDiv-two').slideDown();
	    				$('.analyDiv-three').slideUp();
	    			})
	    		}
	    	})
	    }
	})
	//加载页面
	getRelated(1,"",hot_id,0);
	// 开始关注时间按钮
	$('#lookStartTime').datepicker({
		todayHighlight: true,
		autoclose: true
	});
	// 结束关注时间按钮
	$('#lookEndTime').datepicker({
		todayHighlight: true,
		autoclose: true
	});
// 表格编辑按钮
	$('#data-table td i.fa-edit').click(function(){
		$('.checkMask').show();
		$('.checkMask.delete').hide();
		resetMask(0);
		resetMaskVal();
	});
// 表格删除 按钮
	$('#data-table td i.fa-archive').click(function(){
		$('.checkMask').hide();
		$('.checkMask.delete').show();
		resetMask(200);
	});
	// 高级、普通模式
	$('.checkMask .kwTop .advs').click(function(){
		$(this).addClass('select');
		$('.checkMask .kwTop .coms').removeClass('select');
		$('.checkMask .kwBody .advsMode').show();
		$('.checkMask .kwBody .comsMode').hide();
	});

	$('.checkMask .kwTop .coms').click(function(){
		$(this).addClass('select');
		$('.checkMask .kwTop .advs').removeClass('select');
		$('.checkMask .kwBody .comsMode').show();
		$('.checkMask .kwBody .advsMode').hide();
	});

	// 历史、帮助按钮
	var hisOff = true;
	$('#history').click(function(){
		if(hisOff){
			$('.checkMask .kwBody .history').show(300);
			$(this).addClass('select');
		}else{
			$('.checkMask .kwBody .history').hide(300);
			$(this).removeClass('select');
		}
		hisOff = !hisOff;
	});

	var helpOff = true;
	$('.checkMask .kwTop i.fa-question').click(function(){
		if(helpOff){
			$('.checkMask .kwBody .help').show(300);
		}else{
			$('.checkMask .kwBody .help').hide(300);
		}
		helpOff = !helpOff;
	});
	// 点击弹出层加号新增关键词列表
	$('.checkMask.review .keyword i.fa-plus').click(function(){
		var html = '<div class="son animated bounceInDown"><p><input class="form-control" type="text" name="taskAnd" id="taskAnd" placeholder="请输入必须包含关键词"/></p>&nbsp;<p><input class="form-control" type="text" name="taskNot" id="taskNot" placeholder="请输入不能包含关键词"/></p>&nbsp;<i id="remove"  class="fa fa-minus"></i></div>';
		$('.checkMask .comsMode .text>div:last-child').after(html);
	});
	// 点击弹出层减号删除本行
	var sonTime = null;
	$('.checkMask').delegate('#remove','click',function(){
		$(this).parent('div.son').toggleClass('bounceInDown').toggleClass('bounceOutLeft');
		clearInterval(sonTime);
		sonTime = setTimeout(function(){
			$('div.bounceOutLeft').remove();
		},500);
	});

	$('.checkMask .maskBox').mCustomScrollbar({
		theme:"inset-dark"
	});
	// 时间按钮
	$('#startTime').datepicker({
		todayHighlight: true,
		autoclose: true
	});
	$('#endTime').datepicker({
		todayHighlight: true,
		autoclose: true
	});
	// 清空file img文件
	$('#clearImg').click(function(){
		$(this).siblings('img').attr('src','');
	});
	// 扩展信息折行
	var botOff = true;
	$('.checkMask .bottom .right').click(function(){
		if(botOff){
			$(this).find('span').text('收起');
			$(this).find('i').removeClass('fa-arrow-down').addClass('fa-arrow-up');
			$('.checkMask .maskBody').show();
		}else{
			$(this).find('span').text('展开');
			$(this).find('i').removeClass('fa-arrow-up').addClass('fa-arrow-down');
			$('.checkMask .maskBody').hide();
		}
		botOff = !botOff;
	});


	// 信息类型
	var W = document.getElementById("message-W");
	var messArr = $('.mess');
	W.onclick=function(){
		console.log(W.checked);
		for(var i=0;i<messArr.length;i++){
			messArr[i].checked = W.checked;
			console.log(messArr[i].checked)
		}
	}
	for(var j=0;j<messArr.length;j++){
		messArr[j].onclick=function(){
			var flag = true;
			for(var j=0;j<messArr.length;j++){
				if(false == messArr[j].checked){
					flag = false;
				}
			}
			W.checked = flag;
		}
	}
	
//	//传播途径
//	var spread = document.getElementById("spread");

	// 情感倾向
	var whole = document.getElementById("whole");
	var boxArr = $('.box');
	whole.onclick=function(){
		console.log(whole.checked);
		for(var i=0;i<boxArr.length;i++){
			boxArr[i].checked = whole.checked;
			console.log(boxArr[i].checked)
		}
	}
	for(var j=0;j<boxArr.length;j++){
		boxArr[j].onclick=function(){
			var flag = true;
			for(var j=0;j<boxArr.length;j++){
				if(false == boxArr[j].checked){
					flag = false;
				}
			}
			whole.checked = flag;
		}
	}

	// 筛选时间按钮
	$('#checkStartTime').datepicker({
		todayHighlight: true,
		autoclose: true
	});

	$('#checkEndTime').datepicker({
		todayHighlight: true,
		autoclose: true
	});

	$('#checkStart').datepicker({
		todayHighlight: true,
		autoclose: true
	});

	$('#checkEnd').datepicker({
		todayHighlight: true,
		autoclose: true
	});

	// 线索词信息总量
	var sidebarL = [];
	$('.sidebar-L ul').click(function () {
		$(this).find('li').addClass('mo');
		$(this).siblings('ul').find('li').removeClass('mo');
		sidebarL.length = 0;
		sidebarL.push($(this).index());
	});

	var sidebarA = [] ;
	$('.sidebar-A ul').click(function () {
		$(this).find('li').addClass('mo');
		$(this).siblings('ul').find('li').removeClass('mo');
		sidebarA.length = 0;
		sidebarA.push($(this).index());
	});

	$(".sidebar-L li").each(function () {
		$(this).attr("title", $(this).text());
		$(this).css("cursor", 'pointer');
	});

	$(".sidebar-A li").each(function () {
		$(this).attr("title", $(this).text());
		$(this).css("cursor", 'pointer');
	});

	$('.sidebar-L ul li').eq(1).each(function(index){
		var s = $(this).html();
		s = autoAddEllipsis(s, 20);
		$(this).html(s);
	})

	$('.sidebar-A ul li').eq(1).each(function(index){
		var s = $(this).html();
		s = autoAddEllipsis(s, 20);
		$(this).html(s);
	})
	$('#L-over').mCustomScrollbar({
		theme:"inset-dark"
	});
	$('#A-over').mCustomScrollbar({
		theme:"inset-dark"
	});
	function autoAddEllipsis(str, cutLength){
		var len = 0;
		for (var i=0; i<str.length; i++) {
			var c = str.charCodeAt(i);
			// 单字节加1
			if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
				len++;
			}else {
				len+=2;
			}
			if (len > cutLength){
				return str.substr(0, i) + '...';
			}
		}
		return str
	}

	var sumL = 0;
	$('.L-title').click(function(){
		sumL+=1;
		if(sumL%2 != 0){
			$('.sidebar-L').css('transform','translateX(100%)');
			$('.sidebar-L').css('transition','transform 0.5s linear');
			$('.sidebar-L').css('z-index',1);
			$('.sidebar-A').css('z-index',0);
		}else{
			$('.sidebar-L ul li').removeClass('mo');
			$('.sidebar-L').css('transform','translateX(0)');
			$('.sidebar-L').css('transition','transform 0.5s linear');
		}
         getTotal(1);
	})
	var numA=0;
	$('.A-title').click(function(){
		numA+=1;
		if(numA%2 != 0){
			$('.sidebar-A').css('transform','translateX(100%)');
			$('.sidebar-A').css('transition','transform 0.5s linear');
			$('.sidebar-A').css('z-index',1);
		}else{
			$('.sidebar-A ul li').removeClass('mo');
			$('.sidebar-A').css('transform','translateX(0)');
			$('.sidebar-A').css('transition','transform 0.5s linear');
		}
		getNegativeTotal(1);
	})

	var selClickLi = [];
	$('.sidebar-R tbody tr').click(function () {
		$(this).find('td').addClass('move');
		$(this).siblings('tr').find('td').removeClass('move');
		selClickLi.length = 0;
		selClickLi.push($(this).index());
	});

	var selClick = [];
	$('.sidebar-B tbody tr').click(function () {
		$(this).find('td').addClass('move');
		$(this).siblings('tr').find('td').removeClass('move');
		selClick.length = 0;
		selClick.push($(this).index());
	});

	$(".odd td").each(function () {
		$(this).attr("title", $(this).text());
		$(this).css("cursor", 'pointer');
	});

	$('.odd .content-W').each(function(index){
		var s = $(this).html();
		s = autoAddEllipsis(s, 20);
		$(this).html(s);
	})

	$('.odd .name-W').each(function(index){
		var s = $(this).html();
		s = autoAddEllipsis(s, 8);
		$(this).html(s);
	})

	function autoAddEllipsis(str, cutLength){
		var len = 0;
		for (var i=0; i<str.length; i++) {
			var c = str.charCodeAt(i);
			// 单字节加1
			if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
				len++;
			}else {
				len+=2;
			}
			if (len > cutLength){
				return str.substr(0, i) + '...';
			}
		}
		return str
	}
    // 微信弹出部分
	var sum = 0;
	$('.weixin').click(function(){
		sum+=1;
		if(sum%2 != 0){
			$('.sidebar-R').css('transform','translateX(-102%)');
			$('.sidebar-R').css('transition','transform 0.5s linear');
			$('.sidebar-R').css('z-index',3);
			$('.sidebar-B').css('z-index',0);
		}else{
			$('.sidebar-R tbody tr td').removeClass('move');
			$('.sidebar-R').css('transform','translateX(0)');
			$('.sidebar-R').css('transition','transform 0.5s linear');
		}
		getLetter(1);
	})
	$('.sidebar-R input').each(function(index){
		$('.sidebar-R input').eq(index).focus(function(){
			getLetter(1);
		})
	})
	// 微博弹出部分
	var num=0;
	$('.weibo').click(function(){
		num+=1;
		if(num%2 != 0){
			$('.sidebar-B').css('transform','translateX(-102%)');
			$('.sidebar-B').css('transition','transform 0.5s linear');
			$('.sidebar-B').css('z-index',3);
		}else{
			$('.sidebar-B tbody tr td').removeClass('move');
			$('.sidebar-B').css('transform','translateX(0)');
			$('.sidebar-B').css('transition','transform 0.5s linear');
		}
		getBlog(1);
	})
	$('.comment-Top i img').each(function(index){
		$('.comment-Top i img').eq(index).click(function(){
			if($(this).attr('src') == "images/selectArrowdown.png"){
				$(this).attr('src','images/selectArrowup.png');
			}else{
				$(this).attr('src','images/selectArrowdown.png');
			}
		})
	})
	$('.svg .svg-img').each(function(){
		$(this).click(function(){
			var i = parseInt($(this).children('i').html());
			$(this).children('i').html(i+1);
			$(this).off("click");
			$(this).siblings().off("click");
		})
	})

});

//function od() {
//	alert();
//}

//采纳事件
function userAct2(type){
	if (type == 0) {
//		alert('采纳： '+ $("#adopt").html());
//		alert($("#msgId2").val());
		
		userAct($("#msgId2").val(),301);
	} else {
//		alert('不采纳： '+ $("#notAdopt").html());
		userAct($("#msgId2").val(),302)
	}
}
//添加用户行为
function userAct(msg_id,action_type){
	$.ajax({
		url:"/IOPM/RelatedNews/RelatedNewsAction_addUserAct.action",
	    type:"post",
	    dataType:"json",
	    data:{
		      'action_type':action_type,
		      'user_id': 1,
		      'msg_id':msg_id
		      },
	    success:function(msg){
		    	 
		}
	})
}

//查询采纳情况
function selectAdoptMsg(msg_id,user_id){
	$.ajax({
		url:"/IOPM/RelatedNews/RelatedNewsAction_getAdoptCount.action",
	    type:"post",
	    dataType:"json",
	    data:{
		      'user_id': user_id,
		      'msg_id':msg_id
		      },
	    success:function(msg){
		    	  var data = eval(msg);
//		    	  alert(data.adopt);
//		    	  alert(data.notAdopt);
		    	  $("#adopt").html(data.adopt);
    			  $("#notAdopt").html(data.notAdopt);
		},
		error:function(msg){
		 }
	})
}

function resetMaskVal(){
	$('.checkMask .bottom .right').find('span').text('展开');
	$('.checkMask .bottom .right').find('i').removeClass('fa-arrow-up').addClass('fa-arrow-down');
	$('.checkMask .maskBody').hide();
	$('.checkMask .kwTop .coms').removeClass('select');
	$('.checkMask .kwBody .advsMode').show();
	$('.checkMask .kwBody .comsMode').hide();
	$('.checkMask .kwTop .advs').addClass('select');
	$('.checkMask .kwBody .history').hide();
	$('.checkMask .kwBody .help').hide();
}

$('.con .img-a img').css('animation','zhuan 1s 10s linear');
var temer = setInterval(function(){
	if($('.con').children()> 1){
		$('.con').css('height','auto');
		$('.con .img-a').hide();
		clearInterval(temer)
	}
},1000)

// 提交按键渲染数据
function getRelated(index,keywords,hot_id,sort){
//	alert('index: ' + index + '\n keywords: ' + keywords + '\n hot_id: ' + hot_id + '\n sort: ' + sort);
	var infoType="";
	var emotion="";
	var emotionText="";
	var spread="";
	$('input[class="mess"]:checked').each(function(){// 得到信息来源部分checkbox的value
		infoType+=$(this).val()+',';
	});
	$('input[class="box"]:checked').each(function(){// 得到情感部分checkbox的value
		emotion+=$(this).val()+',';
	});
	$('input[id="spread"]:checked').each(function(){// 得到情感部分checkbox的value
		spread+=$(this).val();
	});
	console.log(emotion=="");
	console.log(infoType=="");
	var keywords=$('#key').val();// a  b  ->a b
	keywords = keywords.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
	keywords = keywords.replace(/\s+/g," ");
	
	var startTime=$('#lookStartTime').val();
	var endTime=$('#lookEndTime').val();
	var pageSize=$("#selc").val();
	var pageNo=index;
	var zero_id=$("#firstCal").val();
	var first_classify_id=$("#secondCal").val();
	var second_classify_id=$("#thirdCal").val();
	console.log(zero_id);
	getChart(infoType,emotion,spread,keywords,startTime,endTime,pageSize,pageNo,hot_id,zero_id,first_classify_id,second_classify_id);
	$.ajax({
		url:"/IOPM/RelatedNews/RelatedNewsAction_getRelatedNewsList2.action",
		type:"post",
	    data:{"infoType":infoType,
		      "emotion":emotion,
		      "spread":spread,
		      "keywords":keywords,
		      "startTime":startTime,
		      "endTime":endTime,
		      "pageSize":pageSize,
		      "pageNo":pageNo,
		      "sort":sort,
		      "hot_id":hot_id,
		      "zero_id":zero_id,
		      "first_classify_id":first_classify_id,
		      "second_classify_id":second_classify_id},
		success:function(mesgs){
//		    	  alert("mesgs:"+mesgs);
		    	 var msg = eval("("+mesgs+")");

//		    	 alert("msg:"+msg);
		    	 var relNews=msg.data.data;
//		    	 alert("relNews1:"+relNews);
		   
		    	 var html=``;
		    	 for(var i=0;i<relNews.length;i++){
                	 if(relNews[i].emotion==1)emotionText="正面";
                	 if(relNews[i].emotion==2)emotionText="负面";
                	 if(relNews[i].emotion==3)emotionText="中立";
                	 if(relNews[i].emotion==0)emotionText="未知";
                	 if(relNews[i].type == 1)relNews[i].type="新闻";
                	 if(relNews[i].type == 2)relNews[i].type="微信";
                	 if(relNews[i].type == 3)relNews[i].type="微博";
                	 if(relNews[i].type == 4)relNews[i].type="论坛";
                	 if(relNews[i].type == 7)relNews[i].type="app";
                	 if(relNews[i].type == 8)relNews[i].type="视频";
                	 if(relNews[i].websiteName==null || relNews[i].websiteName=="" || relNews[i].websiteName==undefined)relNews[i].websiteName="未知";
                     if(relNews[i].author==null || relNews[i].author=="" || relNews[i].author==undefined)relNews[i].author="未知";
                	 if(relNews[i].upCount == null)relNews[i].upCount=0;
                	 if(relNews[i].commtcount == null)relNews[i].commtcount=0;
                	 if(relNews[i].reviewCount == null)relNews[i].reviewCount=0;
                	 String.prototype.replaceAll = function(s1,s2){ 
              			return this.replace(new RegExp(s1,"gm"),s2); 
              			}
                	 // 关键词标红
                	 relNews[i].keywords=relNews[i].keywords.replaceAll(" ",",").trim();
//                	 relNews[i].content = relNews[i].content.replace(/(\r\n)|(\n)/g,'</p><p>');
//                	 relNews[i].content = '<p>' + relNews[i].content + '</p>';
                	 var keyArray=relNews[i].keywords.split(',');
                	   for(var j=0;j<keyArray.length;j++){
                		
                		   relNews[i].content=relNews[i].content.replaceAll(keyArray[j],"<font color='red' >"+keyArray[j]+"</font>");
                		   relNews[i].title=relNews[i].title.replaceAll(keyArray[j],"<font color='red' >"+keyArray[j]+"</font>");
                	   }
//                	   console.log(relNews[i].content);
                	  
                		
                	 // 搜索关键词标红
                	  if(keywords != null && keywords != "" && keywords != undefined){
                	  var key=keywords.split(" ");
                	   for(var j=0;j<key.length;j++){
                	       relNews[i].content=relNews[i].content.replaceAll(key[j],"<font style = 'background:yellow'>"+key[j]+"</font>");
                	       relNews[i].title=relNews[i].title.replaceAll(key[j],"<font style = 'background:yellow'>"+key[j]+"</font>");
                	      }
                	  }
                	html+=`
                	 <div class="xinw">
						<h4><font color='red' >[${relNews[i].type}]</font> ${relNews[i].title}</h4>
						
						<div style = "margin-left:20px;margin-bottom:5px"><b>关键词：</b>${relNews[i].keywords}</div>
						<div style = "margin-left:20px;margin-bottom:5px;" id="cont" ><b>内容：</b>${relNews[i].content}</div>
						<input type="hidden" id="adoptCount" value='${relNews[i].adoptCount}'/>
						<input type="hidden" id="notAdoptCount" value='${relNews[i].notAdoptCount}'/>
						<input type="hidden" id="msgId" value='${relNews[i].id}'/>
						
						<ul class="details">
						    <li>站点：<span id="resourse">${relNews[i].websiteName}</span></li>
					        <li>作者：<span id="auther">${relNews[i].author}</span></li>
						    <input type="hidden" id="pic" value="${relNews[i].picture}"/>
						    <li>发布时间：<span id="getTime">${relNews[i].releaseTime}</span></li>
						    <li><a href="${relNews[i].url}" target="_blank" class="openUrl"><font color='blue' >查看原网页</font></a></li>
							
						</ul>
						<ul class="details2">
							<li>评论数：<span id="talkNum">${relNews[i].upCount}</span></li>
						    <li>点赞数：<span id="praiseNum">${relNews[i].commtcount}</span></li>
						    <li>阅读数：<span id="reviewNum">${relNews[i].reviewCount}</span></li>
						    <li>转发数：<span id="transmitNum">${relNews[i].transmitCount}</span></li>
						    <li>情感倾向：<span id="emotionT">${emotionText}</span></li>
						    <li class="button" style="float:right"><input type="button" class="addSpec" value="设为专题"/></li>
						    <li class="button2" style="float:right"><input type="button" class="pushSpec" value="推送至微信"/></li>
						</ul>
					</div>
					`;
                 }
                
                 $(".con").html(html);
                 


               //推送至微信
              	$('.pushSpec').each(function(){
               		$(this).click(function(){
               			$('.checkMask.append').show();
               			$('.checkMask.delete').hide();
               			resetMask(0);
               			resetMaskVal();
               		})
               	});
                 var title;
                 var content;
                 var time;
                 var url;
               	$('.pushSpec').each(function(i){
               		$(this).click(function(){
               			
               			$(this).addClass('green')
               			title = $(this).parent().parent().parent().children('h4').html()
               			content = $(this).parent().parent().parent().children('#cont').html()
               			time = $(this).parent().parent().parent().find('#getTime').html();
               			url = $(this).parent().parent().parent().find('.openUrl').attr('href');
               			
               			title = title.replace(/<.*?>/g, '')
               			content = content.replace(/<.*?>/g, '').substring(3,30)+'...'
               			$('#marquee-a').html('')
               			$('#marquee-b').html('')
               			$.ajax({
               				url:"http://192.168.60.30:8080/wechat/get_user_list",
               				type:"post",
               			    dataType: "jsonp",
               			    jsonp:'callback',  
               			    jsonpCallback:"successCallback",  
               			    success:function(json){
               			    	json = json.userlist
               			    	var html = '<dt>全部</dt>'
               			    		for(var i=0;i<json.length;i++){
               			    			html+='<dd><img src="/IOPM/netHotSpotFound/relatedNews/images/addS.png" alt="" /><span id='+json[i].userid+'>'+json[i].name+'</span><b></b></dd>'
               			    		}
               				    	$('#marquee-a').html(html);
               				    
               				    	$('#marquee-a dt').click(function(ev){
               		             		$('#marquee-a dd').each(function(){
               		             			$(this).children('b').show();
               		             			$(this).children('img').attr('src','/IOPM/netHotSpotFound/relatedNews/images/pushS.png');
               		             			$('#marquee-b').append($(this))
               		             		})
               		             		$('#marquee-b dd b').each(function(){
               		             			$(this).click(function(){
               		             				$(this).parent().children('img').attr('src','/IOPM/netHotSpotFound/relatedNews/images/addS.png')
               		             				$(this).hide();
               		             				$('#marquee-a').append($(this).parent())
               		             				return false;
               		             			})
               		             		})
               		             		$('#marquee-b dd').each(function(){
               		             			$(this).mouseover(function(){
               		             				$(this).children('b').css('transform', 'scale(2)'); 
               		             				$(this).children('b').css('transition','all 0.8s')
               		             			}) 
               		             		})
               		             	
               		             		$('#marquee-b dd ').each(function(){
               		             			$(this).mouseout(function(){
               		             				$(this).children('b').css('transform', 'scale(1)'); 
               		             				$(this).children('b').css('transition','all 0.8s')
               		             			})
               		             		})
               		             		
               		             	ev.stopPropagation();
               		             	})
              		             	
               		             	$('#marquee-a dd').each(function(){
               		             		$(this).click(function(){
               		             			$(this).children('b').show();
               		             			$(this).children('img').attr('src','/IOPM/netHotSpotFound/relatedNews/images/pushS.png');
               		             			$('#marquee-b').append($(this))
               		             			
               		             			$('#marquee-b dd b').each(function(){
               		             				$(this).click(function(){
               		             					$(this).hide();
	               	 	             				$(this).parent().children('img').attr('src','/IOPM/netHotSpotFound/relatedNews/images/addS.png')
	               	 	             				$('#marquee-a').append($(this).parent())         	 	             		
	               	 	             				return false;
               		             				})
               		             			})
               		             			$('#marquee-b dd').each(function(){
               		             				$(this).mouseover(function(){
               		             					$(this).children('b').css('transform', 'scale(2)'); 
               		             					$(this).children('b').css('transition','all 0.8s')
               		             				}) 
               		             			})
               		             	
	               	 	             		$('#marquee-b dd ').each(function(){
	               	 	             			$(this).mouseout(function(){
	               	 	             				$(this).children('b').css('transform', 'scale(1)'); 
	               	 	             				$(this).children('b').css('transition','all 0.8s')
	               	 	             			})
	               	 	             		})
	               	 	             		
               		             		})
               		             	})	
               			    	}
               			})
               		})	
               	});
               	
               	$('.append .btn-primary').click(function(){
	             		
	             	$('.checkMask.append').hide();
               		var userid=[];
               		$('#marquee-b dd').each(function(){
               			userid.push($(this).children('span').attr('id'));
               		})
               		if(userid.length > 1){
               			userid = userid.join("|")
               		}else{
               			userid = userid[0]
               		}
               		$.ajax({
               			url:'http://192.168.60.30:8080/wechat/send_msg',
               			type:'post',
               			data:{'users':userid,
               				'title':title,
               				'content':content,
               				'time':time,
               				'url':url},
               			dataType:'jsonp',
               			jsonp:'callback',  
           			    jsonpCallback:"successCallback", 
               			success:function(json){
               				if(json.errcode == 0){
               					$('.pushSpec.green').css('background','#09bb07')
	                       		$('.pushSpec.green').val('已发送')
	                       		$('.pushSpec.green').attr('disabled','disabled')
	                       		$('.pushSpec.green').removeClass('green')
               				}else{
               					alert("发送失败\n" + json.errmsg)
               					$('.pushSpec.green').removeClass('green')
               				}
               				
               			},
               			erorr:function(json){
               				alert('发送失败');
               			}
               		})
               	})
               	
               		$('.append .btn-danger').click(function(){
               			$('.pushSpec.green').removeClass('green')
               		})
               		
               		$('.append em').click(function(){
               			$('.pushSpec.green').removeClass('green')
               		})
             
                 $(".header-C li:first").children("span").html("系统为您找到了"+msg.data.total+"条舆情");
		    	 var totalPage=Math.ceil(msg.data.total/pageSize);   // 总页数
		         console.log(totalPage);
		         console.log(index);
		         console.log(pageNo);
		         var html1="";
		         var totalCount=msg.data.total;        // 数据总量
// <!--左侧文字-->
		         var endNo=index+6;
		         var page=0;
              	 if(index>=totalPage-6){
              		 endNo=index+6;
              		 pageNo=totalPage-6;
              	   }
              	 if(endNo>totalPage)endNo=totalPage;
              	 if(index>totalPage)index=totalPage;
              	 if(totalPage<=6)pageNo=1;
              	 if(pageNo!=1 && totalPage>=1)page=pageNo-1;
              	 if(pageNo==1 && totalPage>=1)page=pageNo;
              	 
		    	            html1+=` 
		    	<div class="col-md-4 pageText font16px fontcol">
		    	      <span>展示&nbsp;<a href="#">${pageNo}</a>&nbsp;至&nbsp;<a href="#">
		    	      ${endNo}
					  </a>&nbsp;页，共&nbsp;<a href="#">${totalPage}</a>&nbsp;页&nbsp;</span>
				</div>
					`;
							
// <!--左侧文字结束-->
					var html2="";// 拼接显示上一页部分
					if(index>1){
						html2+=`<div class="col-md-8 text-right">
						<div class="dataTables_paginate paging_simple_numbers textright" id="datatable_paginate">
							<ul class="pagination">							
											<li class="paginate_button previous" id="datatable_previous">
												<a href="javascript:getRelated(${index-1},'${keywords}',${hot_id},${sort});" aria-controls="datatable" data-dt-idx="0" tabindex="0">上一页</a>
											</li>`;
					}else{
						html2+=`<div class="col-md-8 text-right">
						<div class="dataTables_paginate paging_simple_numbers textright" id="datatable_paginate">
							<ul class="pagination">							
											<li class="paginate_button previous disabled" id="datatable_previous">
												<a href="javascript:void(0););" aria-controls="datatable" data-dt-idx="0" tabindex="0">上一页</a>
											</li>`;
					}
					
											
				    var html3="";// 拼接显示页标部分
				    if(msg.data.total>0){
				         for(var i=index;i<=endNo;i++){
				        	 if(i==index){html3+=`<li class="paginate_button active">
								               <a href="#" aria-controls="datatable" data-dt-idx="1" tabindex="0">${i}</a></li>`;}
				        	 else{html3+=`<li class="paginate_button ">
								<a href="javascript:getRelated(${i},'${keywords}',${hot_id},${sort});" aria-controls="datatable" data-dt-idx="2" tabindex="0">${i}</a>
								</li>`;}
				         }
				    }
				             
				    var html4="";// 拼接下一页部分
				    if(msg.data.total>0){
				    	if(index!=totalPage){
				    		html4+=`<li class="paginate_button next" id="datatable_next">
							<a href="javascript:getRelated(${index+1},'${keywords}',${hot_id},${sort});" aria-controls="datatable" data-dt-idx="7" tabindex="0">下一页</a>
							</li>`;
				    	}else{
				    		html4+=`<li class="paginate_button next disabled" id="datatable_next">
							<a href="javascript:void(0););" aria-controls="datatable" data-dt-idx="7" tabindex="0">下一页</a>
							</li>
							`;
				    	}
				    }
				    var html5=`
				    </ul>
					</div>
					<div class="goPage">
					<ul>
						<li>跳转到第</li>
						<li><input type="text" class="goNum" /></li>
						<li>页</li>
						<li><button type="button" id="goPageFirst" class="btn btn-primary" >GO</button></li>
					</ul>
				    </div>
				    </div>`;
				    
				    $(".firstRow").html(html1+html2+html3+html4+html5);
				    $("#goPageFirst").click(function(){
				    	var text=parseInt($(this).parent().parent().children("li:first").next().children("input").val());	
				    	if(text>totalPage)text=totalPage;
				    	if(text!=null&&text!=""&&text!=undefined)getRelated(text,keywords,hot_id,sort);
				    });
				    // 添加专题按钮
					$('.addSpec').each(function(){
						$(this).click(function(){
							$('.checkMask.review').show();
							$('.checkMask.delete').hide();
							resetMask(0);
							resetMaskVal();
							//添加用户行为
//							alert(1);
//							alert($(this).parent().parent().parent().find("#msgId").val());
							userAct($(this).parent().parent().parent().find("#msgId").val(),305);
							
							//
						});
					});
					
					// chakan yuanwangye
					$('.openUrl').each(function(){
						$(this).click(function(){
							//添加用户行为
//							alert($(this).parent().html());
//							alert($(this).parent().parent().parent().html());
//							alert($(this).parent().parent().parent().find("#cont").val());
//							alert($(this).parent().parent().parent().find("#msgId").val());
							userAct($(this).parent().parent().parent().find("#msgId").val(),303);
							//
						});
					});
					
// $('h4').each(function(){
// var h=$(this).html().replace(keywords,"<font color='red'
// >"+keywords+"</font>");
// $(this).html(h);
// })
					
					$(".xinw div").each(function(index){	
						var s=$(this).html();
						$(this).attr("data-num",s);
						$(this).css("cursor", 'pointer'); 
						if(s.length > 200){
					        var s = s.substr(0,200);	
					        $(this).html(s+'...');
				        }
					});
					
					// 热点详情
					$('.xinw').each(function(index){
						$('h4').eq(index).click(function(){
							$(".newsTop").children("span").html($(this).html());
							$(".info").find(".pushTime").html($(this).parent().find("#getTime").html());              
							$(".site").html($(this).parent().find("#resourse").html());
							$(".source").html($(this).parent().find("#auther").html());
							$(".talk").html($(this).parent().find("#talkNum").html());
							$(".commt").html($(this).parent().find("#praiseNum").html());
							$(".review").html($(this).parent().find("#reviewNum").html());
							$(".info").find("a").parent().html($(this).siblings(".details").find("a").parent().html());
							if($(this).parent().find("#pic").val() == null || $(this).parent().find("#pic").val() == "" || $(this).parent().find("#pic").val() == undefined)$(".newsContent").find(".Hot").find("img").hide();
							$(".newsContent").find(".Hot").find("img").attr("src",$(this).parent().find("#pic").val());
							//为content修改样式
							 // 关键词标红
							var contentValue = $(this).parent().find("#cont").attr('data-num');
//							var keywordsValue = $(this).parent().find("#keys").attr('data-num');
							contentValue = contentValue.replace(/(\r\n)|(\n)/g,'</p><p>');
		                	 contentValue = '<p>' + contentValue + '</p>';
//		                	 var keyArray=keywordsValue.split(',');
//		                	   for(var j=0;j<keyArray.length;j++){
//		                		   contentValue=contentValue.replaceAll(keyArray[j],"<font color='red' >"+keyArray[j]+"</font>");
//		                	   }
//		                	 // 搜索关键词标红
//		                	  if(keywords != null && keywords != "" && keywords != undefined){
//		                	  var key=keywords.split(" ");
//		                	   for(var j=0;j<key.length;j++){
//		                	       contentValue=contentValue.replaceAll(key[j],"<font style = 'background:yellow'>"+key[j]+"</font>");
//		                	       relNews[i].title=relNews[i].title.replaceAll(key[j],"<font style = 'background:yellow'>"+key[j]+"</font>");
//		                	      }
//		                	  }
							//
							$(".newsContent").find(".Hot").find(".Hotspot").html(contentValue);
//							alert(contentValue);
//							alert($(this).parent().find("#adoptCount").val());
//							alert($(this).parent().find("#notAdoptCount").val());
							$("#adopt").html($(this).parent().find("#adoptCount").val());
							$("#notAdopt").html($(this).parent().find("#notAdoptCount").val());
							$("#msgId2").val($(this).parent().find("#msgId").val());
							$('.checkMask.hotSpot').show();
							if($(".newsContent").find(".Hot").find("img").attr("src") == "null"){
								$(".newsContent").find(".Hot").find("img").hide();
							}
							$('.comment-content').hide();
							$('.comment').hide();
							resetMask(0);
							resetMaskVal();
							
							//添加用户行为
//							alert($("#msgId2").val());
							userAct($(this).parent().find("#msgId").val(),304);
							selectAdoptMsg($(this).parent().find("#msgId").val(),1);
							//
						})
					});
				
		      }  
	})
}

// 微信弹出信息
function getLetter(index){
	var sTime=$('#checkStartTime').val();
	var eTime=$('#checkEndTime').val();
	$.ajax({
		url:"/IOPM/RelatedNews/RelatedNewsAction_getLetterNews.action",
	    type:"post",
	    data:{'pageNo':index,
		      'pageSize':10,
		      'sTime':sTime,
		      'eTime':eTime},
	    success:function(msg){
	    	html="";
	    	var letter=msg.data;
	    	var total=msg.count;
	    	for(var i = 0;i < letter.length;i ++){
	    	   html += `
			    <tr class="odd">
					<td>${(index-1)*10+i+1}</td>
					<td><div class="content-W" title="${letter[i].title}"><a href="${letter[i].source_url}" target="_blank"><font color="#333">${letter[i].title.substring(0,12)}</font></a></div></td>
					<td><div class="name-W">${letter[i].author}</div></td>
					<td><div>${letter[i].transmitcount}</div></td>
					<td><div>${letter[i].commtcount}</div></td>
					<td><div>${letter[i].pubtime}</div></td>
				</tr>`;
	    	}
	    	$('.sidebar-R').find('tbody').html(html);
	    	 var totalPage=Math.ceil(total/10);   // 总页数
	         var html1="";
	         var totalCount=total;        // 数据总量
// <!--左侧文字-->
	         var pageNo=index;
	         var endNo=index+2;
	         var page=0;
          	 if(index>=totalPage-2){
          		 endNo=index+2;
          		 pageNo=totalPage-2;
          	   }
          	 if(endNo>totalPage)endNo=totalPage;
          	 if(index>totalPage)index=totalPage;
          	 if(totalPage<=2)pageNo=1;
          	 if(pageNo!=1 && totalPage>=1)page=pageNo-1;
          	 if(pageNo==1 && totalPage>=1)page=pageNo;
//          	 
          	 html1+=`
	            <div>          
	<div class="pageText font16px fontcol">
	      <span>共${totalPage}页</span>
	</div>
		`;
				
			
						
// <!--左侧文字结束-->
				var html2="";// 拼接显示上一页部分
				if(index>1){
					html2+=`
						<div class="dataTables_paginate paging_simple_numbers textright" id="datatable_paginate">
							<ul class="pagination">							
											<li class="paginate_button previous" id="datatable_previous">
												<a href="javascript:getLetter(${index-1});" aria-controls="datatable" data-dt-idx="0" tabindex="0">上一页</a>
											</li>`;
					}else{
						html2+=`
						<div class="dataTables_paginate paging_simple_numbers textright" id="datatable_paginate">
							<ul class="pagination">							
											<li class="paginate_button previous disabled" id="datatable_previous">
												<a href="javascript:void(0);" aria-controls="datatable" data-dt-idx="0" tabindex="0">上一页</a>
											</li>`;	
					}
										
			    var html3="";// 拼接显示页标部分
			    if(total>0){
			         for(var i=index;i<=endNo;i++){
			        	 if(i==index){html3+=`<li class="paginate_button active">
							               <a href="#" aria-controls="datatable" data-dt-idx="1" tabindex="0">${i}</a></li>`;}
			        	 else{html3+=`<li class="paginate_button ">
							<a href="javascript:getLetter(${i});" aria-controls="datatable" data-dt-idx="2" tabindex="0">${i}</a>
							</li>`;}
			         }
			    }
			             
			    var html4="";// 拼接下一页部分
			    if(total>0){
			    	if(index!=totalPage){
			    		html4+=`<li class="paginate_button next" id="datatable_next">
						<a href="javascript:getLetter(${index+1});" aria-controls="datatable" data-dt-idx="7" tabindex="0">下一页</a>
						</li>`;
			    	}else{
			    		html4+=`<li class="paginate_button next disabled" id="datatable_next">
						<a href="javascript:void(0););" aria-controls="datatable" data-dt-idx="7" tabindex="0">下一页</a>
						</li>
						`;
			    	}
			    }
			    var html5=`
			    </ul>
				</div>
				<div class="goPage">
				<ul>
					<li>跳转到第</li>
					<li><input type="text" class="goNum" /></li>
					<li>页</li>
					<li><button type="button" id="goPageSecond" class="btn btn-primary" >GO</button></li>
				</ul>
			    </div>
			</div>`;
			$('.sidebar-R').find('.ro').html(html1+html2+html3+html4+html5);
			$("#goPageSecond").click(function(){
		    	var text=parseInt($(this).parent().parent().children("li:first").next().children("input").val());	
		    	if(text>totalPage)text=totalPage;
		    	if(text!=null&&text!=""&&text!=undefined)getLetter(text);
		    });
	    }
	})
	
}
//微博弹出信息
function getBlog(index){
var startTime=$('#checkStartTime').val();
var endTime=$('#checkEndTime').val();
	$.ajax({
		url:"/IOPM/RelatedNews/RelatedNewsAction_getBlogrNews.action",
	    type:"post",
	    data:{'pageNo':index,
		      'pageSize':10,
		      'startTime':startTime,
		      'endTime':endTime
		      },
	    success:function(msg){
	    	html="";
	    	var letter=msg.data;
	    	var total=msg.count;
	    	for(var i = 0;i < letter.length;i ++){
	    	   html += `
			    <tr class="odd">
					<td>${(index-1)*10+i+1}</td>
					<td><div class="content-W" title="${letter[i].title}"><a href="${letter[i].source_url}" target="_blank"><font color="#333">${letter[i].title.substring(0,12)}</font></a></div></td>
					<td><div class="name-W">${letter[i].author}</div></td>
					<td><div>${letter[i].transmitcount}</div></td>
					<td><div>${letter[i].commtcount}</div></td>
					<td><div>${letter[i].pubtime}</div></td>
				</tr>`;
	    	}
	    	
	    	$('.sidebar-B').find('tbody').html(html);
	    	 var totalPage=Math.ceil(total/10);   // 总页数
	         var html1="";
	         var totalCount=total;        // 数据总量
// <!--左侧文字-->
	         var pageNo=index;
	         var endNo=index+2;
	         var page=0;
          	 if(index>=totalPage-2){
          		 endNo=index+2;
          		 pageNo=totalPage-2;
          	   }
          	 if(endNo>totalPage)endNo=totalPage;
          	 if(index>totalPage)index=totalPage;
          	 if(totalPage<=2)pageNo=1;
          	 if(pageNo!=1 && totalPage>=1)page=pageNo-1;
          	 if(pageNo==1 && totalPage>=1)page=pageNo;
	    	            html1+=`
	    	            <div>          
	    	<div class="pageText font16px fontcol">
	    	      <span>共${totalPage}页</span>
			</div>
				`;
						
                // <!--左侧文字结束-->
				var html2="";// 拼接显示上一页部分
				if(index>1){
				html2+=`
					<div class="dataTables_paginate paging_simple_numbers textright" id="datatable_paginate">
						<ul class="pagination">							
										<li class="paginate_button previous" id="datatable_previous">
											<a href="javascript:getBlog(${index-1});" aria-controls="datatable" data-dt-idx="0" tabindex="0">上一页</a>
										</li>`;
				}else{
					html2+=`
					<div class="dataTables_paginate paging_simple_numbers textright" id="datatable_paginate">
						<ul class="pagination">							
										<li class="paginate_button previous disabled" id="datatable_previous">
											<a href="javascript:void(0);" aria-controls="datatable" data-dt-idx="0" tabindex="0">上一页</a>
										</li>`;	
				}
			    var html3="";// 拼接显示页标部分
			    if(total>0){
			         for(var i=index;i<=endNo;i++){
			        	 if(i==index){html3+=`<li class="paginate_button active">
							               <a href="#" aria-controls="datatable" data-dt-idx="1" tabindex="0">${i}</a></li>`;}
			        	 else{html3+=`<li class="paginate_button ">
							<a href="javascript:getBlog(${i});" aria-controls="datatable" data-dt-idx="2" tabindex="0">${i}</a>
							</li>`;}
			         }
			    }
			             
			    var html4="";// 拼接下一页部分
			    if(total>0){
			    	if(index!=totalPage){
			    		html4+=`<li class="paginate_button next" id="datatable_next">
						<a href="javascript:getBlog(${index+1});" aria-controls="datatable" data-dt-idx="7" tabindex="0">下一页</a>
						</li>`;
			    	}else{
			    		html4+=`<li class="paginate_button next disabled" id="datatable_next">
						<a href="javascript:void(0););" aria-controls="datatable" data-dt-idx="7" tabindex="0">下一页</a>
						</li>
						`;
			    	}
			    }
			    var html5=`
			    </ul>
				</div>
				<div class="goPage">
				<ul>
					<li>跳转到第</li>
					<li><input type="text" class="goNum" /></li>
					<li>页</li>
					<li><button type="button" id="goPageThird" class="btn btn-primary" >GO</button></li>
				</ul>
			    </div>
			</div>`;
			$('.sidebar-B').find('.ro').html(html1+html2+html3+html4+html5);
			$("#goPageThird").click(function(){
		    	var text=parseInt($(this).parent().parent().children("li:first").next().children("input").val());	
		    	if(text>totalPage)text=totalPage;
		    	if(text!=null&&text!=""&&text!=undefined)getBlog(text);
		    });
	    }
	})
	
}
//总信息量排名
function getTotal(index){
	$.ajax({
		url:"/IOPM/RelatedNews/RelatedNewsAction_getTotal.action",
	    type:"post",
	    dataType:"json",
	    data:{'pageNo':index,
		      'zero_id':$("#firstCal").val(),
		      'first_classify_id':$("#secondCal").val(),
		      'second_classify_id':$("#thirdCal").val()
		      },
	    success:function(msg){
		    	 
		    	  var html = `
		    	  <ul>
					<li>排名</li>
					<li>线索</li>
					<li>信息总量</li>
					<li>情感倾向(正/负/中)</li>
				  </ul>
		    	  `;
		    	  $.each(msg,function(i,p){
		    		  html+=`
		    		  <ul>
						<li>${p.rn}</li>
						<li><a href="#" onClick="javascript:getRelated(1,'',${p.id},$('.header-C').find('.sort').find('input').val());"><font color = '#333'>${p.name.substring(0,12)}</font></a></li>
						<li>${p.count}</li>
						<li><span class="green">${p.positive}</span> / <span class="red">${p.negative}</span> / <span class="blue">${p.neutral}</span></li>
					  </ul>
		    		  `;
		    	  });
		    	$('#L-over').html(html);
		}
	})
}
//负面情感信息量排名
function getNegativeTotal(index){
	$.ajax({
		url:"/IOPM/RelatedNews/RelatedNewsAction_getNegativeTotal.action",
	    type:"post",
	    dataType:"json",
	    data:{'pageNo':index,
		      'zero_id':$("#firstCal").val(),
	          'first_classify_id':$("#secondCal").val(),
	          'second_classify_id':$("#thirdCal").val()
		      },
	    success:function(msg){
		    	  console.log(msg.length);
		    	  var html = `
		    	  <ul>
					<li>排名</li>
					<li>线索</li>
					<li>信息总量</li>
					<li>负面情感量</li>
				  </ul>
		    	  `;
		    	  $.each(msg,function(i,p){
		    		  html+=`
		    		  <ul>
						<li>${p.rn}</li>
						<li><a href="#" onClick="javascript:getRelated(1,'',${p.id},$('.header-C').find('.sort').find('input').val());"><font color = '#333'>${p.name.substring(0,12)}</font></a></li>
						<li>${p.count}</li>
						<li><span class="red">${p.negative}</span></li>
					  </ul>
		    		  `;
		    	  });
		    	$('#A-over').html(html);
		}
	})
}
//饼图
function getChart(infoType,emotion,spread,keywords,startTime,endTime,pageSize,pageNo,hot_id,zero_id,first_classify_id,second_classify_id){
	var myChart = echarts.init(document.getElementById('kind-statistics'));
	var myMess = echarts.init(document.getElementById('message-source'));
	var myEmo = echarts.init(document.getElementById('emotional-tendency'));
	var name1 = [];
	if($("#firstCal").val() == "" && $("#secondCal").val() == "" ){
		$('.analyDiv-one dd').each(function(){
			  var selfTxt = $(this).find("a").text();
			  if(selfTxt != "" && selfTxt != null && selfTxt != undefined){
			  name1.push(selfTxt);  
			  }
		  })
	}else if($("#firstCal").val() != "" && $("#secondCal").val() == ""){
		$('.analyDiv-two dd').each(function(){
			  var selfTxt = $(this).find("a").text();
			  if(selfTxt != "" && selfTxt != null && selfTxt != undefined){
			  name1.push(selfTxt);  
			  }
		  })
	}else if($("#firstCal").val() != "" && $("#secondCal").val() != ""){
		$('.analyDiv-three dd').each(function(){
			  var selfTxt = $(this).find("a").text();
			  if(selfTxt != "" && selfTxt != null && selfTxt != undefined){
			  name1.push(selfTxt);  
			  }
		  })
	}
	var kind = {
		title : {
			text: '线索库类别信息量',
			x:'center'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x : 'center',
			y : 'bottom',
			data: name1
		},
		series : [
			{
				name: '线索库类别',
				type: 'pie',
				radius : '55%',
				center: ['50%', '50%'],
				data:[
					{value:310, name:'落马官员'},
					{value:234, name:'异议人士'},
					{value:135, name:'宗教人士'},
					{value:20, name:'淫秽色情'},
					{value:1335, name:'广电人物'}
				],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	var mess = {
		title : {
			text: '信息来源信息量',
			x:'center'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x : 'center',
			y : 'bottom',
			data: ['新闻','微信','微博','论坛','App','视频']
		},
		series : [
			{
				name: '信息来源',
				type: 'pie',
				radius : '55%',
				center: ['50%', '50%'],
				data:[
					{value:0, name:'新闻'},
					{value:0, name:'微信'},
					{value:0, name:'微博'},
					{value:0, name:'论坛'},
					{value:0, name:'App'},
					{value:0, name:'视频'}
				],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	var emo = {
		title : {
			text: '情感倾向信息量',
			x:'center'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x : 'center',
			y : 'bottom',
			data: ['正面','负面','中立','未知']
		},
		series : [
			{
				name: '情感倾向',
				type: 'pie',
				radius : '55%',
				center: ['50%', '50%'],
				data:[
                    {value:0, name:'正面'},
					{value:0, name:'负面'},
					{value:0, name:'中立'},
					{value:0, name:'未知'}
				],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	myChart.setOption(kind);
	myMess.setOption(mess);
	myEmo.setOption(emo);
	getMessData();
	function getMessData(){
	  myMess.showLoading();
	  var messAjax = myMess.getOption();
		  var name;
//		  alert('infoType');
		  $.ajax({
				 url:"/IOPM/RelatedNews/RelatedNewsAction_getEmotionCount2.action",
				 type:"post",
				 data:{"infoType":infoType,
				       "emotion":emotion,
				       "spread":spread,
				       "keywords":keywords,
				       "whichChart":1,
				       "startTime":startTime,
				       "endTime":endTime,
				       "pageSize":pageSize,
				       "pageNo":pageNo,
				       "hot_id":hot_id,
				       "zero_id":zero_id,
				       "first_classify_id":first_classify_id,
				       "second_classify_id":second_classify_id},
				 async:true,
				 success:function(mesgs){
				    var msg = eval("("+mesgs+")");
				    for(var i = 0; i < msg.length; i++){
//				    	console.log(123);
		            	if(msg[i].info_type == 1)name = 0;
		      		    if(msg[i].info_type == 2)name = 1;
		      		    if(msg[i].info_type == 3)name = 2;
		      		    if(msg[i].info_type == 4)name = 3;
		      		    if(msg[i].info_type == 7)name = 4;
		      		    if(msg[i].info_type == 8)name = 5;
		      		    messAjax.series[0].data[name].value=msg[i].count;
		            }
				        myMess.hideLoading();
						myMess.setOption(messAjax);
					
				 },
				 error:function(msg){
					 console.log("请求错误!");
				 }
		  });
	  myEmo.showLoading();
	  var emoAjax = myEmo.getOption();
//	  var array = emotion.trim().split(",");
		  var name;
//		  alert('emotion');
		  $.ajax({
				 url:"/IOPM/RelatedNews/RelatedNewsAction_getEmotionCount2.action",
				 type:"post",
				 data:{"emotion":emotion,
			  		   "spread":spread,
			           "infoType":infoType,
		               "keywords":keywords,
		               "whichChart":2,
		               "startTime":startTime,
		               "endTime":endTime,
		               "pageSize":pageSize,
		               "pageNo":pageNo,
		               "hot_id":hot_id,
		               "zero_id":zero_id,
		               "first_classify_id":first_classify_id,
		               "second_classify_id":second_classify_id},
				 async:true,
				 success:function(mesgs){
		            var msg = eval("("+mesgs+")");
		            for(var i = 0; i < msg.length; i++){
		            	if(msg[i].emotion == 1)name = 0;
		      		    if(msg[i].emotion == 2)name = 1;
		      		    if(msg[i].emotion == 3)name = 2;
		      		    if(msg[i].emotion == 0)name = 3;
		      		   
		      		    emoAjax.series[0].data[name].value=msg[i].count;
		            }
		                myEmo.hideLoading();
						myEmo.setOption(emoAjax);
				 },
				 error:function(msg){
					 console.log("请求错误!");
				 }
		  });
	  //分类饼图替换值
	  //一级分类
	  if($("#firstCal").val() == "" && $("#secondCal").val() == "" ){
		  var kw1 = [];
		  myChart.showLoading(); 
		  var claChart = myChart.getOption();
			  $.ajax({				//RelatedNews/RelatedNewsAction_getEmotionCount.action
				  url:"/IOPM/RelatedNews/RelatedNewsAction_getEmotionCount.action",
				  type:"post",
				  data:{"emotion":emotion,
				  		"spread":spread,
		                "infoType":infoType,
	                    "keywords":keywords,
	                    "whichChart":3,
	                    "startTime":startTime,
	                    "endTime":endTime,
	                    "pageSize":pageSize,
	                    "pageNo":pageNo,
	                    "hot_id":hot_id
	                    },
	              async:true,
				  dataType:"json",
				  success:function(msg){
	                  $('.analyDiv-one dd').each(function(index){
	                	  if(index!=0){
	                	  console.log(44);
	              		  var selfTxt = $(this).find("a").text();
	              		  var selfVal = $(this).find("input").val();
//	              		  if(selfTxt != "" && selfTxt != null && selfTxt != undefined){
//	              		  name1.push(selfTxt);  
//	              		  }
	              		var obj = new Object();
	              		obj.name = selfTxt;
	              		obj.value = 0;
	              		for(var i = 0; i < msg.length; i++){
	              			if(selfVal == msg[i].zero_id){
	              				obj.name = selfTxt;
	              				obj.value = msg[i].count;
	              			}
		    		      }
	              		kw1.push(obj);
	                	 }	
	              	  })  	
	                    	
	                  myChart.hideLoading();    //隐藏加载动画
	                  claChart.series[0].data = kw1;
	      	          myChart.setOption(claChart);
				  },
				  error:function(msg){
					  console.log("请求数据失败");
				  }
			  });
//	        claChart.series[0].data = kw1;
//	        myChart.setOption(claChart);
	        //二级分类饼图
	  }else if($("#firstCal").val() != "" && $("#secondCal").val() == ""){
		  var kw1 = [];
		  myChart.showLoading(); 
		  var claChart = myChart.getOption();
			  $.ajax({
				  url:"/IOPM/RelatedNews/RelatedNewsAction_getEmotionCount.action",
				  type:"post",
				  data:{"emotion":emotion,
				  		"spread":spread,
		                "infoType":infoType,
	                    "keywords":keywords,
	                    "whichChart":4,
	                    "startTime":startTime,
	                    "endTime":endTime,
	                    "pageSize":pageSize,
	                    "pageNo":pageNo,
	                    "hot_id":hot_id,
	                    "zero_id":zero_id,
	                    },
	              async:true,
				  dataType:"json",
				  success:function(msg){
	                    	$('.analyDiv-two dd').each(function(index){
	  	                	  if(index!=0){
	  	                	 
	  	              		  var selfTxt = $(this).find("a").text();
	  	              		  var selfVal = $(this).find("input").val();
	  	              		var obj = new Object();
	  	              		obj.name = selfTxt;
	  	              		obj.value = 0;
	  	              		for(var i = 0; i < msg.length; i++){
	  	              			if(selfVal == msg[i].first_id){
	  	              				obj.name = selfTxt;
	  	              				obj.value = msg[i].count;
	  	              		
	  	              			}
	  		    		      }
	  	              		kw1.push(obj);
	  	                	 }	
	  	              	  })  	
	  	                    	
	  	                  myChart.hideLoading();    //隐藏加载动画
	  	                  claChart.series[0].data = kw1;
	  	      	          myChart.setOption(claChart);
				  },
				  error:function(msg){
					  console.log("请求数据失败");
				  }
			  });
	  }else if($("#firstCal").val() != "" && $("#secondCal").val() != ""){
		  var kw1 = [];
		  myChart.showLoading(); 
		  var claChart = myChart.getOption();
			  $.ajax({
				  url:"/IOPM/RelatedNews/RelatedNewsAction_getEmotionCount.action",
				  type:"post",
				  data:{"emotion":emotion,
				  		"spread":spread,
		                "infoType":infoType,
	                    "keywords":keywords,
	                    "whichChart":5,
	                    "startTime":startTime,
	                    "endTime":endTime,
	                    "pageSize":pageSize,
	                    "pageNo":pageNo,
	                    "hot_id":hot_id,
	                    "zero_id":zero_id,
	                    "first_classify_id":first_classify_id
	                    },
	              async:true,
				  dataType:"json",
				  success:function(msg){
	                    	$('.analyDiv-three dd').each(function(index){
	  	                	  if(index!=0){
	  	                	  console.log(msg);
	  	              		  var selfTxt = $(this).find("a").text();
	  	              		  var selfVal = $(this).find("input").val();
	  	              		var obj = new Object();
	  	              		obj.name = selfTxt;
	  	              		obj.value = 0;
	  	              		for(var i = 0; i < msg.length; i++){
	  	              			if(selfVal == msg[i].second_id){
	  	              				obj.name = selfTxt;
	  	              				obj.value = msg[i].count;
	  	              				console.log(msg[i].count);
	  	              			}
	  		    		      }
	  	              		kw1.push(obj);
	  	                	 }	
	  	              	  })  	
	  	                    	
	  	                  myChart.hideLoading();    //隐藏加载动画
	  	                  claChart.series[0].data = kw1;
	  	      	          myChart.setOption(claChart);
				  },
				  error:function(msg){
					  console.log("请求数据失败");
				  }
			  });
	  }
	  
	}
}


	