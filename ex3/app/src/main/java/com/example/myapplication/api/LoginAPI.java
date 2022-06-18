package com.example.myapplication.api;

import android.content.SharedPreferences;
import android.widget.LinearLayout;

import com.example.myapplication.R;
import com.example.myapplication.view_models.MyApplication;
import com.google.android.material.snackbar.Snackbar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginAPI {
    Retrofit retrofit;
    WebServiceAPI webServiceAPI;
    LinearLayout MRootLayout;
    public LoginAPI(LinearLayout mRootView) {
        MRootLayout = mRootView;
        retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.context.getString(R.string.BASE_URL) )
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void LoginToServer(String username, String password,SharedPreferences prefs) {
        Call<LoginResObject> call = webServiceAPI.login(username, password);
        call.enqueue(new Callback<LoginResObject>() {
            @Override
            public void onResponse(Call<LoginResObject> call, Response<LoginResObject> response) {
                LoginResObject LRO = response.body();
                assert LRO != null;
                if(LRO.getToken() != null && LRO.getUsername()!= null) {
                    Snackbar.make(MRootLayout, "Login Successful", Snackbar.LENGTH_SHORT).show();
                    prefs.edit().putString("token", LRO.getToken()).apply();
                } else {
                    Snackbar.make(MRootLayout, "Username and/or password are incorrect", Snackbar.LENGTH_SHORT).show();

                }
            }

            @Override
            public void onFailure(Call<LoginResObject> call, Throwable t) {
                System.out.println("Connection to server failed");
                Snackbar.make(MRootLayout, "Connection to server failed", Snackbar.LENGTH_SHORT).show();
            }
        });
    }
}
