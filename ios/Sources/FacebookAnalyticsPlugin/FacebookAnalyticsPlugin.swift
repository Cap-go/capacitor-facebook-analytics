import Foundation
import AppTrackingTransparency
import Capacitor
import FBSDKCoreKit

@objc(FacebookAnalyticsPlugin)
public class FacebookAnalyticsPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "FacebookAnalyticsPlugin"
    public let jsName = "FacebookAnalytics"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "initAppEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "logEvent", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "logPurchase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "enableAdvertiserTracking", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "disableAdvertiserTracking", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getAdvertiserTrackingStatus", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPluginVersion", returnType: CAPPluginReturnPromise)
    ]

    private let implementation = FacebookAnalytics()

    @objc func initAppEvents(_ call: CAPPluginCall) {
        AppEvents.shared.activateApp()
        call.resolve()
    }

    @objc func logEvent(_ call: CAPPluginCall) {
        guard let event = call.getString("event"), !event.isEmpty else {
            call.reject("Must provide an event")
            return
        }

        let currency = call.getString("currency")

        if let currency = currency, currency.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            call.reject("Currency must not be empty")
            return
        }

        let parameters = buildParameters(call.getObject("params"), currency: currency)
        let eventName = AppEvents.Name(rawValue: event)

        if let valueToSum = call.getDouble("valueToSum") {
            AppEvents.shared.logEvent(eventName, valueToSum: valueToSum, parameters: parameters)
        } else if let parameters = parameters {
            AppEvents.shared.logEvent(eventName, parameters: parameters)
        } else {
            AppEvents.shared.logEvent(eventName)
        }

        call.resolve()
    }

    @objc func logPurchase(_ call: CAPPluginCall) {
        guard let amount = call.getDouble("amount") else {
            call.reject("Must provide an amount")
            return
        }

        guard let currency = call.getString("currency"), !currency.isEmpty else {
            call.reject("Must provide a currency")
            return
        }

        AppEvents.shared.logPurchase(amount: amount, currency: currency, parameters: buildParameters(call.getObject("params")))
        call.resolve()
    }

    @objc func enableAdvertiserTracking(_ call: CAPPluginCall) {
        setAdvertiserTrackingEnabled(true)
        call.resolve()
    }

    @objc func disableAdvertiserTracking(_ call: CAPPluginCall) {
        setAdvertiserTrackingEnabled(false)
        call.resolve()
    }

    @objc func getAdvertiserTrackingStatus(_ call: CAPPluginCall) {
        call.resolve([
            "status": getAdvertiserTrackingStatus()
        ])
    }

    @objc func getPluginVersion(_ call: CAPPluginCall) {
        call.resolve([
            "version": implementation.getPluginVersion()
        ])
    }

    private func setAdvertiserTrackingEnabled(_ enabled: Bool) {
        if #available(iOS 17.0, *) {
            return
        }

        let selector = NSSelectorFromString("setIsAdvertiserTrackingEnabled:")

        guard Settings.shared.responds(to: selector) else {
            return
        }

        // FBSDK 18 deprecates the Swift setter even for legacy iOS paths.
        // KVC preserves iOS 16-and-below behavior without a build warning.
        Settings.shared.setValue(NSNumber(value: enabled), forKey: "isAdvertiserTrackingEnabled")
    }

    private func getAdvertiserTrackingStatus() -> Bool {
        if #available(iOS 17.0, *) {
            return ATTrackingManager.trackingAuthorizationStatus == .authorized
        }

        return Settings.shared.isAdvertiserTrackingEnabled
    }

    private func buildParameters(_ params: [String: Any]?, currency: String? = nil) -> [AppEvents.ParameterName: Any]? {
        var parameters: [AppEvents.ParameterName: Any] = [:]

        params?.forEach { key, value in
            if value is NSNull {
                return
            }

            if let boolValue = value as? Bool {
                parameters[AppEvents.ParameterName(rawValue: key)] = boolValue ? "1" : "0"
                return
            }

            if value is String || value is NSNumber {
                parameters[AppEvents.ParameterName(rawValue: key)] = value
            } else {
                parameters[AppEvents.ParameterName(rawValue: key)] = String(describing: value)
            }
        }

        if let currency = currency {
            parameters[AppEvents.ParameterName(rawValue: "fb_currency")] = currency
        }

        return parameters.isEmpty ? nil : parameters
    }
}
