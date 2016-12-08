package org.juzu.tutorial;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.exoplatform.commons.api.search.SearchService;
import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;

import juzu.Path;
import juzu.Resource;
import juzu.Response;
import juzu.View;
import juzu.plugin.ajax.Ajax;
import juzu.plugin.asset.Assets;
import juzu.request.SecurityContext;
import juzu.template.Template;
import net.wyun.qys.service.PolicyService;
import net.wyun.qys.service.StandardService;
import net.wyun.qys.service.UserService;

public class LocalPolicyController {

	public LocalPolicyController() {
		super();
		// TODO Auto-generated constructor stub
	}

private static final org.apache.commons.logging.Log LOG = ExoLogger.getExoLogger(LocalPolicyController.class);
  
  @Inject
  SearchService searchService;
	
  @Inject
  UserService userService;
  
  @Inject
  PolicyService policySvc;
  
  @Inject
  StandardService standardSvc;
  
  @Inject
  @Path("map.gtmpl")
  Template map;
  
  @Inject
  @Path("local_upload.gtmpl")
  Template local_upload;
  
  @Inject
  @Path("new_interpretation.gtmpl")
  Template new_interpretation;
  
  @Assets({"mapjs", "jquerypage", "mapcss"})
  @View
  public Response.Content map() throws IOException{
	  return map.ok();
  }
  
  @Assets({"new_localjs","new_interpretationcss"})
  @View
  public Response.Content new_local() throws IOException{
	  return new_interpretation.ok();
  }
  //map.gtmpl的上传
  @Assets({"local_uploadjs","local_uploadcss"})
  @View
  public Response.Content  update_data() throws IOException{
	  return local_upload.ok();
  }
  
   //local_upload.gtmpl中的返回
  @Assets({"mapjs", "jquerypage", "mapcss"})
  @View
  public Response.Content back() throws IOException{
	  return map.ok();
  }
  @Assets({"mapjs", "jquerypage", "mapcss"})
  @View
  public Response.Content content_back() throws IOException{
	  return map.ok();
  }
  
  private final static String ROOT_FOLDER = "fs/local/";
  @Resource
  @Ajax
  public Response.Content upload(String policyName,String publishDept,String policyNum,
		  String selectProvince,String selectCity,String policyCategory,String tag,
		  String policyTxt, List<FileItem> files, SecurityContext securityContext){
	  LOG.info("policyName:"+policyName+",publishDept:"+publishDept+",policyNum:"+policyNum+",selectProvince:"+selectProvince+
			 ",selectCity:"+selectCity+",policyCategory:"+policyCategory+",tag:"+tag+",policyTxt:"+policyTxt);
	  if( files != null ){
		  for(FileItem fi:files){
        	  LOG.info("file name: " + fi.getName());
          }
	  }
	  
	  
	  
	  return Response.ok("{\"status\":\"File has been uploaded successfully!\"}")
              .withMimeType("application/json; charset=UTF-8").withHeader("Cache-Control", "no-cache");
	  
	  
  }
	  
  
  
  
}
