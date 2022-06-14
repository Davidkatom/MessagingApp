package com.example.myapplication;

import androidx.room.Database;
import androidx.room.RoomDatabase;

//@Database(entities = {Message.class, User.class}, version = 1)
@Database(entities = {Message.class}, version = 1)
public abstract class AppMessagesDB extends RoomDatabase {
    public abstract MessageDao messageDao();
//    public abstract UserDao userDao();

}
