'use client';

import { useRef } from 'react';

interface OtpCodeInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
}

export default function OtpCodeInput({
  length = 4,
  value,
  onChange,
}: OtpCodeInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const setDigit = (index: number, digit: string) => {
    const next = [...value];
    next[index] = digit;
    onChange(next);
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1);
    setDigit(index, digit);
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '');
    if (!pasted) return;
    event.preventDefault();
    const next = Array.from({ length }, (_, i) => pasted[i] ?? value[i] ?? '');
    onChange(next);
    const lastFilled = Math.min(pasted.length, length) - 1;
    inputRefs.current[Math.max(lastFilled, 0)]?.focus();
  };

  return (
    <div className="flex gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] ?? ''}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          className="h-14 w-14 rounded-md border border-gray-300 bg-white text-center text-lg font-semibold text-gray-900 focus:border-green-500 focus:outline-none"
        />
      ))}
    </div>
  );
}
