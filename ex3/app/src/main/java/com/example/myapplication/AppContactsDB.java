package com.example.myapplication;

import androidx.room.Database;
import androidx.room.RoomDatabase;

//@Database(entities = {Message.class, User.class}, version = 1)
@Database(entities = {User.class}, version = 1)
public abstract class AppContactsDB extends RoomDatabase {
    public abstract ContactsDao contactsDao();
}
