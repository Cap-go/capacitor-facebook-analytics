package app.capgo.facebookanalytics

import org.junit.Test

class FacebookAnalyticsPluginTest {
    @Test
    fun loadDoesNotRequireFacebookSdkConfiguration() {
        FacebookAnalyticsPlugin().load()
    }
}
