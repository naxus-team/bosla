package com.naxus.bosla.utils.helpers;

import android.util.TypedValue;
import android.view.MotionEvent;
import android.view.View;
import androidx.viewpager2.widget.ViewPager2;

/**
 * EdgeSwipeHelper
 * Utility to restrict ViewPager2 swipe gestures to screen edges only.
 * Example usage:
 *     EdgeSwipeHelper.attach(viewPager2, 32); // 32dp edge area
 */
public class EdgeSwipeHelper {

    /**
     * Attach edge-swipe detection to a ViewPager2.
     *
     * @param viewPager  the ViewPager2 instance
     * @param edgeDp     edge area in dp where swipe is allowed
     */
    public static void attach(ViewPager2 viewPager, float edgeDp) {
        if (viewPager == null) return;

        // Convert dp to pixels
        final int edgePx = (int) TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP,
                edgeDp,
                viewPager.getResources().getDisplayMetrics()
        );

        View child = viewPager.getChildAt(0);
        if (child == null) return;

        child.setOnTouchListener((v, event) -> {
            if (event.getAction() == MotionEvent.ACTION_DOWN) {
                float x = event.getX();
                int width = v.getWidth();

                boolean fromEdge = (x <= edgePx) || (x >= width - edgePx);
                viewPager.setUserInputEnabled(fromEdge);
            }
            return false;
        });
    }
}
