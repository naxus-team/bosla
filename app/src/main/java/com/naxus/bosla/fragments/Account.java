package com.naxus.bosla.fragments;

import android.app.Activity;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.RippleDrawable;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.bottomsheet.BottomSheetBehavior;
import com.naxus.bosla.MainActivity;
import com.naxus.bosla.R;
import com.naxus.bosla.SlideActivity;
import com.naxus.bosla.layouts.LanguageLayout;
import com.naxus.bosla.ui.adapters.AccountAdapter;
import com.naxus.core.utils.NLang;

import java.util.Arrays;
import java.util.List;

public class Account extends Fragment {
    public static void openSlide(Activity activity, String key) {
        Intent intent = new Intent(activity, SlideActivity.class);
        intent.putExtra("layout_key", key);
        activity.startActivity(intent);
    }
    @Nullable
    @Override
    public android.view.View onCreateView(@NonNull android.view.LayoutInflater inflater,
                                          @Nullable ViewGroup container,
                                          @Nullable Bundle savedInstanceState) {

        LinearLayout root = new LinearLayout(getContext());
        root.setLayoutParams(new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
        root.setOrientation(LinearLayout.VERTICAL);

        int headerHeight = (int) TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP, 60, getResources().getDisplayMetrics());

        LinearLayout header = new LinearLayout(requireContext());
        header.setOrientation(LinearLayout.HORIZONTAL);
        header.setGravity(Gravity.CENTER_VERTICAL);
        header.setPadding(24,0,24,0);
        header.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                headerHeight
        ));

        TextView title = new TextView(requireContext());
        title.setText(NLang.t("account.title"));
        title.setTextAlignment(View.TEXT_ALIGNMENT_VIEW_START);
        title.setTypeface(Typeface.DEFAULT_BOLD);
        title.setPadding(24,0,24,0);

        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20);
        title.setTextColor(Color.BLACK);
        title.setLayoutParams(new LinearLayout.LayoutParams(
                0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f
        ));

        LinearLayout buttonsContainer = new LinearLayout(requireContext());
        buttonsContainer.setOrientation(LinearLayout.HORIZONTAL);
        buttonsContainer.setGravity(Gravity.END | Gravity.CENTER_VERTICAL);
        buttonsContainer.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        ));

        int size = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 48, getResources().getDisplayMetrics());
        TypedValue outValue = new TypedValue();
        getContext().getTheme().resolveAttribute(android.R.attr.colorControlHighlight, outValue, true);
        int rippleColor = outValue.data;

        int[] icons = {R.drawable.magnifying_glass, R.drawable.ellipsis_vertical};
        View.OnClickListener[] listeners = {
                v -> {
                    if (requireContext() instanceof MainActivity) {
                        MainActivity main = (MainActivity) requireContext();
                        ((MainActivity) requireContext()).showSettingsSheet();
                        BottomSheetBehavior<?> behavior = main.getSheetBehavior();

                        if (behavior != null) {
                            if (behavior.getState() == BottomSheetBehavior.STATE_HIDDEN) {
                                behavior.setState(BottomSheetBehavior.STATE_EXPANDED);
                            } else {
                                behavior.setState(BottomSheetBehavior.STATE_HIDDEN);
                            }
                        }
                    }
                },                v -> {
            if (requireContext() instanceof MainActivity) {
                MainActivity main = (MainActivity) requireContext();
                ((MainActivity) requireContext()).showSettingsSheet();
                BottomSheetBehavior<?> behavior = main.getSheetBehavior();

                if (behavior != null) {
                    if (behavior.getState() == BottomSheetBehavior.STATE_HIDDEN) {
                        behavior.setState(BottomSheetBehavior.STATE_EXPANDED);
                    } else {
                        behavior.setState(BottomSheetBehavior.STATE_HIDDEN);
                    }
                }
            }
        },
        };

        for (int i = 0; i < icons.length; i++) {
            ImageView btn = new ImageView(getContext());
            LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(size, size);
            btn.setLayoutParams(p);

            GradientDrawable bg = new GradientDrawable();
            bg.setCornerRadius(size);
            bg.setColor(Color.parseColor("#01FFFFFF"));

            btn.setBackground(new RippleDrawable(ColorStateList.valueOf(rippleColor), bg, null));
            btn.setPadding(24, 24, 24, 24);
            btn.setImageResource(icons[i]);
            btn.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
            btn.setOnClickListener(listeners[i]);

            buttonsContainer.addView(btn);
        }


        header.addView(title);
        header.addView(buttonsContainer);

        root.addView(header);

        // RecyclerView برمجيًا
        RecyclerView recyclerView = new RecyclerView(getContext());
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setLayoutParams(new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
        root.addView(recyclerView);

        List<String> titles = Arrays.asList(
                NLang.t("account.title"),
                NLang.t("privacy.title"),
                NLang.t("preferences.title"),
                NLang.t("map.title"),
                NLang.t("notifications.title"),
                NLang.t("language.title"),
                NLang.t("history.title"),
                NLang.t("help.title"),
                NLang.t("about.title")
        );

        List<String> subtitles = Arrays.asList(
                NLang.t("account.subtitle"),
                NLang.t("privacy.subtitle"),
                NLang.t("preferences.subtitle"),
                NLang.t("map.subtitle"),
                NLang.t("notifications.subtitle"),
                NLang.t("language.subtitle"),
                NLang.t("history.subtitle"),
                NLang.t("help.subtitle"),
                NLang.t("about.subtitle")
        );

        AccountAdapter adapter = new AccountAdapter(getContext(), titles, subtitles, new AccountAdapter.OnSettingClickListener() {
            @Override
            public void onSettingClick(int index) {
                switch (index) {
                    case 0:
                        openSlide(requireActivity(),"account");
                        break;
                    case 1:
                        openSlide(requireActivity(),"privacy");
                        break;
                    case 2:
                        openSlide(requireActivity(),"preferences");
                        break;
                    case 3:
                        openSlide(requireActivity(),"map");
                        break;
                    case 4:
                        openSlide(requireActivity(),"notifications");
                        break;
                    case 5:
                        openSlide(requireActivity(),"language");
                        break;
                    case 6:
                        openSlide(requireActivity(),"logs");
                        break;
                    case 7:
                        openSlide(requireActivity(),"help");
                        break;
                    case 8:
                        openSlide(requireActivity(),"about");
                        break;
                    default:
                        Toast.makeText(getContext(), "Clicked: " + index, Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onHeaderClick() {
                Toast.makeText(getContext(), "Header clicked!", Toast.LENGTH_SHORT).show();
                // افتح صفحة البروفايل مثلاً
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





        recyclerView.setAdapter(adapter);

        return root;
    }
}
