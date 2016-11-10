

function creat_file_upload()
{
	var object={};	
	
	object.messages="messages";
	object.fileselect="fileselect";
	object.filedrag="filedrag";
	object.submitbutton="filedrag";
	
	object.Output=function(msg) 
	{
		var m = document.getElementById(object.messages);
		m.innerHTML = msg + m.innerHTML;
	}
	
	
	object.FileDragHover=function(e) 
	{
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}
	
	
	object.FileSelectHandler=function(e) 
	{
		
		object.FileDragHover(e);

		var files = e.target.files || e.dataTransfer.files;
		
		for (var i = 0, f; f = files[i]; i++) {
			object.ParseFile(f);
		}

	}
	
	
	object.ParseFile=function(file) 
	{
		object.Output(
			"<p>文件名: <strong>" + file.name +
			"</strong>&nbsp;&nbsp;&nbsp;类型: <strong>" + file.type +
			"</strong>&nbsp;&nbsp;&nbsp;大小: <strong>" + file.size +
			"</strong> bytes</p>"
		);

	}
	
	
	object.Init=function() {
		
		
		var fileselect = document.getElementById(object.fileselect);
		var	filedrag = document.getElementById(object.filedrag);
		var	submitbutton = document.getElementById(object.submitbutton);
		
		
		fileselect.addEventListener("change", object.FileSelectHandler, false);
		
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {
			
			// file drop
			filedrag.addEventListener("dragover", object.FileDragHover, false);
			filedrag.addEventListener("dragleave", object.FileDragHover, false);
			filedrag.addEventListener("drop", object.FileSelectHandler, false);
			filedrag.style.display = "block";

			// remove submit button
			submitbutton.style.display = "none";
			
		}

	}
	
	
	return object;
}




/*
(function() {


	// getElementById
	function sid(id) {
		return document.getElementById(id);
	}
	
	// output information
	function Output(msg) {
		var m = document.getElementById("messages");
		m.innerHTML = msg + m.innerHTML;
	}
	
	// file drag hover
	function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}
	
	// file selection
	function FileSelectHandler(e) {

		// cancel event and hover styling
		FileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			ParseFile(f);
		}

	}
	
	// output file information
	function ParseFile(file) {

		Output(
			"<p>文件名: <strong>" + file.name +
			"</strong> 类型: <strong>" + file.type +
			"</strong> 大小: <strong>" + file.size +
			"</strong> bytes</p>"
		);

	}
	
	// initialize
	function Init() {
		
		var fileselect = document.getElementById("fileselect");
		var	filedrag = document.getElementById("filedrag");
		var	submitbutton = document.getElementById("submitbutton");
		

		// file select
		fileselect.addEventListener("change", FileSelectHandler, false);

		// is XHR2 available?
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {
			
			// file drop
			filedrag.addEventListener("dragover", FileDragHover, false);
			filedrag.addEventListener("dragleave", FileDragHover, false);
			filedrag.addEventListener("drop", FileSelectHandler, false);
			filedrag.style.display = "block";

			// remove submit button
			submitbutton.style.display = "none";
			
		}

	}
	
	// call initialization file
	if (window.File && window.FileList && window.FileReader) {
		
		Init();
	}
	
})();
*/