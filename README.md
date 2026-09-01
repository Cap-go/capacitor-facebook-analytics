# @capgo/capacitor-facebook-analytics

<a href="https://capgo.app/"><img src="https://capgo.app/readme-banner.svg?repo=Cap-go/capacitor-facebook-analytics" alt="Capgo - Instant updates for Capacitor" /></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_facebook_analytics">Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_facebook_analytics">Missing a feature? We'll build the plugin for you</a></h2>
</div>

Capacitor plugin for Meta/Facebook App Events analytics on iOS and Android.

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/cap-go/capacitor-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `cap-go/capacitor-skills` to install the `@capgo/capacitor-facebook-analytics` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

```bash
bun add @capgo/capacitor-facebook-analytics
bunx cap sync
```

## Usage

```ts
import {
  FacebookAnalytics,
  FacebookEventName,
  FacebookEventParameterName,
} from '@capgo/capacitor-facebook-analytics';

await FacebookAnalytics.enableAdvertiserTracking();
await FacebookAnalytics.initAppEvents();

await FacebookAnalytics.logEvent({
  event: FacebookEventName.CompletedRegistration,
  params: {
    [FacebookEventParameterName.RegistrationMethod]: 'email',
  },
});

await FacebookAnalytics.logEvent({
  event: FacebookEventName.AddedToCart,
  valueToSum: 19.99,
  currency: 'USD',
  params: {
    [FacebookEventParameterName.ContentType]: 'product',
    [FacebookEventParameterName.ContentId]: 'sku-123',
  },
});

await FacebookAnalytics.logPurchase({
  amount: 9.99,
  currency: 'USD',
});
```

## Native Setup

Configure the Meta app id and client token in your native app. This plugin does not create those values for you.

### iOS

Add your Meta values to the app `Info.plist`:

```xml
<key>FacebookAppID</key>
<string>YOUR_FACEBOOK_APP_ID</string>
<key>FacebookClientToken</key>
<string>YOUR_FACEBOOK_CLIENT_TOKEN</string>
<key>FacebookDisplayName</key>
<string>YOUR_APP_NAME</string>
```

When advertiser tracking is allowed by your consent flow, call `enableAdvertiserTracking()` before logging events.

If automatic Meta App Event logging is disabled (`FacebookAutoLogAppEventsEnabled` = `false`) so initialization can wait for consent, call `initAppEvents()` only after that consent and ATT flow. On iOS this also initializes FBSDK. Do not call `ApplicationDelegate.shared.initializeSDK()` from `AppDelegate` in that flow; it would start Meta before those gates pass.

### Android

Add your Meta values to the app `AndroidManifest.xml`:

```xml
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id" />
<meta-data android:name="com.facebook.sdk.ClientToken" android:value="@string/facebook_client_token" />
```

Add the string resources in `android/app/src/main/res/values/strings.xml`:

```xml
<string name="facebook_app_id">YOUR_FACEBOOK_APP_ID</string>
<string name="facebook_client_token">YOUR_FACEBOOK_CLIENT_TOKEN</string>
```

## Troubleshooting

### `"FacebookAnalytics" plugin is not implemented on android`

This usually means Capacitor did not register the native Android plugin. Check the following:

1. Run `bunx cap sync` after installing or upgrading the plugin.
2. Confirm `@capgo/capacitor-facebook-analytics` is listed in the Android sync output.
3. Add the Meta `ApplicationId` and `ClientToken` entries from the Android setup section above.
4. Upgrade to `@capgo/capacitor-facebook-analytics@8.1.7` or newer if you are on an older build.

If Meta SDK setup is missing, event calls can still reject with a clear error, but the plugin itself should register on Android once sync succeeds.

## API

<docgen-index>

