package com.example.myapplication;


import android.os.Build;

import androidx.annotation.RequiresApi;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

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

        if (date.equals(LocalDate.now().format(dateFormatter))){
            return LocalDate.parse(formattedTime, dateParser).format(timeFormatter);
        }
        else{
            return LocalDate.parse(formattedTime, dateParser).format(dateFormatter);
        }
    }
}
