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
		
		function back()
		{
			window.location.href=get_url_base()+"/map.html";
		}
		
		
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
		function ShowToTextProvince()
		{
			//alert("aaaaaaaaaaaaaaaaaaa");
			//document.form_name.publishDept.value = document.form_name.select_name.value;
			
			var province = document.getElementById("selectProvince").value;
			//alert(publishDept);
			document.getElementById("province").value = province;
			//document.getElementById("seleCity").options.length = 0;
			initcity(province);
			
		}
		function ShowToTextCity()
		{
			//alert("aaaaaaaaaaaaaaaaaaa");
			//document.form_name.publishDept.value = document.form_name.select_name.value;
			var city = document.getElementById("selectCity").value;
			//alert(publishDept);
			document.getElementById("city").value = city;
			//document.getElementById("seleCity").options.length = 0;
			
		}
		function initcity(province) {
			switch (province) {
				case "安徽":
				  var cityOptions = new Array("合肥", "芜湖", "蚌埠", "阜阳", "淮南","安庆", "宿州","六安","淮北","滁州","马鞍山","铜陵","宣城","亳州","黄山","池州");
				  break;
				case "北京":
				  var cityOptions = new Array( "北京");
				  break;
				case "重庆":
				  var cityOptions = new Array("重庆");
				  break;
				case "福建":
				  var cityOptions = new Array("福州","厦门","泉州","莆田","漳州","宁德","三明", "南平", "龙岩","晋江",  "南安");
				  break;
				case "甘肃":
				 var cityOptions = new Array("兰州","天水", "白银","庆阳","平凉","酒泉","张掖", "武威","定西", "金昌","陇南","临夏", "嘉峪关","甘南" );
				  break;
				case "广东":
				  var cityOptions = new Array("深圳","广州","东莞","佛山","中山","珠海","惠州", "江门", "汕头","湛江","肇庆", "茂名",  "揭阳", "梅州", "潮州", "顺德", "惠东", "博罗");
				  break;
				case "广西":
				  var cityOptions = new Array("南宁", "柳州", "桂林", "玉林", "梧州", "北海", "贵港", "钦州", "百色", "河池");
				  break;
				 case "贵州":
				  var cityOptions = new Array("贵阳","遵义","黔东南","黔南","六盘水", "毕节","铜仁","安顺","黔西南");
				  break;
				case "海南":
				  var cityOptions = new Array("海口","三亚","五指山","三沙","琼海");
				  break;
				case "河北":
				 var cityOptions = new Array("石家庄", "保定", "唐山","廊坊","邯郸","秦皇岛","沧州","邢台","衡水","张家口");
				  break;
		
				case "河南":
				  var cityOptions = new Array("郑州", "洛阳", "新乡", "南阳", "许昌", "平顶山", "安阳", "焦作", "商丘", "开封", "濮阳", "周口","信阳","驻马店");
				  break;
				case "湖北":
				  var cityOptions = new Array("武汉", "宜昌", "襄阳", "荆州", "十堰", "黄石", "孝感", "黄冈", "恩施", "荆门","咸宁", "鄂州");
				  break;
				case "湖南":
				  var cityOptions = new Array("长沙", "株洲", "益阳", "常德", "衡阳", "湘潭", "岳阳", "郴州", "邵阳", "怀化", "永州", "娄底", "湘西", "张家界");
				  break;
				case "江苏":
				  var cityOptions = new Array("南京","苏州","无锡", "常州", "徐州", "南通", "扬州", "盐城", "淮安", "连云港", "泰州", "宿迁", "镇江");
				  break;
				case "江西":
				  var cityOptions = new Array("南昌", "赣州", "九江", "宜春", "吉安", "上饶", "萍乡", "抚州", "景德镇", "新余", "鹰潭");
				  break;
				case "吉林":
				  var cityOptions = new Array("长春","吉林", "四平", "延边", "松原", "白城", "通化", "白山", "辽源");
				  break;
				case "辽宁":
				  var cityOptions = new Array("沈阳", "大连", "鞍山", "锦州", "抚顺", "营口", "盘锦", "朝阳", "丹东", "辽阳", "本溪", "葫芦岛", "铁岭", "阜新");
				  break;
				case "黑龙江":
				  var cityOptions = new Array("哈尔滨", "大庆", "齐齐哈尔", "牡丹江", "绥化", "佳木斯", "鸡西", "双鸭山", "鹤岗", "黑河", "伊春", "七台河", "大兴安岭");
				  break;
				case "内蒙古":
				  var cityOptions = new Array("呼和浩特","包头", "赤峰", "鄂尔多斯", "通辽","呼伦贝尔","巴彦淖尔","乌兰察布","锡林郭勒盟","兴安盟","乌海","阿拉善盟");
				  break;
				case "宁夏":
				  var cityOptions = new Array("银川","吴忠","石嘴山","中卫", "固原" );
				  break;
				case "青海":
				  var cityOptions = new Array("西宁","海西","海北","果洛","海东", "黄南","玉树", "海南" );
				  break;
				case "山东":
				  var cityOptions = new Array("青岛","济南", "烟台", "潍坊", "临沂", "淄博", "济宁", "泰安", "聊城", "威海", "枣庄", "德州", "日照", "东营", "菏泽", "滨州", "莱芜");
				  break;
				case "上海":
				  var cityOptions = new Array("上海");
				  break;
				case "山西":
				  var cityOptions = new Array("太原", "临汾","大同","运城","晋中","长治","晋城","阳泉","吕梁","忻州", "朔州");
				  break;
				case "陕西":
				  var cityOptions = new Array("西安","咸阳","宝鸡","渭南","汉中","榆林","延安","安康","商洛", "铜川");
				  break;
				case "四川":
				  var cityOptions = new Array("成都","绵阳","德阳","南充","宜宾","自贡","乐山","泸州","达州","内江","遂宁","攀枝花","眉山","广安","资阳", "凉山","广元", "雅安","巴中", "阿坝","甘孜");
				  break;
				case "天津":
				  var cityOptions = new Array("天津");
				  break;
				case "新疆":
				  var cityOptions = new Array("乌鲁木齐","昌吉","巴音郭楞","伊犁","阿克苏", "喀什", "哈密","克拉玛依","博尔塔拉","吐鲁番","和田","石河子","克孜勒苏", "阿拉尔", "五家渠", "图木舒克","库尔勒");
				  break;
				case "西藏":
				  var cityOptions = new Array("拉萨","日喀则","山南","林芝","昌都","那曲","阿里");
				  break;
				case "云南":
				  var cityOptions = new Array("昆明","曲靖", "大理", "红河","玉溪","丽江","文山","楚雄", "西双版纳", "昭通","德宏",  "普洱", "保山","临沧","迪庆", "怒江");
				  break;
				case "浙江":
				  var cityOptions = new Array("杭州","宁波", "温州", "金华", "嘉兴","台州","绍兴", "湖州", "丽水", "衢州", "舟山", "乐清", "瑞安", "义乌", "余姚", "诸暨", "象山", "温岭", "桐乡", "慈溪", "长兴", "嘉善", "海宁", "德清");
				  break;
				case "其他":
				  var cityOptions = new Array("香港","澳门","台湾","钓鱼岛");
				  break;
				}
				document.getElementById("selectCity").options.length = 0; 
				for (var i = 0; i < cityOptions.length; i++) {
				  //alert(cityOptions[i * 2]);
				  var sel = document.getElementById("selectCity");
				  var option = new Option(cityOptions[i], cityOptions[i]);      
				  sel.options.add(option);
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
       
	    