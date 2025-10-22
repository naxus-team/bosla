package com.naxus.bosla.utils.helpers;

import android.view.View;
import android.view.ViewGroup;

public class LayoutDirectionHelper {

    public static void forceLayoutDirection(View root, boolean isRTL) {
        root.setLayoutDirection(isRTL ? View.LAYOUT_DIRECTION_RTL : View.LAYOUT_DIRECTION_LTR);

        if (root instanceof ViewGroup) {
            ViewGroup group = (ViewGroup) root;
            for (int i = 0; i < group.getChildCount(); i++) {
                forceLayoutDirection(group.getChildAt(i), isRTL);
            }
        }
    }
}
