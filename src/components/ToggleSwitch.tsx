import React, { useState } from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange?: (enabled: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled: initialEnabled, onChange }) => {
  const [enabled, setEnabled] = useState(initialEnabled);

  const handleToggle = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    onChange?.(newEnabled);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? 'bg-blue-500' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};