import React from "react";

export default function SoftwareTools({ softwareTools = [] }) {
  // Ensure there are enough tools to display
  if (softwareTools.length === 0) {
    return null; // Or render a message indicating that there are no tools
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} className="mt-4">
      {softwareTools.map((tool) => (
        <div key={tool._id} style={{ textAlign: 'center', width: 'calc(25% - 20px)' }}>
          <img style={{ width: '100%', maxWidth: '100px' }} src={tool.image} alt={tool.software_name} />
          <p style={{ marginTop: '10px' }}>{tool.software_name}</p>
        </div>
      ))}
    </div>
  );
}
