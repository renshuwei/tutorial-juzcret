		function back()
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
		
		
		
		 //图片上传预览    IE是用了滤镜。
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
              reader.onload = function(evt){img.src = "img/file.jpg";}
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
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = "img/file.jpg";
            
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
       