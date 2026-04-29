export const exportToPDF = (formTitle: string, data: Record<string, string>, lang: 'de' | 'en') => {
  const date = new Date().toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB');
  const rows = Object.entries(data).filter(([,v]) => v).map(([k,v]) => `
    <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:45%">${k}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;font-size:13px">${v}</td></tr>
  `).join('');
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>${formTitle}</title>
  <style>body{font-family:'Segoe UI',sans-serif;margin:0;padding:40px;color:#18181b}
  .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;padding-bottom:24px;border-bottom:3px solid #1d4ed8}
  .logo{font-size:24px;font-weight:800;color:#1d4ed8}.meta{text-align:right;font-size:12px;color:#6b7280}
  h1{font-size:20px;margin:0 0 4px 0}.status{display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;margin-top:16px}
  table{width:100%;border-collapse:collapse;margin-top:24px}
  .footer{margin-top:40px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;text-align:center}
  </style></head><body>
  <div class="header"><div><div class="logo">AntragGPT</div>
  <div style="font-size:12px;color:#6b7280;margin-top:4px">${lang==='de'?'Beh\u00f6rden-Assistent':'Government Assistant'}</div></div>
  <div class="meta"><div>${lang==='de'?'Erstellt am':'Created on'}: ${date}</div>
  <div>${lang==='de'?'Dokument-ID':'Document ID'}: AG-${Date.now().toString().slice(-6)}</div></div></div>
  <h1>${formTitle}</h1><div class="status">${lang==='de'?'Entwurf':'Draft'}</div>
  <table><tbody>${rows}</tbody></table>
  <div class="footer">${lang==='de'?'Erstellt mit AntragGPT. Bitte alle Angaben vor Einreichung pr\u00fcfen.':'Created with AntragGPT. Please verify all information before submission.'}</div>
  </body></html>`;
  const win = window.open('','_blank');
  if(!win) return;
  win.document.write(html); win.document.close(); win.focus();
  setTimeout(() => { win.print(); win.close(); }, 500);
};
