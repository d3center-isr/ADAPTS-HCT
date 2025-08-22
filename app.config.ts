module.exports = {
  expo: {
    name: "ADAPTS-HCT",
    slug: "ADAPTS-HCT",
    version: "1.0.0",
    orientation: "portrait",
    icon: "src/assets/icon.png",
    userInterfaceStyle: "light",
    scheme: "adaptshct", // determines prefix used for deep link urls (ie, all deep links have 'adaptshct://')
    splash: {
      image: "src/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "edu.umich.d3c.adaptshct"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "src/assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "edu.umich.d3c.adaptshct",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      favicon: "src/assets/favicon.png"
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
          icon: "src/assets/notification-icon-android.png",
          color: "#4dffea",
          defaultChannel: "default"
        }
      ],
      [
        "expo-router"
      ],
      [
        "expo-localization"
      ]
    ]
  }
}

