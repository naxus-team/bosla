package com.naxus.bosla;

import android.content.Context;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Outline;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.DisplayCutout;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewOutlineProvider;
import android.view.animation.DecelerateInterpolator;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomsheet.BottomSheetBehavior;
import com.naxus.bosla.layouts.LanguageLayout;
import com.naxus.bosla.ui.BottomNavigation;
import com.naxus.bosla.utils.helpers.LayoutDirectionHelper;
import com.naxus.bosla.utils.helpers.ScreenUtils;
import com.naxus.bosla.utils.helpers.StatusBarHelper;
import com.naxus.core.ui.NSheet;
import com.naxus.core.utils.NColor;
import com.naxus.core.utils.NLang;

public class MainActivity extends AppCompatActivity {
    private View mainContent;
    private View overlay;
    private NSheet sheet;
    private FrameLayout slideLayout;

    private BottomNavigation bottomNavigation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        NLang.init(this);
        StatusBarHelper.setStatusBar(getWindow(), true, Color.TRANSPARENT);
        StatusBarHelper.setLightNavigationBar(this, Color.TRANSPARENT);
        setLayoutDirection();


        sheet = new NSheet(this);
        setContentView(sheet.getRoot());
        bottomNavigation = new BottomNavigation(this);
        sheet.getMainContent().addView(bottomNavigation.getRoot());
        sheet.bringToFront();

        mainContent = bottomNavigation.getRoot();
        slideLayout = new FrameLayout(this);
        slideLayout.setId(View.generateViewId());
        slideLayout.setTranslationX(getResources().getDisplayMetrics().widthPixels);
        slideLayout.setBackgroundColor(Color.WHITE);
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
        );
        slideLayout.setLayoutParams(params);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            mainContent.setOnApplyWindowInsetsListener((v, insets) -> {
                DisplayCutout cutout = insets.getDisplayCutout();
                if (cutout != null) {
                    // المسافة من كل طرف
                    int left = cutout.getSafeInsetLeft();
                    int top = cutout.getSafeInsetTop();
                    int right = cutout.getSafeInsetRight();
                    int bottom = cutout.getSafeInsetBottom();

                    // تعيين padding أو margin للـ SlideLayout حسب الزوايا
                    slideLayout.setPadding(left, top, right, bottom);
                }
                return insets.consumeSystemWindowInsets();
            });
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            slideLayout.setClipToOutline(true);
            slideLayout.setOutlineProvider(new ViewOutlineProvider() {
                @Override
                public void getOutline(View view, Outline outline) {
                    int radius = 48; // أو احسبه من cutout لو عايز مطابق
                    outline.setRoundRect(0, 0, view.getWidth(), view.getHeight(), radius);
                }
            });
        }

        overlay = new View(this);
        overlay.setLayoutParams(new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
        ));
        overlay.setBackgroundColor(Color.BLACK);
        overlay.setAlpha(0f); // البداية شفاف
        overlay.setClickable(false); // يمنع تفاعل المستخدم مع الـ overlay نفسه
        overlay.setFocusable(false);

        addContentView(slideLayout, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
        ));
    }

    private void setLayoutDirection() {
        getWindow().getDecorView().setLayoutDirection(isRTL()
                ? View.LAYOUT_DIRECTION_RTL
                : View.LAYOUT_DIRECTION_LTR);
    }

    public boolean isRTL() {
        String lang = NLang.getCurrentLanguage(this);
        return lang != null && (lang.startsWith("ar") || lang.startsWith("fa") || lang.startsWith("ur"));
    }

    public void showSettingsSheet() {
        LinearLayout sheetContent = sheet.getBottomSheet();
        sheetContent.removeAllViews();
        View handle = new View(this);
        int handleWidth = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 48, this.getResources().getDisplayMetrics());
        int handleHeight = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 4, this.getResources().getDisplayMetrics());
        LinearLayout.LayoutParams handleParams = new LinearLayout.LayoutParams(handleWidth, handleHeight);
        handleParams.setMargins(0, 8, 0, 16);
        handleParams.gravity = Gravity.CENTER_HORIZONTAL;
        handle.setLayoutParams(handleParams);
        handle.setBackgroundColor(NColor.forceground.get(10));
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            handle.setClipToOutline(true);
            handle.setOutlineProvider(new ViewOutlineProvider() {
                @Override
                public void getOutline(View view, Outline outline) {
                    outline.setRoundRect(0, 0, view.getWidth(), view.getHeight(), 16f);
                }
            });
        }
        sheetContent.addView(handle, 0);

        LinearLayout container = new LinearLayout(this);
        container.setOrientation(LinearLayout.HORIZONTAL);
        container.setGravity(Gravity.CENTER_VERTICAL);
        container.setLayoutParams(new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        ));

        GradientDrawable bg = new GradientDrawable();
        bg.setColor(NColor.forceground.get(10)); // نفس لون الخلفية
        float radius = TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP, 16, getResources().getDisplayMetrics());
        bg.setCornerRadius(radius);

        container.setClipToOutline(true); // يمنع العناصر من الخروج عن الخلفية
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            container.setOutlineProvider(new ViewOutlineProvider() {
                @Override
                public void getOutline(View view, Outline outline) {
                    outline.setRoundRect(0, 0, view.getWidth(), view.getHeight(), radius);
                }
            });
        }
        container.setBackground(bg);

        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.HORIZONTAL);
        layout.setGravity(Gravity.CENTER_VERTICAL);
        layout.setPadding(0, 48, 0, 48);
        layout.setLayoutParams(new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        ));

        ImageView icon = new ImageView(this);
        LinearLayout.LayoutParams iconParams = new LinearLayout.LayoutParams(64, 64);
        iconParams.setMargins(88, 0, 88, 0);
        icon.setLayoutParams(iconParams);
        icon.setImageTintList(ColorStateList.valueOf(NColor.black.get(5)));
        icon.setImageResource(R.drawable.arrow_start_on_rectangle);
        layout.addView(icon);

        LinearLayout textsLayout = new LinearLayout(this);
        textsLayout.setOrientation(LinearLayout.VERTICAL);
        textsLayout.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));

        TextView title = new TextView(this);
        title.setTextSize(16f);
        title.setTextColor(Color.BLACK);
        title.setText(NLang.t("account.logout"));
        textsLayout.addView(title);
        layout.addView(textsLayout);

        container.addView(layout);

        layout.setOnClickListener(v -> {
            Toast.makeText(this, "Header clicked!", Toast.LENGTH_SHORT).show();
        });

        sheetContent.addView(container);
        layout.setBackgroundResource(selectableItemBackground(this));

        sheet.getBehavior().setState(BottomSheetBehavior.STATE_EXPANDED);
    }

    private int selectableItemBackground(Context context) {
        TypedValue outValue = new TypedValue();
        context.getTheme().resolveAttribute(android.R.attr.selectableItemBackground, outValue, true);
        return outValue.resourceId;
    }


    @Override
    public void setContentView(int layoutResID) {
        super.setContentView(layoutResID);
        LayoutDirectionHelper.forceLayoutDirection(getWindow().getDecorView(), isRTL());
    }

    @Override
    public void setContentView(View view) {
        super.setContentView(view);
        LayoutDirectionHelper.forceLayoutDirection(getWindow().getDecorView(), isRTL());
    }

    public BottomSheetBehavior<?> getSheetBehavior() {
        return sheet != null ? sheet.getBehavior() : null;
    }
}
