import React from "react";
import VitalsChart from "./VitalsChart";

export default function VitalsCard({ patient, vitals }) {
  if (!patient) return null;

  const latest = vitals[vitals.length - 1];

  return (
    <div className="vitals-card">
      <h2>{patient.name}</h2>
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