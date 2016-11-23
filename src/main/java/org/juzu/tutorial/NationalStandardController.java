package org.juzu.tutorial;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.apache.commons.fileupload.FileItem;
import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
import org.exoplatform.services.security.ConversationState;
import org.exoplatform.services.security.Identity;
import org.json.JSONObject;

import com.google.api.client.json.Json;

import juzu.Path;
import juzu.Resource;
import juzu.Response;
import juzu.View;
import juzu.impl.common.Tools;
import juzu.plugin.ajax.Ajax;
import juzu.plugin.asset.Assets;
import juzu.request.SecurityContext;
import juzu.template.Template;
import net.wyun.qys.domain.Policy;
import net.wyun.qys.domain.UserSetting;
import net.wyun.qys.domain.standard.StanJcrFile;
import net.wyun.qys.domain.standard.StanTag;
import net.wyun.qys.domain.standard.Standard;
import net.wyun.qys.domain.standard.StandardType;
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
	  DocumentsDataHelper documentsData;
	  
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
	  
	  @Assets({"standardcss", "standardjs", "mouseoutjs", "mouseoverjs"}) 
	  @View
	  public Response.Content standard() throws IOException{
		  Standard s = standardSvc.findById("ff8081815869c2c1015869ce9d5a0003");
		  LOG.info(s.getCreator() + ", " + s.getName() + ", " + s.getStanTags().toString());
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
	  public Response.Content content() throws IOException{
		  return content.ok();
	  }	  
	  
	  @Assets({"standard_uploadcss", "fileuploadjs", "standarduploadjs"})
	  @View 
	  public Response.Content upload_form() throws IOException{
		  return standard_upload.ok();
	  }
	  
	  
	  
	
	  private final static String ROOT_FOLDER = "fs/standard/";
	  @Resource
	  @Ajax
	  public Response.Content upload(String standardName, String standardNum, Integer standardTypeString, 
			                         //String perm, String encrpLevel, String text, 
			                         String author, String department, String selectTag, Integer standardType, 
			                         String text, List<FileItem> files, SecurityContext securityContext){
		  
		  LOG.info("author: " + author + ", department: " + department + ", selectTag: " + selectTag + ", type: " + standardType);
		  String userName = securityContext.getRemoteUser();
		  
		  Standard s = new Standard();
		  s.setName(standardName);
		  s.setCreateDate(new Date());
		  s.setNum(standardNum);
		  s.setType(StandardType.typeForValue(standardType));
		  s.setUuid("");   //text being saved to a file
		  s.setCreator(userName);
		  s.setDepartment("");
		  
		  StanTag sTag1 = new StanTag();
		  sTag1.setTag(selectTag);
		  s.addStanTag(sTag1);
		
		  Standard newS = standardSvc.save(s);
		  String stdFolder = newS.getId();
		  
		  //create jcr folder here
		  boolean isCreated = documentsData.createNodeIfNotExist("Documents/" + ROOT_FOLDER, stdFolder);
		  LOG.info(stdFolder + " folder is created: " + isCreated);
		  
		  String txtUuid = documentsData.storeContent(text, stdFolder + ".txt", stdFolder);
		  s.setUuid(txtUuid);
		  
		  if(null != files){
			  for(FileItem fi:files){
	        	  LOG.info("file name: " + fi.getName());
	        	  
	        	  String uuid = documentsData.storeFile(ROOT_FOLDER + stdFolder , fi, documentsData.getSpaceName(), false, null);
	        	  StanJcrFile jFile = new StanJcrFile();
	    		  jFile.setFileName(fi.getName());
	    		  jFile.setUploadDate(new Date());
	    		  jFile.setUrl("temp/url");
	    		  jFile.setUuid(uuid);
	    		  newS.addStanJcrFile(jFile);
	    		  standardSvc.update(newS);
	          }
		  }
		  
		  //save text to jcr as a file
		  JSONObject jo = new JSONObject(newS);
		  if(jo.has("class")){
			  jo.remove("class");
		  }
		  
		  String json = jo.toString();
		  LOG.info("json: " + json);
		  
		  return Response.ok(json).withMimeType("text/json").withCharset(Tools.UTF_8);
		  /*
		  return Response.ok("{\"status\":\"File has been uploaded successfully!\"}")
                  .withMimeType("application/json; charset=UTF-8").withHeader("Cache-Control", "no-cache");
                  */
	  }
	  
	  
}
