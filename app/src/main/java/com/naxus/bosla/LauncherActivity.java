package com.naxus.bosla;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

import com.naxus.core.SessionManager;

public class LauncherActivity extends AppCompatActivity {
    private SessionManager session;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        session = new SessionManager(this);
        Intent intent = new Intent();
        if (session.isLoggedIn()) {
            startActivity(new Intent(this, MainActivity.class));
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        } else {
            startActivity(new Intent(this, OTPLoginActivity.class));
        }
        finish();
    }
}
