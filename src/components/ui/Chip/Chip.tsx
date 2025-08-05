import { ReactNode } from 'react';

export default function Chip({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex w-fit items-center justify-center gap-1 rounded-full border-1 border-solid border-violet-50 px-3 py-2 font-medium text-violet-600">
      {icon}
      <span>{label}:</span>
      <span className="text-violet-900">{value}</span>
    </div>
  );
}
