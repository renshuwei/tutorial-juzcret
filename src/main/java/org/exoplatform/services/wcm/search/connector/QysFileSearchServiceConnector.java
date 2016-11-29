/*
 * Copyright (C) 2003-2013 eXo Platform SAS.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.exoplatform.services.wcm.search.connector;

import java.io.File;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

import org.exoplatform.commons.api.search.data.SearchContext;
import org.exoplatform.commons.api.search.data.SearchResult;
import org.exoplatform.container.definition.PortalContainerConfig;
import org.exoplatform.container.xml.InitParams;
import org.exoplatform.container.xml.PortalContainerInfo;
import org.exoplatform.container.xml.PropertiesParam;
import org.exoplatform.container.xml.Property;
import org.exoplatform.services.cms.drives.DriveData;
import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
import org.exoplatform.services.security.ConversationState;
import org.exoplatform.services.wcm.core.NodetypeConstant;
import org.exoplatform.services.wcm.search.QueryCriteria;
import org.exoplatform.services.wcm.search.ResultNode;
import org.exoplatform.services.wcm.utils.WCMCoreUtils;
import org.exoplatform.web.controller.metadata.ControllerDescriptor;
import org.exoplatform.web.controller.metadata.DescriptorBuilder;
import org.exoplatform.web.controller.router.Router;

/**
 * The search should be capable to match files of the DMS. \
 */
public class QysFileSearchServiceConnector extends BaseContentSearchServiceConnector {
  
  private static final Log LOG = ExoLogger.getLogger(QysFileSearchServiceConnector.class.getName());

  public QysFileSearchServiceConnector(InitParams initParams) throws Exception {
    super(initParams);
  }
  
  
  public static InitParams initFileSearchProp(){
	  PropertiesParam pp = new PropertiesParam();
	  
	  Property p = new Property("searchType", "file");
	  pp.addProperty(p);
	  pp.addProperty(new Property("displayName", "Files"));
	  pp.addProperty(new Property("enable", "true"));
	  pp.setName("constructor.params");
	  
	  InitParams initP = new InitParams();
	  initP.addParam(pp);
	  
	  return initP;
	  
  }
  
  /**
   * 
   * @param query, query string to be searched in JCR
   * @param subDir, sub directory to limit the search scope, for ex., standard
   */
  public Collection<SearchResult> searchQys(String query, String subDir){
	  Collection<SearchResult> returnResults = new ArrayList<SearchResult>();
	  Collection<SearchResult> searchResults = null;
	  try {
	      File controllerXml = new File("/opt/platform-community-4.3.1/gatein/conf/controller.xml");
	      URL url = controllerXml.toURI().toURL();
	      ControllerDescriptor routerDesc = new DescriptorBuilder().build(url.openStream());
	      Router router = new Router(routerDesc);
	      SearchContext context = new SearchContext(router, "intranet");
	      List<String> sites = new ArrayList<String>();
	      sites.add("intranet");
	      List<String> types = new ArrayList<String>();
	      types.add("all");
	      int offset = 0;
	      int limit = 30;
	      String sort = "relevancy";
	      String order = "desc";
	      
	      //Map<String, Collection<SearchResult>> results = searchService.search(context, query, sites, types, offset, limit, sort, order);
	      
	      //QysFileSearchServiceConnector fssc = new QysFileSearchServiceConnector(QysFileSearchServiceConnector.initFileSearchProp());
	      this.setSearchSubDir(subDir);
	      
	      searchResults = search(context, query, sites, offset, limit, sort, order);
	      do{
	    	  returnResults.addAll(searchResults);
	    	  offset += limit;
	    	  searchResults = search(context, query, sites, offset, limit, sort, order);
	      }while(searchResults.size() == limit);
	      
	      
	      String baseUrl = obtainExoBaseUrl();
	      LOG.info("exo base url: " + baseUrl);
	      
	      String resultUrl, imageUrl;      
	      
	      // use absolute path for URLs in search results
	      //for(Collection<SearchResult> connectorResults:results.values()){
	        for(SearchResult result:returnResults){
	          resultUrl = result.getUrl();
	          LOG.info("result url: " + resultUrl);
	          imageUrl =  result.getImageUrl();
	          LOG.info("image url: " + imageUrl);
	          LOG.info("other info: " + result.getExcerpt());
	          LOG.info("detail: " + result.getDetail());
	          
	          if(null!=resultUrl && resultUrl.startsWith("/")) {
	        	  result.setUrl(baseUrl + resultUrl);
	          }
	          if(null!=imageUrl && imageUrl.startsWith("/")) result.setImageUrl(baseUrl + imageUrl);          
	        }        
	     // }
	      
	    } catch (Exception e) {
	      LOG.error(e.getMessage(), e);
	    }
	  return returnResults;
  }
  
  
  private String obtainExoBaseUrl(){
	  //exo.base.url
	  String baseUrl = System.getenv("exo_base_url"); 
	  
      if(null != baseUrl) return baseUrl;
      
      baseUrl = "http://localhost:8080/";
      return baseUrl;
  }
  
  
  
  
  protected String getDetails(ResultNode retNode, SearchContext context) throws Exception {
	    //String details = super.getDetails(retNode, context);
	  
	  return retNode.isNodeType("mix:referenceable")?retNode.getUUID():"";
		  
  } 
  
