var history_array = [];
var suffix = 0;
var page_size = 10;
var page_num = 1;
localStorage.json_str ="";
function update_data()
{
	window.location.href="interpretation_upload.html?new=1&update=0";
}
get_history(history_array);
function get_history(history_array)
{
	if(history_array.length ==0)
	{
		historyHtml = '<div class="accordion-group">'+
							'<div class="accordion-heading">'+
								'<div class="accordion-toggle collapsed">'+
									'<a data-toggle="tab" href="#modals" style="padding:5px 8px 4px 15px;"><i class="uiIconSelected pull-right"></i>无</a>'+
								'</div>'+
							'</div>'+
						'</div>';
				 $("#history").html(historyHtml);
	}
	else
	{
		var historyHtml='';
		for(var j=0; j < history_array.length;j++)
		{
			historyHtml =  historyHtml+'<div class="accordion-group">'+
							'<div class="accordion-heading">'+
								'<div class="accordion-toggle collapsed">'+
									'<a data-toggle="tab" href="#modals" style="padding:5px 8px 4px 15px;"><i class="uiIconSelected pull-right"></i>'+history_array[j]+'</a>'+
								'</div>'+
							'</div>'+
						'</div>';
		}
		 $("#history").html(historyHtml);
	}

}


var path;
//alert("aaaaaaaaaaa");
function create_one_add(path)
{
	//alert("aaaaaaa");
	var add_object={};
	
	
	add_object.form="";
	add_object.http;
	
	
	//检查函数
	add_object.check_fn=function()
	{
		alert("check");
		return true;	
	}
	
	//alert("a11");
	add_object.send_fn_ajax=function()
	{
		//alert("aaaaaaaa");
		if(add_object.check_fn()==false)
		{
			return;
		}
		
		$("#"+add_object.form).ajaxSubmit({
			url: path,
			type: 'POST',
			dataType: 'json',
			success: function (json) {
				//alert(json.resultList.length);
				localStorage.json_str = (JSON.stringify(json));
				//alert(localStorage.json_str);
				var total = document.getElementById("total");
				localStorage.json_str = (JSON.stringify(json));
				//alert(localStorage.json_str);
				var total = document.getElementById("total");
				var id_value = json.resultList[0].id;
				if(id_value=='0')
				{
					total.innerHTML = "共有0条政策符合要求";
					var result_div = document.getElementById("result_div");
					get_page(0,json);
					result_div.innerHTML = "";
					alert("没有符合要求的政策！");
				}
				else
				{
					total.innerHTML = "共有"+json.resultList.length+"条政策符合要求";
					//alert((json.resultList.length)%page_siz);
					if(json.resultList.length%page_size==0)
					{
						var page_count = json.resultList.length/page_size;
					}
					else
					{
						var page_count = parseInt(json.resultList.length/page_size)+1;
					}
					//alert(page_count);
					get_page(page_count,json);
					//alert(page_num);
					get_page_result(json,page_num);
				}
				
				/*
				var result_table = "";
				for(var i=0; i < json.resultList.length;i++)
				{
					
					var name_value = json.resultList[i].name;
					//alert(name_value);
					//var json_value = JSON.stringify(json.resultList[i]);
					var num_value = json.resultList[i].num;
					//alert(num_value);
					var type_value = json.resultList[i].type;
					//alert(type_value);
					var txt_value = json.resultList[i].txt;
					//alert(txt_value);
					var id_value = json.resultList[i].id;
					var dept_value = json.resultList[i].dept;
					var createDate_value = json.resultList[i].createDate;
					var files_str = json.resultList[i].stanJcrFiles[0];
					//alert(files_str);
					var file_str_arr = new Array();
					file_str_arr = files_str.split("},"); //字符分割
					var file_value = "";
					var uuid_value = "";
					for (j=0;j<file_str_arr.length ;j++ )
					{
						if(j!=(file_str_arr.length-1))
						{
							
							var file_str = file_str_arr[j]+'}';
							
						}
						else
						{
							var file_str = file_str_arr[j]
						}
						var file_obj=eval('('+file_str+')');
						//alert(file_obj.fileName)
						var file_value = file_value+file_obj.fileName+';';
						var uuid_value = uuid_value+file_obj.uuid+';';
					}
					//alert(uuid_value);
					var tag_str = json.resultList[i].stanTags[0];
					var tagobj=eval('('+tag_str+')');
					var tag_value = tagobj.tag;
					//alert(tag_value);
					//alert(json_value);
					var json_value ="id="+id_value+"&name="+name_value+"&num="+num_value+"&dept="+dept_value+"&createDate="+createDate_value+"&type="+type_value+"&tag="+tag_value+"&txt="+txt_value+"&files="+file_value+"&urls="+uuid_value+"&new=0&update=1";
					var result_table = result_table + "<tr>"+
											"<td>"+
												"<div class=\"tooltips\">"+
													"<a href=\"standards_content.html?"+json_value+"\">"+name_value+"</a>"+
													"<div class=\"tooltips1\">";
													if(i<=5)
													{
														result_table = result_table +"<span class=\"top2\">显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示。</span>";
													}
													else
													{
														result_table = result_table +"<span class=\"top1\">显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示注释显示。</span>";
													}                        									
													result_table = result_table +"</div>"+
												"</div>"+
											"</td>"+
											"<td>"+num_value+"</td>"+
											"<td>"+tag_value+"</td>"+
										"</tr>";
					
					
					
				}
				//alert(result_table);
				
				var result_div = document.getElementById("result_div");
				result_div.innerHTML = result_table;
				var total = document.getElementById("total");
				total.innerHTML = "共有"+json.resultList.length+"条政策符合要求";
				*/
				
			},//submit success
		
			error: function (data)
			{
				alert("json接口出错！")
				//alert("bbbbb");
				displayProp(data);
			}
		}); //ajaxSubmit
		
	}
	return add_object;
}
//得到错误时运行的内容
function displayProp(obj){    
	var names="";       
	for(var name in obj){       
	   alert(name+": "+obj[name]);     
	}  
	
}
//alert(getNowFormatDate());
//alert(getNowFormatDate());
//document.getElementById("createDate").value = getNowFormatDate();
//alert(get_url_base());
	
