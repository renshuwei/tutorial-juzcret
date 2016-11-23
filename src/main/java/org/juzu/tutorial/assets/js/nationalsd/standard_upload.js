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

var imgPath = "/tutorial-juzcret/assets/net/wyun/";

(function($){

	$(document).ready(function(){
		
		$("#tcdPageCode").createPage({
			pageCount:20,
			current:1,
			backFn:function(p){     }
	    });
		
		$("#createDate").val(get_curr_time());
		
		$('#selectTag').change(function(){
			ShowToTextTag();
		}); //(ShowToTextTag);
		$('#standardType').change(function(){
			ShowToText();
		});
		
		$('#fileselect').click(function(){
			file_add();
		});
		
		$('#fileselect2').click(function(){
			file_delete();
		});
		
		$("#dijiao").click(function(){

			//validate form data before sending it to server
			if(validateForm()){
				$("#form1").submit();
			};
			
		});
		
		//uploading data 
		$("#form1").submit(function(e) {
				 
				    var formObj = $(this);
				    var formURL = formObj.attr("action");
				    var formData = new FormData(this);
				    $.ajax({
				        url: formURL,
				        type: 'POST',
				        data:  formData,
				        dataType: 'text',
				        mimeType:"multipart/form-data",
				        contentType: false,
				        cache: false,
				        processData:false,
				    success: function(data, textStatus, jqXHR)
				    {
				       console.log("post success: " + data);
				       //handle data here:
				       handle(data);
				       
				    },
				     error: function(jqXHR, textStatus, errorThrown) 
				     {
				    	 alert('递交数据失败： ' + errorThrown);
				     }          
				    });
				   // console.log("type of e: " + type(e));
				    e.preventDefault(); //Prevent Default action. 
				   // e.unbind();
		}); 
		
		function handle(data){
			//data: json data from server: standard
			//refresh the upload page here
			
		}
				
		
		function loadFiles(){
			console.log("file upload successfully!");
		}
		
		var file_one=creat_file_upload();
		file_one.messages="messages";
		file_one.fileselect="fileselect";
		file_one.filedrag="filedrag";
		file_one.submitbutton="submitbutton";

		if (window.File && window.FileList && window.FileReader) {
			file_one.Init();
		}
		
		
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
		
		document.getElementById("createDate").value = getNowFormatDate();
		
		function validateForm()
		{
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
			if($("#form1").find("textarea[name='text']").val()=="".trim())
			{
				alert("请输入标准原文！");
				return false;
			}
			
			return true;	
		}
		
		var image_count=0;
		
		function file_add()
		{
			
			var div_list=document.getElementById("messages");
			var div_string=	"<div class=\"row\" style=\"margin-top:20px; padding-left:35%\">"+							
								"<div class=\"\" id=\"preview"+image_count+"\" >"+
									"<img src=\"/tutorial-juzcret/assets/net/wyun/img/use.jpg\" height=\"152\" width=\"200\"  id=\"imghead"+image_count+"\" class=\"img-responsive\" />"+
								"</div>"+
							"</div>"+
							"<div class=\"row\" style=\"margin-top:10px; padding-left:35%\">"+
								"<input type=\"file\"  name=\"files\" onChange=\"previewImage(this,"+image_count+")\" />"+
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
		
		//得到错误时运行的内容
		function displayProp(obj){    
			var names="";       
			for(var name in obj){       
			   names+=name+": "+obj[name]+", ";     
			}  
			alert(names);
		}
		
		/*删除左右两端的空格*/
		function trim(str){ 
		　　  return str.replace(/(^s*)|(s*$)/g, "");
		}
		
		
		
	})
	
	
	function ShowToTextTag()
		{
			//alert("aaaaaaaaaaaaaaaaaaa");
			//document.form_name.publishDept.value = document.form_name.select_name.value;
			var selectTag = document.getElementById("selectTag").value;
			//alert(publishDept);
			document.getElementById("tag").value = selectTag;
		}
	
	
		function ShowToText()
		{
			//alert("aaaaaaaaaaaaaaaaaaa");
			//document.form_name.publishDept.value = document.form_name.select_name.value;
			var standardTypeObj = document.getElementById("standardType");
			//alert(standardTypeObj);
			var index=standardTypeObj.selectedIndex;//獲得選中項的索引
			//alert(index);
			var standardType=standardTypeObj.options[index].text;//选中的文本  
			//alert(publishDept);
			document.getElementById("standardTypeTxt").value = standardType;
		}
	
})($);

function previewImage(file,imgindex,falg){
	 
    var MAXWIDTH  = 200; 
    var MAXHEIGHT = 180;
    var div = document.getElementById("preview"+imgindex);
    if (file.files && file.files[0]){
        div.innerHTML ="<img id=imghead"+imgindex+">";
        var img = document.getElementById("imghead"+imgindex);
        img.onload = function(){
          var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
          img.width  =  rect.width;
          img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
          img.style.marginTop = rect.top+'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt){img.src = imgPath + "img/file.jpg";}
        reader.readAsDataURL(file.files[0]);
    }else{ //兼容IE
      var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
      file.select();
      file.blur();
      var src = document.selection.createRange().text;
		//alert(src);
      div.innerHTML = "<img id=imghead"+imgindex+">";
      var img = document.getElementById("imghead"+imgindex);
      
      img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)"; 
      img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = imgPath + "img/file.jpg";
      
      //alert(MAXHEIGHT+" "+MAXWIDTH +" "+img.offsetWidth + "   " + img.offsetHeight);
      //var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
      var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, 220, 130);
      status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
      div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
      
    }
  }
	
  function clacImgZoomParam( maxWidth, maxHeight, width, height ){
      var param = {top:0, left:0, width:width, height:height};
      if( width>maxWidth || height>maxHeight ){
          rateWidth = width / maxWidth;
          rateHeight = height / maxHeight;
          
          if( rateWidth > rateHeight ){
              param.width =  maxWidth;
              param.height = Math.round(height / rateWidth);
          }else{
              param.width = Math.round(width / rateHeight);
              param.height = maxHeight;
          }
      }
      param.left = Math.round((maxWidth - param.width) / 2);
      param.top = Math.round((maxHeight - param.height) / 2);
      return param;
  }
	