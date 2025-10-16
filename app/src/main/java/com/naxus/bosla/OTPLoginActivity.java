package com.naxus.bosla;

import android.graphics.Color;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import androidx.appcompat.app.AppCompatActivity;
import com.naxus.core.SessionManager;
import com.naxus.core.ui.NUIButton;
import com.naxus.core.ui.NUIInput;
import com.naxus.core.utils.NColor;

public class OTPLoginActivity extends AppCompatActivity {
    private SessionManager session;
    private Button sendOtpButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        session = new SessionManager(this);
        // Layout ديناميكي سريع
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(50, 200, 50, 50);
        root.setGravity(Gravity.CENTER_HORIZONTAL);

        NUIInput phone = new NUIInput(this)
                .setLabel("رقم الهاتف")
                .setColor(Color.parseColor("#000000"));
        root.addView(phone);


        ImageView icon = new ImageView(this);
        icon.setImageResource(R.drawable.bubble_search);
        icon.setColorFilter(Color.BLACK);
        icon.setAdjustViewBounds(true);
        int size = (int) TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP, 24, getResources().getDisplayMetrics());
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(size, size);

        icon.setLayoutParams(params);

        NUIButton btn = new NUIButton(this)
                .setText("Continue")
                .setColor(Color.BLACK)
                .setShadow(false)
                .setCornerRadius(16)
                .setHeight(48)
                .setWidth(100)
                .setIcon(icon)
                .setMargin(32)
                .setIconPosition("center")
                .onPressIn(() -> Log.d("NUI", "PressIn"))
                .onPressOut(() -> Log.d("NUI", "PressOut"))
                .onPress(() -> {
                    String phoneNumber = phone.getText();
                    sendOTP(phoneNumber);
                });

        root.addView(btn);

        setContentView(root);
    }

    private void sendOTP(String phoneNumber) {
        // هنا ممكن تستخدم Firebase OTP أو أي طريقة
        // لتبسيط المثال، هنعتبر OTP تم بنجاح
        session.setLoggedIn(true);
        session.setPhoneNumber(phoneNumber);

        // بعد تسجيل الدخول، انتقل للصفحة الرئيسية
        startActivity(new android.content.Intent(this, MainActivity.class));
        finish();
    }
}
