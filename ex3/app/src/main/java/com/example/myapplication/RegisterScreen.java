package com.example.myapplication;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import com.example.myapplication.api.AndroidServiceAPI;
import com.google.android.material.snackbar.Snackbar;

public class RegisterScreen extends AppCompatActivity {
    private AppUsersDB db;
    private UserDao userDao;
    //    private UserAPI userAPI;
    private int imageId;
    private final int SELECT_PICTURE = 200;
    private Uri selectedImageUri = null;


    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register_screen);

        final EditText etUserName = findViewById(R.id.etUserName);
        final EditText etPass1 = findViewById(R.id.etSignUpPass);
        final EditText etPass2 = findViewById(R.id.etSignUpPassConfirm);
        final EditText etNickName = findViewById(R.id.etNickName);


        //room from here:
        db = Room.databaseBuilder(getApplicationContext(), AppUsersDB.class, "UsersDB").fallbackToDestructiveMigration().allowMainThreadQueries().build();
        userDao = db.userDao();

        ImageButton btnChooseImage = findViewById(R.id.chooseImage);
        btnChooseImage.setOnClickListener(v -> {
            Intent intent = new Intent();
            intent.setType("image/*");
            intent.setAction(Intent.ACTION_OPEN_DOCUMENT);
            startActivityForResult(Intent.createChooser(intent, "Select Picture"), SELECT_PICTURE);
        });

        findViewById(R.id.btnSignUp).setOnClickListener(v -> {
            //Check if user already exists
            LinearLayout mRootView = (LinearLayout) findViewById(R.id.linearLayout_Register);
            User exists = userDao.getUser(etUserName.getText().toString().toLowerCase());
            if (exists != null) {
                Snackbar.make(mRootView, "Username already exists", Snackbar.LENGTH_SHORT).show();
                return;
            }
            //check if password contains at least one number and one letter
            if (!etPass1.getText().toString().matches(".*[a-zA-Z].*") || !etPass1.getText().toString().matches(".*[0-9].*")) {
                Snackbar.make(mRootView, "Password must contain at least one letter and one number", Snackbar.LENGTH_SHORT).show();
                return;
            }

            //Check if passwords match
            if (!etPass1.getText().toString().equals(etPass2.getText().toString())) {
                Snackbar.make(mRootView, "Passwords do not match", Snackbar.LENGTH_SHORT).show();
                return;
            }

            //Check if all fields are filled
            if (etUserName.getText().toString().length() == 0 || etNickName.getText().toString().length() == 0) {
                Snackbar.make(mRootView, "Please fill in all fields", Snackbar.LENGTH_SHORT).show();
                return;
            }
            //register user
//            if (selectedImageUri == null) {
//                selectedImageUri = R.drawable.default_contact;
//            }
            String imageSrc;
            if (selectedImageUri == null) {
                imageSrc = ("android.resource://com.example.myapplication/drawable/default_contact.png");
            }else{
                imageSrc = selectedImageUri.toString();
            }

            User user = new User(etUserName.getText().toString().toLowerCase(), etPass1.getText().toString(), imageSrc, etNickName.getText().toString());
            userDao.insert(user);
            AndroidServiceAPI androidServiceAPI = new AndroidServiceAPI(mRootView);
            androidServiceAPI.PostUser(user);
            finish();
        });

    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == RESULT_OK) {
            if (requestCode == SELECT_PICTURE) {
                // Get the url of the image from data
                Uri selectedImageUri = data.getData();
                if (null != selectedImageUri) {
                    // update the preview image in the layout
                    getContentResolver().takePersistableUriPermission(selectedImageUri, Intent.FLAG_GRANT_READ_URI_PERMISSION );
                    ImageButton btnChooseImage = findViewById(R.id.chooseImage);
                    btnChooseImage.setImageURI(selectedImageUri);
                    this.selectedImageUri = selectedImageUri;

                }
            }
        }
    }

}