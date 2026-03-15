import FormField from './FormField';
import { useResume } from '../../context/ResumeContext';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

function SortableSectionItem({ id, section, sectionIndex, state, dispatch }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="glass rounded-xl p-5 fade-in relative"
        >
            <div className="flex items-center gap-2 mb-4">
                <div {...attributes} {...listeners} className="cursor-grab hover:text-white text-[var(--text-muted)] p-1">
                    <GripVertical size={16} />
                </div>
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
    );
}

export default function DynamicForm({ schema }) {
    const { state, dispatch } = useResume();

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    if (!schema || !schema.sections) return null;

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = schema.sections.findIndex((s) => s.id === active.id);
            const newIndex = schema.sections.findIndex((s) => s.id === over.id);
            dispatch({ type: 'REORDER_SECTIONS', payload: { oldIndex, newIndex } });
        }
    };

    return (
        <div className="space-y-6">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={schema.sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                    {schema.sections.map((section, sectionIndex) => (
                        <SortableSectionItem
                            key={section.id}
                            id={section.id}
                            section={section}
                            sectionIndex={sectionIndex}
                            state={state}
                            dispatch={dispatch}
                        />
                    ))}
                </SortableContext>
            </DndContext>
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
