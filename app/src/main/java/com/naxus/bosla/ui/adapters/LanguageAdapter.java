package com.naxus.bosla.ui.adapters;

import android.content.Context;
import android.graphics.Color;
import android.util.TypedValue;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.naxus.core.utils.NColor;

public class LanguageAdapter extends RecyclerView.Adapter<LanguageAdapter.LanguageViewHolder> {

    private final recycleItem[] items;
    private final Context context;

    public LanguageAdapter(recycleItem[] items, Context context) {
        this.items = items;
        this.context = context;
    }

    @Override
    public LanguageViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LinearLayout layout = new LinearLayout(context);
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setPadding(48, 48, 48, 48);

        layout.setLayoutParams(new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        ));

        TextView title = new TextView(context);
        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 16);
        title.setTextColor(Color.BLACK);

        TextView subtitle = new TextView(context);
        subtitle.setPadding(0, 14, 0, 0);
        subtitle.setTextSize(14f);
        subtitle.setTextColor(NColor.black.get(5));
        subtitle.setTextAlignment(View.TEXT_ALIGNMENT_VIEW_START);

        layout.setClickable(true);
        layout.setBackgroundResource(selectableItemBackground(context));

        layout.addView(title);
        layout.addView(subtitle);

        return new LanguageViewHolder(layout, title, subtitle);
    }

    private int selectableItemBackground(Context context) {
        TypedValue outValue = new TypedValue();
        context.getTheme().resolveAttribute(android.R.attr.selectableItemBackground, outValue, true);
        return outValue.resourceId;
    }

    @Override
    public void onBindViewHolder(LanguageViewHolder holder, int position) {
        recycleItem item = items[position];
        holder.title.setText(item.getTitle());
        holder.subtitle.setText(item.getSubtitle());
        holder.itemView.setOnClickListener(item.getListener());
    }

    @Override
    public int getItemCount() {
        return items.length;
    }

    static class LanguageViewHolder extends RecyclerView.ViewHolder {
        TextView title, subtitle;

        public LanguageViewHolder(LinearLayout itemView, TextView title, TextView subtitle) {
            super(itemView);
            this.title = title;
            this.subtitle = subtitle;
        }
    }
}
