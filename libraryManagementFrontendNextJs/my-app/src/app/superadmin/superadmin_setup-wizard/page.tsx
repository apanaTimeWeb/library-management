'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
} from '@/app/superadmin/superadmin_shared_components/superadmin_schema';
import { SETUP_WIZARD_DATA as d } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setupWizard_constants';

const STEPS = [
  { num: 1, title: 'Branch Details', desc: 'Library info & address' },
  { num: 2, title: 'Define Shifts',  desc: 'Set time slots' },
  { num: 3, title: 'Add Seats',      desc: 'Configure capacity' },
  { num: 4, title: 'Fee Plans',      desc: 'Subscription pricing' },
  { num: 5, title: 'Launch',         desc: 'Review & go live' },
];

const inputCls = (hasErr?: boolean) => `sa-input${hasErr ? ' sa-input--error' : ''}`;

import { SuperadminSetupWizardStep1 } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setup_wizard_components/SuperadminSetupWizardStep1';
import { SuperadminSetupWizardStep2 } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setup_wizard_components/SuperadminSetupWizardStep2';
import { SuperadminSetupWizardStep3 } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setup_wizard_components/SuperadminSetupWizardStep3';
import { SuperadminSetupWizardStep4 } from '@/app/superadmin/superadmin_setup-wizard/superadmin_setup_wizard_components/SuperadminSetupWizardStep4';

