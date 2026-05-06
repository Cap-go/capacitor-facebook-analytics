import './style.css';
import { FacebookAnalytics, FacebookEventParameterName } from '@capgo/capacitor-facebook-analytics';

const output = document.getElementById('plugin-output');
const eventNameInput = document.getElementById('event-name');
const logEventButton = document.getElementById('log-event');
const trackingStatusButton = document.getElementById('get-tracking-status');
const versionButton = document.getElementById('get-version');

const setOutput = (value) => {
  output.textContent = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
};

logEventButton.addEventListener('click', async () => {
  try {
    await FacebookAnalytics.logEvent({
      event: eventNameInput.value,
      params: {
        [FacebookEventParameterName.RegistrationMethod]: 'example-app',
      },
    });
    setOutput({ logged: eventNameInput.value });
  } catch (error) {
    setOutput(`Error: ${error?.message ?? error}`);
  }
});

trackingStatusButton.addEventListener('click', async () => {
  try {
    const result = await FacebookAnalytics.getAdvertiserTrackingStatus();
    setOutput(result);
  } catch (error) {
    setOutput(`Error: ${error?.message ?? error}`);
  }
});

versionButton.addEventListener('click', async () => {
  try {
    const result = await FacebookAnalytics.getPluginVersion();
    setOutput(result);
  } catch (error) {
    setOutput(`Error: ${error?.message ?? error}`);
  }
});
