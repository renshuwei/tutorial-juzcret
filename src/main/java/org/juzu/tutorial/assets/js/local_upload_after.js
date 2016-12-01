var image_count = 0;
var image_count2 = 0;

if(getPar("update")=="1")
{
	document.getElementById("policyName").value = decodeURI(getPar("name"));
	document.getElementById("publishDept").value = decodeURI(getPar("dept"));
	document.getElementById("selectPublishDept").value = decodeURI(getPar("dept"));
	document.getElementById("policyNum").value = decodeURI(getPar("num"));
	document.getElementById("policyCategoryTxt").value = decodeURI(getPar("type"));
	document.getElementById("policyCategory").value = decodeURI(getPar("type"));
	document.getElementById("tag").value = decodeURI(getPar("tag"));
	document.getElementById("policyTxt").value = decodeURI(getPar("policyTxt"));
	document.getElementById("province").value = decodeURI(getPar("province"));
	document.getElementById("selectProvince").value = decodeURI(getPar("province"));
	document.getElementById("city").value = decodeURI(getPar("city"));
	document.getElementById("selectCity").value = decodeURI(getPar("city"));
	var policyFiles = decodeURI(getPar("policyFiles"));
	var  image_list =policyFiles.split(";");
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
	document.getElementById("InterpretationTxt").value = decodeURI(getPar("interpretationTxt"));
	var interpretationFiles = decodeURI(getPar("interpretationFiles"));
	var  image_list2 = interpretationFiles.split(";");
	var messages_list =document.getElementById("messages2");
	var i=0;
	
	for(i=0;i<image_list2.length-1;i++)
	{
		var image_one=image_list2[i];
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
										"<input type=\"button\" class=\"btn\" value=\"删除\" style=\"font-size:13px; padding:2px 10px; margin-right:10px;\" onclick=back_image_delete2(this) />"+
									"</div>"+
								"</div>";
							
			messages_list.appendChild(div_one);
		}
	}
	image_count = image_list.length - 1;

}

