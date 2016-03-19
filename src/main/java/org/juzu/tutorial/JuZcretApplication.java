package org.juzu.tutorial;

import juzu.Action;
import juzu.Path;
import juzu.Response;
import juzu.View;

import javax.inject.Inject;

import org.juzu.tutorial.services.SecretService;

public class JuZcretApplication {

	@Inject
    SecretService secretService;
	
	@Inject
    @Path("secretWall.gtmpl")
    org.juzu.tutorial.templates.secretWall secretWall;
 
    @Inject
    @Path("addSecret.gtmpl")
    org.juzu.tutorial.templates.addSecret addSecret;
    
    @Action
    public Response.View addSecret(String msg, String imgURL) {
         secretService.addSecret(msg, imgURL);
        return JuZcretApplication_.index();
     }
    
    @View
    public Response.Content addSecretForm() {
        return addSecret.ok();
     }
    
    @View
    public Response.Content index() {
        return secretWall.with().secretsList(secretService.getSecrets()).ok();
     }
	
}
