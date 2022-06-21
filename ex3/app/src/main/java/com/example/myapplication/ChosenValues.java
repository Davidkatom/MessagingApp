package com.example.myapplication;

import android.content.SharedPreferences;
import android.os.Build;

import androidx.annotation.RequiresApi;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

public class ChosenValues {
    private User user = null;
    private Contact contact = null;
    private String token = null;
    private static ChosenValues instance = null;
    private Listener waiting = null;
    private SharedPreferences sharedPreferences;
    private ContactsDao contactsDao;
    private UserDao userDao;
    private MessagesListAdapter msgAdapter;

    private Map<String,String> lastTimes =new HashMap<String, String>();

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

    public MessagesListAdapter getMsgAdapter() {
        return msgAdapter;
    }

    public void setMsgAdapter(MessagesListAdapter msgAdapter) {
        this.msgAdapter = msgAdapter;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public String getLastTime(String userId) {
        String tempDate = lastTimes.get(userId);
        if(tempDate == null){
            return "just now";
//            Date date = new Date();
//            tempDate = date.toString();
        }
        DateTimeFormatter dateParser = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        DateTimeFormatter dateParserFix = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        DateTimeFormatter dateOnlyFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        DateTimeFormatter TimeOnlyFormatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalDateTime dateTime;
        if (tempDate.contains("T")){
            dateTime= LocalDateTime.parse(tempDate, dateParser);

        }else{
            dateTime = LocalDateTime.parse(tempDate, dateParserFix);
        }
        String dateOnly = dateTime.format(dateOnlyFormatter);
        String timeOnly = dateTime.format(TimeOnlyFormatter);
        if (dateOnly.equals(LocalDateTime.now().format(dateOnlyFormatter))) {
            return timeOnly;
        }else{
            return dateOnly;
        }



//        return lastTimes.get(userId);

    }

    public void setLastTime(String userId, String time) {
        lastTimes.put(userId,time);
    }
}
