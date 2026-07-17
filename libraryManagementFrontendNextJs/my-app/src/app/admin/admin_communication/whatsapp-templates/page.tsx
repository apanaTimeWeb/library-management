'use client';
// RESPONSIBILITY: Entry page for the admin_communication module.
// DATA FLOW: Next.js Router -> Page -> Components

import { useState, useRef } from 'react';
import { ChevronRight, X, Send, Save } from 'lucide-react';
import { ADMIN_COMMUNICATION_WHATSAPP_VARS, ADMIN_COMMUNICATION_WHATSAPP_TEMPLATES } from '@/app/admin/admin_communication/admin_communication_constants/AdminCommunicationConstants';

interface Template { id: string; label: string; icon: string; body: string; }



const MAX_CHARS = 1024;

export default function WhatsappTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(ADMIN_COMMUNICATION_WHATSAPP_TEMPLATES);
  const [activeId, setActiveId]   = useState('welcome');
  const [saved, setSaved]         = useState(false);
  const [showTest, setShowTest]   = useState(false);
  const [testPhone, setTestPhone] = useState('');
  const [toast, setToast]         = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const active    = templates.find(t => t.id === activeId)!;
  const charCount = active.body.length;

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const updateBody = (body: string) =>
    setTemplates(prev => prev.map(t => t.id === activeId ? { ...t, body } : t));

  const insertVar = (v: string) => {
    const el = textareaRef.current;
    if (!el) { updateBody(active.body + v); return; }
    const start = el.selectionStart;
    const end   = el.selectionEnd;
    updateBody(active.body.slice(0, start) + v + active.body.slice(end));
    setTimeout(() => { el.focus(); el.setSelectionRange(start + v.length, start + v.length); }, 0);
  };

  const handleSave = () => {
    setSaved(true);
    showToast('💾 Template saved');
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTest = () => {
    if (!testPhone) return;
    setShowTest(false);
    setTestPhone('');
    showToast(`📱 Test message sent to ${testPhone}`);
  };

  const preview = active.body
    .replace(/{name}/g, 'Rahul Sharma')
    .replace(/{amount}/g, '1000')
    .replace(/{duedate}/g, '15-Apr-2026')
    .replace(/{planname}/g, 'Monthly')
    .replace(/{libraryname}/g, 'Smart Library 360')
    .replace(/{phone}/g, '+91 9000000000')
    .replace(/{seat}/g, 'S-03');

  return (
    <div className="eng-page">
      {toast && <div className="eng-toast">{toast}</div>}

      {/* Test Message Modal */}
      {showTest && (
        <div className="eng-overlay">
          <div className="eng-modal eng-modal--sm">
            <button onClick={() => setShowTest(false)} className="eng-modal-close"><X size={16} /></button>
            <p className="eng-modal-title">📱 Send Test Message</p>
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
        <h1 className="eng-page-title">📱 WhatsApp Templates</h1>
        <p className="eng-page-subtitle">Customize automated message templates sent to students.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Top Filter Bar */}
        <div className="eng-tpl-topbar flex flex-wrap gap-3">
          {templates.map(t => (
            <div key={t.id} onClick={() => setActiveId(t.id)}
              className={`eng-tpl-item${activeId === t.id ? ' eng-tpl-item--active' : ''}`}
              style={{ width: 'auto', padding: '8px 16px', borderRadius: '30px' }}>
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
              {ADMIN_COMMUNICATION_WHATSAPP_VARS.map(v => (
                <button key={v} onClick={() => insertVar(v)} className="eng-var-chip">{v}</button>
              ))}
            </div>
          </div>

          <div className="eng-info-box eng-tpl-section">
            💡 Use variables to personalize messages. E.g.: <em>&quot;Hi {'{name}'}, your fee of ₹{'{amount}'} is due on {'{duedate}'}.&quot;</em>
          </div>

          <div className="eng-tpl-section">
            <label className="eng-label">Preview (sample values)</label>
            <div className="eng-tpl-preview">{preview}</div>
          </div>

          <div className="eng-card-footer eng-card-footer--end">
            <button onClick={() => setShowTest(true)} className="eng-btn-ghost">
              <Send size={14} /> Send Test Message
            </button>
            <button onClick={handleSave} className="eng-btn-primary">
              {saved ? '✅ Saved!' : <><Save size={14} /> Save Template</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

