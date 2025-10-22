package com.naxus.bosla.utils.helpers;

import android.annotation.SuppressLint;
import android.os.Build;
import android.os.Build.VERSION_CODES;
import android.view.View;
import android.view.Window;

import androidx.appcompat.app.AppCompatActivity;

public class StatusBarHelper {
    @SuppressLint("ObsoleteSdkInt")
    public static void setStatusBar(Window window, boolean darkText, int color) {
        window.setStatusBarColor(color);
        if (Build.VERSION.SDK_INT >= VERSION_CODES.M) {
            View decor = window.getDecorView();
            decor.setSystemUiVisibility(darkText ? View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR : 0);
        }
    }

    public static void setLightNavigationBar(AppCompatActivity activity, int navColor) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            activity.getWindow().setNavigationBarColor(navColor);
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            View decor = activity.getWindow().getDecorView();
            int flags = decor.getSystemUiVisibility();
            flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR; // أيقونات داكنة
            decor.setSystemUiVisibility(flags);
        }
    }
}
