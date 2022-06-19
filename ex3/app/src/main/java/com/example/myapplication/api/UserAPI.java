package com.example.myapplication.api;

import androidx.lifecycle.MutableLiveData;

import com.example.myapplication.Contact;
import com.example.myapplication.ContactsDao;
import com.example.myapplication.R;
import com.example.myapplication.User;
import com.example.myapplication.UserDao;

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
        retrofit = new Retrofit.Builder()
                .baseUrl(String.valueOf(R.string.BASE_URL))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void PostUser(User user){
        Call<Void> call = webServiceAPI.CreateUser(user);
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
