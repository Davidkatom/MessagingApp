package com.example.myapplication;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.List;

@Entity
public class Contact {

    @PrimaryKey
    @NonNull
    private final String userName;
    private final int pictureId;


    private final String lastMessage;
    private final String lastMessageSendingTime;


    public Contact(String userName, int pictureId, String lastMessage, String lastMessageSendingTime){
        this.userName = userName;
        this.pictureId = pictureId;
        this.lastMessage = lastMessage;
        this.lastMessageSendingTime = lastMessageSendingTime;
    }
//    public void setId(int id) {
//        this.id = id;
//    }
//
//    public int getId() {
//        return id;
//    }

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
