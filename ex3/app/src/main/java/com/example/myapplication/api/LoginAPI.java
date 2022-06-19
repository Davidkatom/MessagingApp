package com.example.myapplication.api;

import android.content.SharedPreferences;
import android.widget.LinearLayout;

import com.example.myapplication.R;
import com.example.myapplication.view_models.MyApplication;
import com.google.android.material.snackbar.Snackbar;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;

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
        Gson gson = new GsonBuilder()//https://stackoverflow.com/questions/39918814/use-jsonreader-setlenienttrue-to-accept-malformed-json-at-line-1-column-1-path
                .setLenient()
                .create();
        retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.context.getString(R.string.BASE_URL) )
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void LoginToServer(String username, String password,SharedPreferences prefs) {
        Call<JsonElement> call = webServiceAPI.login(username,password);
//        Call<JsonElement> call = webServiceAPI.login(new LoginPostObject(username,password));
        call.enqueue(new Callback<JsonElement>() {
            @Override
            public void onResponse(Call<JsonElement> call, Response<JsonElement> response) {
                if(response.isSuccessful()) {
                    assert response.body() != null;
                    String LRO = response.body().toString();
                    Snackbar.make(MRootLayout, "Login Successful", Snackbar.LENGTH_LONG).show();
                    prefs.edit().putString("token", LRO).apply();
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
}
