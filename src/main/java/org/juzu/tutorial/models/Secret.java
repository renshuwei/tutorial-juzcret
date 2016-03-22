package org.juzu.tutorial.models;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class Secret extends Model {

    private String message;

    private String imageURL;

    private Set<String> likes;

    private List<Comment> comments;

    public Secret() {
        likes = new HashSet<String>();
        comments = new LinkedList<Comment>();
    }

    public Set<String> getLikes() {
        Set<String> lks = new HashSet<String>(likes);
        return lks;
    }

    public void setLikes(Set<String> likes) {
        this.likes = likes;
    }

    public List<Comment> getComments() {
        List<Comment> cms = new LinkedList<Comment>(comments);
        return cms;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}