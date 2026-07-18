// RESPONSIBILITY: Provides logic for WhatsappTemplatesClient
import { useState, useRef } from 'react';
import { SUPERADMIN_COMMUNICATION_MOCK_WA_TEMPLATES } from '@/app/superadmin/superadmin_communication/superadmin_communication_data/SuperadminCommunicationMockData';
import type { SuperadminCommunicationWaTemplate as Template } from '@/app/superadmin/superadmin_communication/superadmin_communication_types/SuperadminCommunicationTypes';

export function useWhatsappTemplatesClient() {
  const [templates, setTemplates] = useState<Template[]>(SUPERADMIN_COMMUNICATION_MOCK_WA_TEMPLATES as Template[]);
  const [activeId, setActiveId]   = useState('welcome');
  const [saved, setSaved]         = useState(false);
  const [showTest, setShowTest]   = useState(false);
  const [testPhone, setTestPhone] = useState('');
  const [toast, setToast]         = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const active    = templates.find(t => t.id === activeId)!;
  const charCount = active?.body.length || 0;

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const updateBody = (body: string) =>
    setTemplates(prev => prev.map(( t ) => t.id === activeId ? { ...t, body } : t));

  const insertVar = (v: string) => {
    const el = textareaRef.current;
    if (!el || !active) { updateBody((active?.body || '') + v); return; }
    const start = el.selectionStart;
    const end   = el.selectionEnd;
    updateBody(active.body.slice(0, start) + v + active.body.slice(end));
    setTimeout(() => { el.focus(); el.setSelectionRange(start + v.length, start + v.length); }, 0);
  };

  const handleSave = () => {
    setSaved(true);
    showToast('Template saved');
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTest = () => {
    if (!testPhone) return;
    setShowTest(false);
    setTestPhone('');
    showToast(`Test message sent to ${testPhone}`);
  };

  const preview = active?.body
    .replace(/{name}/g, 'Rahul Sharma')
    .replace(/{amount}/g, '1000')
    .replace(/{duedate}/g, '15-Apr-2026')
    .replace(/{planname}/g, 'Monthly')
    .replace(/{libraryname}/g, 'Smart Library 360')
    .replace(/{phone}/g, '+91 9000000000')
    .replace(/{seat}/g, 'S-03') || '';

  return {
    templates, activeId, setActiveId, saved, showTest, setShowTest, testPhone, setTestPhone,
    toast, textareaRef, active, charCount, updateBody, insertVar, handleSave, handleTest, preview
  };
}
