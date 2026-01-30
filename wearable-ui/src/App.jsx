import React, { useState, useEffect } from "react";
import VitalsCard from "./components/VitalsCard";
import AlertLog from "./components/AlertLog";
import { startMockStream } from "./services/mockData";

const initialWatches = ["W001", "W002", "W003"];

export default function App() {
  const [watches, setWatches] = useState(initialWatches);
  const [newWatchId, setNewWatchId] = useState("");

  // vitals map: { "W001": [...], "W002": [...], ... }
  const [vitalsByWatch, setVitalsByWatch] = useState(() => {
    const map = {};
    initialWatches.forEach(id => (map[id] = []));
    return map;
  });

  const [alerts, setAlerts] = useState([]);

  const addWatch = () => {
    if (!newWatchId.trim() || watches.includes(newWatchId.trim())) return;
    const id = newWatchId.trim().toUpperCase();
    setWatches(prev => [...prev, id]);
    setVitalsByWatch(prev => ({ ...prev, [id]: [] }));
    setNewWatchId("");
  };

  const removeWatch = (id) => {
    setWatches(prev => prev.filter(w => w !== id));
    setVitalsByWatch(prev => {
      const newMap = { ...prev };
      delete newMap[id];
      return newMap;
    });
    setAlerts(prev => {
      const newAlerts = { ...prev };
      delete newAlerts[id];
      return newAlerts;
    });
  };

  useEffect(() => {
    const stop = startMockStream(watches, (deviceId, sample) => {
      setVitalsByWatch(prev => {
        const arr = (prev[deviceId] || []).slice(-119);
        arr.push(sample);
        return { ...prev, [deviceId]: arr };
      });

      if (sample.hr > 120 || sample.hr < 50 || sample.spo2 < 92) {
        setAlerts(prev => ({
          ...prev,
          [deviceId]: {
            ts: sample.ts,
            deviceId,
            hr: sample.hr,
            spo2: sample.spo2
          }
        }));
      } else {
        setAlerts(prev => {
          const newAlerts = { ...prev };
          delete newAlerts[deviceId];
          return newAlerts;
        });
      }
    });

    return () => stop();
  }, [watches]);

  return (
    <div className="app">
      <header style={{ marginBottom: "20px" }}>
        <h1>Wearable Health Watch</h1>
        <div>
          <input
            type="text"
            placeholder="Watch ID (e.g., W004)"
            value={newWatchId}
            onChange={(e) => setNewWatchId(e.target.value)}
          />
          <button onClick={addWatch}>Add Watch</button>
        </div>
      </header>
      <main style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {watches.map(id => (
          <VitalsCard 
            key={id} 
            watchId={id} 
            vitals={vitalsByWatch[id] || []}
            onRemove={() => removeWatch(id)}
          />
        ))}
      </main>

      <aside className="right">
        <AlertLog alerts={alerts} />
      </aside>
    </div>
  );
}

