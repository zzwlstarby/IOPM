<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
	<!--<![endif]-->

	<head>
		<meta charset="utf-8" />
		<title>events-analysis</title>
		<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
		<meta content="" name="description" />
		<meta content="" name="author" />

		<!-- ================== BEGIN BASE CSS STYLE ================== -->
		<link href="../public/css/fontusero.css" rel="stylesheet">
		<link href="../public/plugins/jquery-ui/themes/base/minified/jquery-ui.min.css" rel="stylesheet" />
		<link href="../public/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
		<link href="../public/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
		<link href="../public/css/animate.min.css" rel="stylesheet" />
		<link href="../public/css/style.min.css" rel="stylesheet" />
		<!--<link href="../public/css/style-responsive.min.css" rel="stylesheet" />-->
		<link href="../public/css/theme/default.css" rel="stylesheet" id="theme" />
		<link rel="stylesheet" type="text/css" href="../public/css/daterangepicker-bs3.css">
		<!-- ================== END BASE CSS STYLE ================== -->

		<!-- ================== BEGIN PAGE LEVEL STYLE ================== -->
		<link href="../public/plugins/gritter-1.7.4/css/jquery.gritter.css" rel="stylesheet" />
		<!-- ================== END PAGE LEVEL STYLE ================== -->

		<!-- ================== BEGIN private JS ================== -->
		<!--时间-->
		<link rel="stylesheet" href="../public/bootstrap-datepicker/css/datepicker.css" />
		<link rel="stylesheet" href="../public/bootstrap-datepicker/css/datepicker3.css" />

		<link rel="stylesheet" href="../public/bootstrap-datetimepicker/css/datetimepicker.css" />

		<link rel="stylesheet" href="css/blue.css" />
		<link rel="stylesheet" href="css/select2.css" />
		<link href="../public/plugins/DataTables/css/data-table.css" rel="stylesheet" />
		<link rel="stylesheet" href="../public/scrollbar/jquery.mCustomScrollbar.min.css" />
		<link rel="stylesheet" href="../public/css/checkmask.css" />
		<link rel="stylesheet" href="css/events-analysis.css" />
		<!-- ================== BEGIN private JS ================== -->
		<!-- ================== BEGIN BASE JS ================== -->
		<script src="../public/plugins/pace/pace.min.js"></script>
		<!-- ================== END BASE JS ================== -->
	</head>

	<body>
		<!-- begin #page-loader -->
		<div id="page-loader" class="fade in"><span class="spinner"></span></div>
		<!-- end #page-loader -->

		<!-- begin #page-container -->
		<div id="page-container" class="fade page-header-fixed page-sidebar-fixed">
		<!-- begin #content -->
			<div id="content" class="content" style="margin:0;padding:0;">

				<div class="panel panel-inverse">
					<div class="panel-body box-body">
						<!--任务选项按钮-->
						<div class="analyDiv clearfix">
							<div class="col-sm-8">
								<form action="">
									<span class="font16px">搜索专题：</span>
									<input class="form-control srhText inlblock" type="text" placeholder="请输入专题" />
									<input type="button" id="inlblock" class="btn btn-primary inlblock" value="检索" />
									<div id="len">
									 <ul id="lenovo">
                           			 </ul>
                           			 </div>
								</form>
							</div>
							
						</div>
						<div class="analyBottom">
							
                       <table id="data-table">
                        <thead>
                        <tr>                            
                            <th>序号</th>                       
                            <th>报告名称</th>
                            <th>起止时间</th>
                            <th>是否推送</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
	                        
                      		         
                        </tbody>
                    </table>
                    <div class="fontcol">
                    	<span>每页展示</span>
				         <select class="inlblock">'+
				             <option value="5" selected = "selected">5</option>
				             <option value="10">10</option>
				             <option value="15">15</option>
				             <option value="20">20</option>
				         </select>
				         <span>条</span>
				         <span>共<span class="tiao"></span></span>
                    </div>                
                        <div class="paging">
                        	
							
						</div>
                    		</div>
						</div>

					</div>
				</div>
				<!-- end #content -->

				<!-- begin scroll to top btn -->
				<a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i class="fa fa-angle-up"></i></a>
				<!-- end scroll to top btn -->

			</div>
			<!-- end page container -->

			<!--新建任务弹出层-->
			<div class="checkMask main task">
				<div>
					<form action="" method="post" class=" animated bounceInDown">
						<div class="MaskTop">新建任务</div>
						<em class="fa fa-times"></em>
						<p><label for="taskName">任务名称:</label> <input class="form-control taskName inlblock width75" type="text" name="taskName" id="taskName" placeholder="请输入任务名称" value="" /></p><br />
						<p><label for="taskDate">发布时间:</label> <input class="form-control taskDate inlblock width75" type="text" name="taskDate" id="taskDate" placeholder="请输入发布时间" /></p><br />
						<div class="col-sm-12 keyword">
							<div class="col-sm-2">
								<label>关键词:</label>
							</div>
							<div class="col-sm-10 text">
								<div class="marbom5px">
									<p><input class="form-control" type="text" name="taskAnd" id="taskAnd" placeholder="请输入必须包含关键词" /></p>
									<p><input class="form-control" type="text" name="taskOr" id="taskOr" placeholder="请输入包含一个关键词" /></p>
									<p><input class="form-control" type="text" name="taskNot" id="taskNot" placeholder="请输入不能包含关键词" /></p>
									<i class="fa fa-plus"></i>
								</div>
							</div>
						</div>

						<div class="btnMask taskBtn">
							<button class="btn btn-primary" type="submit" value="确定">确定</button>
							<span></span>
							<button class="btn btn-danger" value="取消">取消</button>
						</div>
					</form>
				</div>
			</div>
			<!--添加弹出层-->
			<div class="checkMask addKW">
				<div>
					<form action="" method="post" class=" animated bounceInDown">
						<div class="MaskTop">编辑事件关键词</div>
						<em class="fa fa-times"></em>
						<div class="msgs">
							<table style="width: 80%;">
								<tr>
									<td style="text-align: right; width: 150px;">关键词：</td><td><input type="text" class="form-control" /></td>
								</tr>
								<tr><td></td><td class="tip">[ 关键词可编辑 ]：可包括"与","或","非"的关系，用空格()表示与，逗号(,)表示或，减号(-)表示非，乘号(*)表示积。<br />
