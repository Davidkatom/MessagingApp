package com.example.myapplication;

import android.content.SharedPreferences;

public class ChosenValues {
    private User user = null;
    private Contact contact = null;
    private String token = null;
    private static ChosenValues instance = null;
    private Listener waiting = null;
    private SharedPreferences sharedPreferences;
    private ContactsDao contactsDao;
    private UserDao userDao;

    private ChosenValues() {

    }
    public static ChosenValues getInstance() {
        if (instance == null)
            instance = new ChosenValues();

        return instance;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public Contact getSelectedContact() {
        return contact;
    }
    public void setSelectedContact(Contact contact) {
        this.contact = contact;
    }

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public void setWaiting(Listener waiting) {
        this.waiting = waiting;
    }
    public Listener getWaiting() {
        return waiting;
    }
    public void setSharedPreferences(SharedPreferences sharedPreferences) {
        this.sharedPreferences = sharedPreferences;
    }
    public SharedPreferences getSharedPreferences() {
        return sharedPreferences;
    }
    public void setContactsDao(ContactsDao contactsDao) {
        this.contactsDao = contactsDao;
    }
    public ContactsDao getContactsDao() {
        return contactsDao;
    }
}
