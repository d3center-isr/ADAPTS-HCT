import * as Device from 'expo-device'
import * as Application from 'expo-application'
import * as Localization from 'expo-localization'

export function LogDeviceInformation() {
    console.log("Logger Device Information: ")
    console.log("\tDevice OS Name: " + Device.osName);
    console.log("\tDevice OS Version: " + Device.osVersion);
    console.log("\tApp Version: " + Application.nativeBuildVersion);
    console.log("\tTimezone: " + Localization.getCalendars()[0].timeZone);
}