package org.juzu.tutorial.services;

import org.exoplatform.services.jcr.ext.app.SessionProviderService;
import org.exoplatform.services.jcr.ext.common.SessionProvider;
import org.exoplatform.services.jcr.ext.hierarchy.NodeHierarchyCreator;
import org.juzu.tutorial.models.Comment;
import org.juzu.tutorial.models.Secret;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import java.util.Calendar;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Singleton
public class SecretServiceJCRImpl implements SecretService {

    private static final String SECRET_APP = "SecretApplication";

    private static final String CREATED_DATE = "exo:createdDate";

    private static final String ID = "exo:id";

    private static final String IMAGE_URL = "exo:imageURL";

    private static final String LIKES = "exo:likes";

    private static final String MESSAGE = "exo:message";

    private static final String CONTENT = "exo:content";

    private static final String USER_ID = "exo:userId";

    private static final String SECRET_NODE_TYPE = "exo:secret";

    private static final String COMMENT_NODE_TYPE = "exo:secretComment";

    @Inject
    private SessionProviderService  sessionService;

    @Inject
    private NodeHierarchyCreator    nodeCreator;
    
    private Node getSecretHome() throws Exception {
        SessionProvider sProvider = sessionService.getSystemSessionProvider(null);
        Node publicApp = nodeCreator.getPublicApplicationNode(sProvider);
        try {
          return publicApp.getNode(SECRET_APP);
        } catch (Exception e) {
          Node secretApp = publicApp.addNode(SECRET_APP, "nt:unstructured");
          publicApp.getSession().save();
          return secretApp;
        }
      }

    @Override
    public List<Secret> getSecrets() {

    	List<Secret> secrets = new LinkedList<Secret>();
        try {
          Node secretHome = getSecretHome();
          NodeIterator iterChild = secretHome.getNodes();
          while (iterChild.hasNext()) {
            secrets.add(buildSecret(iterChild.nextNode()));
          }
          return secrets;
        } catch (Exception e) {
          e.printStackTrace();
          return null;
        }
    	
    }

    @Override
    public void addSecret(String message, String imageUrl) {

    	String id = UUID.randomUUID().toString();
        try {
          Node secretHome = getSecretHome();
          Node secret = secretHome.addNode(id, SECRET_NODE_TYPE);
          secret.setProperty(ID, id);
          secret.setProperty(MESSAGE, message);
          secret.setProperty(IMAGE_URL, imageUrl);
          secret.setProperty(CREATED_DATE, Calendar.getInstance());
          secret.getSession().save();
        } catch (Exception e) {
          e.printStackTrace();
        }
    }

    @Override
    public Comment addComment(String secretId, Comment comment) {

    	String id = UUID.randomUUID().toString();
    	 
        try {
          Node secret = getSecretNode(secretId);
     
          if (secret != null) {
            Node cNode = secret.addNode(id, COMMENT_NODE_TYPE);
            cNode.setProperty(ID, id);
            cNode.setProperty(USER_ID, comment.getUserId());
            cNode.setProperty(CONTENT, comment.getContent());
            cNode.setProperty(CREATED_DATE, Calendar.getInstance());
     
            cNode.getSession().save();
            return buildComment(cNode);
          }
        } catch (Exception e) {
          e.printStackTrace();
        }
        return null;
    }

    @Override
    public Set<String> addLike(String secretId, String userId) {

    	try {
    	      Node secret = getSecretNode(secretId);
    	 
    	      if (secret != null) {
    	        Set<String> likes = new HashSet<String>();
    	        if (secret.hasProperty(LIKES)) {
    	          Value[] values = secret.getProperty(LIKES).getValues();
    	          for (Value v : values) {
    	            likes.add(v.getString());
    	          }
    	        }
    	        likes.add(userId);
    	        secret.setProperty(LIKES, likes.toArray(new String[likes.size()]));
    	 
    	        secret.save();
    	        return likes;
    	      }
    	    } catch (Exception e) {
    	      e.printStackTrace();
    	    }
    	    return null;
    }
    
    private Node getSecretNode(String secretId) {
        try {
          Node secretHome = getSecretHome();
          Node secret = secretHome.getNode(secretId);
          return secret;
        } catch (Exception e) {
          e.printStackTrace();
          return null;
        }
      }
    
    private Secret buildSecret(Node secretNode) throws RepositoryException {
        Secret secret = new Secret();
     
        List<Comment> comments = new LinkedList<Comment>();
        NodeIterator commentIter = secretNode.getNodes();
        while (commentIter.hasNext()) {
          comments.add(buildComment(commentIter.nextNode()));
        }
        secret.setComments(comments);
     
        secret.setCreatedDate(secretNode.getProperty(CREATED_DATE).getDate().getTime());
        secret.setId(secretNode.getProperty(ID).getString());
        secret.setImageURL(secretNode.getProperty(IMAGE_URL).getString());
     
        Set<String> likes = new HashSet<String>();
        if (secretNode.hasProperty(LIKES)) {
          for (Value userID : secretNode.getProperty(LIKES).getValues()) {
            likes.add(userID.getString());
          }
        }
        secret.setLikes(likes);
     
        secret.setMessage(secretNode.getProperty(MESSAGE).getString());
        return secret;
      }
    
    private Comment buildComment(Node commentNode) throws RepositoryException {
        Comment comment = new Comment();
        comment.setContent(commentNode.getProperty(CONTENT).getString());
        comment.setCreatedDate(commentNode.getProperty(CREATED_DATE).getDate().getTime());
        comment.setId(commentNode.getProperty(ID).getString());
        comment.setUserId(commentNode.getProperty(USER_ID).getString());
        return comment;
      }
}