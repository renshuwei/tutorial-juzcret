package org.juzu.tutorial.services;

import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
import org.juzu.tutorial.models.Comment;
import org.juzu.tutorial.models.Secret;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.inject.Singleton;

@Singleton
public class SecretServiceMemImpl implements SecretService {

	private static final Log LOG = ExoLogger.getLogger(SecretServiceMemImpl.class.getName()); 
    private List<Secret> secretsList;

    @Override
    public List<Secret> getSecrets() {
    	 if (secretsList == null) {
    	      secretsList = new LinkedList<Secret>();
    	      addFakeSecrets();
    	    }
    	    return secretsList;
    }

    @Override
    public void addSecret(String message, String imageUrl) {
    	LOG.debug(message, imageUrl);
	    Secret secret = new Secret();
	    secret.setId(UUID.randomUUID().toString());
	    secret.setMessage(message);
	    secret.setImageURL(imageUrl);
	    secret.setCreatedDate(new Date());
	    secretsList.add(secret);
    }
    
    private void addFakeSecrets() {
        addSecret("Yesterday I said I missed my PL meeting because I have to many work. In fact I was drinking free beer in Barbetta pub",
                 "https://c1.staticflickr.com/3/2385/2345543856_6d0fbafb66_z.jpg?zz=1");
        addSecret("I have a master degree but I still use Google to calculate 3*8",
                 "https://yy2.staticflickr.com/7244/7245177220_3f17ee9fb8_z.jpg");
        addSecret("I am in relationship for 2 years. He is awesome, powerful and I never go out without him. His name is Linux",
                 "http://fc02.deviantart.net/fs71/f/2009/364/9/d/christmas_love_by_skubaNiec.jpg");
        addSecret("I spent 2 hours a day to train my cat to perform a backflip",
                 "http://fc06.deviantart.net/fs15/i/2007/008/e/b/colour_cat_wallpaper_by_jellyplant.jpg");
        addSecret("I pretend to be a spy when I go out. In reality my job is to perform photocopy at the embassy",
                 "https://c2.staticflickr.com/2/1230/5108154392_3cc02cac67_z.jpg");
      }

	@Override
	public Comment addComment(String secretId, Comment comment) {
		LOG.info("secretId: " + secretId, comment);
		Secret secret = getSecret(secretId);
        if (secret != null) {
            comment.setId(UUID.randomUUID().toString());
            comment.setCreatedDate(new Date());
 
            List<Comment> comments = secret.getComments();
            comments.add(comment);
            secret.setComments(comments);
        }
        LOG.info("comment: " + comment.getId() + ", " + comment.getContent() + ", " + comment.getCreatedDate());
        return comment;	
    }
	
	 private Secret getSecret(String secretId) {
	        Secret secret = null;
	        for (Secret s : getSecrets()) {
	            if (s.getId().equals(secretId)) {
	                secret = s;
	            }
	        }
	        return secret;
	    }

	@Override
	public Set<String> addLike(String secretId, String userId) {

		Secret secret = getSecret(secretId);
        if (secret != null) {
            Set<String> likes = secret.getLikes();
            // You can like only one time
            if (!likes.contains(userId)) {
                likes.add(userId);
            }
            secret.setLikes(likes);
            return likes;
        }
        return null;
	}
}