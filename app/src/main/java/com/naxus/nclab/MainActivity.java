package com.naxus.nclab;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.graphics.Color;
import android.util.Log;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.naxus.core.NCore;
import com.naxus.ui.NUIButton;
import com.naxus.ui.NUIRoot;
import com.naxus.ui.NUIPanel;
import com.naxus.utils.NColor;

public class MainActivity extends AppCompatActivity {
    private NCore core;
    private String currentLang = "en"; // اللغة الحالية
    private NUIRoot root;
    private NUIPanel panel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        core = new NCore();
        core.initAssetManager(getAssets());

        root = new NUIRoot(this);
        panel = new NUIPanel(this);

        FrameLayout container = new FrameLayout(this);
        container.addView(root);   // المحتوى الأساسي تحت
        container.addView(panel);  // اللوحة فوقه

        setContentView(container);
        renderUI(); // عرض الواجهة المبدئية
    }

    private void renderUI() {
        root.clear(); // إزالة أي عناصر قديمة
        panel.clear(); // مهم جدًا علشان ميتكررش المحتوى جوه اللوحة

        // 🏁 النص الأساسي
        root.addText(core.translate("welcome", currentLang), Color.BLACK, 22);

        // 🔘 زر فتح اللوحة
        root.addButton(core.translate("button.openPanel", currentLang), () -> panel.open());

        // 🌐 زر تبديل اللغة
        root.addButton(core.translate("button.continue", currentLang), () -> {
            currentLang = currentLang.equals("en") ? "ar" : "en";
            renderUI(); // إعادة بناء الواجهة بعد تغيير اللغة
        });

        // 🧩 محتوى اللوحة
        TextView insideText = new TextView(this);
        insideText.setText(core.translate("services.delivery", currentLang));
        insideText.setTextColor(Color.BLUE);
        insideText.setTextSize(20);

        Button closeBtn = new Button(this);
        closeBtn.setText(core.translate("button.closePanel", currentLang));
        closeBtn.setOnClickListener(v -> panel.close());
// 🌓 اختيار الثيم
        NColor.useDark(true); // أو false


// 💡 تفتيح أو تغميق لون معين
        int lightBlue = NColor.light(NColor.theme("primary"), 0.2f);
        int darkerRed = NColor.dark(NColor.DANGER, 0.3f);
        NUIButton btn = new NUIButton(this)
                .setText("Continue")
                .setFont("NotoSans-SemiBold.ttf")
                .setColor(NColor.alpha(NColor.DARK_BG, 1f))
                .setCornerRadius(16f)
                .setFontSize(16)
                .setLineHeightMultiplier(1.5f)
                .setShadow(false)
                .setWidth(ViewGroup.LayoutParams.MATCH_PARENT)
                .setHeight(160)
                .setMarginHorizontal(30)
                .setGravity(Gravity.CENTER)
                .setAnimationStyle("spring")
                .setJustify("center")     // center | start | end
                .setAlign("center")    // center | top | bottom
                .setPressInScale(0.94f)
                .setPressInDuration(80)
                .setPressOutDuration(120)
                .onPressIn(() -> Log.d("NUI", "PressIn"))
                .onPressOut(() -> Log.d("NUI", "PressOut"))
                .onPress(() -> Toast.makeText(this, "Clicked!", Toast.LENGTH_SHORT).show());
        root.addView(btn);

        panel.addItem(insideText);
        panel.addItem(closeBtn);

        // 🧱 أضف اللوحة نفسها إلى الجذر (لو مش موجودة)
        if (panel.getParent() == null) {
            root.addView(panel);
        }
    }

    private void toggleLanguage() {
        currentLang = currentLang.equals("en") ? "ar" : "en";
    }
}
