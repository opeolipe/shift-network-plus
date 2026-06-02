import { Question } from './types';

export const questions: Question[] = [
  {
    id: "scen1",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.8 Modern Envs",
    question: "A network administrator is designing a highly scalable data center fabric. They need to provide Layer 2 connectivity over a Layer 3 spine-leaf architecture while allowing for over 16 million segments. Which technology is BEST suited for this requirement?",
    options: [
      "VXLAN",
      "STP",
      "VLAN",
      "802.1Q"
    ],
    correctAnswer: "VXLAN",
    explanation: {
      whyCorrect: "VXLAN (Virtual Extensible LAN) is the industry standard for large data centers. It uses a 24-bit VNI (VXLAN Network Identifier), which supports over 16 million unique segments, far exceeding the 4,096-segment limit of traditional 802.1Q VLANs.",
      whyWrong: [
        { option: "STP", reason: "STP (Spanning Tree Protocol) is for loop prevention in Layer 2 networks, not for creating massive virtual segments." },
        { option: "VLAN", reason: "VLANs are limited to 4,096 IDs, which is insufficient for the high scalability required in modern multi-tenant cloud data centers." },
        { option: "802.1Q", reason: "This is the standard trunking protocol for VLANs, but it doesn't provide the level of scalability that VXLAN encapsulates." }
      ]
    },
    weight: 10
  },
  {
    id: "scen2",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.8 Modern Envs",
    question: "An organization needs to optimize cloud application performance for branch offices by dynamically routing traffic based on real-time link quality and application requirements. Which solution should be implemented?",
    options: [
      "SD-WAN",
      "BGP",
      "Site-to-Site VPN",
      "Static Routing"
    ],
    correctAnswer: "SD-WAN",
    explanation: {
      whyCorrect: "SD-WAN (Software-Defined Wide Area Network) provides dynamic path selection (DPS), allowing traffic to be routed over MPLS, Broadband, or LTE based on performance metrics like jitter and latency.",
      whyWrong: [
        { option: "BGP", reason: "BGP is for path exchange between Autonomous Systems; it doesn't natively handle application-aware dynamic routing based on link health." },
        { option: "Site-to-Site VPN", reason: "Site-to-Site VPN provides a fixed secure tunnel but typically lacks the real-time link quality monitoring and dynamic steering of SD-WAN." },
        { option: "Static Routing", reason: "Static routing is manual and does not adapt automatically to failures or changes in link performance." }
      ]
    },
    weight: 10
  },
  {
    id: "multi1",
    type: "multi-select",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A security engineer is configuring a stateful firewall. Which of the following ports should be allowed to facilitate secure remote administration and secure file transfer? (Select TWO).",
    options: [
      "22",
      "23",
      "443",
      "445",
      "990",
      "21"
    ],
    correctAnswer: ["22","990"],
    explanation: {
      whyCorrect: "Port 22 is natively used by SSH (secure remote administration) and SFTP. Port 990 is used for FTPS (FTP over TLS/SSL) implicit mode, ensuring encrypted file transfers.",
      whyWrong: [
        { option: "23", reason: "Port 23 is Telnet, which transfers data and credentials in plaintext, making it highly insecure." },
        { option: "443", reason: "Port 443 is HTTPS; while secure, it is for web traffic rather than direct remote administration or standard file transfer protocols." },
        { option: "445", reason: "Port 445 is SMB; it is commonly used for file sharing in local networks but is not a standard secure remote admin protocol for these scenarios." },
        { option: "21", reason: "Port 21 is standard FTP; like Telnet, it is plaintext and insecure for modern corporate administration." }
      ]
    },
    weight: 10
  },
  {
    id: "scen3",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.1 Routing Technologies",
    question: "You are configuring a router for a large enterprise. You need to use an interior gateway protocol that provides fast convergence and supports large-scale hierarchies using areas. Which protocol is the BEST choice?",
    options: [
      "OSPF",
      "BGP",
      "RIPv2",
      "EGP"
    ],
    correctAnswer: "OSPF",
    explanation: {
      whyCorrect: "OSPF is a link-state IGP that uses SPF for fast convergence and supports hierarchical design through areas.",
      whyWrong: [
        { option: "BGP", reason: "Border Gateway Protocol, the standard Exterior Gateway Protocol (EGP) routing traffic between different Autonomous Systems." },
        { option: "RIPv2", reason: "Routing Information Protocol v2, an interior distance-vector protocol restricted by slow convergence and a 15-hop limit." },
        { option: "EGP", reason: "Exterior Gateway Protocol, an outdated, legacy exterior protocol replaced modernly by BGP." }
      ]
    },
    weight: 10
  },
  {
    id: "scen4",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.1 Routing Technologies",
    question: "A network technician is troubleshooting a routing issue between two different Autonomous Systems. Which protocol is responsible for exchanging routing information between them?",
    options: [
      "BGP",
      "OSPF",
      "EIGRP",
      "IS-IS"
    ],
    correctAnswer: "BGP",
    explanation: {
      whyCorrect: "Border Gateway Protocol (BGP) is the standard Exterior Gateway Protocol (EGP) used to route between Autonomous Systems.",
      whyWrong: [
        { option: "OSPF", reason: "Open Shortest Path First, an Interior Gateway Protocol (IGP) utilizing link-state routing and areas inside an AS." },
        { option: "EIGRP", reason: "Enhanced Interior Gateway Routing Protocol, a Cisco hybrid/distance-vector protocol used internally." },
        { option: "IS-IS", reason: "Intermediate System to Intermediate System, a link-state routing protocol primarily deployed inside service provider cores." }
      ]
    },
    weight: 10
  },
  {
    id: "ac1",
    type: "acronym",
    domain: "3.0 Operations",
    objective: "3.3 Disaster Recovery",
    question: "Acronym: A service level agreement specifies that a critical server must be back online within 4 hours of a failure. Which metric does this represent?",
    options: [
      "RTO",
      "RPO",
      "MTBF",
      "MTTR"
    ],
    correctAnswer: "RTO",
    explanation: {
      whyCorrect: "Recovery Time Objective (RTO) defines the maximum acceptable duration of downtime.",
      whyWrong: [
        { option: "RPO", reason: "Recovery Point Objective, mapping acceptable backup snapshot intervals." },
        { option: "MTBF", reason: "Mean Time Between Failures, tracking expected reliability metrics." },
        { option: "MTTR", reason: "Mean Time to Repair/Recover, outlining target rebuild turnaround schedules." }
      ]
    },
    weight: 10
  },
  {
    id: "ac2",
    type: "acronym",
    domain: "3.0 Operations",
    objective: "3.3 Disaster Recovery",
    question: "Acronym: Your organization performs daily backups at midnight. A catastrophic failure occurs at 10 PM. The organization realizes they have lost 22 hours of data. Which metric measures this tolerable data loss?",
    options: [
      "RPO",
      "RTO",
      "MTTF",
      "MTD"
    ],
    correctAnswer: "RPO",
    explanation: {
      whyCorrect: "Recovery Point Objective (RPO) defines the maximum age of data that can be lost from a backup.",
      whyWrong: [
        { option: "RTO", reason: "Recovery Time Objective, mapping accepted recovery schedules." },
        { option: "MTTF", reason: "Mean Time to Failure, showing operating reliability lifetime expectations for unrepairable modules." },
        { option: "MTD", reason: "Maximum Tolerable Downtime, the absolute duration a workspace can be halted before failing." }
      ]
    },
    weight: 10
  },
  {
    id: "scen5",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.1 Security Concepts",
    question: "A CISO wants to implement a security model where no user or device is trusted by default, even if they are inside the corporate network. Which architecture should be adopted?",
    options: [
      "Zero Trust",
      "Defense in Depth",
      "De-Militarized Zone",
      "Air Gapping"
    ],
    correctAnswer: "Zero Trust",
    explanation: {
      whyCorrect: "Zero Trust architecture requires continuous verification of all subjects (users, devices, apps) regardless of their location.",
      whyWrong: [
        { option: "Defense in Depth", reason: "A layered, defense security matrix across multiple independent layers." },
        { option: "De-Militarized Zone", reason: "A neutral network segment isolating public-facing interfaces from the internal corporate network." },
        { option: "Air Gapping", reason: "Creating complete physical isolation between a secure system and any unsecured network." }
      ]
    },
    weight: 10
  },
  {
    id: "scen6",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.3 Security Features",
    question: "A technician wants to prevent unauthorized laptops from connecting to a desktop Ethernet port in a lobby. Which of the following would be the MOST effective solution?",
    options: [
      "Port Security",
      "DHCP Snooping",
      "VLAN Pooling",
      "IP Source Guard"
    ],
    correctAnswer: "Port Security",
    explanation: {
      whyCorrect: "Port security allows you to restrict the MAC addresses that can connect to a physical switch port.",
      whyWrong: [
        { option: "DHCP Snooping", reason: "A defense filtering invalid DHCP messages to block malicious or rogue DHCP server allocations." },
        { option: "VLAN Pooling", reason: "Distributes IP assignments across multiple subnets to manage broadcast domain scope." },
        { option: "IP Source Guard", reason: "Dynamically correlates IP/MAC/Port parameters to block spoofed host traffic." }
      ]
    },
    weight: 10
  },
  {
    id: "ts1",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.1 Troubleshooting Methodology",
    question: "Users report they cannot access a shared drive. You have questioned the users and identified that only one floor is affected. You have just established a theory of probable cause. What is the NEXT step you should take?",
    options: [
      "Test the theory",
      "Establish a plan of action",
      "Verify full system functionality",
      "Document findings"
    ],
    correctAnswer: "Test the theory",
    explanation: {
      whyCorrect: "After establishing a theory of probable cause, the next step in the CompTIA methodology is to test the theory to confirm the cause.",
      whyWrong: [
        { option: "Establish a plan of action", reason: "The step to formulate a remediation blueprint and identify potential side-effects, executed after testing the theory." },
        { option: "Verify full system functionality", reason: "The step implementing testing and preventive measures to confirm resolution before final closure." },
        { option: "Document findings", reason: "The absolute final step recording findings, actions, and outcomes." }
      ]
    },
    weight: 10
  },
  {
    id: "ts2",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.1 Troubleshooting Methodology",
    question: "You have implemented a missing routing entry on a core router and verified that users can now reach the internet. What is the FINAL step in the troubleshooting methodology?",
    options: [
      "Document findings",
      "Perform a root cause analysis",
      "Verify functionality",
      "Create a new baseline"
    ],
    correctAnswer: "Document findings",
    explanation: {
      whyCorrect: "The final step is to document findings, actions, and outcomes to provide a reference for future issues.",
      whyWrong: [
        { option: "Perform a root cause analysis", reason: "An incident management response, but not the final step of the CompTIA troubleshooting model." },
        { option: "Verify functionality", reason: "Confirming resolution across the affected system." },
        { option: "Create a new baseline", reason: "An operational milestone, not part of standard troubleshoot closure cycles." }
      ]
    },
    weight: 10
  },
  {
    id: "ts3",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.1 Troubleshooting Methodology",
    question: "A network technician is called to fixed a connectivity issue. After identifying the problem and establishing a theory of probable cause, the technician tests the theory and confirms it is correct. Which of the following is the BEST next step?",
    options: [
      "Establish a plan of action to resolve the problem",
      "Implement the solution immediately",
      "Verify full system functionality",
      "Document the verified theory"
    ],
    correctAnswer: "Establish a plan of action to resolve the problem",
    explanation: {
      whyCorrect: "Once a theory is tested and confirmed, the next step is to establish a plan of action to resolve the problem and identify potential effects.",
      whyWrong: [
        { option: "Implement the solution immediately", reason: "Taking action without planning or verifying might cause critical service interruptions." },
        { option: "Verify full system functionality", reason: "The step implementing testing and preventive measures to confirm resolution before final closure." },
        { option: "Document the verified theory", reason: "You proceed to form a plan of action rather than separately documenting at this stage." }
      ]
    },
    weight: 10
  },
  {
    id: "ts4",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.1 Troubleshooting Methodology",
    question: "Numerous users in a branch office report they cannot access any external websites. You observe that all local resources are reachable. Which of the following should you perform FIRST?",
    options: [
      "Question the users to identify any changes",
      "Examine the core router interface logs",
      "Restart the edge gateway",
      "Replace the upstream fiber patch cable"
    ],
    correctAnswer: "Question the users to identify any changes",
    explanation: {
      whyCorrect: "The very first step in the troubleshooting methodology is to identify the problem, which starts with questioning the users and identifying symptoms/changes.",
      whyWrong: [
        { option: "Examine the core router interface logs", reason: "An advanced troubleshooting technique to perform diagnostic lookups, not the initial user inquiry stage." },
        { option: "Restart the edge gateway", reason: "A intrusive action to perform before gathering basic symptoms or questioning users." },
        { option: "Replace the upstream fiber patch cable", reason: "An expensive, physical intervention to attempt without diagnostic proof." }
      ]
    },
    weight: 10
  },
  {
    id: "ts5",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.1 Troubleshooting Methodology",
    question: "A technician has replaced a faulty SFP+ module on a switch and confirmed that the link light is active. What is the MOST important next step according to the CompTIA troubleshooting model?",
    options: [
      "Verify full system functionality",
      "Implement preventive measures",
      "Document the change",
      "Establish a new theory"
    ],
    correctAnswer: "Verify full system functionality",
    explanation: {
      whyCorrect: "After implementing a solution, you must verify full system functionality and, if applicable, implement preventive measures.",
      whyWrong: [
        { option: "Implement preventive measures", reason: "This is part of the verification step, but not the first corrective action." },
        { option: "Document the change", reason: "The final troubleshooting step, done after verification has completed successfully." },
        { option: "Establish a new theory", reason: "Only necessary if the initial tested theory fails to resolve the problem." }
      ]
    },
    weight: 10
  },
  {
    id: "cli1",
    type: "cli",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Software Tools",
    question: "Which command would you use to view the mapping between Layer 2 MAC addresses and Layer 3 IP addresses on a local Windows machine?",
    options: [
      "arp -a",
      "nslookup",
      "netstat -r",
      "ipconfig /all"
    ],
    correctAnswer: "arp -a",
    explanation: {
      whyCorrect: "The arp command displays the Address Resolution Protocol (ARP) table, which maps IP addresses to MAC addresses.",
      whyWrong: [
        { option: "nslookup", reason: "Queries DNS servers to retrieve resource records and name patterns." },
        { option: "netstat -r", reason: "Displays the routing table of the local workstation." },
        { option: "ipconfig /all", reason: "Prints full TCP/IP configurations including DHCP servers and MAC endpoints." }
      ]
    },
    weight: 10
  },
  {
    id: "cli2",
    type: "cli",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Software Tools",
    question: "Traffic is heavily congested on a specific VLAN. A technician wants to see the source and destination of all packets leaving a specific interface. Which tool is BEST suited for this task?",
    options: [
      "tcpdump",
      "traceroute",
      "ping",
      "dig"
    ],
    correctAnswer: "tcpdump",
    explanation: {
      whyCorrect: "tcpdump is a packet analyzer that allows for real-time capture and inspection of network traffic.",
      whyWrong: [
        { option: "traceroute", reason: "Identifies the path, gateway nodes, and hop latency to a destination." },
        { option: "ping", reason: "Uses ICMP echo requests to verify network-level connectivity." },
        { option: "dig", reason: "Queries domain name targets on Linux systems, not the preferred Windows CLI utility." }
      ]
    },
    weight: 10
  },
  {
    id: "cli3",
    type: "cli",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Software Tools",
    question: "A user cannot reach a website by its name but can ping its IP address. Which command-line tool would be BEST to diagnose the issue?",
    options: [
      "nslookup",
      "netstat",
      "nbtstat",
      "route"
    ],
    correctAnswer: "nslookup",
    explanation: {
      whyCorrect: "nslookup is used to query DNS, which is responsible for resolving names to IP addresses.",
      whyWrong: [
        { option: "netstat", reason: "Displays active socket ports and connections, but not for DNS query purposes." },
        { option: "nbtstat", reason: "Displays NetBIOS over TCP/IP statistics." },
        { option: "route", reason: "Used to modify and view local routing entries." }
      ]
    },
    weight: 10
  },
  {
    id: "multi2",
    type: "multi-select",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Software Tools",
    question: "A network engineer needs to verify the path that packets take to a remote server and check for open ports on that server. Which of the following tools should be used? (Select TWO).",
    options: [
      "tracert",
      "nmap",
      "nslookup",
      "ipconfig",
      "arp",
      "netstat"
    ],
    correctAnswer: ["tracert","nmap"],
    explanation: {
      whyCorrect: "tracert (or traceroute) shows the path, and nmap is a powerful port scanner.",
      whyWrong: [
        { option: "nslookup", reason: "Queries DNS servers to retrieve resource records and name patterns." },
        { option: "ipconfig", reason: "Shows IP settings but cannot scan ports or map packet steps." },
        { option: "arp", reason: "The physical layer mapping utility, unrelated to remote scanning of paths." },
        { option: "netstat", reason: "Displays active socket ports and connections, but not for DNS query purposes." }
      ]
    },
    weight: 10
  },
  {
    id: "vis1",
    type: "visual",
    domain: "1.0 Concepts",
    objective: "1.5 Physical Media",
    question: "A network technician is repairing a high-density fiber patch panel. Which connector type is shown in the image, characterized by its \"Local Connector\" small form factor and push-pull latching mechanism?",
    options: [
      "LC",
      "SC",
      "ST",
      "MTRJ"
    ],
    correctAnswer: "LC",
    explanation: {
      whyCorrect: "The LC (Local Connector) is a small form factor connector that uses a 1.25mm ferrule and a tab-style locking mechanism, common in SFP modules.",
      whyWrong: [
        { option: "SC", reason: "Subscriber Connector or Standard Connector, a square shaped plug-in connector with moderate size." },
        { option: "ST", reason: "Straight Tip connector, a legacy connector with bayonet-style twist lockings." },
        { option: "MTRJ", reason: "A small form-factor fiber optic connector containing two fibers within one single plug." }
      ]
    },
    weight: 10,
    imageUrl: "/images/lc_connector.png"
  },
  {
    id: "vis2",
    type: "visual",
    domain: "1.0 Concepts",
    objective: "1.6 Topology",
    question: "Observe the data center layout in the image. Which topology is depicted, utilizing a non-blocking architecture that allows any leaf switch to talk to any other leaf switch via a single hop through the spine?",
    options: [
      "Spine-and-Leaf",
      "Three-tier Hierarchical",
      "Mesh",
      "Ring"
    ],
    correctAnswer: "Spine-and-Leaf",
    explanation: {
      whyCorrect: "Spine-and-Leaf is a two-tier architecture where every leaf switch connects to every spine switch, providing high bandwidth and low latency.",
      whyWrong: [
        { option: "Three-tier Hierarchical", reason: "Structural core, distribution, and access layered mesh design." },
        { option: "Mesh", reason: "An expensive topology routing paths directly between every system on the fabric." },
        { option: "Ring", reason: "Legacy token routing topology, forwarding data clockwise on sequential interfaces." }
      ]
    },
    weight: 10,
    imageUrl: "/images/spine_leaf_topology.png"
  },
  {
    id: "vis3",
    type: "visual",
    domain: "1.0 Concepts",
    objective: "1.5 Physical Media",
    question: "A technician is interconnecting two switches in the same rack. Which specialized cable is shown, combining a Twinaxial copper cable with integrated SFP+ transceivers?",
    options: [
      "Twinaxial DAC",
      "AOC (Active Optical)",
      "Cat8 Ethernet",
      "Single-Mode Fiber"
    ],
    correctAnswer: "Twinaxial DAC",
    explanation: {
      whyCorrect: "Direct Attach Copper (DAC) cables are Twinaxial cables with factory-attached SFP+ connectors, used for short-range Top-of-Rack connections.",
      whyWrong: [
        { option: "AOC (Active Optical)", reason: "Active Optical Cable, incorporating active optical transceivers on fiber, typically for longer direct-attaches." },
        { option: "Cat8 Ethernet", reason: "Copper cabling standard representing high frequencies, not an integrated fiber opto-electronic cable assembly." },
        { option: "Single-Mode Fiber", reason: "A raw physical cabling standard, not an integrated direct-attach cable." }
      ]
    },
    weight: 10,
    imageUrl: "/images/twinax_dac_cable.png"
  },
  {
    id: "vis4",
    type: "visual",
    domain: "1.0 Concepts",
    objective: "1.5 Physical Media",
    question: "Which legacy connector type is shown, ubiquitous in older 10Base2 Ethernet networks and still used for modern CCTV coaxial connections?",
    options: [
      "BNC",
      "F-Type",
      "RJ-45",
      "DB-9"
    ],
    correctAnswer: "BNC",
    explanation: {
      whyCorrect: "BNC (Bayonet Neill-Concelman) connectors are RF connectors used with coaxial cables, featuring a bayonet mount locking mechanism.",
      whyWrong: [
        { option: "F-Type", reason: "Threaded coaxial connector commonly used for cable internet and TV networks." },
        { option: "RJ-45", reason: "Standard 8-position, 8-contact connector used for twisted-pair Ethernet." },
        { option: "DB-9", reason: "A serial link console connector usually utilized for switch administration." }
      ]
    },
    weight: 10,
    imageUrl: "/images/bnc_connector.png"
  },
  {
    id: "vis5",
    type: "visual",
    domain: "1.0 Concepts",
    objective: "1.5 Physical Media",
    question: "Identify the fiber connector shown, often called the \"Subscriber Connector\" or \"Standard Connector,\" known for its square shape and push-pull mechanism?",
    options: [
      "SC",
      "LC",
      "ST",
      "FC"
    ],
    correctAnswer: "SC",
    explanation: {
      whyCorrect: "The SC (Subscriber Connector) uses a 2.5mm ferrule and has a push-pull latching mechanism. It is larger than the LC connector.",
      whyWrong: [
        { option: "LC", reason: "Local Connector, a small form-factor push-pull connector used extensively with SFP modules." },
        { option: "ST", reason: "Straight Tip connector, a legacy connector with bayonet-style twist lockings." },
        { option: "FC", reason: "Ferrule Connector, characterized by a heavy metallic build and threaded screw mounting." }
      ]
    },
    weight: 10,
    imageUrl: "/images/sc_connector.png"
  },
  {
    id: "deep1",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.2 Storage",
    question: "A financial firm requires a storage solution that allows servers to access raw block-level storage over a dedicated high-speed network. Which technology should be implemented?",
    options: [
      "SAN (Storage Area Network)",
      "NAS (Network Attached Storage)",
      "Cloud Storage",
      "DFS"
    ],
    correctAnswer: "SAN (Storage Area Network)",
    explanation: {
      whyCorrect: "SAN provides block-level access to storage, appearing as local disks to the server, typically using Fibre Channel or iSCSI.",
      whyWrong: [
        { option: "NAS (Network Attached Storage)", reason: "A file-level storage device attached directly to the local area network, sharing files via SMB or NFS." },
        { option: "Cloud Storage", reason: "Object storage hosted remotely by cloud providers, not dedicated LAN/SAN cluster storage." },
        { option: "DFS", reason: "Distributed File System, a software solution that groups files across multiple physical servers." }
      ]
    },
    weight: 10
  },
  {
    id: "deep2",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.2 Storage",
    question: "An office needs a centralized file server that connects to the existing Ethernet network and provides file-level access via SMB/NFS. Which device is BEST?",
    options: [
      "NAS",
      "SAN",
      "vSAN",
      "Tape Drive"
    ],
    correctAnswer: "NAS",
    explanation: {
      whyCorrect: "NAS (Network Attached Storage) provides file-level storage services to other devices on the network, typically over standard Ethernet.",
      whyWrong: [
        { option: "SAN", reason: "Storage Area Network, dedicated block storage access over Fibre Channel or iSCSI fabrics." },
        { option: "vSAN", reason: "Virtual SAN, software-defined solutions aggregating local host disks into virtual shared volumes." },
        { option: "Tape Drive", reason: "Offline sequential magnetic storage mainly for historical file data backups." }
      ]
    },
    weight: 10
  },
  {
    id: "deep3",
    type: "multi-select",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A systems administrator is hardening a directory services environment. Which ports should be allowed to support encrypted directory lookups and VoIP session initiation? (Select TWO).",
    options: [
      "636",
      "5061",
      "389",
      "5060",
      "1433",
      "1521"
    ],
    correctAnswer: ["636","5061"],
    explanation: {
      whyCorrect: "Port 636 is LDAPS (LDAP over SSL/TLS). Port 5061 is SIP over TLS (secure).",
      whyWrong: [
        { option: "389", reason: "LDAP (Lightweight Directory Access Protocol), which queries directory services in plaintext." },
        { option: "5060", reason: "SIP (Session Initiation Protocol), which is an unencrypted signaling protocol for VoIP sessions." },
        { option: "1433", reason: "Microsoft SQL Server port, dedicated to backend database traffic." },
        { option: "1521", reason: "Oracle Database listener port, not used for VoIP or directory services." }
      ]
    },
    weight: 10
  },
  {
    id: "deep4",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.4 DNS Records",
    question: "You are adding an IPv6 record for a new web server in the corporate DNS zone. Which record type should you create?",
    options: [
      "AAAA",
      "A",
      "CNAME",
      "PTR",
      "MX",
      "NS"
    ],
    correctAnswer: "AAAA",
    explanation: {
      whyCorrect: "AAAA records map a hostname to an IPv6 address. (A records map to IPv4).",
      whyWrong: [
        { option: "A", reason: "An IPv4 DNS host record mapping a domain name to a 32-bit IPv4 address." },
        { option: "CNAME", reason: "Canonical Name, acting as an alias pointer back to an existing standard A record." },
        { option: "PTR", reason: "Pointer record used for reverse DNS resolutions matching IPs to domains." },
        { option: "MX", reason: "Mail Exchanger record directing emails to designated servers." },
        { option: "NS", reason: "Name Server record specifying authentic servers for the DNS zone." }
      ]
    },
    weight: 10
  },
  {
    id: "deep5",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.4 DNS Records",
    question: "A technician needs to create a DNS alias so that \"shop.example.com\" points to \"server1.example.com\". Which record type is required?",
    options: [
      "CNAME",
      "A",
      "MX",
      "TXT"
    ],
    correctAnswer: "CNAME",
    explanation: {
      whyCorrect: "CNAME (Canonical Name) records are used to create aliases for existing A records.",
      whyWrong: [
        { option: "A", reason: "An IPv4 DNS host record mapping a domain name to a 32-bit IPv4 address." },
        { option: "MX", reason: "Mail Exchanger record directing emails to designated servers." },
        { option: "TXT", reason: "Text metadata record used for SPF, DKIM, and site ownership verifications." }
      ]
    },
    weight: 10
  },
  {
    id: "deep6",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.4 DNS Records",
    question: "An administrator needs to perform a reverse lookup to find the hostname associated with a specific IP address. Which DNS record is queried?",
    options: [
      "PTR",
      "A",
      "NS",
      "SOA"
    ],
    correctAnswer: "PTR",
    explanation: {
      whyCorrect: "PTR (Pointer) records facilitate reverse DNS lookups, mapping an IP address to a hostname.",
      whyWrong: [
        { option: "A", reason: "An IPv4 DNS host record mapping a domain name to a 32-bit IPv4 address." },
        { option: "NS", reason: "Name Server record specifying authentic servers for the DNS zone." },
        { option: "SOA", reason: "Start of Authority containing core parameters of the DNS zone." }
      ]
    },
    weight: 10
  },
  {
    id: "deep7",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.3 Security Features",
    question: "An organization needs a solution that can automatically block malicious traffic in real-time as it traverses the network perimeter. Which device is MOST suitable?",
    options: [
      "IPS",
      "IDS",
      "Syslog Server",
      "Load Balancer"
    ],
    correctAnswer: "IPS",
    explanation: {
      whyCorrect: "An Intrusion Prevention System (IPS) is placed inline and can actively block or drop malicious traffic, whereas an IDS is out-of-band and only alerts.",
      whyWrong: [
        { option: "IDS", reason: "Intrusion Detection System, processing copies of stream packets out-of-band to alert without blocking inline traffic." },
        { option: "Syslog Server", reason: "A centralized repository consolidating device logs, rather than blocking active perimeter flows." },
        { option: "Load Balancer", reason: "Distributes incoming client requests across servers to achieve high availability." }
      ]
    },
    weight: 10
  },
  {
    id: "deep8",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.2 Common Issues",
    question: "A switch interface is reporting a high number of CRC errors. Which of the following is the MOST likely cause?",
    options: [
      "Faulty cable or interference",
      "Duplex mismatch",
      "VLAN tagging error",
      "Routing loop"
    ],
    correctAnswer: "Faulty cable or interference",
    explanation: {
      whyCorrect: "Cyclic Redundancy Check (CRC) errors indicate packets were corrupted in transit, usually due to bad cables, connectors, or EMI.",
      whyWrong: [
        { option: "Duplex mismatch", reason: "Happens when connection ends negotiate different duplex settings, causing collisions and partial frame drops." },
        { option: "VLAN tagging error", reason: "Typically stops communication altogether due to unmatched 802.1Q tags, rather than producing corrupt CRC counters." },
        { option: "Routing loop", reason: "Forces packet loops, depleting TTL metrics rather than corrupting physical layer frame checksums." }
      ]
    },
    weight: 10
  },
  {
    id: "deep9",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.2 Common Issues",
    question: "A user reports extremely slow network performance. The technician notices that the switch port is set to Full-Duplex while the workstation is set to Half-Duplex. What is this issue called?",
    options: [
      "Duplex Mismatch",
      "Speed Incompatibility",
      "Auto-negotiation loop",
      "Switching Loop"
    ],
    correctAnswer: "Duplex Mismatch",
    explanation: {
      whyCorrect: "A duplex mismatch occurs when two connected devices use different duplex settings, causing collisions and significant performance degradation.",
      whyWrong: [
        { option: "Speed Incompatibility", reason: "Causes links to fail to come up entirely rather than producing slow, collision-ridden frames." },
        { option: "Auto-negotiation loop", reason: "Spurs link status flaps and constant renegotiations." },
        { option: "Switching Loop", reason: "Leads to immediate broadcast storms and total service outage quickly." }
      ]
    },
    weight: 10
  },
  {
    id: "deep10",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.2 Common Issues",
    question: "A network monitor shows an interface is receiving \"giants.\" What does this typically mean?",
    options: [
      "Packets exceed the MTU size",
      "Packets are too small",
      "Packets have invalid headers",
      "The buffer is overflowing"
    ],
    correctAnswer: "Packets exceed the MTU size",
    explanation: {
      whyCorrect: "Giants are packets that exceed the maximum transmission unit (MTU) size (usually 1518 bytes for standard Ethernet).",
      whyWrong: [
        { option: "Packets are too small", reason: "Normally classed as Runts (smaller than 64 bytes)." },
        { option: "Packets have invalid headers", reason: "Classed as frame errors or checksum failures rather than oversize Giants." },
        { option: "The buffer is overflowing", reason: "Causes frame drops and buffer overruns, not giants." }
      ]
    },
    weight: 10
  },
  {
    id: "deep11",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.2 Common Issues",
    question: "An interface is reporting \"runts.\" Which of the following is the BEST definition of a runt?",
    options: [
      "Packets smaller than 64 bytes",
      "Packets larger than 1518 bytes",
      "Packets with incorrect checksums",
      "Packets that timed out"
    ],
    correctAnswer: "Packets smaller than 64 bytes",
    explanation: {
      whyCorrect: "Runts are packets that are smaller than the minimum Ethernet frame size of 64 bytes, often caused by collisions.",
      whyWrong: [
        { option: "Packets larger than 1518 bytes", reason: "Classed as Giants." },
        { option: "Packets with incorrect checksums", reason: "Counted as CRC errors." },
        { option: "Packets that timed out", reason: "Simply dropped, not categorized as physical runt frame arrivals." }
      ]
    },
    weight: 10
  },
  {
    id: "deep12",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.4 Protocols",
    question: "A technician is configuring a VoIP system. Which protocol is primarily responsible for establishing, maintaining, and terminating the call session?",
    options: [
      "SIP",
      "RTP",
      "RTCP",
      "H.323"
    ],
    correctAnswer: "SIP",
    explanation: {
      whyCorrect: "Session Initiation Protocol (SIP) handles the signaling for VoIP calls, while RTP carries the actual voice data.",
      whyWrong: [
        { option: "RTP", reason: "Real-time Transport Protocol, carrying the stream payloads of voice transmissions." },
        { option: "RTCP", reason: "RTP Control Protocol, monitoring session quality metrics and exchanging stream statistics." },
        { option: "H.323", reason: "An older ITU signaling protocol suite for multimedia, less common than SIP." }
      ]
    },
    weight: 10
  },
  {
    id: "deep13",
    type: "multi-select",
    domain: "3.0 Operations",
    objective: "3.4 DNS Servers",
    question: "Which of the following DNS server types is responsible for providing the final, definitive IP address mapping for a requested domain? (Select TWO).",
    options: [
      "Authoritative Name Server",
      "Primary DNS Server",
      "Recursive Resolver",
      "Caching Server",
      "Forwarder",
      "Stub Resolver"
    ],
    correctAnswer: ["Authoritative Name Server","Primary DNS Server"],
    explanation: {
      whyCorrect: "Authoritative servers (which can be primary or secondary) hold the actual DNS records for a domain.",
      whyWrong: [
        { option: "Recursive Resolver", reason: "Accepts client requests and queries external root and top-level domain servers." },
        { option: "Caching Server", reason: "Saves resolved DNS lookups locally to speed up subsequent queries, not owning the authoritative source." },
        { option: "Forwarder", reason: "Forwards local DNS requests to external resolvers." },
        { option: "Stub Resolver", reason: "A lightweight client-side resolver delegating the entire lookup traversal to recursive servers." }
      ]
    },
    weight: 10
  },
  {
    id: "deep14",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.3 Security Features",
    question: "A security auditor recommends moving the IDS to a \"passive\" or \"out-of-band\" configuration. How will the IDS receive traffic in this setup?",
    options: [
      "Port Mirroring/TAP",
      "Inline bridging",
      "Proxy Server",
      "SSL Decryption"
    ],
    correctAnswer: "Port Mirroring/TAP",
    explanation: {
      whyCorrect: "Passive IDS receives a copy of traffic via a SPAN port (Port Mirroring) or a network TAP, ensuring it does not impact network latency.",
      whyWrong: [
        { option: "Inline bridging", reason: "Configured directly inline, exposing traffic streams to transmission delay risks." },
        { option: "Proxy Server", reason: "An intermediate buffer handling higher-level client/server application queries." },
        { option: "SSL Decryption", reason: "Exposes encrypted session streams for deep threat evaluations." }
      ]
    },
    weight: 10
  },
  {
    id: "deep15",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.2 Storage",
    question: "Which storage protocol is designed specifically to run over high-speed Fibre Channel networks, providing low-latency, lossless block-level access?",
    options: [
      "FCP (Fibre Channel Protocol)",
      "iSCSI",
      "FCoE",
      "SMB"
    ],
    correctAnswer: "FCP (Fibre Channel Protocol)",
    explanation: {
      whyCorrect: "FCP is the standard protocol for transporting SCSI commands over Fibre Channel networks.",
      whyWrong: [
        { option: "iSCSI", reason: "Caps SCSI commands inside TCP/IP networks, exposing it to Ethernet overheads." },
        { option: "FCoE", reason: "Fibre Channel over Ethernet, wrapping Fibre Channel structures within standard Ethernet links." },
        { option: "SMB", reason: "Server Message Block, a high-level LAN file sharing protocol, not a lossless block storage interface." }
      ]
    },
    weight: 10
  },
  {
    id: "sub1",
    type: "subnet",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "You are provided with the network 192.168.10.0/24. You need to create 4 equal-sized subnets. What will be the new subnet mask for these networks?",
    options: [
      "/25",
      "/26",
      "/27",
      "/28"
    ],
    correctAnswer: "/26",
    explanation: {
      whyCorrect: "To create 4 subnets (2^2), you need to borrow 2 bits from the host portion. /24 + 2 = /26.",
      whyWrong: [
        { option: "/25", reason: "Provides 128 total IP addresses (126 usable hosts)." },
        { option: "/27", reason: "Provides 32 total IP addresses (30 usable hosts)." },
        { option: "/28", reason: "Provides 16 total IP addresses (14 usable hosts)." }
      ]
    },
    weight: 10
  },
  {
    id: "sub2",
    type: "subnet",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "Given the IP address 172.16.50.0/27, what is the maximum number of usable host addresses available in this subnet?",
    options: [
      "30",
      "32",
      "62",
      "14"
    ],
    correctAnswer: "30",
    explanation: {
      whyCorrect: "A /27 has 5 host bits remaining (32-27=5). 2^5 = 32 total addresses. Subtract 2 for network and broadcast: 32 - 2 = 30 usable hosts.",
      whyWrong: [
        { option: "32", reason: "The total number of IP addresses in a /27 subnet, not the usable host count." },
        { option: "62", reason: "The number of usable hosts in a /26 subnet." },
        { option: "14", reason: "The number of usable hosts in a /28 subnet." }
      ]
    },
    weight: 10
  },
  {
    id: "sub3",
    type: "subnet",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "What is the CIDR equivalent for the subnet mask 255.255.255.224?",
    options: [
      "/27",
      "/28",
      "/26",
      "/25"
    ],
    correctAnswer: "/27",
    explanation: {
      whyCorrect: "224 in binary is 11100000. This adds 3 bits to the default /24, making it 27 bits total.",
      whyWrong: [
        { option: "/28", reason: "Provides 16 total IP addresses (14 usable hosts)." },
        { option: "/26", reason: "Provides 64 total IP addresses (62 usable hosts)." },
        { option: "/25", reason: "Provides 128 total IP addresses (126 usable hosts)." }
      ]
    },
    weight: 10
  },
  {
    id: "sub4",
    type: "subnet",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "An organization needs a subnet for 500 users. Which of the following is the MOST efficient subnet mask for this requirement?",
    options: [
      "/23",
      "/22",
      "/24",
      "/21"
    ],
    correctAnswer: "/23",
    explanation: {
      whyCorrect: "A /23 provides 2^9 = 512 total addresses (510 usable), which is the smallest mask that accommodates 500 users.",
      whyWrong: [
        { option: "/22", reason: "Provides 1024 total IP addresses (1022 usable slots), resulting in waste." },
        { option: "/24", reason: "Provides 256 total IP addresses (254 usable hosts), which is insufficient for 500 hosts." },
        { option: "/21", reason: "Provides 2048 total IP addresses (2046 usable slots), which is unnecessarily large for this requirement." }
      ]
    },
    weight: 10
  },
  {
    id: "sub5",
    type: "subnet",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "Which of the following is the correct wildcard mask for a /28 subnet?",
    options: [
      "0.0.0.15",
      "0.0.0.31",
      "0.0.0.7",
      "0.0.0.63"
    ],
    correctAnswer: "0.0.0.15",
    explanation: {
      whyCorrect: "A /28 mask is 255.255.255.240. The wildcard mask is the inverse: 0.0.0.(255-240) = 0.0.0.15.",
      whyWrong: [
        { option: "0.0.0.31", reason: "The wildcard mask for a /27 subnet." },
        { option: "0.0.0.7", reason: "The wildcard mask for a /29 subnet." },
        { option: "0.0.0.63", reason: "The wildcard mask for a /26 subnet." }
      ]
    },
    weight: 10
  },
  {
    id: "iac1",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.1 IaC",
    question: "A DevOps engineer notices that several servers have slightly different configurations despite being deployed from the same initial script. This deviation from the intended state is known as:",
    options: [
      "Configuration Drift",
      "Dynamic Inventory",
      "Mutable Infrastructure",
      "Orchestration Lag"
    ],
    correctAnswer: "Configuration Drift",
    explanation: {
      whyCorrect: "Configuration drift occurs when undocumented changes are made to systems over time, causing them to deviate from their baseline configuration.",
      whyWrong: [
        { option: "Dynamic Inventory", reason: "A methodology in automation tracking active server hosts during runtime." },
        { option: "Mutable Infrastructure", reason: "An architectural model letting servers receive manual modifications after delivery." },
        { option: "Orchestration Lag", reason: "Delays in deploying containerized environments." }
      ]
    },
    weight: 10
  },
  {
    id: "ipv6_1",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "An organization is migrating to IPv6 but needs to allow its IPv6-only servers to communicate with legacy IPv4-only services on the internet. Which transition mechanism is BEST suited for this?",
    options: [
      "NAT64",
      "Dual Stack",
      "6to4 Tunneling",
      "ISATAP"
    ],
    correctAnswer: "NAT64",
    explanation: {
      whyCorrect: "NAT64 allows IPv6-only clients to communicate with IPv4-only servers by translating the headers at a gateway.",
      whyWrong: [
        { option: "Dual Stack", reason: "Requires systems to run both native IPv4 and IPv6 protocols simultaneously." },
        { option: "6to4 Tunneling", reason: "Encapsulates IPv6 packets inside IPv4 headers to bridge IPv6 islands across an IPv4 network." },
        { option: "ISATAP", reason: "Intra-Site Automatic Tunnel Addressing Protocol, bridging IPv6 hosts across internal IPv4 infrastructures." }
      ]
    },
    weight: 10
  },
  {
    id: "zta_1",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.1 Security Concepts",
    question: "In a Zero Trust Architecture, which principle ensures that users and applications are granted only the minimum level of access necessary to perform their functions?",
    options: [
      "Least Privilege",
      "Implicit Trust",
      "Defense in Depth",
      "Micro-segmentation"
    ],
    correctAnswer: "Least Privilege",
    explanation: {
      whyCorrect: "Least Privilege is the cornerstone of ZTA, ensuring that subjects only have access to resources required for their specific role.",
      whyWrong: [
        { option: "Implicit Trust", reason: "The outdated legacy assumption that internal network clients are trustworthy by default." },
        { option: "Defense in Depth", reason: "A layered, defense security matrix across multiple independent layers." },
        { option: "Micro-segmentation", reason: "Splits granular network assets into highly isolated security boundary zones." }
      ]
    },
    weight: 10
  },
  {
    id: "ha1",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.2 High Availability",
    question: "A network design requires two load balancers where both units simultaneously handle incoming traffic to maximize throughput. Which HA configuration is being used?",
    options: [
      "Active-Active",
      "Active-Passive",
      "N+1 Redundancy",
      "Hot Standby"
    ],
    correctAnswer: "Active-Active",
    explanation: {
      whyCorrect: "In an Active-Active configuration, all nodes simultaneously handle and share the traffic load. The key distinction is that Active-Active provides both load balancing and redundancy, whereas Active-Passive relies on a standby unit.",
      whyWrong: [
        { option: "Active-Passive", reason: "An active-standby firewall configuration template where only a single unit processes traffic." },
        { option: "N+1 Redundancy", reason: "Including a single active backup server ready to replace any broken system of the group." },
        { option: "Hot Standby", reason: "A backup appliance in constant readiness, waiting to assume duties immediately upon failure." }
      ]
    },
    weight: 10
  },
  {
    id: "ha2",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.2 High Availability",
    question: "A critical firewall cluster is configured so that one unit processes all traffic while the second unit monitors the first and only takes over if the primary unit fails. What is this configuration called?",
    options: [
      "Active-Passive",
      "Active-Active",
      "Load Balancing",
      "Round Robin"
    ],
    correctAnswer: "Active-Passive",
    explanation: {
      whyCorrect: "In an Active-Passive (Failover) configuration, one unit is active while the other remains in a standby/idle state. The standby unit only processes traffic if the active unit fails. It does NOT share the load.",
      whyWrong: [
        { option: "Active-Active", reason: "An HA load-balancing cluster template routing connection patterns across all redundant gateways." },
        { option: "Load Balancing", reason: "Connection allocation algorithms across server arrays, not standby hot cluster models." },
        { option: "Round Robin", reason: "A cyclic balance scheduling scheme, not passive firewall failover designs." }
      ]
    },
    weight: 10
  },
  {
    id: "cli_i1",
    type: "cli-interactive",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Software Tools",
    question: "A technician suspect a DNS issue. Type the full command to interactively query the default DNS server for information about \"google.com\".",
    options: [
    ],
    correctAnswer: "nslookup google.com",
    explanation: {
      whyCorrect: "The nslookup command is used to query DNS servers. Typing the domain name as an argument returns its A/AAAA records.",
      whyWrong: [
      ]
    },
    weight: 10
  },
  {
    id: "cli_i2",
    type: "cli-interactive",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Software Tools",
    question: "You need to identify all active TCP connections and the specific process ID (PID) associated with each. Type the Windows command to display this.",
    options: [
    ],
    correctAnswer: "netstat -ano",
    explanation: {
      whyCorrect: "In Windows, \"netstat -ano\" displays all active connections, numerical addresses, and the owning process ID.",
      whyWrong: [
      ]
    },
    weight: 10
  },
  {
    id: "cli_i3",
    type: "cli-interactive",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Software Tools",
    question: "A user is reporting slow connectivity to a server in a different city. Type the command to trace the path to \"10.0.50.1\" and show the latency at each hop (Windows syntax).",
    options: [
    ],
    correctAnswer: "tracert 10.0.50.1",
    explanation: {
      whyCorrect: "The tracert command in Windows sends ICMP Echo Requests with increasing TTL values to identify every router in the path.",
      whyWrong: [
      ]
    },
    weight: 10
  },
  {
    id: "cli_i4",
    type: "cli-interactive",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Software Tools",
    question: "Type the command to see the local machine's ARP cache to verify MAC-to-IP mappings.",
    options: [
    ],
    correctAnswer: "arp -a",
    explanation: {
      whyCorrect: "The \"arp -a\" command displays the Address Resolution Protocol (ARP) table.",
      whyWrong: [
      ]
    },
    weight: 10
  },
  {
    id: "zta_2",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.1 Security Concepts",
    question: "Which ZTA component is responsible for making the final decision to grant or deny access to a resource based on real-time policy evaluation?",
    options: [
      "Policy Decision Point (PDP)",
      "Policy Enforcement Point (PEP)",
      "Identity Provider (IdP)",
      "SIEM"
    ],
    correctAnswer: "Policy Decision Point (PDP)",
    explanation: {
      whyCorrect: "The PDP evaluates the access request against defined policies and context to determine if access should be permitted.",
      whyWrong: [
        { option: "Policy Enforcement Point (PEP)", reason: "The Zero Trust guard that actively implements PDP permit/deny orders." },
        { option: "Identity Provider (IdP)", reason: "System responsible for single sign-on or federation roles, not policy decision logic." },
        { option: "SIEM", reason: "Security Information and Event Management, consolidating security events but not making PDP policy authorizations." }
      ]
    },
    weight: 10
  },
  {
    id: "ipv6_2",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "A network administrator is configuring a router to encapsulate IPv6 packets inside IPv4 headers to allow them to cross an IPv4-only core network. This is known as:",
    options: [
      "Tunneling",
      "Dual Stack",
      "NAT-PT",
      "Static Mapping"
    ],
    correctAnswer: "Tunneling",
    explanation: {
      whyCorrect: "Tunneling encapsulates one protocol into another to cross incompatible network segments.",
      whyWrong: [
        { option: "Dual Stack", reason: "Requires systems to run both native IPv4 and IPv6 protocols simultaneously." },
        { option: "NAT-PT", reason: "An older network translation protocol that has been deprecated." },
        { option: "Static Mapping", reason: "A fixed administrative definition, not a packet encapsulation transition technique." }
      ]
    },
    weight: 10
  },
  {
    id: "log1",
    type: "syslog",
    domain: "5.0 Troubleshooting",
    objective: "5.2 Common Issues",
    question: "A network administrator is investigating a report that a critical server is intermittently losing connection to the network. Analyze the switch logs below and identify the line that explains why the server is disconnected.",
    options: [
    ],
    correctAnswer: "3",
    explanation: {
      whyCorrect: "The log reflects an \"err-disable\" status caused by a port security violation. This happens when the switch detects more MAC addresses than allowed on a single port.",
      whyWrong: [
      ]
    },
    weight: 10,
    logData: [
      "May 19 04:12:01.234: %LINK-3-UPDOWN: Interface GigabitEthernet0/1, changed state to up",
      "May 19 04:12:05.102: %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up",
      "May 19 04:15:33.882: %LINK-3-UPDOWN: Interface GigabitEthernet0/1, changed state to down",
      "May 19 04:15:38.221: %PM-4-ERR_DISABLE: psecure-violation error detected on Gi0/1, putting Gi0/1 in err-disable state",
      "May 19 04:15:38.225: %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to down"
    ],
    correctLogIndex: 3
  },
  {
    id: "log2",
    type: "syslog",
    domain: "4.0 Security",
    objective: "4.3 Security Features",
    question: "An external consultant is auditing the corporate firewall. Users are complaining they cannot access the new web portal on 10.50.2.100. Identify the ACL entry causing the traffic drop.",
    options: [
    ],
    correctAnswer: "2",
    explanation: {
      whyCorrect: "The explicit \"deny tcp any host 10.50.2.100 eq 443\" entry blocks all HTTPS traffic destined for that specific server.",
      whyWrong: [
      ]
    },
    weight: 10,
    logData: [
      "access-list 101 permit tcp 192.168.1.0 0.0.0.255 any eq 80",
      "access-list 101 permit tcp 192.168.1.0 0.0.0.255 any eq 443",
      "access-list 101 deny tcp any host 10.50.2.100 eq 443",
      "access-list 101 permit udp any any eq 53",
      "access-list 101 permit icmp any any"
    ],
    correctLogIndex: 2
  },
  {
    id: "log3",
    type: "syslog",
    domain: "5.0 Troubleshooting",
    objective: "5.3 Routing Issues",
    question: "A router is failing to reach a remote network (172.16.20.0/24). Examine the routing table and identify the entry that conflicts with the intended destination.",
    options: [
    ],
    correctAnswer: "3",
    explanation: {
      whyCorrect: "The entry \"172.16.20.0/24 [1/5] is directly connected, Null0\" is a static route redirecting all traffic for that subnet to the Null0 interface (the bit bucket), effectively dropping it.",
      whyWrong: [
      ]
    },
    weight: 10,
    logData: [
      "C    192.168.1.0/24 is directly connected, GigabitEthernet0/0",
      "L    192.168.1.1/32 is directly connected, GigabitEthernet0/0",
      "S    172.16.20.0/24 [1/0] via 10.0.0.5",
      "S    172.16.20.0/24 [1/5] is directly connected, Null0",
      "C    10.0.0.0/30 is directly connected, Serial0/0/0"
    ],
    correctLogIndex: 3
  },
  {
    id: "log4",
    type: "syslog",
    domain: "5.0 Troubleshooting",
    objective: "5.2 Wireless Issues",
    question: "A user is unable to connect to the \"Internal-Secure\" SSID. Review the RADIUS server logs and identify why the authentication is failing.",
    options: [
    ],
    correctAnswer: "3",
    explanation: {
      whyCorrect: "The log clearly states \"Shared secret mismatch\", which indicates the password/secret configured on the Wireless LAN Controller (WLC) does not match the secret on the RADIUS server.",
      whyWrong: [
      ]
    },
    weight: 10,
    logData: [
      "2026-05-19 14:02:01: Sending Access-Request to 10.1.1.5:1812",
      "2026-05-19 14:02:01: User \"jdoe\" authenticated via EAP-TLS",
      "2026-05-19 14:10:45: Sending Access-Request to 10.1.1.5:1812",
      "2026-05-19 14:10:46: Received Access-Reject for User \"admin_test\": Shared secret mismatch",
      "2026-05-19 14:12:30: Sending Access-Request to 10.1.1.5:1812",
      "2026-05-19 14:12:31: User \"guest\" authenticated via PEAP-MSCHAPv2"
    ],
    correctLogIndex: 3
  },
  {
    id: "log5",
    type: "syslog",
    domain: "5.0 Troubleshooting",
    objective: "5.2 Physical Issues",
    question: "A network technician is monitoring a core switch. SFP module performance is dropping. Identify the line indicating a hardware-level optical failure.",
    options: [
    ],
    correctAnswer: "5",
    explanation: {
      whyCorrect: "The optical receive power of -40.2 dBm is well below the low alarm threshold of -30.0 dBm, indicating a \"low light\" condition, likely due to a dirty connector or failing fiber.",
      whyWrong: [
      ]
    },
    weight: 10,
    logData: [
      "GigabitEthernet1/0/1 is up, line protocol is up (connected)",
      "Full-duplex, 1000Mb/s, link type is auto, media type is 1000BaseSX",
      "Input queue: 0/75/0/0 (size/max/drops/flushes); Total output drops: 0",
      "Received 124312384 bytes, 214151 unicasts, 0 runts, 0 giants, 0 throttles",
      "0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored",
      "Optical Receive Power: -40.2 dBm (Low Alarm Threshold: -30.0 dBm)",
      "Last clearing of \"show interface\" counters never"
    ],
    correctLogIndex: 5
  },
  {
    id: "scen7",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.1 OSI Layers",
    question: "A network administrator is troubleshooting an issue where a server is responding to ICMP echo requests (pings) but users cannot connect to a web application running on port 443. At which OSI layer is the problem MOST likely occurring?",
    options: [
      "Layer 3",
      "Layer 4",
      "Layer 2",
      "Layer 1"
    ],
    correctAnswer: "Layer 4",
    explanation: {
      whyCorrect: "Since ping (ICMP, Layer 3) works, the network path is functional. The failure to connect to port 443 (TCP, Layer 4) suggests an issue at the Transport layer, such as a blocked port or misconfigured service.",
      whyWrong: [
        { option: "Layer 3", reason: "The network layer, handling routing paths and logical IP assignments." },
        { option: "Layer 2", reason: "The data link layer, responsible for MAC framing and switch transport rules." },
        { option: "Layer 1", reason: "The physical layer, managing bitstream voltages and physical cable characteristics." }
      ]
    },
    weight: 10
  },
  {
    id: "scen8",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.2 Security Attacks",
    question: "An attacker is sending unsolicited ARP messages to a switch, mapping the IP address of the default gateway to the attacker's own MAC address. What type of attack is this?",
    options: [
      "ARP Poisoning",
      "DNS Spoofing",
      "DDoS",
      "On-path Attack"
    ],
    correctAnswer: "ARP Poisoning",
    explanation: {
      whyCorrect: "ARP Poisoning (or ARP Spoofing) involves sending fraudulent ARP messages to a local network to associate the attacker's MAC address with a legitimate IP address, allowing for traffic interception.",
      whyWrong: [
        { option: "DNS Spoofing", reason: "Poisoning name caches to forge resolution answers and redirect target traffic." },
        { option: "DDoS", reason: "Distributed Denial of Service, using botnets to overrun server limits." },
        { option: "On-path Attack", reason: "Interposing on communications between endpoints to intercept or modify sessions." }
      ]
    },
    weight: 10
  },
  {
    id: "ac3",
    type: "acronym",
    domain: "2.0 Implementation",
    objective: "2.3 Wireless Tech",
    question: "Acronym: A technician is installing a wireless bridge that operates in both the 2.4GHz and 5GHz bands. Which Wi-Fi standard specifically introduced MIMO to improve throughput?",
    options: [
      "802.11n",
      "802.11ac",
      "802.11g",
      "802.11a"
    ],
    correctAnswer: "802.11n",
    explanation: {
      whyCorrect: "802.11n (Wi-Fi 4) was the first standard to introduce MIMO (Multiple Input, Multiple Output). It also supported both the 2.4GHz and 5GHz bands.",
      whyWrong: [
        { option: "802.11ac", reason: "Wi-Fi 5, using MU-MIMO in the 5GHz spectrum, but lacking 6GHz capabilities." },
        { option: "802.11g", reason: "A legacy Wi-Fi standard providing up to 54 Mbps speeds on the crowded 2.4GHz frequency band." },
        { option: "802.11a", reason: "An early Wi-Fi standard operating solely in the 5GHz region at speeds up to 54 Mbps." }
      ]
    },
    weight: 10
  },
  {
    id: "ac4",
    type: "acronym",
    domain: "1.0 Concepts",
    objective: "1.3 IPv6 Addressing",
    question: "Acronym: Your organization needs to automatically assign IPv6 addresses to clients without using a stateful DHCPv6 server. Which mechanism allows for this?",
    options: [
      "SLAAC",
      "NAT64",
      "6to4",
      "Dual Stack"
    ],
    correctAnswer: "SLAAC",
    explanation: {
      whyCorrect: "SLAAC (Stateless Address Autoconfiguration) allows a device to configure its own IPv6 address based on the prefix advertised by the router (RA messages).",
      whyWrong: [
        { option: "NAT64", reason: "Translating header structures between IPv6 and IPv4 address families to let isolated IPv6 clients reach IPv4 servers." },
        { option: "6to4", reason: "An IPv6 transition technology encapsulating IPv6 signals inside IPv4 headers to traverse legacy networks." },
        { option: "Dual Stack", reason: "Requires systems to run both native IPv4 and IPv6 protocols simultaneously." }
      ]
    },
    weight: 10
  },
  {
    id: "scen9",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 Switching",
    question: "Several switches are connected in a loop to provide redundancy. Which protocol should be enabled to prevent broadcast storms while maintaining the redundant paths?",
    options: [
      "STP",
      "OSPF",
      "BGP",
      "LLDP"
    ],
    correctAnswer: "STP",
    explanation: {
      whyCorrect: "Spanning Tree Protocol (STP) detects redundant paths and logically disables ports to prevent loops, while allowing the paths to reactive if a link fails.",
      whyWrong: [
        { option: "OSPF", reason: "Open Shortest Path First, an Interior Gateway Protocol (IGP) utilizing link-state routing and areas inside an AS." },
        { option: "BGP", reason: "Border Gateway Protocol, the standard Exterior Gateway Protocol (EGP) routing traffic between different Autonomous Systems." },
        { option: "LLDP", reason: "Link Layer Discovery Protocol, used for vendor-neutral neighbor discoverability." }
      ]
    },
    weight: 10
  },
  {
    id: "scen10",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.3 Security Features",
    question: "A security engineer wants to ensure that only authenticated devices can access the local Ethernet network. Which standard should be implemented on the switch ports?",
    options: [
      "802.1X",
      "802.1Q",
      "802.3ad",
      "802.11ac"
    ],
    correctAnswer: "802.1X",
    explanation: {
      whyCorrect: "802.1X is the standard for port-based network access control (PNAC). It requires users or devices to authenticate before the switch port is opened.",
      whyWrong: [
        { option: "802.1Q", reason: "The industry framing standard for VLAN trunking and tagging on Ethernet interfaces." },
        { option: "802.3ad", reason: "The IEEE protocol standard for Link Aggregation and LACP configurations." },
        { option: "802.11ac", reason: "Wi-Fi 5, using MU-MIMO in the 5GHz spectrum, but lacking 6GHz capabilities." }
      ]
    },
    weight: 10
  },
  {
    id: "scen11",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.4 Protocols",
    question: "An administrator needs to securely manage a remote switch and requires an encrypted session. Which protocol should be used instead of Telnet?",
    options: [
      "SSH",
      "SNMPv2",
      "HTTP",
      "RDP"
    ],
    correctAnswer: "SSH",
    explanation: {
      whyCorrect: "SSH (Secure Shell) provides encrypted remote login sessions. Telnet sends all traffic (including passwords) in plaintext.",
      whyWrong: [
        { option: "SNMPv2", reason: "Older, insecure SNMP standard relying on plaintext community passwords." },
        { option: "HTTP", reason: "Insecure web protocol conveying inputs in plaintext, vulnerable to on-path attacks." },
        { option: "RDP", reason: "Remote Desktop Protocol, Microsoft's graphics based system terminal control." }
      ]
    },
    weight: 10
  },
  {
    id: "scen12",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.2 High Availability",
    question: "A data center design requires a protocol that allows a group of routers to share a single virtual IP address as a default gateway. If the master router fails, another router automatically takes over. Which protocol provides this?",
    options: [
      "VRRP",
      "LACP",
      "STP",
      "BGP"
    ],
    correctAnswer: "VRRP",
    explanation: {
      whyCorrect: "VRRP (Virtual Router Redundancy Protocol) creates a virtual router that serves as the default gateway, providing redundancy among a group of physical routers.",
      whyWrong: [
        { option: "LACP", reason: "Link Aggregation Control Protocol, governing dynamic link binding actions under standard ports." },
        { option: "STP", reason: "Spanning Tree Protocol, resolving active packet loops inside Layer 2 bridged channels." },
        { option: "BGP", reason: "Border Gateway Protocol, the standard Exterior Gateway Protocol (EGP) routing traffic between different Autonomous Systems." }
      ]
    },
    weight: 10
  },
  {
    id: "sub6",
    type: "subnet",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "Which of the following IPv6 addresses is a link-local address?",
    options: [
      "fe80::1",
      "2001:db8::1",
      "fc00::1",
      "::1"
    ],
    correctAnswer: "fe80::1",
    explanation: {
      whyCorrect: "IPv6 link-local addresses always start with the prefix fe80::/10. They are used for communication within a single network segment.",
      whyWrong: [
        { option: "2001:db8::1", reason: "An IPv6 global unicast test/example address prefix, not a link-local address." },
        { option: "fc00::1", reason: "An IPv6 Unique Local address, not a link-local address (uses fc00::/7)." },
        { option: "::1", reason: "The IPv6 host loopback address (equivalent to 127.0.0.1 in IPv4)." }
      ]
    },
    weight: 10
  },
  {
    id: "ac5",
    type: "acronym",
    domain: "1.0 Concepts",
    objective: "1.7 Cloud Concepts",
    question: "Acronym: Your company is using a cloud service where you are responsible for managing the OS, middleware, and applications, while the provider manages the physical servers and virtualization. Which service model is this?",
    options: [
      "IaaS",
      "PaaS",
      "SaaS",
      "NaaS"
    ],
    correctAnswer: "IaaS",
    explanation: {
      whyCorrect: "Infrastructure as a Service (IaaS) provides virtualized computing resources (servers, storage) over the internet. You manage the OS and everything above it.",
      whyWrong: [
        { option: "PaaS", reason: "Platform as a Service, equipping development with managed Operating System structures." },
        { option: "SaaS", reason: "Software as a Service, hosting web tools on remote provider networks." },
        { option: "NaaS", reason: "Network as a Service, outsourcing complete enterprise topology controls to providers." }
      ]
    },
    weight: 10
  },
  {
    id: "multi3",
    type: "multi-select",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A technician is setting up a new email server. Which of the following ports should be used for SECURE incoming and outgoing email? (Select TWO).",
    options: [
      "993",
      "465",
      "110",
      "25",
      "143",
      "587"
    ],
    correctAnswer: ["993","465"],
    explanation: {
      whyCorrect: "Port 993 is IMAPS (secure IMAP). Port 465 is SMTPS (secure SMTP over SSL/TLS).",
      whyWrong: [
        { option: "110", reason: "POP3 (Post Office Protocol v3), which retrieves email in an unencrypted manner." },
        { option: "25", reason: "SMTP (Simple Mail Transfer Protocol), which sends and forwards outgoing email in plaintext." },
        { option: "143", reason: "IMAP (Internet Message Access Protocol), which retrieves messages without encryption by default." },
        { option: "587", reason: "Standard SMTP outbound submission port using opportunistic STARTTLS to encrypt email routing." }
      ]
    },
    weight: 10
  },
  {
    id: "scen13",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.2 Security Attacks",
    question: "An organization is hit by an attack that uses a botnet to overwhelm its web servers with millions of illegitimate HTTP requests. What type of attack is this?",
    options: [
      "DDoS",
      "On-path",
      "Social Engineering",
      "Dictionary Attack"
    ],
    correctAnswer: "DDoS",
    explanation: {
      whyCorrect: "Distributed Denial of Service (DDoS) uses many compromised systems (a botnet) to flood a target with traffic, making it unavailable to legitimate users.",
      whyWrong: [
        { option: "On-path", reason: "Attack topology where malicious nodes intercept conversational streams between endpoints." },
        { option: "Social Engineering", reason: "Deceiving individuals into giving up keys or credentials." },
        { option: "Dictionary Attack", reason: "An automated credential crack script pushing structured wordlists." }
      ]
    },
    weight: 10
  },
  {
    id: "scen14",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 WAN Tech",
    question: "A company needs to connect two branch offices using a dedicated, high-latency satellite link. Which technology is MOST likely to be used to encapsulate multiple protocols over this link?",
    options: [
      "PPP",
      "ATM",
      "Frame Relay",
      "ISDN"
    ],
    correctAnswer: "PPP",
    explanation: {
      whyCorrect: "Point-to-Point Protocol (PPP) is a Layer 2 protocol used to establish a direct connection between two nodes, commonly used in WAN links for protocol encapsulation.",
      whyWrong: [
        { option: "ATM", reason: "Asynchronous Transfer Mode, legacy cellular switching WAN format operating with static 53-byte cells." },
        { option: "Frame Relay", reason: "A legacy WAN packet-switching technology utilizing variable frame sizes." },
        { option: "ISDN", reason: "Integrated Services Digital Network, an early digital dial-up circuit standard." }
      ]
    },
    weight: 10
  },
  {
    id: "ts6",
    type: "architect",
    domain: "5.4 Troubleshooting",
    objective: "5.2 Common Issues",
    question: "A technician is using a tone generator and probe to find a specific wire in a crowded server room. What is this tool combo often called?",
    options: [
      "Fox and Hound",
      "TDR",
      "OTDR",
      "Loopback Plug"
    ],
    correctAnswer: "Fox and Hound",
    explanation: {
      whyCorrect: "A tone generator and probe is colloquially known as a \"Fox and Hound\" tool, used for tracing cables.",
      whyWrong: [
        { option: "TDR", reason: "Time-Domain Reflectometer, charting copper wire breaks and attenuation faults." },
        { option: "OTDR", reason: "Optical Time-Domain Reflectometer, transmitting light pulses to chart fiber attenuation faults." },
        { option: "Loopback Plug", reason: "A hardware diagnostic connector routing transmitter circuits back to receiver gates." }
      ]
    },
    weight: 10
  },
  {
    id: "sub7",
    type: "subnet",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "An interface has an IP address of 10.0.0.1 and a subnet mask of 255.255.248.0. What is the broadcast address of this network?",
    options: [
      "10.0.7.255",
      "10.0.15.255",
      "10.0.0.255",
      "10.0.255.255"
    ],
    correctAnswer: "10.0.7.255",
    explanation: {
      whyCorrect: "248 in the 3rd octet means the increment is 8 (256-248). The network starts at 10.0.0.0 and ends at 10.0.7.255.",
      whyWrong: [
        { option: "10.0.15.255", reason: "The broadcast address for a 10.0.0.0/20 network." },
        { option: "10.0.0.255", reason: "The standard /24 broadcast address for a 10.0.0.0 network." },
        { option: "10.0.255.255", reason: "The /16 broadcast address for a 10.0.0.0 network." }
      ]
    },
    weight: 10
  },
  {
    id: "deep16",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.2 Infrastructure",
    question: "A company is implementing a software-defined storage solution that pools together local storage from multiple servers into a single shared storage resource. Which technology is this?",
    options: [
      "vSAN",
      "iSCSI SAN",
      "NFS",
      "Object Storage"
    ],
    correctAnswer: "vSAN",
    explanation: {
      whyCorrect: "vSAN (Virtual SAN) is a software-defined storage (SDS) solution that aggregates local disks across a cluster to create a shared data store.",
      whyWrong: [
        { option: "iSCSI SAN", reason: "Transporting SCSI disk block signals across standard copper Ethernet links." },
        { option: "NFS", reason: "Network File System, enabling Unix/Linux folder shares on local subnets." },
        { option: "Object Storage", reason: "Unstructured data repositories based on metadata identifiers instead of system block storage partitions." }
      ]
    },
    weight: 10
  },
  {
    id: "deep17",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.4 Physical Security",
    question: "An organization wants to implement a physical security control that prevents \"tailgating\" by allowing only one person to enter at a time through a secure vestibule. What is this called?",
    options: [
      "Mantrap",
      "Bollard",
      "Biometric Lock",
      "Motion Sensor"
    ],
    correctAnswer: "Mantrap",
    explanation: {
      whyCorrect: "A mantrap (or security vestibule) is a small room with two doors. One door must close and lock before the second door can be opened, effectively preventing tailgating.",
      whyWrong: [
        { option: "Bollard", reason: "A protective physical barrier preventing vehicle crashing attacks on structural perimeters." },
        { option: "Biometric Lock", reason: "A physical security sensor admitting access via physical body biometric records." },
        { option: "Motion Sensor", reason: "The detective sensor verifying visual shift actions without stopping tailgating." }
      ]
    },
    weight: 10
  },
  {
    id: "ac6",
    type: "acronym",
    domain: "3.0 Operations",
    objective: "3.2 High Availability",
    question: "Acronym: Your cloud provider guarantees that their service will be available 99.999% of the time in the contract. What is this document called?",
    options: [
      "SLA",
      "SOW",
      "MOU",
      "NDA"
    ],
    correctAnswer: "SLA",
    explanation: {
      whyCorrect: "A Service Level Agreement (SLA) is a contract between a service provider and a customer that defines the level of service, including uptime and performance metrics.",
      whyWrong: [
        { option: "SOW", reason: "Statement of Work, defining project-level assignments and schedules." },
        { option: "MOU", reason: "Memorandum of Understanding, a non-binding pact establishing intent." },
        { option: "NDA", reason: "Non-Disclosure Agreement, protecting sensitive corporate secrets." }
      ]
    },
    weight: 10
  },
  {
    id: "ac7",
    type: "acronym",
    domain: "2.0 Implementation",
    objective: "2.4 Wireless",
    question: "Acronym: A technician is using a standard that allows for multiple wireless access points to be managed by a single centralized device. Which protocol is often used for this management?",
    options: [
      "LWAPP",
      "SNMP",
      "LLDP",
      "ICMP"
    ],
    correctAnswer: "LWAPP",
    explanation: {
      whyCorrect: "Lightweight Access Point Protocol (LWAPP) or CAPWAP are used to manage lightweight APs from a centralized Wireless LAN Controller (WLC).",
      whyWrong: [
        { option: "SNMP", reason: "A management protocol used for monitoring bandwidth metrics and status registers." },
        { option: "LLDP", reason: "Link Layer Discovery Protocol, used for vendor-neutral neighbor discoverability." },
        { option: "ICMP", reason: "Internet Control Message Protocol, providing operational diagnostics like ping." }
      ]
    },
    weight: 10
  },
  {
    id: "sub8",
    type: "subnet",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "You have been assigned the IP block 192.168.50.0/24. You need to create subnets that can support at least 12 hosts each. What is the most efficient prefix length?",
    options: [
      "/28",
      "/27",
      "/29",
      "/26"
    ],
    correctAnswer: "/28",
    explanation: {
      whyCorrect: "A /28 provides 2^4 = 16 total addresses, which gives 14 usable hosts (16-2). This is the smallest subnet that fits 12 hosts.",
      whyWrong: [
        { option: "/27", reason: "Provides 32 total IP addresses (30 usable hosts)." },
        { option: "/29", reason: "Provides 8 total IP addresses (6 usable hosts)." },
        { option: "/26", reason: "Provides 64 total IP addresses (62 usable hosts)." }
      ]
    },
    weight: 10
  },
  {
    id: "scen15",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.2 Common Issues",
    question: "A network engineer is troubleshooting a fiber optic link that is down. The OTDR report shows a high reflection and loss at exactly 50 meters from the source. What does this MOST likely indicate?",
    options: [
      "Dirty or damaged connector",
      "Fiber attenuation",
      "Bending radius violation",
      "Crosstalk"
    ],
    correctAnswer: "Dirty or damaged connector",
    explanation: {
      whyCorrect: "A sharp spike in reflection and loss at a specific point usually indicates a physical interface issue, such as a dirty, scratched, or improperly seated connector.",
      whyWrong: [
        { option: "Fiber attenuation", reason: "The natural loss of light strength occurring uniformly over the length of the link." },
        { option: "Bending radius violation", reason: "Creates moderate micro-bending losses without severe single-point reflections." },
        { option: "Crosstalk", reason: "An electromagnetic interference phenomenon restricted to copper links." }
      ]
    },
    weight: 10
  },
  {
    id: "multi4",
    type: "multi-select",
    domain: "1.0 Concepts",
    objective: "1.1 OSI Model",
    question: "Which of the following protocols operate at the Application Layer (Layer 7) of the OSI model? (Select TWO).",
    options: [
      "DNS",
      "SMTP",
      "TCP",
      "IP",
      "Ethernet",
      "BGP"
    ],
    correctAnswer: ["DNS","SMTP"],
    explanation: {
      whyCorrect: "DNS and SMTP are Application Layer protocols.",
      whyWrong: [
        { option: "TCP", reason: "Transmission Control Protocol, facilitating robust, sequenced session deliveries over IP." },
        { option: "IP", reason: "Internet Protocol, the core Layer 3 protocol directing internet packets." },
        { option: "Ethernet", reason: "The primary standard for local network media and physical connections." },
        { option: "BGP", reason: "Border Gateway Protocol, the standard Exterior Gateway Protocol (EGP) routing traffic between different Autonomous Systems." }
      ]
    },
    weight: 10
  },
  {
    id: "scen16",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.2 Security Attacks",
    question: "An employee receives an email that appears to be from the CEO, asking for an urgent wire transfer to a new vendor. The email address is slightly misspelled. What type of attack is this?",
    options: [
      "Business Email Compromise (BEC)",
      "Vishing",
      "Whaling",
      "Pharming"
    ],
    correctAnswer: "Business Email Compromise (BEC)",
    explanation: {
      whyCorrect: "BEC is a specific type of spear phishing where an attacker impersonates a high-level executive to defraud a company.",
      whyWrong: [
        { option: "Vishing", reason: "A voice call based scam attempting to extract protected credentials." },
        { option: "Whaling", reason: "Phishing spam specifically targeting high-profile corporate leaders." },
        { option: "Pharming", reason: "A DNS poisoning technique tricking users into landing on imposter web portals." }
      ]
    },
    weight: 10
  },
  {
    id: "scen17",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.5 Physical Media",
    question: "A technician is installing a new fiber link and needs a connector that uses a thread-and-screw mechanism to stay securely attached in high-vibration environments. Which connector should they use?",
    options: [
      "FC",
      "LC",
      "ST",
      "SC"
    ],
    correctAnswer: "FC",
    explanation: {
      whyCorrect: "FC (Ferrule Connector) uses a threaded body to screw onto the interface, making it ideal for high-vibration environments.",
      whyWrong: [
        { option: "LC", reason: "Local Connector, a small form-factor push-pull connector used extensively with SFP modules." },
        { option: "ST", reason: "Straight Tip connector, a legacy connector with bayonet-style twist lockings." },
        { option: "SC", reason: "Subscriber Connector or Standard Connector, a square shaped plug-in connector with moderate size." }
      ]
    },
    weight: 10
  },
  {
    id: "scen18",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.4 Wireless",
    question: "Your organization is deploying a wireless network that must support the 6GHz band. Which Wi-Fi standard should be implemented?",
    options: [
      "Wi-Fi 6E",
      "Wi-Fi 6",
      "Wi-Fi 5",
      "Wi-Fi 4"
    ],
    correctAnswer: "Wi-Fi 6E",
    explanation: {
      whyCorrect: "Wi-Fi 6E (802.11ax) extended the standard into the 6GHz band, providing more spectrum and less interference.",
      whyWrong: [
        { option: "Wi-Fi 6", reason: "Operates exclusively on conventional 2.4GHz and 5GHz tracks." },
        { option: "Wi-Fi 5", reason: "Supports high performance 5GHz links but cannot touch 6GHz." },
        { option: "Wi-Fi 4", reason: "An older standard limited to 2.4GHz and 5GHz ranges." }
      ]
    },
    weight: 10
  },
  {
    id: "ac8",
    type: "acronym",
    domain: "4.0 Security",
    objective: "4.3 Security",
    question: "Acronym: Your firewall is configured to perform deep packet inspection to identify and block traffic based on specific application signatures. What is this type of device called?",
    options: [
      "NGFW",
      "UTM",
      "WAF",
      "DLP"
    ],
    correctAnswer: "NGFW",
    explanation: {
      whyCorrect: "A Next-Generation Firewall (NGFW) goes beyond traditional port/IP filtering by including application awareness and deep packet inspection (DPI).",
      whyWrong: [
        { option: "UTM", reason: "Unified Threat Management, combining general anti-malware, firewall, and content filtering onto one platform." },
        { option: "WAF", reason: "Web Application Firewall, shielding HTTPS input attacks targeted directly at web servers." },
        { option: "DLP", reason: "Data Loss Prevention, preventing unauthorized transfer of restricted corporate information." }
      ]
    },
    weight: 10
  },
  {
    id: "scen19",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.1 Procedures",
    question: "Before performing a major upgrade on the core router, a network engineer documents the current state including config, light levels, and routing tables. What is this documentation called?",
    options: [
      "Baseline",
      "As-built",
      "SOP",
      "SLA"
    ],
    correctAnswer: "Baseline",
    explanation: {
      whyCorrect: "A baseline documents the normal operating state of a system, which is critical to compare against if issues arise after a change.",
      whyWrong: [
        { option: "As-built", reason: "An installer drawing representing exactly how components got laid out." },
        { option: "SOP", reason: "Standard Operating Procedure, a step-by-step administrative instruction." },
        { option: "SLA", reason: "Service Level Agreement, defining binding uptime guarantees and service delivery constraints." }
      ]
    },
    weight: 10
  },
  {
    id: "sub9",
    type: "subnet",
    domain: "1.0 Concepts",
    objective: "1.3 IPv4",
    question: "What is the binary representation of the decimal value 192?",
    options: [
      "11000000",
      "10101000",
      "11110000",
      "10000000"
    ],
    correctAnswer: "11000000",
    explanation: {
      whyCorrect: "192 is 128 + 64, which in 8-bit binary is 11000000.",
      whyWrong: [
        { option: "10101000", reason: "The binary representation for decimal 168 (commonly utilized in class C private networks)." },
        { option: "11110000", reason: "The binary representation for decimal 240." },
        { option: "10000000", reason: "The binary representation for decimal 128." }
      ]
    },
    weight: 10
  },
  {
    id: "scen20",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.2 Issues",
    question: "A user reports that they have a \"Limited connectivity\" warning. Their IP address starts with 169.254.x.x. What does this indicate?",
    options: [
      "DHCP failure/APIPA",
      "Duplicate IP",
      "Bad Gateway",
      "Expired Lease"
    ],
    correctAnswer: "DHCP failure/APIPA",
    explanation: {
      whyCorrect: "169.254.0.0/16 is the APIPA range, which Windows assigns automatically when it cannot reach a DHCP server.",
      whyWrong: [
        { option: "Duplicate IP", reason: "Causes IP address conflict prompts, but doesn't automatically trigger APIPA address blocks." },
        { option: "Bad Gateway", reason: "An HTTP 502 error signifying proxy or connection server failure back upstream." },
        { option: "Expired Lease", reason: "Normally forces renewals; APIPA only triggers if renewal communication completely fails." }
      ]
    },
    weight: 10
  },
  {
    id: "multi5",
    type: "multi-select",
    domain: "1.0 Concepts",
    objective: "1.4 Protocols",
    question: "A technician is configuring a server and needs to ensure both time synchronization and name resolution are functional. Which ports should be allowed? (Select TWO).",
    options: [
      "123",
      "53",
      "161",
      "443",
      "22",
      "389"
    ],
    correctAnswer: ["123","53"],
    explanation: {
      whyCorrect: "Port 123 is NTP (time sync). Port 53 is DNS (name resolution).",
      whyWrong: [
        { option: "161", reason: "SNMP (Simple Network Management Protocol), used for monitoring and managing devices." },
        { option: "443", reason: "HTTPS, used for secure, encrypted web browser traffic." },
        { option: "22", reason: "SSH (Secure Shell) or SFTP, used for secure remote command line access and secure file transmission." },
        { option: "389", reason: "LDAP (Lightweight Directory Access Protocol), which queries directory services in plaintext." }
      ]
    },
    weight: 10
  },
  {
    id: "scen21",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 WAN",
    question: "An organization wants to connect all its branches in a flat Layer 2 network over a provider's MPLS core. Which technology provides this \"Pseudo-wire\" service?",
    options: [
      "VPLS",
      "MPLS L3 VPN",
      "DMVPN",
      "GRE"
    ],
    correctAnswer: "VPLS",
    explanation: {
      whyCorrect: "VPLS (Virtual Private LAN Service) allows multiple sites to share an Ethernet broadcast domain over an MPLS network.",
      whyWrong: [
        { option: "MPLS L3 VPN", reason: "Operates routing paths at the network layer (Layer 3), exposing customer subnets to provider routers." },
        { option: "DMVPN", reason: "Dynamic Multipoint Virtual Private Network, a Cisco-proprietary software tunnel solution." },
        { option: "GRE", reason: "Generic Routing Encapsulation, encapsulating a variety of network layer protocols over IP without native encryption." }
      ]
    },
    weight: 10
  },
  {
    id: "scen22",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.1 Concepts",
    question: "You are implementing a security strategy that uses firewalls, AV software, MFA, and physical locks together. What is this concept known as?",
    options: [
      "Defense in Depth",
      "Hardeninig",
      "Least Privilege",
      "Segmentation"
    ],
    correctAnswer: "Defense in Depth",
    explanation: {
      whyCorrect: "Defense in Depth (Layered Security) involves using multiple security controls at different levels to protect an asset.",
      whyWrong: [
        { option: "Hardeninig", reason: "A set of practices to reduce vulnerability surfaces but not layered security itself." },
        { option: "Least Privilege", reason: "Grants actors only the exact minimum scope of rights required to perform their specific actions." },
        { option: "Segmentation", reason: "Partitioning local areas into separate subnet regions." }
      ]
    },
    weight: 10
  },
  {
    id: "scen23",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.2 Infrastructure",
    question: "A cloud architect is designing a network to support heavy virtual machine migrations and server-to-server database replication within the same facility. Which of the following traffic flows and architectures is MOST appropriate?",
    options: [
      "East-West traffic using a Spine-and-Leaf topology",
      "North-South traffic using a Three-Tier Hierarchical model",
      "North-South traffic using a Hub-and-Spoke topology",
      "East-West traffic using a Ring topology"
    ],
    correctAnswer: "East-West traffic using a Spine-and-Leaf topology",
    explanation: {
      whyCorrect: "East-west traffic refers to data transfer within a data center (server-to-server). A Spine-and-Leaf topology provides the low-latency, high-bandwidth mesh required for this, especially for VM migrations (vMotion/Live Migration).",
      whyWrong: [
        { option: "North-South traffic using a Three-Tier Hierarchical model", reason: "North-south traffic refers to traffic entering/leaving the data center. Three-tier is older and less efficient for massive east-west flows." },
        { option: "North-South traffic using a Hub-and-Spoke topology", reason: "Hub-and-Spoke creates tight bottlenecks and is usually for WAN connections, not high-speed server migrations." },
        { option: "East-West traffic using a Ring topology", reason: "Ring topologies are legacy (Token Ring/FDDI) and are never used for high-performance data center fabric designs." }
      ]
    },
    weight: 10
  },
  {
    id: "scen24",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.3 Security Features",
    question: "A security engineer is upgrading the corporate WLAN to mitigate offline dictionary attacks against wireless handshakes. The new implementation must drop the use of Pre-Shared Keys (PSK). Which of the following should be implemented?",
    options: [
      "WPA3 using SAE (Simultaneous Authentication of Equals)",
      "WPA3 using AES-CCMP",
      "WPA2 Enterprise with TKIP",
      "WPA3 using OWE (Opportunistic Wireless Encryption)"
    ],
    correctAnswer: "WPA3 using SAE (Simultaneous Authentication of Equals)",
    explanation: {
      whyCorrect: "WPA3 replaces Pre-Shared Keys with SAE (Simultaneous Authentication of Equals). SAE provides Forward Secrecy and makes offline dictionary attacks much harder by requiring an interactive exchange for each authentication attempt.",
      whyWrong: [
        { option: "WPA3 using AES-CCMP", reason: "AES-CCMP is the encryption algorithm. While WPA3 uses it, SAE is the specific mechanism that solves the handshake/dictionary attack problem." },
        { option: "WPA2 Enterprise with TKIP", reason: "WPA2 Enterprise uses 802.1X/RADIUS, not PSK, but TKIP is legacy/insecure and WPA2 is still vulnerable to some handshake captures." },
        { option: "WPA3 using OWE", reason: "OWE (Opportunistic Wireless Encryption) provides encryption for open guest networks, but it doesn't use passwords at all." }
      ]
    },
    weight: 10
  },
  {
    id: "sub10",
    type: "subnet",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "A technician connects Workstation A (IP: 10.0.0.14/28) and Workstation B (IP: 10.0.0.22/28) to the same unmanaged Layer 2 switch. The workstations cannot ping each other. What is the MOST likely cause?",
    options: [
      "The workstations are in different subnets and require a Layer 3 device to route traffic",
      "The switch requires 802.1Q VLAN tagging to be configured",
      "The workstations are both in the same collision domain",
      "A crossover cable is required between the workstations"
    ],
    correctAnswer: "The workstations are in different subnets and require a Layer 3 device to route traffic",
    explanation: {
      whyCorrect: "A /28 subnet has a block size of 16. Subnet 1 covers 10.0.0.0 - 10.0.0.15 (hosts .1-.14). Subnet 2 covers 10.0.0.16 - 10.0.0.31 (hosts .17-.30). Because .14 and .22 are in logically separate subnets, they cannot communicate on Layer 2 without a Layer 3 gateway.",
      whyWrong: [
        { option: "The switch requires 802.1Q VLAN tagging to be configured", reason: "Unmanaged switches ignore VLAN tags; even on a managed switch, the primary issue is the IP subnet mismatch." },
        { option: "The workstations are both in the same collision domain", reason: "Switches create separate collision domains per port. Even if they were in the same domain, the IP routing would still fail." },
        { option: "A crossover cable is required between the workstations", reason: "Modern switches use Auto-MDIX to auto-detect cable types; the hardware layer is likely fine since link lights were verified." }
      ]
    },
    weight: 10
  },
  {
    id: "ha3",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.2 High Availability",
    question: "An enterprise network uses two core routers. Router A actively handles all traffic, while Router B sits idle, monitoring Router A via keepalives. If Router A fails, Router B takes over the virtual IP gateway. What specific architecture is this?",
    options: [
      "Active-Passive using FHRP (First Hop Redundancy Protocol)",
      "Active-Active using MLAG",
      "Active-Passive using LACP",
      "Active-Passive using STP"
    ],
    correctAnswer: "Active-Passive using FHRP (First Hop Redundancy Protocol)",
    explanation: {
      whyCorrect: "FHRPs like HSRP (Hot Standby Router Protocol) or VRRP allow multiple routers to present a single 'Virtual IP' to clients. In Active-Passive, only one router forwards data while the other waits for a heartbeat failure.",
      whyWrong: [
        { option: "Active-Active using MLAG", reason: "MLAG allows multiple physical links to be treated as one logical link between two switches, not specifically for gateway redundancy." },
        { option: "Active-Passive using LACP", reason: "LACP is for Link Aggregation (bonding) of multiple cables between two fixed points, not for router gateway failover." },
        { option: "Active-Passive using STP", reason: "Spanning Tree Protocol (STP) prevents loops at Layer 2; it doesn't manage Layer 3 gateway IP redundancy." }
      ]
    },
    weight: 10
  },
  {
    id: "scen25",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.5 Physical Media",
    question: "A technician is connecting two switches inside the same server rack that are 2 meters apart. To minimize latency and cost without using fiber optics, which of the following cabling types should be used?",
    options: [
      "DAC (Direct Attach Copper) Twinaxial cable",
      "Cat 6a UTP Patch cable",
      "Single-mode Fiber with LC connectors",
      "InfiniBand cable"
    ],
    correctAnswer: "DAC (Direct Attach Copper) Twinaxial cable",
    explanation: {
      whyCorrect: "Direct Attach Copper (DAC) cables are Twinaxial cables with factory-integrated SFP+ transceivers on both ends. They are the most cost-effective and lowest-latency choice for very short distances (under 7m).",
      whyWrong: [
        { option: "Cat 6a UTP Patch cable", reason: "While Cat6a supports 10Gbps, it requires Base-T transceivers which are more expensive and consume more power than DAC cables." },
        { option: "Single-mode Fiber with LC connectors", reason: "SMF is for long distances (kilometers). Using it for 2 meters is overkill and requires two separate, expensive SFP+ transceivers." },
        { option: "InfiniBand cable", reason: "InfiniBand is a separate high-performance computing architecture, not typically used for standard Ethernet switch-to-switch links." }
      ]
    },
    weight: 10
  },
  {
    id: "ts7",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.4 Troubleshooting Model",
    question: "A user reports they cannot access the local intranet server. The technician verifies the user's PC has a link light and an IP address of 192.168.1.105. What should the technician do NEXT?",
    options: [
      "Ping the local default gateway",
      "Ping the intranet server",
      "Run an ipconfig /release and renew",
      "Reboot the local switch"
    ],
    correctAnswer: "Ping the local default gateway",
    explanation: {
      whyCorrect: "The logical next step in connectivity troubleshooting is checking the Default Gateway. If you can ping the gateway but not the server, the problem is likely on the other side of the router.",
      whyWrong: [
        { option: "Ping the intranet server", reason: "Pinging the destination directly skips the hop-by-hop verification. If it fails, you won't know if the router or the server is the bottleneck." },
        { option: "Run an ipconfig /release and renew", reason: "The technician already verified the PC has a valid 192.168.1.x address, so DHCP is currently working correctly." },
        { option: "Reboot the local switch", reason: "Rebooting the switch affects all users; the link light indicates Layer 1 is fine, so checking routing is more targeted than rebooting hardware." }
      ]
    },
    weight: 10
  },
  {
    id: "port1",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A firewall needs to be configured with rules for active File Transfer Protocol (FTP) sessions. Which of the following port configurations is required?",
    options: [
      "TCP ports 20 and 21",
      "UDP ports 20 and 21",
      "TCP port 21 only",
      "TCP port 22"
    ],
    correctAnswer: "TCP ports 20 and 21",
    explanation: {
      whyCorrect: "Active FTP requires two separate connections: TCP port 21 for control/commands, and TCP port 20 for actual data transmission. Both must be open in the firewall for active FTP to function.",
      whyWrong: [
        { option: "UDP ports 20 and 21", reason: "FTP is a reliable file transfer protocol that relies entirely on connection-oriented TCP, not connectionless UDP." },
        { option: "TCP port 21 only", reason: "While TCP 21 handles commands, port 20 is still required for the active data stream dynamic connection." },
        { option: "TCP port 22", reason: "Port 22 is used by Secure Shell (SSH) and SFTP, not legacy FTP." }
      ]
    },
    weight: 10
  },
  {
    id: "port2",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "An administrator wants to transfer confidential client data securely over the Internet. Which protocol-to-port mapping should be permitted on the firewall to allow SSH File Transfer Protocol (SFTP) connections?",
    options: [
      "TCP port 22",
      "TCP port 21",
      "UDP port 69",
      "TCP port 990"
    ],
    correctAnswer: "TCP port 22",
    explanation: {
      whyCorrect: "SFTP (SSH File Transfer Protocol) runs entirely enclosed within an SSH session, which uses TCP port 22. It performs both authentication and encryption over this single channel.",
      whyWrong: [
        { option: "TCP port 21", reason: "This is the legacy, unencrypted FTP control port, exposing usernames, passwords, and data to eavesdroppers." },
        { option: "UDP port 69", reason: "This is TFTP (Trivial File Transfer Protocol), which is connectionless, unencrypted, and has no security mechanism." },
        { option: "TCP port 990", reason: "This is FTPS implicit mode, which uses SSL/TLS rather than SFTPs SSH-based tunnel." }
      ]
    },
    weight: 10
  },
  {
    id: "port3",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "You need to securely connect to a remote Linux instance via a command line interface to apply system updates. Which protocol-port pair is required?",
    options: [
      "SSH on TCP port 22",
      "Telnet on TCP port 23",
      "RDP on TCP port 3389",
      "HTTP on TCP port 80"
    ],
    correctAnswer: "SSH on TCP port 22",
    explanation: {
      whyCorrect: "SSH (Secure Shell) provides encrypted remote command line access and operates on TCP port 22 as a secure replacement for Telnet.",
      whyWrong: [
        { option: "Telnet on TCP port 23", reason: "Telnet is unencrypted and transmits credentials and commands in plain text, making it highly insecure." },
        { option: "RDP on TCP port 3389", reason: "RDP provides remote desktop graphical UI access, primarily for Windows, rather than standard Linux command line." },
        { option: "HTTP on TCP port 80", reason: "HTTP is for unencrypted web page delivery, not command-line shell administration." }
      ]
    },
    weight: 10
  },
  {
    id: "port4",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A security audit flags active Telnet traffic on a critical internal administrative subnet. Which port is this traffic using, and what protocol should be recommended to secure it?",
    options: [
      "FTP on Port 21",
      "Telnet on Port 23; recommend SSH (Port 22)",
      "Telnet on Port 23; recommend SFTP (Port 22)",
      "Telnet on Port 23; recommend HTTPS (Port 443)"
    ],
    correctAnswer: "Telnet on Port 23; recommend SSH (Port 22)",
    explanation: {
      whyCorrect: "Telnet operates on TCP port 23. Because Telnet transfers all terminal logins and traffic in plaintext, the auditor recommends replacing it with the encrypted SSH protocol (TCP port 22).",
      whyWrong: [
        { option: "FTP on Port 21", reason: "FTP is on port 21 and is for file transfers, not remote command-line shell access." },
        { option: "Telnet on Port 23; recommend SFTP (Port 22)", reason: "While SFTP uses SSH port 22, its primary use case is secure file transfer, not standard remote shell access." },
        { option: "Telnet on Port 23; recommend HTTPS (Port 443)", reason: "HTTPS (443) is for secure web delivery, not shell administration." }
      ]
    },
    weight: 10
  },
  {
    id: "port5",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "Which port is natively used by mail transfer agents to route and deliver email messages between corporate mail servers?",
    options: [
      "TCP port 25",
      "TCP port 110",
      "TCP port 143",
      "TCP port 587"
    ],
    correctAnswer: "TCP port 25",
    explanation: {
      whyCorrect: "Simple Mail Transfer Protocol (SMTP) uses TCP port 25 for server-to-server mail relays and command communications across the Internet.",
      whyWrong: [
        { option: "TCP port 110", reason: "Port 110 is used by POP3, which is a legacy protocol for clients to retrieve email from a server, not for server-to-server relay." },
        { option: "TCP port 143", reason: "Port 143 is IMAP4, which is for client email retrieval and mailbox management." },
        { option: "TCP port 587", reason: "Port 587 is secure client-to-server submission, not the default standard port used for server-to-server mail transit." }
      ]
    },
    weight: 10
  },
  {
    id: "port6",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "When a host resolves a domain name like \"example.com\" to an IP address, which port and protocol are primarily used for fast, low-overhead lookup queries?",
    options: [
      "UDP port 53",
      "TCP port 53",
      "UDP port 67",
      "TCP port 80"
    ],
    correctAnswer: "UDP port 53",
    explanation: {
      whyCorrect: "DNS query lookups primarily use UDP port 53 because UDP is connectionless and fast, minimizing lookup overhead. (Note: Large DNS responses or zone transfers may fail over to TCP port 53).",
      whyWrong: [
        { option: "TCP port 53", reason: "While DNS does use TCP 53 for zone transfers or large payloads exceeding 512 bytes, the standard fast client lookups use UDP port 53." },
        { option: "UDP port 67", reason: "UDP 67 is used by DHCP servers, not DNS hosts." },
        { option: "TCP port 80", reason: "TCP 80 is used by HTTP web traffic." }
      ]
    },
    weight: 10
  },
  {
    id: "port7",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A host connects to a network and broadcasts requests for auto-configuration. Which ports must be open on local client firewall interfaces for DHCP to execute?",
    options: [
      "UDP 67 (server) & UDP 68 (client)",
      "TCP 67 (server) & TCP 68 (client)",
      "UDP 53 (server) & UDP 54 (client)",
      "UDP 69 (server) & UDP 70 (client)"
    ],
    correctAnswer: "UDP 67 (server) & UDP 68 (client)",
    explanation: {
      whyCorrect: "DHCP uses connectionless UDP. Servers listen on UDP port 67 to receive requests from clients, while clients listen on UDP port 68 to receive answers from servers.",
      whyWrong: [
        { option: "TCP 67 (server) & TCP 68 (client)", reason: "DHCP operates entirely over connectionless, fast UDP broadcast/unicast channels, not connection-oriented TCP." },
        { option: "UDP 53 (server) & UDP 54 (client)", reason: "UDP 53 is used by DNS queries; UDP 54 is not standard for these transactions." },
        { option: "UDP 69 (server) & UDP 70 (client)", reason: "UDP 69 is TFTP, while 70 is the legacy Gopher protocol." }
      ]
    },
    weight: 10
  },
  {
    id: "port8",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "An engineer needs to quickly push a small firmware update file to a bootloader chip on an embedded switch over a safe management network. Which simple, unauthenticated protocol on UDP port 69 is best suited?",
    options: [
      "TFTP",
      "SFTP",
      "FTP",
      "HTTPS"
    ],
    correctAnswer: "TFTP",
    explanation: {
      whyCorrect: "TFTP (Trivial File Transfer Protocol) uses UDP port 69. It has a very low operational footprint because it lacks encryption and client authentication, making it super fast for firmware boots.",
      whyWrong: [
        { option: "SFTP", reason: "Runs on TCP port 22, requiring complete SSH handshakes, key exchange, and authentication." },
        { option: "FTP", reason: "Runs on TCP ports 20/21 and requires stateful control connections." },
        { option: "HTTPS", reason: "Runs on TCP port 443 and requires large SSL certificates and a complex software stack." }
      ]
    },
    weight: 10
  },
  {
    id: "port9",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "You are setting up Port Forwarding or NAT rules. Web sessions bound for non-secure HTTP pages are traditionally addressed to which destination port?",
    options: [
      "Port 80",
      "Port 443",
      "Port 8080",
      "Port 88"
    ],
    correctAnswer: "Port 80",
    explanation: {
      whyCorrect: "The standard default port assigned by IANA for unencrypted Hypertext Transfer Protocol (HTTP) web traffic is TCP port 80.",
      whyWrong: [
        { option: "Port 443", reason: "This is reserved for HTTPS, which encrypts HTTP traffic via TLS." },
        { option: "Port 8080", reason: "This is commonly used for alternative, proxy, or test HTTP servers, but is not the standard official default." },
        { option: "Port 88", reason: "Port 88 is the Kerberos authentication protocol." }
      ]
    },
    weight: 10
  },
  {
    id: "port10",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "Domain controller synchronization fails across different sites, leading to Kerberos authentication timeout issues. Which protocol-port pair should you verify is open on the firewall to allow clock sync?",
    options: [
      "NTP on UDP port 123",
      "NTP on TCP port 123",
      "LDAP on TCP port 389",
      "SNMP on UDP port 161"
    ],
    correctAnswer: "NTP on UDP port 123",
    explanation: {
      whyCorrect: "Network Time Protocol (NTP) relies on UDP port 123 to coordinate and sync system times with high precision.",
      whyWrong: [
        { option: "NTP on TCP port 123", reason: "NTP is optimized using connectionless, low-delay UDP broadcasts and unicast updates on UDP port 123, not TCP." },
        { option: "LDAP on TCP port 389", reason: "LDAP is for directory services lookups and queries, not scheduling or timekeeping." },
        { option: "SNMP on UDP port 161", reason: "SNMP is for network device management and monitoring, not clock synchronization." }
      ]
    },
    weight: 10
  },
  {
    id: "port11",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A Network Management System (NMS) polls a core router for status statistics, and then the router sends spontaneous unsolicited trap alerts. Which ports are used?",
    options: [
      "UDP 161 for polling & UDP 162 for traps",
      "TCP 161 for polling & TCP 162 for traps",
      "UDP 162 for polling & UDP 161 for traps",
      "UDP 514 for everything"
    ],
    correctAnswer: "UDP 161 for polling & UDP 162 for traps",
    explanation: {
      whyCorrect: "Simple Network Management Protocol (SNMP) uses UDP port 161 for interactive requests and manager-to-agent polling. Agents push unrequested \"Trap\" notices to the manager on UDP port 162.",
      whyWrong: [
        { option: "TCP 161 for polling & TCP 162 for traps", reason: "SNMP natively uses connectionless UDP to keep monitoring traffic overhead minimal." },
        { option: "UDP 162 for polling & UDP 161 for traps", reason: "The port numbers are inverted; agents and servers listen on 161 for polling queries, and servers collect traps on 162." },
        { option: "UDP 514 for everything", reason: "UDP 514 is reserved for Syslog message delivery." }
      ]
    },
    weight: 10
  },
  {
    id: "port12",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "An application needs to perform plain-text authentication lookups by searching Active Directory directory hierarchies. Which port should it use?",
    options: [
      "TCP port 389",
      "TCP port 636",
      "TCP port 445",
      "TCP port 389 & UDP port 389"
    ],
    correctAnswer: "TCP port 389",
    explanation: {
      whyCorrect: "Lightweight Directory Access Protocol (LDAP) uses TCP port 389 for plain-text or StartTLS-secured directory inquiries.",
      whyWrong: [
        { option: "TCP port 636", reason: "This is LDAPS (LDAP over SSL/TLS) which enforces encryption immediately on connection establishment." },
        { option: "TCP port 445", reason: "This is SMB, used for file and print sharing, not directory services lookup." },
        { option: "TCP port 389 & UDP port 389", reason: "While UDP 389 is occasionally used for simple ping/lookup operations, the main directory queries and authentication use TCP port 389." }
      ]
    },
    weight: 10
  },
  {
    id: "port13",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A secure web server needs to have its certificate loaded and configured. Which port should the ingress firewall forward to this web server to allow secure SSL/TLS web client traffic?",
    options: [
      "TCP port 443",
      "TCP port 80",
      "TCP port 22",
      "TCP port 445"
    ],
    correctAnswer: "TCP port 443",
    explanation: {
      whyCorrect: "HTTPS (Hypertext Transfer Protocol Secure) encrypts communication over a TLS/SSL tunnel and standardizes on TCP port 443.",
      whyWrong: [
        { option: "TCP port 80", reason: "This is normal HTTP, which delivers webpages in plaintext without encryption." },
        { option: "TCP port 22", reason: "This is SSH/SFTP, not used for standard HTTPS web browsing." },
        { option: "TCP port 445", reason: "This is SMB, designed for file sharing in Windows-based networks." }
      ]
    },
    weight: 10
  },
  {
    id: "port14",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A storage administrator shares a network volume so users can mount it directly in Windows File Explorer. Which port must be reachable between clients and the storage array?",
    options: [
      "TCP port 445",
      "TCP port 1433",
      "TCP port 389",
      "TCP port 3389"
    ],
    correctAnswer: "TCP port 445",
    explanation: {
      whyCorrect: "Server Message Block (SMB) runs directly over TCP port 445. It is the primary file-sharing and network resource access protocol in Windows-dominated domains.",
      whyWrong: [
        { option: "TCP port 1433", reason: "This is the Microsoft SQL Server database server, not general network volume storage." },
        { option: "TCP port 389", reason: "This is LDAP, used to query index directory trees." },
        { option: "TCP port 3389", reason: "This is RDP (Remote Desktop Protocol), used for GUI remote machine management." }
      ]
    },
    weight: 10
  },
  {
    id: "port15",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "An engineer is forwarding system logs from fifty enterprise firewalls to a central SIEM server. Which port and protocol should be configured for standard syslog?",
    options: [
      "UDP port 514",
      "TCP port 514",
      "TCP port 587",
      "UDP port 162"
    ],
    correctAnswer: "UDP port 514",
    explanation: {
      whyCorrect: "The standard default port for sending Syslog telemetry and logs is UDP port 514 (though secure implementations often use TCP 6514).",
      whyWrong: [
        { option: "TCP port 514", reason: "While TCP syslog is supported on some newer platforms, the official default standard syslog relies on fast UDP port 514." },
        { option: "TCP port 587", reason: "This is secure SMTP client submissions for emails, not log delivery." },
        { option: "UDP port 162", reason: "This is SNMP Traps, which are distinct from standard Syslog messages." }
      ]
    },
    weight: 10
  },
  {
    id: "port16",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "An email client application needs to securely submit outbound emails to a corporate mail server. The mail server supports modern TLS encryption. Which port is recommended for this?",
    options: [
      "TCP port 587",
      "TCP port 25",
      "TCP port 465",
      "TCP port 110"
    ],
    correctAnswer: "TCP port 587",
    explanation: {
      whyCorrect: "TCP port 587 is the standardized port for secure email submission (SMTP Secure / SMTP submission) featuring mandatory or opportunistic upgrade to TLS (StartTLS).",
      whyWrong: [
        { option: "TCP port 25", reason: "Port 25 is used natively for server-to-server relaying, and ISPs often block outgoing client traffic on this port to prevent bots from sending spam." },
        { option: "TCP port 465", reason: "This is an older, deprecated port for SMTP over SSL, which has been replaced by StartTLS on port 587." },
        { option: "TCP port 110", reason: "This is POP3 and is only for retrieving mail, not sending/submitting it." }
      ]
    },
    weight: 10
  },
  {
    id: "port17",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "To comply with security mandates, an enterprise must immediately encrypt all Active Directory database queries. Which port should they open between client subnets and Domain Controllers?",
    options: [
      "TCP port 636",
      "TCP port 389",
      "TCP port 445",
      "TCP port 1433"
    ],
    correctAnswer: "TCP port 636",
    explanation: {
      whyCorrect: "LDAPS (LDAP over SSL/TLS) encrypts directory access queries immediately at connection and listens on TCP port 636.",
      whyWrong: [
        { option: "TCP port 389", reason: "This is plain LDAP, which defaults to transmitting passwords and user structures in cleartext." },
        { option: "TCP port 445", reason: "This is Windows Server Message Block (SMB) for file shares." },
        { option: "TCP port 1433", reason: "This is the Microsoft SQL Server connection port." }
      ]
    },
    weight: 10
  },
  {
    id: "port18",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A backup application fails to connect to its backend Microsoft SQL Server database. The local Windows firewall is blocking ingress. Which port must be allowed?",
    options: [
      "TCP port 1433",
      "TCP port 3306",
      "TCP port 1521",
      "TCP port 3389"
    ],
    correctAnswer: "TCP port 1433",
    explanation: {
      whyCorrect: "Microsoft SQL Server listens on TCP port 1433 by default as its standard database catalog interface.",
      whyWrong: [
        { option: "TCP port 3306", reason: "This is the default port for MySQL databases." },
        { option: "TCP port 1521", reason: "This is the default port for Oracle databases." },
        { option: "TCP port 3389", reason: "This is Remote Desktop Protocol (RDP)." }
      ]
    },
    weight: 10
  },
  {
    id: "port19",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A Windows utility needs to be accessed by internal technicians to run applications on a central jump box via a graphical desktop interface. Which port is required?",
    options: [
      "TCP port 3389",
      "TCP port 22",
      "TCP port 443",
      "TCP port 445"
    ],
    correctAnswer: "TCP port 3389",
    explanation: {
      whyCorrect: "Remote Desktop Protocol (RDP) provides GUI access for managing Microsoft Windows environments and operates on TCP port 3389.",
      whyWrong: [
        { option: "TCP port 22", reason: "This is SSH/SFTP, which offers console/CLI administration or secure file transfer, not full GUI remote desktop." },
        { option: "TCP port 443", reason: "This is HTTPS for secure web interactions." },
        { option: "TCP port 445", reason: "This is SMB for network files and printer mounts." }
      ]
    },
    weight: 10
  },
  {
    id: "port20",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A network engineer is configuring a voice gateway. Which two ports and transport methods should be allowed for Session Initiation Protocol (SIP) signaling?",
    options: [
      "TCP/UDP 5060 (plaintext) & TCP 5061 (TLS secure)",
      "TCP/UDP 5060 (plaintext) & UDP 162 (traps)",
      "TCP 5060 (TLS secure) & UDP 5061 (plaintext)",
      "UDP 1720 (H.323) & TCP 5060"
    ],
    correctAnswer: "TCP/UDP 5060 (plaintext) & TCP 5061 (TLS secure)",
    explanation: {
      whyCorrect: "SIP uses TCP or UDP port 5060 for cleartext signaling, and TCP port 5061 for encrypted signaling using Transport Layer Security (SIPS).",
      whyWrong: [
        { option: "TCP/UDP 5060 (plaintext) & UDP 162 (traps)", reason: "Port 162 is SNMP Traps, which is not involved in VoIP signaling pathways." },
        { option: "TCP 5060 (TLS secure) & UDP 5061 (plaintext)", reason: "The security mappings are reversed; 5060 is plain/clear, while 5061 holds the encrypted TLS session." },
        { option: "UDP 1720 (H.323) & TCP 5060", reason: "Port 1720 is for the H.323 voice standard, not SIP default standards." }
      ]
    },
    weight: 10
  },
  {
    id: "port21",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A technician is troubleshooting a router firmware load issue over the LAN. The router boot sequence is configured to download a config file from a server on port 69, but fails. The firewall log indicates allowed port 21 traffic. What is the mismatch?",
    options: [
      "The bootloader uses TFTP (UDP 69), but the administrator opened FTP (TCP 21)",
      "The bootloader uses FTP (TCP 21), but the administrator opened TFTP (UDP 69)",
      "The bootloader uses SFTP (TCP 22), but the administrator opened TFTP (UDP 69)",
      "The bootloader uses HTTP (TCP 80), but the administrator opened HTTPS (TCP 443)"
    ],
    correctAnswer: "The bootloader uses TFTP (UDP 69), but the administrator opened FTP (TCP 21)",
    explanation: {
      whyCorrect: "Router bootloaders generally request files using TFTP (Trivial File Transfer Protocol) on UDP port 69 due to its simplicity, not full TCP FTP on port 21.",
      whyWrong: [
        { option: "The bootloader uses FTP (TCP 21), but the administrator opened TFTP (UDP 69)", reason: "This would mean the router wants FTP on TCP 21, but routers utilize the lighter UDP 69 during BIOS-level boot sequences." },
        { option: "The bootloader uses SFTP (TCP 22), but the administrator opened TFTP (UDP 69)", reason: "SFTP uses SSH (port 22) and is too complex for basic, low-level Bootstrap programs." },
        { option: "The bootloader uses HTTP (TCP 80), but the administrator opened HTTPS (TCP 443)", reason: "This is completely unrelated to Port 69 or Port 21 operations." }
      ]
    },
    weight: 10
  },
  {
    id: "port22",
    type: "port",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A new network segment is created for VoIP systems and remote managers. The firewall must allow: unencrypted VoIP signaling, secure remote command line, and encrypted web management. Which ports should be allowed INBOUND?",
    options: [
      "UDP 5060, TCP 22, TCP 443",
      "TCP 5061, TCP 23, TCP 80",
      "UDP 5060, TCP 3389, TCP 80",
      "TCP 5061, TCP 22, TCP 445"
    ],
    correctAnswer: "UDP 5060, TCP 22, TCP 443",
    explanation: {
      whyCorrect: "Unencrypted VoIP signaling uses SIP on UDP 5060. Secure remote CLI is SSH on TCP 22. Encrypted web management is HTTPS on TCP 443. Therefore, this combination satisfies all criteria.",
      whyWrong: [
        { option: "TCP 5061, TCP 23, TCP 80", reason: "This includes encrypted SIP (5061) instead of unencrypted, unsecure Telnet (23) instead of secure SSH, and clear HTTP (80) instead of secure HTTPS." },
        { option: "UDP 5060, TCP 3389, TCP 80", reason: "This includes GUI-based RDP (3389) instead of command-line SSH, and clear HTTP (80) instead of secure." },
        { option: "TCP 5061, TCP 22, TCP 445", reason: "This features encrypted SIPS (5061) instead of clear SIP, and Windows file share SMB (445) instead of web traffic HTTPS." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q1",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.1 OSI Layers",
    question: "A network administrator is troubleshooting a connectivity issue. The problem occurs at the physical cabling and voltage levels. At which layer of the OSI model should the administrator begin troubleshooting?",
    options: [
      "A) Layer 1 — Physical",
      "B) Layer 2 — Data Link",
      "C) Layer 3 — Network",
      "D) Layer 4 — Transport"
    ],
    correctAnswer: "A) Layer 1 — Physical",
    explanation: {
      whyCorrect: "Physical cabling, connector configurations, voltage levels, signaling, and physical interfaces are all handled at Layer 1 (Physical) of the OSI model.",
      whyWrong: [
        { option: "B) Layer 2 — Data Link", reason: "Data Link layer handles MAC addresses, frames, hardware addressing, and local link communications." },
        { option: "C) Layer 3 — Network", reason: "Network layer handles logical IP addressing, routing, packet forwarding, and path selection." },
        { option: "D) Layer 4 — Transport", reason: "Transport layer manages end-to-end transport, flow control, windowing, and port numbers (TCP/UDP)." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q2",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.1 OSI Layers",
    question: "A web server needs to encrypt data between the client and server to secure online transactions. Which OSI layer is responsible for this encryption and data formatting?",
    options: [
      "A) Layer 3 — Network",
      "B) Layer 5 — Session",
      "C) Layer 6 — Presentation",
      "D) Layer 7 — Application"
    ],
    correctAnswer: "C) Layer 6 — Presentation",
    explanation: {
      whyCorrect: "The Presentation layer (Layer 6) is responsible for data translation, syntax formatting, and encryption/decryption functions (including SSL/TLS encapsulation).",
      whyWrong: [
        { option: "A) Layer 3 — Network", reason: "The Network layer is concerned only with routing and logical addressing, not with payload encryption." },
        { option: "B) Layer 5 — Session", reason: "The Session layer establishes, maintains, and terminates communication sessions between applications." },
        { option: "D) Layer 7 — Application", reason: "The Application layer is the interface between the user application and network services; it relies on Layer 6 for encryption." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q3",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.8 Network Appliances",
    question: "Which of the following network appliances can connect multiple network segments, filter traffic based on IP addresses and port numbers, and is commonly used to create a screened subnet (DMZ)?",
    options: [
      "A) Hub",
      "B) Switch",
      "C) Router",
      "D) Firewall"
    ],
    correctAnswer: "D) Firewall",
    explanation: {
      whyCorrect: "Firewalls are security appliances designed to inspect and filter traffic using security rules based on IP addresses, ports, or applications, and are used to separate zones like dmz/screened subnets.",
      whyWrong: [
        { option: "A) Hub", reason: "A hub is a physical-layer repeater with no intelligence that broadcasts all incoming traffic to all ports." },
        { option: "B) Switch", reason: "A standard Layer 2 switch forwards frames based strictly on MAC addresses, not IP or port filtering." },
        { option: "C) Router", reason: "A router is designed primarily for packets forwarding between separate network subnets, not security policy enforcement." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q4",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.7 Cloud Concepts",
    question: "A company wants to deploy servers in a cloud environment where multiple customers share the same physical infrastructure, but each customer's data is logically isolated. Which cloud concept best describes this arrangement?",
    options: [
      "A) Multitenancy",
      "B) Hybrid hosting",
      "C) Elasticity",
      "D) Infrastructure as a Service (IaaS)"
    ],
    correctAnswer: "A) Multitenancy",
    explanation: {
      whyCorrect: "Multitenancy refers to a key cloud architecture where unified physical hardware/infrastructure resources are securely shared among multiple distinct clients or organizations (tenants).",
      whyWrong: [
        { option: "B) Hybrid hosting", reason: "Hybrid models involve mixing on-premise infrastructure with public/private cloud environments, not specifically sharing physical resources." },
        { option: "C) Elasticity", reason: "Elasticity allows resources to dynamically scale up or down based on demand; it does not describe the multi-client resource sharing schema." },
        { option: "D) Infrastructure as a Service (IaaS)", reason: "IaaS is a broad service model supplying virtualized computing infrastructure, whereas multitenancy is the architecture that enables such sharing." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q5",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.8 Modern Envs",
    question: "A network engineer needs to connect a branch office to the corporate headquarters over the internet securely. The solution must encrypt all traffic between the two sites. Which technology should the engineer implement?",
    options: [
      "A) Virtual Private Network (VPN)",
      "B) Software-Defined WAN (SD-WAN)",
      "C) Virtual Extensible LAN (VXLAN)",
      "D) Dynamic Host Configuration Protocol (DHCP)"
    ],
    correctAnswer: "A) Virtual Private Network (VPN)",
    explanation: {
      whyCorrect: "A Virtual Private Network (VPN) creates an encrypted tunnel over an untrusted public network (like the internet) to safely link remote sites or clients together.",
      whyWrong: [
        { option: "B) Software-Defined WAN (SD-WAN)", reason: "SD-WAN manages and optimizes wide-area connections across multiple routes but doesn't describe the specific point-to-point encrypted tunneling of a VPN." },
        { option: "C) Virtual Extensible LAN (VXLAN)", reason: "VXLAN is an encapsulation protocol to stretch Layer 2 overlays over Layer 3 fabrics inside a data center, lacking native public encryption." },
        { option: "D) Dynamic Host Configuration Protocol (DHCP)", reason: "DHCP is a client utility designed to automatically assign IP configurations, not secure network transmissions." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q6",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "Which protocol, running on port 53, is responsible for resolving human-readable domain names into IP addresses?",
    options: [
      "A) FTP",
      "B) DHCP",
      "C) DNS (Domain Name System)",
      "D) SSH"
    ],
    correctAnswer: "C) DNS (Domain Name System)",
    explanation: {
      whyCorrect: "Domain Name System (DNS) maps human-friendly hostnames (like google.com) to computer-readable IP addresses using port 53.",
      whyWrong: [
        { option: "A) FTP", reason: "File Transfer Protocol uses ports 20/21 and manages bulk data transfer across host interfaces." },
        { option: "B) DHCP", reason: "DHCP uses ports 67/68 for dynamic allocation of addressing configuration." },
        { option: "D) SSH", reason: "Secure Shell operates on port 22 to facilitate safe command-line terminal control." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q7",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A network administrator needs to assign IP addresses automatically to devices on the network. The server will also provide the default gateway and DNS server information. Which protocol, operating on ports 67 and 68, should be used?",
    options: [
      "A) DNS (Domain Name System)",
      "B) HTTP (Hypertext Transfer Protocol)",
      "C) DHCP (Dynamic Host Configuration Protocol)",
      "D) SNMP (Simple Network Management Protocol)"
    ],
    correctAnswer: "C) DHCP (Dynamic Host Configuration Protocol)",
    explanation: {
      whyCorrect: "Dynamic Host Configuration Protocol (DHCP) automatically scales host setup by distributing IP settings, gateways, and subnet configurations over active client lists.",
      whyWrong: [
        { option: "A) DNS (Domain Name System)", reason: "DNS manages hostname lookup profiles, not terminal address allocation leases." },
        { option: "B) HTTP (Hypertext Transfer Protocol)", reason: "HTTP communicates unsecure web site layout transfers using port 80." },
        { option: "D) SNMP (Simple Network Management Protocol)", reason: "SNMP polls remote devices on port 161 to collect diagnostic and query status info." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q8",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.6 Topology",
    question: "A security analyst is investigating an attack where an unauthorized device is mimicking a legitimate access point to capture user credentials. Which type of attack is this?",
    options: [
      "A) Evil twin",
      "B) Denial of service",
      "C) IP spoofing",
      "D) Man-in-the-middle ARP poison"
    ],
    correctAnswer: "A) Evil twin",
    explanation: {
      whyCorrect: "An Evil Twin is a rogue wireless access point that mimics a legitimate SSID/network name to trick users into connecting so the attacker can intercept traffic and steal credentials.",
      whyWrong: [
        { option: "B) Denial of service", reason: "Denial of Service is structured to deplete system bandwidth or processing resources, not spoof user access paths." },
        { option: "C) IP spoofing", reason: "IP spoofing alters the header information of packets to hide source identification, but is not specific to wireless access points." },
        { option: "D) Man-in-the-middle ARP poison", reason: "ARP poisoning is a Layer 2 LAN mechanism mapping fraudulent MAC-to-IP pairings to divert switch traffic, not a rogue wireless AP." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q9",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.5 Physical Media",
    question: "A company is deploying fiber optic cabling in a data center and needs to connect two switches that are 500 meters apart. The cable must support high speeds and use a laser-based transceiver. Which fiber type should the technician choose?",
    options: [
      "A) Single-mode fiber",
      "B) Multimode fiber",
      "C) Twisted-pair copper",
      "D) Coaxial cable"
    ],
    correctAnswer: "A) Single-mode fiber",
    explanation: {
      whyCorrect: "Single-mode fiber uses lasers to transmit light down a narrow core, making it optimal for long distances and high speeds, and is required for laser-based modules over long distances without optical dispersion.",
      whyWrong: [
        { option: "B) Multimode fiber", reason: "Multimode fiber uses LEDs or VCSELs to transmit light over a wider core. While it can reach 500 meters at lower speeds, laser-specific high-bandwidth needs point directly to single-mode cabling." },
        { option: "C) Twisted-pair copper", reason: "Twisted-pair copper cables are highly constrained and limited to a max distance of 100 meters." },
        { option: "D) Coaxial cable", reason: "Coaxial cable is a legacy analog physical media, not suitable for high-speed fiber data configurations." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q10",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.6 Topology",
    question: "A network administrator is designing a large enterprise campus network and wants to separate traffic between departments (Engineering, Sales, HR) to improve security and reduce broadcast traffic. Which technology should the administrator implement?",
    options: [
      "A) VLAN (Virtual Local Area Network)",
      "B) Spanning Tree Protocol (STP)",
      "C) Link Aggregation Control Protocol (LACP)",
      "D) Network Address Translation (NAT)"
    ],
    correctAnswer: "A) VLAN (Virtual Local Area Network)",
    explanation: {
      whyCorrect: "VLANs separate a single physical switch network into multiple logical broadcast domains, keeping department traffic isolated at Layer 2.",
      whyWrong: [
        { option: "B) Spanning Tree Protocol (STP)", reason: "STP acts to block ports and prevent loop creation across Layer 2 switch layouts, not separate groups." },
        { option: "C) Link Aggregation Control Protocol (LACP)", reason: "LACP aggregates multiple physical cables to act as one virtual interface, scaling throughput." },
        { option: "D) Network Address Translation (NAT)", reason: "NAT rewrites IP addresses within packet headers at the border firewall, irrelevant to internal LAN broadcast segmentation." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q11",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "A network technician needs to divide the 192.168.1.0/24 network into four smaller subnets, each supporting at least 50 usable hosts. What subnet mask should be used?",
    options: [
      "A) 255.255.255.0 (/24)",
      "B) 255.255.255.128 (/25)",
      "C) 255.255.255.192 (/26)",
      "D) 255.255.255.240 (/28)"
    ],
    correctAnswer: "C) 255.255.255.192 (/26)",
    explanation: {
      whyCorrect: "Borrowing 2 bits for subnetting (increasing the mask from /24 to /26) yields 4 subnets (2^2). Each subnet has 6 host bits available (32-26=6), which provides 62 usable host addresses (2^6 - 2 = 62), fully hosting the 50-user minimum.",
      whyWrong: [
        { option: "A) 255.255.255.0 (/24)", reason: "This is the original unpartitioned network; it is a single broadcast domain with 254 endpoints." },
        { option: "B) 255.255.255.128 (/25)", reason: "A /25 yields only two subnets (though they can support 126 devices each)." },
        { option: "D) 255.255.255.240 (/28)", reason: "A /28 provides 16 subnets, but each subnet supports only 14 usable hosts, which fails to meet the 50-host requirement." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q12",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.8 Modern Envs",
    question: "An organization wants to adopt an architecture that eliminates implicit trust and requires continuous authentication of every access request. Which modern security framework fulfills this requirement?",
    options: [
      "A) Zero trust architecture (ZTA)",
      "B) Defense in Depth",
      "C) Role-Based Access Control (RBAC)",
      "D) Multi-Factor Authentication (MFA)"
    ],
    correctAnswer: "A) Zero trust architecture (ZTA)",
    explanation: {
      whyCorrect: "Zero Trust Architecture (ZTA) operates on the core belief that no user or asset should be granted implicit trust based purely on physical or logical location, requiring ongoing validation for every resource lookup.",
      whyWrong: [
        { option: "B) Defense in Depth", reason: "Defense in depth uses layered security controls but does not natively enforce an explicitly zero-trust, access-by-access validation engine." },
        { option: "C) Role-Based Access Control (RBAC)", reason: "RBAC maps privilege to a specific organizational role, which is a component of access control rather than an entire modern zero-trust architecture." },
        { option: "D) Multi-Factor Authentication (MFA)", reason: "MFA is an authentication technology validating user identities, which is a tool used by ZTA but not the architecture itself." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q13",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.7 Cloud Concepts",
    question: "Which cloud service model provides the customer with the ability to deploy applications onto the cloud infrastructure using programming languages and tools supported by the provider, with the customer managing the applications and data but not the underlying infrastructure?",
    options: [
      "A) Infrastructure as a Service (IaaS)",
      "B) Software as a Service (SaaS)",
      "C) Platform as a Service (PaaS)",
      "D) Database as a Service (DBaaS)"
    ],
    correctAnswer: "C) Platform as a Service (PaaS)",
    explanation: {
      whyCorrect: "Platform as a Service (PaaS) abstracts away operating systems, databases, hardware, and networks, exposing only the pipeline/execution layout for user scripts and programs.",
      whyWrong: [
        { option: "A) Infrastructure as a Service (IaaS)", reason: "IaaS leaves complete OS management, patching, runtime setup, and software builds entirely to the client." },
        { option: "B) Software as a Service (SaaS)", reason: "SaaS provides fully managed, preloaded turnkey software in a browser shell, offering no developer coding levels." },
        { option: "D) Database as a Service (DBaaS)", reason: "DBaaS is a platform sub-type aimed only at managing databases, not deploying generalized developer scripts." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q14",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.8 Modern Envs",
    question: "A technician receives a new router that is pre-configured with default settings. After receiving a URL via email, the technician connects the device to the internet, and it automatically downloads and applies its full configuration. Which feature is being demonstrated?",
    options: [
      "A) Dynamic Routing",
      "B) Hot Standby Routing",
      "C) Zero-touch provisioning",
      "D) Port Address Translation"
    ],
    correctAnswer: "C) Zero-touch provisioning",
    explanation: {
      whyCorrect: "Zero-touch provisioning (ZTP) allows devices to be configured automatically upon initial connection to the network by requesting bootstrap files from a cloud server.",
      whyWrong: [
        { option: "A) Dynamic Routing", reason: "Dynamic routing is used by routers to negotiate active network paths using protocols like OSPF, not deploy whole device hardware maps." },
        { option: "B) Hot Standby Routing", reason: "Hot Standby describes FHRP gateways handling dynamic user routing failovers, completely separate from auto-provisioning." },
        { option: "D) Port Address Translation", reason: "PAT allows internal IP clusters to map out over a single WAN address using distinct ports." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q15",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "A company is running out of public IPv4 addresses and needs to allow multiple internal devices to share a single public IP address when accessing the internet. Which technology should be configured on the edge router?",
    options: [
      "A) PAT (Port Address Translation)",
      "B) Static NAT",
      "C) Dynamic Host Configuration Protocol (DHCP)",
      "D) Domain Name System (DNS)"
    ],
    correctAnswer: "A) PAT (Port Address Translation)",
    explanation: {
      whyCorrect: "Port Address Translation (PAT, or NAT Overload) allows a single IP address to serve thousands of concurrent clients by assigning unique port mappings to each session.",
      whyWrong: [
        { option: "B) Static NAT", reason: "Static NAT creates a fixed one-to-one mapping between a private IP and a public IP, which does not conserve public addresses." },
        { option: "C) Dynamic Host Configuration Protocol (DHCP)", reason: "DHCP issues configuration templates to local devices, unrelated to external address translation." },
        { option: "D) Domain Name System (DNS)", reason: "DNS maps names to addressing fields, unrelated to conserving IP counts." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q16",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.4 Protocols",
    question: "Which of the following wireless standards operates in the 6 GHz frequency band and supports the highest theoretical throughput among the listed options?",
    options: [
      "A) 802.11g (Wi-Fi 3)",
      "B) 802.11n (Wi-Fi 4)",
      "C) 802.11ac (Wi-Fi 5)",
      "D) 802.11ax (Wi-Fi 6E)"
    ],
    correctAnswer: "D) 802.11ax (Wi-Fi 6E)",
    explanation: {
      whyCorrect: "802.11ax (specifically the Wi-Fi 6E enhancement) introduced operations in the 6 GHz band, which supports wide channels and high data throughput.",
      whyWrong: [
        { option: "A) 802.11g (Wi-Fi 3)", reason: "802.11g runs exclusively on the 2.4 GHz spectrum with a max bandwidth of 54 Mbps." },
        { option: "B) 802.11n (Wi-Fi 4)", reason: "802.11n runs on 2.4/5 GHz bands and reaches up to 600 Mbps, but lacks 6 GHz capabilities." },
        { option: "C) 802.11ac (Wi-Fi 5)", reason: "802.11ac runs on the 5 GHz band only, lacking the 6 GHz frequency band supported by Wi-Fi 6E/7." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q17",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "A server with an IP address of 10.10.10.10 sends a packet to the destination IP 255.255.255.255. This packet will be delivered to which devices?",
    options: [
      "A) All devices on the local network segment",
      "B) All devices across the entire autonomous system (AS)",
      "C) A specific multicast group of devices",
      "D) Only the default gateway router"
    ],
    correctAnswer: "A) All devices on the local network segment",
    explanation: {
      whyCorrect: "An IP of 255.255.255.255 is the limited broadcast address. Routers discard this address by default, so it reaches all devices on the local Layer 2 broadcast domain but does not cross routers.",
      whyWrong: [
        { option: "B) All devices across the entire autonomous system (AS)", reason: "Routers block limited broadcasts, restricting them only to the local subnet segment." },
        { option: "C) A specific multicast group of devices", reason: "Multicast relies on Class D addresses (224.0.0.0 to 239.255.255.255), not the limited broadcast address." },
        { option: "D) Only the default gateway router", reason: "Unicast traffic points directly to a single gateway, whereas broadcast hits every local endpoint." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q18",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.5 Physical Media",
    question: "A network administrator is adding a new switch to the network and needs to connect it to an existing aggregation switch. The connection must support high throughput with minimal latency using a fiber optic link. Which type of transceiver should the administrator use?",
    options: [
      "A) RJ-45",
      "B) Small form-factor pluggable (SFP)",
      "C) BNC Connector",
      "D) Twinaxial Direct Attach Copper (DAC)"
    ],
    correctAnswer: "B) Small form-factor pluggable (SFP)",
    explanation: {
      whyCorrect: "Small Form-Factor Pluggable (SFP), and its upgrade SFP+, are standard hot-swappable transceiver interfaces used on switches to support optical fiber modules for high-speed uplink routing.",
      whyWrong: [
        { option: "A) RJ-45", reason: "RJ-45 is a copper connector format, which is not used for fiber optic cabling." },
        { option: "C) BNC Connector", reason: "BNC is a coaxial locking cable plug typically used for analog video or legacy 10Base2 systems, not fiber." },
        { option: "D) Twinaxial Direct Attach Copper (DAC)", reason: "DAC uses twinaxial copper cables with built-in SFP ports, which is not an optical fiber link." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q19",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.6 Topology",
    question: "A network architect is designing a new data center network that requires high-speed switching between multiple leaf switches. The design must provide low and predictable latency for east-west traffic. Which topology is most appropriate?",
    options: [
      "A) Spine and leaf",
      "B) Star",
      "C) Ring",
      "D) Bus"
    ],
    correctAnswer: "A) Spine and leaf",
    explanation: {
      whyCorrect: "Spine-and-leaf is a two-tier non-blocking architecture where every leaf switch connects directly to every spine switch, creating low and predictable latency for east-west data center traffic.",
      whyWrong: [
        { option: "B) Star", reason: "A star layout uses a single central switch hub, creating a major bottleneck and single point of failure in scaled environments." },
        { option: "C) Ring", reason: "A ring layout has redundant paths but requires traffic to hop sequentially around node loops, causing highly variable latency." },
        { option: "D) Bus", reason: "Bus layouts are legacy half-duplex structures where all nodes share a single horizontal cable line, which is obsolete." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q20",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.1 Infrastructure as Code",
    question: "A company is implementing Infrastructure as Code (IaC) to manage its network device configurations. The team needs to track changes, collaborate on configurations, and revert to previous versions if an error occurs. Which technology should be used alongside IaC to meet these requirements?",
    options: [
      "A) Simple Network Management Protocol (SNMP)",
      "B) Version control",
      "C) Software-defined WAN (SD-WAN)",
      "D) Grid Protocol"
    ],
    correctAnswer: "B) Version control",
    explanation: {
      whyCorrect: "Version control systems (such as Git) track edits, enable team contributions, and maintain file histories to allow configurations to be rolled back to any previous state.",
      whyWrong: [
        { option: "A) Simple Network Management Protocol (SNMP)", reason: "SNMP monitors device statistics and alerts, not repository state files." },
        { option: "C) Software-defined WAN (SD-WAN)", reason: "SD-WAN manages dynamic public routing layouts but does not provide version history/code storage." },
        { option: "D) Grid Protocol", reason: "Grid Protocol is not a recognized routing or configuration tracking standard." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q21",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.3 IP Addressing",
    question: "A network has been assigned the IPv6 address block 2001:db8::/32. An administrator wants to create multiple subnets within this block for different departments. Which technology allows the administrator to flexibly subnet the IPv6 space?",
    options: [
      "A) Address Resolution Protocol (ARP)",
      "B) Statefull DHCPv6 only",
      "C) Standard IPv6 subnetting (with CIDR)",
      "D) Link-local address mappings"
    ],
    correctAnswer: "C) Standard IPv6 subnetting (with CIDR)",
    explanation: {
      whyCorrect: "Standard IPv6 layout utilizes Classless Inter-Domain Routing (CIDR) notation allowing administrators to borrow bits to carve up address spaces.",
      whyWrong: [
        { option: "A) Address Resolution Protocol (ARP)", reason: "ARP resolves IPv4 addresses to MAC entries, completely unrelated to IPv6 configuration structures." },
        { option: "B) Statefull DHCPv6 only", reason: "DHCPv6 assigns addressing maps, but the layout and subnetting itself is planned using standard CIDR structures." },
        { option: "D) Link-local address mappings", reason: "Link-local addresses (fe80::/10) are automatic, non-routable interfaces, not standard address blocks." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q22",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.8 Modern Envs",
    question: "A remote employee is working from a coffee shop. The user connects to a corporate resource, but the VPN is configured so that only traffic destined for the corporate network goes through the VPN tunnel, while internet browsing uses the coffee shop's internet connection directly. Which type of VPN configuration is being used?",
    options: [
      "A) Full tunnel",
      "B) Split tunnel",
      "C) Site-to-site",
      "D) Host-to-host IPsec"
    ],
    correctAnswer: "B) Split tunnel",
    explanation: {
      whyCorrect: "A split tunnel VPN encrypts and routes only enterprise-destined traffic through the VPN gateway, sending standard internet packets directly out to the local ISP.",
      whyWrong: [
        { option: "A) Full tunnel", reason: "Full tunneling forces all data (internal and general web) through the VPN path, which increases latency and uses more server bandwidth." },
        { option: "C) Site-to-site", reason: "Site-to-site connects two static network offices over a gateway, rather than a remote individual user." },
        { option: "D) Host-to-host IPsec", reason: "Host-to-host IPsec secures transmission from one specific server endpoint to another, not split routing behavior." }
      ]
    },
    weight: 10
  },
  {
    id: "d1_q23",
    type: "architect",
    domain: "1.0 Concepts",
    objective: "1.4 Ports & Protocols",
    question: "A system administrator needs to remotely manage a Linux server securely. Which protocol, operating on port 22, provides encrypted remote command-line access?",
    options: [
      "A) SSH (Secure Shell)",
      "B) Telnet",
      "C) RDP (Remote Desktop Protocol)",
      "D) SFTP"
    ],
    correctAnswer: "A) SSH (Secure Shell)",
    explanation: {
      whyCorrect: "Secure Shell (SSH) replaces unencrypted protocols (like Telnet) by establishing an encrypted command-line shell session on TCP port 22.",
      whyWrong: [
        { option: "B) Telnet", reason: "Telnet runs on port 23 and transmits command inputs, logs, and credentials in plaintext, which is insecure." },
        { option: "C) RDP (Remote Desktop Protocol)", reason: "RDP is a GUI management utility operating on port 3389, commonly used for Windows servers." },
        { option: "D) SFTP", reason: "SFTP uses SSH (port 22) but is designed for secure file transfer, not running interactive shells." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q1",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.4 Network Address Translation",
    question: "An organization is configuring a new firewall and needs to translate multiple internal private IP addresses to a single public IP address. Additionally, the configuration must track each session using port numbers to ensure return traffic is correctly matched. Which technology should the network engineer implement?",
    options: [
      "A) Dynamic NAT",
      "B) Static NAT",
      "C) PAT (Port Address Translation)",
      "D) Port Forwarding"
    ],
    correctAnswer: "C) PAT (Port Address Translation)",
    explanation: {
      whyCorrect: "Port Address Translation (PAT, or NAT Overload) maps multiple internal private IP hosts to a single public IP by tracking unique TCP/UDP port mapping entries for each session.",
      whyWrong: [
        { option: "A) Dynamic NAT", reason: "Dynamic NAT links local nodes to any free IP address in an allocated public pool but does not multiplex them over a single IP." },
        { option: "B) Static NAT", reason: "Static NAT establishes a fixed one-to-one mapping between a private host and a public IP, consuming public IPs rapidly." },
        { option: "D) Port Forwarding", reason: "Port Forwarding routes incoming traffic on a specific port to an internal host, rather than managing outgoing client translations." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q2",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.1 Routing Technologies",
    question: "A network router has routes to the same destination from three different routing protocols: EIGRP (administrative distance 90), OSPF (administrative distance 110), and a static route (administrative distance 1). Which route will be installed in the routing table?",
    options: [
      "A) The EIGRP route",
      "B) The OSPF route",
      "C) The static route (administrative distance 1)",
      "D) All three routes will be multipath load-balanced"
    ],
    correctAnswer: "C) The static route (administrative distance 1)",
    explanation: {
      whyCorrect: "Administrative Distance (AD) is a measure of route trustworthiness. The router installs the route with the lowest AD. Static routes have an AD of 1, which is more trusted than EIGRP (90) or OSPF (110).",
      whyWrong: [
        { option: "A) The EIGRP route", reason: "EIGRP is trusted (AD 90) but is overridden by the static route (AD 1)." },
        { option: "B) The OSPF route", reason: "OSPF routes (AD 110) are less trusted than both EIGRP and static routes." },
        { option: "D) All three routes will be multipath load-balanced", reason: "Multipath load balancing requires identical AD and routing metrics, which does not apply across different protocols." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q3",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 Switching Features",
    question: "A network technician is configuring a new VLAN for the guest Wi-Fi network. To ensure that only authorized devices can access the network, the technician needs to implement a security feature that limits the number of MAC addresses allowed on a switch port. Which feature should the technician enable?",
    options: [
      "A) 802.1Q trunking",
      "B) Port security",
      "C) Spanning Tree Protocol (STP)",
      "D) DHCP snooping"
    ],
    correctAnswer: "B) Port security",
    explanation: {
      whyCorrect: "Port Security allows administrators to specify and limit the MAC addresses that are permitted to send traffic on a switch port, blocking unrecognized physical hardware.",
      whyWrong: [
        { option: "A) 802.1Q trunking", reason: "802.1Q tags frames to support multiple VLANs over a single link, offering no MAC device control." },
        { option: "C) Spanning Tree Protocol (STP)", reason: "STP prevents logical packet forwarding loops across switch infrastructures." },
        { option: "D) DHCP snooping", reason: "DHCP snooping acts to ignore unauthorized DHCP server announcements inside the LAN." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q4",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 MDF/IDF",
    question: "A growing company is expanding to a new building with five floors. The ground floor will house the main Internet demarcation point and core switching equipment. Each upper floor will have its own wiring closet containing access switches and horizontal cabling. What are the correct designations for these two types of facilities?",
    options: [
      "A) Ground floor = Main Distribution Frame (MDF); Upper floors = Intermediate Distribution Frames (IDFs)",
      "B) Ground floor = Intermediate Distribution Frame (IDF); Upper floors = Main Distribution Frames (MDFs)",
      "C) Ground floor = Smart Jack / Demarcation Point; Upper floors = Horizontal Cabling Blocks",
      "D) Ground floor = Core Switch Room; Upper floors = Aggregation Switch Closets"
    ],
    correctAnswer: "A) Ground floor = Main Distribution Frame (MDF); Upper floors = Intermediate Distribution Frames (IDFs)",
    explanation: {
      whyCorrect: "The Main Distribution Frame (MDF) is the primary room connecting to the ISP demarc and core infrastructure, which links to Intermediate Distribution Frames (IDFs) on other floors.",
      whyWrong: [
        { option: "B) Ground floor = Intermediate Distribution Frame (IDF); Upper floors = Main Distribution Frames (MDFs)", reason: "This reverses the standard hierarchy; there is typically only one MDF per site." },
        { option: "C) Ground floor = Smart Jack / Demarcation Point; Upper floors = Horizontal Cabling Blocks", reason: "While the demarc is on the ground floor, this does not describe the wiring closets." },
        { option: "D) Ground floor = Core Switch Room; Upper floors = Aggregation Switch Closets", reason: "These are engineering descriptions, not the formal standard wiring facility designations." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q5",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.1 Routing Technologies",
    question: "A network engineer is configuring a site-to-site VPN between two branch offices. The link must remain up even if the primary WAN connection fails. Which First Hop Redundancy Protocol (FHRP) feature allows multiple routers to share a single virtual IP address to provide gateway redundancy?",
    options: [
      "A) Dynamic DNS",
      "B) Spanning Tree Protocol (STP)",
      "C) Virtual IP (VIP)",
      "D) Port Address Translation (PAT)"
    ],
    correctAnswer: "C) Virtual IP (VIP)",
    explanation: {
      whyCorrect: "First Hop Redundancy Protocols (like VRRP and HSRP) use a shared Virtual IP (VIP) address as the default gateway for local clients. If the active gateway fails, a standby router takes over the VIP.",
      whyWrong: [
        { option: "A) Dynamic DNS", reason: "Dynamic DNS updates DNS records automatically, unrelated to default gateway failovers." },
        { option: "B) Spanning Tree Protocol (STP)", reason: "STP acts to block redundant Layer 2 links to prevent broadcast storms, not manage IP gateways." },
        { option: "D) Port Address Translation (PAT)", reason: "PAT translates IP addresses to conserve address space but does not handle gateway failovers." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q6",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 Switching Features",
    question: "A network administrator is configuring a small office network with a single switch. The administrator needs to separate voice and data traffic to improve quality of service. The IP phones support passing data traffic through to the connected PCs. Which switch interface configuration feature should be used?",
    options: [
      "A) Trunk port",
      "B) Voice VLAN",
      "C) Link aggregation",
      "D) Native VLAN"
    ],
    correctAnswer: "B) Voice VLAN",
    explanation: {
      whyCorrect: "A Voice VLAN allows a switch port to carry both untagged data traffic from a PC and tagged voice traffic from an IP phone, ensuring proper QoS treatment.",
      whyWrong: [
        { option: "A) Trunk port", reason: "Trunk ports carry traffic for all VLANs and are typically used between switches, not for end-user workstations." },
        { option: "C) Link aggregation", reason: "Link aggregation combines multiple physical links to increase bandwidth, not segment voice traffic." },
        { option: "D) Native VLAN", reason: "The Native VLAN handles untagged frames traversing an 802.1Q trunk, not end-user IP phone segregation." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q7",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 MDF/IDF",
    question: "A data center manager is concerned about the cooling efficiency of the server racks. The manager wants cold air from the CRAC units to directly reach equipment intake vents and warm exhaust air to be captured and returned without mixing. Which physical arrangement of racks achieves this goal?",
    options: [
      "A) Enclosed bento setup",
      "B) Perimeter cooling orientation",
      "C) Hot aisle/cold aisle configuration",
      "D) Bottom-up forced convection venting"
    ],
    correctAnswer: "C) Hot aisle/cold aisle configuration",
    explanation: {
      whyCorrect: "A hot aisle/cold aisle layout separates cold intake air from hot exhaust air by orienting server racks back-to-back and front-to-front, which optimizes cooling efficiency.",
      whyWrong: [
        { option: "A) Enclosed bento setup", reason: "This is not a recognized industry design standard for server rack orientation." },
        { option: "B) Perimeter cooling orientation", reason: "Simply pushing cold air around the perimeter does not prevent intake and exhaust air from mixing." },
        { option: "D) Bottom-up forced convection venting", reason: "This relies on vertical airflow but does not separate intake and exhaust zones." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q8",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.3 Wireless Tech",
    question: "A network technician is installing a new wireless access point in a high-density office environment. The technician notices that neighboring businesses are using overlapping channels on the 2.4 GHz band, causing interference and poor performance. Which solution would best mitigate this issue while maintaining compatibility with older client devices?",
    options: [
      "A) Enable dynamic frequency selection (DFS) over the 2.4 GHz spectrum",
      "B) Switch to channel 1, 6, or 11 and adjust channel width to 20 MHz",
      "C) Adjust channel width to 40 MHz and configure band steering to force 2.4 GHz",
      "D) Use channel 3, 4, or 9 with a 10 MHz narrow spectral slice"
    ],
    correctAnswer: "B) Switch to channel 1, 6, or 11 and adjust channel width to 20 MHz",
    explanation: {
      whyCorrect: "In the 2.4 GHz spectrum, only channels 1, 6, and 11 do not overlap. Using a standard 20 MHz channel width minimizes co-channel interference and maintains compatibility.",
      whyWrong: [
        { option: "A) Enable dynamic frequency selection (DFS) over the 2.4 GHz spectrum", reason: "DFS operates on the 5 GHz band to avoid interference with radar installations, not in the 2.4 GHz spectrum." },
        { option: "C) Adjust channel width to 40 MHz and configure band steering to force 2.4 GHz", reason: "A 40 MHz channel consumes too much spectrum in the crowded 2.4 GHz band, increasing interference." },
        { option: "D) Use channel 3, 4, or 9 with a 10 MHz narrow spectral slice", reason: "Using non-standard or overlapping channels like 3, 4, or 9 causes severe adjacent-channel interference." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q9",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.1 Routing Technologies",
    question: "A router receives a packet destined for 192.168.5.100. The routing table shows: S 192.168.5.0/24 via 10.0.0.1, O 192.168.5.0/26 via 10.0.0.2, C 192.168.5.0/24 via 10.0.0.3. Which route does the router select, and why?",
    options: [
      "A) The static route for 192.168.5.0/24 because static routes have the lowest administrative distance of 1",
      "B) The connected route for 192.168.5.0/24 because directly connected interfaces have an administrative distance of 0",
      "C) The OSPF route for 192.168.5.0/26 because it has the longest prefix match (most specific subnet mask)",
      "D) The router will drop the packet because of conflicting overlapping subnet records"
    ],
    correctAnswer: "C) The OSPF route for 192.168.5.0/26 because it has the longest prefix match (most specific subnet mask)",
    explanation: {
      whyCorrect: "The router first evaluates routes using the \"longest prefix match\" (most specific subnet mask). Since /26 is more specific than /24, the route via 10.0.0.2 is chosen, regardless of administrative distance.",
      whyWrong: [
        { option: "A) The static route for 192.168.5.0/24 because static routes have the lowest administrative distance of 1", reason: "AD is evaluated only when comparing routes with identical prefix lengths." },
        { option: "B) The connected route for 192.168.5.0/24 because directly connected interfaces have an administrative distance of 0", reason: "This route has a shorter prefix (/24) than the OSPF route (/26), so it is not evaluated first." },
        { option: "D) The router will drop the packet because of conflicting overlapping subnet records", reason: "IP routers can resolve overlapping subnets natively using the longest prefix match rule." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q10",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 Switching Features",
    question: "A company is experiencing network loops causing broadcast storms and MAC address table instability. The network uses multiple interconnected switches. Which IEEE standard should be enabled to prevent these loops by blocking redundant links?",
    options: [
      "A) 802.3 (Ethernet CSMA/CD)",
      "B) 802.1Q (VLAN Trunking Services)",
      "C) 802.1D (Spanning Tree Protocol)",
      "D) 802.11 (Wireless Local Area Networks)"
    ],
    correctAnswer: "C) 802.1D (Spanning Tree Protocol)",
    explanation: {
      whyCorrect: "IEEE 802.1D Spanning Tree Protocol (STP) detects network loops and dynamically blocks redundant ports to maintain a loop-free topology.",
      whyWrong: [
        { option: "A) 802.3 (Ethernet CSMA/CD)", reason: "This is the foundational standard for Ethernet physical and data-link operations, not loop prevention." },
        { option: "B) 802.1Q (VLAN Trunking Services)", reason: "802.1Q is the standard for insert trunk tags for VLAN segmentation, not loop prevention." },
        { option: "D) 802.11 (Wireless Local Area Networks)", reason: "802.11 defines standards for Wi-Fi configurations." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q11",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 Switching Features",
    question: "A network administrator needs to secure the management interface of a switch. The administrator wants to ensure that all traffic to the management IP address is encrypted. Which protocol should the administrator use to connect to the switch's command-line interface?",
    options: [
      "A) HTTP",
      "B) Telnet",
      "C) SSH (Secure Shell)",
      "D) SNMPv1"
    ],
    correctAnswer: "C) SSH (Secure Shell)",
    explanation: {
      whyCorrect: "Secure Shell (SSH) encrypts all data in transit, including passwords, preventing eavesdropping and protecting credentials during remote switch administration.",
      whyWrong: [
        { option: "A) HTTP", reason: "HTTP is unencrypted web-based management, which sends credentials in plaintext." },
        { option: "B) Telnet", reason: "Telnet is a legacy unencrypted command-line tool that is highly vulnerable to capture." },
        { option: "D) SNMPv1", reason: "SNMPv1 is used for device monitoring and uses unencrypted plaintext community strings." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q12",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.3 Wireless Tech",
    question: "A network engineer is designing a wireless network for a warehouse with metal shelving and equipment. The engineer needs to ensure that roaming devices maintain connectivity as users move through the aisles. Which wireless network type is most appropriate for this environment?",
    options: [
      "A) Point-to-point wireless bridge",
      "B) Ad-hoc network",
      "C) Mesh network",
      "D) Standalone independent client infrastructure"
    ],
    correctAnswer: "C) Mesh network",
    explanation: {
      whyCorrect: "A wireless Mesh network uses multiple interconnected nodes to dynamically route traffic around obstacles like metal shelving, providing high reliability for roaming clients.",
      whyWrong: [
        { option: "A) Point-to-point wireless bridge", reason: "A point-to-point link connects two fixed locations, not roaming warehouse clients." },
        { option: "B) Ad-hoc network", reason: "Ad-hoc networks are peer-to-peer connections between client devices and do not scale to support warehouse roaming." },
        { option: "D) Standalone independent client infrastructure", reason: "This refers to disconnected clients and does not represent a shared enterprise wireless architecture." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q13",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 MDF/IDF",
    question: "A small business is deploying a new server room. The business experiences frequent brief power sags and surges, which have caused network equipment to reboot unexpectedly. The administrator needs a device that conditions the power and provides enough runtime to perform graceful shutdowns during extended outages. Which device should be installed?",
    options: [
      "A) Power Distribution Unit (PDU)",
      "B) Uninterruptible Power Supply (UPS)",
      "C) Gas-powered backup generator",
      "D) Secondary surge suppressor strip"
    ],
    correctAnswer: "B) Uninterruptible Power Supply (UPS)",
    explanation: {
      whyCorrect: "An Uninterruptible Power Supply (UPS) filters dirty power, protects against sags and surges, and provides battery backup power during outages to keep critical network components online.",
      whyWrong: [
        { option: "A) Power Distribution Unit (PDU)", reason: "A PDU is an intelligent power strip that distributes electrical outlets to devices in a rack, offering no battery backup." },
        { option: "C) Gas-powered backup generator", reason: "Generators provide long-term power but require a few minutes to start up, during which the devices would still drop offline." },
        { option: "D) Secondary surge suppressor strip", reason: "Surge suppressors protect against voltage spikes but do not maintain power during a sag or outage." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q14",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 Switching Features",
    question: "A network switch has been configured with multiple VLANs: VLAN 10 (Sales), VLAN 20 (Engineering), and VLAN 30 (Management). The administrator needs to route traffic between these VLANs without purchasing a separate router. Which feature should be configured on the switch?",
    options: [
      "A) Link Aggregation (LACP)",
      "B) Switch Virtual Interface (SVI)",
      "C) Trunking Port Modes",
      "D) Jumbo Frames (9000 MTU)"
    ],
    correctAnswer: "B) Switch Virtual Interface (SVI)",
    explanation: {
      whyCorrect: "A Switch Virtual Interface (SVI) is a logical Layer 3 interface on a multilayer switch that allows the switch to route traffic between different VLAN subnets natively.",
      whyWrong: [
        { option: "A) Link Aggregation (LACP)", reason: "LACP bundles physical links to increase bandwidth, not route traffic." },
        { option: "C) Trunking Port Modes", reason: "Trunking carries multiple VLANs over a single port but does not perform the routing between those VLANs." },
        { option: "D) Jumbo Frames (9000 MTU)", reason: "Jumbo frames support larger payloads to improve transmission efficiency, unrelated to IP routing." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q15",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.3 Wireless Tech",
    question: "A technician is installing a new wireless network that must support the highest possible throughput and operate in the 6 GHz band to avoid interference from legacy devices. Which 802.11 standard should the technician choose?",
    options: [
      "A) 802.11a (Wi-Fi 1)",
      "B) 802.11n (Wi-Fi 4)",
      "C) 802.11ac (Wi-Fi 5)",
      "D) 802.11ax (Wi-Fi 6E)"
    ],
    correctAnswer: "D) 802.11ax (Wi-Fi 6E)",
    explanation: {
      whyCorrect: "IEEE 802.11ax (specifically the Wi-Fi 6E designation) introduced operations in the 6 GHz spectrum, providing high data rates and less environmental congestion.",
      whyWrong: [
        { option: "A) 802.11a (Wi-Fi 1)", reason: "802.11a operates on the 5 GHz band with a max speed of 54 Mbps." },
        { option: "B) 802.11n (Wi-Fi 4)", reason: "802.11n operates in 2.4/5 GHz only, not in the 6 GHz spectrum." },
        { option: "C) 802.11ac (Wi-Fi 5)", reason: "802.11ac operates purely in the 5 GHz band, lacking support for the 6 GHz band." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q16",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 Switching Features",
    question: "A network administrator is configuring a link aggregation group (LAG) between two switches to increase throughput and provide redundancy. Four physical interfaces are being bundled. After configuration, the administrator notices that traffic is not load-balancing across all four links. Which protocol should be used to negotiate the aggregation and ensure proper operation?",
    options: [
      "A) Spanning Tree Protocol (STP)",
      "B) Cisco Discovery Protocol (CDP)",
      "C) Link Aggregation Control Protocol (LACP)",
      "D) Link Layer Discovery Protocol (LLDP)"
    ],
    correctAnswer: "C) Link Aggregation Control Protocol (LACP)",
    explanation: {
      whyCorrect: "Link Aggregation Control Protocol (LACP, IEEE 802.3ad) dynamically negotiates and bundle physical ports to act as a single logical connection (EtherChannel), ensuring active traffic sharing and failovers.",
      whyWrong: [
        { option: "A) Spanning Tree Protocol (STP)", reason: "STP blocks redundant paths to prevent loops; it is not used to aggregate multiple physical connections into a single trunk." },
        { option: "B) Cisco Discovery Protocol (CDP)", reason: "CDP is a proprietary Layer 2 neighbor discovery tool used to map device layouts." },
        { option: "D) Link Layer Discovery Protocol (LLDP)", reason: "LLDP is an open-standard neighbor discovery tool used to advertise capabilities." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q17",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 MDF/IDF",
    question: "A network technician is deploying fiber optic cabling between two IDFs located 450 meters apart. The technician needs to select the appropriate fiber type and transceiver. Which combination supports this distance with multimode fiber?",
    options: [
      "A) Multimode fiber with an SFP+ transceiver (10GBASE-SR)",
      "B) Multimode fiber with an SFP+ transceiver (10GBASE-LR)",
      "C) Multimode fiber with an SFP transceiver (1000BASE-T)",
      "D) Multimode fiber with an SFP transceiver (1000BASE-CX)"
    ],
    correctAnswer: "A) Multimode fiber with an SFP+ transceiver (10GBASE-SR)",
    explanation: {
      whyCorrect: "10GBASE-SR (Short Range) transceivers operate over OM3/OM4 multimode fiber and can reach up to 400-500 meters at 10 Gbps, making it the ideal choice for this IDF uplink.",
      whyWrong: [
        { option: "B) Multimode fiber with an SFP+ transceiver (10GBASE-LR)", reason: "10GBASE-LR is a Long Range standard indicating Single-Mode Fiber (SMF) operations over several kilometers." },
        { option: "C) Multimode fiber with an SFP transceiver (1000BASE-T)", reason: "1000BASE-T operates over twisted-pair copper cables with an RJ-45 interface, limited to a max distance of 100 meters." },
        { option: "D) Multimode fiber with an SFP transceiver (1000BASE-CX)", reason: "1000BASE-CX is a legacy short-haul copper cable standard, not multimode fiber." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q18",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.1 Routing Technologies",
    question: "A network engineer is configuring a new branch office router to connect to the corporate headquarters using a dynamic routing protocol. The engineer wants to ensure that the branch router can automatically learn routes and adapt to network changes without manual intervention. Which protocol features should the engineer look for?",
    options: [
      "A) Static routing configurations with administrative distance limits",
      "B) Dynamic routing with automatic route updates and convergence",
      "C) Port Address Translation (PAT) overload with dynamic IP allocation",
      "D) Policy-based routing maps with hardcoded administrative gates"
    ],
    correctAnswer: "B) Dynamic routing with automatic route updates and convergence",
    explanation: {
      whyCorrect: "Dynamic routing protocols (such as OSPF and BGP) send periodic route updates to neighbors and converge dynamically to handle failures or path changes seamlessly.",
      whyWrong: [
        { option: "A) Static routing configurations with administrative distance limits", reason: "Static routing is entirely manual and does not adapt automatically to failures." },
        { option: "C) Port Address Translation (PAT) overload with dynamic IP allocation", reason: "PAT overload maps ports to hide private networks, completely unrelated to dynamic route learning." },
        { option: "D) Policy-based routing maps with hardcoded administrative gates", reason: "Policy-based routing forces manual packet paths, lacking automatic adaptation." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q19",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.2 Switching Features",
    question: "A network administrator notices that a switch port is showing \"errdisabled\" status. The port is connected to a workstation. What is the most likely cause of this error-disabled state?",
    options: [
      "A) Port security violation",
      "B) Spanning Tree loop detected",
      "C) Standard duplex mismatch",
      "D) Switch port overvoltage"
    ],
    correctAnswer: "A) Port security violation",
    explanation: {
      whyCorrect: "A port security violation (such as receiving more MAC addresses than permitted, or an unauthorized device connecting) puts the switch port into an \"errdisable\" state to protect the network.",
      whyWrong: [
        { option: "B) Spanning Tree loop detected", reason: "STP blocks loop interfaces but maintains \"blocking\" or \"discarding\" states, rather than \"errdisabled\"." },
        { option: "C) Standard duplex mismatch", reason: "Duplex mismatches cause late collisions and performance loss, but they do not shut down ports." },
        { option: "D) Switch port overvoltage", reason: "This describes physical component overloads, which damage components but do not trigger logical \"errdisabled\" software states." }
      ]
    },
    weight: 10
  },
  {
    id: "d2_q20",
    type: "architect",
    domain: "2.0 Implementation",
    objective: "2.3 Wireless Tech",
    question: "A company has deployed wireless access points throughout its office. Users report that when they move from one area to another, their devices disconnect and must manually reconnect to the Wi-Fi network. Which feature is likely misconfigured on the wireless controllers?",
    options: [
      "A) Band steering",
      "B) Roaming",
      "C) Channel bonding",
      "D) SSIDs"
    ],
    correctAnswer: "B) Roaming",
    explanation: {
      whyCorrect: "Wireless roaming allows devices to transition seamlessly from one access point to another under a shared SSID as signal strength changes, without disconnecting.",
      whyWrong: [
        { option: "A) Band steering", reason: "Band steering encourages dual-band devices to connect to the faster 5 GHz frequency instead of 2.4 GHz." },
        { option: "C) Channel bonding", reason: "Channel bonding combines multiple Wi-Fi channels to increase bandwidth, not manage roaming client handovers." },
        { option: "D) SSIDs", reason: "SSIDs are the visible names of the wireless networks, which are identical across an enterprise to support roaming." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q1",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.1 Assets & Lifecycle",
    question: "An administrator is creating an asset inventory. Which two details are most critical to include for every piece of networking hardware to comply with license agreements and ensure supportability over the device's lifespan? Choose two.",
    options: [
      "A) End-of-Life (EOL) date",
      "B) The VLAN assignment",
      "C) Warranty expiration",
      "D) The color of the device"
    ],
    correctAnswer: ["A) End-of-Life (EOL) date","C) Warranty expiration"],
    explanation: {
      whyCorrect: "End-of-Life (EOL) date is critical for tracking when support and firmware patches from the manufacturer will end, and the warranty expiration determines when external replacement support expires, ensuring license compliance and supportability over the device's lifespan.",
      whyWrong: [
        { option: "B) The VLAN assignment", reason: "VLAN assignments are operational network configurations that change frequently and are not core hardware inventory parameters." },
        { option: "D) The color of the device", reason: "The color of the device is purely cosmetic and plays no role in licensing, warranty coverage, or supportability." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q2",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.1 Physical Diagrams",
    question: "A junior network technician needs to quickly understand the physical location of all intermediate distribution frames (IDFs) and how they are cabled back to the main distribution frame (MDF). Which document should the technician reference?",
    options: [
      "A) Logical network diagram",
      "B) Layer 3 topology map",
      "C) Physical cabling map/diagram",
      "D) IP address management (IPAM) records"
    ],
    correctAnswer: "C) Physical cabling map/diagram",
    explanation: {
      whyCorrect: "A physical cabling map or diagram shows the precise physical routing of cables, the physical location of hardware like cabinets and racks (MDF/IDF), and how paths are physically interconnected.",
      whyWrong: [
        { option: "A) Logical network diagram", reason: "A logical network diagram represents how data flows logically through the network (subnets, IPs, trust boundaries) rather than physical location." },
        { option: "B) Layer 3 topology map", reason: "A Layer 3 topology map shows IP subnets, routing interfaces, and paths, not physical room layouts or cabling closet locations." },
        { option: "D) IP address management (IPAM) records", reason: "IPAM records track the allocation and usage of IP subnets and addresses across the enterprise, offering no physical cabling layout." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q3",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.2 Monitoring & SNMP",
    question: "A company's security team has detected an ongoing, low-and-slow network attack. They need to receive real-time notifications from network devices without continuously polling them to avoid alert fatigue. Which SNMP feature should they configure on the managed devices?",
    options: [
      "A) GET request",
      "B) Management Information Base (MIB)",
      "C) Trap",
      "D) Community string"
    ],
    correctAnswer: "C) Trap",
    explanation: {
      whyCorrect: "SNMP Traps are unsolicited, real-time message notifications sent by managed network devices to an SNMP manager upon detecting an event or alarm, letting managers stay informed without resource-heavy active polling.",
      whyWrong: [
        { option: "A) GET request", reason: "GET requests are active polling queries sent from the SNMP manager to a managed device, which consumes continuous bandwidth and resources." },
        { option: "B) Management Information Base (MIB)", reason: "The MIB is a structured directory database containing the specific variables and definitions that can be monitored on a device." },
        { option: "D) Community string", reason: "A community string functions as a simple unencrypted password used to authenticate SNMPv1/v2c queries, rather than send real-time alerts." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q4",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.2 Monitoring & SNMP",
    question: "An organization must meet strict compliance regulations requiring all network monitoring data to be encrypted and authenticated. The current SNMP configuration sends data in plain text. Which version of SNMP should the administrator implement to meet this requirement?",
    options: [
      "A) SNMPv1",
      "B) SNMPv2c",
      "C) SNMPv3",
      "D) SNMPv2 with a complex community string"
    ],
    correctAnswer: "C) SNMPv3",
    explanation: {
      whyCorrect: "SNMPv3 is the only SNMP version that provides cryptographic encryption of diagnostic payloads (ensuring privacy) along with cryptographic authentication (ensuring integrity).",
      whyWrong: [
        { option: "A) SNMPv1", reason: "SNMPv1 is legacy and transmits community strings and data in clear text with zero payload encryption." },
        { option: "B) SNMPv2c", reason: "SNMPv2c adds bulk transfers and informational features, but retains clear text transmissions." },
        { option: "D) SNMPv2 with a complex community string", reason: "A complex community string prevents guessing passwords, but the password is still sent in plaintext, leaving payload data unencrypted." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q5",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.2 Monitoring & Traffic",
    question: "A network administrator needs to capture the complete contents of network traffic, including the payload, to investigate a suspected data exfiltration attempt. Which method should the administrator use?",
    options: [
      "A) NetFlow",
      "B) sFlow",
      "C) SNMP trap",
      "D) Port mirroring with a packet capture tool"
    ],
    correctAnswer: "D) Port mirroring with a packet capture tool",
    explanation: {
      whyCorrect: "Port mirroring sends copies of all frames traversing a switch port directly to a packet captured interface, allowing analyzers (like WireShark or tcpdump) to record and inspect complete packet structures and payloads.",
      whyWrong: [
        { option: "A) NetFlow", reason: "NetFlow is a Cisco metadata collection tool that tracks statistical flow metrics (source, destination, protocol, packet counts) but does not inspect payload contents." },
        { option: "B) sFlow", reason: "sFlow is an industry-standard sampling technology that collects statistical packet samples and metadata, not full payloads." },
        { option: "C) SNMP trap", reason: "SNMP traps are alert logs sent from devices (such as port down) and contain no raw packet data." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q6",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.3 Disaster Recovery",
    question: "A bank's disaster recovery plan specifies a Recovery Point Objective (RPO) of 15 minutes and a Recovery Time Objective (RTO) of 4 hours. The current solution uses an offsite tape backup performed once every 24 hours. Which potential outcome is most likely during a failure scenario?",
    options: [
      "A) Restoration will take more than 4 hours.",
      "B) The bank could lose up to 24 hours of transactions.",
      "C) The bank will fail to meet the RTO but not the RPO.",
      "D) The bank will fail to meet the RPO but not the RTO."
    ],
    correctAnswer: "D) The bank will fail to meet the RPO but not the RTO.",
    explanation: {
      whyCorrect: "The Recovery Point Objective is the maximum age of data that can be lost following a disaster (here, 15 minutes). Backing up only once every 24 hours means up to 24 hours of local database transactions could be lost, failing the RPO.",
      whyWrong: [
        { option: "A) Restoration will take more than 4 hours.", reason: "Nothing in the scenario outlines how long tape physical restoration actually takes, meaning RTO status is unknown." },
        { option: "B) The bank could lose up to 24 hours of transactions.", reason: "While true, this is the business impact resulting from a failure to meet the RPO objective of 15 minutes." },
        { option: "C) The bank will fail to meet the RTO but not the RPO.", reason: "The scenario explicitly shows that the backup frequency (24 hours) is insufficient to meet the aggressive target data loss window (15 minutes), meaning the RPO fails." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q7",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.3 Disaster Recovery",
    question: "A Chief Information Officer (CIO) needs a disaster recovery site that provides a balance between cost and speed of restoration. The requirement is to have equipment, power, and network connectivity pre-installed, but servers will need to be configured and data loaded from backups in the event of a disaster. Which type of disaster recovery site does this describe?",
    options: [
      "A) Cold site",
      "B) Warm site",
      "C) Hot site",
      "D) Cloud site"
    ],
    correctAnswer: "B) Warm site",
    explanation: {
      whyCorrect: "A warm site is a compromise solution where infrastructure, cooling, power, and computing hardware are present and pre-wired, but actual data synchronization, final installations, and setups are performed post-disaster.",
      whyWrong: [
        { option: "A) Cold site", reason: "A cold site provides shell rental facilities (space, HVAC, power) without any server computers or routers pre-provisioned." },
        { option: "C) Hot site", reason: "A hot site is a fully mirrored duplicate facility with online synchronized servers that can take over operations immediately with zero downtime." },
        { option: "D) Cloud site", reason: "Cloud sites are virtual infrastructure layouts that can act as cold, warm, or hot sites, but they are not a distinctive hardware model under this classic typology." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q8",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.2 High Availability",
    question: "A network administrator needs to ensure two firewalls can operate simultaneously, actively processing traffic. If one fails, the other must immediately take over without disruption. Which high-availability approach should the administrator configure?",
    options: [
      "A) Active-Passive",
      "B) Load balancing",
      "C) Active-Active",
      "D) Cold standby"
    ],
    correctAnswer: "C) Active-Active",
    explanation: {
      whyCorrect: "In an Active-Active setup, all nodes in a cluster process production traffic simultaneously, providing load sharing and immediate fault routing if a peer fails.",
      whyWrong: [
        { option: "A) Active-Passive", reason: "Active-Passive maintains a single online gateway while the secondary node sits idle, ready to take over only when the active node goes offline." },
        { option: "B) Load balancing", reason: "Load balancing is a mechanism of traffic distribution but is not the HA cluster configuration itself." },
        { option: "D) Cold standby", reason: "A cold standby is a backup device that is powered down and must be manually booted and configured if a failure occurs." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q9",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.4 DHCP Services",
    question: "A network technician is configuring a DHCP server for a new subnet that does not have a DHCP server. The DHCP server is on a different subnet than the clients. Which feature must be configured on the router to allow DHCP broadcasts to reach the server?",
    options: [
      "A) DHCP exclusion",
      "B) DHCP relay (IP helper)",
      "C) DHCP reservation",
      "D) Scope options"
    ],
    correctAnswer: "B) DHCP relay (IP helper)",
    explanation: {
      whyCorrect: "DHCP relay agents (including Cisco's \"ip helper-address\" interface helper) convert broadcast DHCP messages into unicast frames and route them across the network to a central DHCP server.",
      whyWrong: [
        { option: "A) DHCP exclusion", reason: "An exclusion specifies a range of IP addresses within a pool that the DHCP server must not assign (such as printers)." },
        { option: "C) DHCP reservation", reason: "A reservation anchors a specific IP address to a target device's physical MAC address." },
        { option: "D) Scope options", reason: "Scope options deliver additional parameters (like DNS servers or NTP gateways) to client terminals." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q10",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.4 DNS Records",
    question: "A support technician is troubleshooting an issue where users can access external websites but cannot connect to an internal server named intranet.company.com. Pinging the server by its IP address is successful, but pinging intranet.company.com fails. Which DNS record type is most likely misconfigured or missing on the DNS server?",
    options: [
      "A) PTR record",
      "B) MX record",
      "C) A record",
      "D) TXT record"
    ],
    correctAnswer: "C) A record",
    explanation: {
      whyCorrect: "An Address (A) record maps a friendly hostname (intranet.company.com) to an IPv4 address. If pings to the IP address succeed but pings to the hostname fail, then name-to-address resolution is broken, indicating a missing A record.",
      whyWrong: [
        { option: "A) PTR record", reason: "A Pointer (PTR) record does the reverse mapping (IP address to hostname), used for reverse DNS checks." },
        { option: "B) MX record", reason: "A Mail Exchanger (MX) record points to mail servers handling email transport for the domain." },
        { option: "D) TXT record", reason: "A Text (TXT) record holds administrative strings and verification values like SPF and DKIM profiles." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q11",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.4 DNS Records",
    question: "A junior administrator is configuring a new DNS server for a company's domain. The administrator has added the necessary A and AAAA records for all hosts. Which additional record type must be added to determine the hostnames for a given IP address (reverse lookup)?",
    options: [
      "A) NS",
      "B) CNAME",
      "C) TXT",
      "D) PTR"
    ],
    correctAnswer: "D) PTR",
    explanation: {
      whyCorrect: "Pointer (PTR) records reside within reverse lookup zones, mapping IP addresses back to hostnames to perform reverse DNS queries.",
      whyWrong: [
        { option: "A) NS", reason: "Name Server (NS) records designate the authoritative DNS servers for a specific zone layer." },
        { option: "B) CNAME", reason: "Canonical Name (CNAME) records create aliases pointing to an existing forward looking A record." },
        { option: "C) TXT", reason: "TXT records hold text data (such as SPF rules for email security), not addressing lookup details." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q12",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.4 DNS Security",
    question: "An organization wants to secure DNS queries between its internal clients and the DNS resolver. The goal is to prevent eavesdropping and tampering of DNS traffic. Which two technologies should the organization implement? Choose two.",
    options: [
      "A) DNSSEC",
      "B) DNS over HTTPS (DoH)",
      "C) RARP",
      "D) SLIP"
    ],
    correctAnswer: ["A) DNSSEC","B) DNS over HTTPS (DoH)"],
    explanation: {
      whyCorrect: "DNSSEC signs DNS records cryptographically to prevent tampering and poisoning. DoH encrypts queries using HTTPS (TLS on port 443) to prevent eavesdropping and snooping, satisfying both security requirements.",
      whyWrong: [
        { option: "C) RARP", reason: "Reverse ARP is an obsolete Layer 2 protocol used by diskless workstations to discover their IP addresses." },
        { option: "D) SLIP", reason: "Serial Line Internet Protocol is an obsolete encapsulation protocol for serial links." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q13",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.5 Remote Access",
    question: "A remote salesperson reports that their company-issued laptop works perfectly at the office but, when connected to a hotel Wi-Fi, cannot access any internal corporate resources. The laptop shows a valid IP address and has internet access. Which type of network access method is most likely being used?",
    options: [
      "A) Site-to-site VPN",
      "B) Client-to-site (remote access) VPN not connected",
      "C) DirectAccess",
      "D) Split tunnel VPN"
    ],
    correctAnswer: "B) Client-to-site (remote access) VPN not connected",
    explanation: {
      whyCorrect: "A Client-to-Site (remote access) VPN establishes a secure tunnel from an employee's device back to the enterprise network. If local Wi-Fi works but internal files are blocked, it is because the user has not started or connected their client VPN tunnel.",
      whyWrong: [
        { option: "A) Site-to-site VPN", reason: "A Site-to-Site VPN connects two fixed physical facilities over a gateway, which is not used for individual roaming endpoints." },
        { option: "C) DirectAccess", reason: "DirectAccess establishes an automatic, always-on Microsoft-specific corporate connection that does not require manual user configuration." },
        { option: "D) Split tunnel VPN", reason: "Split tunneling is a VPN configuration setting that controls how traffic is routed and does not explain a complete failure to connect when the VPN client is disconnected." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q14",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.5 Diagnostic Tools",
    question: "A network engineer is troubleshooting a file server that is inaccessible from a remote office. The network path between the two sites is complex and passes through several routers. Which command-line utility should the engineer use to identify where in the network path the failure is occurring?",
    options: [
      "A) netstat",
      "B) ping",
      "C) tracert / traceroute",
      "D) nslookup"
    ],
    correctAnswer: "C) tracert / traceroute",
    explanation: {
      whyCorrect: "Traceroute (tracert on Windows) maps out and prints the full path of router gateways that a packet traverses to reach a destination, showing the latency at each hop and identifying where the connection fails.",
      whyWrong: [
        { option: "A) netstat", reason: "Netstat displays the local computer's active network connections, socket tables, and interface metrics." },
        { option: "B) ping", reason: "Ping verifies end-to-end connectivity but does not identify the specific router/hop where a failure is occurring." },
        { option: "D) nslookup", reason: "Nslookup is used to execute name resolution queries against DNS databases, offering no path diagnostics." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q15",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.5 Secure CLI",
    question: "A network administrator needs to establish an encrypted CLI session to a router's management interface. The router currently has Telnet enabled, but the administrator wants to use a more secure protocol on the same port used for secure SSH communications. Which port does this protocol use?",
    options: [
      "A) 22",
      "B) 23",
      "C) 443",
      "D) 3389"
    ],
    correctAnswer: "A) 22",
    explanation: {
      whyCorrect: "SSH (Secure Shell) provides encrypted command-line terminal management, replacing Telnet, and listens on TCP port 22.",
      whyWrong: [
        { option: "B) 23", reason: "Port 23 is used by Telnet, which operates in plaintext and does not support encryption." },
        { option: "C) 443", reason: "Port 443 is used by HTTPS for web traffic, not standard interactive terminal shells." },
        { option: "D) 3389", reason: "Port 3389 is used by Microsoft Remote Desktop Protocol (RDP) for graphical desktop access." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q16",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.1 Baseline Management",
    question: "A company is implementing a \"golden configuration\" standard for all production switches. Before approving any change, the network team must review and track all modifications, and maintain a repository of all previous configuration versions to allow for rollback. Which process is being described?",
    options: [
      "A) Life-cycle management",
      "B) Configuration management",
      "C) Disaster recovery planning",
      "D) Change management"
    ],
    correctAnswer: "B) Configuration management",
    explanation: {
      whyCorrect: "Configuration Management manages and tracks systems baseline structures (such as a golden config), monitors system changes, and maintains previous config states to support standardized audits and rollbacks.",
      whyWrong: [
        { option: "A) Life-cycle management", reason: "Life-cycle management covers the procurement, active usage, and EOL/deprecating of hardware assets." },
        { option: "C) Disaster recovery planning", reason: "DR planning governs business continuity procedures and operations following outages, not daily device configurations." },
        { option: "D) Change management", reason: "Change management refers to the administrative review and approval workflow for requested modifications, rather than configuring baseline templates." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q17",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.3 Metrics",
    question: "An IT manager is reviewing the disaster recovery plan and notices the MTTR for critical network equipment is 8 hours. What does this value represent?",
    options: [
      "A) The average time a device can be expected to operate before failing",
      "B) The maximum tolerable data loss measured in hours",
      "C) The average time required to repair a failed component",
      "D) The total time required to restore network operations after a disaster"
    ],
    correctAnswer: "C) The average time required to repair a failed component",
    explanation: {
      whyCorrect: "Mean Time To Repair (MTTR) represents the average time required to troubleshoot, fix, and restore a failed hardware device or service code line to active deployment.",
      whyWrong: [
        { option: "A) The average time a device can be expected to operate before failing", reason: "This is Mean Time Between Failures (MTBF)." },
        { option: "B) The maximum tolerable data loss measured in hours", reason: "This is the Recovery Point Objective (RPO)." },
        { option: "D) The total time required to restore network operations after a disaster", reason: "This is the Recovery Time Objective (RTO)." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q18",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.4 Time Protocols",
    question: "A network architect is designing a new network and wants to use a protocol that synchronizes clocks accurately to the sub-microsecond level, which is critical for financial trading systems. Which time protocol should the architect choose to achieve this level of precision?",
    options: [
      "A) Network Time Protocol (NTP)",
      "B) Precision Time Protocol (PTP)",
      "C) Time-to-Live (TTL)",
      "D) Simple Network Time Protocol (SNTP)"
    ],
    correctAnswer: "B) Precision Time Protocol (PTP)",
    explanation: {
      whyCorrect: "Precision Time Protocol (PTP, IEEE 1588) provides sub-microsecond synchronization accuracy, which is required for critical environments like real-time financial trading systems and industrial plants.",
      whyWrong: [
        { option: "A) Network Time Protocol (NTP)", reason: "NTP synchronizes clocks over the wider WAN with millisecond-level precision, which is too coarse for sub-microsecond financial needs." },
        { option: "C) Time-to-Live (TTL)", reason: "TTL is a header field in IP packets used to prevent routing loops by tracking hop counts, completely unrelated to clock synchronization." },
        { option: "D) Simple Network Time Protocol (SNTP)", reason: "SNTP is a simplified, less accurate implementation of NTP designed for low-power endpoints, lacking microsecond support." }
      ]
    },
    weight: 10
  },
  {
    id: "d3_q19",
    type: "architect",
    domain: "3.0 Operations",
    objective: "3.1 Baseline Management",
    question: "During an IT audit, an auditor reviews a network rack diagram created during the initial network deployment three years ago. The diagram is largely inaccurate due to many undocumented changes. Which statement best describes this scenario?",
    options: [
      "A) The configuration has drifted from the baseline.",
      "B) The network suffered a security breach.",
      "C) The disaster recovery plan is insufficient.",
      "D) The change management process failed."
    ],
    correctAnswer: "D) The change management process failed.",
    explanation: {
      whyCorrect: "When network documentation is largely out of sync due to unrecorded modifications and configurations, it indicates that the organizational Change Management process (which mandates testing, approving, and documenting changes) was bypassed or failed.",
      whyWrong: [
        { option: "A) The configuration has drifted from the baseline.", reason: "Configuration drift describes a device's running settings deviating from its golden standard configuration, not documentation errors." },
        { option: "B) The network suffered a security breach.", reason: "Undocumented network improvements and port allocations are of course administrative operational failures, not security breaches." },
        { option: "C) The disaster recovery plan is insufficient.", reason: "The DR plan guides recovery exercises following catastrophic failures and doesn't dictate daily cabling diagram reviews." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q1",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.1 Security Concepts",
    question: "A security auditor recommends implementing a solution that makes a network segment attractive to attackers to identify, monitor, and analyze malicious activity before it reaches production systems. Which deception technology should the organization deploy?",
    options: [
      "A) Honeypot",
      "B) Honeynet",
      "C) Intrusion Detection System (IDS)",
      "D) Screened subnet (DMZ)"
    ],
    correctAnswer: "A) Honeypot",
    explanation: {
      whyCorrect: "A honeypot is a decoy system or network segment designed to attract attackers, allowing security teams to monitor their activities and analyze attack patterns without exposing production systems. A honeypot is listed under deception technologies in Objective 4.1.",
      whyWrong: [
        { option: "B) Honeynet", reason: "Honeynets are networks of honeypots, which are more distributed, rather than a single system/host deception decoy described here." },
        { option: "C) Intrusion Detection System (IDS)", reason: "IDS detects malicious actions rather than explicitly deceiving or attracting attackers." },
        { option: "D) Screened subnet (DMZ)", reason: "A screened subnet is designed for legitimate public access to corporate web services, not as an attractive attacking decoy." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q2",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.3 Hardening",
    question: "A network administrator needs to enforce network access control for all devices connecting to the wired network. The solution must authenticate devices using certificates before granting access to the network. Which IEEE standard and protocol combination should the administrator implement?",
    options: [
      "A) MAC filtering with WPA2",
      "B) Port security with sticky MACs",
      "C) 802.1X with EAP",
      "D) 802.11 with WPA3"
    ],
    correctAnswer: "C) 802.1X with EAP",
    explanation: {
      whyCorrect: "802.1X is the IEEE standard for port-based network access control (NAC), typically using EAP (Extensible Authentication Protocol) to authenticate devices with certificates before granting network access.",
      whyWrong: [
        { option: "A) MAC filtering with WPA2", reason: "MAC filtering is less secure, and WPA2 is a wireless security standard, not wired access control." },
        { option: "B) Port security with sticky MACs", reason: "Port security with sticky MACs limits port access to configured MAC addresses, but does not authenticate devices using certificates." },
        { option: "D) 802.11 with WPA3", reason: "802.11 is a wireless protocol and WPA3 is for wireless security, not wired NAC." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q3",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.1 Security Concepts",
    question: "An organization is implementing a security policy requiring users to provide a password and a one-time code from an authenticator app when logging into the corporate VPN. Which two authentication factors are being used?",
    options: [
      "A) Something you know + something you are",
      "B) Something you know + something you have",
      "C) Something you have + somewhere you are",
      "D) Something you are + somewhere you are"
    ],
    correctAnswer: "B) Something you know + something you have",
    explanation: {
      whyCorrect: "A password is \"something you know\" (knowledge factor), and a one-time code from an authenticator app is \"something you have\" (possession factor). Multifactor authentication (MFA) requires at least two different factor types.",
      whyWrong: [
        { option: "A) Something you know + something you are", reason: "\"Something you are\" refers to biometrics (e.g., fingerprints), which is not used here." },
        { option: "C) Something you have + somewhere you are", reason: "\"Somewhere you are\" refers to geolocation, which is not used in this scenario." },
        { option: "D) Something you are + somewhere you are", reason: "Neither biometric attributes nor geolocation are mentioned in this scenario." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q4",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.1 Security Concepts",
    question: "A company wants to implement Single Sign-On (SSO) across multiple cloud applications and on-premises systems. The solution must exchange authentication and authorization data between identity providers and service applications using XML-based assertions. Which protocol should be implemented?",
    options: [
      "A) RADIUS",
      "B) TACACS+",
      "C) LDAP",
      "D) SAML (Security Assertion Markup Language)"
    ],
    correctAnswer: "D) SAML (Security Assertion Markup Language)",
    explanation: {
      whyCorrect: "SAML is an XML-based protocol that exchanges authentication and authorization data between identity providers and service providers, commonly used for SSO across applications and systems.",
      whyWrong: [
        { option: "A) RADIUS", reason: "RADIUS is an authentication protocol typically used for network device administrative access and VPN connections, not XML-based app SSO." },
        { option: "B) TACACS+", reason: "TACACS+ is a Cisco-proprietary AAA protocol used for administration of network devices (CLI access), not web app SSO." },
        { option: "C) LDAP", reason: "LDAP is an active directory querying protocol used to query directory services, not XML-based application-level assertions." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q5",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.2 Common Attacks",
    question: "A network security analyst detects an attack where an unauthorized device is sending falsified messages to associate its MAC address with a legitimate IP address on the local network. This is causing traffic intended for the legitimate host to be redirected to the attacker's machine. Which type of attack is occurring?",
    options: [
      "A) ARP poisoning/spoofing",
      "B) DNS poisoning",
      "C) VLAN hopping",
      "D) MAC flooding"
    ],
    correctAnswer: "A) ARP poisoning/spoofing",
    explanation: {
      whyCorrect: "ARP poisoning occurs when an attacker sends falsified ARP messages linking their MAC address to a legitimate IP address, causing traffic to be redirected to the attacker's machine.",
      whyWrong: [
        { option: "B) DNS poisoning", reason: "DNS poisoning attacks the DNS name resolution system to redirect domain requests, not local IP-to-MAC resolution." },
        { option: "C) VLAN hopping", reason: "VLAN hopping enables an attacker on one VLAN to bypass isolation and access traffic on other VLANs, not rewrite local IP mappings." },
        { option: "D) MAC flooding", reason: "MAC flooding floods a switch's MAC table to turn it into a hub, failing open and letting the attacker sniff all local traffic." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q6",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.3 Hardening",
    question: "An organization wants to secure DNS traffic between its internal clients and recursive resolvers to prevent eavesdropping and tampering. The solution must encrypt the entire DNS query and response payload. Which two technologies meet this requirement?",
    options: [
      "A) DNSSEC and RARP",
      "B) DNS over HTTPS (DoH) and DNS over TLS (DoT)",
      "C) DNSSEC and SLIP",
      "D) RARP and SLIP"
    ],
    correctAnswer: "B) DNS over HTTPS (DoH) and DNS over TLS (DoT)",
    explanation: {
      whyCorrect: "Both DoH (port 443) and DoT (port 853) encrypt DNS queries and responses to prevent eavesdropping and tampering.",
      whyWrong: [
        { option: "A) DNSSEC and RARP", reason: "DNSSEC provides integrity/authentication but not transaction encryption, and RARP is an obsolete ARP variant." },
        { option: "C) DNSSEC and SLIP", reason: "DNSSEC lacks encryption, and SLIP is a historic legacy serial-line encapsulation protocol." },
        { option: "D) RARP and SLIP", reason: "Both represent legacy unencrypted protocols with nothing to do with DNS security." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q7",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.3 Hardening",
    question: "A security administrator is configuring a firewall to protect a screened subnet (DMZ) that contains public-facing web servers. The DMZ network uses private IP addresses, and the firewall translates these to public IPs for internet traffic. The administrator needs to allow HTTPS traffic from the internet to the web server on the DMZ. Which security rule should the administrator configure?",
    options: [
      "A) Web Application Proxy routing port 80 to the DMZ web server",
      "B) Access Control List (ACL) permitting port 443 from any to the DMZ web server IP",
      "C) Source Network Address Translation (SNAT) mapping port 443",
      "D) A decoy honeypot filter on the inbound DMZ interface"
    ],
    correctAnswer: "B) Access Control List (ACL) permitting port 443 from any to the DMZ web server IP",
    explanation: {
      whyCorrect: "An ACL on the firewall controls traffic flow. HTTPS uses port 443. The DMZ needs inbound HTTPS access from the internet to the web server.",
      whyWrong: [
        { option: "A) Web Application Proxy routing port 80 to the DMZ web server", reason: "Port 80 is for HTTP (unencrypted), not HTTPS (encrypted, port 443)." },
        { option: "C) Source Network Address Translation (SNAT) mapping port 443", reason: "SNAT changes the source IP for outbound traffic; it does not authorize inbound traffic to the web server." },
        { option: "D) A decoy honeypot filter on the inbound DMZ interface", reason: "A honeypot is a decoy deception system, not a firewall filter rule meant for production traffic." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q8",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.2 Common Attacks",
    question: "An attacker sets up a rogue access point with a stronger signal than the legitimate corporate access point. When employees' devices automatically connect to the stronger signal, the attacker captures their credentials. Which type of attack is this?",
    options: [
      "A) Evil twin",
      "B) Denial of service",
      "C) ARP poisoning",
      "D) Deauthentication attack"
    ],
    correctAnswer: "A) Evil twin",
    explanation: {
      whyCorrect: "An evil twin attack involves setting up a rogue access point that mimics a legitimate AP, often with a stronger signal, to trick devices into connecting and capture credentials.",
      whyWrong: [
        { option: "B) Denial of service", reason: "A DoS attack disrupts networks/services but does not actively masquerade as a wireless access point to sniff data." },
        { option: "C) ARP poisoning", reason: "ARP poisoning is a Layer 2 attack on wired local networks, not a wireless access point spoofing technique." },
        { option: "D) Deauthentication attack", reason: "A deauthentication attack forces clients off an AP but does not mimic the AP to capture user credentials." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q9",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.2 Common Attacks",
    question: "A network engineer is reviewing security logs and notices an unusual pattern of traffic where a single source IP address is sending a flood of UDP packets to random destination ports on a single target server. The server is consuming all its resources trying to process these packets, making it unresponsive to legitimate requests. Which type of attack is occurring?",
    options: [
      "A) ARP poisoning",
      "B) DNS poisoning",
      "C) DoS (Denial-of-Service) attack",
      "D) Man-in-the-middle attack"
    ],
    correctAnswer: "C) DoS (Denial-of-Service) attack",
    explanation: {
      whyCorrect: "A DoS attack floods a target with traffic or packets, consuming resources and making the target unresponsive to legitimate requests.",
      whyWrong: [
        { option: "A) ARP poisoning", reason: "ARP poisoning redirects LAN switch paths, and does not involve flooding a host with high-rate UDP client requests." },
        { option: "B) DNS poisoning", reason: "DNS poisoning corrupts cache entries of resolving servers to divert names, rather than depleting resources via high-traffic UDP floods." },
        { option: "D) Man-in-the-middle attack", reason: "A MITM attack intercepts or modifies active data in transit, and represents an interception tactic rather than a service-denying resource depletion flood." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q10",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.1 Security Concepts",
    question: "A small business needs to implement network segmentation to separate guest Wi-Fi traffic from internal corporate traffic. The business has a single internet connection and wants to use its existing router/firewall. Which solution should the business implement?",
    options: [
      "A) Physical segmentation with redundant switches and dedicated lines",
      "B) VLAN with separate subnet and firewall rules",
      "C) SD-WAN with dynamic WAN VPN tunnels",
      "D) BYOD quarantine group policies"
    ],
    correctAnswer: "B) VLAN with separate subnet and firewall rules",
    explanation: {
      whyCorrect: "VLANs create logical segmentation on a single switch, and firewall rules control traffic between VLANs. This allows guest Wi-Fi to be isolated from internal corporate traffic using existing equipment.",
      whyWrong: [
        { option: "A) Physical segmentation with redundant switches and dedicated lines", reason: "This is expensive, completely redundant, and unnecessary since existing switches can implement logical isolation." },
        { option: "C) SD-WAN with dynamic WAN VPN tunnels", reason: "SD-WAN manages branch WAN connections and is not used to partition internal guest WLAN from corporate hosts." },
        { option: "D) BYOD quarantine group policies", reason: "Device quarantine policies are part of endpoint health evaluations, not general logical LAN routing isolation." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q11",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.1 Security Concepts",
    question: "A company is implementing a \"zero trust\" security model. The principle requires that no user or device is trusted by default, even if they are inside the corporate network. Which access control approach enforces this principle?",
    options: [
      "A) Least privilege access",
      "B) Multi-Factor Authentication (MFA)",
      "C) Role-Based Access Control (RBAC)",
      "D) CIA Triad"
    ],
    correctAnswer: "A) Least privilege access",
    explanation: {
      whyCorrect: "The least privilege principle grants users and devices only the minimum permissions necessary to perform their functions, which is a core tenet of zero trust architecture.",
      whyWrong: [
        { option: "B) Multi-Factor Authentication (MFA)", reason: "MFA validates user identity using multiple credential types but is an authentication tool, not the core access rule itself." },
        { option: "C) Role-Based Access Control (RBAC)", reason: "RBAC maps permission privileges to static organizational roles, but does not enforce continuous location-independent zero trust rules." },
        { option: "D) CIA Triad", reason: "The CIA triad is a structural model of security goals (Confidentiality, Integrity, Availability), not an access control mechanism." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q12",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.3 Hardening",
    question: "A network administrator is hardening a newly deployed switch. The administrator wants to prevent unauthorized devices from connecting to specific switch ports by limiting the number of MAC addresses allowed per port. Which feature should the administrator configure?",
    options: [
      "A) 802.1X",
      "B) Screened subnet",
      "C) Port security",
      "D) MAC filtering"
    ],
    correctAnswer: "C) Port security",
    explanation: {
      whyCorrect: "Port security limits the number of MAC addresses allowed on a switch port, preventing unauthorized devices from connecting.",
      whyWrong: [
        { option: "A) 802.1X", reason: "802.1X provides port-based authentication using certificates/accounts, not basic MAC address number boundaries." },
        { option: "B) Screened subnet", reason: "A screened subnet is a perimeter DMZ zone for public servers, not a switch-port hardening capability." },
        { option: "D) MAC filtering", reason: "MAC filtering allows or blocks specific configured MAC addresses, but does not natively enforce port-level concurrent count limits like switchport port-security." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q13",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.1 Security Concepts",
    question: "An organization must comply with regulations requiring that all customer payment card data be protected both when stored on servers and when transmitted over networks. The organization deploys encryption solutions. Which two encryption use cases does this scenario describe?",
    options: [
      "A) Data at rest and data in transit",
      "B) Data in use and the CIA triad",
      "C) Public key infrastructure and symmetric hashing",
      "D) Symmetric encryption and asymmetric signatures"
    ],
    correctAnswer: "A) Data at rest and data in transit",
    explanation: {
      whyCorrect: "Data at rest is stored data (on servers), protected by disk or database encryption. Data in transit is data moving across networks, protected by TLS, IPsec, or other encryption protocols.",
      whyWrong: [
        { option: "B) Data in use and the CIA triad", reason: "Data in use represents active CPU-memory operations, and CIA represents general security objectives, not stored/transit data encryption cases." },
        { option: "C) Public key infrastructure and symmetric hashing", reason: "PKI governs certificate issuance, and symmetric hashing validates integrity; they do not represent stored vs network-transmitted protection targets." },
        { option: "D) Symmetric encryption and asymmetric signatures", reason: "These represent mathematical cryptographic categories, not data protection status environments." }
      ]
    },
    weight: 10
  },
  {
    id: "d4_q14",
    type: "architect",
    domain: "4.0 Security",
    objective: "4.2 Common Attacks",
    question: "A security analyst discovers an employee wrote their password on a sticky note attached to their monitor. Another employee took a photo of that sticky note with their smartphone from across the room. Which social engineering technique did the second employee use?",
    options: [
      "A) Phishing",
      "B) Tailgating",
      "C) Dumpster diving",
      "D) Shoulder surfing"
    ],
    correctAnswer: "D) Shoulder surfing",
    explanation: {
      whyCorrect: "Shoulder surfing involves looking over someone's shoulder or monitoring their physical screen/surrounds to obtain confidential information, such as passwords or PINs.",
      whyWrong: [
        { option: "A) Phishing", reason: "Phishing uses fraudulent digital communications (like spoofed emails) to harvest info, not physical surveillance." },
        { option: "B) Tailgating", reason: "Tailgating is physically following an unauthorized individual through a locked doorway, not visual data harvesting." },
        { option: "C) Dumpster diving", reason: "Dumpster diving is searching discarded trash bins to find valuable corporate info." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q1",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.1 Troubleshooting Methodology",
    question: "A network technician is following CompTIA's troubleshooting methodology. The technician has gathered information, identified symptoms, and determined that nothing has changed on the network. What is the NEXT step the technician should take?",
    options: [
      "A) Establish a theory of probable cause",
      "B) Test the theory to determine cause",
      "C) Establish a plan of action to resolve the problem",
      "D) Verify full system functionality"
    ],
    correctAnswer: "A) Establish a theory of probable cause",
    explanation: {
      whyCorrect: "The CompTIA troubleshooting methodology has seven steps. After identifying the problem (gathering information, questioning users, identifying symptoms, and determining changes), the next step is to establish a theory of probable cause.",
      whyWrong: [
        { option: "B) Test the theory to determine cause", reason: "This is the step after establishing your theory of probable cause." },
        { option: "C) Establish a plan of action to resolve the problem", reason: "You only establish a plan of action once the theory has been tested and confirmed." },
        { option: "D) Verify full system functionality", reason: "Verification of stability comes after the solution has been fully implemented." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q2",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.1 Troubleshooting Methodology",
    question: "After implementing a solution to resolve a network outage, a technician confirms that all users can now access the required resources. According to CompTIA's troubleshooting methodology, what should the technician do NEXT?",
    options: [
      "A) Escalate the problem",
      "B) Establish a plan of action to resolve the problem",
      "C) Document findings, actions, outcomes, and lessons learned",
      "D) Test the theory to determine cause"
    ],
    correctAnswer: "C) Document findings, actions, outcomes, and lessons learned",
    explanation: {
      whyCorrect: "After implementing a solution and verifying full system functionality, the final step in CompTIA's methodology is documentation. This completes the troubleshooting process and helps build organizational knowledge for future incidents.",
      whyWrong: [
        { option: "A) Escalate the problem", reason: "Escalation occurs during testing if the solution is unproved or requires external permissions, not after verified success." },
        { option: "B) Establish a plan of action to resolve the problem", reason: "A plan of action is established before implementing a solution, not after the solution has been resolved." },
        { option: "D) Test the theory to determine cause", reason: "Testing theories is a precursor step that comes before implementing and verifying a fix." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q3",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.1 Troubleshooting Methodology",
    question: "A network administrator is troubleshooting a slow network and compares current throughput test results to documented baseline measurements. In which step of the troubleshooting methodology would this action most likely occur?",
    options: [
      "A) Identify the problem",
      "B) Establish a theory of probable cause",
      "C) Verify full system functionality",
      "D) Document findings, actions, and outcomes"
    ],
    correctAnswer: "C) Verify full system functionality",
    explanation: {
      whyCorrect: "In the troubleshooting methodology, verifying full system functionality is the sixth step, after implementing the solution. Comparing current performance to a documented baseline confirms the fix resolved the issue and performance has returned to normal levels.",
      whyWrong: [
        { option: "A) Identify the problem", reason: "Identifying the problem is the first step where symptoms are gathered, not where post-resolution baseline checks occur." },
        { option: "B) Establish a theory of probable cause", reason: "Establishing a theory is step two, focusing on determining reasons before testing them." },
        { option: "D) Document findings, actions, and outcomes", reason: "Documenting findings is the final step, done after verifying functional system operations." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q4",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Command-line Utilities",
    question: "A help desk technician receives a report that users cannot access internet URLs. The technician performs ping tests and finds that sites fail when a URL is used but succeed when the IP address is used. Which of the following tools should the technician utilize NEXT?",
    options: [
      "A) ping",
      "B) tracert",
      "C) netstat",
      "D) nslookup"
    ],
    correctAnswer: "D) nslookup",
    explanation: {
      whyCorrect: "Since IP-based connections succeed but domain name-based ones fail, the issue is clearly related to DNS resolution. nslookup (or dig) is the appropriate tool to query DNS servers and verify name resolution.",
      whyWrong: [
        { option: "A) ping", reason: "Ping was already used to verify Layer 3 connectivity. Repeating it will not solve the name resolution issue." },
        { option: "B) tracert", reason: "Tracert isolates routing hops, but Layer 3 transport to final IPs has already been verified as working." },
        { option: "C) netstat", reason: "Netstat displays active workstation sockets, which does not troubleshoot recursive DNS name server resolutions." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q5",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.3 Local Network Issues",
    question: "A network engineer is installing new PoE wireless access points. The first five APs deploy successfully, but the sixth one fails to power on. Which of the following should the engineer investigate FIRST?",
    options: [
      "A) SSID mismatch configuration",
      "B) Power budget on the switch",
      "C) Antenna polarization limits",
      "D) Duplex mismatch errors"
    ],
    correctAnswer: "B) Power budget on the switch",
    explanation: {
      whyCorrect: "When deploying multiple PoE devices, the switch's power budget can be exhausted. If the available wattage cannot supply the additional AP, it will fail to power on. This is the most likely cause when previous APs worked but a new one does not.",
      whyWrong: [
        { option: "A) SSID mismatch configuration", reason: "SSID settings dictate client login negotiations, not low-level physical AP bootup power." },
        { option: "C) Antenna polarization limits", reason: "Polarization impacts wireless signaling and signal alignment, unrelated to PoE wattage." },
        { option: "D) Duplex mismatch errors", reason: "Duplex mismatches affect link speeds and packet transmission efficiency, not basic power enablement." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q6",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.2 Cable Issues",
    question: "A network administrator installs new cabling to connect new computers and access points. After deploying the equipment, the administrator notices several devices are not connecting properly. Moving the devices to different ports does not resolve the issue. Which of the following should the administrator verify NEXT?",
    options: [
      "A) Cable termination",
      "B) Power budget on the switch",
      "C) Port duplex settings",
      "D) DHCP address pools"
    ],
    correctAnswer: "A) Cable termination",
    explanation: {
      whyCorrect: "Since new cabling was installed and moving devices to different ports didn't fix the issue, the physical layer is the most likely culprit. Incorrect terminations (bad punchdowns, reversed pairs, split pairs) will cause connectivity issues regardless of port.",
      whyWrong: [
        { option: "B) Power budget on the switch", reason: "Power budgets affect PoE bootup, not general link transitions on newly run cables." },
        { option: "C) Port duplex settings", reason: "Duplex settings might degrade speeds, but would not prevent simple link connection states across multiple ports." },
        { option: "D) DHCP address pools", reason: "Full pools cause IP assignment failures, but physical copper links would still register as connected on the switch ports." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q7",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.3 Local Network Issues",
    question: "A database server cannot connect to the network, and the switch interface shows the status as \"Administratively down.\" Which of the following is the most likely reason for this status?",
    options: [
      "A) A faulty or disconnected Ethernet cable",
      "B) An administrator has manually disabled (shutdown) the interface",
      "C) A mismatch in speed and duplex settings",
      "D) A broadcast storm has disabled the port"
    ],
    correctAnswer: "B) An administrator has manually disabled (shutdown) the interface",
    explanation: {
      whyCorrect: "\"Administratively down\" is a specific interface status that indicates an administrator has manually disabled the interface using the shutdown command.",
      whyWrong: [
        { option: "A) A faulty or disconnected Ethernet cable", reason: "Physical disconnection shows as \"Down/Down\" or \"No Link\", not \"Administratively down\"." },
        { option: "C) A mismatch in speed and duplex settings", reason: "Mismatches trigger transmission errors but do not mark interface status as administratively disabled." },
        { option: "D) A broadcast storm has disabled the port", reason: "A loop-disabled port shows up as \"err-disabled\", which requires recovery, not administrative shutdown status." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q8",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.2 Cable Issues",
    question: "A network technician notices that the interface counters on a switch port show a large number of CRC errors. The port is connected to a server. What is the most likely cause of these errors?",
    options: [
      "A) Excessive multicast traffic on the local subnet",
      "B) An active DoS attack targeting the port",
      "C) Faulty cabling or improper termination causing signal corruption",
      "D) Jumbo frames configured with mismatched MTU sizes"
    ],
    correctAnswer: "C) Faulty cabling or improper termination causing signal corruption",
    explanation: {
      whyCorrect: "CRC (Cyclic Redundancy Check) errors indicate that frames are being corrupted during transmission, most commonly due to faulty cabling, improper termination, electromagnetic interference (EMI), or duplex mismatches.",
      whyWrong: [
        { option: "A) Excessive multicast traffic on the local subnet", reason: "High multicast traffic uses bandwidth but does not alter Frame Check Sequence mathematical validations." },
        { option: "B) An active DoS attack targeting the port", reason: "DoS floods ports but does not cause hardware-level CRC checksum verification failures." },
        { option: "D) Jumbo frames configured with mismatched MTU sizes", reason: "Incompatible MTUs cause \"giant\" packet drops or fragmentation, not cyclic frame errors." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q9",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.3 Local Network Issues",
    question: "Users on the same switch but in different VLANs cannot communicate with each other. The switch is a Layer 2 switch only. What is the most likely cause of this issue?",
    options: [
      "A) Inter-VLAN routing requires a Layer 3 device, which is not present",
      "B) Spanning Tree Protocol (STP) is blocking the ports",
      "C) The ports are configured with mismatched VLAN tags",
      "D) Ports cannot be assigned to different VLANs on a single Layer 2 switch"
    ],
    correctAnswer: "A) Inter-VLAN routing requires a Layer 3 device, which is not present",
    explanation: {
      whyCorrect: "VLANs operate at Layer 2 and separate broadcast domains. Devices in different VLANs cannot communicate without a Layer 3 device (router or Layer 3 switch) to route traffic between them.",
      whyWrong: [
        { option: "B) Spanning Tree Protocol (STP) is blocking the ports", reason: "STP blocks ports to prevent switching loops within a VLAN, not inter-VLAN communications." },
        { option: "C) The ports are configured with mismatched VLAN tags", reason: "Tagging mismatches can cause VLAN dropping, but crossing distinct broadcast domains inherently requires an IP router." },
        { option: "D) Ports cannot be assigned to different VLANs on a single Layer 2 switch", reason: "Layer 2 switches fully support configuring ports across multiple distinct VLANs." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q10",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.3 Local Network Issues",
    question: "A network administrator is troubleshooting an issue where a workstation has been assigned an APIPA address (169.254.x.x). Which service is most likely failing?",
    options: [
      "A) DNS (Domain Name System)",
      "B) DHCP (Dynamic Host Configuration Protocol)",
      "C) LDAP (Lightweight Directory Access Protocol)",
      "D) NAT (Network Address Translation)"
    ],
    correctAnswer: "B) DHCP (Dynamic Host Configuration Protocol)",
    explanation: {
      whyCorrect: "APIPA (Automatic Private IP Addressing) assigns addresses in the 169.254.x.x range when a DHCP server is unavailable. The client fails to receive a DHCP lease and self-assigns an APIPA address.",
      whyWrong: [
        { option: "A) DNS (Domain Name System)", reason: "DNS maps names to IPs and is not involved in assigning client system IP address leases." },
        { option: "C) LDAP (Lightweight Directory Access Protocol)", reason: "LDAP is an authentication directory service and does not allocate IP address parameters." },
        { option: "D) NAT (Network Address Translation)", reason: "NAT translates router IPs at the WAN interface, and is irrelevant to local DHCP leasing states." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q11",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.3 Local Network Issues",
    question: "A network technician suspects that a switching loop is causing a broadcast storm. Which of the following symptoms would most likely confirm this suspicion?",
    options: [
      "A) High packet retransmissions at Layer 4 (TCP)",
      "B) Heavy traffic on port 53 (DNS)",
      "C) Constant interface transitions from up to down (flapping)",
      "D) Rapidly increasing MAC address table entries and high CPU utilization on switches"
    ],
    correctAnswer: "D) Rapidly increasing MAC address table entries and high CPU utilization on switches",
    explanation: {
      whyCorrect: "Switching loops cause broadcast storms where frames loop indefinitely, flooding the MAC address table and consuming switch CPU resources. Spanning Tree Protocol (STP) is designed to prevent loops.",
      whyWrong: [
        { option: "A) High packet retransmissions at Layer 4 (TCP)", reason: "TCP retransmissions occur due to standard packet loss or congestion, not Layer 2 Ethernet loop storms." },
        { option: "B) Heavy traffic on port 53 (DNS)", reason: "DNS volume reflects high query traffic but does not affect the physical switching loop environment." },
        { option: "C) Constant interface transitions from up to down (flapping)", reason: "Flapping links indicate poor physical cables, not frame loops on the local VLAN topology." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q12",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.3 Local Network Issues",
    question: "A network administrator notices that the root bridge for Spanning Tree Protocol has changed to a different switch after a recent power outage. Which of the following is the most likely cause?",
    options: [
      "A) The previous root bridge had a higher bridge priority value (lower priority) than the new root bridge",
      "B) The previous root bridge was physically disconnected from all other switches",
      "C) The new root bridge was configured with a higher MAC address",
      "D) Spanning Tree Protocol was disabled on the previous root bridge"
    ],
    correctAnswer: "A) The previous root bridge had a higher bridge priority value (lower priority) than the new root bridge",
    explanation: {
      whyCorrect: "STP selects the root bridge based on the lowest bridge priority (numerically smaller = higher priority) and then lowest MAC address. If the previous root bridge had a higher priority value (meaning less priority/less trusted), and came back up after an outage, some other switch with a lower priority value would remain or become the root bridge.",
      whyWrong: [
        { option: "B) The previous root bridge was physically disconnected from all other switches", reason: "Physical disconnection switches routes, but does not configure priority parameters governing bridge selection." },
        { option: "C) The new root bridge was configured with a higher MAC address", reason: "Lower MAC addresses are elected as a tiebreaker when bridge priorities are identical." },
        { option: "D) Spanning Tree Protocol was disabled on the previous root bridge", reason: "Disabling STP stops active loop boundaries but is not a normal cause of controlled root bridge re-election." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q13",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.4 Wireless & WAN Performance",
    question: "Users report that videoconferencing applications are experiencing choppy audio and frozen video. The network shows normal bandwidth utilization but high variation in packet arrival times. Which performance issue is most likely causing this problem?",
    options: [
      "A) High latency",
      "B) Packet loss",
      "C) Jitter",
      "D) Duplex mismatch"
    ],
    correctAnswer: "C) Jitter",
    explanation: {
      whyCorrect: "Jitter is the variation in packet arrival times, which severely impacts real-time applications like VoIP and videoconferencing, causing choppy audio and frozen video. Bandwidth utilization may appear normal.",
      whyWrong: [
        { option: "A) High latency", reason: "Latency is a consistent delay in data packet delivery, not the packet-to-packet arrival time variation described." },
        { option: "B) Packet loss", reason: "Packet loss reflects complete transport delivery failures, rather than variable delivery arrival timing." },
        { option: "D) Duplex mismatch", reason: "Duplex mismatches cause slow data rates and collides, drastically degrading basic link bandwidth limits." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q14",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.4 Wireless Issues",
    question: "A network administrator is troubleshooting a wireless network where users report frequent disconnections even when standing still. The access points are configured to automatically select channels. The logs show APs are frequently changing channels. What is the most likely cause?",
    options: [
      "A) Roaming failure",
      "B) Channel interference",
      "C) Low signal-to-noise ratio (SNR)",
      "D) Overloaded AP bandwidth pools"
    ],
    correctAnswer: "B) Channel interference",
    explanation: {
      whyCorrect: "When APs automatically change channels frequently, channel interference from neighboring access points or other RF devices is the likely cause. The logs show APs are changing channels, and the symptom occurs when stationary — not a roaming issue.",
      whyWrong: [
        { option: "A) Roaming failure", reason: "Roaming failures happen when shifting between cells, not when users are completely stationary." },
        { option: "C) Low signal-to-noise ratio (SNR)", reason: "Low SNR degrades signal quality but does not cause continuous automated AP channel hopping." },
        { option: "D) Overloaded AP bandwidth pools", reason: "Congestion slows connections but does not force the AP software logic to shift radio channels." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q15",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.4 Wireless Issues",
    question: "A technician is troubleshooting a wireless connectivity issue in a large office building. Users report that when they move from one area to another, their devices disconnect and must manually reconnect to the Wi-Fi network. Which feature is most likely misconfigured?",
    options: [
      "A) Roaming",
      "B) DFS (Dynamic Frequency Selection)",
      "C) Band steering",
      "D) MIMO antenna alignment"
    ],
    correctAnswer: "A) Roaming",
    explanation: {
      whyCorrect: "Roaming allows wireless clients to move between APs without disconnecting or re-authenticating. Roaming misconfiguration means when users move, their devices must manually reconnect.",
      whyWrong: [
        { option: "B) DFS (Dynamic Frequency Selection)", reason: "DFS manages radar channel avoidance, not transit client movement across adjacent AP cells." },
        { option: "C) Band steering", reason: "Band steering steers devices to 5 GHz from 2.4 GHz, unrelated to physical movement across multiple access points." },
        { option: "D) MIMO antenna alignment", reason: "MIMO scales maximum single AP link capacities and does not coordinate moving client handshakes." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q16",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Command-line Utilities",
    question: "A user cannot access an external server after connecting to the corporate VPN. Which two commands should a support agent use to examine this issue? (Choose two.)",
    options: [
      "A) tracert",
      "B) nslookup",
      "C) route print",
      "D) netstat"
    ],
    correctAnswer: ["A) tracert","C) route print"],
    explanation: {
      whyCorrect: "When a user connects to a VPN and loses access to external sites, two common problems occur: the VPN overwrote the routing table (use route print) or changed DNS servers (use tracert to see where traffic stops). These two commands help diagnose split tunnel vs. full tunnel issues in VPN troubleshooting.",
      whyWrong: [
        { option: "B) nslookup", reason: "Nslookup validates DNS records but cannot output the local host routing table layers." },
        { option: "D) netstat", reason: "Netstat lists active ethernet card sockets, which is insufficient for diagnosing full vs. split tunnel routing table entries." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q17",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Command-line Utilities",
    question: "A network technician needs to examine the path a packet takes from a workstation to a remote web server, identifying each router hop along the way. Which command-line tool should the technician use?",
    options: [
      "A) ping",
      "B) tracert / traceroute",
      "C) nslookup",
      "D) netstat"
    ],
    correctAnswer: "B) tracert / traceroute",
    explanation: {
      whyCorrect: "tracert (Windows) or traceroute (Linux/macOS) traces the path packets take to a destination by sending ICMP packets with incrementing TTL values and reporting each hop's response. This tool uses ICMP time to live exceeded messages to map the route.",
      whyWrong: [
        { option: "A) ping", reason: "Ping measures basic end-to-end host reachability but cannot show intermediate routing paths." },
        { option: "C) nslookup", reason: "Nslookup queries DNS servers for records, not transit Layer 3 route paths." },
        { option: "D) netstat", reason: "Netstat displays open ports and networking adapter statistics on the local system." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q18",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Command-line Utilities",
    question: "A network administrator needs to view the current MAC address table on a switch to verify which devices are connected to specific ports. Which command should the administrator use?",
    options: [
      "A) show interface status",
      "B) show ip route",
      "C) show arp",
      "D) show mac-address-table"
    ],
    correctAnswer: "D) show mac-address-table",
    explanation: {
      whyCorrect: "The show mac-address-table command displays the switch's MAC address table, showing which MAC addresses are associated with which ports. This is a basic networking device command listed in Objective 5.5.",
      whyWrong: [
        { option: "A) show interface status", reason: "This displays physical port activity details, but omits the switch's active MAC association mappings." },
        { option: "B) show ip route", reason: "This outputs Layer 3 router path directories, not Layer 2 switch forwarding tables." },
        { option: "C) show arp", reason: "This lists local IP-to-MAC resolutions of the router itself, not the switch's transparent bridging tables." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q19",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Command-line Utilities",
    question: "A technician suspects that a device on the local network has an incorrect or static ARP entry causing connectivity issues. Which command should the technician use to view the current ARP cache?",
    options: [
      "A) ipconfig /all",
      "B) netstat -r",
      "C) arp -a",
      "D) route print"
    ],
    correctAnswer: "C) arp -a",
    explanation: {
      whyCorrect: "The arp -a command displays the current ARP cache, showing IP-to-MAC address mappings. This is useful for verifying ARP entries when suspected ARP issues exist.",
      whyWrong: [
        { option: "A) ipconfig /all", reason: "This lists local adapter IP/DNS parameters rather than showing neighboring LAN ARP caches." },
        { option: "B) netstat -r", reason: "Netstat -r lists the local host routing table, which is equivalent to route print." },
        { option: "D) route print", reason: "Route print prints IP routing tables, not local Layer 2 ARP neighbor details." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q20",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Command-line Utilities",
    question: "A network engineer is troubleshooting a switch where users in VLAN 20 cannot communicate with the default gateway. The engineer suspects that the VLAN is missing or not properly configured on the switch. Which command should the engineer use to verify which ports are assigned to which VLANs?",
    options: [
      "A) show running-config",
      "B) show ip interface brief",
      "C) show vlan brief",
      "D) show interface trunk"
    ],
    correctAnswer: "C) show vlan brief",
    explanation: {
      whyCorrect: "The show vlan brief command displays which switch ports are assigned to which VLANs. This is essential when VLAN separation is suspected as the cause of communication issues.",
      whyWrong: [
        { option: "A) show running-config", reason: "Running config shows variables in full, but is not a scannable brief layout of current active port-to-VLAN mappings." },
        { option: "B) show ip interface brief", reason: "This shows interface fast IP addresses and up/down statuses, omitting VLAN mapping configurations." },
        { option: "D) show interface trunk", reason: "This lists the trunk ports, omitting standard access port VLAN assignments." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q21",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Command-line Utilities",
    question: "A technician needs to verify the current IP configuration on a Windows workstation, including the IP address, subnet mask, default gateway, and DNS servers. Which command should the technician use?",
    options: [
      "A) ipconfig",
      "B) ipconfig /all",
      "C) ifconfig",
      "D) nslookup"
    ],
    correctAnswer: "B) ipconfig /all",
    explanation: {
      whyCorrect: "On Windows, ipconfig /all displays complete IP configuration including IP address, subnet mask, default gateway, DNS servers, MAC address, and DHCP status. ipconfig alone shows basic settings; /all adds detailed information.",
      whyWrong: [
        { option: "A) ipconfig", reason: "Standard ipconfig only shows basic IP/subnet parameters, omitting critical primary and secondary DNS server allocations." },
        { option: "C) ifconfig", reason: "This configures network interfaces on Unix-like operating systems (Linux/macOS), not Windows command prompts." },
        { option: "D) nslookup", reason: "Nslookup queries name records in DNS tables and does not show local workstation IP profiles." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q22",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.2 Cable Issues",
    question: "A network administrator is troubleshooting a link between two switches that is operating at 100 Mbps instead of the expected 1 Gbps. Both switches support gigabit Ethernet. Which of the following is the most likely cause?",
    options: [
      "A) A faulty or Category 5 cable that cannot support gigabit speeds",
      "B) A speed mismatch configured manually on both endpoints",
      "C) Spanning Tree Protocol blocking the port",
      "D) High electromagnetic interference (EMI) near the run"
    ],
    correctAnswer: "A) A faulty or Category 5 cable that cannot support gigabit speeds",
    explanation: {
      whyCorrect: "Gigabit Ethernet requires Category 5e or higher cabling. Standard Category 5 cable may only support 100 Mbps. A cable tester or examining the cable category would confirm this issue. Cable issues are a primary focus of Objective 5.2, with \"Category 5/6/7/8\" listed as a specific cable issue.",
      whyWrong: [
        { option: "B) A speed mismatch configured manually on both endpoints", reason: "Speed mismatches prevent physical links from connecting (no green light), rather than forcing auto-negotiation down." },
        { option: "C) Spanning Tree Protocol blocking the port", reason: "STP blocks ports completely to stop loops, causing complete link isolation instead of reducing throughput limits." },
        { option: "D) High electromagnetic interference (EMI) near the run", reason: "EMI causes packet loss and CRC errors but does not alter physical electrical negotiations of BASE-T standards." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q23",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.5 Hardware Tools",
    question: "A technician is troubleshooting intermittent connectivity between two switches connected by fiber optic cable. The link works for hours then fails, then works again. The technician suspects the issue is related to signal loss. Which tool should the technician use to measure the optical signal strength?",
    options: [
      "A) OTDR",
      "B) Visual Fault Locator",
      "C) Optical power meter",
      "D) Multimeter"
    ],
    correctAnswer: "C) Optical power meter",
    explanation: {
      whyCorrect: "An optical power meter measures signal strength in fiber optic cabling, which is essential for troubleshooting signal degradation or loss. This is a hardware tool listed in Objective 5.5.",
      whyWrong: [
        { option: "A) OTDR", reason: "OTDR is used to find faults or estimate fiber length but is more complex than simple optical power signal strength measurement." },
        { option: "B) Visual Fault Locator", reason: "VFL uses visible light to find severe physical breaks/bends, not to measure power decibels." },
        { option: "D) Multimeter", reason: "Multimeters measure copper parameters (voltage, resistance) and are not used for fiber optic light signals." }
      ]
    },
    weight: 10
  },
  {
    id: "d5_q24",
    type: "architect",
    domain: "5.0 Troubleshooting",
    objective: "5.3 Local Network Issues",
    question: "A network administrator is troubleshooting a user who cannot access a specific internal server. Pinging the server by IP address works, but the user cannot connect using the server's hostname. Which of the following is the most likely cause?",
    options: [
      "A) The server is configured as Administratively down",
      "B) The gateway router is discarding ICMP packet types",
      "C) DNS resolution failure for that hostname",
      "D) The workstation MAC address was filtered by port security"
    ],
    correctAnswer: "C) DNS resolution failure for that hostname",
    explanation: {
      whyCorrect: "If IP address works but hostname fails, DNS resolution is the most likely cause. The DNS A record for that hostname may be missing or incorrect. This is a classic troubleshooting scenario — when IP works but name fails, the issue is DNS.",
      whyWrong: [
        { option: "A) The server is configured as Administratively down", reason: "If it were down, pinging the IP address would also fail." },
        { option: "B) The gateway router is discarding ICMP packet types", reason: "Pinging by IP is working, which confirms ICMP transport is permitted." },
        { option: "D) The workstation MAC address was filtered by port security", reason: "If MAC filtering occurred, all communication (including ping by IP) would be blocked." }
      ]
    },
    weight: 10
  }
];
