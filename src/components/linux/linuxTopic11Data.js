// Topic 11: Monitoring & Troubleshooting (3 Subtopics)
// 11.1 Configure network interfaces in CentOS (nmcli, nmtui, /etc/sysconfig/network-scripts & ONBOOT)
// 11.2 Network configuration and troubleshooting (The 5-Step Diagnostic Ladder & 7 Core Tools)
// 11.3 System Monitoring (CPU, RAM, Disk, Load Average, Processes & Logs)

export const linuxTopic11Subtopics = [
  // ==========================================================================
  // 11.1 CONFIGURE NETWORK INTERFACES IN CENTOS
  // ==========================================================================
  {
    id: 'centos-network-interfaces',
    number: '11.1',
    title: 'Configure Network Interfaces in CentOS (nmcli, ifcfg & ONBOOT)',
    shortTitle: 'CentOS Interfaces',
    icon: '🖥️🔌',
    pastelBg: 'bg-indigo-50',
    borderColor: 'border-indigo-300',
    accentText: 'text-indigo-950',
    badgeBg: 'bg-indigo-100 text-indigo-900',
    laymanHeadline:
      'In CentOS and Red Hat Linux, network cards are like plug-in electrical appliances that need their personal ID card (ifcfg file) and a flipped master switch (ONBOOT=yes) before they can talk to the world.',
    laymanExplanation:
      'Unlike Ubuntu and Debian which configure networks via Netplan (YAML files) or /etc/network/interfaces, CentOS and Red Hat Enterprise Linux (RHEL 7, 8, and 9) use NetworkManager and dedicated configuration scripts. These scripts live in /etc/sysconfig/network-scripts/ named like ifcfg-eth0 or ifcfg-ens33 (or keyfiles in CentOS 9 Stream). The most famous beginner pitfall in all of enterprise Linux is the ONBOOT setting: by default, fresh CentOS installations set ONBOOT=no, which means when your server reboots, the network interface stays asleep! You can configure interfaces in 3 easy ways: (1) Directly editing the ifcfg text file, (2) Opening the friendly blue-screen menu with "nmtui", or (3) Running powerful command-line one-liners with "nmcli".',
    laymanPoints: [
      {
        term: 'ifcfg-eth0 / ifcfg-ens33',
        meaning:
          'The configuration text file storing the static IP address, subnet mask, default gateway, and DNS servers for that specific network card.'
      },
      {
        term: 'ONBOOT=yes',
        meaning:
          'The master power switch! Tells CentOS to automatically bring this network interface online the moment the computer boots up.'
      },
      {
        term: 'BOOTPROTO=static vs dhcp',
        meaning:
          'Tells the network card whether to ask the router for an automatic address (dhcp) or use a permanent assigned address (static or none).'
      },
      {
        term: 'nmcli (Command Line)',
        meaning:
          'The NetworkManager Command-Line tool used by DevOps and cloud engineers to create, modify, inspect, and activate connections instantly without rebooting.'
      },
      {
        term: 'nmtui (Text User Interface)',
        meaning:
          'A cozy keyboard-friendly graphical menu inside your terminal where you can use arrow keys and Enter to fill out IP addresses without typing code.'
      },
      {
        term: 'nmcli con up <name>',
        meaning:
          'Applies changes and wakes up the interface so your new IP address and DNS settings take effect immediately.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Utility Room Breaker Panel & Meter Registration',
      icon: '🏠⚡📋',
      summary:
        '“In Sam’s house, every utility line (water, power, gas) has its own dedicated breaker switch in the basement electrical panel, and each pipe must have its valve switched to OPEN (ONBOOT=yes) so water flows into the kitchen!”',
      points: [
        {
          name: 'ifcfg file = The Appliance Registration Card',
          emoji: '📋✍️',
          desc: 'A laminated card hanging next to the basement water pipe specifying: "Pipe #1 (eth0), Flow Type: Fixed Pressure (BOOTPROTO=static), Assigned Pressure: 192.168.1.50 (IPADDR), Main Street Valve: 192.168.1.1 (GATEWAY)."'
        },
        {
          name: 'ONBOOT=yes = The Master Water Valve',
          emoji: '🚰🟢',
          desc: 'If the plumber leaves ONBOOT=no, every time you come back from vacation, you turn on the kitchen tap and nothing comes out until you walk down to the basement and turn the valve yourself!'
        },
        {
          name: 'nmtui = The Friendly Touchscreen Thermostat',
          emoji: '📱🔘',
          desc: 'Instead of rewiring circuits with pliers, you walk up to the wall screen, tap the arrow buttons, select your preferred settings, and tap "Save".'
        },
        {
          name: 'nmcli con up eth0 = Flipping the Breaker Switch Up',
          emoji: '⚡🔌',
          desc: 'You flip the lever UP to activate the circuit. Current flows immediately through the copper wires without having to rebuild the entire house.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: Registering a KPLC Token Meter & Nairobi Water Connection for a Ruiru Plot!',
      icon: '🇰🇪💡🚰',
      summary:
        '“When you build a rental plot in Ruiru or Umoja, each house gets its own KPLC token meter and Nairobi Water account with an official plot registration form, and you must make sure the main power isolator switch is flipped ON!”',
      points: [
        {
          name: 'ifcfg-ens33 = The KPLC Account & Meter Form',
          emoji: '📄🧾',
          desc: 'The official paperwork showing: Meter Number (DEVICE=ens33), Postpaid vs Prepaid Tokens (BOOTPROTO=static vs dhcp), Plot Fixed Address (IPADDR=192.168.1.50), and Transformer Connection (GATEWAY=192.168.1.1).'
        },
        {
          name: 'ONBOOT=yes = The Main Circuit Breaker (Isolator)',
          emoji: '🔛⚡',
          desc: 'If the caretaker leaves the main isolator switch DOWN (ONBOOT=no), whenever KPLC restores power after a blackout, your lights remain off until you personally climb up and push the breaker switch up!'
        },
        {
          name: 'nmtui = The KPLC Caretaker Customer Care Desk',
          emoji: '🏢🧑🏾‍💼',
          desc: 'Walking into the local Huduma Centre or caretaker office where a friendly agent with a desktop screen asks you: "Unataka IP gani, na Gateway ni gani?" and types it into neat boxes for you.'
        },
        {
          name: 'nmcli connection up = Turning on the Transformer Line',
          emoji: '🔧🔌',
          desc: 'The KPLC technician climbs the pole, connects the wire to the live drop cable, and instantly your house has bright lights and Wi-Fi streaming.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The ONBOOT Switch Flip!"',
      instruction: 'Lock CentOS interface configuration into muscle memory in 3 quick moves:',
      steps: [
        '1️⃣ Reach up with your right hand and flip an imaginary heavy breaker switch DOWN and UP ⚡ — shout: "ONBOOT=yes!"',
        '2️⃣ Type with your thumbs in the air like using a smartphone 📱 — say: "nmtui for the menu, nmcli for scripts!"',
        '3️⃣ Point both index fingers upward ☝️ — say: "nmcli con up eth0 — Link is LIVE!"'
      ],
      whyItWorks:
        'CentOS learners frequently lose marks on exams (RHCSA) because their network disappears on reboot. Pairing the physical switch motion with "ONBOOT=yes" guarantees you will never forget this directive.'
    },
    quickTakeaway:
      'In CentOS, network configuration lives in /etc/sysconfig/network-scripts/ifcfg-<name>. Always set ONBOOT=yes so the interface awakens on boot, and manage it effortlessly using nmcli or nmtui.'
  },

  // ==========================================================================
  // 11.2 NETWORK CONFIGURATION AND TROUBLESHOOTING
  // ==========================================================================
  {
    id: 'network-troubleshooting',
    number: '11.2',
    title: 'Network Configuration and Troubleshooting (The 5-Step Diagnostic Ladder)',
    shortTitle: 'Network Troubleshooting',
    icon: '🩺🔍',
    pastelBg: 'bg-teal-50',
    borderColor: 'border-teal-300',
    accentText: 'text-teal-950',
    badgeBg: 'bg-teal-100 text-teal-900',
    laymanHeadline:
      'When the network fails, experienced Linux engineers never guess blindly—they climb a 5-step diagnostic ladder from the physical cable up to the domain name, using 7 core diagnostic tools.',
    laymanExplanation:
      'Network problems feel mysterious, but in Linux every failure can be pinpointed systematically in under 60 seconds by following the "Inside-Out" ladder: (1) Layer 1 Physical Link: Is the cable plugged in and interface active? Check with "ip link show" and "ethtool eth0". (2) Layer 2/3 Local IP: Did your card receive an IP address or is it blank? Check with "ip addr show". (3) Default Gateway: Can you communicate with your local Wi-Fi router / default gateway? Test with "ping -c 3 <gateway_ip>" and verify routes with "ip route". (4) External Internet IP: Can packets leave the building and reach the global web? Test with "ping -c 3 8.8.8.8". (5) DNS Resolution: Can your server translate words like "google.com" into numbers? Test with "dig", "nslookup", or check "/etc/resolv.conf". If pinging 8.8.8.8 works but pinging google.com fails, the internet is working but DNS is dead! For deep diagnosis, use "traceroute" or "mtr" to find dropped hops, "ss -tulnp" to see if your web server is actually listening on port 80/443, and "tcpdump" to sniff raw live packets.',
    laymanPoints: [
      {
        term: 'ip link & ethtool',
        meaning:
          'Checks physical cable link status, duplex speed (1000Mbps), and whether the interface is administratively UP or DOWN.'
      },
      {
        term: 'ping (Packet Internet Groper)',
        meaning:
          'Sends ICMP echo request envelopes to another computer and waits for an echo reply to measure round-trip time (latency) and lost packets.'
      },
      {
        term: 'traceroute & mtr',
        meaning:
          'Traces every single router checkpoint along the global internet highway to identify exactly which router is dropping your packets.'
      },
      {
        term: 'ss -tulnp / netstat',
        meaning:
          'Socket Statistics tool that reveals which server programs (Nginx, SSH, MySQL) are currently listening on which port numbers.'
      },
      {
        term: 'dig & nslookup',
        meaning:
          'DNS investigative tools that query nameservers to verify whether domain names (like mywebsite.com) resolve to the correct IP address.'
      },
      {
        term: 'tcpdump',
        meaning:
          'The ultimate network wiretap! Captures and prints raw live network packets flying across your network card in real time.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The 5-Step Water Pipe Leak Detective',
      icon: '🏠🚰🔍',
      summary:
        '“If water stops flowing from Sam’s kitchen faucet, he doesn’t call the mayor immediately! He follows the pipe step-by-step: faucet handle -> house valve -> basement meter -> water main -> city reservoir.”',
      points: [
        {
          name: 'Step 1: Check the Faucet Handle = ip link',
          emoji: '🚰👀',
          desc: 'Is the tap physically screwed on and open (UP), or did someone shut the valve (DOWN)? If the cable is unplugged, no command can help.'
        },
        {
          name: 'Step 2: Check the Water Meter = ip addr',
          emoji: '🔢💧',
          desc: 'Does your house have an assigned account number and meter reading (IP address)? If blank or 127.0.0.1, you have no local address.'
        },
        {
          name: 'Step 3: Knock on the Front Gate = ping Default Gateway',
          emoji: '🚪🔔',
          desc: 'Can water reach from your kitchen to the property line valve? If you cannot ping your router, your local Wi-Fi or switch is unplugged.'
        },
        {
          name: 'Step 4: Check the Street Main Pipe = ping 8.8.8.8',
          emoji: '🛣️🌊',
          desc: 'Water flows out to the municipal street main! If you reach 8.8.8.8, your connection to the outside world is 100% healthy.'
        },
        {
          name: 'Step 5: Check the House Phonebook = dig / nslookup (DNS)',
          emoji: '📖☎️',
          desc: 'You can talk to houses by number (8.8.8.8), but your phonebook is missing so you don’t know who "Google" is. Fixing /etc/resolv.conf restores names!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: Diagnosing Why the Cyber Café or Duka M-Pesa Stopped Working!',
      icon: '🇰🇪🏢📶',
      summary:
        '“When internet vanishes in a busy Nairobi cyber café or supermarket till, the fundi systematically checks: Safaricom ONU fiber lights -> Ethernet cable -> Router IP -> Safaricom gateway -> DNS lookup!”',
      points: [
        {
          name: 'Step 1: Check the Red LOS Light = ip link',
          emoji: '🔴🔌',
          desc: 'Looking at the Safaricom / Faiba router: is the green PON light on or is the red LOS light flashing? In Linux, ip link shows whether the interface is UP or unplugged.'
        },
        {
          name: 'Step 2: Check Machine LAN IP = ip addr',
          emoji: '💻🆔',
          desc: 'Did the computer get an IP like 192.168.1.15, or is it showing 169.254.x.x (APIPA) because the DHCP server failed?'
        },
        {
          name: 'Step 3: Ping the Cyber Router = ping 192.168.1.1',
          emoji: '📡🏓',
          desc: 'Flashing the local TP-Link router: "Niko hapa, unaniskia?" If router pings with 0% loss, the local shop network is working.'
        },
        {
          name: 'Step 4: Ping Public Internet = ping 8.8.8.8',
          emoji: '🌍🚀',
          desc: 'Pinging Google Public DNS. If 8.8.8.8 responds with 15ms, data bundles and fiber are flowing fine through Safaricom.'
        },
        {
          name: 'Step 5: Check Web Browsing = dig google.com / /etc/resolv.conf',
          emoji: '🌐❓',
          desc: 'If WhatsApp works on IP but Google Chrome says "Server Not Found", the DNS nameserver is offline. Adding "nameserver 8.8.8.8" into /etc/resolv.conf fixes it instantly!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The 5-Step Diagnostic Climb!"',
      instruction: 'Tap 5 body parts from bottom to top to remember the troubleshooting ladder:',
      steps: [
        '1️⃣ Tap your feet 🦶 — say: "Layer 1: Cable & Link (ip link)!"',
        '2️⃣ Tap your pocket 👖 — say: "Layer 2: Local IP (ip addr)!"',
        '3️⃣ Tap your belt buckle 🚪 — say: "Layer 3: Local Gateway (ping gateway)!"',
        '4️⃣ Tap your chest 🌍 — say: "Layer 4: Global Internet (ping 8.8.8.8)!"',
        '5️⃣ Tap your forehead 🧠 — say: "Layer 5: DNS Name Lookups (dig / nslookup)!"'
      ],
      whyItWorks:
        'Climbing your body from feet to head mirrors the OSI network stack. When an interview or crisis happens, physical touch triggers the exact diagnostic order without panic.'
    },
    quickTakeaway:
      'Never guess! Troubleshoot in order: (1) Link (ip link), (2) IP (ip addr), (3) Gateway (ping gateway), (4) External IP (ping 8.8.8.8), (5) DNS (dig domain.com). Check open ports with ss -tulnp and packets with tcpdump.'
  },

  // ==========================================================================
  // 11.3 SYSTEM MONITORING
  // ==========================================================================
  {
    id: 'system-monitoring',
    number: '11.3',
    title: 'System Monitoring (CPU, RAM, Disk, Load Average & Process Health)',
    shortTitle: 'System Monitoring',
    icon: '📊💓',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    laymanHeadline:
      'System monitoring is checking your Linux computer’s pulse, blood pressure, and breathing with tools like top, free, and df, so you can catch hungry rogue processes before they freeze your server.',
    laymanExplanation:
      'A Linux server can run smoothly for years, but when it slows down or crashes, it is almost always caused by one of 4 exhausted resources: (1) CPU & Load Average: Checked with "top", "htop", or "uptime". The 3 load average numbers represent 1-minute, 5-minute, and 15-minute system load. If your server has 4 CPU cores, a load of 4.0 means the CPU is 100% full; anything above 4.0 means tasks are standing in line waiting! (2) RAM & Swap Memory: Checked with "free -h" or "vmstat 1". Linux uses spare RAM as Buffers/Cache to speed up disk reads; this cache is instantly surrendered when applications need memory! If free RAM drops to zero and Swap starts getting hammered, your server will crawl to a halt. (3) Disk Space & Inodes: Checked with "df -h" (overall partition fullness) and "du -sh /var/log/*" (finding giant log files). If the root disk reaches 100%, databases and web servers crash immediately. (4) Process Control & Logs: Find misbehaving processes with "ps aux | grep <name>", stop them gracefully with "kill -15 <PID>" (polite termination) or forcefully with "kill -9 <PID>" (force kill), and read live system kernel logs with "journalctl -xe" or "dmesg -T".',
    laymanPoints: [
      {
        term: 'top & htop',
        meaning:
          'Live interactive task manager showing real-time CPU consumption, memory usage, running threads, and the top most resource-hungry processes.'
      },
      {
        term: 'uptime & Load Average',
        meaning:
          'Shows how long the server has been running and 3 load numbers (1, 5, 15 min). Compare the load against your CPU core count (nproc) to see if the server is overloaded.'
      },
      {
        term: 'free -h (RAM & Swap)',
        meaning:
          'Displays total, used, free, and cached RAM in human-readable megabytes and gigabytes, plus swap memory usage.'
      },
      {
        term: 'df -h vs du -sh',
        meaning:
          '"df -h" (Disk Free) shows overall partition storage capacity, while "du -sh" (Disk Usage) measures the size of specific folders and files.'
      },
      {
        term: 'kill -15 vs kill -9',
        meaning:
          'kill -15 (SIGTERM) asks an application politely to clean up and exit; kill -9 (SIGKILL) immediately terminates the process with no questions asked.'
      },
      {
        term: 'journalctl -xe & dmesg -T',
        meaning:
          'The ultimate system logs: journalctl displays systemd service error messages, while dmesg shows kernel hardware warnings and Out-Of-Memory (OOM) killer events.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Central Smart-House Health Dashboard & Circuit Breaker',
      icon: '🏠🎛️💓',
      summary:
        '“Sam’s smart house has an electronic wall dashboard displaying power consumption (CPU), kitchen counter space (RAM), attic storage (Disk), and a master breaker switch to shut down overheating appliances (kill -9)!”',
      points: [
        {
          name: 'top / htop = The Live Electric & Activity Monitor',
          emoji: '📈⚡',
          desc: 'The wall monitor shows which appliance is drawing the most electricity: "Space heater in bedroom #2 is consuming 98% of electrical capacity!"'
        },
        {
          name: 'Load Average = The Queue at the Microwave',
          emoji: '⏱️🍲',
          desc: 'If you have 2 microwaves (2 CPU cores) and 2 people cooking, the load is 2.0 (perfect). If 6 people are waiting in line with cold food, the load is 6.0 (overloaded!).'
        },
        {
          name: 'free -h (RAM & Buffer/Cache) = The Kitchen Cutting Board',
          emoji: '🪵🧅',
          desc: 'RAM is the kitchen chopping board where ingredients sit while you cook. Cleaned spices left on the corner (Cache) can be swiped away in 1 second if you need room for a big turkey.'
        },
        {
          name: 'df -h & du -sh = The Attic & Closet Storage Gauge',
          emoji: '📦📏',
          desc: 'df -h shows the attic is 99% full! du -sh /attic/* lets you walk through and find the giant box of old holiday magazines filling up the entire corner.'
        },
        {
          name: 'kill -15 vs kill -9 = Unplugging a Runaway Toaster',
          emoji: '🔌🛑',
          desc: 'kill -15 taps the toaster button to pop the toast up; kill -9 reaches behind the counter and rips the cord out of the wall before a fire starts!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Matatu Driver & Sacco Mechanic Dashboard on Thika Superhighway!',
      icon: '🇰🇪🚐💨',
      summary:
        '“Driving a 33-seater matatu from Nairobi CBD to Thika requires constant monitoring: the RPM tachometer (CPU), passenger seats available (RAM), luggage boot capacity (Disk), and the conductor ejecting a unruly passenger (kill -9)!”',
      points: [
        {
          name: 'top = The Instrument Cluster Gauges',
          emoji: '🏎️⏱️',
          desc: 'The driver watches the dashboard: engine RPM needle in the red (CPU at 100%), temperature gauge climbing, and oil pressure indicators.'
        },
        {
          name: 'Load Average = Traffic Bottleneck at Muthaiga Roundabout',
          emoji: '🚗🚛',
          desc: 'If the highway has 4 lanes and 4 cars passing smoothly per second, traffic is fluid (Load 4.0). If 12 trucks try to squeeze through 4 lanes, a massive traffic jam forms (Load 12.0!).'
        },
        {
          name: 'free -h (RAM & Swap) = Matatu Passenger Seats & Sambaza Foldable Chairs',
          emoji: '💺🚌',
          desc: 'The 33 main seats are physical RAM. When all 33 are full and passengers start sitting on small wooden fold-out stools in the aisle (Swap memory), boarding and moving becomes painfully slow!'
        },
        {
          name: 'df -h = The Roof Rack & Luggage Boot (Mizigo)',
          emoji: '🧳📦',
          desc: 'df -h warns that the roof rack is 95% packed with bananas and gunias. du -sh finds which specific sack of potatoes is overloading the vehicle.'
        },
        {
          name: 'kill -9 <PID> = Conductor Ejecting a Troublemaker at Next Stage',
          emoji: '🚪🛑',
          desc: 'When an app is completely frozen and consuming all CPU, the conductor doesn’t negotiate: "Mkubwa shuka hapa!" and forces the process off the bus immediately.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Check the Pulse: CPU, RAM, Disk!"',
      instruction: 'Do this 3-second doctor health check on your system:',
      steps: [
        '1️⃣ Place your hand over your heart 💓 — say: "top: Feel the CPU pulse & Load Average!"',
        '2️⃣ Touch your forehead 🧠 — say: "free -h: How much RAM is on the cutting board?"',
        '3️⃣ Pat your stomach 🤰 — say: "df -h: Is the disk storage full or breathing easy?"'
      ],
      whyItWorks:
        'Heart = CPU (speed/pulse), Brain = RAM (active thought capacity), Stomach = Disk (physical capacity). This somatic mapping anchors the 3 essential monitoring commands instantly.'
    },
    quickTakeaway:
      'Keep your server healthy by monitoring the 4 vital signs: CPU/Load (top, uptime), RAM/Swap (free -h), Disk Space (df -h, du -sh), and Logs (journalctl -xe). Use kill -15 before kill -9.'
  }
];
