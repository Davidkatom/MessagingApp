package com.example.myapplication;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;


@Entity
public class Contact {

    @PrimaryKey
    @NonNull
    private final String userName;
    private final String nickname;
    private final int pictureId;
    private String lastMessage;
    private String lastMessageSendingTime;
    private String server;


    public Contact(String userName,String nickname, int pictureId, String lastMessage, String lastMessageSendingTime, String server) {
        this.userName = userName;
        this.pictureId = pictureId;
        this.lastMessage = lastMessage;
        this.lastMessageSendingTime = lastMessageSendingTime;
        this.server = server;
        this.nickname = nickname;
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

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public void setLastMessageSendingTime(String lastMessageSendingTime) {
        this.lastMessageSendingTime = lastMessageSendingTime;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }

    public String getNickname() {
        return nickname;
    }
}
