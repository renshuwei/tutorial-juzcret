/*获取url地址*/
function get_url_base()
{
	var local_url = document.location.href;
	
	var get_index=local_url.indexOf("=");
	if(get_index !=-1)
	{
		local_url=local_url.substring(0,get_index);
	}
	
	var dir_index=local_url.lastIndexOf("/");
	if(dir_index !=-1)
	{
		local_url=local_url.substring(0,dir_index);
	}
	
	return local_url;
}

//获得参数
var par;
function getPar(par){
	//获取当前URL
	var local_url = document.location.href; 
	//获取要取得的get参数位置
	var get = local_url.indexOf(par +"=");
	if(get == -1){
		return false;   
	}   
	//截取字符串
	var get_par = local_url.slice(par.length + get + 1);    
	//判断截取后的字符串是否还有其他get参数
	var nextPar = get_par.indexOf("&");
	if(nextPar != -1){
		get_par = get_par.slice(0, nextPar);
	}
	
	return get_par;
}