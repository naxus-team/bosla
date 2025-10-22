package com.naxus.bosla.ui;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;
import androidx.dynamicanimation.animation.DynamicAnimation;
import androidx.dynamicanimation.animation.SpringAnimation;
import androidx.dynamicanimation.animation.SpringForce;
import androidx.fragment.app.FragmentActivity;
import androidx.recyclerview.widget.LinearSmoothScroller;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import com.naxus.bosla.R;
import com.naxus.bosla.fragments.Account;
import com.naxus.bosla.fragments.Contacts;
import com.naxus.bosla.fragments.Hubs;
import com.naxus.bosla.ui.adapters.BottomNavPagerAdapter;
import com.naxus.bosla.utils.helpers.EdgeSwipeHelper;
import com.naxus.bosla.utils.helpers.ScreenUtils;
import com.naxus.core.utils.Display;
import com.naxus.core.utils.NColor;

public class BottomNavigation {

    private final Activity activity;
    private LinearLayout root;
    private LinearLayout bottomNav;
    private int selectedIndex = 0;
    private ViewPager2 viewPager;

    String[] tabs = {"المركز", "جهات الإتصال", "الحساب"};
    int[] icons = {R.drawable.grid_dashboard, R.drawable.user, R.drawable.settings};
    int[] icons_active = {R.drawable.grid_dashboard_solid, R.drawable.user_solid, R.drawable.settings_solid};

    public BottomNavigation(Activity activity) {
        this.activity = activity;
    }

    public View getRoot() {
        if (root == null) {
            int statusBar = ScreenUtils.getStatusBarHeight(activity);
            root = new LinearLayout(activity);
            root.setOrientation(LinearLayout.VERTICAL);
            root.setBackgroundColor(Color.WHITE);

            // إنشاء ViewPager2
            viewPager = new ViewPager2(activity);
            viewPager.setLayoutParams(new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT, 0, 1
            ));
            viewPager.setPadding(0, Display.getStatusBarHeight(getRoot().getContext()), 0, 0);
            viewPager.setId(View.generateViewId());
            EdgeSwipeHelper.attach(viewPager, 32);
            root.addView(viewPager);

            // Top border
            View topBorder = new View(activity);
            topBorder.setLayoutParams(new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT, 2));
            topBorder.setBackgroundColor(NColor.forceground.get(10));
            root.addView(topBorder);

            createBottomBar(activity, root);

            // إعداد Adapter
            BottomNavPagerAdapter adapter = new BottomNavPagerAdapter((FragmentActivity) activity);
            viewPager.setAdapter(adapter);

            // تحديث BottomNavigation عند السحب
            viewPager.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
                @Override
                public void onPageSelected(int position) {
                    updateNavIcons(position);
                    selectedIndex = position;
                }
            });

        }
        return root;
    }

    private void createBottomBar(Context context, LinearLayout root) {
        int bottomHeight = (int) TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP, 64, context.getResources().getDisplayMetrics());

        bottomNav = new LinearLayout(context);
        bottomNav.setOrientation(LinearLayout.HORIZONTAL);
        bottomNav.setGravity(Gravity.CENTER);
        bottomNav.setBackgroundColor(Color.WHITE);
        bottomNav.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, bottomHeight));

        for (int i = 0; i < tabs.length; i++) {
            LinearLayout item = createNavItem(context, i);
            bottomNav.addView(item);
        }

        root.addView(bottomNav);
        updateNavIcons(selectedIndex);
    }

    private LinearLayout createNavItem(Context context, int i) {
        LinearLayout.LayoutParams itemParams = new LinearLayout.LayoutParams(0,
                LinearLayout.LayoutParams.WRAP_CONTENT, 1);

        LinearLayout item = new LinearLayout(context);
        item.setOrientation(LinearLayout.VERTICAL);
        item.setGravity(Gravity.CENTER);
        item.setLayoutParams(itemParams);
        item.setPadding(0, 12, 0, 8);

        FrameLayout iconContainer = new FrameLayout(context);
        int width = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 68, context.getResources().getDisplayMetrics());
        int height = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 34, context.getResources().getDisplayMetrics());
        FrameLayout.LayoutParams iconLayoutParams = new FrameLayout.LayoutParams(width, height, Gravity.CENTER);
        iconContainer.setLayoutParams(iconLayoutParams);

        GradientDrawable bg = new GradientDrawable();
        bg.setShape(GradientDrawable.RECTANGLE);
        bg.setCornerRadius(64f);
        bg.setColor(Color.TRANSPARENT);
        iconContainer.setClipToOutline(true);
        iconContainer.setBackground(bg);

        ImageView icon = new ImageView(context);
        icon.setImageResource(icons[i]);
        icon.setColorFilter(NColor.black.get(5));

        FrameLayout.LayoutParams iconParams = new FrameLayout.LayoutParams(64, 64, Gravity.CENTER);
        icon.setLayoutParams(iconParams);
        iconContainer.addView(icon);

        item.addView(iconContainer);

        int index = i;
        item.setOnClickListener(v -> {
            viewPager.setCurrentItem(index, true);
            viewPager.post(() -> {
                RecyclerView recyclerView = (RecyclerView) viewPager.getChildAt(0);
                LinearSmoothScroller smoothScroller = new LinearSmoothScroller(activity) {
                    @Override
                    protected int calculateTimeForScrolling(int dx) {
                        return 50; // الوقت بالمللي ثانية، أقل = أسرع، أكبر = أبطأ
                    }
                };
                smoothScroller.setTargetPosition(index);
                recyclerView.getLayoutManager().startSmoothScroll(smoothScroller);
            });

            // اهتزاز بسيط
            Vibrator vibrator = (Vibrator) activity.getSystemService(Context.VIBRATOR_SERVICE);
            if (vibrator != null) {
                vibrator.vibrate(VibrationEffect.createOneShot(40, VibrationEffect.DEFAULT_AMPLITUDE));
            }
        });
        return item;
    }

    private void updateNavIcons(int index) {
        for (int i = 0; i < bottomNav.getChildCount(); i++) {
            LinearLayout item = (LinearLayout) bottomNav.getChildAt(i);
            FrameLayout container = (FrameLayout) item.getChildAt(0);
            ImageView icon = (ImageView) container.getChildAt(0);

            GradientDrawable bgDrawable = (GradientDrawable) container.getBackground();
            if (i == index) {
                icon.setImageResource(icons_active[i]);
                icon.setColorFilter(NColor.primary_dark.get(8));
                bgDrawable.setColor(NColor.primary.get(1));

                // animation
                SpringAnimation scaleX = new SpringAnimation(icon, DynamicAnimation.SCALE_X, 1.1f);
                SpringAnimation scaleY = new SpringAnimation(icon, DynamicAnimation.SCALE_Y, 1.1f);
                SpringForce spring = new SpringForce(1f);
                spring.setDampingRatio(SpringForce.DAMPING_RATIO_MEDIUM_BOUNCY);
                spring.setStiffness(SpringForce.STIFFNESS_LOW);
                scaleX.setSpring(spring);
                scaleY.setSpring(spring);
                scaleX.start();
                scaleY.start();

            } else {
                icon.setImageResource(icons[i]);
                icon.setColorFilter(NColor.black.get(10));
                bgDrawable.setColor(Color.TRANSPARENT);
                icon.setScaleX(1f);
                icon.setScaleY(1f);
            }
        }
        selectedIndex = index;
    }
}
