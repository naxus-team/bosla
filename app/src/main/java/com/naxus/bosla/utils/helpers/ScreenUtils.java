package com.naxus.bosla.utils.helpers;

import android.app.Activity;
import android.graphics.Rect;
import android.os.Build;
import android.util.DisplayMetrics;

public class ScreenUtils {

    // ارتفاع شريط الحالة (Status Bar)
    public static int getStatusBarHeight(Activity activity) {
        int result = 0;
        int resourceId = activity.getResources().getIdentifier(
                "status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            result = activity.getResources().getDimensionPixelSize(resourceId);
        }
        return result;
    }

    // ارتفاع شريط التنقل (Navigation Bar) – زي الـ soft buttons
    public static int getNavigationBarHeight(Activity activity) {
        int result = 0;
        int resourceId = activity.getResources().getIdentifier(
                "navigation_bar_height", "dimen", "android");
        if (resourceId > 0) {
            result = activity.getResources().getDimensionPixelSize(resourceId);
        }
        return result;
    }

    // ارتفاع الشاشة القابل للاستخدام (بدون Status + Navigation)
    public static int getUsableScreenHeight(Activity activity) {
        Rect rect = new Rect();
        activity.getWindow().getDecorView().getWindowVisibleDisplayFrame(rect);
        return rect.height();
    }

    // ارتفاع الشاشة الكاملة
    public static int getFullScreenHeight(Activity activity) {
        DisplayMetrics metrics = new DisplayMetrics();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            activity.getDisplay().getRealMetrics(metrics);
        } else {
            activity.getWindowManager().getDefaultDisplay().getMetrics(metrics);
        }
        return metrics.heightPixels;
    }
}
