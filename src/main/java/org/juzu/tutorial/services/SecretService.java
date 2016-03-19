package org.juzu.tutorial.services;

import java.util.List;

import org.juzu.tutorial.models.Secret;

public interface SecretService {

    List<Secret> getSecrets();

    void addSecret(String message, String imageUrl);
}