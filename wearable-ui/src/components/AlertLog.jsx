import React from "react";

export default function AlertLog({ alerts }) {
  const alertList = Object.values(alerts);
  return (
    <div className="alert-log">
      <h3 style={{ fontSize: "1em", marginBottom: "5px" }}>Alert Log</h3>

      {alertList.length === 0 && <p>No alerts yet.</p>}

      <ul>
        {alertList.map((a) => {
          const hrOut = a.hr > 120 || a.hr < 50;
          const spo2Out = a.spo2 < 92;
          return (
            <li key={a.deviceId} className="alert-item">
              Watch {a.deviceId} — 
              {hrOut && <span style={{ fontWeight: "bold", color: "red" }}>HR: {a.hr}</span>}
              {hrOut && spo2Out && " | "}
              {spo2Out && <span style={{ fontWeight: "bold", color: "red" }}>SpO₂: {a.spo2}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
