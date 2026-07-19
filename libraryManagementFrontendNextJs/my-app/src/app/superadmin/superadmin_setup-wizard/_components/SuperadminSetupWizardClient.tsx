'use client';
// RESPONSIBILITY: Renders the SuperadminSetupWizardClient component.
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster } from 'react-hot-toast';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';
import { useState } from 'react';
import {
  BookOpen, Check, Plus, Trash2, ChevronRight, ChevronLeft,
  Rocket, SkipForward, LayoutDashboard, X, AlertTriangle, CheckCircle
} from 'lucide-react';
import {
  branchDetailsSchema, type BranchDetailsData,
  shiftsSchema,       type ShiftsData,
  seatsSchema,        type SeatsData,
  plansSchema,        type PlansData,
} from '@/app/superadmin/superadmin_shared_components/Superadminsuperadmin_schema';
import { SETUP_WIZARD_DATA as d } from '@/app/superadmin/superadmin_setup-wizard/Superadminsuperadmin_setupWizard_constants';

const STEPS = [
  { num: 1, title: 'Branch Details', desc: 'Library info & address' },
  { num: 2, title: 'Define Shifts',  desc: 'Set time slots' },
  { num: 3, title: 'Add Seats',      desc: 'Configure capacity' },
  { num: 4, title: 'Fee Plans',      desc: 'Subscription pricing' },
  { num: 5, title: 'Launch',         desc: 'Review & go live' },
];

import { SuperadminSetupWizardStep1 } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setup_wizard_components/SuperadminSetupWizardStep1';
import { SuperadminSetupWizardStep2 } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setup_wizard_components/SuperadminSetupWizardStep2';
import { SuperadminSetupWizardStep3 } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setup_wizard_components/SuperadminSetupWizardStep3';
import { SuperadminSetupWizardStep4 } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setup_wizard_components/SuperadminSetupWizardStep4';

