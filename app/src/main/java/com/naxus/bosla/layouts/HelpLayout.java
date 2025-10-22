package com.naxus.bosla.layouts;

import static com.naxus.core.utils.Lang.t;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.naxus.bosla.MainActivity;
import com.naxus.bosla.components.HeaderView;
import com.naxus.bosla.ui.adapters.LanguageAdapter;
import com.naxus.bosla.ui.adapters.recycleItem;
import com.naxus.core.utils.NLang;

public class HelpLayout extends FrameLayout {
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
    public HelpLayout(Context context) {
        super(context);
        LinearLayout root = new LinearLayout(getContext());
        root.setLayoutParams(new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
        root.setOrientation(LinearLayout.VERTICAL);

        HeaderView header = new HeaderView(context, NLang.t("language.title"));
        root.addView(header);
        addView(root);
        recycleItem[] languages = new recycleItem[]{
                new recycleItem(t("langs.english"), "English (United States)", v -> setLang("en_US")),
                new recycleItem(t("langs.arabic"), "العربية", v -> setLang("ar_AE")),
                new recycleItem(t("langs.french"), "Français", v -> setLang("fr_FR")),
                new recycleItem(t("langs.spanish"), "Español", v -> setLang("es_ES")),
                new recycleItem(t("langs.german"), "Deutsch", v -> setLang("de_DE")),
                new recycleItem(t("langs.chinese"), "中文", v -> setLang("zh_CN")),
                new recycleItem(t("langs.japanese"), "日本語", v -> setLang("ja_JP")),
                new recycleItem(t("langs.korean"), "한국어", v -> setLang("ko_KR")),
                new recycleItem(t("langs.italian"), "Italiano", v -> setLang("it_IT")),
                new recycleItem(t("langs.portuguese"), "Português", v -> setLang("pt_PT")),
                new recycleItem(t("langs.russian"), "Русский", v -> setLang("ru_RU")),
                new recycleItem(t("langs.turkish"), "Türkçe", v -> setLang("tr_TR")),
                new recycleItem(t("langs.hindi"), "हिन्दी", v -> setLang("hi_IN")),
                new recycleItem(t("langs.bengali"), "বাংলা", v -> setLang("bn_BD")),
                new recycleItem(t("langs.urdu"), "اردو", v -> setLang("ur_PK"))
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
        recyclerView.setAdapter(new LanguageAdapter(languages, context));
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
