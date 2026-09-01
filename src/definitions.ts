import type { FacebookEventName, FacebookEventParameterName } from './event';

/**
 * Values accepted by the native Facebook App Events SDKs.
 *
 * Boolean values are converted to Facebook toggle strings: `true` becomes `"1"`
 * and `false` becomes `"0"`.
 */
export type FacebookEventParamValue = string | number | boolean | null;

/**
 * Event parameters keyed by Facebook standard parameter names or custom names.
 */
export type FacebookEventParams = Record<FacebookEventParameterName | string, FacebookEventParamValue>;

export interface LogEventOptions {
  /**
   * Facebook standard event name or a custom app event name.
   *
   * @example FacebookEventName.CompletedRegistration
   * @example "fb_mobile_complete_registration"
   */
  event: FacebookEventName | string;

  /**
   * Optional numeric value to sum for this event.
   */
  valueToSum?: number;

  /**
   * Optional ISO 4217 currency code for value-bearing standard events.
   *
   * This is forwarded as Facebook's `fb_currency` event parameter.
   *
   * @example "USD"
   * @example "EUR"
   */
  currency?: string;

  /**
   * Optional event parameters.
   */
  params?: FacebookEventParams;
}

export interface LogPurchaseOptions {
  /**
   * Purchase amount.
   */
  amount: number;

  /**
   * ISO 4217 currency code.
   *
   * @example "USD"
   * @example "EUR"
   */
  currency: string;

  /**
   * Optional purchase parameters.
   */
  params?: FacebookEventParams;
}

export interface AdvertiserTrackingStatusResult {
  /**
   * Current advertiser tracking status.
   */
  status: boolean;
}

export interface PluginVersionResult {
  /**
   * Version identifier returned by the platform implementation.
   */
  version: string;
}

/**
 * Facebook App Events analytics bridge.
 */
export interface FacebookAnalyticsPlugin {
  /**
   * Initialize the Facebook SDK and activate App Events.
   *
   * Call this when automatic app event logging is disabled and you want to
   * start sending events after your consent / ATT flow.
   *
   * On iOS this initializes FBSDK on the main thread, then activates App
   * Events. `activateApp()` alone is not enough when automatic SDK
   * initialization is delayed or disabled.
   *
   * Do not initialize Facebook from `AppDelegate` for consent-gated apps;
   * call this method after the user grants advertising measurement consent.
   */
  initAppEvents(): Promise<void>;

  /**
   * Log a Facebook App Event.
   */
  logEvent(options: LogEventOptions): Promise<void>;

  /**
   * Log a Facebook purchase event.
   */
  logPurchase(options: LogPurchaseOptions): Promise<void>;

  /**
   * Enable advertiser tracking.
   *
   * On iOS 16 and below this sets `Settings.shared.isAdvertiserTrackingEnabled`.
   * On iOS 17 and above FBSDK v17+ reads App Tracking Transparency directly.
   * On Android this enables advertiser ID collection.
   */
  enableAdvertiserTracking(): Promise<void>;

  /**
   * Disable advertiser tracking.
   *
   * On iOS 16 and below this sets `Settings.shared.isAdvertiserTrackingEnabled`.
   * On iOS 17 and above FBSDK v17+ reads App Tracking Transparency directly.
   * On Android this disables advertiser ID collection.
   */
  disableAdvertiserTracking(): Promise<void>;

  /**
   * Get the current advertiser tracking status.
   *
   * On iOS 17 and above this reflects App Tracking Transparency authorization.
   */
  getAdvertiserTrackingStatus(): Promise<AdvertiserTrackingStatusResult>;

  /**
   * Returns the platform implementation version marker.
   */
  getPluginVersion(): Promise<PluginVersionResult>;
}
