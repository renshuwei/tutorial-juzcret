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


var intfUrl = 'xml/post_file.php';
/*policyName=新能源车补贴政策&publishDept=工信部&policyNum=NYC10853&policyCategory=新能源&startDate=Wed Sep 09 2015 00:00:00 GMT+0800&activeDate=Sat Oct 10 2015 00:00:00 GMT+0800&endDate=Sat Oct 11 2025 00:00:00 GMT+0800&tag=新能源、补贴、政策&author=张三&dept=政策研究部&createDate=Tue Oct 11 2016 00:00:00 GMT+0800&policyEncrpLevel=1&InterpretationEncrpLevel=1&policyFiles=xnybt.doc;xnypt.txt;&InterpretationFiles=xnybtjd.doc;xnyptjd.txt;*/
	$(function(){
	var dropbox = $('#dropbox'),
		message = $('.message', dropbox);
		
	dropbox.filedrop({
		// The name of the $_FILES entry:
		//alert(file);
		paramname:'pic',
		
		maxfiles: 5,
    	maxfilesize: 2,
		url: intfUrl,
			
		uploadFinished:function(i,file,response){
			$.data(file).addClass('done');
			alert('return status value:'+ response.status);
			/*
			alert('return policyName value:'+ response.policyName);
			alert('return publishDept value:'+ response.publishDept);
			alert('return policyNum value:'+ response.policyNum);
			alert('return policyCategory value:'+ response.policyCategory);
			alert('return startDate value:'+ response.startDate);
			alert('return activeDate value:'+ response.activeDate);
			alert('return endDate value:'+ response.endDate);
			alert('return tag value:'+ response.tag);
			alert('return author value:'+ response.author);
			alert('return dept value:'+ response.dept);
			alert('return createDate value:'+ response.createDate);
			alert('return policyPerm value:'+ response.policyPerm);
			alert('return InterpretationPerm value:'+ response.InterpretationPerm);
			alert('return policyEncrpLevel value:'+ response.policyEncrpLevel);
			alert('return InterpretationEncrpLevel value:'+ response.InterpretationEncrpLevel);
			alert('return policyTxt value:'+ response.policyTxt);
			alert('return policyFiles value:'+ response.policyFiles);
			alert('return InterpretationTxt value:'+ response.InterpretationTxt);
			alert('return InterpretationFiles value:'+ response.InterpretationFiles);
			*/
			
			if(response.sql_status=='1'){
				alert('添加数据成功！');
			}
			else if(response.sql_status=='0'){
				alert('return sql value:'+ response.sql);
				alert('添加数据失败，请检查表文件内字段合法性！');
			}
		},
		
    	error: function(err, file) {
			switch(err) {
				case 'BrowserNotSupported':
					showMessage('Your browser does not support HTML5 file uploads!');
					break;
				case 'TooManyFiles':
					alert('Too many files! Please select 5 at most! (configurable)');
					break;
				case 'FileTooLarge':
					alert(file.name+' is too large! Please upload files up to 2mb (configurable).');
					break;
				default:
					break;
			}
		},
		
		// Called before each upload is started
		beforeEach: function(file){
			//alert(file);
			//handleDrop(file);			 
			//if(!file.type.match(/^image\//)){
				
				//alert('Only images are allowed!');
				
				// Returning false will cause the
				// file to be rejected
				//return false;
			//}
		},
		
		uploadStarted:function(i, file, len){
			createImage(file);
		},
		
		progressUpdated: function(i, file, progress) {
			$.data(file).find('.progress').width(progress);
		}
    	 
	});
	
	var template = '<div class="preview">'+
						'<span class="imageHolder">'+
							'<img />'+
							'<span class="uploaded"></span>'+
						'</span>'+
						'<div class="progressHolder">'+
							'<div class="progress"></div>'+
						'</div>'+
					'</div>'; 
	
	
	function createImage(file){

		var preview = $(template), 
			image = $('img', preview);
			
		var reader = new FileReader();
		
		image.width = 100;
		image.height = 100;
		
		reader.onload = function(e){
			
			// e.target.result holds the DataURL which
			// can be used as a source of the image:
			
			image.attr('src',e.target.result);
			if(!file.type.match(/^image\//))
			{
				image.attr('src',get_url_base()+'/img/file.jpg');	
			}
		};
		
		// Reading the file as a DataURL. When finished,
		// this will trigger the onload function above:
		reader.readAsDataURL(file);
		
		message.hide();
		preview.appendTo(dropbox);
		
		// Associating a preview container
		// with the file, using jQuery's $.data():
		
		$.data(file,preview);
	}
	function displayProp(obj){    
    	var names="";       
		for(var name in obj){       
		   names+=name+": "+obj[name]+", "; 
		 
		}  
		return names; 
	}

	
	function showMessage(msg){
		message.html(msg);
	}

});