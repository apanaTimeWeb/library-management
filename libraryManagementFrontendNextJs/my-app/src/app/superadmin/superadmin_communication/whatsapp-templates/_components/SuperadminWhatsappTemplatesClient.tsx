'use client';
// RESPONSIBILITY: Renders the SuperadminWhatsappTemplatesClient component.
import { Handshake, FileText, BellRing, Smartphone, X, Send, Save, CheckCircle, ChevronRight, MessageSquare, AlertCircle } from 'lucide-react';
import { useSuperadminWhatsappTemplatesClient } from '@/app/superadmin/superadmin_communication/whatsapp-templates/_components/useSuperadminWhatsappTemplatesClient';

const ICON_MAP: Record<string, React.ReactNode> = {
  Handshake: <Handshake size={16}/>,
  FileText: <FileText size={16}/>,
  BellRing: <BellRing size={16}/>,
  Smartphone: <Smartphone size={16}/>,
  MessageSquare: <MessageSquare size={16}/>,
  AlertCircle: <AlertCircle size={16}/>,
};

const VARS = ['{name}', '{amount}', '{duedate}', '{planname}', '{libraryname}', '{phone}', '{seat}'];
const MAX_CHARS = 1024;

export function SuperadminWhatsappTemplatesClient() {
  const {
    templates, activeId, setActiveId, saved, showTest, setShowTest, testPhone, setTestPhone,
    toast, textareaRef, active, charCount, updateBody, insertVar, handleSave, handleTest, preview
  } = useSuperadminWhatsappTemplatesClient();

  if (!active) return null;

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-bg-pageg-page animate-in fade-in duration-200">
      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5">
          <div className="bg-text-primary text-bg-card px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
            {toast}
          </div>
        </div>
      )}

      {/* Test Message Modal */}
      {showTest && (
        <div className="fixed inset-0 bg-bg-pagelack/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-sm rounded-xl shadow-2xl overflow-hidden relative">
            <button onClick={() => setShowTest(false)} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"><X size={16} /></button>
            <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-2">
              <Smartphone size={20} className="text-primary" />
              <div>
                <p className="text-lg font-extrabold text-text-primary">Send Test Message</p>
                <p className="text-xs text-text-secondary mt-1">Enter a phone number to test.</p>
              </div>
            </div>
            
            <div className="p-5 space-y-2">
              <label className="text-xs font-bold text-text-primary">Phone Number</label>
              <input className="w-full h-10 px-3 rounded-md border border-border bg-input text-text-primary text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-text-secondary" placeholder="+91 9000000000"
                value={testPhone} onChange={e => setTestPhone(e.target.value)} />
            </div>

            <div className="p-4 border-t border-border flex justify-end gap-3 bg-muted/30">
              <button onClick={() => setShowTest(false)} className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-input border border-transparent rounded-md transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleTest} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" disabled={!testPhone}>
                <Send size={14} /> Send Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-bold tracking-wide mb-6">
          <span className="hover:text-primary transition-colors cursor-pointer">Communication</span>
          <ChevronRight size={12} className="opacity-50" />
          <span className="text-text-primary">WhatsApp Templates</span>
        </div>
        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight flex items-center gap-3">
          <Smartphone size={28} className="text-primary" /> 
          WhatsApp Templates
        </h1>
        <p className="text-sm text-text-secondary mt-1">Customize automated message templates sent to students.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Template List */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Select Template</div>
          {templates.map(( t ) => (
            <button key={t.id} onClick={() => setActiveId(t.id)}
              className={`flex items-center justify-between w-full p-4 rounded-lg border transition-all text-left cursor-pointer ${
                activeId === t.id 
                  ? 'bg-primary/10 border-primary shadow-sm ring-1 ring-primary' 
                  : 'bg-card border-border hover:border-primary/50 hover:bg-input'
              }`}>
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${activeId === t.id ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                  {ICON_MAP[t.icon] || <MessageSquare size={14} />}
                </div>
                <span className={`text-sm font-bold ${activeId === t.id ? 'text-primary' : 'text-text-primary'}`}>{t.label}</span>
              </div>
              <ChevronRight size={16} className={activeId === t.id ? 'text-primary' : 'text-text-secondary opacity-50'} />
            </button>
          ))}
        </div>

        {/* Right Editor */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-border bg-muted/30">
              <h2 className="text-lg font-extrabold text-text-primary flex items-center gap-2">
                {ICON_MAP[active.icon] || <MessageSquare size={18} />} {active.label}
              </h2>
              <p className="text-xs text-text-secondary mt-1">Edit the message body. Use variable chips to personalize.</p>
            </div>

            <div className="p-6 flex flex-col gap-6 flex-1">
              {/* Textarea */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-text-primary">Message Body</label>
                  <p className={`text-xs font-bold ${charCount > MAX_CHARS * 0.9 ? 'text-danger' : 'text-text-secondary'}`}>
                    {charCount} / {MAX_CHARS} characters
                  </p>
                </div>
                <textarea
                  ref={textareaRef}
                  className="w-full bg-input border border-border rounded-md p-4 text-sm text-text-primary font-medium focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none shadow-inner leading-relaxed"
                  rows={8}
                  value={active.body}
                  onChange={e => updateBody(e.target.value)}
                  maxLength={MAX_CHARS}
                />
              </div>

              {/* Variables */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Insert Variable</label>
                <div className="flex flex-wrap gap-2">
                  {VARS.map(( v ) => (
                    <button key={v} onClick={() => insertVar(v)} className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm">
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Help Tip */}
              <div className="bg-info/10 border-l-4 border-l-info text-info p-4 rounded-md text-sm leading-relaxed">
                <span className="font-bold">💡 Pro Tip:</span> Use variables to personalize messages. E.g.: <em className="opacity-80">"Hi {'{name}'}, your fee of ₹{'{amount}'} is due on {'{duedate}'}."</em>
              </div>

              {/* Preview */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Preview (sample values)</label>
                <div className="bg-green-50 dark:bg-emerald-950 rounded-xl p-4 shadow-sm max-w-md relative before:content-[''] before:absolute before:top-0 before:left-[-8px] before:border-[8px] before:border-transparent before:border-t-green-50 dark:before:border-t-emerald-950">
                  <p className="text-sm text-emerald-900 dark:text-emerald-100 whitespace-pre-wrap leading-relaxed">{preview}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border flex justify-end gap-3 bg-muted/30">
              <button onClick={() => setShowTest(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-input border border-transparent rounded-md transition-colors cursor-pointer">
                <Send size={14} /> Send Test Message
              </button>
              <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:bg-primary/90 shadow-sm transition-all active:scale-95 cursor-pointer">
                {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save Template</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
