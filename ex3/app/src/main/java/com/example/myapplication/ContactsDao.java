package com.example.myapplication;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao

public interface ContactsDao {
    @Insert
    void insert(Contact... contact);
    @Query("SELECT * FROM Contact")
    List<Contact> index();
    @Update
    void update(Contact... contact);

}
