package org.juzu.tutorial.models;

import java.io.Serializable;
import java.util.Date;

public class Secret implements Serializable {

   /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

   private String message;

   private String imageURL;

   private Date createdDate;

   public Secret() {}

   public String getMessage() { return message; }

   public void setMessage(String message) { this.message = message; }

   public String getImageURL() { return imageURL; }

   public void setImageURL(String imageURL) { this.imageURL = imageURL; }

   public Date getCreatedDate() { return createdDate; }

   public void setCreatedDate(Date createdDate) { this.createdDate = createdDate; }
}