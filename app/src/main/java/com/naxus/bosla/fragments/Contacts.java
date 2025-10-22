package com.naxus.bosla.fragments;

import android.Manifest;
import android.content.ContentResolver;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Color;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.naxus.bosla.R;
import com.naxus.bosla.utils.Adapter;

import java.util.ArrayList;
import java.util.List;

public class Contacts extends Fragment {

    private static final int REQUEST_CONTACTS = 100;
    private List<String> contacts = new ArrayList<>();
    private Adapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {

        LinearLayout root = new LinearLayout(requireContext());
        root.setOrientation(LinearLayout.VERTICAL);
        root.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT
        ));
        root.setBackgroundColor(Color.WHITE);

        // Header كما هو موجود عندك
        int headerHeight = (int) TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP, 60, getResources().getDisplayMetrics());

        LinearLayout header = new LinearLayout(requireContext());
        header.setOrientation(LinearLayout.HORIZONTAL);
        header.setGravity(Gravity.CENTER_VERTICAL);
        header.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                headerHeight
        ));

        // Title على الشمال
        TextView title = new TextView(requireContext());
        title.setText("جهات الإتصال");
        title.setPadding(38,0,38,0);

        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20);
        title.setTextColor(Color.BLACK);
        title.setLayoutParams(new LinearLayout.LayoutParams(
                0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f // weight 1 للـ title
        ));

        // زرارين مدورين على اليمين
        LinearLayout buttonsContainer = new LinearLayout(requireContext());
        buttonsContainer.setOrientation(LinearLayout.HORIZONTAL);
        buttonsContainer.setGravity(Gravity.END | Gravity.CENTER_VERTICAL);
        buttonsContainer.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        ));

        ImageButton btn1 = new ImageButton(requireContext());
        btn1.setImageResource(android.R.drawable.ic_input_add);
        btn1.setBackgroundColor(Color.LTGRAY);
        btn1.setPadding(16,16,16,16);
        btn1.setScaleType(ImageButton.ScaleType.CENTER_INSIDE);
        btn1.setClipToOutline(true);

        ImageButton btn2 = new ImageButton(requireContext());
        btn2.setImageResource(android.R.drawable.ic_menu_info_details);
        btn2.setBackgroundColor(Color.LTGRAY);
        btn2.setPadding(16,16,16,16);
        btn2.setScaleType(ImageButton.ScaleType.CENTER_INSIDE);
        btn2.setClipToOutline(true);

        buttonsContainer.addView(btn1);
        buttonsContainer.addView(btn2);

        header.addView(title);
        header.addView(buttonsContainer);

        root.addView(header);

        // RecyclerView
        RecyclerView recyclerView = new RecyclerView(requireContext());
        recyclerView.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                0,
                1f
        ));
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        // Adapter على قائمة فارغة
        adapter = new Adapter(contacts);
        recyclerView.setAdapter(adapter);

        root.addView(recyclerView);

        // تحقق من الإذن
        if (ActivityCompat.checkSelfPermission(requireContext(), Manifest.permission.READ_CONTACTS) == PackageManager.PERMISSION_GRANTED) {
            loadContacts();
        } else {
            ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.READ_CONTACTS}, REQUEST_CONTACTS);
        }

        return root;
    }

    private void loadContacts() {
        contacts.clear();
        ContentResolver cr = requireContext().getContentResolver();
        Cursor cursor = cr.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                null, null, null, ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME + " ASC");

        if (cursor != null) {
            while (cursor.moveToNext()) {
                String name = cursor.getString(cursor.getColumnIndexOrThrow(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
                String phone = cursor.getString(cursor.getColumnIndexOrThrow(ContactsContract.CommonDataKinds.Phone.NUMBER));
                contacts.add(name + " - " + phone);
            }
            cursor.close();
        }

        adapter.notifyDataSetChanged(); // تحديث الـ RecyclerView بعد تحميل البيانات
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_CONTACTS) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                loadContacts();
            }
        }
    }
}
