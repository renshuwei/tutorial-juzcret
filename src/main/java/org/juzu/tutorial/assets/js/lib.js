	/*
 	 *   获取XMLHttpRequest
 	 */
	function GetXmlHttpObject()
	{
		var xml=null;

		try
		{
			// Firefox, Opera 8.0+, Safari
			xml=new XMLHttpRequest();
			
		}
		catch (e)
		{
			// Internet Explorer
			try
			{
				xml=new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e)
			{
				xml=new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		
		return xml;
	}
	
	
	
	/*
	 *  解析字符串获取xml结构数据
	 */
	function loadXML(xmlString){  
      
        var xmlDoc;  
        if (window.ActiveXObject)  
        {  
            xmlDoc = new ActiveXObject('Microsoft.XMLDOM');  
            if(!xmlDoc) xmldoc = new ActiveXObject("MSXML2.DOMDocument.3.0");  
            xmlDoc.async = false;  
            xmlDoc.loadXML(xmlString);  
        }else if (document.implementation && document.implementation.createDocument)  
        {  
            var domParser = new DOMParser();  
            xmlDoc = domParser.parseFromString(xmlString, 'text/xml');  
        }else  
        {  
            return null;  
        }  
        return xmlDoc;  
    }  
	
	
	
	/*
	 *	将换行符替换为<p></p>
	 */
	function  nl2p(str)
	{
		return "<p>"+str.replace(/\n/g, "</p><p>")+"</p>";
	}
	
	
	
	
	/*
 	 *	xml中获取key对应的value值
 	 */
	function get_value_from_key(buy_one,key)
	{
		var value="";
		
		if(buy_one.getElementsByTagName(key)[0].childNodes.length!=0)
		{
			value=buy_one.getElementsByTagName(key)[0].childNodes[0].nodeValue;
		}
		
		return value;
	}
	
	
	
	/*
	 *	删除parent的子元素
	 */
	function delete_child(parent)
	{
    	var childs =parent.childNodes;
        for(var i=childs.length;i--;i>0){
        	if( childs[i].hasChildNodes() ){
            	delete_child(childs[i]);
           	}else{
                  parent.removeChild(childs[i]);
            }
         }
          
         for(var i=childs.length;i--;i>0){
             parent.removeChild(childs[i]);
         }
     }
	 
	 /*
	  *	获取url中的所有GET参数
	  */
	 function http_get_list()
	 {
		//获取当前URL
    	var local_url = document.location.href;
		var get=local_url.indexOf("?");
		if(get==-1)
		{
			return "";	
		}
		
		var get_par = local_url.slice(get+1); 
		
		return get_par;
	 }
	 
	 
	/*
	 *	获取URL地址中的GET参数
	 */
	 function http_get(par)
	 {
		 /*
		 //获取当前URL
    	var local_url = document.location.href;
		
    	//获取要取得的get参数位置
    	var get = local_url.indexOf(par +"=");
    	if(get == -1){
        	return "";   
    	}   
    	//截取字符串
    	var get_par = local_url.slice(par.length + get + 1);    
    	//判断截取后的字符串是否还有其他get参数
    	var nextPar = get_par.indexOf("&");
    	if(nextPar != -1){
    	    get_par = get_par.slice(0, nextPar);
    	}
    	return get_par;
		 */
		 return http_get_new(par);
	 }
	 
	 function http_get_new(par)
	 {
		 var local_url = document.location.href;
		 var strs=local_url.split("?");
		 if(strs.length<2)
		 {
			return "";	 
		 }
		 
		 var pars=strs[1];
		 
		 var par_list=pars.split("&");
		 
		 for(var i=0;i<par_list.length;i++)
		 {
		 	var par_name=par_list[i];
			
			var key_value=par_name.split("=");
			
			if(key_value.length!=2)
			{
				continue;	
			}
			
			if(key_value[0]==par)
			{
				return key_value[1];	
			}
		 }
		 
		 
		 return "";
	 }
	 
	 
	 
	function replace_http_val(oldUrl, paramName, replaceWith) {
    	var re = eval('/(' + paramName + '=)([^&]*)/gi');
    	var nUrl = oldUrl.replace(re, paramName + '=' + replaceWith);
    	return nUrl;
	}
	
	
	 
	 
	 
	/*
	 *	取Cookie的值
	 */
	 
	function get_cookie(name) {
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen) {
			var j = i + alen;
			
			if (document.cookie.substring(i, j) == arg) 
			{
				return get_cookie_val(j);
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) break;
		}
		return null;
	}

	
	function get_cookie_val(offset) 
	{
		var endstr = document.cookie.indexOf(";", offset);
		if (endstr == -1) endstr = document.cookie.length;
		return unescape(document.cookie.substring(offset, endstr));
	}
	
	
	/*
	 *	写入到Cookie,当前网页能访问
	 */
	 
	function set_cookie(name, value, expires) {
		var argv = set_cookie.arguments;
		//本例中length = 3
		var argc = set_cookie.arguments.length;
		var expires = (argc > 2) ? argv[2] : null;
		var path = (argc > 3) ? argv[3] : null;
		var domain = (argc > 4) ? argv[4] : null;
		var secure = (argc > 5) ? argv[5] : false;
		document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
	}

	
	/*
	 *	写入到Cookie,整个网站都能访问 
	 */
	function set_cookie_all(name, value, expires) {
		var argv = set_cookie_all.arguments;
	//本例中length = 3
	var argc = set_cookie_all.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? ("; path=/") : ("; path=/")) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
	}
	
	
	function reset_cookie() {
		
	}
	
	
	
	/*
	 *	检查邮件
	 */
	function check_email(email)
	{
		var regu=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		var re = new RegExp(regu);
		if (re.test(email)) {
			return true;
		} else {
			return false;
		}
	}
	
	
	/*
	 *  检查手机号
	 */	
	function check_phone(phone)
	{
		var regu=/^[1][0-9][0-9]{9}$/;
		var re = new RegExp(regu);
		if (re.test(phone)) {
			return true;
		} else {
			return false;
		}
	}  
	
	function check_num(num)
	{
		var regu=/^\+?[1-9][0-9]*$/;
		var re = new RegExp(regu);
		if (re.test(num)) {
			return true;
		} else {
			return false;
		}
	} 
	
	
	
	//IE上js不支持trim
	String.prototype.trim = function() 
    { 
      return this.replace(/(^\s*)|(\s*$)/g, ""); 
    } 

	
	