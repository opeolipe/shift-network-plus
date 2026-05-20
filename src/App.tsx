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
  const [recentQuestionIds, setRecentQuestionIds] = useState<string[]>([]);
  const [sessionHistory, setSessionHistory] = useState<any[]>([]);
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
    saveSessionStats(Math.round((examScore / mockQuestions.length) * 100), mockQuestions.length);
  };

  const saveSessionStats = (scorePercent: number, count: number) => {
    if (!readiness) return;
    
    const sortedStats = [...readiness.stats].sort((a, b) => a.mastery - b.mastery);
    const weakest = sortedStats[0]?.name || 'N/A';
    const strongest = sortedStats[sortedStats.length - 1]?.name || 'N/A';

    const newSession = {
      date: new Date().toISOString(),
      score: scorePercent,
      questionsAnswered: count,
      weakestDomain: weakest,
      strongestDomain: strongest
    };

    const updatedHistory = [newSession, ...sessionHistory].slice(0, 10); // Keep last 10
    setSessionHistory(updatedHistory);
    localStorage.setItem('shift_session_history', JSON.stringify(updatedHistory));
  };

  const calculateExamTimeline = () => {
    if (!readiness || readiness.averageMastery === 0) {
      return {
        date: 'Complete Shifts to Calculate',
        daysRemaining: null,
        phase: 1
      };
    }
    
    const currentMastery = readiness.averageMastery;
    const remaining = Math.max(0, 95 - currentMastery);
    const daysNeeded = Math.ceil(remaining / 2); // 2% per day
    
    const examDate = new Date();
    examDate.setDate(examDate.getDate() + daysNeeded);
    
    return {
      date: examDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      daysRemaining: daysNeeded,
      phase: currentMastery >= 95 ? 4 : currentMastery >= 80 ? 3 : currentMastery >= 50 ? 2 : 1
    };
  };

  // SRS Mastery Trigger (Every 20 questions)
  useEffect(() => {
    if (questionsAnswered > 0 && questionsAnswered % 20 === 0) {
      saveSessionStats(readiness?.averageMastery || 0, 20);
    }
  }, [questionsAnswered]);

  const [showXpToast, setShowXpToast] = useState(false);
  const [lastXpGain, setLastXpGain] = useState(0);

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

    const savedHistory = localStorage.getItem('shift_session_history');
    if (savedHistory) {
      try {
        setSessionHistory(JSON.parse(savedHistory));
      } catch (e) {
        setSessionHistory([]);
      }
    }
  }, []);

  // Pick first question once pool is ready
  useEffect(() => {
    if (questionsPool.length > 0 && !currentQuestion) {
      const q = pickWeightedQuestion(questionsPool);
      if (q.options) q.options = [...q.options].sort(() => Math.random() - 0.5);
      setCurrentQuestion(q);
    }
  }, [questionsPool, currentQuestion]);

  // Weighted Random Selection Algorithm
  const pickWeightedQuestion = (pool: Question[], excludeIds: string[] = []): Question => {
    // Filter pool to exclude recent IDs
    let filteredPool = pool.filter(q => !excludeIds.includes(q.id));
    
    // Fallback if everyone is excluded (shouldn't happen with pool size > recent limit)
    if (filteredPool.length === 0) {
      filteredPool = pool;
    }

    const totalWeight = filteredPool.reduce((sum, q) => sum + q.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const q of filteredPool) {
      if (random < q.weight) return q;
      random -= q.weight;
    }
    return filteredPool[0];
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
          // Exclude recent questions (last 20)
          const nextQ = pickWeightedQuestion(questionsPool, recentQuestionIds);
          
          // Shuffle options if they exist
          if (nextQ.options && nextQ.options.length > 0) {
            nextQ.options = [...nextQ.options].sort(() => Math.random() - 0.5);
          }

          // Update recent IDs history
          setRecentQuestionIds(prev => {
            const nextBatch = [nextQ.id, ...prev];
            return nextBatch.slice(0, 20); // Keep history of 20
          });

          setCurrentQuestion({ ...nextQ }); 
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
        setLastXpGain(100);
        setShowXpToast(true);
        setTimeout(() => setShowXpToast(false), 2000);
        persistData(newPool, newScore);
        setFeedback('correct');
        if (window.navigator.vibrate) window.navigator.vibrate(50);
        if (direction) setExitX(direction === 'left' ? -1000 : 1000);
        
        // Unified as requested: 3 second delay then flip to explanation even if correct
        setTimeout(() => {
          setIsFlipped(true);
        }, 3000);
      } else {
        persistData(newPool, score);
        setFeedback('incorrect');
        if (window.navigator.vibrate) window.navigator.vibrate([100, 50, 100]);
        // Unified as requested: 3 second delay then flip
        setTimeout(() => {
          setIsFlipped(true);
        }, 3000);
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
    if (confirm("This will wipe all SRS progress and XP. Are you sure?")) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('shift_score');
      window.location.reload();
    }
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
    <div className={`min-h-screen font-sans text-gray-900 flex flex-col items-center p-4 sm:p-6 selection:bg-blue-100 overflow-hidden touch-none transition-colors duration-1000 ${
      quarantine ? 'bg-amber-50' : 'bg-[#F9F9FB]'
    }`}>
      {/* Quarantine Alert - Premium Integrated */}
      <AnimatePresence>
        {showQuarantineAlert && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 z-[100] w-[calc(100%-2rem)] max-w-sm bg-orange-600 text-white p-6 rounded-[2.5rem] shadow-2xl flex items-center gap-5 border border-orange-500/50 backdrop-blur-xl"
          >
            <div className="bg-white/20 p-3 rounded-2xl shadow-inner">
              <AlertCircle size={28} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest opacity-70 mb-0.5">Weakness Detected</p>
              <p className="text-base font-display font-black leading-tight tracking-tight">Initiating {quarantine?.domain} Hyper-Drill</p>
              <p className="text-[10px] mt-1 opacity-80 font-medium leading-[1.4]">Precision focusing on identified knowledge gaps to boost N10-009 readiness.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* XP Toast Notification */}
      <AnimatePresence>
        {showXpToast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: -20, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-24 z-[110] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-gray-800"
          >
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Activity size={12} className="text-white" />
            </div>
            <span className="text-sm font-black tracking-tight">+{lastXpGain} XP RECORDED</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!currentQuestion ? (
        <div className="flex-1 flex items-center justify-center">
           <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300"
           >
             Shifting Knowledge...
           </motion.div>
        </div>
      ) : (
        <>
          {/* Header */}
      <header className="w-full max-w-md flex justify-between items-center mb-6 sm:mb-8 mt-2 px-2">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setView('home')}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 group-active:scale-95 transition-transform">
            <Activity size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-display font-black tracking-tight">Shift<span className="text-blue-500">.</span></h1>
        </div>
        
        <div className="flex flex-col items-end">
          <AnimatePresence mode="wait">
            {view === 'mock' ? (
              <motion.div 
                key="mock-timer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col items-end"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-red-500 font-black">Exam Timer</span>
                <span className={`text-xl font-display font-bold tracking-tighter ${examTimer < 300 ? 'text-red-500 animate-pulse' : 'text-gray-900'}`}>
                  {formatMockTime(examTimer)}
                </span>
              </motion.div>
            ) : (
              <motion.div 
                key="score"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col items-end"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Total XP</span>
                <span className="text-xl font-display font-bold tracking-tighter text-gray-700">{score.toLocaleString()}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Gameplay Area */}
      <main className="flex-1 w-full max-w-md flex flex-col items-center justify-center relative perspective-1000">
        {view === 'home' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-6 px-2 pb-10"
          >
            <div className="bg-white p-8 sm:p-10 rounded-[3rem] shadow-xl shadow-blue-50 border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-[4] rotate-12 pointer-events-none">
                <Activity size={80} />
              </div>
              
              <div className="w-20 h-20 bg-blue-600 rounded-[2rem] mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-blue-200">
                <Activity size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-display font-black tracking-tight text-gray-900 mb-2">Master the Network.</h2>
              <p className="text-gray-500 font-medium px-4 mb-10 leading-relaxed">Level up for CompTIA N10-009 with precision drilling and real-world sims.</p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setView('drill')}
                  className="group relative w-full py-7 bg-blue-600 text-white rounded-[2rem] font-display font-black text-xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.97] flex flex-col items-center justify-center overflow-hidden"
                >
                  <span className="relative z-10">Smart Drill</span>
                  <span className="relative z-10 text-[9px] uppercase tracking-[0.3em] opacity-50 font-bold mt-1">Adaptive Learning Mode</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button 
                  onClick={generateMockExam}
                  className="w-full py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-[2rem] font-display font-bold text-lg hover:border-gray-900 transition-all active:scale-[0.97] flex flex-col items-center shadow-sm"
                >
                  Full Mock Exam
                  <span className="text-[9px] uppercase tracking-widest opacity-40">90 Questions • 90 Minutes</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setView('dashboard')}
                className="bg-white p-6 rounded-[2.5rem] border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow active:scale-95"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <LayoutGrid size={20} className="text-blue-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Readiness</span>
                <div className="text-xl font-display font-black text-gray-900">{readiness?.averageMastery}%</div>
              </button>
              
              <button 
                onClick={() => setView('tips')}
                className="bg-white p-6 rounded-[2.5rem] border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow active:scale-95"
              >
                <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Shield size={20} className="text-amber-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Vault</span>
                <div className="text-xl font-display font-black text-gray-900">Strategy</div>
              </button>
            </div>

            {/* Advanced Lab Section */}
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 px-4">Advanced Study Lab</p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={startBraindump}
                  className="group py-4 px-6 bg-white border border-gray-100 rounded-2xl font-display font-black text-xs flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                >
                  <Terminal size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                  Braindump
                </button>
                <button 
                  onClick={() => isAudioActive ? stopAudioMode() : startAudioMode()}
                  className={`py-4 px-6 rounded-2xl font-display font-black text-xs flex items-center justify-center gap-3 transition-all active:scale-95 shadow-sm border ${
                    isAudioActive 
                      ? 'bg-blue-500 border-blue-400 text-white animate-pulse' 
                      : 'bg-white border-gray-100 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Activity size={16} className={isAudioActive ? 'text-white' : 'text-gray-400'} />
                  {isAudioActive ? 'Living Audio' : 'Commute'}
                </button>
              </div>
            </div>

            <div className="bg-gray-50/50 p-6 rounded-[2.5rem] border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100/50">
                  <Terminal size={20} className="text-gray-400" />
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-900 tracking-tight">Active Reference</p>
                   <p className="text-[10px] font-medium text-gray-500">CompTIA Vision Anti-Fluff</p>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (window.navigator.vibrate) window.navigator.vibrate(10);
                  setComptiaVision(prev => !prev);
                }}
                className={`w-12 h-6 rounded-full transition-all relative p-1 shadow-inner ${comptiaVision ? 'bg-blue-500' : 'bg-gray-200'}`}
              >
                <motion.div 
                  initial={false}
                  animate={{ x: comptiaVision ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-4 h-4 bg-white rounded-full shadow-md"
                />
              </button>
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
                onClick={() => {
                  setIsBraindumpActive(false);
                  setView('home');
                }}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-500 font-bold text-sm"
              >
                Back
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
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200"
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
                className="px-4 py-2 bg-gray-100 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-200 transition-colors"
              >
                Back
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
              className="w-full py-6 bg-blue-600 text-white rounded-[2.5rem] font-display font-black text-xl shadow-2xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
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
               className="w-full py-5 bg-blue-600 text-white rounded-3xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all"
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
                  y: 0
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.9, 
                  x: exitX,
                  rotate: exitX > 0 ? 45 : exitX < 0 ? -45 : 0
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`w-full min-h-[580px] sm:min-h-[640px] rounded-[3.5rem] shadow-2xl flex flex-col border ${getCardStyles()} relative ${currentQuestion.type === 'cli' || currentQuestion.type === 'cli-interactive' ? '' : 'overflow-hidden'} ${view !== 'mock' && !isFlipped ? 'cursor-grab active:cursor-grabbing' : ''}`}
                id="active-card"
              >
                {/* FRONT OF CARD */}
                <motion.div 
                   animate={{ 
                     rotateY: isFlipped ? -180 : 0,
                     opacity: isFlipped ? 0 : 1,
                     zIndex: isFlipped ? 0 : 10
                   }}
                   transition={{ type: "spring", stiffness: 260, damping: 20 }}
                   className={`absolute inset-0 p-7 sm:p-9 flex flex-col rounded-[3.5rem] ${currentQuestion.type === 'cli' || currentQuestion.type === 'cli-interactive' ? 'bg-gray-950' : 'bg-white'}`}
                   style={{ 
                     backfaceVisibility: 'hidden',
                     WebkitBackfaceVisibility: 'hidden',
                     pointerEvents: isFlipped ? 'none' : 'auto'
                   }}
                >
                  {/* CLI Traffic Lights */}
                  {(currentQuestion.type === 'cli' || currentQuestion.type === 'cli-interactive') && (
                    <div className="flex gap-1.5 mb-6 opacity-40">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                      <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    </div>
                  )}

                  {/* Feedback Overlay - Enhanced */}
                  {view === 'drill' && feedback && !isFlipped && (
                    <motion.div 
                      key="feedback-overlay"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`absolute inset-0 z-50 flex items-center justify-center backdrop-blur-md rounded-[3.5rem] pointer-events-none ${feedback === 'correct' ? 'bg-green-500/10' : 'bg-red-500/10'}`}
                    >
                      <motion.div 
                        initial={{ scale: 0.5, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className={`p-6 rounded-[2rem] ${feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'} text-white shadow-2xl`}
                      >
                        {feedback === 'correct' ? <Shield size={64} strokeWidth={3} /> : <AlertCircle size={64} strokeWidth={3} />}
                      </motion.div>
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

                  {/* Header Area */}
                  <div className="flex justify-between items-center mb-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${badge.color} shadow-sm border border-black/5`}>
                      {badge.icon}
                      <span className="text-[10px] font-display font-black uppercase tracking-wider leading-none">
                        {badge.label}
                      </span>
                    </div>
                    <div className="text-right flex flex-col">
                       <span className="text-[10px] font-display font-black uppercase tracking-widest text-gray-400">
                         {currentQuestion.domain}
                       </span>
                    </div>
                  </div>

                  {/* Question Scrollable Container */}
                  <div className="flex-1 flex flex-col min-h-0 overflow-y-auto no-scrollbar pt-2">
                    {currentQuestion.imageUrl && (
                      <div className="mb-6 rounded-3xl overflow-hidden border border-gray-100 shadow-sm max-h-[160px] shrink-0 bg-gray-50 flex items-center justify-center">
                        <img src={currentQuestion.imageUrl} alt="Scenario Visual" className="w-full h-full object-contain" />
                      </div>
                    )}

                    {currentQuestion.type === 'acronym' ? (
                      <div className="flex-1 flex items-center justify-center">
                        <h2 className={`font-display font-black leading-tight text-gray-900 tracking-tighter text-center uppercase px-4 ${
                          currentQuestion.question.length > 25 ? 'text-2xl sm:text-3xl' : 
                          currentQuestion.question.length > 15 ? 'text-3xl sm:text-4xl' : 
                          'text-5xl sm:text-6xl'
                        }`}>
                          {currentQuestion.question.includes(': ') ? currentQuestion.question.split(': ')[1] : currentQuestion.question}
                        </h2>
                      </div>
                    ) : (
                      <div className="flex-1 overflow-y-auto no-scrollbar px-1 pb-4">
                        <h2 
                          className={`font-display font-bold leading-[1.3] tracking-tight transition-all duration-300 ${
                            currentQuestion.type === 'cli' ? 'text-green-400 font-mono text-lg' : 'text-gray-900'
                          } ${
                            currentQuestion.question.length > 200 ? 'text-lg' : currentQuestion.question.length > 100 ? 'text-xl' : 'text-2xl'
                          }`}
                        >
                          {(() => {
                            const text = currentQuestion.question;
                            if (comptiaVision && !showBlurredText && text.length > 100) {
                               const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
                               const lastSentence = sentences.pop();
                               return (
                                 <div className="relative group">
                                   <span 
                                     className="blur-[6px] opacity-20 transition-all duration-700 cursor-help select-none"
                                     onClick={() => setShowBlurredText(true)}
                                    >{sentences.join('')}</span>
                                   <span className="bg-blue-50/50 text-blue-900 rounded-lg px-1">{lastSentence}</span>
                                   {!showBlurredText && (
                                     <div className="absolute top-0 right-0 p-1 opacity-20">
                                       <AlertCircle size={12} />
                                     </div>
                                   )}
                                 </div>
                               );
                            }
                            return text;
                          })()}
                        </h2>
                      </div>
                    )}
                  </div>

                  {/* Interactive Inputs */}
                  <div className="mt-4 sm:mt-6 space-y-2.5 pb-2 pt-4 border-t border-gray-50">
                    {currentQuestion.type === 'cli-interactive' ? (
                        <div className="space-y-4">
                          <div className="relative p-6 bg-gray-900 border border-gray-800 rounded-[2.5rem] font-mono text-sm shadow-inner group">
                            <div className="flex items-start gap-3">
                              <span className="text-green-700 font-bold">$</span>
                              <div className="flex-1 relative">
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
                              </div>
                            </div>
                            <AnimatePresence>
                              {cliSuggestions.length > 0 && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute left-6 bottom-[-3.5rem] flex gap-2 z-20"
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
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          
                          <button 
                            onClick={() => handleAnswer(cliInput)}
                            className="w-full py-5 rounded-[2rem] bg-green-500 text-black font-display font-black text-lg hover:bg-green-400 shadow-xl transition-all active:scale-95"
                          >
                            Execute Response
                          </button>
                        </div>
                    ) : currentQuestion.type === 'syslog' ? (
                        <div className="space-y-1.5 bg-gray-950 p-5 rounded-[2.5rem] border border-gray-800 shadow-2xl max-h-[220px] overflow-y-auto no-scrollbar">
                          {currentQuestion.logData?.map((line, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAnswer(idx.toString())}
                              className={`w-full text-left font-mono text-[10px] p-2.5 rounded-xl border transition-all ${
                                syslogSelection === idx
                                  ? 'bg-green-500/20 border-green-500 text-green-400'
                                  : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-900 hover:text-white'
                              }`}
                            >
                              <span className="opacity-30 mr-3">{idx + 1}</span>
                              {line}
                            </button>
                          ))}
                        </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2.5">
                        {currentQuestion.options.map((opt, i) => (
                          <motion.button
                            key={opt}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (currentQuestion.type === 'multi-select') {
                                toggleMultiSelect(opt);
                              } else {
                                handleAnswer(opt);
                              }
                            }}
                            className={`w-full p-4 sm:p-5 text-left rounded-3xl border-2 transition-all font-bold flex justify-between items-center group active:scale-[0.98] touch-manipulation relative overflow-hidden ${
                              currentQuestion.type === 'multi-select' && multiSelected.includes(opt)
                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                                : currentQuestion.type === 'cli'
                                  ? 'bg-gray-900 border-gray-800 text-green-500/80 hover:bg-gray-800'
                                  : 'bg-white border-gray-100 text-gray-800 hover:border-gray-200 shadow-sm'
                            }`}
                          >
                            <span className={`text-base leading-snug pr-4 ${currentQuestion.type === 'cli' ? 'font-mono' : 'font-sans'}`}>{opt}</span>
                            <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center shrink-0 ${
                              currentQuestion.type === 'multi-select' && multiSelected.includes(opt)
                                ? 'bg-white border-white text-blue-600'
                                : 'border-gray-200 opacity-20'
                            }`}>
                              {currentQuestion.type === 'multi-select' && <Shield size={14} strokeWidth={3} />}
                            </div>
                          </motion.button>
                        ))}
                        {currentQuestion.type === 'multi-select' && (
                          <button 
                            disabled={multiSelected.length === 0}
                            onClick={(e) => { e.stopPropagation(); handleAnswer(multiSelected); }}
                            className={`mt-4 w-full py-5 rounded-[2rem] font-display font-black text-lg transition-all active:scale-95 ${
                              multiSelected.length > 0 ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            Finalize Bundle
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* BACK OF CARD */}
                <motion.div 
                   initial={{ rotateY: 180, opacity: 0 }}
                   animate={{ 
                     rotateY: isFlipped ? 0 : 180,
                     opacity: isFlipped ? 1 : 0,
                     zIndex: isFlipped ? 20 : 0
                   }}
                   transition={{ type: "spring", stiffness: 260, damping: 20 }}
                   className="absolute inset-0 flex flex-col bg-white rounded-[3.5rem] overflow-hidden"
                   style={{ 
                     backfaceVisibility: 'hidden', 
                     WebkitBackfaceVisibility: 'hidden',
                     pointerEvents: isFlipped ? 'auto' : 'none'
                   }}
                >
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Header of explanation */}
                    <div className="p-8 pb-4 flex justify-between items-center">
                      <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full">
                         <Shield size={16} />
                         <span className="text-[10px] font-display font-black uppercase tracking-widest leading-none">Logic Breakdown</span>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                        <Activity size={18} />
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar px-8 scroll-smooth">
                       <div className="text-center mb-10">
                          <h3 className="text-[10px] font-display font-black text-gray-400 uppercase tracking-[0.3em] mb-3">Target Solution</h3>
                          <p className="text-3xl font-display font-black text-blue-600 tracking-tight leading-tight">
                            {Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer.join(', ') : currentQuestion.correctAnswer}
                          </p>
                       </div>

                       <div className="space-y-4 pb-12">
                          {(currentQuestion.explanation || "No logical breakdown available for this specific scenario.").split('\n\n').map((section, idx) => {
                            const isCorrectPart = section.toLowerCase().includes('correct') || section.toLowerCase().includes('why') || section.startsWith('Correct:');
                            const isIncorrectPart = section.toLowerCase().includes('incorrect') || section.toLowerCase().includes('others') || section.startsWith('Incorrect:');

                            return (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.1 + idx * 0.1 } }}
                                key={idx} 
                                className={`p-6 rounded-[2.5rem] border-2 shadow-sm ${
                                  isCorrectPart 
                                    ? 'bg-green-50/50 border-green-100 text-green-900 shadow-green-50' 
                                    : isIncorrectPart 
                                      ? 'bg-red-50/50 border-red-100 text-red-900 shadow-red-50' 
                                      : 'bg-white border-gray-100 text-gray-700'
                                }`}
                              >
                                <div className="flex items-start gap-4">
                                  {isCorrectPart && <Shield size={22} className="shrink-0 mt-1 opacity-60 text-green-600" />}
                                  {isIncorrectPart && <AlertCircle size={22} className="shrink-0 mt-1 opacity-60 text-red-600" />}
                                  <p className="text-base font-medium leading-relaxed">{section}</p>
                                </div>
                              </motion.div>
                            );
                          })}
                       </div>
                    </div>
                  </div>

                  <div className="p-8 pt-6 bg-white border-t border-gray-100">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.navigator.vibrate) window.navigator.vibrate(20);
                          advanceNext();
                        }}
                        className="w-full py-7 rounded-[2.5rem] bg-blue-600 text-white font-display font-black text-2xl hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all active:scale-[0.97] z-[60] touch-manipulation flex items-center justify-center gap-3"
                      >
                        <span>Next Ticket</span>
                        <Shield size={20} className="opacity-40" />
                      </button>
                    <div className="mt-4 flex justify-center">
                       <div className="w-12 h-1 bg-gray-100 rounded-full" />
                    </div>
                  </div>
                </motion.div>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-full flex flex-col p-2 pt-0 overflow-y-auto no-scrollbar pb-10"
          >
            <div className="flex items-center justify-between mb-6 px-4">
               <div className="flex items-center gap-3">
                <LayoutGrid size={24} className="text-blue-500" />
                <h1 className="text-xl font-black uppercase tracking-tighter text-gray-900">Readiness Dashboard</h1>
              </div>
              <button 
                onClick={() => setView('home')}
                className="px-4 py-2 bg-gray-100 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
            </div>

            {/* Strategy Vault Timeline */}
            <div className="mb-8 p-8 bg-white rounded-[3rem] shadow-xl shadow-blue-50/50 border border-gray-50 overflow-hidden relative">
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-50/30 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="text-left">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Readiness Vault</h3>
                  <div className="text-3xl font-display font-black text-gray-900 tracking-tight leading-none mb-1">Estimated Exam Date</div>
                  <p className={`text-xl font-black tracking-tight ${calculateExamTimeline().daysRemaining === null ? 'text-gray-300' : 'text-blue-600'}`}>
                    {calculateExamTimeline().date}
                  </p>
                </div>
                <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
                   <Shield size={22} className="text-white" />
                </div>
              </div>

              {/* Vertical Stepper */}
              <div className="relative pl-8 space-y-12">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100" />
                
                {[
                  { phase: 1, label: 'Boot Camp', range: '< 50%', desc: 'Focusing on core SRS drills.' },
                  { phase: 2, label: 'Endurance', range: '50-80%', desc: 'Taking full 90-question mock exams.' },
                  { phase: 3, label: 'The Vault', range: '80-95%', desc: 'Final 7-Day Lockdown. Aggressive PBQ and Quarantine Drills only.' },
                  { phase: 4, label: 'Exam Ready', range: '95%+', desc: 'Book your CompTIA Voucher.' },
                ].map((node) => {
                  const currentPhase = calculateExamTimeline().phase;
                  const isPast = currentPhase > node.phase;
                  const isCurrent = currentPhase === node.phase;
                  
                  return (
                    <div key={node.phase} className="relative">
                      <div className={`absolute left-[-26px] top-1 w-2.5 h-2.5 rounded-full z-10 transition-all duration-500 ${
                        isPast ? 'bg-emerald-500 ring-4 ring-emerald-50' : isCurrent ? 'bg-blue-600 ring-4 ring-blue-50 animate-pulse' : 'bg-gray-200'
                      }`} />
                      <div className={`text-left transition-opacity duration-500 ${isPast || isCurrent ? 'opacity-100' : 'opacity-30'}`}>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{node.label}</span>
                          <span className="text-[9px] font-bold text-gray-400 bg-gray-50 px-1.5 rounded">{node.range}</span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{node.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-8 text-center bg-white p-10 rounded-[3rem] shadow-xl shadow-blue-50/50 border border-gray-50 border-opacity-50">
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Exam Ready Score</h2>
              <div className="text-6xl font-display font-black text-gray-900 tracking-tighter mb-2">
                {readiness?.averageMastery}<span className="text-blue-500">%</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mastery Level: {readiness?.averageMastery && readiness.averageMastery > 85 ? 'Elite' : readiness?.averageMastery && readiness.averageMastery > 70 ? 'Advanced' : 'Combat Ready'}</p>
            </div>

            {/* Session Activity Feed - NEW */}
            <div className="mb-8">
              <div className="flex items-center justify-between px-4 mb-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Activity Feed</h3>
                <RefreshCcw size={14} className="text-gray-300" />
              </div>
              
              <div className="space-y-3 px-1">
                {sessionHistory.length === 0 ? (
                  <div className="bg-white p-10 rounded-[2.5rem] border border-gray-50 text-center">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Complete your first shift to see analytics</p>
                  </div>
                ) : (
                  sessionHistory.map((session, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-[2rem] border border-gray-100 flex items-center justify-between shadow-sm group hover:border-blue-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-display font-black text-lg ${
                          session.score >= 80 ? 'bg-emerald-50 text-emerald-600' : session.score >= 60 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {session.score}%
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-black text-gray-900 leading-none mb-1">
                            {session.questionsAnswered} Question Pulse
                          </p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                            {new Date(session.date).toLocaleDateString()} • Weak: {session.weakestDomain.split(' ').pop()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full mb-1 ${
                          session.score >= 80 ? 'bg-emerald-500/10 text-emerald-600' : session.score >= 60 ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'
                        }`}>
                          {session.score >= 80 ? 'Certified' : session.score >= 60 ? 'Stable' : 'Warning'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-4">
              {readiness?.stats.map(s => (
                <div key={s.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-blue-500/50 uppercase tracking-widest mb-1">Domain {s.id}</span>
                      <span className="text-base font-display font-black text-gray-900 leading-tight pr-4">{s.name}</span>
                    </div>
                    <div className="text-2xl font-display font-black text-gray-900">{s.mastery}%</div>
                  </div>
                  <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/50 p-0.5">
                    <motion.div 
                      className={`h-full rounded-full shadow-sm ${
                        s.mastery < 70 ? 'bg-red-400' : s.mastery < 85 ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.mastery}%` }}
                      transition={{ duration: 1.2, ease: "circOut" }}
                    />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500/20" />
                       <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">Weight: {s.target}%</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                      s.mastery < 70 ? 'text-red-500 bg-red-50 border-red-100' : s.mastery < 85 ? 'text-amber-600 bg-amber-50 border-amber-100' : 'text-emerald-600 bg-emerald-50 border-emerald-100'
                    }`}>
                      {s.mastery < 70 ? 'Deficient' : s.mastery < 85 ? 'Intermediate' : 'Expert'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-8 bg-blue-600 rounded-[3rem] text-center shadow-2xl shadow-blue-200 mb-4">
              <Shield size={24} className="text-white mx-auto mb-3" />
              <p className="text-white text-xs font-bold leading-relaxed">
                Keep precision drilling to reach <span className="text-blue-100 italic">90% stability</span> across all performance domains.
              </p>
            </div>

            <div className="flex justify-center pb-8">
               <button 
                onClick={resetProgress}
                className="px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all flex items-center gap-3 border border-transparent hover:border-red-100"
               >
                 <RefreshCcw size={14} strokeWidth={3} />
                 Factory Reset All Data
               </button>
            </div>
          </motion.div>
        )}
      </main>

        </>
      )}
    </div>
  );
}
