module.exports = {
  expo: {
    name: "ADAPTS-HCT",
    slug: "ADAPTS-HCT",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "edu.umich.d3c.adaptshct"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "edu.umich.d3c.adaptshct",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "1349e98f-159d-41ac-bd2d-41cf8289f09c"
      }
    },
    plugins: [
      [
        "expo-dev-client",
        {
          launchMode: "most-recent"
        }
      ],
      [
        "expo-notifications",
        {
          icon: "./assets/notification-icon-android.png",
          color: "#4dffea",
          defaultChannel: "default"
        }
      ]
    ]
  }
}

