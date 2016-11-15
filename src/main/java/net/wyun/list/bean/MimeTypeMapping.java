package net.wyun.list.bean;

import java.util.HashMap;
import java.util.Map;

public class MimeTypeMapping {
	
	private final static Map<String, String> mimeTypeMap = new HashMap<String, String>();
	
	static {
		/*
		if (tmp.endsWith(".jpg") || tmp.endsWith(".jpeg"))
			jcrContent.setProperty("jcr:mimeType", "image/jpeg");
		else if (tmp.endsWith(".png"))
			jcrContent.setProperty("jcr:mimeType", "image/png");
		else if (tmp.endsWith(".pdf"))
			jcrContent.setProperty("jcr:mimeType", "application/pdf");
		else if (tmp.endsWith(".doc"))
			jcrContent.setProperty("jcr:mimeType",
					"application/vnd.ms-word");
		else if (tmp.endsWith(".xls"))
			jcrContent.setProperty("jcr:mimeType",
					"application/vnd.ms-excel");
		else if (tmp.endsWith(".ppt"))
			jcrContent.setProperty("jcr:mimeType",
					"application/vnd.ms-powerpoint");
		else if (tmp.endsWith(".docx"))
			jcrContent
					.setProperty("jcr:mimeType",
							"application/vnd.openxmlformats-officedocument.wordprocessingml.document");
		else if (tmp.endsWith(".xlsx"))
			jcrContent
					.setProperty("jcr:mimeType",
							"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		else if (tmp.endsWith(".pptx"))
			jcrContent
					.setProperty("jcr:mimeType",
							"application/vnd.openxmlformats-officedocument.presentationml.presentation");
		else if (tmp.endsWith(".odp"))
			jcrContent.setProperty("jcr:mimeType",
					"application/vnd.oasis.opendocument.presentation");
		else if (tmp.endsWith(".odt"))
			jcrContent.setProperty("jcr:mimeType",
					"application/vnd.oasis.opendocument.text");
		else if (tmp.endsWith(".ods"))
			jcrContent.setProperty("jcr:mimeType",
					"application/vnd.oasis.opendocument.spreadsheet");
					*/
		mimeTypeMap.put("jpg", "image/png");
		mimeTypeMap.put("jpeg", "image/png");
		mimeTypeMap.put("png", "image/png");
		
		
		mimeTypeMap.put("pdf", "application/pdf");
		
		mimeTypeMap.put("doc", "application/vnd.ms-word");
		mimeTypeMap.put("xls", "application/vnd.ms-excel");
		mimeTypeMap.put("ppt", "application/vnd.ms-powerpoint");
		
		mimeTypeMap.put("docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
		mimeTypeMap.put("xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		mimeTypeMap.put("pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
		
		mimeTypeMap.put("odp", "application/vnd.oasis.opendocument.presentation");
		mimeTypeMap.put("odt", "application/vnd.oasis.opendocument.text");
		mimeTypeMap.put("ods", "application/vnd.oasis.opendocument.spreadsheet");
		
		//txt=text/plain
		mimeTypeMap.put("txt", "text/plain");
		
	}
	
	/**
	 * 
	 * @param fileType
	 *        <br>such as .jpg, .pdf, lower case or upper case 
	 * @return mimeType of the file
	 */
	public static String getMimeType(String fileType){
		return mimeTypeMap.get(fileType.toLowerCase());
	}

}
