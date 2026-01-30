import React from "react";
import VitalsChart from "./VitalsChart";

export default function VitalsCard({ watchId, vitals, onRemove }) {
  if (!watchId) return null;

  const latest = vitals[vitals.length - 1];

  return (
    <div className="vitals-card">
      <h2>Watch {watchId} <button onClick={onRemove} style={{ float: "right" }}>Remove</button></h2>
      {latest ? (
        <>
          <p>❤️ Heart Rate: <strong>{latest.hr}</strong> bpm</p>
          <p>🩸 SpO₂: <strong>{latest.spo2}</strong>%</p>
          <VitalsChart vitals={vitals} />
        </>
      ) : (
        <p>No data yet...</p>
      )}
    </div>
  );
}