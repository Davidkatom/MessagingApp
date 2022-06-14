package com.example.myapplication;


import android.os.Build;

import androidx.annotation.RequiresApi;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
public class Message {

    @PrimaryKey(autoGenerate = true)
    private int id;
    private String text;
    private Boolean isSent;
    private String date;
    private String time;

    public Message( String text, Boolean isSent,String date, String time) {
        this.text = text;
        this.isSent = isSent;
        this.date = date;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getSent() {
        return isSent;
    }

    public void setSent(Boolean sent) {
        isSent = sent;
    }
    public String getDate() {
        return date;
    }

    public void setDate(String newdate) {
        date = newdate;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String newTime) {
        time = newTime;
    }
    @RequiresApi(api = Build.VERSION_CODES.O)
    public String getTimeForChat(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        if (date.equals(LocalDate.now().format(formatter))){
            return time;
        }
        else{
            return date;
        }
    }
}
