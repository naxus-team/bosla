package com.naxus.bosla.ui.adapters;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.content.res.AppCompatResources;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.bottomsheet.BottomSheetBehavior;
import com.naxus.bosla.MainActivity;
import com.naxus.bosla.R;
import com.naxus.bosla.SlideActivity;
import com.naxus.bosla.fragments.Account;
import com.naxus.bosla.ui.BottomNavigation;
import com.naxus.core.utils.NAssets;
import com.naxus.core.utils.NColor;
import com.naxus.core.utils.NMusk;

import java.io.IOException;
import java.util.List;

public class AccountAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private static final int TYPE_HEADER = 0;
    private static final int TYPE_ITEM = 1;

    private final List<String> titlesList;
    private final List<String> subtitlesList;
    private final Context context;
    private final OnSettingClickListener listener;

    public interface OnSettingClickListener {
        void onSettingClick(int position);
        void onHeaderClick(); // الزر المخصص في الأول
    }

    public AccountAdapter(Context context, List<String> titlesList, List<String> subtitlesList, OnSettingClickListener listener) {
        this.context = context;
        this.titlesList = titlesList;
        this.subtitlesList = subtitlesList;
        this.listener = listener;
    }

    @Override
    public int getItemViewType(int position) {
        return (position == 0) ? TYPE_HEADER : TYPE_ITEM;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (viewType == TYPE_HEADER) {
            LinearLayout container = new LinearLayout(context);
            container.setBackgroundColor(Color.parseColor("#F6F6F6"));
            container.setOrientation(LinearLayout.HORIZONTAL);
            container.setGravity(Gravity.CENTER_VERTICAL);
            container.setLayoutParams(new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
            ));

            LinearLayout layout = new LinearLayout(context);
            layout.setOrientation(LinearLayout.HORIZONTAL);
            layout.setGravity(Gravity.CENTER_VERTICAL);
            layout.setPadding(38, 38, 38, 38);
            layout.setLayoutParams(new LinearLayout.LayoutParams(
                    0,
                    ViewGroup.LayoutParams.WRAP_CONTENT,
                    1f // weight لاحتلال المساحة المتاحة
            ));

            ImageView avatar = new ImageView(context);
            avatar.setScaleType(ImageView.ScaleType.CENTER_CROP);
            avatar.setBackgroundResource(R.drawable.circle_musk);
            Drawable vectorDrawable = AppCompatResources.getDrawable(context, R.drawable. circle_musk);


            try {
                NMusk.applyMask(
                        context,
                        avatar,                // ImageView
                        context.getAssets().open("images/avatar.jpeg"),
                        R.drawable.squircle_musk
                );
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            avatar.setClipToOutline(true);
            LinearLayout.LayoutParams avatarParams = new LinearLayout.LayoutParams(162, 162);
            avatar.setLayoutParams(avatarParams);
            layout.addView(avatar);

            LinearLayout textsLayout = new LinearLayout(context);
            textsLayout.setOrientation(LinearLayout.VERTICAL);
            textsLayout.setPadding(38, 0, 38, 0);
            textsLayout.setLayoutParams(new LinearLayout.LayoutParams(
                    0,
                    ViewGroup.LayoutParams.WRAP_CONTENT,
                    1f
            ));

            TextView title = new TextView(context);
            title.setTextSize(16);
            title.setTextColor(Color.BLACK);
            title.setTextAlignment(View.TEXT_ALIGNMENT_VIEW_START);
            textsLayout.addView(title);

            TextView middletitle = new TextView(context);
            middletitle.setPadding(0, 14, 0, 0);
            middletitle.setTextSize(14f);
            middletitle.setTextColor(NColor.black.get(5));
            // ضبط الاتجاه تلقائياً حسب اللغة
            middletitle.setTextDirection(View.TEXT_DIRECTION_ANY_RTL);
            middletitle.setTextAlignment(View.TEXT_ALIGNMENT_VIEW_START);
            textsLayout.addView(middletitle);

            TextView subtitle = new TextView(context);
            subtitle.setPadding(0, 14, 0, 0);
            subtitle.setTextSize(14f);
            subtitle.setTextColor(NColor.black.get(5));
            // ضبط الاتجاه تلقائياً حسب اللغة
            subtitle.setTextDirection(View.TEXT_DIRECTION_ANY_RTL);
            subtitle.setTextAlignment(View.TEXT_ALIGNMENT_VIEW_START);
            textsLayout.addView(subtitle);

            layout.addView(textsLayout);
            layout.setClickable(true);
            layout.setBackgroundResource(selectableItemBackground(context));
            Account account = new Account();

            layout.setOnClickListener(v -> account.openSlide((Activity) context,"profile"));
            container.addView(layout);

            LinearLayout layoutElipsis = new LinearLayout(context);
            layoutElipsis.setOrientation(LinearLayout.HORIZONTAL);
            layoutElipsis.setGravity(Gravity.CENTER);
            layoutElipsis.setPadding(58, 0, 58, 0);
            layoutElipsis.setLayoutParams(new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.WRAP_CONTENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
            ));

            layoutElipsis.setClickable(true);
            layoutElipsis.setBackgroundResource(selectableItemBackground(context));

            layoutElipsis.setOnClickListener(v -> {
                if (context instanceof MainActivity) {
                    MainActivity main = (MainActivity) context;
                    ((MainActivity) context).showSettingsSheet();
                    BottomSheetBehavior<?> behavior = main.getSheetBehavior();

                    if (behavior != null) {
                        if (behavior.getState() == BottomSheetBehavior.STATE_HIDDEN) {
                            behavior.setState(BottomSheetBehavior.STATE_EXPANDED);
                        } else {
                            behavior.setState(BottomSheetBehavior.STATE_HIDDEN);
                        }
                    }
                }
            });



            ImageView icon = new ImageView(context);
            LinearLayout.LayoutParams iconParams = new LinearLayout.LayoutParams(64, 64);
            icon.setLayoutParams(iconParams);
            icon.setImageTintList(ColorStateList.valueOf(NColor.black.get(10)));
            icon.setImageResource(R.drawable.chevron_down);
            layoutElipsis.addView(icon);

            container.addView(layoutElipsis);

            return new HeaderViewHolder(container, avatar, title, middletitle, subtitle);
        }
        else {
            // 🔹 باقي العناصر
            LinearLayout layout = new LinearLayout(context);
            layout.setOrientation(LinearLayout.HORIZONTAL);
            layout.setGravity(Gravity.CENTER_VERTICAL);
            layout.setPadding(0, 48, 0, 48);
            layout.setLayoutParams(new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
            ));

            ImageView icon = new ImageView(context);
            LinearLayout.LayoutParams iconParams = new LinearLayout.LayoutParams(64, 64);
            iconParams.setMargins(88, 0, 88, 0);
            icon.setLayoutParams(iconParams);
            icon.setImageTintList(ColorStateList.valueOf(NColor.black.get(5)));
            layout.addView(icon);

            LinearLayout textsLayout = new LinearLayout(context);
            textsLayout.setOrientation(LinearLayout.VERTICAL);
            textsLayout.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));

            TextView title = new TextView(context);
            title.setTextSize(16f);
            title.setTextColor(Color.BLACK);
            textsLayout.addView(title);

            TextView subtitle = new TextView(context);
            subtitle.setTextSize(14f);
            subtitle.setTextColor(NColor.black.get(5));
            subtitle.setPadding(0,14,0,0);
            textsLayout.addView(subtitle);

            layout.addView(textsLayout);
            layout.setClickable(true);
            layout.setBackgroundResource(selectableItemBackground(context));


            return new ItemViewHolder(layout, icon, title, null ,subtitle);
        }
    }

    private int selectableItemBackground(Context context) {
        TypedValue outValue = new TypedValue();
        context.getTheme().resolveAttribute(android.R.attr.selectableItemBackground, outValue, true);
        return outValue.resourceId;
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if (getItemViewType(position) == TYPE_HEADER) {
            HeaderViewHolder header = (HeaderViewHolder) holder;
            header.title.setText("Abdelrahman Ahmed");
            header.middletitle.setText("@abkhadr");
            header.subtitle.setText("+20 10 01724808");
            header.itemView.setOnClickListener(v -> listener.onHeaderClick());
        } else {
            int realPosition = position - 1; // لأن أول عنصر هو الـ header
            String title = titlesList.get(realPosition);
            String subtitle = subtitlesList.get(realPosition);

            ItemViewHolder item = (ItemViewHolder) holder;
            item.title.setText(title);
            item.subtitle.setText(subtitle);

            switch (realPosition) {
                case 0:
                    item.icon.setImageResource(R.drawable.account_solid);
                    break;
                case 1:
                    item.icon.setImageResource(R.drawable.lock_closed);
                    break;
                case 2:
                    item.icon.setImageResource(R.drawable.adjustments_horizontal);
                    break;
                case 3:
                    item.icon.setImageResource(R.drawable.map
                    );
                    break;
                case 4:
                    item.icon.setImageResource(R.drawable.notifications);
                    break;
                case 5:
                    item.icon.setImageResource(R.drawable.translate_language);
                    break;
                case 6:
                    item.icon.setImageResource(R.drawable.document);
                    break;
                case 7:
                    item.icon.setImageResource(R.drawable.question_mark);
                    break;
                case 8:
                    item.icon.setImageResource(R.drawable.information_mark_solid);
                    break;
                default:
                    item.icon.setImageResource(R.drawable.double_cog);
                    break;
            }

            item.itemView.setOnClickListener(v -> listener.onSettingClick(realPosition));
        }
    }

    @Override
    public int getItemCount() {
        return titlesList.size() + 1; // +1 للـ header
    }

    // ✅ ViewHolders
    static class HeaderViewHolder extends RecyclerView.ViewHolder {
        ImageView avatar;

        TextView title;
        TextView middletitle;
        TextView subtitle;
        HeaderViewHolder(@NonNull View itemView, ImageView avatar, TextView title,  TextView middletitle, TextView subtitle) {
            super(itemView);
            this.avatar = avatar;
            this.title = title;
            this.middletitle = middletitle;
            this.subtitle = subtitle;

        }
    }

    static class ItemViewHolder extends RecyclerView.ViewHolder {
        ImageView icon;
        TextView title;
        TextView middletitle;
        TextView subtitle;

        ItemViewHolder(@NonNull View itemView, ImageView icon, TextView title,  TextView middletitle, TextView subtitle) {
            super(itemView);
            this.icon = icon;
            this.title = title;
            this.middletitle = middletitle;
            this.subtitle = subtitle;
        }
    }
}
