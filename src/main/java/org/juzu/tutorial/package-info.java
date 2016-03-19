@juzu.Application(defaultController = org.juzu.tutorial.JuZcretApplication.class)
@Bindings({
        @Binding(value = org.juzu.tutorial.services.SecretService.class, implementation = org.juzu.tutorial.services.SecretServiceMemImpl.class, scope = Scope.SINGLETON)
})
package org.juzu.tutorial;

import juzu.Scope;
import juzu.plugin.binding.Binding;
import juzu.plugin.binding.Bindings;