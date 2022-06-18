package com.example.myapplication.api;

import com.example.myapplication.R;

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
                .baseUrl(String.valueOf(R.string.BASE_URL + "/api/"))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void LoginToServer(String username, String password) {
        Call<LoginResObject> call = webServiceAPI.login(username, password);
        call.enqueue(new Callback<LoginResObject>() {
            @Override
            public void onResponse(Call<LoginResObject> call, Response<LoginResObject> response) {
                LoginResObject loginResObject = response.body();
                if (loginResObject != null) {
                    //save token to shared preferences
//                    SharedPreferencesManager.getInstance().saveToken(loginResObject.getToken());
//                    SharedPreferencesManager.getInstance().saveUsername(loginResObject.getUsername());
                }
            }

            @Override
            public void onFailure(Call<LoginResObject> call, Throwable t) {

            }
        });
    }
}
