package com.example.myapplication;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.json.JSONObject;

import java.util.List;

@Entity
public class User {
    @PrimaryKey
    @NonNull
    private String username;
    private String nickname;
    private String password;
    private int imageId;

    public User(String username, String password, int imageId, String nickname) {
        this.username = username;
        this.password = password;
        this.imageId = imageId;
        this.nickname = nickname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getImageId() {
        return imageId;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public JsonElement ToJsonElement() {

        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("Id", username);
            jsonObject.put("password", password);
            jsonObject.put("profilePicture", imageId);
            jsonObject.put("nickName", nickname);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return JsonParser.parseString(jsonObject.toString());
    }
}