/*
 	*	上传数据
 	*/
	var path;
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
					//alert("aaaaaaaaaa");
            		var id_value = json.id;
					//alert(id_value);	
					var name_value = json.name;
					//alert(name_value);
					var num_value = json.num;
					//alert(num_value);
					var type_value = json.type;
					//alert(type_value);
					var dept_value = json.dept;
					//alert(dept_value);
					var createDate_value = json.createDate;
					//alert(createDate_value);
					var tag_str = json.stanTags[0];
					var tagobj=eval('('+tag_str+')');
					var tag_value = tagobj.tag;
					//alert(tag_value);
					var files_str = json.stanJcrFiles[0];
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
					
					var files_str2 = json.interpretationFiles[0];
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
					var policyTxt_value = json.policyTxt;
					var interpretationTxt_value = json.interpretationTxt;
					var province_value = json.province;
					var city_value = json.city;
					var json_value ="id="+id_value+"&name="+name_value+"&num="+num_value+"&createDate="+createDate_value+"&province="+province_value+"&city="+city_value+"&dept="+dept_value+"&type="+type_value+"&tag="+tag_value+"&policyTxt="+policyTxt_value+"&interpretationTxt="+interpretationTxt_value+"&policyFiles="+file_value+"&policyUrls="+uuid_value+"&interpretationFiles="+file_value2+"&new="+getPar("new")+"&update=1";
					if(json.id>'0')
					{
						alert("添加数据成功！");
						window.location.href="local_content.html?"+json_value;
					}
					else
					{
						alert("添加数据失败！");
					}
          		},//submit success
			
				error: function (data)
				{
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
		   names+=name+": "+obj[name]+", ";     
		}  
		alert(names);
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
	//alert(get_url_base());
	var path =get_url_base()+"/json/add_local_notes_json.php";
	//alert(path);
	var notes_add=create_one_add(path);
	//alert("1234567");
	notes_add.form="form1";
	//alert(news_add.form);
	notes_add.check_fn=function()
	{
		//alert("aaaaaaaaaa");
		//alert(image_count2)
		if($("#form1").find("input[name='policyName']").val()=="".trim())
		{
			alert("请输入政策名称！");
			location.replace(location.href);
			return false;
		}
		if($("#form1").find("input[name='publishDept']").val()=="".trim())
		{
			alert("请输入发布部门！");
			
			return false;
		}
		if($("#form1").find("input[name='policyNum']").val()=="".trim())
		{
			alert("请输入文号！");
			
			return false;
		}
		//province
		if($("#form1").find("input[name='province']").val()=="".trim())
		{
			alert("请输入或选择的省份！");
			
			return false;
		}
		if($("#form1").find("input[name='city']").val()=="".trim())
		{
			alert("请输入或选择的城市！");
			
			return false;
		}
		if($("#form1").find("input[name='policyCategoryTxt']").val()=="".trim())
		{
			alert("请输入政策类别！");
			 location.replace(location.href);
			return false;
		}
		if($("#form1").find("input[name='tag']").val()=="".trim())
		{
			alert("请输入标签!");
			return false;
		}
		if(($("#form1").find("textarea[name='policyTxt']").val()=="".trim())&&(image_count == 0))
		{
			alert("请输入政策原文！");
			
			return false;
		}
		if(($("#form1").find("textarea[name='InterpretationTxt']").val()=="".trim())&&(image_count2 == 100))
		{
			alert("请输入政策解读！");
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
	var image_count=0;
	
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
	
	function back_image_delete2(delete_button)
	{	
		var p_node=delete_button.parentNode.parentNode.parentNode;
		var div_node=p_node.parentNode;
		var image_node=p_node.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
		
		//添加hidden结点 根据该结点删除图片
		var div_list=document.getElementById("messages2");
		var p_one=document.createElement('div');
		p_one.innerHTML="<input name=\"xxytp2[]\" type=\"hidden\" value=\""+image_node.src+"\"/>";
		div_list.insertBefore(p_one,div_list.firstChild);
		
		//删除当前行
		div_node.removeChild(p_node);
	}
	
	var image_count2=100;
	
	function file_add2()
	{
		
		var div_list2=document.getElementById("messages2");
		var div_string2 =	"<div class=\"row\" style=\"margin-top:20px; padding-left:35%\">"+							
							"<div class=\"\" id=\"preview"+image_count2+"\" >"+
								"<img src=\"img/use.jpg\" height=\"152\" width=\"200\"  id=\"imghead"+image_count2+"\" class=\"img-responsive\" />"+
							"</div>"+
						"</div>"+
						"<div class=\"row\" style=\"margin-top:10px; padding-left:35%\">"+
							"<input type=\"file\"  name=\"uploadinput2[]\" onChange=\"previewImage(this,"+image_count2+")\" />"+
						"</div>";
			
		
		var div_one2=document.createElement("div");
		div_one2.innerHTML=div_string2;
		div_list2.appendChild(div_one2);
		image_count2+=1;
	}
	
	function file_delete2()
	{
		
		if(image_count2==0)
		{
			alert("图片列表为空");
			return;
		}
		
		var div_list=document.getElementById("messages2");
		
		var has_child = div_list.hasChildNodes(); 
		
		if(has_child==false)
		{
			return;
		}
		
		div_list.removeChild(div_list.childNodes[div_list.childNodes.length-1]);
		
		image_count2-=1;
		
	}
	
	
	var The_Year,The_Day,The_Month;
	var today;
	var Firstday;
	today = new Date();
	The_Year = today.getFullYear();
	//alert(The_Year);
	The_Month = today.getMonth() + 1;
	//alert(The_Month);
	
	
	//alert("上个月共"+bf_Days);
	//alert(Firstday);ShowCalendar
	ShowCalender(The_Year,The_Month);
	ShowCalender2(The_Year,The_Month);
	ShowCalender3(The_Year,The_Month);
	function RunNian(The_Year)
	{
		if ((The_Year%400==0) || ((The_Year%4==0) && (The_Year%100!=0)))
		return true;
		else
		return false;
	}
	function GetWeekday(The_Year,The_Month)
	{
	
		var startDay = new Date(The_Year, The_Month - 1, 1).getDay();
		//var Day1 = (new Date(The_Year, The_Month - 1, 1)-1).getDay();
		//alert(Day1);
		return startDay;
	}
	function ShowCalender(The_Year,The_Month)
	{
		var showstr;
		var Month_Day;
		var ShowMonth;
		var today;
		var Firstday;
		var bf_Days;
		var numRow = 0;
		Firstday = GetWeekday(The_Year,The_Month);
		bf_Days = new Date(The_Year, The_Month-1, 0).getDate();
		today = new Date();
		var year = today.getFullYear();      //本年
        var month = today.getMonth() + 1;    //本月
        var day = today.getDate();           //本日
		switch (The_Month)
		{
		case 1 : ShowMonth = "January"; Month_Day = 31; break;
		case 2 :
		ShowMonth = "February";
		if (RunNian(The_Year))
		Month_Day = 29;
		else
		Month_Day = 28;
		break;
		case 3 : ShowMonth = "March"; Month_Day = 31; break;
		case 4 : ShowMonth = "April"; Month_Day = 30; break;
		case 5 : ShowMonth = "May"; Month_Day = 31; break;
		case 6 : ShowMonth = "June"; Month_Day = 30; break;
		case 7 : ShowMonth = "July"; Month_Day = 31; break;
		case 8 : ShowMonth = "August"; Month_Day = 31; break;
		case 9 : ShowMonth = "September"; Month_Day = 30; break;
		case 10 : ShowMonth = "October"; Month_Day = 31; break;
		case 11 : ShowMonth = "November"; Month_Day = 30; break;
		case 12 : ShowMonth = "December"; Month_Day = 31; break;
		
		}
		showstr = "";
		showstr = "<h5 class=\"title clearfix\">"+
				     "<a data-original-title=\"Previous Month\" class=\"actionIcon pull-left\" onclick=\"prevmonth("+The_Year+","+The_Month+")\" rel=\"tooltip\" data-placement=\"right\">"+
    			       "<i class=\"uiIconMiniArrowLeft uiIconLightGray\"></i>"+
					 "</a>"+
				     "<span id=\"dateYM\">"+ShowMonth+", "+The_Year+"</span>"+
					 "<a data-original-title=\"Next Month\" class=\"actionIcon pull-right\" onclick=\"nextmonth("+The_Year+","+The_Month+")\" rel=\"tooltip\" data-placement=\"right\">"+
   					   "<i class=\"uiIconMiniArrowRight uiIconLightGray\" style=\"position:relative; top:-14px;\"></i>"+
					 "</a>"+
				  "</h5>"+
				  "<table class=\"weekList\">"+
                		"<tbody>"+
                    		"<tr>"+
                               "<td><font color=\"red\">S</font></td>"+
							   "<td>M</td>"+
							   "<td>T</td>"+
							   "<td>W</td>"+
							   "<td>T</td>"+
							   "<td>F</td>"+
							   "<td>S</td>"+
							"</tr>"+
						"</tbody>"+
					"</table>"+
					"<hr>"+
            		"<table cellspacing=\"0\" cellpadding=\"0\" class=\"weekDays\">"+
					"<tbody>";
					
		//alert(Firstday);
		if((day <= (7-Firstday))&&(The_Year == year)&&(The_Month == month))
		{
			showstr += "<tr class=\"currentWeek\">";
		}
		else
		{
			showstr += "<tr>";
		}
		for (i = Firstday; i >= 1; i--)
		{/**/
			showstr +="<td><a onclick=\"\" class=\"otherMonth\">"+(bf_Days-i+1)+"</a></td>";
			numRow++;
		}
		//alert(Month_Day);
		for (j=1; j<=Month_Day; j++)
		{
			//var dt = new Date(The_Year+"/"+The_Month, Month_Day).getDay());
			//alert(dt);
			if((day == j)&&(The_Year == year)&&(The_Month ==month))
			{
				showstr +="<td><a onclick=\"ShowCalendar("+j+")\" class=\"highLight today\">"+j+"</a></td>";
			}
			else
			{
				if(j<10)
				{
					showstr +="<td><a onclick=\"ShowCalendar("+j+")\" class=\"\">0"+j+"</a></td>";
				}
				else
				{
					showstr +="<td><a onclick=\"ShowCalendar("+j+")\" class=\"\">"+j+"</a></td>";
				}
			}
			
            numRow++;
            if (numRow == 7) {  //如果已经到一行（一周）了，重新创建tr
                numRow = 0;
				if((day <= (7+j))&&(day >= j)&&(The_Year == year)&&(The_Month == month))
				{
					showstr += "</tr><tr class=\"currentWeek\">";
				}
				else
				{
					showstr += '</tr><tr>';
				}
                
            } 
			
		}
		//alert("numRow"+numRow);
		if(numRow!=0)
		{
			var num = 7-numRow;
			for(i=1;i<=num;i++)
			{
				showstr +="<td><a onclick=\"\" class=\"otherMonth\">0"+i+"</a></td>";
				
			}
			showstr += '</tr>';
		}
		showstr += "</tbody></table>";
		showstr += "<div class=\"calendarTimeInput\">"+
                		"<span>"+
                    		"<input type=\"text\" onblur=\"this.parentNode.className=''\" onfocus=\"this.parentNode.className='focus'\" onkeyup=\"eXo.webui.UICalendar.setHour(this)\" value=\""+day+"\" maxlength=\"2\" class=\"InputTime\">:<input type=\"text\" onblur=\"this.parentNode.className=''\" onfocus=\"this.parentNode.className='focus'\" onkeyup=\"eXo.webui.UICalendar.setMinus(this)\" value=\"\" maxlength=\"2\" class=\"InputTime\">"+
                		"</span>"+
				"</div>";
		//alert(showstr);
		document.getElementById("cc").innerHTML = showstr;
	}
	function ShowCalender2(The_Year,The_Month)
	{
		
		var showstr;
		var Month_Day;
		var ShowMonth;
		var today;
		var Firstday;
		var bf_Days;
		var numRow = 0;
		Firstday = GetWeekday(The_Year,The_Month);
		bf_Days = new Date(The_Year, The_Month-1, 0).getDate();
		today = new Date();
		var year = today.getFullYear();      //本年
        var month = today.getMonth() + 1;    //本月
        var day = today.getDate();           //本日
		switch (The_Month)
		{
		case 1 : ShowMonth = "January"; Month_Day = 31; break;
		case 2 :
		ShowMonth = "February";
		if (RunNian(The_Year))
		Month_Day = 29;
		else
		Month_Day = 28;
		break;
		case 3 : ShowMonth = "March"; Month_Day = 31; break;
		case 4 : ShowMonth = "April"; Month_Day = 30; break;
		case 5 : ShowMonth = "May"; Month_Day = 31; break;
		case 6 : ShowMonth = "June"; Month_Day = 30; break;
		case 7 : ShowMonth = "July"; Month_Day = 31; break;
		case 8 : ShowMonth = "August"; Month_Day = 31; break;
		case 9 : ShowMonth = "September"; Month_Day = 30; break;
		case 10 : ShowMonth = "October"; Month_Day = 31; break;
		case 11 : ShowMonth = "November"; Month_Day = 30; break;
		case 12 : ShowMonth = "December"; Month_Day = 31; break;
		
		}
		showstr = "";
		showstr = "<h5 class=\"title clearfix\">"+
				     "<a data-original-title=\"Previous Month\" class=\"actionIcon pull-left\" onclick=\"prevmonth2("+The_Year+","+The_Month+")\" rel=\"tooltip\" data-placement=\"right\">"+
    			       "<i class=\"uiIconMiniArrowLeft uiIconLightGray\"></i>"+
					 "</a>"+
				     "<span id=\"dateYM2\">"+ShowMonth+", "+The_Year+"</span>"+
					 "<a data-original-title=\"Next Month\" class=\"actionIcon pull-right\" onclick=\"nextmonth2("+The_Year+","+The_Month+")\" rel=\"tooltip\" data-placement=\"right\">"+
   					   "<i class=\"uiIconMiniArrowRight uiIconLightGray\" style=\"position:relative; top:-14px;\"></i>"+
					 "</a>"+
				  "</h5>"+
				  "<table class=\"weekList\">"+
                		"<tbody>"+
                    		"<tr>"+
                               "<td><font color=\"red\">S</font></td>"+
							   "<td>M</td>"+
							   "<td>T</td>"+
							   "<td>W</td>"+
							   "<td>T</td>"+
							   "<td>F</td>"+
							   "<td>S</td>"+
							"</tr>"+
						"</tbody>"+
					"</table>"+
					"<hr>"+
            		"<table cellspacing=\"0\" cellpadding=\"0\" class=\"weekDays\">"+
					"<tbody>";
					
		//alert(Firstday);
		if((day <= (7-Firstday))&&(The_Year == year)&&(The_Month == month))
		{
			showstr += "<tr class=\"currentWeek\">";
		}
		else
		{
			showstr += "<tr>";
		}
		for (i = Firstday; i >= 1; i--)
		{/**/
			showstr +="<td><a onclick=\"\" class=\"otherMonth\">"+(bf_Days-i+1)+"</a></td>";
			numRow++;
		}
		//alert(Month_Day);
		for (j=1; j<=Month_Day; j++)
		{
			//var dt = new Date(The_Year+"/"+The_Month, Month_Day).getDay());
			//alert(dt);
			if((day == j)&&(The_Year == year)&&(The_Month ==month))
			{
				showstr +="<td><a onclick=\"ShowCalendar2("+j+")\" class=\"highLight today\">"+j+"</a></td>";
			}
			else
			{
				if(j<10)
				{
					showstr +="<td><a onclick=\"ShowCalendar2("+j+")\" class=\"\">0"+j+"</a></td>";
				}
				else
				{
					showstr +="<td><a onclick=\"ShowCalendar2("+j+")\" class=\"\">"+j+"</a></td>";
				}
			}
			
            numRow++;
            if (numRow == 7) {  //如果已经到一行（一周）了，重新创建tr
                numRow = 0;
				if((day <= (7+j))&&(day >= j)&&(The_Year == year)&&(The_Month == month))
				{
					showstr += "</tr><tr class=\"currentWeek\">";
				}
				else
				{
					showstr += '</tr><tr>';
				}
                
            } 
			
		}
		//alert("numRow"+numRow);
		if(numRow!=0)
		{
			var num = 7-numRow;
			for(i=1;i<=num;i++)
			{
				showstr +="<td><a onclick=\"\" class=\"otherMonth\">0"+i+"</a></td>";
				
			}
			showstr += '</tr>';
		}
		showstr += "</tbody></table>";
		showstr += "<div class=\"calendarTimeInput\">"+
                		"<span>"+
                    		"<input type=\"text\" onblur=\"this.parentNode.className=''\" onfocus=\"this.parentNode.className='focus'\" onkeyup=\"eXo.webui.UICalendar.setHour(this)\" value=\""+day+"\" maxlength=\"2\" class=\"InputTime\">:<input type=\"text\" onblur=\"this.parentNode.className=''\" onfocus=\"this.parentNode.className='focus'\" onkeyup=\"eXo.webui.UICalendar.setMinus(this)\" value=\"\" maxlength=\"2\" class=\"InputTime\">"+
                		"</span>"+
				"</div>";
		//alert(showstr);
		document.getElementById("cc2").innerHTML = showstr;
	}
	function ShowCalender3(The_Year,The_Month)
	{
		var showstr;
		var Month_Day;
		var ShowMonth;
		var today;
		var Firstday;
		var bf_Days;
		var numRow = 0;
		Firstday = GetWeekday(The_Year,The_Month);
		bf_Days = new Date(The_Year, The_Month-1, 0).getDate();
		today = new Date();
		var year = today.getFullYear();      //本年
        var month = today.getMonth() + 1;    //本月
        var day = today.getDate();           //本日
		switch (The_Month)
		{
		case 1 : ShowMonth = "January"; Month_Day = 31; break;
		case 2 :
		ShowMonth = "February";
		if (RunNian(The_Year))
		Month_Day = 29;
		else
		Month_Day = 28;
		break;
		case 3 : ShowMonth = "March"; Month_Day = 31; break;
		case 4 : ShowMonth = "April"; Month_Day = 30; break;
		case 5 : ShowMonth = "May"; Month_Day = 31; break;
		case 6 : ShowMonth = "June"; Month_Day = 30; break;
		case 7 : ShowMonth = "July"; Month_Day = 31; break;
		case 8 : ShowMonth = "August"; Month_Day = 31; break;
		case 9 : ShowMonth = "September"; Month_Day = 30; break;
		case 10 : ShowMonth = "October"; Month_Day = 31; break;
		case 11 : ShowMonth = "November"; Month_Day = 30; break;
		case 12 : ShowMonth = "December"; Month_Day = 31; break;
		
		}
		showstr = "";
		showstr = "<h5 class=\"title clearfix\">"+
				     "<a data-original-title=\"Previous Month\" class=\"actionIcon pull-left\" onclick=\"prevmonth3("+The_Year+","+The_Month+")\" rel=\"tooltip\" data-placement=\"right\">"+
    			       "<i class=\"uiIconMiniArrowLeft uiIconLightGray\"></i>"+
					 "</a>"+
				     "<span id=\"dateYM3\">"+ShowMonth+", "+The_Year+"</span>"+
					 "<a data-original-title=\"Next Month\" class=\"actionIcon pull-right\" onclick=\"nextmonth3("+The_Year+","+The_Month+")\" rel=\"tooltip\" data-placement=\"right\">"+
   					   "<i class=\"uiIconMiniArrowRight uiIconLightGray\" style=\"position:relative; top:-14px;\"></i>"+
					 "</a>"+
				  "</h5>"+
				  "<table class=\"weekList\">"+
                		"<tbody>"+
                    		"<tr>"+
                               "<td><font color=\"red\">S</font></td>"+
							   "<td>M</td>"+
							   "<td>T</td>"+
							   "<td>W</td>"+
							   "<td>T</td>"+
							   "<td>F</td>"+
							   "<td>S</td>"+
							"</tr>"+
						"</tbody>"+
					"</table>"+
					"<hr>"+
            		"<table cellspacing=\"0\" cellpadding=\"0\" class=\"weekDays\">"+
					"<tbody>";
					
		//alert(Firstday);
		if((day <= (7-Firstday))&&(The_Year == year)&&(The_Month == month))
		{
			showstr += "<tr class=\"currentWeek\">";
		}
		else
		{
			showstr += "<tr>";
		}
		for (i = Firstday; i >= 1; i--)
		{/**/
			showstr +="<td><a onclick=\"\" class=\"otherMonth\">"+(bf_Days-i+1)+"</a></td>";
			numRow++;
		}
		//alert(Month_Day);
		for (j=1; j<=Month_Day; j++)
		{
			//var dt = new Date(The_Year+"/"+The_Month, Month_Day).getDay());
			//alert(dt);
			if((day == j)&&(The_Year == year)&&(The_Month ==month))
			{
				showstr +="<td><a onclick=\"ShowCalendar3("+j+")\" class=\"highLight today\">"+j+"</a></td>";
			}
			else
			{
				if(j<10)
				{
					showstr +="<td><a onclick=\"ShowCalendar3("+j+")\" class=\"\">0"+j+"</a></td>";
				}
				else
				{
					showstr +="<td><a onclick=\"ShowCalendar3("+j+")\" class=\"\">"+j+"</a></td>";
				}
			}
			
            numRow++;
            if (numRow == 7) {  //如果已经到一行（一周）了，重新创建tr
                numRow = 0;
				if((day <= (7+j))&&(day >= j)&&(The_Year == year)&&(The_Month == month))
				{
					showstr += "</tr><tr class=\"currentWeek\">";
				}
				else
				{
					showstr += '</tr><tr>';
				}
                
            } 
			
		}
		//alert("numRow"+numRow);
		if(numRow!=0)
		{
			var num = 7-numRow;
			for(i=1;i<=num;i++)
			{
				showstr +="<td><a onclick=\"\" class=\"otherMonth\">0"+i+"</a></td>";
				
			}
			showstr += '</tr>';
		}
		showstr += "</tbody></table>";
		showstr += "<div class=\"calendarTimeInput\">"+
                		"<span>"+
                    		"<input type=\"text\" onblur=\"this.parentNode.className=''\" onfocus=\"this.parentNode.className='focus'\" onkeyup=\"eXo.webui.UICalendar.setHour(this)\" value=\""+day+"\" maxlength=\"2\" class=\"InputTime\">:<input type=\"text\" onblur=\"this.parentNode.className=''\" onfocus=\"this.parentNode.className='focus'\" onkeyup=\"eXo.webui.UICalendar.setMinus(this)\" value=\"\" maxlength=\"2\" class=\"InputTime\">"+
                		"</span>"+
				"</div>";
		//alert(showstr);
		document.getElementById("cc3").innerHTML = showstr;
	}
	function nextmonth(The_Year,The_Month) //下一月
	{
		if (The_Month==12)
		{	
			ShowCalender(The_Year+1,1);
		}
		else 
		{
			ShowCalender(The_Year,The_Month+1);
		}
	}
	
	function prevmonth(The_Year,The_Month) //上一月
	{
		if (The_Month==1)
		{
			ShowCalender(The_Year-1,12); 
		}
	 	else
		{
			ShowCalender(The_Year,The_Month-1);
		}
	}
	
	function prevyear(The_Year,The_Month) //上一年
	{
	 	ShowCalender(The_Year-1,The_Month);
	}
	
	function nextyear(The_Year,The_Month) //下一年
	{
	 	ShowCalender(The_Year+1,The_Month);
	}
	
	
	function nextmonth2(The_Year,The_Month) //下一月
	{
		if (The_Month==12)
		{	
			ShowCalender2(The_Year+1,1);
		}
		else 
		{
			ShowCalender2(The_Year,The_Month+1);
		}
	}
	
	function prevmonth2(The_Year,The_Month) //上一月
	{
		if (The_Month==1)
		{
			ShowCalender2(The_Year-1,12); 
		}
	 	else
		{
			ShowCalender2(The_Year,The_Month-1);
		}
	}
	function nextmonth3(The_Year,The_Month) //下一月
	{
		if (The_Month==12)
		{	
			ShowCalender3(The_Year+1,1);
		}
		else 
		{
			ShowCalender3(The_Year,The_Month+1);
		}
	}
	
	function prevmonth3(The_Year,The_Month) //上一月
	{
		if (The_Month==1)
		{
			ShowCalender3(The_Year-1,12); 
		}
	 	else
		{
			ShowCalender3(The_Year,The_Month-1);
		}
	}	