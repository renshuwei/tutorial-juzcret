package org.juzu.tutorial;

import java.security.Principal;
import java.util.Set;

import juzu.plugin.validation.ValidationError;
import juzu.Action;
import juzu.Mapped;
import juzu.Path;
import juzu.Resource;
import juzu.Response;
import juzu.View;
import juzu.plugin.ajax.Ajax;
import juzu.request.RequestContext;
import juzu.request.RequestLifeCycle;
import juzu.request.SecurityContext;

import javax.inject.Inject;

import org.json.JSONArray;
import org.json.JSONObject;
import org.juzu.tutorial.models.Comment;
import org.juzu.tutorial.services.SecretService;

import javax.validation.ConstraintViolation;
import javax.validation.Valid;

public class JuZcretApplication implements RequestLifeCycle {

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
    
    private static final String ANONYMOUS = "Anonymous";
    
    @Ajax
      @Resource
      public Response addComment(String secretId, @Mapped @Valid Comment comment, SecurityContext context) {
        comment.setUserId(getCurrentUser(context));
        Comment result = secretService.addComment(secretId, comment);
        if (result != null) {
          return Response.ok(new JSONObject(result).toString()).withMimeType("text/json");
        } else {
          return Response.status(503);
        }
      }
   
      @Ajax
      @Resource
      public Response addLike(String secretId, SecurityContext context) {
        Set<String> likes = secretService.addLike(secretId, getCurrentUser(context));
        if (likes != null) {
          return Response.ok(new JSONArray(likes).toString()).withMimeType("text/json");
        } else {
          return Response.status(503);
        }
      }
   
      private String getCurrentUser(SecurityContext context) {
          Principal user = context.getUserPrincipal();
          if (user == null) {
            return ANONYMOUS;
          } else {
            return user.getName();
          }
        }

	@Override
	public void beginRequest(RequestContext arg0) {
		
	}

	@Override
	public void endRequest(RequestContext context) {

		 Response response = context.getResponse();
         if (response instanceof ValidationError) {
             ValidationError error = (ValidationError)response;
             Set<ConstraintViolation<Object>> violations = error.getViolations();

             String msg = violations.iterator().next().getMessage();
             response = Response.ok(msg).withMimeType("text/html");
             context.setResponse(response);
         }
	}
	
}
