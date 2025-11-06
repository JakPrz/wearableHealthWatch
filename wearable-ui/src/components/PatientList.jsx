export default function PatientList({ patients, selected, onSelect }) {
  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map(p => (
          <li
            key={p.id}
            style={{ fontWeight: p.id === selected.id ? "bold" : "normal", cursor: "pointer" }}
            onClick={() => onSelect(p)}
          >
            {p.name} (Age: {p.age})
          </li>
        ))}
      </ul>
    </div>
  );
}
