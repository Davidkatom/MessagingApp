package com.example.myapplication;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {Contact.class}, version = 10)
public abstract class AppContactsDB extends RoomDatabase {
    public abstract ContactsDao contactsDao();
}
