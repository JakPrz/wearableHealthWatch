import React from "react";

export default function AlertLog({ alerts }) {
  return (
    <div className="alert-log">
      <h3>Alert Log</h3>

      {alerts.length === 0 && <p>No alerts yet.</p>}

      <ul>
        {alerts.map((a, i) => {
          const hrAlert = a.hr > 80 || a.hr < 60;
          const spo2Alert = a.spo2 < 92;

          return (
            <li key={i} className="alert-item">
              <span className="alert-time">
                {new Date(a.ts).toLocaleTimeString()}
              </span>{" "}
              | Patient {a.deviceId} — 
              {" "}
              <span style={{ fontWeight: hrAlert ? "bold" : "normal" }}>
                HR: {a.hr}
              </span>
              {" | "}
              <span style={{ fontWeight: spo2Alert ? "bold" : "normal" }}>
                SpO₂: {a.spo2}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
