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

@juzu.Application
@juzu.plugin.servlet.Servlet(value = "/")
//@Portlet
@Bindings({
    @Binding(value = TaskParser.class),
    @Binding(value = DAOHandler.class),
    @Binding(value = TaskService.class),
    @Binding(value = ProjectService.class),
    @Binding(value = StatusService.class),
    @Binding(value = OrganizationService.class),
    @Binding(value = UserService.class),
})
package org.juzu.tutorial;

//import juzu.plugin.asset.Assets;
//import juzu.plugin.asset.Script;
//import juzu.plugin.asset.Scripts;
//import juzu.plugin.asset.Stylesheet;
//import juzu.plugin.asset.Stylesheets;
import juzu.plugin.binding.Binding;
import juzu.plugin.binding.Bindings;
//import juzu.plugin.less4j.Less;
//import juzu.plugin.portlet.Portlet;
//import juzu.plugin.webjars.WebJar;
//import juzu.plugin.webjars.WebJars;

import org.exoplatform.services.organization.OrganizationService;
import org.exoplatform.task.dao.DAOHandler;
import org.exoplatform.task.service.ProjectService;
import org.exoplatform.task.service.StatusService;
import org.exoplatform.task.service.TaskParser;
import org.exoplatform.task.service.TaskService;
import org.exoplatform.task.service.UserService;
