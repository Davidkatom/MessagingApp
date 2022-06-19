package com.example.myapplication;

import androidx.room.Database;
import androidx.room.RoomDatabase;

//@Database(entities = {Message.class, Contact.class}, version = 1)
@Database(entities = {Message.class}, version = 4)
public abstract class AppMessagesDB extends RoomDatabase {
    public abstract MessageDao messageDao();
//    public abstract UserDao userDao();

}
