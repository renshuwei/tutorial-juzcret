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
    @Binding(value = org.exoplatform.services.jcr.RepositoryService.class),
    @Binding(value = org.exoplatform.services.jcr.ext.app.SessionProviderService.class),
    @Binding(value = org.exoplatform.services.cms.folksonomy.NewFolksonomyService.class),
    @Binding(value = org.exoplatform.services.cms.link.LinkManager.class),
    @Binding(value = org.exoplatform.services.jcr.ext.hierarchy.NodeHierarchyCreator.class)
})



@Scripts({
	@Script(id = "jquery", value = "js/jquery-1.8.3.min.js", location=AssetLocation.APPLICATION),
	@Script(id = "jquerypage", value = "js/jquery.page.js", depends="jquery", location=AssetLocation.APPLICATION),
	@Script(id="juzuutil",  value = "js/jquery-juzu-utils-0.1.0.js", depends = "jquery", location=AssetLocation.APPLICATION),
	@Script(id = "nlibjs", value = "js/nlib.js", location=AssetLocation.APPLICATION),
    @Script(id = "indexjs", value = "js/index.js", depends="jquery", location=AssetLocation.APPLICATION),
    //interpretation
    @Script(id = "interpretationjs", value = "js/interpretation/interpretation.js", location=AssetLocation.APPLICATION),
    @Script(id = "interpretation_uploadjs", value = "js/interpretation/interpretation_upload.js", location=AssetLocation.APPLICATION),
    @Script(id = "new_interpretationjs", value = "js/interpretation/new_interpretation.js", location=AssetLocation.APPLICATION),
    //national standard
    @Script(id = "standardjs",value ="js/nationalsd/standard.js",depends="jquery", location=AssetLocation.APPLICATION),
    @Script(id = "standarduploadjs",value ="js/nationalsd/standard_upload.js",depends = {"jquery", "jquerypage", "nlibjs"}, location=AssetLocation.APPLICATION),
    @Script(id = "fileuploadjs",value ="js/fileupload.js",location=AssetLocation.APPLICATION),
    @Script(id = "mouseoutjs",value ="js/mouseout.js",location=AssetLocation.APPLICATION),
    @Script(id = "mouseoverjs",value ="js/mouseover.js",location=AssetLocation.APPLICATION),
    //local standard
    @Script(id = "echartsjs", value = "js/echarts.js", location=AssetLocation.APPLICATION),
    @Script(id = "amapjs", value = "http://webapi.amap.com/maps?v=1.3&key=b23cb51fd67fa09da9478fc6a14cc200&plugin=AMap.Geocoder",
    		  location = AssetLocation.URL),
    @Script(id = "mapjs", value = "js/localpl/map.js", depends={"amapjs", "jquery", "echartsjs"}, location=AssetLocation.APPLICATION),    
    @Script(id = "local_uploadjs", value = "js/localpl/local_upload.js", location=AssetLocation.APPLICATION),
    @Script(id = "new_localjs", value = "js/localpl/new_local.js", location=AssetLocation.APPLICATION),
    
    
})

@Stylesheets ({
    @Stylesheet(id = "indexcss", value = "styles/index.css", location = AssetLocation.APPLICATION),
    //
    @Stylesheet(id = "interpretationcss", value = "styles/interpretation.css", location = AssetLocation.APPLICATION),    
    @Stylesheet(id = "interpretation_uploadcss", value = "styles/interpretation_upload.css", location = AssetLocation.APPLICATION),
    @Stylesheet(id = "new_interpretationcss", value = "styles/new_interpretation.css", location = AssetLocation.APPLICATION),
    //local
    @Stylesheet(id = "mapcss", value = "styles/map.css", location = AssetLocation.APPLICATION),
    @Stylesheet(id = "local_uploadcss", value = "styles/local_upload.css", location = AssetLocation.APPLICATION),
    //
    @Stylesheet(id = "input_interpretcss", value = "styles/input_interpret.css", location = AssetLocation.APPLICATION),
    @Stylesheet(id = "standardcss", value = "styles/standard.css", location = AssetLocation.APPLICATION),
    @Stylesheet(id = "standard_uploadcss", value = "styles/standard_upload.css", location = AssetLocation.APPLICATION),
    
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
