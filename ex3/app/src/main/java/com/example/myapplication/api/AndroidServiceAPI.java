package com.example.myapplication.api;

import android.content.SharedPreferences;
import android.os.Build;
import android.widget.LinearLayout;

import androidx.annotation.RequiresApi;

import com.example.myapplication.ChosenValues;
import com.example.myapplication.Contact;
import com.example.myapplication.ContactsDao;
import com.example.myapplication.Message;
import com.example.myapplication.MessageDao;
import com.example.myapplication.MessagesListAdapter;
import com.example.myapplication.User;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

@RequiresApi(api = Build.VERSION_CODES.O)
public class AndroidServiceAPI {
    //Useful headers:
    Map<String, String> jasonHeader = new HashMap<String, String>() {{
        put("Content-Type", "application/json");
    }};
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    Retrofit retrofit;
    WebServiceAPI webServiceAPI;
    Gson gson;
    LinearLayout MRootLayout;


    public AndroidServiceAPI(LinearLayout mRootView) {
        SharedPreferences prefs = ChosenValues.getInstance().getSharedPreferences();
        String server = prefs.getString("server", "http://10.0.2.2:7087")+"/api/";
        MRootLayout = mRootView;
        gson = new GsonBuilder()//https://stackoverflow.com/questions/39918814/use-jsonreader-setlenienttrue-to-accept-malformed-json-at-line-1-column-1-path
                .setLenient()
                .create();
        retrofit = new Retrofit.Builder()
                .baseUrl(server)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void updateUserData(){
        Map<String, String> tokenHeader = new HashMap<String, String>() {{
            put("Authorization", "Bearer " + ChosenValues.getInstance().getToken());
        }};
        Call<JsonElement> call = webServiceAPI.getUserData(tokenHeader);
        call.enqueue(new Callback<JsonElement>() {
            @Override
            public void onResponse(Call<JsonElement> call, Response<JsonElement> response) {
                if (response.isSuccessful()) {
                    JsonElement res = response.body();
                    String nickname = ((JsonObject) res).get("NickName").getAsString();
                    ChosenValues.getInstance().getUser().setNickname(nickname.replace("\"",""));
                }
            }

            @Override
            public void onFailure(Call<JsonElement> call, Throwable t) {
                Snackbar.make(MRootLayout, "Connection to server failed", Snackbar.LENGTH_SHORT).show();
            }
        });

    }

    public void UpdateMessages(Contact contact, MessageDao messageDao, MessagesListAdapter MsgListAdapter) {
        Map<String, String> tokenHeader = new HashMap<String, String>() {{
            put("Authorization", "Bearer " + ChosenValues.getInstance().getToken());
        }};
        Call<List<Message>> call = webServiceAPI.getMessages(tokenHeader, contact.getId());
        call.enqueue(new Callback<List<Message>>() {
            @Override
            public void onResponse(Call<List<Message>> call, Response<List<Message>> response) {
                if (response.isSuccessful()) {
                    List<Message> messages = response.body();

                    if(messages!=null) {
                        for (Message message : messages) {
                            if (!messageDao.index().contains(message)) {
                                messageDao.insert(message);// adds new messages to local database
                            }
                        }
                    MsgListAdapter.clear();
                    MsgListAdapter.addAll(messages);//adds all messages to the list adapter
                    MsgListAdapter.notifyDataSetChanged();
                    ChosenValues.getInstance().getWaiting().finished();
                    }
                } else {
                    //Snackbar.make(MRootLayout, "failed to receive messages from server", Snackbar.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Message>> call, Throwable t) {
//                Snackbar.make(MRootLayout, "Connection to server failed", Snackbar.LENGTH_SHORT).show();
            }
        });
    }

    public void addMessageToListAdapter(Message newMessage, MessagesListAdapter MsgListAdapter){
        ChosenValues.getInstance().getContactScreen().updateMSGAdapter( newMessage, MsgListAdapter);

//        MsgListAdapter = ChosenValues.getInstance().getMsgAdapter();
//
//                MsgListAdapter.add(newMessage);
//                MsgListAdapter.notifyDataSetChanged();

//        contact.setLast(content);
//        contact.setLastdate(formattedDate);
//        ChosenValues.getInstance().getContactsDao().update(contact);//update contact in local database

    }

    public void PostMessage(Contact contact, String content, MessageDao messageDao, MessagesListAdapter MsgListAdapter) {
        String formattedDate = LocalDateTime.now().format(formatter);
        //ChosenValues.getInstance().getSelectedContact().setLast(content);
        //ChosenValues.getInstance().getSelectedContact().setLastdate(formattedDate);
        Map<String, String> tokenHeader = new HashMap<String, String>() {{
            put("Authorization", "Bearer " + ChosenValues.getInstance().getToken());
        }};
        Map<String, String> messageMap = new HashMap<String, String>() {{
            put("content", content);
        }};
        Call<JsonElement> call = webServiceAPI.CreateMessage(messageMap, tokenHeader, contact.getId());
        call.enqueue(new Callback<JsonElement>() {
            @Override
            public void onResponse(Call<JsonElement> call, Response<JsonElement> response) {
                if (response.isSuccessful()) {
                    Message newMessage = new Message(Integer.parseInt(response.body().toString()), content, true, formattedDate);
                    messageDao.insert(newMessage);//insert new message into local database
                    addMessageToListAdapter(newMessage, MsgListAdapter);
//                    messageDao.insert(newMessage);//insert new message into local database
//                    MsgListAdapter.add(newMessage);
//                    MsgListAdapter.notifyDataSetChanged();
//                    contact.setLast(content);
//                    contact.setLastdate(formattedDate);
//                    ChosenValues.getInstance().getContactsDao().update(contact);//update contact in local database
                    ChosenValues.getInstance().getWaiting().finished();
                    TransferMessage(contact, content);
                } else {
//                    Snackbar.make(MRootLayout, "Message failed to send", Snackbar.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<JsonElement> call, Throwable t) {
//                Snackbar.make(MRootLayout, "Connection to server failed", Snackbar.LENGTH_SHORT).show();
            }
        });
    }

    public void TransferMessage(Contact contact, String content) {
        Map<String, String> transferMessageMap = new HashMap<String, String>() {{
            put("content", content);
            put("from", ChosenValues.getInstance().getUser().getUsername());
            put("to", contact.getId());
        }};
        //create its own webservice API
        Retrofit tempRetrofit = new Retrofit.Builder()
                .baseUrl(contact.getServer()+"/api/")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        WebServiceAPI tempWebServiceAPI = tempRetrofit.create(WebServiceAPI.class);

        Call<Void> call = tempWebServiceAPI.TransferMessage(transferMessageMap, jasonHeader);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call call, Response response) {
            }

            @Override
            public void onFailure(Call call, Throwable t) {
            }
        });
    }

