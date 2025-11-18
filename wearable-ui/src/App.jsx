import React, { useState, useEffect } from "react";
import PatientList from "./components/PatientList";
import VitalsCard from "./components/VitalsCard";
import AlertLog from "./components/AlertLog";
import { startMockStream } from "./services/mockData";

const initialPatients = [
  { id: "P001", name: "Patient 1", age: 68 },
  { id: "P002", name: "Patient 2", age: 54 },
  { id: "P003", name: "Patient 3", age: 77 }
];

export default function App() {
  const [patients] = useState(initialPatients);

  // vitals map: { "P001": [...], "P002": [...], ... }
  const [vitalsByPatient, setVitalsByPatient] = useState(() => {
    const map = {};
    initialPatients.forEach(p => (map[p.id] = []));
    return map;
  });

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const stop = startMockStream((deviceId, sample) => {
      setVitalsByPatient(prev => {
        const arr = (prev[deviceId] || []).slice(-119);
        arr.push(sample);
        return { ...prev, [deviceId]: arr };
      });

      if (sample.hr > 120 || sample.spo2 < 92) {
        setAlerts(prev => [
          { ts: sample.ts, deviceId, hr: sample.hr, spo2: sample.spo2 },
          ...prev.slice(0, 199)
        ]);
      }
    });

    return () => stop();
  }, []);

  return (
    <div className="app">
      <main style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {patients.map(p => (
          <VitalsCard 
            key={p.id} 
            patient={p} 
            vitals={vitalsByPatient[p.id] || []}
          />
        ))}
      </main>

      <aside className="right">
        <AlertLog alerts={alerts} />
      </aside>
    </div>
  );
}

