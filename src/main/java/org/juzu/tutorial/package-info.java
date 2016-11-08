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
//@Portlet
@Bindings({
    @Binding(value = OrganizationService.class),
    @Binding(value = UserService.class),
    @Binding(value = PolicyService.class),
    @Binding(value = StandardService.class),
    @Binding(value = org.exoplatform.commons.api.search.SearchService.class),
})



@Scripts({
    @Script(id = "indexjs", value = "js/index.js", location=AssetLocation.APPLICATION)
})

@Stylesheets ({
    @Stylesheet(id = "indexcss", value = "styles/index.css", location = AssetLocation.APPLICATION),
    @Stylesheet(id = "input_interpretcss", value = "styles/input_interpret.css", location = AssetLocation.APPLICATION),
    
})

package org.juzu.tutorial;

//import juzu.plugin.asset.Assets;
import juzu.plugin.asset.Script;
import juzu.plugin.asset.Scripts;
import juzu.plugin.asset.Stylesheet;
import juzu.plugin.asset.Stylesheets;
import juzu.plugin.binding.Binding;
import juzu.plugin.binding.Bindings;
//import juzu.plugin.less4j.Less;
//import juzu.plugin.portlet.Portlet;
//import juzu.plugin.webjars.WebJar;
//import juzu.plugin.webjars.WebJars;
import net.wyun.qys.service.PolicyService;
import net.wyun.qys.service.StandardService;
import net.wyun.qys.service.UserService;
import juzu.asset.AssetLocation;

import org.exoplatform.services.organization.OrganizationService;
