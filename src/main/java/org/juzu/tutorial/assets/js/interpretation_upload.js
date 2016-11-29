		 var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-146052-10']);
        _gaq.push(['_trackPageview']);
        (function() {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        })();
		
		/*
		$("#tcdPageCode").createPage({
        		pageCount:20,
        		current:1,
        		backFn:function(p){
					
			}
    	});
		*/
		
		function back()
		{
		//index1.html
			window.location.href="interpretation.html";
		}
		
		
		window.onload=function()
		{
			var people=http_get("people");
			var department=http_get("department");
			
			$("#people").val(people);
			$("#department").val(department);
			$("#date").val(get_curr_time());
		}

		//删除左右两端的空格
		function trim(str)
		{ 
　　   		return str.replace(/(^s*)|(s*$)/g, "");
　　 	}
		function get_month_number(month)
		{
			switch (month)
			{
				case 'January':
				  month = "1";
				  break;
				case 'February':
				  month = "2";
				  break;
				case 'March':
				  month = "3";
				  break;
				case 'April':
				  month = "4";
				  break;
				case 'May':
				  month = "5";
				  break;
				case 'June':
				  month = "6";
				  break;
				case 'July':
				  month = "7";
				  break;
				case 'August':
				  month = "8";
				  break;
				case 'September':
				  month = "9";
				  break;
				case 'October':
				  month = "10";
				  break;
				case 'November':
				  month = "11";
				  break;
				case 'December':
				  month = "12";
				  break;
			}
			return month;
		}
		function ShowCalendar(day)
		{
			//dateYM
			var dateYM = document.getElementById("dateYM").innerHTML;
			//alert(dateYM);
			var dateArray = dateYM.split(",");
			var year = trim(dateArray[1]);
			//alert(year);
			var month = trim(dateArray[0]);
			var month = get_month_number(month);
			//alert(month);
			var dateTime = year+'-'+month+'-'+day;
			//alert(dateTime);
			document.getElementById("startDate").value = dateTime;
		}
		function ShowCalendar2(day)
		{
			//dateYM
			var dateYM = document.getElementById("dateYM2").innerHTML;
			//alert(dateYM);
			var dateArray = dateYM.split(",");
			var year = trim(dateArray[1]);
			//alert(year);
			var month = trim(dateArray[0]);
			var month = get_month_number(month);
			//alert(month);
			var dateTime = year+'-'+month+'-'+day;
			//alert(dateTime);
			document.getElementById("activeDate").value = dateTime;
		}
		function ShowCalendar3(day)
		{
			//dateYM
			var dateYM = document.getElementById("dateYM3").innerHTML;
			//alert(dateYM);
			var dateArray = dateYM.split(",");
			var year = trim(dateArray[1]);
			//alert(year);
			var month = trim(dateArray[0]);
			var month = get_month_number(month);
			//alert(month);
			var dateTime = year+'-'+month+'-'+day;
			//alert(dateTime);
			document.getElementById("endDate").value = dateTime;
		}
		function ShowToText()
		{
			//alert("aaaaaaaaaaaaaaaaaaa");
			//document.form_name.publishDept.value = document.form_name.select_name.value;
			var publishDept = document.getElementById("selectPublishDept").value;
			//alert(publishDept);
			document.getElementById("publishDept").value = publishDept;
		}
		
		function ShowToText2()
		{
			//alert("aaaaaaaaaaaaaaaaaaa");
			//document.form_name.publishDept.value = document.form_name.select_name.value;
			var policyCategoryObj = document.getElementById("policyCategory");
			//alert(policyCategoryObj);
			var index=policyCategoryObj.selectedIndex;//獲得選中項的索引
			//alert(index);
			var policyCategory=policyCategoryObj.options[index].text;//选中的文本  
			//alert(publishDept);
			document.getElementById("policyCategoryTxt").value = policyCategory;
		}
		function ShowToTextTag()
		{
			//alert("aaaaaaaaaaaaaaaaaaa");
			//document.form_name.publishDept.value = document.form_name.select_name.value;
			var selectTag = document.getElementById("selectTag").value;
			//alert(publishDept);
			document.getElementById("tag").value = selectTag;
		}/**/
		
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