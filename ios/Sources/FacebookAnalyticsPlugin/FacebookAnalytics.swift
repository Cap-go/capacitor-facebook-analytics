import Foundation

@objc public class FacebookAnalytics: NSObject {
    private let pluginVersion = "8.0.0"

    @objc public func getPluginVersion() -> String {
        return pluginVersion
    }
}
