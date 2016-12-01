package org.juzu.tutorial;

import java.io.IOException;

import javax.inject.Inject;

import org.exoplatform.commons.api.search.SearchService;
import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;

import juzu.Path;
import juzu.Response;
import juzu.View;
import juzu.plugin.asset.Assets;
import juzu.template.Template;
import net.wyun.qys.service.PolicyService;
import net.wyun.qys.service.StandardService;
import net.wyun.qys.service.UserService;

public class LocalPolicyController {

	public LocalPolicyController() {
		super();
		// TODO Auto-generated constructor stub
	}

private static final Log LOG = ExoLogger.getExoLogger(LocalPolicyController.class);
  
  @Inject
  SearchService searchService;
	
  @Inject
  UserService userService;
  
  @Inject
  PolicyService policySvc;
  
  @Inject
  StandardService standardSvc;
  /*
  @Inject
  @Path("map.gtmpl")
  Template map;

  @Inject
  @Path("local_upload.gtmpl")
  Template local_upload;
  
  @Inject
  @Path("new_interpretation.gtmpl")
  Template new_interpretation;

  //map.gtmpl的上传
  @Assets({"local_uploadjs","local_uploadcss"})
  @View
  public Response.Content  update_data() throws IOException{
	  return local_upload.ok();
  }
  
  @Assets({"mapjs", "jquerypage", "mapcss"})
  @View
  public Response.Content map() throws IOException{
	  return map.ok();
  }
  
  //local_upload.gtmpl中的返回
  @Assets({"mapjs", "jquerypage", "mapcss"})
  @View
  public Response.Content back() throws IOException{
	  return map.ok();
  }
  
  @Assets({"new_localjs","new_interpretationcss"})
  @View
  public Response.Content new_local() throws IOException{
	  return new_interpretation.ok();
  }
  @Assets({"mapjs", "jquerypage", "mapcss"})
  @View
  public Response.Content content_back() throws IOException{
	  return map.ok();
  }*/
  
  
  
  
}
