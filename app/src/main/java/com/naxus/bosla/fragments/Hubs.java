package com.naxus.bosla.fragments;

import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class Hubs extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        TextView text = new TextView(getContext());
        text.setText("🏠 Home Page");
        text.setGravity(Gravity.CENTER);
        text.setTextSize(20);
        return text;
    }
}