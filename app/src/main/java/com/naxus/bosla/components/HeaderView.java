package com.naxus.bosla.components;

import android.app.Activity;
import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.RippleDrawable;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.naxus.bosla.R;

public class HeaderView extends LinearLayout {

    public HeaderView(Context context, String titleText) {
        this(context, titleText, v -> {
            if (context instanceof AppCompatActivity) {
                ((AppCompatActivity) context).finish();
            }
        });
    }

    public HeaderView(Context context, String titleText, OnClickListener backListener) {
        super(context);
        setOrientation(HORIZONTAL);
        setBackgroundColor(Color.WHITE);
        setGravity(Gravity.CENTER_VERTICAL);
        setPadding(dp(8), 0, dp(8), 0);
        setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, dp(60)));

        // زر الرجوع
        ImageView backBtn = new ImageView(context);
        LayoutParams p = new LayoutParams(dp(48), dp(48));
        backBtn.setLayoutParams(p);
        backBtn.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
        backBtn.setImageResource(R.drawable.arrow_left);

        // تأثير Ripple
        TypedValue outValue = new TypedValue();
        context.getTheme().resolveAttribute(android.R.attr.colorControlHighlight, outValue, true);
        int rippleColor = outValue.data;

        GradientDrawable bg = new GradientDrawable();
        bg.setCornerRadius(dp(48));
        bg.setColor(Color.parseColor("#01FFFFFF"));
        backBtn.setBackground(new RippleDrawable(ColorStateList.valueOf(rippleColor), bg, null));
        backBtn.setPadding(dp(12), dp(12), dp(12), dp(12));
        backBtn.setOnClickListener(backListener);

        // العنوان
        TextView title = new TextView(context);
        title.setText(titleText);
        title.setTextColor(Color.BLACK);
        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 18);
        title.setTypeface(null, android.graphics.Typeface.BOLD);
        title.setLayoutParams(new LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f));
        addView(backBtn);
        addView(title);
    }

    private int dp(int value) {
        return (int) TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP, value, getResources().getDisplayMetrics());
    }
}
