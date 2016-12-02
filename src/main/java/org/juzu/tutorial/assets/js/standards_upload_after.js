localStorage.json_str =""; 
 var image_count=0;
 /*
 	*	上传数据
 	*/
	if(getPar("update")=="1")
	{
		document.getElementById("standardName").value = decodeURI(getPar("name"));
		document.getElementById("standardNum").value = decodeURI(getPar("num"));
		document.getElementById("standardTypeTxt").value = decodeURI(getPar("type"));
		document.getElementById("standardType").value = decodeURI(getPar("type"));
		document.getElementById("tag").value = decodeURI(getPar("tag"));
		document.getElementById("text").value = decodeURI(getPar("txt"));
		var files = decodeURI(getPar("files"));
		var  image_list =files.split(";");
		var messages_list=document.getElementById("messages");
		var i=0;
		
		for(i=0;i<image_list.length-1;i++)
		{
			var image_one=image_list[i];
			//alert( image_one);
			if(image_one!="")
			{
				var div_one=document.createElement('div');
				<!---->
				div_one.innerHTML=	"<div class=\"row\" style=\"margin-top:20px; padding-left:35%\">"+
										"<div class=\"news_pic col-lg-3 col-md-3 col-sm-4 col-xs-12\">"+								
											"<div class=\"\">"+
												"<img src=\"img/use.jpg\" height=\"152\" width=\"200\" id=\"imghead"+image_count+"\" class=\"img-responsive\"/>"+
											"</div>"+
										"</div>"+
									"</div>"+
									"<div class=\"row\" style=\"margin-top:10px; padding-left:35%\">"+
										"<div class=\"col-lg-3 \">"+					
											"<input type=\"button\" class=\"btn\" value=\"删除\" style=\"font-size:13px; padding:2px 10px; margin-right:10px;\" onclick=back_image_delete(this) />"+
										"</div>"+
									"</div>";
								
				messages_list.appendChild(div_one);
			}
		}
		image_count = image_list.length - 1;
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
					//alert("返回的结果是josn");
					//alert(JSON.stringify(json));
					localStorage.json_str = (JSON.stringify(json));
					var id_value = json.id;
					/*
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
					var file_str_arr = new Array();
					var file_str_arr = files_str.split("},"); //字符分割
					//alert(file_str_arr.length);
					//alert(file_str_arr[0]);
					if(file_str_arr[0]!="")
					{
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
						var file_value = "";
						var uuid_value = uuid_value+file_obj.uuid+';';
					}
					*/
					
					//alert(file_value);
					//alert(uuid_value);
					var json_value ="id="+id_value+"&new="+getPar("new")+"&add=1";
					//alert(json_value);
					if(json.id>'0')
					{
						alert("添加数据成功！");
						window.location.href="standards_content.html?"+json_value;
					}
					else
					{
						alert("添加数据失败！");
					}
					//displayProp(json.id);
            	
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
	/*删除左右两端的空格*/
	function trim(str)
	{ 
	　　   return str.replace(/(^s*)|(s*$)/g, "");
	}
	
//获取日期与时间
	function getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
				+ " " + date.getHours() + seperator2 + date.getMinutes()
				+ seperator2 + date.getSeconds();
		return currentdate;
	}
	//alert(getNowFormatDate());
	document.getElementById("createDate").value = getNowFormatDate();
	//alert(getNowFormatDate());
	//document.getElementById("createDate").value = getNowFormatDate();
	//alert(get_url_base());
	var path =get_url_base()+"/json/add_standard_notes_json.php";
	//alert(path);
	var notes_add=create_one_add(path);
	//alert("1234567");
	notes_add.form="form1";
	//alert(news_add.form);
	notes_add.check_fn=function()
	{
		//alert("aaaaaaaaaa");
		if($("#form1").find("input[name='standardName']").val()=="".trim())
		{
			alert("请输入标准名称！");
			return false;
		}
		if($("#form1").find("input[name='standardNum']").val()=="".trim())
		{
			alert("请输入标准编号！");
			return false;
		}
		if($("#form1").find("input[name='standardTypeTxt']").val()=="".trim())
		{
			alert("请输入标准类型！");
			return false;
		}
		if($("#form1").find("input[name='tag']").val()=="".trim())
		{
			alert("请输入标签!");
			return false;
		}
		if(($("#form1").find("textarea[name='text']").val()=="".trim())&&(image_count==0))
		{
			alert("请输入标准原文！");
			return false;
		}
		
		return true;	
	}
	
	//alert(news_add.check_fn);
	function notes_add_touch()
	{
		//alert("aaaaaaaaaaaaaaaa");
		notes_add.send_fn_ajax();
	}
		
	
	function file_add()
	{
		
		var div_list=document.getElementById("messages");
		var div_string=	"<div class=\"row\" style=\"margin-top:20px; padding-left:35%\">"+							
							"<div class=\"\" id=\"preview"+image_count+"\" >"+
								"<img src=\"img/use.jpg\" height=\"152\" width=\"200\"  id=\"imghead"+image_count+"\" class=\"img-responsive\" />"+
							"</div>"+
						"</div>"+
						"<div class=\"row\" style=\"margin-top:10px; padding-left:35%\">"+
							"<input type=\"file\"  name=\"uploadinput[]\" onChange=\"previewImage(this,"+image_count+")\" />"+
						"</div>";
			
		
		var div_one=document.createElement("div");
		div_one.innerHTML=div_string;
		div_list.appendChild(div_one);
		image_count+=1;
	}
	
	function file_delete()
	{
		
		if(image_count==0)
		{
			alert("图片列表为空");
			return;
		}
		
		var div_list=document.getElementById("messages");
		
		var has_child = div_list.hasChildNodes(); 
		
		if(has_child==false)
		{
			return;
		}
		
		div_list.removeChild(div_list.childNodes[div_list.childNodes.length-1]);
		
		image_count-=1;
		
	}
	function back_image_delete(delete_button)
	{	
		var p_node=delete_button.parentNode.parentNode.parentNode;
		var div_node=p_node.parentNode;
		var image_node=p_node.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
		
		//添加hidden结点 根据该结点删除图片
		var div_list=document.getElementById("messages");
		var p_one=document.createElement('div');
		p_one.innerHTML="<input name=\"xxytp[]\" type=\"hidden\" value=\""+image_node.src+"\"/>";
		div_list.insertBefore(p_one,div_list.firstChild);
		
		//删除当前行
		div_node.removeChild(p_node);
	}