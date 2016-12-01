//alert("aaaaaaaaa");
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
	var name = decodeURI(getPar("name"));
	var num = decodeURI(getPar("num"));
	var createDate = decodeURI(getPar("createDate"));
	var dept = decodeURI(getPar("dept"));
	var policy_files_name = decodeURI(getPar("policyFiles"));
	//alert(files_name)
	var policy_files_name_arr = policy_files_name.split(";");
	var policy_urls = decodeURI(getPar("policyUrls"));
	var policy_urls_arr = policy_urls.split(";");
	var i=0;
	var result_str ="<h3 style=\"color:#999999; text-align:center;\">"+name+"</h3>"+
                     "<p style=\"font-size:15px; margin:0; padding:0; text-align:center; color:#999999;\">文号："+num+"</p>"+
            		 "<p style=\"font-size:15px; margin:0; padding:0; text-align:center; color:#999999;\">"+createDate+"&nbsp;&nbsp;&nbsp;&nbsp;"+dept+"</p>";
	//alert(result_str);
	for(i=0;i<policy_files_name_arr.length-1;i++)
    {
		var result_str = result_str +"<div style=\"width:100%; margin-top:30px; border:1px solid #578DC9;\" onclick=\"window.open('"+policy_urls_arr[i]+"')\">"+
                                        "<p style=\"font-size:15px; margin:0; padding:0; color:#999999;height:200px;\">"+
											"<div style=\"margin-top:-180px; padding-left:35%\">"+
											   "<img src=\"img/file.jpg\" id=\"file\"  height=\"152\" width=\"200\"/></p>"+
												"<div style=\"margin:0 auto\">"+
												   "<a href=\""+policy_urls_arr[i]+"\" target=\"_blank\">"+policy_files_name_arr[i]+"</a>"+                                        "</div>"+
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
		window.location.href="map.html";
	}
	else if(getPar("new")=="1")
	{
		window.location.href="new_local.html";
	}
}
