package com.example.myapplication.api;

import androidx.lifecycle.MutableLiveData;

import com.example.myapplication.Contact;
import com.example.myapplication.ContactsDao;
import com.example.myapplication.R;
import com.example.myapplication.User;
import com.example.myapplication.UserDao;
import com.example.myapplication.view_models.MyApplication;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;

import org.json.JSONObject;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserAPI {
    private UserDao userDao;
    Retrofit retrofit;
    WebServiceAPI webServiceAPI;

    public UserAPI(UserDao userDao) {
        this.userDao = userDao;//
        Gson gson = new GsonBuilder()//https://stackoverflow.com/questions/39918814/use-jsonreader-setlenienttrue-to-accept-malformed-json-at-line-1-column-1-path
                .setLenient()
                .create();
        retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.context.getString(R.string.BASE_URL) )
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void PostUser(User user){

        Call<Void> call = webServiceAPI.CreateUser(user.ToJsonElement());
        call.enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) {
                System.out.println("User created");
                userDao.insert(user);
            }

            @Override
            public void onFailure(Call call, Throwable t) {
                System.out.println("Error: " + t.getMessage());
            }
        });

    }
}
