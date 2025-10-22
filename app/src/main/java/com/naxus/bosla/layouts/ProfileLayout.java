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

public class ProfileLayout extends FrameLayout {
    public ProfileLayout(Context context) {
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
                new recycleItem(t("langs.english"), "English (United States)", v -> {}),
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
