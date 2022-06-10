package com.example.myapplication;

public class Message {
    private final String text;
    private final Boolean isSent;
    private final String Date;
    private final String Time;

    public Message(String text, Boolean isSent, String date, String time) {
        this.text = text;
        this.isSent = isSent;
        Date = date;
        Time = time;
    }

    public String getText() {
        return text;
    }

    public Boolean getSent() {
        return isSent;
    }

    public String getDate() {
        return Date;
    }

    public String getTime() {
        return Time;
    }
}
