export const singleFormPresets = {
  default: {
    form: "space-y-6 max-w-3xl mx-auto bg-white p-6 rounded-lg border border-slate-200 shadow-sm",
    buttonsWrapper: "flex justify-end gap-2 pt-4 border-t border-slate-100",
  },
};

export const multiFormPresets = {
  minimal: {
    form: "w-full max-w-4xl mx-auto bg-white text-zinc-900 p-8 rounded-2xl border border-zinc-200 shadow-xl",
    buttonsWrapper: "flex justify-between mt-10",
    stepper: `<div className="mb-4 space-y-2">
    <div className="flex gap-1 mb-4">
      {steps.map((_, i) => (
        <div
          key={i}
        className={\`h-1 flex-1 rounded-full transition-all duration-500 \${
                  i <= currentStep ? "bg-zinc-900" : "bg-zinc-100"
                }\`}
        />
      ))}
    </div>
    <h2 className="text-2xl font-bold tracking-tight capitalize text-start">
      {currentStepData.title}
    </h2>
  </div>`,
  },
  sidebarStepper: {
    form: "w-full max-w-4xl mx-auto flex bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden min-h-[500px]",
    buttonsWrapper:
      "flex justify-between items-center mt-10 pt-8 border-t border-slate-100",
    step: "flex-1 p-8",
    stepper: `
    <div className="w-72 bg-slate-900 p-8 text-white space-y-8">
      <div className="space-y-1 flex flex-col items-start">
        <h3 className="text-lg font-bold">Registration</h3>
        <p className="text-slate-400 text-xs">Complete all steps to join us.</p>
      </div>
    
      <div className="space-y-6">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep
          const isActive = i === currentStep
    
          return (
            <div key={i} className="flex gap-4 items-center">
              <div className="mt-1">
                {isCompleted ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center text-[10px] font-bold text-slate-900">
                    ✓
                  </div>
                ) : (
                  <div
                    className={
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold " +
                      (isActive
                        ? "border-white bg-white text-slate-900"
                        : "border-slate-700 text-slate-500")
                    }
                  >
                    {i + 1}
                  </div>
                )}
              </div>
    
              <p
                className={
                  "text-xs font-bold uppercase tracking-wider " +
                  (i <= currentStep ? "text-white" : "text-slate-600")
                }
              >
                {step.title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
    `,
  },
  softType: {
    form: "w-full max-w-2xl mx-auto bg-white p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50/50",
    buttonsWrapper: "flex gap-4 mt-10",
    stepper: ` <div className="flex flex-col items-start justify-start mb-4">
          <h2 className="text-xl font-bold text-slate-800">
            Step {currentStep + 1} of {steps.length}
          </h2>
          <p className="text-slate-400 text-sm capitalize">{currentStepData.title}</p>
        </div>`,
  },
  stepperTop: {
    form: "w-full max-w-2xl mx-auto bg-white rounded-2xl border p-8 border-slate-200 shadow-sm overflow-hidden",
    buttonsWrapper: "flex justify-end gap-3 mt-10",
    stepper: `
    <div className="py-6">
      <div className="relative flex justify-between">
        <div className="absolute top-4 left-0 w-full h-0.5 bg-slate-200 z-0">
          <div
            className="h-full bg-slate-600 transition-all duration-500"
            style={{ width: \`\${(currentStep / (steps.length - 1)) * 100}%\` }}
          />
        </div>
    
        {steps.map((step, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center group">
          <div
            className={
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 " +
              (i < currentStep
                ? "bg-slate-600 border-slate-600 text-white"
                : i === currentStep
                ? "bg-white border-slate-600 text-slate-600"
                : "bg-white border-slate-300 text-slate-400")
            }
          >
            {i + 1}
       </div>
        <span
          className={
            "mt-2 text-[10px] font-bold uppercase tracking-wider transition-colors " +
            (i <= currentStep ? "text-slate-600" : "text-slate-400")
          }
        >
          {step.title.split(" ")[0]}
        </span>
        </div>
        ))}
      </div>
    </div>
    `,
  },
};
