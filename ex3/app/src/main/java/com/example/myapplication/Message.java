package com.example.myapplication;


import android.os.Build;

import androidx.annotation.RequiresApi;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
public class Message {

    @PrimaryKey
    private int id;
    private String content;
    private String created;
    private Boolean sent;

    public Message( int id, String content, Boolean sent,String created) {
        this.id = id;
        this.content = content;
        this.sent = sent;
        this.created = created;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public Boolean getSent() {
        return sent;
    }

    public void setSent(Boolean sent) {
        this.sent = sent;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public String getTimeForChat(){
        String formattedTime = created.split("\\.", 2)[0];
        DateTimeFormatter dateParser = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        String date = LocalDate.parse(formattedTime, dateParser).format(dateFormatter);

        if (date.equals(LocalDateTime.now().format(dateFormatter))){
            return LocalDateTime.parse(formattedTime, dateParser).format(timeFormatter);
        }
        else{
            return LocalDateTime.parse(formattedTime, dateParser).format(dateFormatter);
        }
    }

    @Override
    public boolean equals(Object o) {
        if(o instanceof Message){
            Message m = (Message)o;
            return this.id == m.id;
        }
        return false;
    }
}
