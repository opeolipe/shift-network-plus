import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, BookOpen, Award, CheckCircle2, HelpCircle, RefreshCw, 
  Search, Sparkles, TrendingUp, X, ChevronLeft, ChevronRight,
  Shield, Network, MessageSquare, Terminal, Mail, Info, Activity,
  AlertTriangle, Play, Check, Circle, Globe
} from 'lucide-react';

export interface Flashcard {
  id: string;
  topicId: number;
  topicName: string;
  deckType: 'A' | 'B' | 'C' | 'D';
  deckTypeName: string;
  cardNum: number;
  front: string;
  back: string;
  objective: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface CompTiaFlashcardsProps {
  onBack: () => void;
  onAddXp: (amount: number) => void;
}

const TOPICS = [
  { id: 1, name: 'Interface Status Codes', icon: Network, desc: 'Layer 1, Layer 2, admin down, err-disable states' },
  { id: 2, name: 'Syslog Severity Levels (0-7)', icon: Terminal, desc: 'Emergency to Debug levels (Every Awful Cat Mnemonic)' },
  { id: 3, name: 'NAT Types', icon: Globe, desc: 'Static NAT, Dynamic NAT, Port Address Translation (PAT)' },
  { id: 4, name: 'ICMP Types', icon: Activity, desc: 'Types 0 (Reply), 8 (Request), 11 (TTL Exceeded), 3 (Unreachable)' },
  { id: 5, name: 'SMTP Ports', icon: Mail, desc: 'Port 25 (relay) vs Port 587 ( STARTTLS Submission)' },
  { id: 6, name: 'Routing Protocol Characteristics', icon: Shield, desc: 'OSPF, EIGRP, RIP, BGP metric, class, and AD parameters' },
  { id: 7, name: 'Security Features Comparison', icon: Shield, desc: 'DHCP Snooping, DAI, and Port Security layers' }
];

const DECK_TYPES: { id: 'A' | 'B' | 'C' | 'D'; name: string; desc: string }[] = [
  { id: 'A', name: 'Basic Recall', desc: 'Direct technical recall & definitions' },
  { id: 'B', name: 'Compare & Contrast', desc: 'Differentiating similar parameters' },
  { id: 'C', name: 'Scenario Application', desc: 'Surgical diagnostic troubleshooting' },
  { id: 'D', name: 'Mnemonic Aid', desc: 'Techniques for effortless retainment' }
];

// Master Flashcards Database
const FLASHCARDS_DB: Flashcard[] = [
  // --- TOPIC 1 ---
  {
    id: 't1-a-1', topicId: 1, topicName: 'Interface Status Codes', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 1,
    front: "What does a 'down/down' status on a physical physical Ethernet port indicate?",
    back: "It indicates a Layer 1 problem. This means a physical cabling, power, or NIC issue. Steps: Swap patch cable, inspect SFP LEDs, verify transceiver placement, ensure remote end link is online.",
    objective: "CompTIA Objective 5.2", difficulty: "Easy"
  },
  {
    id: 't1-a-2', topicId: 1, topicName: 'Interface Status Codes', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 2,
    front: "What is indicated when an interface state says 'up/down'?",
    back: "It indicates a Layer 2 problem. The physical media is healthy (Layer 1 up), but formatting keeps the link from establishing. Usually caused by mismatched encapsulation protocol (e.g. PPP vs HDLC), a duplex conflict (Full vs Half mismatch), speed negotiation issues, or missing protocol keepalives.",
    objective: "CompTIA Objective 5.2", difficulty: "Medium"
  },
  {
    id: 't1-a-3', topicId: 1, topicName: 'Interface Status Codes', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 3,
    front: "What does the 'err-disable' status code mean on a trunk or access port?",
    back: "It means the switch OS has automatically disabled the interface because of a security or loop-prevention violation (such as BPDU Guard trigger, Port Security limit exceeded, or storm control threshold reached). Must be toggled manually after rectifying issues.",
    objective: "CompTIA Objective 5.2 / 4.2", difficulty: "Medium"
  },
  {
    id: 't1-a-4', topicId: 1, topicName: 'Interface Status Codes', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 4,
    front: "What does an 'administratively down' status imply about a switch port?",
    back: "It implies the interface has been manually disabled by an administrator using the 'shutdown' command. It will stay inactive until the 'no shutdown' command is entered in interface config mode.",
    objective: "CompTIA Objective 5.2", difficulty: "Easy"
  },
  {
    id: 't1-b-1', topicId: 1, topicName: 'Interface Status Codes', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 1,
    front: "How do you distinguish physical media issues (down/down) from frame-level issues (up/down)?",
    back: "• Down/Down (L1): The receiver sees zero electric/optical signal. Cable is broken, unplugged, or target is dark.\n• Up/Down (L2): The receiver sees electric signals, but the computer cannot organize them. Signals fail framing checks, speed is mismatched (leading to errors), or keeping-alive checks fail.",
    objective: "CompTIA Objective 5.2 / 2.3", difficulty: "Medium"
  },
  {
    id: 't1-b-2', topicId: 1, topicName: 'Interface Status Codes', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 2,
    front: "Contrast recovery procedures for 'admin down' vs 'err-disable' ports.",
    back: "• Admin Down: Requires zero background investigation. Just run 'no shutdown'.\n• Err-Disable: You must manually eradicate the root threat first (e.g. unplug rogue hub/switch), and only then execute 'shutdown' followed by 'no shutdown' (or rely on auto-recovery configured intervals).",
    objective: "CompTIA Objective 5.2", difficulty: "Medium"
  },
  {
    id: 't1-c-1', topicId: 1, topicName: 'Interface Status Codes', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 1,
    front: "A host reports loss of internet. You enter 'show interfaces Fa0/2' and see it is 'down, line protocol down (err-disable)'. The logs indicate a security event occurred on Fa0/2. What causes this, and what command parameters fix this?",
    back: "• Cause: Port Security restriction triggered (e.g., a rogue laptop was plugged into a cubicle port matching restricted MAC addresses).\n• Fix: Disconnect unauthorized laptop, enter interface mode:\n'interface f0/2'\n'shutdown'\n'no shutdown'",
    objective: "CompTIA Objective 5.2 / 4.2", difficulty: "Hard"
  },
  {
    id: 't1-c-2', topicId: 1, topicName: 'Interface Status Codes', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 2,
    front: "Switch 1 is set to port speed 1000 and Duplex Full. Switch 2 connects with auto/auto. What link-state behavior is likely to happen?",
    back: "The link might enter up/down or experience a drop rate exceeding 50% due to duplex negotiation failure. Disabling negotiation on one side disables autonegotiation parameters for both sides, leading Switch 2 to drop back to Half Duplex (default fallback), corrupting simultaneous bidirectional transmissions.",
    objective: "CompTIA Objective 5.2", difficulty: "Hard"
  },
  {
    id: 't1-d-1', topicId: 1, topicName: 'Interface Status Codes', deckType: 'D', deckTypeName: 'Mnemonic Aid', cardNum: 1,
    front: "Mnemonic to remember Layer 1 vs Layer 2 status reporting order.",
    back: "Memory key:\n'Cables Connect (Layer 1) before Computers Converse (Layer 2)'.\n- 1st Status = Cables Connect (Hardware level)\n- 2nd Status = Computers Converse (Data link protocol framing / rules)",
    objective: "CompTIA Objective 5.2", difficulty: "Easy"
  },

  // --- TOPIC 2 ---
  {
    id: 't2-a-1', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 1,
    front: "What is Syslog Severity Level 0?",
    back: "Emergency (system is completely unusable, entire kernel panic or core critical database failure).",
    objective: "CompTIA Objective 3.3", difficulty: "Easy"
  },
  {
    id: 't2-a-2', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 2,
    front: "What is Syslog Severity Level 1?",
    back: "Alert (immediate direct action is needed, localized extreme error like backup power supply offline or high heat trigger).",
    objective: "CompTIA Objective 3.3", difficulty: "Easy"
  },
  {
    id: 't2-a-3', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 3,
    front: "What is Syslog Severity Level 2?",
    back: "Critical (critical state matching hardware/software boundary, like temperature thresholds exceeded or disk failure mirrors).",
    objective: "CompTIA Objective 3.3", difficulty: "Easy"
  },
  {
    id: 't2-a-4', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 4,
    front: "What is Syslog Severity Level 3?",
    back: "Error (error condition limiting operations, like a routing protocol dropping neighborhood peerings or missing module configurations).",
    objective: "CompTIA Objective 3.3", difficulty: "Easy"
  },
  {
    id: 't2-a-5', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 5,
    front: "What is Syslog Severity Level 4?",
    back: "Warning (warning conditions warning of impending failure, like an interface reporting high CRC errors).",
    objective: "CompTIA Objective 3.3", difficulty: "Easy"
  },
  {
    id: 't2-a-6', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 6,
    front: "What is Syslog Severity Level 5?",
    back: "Notice (normal but significant state change, like interfaces going up/down or system reload logs completing).",
    objective: "CompTIA Objective 3.3", difficulty: "Easy"
  },
  {
    id: 't2-a-7', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 7,
    front: "What is Syslog Severity Level 6?",
    back: "Info (informational notes reporting normal operations, like client DHCP requests or standard logging logs).",
    objective: "CompTIA Objective 3.3", difficulty: "Easy"
  },
  {
    id: 't2-a-8', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 8,
    front: "What is Syslog Severity Level 7?",
    back: "Debug (debug level parameters utilized for packet-level parsing. Extremely noisy, can crash high-performance routers!).",
    objective: "CompTIA Objective 3.3", difficulty: "Easy"
  },
  {
    id: 't2-b-1', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 1,
    front: "Contrast Syslog Level 3 (Error) vs Level 4 (Warning) vs Level 5 (Notice).",
    back: "• Level 3 (Error): Something has actually failed, stopping a component (e.g., protocol process dead).\n• Level 4 (Warning): Nothing has failed yet, but parameters look dangerous (e.g. high CPU load).\n• Level 5 (Notice): System is behaving completely normally, but a highly significant event happened (e.g. trunk reload / port up).",
    objective: "CompTIA Objective 3.3", difficulty: "Medium"
  },
  {
    id: 't2-b-2', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 2,
    front: "How does Syslog Level 0 (Emergency) differ structurally from Level 7 (Debug)?",
    back: "• Level 0: Represents a complete system crash. Zero operations can continue.\n• Level 7: Represents hyper-detailed packet parsing logging during troubleshooting. System functions fine, but writes huge data volumes.",
    objective: "CompTIA Objective 3.3", difficulty: "Medium"
  },
  {
    id: 't2-c-1', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 1,
    front: "A firewall is configured with 'logging trap errors'. Which syslog levels (0-7) will be forwarded to the logging server?",
    back: "Setting the filter level to 'Error' (Level 3) forces the system to log all messages matching level 3 and more severe ones (0 to 3). Forwarded levels: 0 (Emergency), 1 (Alert), 2 (Critical), and 3 (Error). Notices, Warnings, and Information are excluded.",
    objective: "CompTIA Objective 3.3", difficulty: "Hard"
  },
  {
    id: 't2-c-2', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 2,
    front: "An engineer runs 'debug all' in Cisco CLI on a highly active backbone router. Suddenly, client connections timeout and the console becomes unresponsive. What syslog level triggered this freeze, and why?",
    back: "• Level 7 (Debug) was initiated.\n• Why: Debug logs write to router resources instantly. Under massive backbone traffic, rendering millions of lines of debugger stream saturates CPU, starving active routing operations and freezing management shells.",
    objective: "CompTIA Objective 3.3", difficulty: "Hard"
  },
  {
    id: 't2-d-1', topicId: 2, topicName: 'Syslog Severity Levels (0-7)', deckType: 'D', deckTypeName: 'Mnemonic Aid', cardNum: 1,
    front: "Mnemonic to master Syslog severity levels 0 to 7 in sequential order.",
    back: "Classic mnemonic:\n'Every Awful Cat Error Will Not Ignore Dead-fish'\n0: Emergency (**E**very)\n1: Alert (**A**wful)\n2: Critical (**C**at)\n3: Error (**E**rror)\n4: Warning (**W**ill)\n5: Notice (**N**ot)\n6: Info (**I**gnore)\n7: Debug (**D**ead-fish)",
    objective: "CompTIA Objective 3.3", difficulty: "Easy"
  },

  // --- TOPIC 3 ---
  {
    id: 't3-a-1', topicId: 3, topicName: 'NAT Types', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 1,
    front: "What is NAT Overload / Port Address Translation (PAT)?",
    back: "A one-to-many translation method where multiple internal private devices connect out over a single public IP, translated dynamically using unique TCP/UDP source port allocations.",
    objective: "CompTIA Objective 2.1", difficulty: "Easy"
  },
  {
    id: 't3-a-2', topicId: 3, topicName: 'NAT Types', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 2,
    front: "What is Dynamic NAT?",
    back: "A translation technique mapping internal private hosts to public IPs from a pool. These translations are created on-the-fly, giving a temporary 1-to-1 profile.",
    objective: "CompTIA Objective 2.1", difficulty: "Easy"
  },
  {
    id: 't3-a-3', topicId: 3, topicName: 'NAT Types', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 3,
    front: "What is Static NAT?",
    back: "A permanent, hardcoded 1-to-1 mapping matching a private internal IP to a public external IP. Permits outside-in initiated traffic (essential for DMZ hosts).",
    objective: "CompTIA Objective 2.1", difficulty: "Easy"
  },
  {
    id: 't3-b-1', topicId: 3, topicName: 'NAT Types', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 1,
    front: "Compare the inbound structural support of Static NAT vs Dynamic NAT vs PAT.",
    back: "• Static NAT: Excellent. External users can hit the server permanently.\n• Dynamic NAT: Poor. Outside hosts can only send responses to active outbound flows.\n• PAT: None by default. Requires Port Forwarding rules to allow traffic in.",
    objective: "CompTIA Objective 2.1", difficulty: "Medium"
  },
  {
    id: 't3-b-2', topicId: 3, topicName: 'NAT Types', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 2,
    front: "Contrast Dynamic NAT and PAT for address space exhaust.",
    back: "• Dynamic NAT: Requires 1 unique public IP per active device session. Pool is exhausted quickly.\n• PAT: Supports up to ~65,000 active sessions over a single public IP address using distinct port multiplexing.",
    objective: "CompTIA Objective 2.1", difficulty: "Medium"
  },
  {
    id: 't3-c-1', topicId: 3, topicName: 'NAT Types', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 1,
    front: "An ISP assigns a startup a single public IPv4 address. Internal office hosts (~150 laptops) must browse the web at the same time. Which NAT standard is required?",
    back: "Port Address Translation (PAT) / NAT Overload is required. Many-to-one translation intercepts outgoing packets, replacing source IPs with the single public address, and allocating unique source ports to map returning replies.",
    objective: "CompTIA Objective 2.1", difficulty: "Medium"
  },
  {
    id: 't3-c-2', topicId: 3, topicName: 'NAT Types', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 2,
    front: "An enterprise DHCP pool maps clients dynamically. A local server at 10.10.1.18 needs to host web files outside at 198.51.100.80. Which NAT type is required?",
    back: "Static NAT is required. It guarantees that any external packet hitting 198.51.100.80 translates exactly to 10.10.1.18, without timeout, expiration or dynamic pool shifts.",
    objective: "CompTIA Objective 2.1", difficulty: "Hard"
  },
  {
    id: 't3-d-1', topicId: 3, topicName: 'NAT Types', deckType: 'D', deckTypeName: 'Mnemonic Aid', cardNum: 1,
    front: "How do you memorize Static, Dynamic, and PAT targets?",
    back: "Memory triggers:\n**S**tatic = **S**ingle **S**erver (1-to-1 stable)\n**D**ynamic = **D**ivided pool (IP pool assigned dynamically)\n**P**AT = **P**ort sharing (sharing unique ports on one seat)",
    objective: "CompTIA Objective 2.1", difficulty: "Easy"
  },

  // --- TOPIC 4 ---
  {
    id: 't4-a-1', topicId: 4, topicName: 'ICMP Types', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 1,
    front: "What is ICMP Type 8?",
    back: "Echo Request (the initial ping query packet).",
    objective: "CompTIA Objective 5.2 / 2.3", difficulty: "Easy"
  },
  {
    id: 't4-a-2', topicId: 4, topicName: 'ICMP Types', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 2,
    front: "What is ICMP Type 0?",
    back: "Echo Reply (the positive response returned to ping requests).",
    objective: "CompTIA Objective 5.2", difficulty: "Easy"
  },
  {
    id: 't4-a-3', topicId: 4, topicName: 'ICMP Types', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 3,
    front: "What is ICMP Type 11?",
    back: "Time To Live (TTL) Exceeded. Triggered by intermediate routers when TTL drops to 0. Heavily leveraged by Traceroute.",
    objective: "CompTIA Objective 5.2", difficulty: "Medium"
  },
  {
    id: 't4-a-4', topicId: 4, topicName: 'ICMP Types', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 4,
    front: "What is ICMP Type 3?",
    back: "Destination Unreachable (the host, port, or protocol is flagged as completely inaccessible).",
    objective: "CompTIA Objective 5.2", difficulty: "Easy"
  },
  {
    id: 't4-b-1', topicId: 4, topicName: 'ICMP Types', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 1,
    front: "Contrast firewall behaviors for outbound Type 8 vs inbound Type 0.",
    back: "To support internal workstations pinging yahoo.com safely, write stateful rules permitting outward packets labeled ICMP Type 8 (Echo Request) and allow matching inbound answers mapped as Type 0 (Echo Reply). Direct unsolicited external Type 8 incoming packets are generally locked to block scanning.",
    objective: "CompTIA Objective 5.2", difficulty: "Medium"
  },
  {
    id: 't4-b-2', topicId: 4, topicName: 'ICMP Types', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 2,
    front: "In Traceroute mechanisms, differentiate the role of Type 11 from Type 3.",
    back: "• Type 11 (TTL Exceeded): Sent by intermediate hops as the diagnostic probes decay, mapping the hops.\n• Type 3 (Destination Unreachable): Sent by the final destination router/host indicating a closed UDP port, telling traceroute the goal was achieved.",
    objective: "CompTIA Objective 5.2", difficulty: "Medium"
  },
  {
    id: 't4-c-1', topicId: 4, topicName: 'ICMP Types', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 1,
    front: "You attempt to troubleshoot a routing break. Hop diagnostics list hop 1 to 4 successfully, but hops 5 to 15 display blank lines of asterisks (* * *). Why is this?",
    back: "This means routers at hops 1-4 successfully sent back ICMP Type 11 (TTL Exceeded). Hops 5-15 represent firewalls or gateways configured to drop/discard TTL-expired packets, refusing to return ICMP messages entirely.",
    objective: "CompTIA Objective 5.2", difficulty: "Hard"
  },
  {
    id: 't4-c-2', topicId: 4, topicName: 'ICMP Types', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 2,
    front: "You ping a server and instantly receive: 'Reply from 10.0.0.1: Destination net unreachable'. What sent this and why?",
    back: "It was sent by the nearest router (10.0.0.1). It sent an ICMP Type 3 packet (Unreachable) because it looked up the destination in its tables and discovered it has zero routes matching the path.",
    objective: "CompTIA Objective 5.2", difficulty: "Hard"
  },
  {
    id: 't4-d-1', topicId: 4, topicName: 'ICMP Types', deckType: 'D', deckTypeName: 'Mnemonic Aid', cardNum: 1,
    front: "Mnemonic help to associate codes (0, 3, 8, 11) with their targets.",
    back: "Easy associations:\n- **0** = **O**utput (Reply / Echo back zero latency)\n- **8** = **A**sk (Ask a question - flipped 8 looks like 'A')\n- **11** = **T**raveling **T**ime (TTL Exceeded - double 1s are hop steps)\n- **3** = **C**an't enter (Destination Unreachable - Three is a crowd!)",
    objective: "CompTIA Objective 5.2", difficulty: "Easy"
  },

  // --- TOPIC 5 ---
  {
    id: 't5-a-1', topicId: 5, topicName: 'SMTP Ports', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 1,
    front: "What is TCP Port 25 used for in mail delivery?",
    back: "Server-to-Server SMTP mail relay. This is used strictly between main mail servers (MTAs). Blocking port 25 prevents rogue spam distribution.",
    objective: "CompTIA Objective 1.4", difficulty: "Easy"
  },
  {
    id: 't5-a-2', topicId: 5, topicName: 'SMTP Ports', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 2,
    front: "What is TCP Port 587 used for in email delivery?",
    back: "Secure Client-to-Server mail submission, utilizing STARTTLS encryption parameters. Mobile clients are config'd here.",
    objective: "CompTIA Objective 1.4", difficulty: "Easy"
  },
  {
    id: 't5-b-1', topicId: 5, topicName: 'SMTP Ports', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 1,
    front: "Contrast Mail Relay on Port 25 vs Mail Submission on Port 587.",
    back: "• Port 25: Unauthenticated general public MTA forwarding. Frequently disabled/dropped on client subnets.\n• Port 587: Secure authenticated local client connection. Employs encrypt tools to prevent credential snooping.",
    objective: "CompTIA Objective 1.4 / 1.6", difficulty: "Medium"
  },
  {
    id: 't5-c-1', topicId: 5, topicName: 'SMTP Ports', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 1,
    front: "A user at home claims they can fetch emails but outbound sending fails on old SMTP Port 25. Their ISP says they block Port 25 for consumer circuits. What is the explanation and fix?",
    back: "• Explanation: ISPs block outgoing TCP 25 to stop malware infected local laptops from turning into spam engines.\n• Fix: Secure the mail client properties to use Port 587 (Secure Email Submission) leveraging TLS parameters.",
    objective: "CompTIA Objective 1.4 / 1.6", difficulty: "Medium"
  },
  {
    id: 't5-c-2', topicId: 5, topicName: 'SMTP Ports', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 2,
    front: "You are implementing exchange DNS records. Which port must you leave open on your corporate DMZ Firewall so incoming emails from yahoo.com can enter?",
    back: "Port 25. External mail servers must have direct access to your mail server over Port 25 to complete server-to-server relay. Port 587 is purely for internal clients uploading their drafts.",
    objective: "CompTIA Objective 1.4", difficulty: "Hard"
  },
  {
    id: 't5-d-1', topicId: 5, topicName: 'SMTP Ports', deckType: 'D', deckTypeName: 'Mnemonic Aid', cardNum: 1,
    front: "Mnemonic trick to recall SMTP Port 25 vs 587 roles.",
    back: "Associations:\n- **25** = **25 MTAs** (server bulk relays)\n- **587** = **5**end **8**eautiful **7**exts (Client upload secure submissions)",
    objective: "CompTIA Objective 1.4", difficulty: "Easy"
  },

  // --- TOPIC 6 ---
  {
    id: 't6-a-1', topicId: 6, topicName: 'Routing Protocol Characteristics', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 1,
    front: "State RIPv2's metric, default Administrative Distance (AD), and routing class.",
    back: "• Metric: Hop count (Max 15)\n• Administrative Distance: 120\n• Class: Distance Vector",
    objective: "CompTIA Objective 2.3", difficulty: "Easy"
  },
  {
    id: 't6-a-2', topicId: 6, topicName: 'Routing Protocol Characteristics', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 2,
    front: "State OSPF's metric, Administrative Distance (AD), and routing class.",
    back: "• Metric: Cost (calculated via bandwidth: reference bandwidth / port speed)\n• Administrative Distance: 110\n• Class: Link-State",
    objective: "CompTIA Objective 2.3", difficulty: "Easy"
  },
  {
    id: 't6-a-3', topicId: 6, topicName: 'Routing Protocol Characteristics', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 3,
    front: "State EIGRP's metric, default Administrative Distance (AD), and routing class.",
    back: "• Metric: Bandwidth & Delay (K-values)\n• Administrative Distance: 90 (internal paths)\n• Class: Hybrid / Advanced Distance Vector",
    objective: "CompTIA Objective 2.3", difficulty: "Easy"
  },
  {
    id: 't6-a-4', topicId: 6, topicName: 'Routing Protocol Characteristics', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 4,
    front: "State BGP's metric basis, default Administrative Distance (AD), and routing class.",
    back: "• Metric: Path Attributes (AS-Path, Weight, Local Preference)\n• Administrative Distance: eBGP = 20, iBGP = 200\n• Class: Path Vector (Core Internet routing)",
    objective: "CompTIA Objective 2.3", difficulty: "Easy"
  },
  {
    id: 't6-b-1', topicId: 6, topicName: 'Routing Protocol Characteristics', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 1,
    front: "Compare Administrative Distance (AD) preferences of RIP, OSPF, EIGRP, and eBGP.",
    back: "Represent protocol trustworthiness (Lower is preferred):\n1. eBGP (AD 20)\n2. EIGRP (AD 90)\n3. OSPF (AD 110)\n4. RIP (AD 120)\n5. iBGP (AD 200)",
    objective: "CompTIA Objective 2.3", difficulty: "Medium"
  },
  {
    id: 't6-b-2', topicId: 6, topicName: 'Routing Protocol Characteristics', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 2,
    front: "Contrast Distance Vector routing logic with Link-State routing logic.",
    back: "• Distance Vector: Periodically broadcasts full routing tables to direct neighbors. Knows paths but has no topological master map.\n• Link-State: advertises state alerts (LSAs), populating a master topological link-state database (LSDB) so every router can calculate its own shortest paths.",
    objective: "CompTIA Objective 2.3", difficulty: "Medium"
  },
  {
    id: 't6-c-1', topicId: 6, topicName: 'Routing Protocol Characteristics', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 1,
    front: "A core router receives route paths to 192.168.5.0/24 from EIGRP (AD 90) and OSPF (AD 110) simultaneously. Which path gets loaded into the active routing table, and why?",
    back: "The EIGRP path is activated in the table because EIGRP has a lower default Administrative Distance (90 vs 110). Lower AD wins as it matches higher protocol trustworthiness.",
    objective: "CompTIA Objective 2.3", difficulty: "Medium"
  },
  {
    id: 't6-c-2', topicId: 6, topicName: 'Routing Protocol Characteristics', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 2,
    front: "Your company adds remote warehouses making a sequence of 19 connected serial router hops. Why is RIPv2 useless for this layout, and what protocol should be configured?",
    back: "• Failure: RIP is constrained to a maximum of 15 hops. 16 hops makes the route infinite (unreachable).\n• Correction: Implement OSPF (Link-state). It uses bandwidth-based cost metrics and has no hop boundaries.",
    objective: "CompTIA Objective 2.3", difficulty: "Hard"
  },
  {
    id: 't6-d-1', topicId: 6, topicName: 'Routing Protocol Characteristics', deckType: 'D', deckTypeName: 'Mnemonic Aid', cardNum: 1,
    front: "Mnemonic technique to master metric formulas for RIP, OSPF, and EIGRP.",
    back: "Memory triggers:\n- RIP = **R**un **H**ops (RIP maps hops)\n- OSPF = **O**ptimal **C**ost (OSPF uses bandwidth cost)\n- EIGRP = **E**xtreme **B**andwidth & **D**elay (Uses both fields)",
    objective: "CompTIA Objective 2.3", difficulty: "Easy"
  },

  // --- TOPIC 7 ---
  {
    id: 't7-a-1', topicId: 7, topicName: 'Security Features Comparison', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 1,
    front: "What is DHCP Snooping?",
    back: "A Layer 2 security standard that maps switch ports as 'trusted' or 'untrusted' to block rogue DHCP servers, while compiling a dynamic IP-to-MAC binding database of compliant clients.",
    objective: "CompTIA Objective 4.2 / 4.3", difficulty: "Easy"
  },
  {
    id: 't7-a-2', topicId: 7, topicName: 'Security Features Comparison', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 2,
    front: "What is Dynamic ARP Inspection (DAI)?",
    back: "A layer 2 defense that prevents ARP Poisoning / Man-In-The-Middle attacks by validating incoming ARP replies against the DHCP Snooping Binding Table.",
    objective: "CompTIA Objective 4.3 / 4.2", difficulty: "Medium"
  },
  {
    id: 't7-a-3', topicId: 7, topicName: 'Security Features Comparison', deckType: 'A', deckTypeName: 'Basic Recall', cardNum: 3,
    front: "What is Port Security?",
    back: "A layer 2 MAC-protection feature that limits the total count of MAC addresses allowed to learn on a switch port, triggering action (like shutdown) during anomalies.",
    objective: "CompTIA Objective 4.3", difficulty: "Easy"
  },
  {
    id: 't7-b-1', topicId: 7, topicName: 'Security Features Comparison', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 1,
    front: "Explain how DHCP Snooping, DAI, and Port Security integrate conceptually.",
    back: "• DHCP Snooping filters rogue DHCP server traffic and builds an IP-to-MAC Binding Database.\n• DAI leverages that Snooping Database to intercept and drop forged ARP replies.\n• Port Security limits MAC quantities directly, preventing CAM table overload, but operates independently of DHCP Snooping.",
    objective: "CompTIA Objective 4.2 / 4.3", difficulty: "Hard"
  },
  {
    id: 't7-b-2', topicId: 7, topicName: 'Security Features Comparison', deckType: 'B', deckTypeName: 'Compare & Contrast', cardNum: 2,
    front: "Contrast targeted attacks countered by Port Security vs Dynamic ARP Inspection (DAI).",
    back: "• Port Security: Counteracts CAM table MAC flooding utilities (MAC floods forcing switches into generic hub mode).\n• DAI: Counteracts ARP spoofing / Poisoning (where attackers map gateway IP to their malicious NIC).",
    objective: "CompTIA Objective 4.3", difficulty: "Medium"
  },
  {
    id: 't7-c-1', topicId: 7, topicName: 'Security Features Comparison', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 1,
    front: "An attacker runs a MAC address overload utility (such as macof) to flood CAM buffers of an access switch, forcing it to pass all packets to every port. Which Layer 2 defense counters this and why?",
    back: "Port Security counters this. It restricts the maximum permissible MAC address limit (e.g., maximum 2 devices per port) and places unauthorized intruders in err-disable shutdown state, discarding their bulk fake MAC floods.",
    objective: "CompTIA Objective 4.3", difficulty: "Hard"
  },
  {
    id: 't7-c-2', topicId: 7, topicName: 'Security Features Comparison', deckType: 'C', deckTypeName: 'Scenario Application', cardNum: 2,
    front: "An administrator designates port Eth0/4 as 'untrusted' in DHCP Snooping. An attacker connects a rogue router to Eth0/4 and replies to DHCP Discover queries. What happens next?",
    back: "The switch intercepts the rogue DHCP replies on the untrusted Eth0/4 port. DHCP Snooping blocks all DHCP Offer/ACK parameters on untrusted interfaces, dropping the packet instantly.",
    objective: "CompTIA Objective 4.3 / 4.2", difficulty: "Hard"
  },
  {
    id: 't7-d-1', topicId: 7, topicName: 'Security Features Comparison', deckType: 'D', deckTypeName: 'Mnemonic Aid', cardNum: 1,
    front: "Mnemonic key to remember DHCP Snooping vs DAI vs Port Security targets.",
    back: "Recall mappings:\n- **Snooping** maps dynamic **Servers**.\n- **Inspection (DAI)** intercepts malicious **IP-to-MAC replies**.\n- **Port Security** limits physical **MAC totals**.",
    objective: "CompTIA Objective 4.3", difficulty: "Easy"
  }
];

const EXAM_TRICKS: Record<number, { title: string; desc: string; trap: string }> = {
  1: {
    title: "Interface Status Misleads",
    desc: "The exam frequently asks you to determine why two ports cannot ping, presenting 'up/down'. Look immediately at framing mismatches (encapsulation) or speed conflicts. If it were a broken cable, it would read 'down/down'.",
    trap: "Don't confuse 'admin down' with 'down/down'. Admin down is ONLY when a human ran 'shutdown'."
  },
  2: {
    title: "Logging Limits",
    desc: "Syslog traps are inclusive. 'logging trap warnings' pushes warning (Level 4) and all LOWER numbers (Errors 3, Critical 2, Alert 1, Emergency 0). Far too many students get tricks by choosing only Level 4.",
    trap: "Remember: syslog numbering goes from most dangerous (0) to most verbose (7)."
  },
  3: {
    title: "NAT Overload",
    desc: "PAT is often called 'NAT Overload'. If you only have ONE public IP, Dynamic NAT is useless. You must select PAT. Also, Static NAT is required to link servers in the DMZ out permanently.",
    trap: "The exam uses 'one-to-many' to trigger PAT, and 'one-to-one' to point to Static or Dynamic NAT."
  },
  4: {
    title: "ICMP Type 11 and Traceroute",
    desc: "Traceroute does not get packets directly from target systems initially; it measures successive return packets of TTL Exceeded (Type 11) generated as TTL drops down step-by-step from 1.",
    trap: "If ping replies say 'unreachable', look for Type 3. Type 8 is request, Type 0 is response."
  },
  5: {
    title: "The SMTP Split",
    desc: "Mail submission uses port 587. Bulk mail relays between server agents use port 25. Standard client systems should NEVER direct relay over port 25 due to massive ISP spam block lists.",
    trap: "If the question says server-to-server, choose port 25. If it says user laptop submission, choose port 587."
  },
  6: {
    title: "AD vs Metric",
    desc: "Administrative Distance represents routing priority / trustworthiness. Metric represents path preference within a single protocol. Routers look at AD FIRST to choose protocol, then Metric to choose paths.",
    trap: "EIGRP AD is 90; OSPF is 110; RIP is 120. A lower distance ALWAYS defeats a higher one!"
  },
  7: {
    title: "Dynamic ARP Inspection dependency",
    desc: "You CANNOT configure DAI without first enabling DHCP Snooping. DAI relies entirely on the Snooping dynamic table to identify authentic mappings.",
    trap: "The exam asks how DAI knows true mappings. It checks the Snooping Binding Table, NOT an active ping sweep."
  }
};

const REFERENCE_TABLES: Record<number, { headers: string[]; rows: string[][] }> = {
  1: {
    headers: ['Interface Code', 'Layer focus', 'Likely Culprits', 'Immediate Remediation'],
    rows: [
      ['down/down', 'Layer 1 (Physical)', 'Broken/unplugged cabling, failed SFP, dead remote node', 'Swap patch cable, verify hardware ports, seat transceiver'],
      ['up/down', 'Layer 2 (Logical)', 'Framing protocol mismatch (such as HLD vs PPP), speed conflicts', 'Verify encapsulation commands, align speed/duplex settings'],
      ['err-disable', 'L2 Security event', 'Port Security trip, storm control exceeded, BPDU Guard alert', 'Uproot threat, run shut then no shut on port'],
      ['admin down', 'L2 Admin', 'Port turned off by engineer with shutdown command', 'Enter interface configuration, run no shutdown']
    ]
  },
  2: {
    headers: ['Syslog Code', 'Severity Name', 'Operational Context', 'Mnemonic Hook'],
    rows: [
      ['0', 'Emergency', 'Entire system failed / completely dead', 'Every (Emergency)'],
      ['1', 'Alert', 'Action is needed immediately, localized failure', 'Awful (Alert)'],
      ['2', 'Critical', 'Critical boundaries breached (hardware/RAM)', 'Cat (Critical)'],
      ['3', 'Error', 'Error conditions limiting minor processes', 'Error (Error)'],
      ['4', 'Warning', 'Warnings indicating failures if unchecked', 'Will (Warning)'],
      ['5', 'Notice', 'Normal but significant state changes (link toggles)', 'Not (Notice)'],
      ['6', 'Informational', 'Normal client activities, informational outputs', 'Ignore (Info)'],
      ['7', 'Debug', 'Detailed diagnostic output stream (CPU heavy)', 'Dead-fish (Debug)']
    ]
  },
  3: {
    headers: ['NAT Method', 'Host Ratio', 'Accessibility', 'Target Deployments'],
    rows: [
      ['Static NAT', 'Permanent 1:1', 'Outside-In Initiated', 'DMZ Web servers, VPN endpoints, Mail relays'],
      ['Dynamic NAT', 'Dynamic 1:1 pool', 'Outgoing reactions', 'Small office pool access, testing suites'],
      ['PAT (Overload)', 'Many-to-1 (Source Ports)', 'Outgoing reactions', 'Consumer network setups, office client internet access']
    ]
  },
  4: {
    headers: ['ICMP Type', 'Description', 'Trigger Process', 'Security impact'],
    rows: [
      ['Type 8', 'Echo Request', 'PING outgoing diagnostic query', 'Blocked at firewalls to obstruct discovery scans'],
      ['Type 0', 'Echo Reply', 'PING answer back to request', 'Permitted dynamically by stateful outbound firewalls'],
      ['Type 11', 'TTL Exceeded', 'Traceroute router boundary decay', 'Blocked in critical cores to protect router identities'],
      ['Type 3', 'Destination Unreachable', 'Router has no matching route address', 'Generated by gateway when pathways collapse']
    ]
  },
  5: {
    headers: ['SMTP Port', 'Protocol Standard', 'Role in transport', 'ISP Stance'],
    rows: [
      ['Port 25', 'Plain relay (MTA)', 'Relaying emails server-to-server', 'Blocked heavily on user nodes to deny malware spammers'],
      ['Port 587', 'Authenticated submissions', 'Secure submission client-to-server (STARTTLS)', 'White-listed on consumer routers']
    ]
  },
  6: {
    headers: ['Routing Protocol', 'Default AD', 'Path Metric Basis', 'Algorithm Category'],
    rows: [
      ['eBGP', '20', 'AS-Path (autonomous systems attributes)', 'Path Vector'],
      ['EIGRP', '90', 'Bandwidth & Delay parameters (K-values)', 'Hybrid (Diffusing Update)'],
      ['OSPF', '110', 'Link Cost (Reference Bandwidth / Speed)', 'Link State (Dijkstra)'],
      ['RIPv2', '120', 'Hop count metric (Max 15)', 'Distance Vector'],
      ['iBGP', '200', 'Internal autonomous values', 'Path Vector']
    ]
  },
  7: {
    headers: ['L2 Defense', 'Target Countered', 'Validation Standard', 'Design requirements'],
    rows: [
      ['DHCP Snooping', 'Rogue DHCP distribution', 'Blocks Server DHCP messages on Untrusted links', 'Configuring trust/untrust ports'],
      ['DAI', 'ARP Spoofing / Poisons', 'Checks ARP parameters against Snooping Bind table', 'DHCP Snooping must be configured first'],
      ['Port Security', 'CAM Table flooding attacks', 'Checks source MAC count per physical port', 'Locks port when MAC totals overflow limits']
    ]
  }
};

const SCHEDULE_RECS: Record<number, string> = {
  1: "Review Decks A & B every 3 days. Focus on Scenario Deck C weekly to consolidate routing context.",
  2: "Level 0-7 contains heavy recall. Do Deck A daily for 3 consecutive days. Transition to Deck B review weekly.",
  3: "Review comparison cards (Deck B) every 5 days. Scenario cards (Deck C) should be practiced twice a week.",
  4: "Do recalled ICMP Types (Deck A) daily. Practice Traceroute scenario cards (Deck C) weekly.",
  5: "Differentiating 25 vs 587 submissions is heavily tested. Review all decks every 4 days.",
  6: "EIGRP/OSPF metrics are complex. Spend 15 minutes reviewing Deck B comparisons and AD weights every week.",
  7: "Layer 2 security dependencies are critical. Review DHCP/ARP/MAC protections together every Saturday."
};

export default function CompTiaFlashcards({ onBack, onAddXp }: CompTiaFlashcardsProps) {
  // Navigation & States
  const [selectedTopic, setSelectedTopic] = useState<number>(1);
  const [selectedDeckType, setSelectedDeckType] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'mastered' | 'reviewing' | 'weak'>('all');
  
  // Flashcard flip state
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Load progress states from LocalStorage
  const [cardStatus, setCardStatus] = useState<Record<string, 'mastered' | 'reviewing' | 'weak'>>(() => {
    const saved = localStorage.getItem('shift_flashcards_status');
    return saved ? JSON.parse(saved) : {};
  });

  // Keep track of which cards gave master XP rewards to prevent cheating
  const [rewardedCards, setRewardedCards] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('shift_flashcards_rewards');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Calculate master analytics
  const analytics = useMemo(() => {
    let total = FLASHCARDS_DB.length;
    let mastered = 0;
    let reviewing = 0;
    let weak = 0;

    FLASHCARDS_DB.forEach(c => {
      const s = cardStatus[c.id];
      if (s === 'mastered') mastered++;
      else if (s === 'reviewing') reviewing++;
      else if (s === 'weak') weak++;
    });

    return {
      total,
      mastered,
      reviewing,
      weak,
      unseen: total - (mastered + reviewing + weak),
      percentMastered: total > 0 ? Math.round((mastered / total) * 100) : 0
    };
  }, [cardStatus]);

  // Handle marking card progress
  const updateCardStatus = (cardId: string, status: 'mastered' | 'reviewing' | 'weak') => {
    const nextStatus = { ...cardStatus, [cardId]: status };
    setCardStatus(nextStatus);
    localStorage.setItem('shift_flashcards_status', JSON.stringify(nextStatus));

    // If marked master for the first time, award XP!
    if (status === 'mastered' && !rewardedCards.has(cardId)) {
      const nextRewarded = new Set(rewardedCards).add(cardId);
      setRewardedCards(nextRewarded);
      localStorage.setItem('shift_flashcards_rewards', JSON.stringify(Array.from(nextRewarded)));
      
      // Award 250 XP for mastering a flashcard
      onAddXp(250);
    }
  };

  // Filter master dataset based on query and tabs
  const filteredCards = useMemo(() => {
    return FLASHCARDS_DB.filter(c => {
      // Topic match
      if (searchQuery.trim() === '' && c.topicId !== selectedTopic) return false;
      
      // Deck type match
      if (searchQuery.trim() === '' && c.deckType !== selectedDeckType) return false;

      // Status Filter
      const state = cardStatus[c.id] || 'unseen';
      if (statusFilter !== 'all') {
        if (statusFilter === 'mastered' && state !== 'mastered') return false;
        if (statusFilter === 'reviewing' && state !== 'reviewing') return false;
        if (statusFilter === 'weak' && state !== 'weak') return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const mainMatch = c.front.toLowerCase().includes(query) || 
                          c.back.toLowerCase().includes(query) || 
                          c.topicName.toLowerCase().includes(query) ||
                          c.objective.toLowerCase().includes(query);
        if (!mainMatch) return false;
      }

      return true;
    });
  }, [selectedTopic, selectedDeckType, searchQuery, statusFilter, cardStatus]);

  // Handle shifting indices
  const currentCard = useMemo<Flashcard | null>(() => {
    if (filteredCards.length === 0) return null;
    return filteredCards[currentIndex] || filteredCards[0];
  }, [filteredCards, currentIndex]);

  // Auto reset active card when tabs shift
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedTopic, selectedDeckType, statusFilter]);

  const handleNext = () => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % filteredCards.length);
    }, 150);
  };

  const handlePrev = () => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 150);
  };

  const selectedTopicData = useMemo(() => {
    return TOPICS.find(t => t.id === selectedTopic);
  }, [selectedTopic]);

  const activeTopicTable = useMemo(() => {
    return REFERENCE_TABLES[selectedTopic];
  }, [selectedTopic]);

  return (
    <div id="flashcards-section-root" className="fixed inset-0 bg-slate-50 z-[150] flex flex-col overflow-y-auto text-slate-800">
      
      {/* Top Header Controls with back button and overall analytics */}
      <div className="bg-white border-b border-gray-100 py-4 px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-[10]">
        <div className="flex items-center gap-x-4">
          <button 
            id="flashcards-back-btn"
            onClick={onBack}
            className="flex items-center gap-x-2 px-3 py-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors rounded-xl min-h-[44px]"
          >
            <ChevronLeft size={16} />
            <span>Return Dashboard</span>
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter">CompTIA Precision Flashcards</h1>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.15em]">CompTIA Network+ N10-009 Weaknesses Tackler</p>
          </div>
        </div>

        {/* Global Progress Statistics bar */}
        <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-3 border border-slate-150/50">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Mastery</span>
            <div className="text-sm font-black text-slate-800">
              {analytics.mastered} <span className="text-xs text-slate-400 font-normal">/ {analytics.total} Mastered</span>
            </div>
          </div>
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="absolute w-12 h-12">
              <circle cx="24" cy="24" r="20" stroke="#E2E8F0" strokeWidth="4" fill="transparent" />
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                stroke="#10B981" 
                strokeWidth="4" 
                fill="transparent" 
                strokeDasharray="125.6" 
                strokeDashoffset={125.6 - (125.6 * analytics.percentMastered / 100)} 
                className="transition-all duration-500"
              />
            </svg>
            <span className="text-xs font-black text-emerald-600">{analytics.percentMastered}%</span>
          </div>
        </div>
      </div>

      {/* Main Flashcards working frame */}
      <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-y-auto">
        
        {/* Left Sidebar Topics list - 4 columns on desktop */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Card Search and Filter parameters */}
          <div className="bg-white p-4 rounded-3xl border border-slate-150 shadow-sm space-y-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Search & Status Filters</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Find e.g. PAT, EIGRP, err-disable..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 pl-10 pr-4 py-2 text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-xl"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Performance status shortcuts */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {(['all', 'mastered', 'reviewing', 'weak'] as const).map(f => {
                const colors = {
                  all: 'bg-slate-100 text-slate-600 border-slate-200',
                  mastered: 'bg-emerald-50 text-emerald-700 border-emerald-150',
                  reviewing: 'bg-amber-50 text-amber-700 border-amber-150',
                  weak: 'bg-red-50 text-red-700 border-red-150'
                };
                const activeColors = {
                  all: 'bg-slate-900 border-slate-900 text-white',
                  mastered: 'bg-emerald-600 border-emerald-600 text-white',
                  reviewing: 'bg-amber-500 border-amber-500 text-white',
                  weak: 'bg-red-600 border-red-600 text-white'
                };
                return (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`py-1.5 px-1 font-black text-[9px] uppercase tracking-wider border rounded-lg text-center transition-all ${
                      statusFilter === f ? activeColors[f] : colors[f]
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-150 shadow-sm p-4 flex-1 overflow-y-auto max-h-[350px] lg:max-h-none space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Review Targets</span>
              <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{TOPICS.length} Topics</span>
            </div>
            
            <div className="space-y-1 pt-1">
              {TOPICS.map(topic => {
                const IconComp = topic.icon;
                const isActive = selectedTopic === topic.id && searchQuery === '';
                
                // Calculate how many of this topic are Mastered
                const topicCards = FLASHCARDS_DB.filter(c => c.topicId === topic.id);
                const topicMastered = topicCards.filter(c => cardStatus[c.id] === 'mastered').length;

                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTopic(topic.id);
                    }}
                    className={`w-full p-3 font-display rounded-2xl flex items-start gap-x-3 text-left transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                        : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${
                      isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <IconComp size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className={`text-xs font-black truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                          {topic.name}
                        </p>
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-lg shrink-0 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {topicMastered}/{topicCards.length}
                        </span>
                      </div>
                      <p className={`text-[10px] truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                        {topic.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Active Zone (Interactive card, tables, metrics) - 8 columns */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Deck Tier Filter Tabs (A, B, C, D) - only shown when not raw searching */}
          {searchQuery === '' && (
            <div className="bg-white p-1 rounded-2xl border border-slate-150 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-1">
              {DECK_TYPES.map(deck => {
                const isActive = selectedDeckType === deck.id;
                return (
                  <button
                    key={deck.id}
                    onClick={() => setSelectedDeckType(deck.id)}
                    className={`py-2 px-3 rounded-xl flex flex-col items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-slate-950 text-white shadow-md' 
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">DECK {deck.id}</span>
                    <span className={`text-[9px] font-bold mt-0.5 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {deck.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Flashcard Render Segment */}
          {filteredCards.length > 0 ? (
            <div className="space-y-4">
              
              {/* Card Meta Row */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
                <span>
                  Card {currentIndex + 1} of {filteredCards.length} 
                  {searchQuery !== '' && <span className="text-blue-600 ml-1">(Matching search query)</span>}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-black shrink-0 ${
                    currentCard?.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' :
                    currentCard?.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {currentCard?.difficulty}
                  </span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded-full text-[10px]">
                    {currentCard?.objective}
                  </span>
                </div>
              </div>

              {/* 3D Interactive Flipping Flashcard */}
              <div 
                id="interactive-flashcard-box"
                onClick={() => setIsFlipped(prev => !prev)}
                className="perspective-1000 w-full min-h-[280px] sm:min-h-[320px] cursor-pointer"
              >
                <div className={`relative w-full h-full duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  
                  {/* Front Face of the Card */}
                  <div className={`absolute inset-0 backface-hidden w-full h-full bg-white border border-slate-200 rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between shadow-md transition-all ${
                    cardStatus[currentCard?.id || ''] === 'mastered' ? 'border-l-8 border-l-emerald-500' :
                    cardStatus[currentCard?.id || ''] === 'reviewing' ? 'border-l-8 border-l-amber-400' :
                    cardStatus[currentCard?.id || ''] === 'weak' ? 'border-l-8 border-l-red-500' : ''
                  }`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 block">
                          DECK {currentCard?.deckType}: {currentCard?.deckTypeName}
                        </span>
                        <div className="flex items-center gap-x-1.5">
                          {cardStatus[currentCard?.id || ''] === 'mastered' && (
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full font-black text-[9px] uppercase tracking-wider flex items-center gap-x-1">
                              <Check size={10} strokeWidth={3} /> Mastered
                            </span>
                          )}
                          {cardStatus[currentCard?.id || ''] === 'reviewing' && (
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full font-black text-[9px] uppercase tracking-wider">
                              Reviewing
                            </span>
                          )}
                          {cardStatus[currentCard?.id || ''] === 'weak' && (
                            <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-full font-black text-[9px] uppercase tracking-wider">
                              Weak Target
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed md:pt-4">
                        {currentCard?.front}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>Click to flip card</span>
                      <RefreshCw size={14} className="text-slate-400 animate-spin-slow" />
                    </div>
                  </div>

                  {/* Back Face of the Card */}
                  <div className={`absolute inset-0 backface-hidden rotate-y-180 w-full h-full bg-slate-900 border border-slate-850 rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all`}>
                    <div className="space-y-4 overflow-y-auto max-h-[180px] sm:max-h-[220px] custom-scrollbar">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 block">
                          DECK {currentCard?.deckType} - ANSWER SCHEME
                        </span>
                        <span className="text-[9px] font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-lg border border-emerald-800/50">
                          +250 XP REWARD
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-white font-medium whitespace-pre-wrap leading-relaxed">
                        {currentCard?.back}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span>Completed! click to flip back</span>
                      <Sparkles size={14} className="text-indigo-400" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Progress Tracking action panel & navigation button triggers */}
              <div className="bg-white p-4 rounded-3xl border border-slate-150 shadow-sm flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                
                {/* Score Mark triggers (Mastered, Review, Weak) */}
                <div className="flex items-center gap-x-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0">Your Assessment:</span>
                  <div className="flex items-center gap-1.5 flex-1 sm:flex-none">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentCard) updateCardStatus(currentCard.id, 'weak');
                      }}
                      className={`flex-1 sm:flex-none px-3 py-2 text-xs font-black uppercase rounded-xl transition-all border ${
                        currentCard && cardStatus[currentCard.id] === 'weak'
                          ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-200'
                          : 'bg-red-50 border-red-100 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      Weak
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentCard) updateCardStatus(currentCard.id, 'reviewing');
                      }}
                      className={`flex-1 sm:flex-none px-3 py-2 text-xs font-black uppercase rounded-xl transition-all border ${
                        currentCard && cardStatus[currentCard.id] === 'reviewing'
                          ? 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-200'
                          : 'bg-amber-50 border-amber-100 text-amber-600 hover:bg-amber-100'
                      }`}
                    >
                      Review
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentCard) updateCardStatus(currentCard.id, 'mastered');
                      }}
                      className={`flex-1 sm:flex-none px-3 py-2 text-xs font-black uppercase rounded-xl transition-all border ${
                        currentCard && cardStatus[currentCard.id] === 'mastered'
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-200'
                          : 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      Mastered
                    </button>
                  </div>
                </div>

                {/* Left/Right controls */}
                <div className="flex items-center justify-between sm:justify-end gap-x-2">
                  <button 
                    onClick={handlePrev}
                    className="flex-1 sm:flex-none min-w-[50px] py-2.5 px-3 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center text-slate-600 transition-colors"
                    aria-label="Previous card"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex-1 sm:flex-none min-w-[50px] py-2.5 px-3 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center text-slate-600 transition-colors"
                    aria-label="Next card"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

              </div>

            </div>
          ) : (
            /* No cards matching state search */
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-150 text-center shadow-sm">
              <AlertTriangle className="mx-auto text-amber-500 mb-4" size={44} />
              <h3 className="text-lg font-black text-slate-900 uppercase">No matching cards found</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                No cards match your search term or active filters. Try resetting search strings or removing the progress filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Clear Active Filters
              </button>
            </div>
          )}

          {/* Spaced Repetition Recommendation Box */}
          {searchQuery === '' && (
            <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-3xl flex items-start gap-x-4">
              <TrendingUp className="text-blue-600 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-xs font-black text-blue-900 uppercase tracking-widest">Spaced Repetition Recommendation Schedule</p>
                <p className="text-xs text-blue-700/85 mt-1 font-medium leading-relaxed">
                  {SCHEDULE_RECS[selectedTopic]}
                </p>
              </div>
            </div>
          )}

          {/* Common Exam Tricks Box */}
          {searchQuery === '' && EXAM_TRICKS[selectedTopic] && (
            <div className="bg-red-50/50 border border-red-100 p-5 rounded-3xl flex items-start gap-x-4">
              <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={20} />
              <div className="space-y-1">
                <p className="text-xs font-black text-red-900 uppercase tracking-widest">
                  CompTIA Pro-Tip: {EXAM_TRICKS[selectedTopic].title}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {EXAM_TRICKS[selectedTopic].desc}
                </p>
                <p className="text-xs font-black text-red-800 bg-red-100/40 px-2.5 py-1.5 rounded-xl border border-red-100 mt-2 block">
                  <span className="uppercase text-[9px] tracking-wider block text-red-900 font-black mb-0.5">EXAM TRAP WARNING:</span>
                  {EXAM_TRICKS[selectedTopic].trap}
                </p>
              </div>
            </div>
          )}

          {/* Quick-Reference Summary Table */}
          {searchQuery === '' && activeTopicTable && (
            <div className="bg-white p-5 rounded-[2rem] border border-slate-150 shadow-sm space-y-3">
              <div className="flex items-center gap-x-2 border-b border-slate-100 pb-3">
                <BookOpen size={16} className="text-slate-400" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                  Quick Reference Summary Table
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      {activeTopicTable.headers.map((h, i) => (
                        <th key={i} className="py-2.5 px-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeTopicTable.rows.map((row, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50 last:border-0">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="py-3 px-3 text-xs font-medium text-slate-700 leading-relaxed">
                            {cellIndex === 0 ? (
                              <code className="text-blue-600 font-mono font-bold bg-blue-50/50 px-1.5 py-0.5 rounded border border-blue-100/50 shrink-0">
                                {cell}
                              </code>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
