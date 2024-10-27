import React from 'react';

export default function Divider() {
  return (
    <div className="flex items-center">
      <div className="h-[1px] flex-1 bg-background-border" />
      <p className="flex-0 text-neutral-600 px-2">或</p>
      <div className="h-[1px] flex-1 bg-background-border" />
    </div>
  );
}
