package com.example.myapplication;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;


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

    public String getLastdate() {
        return lastdate;
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
