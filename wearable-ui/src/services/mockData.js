export function startMockStream(watches, callback) {
  const interval = setInterval(() => {
    watches.forEach(deviceId => {
      const sample = {
        ts: new Date().toISOString(),
        hr: 60 + Math.floor(Math.random() * 40),   // 60–100
        spo2: 90 + Math.floor(Math.random() * 10), // 90–99
      };

      callback(deviceId, sample);
    });
  }, 3000);

  return () => clearInterval(interval);
}
