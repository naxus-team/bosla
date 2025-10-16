package com.naxus.bosla;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.animation.ValueAnimator;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.RippleDrawable;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.ScaleAnimation;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.content.Context;

import androidx.appcompat.app.AppCompatActivity;
import androidx.dynamicanimation.animation.DynamicAnimation;
import androidx.dynamicanimation.animation.SpringAnimation;
import androidx.dynamicanimation.animation.SpringForce;

import com.naxus.core.utils.NColor;

public class MainActivity extends AppCompatActivity {

    private int selectedIndex = 0;
    private LinearLayout bottomNav;

    String[] tabs = {"Home", "الإعدادات"};
    int[] icons = {R.drawable.layout_grid_stack_down_stroke, R.drawable.user_circle_stroke};
    int[] icons_active = {R.drawable.layout_grid_stack_down, R.drawable.user_circle};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // الجذر الرئيسي
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(Color.WHITE);
        root.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT));

        // محتوى الصفحة
        LinearLayout content = new LinearLayout(this);
        content.setOrientation(LinearLayout.VERTICAL);
        content.setGravity(Gravity.CENTER);
        content.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, 0, 1));

        TextView label = new TextView(this);
        label.setText("Home Page");
        label.setTextSize(24);
        label.setTextColor(Color.BLACK);
        content.addView(label);
        root.addView(content);

        // الـ Bottom Nav
        int bottomHeight = (int) TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP, 80,
                getResources().getDisplayMetrics());

        bottomNav = new LinearLayout(this);
        bottomNav.setOrientation(LinearLayout.HORIZONTAL);
        bottomNav.setGravity(Gravity.CENTER);
        bottomNav.setBackgroundColor(Color.parseColor("#FFFFFF"));
        bottomNav.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                bottomHeight));

        // خط علوي (Border)
        View topBorder = new View(this);
        topBorder.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, 2));
        topBorder.setBackgroundColor(NColor.black.get(1));
        root.addView(topBorder);

        createBottomNavItems(content, label);
        root.addView(bottomNav);

        setContentView(root);
    }

    private void createBottomNavItems(LinearLayout content, TextView label) {
        LinearLayout.LayoutParams itemParams = new LinearLayout.LayoutParams(0,
                LinearLayout.LayoutParams.WRAP_CONTENT, 1);

        for (int i = 0; i < tabs.length; i++) {
            LinearLayout item = new LinearLayout(this);
            item.setOrientation(LinearLayout.VERTICAL);
            item.setGravity(Gravity.CENTER_HORIZONTAL);
            item.setGravity(Gravity.CENTER);
            item.setLayoutParams(itemParams);
            item.setPadding(0, 12, 0, 0);
            int index = i;

            int width = (int) TypedValue.applyDimension(
                    TypedValue.COMPLEX_UNIT_DIP, 68, getResources().getDisplayMetrics());

            int height = (int) TypedValue.applyDimension(
                    TypedValue.COMPLEX_UNIT_DIP, 32, getResources().getDisplayMetrics());

            FrameLayout iconContainer = new FrameLayout(this);
            FrameLayout.LayoutParams iconLayoutParams = new FrameLayout.LayoutParams(
                    width, height, Gravity.CENTER);
            iconContainer.setLayoutParams(iconLayoutParams);


            GradientDrawable bg = new GradientDrawable();
            float radius = TypedValue.applyDimension(
                    TypedValue.COMPLEX_UNIT_DIP, 32, getResources().getDisplayMetrics());
            bg.setCornerRadius(radius);
            bg.setColor(i == selectedIndex ? NColor.forceground.get(10) : Color.TRANSPARENT);
            iconContainer.setBackground(bg);

            // الأيقونة
            ImageView icon = new ImageView(this);
            icon.setImageResource(i == selectedIndex ? icons_active[i] : icons[i]);
            icon.setColorFilter(i == selectedIndex ? NColor.black.get(10) : NColor.black.get(5));

            int size = (int) TypedValue.applyDimension(
                    TypedValue.COMPLEX_UNIT_DIP, 24, getResources().getDisplayMetrics());
            FrameLayout.LayoutParams iconParams = new FrameLayout.LayoutParams(size, size);
            iconParams.gravity = Gravity.CENTER;

            icon.setLayoutParams(iconParams);

            // النص
            TextView text = new TextView(this);
            text.setText(tabs[i]);
            text.setTextColor(Color.BLACK);
            text.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
            text.setGravity(Gravity.CENTER);

            LinearLayout.LayoutParams textParams = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT);
            textParams.topMargin = (int) TypedValue.applyDimension(
                    TypedValue.COMPLEX_UNIT_DIP, 4, getResources().getDisplayMetrics());
            text.setLayoutParams(textParams);

            iconContainer.addView(icon);
            item.addView(iconContainer);
            item.addView(text);

            // الضغط
            item.setOnClickListener(v -> {
                selectTab(index);
                label.setText(tabs[index] + " Page");
            });

            bottomNav.addView(item);
        }
    }

    private void animateFontWeight(TextView textView, boolean toBold) {
        ValueAnimator animator = ValueAnimator.ofFloat(toBold ? 0f : 1f, toBold ? 1f : 0f);
        animator.setDuration(150);
        animator.addUpdateListener(animation -> {
            float value = (float) animation.getAnimatedValue();
            textView.setTextScaleX(1f + (value * 0.02f)); // تمد بسيط جدًا أفقي يحاكي ثقل الخط
            textView.setAlpha(0.8f + (value * 0.2f)); // يحاكي وضوح الحروف في الوزن الأثقل
        });
        animator.addListener(new AnimatorListenerAdapter() {
            @Override
            public void onAnimationEnd(Animator animation) {
                textView.setTypeface(null, toBold ? Typeface.BOLD : Typeface.NORMAL);
                textView.setTextScaleX(1f);
                textView.setAlpha(1f);
            }
        });
        animator.start();
    }

    private void selectTab(int index) {
        if (index == selectedIndex) return;

        // ✅ اهتزاز بسيط
        Vibrator vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        if (vibrator != null && vibrator.hasVibrator()) {
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createOneShot(40, VibrationEffect.DEFAULT_AMPLITUDE));
            } else {
                vibrator.vibrate(40);
            }
        }

        // العناصر القديمة والجديدة
        LinearLayout oldItem = (LinearLayout) bottomNav.getChildAt(selectedIndex);
        LinearLayout newItem = (LinearLayout) bottomNav.getChildAt(index);

        ImageView oldIcon = (ImageView) oldItem.getChildAt(0);
        TextView oldText = (TextView) oldItem.getChildAt(1);
        ImageView newIcon = (ImageView) newItem.getChildAt(0);
        TextView newText = (TextView) newItem.getChildAt(1);

        // 🎨 تحديث الحالة
        oldIcon.setImageResource(icons[selectedIndex]);
        oldIcon.setColorFilter(NColor.black.get(10));
        oldText.setTextColor(NColor.black.get(10));
        oldText.setTypeface(null, Typeface.NORMAL);

        newIcon.setImageResource(icons_active[index]);
        newIcon.setColorFilter(NColor.primary.get(8));
        newText.setTypeface(null, Typeface.BOLD);

        // ✅ Spring Animation للأيقونة (Scale)
        SpringAnimation scaleX = new SpringAnimation(newIcon, DynamicAnimation.SCALE_X, 1f);
        SpringAnimation scaleY = new SpringAnimation(newIcon, DynamicAnimation.SCALE_Y, 1f);
        SpringForce spring = new SpringForce(1f);
        spring.setDampingRatio(SpringForce.DAMPING_RATIO_MEDIUM_BOUNCY); // ← مقدار الارتداد
        spring.setStiffness(SpringForce.STIFFNESS_LOW); // ← مرونة أقل = حركة أهدأ

        scaleX.setSpring(spring);
        scaleY.setSpring(spring);

        // نبدأ من تكبير بسيط
        newIcon.setScaleX(1.1f);
        newIcon.setScaleY(1.1f);
        scaleX.start();
        scaleY.start();

        animateFontWeight(newText, true);
        animateFontWeight(oldText, false);

        selectedIndex = index;
    }

}
