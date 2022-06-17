package com.example.myapplication;

public class ConnectedUser {
    private static User user = null;

    public ConnectedUser(User user) {
        ConnectedUser.user = user;
    }

    public User getUser() {
        return user;
    }
}
