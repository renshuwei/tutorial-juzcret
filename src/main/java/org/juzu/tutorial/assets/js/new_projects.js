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
	//window.location.href="input2.html";
}