package com.example.myapplication.api;

public class UserPostObject {
    public String id;
    public String password;
    public String nickName;
    public String profilePicture;

    public UserPostObject(String id, String password, String nickName, String profilePicture) {
        this.id = id;
        this.password = password;
        this.nickName = nickName;
        this.profilePicture = profilePicture;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
