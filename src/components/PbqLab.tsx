import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Server, Terminal, Activity, Hash, Globe, AlertCircle, ArrowRight, CheckCircle2, XCircle, ChevronRight, HelpCircle, HardDrive, RefreshCw } from 'lucide-react';

interface PbqLabProps {
  onBack: () => void;
  onAddXp: (amount: number) => void;
}

export default function PbqLab({ onBack, onAddXp }: PbqLabProps) {
  const [activePbq, setActivePbq] = useState<number | null>(null);
  const [pbqStates, setPbqStates] = useState<Record<number, {
    solved: boolean;
    attempts: number;
    answers: any;
    feedback: string | null;
  }>>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('shift_pbq_states') : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Make sure all 10 entries exist to prevent partial-loading crashes
        if (Object.keys(parsed).length === 10) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse saved pbq states", e);
      }
    }
    return {
      1: { solved: false, attempts: 0, answers: {}, feedback: null },
      2: { solved: false, attempts: 0, answers: { net: '', mask: '', bcast: '' }, feedback: null },
      3: { solved: false, attempts: 0, answers: {}, feedback: null },
      4: { solved: false, attempts: 0, answers: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '' }, feedback: null },
      5: { solved: false, attempts: 0, answers: { cmd1: '', cmd2: '', cmd3: '' }, feedback: null },
      6: { solved: false, attempts: 0, answers: {}, feedback: null },
      7: { solved: false, attempts: 0, answers: { action: '', proto: '', src: '', dst: '', port: '' }, feedback: null },
      8: { solved: false, attempts: 0, answers: { choice: '', justification: '' }, feedback: null },
      9: { solved: false, attempts: 0, answers: { band: '', standard: '', width: '' }, feedback: null },
      10: { solved: false, attempts: 0, answers: {}, feedback: null },
    };
  });

  React.useEffect(() => {
    localStorage.setItem('shift_pbq_states', JSON.stringify(pbqStates));
  }, [pbqStates]);

  const pbqList = [
    { id: 1, title: 'OSI Layer Alignment', domain: '1.0 Physical & Logical Layers', type: 'Drag & Drop Matching' },
    { id: 2, title: 'IPv4 Subnet Allocation', domain: '1.0 IP Addressing & Subnetting', type: 'Fill in the Blanks' },
    { id: 3, title: 'IANA Well-Known Service Ports', domain: '1.4 Layer 4 Ports & Protocols', type: 'Drag & Drop Matching' },
    { id: 4, title: 'Troubleshooting Escalation Order', domain: '5.0 CompTIA Methodology', type: 'Chronological Ordering' },
    { id: 5, title: 'Layer 2 Switch Cisco IOS Configuration', domain: '2.0 Switch & VLAN Config', type: 'Interactive CLI' },
    { id: 6, title: 'Disaster Recovery RTO/RPO Metrics', domain: '3.0 Operations & Resiliency', type: 'Definition Association' },
    { id: 7, title: 'DMZ Web Server Access Control Entry', domain: '4.0 Security & Firewalls', type: 'ACL Builder' },
    { id: 8, title: 'Visual Wiremap Diagnostics', domain: '5.0 Physical Layer Cable Testing', type: 'Interpreting Diagnostics' },
    { id: 9, title: 'Enterprise 6 GHz Wireless Deployment', domain: '2.3 Wireless RF Configuration', type: 'RF Optimization' },
    { id: 10, title: 'Intrusion Syslog Threat Classification', domain: '4.2 Attack Signatures & Logs', type: 'Logs to Vector Map' },
  ];

  const handleReset = (id: number) => {
    let defaultAnswers: any = {};
    if (id === 1 || id === 3 || id === 6 || id === 10) defaultAnswers = {};
    else if (id === 2) defaultAnswers = { net: '', mask: '', bcast: '' };
    else if (id === 4) defaultAnswers = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '' };
    else if (id === 5) defaultAnswers = { cmd1: '', cmd2: '', cmd3: '' };
    else if (id === 7) defaultAnswers = { action: '', proto: '', src: '', dst: '', port: '' };
    else if (id === 8) defaultAnswers = { choice: '', justification: '' };
    else if (id === 9) defaultAnswers = { band: '', standard: '', width: '' };

    setPbqStates(prev => ({
      ...prev,
      [id]: {
        solved: false,
        attempts: 0,
        answers: defaultAnswers,
        feedback: null
      }
    }));
  };

  const notifySolveSuccess = (id: number, xp: number) => {
    setPbqStates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        solved: true,
        feedback: 'correct'
      }
    }));
    onAddXp(xp);
  };

  const notifySolveFailure = (id: number, message: string) => {
    setPbqStates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        attempts: prev[id].attempts + 1,
        feedback: message || 'incorrect'
      }
    }));
  };

  // --- SOLVER VALIDATION ENGINE ---

  // PBQ 1: OSI MATCHING
  // A -> Physical, B -> Data Link, C -> Network, D -> Transport, E -> Application
  const validatePbq1 = (answers: Record<string, string>) => {
    const correctMap: Record<string, string> = {
      'cable_unplugged': 'Physical',
      'crc_errors': 'Data Link',
      'gateway_ip': 'Network',
      'firewall_port': 'Transport',
      'url_error': 'Application'
    };
    let isCorrect = true;
    for (const key of Object.keys(correctMap)) {
      if (answers[key] !== correctMap[key]) {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect) {
      notifySolveSuccess(1, 500);
    } else {
      notifySolveFailure(1, 'One or more symptoms are aligned to incorrect layers.');
    }
  };

  // PBQ 2: SUBNETTING
  // Third Subnet of 192.168.10.0/24 split into /26s
  // Net: 192.168.10.128, Mask: 255.255.255.192 /26, Bcast: 192.168.10.191
  const validatePbq2 = (answers: { net: string; mask: string; bcast: string }) => {
    const cleanAddress = (str: string) => str.trim().toLowerCase().replace(/\s+/g,'');
    const isNet = cleanAddress(answers.net) === '192.168.10.128';
    const isMask = cleanAddress(answers.mask) === '255.255.255.192' || cleanAddress(answers.mask) === '/26';
    const isBcast = cleanAddress(answers.bcast) === '192.168.10.191';

    if (isNet && isMask && isBcast) {
      notifySolveSuccess(2, 500);
    } else {
      let errStr = [];
      if (!isNet) errStr.push('Network Address');
      if (!isMask) errStr.push('Subnet Mask');
      if (!isBcast) errStr.push('Broadcast Address');
      notifySolveFailure(2, `Incorrect values in: ${errStr.join(', ')}.`);
    }
  };

  // PBQ 3: PORT MATCHING
  const validatePbq3 = (answers: Record<string, string>) => {
    const correctMap: Record<string, string> = {
      'FTP': '21',
      'SFTP': '22',
      'DNS': '53',
      'DHCP': '68', // Fallback value, custom check below accepts 67 or 68
      'HTTPS': '443',
      'RDP': '3389'
    };
    let isCorrect = true;
    for (const key of Object.keys(correctMap)) {
      if (key === 'DHCP') {
        if (answers[key] !== '67' && answers[key] !== '68') {
          isCorrect = false;
          break;
        }
      } else {
        if (answers[key] !== correctMap[key]) {
          isCorrect = false;
          break;
        }
      }
    }
    if (isCorrect) {
      notifySolveSuccess(3, 500);
    } else {
      notifySolveFailure(3, 'One or more protocols are mapped to incorrect physical port layers.');
    }
  };

  // PBQ 4: METHODOLOGY ORDER
  const validatePbq4 = (answers: Record<number, string>) => {
    const correctMethodology = [
      'Problem Identification',
      'Theory Establishment',
      'Theory Testing',
      'Plan Formulation',
      'Implementation',
      'Verification',
      'Documentation'
    ];
    let isCorrect = true;
    for (let i = 1; i <= 7; i++) {
      if (answers[i] !== correctMethodology[i-1]) {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect) {
      notifySolveSuccess(4, 500);
    } else {
      notifySolveFailure(4, 'Methodology order is incorrect. Trace the chronological escalation cycle again.');
    }
  };

  // PBQ 5: CISCO SWITCH IOS
  const validatePbq5 = (answers: { cmd1: string; cmd2: string; cmd3: string }) => {
    const cleanCmd = (str: string) => str.trim().toLowerCase().replace(/\s+/g, ' ');
    const isCmd1 = cleanCmd(answers.cmd1) === 'switchport mode access';
    const isCmd2 = cleanCmd(answers.cmd2) === 'switchport access vlan 10';
    const isCmd3 = cleanCmd(answers.cmd3) === 'switchport access vlan 20';

    if (isCmd1 && isCmd2 && isCmd3) {
      notifySolveSuccess(5, 500);
    } else {
      let errStr = [];
      if (!isCmd1) errStr.push('Blank 1');
      if (!isCmd2) errStr.push('Blank 2');
      if (!isCmd3) errStr.push('Blank 3');
      notifySolveFailure(5, `Configuration failed syntax verification: ${errStr.join(', ')} incorrect.`);
    }
  };

  // PBQ 6: DISASTER RECOVERY METRICS
  const validatePbq6 = (answers: Record<string, string>) => {
    const correctMap: Record<string, string> = {
      'RPO': 'data_loss',
      'RTO': 'downtime',
      'MTTR': 'repair_time',
      'MTBF': 'before_failure'
    };
    let isCorrect = true;
    for (const key of Object.keys(correctMap)) {
      if (answers[key] !== correctMap[key]) {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect) {
      notifySolveSuccess(6, 500);
    } else {
      notifySolveFailure(6, 'Metrics did not pass the compliance audit.');
    }
  };

  // PBQ 7: FIREWALL ACL BUILDER
  // permit tcp any 10.10.10.10 443 (case insensitive)
  const validatePbq7 = (answers: { action: string; proto: string; src: string; dst: string; port: string }) => {
    const clean = (str: string) => str.trim().toLowerCase();
    const isAction = clean(answers.action) === 'permit';
    const isProto = clean(answers.proto) === 'tcp';
    const isSrc = clean(answers.src) === 'any';
    const isDst = clean(answers.dst) === '10.10.10.10';
    const isPort = clean(answers.port) === '443' || clean(answers.port) === 'https';

    if (isAction && isProto && isSrc && isDst && isPort) {
      notifySolveSuccess(7, 500);
    } else {
      let errs = [];
      if (!isAction) errs.push('Action');
      if (!isProto) errs.push('Protocol');
      if (!isSrc) errs.push('Source IP');
      if (!isDst) errs.push('Destination IP');
      if (!isPort) errs.push('Destination Port');
      notifySolveFailure(7, `ACE compiler matched errors in: ${errs.join(', ')}.`);
    }
  };

  // PBQ 8: CABLE WIREMAP DIAGNOSTICS
  const validatePbq8 = (answers: { choice: string; justification: string }) => {
    const isCorrectChoice = answers.choice === 'C';
    const cleanJust = answers.justification.trim().toLowerCase();
    const hasJust = cleanJust.includes('pins 1 and 2') || cleanJust.includes('open') || cleanJust.includes('transmit') || cleanJust.includes('broken');

    if (isCorrectChoice && hasJust) {
      notifySolveSuccess(8, 500);
    } else if (!isCorrectChoice) {
      notifySolveFailure(8, 'Layer 1 fault analysis diagnosed an incorrect physical fault.');
    } else {
      notifySolveFailure(8, 'The physical failure mode has been guessed, but local root cause justification matches empty or incorrect rationale.');
    }
  };

  // PBQ 9: 6 GHZ OPTIMIZATION
  const validatePbq9 = (answers: { band: string; standard: string; width: string }) => {
    const isBand = answers.band === '6 GHz';
    const isStd = answers.standard === '802.11ax';
    const isWidth = answers.width === '80 MHz' || answers.width === '160 MHz';

    if (isBand && isStd && isWidth) {
      notifySolveSuccess(9, 500);
    } else {
      notifySolveFailure(9, 'The combination will not maximize performance on 6 GHz deployments.');
    }
  };

  // PBQ 10: SYSLOG ATTACK MAP
  const validatePbq10 = (answers: Record<string, string>) => {
    const correctMap: Record<string, string> = {
      'arp': 'A',
      'deauth': 'B',
      'udp': 'C',
      'dns': 'D'
    };
    let isCorrect = true;
    for (const key of Object.keys(correctMap)) {
      if (answers[key] !== correctMap[key]) {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect) {
      notifySolveSuccess(10, 500);
    } else {
      notifySolveFailure(10, 'Threat classification index failed to identify active attack profiles.');
    }
  };

  return (
    <div className="w-full text-left" id="pbq-lab-container">
      {activePbq === null ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-6 sm:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div>
              <h2 className="text-2xl font-display font-black tracking-tight text-gray-900 leading-tight">PBQ Lab Simulator</h2>
              <p className="text-xs text-gray-400 font-medium tracking-wide mt-1 uppercase">comptia performance testing suite • n10-009</p>
            </div>
            <button 
              onClick={onBack}
              className="px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition-all hover:text-gray-900"
            >
              Exit Lab
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
            {pbqList.map((p) => {
              const state = pbqStates[p.id];
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePbq(p.id)}
                  className={`w-full p-5 sm:p-6 text-left rounded-[2rem] border transition-all hover:shadow-md flex items-center justify-between group cursor-pointer ${
                    state.solved 
                      ? 'bg-emerald-50/40 border-emerald-100/50 hover:border-emerald-200' 
                      : 'bg-white border-gray-100 hover:border-blue-200'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase tracking-widest font-black px-2 mt-0.5 py-0.5 rounded-md ${
                        state.solved ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                      }`}>
                        PBQ #{p.id}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono font-bold">{p.type}</span>
                    </div>
                    <p className="text-base font-display font-black text-gray-950 group-hover:text-blue-600 transition-colors">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-500 font-normal leading-relaxed">{p.domain}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {state.solved ? (
                      <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
                    ) : state.attempts > 0 ? (
                      <span className="text-xs font-mono font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">
                        {state.attempts} Att
                      </span>
                    ) : null}
                    <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-50 pb-5">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Interactive PBQ Simulator
              </span>
              <h3 className="text-xl font-display font-black text-gray-950 tracking-tight">
                PBQ {activePbq}: {pbqList[activePbq - 1].title}
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleReset(activePbq)}
                title="Reset Simulation"
                className="p-2 bg-gray-50 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all shrink-0"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => setActivePbq(null)}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 font-bold text-xs text-gray-500 hover:text-black rounded-lg transition-all"
              >
                Menu
              </button>
            </div>
          </div>

          {/* Feedback message */}
          {pbqStates[activePbq].feedback === 'correct' ? (
            <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold">Correct! Configuration compiled successfully.</p>
                <p className="opacity-80">You received +500 XP! This Performance-Based Challenge is completed.</p>
              </div>
            </div>
          ) : pbqStates[activePbq].feedback ? (
            <div className="p-4 bg-red-50 border border-red-100 text-red-800 rounded-2xl flex items-start gap-3">
              <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
              <p className="text-xs font-bold leading-relaxed">{pbqStates[activePbq].feedback}</p>
            </div>
          ) : null}

          {/* Dynamic Content Frame */}
          <div className="min-h-[220px]">
            {activePbq === 1 && (
              <div className="space-y-4">
                <div className="text-xs text-gray-500 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  <strong>Scenario:</strong> Match each troubleshooting symptom on the left with the correct OSI Layer where the fault resides (A - E in the drops).
                </div>
                
                <div className="space-y-3">
                  {[
                    { id: 'cable_unplugged', text: 'A. The cable is unplugged from the switch.' },
                    { id: 'crc_errors', text: 'B. A switch port is showing excessive CRC errors.' },
                    { id: 'gateway_ip', text: 'C. The default gateway IP address is misconfigured.' },
                    { id: 'firewall_port', text: 'D. A firewall is blocking TCP port 443.' },
                    { id: 'url_error', text: 'E. A user receives a "Page not found" error when browsing to a correct URL.' }
                  ].map((sym) => (
                    <div key={sym.id} className="grid grid-cols-5 gap-3 items-center bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                      <div className="col-span-3 text-xs font-bold text-gray-800 leading-normal">{sym.text}</div>
                      <div className="col-span-2">
                        <select
                          disabled={pbqStates[1].solved}
                          value={pbqStates[1].answers[sym.id] || ''}
                          onChange={(e) => setPbqStates(prev => ({
                            ...prev,
                            1: { ...prev[1], answers: { ...prev[1].answers, [sym.id]: e.target.value } }
                          }))}
                          className="w-full text-xs font-bold bg-white border border-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="">[Select Layer]</option>
                          {['Physical', 'Data Link', 'Network', 'Transport', 'Application'].map(layer => (
                            <option key={layer} value={layer}>{layer}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                {!pbqStates[1].solved && (
                  <button
                    onClick={() => validatePbq1(pbqStates[1].answers)}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    Diagnose Alignment
                  </button>
                )}
              </div>
            )}

            {activePbq === 2 && (
              <div className="space-y-4">
                <div className="text-xs text-gray-500 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  <strong>Scenario:</strong> Split <code>192.168.10.0/24</code> into four equal-sized subnets supporting at least 50 hosts. Complete the table parameters for <strong>Subnet #3</strong> below.
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase font-black tracking-wide mb-1">Subnet 3 Address</label>
                    <input 
                      disabled={pbqStates[2].solved}
                      type="text" 
                      placeholder="e.g. 192.168.10.x"
                      value={pbqStates[2].answers.net}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        2: { ...prev[2], answers: { ...prev[2].answers, net: e.target.value } }
                      }))}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase font-black tracking-wide mb-1">Subnet Mask</label>
                    <input 
                      disabled={pbqStates[2].solved}
                      type="text" 
                      placeholder="e.g. 255.255.255.x (or /26)"
                      value={pbqStates[2].answers.mask}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        2: { ...prev[2], answers: { ...prev[2].answers, mask: e.target.value } }
                      }))}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase font-black tracking-wide mb-1">Broadcast Address</label>
                    <input 
                      disabled={pbqStates[2].solved}
                      type="text" 
                      placeholder="e.g. 192.168.10.y"
                      value={pbqStates[2].answers.bcast}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        2: { ...prev[2], answers: { ...prev[2].answers, bcast: e.target.value } }
                      }))}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {!pbqStates[2].solved && (
                  <button
                    onClick={() => validatePbq2(pbqStates[2].answers)}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    Commit Configuration
                  </button>
                )}
              </div>
            )}

            {activePbq === 3 && (
              <div className="space-y-4">
                <div className="text-xs text-gray-500 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  <strong>Scenario:</strong> Route protocol processes to their respective well-known TCP/UDP service ports. Select the correct port number matching the protocol label.
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {['FTP', 'SFTP', 'DNS', 'DHCP', 'HTTPS', 'RDP'].map(proto => (
                    <div key={proto} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-black text-gray-800">{proto}</span>
                      <select
                        disabled={pbqStates[3].solved}
                        value={pbqStates[3].answers[proto] || ''}
                        onChange={(e) => setPbqStates(prev => ({
                          ...prev,
                          3: { ...prev[3], answers: { ...prev[3].answers, [proto]: e.target.value } }
                        }))}
                        className="text-xs font-mono font-bold bg-white border border-gray-200 rounded-lg p-1.5 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="">Port?</option>
                        {['20', '21', '22', '53', '67', '68', '80', '443', '3389'].map(pt => (
                          <option key={pt} value={pt}>{pt}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                {!pbqStates[3].solved && (
                  <button
                    onClick={() => validatePbq3(pbqStates[3].answers)}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    Deploy NAT/Security Matrix
                  </button>
                )}
              </div>
            )}

            {activePbq === 4 && (
              <div className="space-y-4">
                <div className="text-xs text-gray-500 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  <strong>Scenario:</strong> Route the incident stages below in alignment with CompTIA's standard Troubleshooting Methodology (Steps 1 to 7).
                </div>

                <div className="space-y-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((stepNum) => (
                    <div key={stepNum} className="flex items-center gap-3 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                      <span className="w-6 h-6 bg-blue-100 text-blue-800 border border-blue-200 rounded-full flex items-center justify-center font-mono text-[10px] font-black shrink-0">
                        {stepNum}
                      </span>
                      <select
                        disabled={pbqStates[4].solved}
                        value={pbqStates[4].answers[stepNum] || ''}
                        onChange={(e) => setPbqStates(prev => ({
                          ...prev,
                          4: { ...prev[4], answers: { ...prev[4].answers, [stepNum]: e.target.value } }
                        }))}
                        className="flex-1 text-xs font-bold text-gray-800 bg-white border border-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="">-- Assign Action --</option>
                        {[
                          'Problem Identification',
                          'Theory Establishment',
                          'Theory Testing',
                          'Plan Formulation',
                          'Implementation',
                          'Verification',
                          'Documentation'
                        ].map(act => (
                          <option key={act} value={act}>{act}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                {!pbqStates[4].solved && (
                  <button
                    onClick={() => validatePbq4(pbqStates[4].answers)}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    Publish Post-Mortem Response
                  </button>
                )}
              </div>
            )}

            {activePbq === 5 && (
              <div className="space-y-4">
                <div className="text-xs text-gray-500 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  <strong>Scenario:</strong> You need to assign ports 1-5 to VLAN 10 and ports 6-10 to VLAN 20. Complete the blanks in this switch configuration trace.
                </div>

                <div className="bg-gray-950 p-5 rounded-[2rem] font-mono text-xs text-green-500 shadow-inner leading-relaxed space-y-2">
                  <p className="opacity-40">Switch&gt; enable</p>
                  <p className="opacity-40">Switch# configure terminal</p>
                  <p className="opacity-40">Switch(config)# interface range gig1/0/1-5</p>
                  <div className="flex items-center gap-1">
                    <span className="opacity-50">Switch(config-if-range)#</span>
                    <input
                      disabled={pbqStates[5].solved}
                      type="text"
                      placeholder="switchport mode..."
                      value={pbqStates[5].answers.cmd1}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        5: { ...prev[5], answers: { ...prev[5].answers, cmd1: e.target.value } }
                      }))}
                      className="bg-gray-900 border-none outline-none focus:ring-1 focus:ring-green-400 p-1 text-green-400 flex-1 rounded text-xs px-2"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="opacity-50">Switch(config-if-range)#</span>
                    <input
                      disabled={pbqStates[5].solved}
                      type="text"
                      placeholder="switchport access vlan..."
                      value={pbqStates[5].answers.cmd2}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        5: { ...prev[5], answers: { ...prev[5].answers, cmd2: e.target.value } }
                      }))}
                      className="bg-gray-900 border-none outline-none focus:ring-1 focus:ring-green-400 p-1 text-green-400 flex-1 rounded text-xs px-2"
                    />
                  </div>
                  <p className="opacity-40">Switch(config-if-range)# exit</p>
                  <p className="opacity-40">Switch(config)# interface range gig1/0/6-10</p>
                  <p className="opacity-40">Switch(config-if-range)# switchport mode access</p>
                  <div className="flex items-center gap-1">
                    <span className="opacity-50">Switch(config-if-range)#</span>
                    <input
                      disabled={pbqStates[5].solved}
                      type="text"
                      placeholder="switchport access vlan..."
                      value={pbqStates[5].answers.cmd3}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        5: { ...prev[5], answers: { ...prev[5].answers, cmd3: e.target.value } }
                      }))}
                      className="bg-gray-900 border-none outline-none focus:ring-1 focus:ring-green-400 p-1 text-green-400 flex-1 rounded text-xs px-2"
                    />
                  </div>
                  <p className="opacity-40">Switch(config-if-range)# end</p>
                  <p className="opacity-40">Switch# copy running-config startup-config</p>
                </div>

                {!pbqStates[5].solved && (
                  <button
                    onClick={() => validatePbq5(pbqStates[5].answers)}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    Commit Active Startup-Config
                  </button>
                )}
              </div>
            )}

            {activePbq === 6 && (
              <div className="space-y-4">
                <div className="text-xs text-gray-500 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  <strong>Scenario:</strong> Associate business continuity definitions with their governing SLA metrics.
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'RPO', label: 'RPO', desc: 'Maximum tolerable data loss measured in time.' },
                    { id: 'RTO', label: 'RTO', desc: 'Maximum acceptable downtime after a failure.' },
                    { id: 'MTTR', label: 'MTTR', desc: 'Average time required to repair a failed component.' },
                    { id: 'MTBF', label: 'MTBF', desc: 'Average time a device operates before failing.' }
                  ].map((m) => (
                    <div key={m.id} className="grid grid-cols-5 gap-3 items-center bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                      <div className="col-span-1 text-xs font-black text-gray-900 font-mono">{m.label}</div>
                      <div className="col-span-4">
                        <select
                          disabled={pbqStates[6].solved}
                          value={pbqStates[6].answers[m.id] || ''}
                          onChange={(e) => setPbqStates(prev => ({
                            ...prev,
                            6: { ...prev[6], answers: { ...prev[6].answers, [m.id]: e.target.value } }
                          }))}
                          className="w-full text-xs font-bold text-gray-800 bg-white border border-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="">[Match Definition]</option>
                          <option value="data_loss">Max tolerable data loss / rollback time limit</option>
                          <option value="downtime">Max acceptable downtime window / cold boot cycle</option>
                          <option value="repair_time">Mean repair intervention and link recovery cycle</option>
                          <option value="before_failure">Expected equipment lifespan before hardware fault</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                {!pbqStates[6].solved && (
                  <button
                    onClick={() => validatePbq6(pbqStates[6].answers)}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    Audit Resiliency Metrics
                  </button>
                )}
              </div>
            )}

            {activePbq === 7 && (
              <div className="space-y-4">
                <div className="text-xs text-gray-500 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  <strong>Scenario:</strong> Compile an Access Control Entry (ACE) rule inside the Outside Interface ACL table that permits <strong>HTTPS traffic from the Internet to the Web Server</strong> (<code>10.10.10.10</code>) in the DMZ subnet.
                </div>

                <div className="grid grid-cols-5 gap-2 font-mono text-xs">
                  <div className="col-span-1">
                    <label className="block text-[9px] uppercase text-gray-400 font-black mb-1">Action</label>
                    <input
                      disabled={pbqStates[7].solved}
                      type="text"
                      placeholder="permit"
                      value={pbqStates[7].answers.action}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        7: { ...prev[7], answers: { ...prev[7].answers, action: e.target.value } }
                      }))}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[9px] uppercase text-gray-400 font-black mb-1">Proto</label>
                    <input
                      disabled={pbqStates[7].solved}
                      type="text"
                      placeholder="tcp"
                      value={pbqStates[7].answers.proto}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        7: { ...prev[7], answers: { ...prev[7].answers, proto: e.target.value } }
                      }))}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[9px] uppercase text-gray-400 font-black mb-1">Source</label>
                    <input
                      disabled={pbqStates[7].solved}
                      type="text"
                      placeholder="any"
                      value={pbqStates[7].answers.src}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        7: { ...prev[7], answers: { ...prev[7].answers, src: e.target.value } }
                      }))}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[9px] uppercase text-gray-400 font-black mb-1">Dest IP</label>
                    <input
                      disabled={pbqStates[7].solved}
                      type="text"
                      placeholder="10.10..."
                      value={pbqStates[7].answers.dst}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        7: { ...prev[7], answers: { ...prev[7].answers, dst: e.target.value } }
                      }))}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[9px] uppercase text-gray-400 font-black mb-1">Port</label>
                    <input
                      disabled={pbqStates[7].solved}
                      type="text"
                      placeholder="443"
                      value={pbqStates[7].answers.port}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        7: { ...prev[7], answers: { ...prev[7].answers, port: e.target.value } }
                      }))}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {!pbqStates[7].solved && (
                  <button
                    onClick={() => validatePbq7(pbqStates[7].answers)}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    Compile access-list ACE Table
                  </button>
                )}
              </div>
            )}

            {activePbq === 8 && (
              <div className="space-y-4">
                <div className="text-xs text-gray-500 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  <strong>Scenario:</strong> A technician ran a wire test across a Cat6 line. Read the wiremap telemetry diagnostic, select the failure issue, and enter an engineering explanation.
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-wide">Wiremap Telemetry</span>
                    <pre className="font-mono text-[10px] leading-relaxed text-gray-700 bg-white p-2.5 rounded-lg border border-gray-100">
{`Pair 1-2: OPEN
Pair 3-6: OK
Pair 4-5: OK
Pair 7-8: OK`}
                    </pre>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] text-gray-400 uppercase font-black tracking-wide">Select Logic Diagnostic</label>
                    <div className="space-y-2">
                      {[
                        { val: 'A', text: 'Short Circuit' },
                        { val: 'B', text: 'Split Pair' },
                        { val: 'C', text: 'Broken pair (pins 1 and 2)' },
                        { val: 'D', text: 'Reversed Polarity' }
                      ].map(opt => (
                        <button
                          key={opt.val}
                          disabled={pbqStates[8].solved}
                          onClick={() => setPbqStates(prev => ({
                            ...prev,
                            8: { ...prev[8], answers: { ...prev[8].answers, choice: opt.val } }
                          }))}
                          className={`w-full text-left p-2.5 rounded-xl border text-xs font-bold transition-all ${
                            pbqStates[8].answers.choice === opt.val
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {opt.val}) {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] text-gray-400 uppercase font-black tracking-wide">One-Sentence Explanation (e.g. why are pins 1-2 open?)</label>
                  <textarea
                    disabled={pbqStates[8].solved}
                    rows={2}
                    placeholder="Enter your justification..."
                    value={pbqStates[8].answers.justification}
                    onChange={(e) => setPbqStates(prev => ({
                      ...prev,
                      8: { ...prev[8], answers: { ...prev[8].answers, justification: e.target.value } }
                    }))}
                    className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all font-sans font-medium"
                  />
                </div>

                {!pbqStates[8].solved && (
                  <button
                    onClick={() => validatePbq8(pbqStates[8].answers)}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    Commit Diagnostics
                  </button>
                )}
              </div>
            )}

            {activePbq === 9 && (
              <div className="space-y-4">
                <div className="text-xs text-gray-500 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  <strong>Scenario:</strong> Choose the optimum WAPs configuration values to maximize high-density performance for newly acquired endpoints utilizing modern <strong>6 GHz bands</strong>.
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase font-black tracking-wide mb-1">Radio Band</label>
                    <select
                      disabled={pbqStates[9].solved}
                      value={pbqStates[9].answers.band}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        9: { ...prev[9], answers: { ...prev[9].answers, band: e.target.value } }
                      }))}
                      className="w-full text-xs font-bold bg-white border border-gray-200 rounded-xl p-3 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="">Band?</option>
                      <option value="2.4 GHz">2.4 GHz</option>
                      <option value="5 GHz">5 GHz</option>
                      <option value="6 GHz">6 GHz</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase font-black tracking-wide mb-1">802.11 Standard</label>
                    <select
                      disabled={pbqStates[9].solved}
                      value={pbqStates[9].answers.standard}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        9: { ...prev[9], answers: { ...prev[9].answers, standard: e.target.value } }
                      }))}
                      className="w-full text-xs font-bold bg-white border border-gray-200 rounded-xl p-3 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="">Standard?</option>
                      <option value="802.11n">802.11n (Wi-Fi 4)</option>
                      <option value="802.11ac">802.11ac (Wi-Fi 5)</option>
                      <option value="802.11ax">802.11ax (Wi-Fi 6E)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase font-black tracking-wide mb-1">Channel Width</label>
                    <select
                      disabled={pbqStates[9].solved}
                      value={pbqStates[9].answers.width}
                      onChange={(e) => setPbqStates(prev => ({
                        ...prev,
                        9: { ...prev[9], answers: { ...prev[9].answers, width: e.target.value } }
                      }))}
                      className="w-full text-xs font-bold bg-white border border-gray-200 rounded-xl p-3 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="">Width?</option>
                      <option value="20 MHz">20 MHz</option>
                      <option value="40 MHz">40 MHz</option>
                      <option value="80 MHz">80 MHz</option>
                      <option value="160 MHz">160 MHz</option>
                    </select>
                  </div>
                </div>

                {!pbqStates[9].solved && (
                  <button
                    onClick={() => validatePbq9(pbqStates[9].answers)}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    Publish Channel Plan
                  </button>
                )}
              </div>
            )}

            {activePbq === 10 && (
              <div className="space-y-4">
                <div className="text-xs text-gray-500 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl">
                  <strong>Scenario:</strong> Match the corporate security log trace lines below to their respective classification vectors relative to active network attacks.
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'arp', label: '1. MAC 00:11:22:33:44:55 claims 192.168.1.10; owner has AA:BB:CC:DD:EE:FF' },
                    { id: 'deauth', label: '2. Client disassociated - reason: Received deauth from AP with spoofed MAC' },
                    { id: 'udp', label: '3. UDP flood to 10.0.0.5:53 - 5000 packets/sec' },
                    { id: 'dns', label: '4. DNS response: www.bank.com -> 5.5.5.5 (known malicious IP)' }
                  ].map((log) => (
                    <div key={log.id} className="grid grid-cols-5 gap-3 items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                      <div className="col-span-3 text-[10px] font-mono leading-normal text-gray-800 break-all">{log.label}</div>
                      <div className="col-span-2">
                        <select
                          disabled={pbqStates[10].solved}
                          value={pbqStates[10].answers[log.id] || ''}
                          onChange={(e) => setPbqStates(prev => ({
                            ...prev,
                            10: { ...prev[10], answers: { ...prev[10].answers, [log.id]: e.target.value } }
                          }))}
                          className="w-full text-xs font-bold text-gray-800 bg-white border border-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="">[Attack Type]</option>
                          <option value="A">ARP Poisoning</option>
                          <option value="B">Evil Twin / Deauth</option>
                          <option value="C">DDoS / volumetric UDP</option>
                          <option value="D">DNS Spoofing / poisoning</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                {!pbqStates[10].solved && (
                  <button
                    onClick={() => validatePbq10(pbqStates[10].answers)}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    Commit threat intelligence classification map
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Explanation drawer when solved */}
          {pbqStates[activePbq].solved && (
            <div className="border-t border-gray-50 pt-5 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Official Exam Explanation
              </span>
              <p className="text-xs text-gray-600 leading-relaxed font-sans font-medium">
                {activePbq === 1 && "Physical layer deals with physical connections (cable unplugged). Data Link layer handles hardware framing and link verification (CRC errors). Network layer handles packet routes and IP addresses (default gateway routing errors). Transport layer routes segments via port definitions (firewall rules targeting port 443). Application layer handles final user presentation formats (HTTP 404 URL errors). Objective 1.1."}
                {activePbq === 2 && "A /26 subnet mask limits segments to blocks of 64 physical IP addresses, which provides 62 usable node host directions after accounting for network and broadcast boundaries. Subnet 3 begins at the .128 network direction boundary and terminates at the .191 broadcast boundary. Objective 1.7."}
                {activePbq === 3 && "Standard ports map FTP Control to TCP/21, SFTP to SSH/22, DNS Queries to UDP-TCP/53, DHCP Server-to-Client transfers to UDP/68, secure HTTPS to TCP/443, and Microsoft RDP to TCP/3389. Objective 1.4."}
                {activePbq === 4 && "Standard CompTIA order relies on a logical pipeline: 1. Identify the problem. 2. Establish a theory of probable cause. 3. Test the theory to determine the cause. 4. Establish a plan of action and identify potential effects. 5. Implement the solution or escalate. 6. Verify system functionality. 7. Document findings. Objective 5.1."}
                {activePbq === 5 && "Enabling endpoint access ports on IOS switch engines requires configuring switchport mode access to declare untagged access status, then running switchport access vlan <id> to map the ports to the internal target broadcast zone. Objective 2.2."}
                {activePbq === 6 && "Recovery Point Objective (RPO) governs maximum tolerable data loss duration between sync intervals. Recovery Time Objective (RTO) dictates maximum operational uptime recovery. Mean Time To Repair (MTTR) rates physical hardware intervention durations. Mean Time Between Failures (MTBF) measures lifespan parameters. Objective 3.3."}
                {activePbq === 7 && "Permitting incoming traffic requires starting with a permit action, declaring TCP transport layer, setting wildcard any source parameters, defining the server destination IP (10.10.10.10) and specifying port 443. Objective 4.3."}
                {activePbq === 8 && "A wire telemetry output indicating OPEN status represents a physical break/lack of signal continuity along the copper path. Pins 1 and 2 represent the active transmit pair in standard base networks. Objective 5.2."}
                {activePbq === 9 && "Deploying high-speed WAPs in the newly unlocked 6 GHz spectrum requires utilizing 802.11ax standard protocols, selecting wide 80 MHz or 160 MHz paths to maximize raw bandwidth over short, clean distances. Objective 2.3."}
                {activePbq === 10 && "A log reporting dual MAC ownership claims of a single IP address indicates active ARP Poisoning. Deauth packets denote an Evil Twin attack. Massive UDP packets targeted at port 53 denotes DDoS volumetric floods, while fraudulent destination redirects reveal Poisoned DNS entries. Objective 4.2."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
