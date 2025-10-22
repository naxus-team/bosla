package com.naxus.bosla;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.naxus.bosla.layouts.AboutLayout;
import com.naxus.bosla.layouts.AccountLayout;
import com.naxus.bosla.layouts.HelpLayout;
import com.naxus.bosla.layouts.LanguageLayout;
/*import com.naxus.bosla.layouts.PrivacyLayout;
import com.naxus.bosla.layouts.AccountLayout;
import com.naxus.bosla.layouts.MapLayout;
import com.naxus.bosla.layouts.NotificationsLayout;
import com.naxus.bosla.layouts.HelpLayout;
import com.naxus.bosla.layouts.AboutLayout;
import com.naxus.bosla.layouts.PreferencesLayout;*/
import com.naxus.bosla.layouts.ProfileLayout;
import com.naxus.bosla.utils.helpers.StatusBarHelper;
import com.naxus.core.utils.Display;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public class SlideActivity extends AppCompatActivity {

    /** Registry لتسجيل كل الـ Layouts هنا لمرة واحدة فقط */
    private static final Map<String, Function<AppCompatActivity, View>> layoutRegistry = new HashMap<>();

    static {
        // تسجّل كل Layout باسم المفتاح الخاص به
        layoutRegistry.put("profile", activity -> new ProfileLayout(activity));
        layoutRegistry.put("language", activity -> new LanguageLayout(activity));
        layoutRegistry.put("account", activity -> new AccountLayout(activity));
/*        layoutRegistry.put("privacy", activity -> new PrivacyLayout(activity));
        layoutRegistry.put("preferences", activity -> new PreferencesLayout(activity));
        layoutRegistry.put("map", activity -> new MapLayout(activity));
        layoutRegistry.put("notifications", activity -> new NotificationsLayout(activity));*/
        layoutRegistry.put("help", activity -> new HelpLayout(activity));
        layoutRegistry.put("about", activity -> new AboutLayout(activity));
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // إعداد النظام والشفافية
        StatusBarHelper.setStatusBar(getWindow(), true, Color.TRANSPARENT);
        StatusBarHelper.setLightNavigationBar(this, Color.TRANSPARENT);

        // استقبال المفتاح من Intent
        String key = getIntent().getStringExtra("layout_key");

        // الحصول على الـ Layout بناءً على المفتاح
        View layout = getLayoutByKey(key);

        // تعيين المحتوى
        setContentView(layout);
    }

    /**
     * دالة إرجاع الـ Layout بناءً على المفتاح من الـ Registry.
     * لو المفتاح غير موجود → تعرض Layout افتراضي بسيط.
     */
    private View getLayoutByKey(String key) {
        if (key == null) key = "";

        Function<AppCompatActivity, View> factory = layoutRegistry.get(key);

        if (factory != null) {
            return factory.apply(this);
        } else {
            // لو المفتاح مش معروف → ارجع شاشة افتراضية
            View fallback = new View(this);
            fallback.setBackgroundColor(Color.WHITE);
            return fallback;
        }
    }

    // إضافة Padding تلقائي لأعلى الشاشة لتجنب تغطية StatusBar
    @Override
    public void setContentView(int layoutResID) {
        super.setContentView(layoutResID);
        applyStatusBarPadding(getWindow().getDecorView());
    }

    @Override
    public void setContentView(View view) {
        super.setContentView(view);
        applyStatusBarPadding(view);
    }

    private void applyStatusBarPadding(View root) {
        if (root instanceof ViewGroup) {
            root.setPadding(
                    root.getPaddingLeft(),
                    root.getPaddingTop() + Display.getStatusBarHeight(this),
                    root.getPaddingRight(),
                    root.getPaddingBottom()
            );
        }
    }
}
