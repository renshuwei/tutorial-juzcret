var history_array = [];
var suffix = 0;
var page_size = 10;
var page_num = 1;
localStorage.json_str ="";
function update_data()
{
	window.location.href="interpretation_upload.html?new=0&update=0";
}

var button_str;
function get_button_value(button_str)
{
	var class_str;
	//alert(document.getElementById("btn1").value);
	document.getElementById("btn1").value = button_str;
	//alert(document.getElementById("btn1").value);
	document.getElementById("btn1").innerHTML= button_str+"<span class=\"caret\" style=\"margin-top:8px;\"></span>";
	//alert(document.getElementById("btn1").value);
	document.getElementById("class").value = button_str;
	//alert(document.getElementById("class").value);
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
					//displayProp(data);
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
		var file_str_arr = new Array();
		var file_str_arr = files_str.split("},"); //字符分割
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
				var file_str = file_str_arr[j];
			}
			var file_obj=eval('('+file_str+')');
			//alert(file_obj.fileName)
			var file_value = file_value+file_obj.fileName+';';
			var uuid_value = uuid_value+file_obj.uuid+';';
		}
		
		var files_str2 = json.resultList[i].interpretationFiles[0];
		//alert(files_str);
		var file_str_arr2 = new Array();
		file_str_arr2 = files_str2.split("},"); //字符分割
		file_value2 =""
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
		}
		var policyTxt_value = json.resultList[i].policyTxt;
		var interpretationTxt_value = json.resultList[i].interpretationTxt;
		var json_value ="id="+id_value+"&name="+name_value+"&num="+num_value+"&dept="+dept_value+"&createDate="+createDate_value+"&type="+type_value+"&tag="+tag_value+"&policyTxt="+policyTxt_value+"&interpretationTxt="+interpretationTxt_value+"&policyFiles="+file_value+"&policyUrls="+uuid_value+"&interpretationFiles="+file_value2+"&new=0&update=1";
		var result_table = result_table + "<tr>"+
											"<td >"+																			
												"<div class=\"tooltips\">"+ 
													"<div class=\"tooltips1\">";
													if(i<=(page_start+parseInt((result_count-page_start+1)/2)))
													{
														result_table = result_table + "<span class=\"top2\">新能源汽车领域有19个重点项目入选，共计划补贴约10.15个亿，重点围绕动力电池与电池管理、电机驱动与电力电子、电动汽车智能化、燃料电池动力系统等6个技术方向，部署38个重点研究任务。";
													}
													else
													{
														result_table = result_table + "<span class=\"top1\">新能源汽车领域有19个重点项目入选，共计划补贴约10.15个亿，重点围绕动力电池与电池管理、电机驱动与电力电子、电动汽车智能化、燃料电池动力系统等6个技术方向，部署38个重点研究任务。";
													}
														result_table = result_table + "</span>"+
													"</div>"+
													"<a href=\"interpretation_content.html?"+json_value+"\">"+name_value+"</a>"+                            									"</div>"+
											"</td>"+
											"<td>"+num_value+"</td>"+
											"<td>"+dept_value+"</td>"+
											"<td>"+tag_value+"</td>"+															
										"</tr>";
		
		
	}

	var result_div = document.getElementById("result_div");
	result_div.innerHTML = result_table;
	
}


function get_search()
{
  
	//alert("国家标准搜索按钮被点击！");
	//alert(localStorage.json_str);
	
	var path =get_url_base()+"/json/get_interpretation_notes_json.php";
	//alert(path);
	var notes_add = create_one_add(path);
	//alert(notes_add)
	//alert("1234567");
	notes_add.form="form1";
	//alert(news_add.form);
	notes_add.check_fn=function()
	{
		//alert("aaaaaaaaaa")
		
		return true;	
	}
   notes_add.send_fn_ajax();
   //alert( localStorage.json_str);
	/**/
	
	var search_text = document.getElementById("search_text").value;
   //alert(search_text);
   /*if(search_text.length>20)
   {
	   search_text = search_text.substr(0, 20);
   }*/
   get_history(history_array);
   
  
   if(suffix == 10)
   {
	   suffix = 0;
   }
   if(search_text=="")
   {
		history_array[suffix] = "搜索所有数据";
   }
   else
   {
	   history_array[suffix] = "搜索条件："+search_text;
   } 
   suffix = suffix+1;
  // alert(history_array[suffix]);	
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
