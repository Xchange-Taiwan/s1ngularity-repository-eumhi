import React from 'react';

interface AuthTitleProps {
  title: string;
}

export default function AuthTitle({ title }: AuthTitleProps) {
  return (
    <h1 className="text-center text-[32px] font-bold leading-tight">{title}</h1>
  );
}