// ──── Main Wizard ─────────────────────────────────────────────────────────────
export default function SetupWizardPage() {
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

  // ✅ RULE 3 — dynamic computed width is the ONLY style prop allowed
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const nextStep = () => setStep(s => Math.min(STEPS.length, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleLaunch = async () => {
    setLaunching(true);
    await new Promise(res => setTimeout(res, 2000));
    setLaunched(true);
    setTimeout(() => { window.location.href = '/superadmin/superadmin_dashboard'; }, 1000);
  };

  const handleSkipToDashboard = () => {
    window.location.href = '/superadmin/superadmin_dashboard';
  };

  return (
    <div className="sa-wizard-shell">
      <div className="sa-wizard-glow" />

      {/* ── SKIP CONFIRMATION MODAL ── */}
      {showSkipModal && (
        <div className="sa-wizard-modal-overlay">
          <div className="sa-wizard-modal">
            <div className="sa-wizard-modal-icon">
              <AlertTriangle size={22} className="sa-metric--warning" />
            </div>

            <h3 className="sa-wizard-modal-title">Skip Library Setup?</h3>
            <p className="sa-wizard-modal-desc">
              Your library will have{' '}
              <strong>no shifts, no seats, and no fee plans</strong>{' '}
              configured.
            </p>
            <p className="sa-wizard-modal-desc">
              You can complete setup anytime from{' '}
              <span className="sa-wizard-modal-desc-link">Dashboard → Settings → Setup Wizard</span>.
            </p>

            <div className="sa-wizard-modal-consequences">
              {[
                { icon: <AlertTriangle size={16} className="text-warning-base" />, text: 'Students cannot be admitted without seats & shifts' },
                { icon: <AlertTriangle size={16} className="text-warning-base" />, text: 'Fee collection requires at least one active plan' },
                { icon: <CheckCircle size={16} className="text-success-base" />, text: 'You can still explore the dashboard and admin panel' },
              ].map(({ icon, text }) => (
                <div key={text} className="sa-wizard-consequence-chip">
                  <span className="sa-wizard-consequence-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                id="skip-cancel-btn"
                type="button"
                onClick={() => setShowSkipModal(false)}
                className="sa-btn-ghost flex-1 py-2.5"
              >
                Continue Setup
              </button>
              <button
                id="skip-confirm-btn"
                type="button"
                onClick={handleSkipToDashboard}
                className="sa-wizard-modal-go-btn"
              >
                <LayoutDashboard size={15} /> Go to Dashboard
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowSkipModal(false)}
              className="sa-wizard-modal-close"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEPPER SIDEBAR ── */}
      <aside className="sa-wizard-sidebar">
        <div className="sa-wizard-logo-area">
          <div className="sa-wizard-logo-box">
            <BookOpen size={18} className="text-white" />
          </div>
          <span className="sa-wizard-logo-title">Setup Wizard</span>
        </div>

        <div className="space-y-1">
          {STEPS.map((s, i) => {
            const isActive = s.num === step;
            const isDone   = s.num < step;
            return (
              <div key={s.num} className="relative">
                {i < STEPS.length - 1 && (
                  <div className={`sa-step-connector ${isDone ? 'sa-step-connector--done' : ''}`} />
                )}
                <div className={`sa-step-item ${isActive ? 'sa-step-item--active' : ''}`}>
                  <div className={`sa-step-dot ${isDone ? 'sa-step-dot--done' : isActive ? 'sa-step-dot--active' : ''}`}>
                    {isDone
                      ? <Check size={14} className="text-white" />
                      : <span className={`sa-wizard-step-num-badge ${isActive ? 'sa-wizard-step-num-badge--active' : ''}`}>{s.num}</span>
                    }
                  </div>
                  <div>
                    <p className={`sa-step-label ${isActive ? 'sa-step-label--active' : isDone ? 'sa-step-label--done' : ''}`}>
                      {s.title}
                    </p>
                    <p className="sa-wizard-field-label--sm-no-mb">{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto space-y-3">
          <div className="sa-tip-card">
            💡 You can update these settings anytime from your dashboard.
          </div>
          <button
            id="skip-setup-sidebar-btn"
            type="button"
            onClick={() => setShowSkipModal(true)}
            className="sa-wizard-skip-btn"
          >
            <SkipForward size={12} /> Skip setup for now
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex flex-col">
        <div className="sa-wizard-topbar">
          <div className="sa-wizard-progress-track">
            {/* ✅ RULE 3 — dynamic computed width */}
            <div className="sa-wizard-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <button
            id="skip-setup-btn"
            type="button"
            onClick={() => setShowSkipModal(true)}
            className="sa-wizard-topbar-skip"
          >
            <SkipForward size={13} /> Skip Setup
          </button>
        </div>

        <div className="sa-wizard-content-area">
          <div className="sa-wizard-content-inner">
            <div className="sa-wizard-step-header">
              <p className="sa-wizard-step-label">Step {step} of {STEPS.length}</p>
              <h2 className="sa-wizard-step-title">{STEPS[step - 1].title}</h2>
            </div>

            {step === 1 && <SuperadminSetupWizardStep1 onNext={d => { setBranch(d); nextStep(); }} />}
            {step === 2 && <SuperadminSetupWizardStep2 onNext={d => { setShifts(d); nextStep(); }} />}
            {step === 3 && <SuperadminSetupWizardStep3 onNext={d => { setSeats(d);  nextStep(); }} />}
            {step === 4 && <SuperadminSetupWizardStep4 onNext={d => { setPlans(d);  nextStep(); }} />}

            {/* ── Step 5: Launch ── */}
            {step === 5 && (
              <div className="space-y-5">
                <div className="sa-wizard-summary-card">
                  <h3 className="sa-wizard-summary-title">{branch.name}</h3>
                  <p className="sa-wizard-summary-address">
                    {branch.address}, {branch.city}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="sa-wizard-summary-badge sa-wizard-summary-badge--shifts">
                      ⏰ {shifts.shifts.length} Shifts Added
                    </span>
                    <span className="sa-wizard-summary-badge sa-wizard-summary-badge--seats">
                      🪑 {seats.count} Seats Created
                    </span>
                    <span className="sa-wizard-summary-badge sa-wizard-summary-badge--plans">
                      💳 {plans.plans.length} Plans Ready
                    </span>
                    {branch.gst && (
                      <span className="sa-wizard-summary-badge sa-wizard-summary-badge--gst">
                        🧾 GST Enabled
                      </span>
                    )}
                  </div>
                </div>

                <div className="sa-wizard-shifts-preview">
                  <p className="sa-wizard-preview-section-label">Shifts</p>
                  <div className="flex flex-wrap gap-2">
                    {shifts.shifts.map(( s ) => (
                      <span key={s.name} className="sa-wizard-preview-chip">
                        {s.name}: {s.start} – {s.end}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="sa-wizard-plans-preview">
                  <p className="sa-wizard-preview-section-label">Fee Plans</p>
                  <div className="flex flex-wrap gap-2">
                    {plans.plans.map(( pl ) => (
                      <span key={pl.name} className="sa-wizard-preview-chip">
                        {pl.name} · {pl.days}d · ₹{pl.price}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  id="launch-dashboard-btn"
                  type="button"
                  onClick={handleLaunch}
                  disabled={launching || launched}
                  className={`sa-wizard-launch-btn ${launched ? 'sa-wizard-launch-btn--done' : ''}`}
                >
                  {launched ? (
                    <><Check size={20} /> Launched! Redirecting...</>
                  ) : launching ? (
                    <><span className="sa-wizard-launch-spinner" />Setting up your library...</>
                  ) : (
                    <><Rocket size={20} /> 🚀 Launch Dashboard</>
                  )}
                </button>
              </div>
            )}

            {/* ── FOOTER NAV ── */}
            {step !== 5 ? (
              <div className="sa-wizard-footer">
                <button
                  type="button"
                  id="wizard-back-btn"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="sa-btn-ghost sa-btn-ghost--sm disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <span className="sa-wizard-footer-step-count">Step {step} of {STEPS.length}</span>
                <button
                  type="submit"
                  id="wizard-next-btn"
                  form={`step${step}-form`}
                  className="sa-wizard-next-btn"
                >
                  Next Step <ChevronRight size={16} />
                </button>
              </div>
            ) : (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={prevStep}
                  className="sa-wizard-back-link"
                >
                  ← Back to Fee Plans
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
