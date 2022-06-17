package com.example.myapplication;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface ContactsDao {
    @Insert
    void insert(User... user);
    @Query("SELECT * FROM user")
    List<User> index();

}
