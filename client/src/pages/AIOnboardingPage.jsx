import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';

export default function AIOnboardingPage() {
    const navigate = useNavigate();
    const { templateId } = useParams();
    const { dispatch } = useResume();

    const [currentStep, setCurrentStep] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);

    // AI Chat/Form State
    const [answers, setAnswers] = useState({
        targetRole: '',
        recentExperience: '',
        coreSkills: '',
        education: ''
    });

    // In a real app, this would be a dynamic array based on the chosen template
    const questions = [
        {
            id: 'targetRole',
            title: "What's your target job title?",
            subtitle: "We'll tailor the ATS keywords to this specific role.",
            placeholder: "e.g. Senior Frontend Developer"
        },
        {
            id: 'coreSkills',
            title: "What are your core hard skills?",
            subtitle: "List a few technologies, tools, or methodologies you excel at.",
            placeholder: "e.g. React, Node.js, System Design, Agile"
        },
        {
            id: 'recentExperience',
            title: "Tell us about your most recent role.",
            subtitle: "Don't worry about sounding professional. Just tell us what you did and your biggest achievement! The AI will rewrite it completely.",
            placeholder: "I worked at TechCorp for 2 years. I built their main dashboard using React and speed up load times by 40%...",
            isTextarea: true
        }
    ];

    const currentQuestion = questions[currentStep];

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleGenerate();
        }
    };

    const handleGenerate = () => {
        setIsGenerating(true);

        // Simulating an API call to an LLM
        setTimeout(() => {
            // Here is where we would dispatch the perfectly formatted AI response
            // into the global ResumeContext state!

            // For now, we'll store basic dummy data just to prove the flow works
            dispatch({
                type: 'UPDATE_PERSONAL_INFO',
                payload: { jobTitle: answers.targetRole }
            });

            // Navigate to the final download-ready builder
            navigate('/builder');
        }, 3500);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col relative overflow-hidden selection:bg-indigo-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] pointer-events-none" />
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Navbar minimalist header */}
            <div className="pt-8 px-8 relative z-10 w-full flex justify-between items-center max-w-5xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 p-[1px] shadow-lg shadow-indigo-500/20">
                        <div className="w-full h-full bg-[#0f172a] rounded-xl flex items-center justify-center font-black text-xl text-white">
                            R
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/templates')}
                    className="text-slate-400 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase monospace"
                >
                    Cancel
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-3xl mx-auto">

                {isGenerating ? (
                    <div className="flex flex-col items-center justify-center text-center fade-in">
                        <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                            <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
                            <div className="text-4xl">✨</div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-white">
                            Analyzing & Formatting...
                        </h2>
                        <p className="text-slate-400 text-lg monospace uppercase tracking-widest max-w-lg leading-relaxed">
                            [ System_Msg: Injecting ATS-optimized terminology and structuring layout ]
                        </p>
                    </div>
                ) : (
                    <div className="w-full flex flex-col fade-in">
                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-slate-800 rounded-full mb-12 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500"
                                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                            />
                        </div>

                        {/* Question Header */}
                        <div className="mb-10 text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-white leading-tight">
                                {currentQuestion.title}
                            </h2>
                            <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
                                {currentQuestion.subtitle}
                            </p>
                        </div>

                        {/* Input Area */}
                        <div className="mb-12">
                            {currentQuestion.isTextarea ? (
                                <textarea
                                    autoFocus
                                    value={answers[currentQuestion.id]}
                                    onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.ctrlKey) handleNext();
                                    }}
                                    placeholder={currentQuestion.placeholder}
                                    className="w-full h-48 bg-[#0f172a]/80 border border-slate-700 hover:border-slate-500 focus:border-indigo-500 rounded-2xl p-6 text-white text-lg placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none shadow-inner"
                                />
                            ) : (
                                <input
                                    type="text"
                                    autoFocus
                                    value={answers[currentQuestion.id]}
                                    onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleNext();
                                    }}
                                    placeholder={currentQuestion.placeholder}
                                    className="w-full bg-[#0f172a]/80 border border-slate-700 hover:border-slate-500 focus:border-indigo-500 rounded-2xl p-6 text-white text-xl placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner"
                                />
                            )}
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : navigate(-1)}
                                className="text-slate-400 hover:text-white transition-colors font-medium px-6 py-3 rounded-full hover:bg-slate-800/50"
                            >
                                ← Back
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={!answers[currentQuestion.id]}
                                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] px-8 py-4 rounded-full font-bold tracking-wide transition-all duration-300 flex items-center gap-3 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0"
                            >
                                {currentStep === questions.length - 1 ? 'Generate Resume ✨' : 'Continue →'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
