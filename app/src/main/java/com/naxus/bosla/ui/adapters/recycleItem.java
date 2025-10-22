package com.naxus.bosla.ui.adapters;

import android.view.View;

public class recycleItem {
    private final String title;
    private final String subtitle;
    private final View.OnClickListener listener;

    public recycleItem(String title, String subtitle, View.OnClickListener listener) {
        this.title = title;
        this.subtitle = subtitle;
        this.listener = listener;
    }

    // getters
    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public View.OnClickListener getListener() {
        return listener;
    }
}
