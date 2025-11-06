export default function VitalsCard({ patient, vitals }) {
  return (
    <div>
      <h2>{patient.name} Vitals</h2>
      {vitals.length === 0 ? (
        <p>No data yet</p>
      ) : (
        <ul>
          {vitals.map((v, i) => (
            <li key={i}>
              HR: {v.hr} | SpO2: {v.spo2} | Timestamp: {v.ts}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
