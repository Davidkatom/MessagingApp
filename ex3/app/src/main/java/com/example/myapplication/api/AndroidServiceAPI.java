package com.example.myapplication.api;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.LinearLayout;

import androidx.room.Room;

import com.example.myapplication.AppContactsDB;
import com.example.myapplication.AppUsersDB;
import com.example.myapplication.ChosenValues;
import com.example.myapplication.Contact;
import com.example.myapplication.ContactScreen;
import com.example.myapplication.R;
import com.example.myapplication.User;
import com.example.myapplication.UserDao;
import com.example.myapplication.view_models.MyApplication;
import com.google.android.material.snackbar.Snackbar;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class AndroidServiceAPI {
    //Useful headers:
    Map<String, String> jasonHeader = new HashMap<String, String>() {{
        put("Content-Type", "application/json");
    }};


    Retrofit retrofit;
    WebServiceAPI webServiceAPI;
    LinearLayout MRootLayout;

    public AndroidServiceAPI(LinearLayout mRootView) {
        MRootLayout = mRootView;
        Gson gson = new GsonBuilder()//https://stackoverflow.com/questions/39918814/use-jsonreader-setlenienttrue-to-accept-malformed-json-at-line-1-column-1-path
                .setLenient()
                .create();
        retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.context.getString(R.string.BASE_URL))
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void PostUser(User user) {
        UserPostObject userPostObject = new UserPostObject(user.getUsername(), user.getPassword(),user.getNickname(),String.valueOf(user.getImageId()));
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

    public void LoginToServer(String username, String password, UserDao userDao, Context context, SharedPreferences prefs) {
        Call<JsonElement> call = webServiceAPI.login(username, password);
        call.enqueue(new Callback<JsonElement>() {
            @Override
            public void onResponse(Call<JsonElement> call, Response<JsonElement> response) {
                if (response.isSuccessful()) {
                    assert response.body() != null;
                    JsonElement LRO = response.body();
                    //Snackbar.make(MRootLayout, "Login Successful", Snackbar.LENGTH_LONG).show();
                    ChosenValues.getInstance().setToken(LRO.getAsString());
                    login(username, password, context, userDao,prefs);

                } else {
                    Snackbar.make(MRootLayout, "Username and/or password are incorrect", Snackbar.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<JsonElement> call, Throwable t) {
                Snackbar.make(MRootLayout, "Connection to server failed", Snackbar.LENGTH_SHORT).show();
            }
        });
    }

    public void getContacts() {
        Map<String, String> tokenHeader = new HashMap<String, String>() {{
            put("Authorization", "Bearer " + ChosenValues.getInstance().getToken());
        }};
        Call<List<Contact>> call = webServiceAPI.getContacts(tokenHeader);
        call.enqueue(new Callback<List<Contact>>() {
            @Override
            public void onResponse(Call<List<Contact>> call, Response<List<Contact>> response) {
                List<Contact> contacts = response.body();
            }

            @Override
            public void onFailure(Call<List<Contact>> call, Throwable t) {
            }
        });

    }

    private void login(String username, String password, Context context, UserDao userDao, SharedPreferences prefs) {
        User user = userDao.getUser(username);
        if(user == null){
            //TODO HTTP GET request to get user info (Nickname)
            user = new User(username, password, 0, username);
            userDao.insert(user);
        }

        prefs.edit().putString("username", user.getUsername()).apply();
        ChosenValues.getInstance().setUser(user);

        //context.startActivity(new Intent(context, ContactScreen.class));
    }

}
