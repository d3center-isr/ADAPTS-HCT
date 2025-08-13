import * as Device from 'expo-device'
import * as Application from 'expo-application'
import * as Localization from 'expo-localization'

export function LogDeviceInformation() {
    console.log("Device OS Name: " + Device.osName);
    console.log("Device OS Version: " + Device.osVersion);
    console.log("App Version: " + Application.nativeBuildVersion);
    console.log("Timezone: " + Localization.getCalendars()[0].timeZone);
}