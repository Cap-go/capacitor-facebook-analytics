/**
 * Facebook standard event names.
 */
export const FacebookEventName = Object.freeze({
  ActivatedApp: 'fb_mobile_activate_app',
  DeactivatedApp: 'fb_mobile_deactivate_app',
  SessionInterruptions: 'fb_mobile_app_interruptions',
  TimeBetweenSessions: 'fb_mobile_time_between_sessions',
  CompletedRegistration: 'fb_mobile_complete_registration',
  ViewedContent: 'fb_mobile_content_view',
  Searched: 'fb_mobile_search',
  Rated: 'fb_mobile_rate',
  CompletedTutorial: 'fb_mobile_tutorial_completion',
  PushTokenObtained: 'fb_mobile_obtain_push_token',
  AddedToCart: 'fb_mobile_add_to_cart',
  AddedToWishlist: 'fb_mobile_add_to_wishlist',
  InitiatedCheckout: 'fb_mobile_initiated_checkout',
  AddedPaymentInfo: 'fb_mobile_add_payment_info',
  Purchased: 'fb_mobile_purchase',
  AchievedLevel: 'fb_mobile_level_achieved',
  UnlockedAchievement: 'fb_mobile_achievement_unlocked',
  SpentCredits: 'fb_mobile_spent_credits',
  Contact: 'Contact',
  CustomizeProduct: 'CustomizeProduct',
  Donate: 'Donate',
  FindLocation: 'FindLocation',
  Schedule: 'Schedule',
  StartTrial: 'StartTrial',
  SubmitApplication: 'SubmitApplication',
  Subscribe: 'Subscribe',
  AdImpression: 'AdImpression',
  AdClick: 'AdClick',
  LiveStreamingStart: 'fb_sdk_live_streaming_start',
  LiveStreamingStop: 'fb_sdk_live_streaming_stop',
  LiveStreamingPause: 'fb_sdk_live_streaming_pause',
  LiveStreamingResume: 'fb_sdk_live_streaming_resume',
  LiveStreamingError: 'fb_sdk_live_streaming_error',
  LiveStreamingUpdateStatus: 'fb_sdk_live_streaming_update_status',
  ProductCatalogUpdate: 'fb_mobile_catalog_update',
} as const);

export type FacebookEventName = (typeof FacebookEventName)[keyof typeof FacebookEventName];

/**
 * Facebook standard event parameter names.
 */
export const FacebookEventParameterName = Object.freeze({
  Currency: 'fb_currency',
  RegistrationMethod: 'fb_registration_method',
  ContentType: 'fb_content_type',
  Content: 'fb_content',
  ContentId: 'fb_content_id',
  SearchString: 'fb_search_string',
  Success: 'fb_success',
  MaxRatingValue: 'fb_max_rating_value',
  PaymentInfoAvailable: 'fb_payment_info_available',
  NumItems: 'fb_num_items',
  Level: 'fb_level',
  Description: 'fb_description',
  SourceApplication: 'fb_mobile_launch_source',
  AdType: 'ad_type',
  OrderId: 'fb_order_id',
  ValueToSum: '_valueToSum',
  ProductCustomLabel0: 'fb_product_custom_label_0',
  ProductCustomLabel1: 'fb_product_custom_label_1',
  ProductCustomLabel2: 'fb_product_custom_label_2',
  ProductCustomLabel3: 'fb_product_custom_label_3',
  ProductCustomLabel4: 'fb_product_custom_label_4',
  ProductCategory: 'fb_product_category',
  ProductApplinkIosUrl: 'fb_product_applink_ios_url',
  ProductApplinkIosAppStoreId: 'fb_product_applink_ios_app_store_id',
  ProductApplinkIosAppName: 'fb_product_applink_ios_app_name',
  ProductApplinkIphoneUrl: 'fb_product_applink_iphone_url',
  ProductApplinkIphoneAppStoreId: 'fb_product_applink_iphone_app_store_id',
  ProductApplinkIphoneAppName: 'fb_product_applink_iphone_app_name',
  ProductApplinkIpadUrl: 'fb_product_applink_ipad_url',
  ProductApplinkIpadAppStoreId: 'fb_product_applink_ipad_app_store_id',
  ProductApplinkIpadAppName: 'fb_product_applink_ipad_app_name',
  ProductApplinkAndroidUrl: 'fb_product_applink_android_url',
  ProductApplinkAndroidPackage: 'fb_product_applink_android_package',
  ProductApplinkAndroidAppName: 'fb_product_applink_android_app_name',
  LiveStreamingPreviousStatus: 'live_streaming_prev_status',
  LiveStreamingStatus: 'live_streaming_status',
  LiveStreamingError: 'live_streaming_error',
} as const);

export type FacebookEventParameterName = (typeof FacebookEventParameterName)[keyof typeof FacebookEventParameterName];

/**
 * Facebook canonical toggle values.
 */
export const FacebookToggle = Object.freeze({
  Yes: '1',
  No: '0',
} as const);

export type FacebookToggle = (typeof FacebookToggle)[keyof typeof FacebookToggle];
