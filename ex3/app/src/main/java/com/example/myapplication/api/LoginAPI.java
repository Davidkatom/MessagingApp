package com.example.myapplication.api;

import com.example.myapplication.R;
import com.example.myapplication.view_models.MyApplication;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginAPI {
    Retrofit retrofit;
    WebServiceAPI webServiceAPI;

    public LoginAPI() {

        retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.context.getString(R.string.BASE_URL) )
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void LoginToServer(String username, String password) {
//        Call<LoginResObject> call = webServiceAPI.login(username, password);
        Call<LoginResObject> call = webServiceAPI.login("omer", "123");
        call.enqueue(new Callback<LoginResObject>() {
            @Override
            public void onResponse(Call<LoginResObject> call, Response<LoginResObject> response) {
//                String temp = response.body();
                System.out.println("Login !");

            }

            @Override
            public void onFailure(Call<LoginResObject> call, Throwable t) {
                System.out.println("Login Failed");
            }
        });
    }
}
