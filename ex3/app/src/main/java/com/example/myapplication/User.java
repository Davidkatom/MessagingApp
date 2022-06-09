package com.example.myapplication;

public class User {
    private String userName;
    private int pictureId;
    private String lastMessage;
    private String lastMessageSendingTime;


    public User(String userName, int pictureId, String lastMessage, String lastMessageSendingTime){
        this.userName = userName;
        this.pictureId = pictureId;
        this.lastMessage = lastMessage;
        this.lastMessageSendingTime = lastMessageSendingTime;
    }

    public String getUserName() {
        return userName;
    }

    public int getPictureId() {
        return pictureId;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public String getLastMessageSendingTime() {
        return lastMessageSendingTime;
    }
}
