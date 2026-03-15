import { createContext, useContext, useReducer } from 'react';

const ResumeContext = createContext(null);

const initialState = {
    templateType: null,
    templateId: null,
    templateSections: [], // Sections defined by the selected template
    templateColor: null,
    formSchema: null,
    sections: {},
    activeSection: 0,
    isPreviewDirty: false,
    resumeId: null,
    title: 'Untitled Resume',
    atsScore: null,
    atsFeedback: [],
};

function resumeReducer(state, action) {
    switch (action.type) {
        case 'SET_TEMPLATE':
            return {
                ...state,
                templateType: action.payload.type,
                templateId: action.payload.id,
                templateSections: action.payload.sections || [],
                templateColor: action.payload.color || null
            };
        case 'SET_FORM_SCHEMA':
            return { ...state, formSchema: action.payload };
        case 'REORDER_SECTIONS': {
            if (!state.formSchema || !state.formSchema.sections) return state;
            const newSections = [...state.formSchema.sections];
            const [movedItem] = newSections.splice(action.payload.oldIndex, 1);
            newSections.splice(action.payload.newIndex, 0, movedItem);
            return {
                ...state,
                formSchema: {
                    ...state.formSchema,
                    sections: newSections
                },
                isPreviewDirty: true
            };
        }
        case 'SET_RESUME_ID':
            return { ...state, resumeId: action.payload };
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'UPDATE_FIELD': {
            const { section, field, value } = action.payload;
            return {
                ...state,
                isPreviewDirty: true,
                sections: {
                    ...state.sections,
                    [section]: { ...state.sections[section], [field]: value },
                },
            };
        }
        case 'UPDATE_SECTION':
            return {
                ...state,
                isPreviewDirty: true,
                sections: { ...state.sections, [action.payload.section]: action.payload.data },
            };
        case 'ADD_ENTRY': {
            const sectionData = state.sections[action.payload] || [];
            return {
                ...state,
                sections: { ...state.sections, [action.payload]: [...(Array.isArray(sectionData) ? sectionData : [sectionData]), {}] },
            };
        }
        case 'REMOVE_ENTRY': {
            const { section, index } = action.payload;
            const items = [...(state.sections[section] || [])];
            items.splice(index, 1);
            return { ...state, sections: { ...state.sections, [section]: items }, isPreviewDirty: true };
        }
        case 'UPDATE_ENTRY': {
            const { section, index, field, value } = action.payload;
            const entries = [...(state.sections[section] || [])];
            entries[index] = { ...entries[index], [field]: value };
            return { ...state, sections: { ...state.sections, [section]: entries }, isPreviewDirty: true };
        }
        case 'REPLACE_CONTENT':
            return { ...state, sections: { ...state.sections, ...action.payload }, isPreviewDirty: true };
        case 'SET_ATS_SCORE':
            return { ...state, atsScore: action.payload.score, atsFeedback: action.payload.feedback };
        case 'LOAD_RESUME':
            return { ...state, ...action.payload, isPreviewDirty: false };
        case 'SET_ACTIVE_SECTION':
            return { ...state, activeSection: action.payload };
        case 'MARK_CLEAN':
            return { ...state, isPreviewDirty: false };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export function ResumeProvider({ children }) {
    const [state, dispatch] = useReducer(resumeReducer, initialState);
    return (
        <ResumeContext.Provider value={{ state, dispatch }}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (!context) throw new Error('useResume must be used within ResumeProvider');
    return context;
}

export default ResumeContext;
