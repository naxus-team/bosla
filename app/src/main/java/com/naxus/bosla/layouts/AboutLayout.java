package com.naxus.bosla.layouts;

import static com.naxus.core.utils.Lang.t;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.naxus.bosla.BuildConfig;
import com.naxus.bosla.MainActivity;
import com.naxus.bosla.components.HeaderView;
import com.naxus.bosla.ui.adapters.DefaultAdapter;
import com.naxus.bosla.ui.adapters.LanguageAdapter;
import com.naxus.bosla.ui.adapters.recycleItem;
import com.naxus.core.utils.NLang;

public class AboutLayout extends FrameLayout {
    private String versionName =  BuildConfig.VERSION_NAME;
    private int versionCode = BuildConfig.VERSION_CODE;
    private String packageName = getContext().getPackageName();
    private String buildType = BuildConfig.BUILD_TYPE;
    private String buildDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date(BuildConfig.BUILD_TIME));
    private String developer = "Naxus Corporation";
    private String website = "https://naxus.co";
    private String email = "support@naxus.co";
    private String copyright = "© 2025 Naxus. All rights reserved.";
    private void setLang(String code) {

        Activity activity = (Activity) getContext();

        // تحقق من أن اللغة موجودة ضمن اللغات المدعومة
        String[] supported = {"en_US","ar_AE","fr_FR","es_ES","de_DE","zh_CN","ja_JP",
                "ko_KR","it_IT","pt_PT","ru_RU","tr_TR","hi_IN","bn_BD","ur_PK"};

        boolean exists = false;
        for (String lang : supported) {
            if (lang.equals(code)) {
                exists = true;
                break;
            }
        }

        // لو مش موجودة، تعيين الإنجليزية كافتراضية
        if (!exists) code = "en_US";

        NLang.setLanguage(activity, code, MainActivity.class);
    }
    public AboutLayout(Context context) {
        super(context);
        LinearLayout root = new LinearLayout(getContext());
        root.setLayoutParams(new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
        root.setOrientation(LinearLayout.VERTICAL);

        HeaderView header = new HeaderView(context, NLang.t("about.title"));
        root.addView(header);
        addView(root);
        recycleItem[] Items = new recycleItem[]{
                new recycleItem(t("Version"), versionName + " (" + versionCode + ")", null),
                new recycleItem(t("Build Type"), buildType, null),
                new recycleItem(t("Build Date"), buildDate, null),
                new recycleItem(t("Developer"), developer, null),
                new recycleItem(t("Website"), website, v -> {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(website));
                    getContext().startActivity(intent);
                }),
                new recycleItem(t("Contact Email"), email, v -> {
                    Intent emailIntent = new Intent(Intent.ACTION_SENDTO);
                    emailIntent.setData(Uri.parse("mailto:" + email));
                    emailIntent.putExtra(Intent.EXTRA_SUBJECT, "Bosla App Support");
                    getContext().startActivity(Intent.createChooser(emailIntent, "Send email"));
                }),
                new recycleItem(t("Privacy Policy"), t("privacy_policy.subtitle"), v -> {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://naxus.co/privacy"));
                    getContext().startActivity(intent);
                }),
                new recycleItem(t("Terms of Use"), t("terms_of_use.subtitle"), v -> {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://naxus.co/terms"));
                    getContext().startActivity(intent);
                }),
                new recycleItem(t("License"), copyright, null)
        };


// إنشاء RecyclerView
        RecyclerView recyclerView = new RecyclerView(context);
        LinearLayout.LayoutParams rvParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                0,
                1f
        );
        recyclerView.setLayoutParams(rvParams);
        recyclerView.setLayoutManager(new LinearLayoutManager(context)); // مهم
        recyclerView.setAdapter(new DefaultAdapter(Items, context));
        root.addView(recyclerView);

        // دعم السحب لإغلاق
        setOnTouchListener(new OnTouchListener() {
            float startX;
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        startX = event.getX();
                        break;
                    case MotionEvent.ACTION_MOVE:
                        float diff = event.getX() - startX;
                        if (diff > 150) {
                            if (getContext() instanceof AppCompatActivity) {
                                ((AppCompatActivity) getContext()).finish();
                            }
                            return true;
                        }
                }
                return true;
            }
        });

        recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            private float maxElevation = 8f;
            private float scrollFactor = 200f;
            private int totalScroll = 0;

            @Override
            public void onScrolled(@NonNull RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);

                totalScroll += dy;
                if (totalScroll < 0) totalScroll = 0;

                // احسب النسبة من 0 إلى 1 حسب مقدار التمرير
                float ratio = Math.min(1f, totalScroll / scrollFactor);

                // احسب الارتفاع بناءً على النسبة
                float targetElevation = ratio * maxElevation;

                // تطبيق فوري بدون تأخير
                header.setTranslationZ(targetElevation);

                // اختياري: الخلفية ثابتة
                header.setBackgroundColor(Color.WHITE);
            }
        });
    }
}
