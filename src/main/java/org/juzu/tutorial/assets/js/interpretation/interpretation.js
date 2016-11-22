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
	window.location.href="interpretation_upload.html";
}	

var button_str;
function get_button_value(button_str)
{
	var class_str;
	//alert(document.getElementById("btn1").value);
	document.getElementById("btn1").value = button_str;
	//alert(document.getElementById("btn1").value);
	document.getElementById("btn1").innerHTML= button_str+"<span class=\"caret\" style=\"margin-top:8px;\"></span>";
	//alert(document.getElementById("btn1").value);
	document.getElementById("class").value = button_str;
	//alert(document.getElementById("class").value);
}