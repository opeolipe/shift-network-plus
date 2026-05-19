/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Activity, Shield, Hash, LayoutGrid, Server, Globe, AlertCircle, RefreshCcw, Terminal } from 'lucide-react';
import { questions as initialQuestions } from './data';
import { Question } from './types';

const STORAGE_KEY = 'shift_srs_data';

const COMMON_COMMANDS = [
  'arp -a', 'arp -d', 'arp -s',
  'ipconfig', 'ipconfig /all', 'ipconfig /release', 'ipconfig /renew', 'ipconfig /flushdns',
  'ifconfig', 'ip addr', 'ip link',
  'ping', 'ping -t', 'ping -n', 'ping -6',
  'tracert', 'traceroute', 'pathping',
  'netstat', 'netstat -a', 'netstat -n', 'netstat -o', 'netstat -r', 'netstat -s', 'netstat -ano',
  'nslookup', 'dig', 'host',
  'nmap', 'tcpdump', 'wireshark',
  'route print', 'route add', 'route delete',
  'nbstat -a', 'nbstat -n', 'nbstat -r',
  'show run', 'show ip interface brief', 'show vlan', 'show interface'
];

export default function App() {
  const [view, setView] = useState<'home' | 'drill' | 'dashboard' | 'mock' | 'braindump' | 'tips'>('home');
  const [questionsPool, setQuestionsPool] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [exitX, setExitX] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [questionsAnsweredSinceCheck, setQuestionsAnsweredSinceCheck] = useState(0);
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [cliInput, setCliInput] = useState('');
  const [cliSuggestions, setCliSuggestions] = useState<string[]>([]);

  // Audio Mode State
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [audioIndex, setAudioIndex] = useState(0);

  // Braindump State
  const [braindumpText, setBraindumpText] = useState('');
  const [braindumpTimer, setBraindumpTimer] = useState(300);
  const [showReference, setShowReference] = useState(false);
  const [isBraindumpActive, setIsBraindumpActive] = useState(false);

  // CompTIA Vision State
  const [comptiaVision, setComptiaVision] = useState(false);
  const [showBlurredText, setShowBlurredText] = useState(false);

  // Syslog State
  const [syslogSelection, setSyslogSelection] = useState<number | null>(null);

  // Subnet Timer state
  const [subnetTimer, setSubnetTimer] = useState<number | null>(null);

  // Quarantine Mode State
  const [quarantine, setQuarantine] = useState<{ domain: string; domainId: string; count: number; correct: number } | null>(null);
  const [showQuarantineAlert, setShowQuarantineAlert] = useState(false);

  // Mock Exam State
  const [mockQuestions, setMockQuestions] = useState<Question[]>([]);
  const [mockCurrentIndex, setMockCurrentIndex] = useState(0);
  const [examTimer, setExamTimer] = useState(5400); // 90 minutes
  const [isExamOver, setIsExamOver] = useState(false);
  const [examScore, setExamScore] = useState(0);

  // Subnet Timer logic
  useEffect(() => {
    let interval: any;
    if (subnetTimer !== null && subnetTimer > 0 && !feedback && !isFlipped) {
      interval = setInterval(() => {
        setSubnetTimer(t => {
          if (t === null) return null;
          if (t <= 1) {
            clearInterval(interval);
            handleAnswer('TIME_EXPIRED'); // Incorrect by definition
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [subnetTimer, feedback, isFlipped]);

  // Restart subnet timer when a new subnet question is set
  useEffect(() => {
    if (currentQuestion?.type === 'subnet' && !feedback && !isFlipped) {
      setSubnetTimer(60);
    } else {
      setSubnetTimer(null);
    }
  }, [currentQuestion, feedback, isFlipped]);

  // Grouped Domain calculation logic
  const readiness = useMemo(() => {
    if (questionsPool.length === 0) return null;

    const domains = [
      { id: '1.0', name: 'Networking Concepts', target: 23, color: 'blue' },
      { id: '2.0', name: 'Network Implementation', target: 20, color: 'green' },
      { id: '3.0', name: 'Network Operations', target: 19, color: 'purple' },
      { id: '4.0', name: 'Network Security', target: 14, color: 'red' },
      { id: '5.0', name: 'Network Troubleshooting', target: 24, color: 'orange' },
    ];

    const stats = domains.map(d => {
      const domainQuestions = questionsPool.filter(q => q.domain.startsWith(d.id));
      if (domainQuestions.length === 0) return { ...d, mastery: 0 };

      const totalMastery = domainQuestions.reduce((acc, q) => {
        const m = Math.max(0, Math.min(100, ((10 - q.weight) / 9) * 100));
        return acc + m;
      }, 0);

      return { ...d, mastery: Math.round(totalMastery / domainQuestions.length) };
    });

    const averageMastery = Math.round(stats.reduce((acc, s) => acc + s.mastery, 0) / stats.length);

    return { stats, averageMastery };
  }, [questionsPool]);

  // Exam Timer
  useEffect(() => {
    let interval: any;
    if (view === 'mock' && !isExamOver && examTimer > 0) {
      interval = setInterval(() => {
        setExamTimer(t => {
          if (t <= 1) {
            clearInterval(interval);
            finishExam();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [view, isExamOver, examTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatMockTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Audio Mode Implementation
  const startAudioMode = () => {
    setIsAudioActive(true);
    setAudioIndex(0);
  };

  const stopAudioMode = () => {
    setIsAudioActive(false);
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    let timeout: any;
    if (isAudioActive && audioIndex < questionsPool.length) {
      const q = questionsPool[audioIndex];
      const speak = (text: string, onEnd?: () => void) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        if (onEnd) utterance.onend = onEnd;
        window.speechSynthesis.speak(utterance);
      };

      speak(`Question: ${q.question}`, () => {
        timeout = setTimeout(() => {
          speak(`The correct answer is: ${Array.isArray(q.correctAnswer) ? q.correctAnswer.join(" and ") : q.correctAnswer}`, () => {
            timeout = setTimeout(() => {
              setAudioIndex(i => i + 1);
            }, 2000);
          });
        }, 5000);
      });
    } else if (isAudioActive && audioIndex >= questionsPool.length) {
      setIsAudioActive(false);
    }
    return () => {
      clearTimeout(timeout);
      window.speechSynthesis.cancel();
    };
  }, [isAudioActive, audioIndex]);

  // Braindump Implementation
  const startBraindump = () => {
    setView('braindump');
    setBraindumpTimer(300);
    setBraindumpText('');
    setShowReference(false);
    setIsBraindumpActive(true);
  };

  useEffect(() => {
    let interval: any;
    if (view === 'braindump' && isBraindumpActive && braindumpTimer > 0) {
      interval = setInterval(() => {
        setBraindumpTimer(t => {
          if (t <= 1) {
            setIsBraindumpActive(false);
            clearInterval(interval);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [view, isBraindumpActive, braindumpTimer]);

  const generateMockExam = () => {
    const mock: Question[] = [];
    const domains = [
      { prefix: '1.0', count: 21 },
      { prefix: '2.0', count: 18 },
      { prefix: '3.0', count: 17 },
      { prefix: '4.0', count: 12 },
      { prefix: '5.0', count: 22 },
    ];

    domains.forEach(d => {
      const available = questionsPool.filter(q => q.domain.startsWith(d.prefix));
      if (available.length === 0) return;

      const domainQuestions: Question[] = [];
      while (domainQuestions.length < d.count) {
        const shuffled = [...available].sort(() => 0.5 - Math.random());
        domainQuestions.push(...shuffled.slice(0, d.count - domainQuestions.length));
      }
      mock.push(...domainQuestions);
    });

    setMockQuestions(mock.sort(() => 0.5 - Math.random()));
    setMockCurrentIndex(0);
    setExamTimer(5400);
    setIsExamOver(false);
    setExamScore(0);
    setView('mock');
    setCurrentQuestion(mock[0]);
  };

  const finishExam = () => {
    setIsExamOver(true);
    // Score calculation: (correct / total) * 900
    // Simplified for the mock length available
  };

  // Initialize data from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuestionsPool(parsed);
      } catch (e) {
        setQuestionsPool(initialQuestions);
      }
    } else {
      setQuestionsPool(initialQuestions);
    }
    
    const savedScore = localStorage.getItem('shift_score');
    if (savedScore) setScore(parseInt(savedScore));
  }, []);

  // Pick first question once pool is ready
  useEffect(() => {
    if (questionsPool.length > 0 && !currentQuestion) {
      setCurrentQuestion(pickWeightedQuestion(questionsPool));
    }
  }, [questionsPool, currentQuestion]);

  // Weighted Random Selection Algorithm
  const pickWeightedQuestion = (pool: Question[]): Question => {
    const totalWeight = pool.reduce((sum, q) => sum + q.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const q of pool) {
      if (random < q.weight) return q;
      random -= q.weight;
    }
    return pool[0];
  };

  const persistData = (newPool: Question[], newScore: number) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPool));
    localStorage.setItem('shift_score', newScore.toString());
  };

  const advanceNext = () => {
    // Immediate state resets to unblock UI
    setFeedback(null);
    setIsFlipped(false);
    setSliderValue(0);
    setMultiSelected([]);
    setCliInput('');
    setSyslogSelection(null);
    setShowBlurredText(false);
    x.set(0); 
    setExitX(0);

    const pickNext = () => {
      // Ensure we have questions to pick from
      if (!questionsPool || questionsPool.length === 0) {
        console.error("Questions pool is empty");
        return;
      }

      if (view === 'mock') {
        const nextIdx = mockCurrentIndex + 1;
        if (nextIdx < mockQuestions.length) {
          setMockCurrentIndex(nextIdx);
          setCurrentQuestion(mockQuestions[nextIdx]);
        } else {
          finishExam();
        }
      } else if (quarantine) {
        if (quarantine.count >= 10) {
          const passRate = quarantine.correct / quarantine.count;
          if (passRate >= 0.8) {
            setQuarantine(null);
            setCurrentQuestion(pickWeightedQuestion(questionsPool));
          } else {
            setQuarantine({ ...quarantine, count: 0, correct: 0 });
            setCurrentQuestion(pickQuarantineQuestion(quarantine.domainId));
          }
        } else {
          setCurrentQuestion(pickQuarantineQuestion(quarantine.domainId));
        }
      } else {
        if (questionsAnsweredSinceCheck >= 10) {
          setQuestionsAnsweredSinceCheck(0);
          checkAndTriggerQuarantine();
        } else {
          // Prevent immediate repeats with a safety fallback
          let nextQ = pickWeightedQuestion(questionsPool);
          if (currentQuestion && nextQ.id === currentQuestion.id && questionsPool.length > 1) {
            const others = questionsPool.filter(q => q.id !== currentQuestion.id);
            nextQ = others[Math.floor(Math.random() * others.length)];
          }
          setCurrentQuestion({ ...nextQ }); // Spread to force fresh object for React key detection
          setQuestionsAnswered(q => q + 1);
          setQuestionsAnsweredSinceCheck(c => c + 1);
        }
      }
    };

    // Use a slightly longer delay to ensure the flip animation has started and UI is consistent
    setTimeout(pickNext, 300);
  };

  const pickQuarantineQuestion = (domainId: string): Question => {
    const domainPool = questionsPool.filter(q => q.domain.startsWith(domainId));
    return domainPool[Math.floor(Math.random() * domainPool.length)];
  };

  const checkAndTriggerQuarantine = () => {
    if (readiness) {
      const weakDomain = readiness.stats.find(s => s.mastery < 65);
      if (weakDomain) {
        setQuarantine({ domain: weakDomain.name, domainId: weakDomain.id, count: 0, correct: 0 });
        setShowQuarantineAlert(true);
        setTimeout(() => setShowQuarantineAlert(false), 3000);
        setCurrentQuestion(pickQuarantineQuestion(weakDomain.id));
        return;
      }
    }
    
    // Default fallback if no weak domain or readiness not available yet
    setCurrentQuestion(pickWeightedQuestion(questionsPool));
    setQuestionsAnswered(q => q + 1);
    setQuestionsAnsweredSinceCheck(c => c + 1);
  };

  const handleAnswer = (answer: string | string[], direction?: 'left' | 'right') => {
    if (feedback || isFlipped || !currentQuestion) return;

    let isCorrect = false;
    if (currentQuestion.type === 'cli-interactive') {
      const normalizedInput = (answer as string).toLowerCase().trim().replace(/\s+/g, ' ');
      const normalizedCorrect = (currentQuestion.correctAnswer as string).toLowerCase().trim().replace(/\s+/g, ' ');
      isCorrect = normalizedInput === normalizedCorrect;
    } else if (currentQuestion.type === 'syslog') {
      isCorrect = Number(answer) === currentQuestion.correctLogIndex;
      setSyslogSelection(Number(answer));
    } else if (Array.isArray(currentQuestion.correctAnswer) && Array.isArray(answer)) {
      isCorrect = currentQuestion.correctAnswer.length === answer.length && 
                  currentQuestion.correctAnswer.every(a => answer.includes(a));
    } else {
      isCorrect = answer === currentQuestion.correctAnswer;
    }
    
    if (view !== 'mock') {
      // Update performance weights only in drill mode
      const newPool = questionsPool.map(q => {
        if (q.id === currentQuestion.id) {
          return {
            ...q,
            weight: isCorrect ? Math.max(1, q.weight - 2) : q.weight + 5
          };
        }
        return q;
      });
      setQuestionsPool(newPool);

      if (quarantine) {
        setQuarantine(prev => prev ? { ...prev, count: prev.count + 1, correct: isCorrect ? prev.correct + 1 : prev.correct } : null);
      }
      
      if (isCorrect) {
        const newScore = score + 100;
        setScore(newScore);
        persistData(newPool, newScore);
        setFeedback('correct');
        if (window.navigator.vibrate) window.navigator.vibrate(50);
        if (direction) setExitX(direction === 'left' ? -1000 : 1000);
        setTimeout(advanceNext, 800);
      } else {
        persistData(newPool, score);
        setFeedback('incorrect');
        if (window.navigator.vibrate) window.navigator.vibrate([100, 50, 100]);
        setTimeout(() => setIsFlipped(true), 400);
      }
    } else {
      // Mock Exam Mode logic
      if (isCorrect) setExamScore(s => s + 1);
      
      // No feedback in mock mode, just advance
      setFeedback(isCorrect ? 'correct' : 'incorrect');
      setTimeout(advanceNext, 500);
    }
  };

  const toggleMultiSelect = (opt: string) => {
    setMultiSelected(prev => 
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  };

  const handleCliChange = (val: string) => {
    setCliInput(val);
    if (val.trim()) {
      const matches = COMMON_COMMANDS.filter(cmd => cmd.toLowerCase().startsWith(val.toLowerCase()) && cmd.toLowerCase() !== val.toLowerCase());
      setCliSuggestions(matches.slice(0, 3));
    } else {
      setCliSuggestions([]);
    }
  };

  const applySuggestion = (suggestion: string) => {
    setCliInput(suggestion);
    setCliSuggestions([]);
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('shift_score');
    window.location.reload();
  };

  // Motion values
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const leftLabelOpacity = useTransform(x, [-100, -50], [1, 0]);
  const rightLabelOpacity = useTransform(x, [50, 100], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (!currentQuestion || currentQuestion.type !== 'architect' || isFlipped) return;
    
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleAnswer(currentQuestion.options[1], 'right');
    } else if (info.offset.x < -threshold) {
      handleAnswer(currentQuestion.options[0], 'left');
    }
  };

  const getCardStyles = () => {
    if (isFlipped) return 'border-orange-100 bg-white shadow-orange-50';
    if (!currentQuestion) return 'bg-white';
    switch (currentQuestion.type) {
      case 'port': return 'border-red-100 bg-white shadow-red-50';
      case 'subnet': return 'border-blue-100 bg-white shadow-blue-50';
      case 'acronym': return 'border-purple-100 bg-white shadow-purple-50';
      case 'cli': 
      case 'cli-interactive': return 'border-gray-800 bg-gray-950 shadow-gray-900';
      case 'visual': return 'border-emerald-100 bg-white shadow-emerald-50';
      default: return 'border-gray-100 bg-white shadow-gray-50';
    }
  };

  const getBadge = () => {
    if (isFlipped) return { icon: <Shield size={14} />, label: 'Review Mode', color: 'text-orange-500 bg-orange-50' };
    if (!currentQuestion) return { icon: <Shield size={14} />, label: 'Loading...', color: 'text-gray-400 bg-gray-100' };
    switch (currentQuestion.type) {
      case 'port': return { icon: <AlertCircle size={14} />, label: 'Firewall Alert', color: 'text-red-500 bg-red-50' };
      case 'subnet': return { icon: <Hash size={14} />, label: 'IP Request', color: 'text-blue-500 bg-blue-50' };
      case 'acronym': return { icon: <Activity size={14} />, label: 'Acronym Drill', color: 'text-purple-500 bg-purple-50' };
      case 'cli': 
      case 'cli-interactive': return { icon: <Activity size={14} />, label: 'Terminal', color: 'text-green-500 bg-green-950/30' };
      case 'syslog': return { icon: <Terminal size={14} />, label: 'Log Analysis', color: 'text-amber-600 bg-amber-50' };
      case 'visual': return { icon: <Globe size={14} />, label: 'Visual PBQ', color: 'text-emerald-600 bg-emerald-50' };
      default: return { icon: <Server size={14} />, label: 'Architect Dilemma', color: 'text-gray-500 bg-gray-100' };
    }
  };

  const badge = getBadge();

  return (
    <div className={`min-h-screen font-sans text-gray-900 flex flex-col items-center p-6 selection:bg-blue-100 overflow-hidden touch-none transition-colors duration-1000 ${
      quarantine ? 'bg-amber-50' : 'bg-[#FBFBFD]'
    }`}>
      {/* Quarantine Alert */}
      <AnimatePresence>
        {showQuarantineAlert && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 z-[100] w-full max-w-sm bg-orange-600 text-white p-5 rounded-3xl shadow-2xl flex items-center gap-4"
          >
            <div className="bg-white/20 p-2 rounded-xl">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest opacity-80">Weakness Detected</p>
              <p className="text-sm font-bold">Initiating {quarantine?.domain} Hyper-Drill</p>
              <p className="text-[10px] mt-1 opacity-90 font-medium leading-tight">Focusing on your weakest domain to improve overall N10-009 readiness.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!currentQuestion ? (
        <div className="flex-1 flex items-center justify-center font-bold text-gray-400">SHIFTING...</div>
      ) : (
        <>
          {/* Header */}
      <header className="w-full max-w-md flex justify-between items-center mb-10 mt-2">
        <div className="flex items-center gap-1.5" onClick={() => setView('home')}>
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center cursor-pointer">
            <Activity size={18} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Shift<span className="text-blue-500">.</span></h1>
        </div>
        <div className="flex flex-col items-end gap-2">
          {view === 'mock' ? (
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-[0.2em] text-red-500 font-black">Exam Timer</span>
              <span className={`text-xl font-bold font-mono tracking-tighter ${examTimer < 300 ? 'text-red-500 animate-pulse' : 'text-gray-900'}`}>
                {formatMockTime(examTimer)}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">XP Counter</span>
              <span className="text-xl font-bold font-mono tracking-tighter text-gray-600">{score.toLocaleString()}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Gameplay Area */}
      <main className="flex-1 w-full max-w-md flex flex-col items-center justify-center relative perspective-1000">
        {view === 'home' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full space-y-4"
          >
            <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl shadow-blue-100 border border-blue-50 text-center mb-6">
              <div className="w-20 h-20 bg-blue-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-200">
                <Activity size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-black tracking-tighter text-gray-900 mb-2">Ready to Shift?</h2>
              <p className="text-gray-500 font-medium mb-8">Master the N10-009 with precision drilling or full simulation.</p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={() => setView('drill')}
                    className="group relative w-full py-8 bg-gray-900 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-gray-200/50 hover:bg-black transition-all active:scale-95 flex flex-col items-center justify-center overflow-hidden"
                  >
                    <span className="relative z-10">Smart Review</span>
                    <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold mt-1">Adaptive Learning Engine</span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <button 
                    onClick={generateMockExam}
                    className="w-full py-6 bg-white text-gray-900 border-2 border-gray-100 rounded-[2.5rem] font-bold text-lg hover:border-gray-900 transition-all active:scale-95 flex flex-col items-center"
                  >
                    Full Mock Exam
                    <span className="text-[9px] uppercase tracking-widest opacity-40">90 Questions • 90 Minutes</span>
                  </button>
                </div>

                <div className="pt-8 space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-center mb-2">Advanced Study Lab</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={startBraindump}
                      className="py-4 px-2 bg-gray-50 text-gray-700 rounded-2xl font-bold text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                    >
                      <Terminal size={14} />
                      Braindump
                    </button>
                    <button 
                      onClick={() => setView('tips')}
                      className="py-4 px-2 bg-gray-50 text-gray-700 rounded-2xl font-bold text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                    >
                      <Shield size={14} />
                      Strategy
                    </button>
                  </div>

                  {!isAudioActive ? (
                    <button 
                      onClick={startAudioMode}
                      className="w-full py-4 bg-emerald-50/50 text-emerald-700 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all"
                    >
                      <Activity size={14} />
                      Commute Mode (Audio)
                    </button>
                  ) : (
                    <button 
                      onClick={stopAudioMode}
                      className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 animate-pulse transition-all"
                    >
                      <Activity size={14} />
                      Stop Audio Drill
                    </button>
                  )}

                  <div className="flex items-center justify-between p-4 bg-gray-100/50 rounded-2xl mt-4">
                    <div className="flex items-center gap-3">
                      <Shield size={16} className="text-gray-400" />
                      <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500">CompTIA Vision (Anti-Fluff)</span>
                    </div>
                    <button 
                      onClick={() => setComptiaVision(!comptiaVision)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${comptiaVision ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                      <motion.div 
                        animate={{ x: comptiaVision ? 20 : 2 }}
                        className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 text-center" onClick={() => setView('dashboard')}>
                <LayoutGrid size={24} className="mx-auto text-blue-500 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Readiness</span>
                <div className="text-xl font-black text-gray-900">{readiness?.averageMastery}%</div>
              </div>
              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 text-center" onClick={resetProgress}>
                <RefreshCcw size={24} className="mx-auto text-red-400 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reset</span>
                <div className="text-xl font-black text-gray-900">Clear</div>
              </div>
            </div>
          </motion.div>
        ) : view === 'braindump' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-white z-[200] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <Terminal size={24} className="text-gray-400" />
                <h2 className="text-xl font-black uppercase tracking-tighter">Braindump Canvas</h2>
              </div>
              <div className={`text-2xl font-mono font-black ${braindumpTimer < 60 ? 'text-red-500 animate-pulse' : 'text-gray-900'}`}>
                {formatTime(braindumpTimer)}
              </div>
              <button 
                onClick={() => setView('home')}
                className="p-2 rounded-full bg-gray-100 text-gray-500"
              >
                Exit
              </button>
            </div>
            
            <div className="flex-1 relative">
              <textarea 
                readOnly={!isBraindumpActive}
                value={braindumpText}
                onChange={(e) => setBraindumpText(e.target.value)}
                placeholder="Type your Subnetting charts, OSI model, and port numbers here..."
                className={`w-full h-full bg-gray-50 rounded-[3rem] p-10 font-mono text-lg border-none focus:ring-0 resize-none ${!isBraindumpActive ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              {!isBraindumpActive && (
                <div className="absolute inset-x-0 bottom-10 flex justify-center gap-4">
                  <button 
                    onClick={() => setShowReference(!showReference)}
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg"
                  >
                    {showReference ? 'Hide Reference' : 'Show Reference Cheat Sheet'}
                  </button>
                </div>
              )}
            </div>

            <AnimatePresence>
              {showReference && (
                <motion.div 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  className="mt-8 bg-gray-900 text-green-400 p-8 rounded-[3rem] font-mono text-xs overflow-y-auto max-h-[300px]"
                >
                  <h3 className="text-white font-black uppercase mb-4 text-center">N10-009 Cheat Sheet Reference</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-white font-bold mb-2">OSI MODEL</p>
                      <p>7. Application (Data)</p>
                      <p>6. Presentation (Data)</p>
                      <p>5. Session (Data)</p>
                      <p>4. Transport (Segments)</p>
                      <p>3. Network (Packets)</p>
                      <p>2. Data Link (Frames)</p>
                      <p>1. Physical (Bits)</p>
                    </div>
                    <div>
                      <p className="text-white font-bold mb-2">SUBNETTING / CIDR</p>
                      <p>/24 - 255.255.255.0 (254 hosts)</p>
                      <p>/25 - 128 (126 hosts)</p>
                      <p>/26 - 192 (62 hosts)</p>
                      <p>/27 - 224 (30 hosts)</p>
                      <p>/28 - 240 (14 hosts)</p>
                      <p>/29 - 248 (6 hosts)</p>
                      <p>/30 - 252 (2 hosts)</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : view === 'tips' ? (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 max-w-2xl mx-auto space-y-8 pb-32"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield size={32} className="text-amber-500" />
                <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Strategy Vault</h1>
              </div>
              <button 
                onClick={() => setView('home')}
                className="p-3 bg-gray-100 rounded-2xl font-bold text-sm text-gray-500 hover:bg-gray-200 transition-colors"
              >
                Exit
              </button>
            </div>

            <div className="space-y-6">
              {[
                {
                  id: 1,
                  title: 'The "PBQ Pivot"',
                  subtitle: 'Protect Your Morale',
                  desc: 'The very first 3-5 questions are massive, terrifying Performance-Based Questions. CompTIA puts these first to induce panic.',
                  rule: 'Flag them and skip them immediately. Go straight to Question 6. Smash the 80 multiple-choice questions first to build confidence.',
                  icon: <Activity className="text-red-500" />
                },
                {
                  id: 2,
                  title: 'The 5-Minute Braindump',
                  subtitle: 'The Legal Cheat Code',
                  desc: 'Before the timer starts, use your whiteboard. Do not start the test until you have written down your subnetting charts and OSI layers.',
                  rule: 'At minute 85, when your brain is fried, you won’t be able to do binary math. Just look at your whiteboard.',
                  icon: <Terminal className="text-purple-500" />
                },
                {
                  id: 3,
                  title: 'The "Reverse Reading" Technique',
                  subtitle: 'Filter the Fluff',
                  desc: 'CompTIA writes 5-sentence paragraphs for simple questions. Bob from HR moving floors is useless backstory.',
                  rule: 'Read the LAST sentence first, then the answers, then the paragraph. Scan for keywords you already know you need.',
                  icon: <RefreshCcw className="text-blue-500" />
                },
                {
                  id: 4,
                  title: 'Crack the "FIRST, BEST, MOST" Code',
                  subtitle: 'Protocol Priority',
                  desc: 'If a question asks what to do FIRST, it is almost always Layer 1 or Identifying the Problem.',
                  rule: 'Never jump to configuring BGP if you haven\'t checked if the server is plugged in. Always look for the simplest physical or human step first.',
                  icon: <Shield className="text-emerald-500" />
                },
                {
                  id: 5,
                  title: 'The "45-Second Law"',
                  subtitle: 'Time Management',
                  desc: 'You have exactly 1 minute per question. Some are "beta questions" that don\'t even count toward your score.',
                  rule: 'If you stare for 45 seconds and are lost: Pick "C", flag for review, and move on. Do not waste 5 minutes on a potential beta question.',
                  icon: <Hash className="text-amber-500" />
                },
                {
                  id: 6,
                  title: 'The 24-Hour Taper',
                  subtitle: 'Mental Defragmentation',
                  desc: 'The day before your exam, do not study new material. Relax, eat well, and sleep 8 hours.',
                  rule: 'Play this Shift app lightly at a cafe to keep ports fresh, but let your brain rest. Your subconscious needs to organize the data.',
                  icon: <Globe className="text-indigo-500" />
                }
              ].map(tip => (
                <div key={tip.id} className="bg-white border-2 border-gray-100 p-8 rounded-[3rem] shadow-xl shadow-gray-200/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-2xl">{tip.icon}</div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none">{tip.title}</h3>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">{tip.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 font-medium leading-relaxed">
                    {tip.desc}
                  </p>
                  <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                    <p className="text-[10px] font-black uppercase text-amber-600 mb-2 tracking-tighter italic">CLO's Rule:</p>
                    <p className="text-xs font-bold text-amber-900 leading-normal">{tip.rule}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setView('home')}
              className="w-full py-6 bg-gray-900 text-white rounded-[2.5rem] font-black text-xl shadow-2xl active:scale-95 transition-all"
            >
              Mastered. Back to Drill.
            </button>
          </motion.div>
        ) : view === 'mock' && isExamOver ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white p-10 rounded-[3.5rem] border shadow-2xl text-center"
          >
             <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black ${
               (examScore / mockQuestions.length) * 900 >= 720 ? 'bg-green-500' : 'bg-red-500'
             }`}>
               {Math.round((examScore / mockQuestions.length) * 900)}
             </div>
             <h2 className="text-3xl font-black tracking-tighter mb-2">
               { (examScore / mockQuestions.length) * 900 >= 720 ? 'CERTIFIED!' : 'TRY AGAIN' }
             </h2>
             <p className="text-gray-500 font-medium mb-8">
               You scored {examScore} out of {mockQuestions.length} correct in {formatTime(5400 - examTimer)}.
               Passing score: 720/900.
             </p>
             <button 
               onClick={() => setView('home')}
               className="w-full py-5 bg-gray-900 text-white rounded-3xl font-bold text-lg"
             >
               Return Home
             </button>
          </motion.div>
        ) : (view === 'drill' || view === 'mock') ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                style={{ x, rotate, opacity, transformStyle: "preserve-3d" }}
                drag={(currentQuestion.type === 'architect' || currentQuestion.type === 'acronym') && !isFlipped && view !== 'mock' ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  rotateY: isFlipped ? 180 : 0
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.9, 
                  x: exitX,
                  rotate: exitX > 0 ? 45 : exitX < 0 ? -45 : 0
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`w-full min-h-[620px] rounded-[3rem] shadow-2xl flex flex-col border ${getCardStyles()} relative ${view !== 'mock' ? 'cursor-grab active:cursor-grabbing' : ''}`}
                id="active-card"
              >
                {/* FRONT OF CARD */}
                <div 
                  className={`absolute inset-0 p-8 flex flex-col backface-hidden rounded-[3rem] ${currentQuestion.type === 'cli' || currentQuestion.type === 'cli-interactive' ? 'bg-gray-950' : 'bg-white'}`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* CLI Traffic Lights */}
                  {(currentQuestion.type === 'cli' || currentQuestion.type === 'cli-interactive') && (
                    <div className="flex gap-1.5 mb-6 opacity-40">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                      <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    </div>
                  )}

                  {/* Feedback Overlay - Only in Drill Mode */}
                  {view === 'drill' && feedback && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[2px] rounded-[3rem] ${feedback === 'correct' ? 'bg-green-500/10' : 'bg-red-500/10'}`}
                    >
                      <div className={`p-4 rounded-full ${feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'} text-white shadow-xl`}>
                        {feedback === 'correct' ? <Shield size={40} /> : <AlertCircle size={40} />}
                      </div>
                    </motion.div>
                  )}

                  {/* Subnet Timer Progress Bar */}
                  {currentQuestion.type === 'subnet' && subnetTimer !== null && (
                    <div className="absolute top-0 left-0 w-full h-1.5 overflow-hidden rounded-t-[3rem]">
                      <motion.div 
                        className="h-full bg-blue-500"
                        initial={{ width: '100%' }}
                        animate={{ width: `${(subnetTimer / 60) * 100}%` }}
                        transition={{ duration: 1, ease: "linear" }}
                      />
                    </div>
                  )}

                  {/* Swipe Labels (Visual Cues) - Only in Drill Mode */}
                  {view === 'drill' && currentQuestion.type === 'architect' && !isFlipped && (
                    <>
                      <motion.div 
                        style={{ opacity: leftLabelOpacity }}
                        className="absolute top-12 left-8 border-4 border-red-500 rounded-xl px-4 py-2 rotate-[-15deg] z-20 pointer-events-none"
                      >
                        <span className="text-red-500 font-bold text-2xl uppercase tracking-tighter">{currentQuestion.options[0]}</span>
                      </motion.div>
                      <motion.div 
                        style={{ opacity: rightLabelOpacity }}
                        className="absolute top-12 right-8 border-4 border-green-500 rounded-xl px-4 py-2 rotate-[15deg] z-20 pointer-events-none"
                      >
                        <span className="text-green-500 font-bold text-2xl uppercase tracking-tighter">{currentQuestion.options[1]}</span>
                      </motion.div>
                    </>
                  )}

                  {/* Badge & Domain Info */}
                  <div className="flex justify-between items-start mb-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit ${badge.color}`}>
                      {badge.icon}
                      <span className="text-[10px] font-bold uppercase tracking-widest leading-none tracking-wider">
                        {view === 'mock' ? `Q ${mockCurrentIndex + 1}/${mockQuestions.length}` : badge.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`text-[9px] font-bold ${currentQuestion.type === 'cli' || currentQuestion.type === 'cli-interactive' ? 'text-gray-600' : 'text-gray-400'} uppercase tracking-tighter`}>{currentQuestion.domain}</div>
                      <div className={`text-[10px] font-bold ${currentQuestion.type === 'cli' || currentQuestion.type === 'cli-interactive' ? 'text-green-500/40' : 'text-blue-500/60'} uppercase tracking-tighter`}>{currentQuestion.objective}</div>
                    </div>
                  </div>

                    {/* Question Text */}
                    <div className="flex-1 flex flex-col justify-center min-h-0">
                      {currentQuestion.imageUrl && (
                        <div className="mb-4 rounded-2xl overflow-hidden border border-gray-100 shadow-sm max-h-[140px] shrink-0">
                          <img src={currentQuestion.imageUrl} alt="PBQ Visual" className="w-full h-full object-contain bg-gray-50" />
                        </div>
                      )}
                      {currentQuestion.type === 'acronym' ? (
                        <h2 className={`font-black leading-none text-gray-900 tracking-tighter text-center uppercase shrink ${
                          currentQuestion.question.length > 10 ? 'text-[3rem]' : 'text-[4.5rem]'
                        }`}>
                          {currentQuestion.question.includes(': ') ? currentQuestion.question.split(': ')[1] : currentQuestion.question}
                        </h2>
                      ) : (
                        <h2 
                          onClick={() => setShowBlurredText(true)}
                          className={`font-bold leading-[1.2] tracking-tight transition-all duration-500 overflow-hidden shrink ${
                            currentQuestion.type === 'cli' ? 'text-green-400 font-mono' : 'text-gray-800'
                          } ${
                            // Dynamic font size based on question length AND number of options
                            (() => {
                              const qLen = currentQuestion.question.length;
                              const optCount = currentQuestion.options.length;
                              const hasLongOptions = currentQuestion.options.some(o => o.length > 40);
                              
                              if (qLen > 250 || (qLen > 150 && (optCount > 4 || hasLongOptions))) return 'text-base';
                              if (qLen > 150 || (qLen > 100 && (optCount > 4 || hasLongOptions))) return 'text-lg';
                              if (qLen > 80) return 'text-xl';
                              return 'text-2xl';
                            })()
                          } ${comptiaVision && currentQuestion.question.length > 100 && !showBlurredText ? 'cursor-pointer' : ''}`}
                        >
                        {(() => {
                          const text = currentQuestion.question;
                          if (currentQuestion.type === 'cli') {
                            return (
                              <>
                                <span className="text-green-700 mr-2">$</span>
                                {text}
                              </>
                            );
                          }
                          
                          if (comptiaVision && text.length > 100 && !showBlurredText) {
                            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
                            const lastSentence = sentences.pop();
                            const fluff = sentences.join('');
                            return (
                              <>
                                <span className="blur-[5px] select-none opacity-50">{fluff}</span>
                                <span>{lastSentence}</span>
                              </>
                            );
                          }
                          return text;
                        })()}
                      </h2>
                    )}
                  </div>

                  {/* Interactive Inputs */}
                  <div className="mt-8 space-y-4">
                    {currentQuestion.type === 'cli-interactive' ? (
                      <div className="space-y-4">
                        <div className="relative p-6 bg-gray-900 border border-gray-800 rounded-[2rem] font-mono text-sm shadow-inner group">
                          <div className="flex items-start gap-3">
                            <span className="text-green-700 font-bold">$</span>
                            <div className="flex-1 relative">
                              {/* Validation Overlay */}
                              <div className="absolute inset-0 pointer-events-none whitespace-pre-wrap break-all flex">
                                {cliInput.split('').map((char, i) => {
                                  const correctChar = (currentQuestion.correctAnswer as string)[i];
                                  const isCorrect = correctChar && char.toLowerCase() === correctChar.toLowerCase();
                                  return (
                                    <span 
                                      key={i} 
                                      className={`${isCorrect ? 'text-green-400' : 'text-red-500 bg-red-500/20 underline decoration-red-500 decoration-2'}`}
                                    >
                                      {char}
                                    </span>
                                  );
                                })}
                              </div>
                              
                              <input 
                                autoFocus
                                type="text"
                                value={cliInput}
                                onChange={(e) => handleCliChange(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleAnswer(cliInput);
                                  if (e.key === 'Tab' && cliSuggestions.length > 0) {
                                    e.preventDefault();
                                    applySuggestion(cliSuggestions[0]);
                                  }
                                }}
                                spellCheck={false}
                                autoComplete="off"
                                className="bg-transparent border-none outline-none text-transparent caret-green-500 w-full resize-none z-10 relative"
                              />
                              
                              {!cliInput && (
                                <span className="absolute left-0 text-green-900 opacity-40 pointer-events-none italic">
                                  Waiting for input...
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Auto-complete suggestions */}
                          <AnimatePresence>
                            {cliSuggestions.length > 0 && (
                              <motion.div 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute left-6 bottom-[-4rem] flex gap-2 z-20"
                              >
                                {cliSuggestions.map(s => (
                                  <button 
                                    key={s}
                                    onClick={() => applySuggestion(s)}
                                    className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-green-400/70 text-[10px] rounded-lg hover:bg-gray-700 hover:text-green-400 transition-all font-bold"
                                  >
                                    {s}
                                  </button>
                                ))}
                                <span className="text-[9px] text-gray-600 flex items-center font-bold uppercase tracking-tighter">[TAB] to Auto-fill</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        <button 
                          onClick={() => handleAnswer(cliInput)}
                          className="w-full py-5 rounded-2xl bg-green-500 text-black font-black text-lg hover:bg-green-400 shadow-xl shadow-green-950/20 transition-all active:scale-95"
                        >
                          Execute Command
                        </button>
                      </div>
                    ) : currentQuestion.type === 'syslog' ? (
                      <div className="space-y-2 bg-gray-950 p-6 rounded-[2rem] border border-gray-800 shadow-2xl">
                        {currentQuestion.logData?.map((line, idx) => {
                          const isCorrect = idx === currentQuestion.correctLogIndex;
                          const isSelected = syslogSelection === idx;
                          const showResult = feedback || isFlipped;

                          return (
                            <button
                              key={idx}
                              disabled={showResult}
                              onClick={() => handleAnswer(idx.toString())}
                              className={`w-full text-left font-mono text-[10px] p-2.5 rounded-lg border transition-all ${
                                showResult
                                  ? isCorrect
                                    ? 'bg-green-500/20 border-green-500 text-green-400'
                                    : isSelected
                                      ? 'bg-red-500/20 border-red-500 text-red-400'
                                      : 'bg-transparent border-transparent text-gray-600'
                                  : 'bg-transparent border-transparent text-gray-400 hover:bg-gray-900 hover:text-white hover:border-gray-700'
                              }`}
                            >
                              <span className="opacity-30 mr-3">{idx + 1}</span>
                              {line}
                            </button>
                          );
                        })}
                      </div>
                    ) : currentQuestion.type === 'multi-select' ? (
                      <div className="space-y-3">
                        {currentQuestion.options.map(opt => (
                           <button
                             key={opt}
                             onClick={() => toggleMultiSelect(opt)}
                             className={`w-full py-4 px-6 text-left rounded-2xl border transition-all font-bold flex justify-between items-center group ${
                               multiSelected.includes(opt) 
                                ? 'bg-blue-500 border-blue-500 text-white' 
                                : 'bg-gray-50 border-gray-100 text-gray-700'
                             }`}
                           >
                             <span>{opt}</span>
                             <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                               multiSelected.includes(opt) ? 'bg-white border-white' : 'bg-white border-gray-300'
                             }`}>
                               {multiSelected.includes(opt) && <div className="w-2.5 h-2.5 bg-blue-500 rounded-[2px]" />}
                             </div>
                           </button>
                        ))}
                        <button 
                          disabled={multiSelected.length === 0}
                          onClick={() => handleAnswer(multiSelected)}
                          className={`mt-4 w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-95 ${
                            multiSelected.length > 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Submit Response
                        </button>
                      </div>
                    ) : currentQuestion.type === 'subnet' ? (
                      <div className="space-y-6 px-2">
                        <div className="text-center font-mono text-3xl font-bold text-blue-600">
                          {currentQuestion.options[Math.floor(sliderValue * (currentQuestion.options.length - 1) / 100)]}
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          value={sliderValue}
                          onChange={(e) => setSliderValue(parseInt(e.target.value))}
                          className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <button 
                          onClick={() => handleAnswer(currentQuestion.options[Math.floor(sliderValue * (currentQuestion.options.length - 1) / 100)])}
                          className="w-full py-5 rounded-2xl bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 shadow-xl shadow-blue-100 transition-all active:scale-95"
                        >
                          Allocate Subnet
                        </button>
                      </div>
                    ) : (currentQuestion.type === 'architect' || currentQuestion.type === 'acronym' || currentQuestion.options.length === 2) ? (
                      <div className="grid grid-cols-2 gap-4">
                        {currentQuestion.options.map((opt, idx) => (
                          <button
                            key={opt}
                            onClick={() => handleAnswer(opt, idx === 0 ? 'left' : 'right')}
                            className={`py-6 px-4 rounded-3xl font-bold text-xl transition-all shadow-lg active:scale-95 ${
                              idx === 0 
                                ? (currentQuestion.type === 'cli' ? 'bg-green-500 text-black shadow-green-950/20 hover:bg-green-400' : 'bg-gray-900 text-white shadow-gray-200 hover:bg-black')
                                : (currentQuestion.type === 'cli' ? 'bg-gray-900 text-green-500 border border-gray-800 shadow-none hover:bg-gray-800' : 'bg-white text-gray-900 border border-gray-100 shadow-gray-100 hover:bg-gray-50')
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2 mt-4 shrink-0">
                        {currentQuestion.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleAnswer(opt)}
                            className={`w-full p-4 text-left rounded-2xl border transition-all font-bold flex justify-between items-center group active:scale-[0.98] ${
                              currentQuestion.type === 'cli'
                                ? 'bg-gray-900 border-gray-800 text-green-500/80 hover:bg-gray-800 hover:border-green-500/30'
                                : 'bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100 hover:border-gray-200'
                            }`}
                          >
                            <span className={`text-xs md:text-sm leading-tight break-words pr-2 ${currentQuestion.type === 'cli' ? 'font-mono' : ''}`}>{opt}</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              currentQuestion.type === 'cli' 
                                ? 'bg-gray-950 border-gray-700 group-hover:border-green-500/50' 
                                : 'bg-white border-gray-200 group-hover:border-blue-300'
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full bg-transparent ${
                                currentQuestion.type === 'cli' ? 'group-hover:bg-green-500' : 'group-hover:bg-blue-400'
                              }`} />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* BACK OF CARD */}
                <div 
                  className="absolute inset-0 p-8 flex flex-col bg-white rounded-[3rem] rotate-y-180"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit text-orange-500 bg-orange-50">
                      <Shield size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Review Explanation</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{currentQuestion.domain}</div>
                      <div className="text-[10px] font-bold text-orange-500/60 uppercase tracking-tighter">{currentQuestion.objective}</div>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 text-center">The Solution</h3>
                    <p className="text-2xl font-black text-blue-600 mb-8 text-center tracking-tighter">
                      {Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer.join(', ') : currentQuestion.correctAnswer}
                    </p>
                    
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 text-center">Analysis</h3>
                    <div className="text-base text-gray-600 leading-relaxed font-bold space-y-4">
                      {currentQuestion.explanation}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (window.navigator.vibrate) window.navigator.vibrate(20);
                      advanceNext();
                    }}
                    className="mt-6 w-full py-6 rounded-[2rem] bg-gray-900 text-white font-black text-xl hover:bg-black shadow-2xl shadow-gray-200 transition-all active:scale-95"
                  >
                    Next Ticket
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Status Bar */}
            <div className="mt-12 w-full px-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {view === 'mock' ? 'Exam Progress' : 'Shift Progress'}
                </span>
                <span className="text-[10px] font-mono font-bold text-blue-500">
                  {view === 'mock' ? `${mockCurrentIndex + 1}/90` : 'LEVEL 0.9'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500 rounded-full"
                  animate={{ 
                    width: `${view === 'mock' 
                      ? ((mockCurrentIndex + 1) / mockQuestions.length) * 100 
                      : Math.min(100, (questionsAnswered / questionsPool.length) * 100)}%` 
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-full flex flex-col p-6 overflow-y-auto custom-scrollbar"
          >
            <div className="mb-10 text-center">
              <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Exam Probability</h2>
              <div className="text-5xl font-black text-gray-900 tracking-tighter">
                {readiness?.averageMastery}%
              </div>
            </div>

            <div className="space-y-6">
              {readiness?.stats.map(s => (
                <div key={s.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Domain {s.id}</span>
                      <span className="text-sm font-bold text-gray-800 leading-tight pr-4">{s.name}</span>
                    </div>
                    <div className="text-xl font-black text-gray-900">{s.mastery}%</div>
                  </div>
                  <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full ${
                        s.mastery < 70 ? 'bg-red-400' : s.mastery < 85 ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.mastery}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Exam Weight: {s.target}%</span>
                    <span className={`text-[9px] font-bold uppercase transition-colors ${
                      s.mastery < 70 ? 'text-red-500' : s.mastery < 85 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {s.mastery < 70 ? 'Critical Review' : s.mastery < 85 ? 'Reinforce' : 'Certified'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-blue-50 rounded-[2.5rem] border border-blue-100/50">
              <p className="text-blue-900/60 text-[10px] font-bold uppercase tracking-widest text-center">Data Summary</p>
              <p className="text-blue-900 text-xs text-center mt-2 leading-relaxed">
                Your readiness is calculated using SRS data. <br/>Keep drilling weakly reinforced domains.
              </p>
            </div>
          </motion.div>
        )}
      </main>

      {/* Navigation Footer */}
      <nav className="w-full max-w-md mt-auto pt-10 flex justify-around items-center border-t border-gray-50 border-opacity-50 px-8">
        <div 
          onClick={() => setView('drill')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${view === 'drill' ? 'opacity-100 scale-110' : 'opacity-30 hover:opacity-50'}`}
        >
          <Activity size={20} className={view === 'drill' ? 'text-blue-500' : 'text-gray-400'} />
          <span className="text-[8px] font-black uppercase tracking-widest">Drill</span>
        </div>
        
        <div className="w-px h-6 bg-gray-100" />
        
        <div 
          onClick={() => setView('dashboard')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${view === 'dashboard' ? 'opacity-100 scale-110' : 'opacity-30 hover:opacity-50'}`}
        >
          <LayoutGrid size={20} className={view === 'dashboard' ? 'text-blue-500' : 'text-gray-400'} />
          <span className="text-[8px] font-black uppercase tracking-widest">Stats</span>
        </div>
      </nav>
        </>
      )}
    </div>
  );
}
