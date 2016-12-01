/*
 * Default text - jQuery plugin for html5 dragging files from desktop to browser
 *
 * Author: Weixi Yen
 *
 * Email: [Firstname][Lastname]@gmail.com
 * 
 * Copyright (c) 2010 Resopollution
 * 
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.github.com/weixiyen/jquery-filedrop
 *
 * Version:  0.1.0
 *
 * Features:
 *      Allows sending of extra parameters with file.
 *      Works with Firefox 3.6+
 *      Future-compliant with HTML5 spec (will work with Webkit browsers and IE9)
 * Usage:
 * 	See README at project homepage
 *
 */
(function($){

	jQuery.event.props.push("dataTransfer");
	var opts = {},
		default_opts = {
			url: '',
			refresh: 1000,
			paramname: 'userfile',
			maxfiles: 25,
			maxfilesize: 1, // MBs
			data: {},
			drop: empty,
			dragEnter: empty,
			dragOver: empty,
			dragLeave: empty,
			docEnter: empty,
			docOver: empty,
			docLeave: empty,
			beforeEach: empty,
			afterAll: empty,
			rename: empty,
			error: function(err, file, i){alert(err);},
			uploadStarted: empty,
			uploadFinished: empty,
			progressUpdated: empty,
			speedUpdated: empty
		},
		errors = ["BrowserNotSupported", "TooManyFiles", "FileTooLarge"],
		doc_leave_timer,
		stop_loop = false,
		files_count = 0,
		files;

	$.fn.filedrop = function(options) {
		opts = $.extend( {}, default_opts, options );
		
		this.bind('drop', drop).bind('dragenter', dragEnter).bind('dragover', dragOver).bind('dragleave', dragLeave);
		$(document).bind('drop', docDrop).bind('dragenter', docEnter).bind('dragover', docOver).bind('dragleave', docLeave);
	};
     
	function drop(e) {
		opts.drop(e);
		files = e.dataTransfer.files;
		if (files === null || files === undefined) {
			opts.error(errors[0]);
			return false;
		}
		
		files_count = files.length;
		upload();
		e.preventDefault();
		return false;
	}
	
	function getBuilder(filename, filedata, boundary, parm_str) {
		var dashdash = '--',
			crlf = '\r\n',
			builder = '';

		$.each(opts.data, function(i, val) {
	    	if (typeof val === 'function') val = val();
			builder += dashdash;
			builder += boundary;
			builder += crlf;
			builder += 'Content-Disposition: form-data; name="'+i+'"';
			builder += crlf;
			builder += crlf;
			builder += val;
			builder += crlf;
		});
		//alert(parm_str);
		parm_arr = parm_str.split("&");
		for(j=0;j<parm_arr.length;j++){
			//alert(parm_arr[j]);
			value_arr = parm_arr[j].split("=");
			//alert('old parm name:'+value_arr[0]);
			//alert('old parm value:'+value_arr[1]);
			builder += dashdash;
			builder += boundary;
			builder += crlf;
			builder += 'Content-Disposition: form-data; name="'+encodeURI(value_arr[0])+'"';
			builder += crlf;
			builder += crlf;
			builder += encodeURI(value_arr[1]);
			builder += crlf;
			/**/
		}
		
		//var file2 = Components.classes["@mozilla.org/file/local;1"] .createInstance(Components.interfaces.nsILocalFile);  
		//file2.initWithPath("D:\\Test\\test1.txt");   
		//if ( file2.exists() == true )  
		//{
			//alert(file2);
		//}
		//readF("D:\Test\test1.txt");
		builder += dashdash;
		builder += boundary;
		builder += crlf;
		builder += 'Content-Disposition: form-data; name="'+encodeURI(opts.paramname)+'"';
		builder += '; filename="' + encodeURI(filename) + '"';
		builder += crlf;
		
		builder += 'Content-Type: application/octet-stream';
		builder += crlf;
		builder += crlf; 
		
		builder += filedata;
		builder += crlf;
        
		builder += dashdash;
		builder += boundary;
		builder += dashdash;
		builder += crlf;
		//alert(builder);
		return builder;
	}

	function progress(e) {
		if (e.lengthComputable) {
			var percentage = Math.round((e.loaded * 100) / e.total);
			if (this.currentProgress != percentage) {
				
				this.currentProgress = percentage;
				opts.progressUpdated(this.index, this.file, this.currentProgress);
				
				var elapsed = new Date().getTime();
				var diffTime = elapsed - this.currentStart;
				if (diffTime >= opts.refresh) {
					var diffData = e.loaded - this.startData;
					var speed = diffData / diffTime; // KB per second
					opts.speedUpdated(this.index, this.file, speed);
					this.startData = e.loaded;
					this.currentStart = elapsed;
				}
			}
		}
	}
    
    
    
	function upload() {
		stop_loop = false;
		if (!files) {
			opts.error(errors[0]);
			return false;
		}
		var filesDone = 0,
			filesRejected = 0;
		
		if (files_count > opts.maxfiles) {
		    opts.error(errors[1]);
		    return false;
		}

		for (var i=0; i<files_count; i++) {
			if (stop_loop) return false;
			try {
				if (beforeEach(files[i]) != false) {
					if (i === files_count) return;
					var reader = new FileReader(),
						max_file_size = 1048576 * opts.maxfilesize;
						
					reader.index = i;
					if (files[i].size > max_file_size) {
						opts.error(errors[2], files[i], i);
						filesRejected++;
						continue;
					}
					
					reader.onloadend = send;
					reader.readAsBinaryString(files[i]);
				} else {
					filesRejected++;
				}
			} catch(err) {
				opts.error(errors[0]);
				return false;
			}
		}
	    
		function send(e) {
			// Sometimes the index is not attached to the
			// event object. Find it by size. Hack for sure.
			file = files[e.target.index];
			handleDrop(file);
			
	}
	function handleDrop(file)
	{
		var reader;
        var workbook;
        if (file) {
            reader = new FileReader;
            reader.onload = function (e) {
                workbook = new wijmo.xlsx.Workbook();
                workbook.load(reader.result);
				var prem_arr = getCollectionView(workbook);  
				for(var i=0;i<prem_arr.length;i++)
				{
					alert(prem_arr[i]);
					if (e.target.index == undefined) {
						e.target.index = getIndexBySize(e.total);
					}
					
					var xhr = new XMLHttpRequest(),
						upload = xhr.upload,
						file = files[e.target.index],
						index = e.target.index,
						start_time = new Date().getTime(),
						boundary = '------multipartformboundary' + (new Date).getTime(),
						builder;
					
					parm_str = prem_arr[i];
					newName = rename(file.name);
					if (typeof newName === "string") {
						builder = getBuilder(newName, e.target.result, boundary,parm_str);
					} else {
						builder = getBuilder(file.name, e.target.result, boundary,parm_str);
					}
					
					upload.index = index;
					upload.file = file;
					upload.downloadStartTime = start_time;
					upload.currentStart = start_time;
					upload.currentProgress = 0;
					upload.startData = 0;
					upload.addEventListener("progress", progress, false);
					
					xhr.open("POST", opts.url, true);
					
					xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=' 
						+ boundary);
						
					xhr.sendAsBinary(builder);  
					<!--xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');<pre name="code" code_snippet_id="422893" snippet_file_name="../aa.txt" class="sh_javascript sh_sourceCode">xhr<span class="sh_symbol">.</span><span class="sh_function">sendAsBinary</span><span class="sh_symbol">(</span>binaryString<span class="sh_symbol">);</span></pre><br> --> 
					opts.uploadStarted(index, file, files_count);  
					
					xhr.onload = function() { 
						if (xhr.responseText) {
							//alert(xhr.responseText);
						var now = new Date().getTime(),
							timeDiff = now - start_time,
							result = opts.uploadFinished(index, file, jQuery.parseJSON(xhr.responseText), timeDiff);
							filesDone++;
							if (filesDone == files_count - filesRejected) {
								afterAll();
							}
						if (result === false) stop_loop = true;
						}
					};
				}
				}
            };
            reader.readAsDataURL(file);
        }
		
	}
	
	function readF(file) {
    if(typeof window.ActiveXObject != 'undefined') {
        var content = "";
        try {
            var fso = new ActiveXObject("Scripting.FileSystemObject");  
            var reader = fso.openTextFile(file, 1);
            while(!reader.AtEndofStream) {
                content += reader.readline();
                content += "\n";
            } 
            // close the reader
            reader.close();
        }
        catch (e) { 
            alert("Internet Explore read local file error: \n" + e); 
        }
         
        return content;
    }
    else if(document.implementation && document.implementation.createDocument) {
        var content = ""
        try {
            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
            var lf = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            lf.initWithPath(file);
            if (lf.exists() == false) {  
                alert("File does not exist");  
            } 
             
            var fis = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);  
            fis.init(lf, 0x01, 00004, null);  
            var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);  
            sis.init(fis);  
            var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);  
            converter.charset = "UTF-8";  
            content = converter.ConvertToUnicode(sis.read(sis.available()));
        }
        catch (e) { 
            alert("Mozilla Firefox read local file error: \n" + e); 
        }
         
        return content;
    }
}
    //得到中文字段的名称对应的数据库字段
	function getCellValue(cell_str){
		switch ($.trim(cell_str))
		{
			case '政策名称':
			  cell_str = "policyName";
			  break;
			case '发布部门':
			  cell_str = "publishDept";
			  break;
			case '文号':
			  cell_str = "policyNum";
			  break;
			case '政策类别':
			  cell_str = "policyCategory";
			  break;
			case '生效日期':
			  cell_str = "startDate";
			  break;
			case '实施日期':
			  cell_str = "activeDate";
			  break;
			case '失效日期':
			  cell_str = "endDate";
			  break;
			case '标签':
			  cell_str = "tag";
			  break;
			case '创建人员':
			  cell_str = "author";
			  break;
			case '所属部门':
			  cell_str = "dept";
			  break;
			case '创建日期':
			  cell_str = "createDate";
			  break;
			case '正文权限':
			  cell_str = "policyPerm";
			  break;
			case '解读权限':
			  cell_str = "InterpretationPerm";
			  break;
			case '正文加密级别':
			  cell_str = "policyEncrpLevel";
			  break;
			case '解读加密级别':
			  cell_str = "InterpretationEncrpLevel";
			  break;
			case '政策原文':
			  cell_str = "policyTxt";
			  break;
			case '政策原文上传文件列表':
			  cell_str = "policyFiles";
			  break;
			case '政策解读':
			  cell_str = "InterpretationTxt";
			  break;
			case '政策解读上传文件列表':
			  cell_str = "InterpretationFiles";
			  break;
		}
		return cell_str;
	}
	function getCollectionView(workbook) {
        var collectionView = [];
        if (workbook) {
            var sheet = workbook.sheets[0];
            var header = [];
			
            for (var i = 0, length = sheet.rows.length; i < length; i++) {

                var row = sheet.rows[i];
                var rowArray = {};
				var prem_str = '';
                for (var j = 0, jLength = row.cells.length; j < jLength; j++) {
                    var cell = row.cells[j];
					//alert(displayProp(cell));
                    if (i === 0) {
						//alert(getCellValue(cell.value));
						var cellValueStr = getCellValue(cell.value);
                        header.push(cellValueStr);
                    }
                    else {
						if((jLength-1) == j)
						{
							if(cell)
							{
								prem_str += header[j]+'='+cell.value;
							}
							else
							{
								prem_str += header[j]+'=';
							}
						}
						else if((jLength-1) > j)
						{
							//alert(cell.hasOwnProperty('value'));
							if(cell)
							{	
								//alert(header[j]);
								if((header[j] == 'startDate')||(header[j] == 'activeDate')||(header[j] == 'endDate')||(header[j] == 'createDate'))
								{
									//Todate(cell.value);
									prem_str += header[j]+'='+Todate(cell.value)+'&';
									//alert(Todate(cell.value));
									//alert('该项是时间');
								}
								else
								{
									prem_str += header[j]+'='+cell.value+'&';
								}
							}
							else
							{
								prem_str += header[j]+'=&';
							}
							
						}
                        
                    }
                }			
                if (i !== 0) {
					//alert(prem_str);
                    collectionView.push(prem_str);
                }
            }
        }
        return collectionView;
    }
	function strlen(str) {
		var len = 0;
		for (var i = 0; i < str.length; i++) {
			var c = str.charCodeAt(i);
			//单字节加1 
			if ((c >= 0x1 && c <= 0x007e)  (0xff60 <= c && c <= 0xff9f)) {
				len++;
			}
			else {
				len += 2;
			}
		}
		return len;
	}
	//Wed Jul 15 2015 00:00:00 GMT+0800转换成  2015-7-15
	function Todate(num) { //Fri Oct 31 18:00:00 UTC+0800 2008     Wed Jul 15 2015 00:00:00 GMT+0800
		num = num + "";
		var date = "";
		var month = new Array();
		month["Jan"] = 1; month["Feb"] = 2; month["Mar"] = 3; month["Apr"] = 4; month["May"] = 5; month["Jan"] = 6;
		month["Jul"] = 7; month["Aug"] = 8; month["Sep"] = 9; month["Oct"] = 10; month["Nov"] = 11; month["Dec"] = 12;
		var week = new Array();
		week["Mon"] = "一"; week["Tue"] = "二"; week["Wed"] = "三"; week["Thu"] = "四"; week["Fri"] = "五"; week["Sat"] = "六"; week["Sun"] = "日";
		
		str = num.split(" ");
		date = str[3] + "-";
		var count = strlen(month[str[1]]);
		var m = month[str[1]];
		if (count = 1) {
			m = month[str[1]];
		}
		date = date + m + "-" + str[2];
		return date;
	}
	
	function getIndexBySize(size) {
		for (var i=0; i < files_count; i++) {
			if (files[i].size == size) {
				return i;
			}
		}
		
		return undefined;
	}
    
	function rename(name) {
		return opts.rename(name);
	}
	
	function beforeEach(file) {
		return opts.beforeEach(file);
	}
	
	function afterAll() {
		return opts.afterAll();
	}
	
	function dragEnter(e) {
		clearTimeout(doc_leave_timer);
		e.preventDefault();
		opts.dragEnter(e);
	}
	
	function dragOver(e) {
		clearTimeout(doc_leave_timer);
		e.preventDefault();
		opts.docOver(e);
		opts.dragOver(e);
	}
	 
	function dragLeave(e) {
		clearTimeout(doc_leave_timer);
		opts.dragLeave(e);
		e.stopPropagation();
	}
	 
	function docDrop(e) {
		e.preventDefault();
		opts.docLeave(e);
		return false;
	}
	 
	function docEnter(e) {
		clearTimeout(doc_leave_timer);
		e.preventDefault();
		opts.docEnter(e);
		return false;
	}
	 
	function docOver(e) {
		clearTimeout(doc_leave_timer);
		e.preventDefault();
		opts.docOver(e);
		return false;
	}
	 
	function docLeave(e) {
		doc_leave_timer = setTimeout(function(){
			opts.docLeave(e);
		}, 200);
	}
	 
	function empty(){}
	
	try {
		if (XMLHttpRequest.prototype.sendAsBinary) return;
		XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
		    function byteValue(x) {
		        return x.charCodeAt(0) & 0xff;
		    }
		    var ords = Array.prototype.map.call(datastr, byteValue);
		    var ui8a = new Uint8Array(ords);
		    this.send(ui8a.buffer);
		}
	} catch(e) {}
     
})(jQuery);