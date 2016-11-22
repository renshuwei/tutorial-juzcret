var history_array = [];
var suffix = 0;
var _gauges = _gauges || [];
(function() {
	var t = document.createElement('script');
	t.type = 'text/javascript';
	t.async = true;
	t.id = 'gauges-tracker';
	t.setAttribute('data-site-id', '4f0dc9fef5a1f55508000013');
	t.src = '//secure.gaug.es/track.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(t, s);
})();


$("#tcdPageCode").createPage({
		pageCount:20,
		current:1,
		backFn:function(p){
			
	}
});


function update_data()
{
	window.location.href="standards_upload.html?new=0&update=0";
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
//alert(history_array.length);
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
		//alert(path);
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
					//alert(JSON.stringify(json));
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
						var files_str = json.resultList[i].stanJcrFiles[0];
						//alert(files_str);
						var file_str_arr = new Array();
						file_str_arr = files_str.split("},"); //字符分割
						file_value =""
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
						}
						//alert(file_value);
						var tag_str = json.resultList[i].stanTags[0];
						var tagobj=eval('('+tag_str+')');
						var tag_value = tagobj.tag;
						//alert(tag_value);
						//alert(json_value);
						var json_value ="name="+name_value+"&num="+num_value+"&type="+type_value+"&tag="+tag_value+"&txt="+txt_value+"&files="+file_value+"&new=0&update=1";
						var result_table = result_table + "<tr>"+
                    							"<td>"+
                        							"<div class=\"tooltips\">"+
                        								"<a href=\"standards_upload.html?"+json_value+"\">"+name_value+"</a>"+
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
                   							"</tr>";/**/
						
						
						
					}
					//alert(result_table);
					
					var result_div = document.getElementById("result_div");
  					result_div.innerHTML = result_table;
					var total = document.getElementById("total");
  					total.innerHTML = "共有"+json.resultList.length+"条政策符合要求";
					
					
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
	
	

function get_search()
{
  
	//alert("国家标准搜索按钮被点击！");
	var path =get_url_base()+"/json/get_standard_notes_json.php";
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
