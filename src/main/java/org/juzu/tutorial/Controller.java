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
import juzu.request.SecurityContext;
import juzu.Response;
import juzu.template.Template;

import javax.inject.Inject;

import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
import org.exoplatform.task.domain.UserSetting;
import org.exoplatform.task.service.UserService;

import java.io.IOException;

public class Controller {
	
  private static final Log LOG = ExoLogger.getExoLogger(Controller.class);
	
  @Inject
  UserService userService;


  @Inject
  @Path("index.gtmpl")
  Template index;
  
  @Inject
  @Path("interpretation.gtmpl")
  Template interpretation;
  
  @Inject
  @Path("input_interpret.gtmpl")
  Template input_interpret;

  @View
  public Response.Content index(SecurityContext securityContext) throws IOException {
	  String username = securityContext.getRemoteUser();
	  LOG.info("user: " + username);
	  UserSetting setting = userService.getUserSetting(username);
	  if(setting != null){
		  LOG.info("user setting: " + setting.getUsername());
	  }
	  
      return index.ok();
  }
  
  @View
  public Response.Content interpret() throws IOException {
    return interpretation.ok();
  }
  
  @View
  public Response.Content interpret_upload() throws IOException {
    return input_interpret.ok();
  }
}
