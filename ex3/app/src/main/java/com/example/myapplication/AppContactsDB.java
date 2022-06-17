package com.example.myapplication;

import androidx.room.Database;
import androidx.room.RoomDatabase;

//@Database(entities = {Message.class, Contact.class}, version = 1)
@Database(entities = {Contact.class}, version = 1)
public abstract class AppContactsDB extends RoomDatabase {
    public abstract ContactsDao contactsDao();
}
