import { useState } from 'react';

export default function ChipsInput({ values = [], onChange, suggestions = [], placeholder = 'Type and press Enter' }) {
    const [inputValue, setInputValue] = useState('');

    const addChip = (value) => {
        const trimmed = value.trim();
        if (trimmed && !values.includes(trimmed)) {
            onChange([...values, trimmed]);
        }
        setInputValue('');
    };

    const removeChip = (index) => {
        onChange(values.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addChip(inputValue);
        }
        if (e.key === 'Backspace' && !inputValue && values.length > 0) {
            removeChip(values.length - 1);
        }
    };

    const availableSuggestions = suggestions.filter((s) => !values.includes(s));

    return (
        <div>
            <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-light)] min-h-[42px] focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all">
                {values.map((chip, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-[var(--primary)]/20 text-[var(--primary-light)] text-xs font-medium px-2.5 py-1 rounded-full">
                        {chip}
                        <button type="button" onClick={() => removeChip(i)} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-[var(--primary-light)] text-xs ml-0.5">
                            ×
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={values.length === 0 ? placeholder : ''}
                    className="flex-1 min-w-[100px] bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
            </div>
            {availableSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {availableSuggestions.slice(0, 8).map((s) => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => addChip(s)}
                            className="text-xs px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary-light)] transition-all cursor-pointer bg-transparent"
                        >
                            + {s}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
