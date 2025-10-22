package com.naxus.bosla;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.os.Bundle;
import android.util.Size;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.OptIn;
import androidx.appcompat.app.AppCompatActivity;
import androidx.camera.core.CameraSelector;
import androidx.camera.core.ExperimentalGetImage;
import androidx.camera.core.ImageAnalysis;
import androidx.camera.core.Preview;
import androidx.camera.lifecycle.ProcessCameraProvider;
import androidx.camera.view.PreviewView;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.google.common.util.concurrent.ListenableFuture;
import com.google.mlkit.vision.barcode.Barcode;
import com.google.mlkit.vision.barcode.BarcodeScanner;
import com.google.mlkit.vision.barcode.BarcodeScanning;
import com.google.mlkit.vision.common.InputImage;
import com.naxus.bosla.utils.helpers.StatusBarHelper;
import com.naxus.core.SessionManager;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class LauncherActivity extends AppCompatActivity {
    private SessionManager session;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        session = new SessionManager(this);
        Intent intent = new Intent();
        if (session.isLoggedIn()) {
            startActivity(new Intent(this,
                    MainActivity.class));
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        } else {
            startActivity(new Intent(this, OTPLoginActivity.class));
        }
        finish();
    }

    public static class QRScannerActivity extends AppCompatActivity {

        private static final int REQUEST_CAMERA_PERMISSION = 1001;
        private PreviewView previewView;
        private FrameLayout overlay;
        private ExecutorService cameraExecutor;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            // Root layout
            FrameLayout root = new FrameLayout(this);
            setContentView(root);

            // Preview view
            previewView = new PreviewView(this);
            root.addView(previewView, FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT);

            // Overlay
            overlay = new FrameLayout(this) {
                @Override
                protected void onDraw(Canvas canvas) {
                    super.onDraw(canvas);
                    int width = getWidth() * 2 / 3;
                    int height = width;
                    int left = (getWidth() - width) / 2;
                    int top = (getHeight() - height) / 2;
                    float cornerRadius = 40f; // ← هنا تحدد نصف قطر الزوايا (قيمة بالبكسل)
                    // تظليل خارج المربع
                    Paint dimPaint = new Paint();
                    dimPaint.setColor(Color.parseColor("#88000000"));
                    canvas.drawRect(0, 0, getWidth(), getHeight(), dimPaint);

                    // مسح المنطقة الوسطى (الشفافة)
                    Paint clear = new Paint();
                    clear.setXfermode(new android.graphics.PorterDuffXfermode(PorterDuff.Mode.CLEAR));
                    canvas.drawRoundRect(
                            left,
                            top,
                            left + width,
                            top + height,
                            cornerRadius,
                            cornerRadius,
                            clear
                    );

                    // رسم الحدود
                    Paint borderPaint = new Paint();
                    borderPaint.setStyle(Paint.Style.STROKE);
                    borderPaint.setStrokeWidth(8);
                    borderPaint.setColor(Color.WHITE);

                    // مستطيل بزوايا دائرية
                    canvas.drawRoundRect(
                            left,
                            top,
                            left + width,
                            top + height,
                            cornerRadius,
                            cornerRadius,
                            borderPaint
                    );
                }
            };
            overlay.setWillNotDraw(false);
            root.addView(overlay, FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT);

            cameraExecutor = Executors.newSingleThreadExecutor();

            if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
                startCamera();
            } else {
                ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, REQUEST_CAMERA_PERMISSION);
            }
        }

        private void startCamera() {
            ListenableFuture<ProcessCameraProvider> cameraProviderFuture = ProcessCameraProvider.getInstance(this);
            cameraProviderFuture.addListener(() -> {
                try {
                    ProcessCameraProvider cameraProvider = cameraProviderFuture.get();
                    bindCamera(cameraProvider);
                } catch (ExecutionException | InterruptedException e) {
                    e.printStackTrace();
                }
            }, ContextCompat.getMainExecutor(this));
        }

        @OptIn(markerClass = ExperimentalGetImage.class)
        private void bindCamera(ProcessCameraProvider cameraProvider) {
            Preview preview = new Preview.Builder().build();
            CameraSelector cameraSelector = new CameraSelector.Builder()
                    .requireLensFacing(CameraSelector.LENS_FACING_BACK)
                    .build();

            ImageAnalysis imageAnalysis = new ImageAnalysis.Builder()
                    .setTargetResolution(new Size(1280, 720))
                    .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                    .build();

            BarcodeScanner scanner = BarcodeScanning.getClient();

            imageAnalysis.setAnalyzer(cameraExecutor, imageProxy -> {
                @ExperimentalGetImage
                android.media.Image mediaImage = imageProxy.getImage();
                if (mediaImage != null) {
                    InputImage image = InputImage.fromMediaImage(mediaImage, imageProxy.getImageInfo().getRotationDegrees());
                    scanner.process(image)
                            .addOnSuccessListener(barcodes -> {
                                for (Barcode barcode : barcodes) {
                                    String rawValue = barcode.getRawValue();
                                    if (rawValue != null) {
                                        runOnUiThread(() -> Toast.makeText(this, "QR: " + rawValue, Toast.LENGTH_SHORT).show());
                                        // يمكن هنا ترجع للـ activity السابق أو تعمل navigate
                                        cameraExecutor.shutdown();
                                        finish();
                                    }
                                }
                            })
                            .addOnFailureListener(Throwable::printStackTrace)
                            .addOnCompleteListener(task -> imageProxy.close());
                } else {
                    imageProxy.close();
                }
            });

            preview.setSurfaceProvider(previewView.getSurfaceProvider());

            cameraProvider.unbindAll();
            cameraProvider.bindToLifecycle(this, cameraSelector, preview, imageAnalysis);
        }

        @Override
        public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
            super.onRequestPermissionsResult(requestCode, permissions, grantResults);
            if (requestCode == REQUEST_CAMERA_PERMISSION && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                startCamera();
            } else {
                Toast.makeText(this, "Camera permission required", Toast.LENGTH_SHORT).show();
                finish();
            }
        }

        @Override
        protected void onDestroy() {
            super.onDestroy();
            cameraExecutor.shutdown();
        }
    }
}
