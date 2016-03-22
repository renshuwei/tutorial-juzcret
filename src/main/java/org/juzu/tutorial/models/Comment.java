package org.juzu.tutorial.models;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class Comment extends Model {
    private String userId;
    
    @javax.validation.constraints.Pattern(regexp = "^.+$", message = "Comment content must not be empty")
    @NotNull(message = "Comment content is required")
    private String content;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}