* [`initAppEvents()`](#initappevents)
* [`logEvent(...)`](#logevent)
* [`logPurchase(...)`](#logpurchase)
* [`enableAdvertiserTracking()`](#enableadvertisertracking)
* [`disableAdvertiserTracking()`](#disableadvertisertracking)
* [`getAdvertiserTrackingStatus()`](#getadvertisertrackingstatus)
* [`getPluginVersion()`](#getpluginversion)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

Facebook App Events analytics bridge.

### initAppEvents()

```typescript
initAppEvents() => Promise<void>
```

Initialize the Facebook SDK and activate App Events.

Call this when automatic app event logging is disabled and you want to
start sending events after your consent / ATT flow.

On iOS this initializes FBSDK on the main thread, then activates App
Events. `activateApp()` alone is not enough when automatic SDK
initialization is delayed or disabled.

Do not initialize Facebook from `AppDelegate` for consent-gated apps;
call this method after the user grants advertising measurement consent.

--------------------


### logEvent(...)

```typescript
logEvent(options: LogEventOptions) => Promise<void>
```

Log a Facebook App Event.

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#logeventoptions">LogEventOptions</a></code> |

--------------------


### logPurchase(...)

```typescript
logPurchase(options: LogPurchaseOptions) => Promise<void>
```

Log a Facebook purchase event.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#logpurchaseoptions">LogPurchaseOptions</a></code> |

--------------------


### enableAdvertiserTracking()

```typescript
enableAdvertiserTracking() => Promise<void>
```

Enable advertiser tracking.

On iOS 16 and below this sets `Settings.shared.isAdvertiserTrackingEnabled`.
On iOS 17 and above FBSDK v17+ reads App Tracking Transparency directly.
On Android this enables advertiser ID collection.

--------------------


### disableAdvertiserTracking()

```typescript
disableAdvertiserTracking() => Promise<void>
```

Disable advertiser tracking.

On iOS 16 and below this sets `Settings.shared.isAdvertiserTrackingEnabled`.
On iOS 17 and above FBSDK v17+ reads App Tracking Transparency directly.
On Android this disables advertiser ID collection.

--------------------


### getAdvertiserTrackingStatus()

```typescript
getAdvertiserTrackingStatus() => Promise<AdvertiserTrackingStatusResult>
```

Get the current advertiser tracking status.

On iOS 17 and above this reflects App Tracking Transparency authorization.

**Returns:** <code>Promise&lt;<a href="#advertisertrackingstatusresult">AdvertiserTrackingStatusResult</a>&gt;</code>

--------------------


### getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersionResult>
```

Returns the platform implementation version marker.

**Returns:** <code>Promise&lt;<a href="#pluginversionresult">PluginVersionResult</a>&gt;</code>

--------------------


### Interfaces


#### LogEventOptions

| Prop             | Type                                                                | Description                                                                                                                       |
| ---------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **`event`**      | <code>string</code>                                                 | Facebook standard event name or a custom app event name.                                                                          |
| **`valueToSum`** | <code>number</code>                                                 | Optional numeric value to sum for this event.                                                                                     |
| **`currency`**   | <code>string</code>                                                 | Optional ISO 4217 currency code for value-bearing standard events. This is forwarded as Facebook's `fb_currency` event parameter. |
| **`params`**     | <code><a href="#facebookeventparams">FacebookEventParams</a></code> | Optional event parameters.                                                                                                        |


#### LogPurchaseOptions

| Prop           | Type                                                                | Description                   |
| -------------- | ------------------------------------------------------------------- | ----------------------------- |
| **`amount`**   | <code>number</code>                                                 | Purchase amount.              |
| **`currency`** | <code>string</code>                                                 | ISO 4217 currency code.       |
| **`params`**   | <code><a href="#facebookeventparams">FacebookEventParams</a></code> | Optional purchase parameters. |


#### AdvertiserTrackingStatusResult

| Prop         | Type                 | Description                         |
| ------------ | -------------------- | ----------------------------------- |
| **`status`** | <code>boolean</code> | Current advertiser tracking status. |


#### PluginVersionResult

| Prop          | Type                | Description                                                 |
| ------------- | ------------------- | ----------------------------------------------------------- |
| **`version`** | <code>string</code> | Version identifier returned by the platform implementation. |


### Type Aliases


#### FacebookEventName

Facebook standard event names.

<code>(typeof <a href="#facebookeventname">FacebookEventName</a>)[keyof typeof FacebookEventName]</code>


#### FacebookEventParams

Event parameters keyed by Facebook standard parameter names or custom names.

<code><a href="#record">Record</a>&lt;<a href="#facebookeventparametername">FacebookEventParameterName</a> | string, <a href="#facebookeventparamvalue">FacebookEventParamValue</a>&gt;</code>


#### Record

Construct a type with a set of properties K of type T

<code>{ [P in K]: T; }</code>


#### FacebookEventParamValue

Values accepted by the native Facebook App Events SDKs.

Boolean values are converted to Facebook toggle strings: `true` becomes `"1"`
and `false` becomes `"0"`.

<code>string | number | boolean | null</code>


#### FacebookEventParameterName

Facebook standard event parameter names.

<code>(typeof <a href="#facebookeventparametername">FacebookEventParameterName</a>)[keyof typeof FacebookEventParameterName]</code>

</docgen-api>
