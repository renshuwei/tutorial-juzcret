package org.juzu.tutorial;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.inject.Inject;

import org.apache.commons.fileupload.FileItem;
import org.exoplatform.commons.api.search.data.SearchResult;
import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
import org.exoplatform.services.security.ConversationState;
import org.exoplatform.services.security.Identity;
import org.exoplatform.services.wcm.search.connector.QysFileSearchServiceConnector;
import org.json.JSONArray;
import org.json.JSONException;
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
import net.wyun.list.bean.File;
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
		//  Standard s = standardSvc.findById("ff8081815869c2c1015869ce9d5a0003");
		 // LOG.info(s.getCreator() + ", " + s.getName() + ", " + s.getStanTags().toString());
		  return standard.ok();
	  }
	  /*
	  @Assets({"new_standardscss","new_standardsjs"})
	  @View
	  public Response.Content new_standards() throws IOException{
		  return new_standards.ok();
	  }
	  */
	  
	  @Resource
	  @Ajax
	  public Response.Content standardContent(String uuid) throws IOException{
		  Standard stan = null;
		  if(null != uuid && !uuid.isEmpty()){
			  stan = standardSvc.findById(uuid);
		  }
		  
		  List<File> files = new ArrayList<File>();
		  Set<StanJcrFile> jcrFiles = stan.getStanJcrFiles();
		  for(StanJcrFile sjf:jcrFiles){
			  String jcrUuid = sjf.getUuid();
			  LOG.info("file name: " + sjf.getFileName());
			  File file = documentsData.getNode(jcrUuid);
			  files.add(file);
		  }
		  
		  
		  return content.with().set("stan", stan).set("files", files).ok();
	  }	  
	  
	  @Assets({"standard_uploadcss", "standarduploadjs"})
	  @View 
	  public Response.Content upload_form() throws IOException{
		  return standard_upload.ok();
	  }
	  
	  /**
	   * with out user input, search_text is empty string, search_type is null
	   * so need to do data validation before searching.
	   * @param search_text
	   * @param search_type
	   * @return
	   */
	  
	  @Resource
	  @Ajax
	  public Response.Content search(String search_text, String[] search_type){
		  
		  search_text = search_text.trim();
		  LOG.info("keyword: " + search_text);
		  
		  Set<StandardType> types = new HashSet<StandardType>();
		  if(search_type != null){
			  for(String i:search_type){
				  LOG.info("type: " + i);  //StandardType in numbers
				  Integer n = Integer.parseInt(i);
				  types.add(StandardType.typeForValue(n));
			  }
		  }
		  
		  /*
		  if(null != search_type){
			  for(StandardType s:search_type){
				  LOG.info("search types: " + s);
			  }
		  }
		  */
		  //with search types, query db to get qualified standard(s)
		 List<Standard> stanList = standardSvc.findByTypes(types);
		 
		 Map<String, Standard> stanMap = new HashMap<String, Standard>();
		 for(Standard stan:stanList){
			 stanMap.put(stan.getUuid(), stan);
			 Set<StanJcrFile> jcrFiles = stan.getStanJcrFiles();
			 for(StanJcrFile sjf:jcrFiles){
				 stanMap.put(sjf.getUuid(), stan);
			 }
			 
		 }
		  
		  
		  //search jcr with keyword
		  Collection<SearchResult> connectorResults = null;
		  try {

			QysFileSearchServiceConnector fssc = new QysFileSearchServiceConnector(
					QysFileSearchServiceConnector.initFileSearchProp());
			//QysFileSearchServiceConnector.SEARCH_PATH = "/Groups/spaces";
		    //fssc.setSearchSubDir("standard");
			connectorResults = fssc.searchQys(search_text, "standard");

	      } catch (Exception e) {
			LOG.error(e.getMessage(), e);
		  }
		  LOG.info("total jcr records found: " + connectorResults.size());
		  
		  Set<Standard> finalSet = new HashSet<Standard>();
		  for(SearchResult sr:connectorResults){
			  String uuid = sr.getDetail();
			  if(stanMap.containsKey(uuid)){
				  finalSet.add(stanMap.get(uuid));
			  }
		  }
		   
		  JSONObject mainObj = this.generateSearchResult(finalSet);
		 
		  
		  return Response.ok(mainObj.toString()).withMimeType("text/json").withCharset(Tools.UTF_8);
	  }
	  
		 
	  private JSONObject generateSearchResult(Set<Standard> stanSets){
          JSONArray ja = new JSONArray();
		  
          for(Standard st:stanSets){
        	  ja.put(new JSONObject(st));
          }
		  
		  JSONObject mainObj = new JSONObject();
		  try {
			mainObj.put("resultList", ja);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		  return mainObj;
	  }
	  
	  Set<Standard> testingStandardSet(){
		  Set<Standard> finalSet = new HashSet<Standard>();
	  
		  Standard st = standardSvc.findById("e0e08d6f-b564-49cc-9699-b4f7e4ee1100");
		  finalSet.add(st);
		  
		  st = standardSvc.findById("e064882e-ea02-42a1-a180-8b9000620213");
		  finalSet.add(st);
		  
		  st = standardSvc.findById("75e819fb-350c-401f-8308-7681536235c9");
		  finalSet.add(st);
		  
		  return finalSet;
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
	        	  
	        	  //need to get a jcr compliant file name if the name is in Chinese or have special characters
	        	  String jcrFileName = net.wyun.qys.util.Util.cleanNameUtil(fi.getName());
	        	  LOG.info("jcr file name: " + jcrFileName);
	        	  
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
