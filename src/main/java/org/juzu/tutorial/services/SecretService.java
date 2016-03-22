package org.juzu.tutorial.services;

import java.util.List;
import java.util.Set;

import org.juzu.tutorial.models.Comment;
import org.juzu.tutorial.models.Secret;

public interface SecretService {

    List<Secret> getSecrets();

    void addSecret(String message, String imageUrl);
    
    public Comment addComment(String secretId, Comment comment);
    
    public Set<String> addLike(String secretId, String userId);
}