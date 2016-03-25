package org.exoplatform.commons.juzu;

import java.net.URL;

import javax.inject.Provider;

import juzu.inject.ProviderFactory;

import org.exoplatform.container.PortalContainer;
import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
//import org.picocontainer.ComponentAdapter;
import org.exoplatform.container.spi.ComponentAdapter;

public class KernelProviderFactory implements ProviderFactory {
	
	private static final Log LOG = ExoLogger.getLogger(KernelProviderFactory.class.getName()); 

    @Override
    public <T> Provider<? extends T> getProvider(final Class<T> implementationType) throws Exception {
    	Class klass = PortalContainer.class;
        URL location = klass.getResource('/'+klass.getName().replace('.', '/')+".class");
        LOG.info("get container from " + location);
        
    	LOG.info("get provider for " + implementationType.getName());
        final PortalContainer container = PortalContainer.getInstance();
        
        if (container == null) {
          //  throw new IllegalStateException("Not running in the context of a portal container");
        	LOG.error("Not running in the context of a portal container");
        	return null;
        }
        
        final ComponentAdapter<T> adapter = container.getComponentAdapterOfType(implementationType);
        if (adapter != null) {
            return new Provider<T>() {
                @Override
                public T get() {
                    Object service = adapter.getComponentInstance(); //getComponentInstance(container);
                    if (service == null) {
                        throw new RuntimeException("Could not obtain service " + implementationType + " from container " + container);
                    }
                    return implementationType.cast(service);
                }
            };
        } else {
            return null;
        }
    }
}