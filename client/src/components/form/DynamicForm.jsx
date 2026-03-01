import FormField from './FormField';
import { useResume } from '../../context/ResumeContext';

export default function DynamicForm({ schema }) {
    const { state, dispatch } = useResume();

    if (!schema || !schema.sections) return null;

    return (
        <div className="space-y-6">
            {schema.sections.map((section, sectionIndex) => (
                <div
                    key={section.id}
                    className="glass rounded-xl p-5 fade-in"
                    style={{ animationDelay: `${sectionIndex * 50}ms` }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">{section.icon}</span>
                        <h3 className="text-base font-semibold">{section.title}</h3>
                        {section.description && (
                            <span className="text-xs text-[var(--text-muted)] ml-auto">{section.description}</span>
                        )}
                    </div>

                    {section.repeatable ? (
                        <RepeatableSection section={section} state={state} dispatch={dispatch} />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {section.fields.map((field) => (
                                <div key={field.id} className={field.type === 'textarea' || field.type === 'chips' ? 'md:col-span-2' : ''}>
                                    <FormField
                                        field={field}
                                        value={state.sections?.[section.id]?.[field.id]}
                                        onChange={(val) =>
                                            dispatch({
                                                type: 'UPDATE_FIELD',
                                                payload: { section: section.id, field: field.id, value: val },
                                            })
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

function RepeatableSection({ section, state, dispatch }) {
    const entries = state.sections?.[section.id];
    const items = Array.isArray(entries) ? entries : entries ? [entries] : [{}];

    return (
        <div className="space-y-4">
            {items.map((entry, index) => (
                <div key={index} className="border border-[var(--border)] rounded-lg p-4 relative">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-[var(--text-muted)]">#{index + 1}</span>
                        {items.length > 1 && (
                            <button
                                type="button"
                                onClick={() => dispatch({ type: 'REMOVE_ENTRY', payload: { section: section.id, index } })}
                                className="text-xs text-[var(--danger)] hover:underline cursor-pointer bg-transparent border-none"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {section.fields.map((field) => (
                            <div key={field.id} className={field.type === 'textarea' || field.type === 'chips' ? 'md:col-span-2' : ''}>
                                <FormField
                                    field={field}
                                    value={entry?.[field.id]}
                                    onChange={(val) =>
                                        dispatch({
                                            type: 'UPDATE_ENTRY',
                                            payload: { section: section.id, index, field: field.id, value: val },
                                        })
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={() => dispatch({ type: 'ADD_ENTRY', payload: section.id })}
                className="btn-secondary w-full justify-center text-sm"
            >
                + Add Another {section.title}
            </button>
        </div>
    );
}
