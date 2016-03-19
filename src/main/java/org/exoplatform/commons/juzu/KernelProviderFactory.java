package org.exoplatform.commons.juzu;

import javax.inject.Provider;
import juzu.inject.ProviderFactory;
import org.exoplatform.container.PortalContainer;
import org.picocontainer.ComponentAdapter;

public class KernelProviderFactory implements ProviderFactory {

    @Override
    public <T> Provider<? extends T> getProvider(final Class<T> implementationType) throws Exception {
        final PortalContainer container = PortalContainer.getInstance();
        if (container == null) {
            throw new IllegalStateException("Not running in the context of a portal container");
        }
        final ComponentAdapter adapter = container.getComponentAdapterOfType(implementationType);
        if (adapter != null) {
            return new Provider<T>() {
                @Override
                public T get() {
                    Object service = adapter.getComponentInstance(container);
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