package com.naxus.bosla.ui.adapters;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.naxus.bosla.fragments.Account;
import com.naxus.bosla.fragments.Contacts;
import com.naxus.bosla.fragments.Hubs;

public class BottomNavPagerAdapter extends FragmentStateAdapter {

    public BottomNavPagerAdapter(@NonNull FragmentActivity fa) {
        super(fa);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
        switch (position) {
            case 0: return new Hubs();
            case 1: return new Contacts();
            case 2: return new Account();
            default: return new Hubs();
        }
    }

    @Override
    public int getItemCount() {
        return 3; // عدد الـ tabs
    }
}
