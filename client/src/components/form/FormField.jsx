import ChipsInput from './ChipsInput';

export default function FormField({ field, value, onChange }) {
    const { id, label, type, placeholder, required, helpText, suggestions, options } = field;

    const renderField = () => {
        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        id={id}
                        className="input min-h-[80px] resize-y"
                        placeholder={placeholder}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        required={required}
                    />
                );

            case 'date':
                return (
                    <input
                        id={id}
                        type="month"
                        className="input"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        required={required}
                    />
                );

            case 'chips':
                return (
                    <ChipsInput
                        values={value || []}
                        onChange={onChange}
                        suggestions={suggestions || []}
                        placeholder={placeholder}
                    />
                );

            case 'toggle':
                return (
                    <label className="inline-flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={value || false}
                                onChange={(e) => onChange(e.target.checked)}
                            />
                            <div className="w-10 h-5 rounded-full bg-[var(--surface-lighter)] peer-checked:bg-[var(--primary)] transition-colors" />
                            <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
                        </div>
                        <span className="text-sm text-[var(--text-secondary)]">{label}</span>
                    </label>
                );

            case 'select':
                return (
                    <select
                        id={id}
                        className="input"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        required={required}
                    >
                        <option value="">Select...</option>
                        {(options || []).map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                );

            default: // text
                return (
                    <input
                        id={id}
                        type="text"
                        className="input"
                        placeholder={placeholder}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        required={required}
                    />
                );
        }
    };

    return (
        <div className="space-y-1.5">
            {type !== 'toggle' && (
                <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary)]">
                    {label}
                    {required && <span className="text-[var(--danger)] ml-1">*</span>}
                </label>
            )}
            {renderField()}
            {helpText && (
                <p className="text-xs text-[var(--text-muted)]">💡 {helpText}</p>
            )}
        </div>
    );
}
