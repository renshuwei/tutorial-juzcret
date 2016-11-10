package org.juzu.tutorial;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.apache.commons.fileupload.FileItem;
import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
import org.exoplatform.services.security.ConversationState;
import org.exoplatform.services.security.Identity;

import juzu.Path;
import juzu.Resource;
import juzu.Response;
import juzu.View;
import juzu.plugin.ajax.Ajax;
import juzu.plugin.asset.Assets;
import juzu.request.SecurityContext;
import juzu.template.Template;
import net.wyun.qys.domain.Policy;
import net.wyun.qys.domain.UserSetting;
import net.wyun.qys.service.PolicyService;
import net.wyun.qys.service.StandardService;
import net.wyun.qys.service.UserService;
import net.wyun.qys.util.UserUtil;

public class NationalStandardController {

	private static final Log LOG = ExoLogger.getExoLogger(NationalStandardController.class);	
	
	  @Inject
	  UserService userService;
	  
	  @Inject
	  StandardService standardSvc;
	  
	  @Inject
	  @Path("standard.gtmpl")
	  Template standard;
	  
	  @Inject
	  @Path("standard_upload.gtmpl")
	  Template standard_upload;
	  
	  /*
	  @Inject
	  @Path("new_standards.gtmpl")
	  Template new_standards;
	  */
	  
	  @Inject
	  @Path("standard_content.gtmpl")
	  Template content;
	  
	  @Assets({"standardcss", "standardjs"}) 
	  @View
	  public Response.Content standard() throws IOException{
		  return standard.ok();
	  }
	  /*
	  @Assets({"new_standardscss","new_standardsjs"})
	  @View
	  public Response.Content new_standards() throws IOException{
		  return new_standards.ok();
	  }
	  */
	  
	  @View 
	  public Response.Content back() throws IOException{
		  return standard.ok();
	  }
	  @View 
	  public Response.Content content() throws IOException{
		  return content.ok();
	  }	  
	  
	  @Assets({"standard_uploadcss", "fileuploadjs", "standarduploadjs"})
	  @View 
	  public Response.Content upload_form() throws IOException{
		  return standard_upload.ok();
	  }
	  
	
	  @Resource
	  @Ajax
	  public Response.Content upload(String author, String department, String selectTag, String standardType, List<FileItem> files){
		  
		  LOG.info("author: " + author + ", department: " + department + ", selectTag: " + selectTag + ", type: " + standardType);
		  if(null != files){
			  for(FileItem fi:files){
	        	  LOG.info("file name: " + fi.getName());
	          }
		  }
          
		  return Response.ok("{\"status\":\"File has been uploaded successfully!\"}")
                  .withMimeType("application/json; charset=UTF-8").withHeader("Cache-Control", "no-cache");
	  }
	  
	  
	  
}
