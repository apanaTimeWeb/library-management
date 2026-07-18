'use client';
// RESPONSIBILITY: Visually indicates password strength.
// DATA FLOW: Props -> AuthPasswordStrengthMeter (`Rule 39`).



const SEGMENT_CLASS: Record<number, string> = {
  1: 'bg-danger',
  2: 'bg-warning',
  3: 'bg-success',
  4: 'bg-success',
};

const LABEL: Record<number, { text: string; colorClass: string }> = {
  1: { text: 'Weak',   colorClass: 'text-danger'  },
  2: { text: 'Fair',   colorClass: 'text-warning'  },
  3: { text: 'Good',   colorClass: 'text-success'  },
  4: { text: 'Strong', colorClass: 'text-success'  },
};

function calcScore(pwd: string): 0 | 1 | 2 | 3 | 4 {
  let s = 0;
  if (pwd.length >= 8)          s++;
  if (/[A-Z]/.test(pwd))        s++;
  if (/[0-9]/.test(pwd))        s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return s as 0 | 1 | 2 | 3 | 4;
}

export default function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;
  const score = calcScore(password);
  const segClass = SEGMENT_CLASS[score] ?? '';
  const label = LABEL[score];

  return (
    <div className="pt-2 space-y-1.5">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${i < score ? segClass : 'bg-bg-pageorder'}`}
          />
        ))}
      </div>
      {label && (
        <p className={`text-xs font-semibold uppercase tracking-wider ${label.colorClass}`}>
          {label.text}
        </p>
      )}
    </div>
  );
}
