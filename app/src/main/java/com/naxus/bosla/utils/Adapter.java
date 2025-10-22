package com.naxus.bosla.utils;

import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class Adapter extends RecyclerView.Adapter<Adapter.ViewHolder> {

    private final List<String> data;

    public Adapter(List<String> data) {
        this.data = data;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView textView;

        public ViewHolder(@NonNull TextView itemView) {
            super(itemView);
            textView = itemView;
        }
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        TextView text = new TextView(parent.getContext());
        text.setLayoutParams(new RecyclerView.LayoutParams(
                RecyclerView.LayoutParams.MATCH_PARENT,
                RecyclerView.LayoutParams.WRAP_CONTENT
        ));
        text.setPadding(30, 30, 30, 30);
        text.setTextSize(18);
        text.setGravity(Gravity.START | Gravity.CENTER_VERTICAL);
        return new ViewHolder(text);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.textView.setText(data.get(position));
    }

    @Override
    public int getItemCount() {
        return data.size();
    }
}
