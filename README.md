# @capgo/capacitor-facebook-analytics

<a href="https://capgo.app/"><img src="https://capgo.app/readme-banner.svg?repo=Cap-go/capacitor-facebook-analytics" alt="Capgo - Instant updates for Capacitor" /></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_facebook_analytics">Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_facebook_analytics">Missing a feature? We'll build the plugin for you</a></h2>
</div>

Capacitor plugin for Meta/Facebook App Events analytics on iOS and Android.

## Install

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

Activate Facebook App Events.

Call this when automatic app event logging is disabled and you want to
explicitly mark the app as activated.

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
