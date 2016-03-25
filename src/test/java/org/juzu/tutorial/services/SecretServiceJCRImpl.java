package org.juzu.tutorial.services;

import javax.inject.Singleton;

import java.util.List;
import java.util.Set;

import org.juzu.tutorial.models.Comment;
import org.juzu.tutorial.models.Secret;

@Singleton
public class SecretServiceJCRImpl implements SecretService {

  private SecretService delegate;

  public SecretServiceJCRImpl() {
    this.delegate = new SecretServiceMemImpl();
  }

  @Override
  public List<Secret> getSecrets() {
    return delegate.getSecrets();
  }

  @Override
  public void addSecret(String message, String imageUrl) {
    delegate.addSecret(message, imageUrl);
  }

  @Override
  public Comment addComment(String secretId, Comment comment) {
    return delegate.addComment(secretId, comment);
  }

  @Override
  public Set<String> addLike(String secretId, String userId) {
    return delegate.addLike(secretId, userId);
  }
}