import { useState } from 'react';
import ChipsInput from './ChipsInput';
import { Sparkles, Loader2 } from 'lucide-react';
import aiService from '../../services/aiService';
import toast from 'react-hot-toast';

export default function FormField({ field, value, onChange }) {
    const { id, label, type, placeholder, required, helpText, suggestions, options } = field;
    const [isImproving, setIsImproving] = useState(false);

    const handleImproveWithAI = async () => {
        if (!value || value.trim().length < 10) {
            toast.error('Please write at least a few words to improve.');
            return;
        }
        setIsImproving(true);
        try {
            const result = await aiService.improveContent(value, `context for improving ${label}`);
            if (result && result.improvedText) {
                onChange(result.improvedText);
                toast.success('Improved with AI!');
            } else if (result && result.data && result.data.improvedText) {
                onChange(result.data.improvedText);
                toast.success('Improved with AI!');
            } else if (result && result.data) {
                onChange(result.data);
                toast.success('Improved with AI!');
            }
        } catch (error) {
            toast.error('Failed to improve content.');
        } finally {
            setIsImproving(false);
        }
    };

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
                <div className="flex items-center justify-between">
                    <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary)]">
                        {label}
                        {required && <span className="text-[var(--danger)] ml-1">*</span>}
                    </label>
                    {type === 'textarea' && (
                        <button
                            type="button"
                            onClick={handleImproveWithAI}
                            disabled={isImproving || !value}
                            className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md transition-colors 
                                ${!value ? 'text-[var(--text-muted)] cursor-not-allowed' : 'text-purple-400 hover:text-purple-300 hover:bg-purple-400/10'}`}
                        >
                            {isImproving ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                            {isImproving ? 'Improving...' : 'Improve with AI'}
                        </button>
                    )}
                </div>
            )}
            {renderField()}
            {helpText && (
                <p className="text-xs text-[var(--text-muted)]">💡 {helpText}</p>
            )}
        </div>
    );
}
