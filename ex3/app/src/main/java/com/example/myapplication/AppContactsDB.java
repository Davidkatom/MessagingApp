package com.example.myapplication;

import androidx.room.AutoMigration;
import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {Contact.class}, version = 5)
public abstract class AppContactsDB extends RoomDatabase {
    public abstract ContactsDao contactsDao();
}
