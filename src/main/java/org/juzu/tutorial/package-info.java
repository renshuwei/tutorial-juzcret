@juzu.Application(defaultController = org.juzu.tutorial.JuZcretApplication.class)
@Bindings({
        @Binding(value = org.juzu.tutorial.services.SecretService.class, implementation = org.juzu.tutorial.services.SecretServiceMemImpl.class, scope = Scope.SINGLETON)
})

@Less(@Stylesheet("styles/juzcret.less"))
@Assets("*")

@WebJars(@WebJar("jquery"))
@Scripts(
	{
		@Script(id = "jquery", value = "jquery/1.10.2/jquery.js"),
		@Script(value = "javascripts/secret.js", depends = "jquery")
	}
)

package org.juzu.tutorial;

import juzu.Scope;
import juzu.plugin.asset.Assets;
import juzu.plugin.binding.Binding;
import juzu.plugin.binding.Bindings;
import juzu.plugin.asset.Script;
import juzu.plugin.asset.Scripts;
import juzu.plugin.asset.Stylesheet;
import juzu.plugin.less4j.Less;
import juzu.plugin.webjars.WebJar;
import juzu.plugin.webjars.WebJars;