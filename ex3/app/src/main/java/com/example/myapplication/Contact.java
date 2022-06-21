package com.example.myapplication;

import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Entity
public class Contact {

    @PrimaryKey
    @NonNull
    private final String id;
    private final String name;
    private String server;
    private String last;
    private String lastdate;


    public Contact(@NonNull String id, String name, String last, String lastdate, String server) {
        this.id = id;
        this.name = name;
        this.last = last;
        this.lastdate = lastdate;
        this.server = server;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }

    public String getLast() {
        return last;
    }

    public void setLast(String last) {
        this.last = last;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public String getLastdate() {


        DateTimeFormatter dateParser = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        DateTimeFormatter dateParserFix = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        if(!lastdate.contains("T")){
            try {
                lastdate = LocalDateTime.parse(lastdate, dateParserFix).format(dateParser);
            }
            catch (Exception e){
                lastdate = LocalDateTime.now().format(dateParser);
            }
        }
        String date = LocalDateTime.parse(lastdate, dateParser).format(dateFormatter);

        if (date.equals(LocalDateTime.now().format(dateFormatter))){
            return LocalDateTime.parse(lastdate, dateParser).format(timeFormatter);
        }
        else{
            return LocalDateTime.parse(lastdate, dateParser).format(dateFormatter);
        }

    }

    public void setLastdate(String lastdate) {
        this.lastdate = lastdate;
    }

    @Override
    public boolean equals(Object o){
        if(o instanceof Contact){
            Contact c = (Contact)o;
            return this.id.equals(c.id);
        }
        else{
            return false;
        }
    }
}
