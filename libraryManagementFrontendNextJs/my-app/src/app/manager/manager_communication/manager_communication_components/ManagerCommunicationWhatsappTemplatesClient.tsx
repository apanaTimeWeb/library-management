'use client';
// RESPONSIBILITY: Renders WhatsApp message templates for automated alerts.
import { useState, useRef } from 'react';
import { Send, X, Save, ChevronRight, Smartphone } from 'lucide-react';
import { Template } from '@/app/manager/manager_communication/manager_communication_types/ManagerCommunicationTypes';
import { INIT_TEMPLATES } from '@/app/manager/manager_communication/manager_communication_constants/ManagerCommunicationConstants';

const MAX_CHARS = 1024;
const VARS = ['{student_name}', '{class}', '{fee_amount}', '{due_date}', '{library_fine}'];

export function ManagerCommunicationWhatsappTemplatesClient() {
  const [templates, setTemplates] = useState<Template[]>(INIT_TEMPLATES as unknown as Template[]);
  const [activeId, setActiveId]   = useState<string>(templates[0].id);
  const [toast, setToast]         = useState('');
  const [showTest, setShowTest]   = useState(false);
  const [testPhone, setTestPhone] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const active = templates.find(t => t.id === activeId) || templates[0];
  const charCount = active.body.length;

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const updateBody = (newBody: string) => {
    setTemplates(prev => prev.map(t => t.id === activeId ? { ...t, body: newBody } : t));
  };

  const insertVar = (v: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const newBody = active.body.substring(0, start) + v + active.body.substring(end);
    if (newBody.length <= MAX_CHARS) {
      updateBody(newBody);
      setTimeout(() => { el.selectionStart = el.selectionEnd = start + v.length; el.focus(); }, 0);
    }
  };

  const handleSave = () => showToast('Template saved successfully!');
  const handleTest = () => {
    if (!testPhone) return;
    showToast(`Test message sent to ${testPhone}`);
    setShowTest(false);
    setTestPhone('');
  };

  return (
    <div className="eng-page relative">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-card border border-border shadow-lg rounded-xl px-4 py-3 flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-2 h-2 rounded-full bg-success"></div>
          <p className="text-sm font-medium text-text-primary">{toast}</p>
        </div>
      )}

      {/* Test Modal */}
      {showTest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card w-full rounded-2xl shadow-2xl flex flex-col p-6 max-w-sm relative border border-border">
            <button onClick={() => setShowTest(false)} className="eng-modal-close"><X size={16} /></button>
            <p className="eng-modal-title"><Smartphone size={20} className="inline mr-2" /> Send Test Message</p>
            <p className="eng-modal-desc">Enter a phone number to send a test version of this template.</p>
            <div>
              <label className="eng-label">Phone Number</label>
              <input className="eng-input" placeholder="+91 9000000000"
                value={testPhone} onChange={e => setTestPhone(e.target.value)} />
            </div>
            <div className="eng-modal-footer">
              <button onClick={() => setShowTest(false)} className="eng-btn-ghost">Cancel</button>
              <button onClick={handleTest} className="eng-btn-primary" disabled={!testPhone}>
                <Send size={14} /> Send Test
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="eng-breadcrumb">
          <span>Communication</span><ChevronRight size={12} /><span>WhatsApp Templates</span>
        </div>
        <h1 className="eng-page-title"><Smartphone size={24} className="inline mr-2" /> WhatsApp Templates</h1>
        <p className="eng-page-subtitle">Customize automated message templates sent to students.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Top Filter Bar */}
        <div className="eng-tpl-topbar flex flex-wrap gap-3">
          {templates.map(t => (
            <div key={t.id} onClick={() => setActiveId(t.id)}
              className={`w-auto px-[16px] py-2 rounded-[30px] eng-tpl-item${activeId === t.id ? ' eng-tpl-item--active' : ''}`}>
              {t.icon} {t.label}
            </div>
          ))}
        </div>

        {/* Right Editor */}
        <div className="eng-card eng-flex-1">
          <div className="eng-card-header">
            <h2 className="eng-card-title">{active.icon} {active.label}</h2>
            <p className="eng-card-desc">Edit the message body. Use variable chips to personalize.</p>
          </div>

          <div>
            <label className="eng-label">Message Body</label>
            <textarea
              ref={textareaRef}
              className="eng-textarea"
              rows={8}
              value={active.body}
              onChange={e => updateBody(e.target.value)}
              maxLength={MAX_CHARS}
            />
            <p className={`eng-char-count${charCount > MAX_CHARS * 0.9 ? ' eng-char-count--warn' : ''}`}>
              {charCount} / {MAX_CHARS} characters
            </p>
          </div>

          <div className="eng-tpl-section">
            <label className="eng-label">Insert Variable</label>
            <div className="eng-tpl-var-row">
              {VARS.map(v => (
                <button key={v} onClick={() => insertVar(v)} className="eng-var-chip">{v}</button>
              ))}
            </div>
          </div>

          <div className="eng-info-box eng-tpl-section">
            <strong>Note:</strong> WhatsApp templates require pre-approval from Meta. Significant changes might trigger a re-review process which can take up to 24 hours.
          </div>

          <div className="eng-card-actions">
            <button onClick={() => setShowTest(true)} className="eng-btn-ghost">
              <Send size={16} /> Test
            </button>
            <button onClick={handleSave} className="eng-btn-primary">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


