export function startMockStream(callback) {
  const interval = setInterval(() => {
    const deviceId = "P001"; // simulate one patient for now
    const sample = {
      ts: new Date().toISOString(),
      hr: Math.floor(Math.random() * 40) + 60, // 60-100
      spo2: Math.floor(Math.random() * 10) + 90 // 90-99
    };
    callback(deviceId, sample);
  }, 3000);

  return () => clearInterval(interval);
}