// â”€â”€â”€â”€ Main Wizard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function SuperadminSetupWizardClient() {
  const [step,          setStep]          = useState(1);
  const [launching,     setLaunching]     = useState(false);
  const [launched,      setLaunched]      = useState(false);
  const [showSkipModal, setShowSkipModal] = useState(false);

  const [branch, setBranch] = useState<BranchDetailsData>({
    name: d.libraryName, address: d.address, city: d.city, gst: d.gst,
  });
  const [shifts, setShifts] = useState<ShiftsData>({ shifts: d.shifts });
  const [seats,  setSeats]  = useState<SeatsData>({ count: d.seatCount, prefix: d.seatPrefix });
  const [plans,  setPlans]  = useState<PlansData>({ plans: d.plans });

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const nextStep = () => setStep(s => Math.min(STEPS.length, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleLaunch = async () => {
    setLaunching(true);
    await new Promise(res => setTimeout(res, 2000));
    setLaunched(true);
    setTimeout(() => { window.location.href = SUPERADMIN_ROUTES.DASHBOARD; }, 1000);
  };

  const handleSkipToDashboard = () => {
    window.location.href = SUPERADMIN_ROUTES.DASHBOARD;
  };

  return (
    <div className="h-screen w-full flex bg-base overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none opacity-50" />

      {/* â”€â”€ SKIP CONFIRMATION MODAL â”€â”€ */}
      {showSkipModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card max-w-md w-full rounded-2xl shadow-2xl p-6 relative border border-border flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-warning-bg/50 flex items-center justify-center mb-4">
              <AlertTriangle size={22} className="text-warning" />
            </div>

            <h3 className="text-xl font-bold text-text-primary mb-2">Skip Library Setup?</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Your library will have{' '}
              <strong>no shifts, no seats, and no fee plans</strong>{' '}
              configured.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              You can complete setup anytime from{' '}
              <span className="font-medium text-text-primary underline decoration-border underline-offset-4">Dashboard â†’ Settings â†’ Setup Wizard</span>.
            </p>

            <div className="w-full bg-card rounded-xl p-4 text-left space-y-3 mb-6">
              {[
                { icon: <AlertTriangle size={16} className="text-warning" />, text: 'Students cannot be admitted without seats & shifts' },
                { icon: <AlertTriangle size={16} className="text-warning" />, text: 'Fee collection requires at least one active plan' },
                { icon: <CheckCircle size={16} className="text-success" />, text: 'You can still explore the dashboard and admin panel' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="shrink-0 mt-0.5">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="flex w-full gap-3">
              <button
                id="skip-cancel-btn"
                type="button"
                onClick={() => setShowSkipModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-border text-text-secondary bg-transparent hover:bg-card hover:text-text-primary flex-1 py-2.5"
              >
                Continue Setup
              </button>
              <button
                id="skip-confirm-btn"
                type="button"
                onClick={handleSkipToDashboard}
                className="flex-[2] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-danger text-white hover:bg-danger-hover transition-colors"
              >
                <LayoutDashboard size={15} /> Go to Dashboard
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowSkipModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-card text-text-secondary hover:text-danger transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* â”€â”€ STEPPER SIDEBAR â”€â”€ */}
      <aside className="w-72 shrink-0 border-r border-border bg-card/50 backdrop-blur flex-col p-6 z-10 hidden md:flex">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple flex items-center justify-center shadow-lg shadow-primary/30">
            <BookOpen size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-text-primary tracking-tight">Setup Wizard</span>
        </div>

        <div className="space-y-1">
          {STEPS.map((s, i) => {
            const isActive = s.num === step;
            const isDone   = s.num < step;
            return (
              <div key={s.num} className="relative">
                {i < STEPS.length - 1 && (
                  <div className={`absolute left-3 top-8 bottom-[-10px] w-0.5 bg-border transition-colors duration-500 ${isDone ? 'bg-primary' : ''}`} />
                )}
                <div className={`flex gap-4 py-3 relative z-10 opacity-60 transition-opacity ${isActive ? 'opacity-100' : ''}`}>
                  <div className={`w-6 h-6 rounded-full border-2 bg-card flex items-center justify-center transition-colors shrink-0 border-border ${isDone ? 'bg-primary border-primary' : isActive ? 'border-primary ring-4 ring-primary/20' : ''}`}>
                    {isDone
                      ? <Check size={14} className="text-white" />
                      : <span className={`text-xs font-bold text-text-tertiary ${isActive ? 'text-primary' : ''}`}>{s.num}</span>
                    }
                  </div>
                  <div>
                    <p className={`text-sm font-semibold text-text-primary transition-colors ${isActive ? 'text-primary' : isDone ? 'text-text-primary' : ''}`}>
                      {s.title}
                    </p>
                    <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto space-y-3">
          <div className="p-3 rounded-lg bg-info-bg/50 border border-info/20 text-sm text-info font-medium leading-relaxed">
            ðŸ’¡ You can update these settings anytime from your dashboard.
          </div>
          <button
            id="skip-setup-sidebar-btn"
            type="button"
            onClick={() => setShowSkipModal(true)}
            className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors hover:bg-card rounded-md"
          >
            <SkipForward size={12} /> Skip setup for now
          </button>
        </div>
      </aside>

      {/* â”€â”€ MAIN CONTENT â”€â”€ */}
      <main className="flex-1 flex flex-col">
        <div className="h-14 border-b border-border bg-card/80 backdrop-blur flex items-center justify-between px-6 shrink-0 md:hidden">
          <div className="h-1.5 w-32 bg-border rounded-full overflow-hidden">
            {/* âœ… RULE 3 â€” dynamic computed width */}
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <button
            id="skip-setup-btn"
            type="button"
            onClick={() => setShowSkipModal(true)}
            className="text-xs font-medium text-text-tertiary hover:text-text-primary flex items-center gap-1.5"
          >
            <SkipForward size={13} /> Skip Setup
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10 scrollbar-thin">
          <div className="max-w-2xl mx-auto w-full">
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">Step {step} of {STEPS.length}</p>
              <h2 className="text-text-primary text-xl font-bold text-text-primary">{STEPS[step - 1].title}</h2>
            </div>

            {step === 1 && <SuperadminSetupWizardStep1 onNext={d => { setBranch(d); nextStep(); }} />}
            {step === 2 && <SuperadminSetupWizardStep2 onNext={d => { setShifts(d); nextStep(); }} />}
            {step === 3 && <SuperadminSetupWizardStep3 onNext={d => { setSeats(d);  nextStep(); }} />}
            {step === 4 && <SuperadminSetupWizardStep4 onNext={d => { setPlans(d);  nextStep(); }} />}

            {/* â”€â”€ Step 5: Launch â”€â”€ */}
            {step === 5 && (
              <div className="space-y-5">
                <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                  <h3 className="text-lg font-bold text-text-primary mb-1">{branch.name}</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    {branch.address}, {branch.city}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border bg-info-bg border-info/20 text-info">
                      â° {shifts.shifts.length} Shifts Added
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border bg-warning-bg border-warning/20 text-warning">
                      ðŸª‘ {seats.count} Seats Created
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border bg-success-bg border-success/20 text-success">
                      ðŸ’³ {plans.plans.length} Plans Ready
                    </span>
                    {branch.gst && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border bg-purple/10 border-purple/20 text-purple">
                        ðŸ§¾ GST Enabled
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
                  <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-3">Shifts</p>
                  <div className="flex flex-wrap gap-2">
                    {shifts.shifts.map(( s ) => (
                      <span key={s.name} className="text-xs font-medium text-text-secondary bg-card px-2 py-1 rounded border border-border">
                        {s.name}: {s.start} â€“ {s.end}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
                  <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-3">Fee Plans</p>
                  <div className="flex flex-wrap gap-2">
                    {plans.plans.map(( pl ) => (
                      <span key={pl.name} className="text-xs font-medium text-text-secondary bg-card px-2 py-1 rounded border border-border">
                        {pl.name} Â· {pl.days}d Â· â‚¹{pl.price}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  id="launch-dashboard-btn"
                  type="button"
                  onClick={handleLaunch}
                  disabled={launching || launched}
                  className={`w-full py-3.5 rounded-xl text-white font-bold shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 active:translate-y-0 transition-all flex items-center justify-center gap-2 text-base bg-primary ${launched ? 'bg-success hover:-translate-y-0 shadow-none hover:shadow-none' : ''}`}
                >
                  {launched ? (
                    <><Check size={20} /> Launched! Redirecting...</>
                  ) : launching ? (
                    <><span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />Setting up your library...</>
                  ) : (
                    <><Rocket size={20} /> ðŸš€ Launch Dashboard</>
                  )}
                </button>
              </div>
            )}

            {/* â”€â”€ FOOTER NAV â”€â”€ */}
            {step !== 5 ? (
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <button
                  type="button"
                  id="wizard-back-btn"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="px-3 py-1.5 text-sm rounded-lg font-medium transition-colors border border-border text-text-secondary bg-transparent hover:bg-card hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <span className="text-xs font-medium text-text-secondary">Step {step} of {STEPS.length}</span>
                <button
                  type="submit"
                  id="wizard-next-btn"
                  form={`step${step}-form`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:brightness-110 active:scale-95 transition-all"
                >
                  Next Step <ChevronRight size={16} />
                </button>
              </div>
            ) : (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors underline decoration-border underline-offset-4"
                >
                  â† Back to Fee Plans
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

