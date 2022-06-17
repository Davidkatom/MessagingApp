package com.example.myapplication;

public class ChosenValues {
    private User user = null;
    private Contact contact = null;
    private static ChosenValues instance = null;

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
}
