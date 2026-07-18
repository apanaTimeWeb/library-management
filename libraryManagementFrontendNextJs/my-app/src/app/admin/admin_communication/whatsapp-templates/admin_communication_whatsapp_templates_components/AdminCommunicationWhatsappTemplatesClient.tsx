'use client';
// RESPONSIBILITY: Entry page for the admin_communication module.
// DATA FLOW: Next.js Router -> page -> Components

import { useState, useRef } from 'react';
import { ChevronRight, X, Send, Save } from 'lucide-react';
import { ADMIN_COMMUNICATION_WHATSAPP_VARS, ADMIN_COMMUNICATION_WHATSAPP_TEMPLATES } from '@/app/admin/admin_communication/admin_communication_constants/AdminCommunicationConstants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { Template } from "./AdminCommunicationWhatsappTemplatesClient_types";

const MAX_CHARS = 1024;

export function AdminCommunicationWhatsappTemplatesClient() {
  const [templates, setTemplates] = useState<Template[]>(ADMIN_COMMUNICATION_WHATSAPP_TEMPLATES);
  const [activeId, setActiveId]   = useState('welcome');
  const [saved, setSaved]         = useState(false);
  const [showTest, setShowTest]   = useState(false);
  const [testPhone, setTestPhone] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const active    = templates.find(t => t.id === activeId)!;
  const charCount = active.body.length;

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
    toast.success('Template saved');
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTest = () => {
    if (!testPhone) return;
    setShowTest(false);
    setTestPhone('');
    toast.success(`Test message sent to ${testPhone}`);
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
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 uppercase tracking-wider mb-1">
            Communication <ChevronRight size={12} /> WhatsApp Templates
          </p>
          <h1 className="text-2xl font-bold tracking-tight">📱 WhatsApp Templates</h1>
          <p className="text-sm text-muted-foreground mt-1">Customize automated message templates sent to students.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Top Filter Bar */}
        <div className="flex flex-wrap gap-3 bg-muted/50 p-1 rounded-lg border border-border w-fit">
          {templates.map(t => (
            <Button
              key={t.id}
              variant={activeId === t.id ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveId(t.id)}
              className={`text-sm font-semibold capitalize gap-2 ${activeId === t.id ? 'bg-bg-card shadow-sm' : ''}`}
            >
              {t.icon} {t.label}
            </Button>
          ))}
        </div>

        {/* Right Editor */}
        <Card className="shadow-sm border-border flex-1">
          <CardHeader className="border-b border-border mb-6">
            <CardTitle className="text-xl flex items-center gap-2">{active.icon} {active.label}</CardTitle>
            <CardDescription>Edit the message body. Use variable chips to personalize.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block uppercase tracking-wider">Message Body</label>
              <Textarea
                ref={textareaRef}
                rows={8}
                value={active.body}
                onChange={e => updateBody(e.target.value)}
                maxLength={MAX_CHARS}
                className="font-mono text-sm"
              />
              <p className={`text-xs mt-2 font-medium ${charCount > MAX_CHARS * 0.9 ? 'text-danger' : 'text-muted-foreground'}`}>
                {charCount} / {MAX_CHARS} characters
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-border">
              <label className="text-sm font-semibold text-foreground mb-2 block uppercase tracking-wider">Insert Variable</label>
              <div className="flex flex-wrap gap-2">
                {ADMIN_COMMUNICATION_WHATSAPP_VARS.map(v => (
                  <Button key={v} variant="outline" size="sm" onClick={() => insertVar(v)} className="font-mono text-xs bg-muted/50 hover:bg-muted">
                    {v}
                  </Button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-info/10 text-info border border-info/20 rounded-lg text-sm font-medium">
              💡 Use variables to personalize messages. E.g.: <em>&quot;Hi {'{name}'}, your fee of ₹{'{amount}'} is due on {'{duedate}'}.&quot;</em>
            </div>

            <div className="space-y-2 pt-4 border-t border-border">
              <label className="text-sm font-semibold text-foreground mb-2 block uppercase tracking-wider">Preview (sample values)</label>
              <div className="p-4 bg-muted/30 border border-border rounded-lg text-sm leading-relaxed text-foreground whitespace-pre-wrap font-mono">
                {preview}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3 pt-6 border-t border-border bg-muted/10">
            <Button variant="outline" onClick={() => setShowTest(true)} className="gap-2">
              <Send size={14} /> Send Test Message
            </Button>
            <Button onClick={handleSave} className="gap-2 bg-success hover:bg-success/90 text-white min-w-36">
              {saved ? '✅ Saved!' : <><Save size={14} /> Save Template</>}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Test Message Modal */}
      <Dialog open={showTest} onOpenChange={setShowTest}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>📱 Send Test Message</DialogTitle>
            <DialogDescription>Enter a phone number to send a test version of this template.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</label>
              <Input placeholder="+91 9000000000" value={testPhone} onChange={e => setTestPhone(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowTest(false)}>Cancel</Button>
            <Button onClick={handleTest} disabled={!testPhone} className="gap-2">
              <Send size={14} /> Send Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
