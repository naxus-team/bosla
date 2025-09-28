import notifee, { AndroidImportance } from '@notifee/react-native';
import { getData, updateData } from '../storage';
import { Vibration } from 'react-native';

type Settings = {
    notificationsEnabled?: boolean;
    vibrationEnabled?: boolean;
};

// إنشاء قناة للأندرويد مرة واحدة
export async function createNotificationChannel() {
    const channels = await notifee.getChannels();
    if (!channels.find(channel => channel.id === 'default')) {
        await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
            sound: 'notif_sound',
        });
    }
}

export async function displayNotification(title: string, body: string) {
    await createNotificationChannel();

    const settings = await getData<Settings>('settings');

    if (settings?.notificationsEnabled) {
        await notifee.displayNotification({
            title,
            body,
            data: {
                screen: 'ChatScreen', // الشاشة اللي تحب تفتحها
                userId: '123', // أي بيانات إضافية
            },
            android: {
                channelId: 'default',
                smallIcon: 'ic_notification',
                timestamp: Date.now(), // الوقت الحالي بالميللي ثانية
                showTimestamp: true, // اجبار ظهور الوقت
                pressAction: {
                    id: 'default',
                    launchActivity: 'default',
                },
            },

        });

        if (settings.vibrationEnabled) {
            Vibration.vibrate([0, 60, 100, 60]); // اهتزاز ثم توقف ثم اهتزاز

        }
    }
}

// لتحديث الإعدادات مباشرة
export async function setNotificationsEnabled(enabled: boolean) {
    await updateData<Settings>('settings', { notificationsEnabled: enabled });
}