  private String subDirectory = "";  //standard; localpolicy, nationalpolicy
  
  public void setSearchSubDir(String subDir){
	  this.subDirectory = subDir;
  }
  
  
  public static String SEARCH_PATH = "/Groups/spaces/qyspl/Documents/fs/";
  private final static String affix = "/%";
  @Override
  protected QueryCriteria createQueryCriteria(String query, long offset, long limit, String sort, String order) {
    QueryCriteria criteria = super.createQueryCriteria(query, offset, limit, sort, order);
    
    String docPath = SEARCH_PATH + subDirectory + affix;
    if (ConversationState.getCurrent().getIdentity().getUserId() != null) {
      criteria.setSearchPath(docPath);
    }
    LOG.info(criteria.toString());
    LOG.info("page mode: " + criteria.getPageMode());
    return criteria;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  protected String[] getSearchedDocTypes() {
    return new String[]{NodetypeConstant.NT_FILE};
  }
  
  protected String[] getNodeTypes() {
    return new String[]{NodetypeConstant.NT_FILE};
  }
  
  /**
   * {@inheritDoc}
   * @throws RepositoryException 
   */
  @Override
  protected ResultNode filterNode(ResultNode node) throws RepositoryException {
    return node.isNodeType(NodetypeConstant.NT_FILE) ? node : null;
  }
  
  /**
   * {@inheritDoc}
   * @throws RepositoryException 
   */
  @Override
  protected String getPath(DriveData driveData, ResultNode node, SearchContext context) throws Exception {
    String siteName = WCMCoreUtils.getService(PortalContainerInfo.class).getContainerName();
    String restContextName = WCMCoreUtils.getService(PortalContainerConfig.class).getRestContextName(siteName);
    StringBuffer ret = new StringBuffer();
    ret.append('/').append(siteName).append('/').append(restContextName).append("/jcr/").
        append(WCMCoreUtils.getRepository().getConfiguration().getName()).append('/'). 
        append(node.getSession().getWorkspace().getName()).append(node.getPath());
    return ret.toString();
  }
  
  /**
   * gets the image url
   * @return
   * @throws Exception
   */
  @Override
  protected String getImageUrl(Node node) {
    try {
      String path = node.getPath().replaceAll("'", "\\\\'");
      String encodedPath = URLEncoder.encode(path, "utf-8");
      encodedPath = encodedPath.replaceAll ("%2F", "/");    //we won't encode the slash characters in the path
      String portalName = WCMCoreUtils.getPortalName();
      String restContextName = WCMCoreUtils.getRestContextName();
      String preferenceWS = node.getSession().getWorkspace().getName();
      String thumbnailImage = "/" + restContextName + "/thumbnailImage/medium/" + 
                              WCMCoreUtils.getRepository().getConfiguration().getName() + 
                              "/" + preferenceWS + encodedPath;
      return thumbnailImage;
    } catch (Exception e) {
      if (LOG.isWarnEnabled()) {
        LOG.warn("Can not get image link", e);
      }
      return super.getImageUrl(node);
    }
  }

}
