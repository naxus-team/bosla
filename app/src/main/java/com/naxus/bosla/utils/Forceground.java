package com.naxus.bosla.utils;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;
import android.os.IBinder;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.naxus.bosla.R;

public class Forceground extends Service {

    private static final String CHANNEL_ID = "bosla_foreground_channel";
    private static final int NOTIFICATION_ID = 1;
    private static final String CHANNEL_ID_DONE = "bosla_done_channel";
    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel(); // لازم قبل startForeground
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        // إشعار الخدمة (المستمر)
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Bosla Service Running")
                .setContentText("Background task is running...")
                .setSmallIcon(R.drawable.ic_notification)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .setOngoing(true)
                .build();

        startForeground(NOTIFICATION_ID, notification);
        new Thread(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            stopSelf();
        }).start();

        return START_STICKY;
    }

    private void showDoneNotification() {
        NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        Notification doneNotification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Bosla Task Complete")
                .setContentText("Your background process has finished.")
                .setSmallIcon(R.drawable.ic_notification)
                .setAutoCancel(true)
                .build();

        manager.notify(2, doneNotification);
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "Bosla Background Channel",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            channel.setDescription("Channel for background tasks");

            // تحديد الصوت المخصص
            Uri soundUri = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.notification_sound);

            AudioAttributes audioAttributes = new AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                    .build();

            channel.setSound(soundUri, audioAttributes);

            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) manager.createNotificationChannel(channel);
        }
    }


    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
