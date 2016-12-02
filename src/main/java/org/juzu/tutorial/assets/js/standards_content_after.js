
var history_array = [];
var suffix = 0;
get_content();
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
function get_content()
{
	//alert("aaaaaaaaa");
	//alert(localStorage.json_str);
	json = JSON.parse(localStorage.json_str);
	var id = decodeURI(getPar("id"));
	var add = decodeURI(getPar("add"));
	
	if(add=='0')
	{
		for(var i=0; i < json.resultList.length;i++)
		{	
			var id_value = json.resultList[i].id;
			if(id==id_value)
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
				var dept_value = json.resultList[i].dept;
				var createDate_value = json.resultList[i].createDate;
				var files_str = json.resultList[i].stanJcrFiles[0];
				//alert(files_str);
				if(files_str!="")
				{
					var file_str_arr = new Array();
					var file_str_arr = files_str.split("},"); //字符分割
					var file_value ="";
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
				}
				else
				{
					var file_value ='';
					var uuid_value ='';
				}
				//alert(uuid_value);
				var tag_str = json.resultList[i].stanTags[0];
				var tagobj=eval('('+tag_str+')');
				var tag_value = tagobj.tag;
				var tag_value = tag_value.replace(/\s+/g,"、");
			}
		}	
		var name = name_value;
		var num = num_value;
		var createDate = createDate_value;
		var dept = dept_value;
		var files_name = file_value;
	}
	else if(add=='1')
	{
		var id_value = json.id;
		var name_value = json.name;
		var num_value = json.num;
		var type_value = json.type;
		var dept_value = json.dept;
		var createDate_value = json.createDate;
		var txt_value = json.txt;
		var tag_str = json.stanTags[0];
		var tagobj=eval('('+tag_str+')');
		var tag_value = tagobj.tag;
		//alert(tag_value);
		var files_str = json.stanJcrFiles[0];
		//alert(files_str);
		if(files_str!="")
		{
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
		}
		else
		{
			var file_value ='';
			var uuid_value ='';
		}
		
		var name = name_value;
		var num = num_value;
		var createDate = createDate_value;
		var dept = dept_value;
		
	}
	
	//alert(files_name)
	var files_name = file_value;
	var files_name_arr = files_name.split(";");
	var urls = uuid_value;
	var urls_arr = urls.split(";");
	var i=0;
	var result_str ="<h3 style=\"color:#999999; text-align:center;\">"+name+"</h3>"+
                     "<p style=\"font-size:15px; margin:0; padding:0; text-align:center; color:#999999;\">标准号："+num+"</p>"+
            		 "<p style=\"font-size:15px; margin:0; padding:0; text-align:center; color:#999999;\">"+createDate+"&nbsp;&nbsp;&nbsp;&nbsp;"+dept+"</p>";
	//alert(result_str);
	for(i=0;i<files_name_arr.length-1;i++)
    {
		var result_str = result_str +"<div style=\"width:100%; margin-top:30px; border:1px solid #578DC9;\" onclick=\"window.open('"+urls_arr[i]+"')\">"+
                                        "<p style=\"font-size:15px; margin:0; padding:0; color:#999999;height:200px;\">"+
											"<div style=\"margin-top:-180px; padding-left:35%\">"+
											   "<img src=\"img/file.jpg\" id=\"file\"  height=\"152\" width=\"200\"/></p>"+
												"<div style=\"margin:0 auto\">"+
												   "<a href=\""+urls_arr[i]+"\" target=\"_blank\">"+files_name_arr[i]+"</a>"+                                            	"</div>"+
                   							 "</div>"+
                						"</p>"+  
            						 "</div>";
	}
	//alert(result_str);
	var result = document.getElementById("result");
  	result.innerHTML = result_str;
}

function content_back()
{
	if(getPar("new")=="0")
	{
		window.location.href="standards.html";
	}
	else if(getPar("new")=="1")
	{
		window.location.href="new_standards.html";
	}
}
