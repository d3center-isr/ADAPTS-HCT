Repo for the ADAPTS-HCT app (using the justin framework).

# How to test the app
This app does **not** run on Expo Go. To test this app you will need to use a custom dev client.

If you have a compatible dev client, you may run the server on your machine by typing `npx expo start` into your terminal.

Then, open the dev client app on your phone and scan the QR code that your terminal displays. If you cannot connect to the server, ensure that you and the computer are on the same network. If this is the case and the issue persists, run `npx expo start --tunnel` instead.

If your app is getting an android internal error, check `./expo/settings.json`, and ensure that the `URLRandomness` field does not contain any underscores ('_' characters). If any exist, delete them or replace them with another character.

# Creating a Custom Development Client

## 1: Getting firebase sdk and google-services.json
Please consult https://docs.expo.dev/push-notifications/fcm-credentials/ for steps on how to do this. 

You will need to rename the firebase sdk file you recieve to `adapts-hct-android-firebase-adminsdk.json`.
Keep `google-services.json` the same. 

Ensure you have uploaded your adminsdk file to EAS using `eas credentials` (see the above link for steps).

Keep both files in the root directory of the project

## 2: Adding `google-services.json` to EAS

run ```eas secret:create \
  --scope project \
  --name GOOGLE_SERVICES_JSON \
  --type file \
  --value ./google-services.json```
in your terminal. 

## 3: Building the client

You may either run `eas build --platform android --profile development` in your teminal, or run the provided `build-custom-dev-client.sh` shell file (located in project root).