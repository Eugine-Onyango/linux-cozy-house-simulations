// Topic 10: Linux Firewall (4 Subtopics)
// 10.1 Linux Firewall (What it is, Packet Filtering & Stateful Inspection)
// 10.2 Setting Up Firewalls (iptables vs firewalld vs UFW)
// 10.3 Basic iptables Commands (Tables, Chains, Options & Targets)
// 10.4 Managing Firewall Configuration (Rule Order, Permanent Saving & Zones)

export const linuxTopic10Subtopics = [
  // ==========================================================================
  // 10.1 LINUX FIREWALL (OVERVIEW & PACKET FILTERING)
  // ==========================================================================
  {
    id: 'linux-firewall-overview',
    number: '10.1',
    title: 'Linux Firewall (The Security Gatekeeper)',
    shortTitle: 'Linux Firewall Overview',
    icon: '🛡️🚪',
    pastelBg: 'bg-red-50',
    borderColor: 'border-red-300',
    accentText: 'text-red-950',
    badgeBg: 'bg-red-100 text-red-900',
    laymanHeadline:
      'A Linux firewall is a smart security gatekeeper sitting right at your computer’s doors, inspecting every visitor (packet) before deciding whether to welcome them in, turn them away, or pretend nobody is home.',
    laymanExplanation:
      'Imagine living in a house without a front door or fence—anyone from the street could walk right into your bedroom or kitchen! A firewall is the security perimeter and gatekeeper of your Linux computer. Every single message, web request, or file entering or leaving travels in tiny envelopes called "packets". The firewall inspects 4 key details on each packet: (1) Where it came from (Source IP & Port), (2) Where it wants to go (Destination IP & Port), (3) What vehicle it arrived in (Protocol: TCP, UDP, ICMP), and (4) The Connection State (Is this an uninvited stranger [NEW], or a friend we already asked for a web page [ESTABLISHED]?). Based on these checks, it enforces your house security policy!',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Security Gate & Visitor Checkpoint',
      icon: '🏠💂‍♂️🪪',
      summary:
        '“The Linux firewall is a smart security guard stationed at Sam’s front gate who checks every visitor’s ID, vehicle, and purpose before letting them onto the property!”',
      points: [
        {
          name: 'Packet Filtering = Checking Visitor ID Cards',
          emoji: '🪪🔍',
          desc: 'The guard inspects visitor credentials: "Who are you? (Source IP), Which room do you want to visit? (Port 22 SSH vs Port 80 Web), and Did you walk or ride a bike? (TCP vs UDP)."'
        },
        {
          name: 'Stateful Inspection = Remembering Who Already Lives or Visits Here',
          emoji: '🧠🤝',
          desc: 'Modern Linux firewalls are smart: when you visit google.com, the firewall remembers you asked for the page. When Google sends the pictures back (ESTABLISHED traffic), the guard waves it through automatically without questioning!'
        },
        {
          name: 'Default Policy = The House Golden Rule (Drop All vs Allow All)',
          emoji: '⚖️🔒',
          desc: 'A secure house sets its default rule to DROP: "Unless your name is specifically written on the guest list, you cannot enter!" This protects your home even when you are asleep.'
        },
        {
          name: 'Hardware vs Software Firewall',
          emoji: '🧱💻',
          desc: 'Your home router is the big estate barrier gate (hardware firewall), while Linux iptables/firewalld is the personal lock on your own front door (host-based software firewall). Both together create defense-in-depth!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: The Gated Estate Askari & Barrier at the Nyumba Kumi Gate!',
      icon: '🇰🇪🚧💂🏾‍♂️',
      summary:
        '“The Askari at your estate barrier stops every car and boda-boda: checks the national ID card, asks which house number you are visiting, and searches the boot before opening the gate!”',
      points: [
        {
          name: 'Barrier Check = Packet Inspection at the Gate',
          emoji: '🚧📋',
          desc: 'When a car arrives at the South B or Kilimani barrier, the Askari checks: Which estate did you drive from? (Source IP), Which plot number are you visiting? (Destination Port), and Are you a private car or delivery van? (Protocol).'
        },
        {
          name: 'Stateful Inspection = "Huyu Ni Mtu Wetu" (Recognizing Returning Residents)',
          emoji: '👋🚗',
          desc: 'If you drove out to buy milk at the duka, when you drive back into the estate 5 minutes later, the Askari salutes and lifts the barrier immediately because he knows you already belong inside!'
        },
        {
          name: 'Default Deny = "Huingii Bila Kupigiwa Simu"',
          emoji: '⛔📞',
          desc: 'If a stranger knocks at midnight and no resident called the gate to allow them, the Askari refuses to open the barrier. In Linux: default INPUT DROP keeps hackers out!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Stop, Inspect, Decide!"',
      instruction: 'Act out the 3 steps of packet filtering right now:',
      steps: [
        '1️⃣ Hold out your hand like a traffic Askari ✋ — say: "Stop! Check Packet ID!"',
        '2️⃣ Point your index finger to your temple 🧠 — say: "Stateful: Do I know this connection?"',
        '3️⃣ Wave through or cross your arms 🙅‍♂️ — say: "ACCEPT or DROP!"'
      ]
    },
    quickTakeaway:
      'A Linux Firewall is your digital perimeter guard that inspects packets (Source, Destination, Port, Protocol, State) to protect your system from unauthorized intruders.'
  },

  // ==========================================================================
  // 10.2 SETTING UP FIREWALLS (MANAGERS COMPARISON & STARTUP)
  // ==========================================================================
  {
    id: 'setting-up-firewalls',
    number: '10.2',
    title: 'Setting Up Firewalls (iptables, firewalld & UFW)',
    shortTitle: 'Setting Up Firewalls',
    icon: '⚙️🛡️',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-900',
    laymanHeadline:
      'Choosing your firewall manager: hire the strict veteran guard with a thick rulebook (iptables), the modern manager with zone tablets (firewalld), or the beginner-friendly assistant with a 1-click app (UFW)!',
    laymanExplanation:
      'Inside the Linux Kernel, the actual filtering engine is called Netfilter (or nftables). But typing raw kernel commands is tricky, so Linux gives you 3 popular "Firewall Managers" to control the guard: (1) firewalld (default on Fedora, CentOS, RHEL) uses dynamic Zones like public, home, and work, updating rules live without rebooting; (2) UFW (Uncomplicated Firewall, default on Ubuntu & Debian) uses simple commands like "sudo ufw allow 22" designed for quick setup; and (3) iptables (the classic veteran tool) gives complete, granular control with tables and chains. Setting up a firewall simply means installing your preferred manager, starting its background service with systemctl, and making sure it starts automatically at boot!',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): Choosing Which Security Manager to Hire',
      icon: '🏢🧑‍💼📱',
      summary:
        '“You can hire 3 different kinds of security managers to run your home’s security gate: the strict veteran, the tablet manager, or the smartphone app!”',
      points: [
        {
          name: 'iptables = The Strict Veteran Guard with a Ledger',
          emoji: '👮‍♂️📕',
          desc: 'Carries thick binders with precise handwritten rules. Doesn’t update rules automatically—you tell him exact line numbers. Perfect for advanced users who demand 100% control.'
        },
        {
          name: 'firewalld = The Modern Manager with a Zone Tablet',
          emoji: '🗺️📱',
          desc: 'Carries a tablet dividing your property into Zones (Public front yard, Home living room, DMZ guest room). Changes rules live on the fly (--reload) without interrupting active visitors!'
        },
        {
          name: 'UFW = The Friendly Smartphone App with Big Buttons',
          emoji: '📱🟢',
          desc: 'Speaks simple human language: "ufw allow ssh" or "ufw enable". Ideal for beginners and developers who want solid protection without studying complex rulebooks.'
        },
        {
          name: 'Setting Up = Hiring & Giving the Keys (systemctl)',
          emoji: '🔑⚡',
          desc: 'Running "sudo systemctl enable --now firewalld" (or "sudo ufw enable") signs the guard’s contract and ensures he is at the gate every morning when the house boots up!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: G4S Corporate Commander vs. Modern Estate Tablet vs. Welcoming Caretaker!',
      icon: '🇰🇪🏢📲',
      summary:
        '“Pick the security style for your estate: a formal G4S sergeant (iptables), a modern smart-estate biometric coordinator (firewalld), or a simple gate caretaker with a padlock switch (UFW)!”',
      points: [
        {
          name: 'UFW = The Friendly Estate Caretaker (Ubuntu)',
          emoji: '👨🏾‍💼🔑',
          desc: 'You just tell him: "Bwana Caretaker, fungulia fundi mlango wa nyuma (ufw allow 22)" and "Washa security (ufw enable)". No complications!'
        },
        {
          name: 'firewalld = Modern Smart Estate with Color-Coded Zones (RHEL / CentOS)',
          emoji: '💳🏢',
          desc: 'Like an estate with digital turnstiles: Red badge for roadside visitors (Public Zone), Green badge for residents inside (Home Zone), and Blue badge for delivery vans (DMZ Zone).'
        },
        {
          name: 'iptables = Veteran Kenya Police Reserve / G4S Sergeant',
          emoji: '👮🏾‍♂️📘',
          desc: 'Knows every paragraph of the security manual by heart. He demands exact legal instructions: "Under Section INPUT, Paragraph 3, let vehicle 192.168.1.5 enter Port 22!"'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Pick Your Manager, Turn It ON!"',
      instruction: 'Do these 3 quick moves to remember the setup commands:',
      steps: [
        '1️⃣ Pick your badge: tap your chest 🪪 — say: "UFW (Ubuntu) or firewalld (RHEL)!"',
        '2️⃣ Flip an imaginary power switch UP ⚡ — say: "sudo systemctl enable --now (Start at boot)!"',
        '3️⃣ Thumbs-up 👍 — say: "sudo ufw status (Guard is active & watching)!"'
      ]
    },
    quickTakeaway:
      'Choose UFW for simple Ubuntu/Debian security, firewalld for dynamic zone-based RHEL/Fedora setups, or iptables for granular control. Always enable at boot with systemctl!'
  },

  // ==========================================================================
  // 10.3 BASIC IPTABLES COMMANDS (TABLES, CHAINS & TARGETS)
  // ==========================================================================
  {
    id: 'basic-iptables-commands',
    number: '10.3',
    title: 'Basic iptables Commands (Tables, Chains & Rules)',
    shortTitle: 'Basic iptables Commands',
    icon: '📕🧰',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    laymanHeadline:
      'Mastering the guard’s rulebook: 5 Tables (binders), 3 Chains (checkpoints), and simple commands to list, add, delete, and stamp visitors with ACCEPT, DROP, or REJECT.',
    laymanExplanation:
      'iptables organizes all its rules into a clear hierarchy: Tables, Chains, and Rules. Tables are different binders: "filter" is the main guest list, "nat" is the mailroom that changes addresses, and "mangle" adjusts special delivery priorities. Inside the filter table are 3 Chains (checkpoints): INPUT (visitors arriving at the front gate), OUTPUT (family leaving through the back gate), and FORWARD (traffic passing through from one room to another). The command follows a simple formula: "sudo iptables [action] CHAIN -s [source] -p [protocol] --dport [port] -j [TARGET]". Targets decide the verdict: ACCEPT (come in!), DROP (silently ignore), or REJECT (turn away with an error note)!',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Guard’s 5 Binders & 3 Checkpoints',
      icon: '🏠📕📋',
      summary:
        '“The guard carries 5 colored binders (Tables) and stands at 3 checkpoints around Sam’s house: Front Door (INPUT), Back Door (OUTPUT), and Hallway (FORWARD)!”',
      points: [
        {
          name: 'The 3 Main Checkpoints (Chains)',
          emoji: '🚪🚶‍♂️',
          desc: '• INPUT = Front Gate: checks every visitor trying to enter your computer.\n• OUTPUT = Back Gate: checks packets your computer created before they leave onto the street.\n• FORWARD = Internal Hallway: checks packets passing through your computer to reach another machine (router mode).'
        },
        {
          name: 'The 3 Verdict Stamps (Targets -j)',
          emoji: '🟢🔴🚫',
          desc: '• ACCEPT = Green stamp: "Welcome, come right in!"\n• DROP = Black hole: pretend nobody is home. Intruders wait until their connection times out—great for frustrating hackers!\n• REJECT = Red stamp: sends a formal "Sorry, port closed" note back immediately.'
        },
        {
          name: 'Essential Options: -L, -F, -P, -A, -I, -D',
          emoji: '🧰⌨️',
          desc: '• -L -v -n = "Show me the entire rulebook with packet counts and numbers!"\n• -F = "Flush: tear out all rules and wipe the book clean!"\n• -P INPUT DROP = "Default policy: block anyone not specifically on the list!"\n• -A = "Append rule to the bottom of the list."\n• -I = "Insert rule at a specific line number (e.g., Line 1)." \n• -D = "Delete a specific rule number."'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: The Occurrence Book (OB), Gate Barriers & Verdict Stamps!',
      icon: '🇰🇪📖🛡️',
      summary:
        '“The gate Askari has 3 checkpoints: Main Inbound Gate (INPUT), Exit Gate (OUTPUT), and Transit Bypass Lane (FORWARD), with 3 stamps: Karibu (ACCEPT), Ingia Mitini (DROP), and Rudi Nyuma (REJECT)!”',
      points: [
        {
          name: 'DROP vs REJECT = Ghosting vs. Giving a Polite Refusal',
          emoji: '👻🚫',
          desc: 'REJECT is like the Askari telling the visitor: "Hapa huingii leo!" DROP is like switching off all compound lights and keeping quiet so the thief doesn’t even know if anyone lives there!'
        },
        {
          name: 'iptables -F = Tearing Out Old Pages from the Gate OB Book',
          emoji: '📄🧹',
          desc: 'When the estate management changes and all previous visitor passes are cancelled, running "sudo iptables -F" wipes the slate clean so you can set fresh rules.'
        },
        {
          name: 'iptables -P INPUT DROP = Locking the Compound Barrier by Default',
          emoji: '🔐🚧',
          desc: 'Setting the default policy to DROP means the boom barrier stays DOWN. Only vehicles with authorized stickers get waved through!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "List, Append, Drop, Accept!"',
      instruction: 'Do these 4 quick hand moves to remember the iptables syntax:',
      steps: [
        '1️⃣ Open your hands like a rulebook 📖 — say: "iptables -L (List all rules)!"',
        '2️⃣ Point your thumb down 👇 — say: "-A (Append to bottom)!"',
        '3️⃣ Push an imaginary visitor away 🙅‍♂️ — say: "-j DROP (Turn away silently)!"',
        '4️⃣ Open both arms wide 🤗 — say: "-j ACCEPT (Welcome in)!"'
      ]
    },
    quickTakeaway:
      'iptables syntax: "iptables -A CHAIN -p proto --dport port -j TARGET". Remember: INPUT = arriving, OUTPUT = leaving, FORWARD = passing through. ACCEPT lets in, DROP ignores silently.'
  },

  // ==========================================================================
  // 10.4 MANAGING FIREWALL CONFIGURATION (RULE ORDER, PERSISTENCE & ZONES)
  // ==========================================================================
  {
    id: 'managing-firewall-configuration',
    number: '10.4',
    title: 'Managing Firewall Configuration (Rule Order, Persistence & Zones)',
    shortTitle: 'Managing Configuration',
    icon: '📝💾',
    pastelBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    accentText: 'text-purple-950',
    badgeBg: 'bg-purple-100 text-purple-900',
    laymanHeadline:
      'Solving the critical top-to-bottom rule order puzzle, saving your rules permanently in a waterproof notebook so they survive reboot, and organizing property zones with firewalld & UFW.',
    laymanExplanation:
      'Firewalls read their rules strictly from TOP to BOTTOM like a checklist: the very first rule that matches a packet wins, and all rules below it are ignored! This causes the famous "Rule Order Problem": if you put "Block Mr. X (DROP)" on Line 1 and "Allow Mr. X to use SSH (ACCEPT)" on Line 2, the guard checks Line 1, blocks him, and never sees Line 2. To fix this, you must insert specific exceptions at the top with "-I INPUT 1" before broad rules! Furthermore, iptables rules live only in memory by default—if the power flickers or you reboot, all rules disappear! You must save them permanently using "iptables-save" and the "iptables-persistent" package. Finally, learn how firewalld zones and UFW manage persistent rules cleanly.',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Top-to-Bottom Rulebook & The Waterproof Notebook',
      icon: '🏠📋📒',
      summary:
        '“The guard reads the guest list strictly from top to bottom; put exceptions at the top, and copy your rules into a waterproof notebook so they don’t wash away when it rains!”',
      points: [
        {
          name: 'The Top-to-Bottom Trap = First Match Wins!',
          emoji: '🔝🎯',
          desc: 'Rule 1: "Block Mr. X" (at the top)\nRule 2: "Allow Mr. X to SSH door 22" (at the bottom)\nWhen Mr. X knocks, the guard hits Rule 1, turns him away, and never checks Rule 2! Always put specific exceptions above general blocks.'
        },
        {
          name: 'The Fix: Insert at the Top (-I INPUT 1)',
          emoji: '📌1️⃣',
          desc: 'Use "-I INPUT 1" instead of "-A INPUT" to insert the exception right at the very top of the list so the guard checks it first.'
        },
        {
          name: 'Saving Rules Permanently = The Waterproof Notebook',
          emoji: '📒💧',
          desc: 'Raw iptables rules are written in chalk on the guard’s desk. When the computer reboots, the chalk washes away! Running "iptables-save > /etc/iptables/rules.v4" (with iptables-persistent) copies them into a permanent waterproof notebook.'
        },
        {
          name: 'firewalld Runtime vs Permanent (--permanent & --reload)',
          emoji: '💾🔄',
          desc: 'In firewalld, adding a rule without "--permanent" only lasts until the next reload. Always add "--permanent" and then run "sudo firewall-cmd --reload" to make it permanent without dropping connections!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: The Askari’s Morning Clipboard Order & The Caretaker’s Permanent Title Deed Folder!',
      icon: '🇰🇪📋📁',
      summary:
        '“If the Askari reads: ‘Simamisha magari yote’ on Line 1, he will never see ‘Mruhusu Daktari’ on Line 2! Put the Doctor at Line 1, and write the rules in the official estate ledger!”',
      points: [
        {
          name: 'Rule Order: The Doctor vs General Curfew',
          emoji: '🚑👮🏾‍♂️',
          desc: 'If the estate rulebook says Line 1: "Block all night visitors" and Line 2: "Allow Dr. Ouma to enter for emergencies", the night watchman blocks Dr. Ouma at Line 1! Moving Dr. Ouma to Line 1 saves lives.'
        },
        {
          name: 'iptables-persistent = Recording Rules in the Permanent Estate Ledger',
          emoji: '📓🖊️',
          desc: 'If KPLC power goes out and the server restarts, you don’t want your firewall waking up wide open with zero rules! iptables-persistent loads the saved rules the instant power returns.'
        },
        {
          name: 'firewalld Zones = Moving Between Nairobi Expressway, Estate Road & Private Driveway',
          emoji: '🛣️🏡',
          desc: 'Public Zone is like the busy highway (high alert, few doors open), while Home Zone is your private driveway where family can share printers and media without barriers.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Insert Line 1, Save in Notebook!"',
      instruction: 'Lock rule order and permanent saving into muscle memory:',
      steps: [
        '1️⃣ Point your finger high at the ceiling ☝️ — say: "-I INPUT 1 (Specific rules go at the TOP)!"',
        '2️⃣ Point down to the floor 👇 — say: "-A (General blocks go at the BOTTOM)!"',
        '3️⃣ Pretend to write in a notebook and close it tight 📓🔒 — say: "iptables-save (Save rules permanently)!"'
      ]
    },
    quickTakeaway:
      'Firewalls process rules from Top to Bottom: first match wins! Always insert exceptions at the top with "-I 1". Save rules permanently with "iptables-persistent" or firewalld’s "--permanent" flag.'
  }
];
