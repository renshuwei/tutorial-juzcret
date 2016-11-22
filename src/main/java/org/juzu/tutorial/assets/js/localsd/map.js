
var map = new AMap.Map("mapview", {
	resizeEnable: true,
	zoom:4,
	/*center:new AMap.LngLat(109.782437,19.181189)*/
});



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

$("#tcdPageCode").createPage({
		pageCount:20,
		current:1,
		backFn:function(p){
			
	}
});

function update_data()
{
	window.location.href="local_upload.html";
}	
// 路径配置
require.config({
	paths: {
		echarts: 'http://echarts.baidu.com/build/dist'
	}
});



var myChart;
var option;
var need_clear_selected=false;

// 使用
require(
	[
		'echarts',
		'echarts/chart/map' // 使用柱状图就加载bar模块，按需加载
	],
	function (ec) {
		// 基于准备好的dom，初始化echarts图表
	   myChart = ec.init(document.getElementById('main')); 
		
	   option = {
			tooltip : {
				trigger: 'item',
				formatter: '{b}'
			},
			series : [
				{
					name: '中国',
					type: 'map',
					mapType: 'china',
					selectedMode : 'multiple',
					itemStyle:{
						normal:{label:{show:true}},
						emphasis:{label:{show:true}}
					},
					data:[
						/*{name:'浙江',selected:true}*/
					]
				}
			]
		};
		
		choose_init();
		//choose_all();
		//choose_empty();
		
		var ecConfig = require('echarts/config');
		myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
			
			var selected = param.selected;
			
			//alert(selected[0]);
			
			var str = '当前选择： ';
			for (var p in selected) {
				str += p + ' '+selected[p]+" || ";
				if (selected[p]) {
					//str += p + ' '+selected[p]+" || ";
				}
			}
			//document.getElementById('wrong-message').innerHTML = str;
			//alert(str);
		})
		// 为echarts对象加载数据 
		myChart.setOption(option); 
	}
);



function click_all(box)
{
	if(box.checked==false)
	{
		choose_empty();
	}else
	{
		choose_all();
	}
	
}


var citys=["新疆","西藏","内蒙古","青海","四川","黑龙江","甘肃","云南","广西","湖南","陕西","广东","吉林","河北","湖北","贵州","山东","江西","河南","辽宁","山西","安徽","福建","浙江","江苏","重庆","宁夏","海南","台湾","北京","天津","上海","香港","澳门","南海诸岛"];

function choose_init()
{
	
	var i=0;
	
	for(i in citys)
	{ 
		option['series'][0]['data'].push({name:citys[i],selected:false});
	}
	
}



function choose_all_2()
{
	
	var i=0;
	
	option['series'][0]['data']=[];
	
	for(i in citys)
	{ 
		option['series'][0]['data'].push({name:citys[i],selected:true});
	}
	
	
	myChart.setOption(option);
}
		
		
function choose_empty_2()
{
	
	var i=0;
	
	option['series'][0]['data']=[];
	
	for(i in citys)
	{ 
		option['series'][0]['data'].push({name:citys[i],selected:false});
	}
	
	myChart.setOption(option);
	
	option['series'][0]['data']=[];
	
	//myChart.setOption(option);
}



function choose_all()
{
	
	
	var i=0;
	var str="";
	for(i in citys)
	{ 
		option['series'][0]['data'][i]["selected"]=true;
		str+=option['series'][0]['data'][i]["name"]+" "+option['series'][0]['data'][i]["selected"]+"   ";
	}
	
	
	myChart.setOption(option);
	
	
	//myChart.chart.map.showTip({'name':'上海'});
	
}
		
		
function choose_empty()
{
	
	var i=0;
	var str="";
	for(i in citys)
	{ 
		option['series'][0]['data'][i]["selected"]=false;
		str+=option['series'][0]['data'][i]["name"]+" "+option['series'][0]['data'][i]["selected"]+"   ";
	}
	
	
	myChart.setOption(option);
}
