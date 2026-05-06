import XCTest
@testable import FacebookAnalyticsPlugin

class FacebookAnalyticsTests: XCTestCase {
    func testGetPluginVersion() {
        let implementation = FacebookAnalytics()
        let result = implementation.getPluginVersion()

        XCTAssertEqual("8.0.0", result)
    }
}
