# https://www.youtube.com/watch?v=RXENKe1Cvvg
# https://documentation.onesignal.com/docs/ionic-sdk-setup

sudo gem install cocoapods
pod repo update

sudo ionic cordova plugin remove onesignal-cordova-plugin
sudo ionic cordova plugin add onesignal-cordova-plugin
sudo npm install --save @ionic-native/onesignal
# 5. iOS - Part 1 (Required)

# 5.0 Open <project-root>/platform/ios/YourAppName.xcworkspace
# 5.1 Select the root project and Under Capabilities Enable "Push Notifications".
# 5.2 Next Enable "Background Modes" and check "Remote notifications".
# Background Fetch and Remote Notifications

# 5. iOS - Part 2 (Recommend)ß