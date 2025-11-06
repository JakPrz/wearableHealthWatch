export default function AlertLog({ alerts }) {
  return (
    <div>
      <h2>Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts</p>
      ) : (
        <ul>
          {alerts.map((a, i) => (
            <li key={i}>
              {a.ts}: {a.deviceId} - HR: {a.hr}, SpO2: {a.spo2}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}