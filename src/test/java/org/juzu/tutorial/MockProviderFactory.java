package org.juzu.tutorial;

import javax.inject.Provider;

import juzu.inject.ProviderFactory;

public class MockProviderFactory implements ProviderFactory {

  @Override
  public <T> Provider<? extends T> getProvider(final Class<T> implementationType) throws Exception {
    return new Provider<T>() {
      @Override
      public T get() {
        return null;
      }
    };
  }
}