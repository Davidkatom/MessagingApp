package com.example.myapplication;

public class ConnectedUser {
    private static User user = null;

    public ConnectedUser(User user) {
        ConnectedUser.user = user;
    }

    public static User getUser() {
        return user;
    }
}