    public void PostUser(User user) {
        UserPostObject userPostObject = new UserPostObject(user.getUsername(), user.getPassword(), user.getNickname(), String.valueOf(user.getImageId()));
        Call<JsonElement> call = webServiceAPI.CreateUser(userPostObject, jasonHeader);
        call.enqueue(new Callback<JsonElement>() {
            @Override
            public void onResponse(Call<JsonElement> call, Response<JsonElement> response) {
                if (response.isSuccessful()) {
                    Snackbar.make(MRootLayout, "User Created", Snackbar.LENGTH_LONG).show();
                } else {
                    Snackbar.make(MRootLayout, "User already exists", Snackbar.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<JsonElement> call, Throwable t) {
                Snackbar.make(MRootLayout, "Connection to server failed", Snackbar.LENGTH_SHORT).show();
            }
        });
    }

    public void updateContacts(ContactsDao contactsDao) {
        Map<String, String> tokenHeader = new HashMap<String, String>() {{
            put("Authorization", "Bearer " + ChosenValues.getInstance().getToken());
        }};
        Call<List<Contact>> call = webServiceAPI.getContacts(tokenHeader);
        call.enqueue(new Callback<List<Contact>>() {
            @Override
            public void onResponse(Call<List<Contact>> call, Response<List<Contact>> response) {
                List<Contact> contacts = response.body();
                List<Contact> localContacts = contactsDao.index();

                assert contacts != null;
                for (Contact contact : contacts) {
                    ChosenValues.getInstance().setLastTime(contact.getId(),contact.getLastdate());
                    ChosenValues.getInstance().setLastMsg(contact.getId(),contact.getLast());
                    if (!localContacts.contains(contact)) {
                        contactsDao.insert(contact);
                    }
                }
                ChosenValues.getInstance().getWaiting().finished();
            }

            @Override
            public void onFailure(Call<List<Contact>> call, Throwable t) {
            }
        });
    }

    public void PostContact(Contact contact, ContactsDao contactsDao) {
        //UserPostObject userPostObject = new UserPostObject(user.getUsername(), user.getPassword(),user.getNickname(),String.valueOf(user.getImageId()));
        Map<String, String> tokenHeader = new HashMap<String, String>() {{
            put("Authorization", "Bearer " + ChosenValues.getInstance().getToken());
        }};
        Call<JsonElement> call = webServiceAPI.CreateContact(contact, tokenHeader);
        call.enqueue(new Callback<JsonElement>() {
            @Override
            public void onResponse(Call<JsonElement> call, Response<JsonElement> response) {
                if (response.isSuccessful()) {
                    Snackbar.make(MRootLayout, "Contact Added", Snackbar.LENGTH_LONG).show();
                    contactsDao.insert(contact);
                    InviteContact(contact);
                    ChosenValues.getInstance().getWaiting().finished();
                    updateContacts(contactsDao);
                } else {
                    Snackbar.make(MRootLayout, "Contact already exists", Snackbar.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<JsonElement> call, Throwable t) {
                Snackbar.make(MRootLayout, "Connection to server failed", Snackbar.LENGTH_SHORT).show();
            }
        });
    }

    public void InviteContact(Contact contact) {
        Map<String, String> inviteContactMap = new HashMap<String, String>() {{
            put("to", contact.getId());
            put("from", ChosenValues.getInstance().getUser().getUsername());
            put("server", contact.getServer());
        }};
        Retrofit tempRetrofit = new Retrofit.Builder()
                .baseUrl(contact.getServer()+"/api/")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        WebServiceAPI tempWebServiceAPI = tempRetrofit.create(WebServiceAPI.class);
        Call<Void> call = tempWebServiceAPI.InviteContact(inviteContactMap, jasonHeader);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call call, Response response) {

            }

            @Override
            public void onFailure(Call call, Throwable t) {
            }
        });

    }

    public void LoginToServer(String username, String password, SharedPreferences prefs) {
        //Generate FIREBASE TOKEN:
        FirebaseInstanceId.getInstance().getInstanceId().addOnSuccessListener(instanceIdResult -> {
            String newToken = instanceIdResult.getToken();
            Call<JsonElement> call = webServiceAPI.login(username, password, newToken);
            call.enqueue(new Callback<JsonElement>() {
                @Override
                public void onResponse(Call<JsonElement> call, Response<JsonElement> response) {
                    if (response.isSuccessful()) {
                        assert response.body() != null;
                        JsonElement LRO = response.body();
                        Snackbar.make(MRootLayout, "Login Successful", Snackbar.LENGTH_LONG).show();
                        ChosenValues.getInstance().setToken(LRO.getAsString());
                        ChosenValues.getInstance().getWaiting().finished();
                        updateUserData();
                    } else {
                        Snackbar.make(MRootLayout, "Username and/or password are incorrect", Snackbar.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<JsonElement> call, Throwable t) {
                    Snackbar.make(MRootLayout, "Connection to server failed", Snackbar.LENGTH_SHORT).show();
                }
            });
        });
    }


}
