/*
 * Copyright 2013 eXo Platform SAS
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.juzu.tutorial;

import juzu.Path;
import juzu.View;
import juzu.plugin.asset.Assets;
import juzu.request.SecurityContext;
import juzu.Response;
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

import javax.inject.Inject;
import javax.jcr.LoginException;
import javax.jcr.NoSuchWorkspaceException;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.query.Query;

import org.exoplatform.commons.api.search.SearchService;
import org.exoplatform.commons.api.search.data.SearchContext;
import org.exoplatform.commons.api.search.data.SearchResult;
import org.exoplatform.services.jcr.ext.common.SessionProvider;
import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
import org.exoplatform.services.security.ConversationState;
import org.exoplatform.services.security.Identity;
import org.exoplatform.social.core.manager.IdentityManager;
import org.exoplatform.web.controller.metadata.ControllerDescriptor;
import org.exoplatform.web.controller.metadata.DescriptorBuilder;
import org.exoplatform.web.controller.router.Router;
import org.exoplatform.container.xml.InitParams;
import org.exoplatform.container.xml.Parameter;
import org.exoplatform.container.xml.PropertiesParam;
import org.exoplatform.container.xml.Property;
import org.exoplatform.webui.config.Param;
import org.exoplatform.services.wcm.search.connector.QysFileSearchServiceConnector;
import org.exoplatform.services.wcm.utils.WCMCoreUtils;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class Controller {
	
  public Controller() {
		super();
		// TODO Auto-generated constructor stub
	}

private static final Log LOG = ExoLogger.getExoLogger(Controller.class);
  
  @Inject
  SearchService searchService;
	
  @Inject
  UserService userService;
  
  @Inject
  PolicyService policySvc;
  
  @Inject
  StandardService standardSvc;
  
 // @Inject
 // private IdentityManager identityManager;

  @Inject
  @Path("index.gtmpl")
  Template index;
  
  @Inject
  @Path("interpretation.gtmpl")
  Template interpretation;
  
  @Inject
  @Path("new_interpretation.gtmpl")
  Template new_interpretation;
  
  @Inject
  @Path("interpretation_upload.gtmpl")
  Template interpretation_upload;
  
  @Assets({"interpretationcss", "interpretationjs"})  
  @View
  public Response.Content interpretation() throws IOException{
	  return interpretation.ok();
  }
  
  //interpretation.gtmpl中的上传页面,在map.gtmpl中也有一个update_data()方法
  @Assets({"interpretation_uploadjs","interpretation_uploadcss"})
  @View
  public Response.Content update_data() throws IOException{
	  return interpretation_upload.ok();
  }
  
  @Assets({"new_interpretationjs","new_interpretationcss"})
  @View
  public Response.Content new_interpretation() throws IOException{
	  return new_interpretation.ok();
  }

  @Assets({"indexcss", "indexjs"})
  //@Assets("indexcss")
  @View
  public Response.Content index(SecurityContext securityContext) throws IOException {
	  String username = securityContext.getRemoteUser();
	  LOG.info("user: " + username);
	  UserSetting setting = userService.getUserSetting(username);
	  net.wyun.qys.model.User u = userService.loadUser(username);
	  
	  try{
		  
		  Identity identity = ConversationState.getCurrent().getIdentity();
		  //org.exoplatform.social.core.identity.model.Identity identity = identityManager.getOrCreateIdentity(OrganizationIdentityProvider.NAME, username, true);
		  List<String> ms =UserUtil.getMemberships(identity);
		  
		  for (String m : ms) {
			  LOG.info("membership: " + m);
		  }
	  }catch(Exception e){
		  LOG.error(e);
	  }
	  
	  
	  if(setting != null){
		  LOG.info("user setting: " + setting.getUsername());
	  }
	  if(u != null){
		  LOG.info("user avatar: " + u.getAvatar());
	  }
	  
	  //try policySvc
	  LOG.info("save policy");
	  Policy policy = new Policy();
	  policy.setPolicyName("test db saving秦皇岛");
	  policy.setStartDate(new Date());
	  this.policySvc.save(policy);
	  
	  LOG.info("search test begins: ");
	  searchTest();
	  LOG.info("search test ends. ");
	  
	  this.jcrSearch();
	  
      return index.ok();
  }
  
  private void saveStandard(){
	  Standard s = new Standard();
	  s.setName("国家标准2016");
	  s.setCreateDate(new Date());
	  s.setNum("001-2960-2016");
	  s.setType(StandardType.专用车);
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
	  
	  standardSvc.save(s);
  }
  
  private void searchTest(){
	  try {
	      File controllerXml = new File("/opt/platform-community-4.3.1/gatein/conf/controller.xml");
	      URL url = controllerXml.toURI().toURL();
	      ControllerDescriptor routerDesc = new DescriptorBuilder().build(url.openStream());
	      Router router = new Router(routerDesc);
	      SearchContext context = new SearchContext(router, "intranet");
	      String query = "Juzu";
	      List<String> sites = new ArrayList<String>();
	      sites.add("intranet");
	      List<String> types = new ArrayList<String>();
	      types.add("all");
	      int offset = 0;
	      int limit = 10;
	      String sort = "relevancy";
	      String order = "desc";
	      
	      //Map<String, Collection<SearchResult>> results = searchService.search(context, query, sites, types, offset, limit, sort, order);
	      
	      QysFileSearchServiceConnector fssc = new QysFileSearchServiceConnector(QysFileSearchServiceConnector.initFileSearchProp());
	      Collection<SearchResult> connectorResults = fssc.search(context, query, sites, offset, limit, sort, order);
	      
	      
	      String baseUri = "http://localhost:8080/";
	      String resultUrl, imageUrl;      
	      
	      // use absolute path for URLs in search results
	      //for(Collection<SearchResult> connectorResults:results.values()){
	        for(SearchResult result:connectorResults){
	          resultUrl = result.getUrl();
	          LOG.info("result url: " + resultUrl);
	          imageUrl =  result.getImageUrl();
	          LOG.info("image url: " + imageUrl);
	          LOG.info("other info: " + result.getExcerpt());
	          LOG.info("detail: " + result.getDetail());
	          
	          if(null!=resultUrl && resultUrl.startsWith("/")) {
	        	  result.setUrl(baseUri + resultUrl);
	          }
	          if(null!=imageUrl && imageUrl.startsWith("/")) result.setImageUrl(baseUri + imageUrl);          
	        }        
	     // }
	      
	    } catch (Exception e) {
	      LOG.error(e.getMessage(), e);
	    }
	  
  }
  
  
  
  private void jcrSearch() {
	  List<Node> ret = new ArrayList<Node>();
	  
	  SessionProvider sessionProvider = WCMCoreUtils.getUserSessionProvider();
	   
	  Session session;
	try {
		session = sessionProvider.getSession("collaboration", WCMCoreUtils.getRepository());
		String docPath = "/Groups/spaces/exo_kai_fa_zu";
		   
		String q = "Select * from nt:file where jcr:path like " + docPath + "/%";
		LOG.info("query string: " + q);
		  NodeIterator iter = session.getWorkspace().getQueryManager().createQuery(q, Query.SQL).execute().getNodes();
		   
		  while (iter.hasNext()) {
		   
			  Node n = iter.nextNode();
		      LOG.info("node: " + n.getPath());
			  ret.add(n);
		   
		  }
	} catch (RepositoryException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}  
	  
	   
  }
  
  
}
