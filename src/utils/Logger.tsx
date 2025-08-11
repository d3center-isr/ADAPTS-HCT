import * as Device from 'expo-device'
import * as Application from 'expo-application'
import { DateTime } from 'luxon'

export function LogDeviceInformation() {
    console.log("Device OS Name: " + Device.osName);
    console.log("Device OS Version: " + Device.osVersion);
    console.log("App Version: " + Application.nativeBuildVersion);
    console.log("Timezone: " + DateTime.local().toFormat('ZZZZ'));
}