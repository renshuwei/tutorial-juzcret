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
import org.json.JSONObject;

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
	  public Response.Content upload(String standardName, String standardNum, Integer standardTypeString, 
			                         String perm, String encrpLevel, String text, 
			                         String author, String department, String selectTag, Integer standardType, 
			                         List<FileItem> files){
		  
		  LOG.info("author: " + author + ", department: " + department + ", selectTag: " + selectTag + ", type: " + standardType);
		  
		  Standard s = new Standard();
		  s.setName(standardName);
		  s.setCreateDate(new Date());
		  s.setNum(standardNum);
		  s.setType(StandardType.typeForValue(standardType));
		  s.setUuid("");   //text being saved to a file
		  
		  StanTag sTag1 = new StanTag();
		  sTag1.setTag(selectTag);
		  s.addStanTag(sTag1);
		
		  Standard newS = standardSvc.save(s);
		  String folderName = newS.getId();
		  
		  //create jcr folder here
		  boolean isCreated = documentsData.createNodeIfNotExist("Documents/fs", folderName);
		  LOG.info(folderName + " folder is created!");
		  
		  if(null != files){
			  for(FileItem fi:files){
	        	  LOG.info("file name: " + fi.getName());
	        	  
	        	  String uuid = documentsData.storeFile("fs/" + folderName , fi, documentsData.getSpaceName(), false, null);
	        	  StanJcrFile jFile = new StanJcrFile();
	    		  jFile.setFileName(fi.getName());
	    		  jFile.setUploadDate(new Date());
	    		  jFile.setUrl("temp/url");
	    		  jFile.setUuid(uuid);
	    		  newS.addStanJcrFile(jFile);
	    		  standardSvc.update(newS);
	          }
		  }
          
		  return Response.ok(new JSONObject(newS).toString()).withMimeType("text/json");
		  /*
		  return Response.ok("{\"status\":\"File has been uploaded successfully!\"}")
                  .withMimeType("application/json; charset=UTF-8").withHeader("Cache-Control", "no-cache");
                  */
	  }
	  
	  private void saveStandard(){
		  Standard s = new Standard();
		  s.setName("国家标准2016");
		  s.setCreateDate(new Date());
		  s.setNum("001-2960-2016");
		  s.setType(StandardType.IMB);
		  s.setUuid("4eb65550-a36a-11e6-80f5-76304dec7eb7");
		  
		  StanJcrFile jFile = new StanJcrFile();
		  jFile.setFileName("testfile.txt");
		  jFile.setUploadDate(new Date());
		  jFile.setUrl("temp/url");
		  jFile.setUuid("4eb65550-a36a-11e6-0000-76304dec7eb7");
		  
		  s.addStanJcrFile(jFile);
		  
		  StanTag sTag1 = new StanTag();
		  sTag1.setTag("first tag: car market 上海");
		  s.addStanTag(sTag1);
		  
		  StanTag sTag = new StanTag();
		  sTag.setTag("second tag: car market 北京");
		  s.addStanTag(sTag);
		  
	  }
	  
	  
	  
}
