import React from "react";

export default function AlertLog({ alerts }) {
  const alertList = Object.values(alerts);
  return (
    <div className="alert-log">
      <h3>Alert Log</h3>

      {alertList.length === 0 && <p>No alerts yet.</p>}

      <ul>
        {alertList.map((a) => {
          return (
            <li key={a.deviceId} className="alert-item">
              Watch {a.deviceId} — 
              {" "}
              <span style={{ fontWeight: "bold", color: "red" }}>
                HR: {a.hr}
              </span>
              {" | "}
              <span style={{ fontWeight: "bold", color: "red" }}>
                SpO₂: {a.spo2}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