例：(南宁,桂林)*(反腐 贪污,打劫)-(楼盘,广告)，表示包含关键词(南宁 反腐 贪污)或(南宁 打劫)或(桂林 反腐 贪污)或(桂林 打劫)，同时排除关键词(楼盘)或者(广告)。<br />
多组关键词用分号分隔， 每组只能包括一个乘号(*)和减号(-)。</td></tr>
							</table>
						</div>
						<div class="btnMask">
							<button class="btn btn-primary" type="submit" value="确定">确定</button>
							<span></span>
							<button class="btn btn-danger" value="取消">取消</button>
						</div>
					</form>
				</div>
			</div>
			<!--不在推荐、恢复推荐弹出层-->
			<div class="checkMask RemKW">
				<div>
					<form action="" method="post" class="animated bounceInDown">
						<div class="MaskTop">操作事件关键词</div>
						<em class="fa fa-times"></em>
						<div class="msgs msgNo">
							<span>确定不再推荐该关键词？</span>
						</div>
						<div class="msgs msgRem">
							<span>恢复推荐该关键词？</span>
						</div>
						<div class="btnMask">
							<button class="btn btn-primary" type="submit" value="确定">确定</button>
							<span></span>
							<button class="btn btn-danger" value="取消">取消</button>
						</div>
					</form>
				</div>
			</div>
			
			   <!--添加专题弹出层-->
    <div class="checkMask main increase">
        <div>
            <form action="" method="post" class=" animated bounceInDown" id="special">
                <div class="MaskTop">添加专题</div>
                <em class="fa fa-times"></em>
                <div class="maskBox">
                    <ul class="Time">
                        <li>名称：<input type="text" style="margin-left:26px;" id="userC" placeholder="请输入名称"/></li>
                        <li class="lefttd">起始时间：
                            <input type="text" id="lookStartTime" class="input sel_event_stime hasDatepicker" placeholder="请输入开始时间"></li>
                        <li class="lefttd">结束时间：
                            <input type="text" id="lookEndTime" class="input sel_event_etime hasDatepicker" placeholder="请输入结束时间"></li>
                    </ul>
                    <div class="cruxUp">
                        <span class="span">关键词：</span>
                        <div class="crux">
                            <ul>
                                <li class="bg">包含</li>
                                <!--<li>至少包含一个</li>-->
                                <li>不包含</li>
                            </ul>
                            <textarea class="textA" placeholder="关键词之间空格分割表示与， 回车、逗号分割表示或。"></textarea>
                            <textarea class="textB" placeholder="关键词之间空格分割表示与， 回车、逗号分割表示或。"></textarea>
                        </div>
                    </div>
                    <div class="hida">
                        <span class="span">预览：</span>
                        <div class="hidc">
                            <ul>
                                <!--<li class="qbh">全包含：</li>-->
                                <li class="zbh">
                                    <b>　包含：</b>
                                    <div class="zbhBox"></div>
                                </li>
                                <li class="bbh">
                                    <b>不包含：</b>
                                    <div class="bbhBox"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="btnMask taskBtn">
                    <button class="btn btn-primary" type="button" value="确定">确定</button>
                    <span></span>
                    <button class="btn btn-danger" value="取消">取消</button>
                </div>
            </form>
        </div>
    </div>
			<!--删除弹出层-->
			<div class="checkMask delete">
				<div>
					<form action="" method="post" class="animated bounceInLeft">
						<div class="MaskTop">删除任务</div>
						<em class="fa fa-times"></em>
						<div class="deleText">
							您确定删除此任务吗？
						</div>
						<div class="btnMask">
							<button class="btn btn-primary" type="button" value="确定">确定</button>
							<span></span>
							<button class="btn btn-danger" value="取消">取消</button>
						</div>
					</form>
				</div>
			</div>

			<!-- ================== BEGIN BASE JS ================== -->
			<script src="../public/plugins/jquery/jquery-1.9.1.min.js"></script>
			<script src="../public/plugins/jquery/jquery-migrate-1.1.0.min.js"></script>
			<script src="../public/plugins/jquery-ui/ui/minified/jquery-ui.min.js"></script>
			<script src="../public/plugins/bootstrap/js/bootstrap.min.js"></script>
			<!--[if lt IE 9]
				<script src="../public/crossbrowserjs/html5shiv.js"></script>
				<script src="../public/crossbrowserjs/respond.min.js"></script>
				<script src="../public/crossbrowserjs/excanvas.min.js"></script>
			[endif]-->
			<script src="../public/plugins/slimscroll/jquery.slimscroll.min.js"></script>
			<script src="../public/plugins/jquery-cookie/jquery.cookie.js"></script>
			<script src="../public/js/daterangepicker.js" type="text/javascript"></script>
			<script src="../public/js/moment.min.js" type="text/javascript"></script>
			<script src="../public/js/apps.min.js"></script>
			<!-- ================== END BASE JS ================== -->
			<!-- ================== BEGIN private JS ================== -->
			<!--时间-->
			<script src="../public/bootstrap-datepicker/js/bootstrap-datepicker.js" type="text/javascript" charset="utf-8"></script>
			<script src="../public/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js" type="text/javascript" charset="utf-8"></script>
			<script src="../public/bootstrap-timepicker/js/bootstrap-timepicker.min.js" type="text/javascript" charset="utf-8"></script>
			<script src="../public/echarts/js/echarts.min.js" type="text/javascript" charset="utf-8"></script>
			<script src="../public/echarts/js/china.js" type="text/javascript" charset="utf-8"></script>
			<!--<script src="../public/echarts/js/echarts-all.js" type="text/javascript" charset="utf-8"></script>-->
			<script src="../public/js/app-pages.js" type="text/javascript" charset="utf-8"></script>
			<script src="../public/scrollbar/jquery.mCustomScrollbar.concat.min.js" type="text/javascript" charset="utf-8"></script>
			<script src="js/events-analysis.js" type="text/javascript" charset="utf-8"></script>
			<!-- ================== BEGIN private JS ================== -->

			<script>
				$(document).ready(function() {
					App.init();
					$('body div.ui-sortable').removeClass('ui-sortable');
				});
			</script>
			<script>
				(function(i, s, o, g, r, a, m) {
					i['GoogleAnalyticsObject'] = r;
					i[r] = i[r] || function() {
						(i[r].q = i[r].q || []).push(arguments)
					}, i[r].l = 1 * new Date();
					a = s.createElement(o),
						m = s.getElementsByTagName(o)[0];
					a.async = 1;
					a.src = g;
					m.parentNode.insertBefore(a, m)
				})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

				ga('create', 'UA-53034621-1', 'auto');
				ga('send', 'pageview');
			</script>
	</body>

</html>