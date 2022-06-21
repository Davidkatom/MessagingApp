package com.example.myapplication;

import androidx.room.Database;
import androidx.room.RoomDatabase;

//@Database(entities = {Message.class, Contact.class}, version = 1)
@Database(entities = {User.class}, version = 3)
public abstract class AppUsersDB extends RoomDatabase {
    public abstract UserDao userDao();


}