function get_page_result(json,page_num)
{
	var result_table = "";
	var page_start = (page_num-1)*page_size;
	if(json.resultList.length < (page_start+page_size))
	{
		var result_count = json.resultList.length;
	}
	else
	{
		var result_count = page_start+page_size;
	}
	var result_table = "";
	if(result_count-page_start==10)
	{
		num = 5;
	}
	else
	{
		num = parseInt((result_count-page_start)/2);
	}
	for(var i=page_start; i < result_count;i++)
	{
		var id_value = json.resultList[i].id;
		
		var name_value = json.resultList[i].name;
		//alert(name_value);
		var num_value = json.resultList[i].num;
		//alert(num_value);
		var type_value = json.resultList[i].type;
		//alert(type_value);
		var txt_value = json.resultList[i].txt;
		//alert(txt_value);
		var dept_value = json.resultList[i].dept;
		//alert(dept_value);
		var createDate_value = json.resultList[i].createDate;
		//alert(createDate_value);
		var tag_str = json.resultList[i].stanTags[0];
		var tagobj=eval('('+tag_str+')');
		var tag_value = tagobj.tag;
		var tag_value = tag_value.replace(/\s+/g,"、");
		var files_str = json.resultList[i].stanJcrFiles[0];
		//alert(files_str);
		if(files_str!="")
		{
			var file_str_arr = new Array();
			var file_str_arr = files_str.split("},"); //字符分割
			var file_value ="";
			var uuid_value = "";
			var result_str = "";
			for (j=0;j<file_str_arr.length ;j++ )
			{
				if(j!=(file_str_arr.length-1))
				{
					
					var file_str = file_str_arr[j]+'}';
					
				}
				else
				{
					var file_str = file_str_arr[j];
				}
				var file_obj=eval('('+file_str+')');
				//alert(file_obj.fileName)
				var file_value = file_value+file_obj.fileName+';';
				//var uuid_value = uuid_value+file_obj.uuid+';';
				if(file_obj.uuid !="0")
				{
					var result_str = result_str +"<div style=\"width:98%; margin-top:30px;margin-left:1%; border:1px solid #578DC9;\" onclick=\"window.open('"+file_obj.uuid+"')\">"+
                                        "<p style=\"font-size:15px; margin:0; padding:0; color:#999999;height:200px;\">"+
											"<div style=\"margin-top:-180px; padding-left:35%\">"+
											   "<img src=\"img/file.jpg\" id=\"file\"  height=\"64\" width=\"64\"/><p></p>"+
												"<div style=\"margin:0 auto\">"+
												   "<a href=\""+file_obj.uuid+"\" target=\"_blank\">"+file_obj.fileName+"</a>"+                                            	"</div>"+
                   							 "</div>"+
                						"</p>"+  
            						 "</div>";
				}
				else
				{
					result_str ='';
					var file_value ='';
					var uuid_value ='';
				}
			}
		}
		else
		{
			var file_value ='';
			var uuid_value ='';
		}
		
		/*
		var files_str2 = json.resultList[i].interpretationFiles[0];
		//alert(files_str2);
		if(files_str2!="")
		{
			var file_str_arr2 = new Array();
			file_str_arr2 = files_str2.split("},"); //字符分割
			file_value2 ="";
			uuid_value2 = "";
			
			for (j=0;j<file_str_arr2.length ;j++ )
			{
				if(j!=(file_str_arr2.length-1))
				{
					
					var file_str2 = file_str_arr2[j]+'}';
					
				}
				else
				{
					var file_str2 = file_str_arr2[j];
				}
				var file_obj2=eval('('+file_str2+')');
				//alert(file_obj.fileName)
				var file_value2 = file_value2+file_obj2.fileName+';';
				var uuid_value2 = uuid_value2+file_obj2.uuid+';';
			}
		}
		else
		{
			file_value2 ="";
			uuid_value2 = "";
		}
		*/
		if (typeof(json.resultList[i].policyTxt) != "undefined")
		{
			var policyTxt_value = json.resultList[i].policyTxt;
		
		}
		else
		{
			var policyTxt_value = "";
		}
		//alert(policyTxt_value);
		if (typeof(json.resultList[i].interpretationTxt) != "undefined")
		{
			var interpretationTxt_value = json.resultList[i].interpretationTxt;
		}
		else
		{
			var interpretationTxt_value = "";
		}
		//alert(interpretationTxt_value);
		var result_table = result_table + "<tr>"+
											"<td >"+																			
												"<div class=\"tooltips\">"+ 
													"<div class=\"tooltips1\">";
													if((i%10)< num)
													{
														result_table = result_table + "<span class=\"top2\">新能源汽车领域有19个重点项目入选，共计划补贴约10.15个亿，重点围绕动力电池与电池管理、电机驱动与电力电子、电动汽车智能化、燃料电池动力系统等6个技术方向，部署38个重点研究任务。";
													}
													else
													{
														result_table = result_table + "<span class=\"top1\">新能源汽车领域有19个重点项目入选，共计划补贴约10.15个亿，重点围绕动力电池与电池管理、电机驱动与电力电子、电动汽车智能化、燃料电池动力系统等6个技术方向，部署38个重点研究任务。";
													}
														result_table = result_table + "</span>"+
													"</div>"+
													"<a href=\"javascript:void(0)\" onclick=\"click_href("+i+")\">"+name_value+"</a>"+                            									
													"</div>"+
											"</td>"+
											"<td>"+num_value+"</td>"+
											"<td>"+dept_value+"</td>"+
											"<td>"+tag_value+"</td>"+															
										"</tr>";
				//alert(file_value);
				if(file_value !="")
				{
					result_table = result_table +"<div class=\"modal hide fade\" id=\"standardModal"+i+"\" role=\"dialog\" data-link=\"@{NationalStandardController.standardContent()}\" style=\"height:87%;\">";
				}
				else
				{
					result_table = result_table +"<div class=\"modal hide fade\" id=\"standardModal"+i+"\" role=\"dialog\" data-link=\"@{NationalStandardController.standardContent()}\" style=\"height:60%\">";
				}
				result_table = result_table +"<div class=\"modal-header\">"+
					   "<a class=\"close\" data-dismiss=\"modal\">x</a >"+
					   "<h1 style=\"text-align:center; margin-bottom:5%;\">地方政策详解正文</h1>"+
					"</div>"+
					"<div class=\"modal-body-no\">"+
						"<div id=\"standard-properties\" style=\"width:96%;text-align:center;padding:10px;\">地方政策详解属性</div>"+							
					"</div>"+				
					"<h3 style=\"color:#999999; text-align:center;\">"+name_value+"</h3>"+
					" </span> <p style=\"font-size:15px; margin:0; padding:0; text-align:center; color:#999999;\">&#26631;&#20934;&#21495;: "+num_value+"</p >"+
					"<p style=\"font-size:15px; margin:0; padding:0; text-align:center; color:#999999;\">"+createDate_value+"</p >"+
					"</span><p style=\"font-size:15px; margin:0; padding:0; text-align:center; color:#999999;\">发布部门: "+dept_value+"</p >";
					/**/
					if(files_str!="")
					{
						result_table = result_table+result_str;
					}
					
result_table = result_table+"<div class=\"modal-footer\">"+
						"<a href=\"\" class=\"btn btn-primary\" data-dismiss=\"modal\">关闭</a>"+
					"</div>"+
				"</div>";
		
		
	}

	var result_div = document.getElementById("result_div");
	result_div.innerHTML = result_table;
	
}

function click_href(i)
{
	//alert("链接被点击");
	var div=document.getElementById("standardModal"+i); 
	div.style.overflow="auto"; 
	$('#standardModal'+i).modal({"backdrop": false});
	
}

function get_page(page_count)
{
	$("#tcdPageCode").createPage({
			pageCount:page_count,
			current:1,
			backFn:function(p){
				
		}
	});
}
function get_page_num(page_num)
{
	//alert("页面"+page_num);
	json = JSON.parse(localStorage.json_str);
	get_page_result(json,page_num);
}
//alert(getNowFormatDate());
//alert(getNowFormatDate());
//document.getElementById("createDate").value = getNowFormatDate();
//alert(get_url_base());

//alert("国家标准搜索按钮被点击！");
var path =get_url_base()+"/json/get_local_notes_json.php?new=1";
//alert(path);
var notes_add=create_one_add(path);
//alert("1234567");
notes_add.form="form1";
//alert(news_add.form);
notes_add.check_fn=function()
{
	//alert("aaaaaaaaaa")
	
	return true;	
}
notes_add.send_fn_ajax();