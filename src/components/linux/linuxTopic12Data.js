// Topic 12: Process Management (6 Subtopics)
// 12.1 Viewing Processes (ps, ps aux, ps -ef, pstree, PID/PPID, and States: R, S, D, Z, T)
// 12.2 Real-Time & Enhanced Process Monitoring (top vs htop, Load Average, Sorting & Color Gauges)
// 12.3 Managing Processes & Signals (kill, killall, pkill, SIGTERM 15, SIGKILL 9, SIGHUP 1, SIGSTOP 19, SIGCONT 18)
// 12.4 Controlling Process Priority (Nice & Renice: The -20 to +19 Politeness Scale)
// 12.5 Managing Background & Foreground Jobs (&, Ctrl+Z, jobs, bg, fg, nohup & disown)
// 12.6 Monitoring Disk Usage (df -h, df -i Inodes, du -sh, du --max-depth, and ncdu)

export const linuxTopic12Subtopics = [
  // ==========================================================================
  // 12.1 VIEWING PROCESSES
  // ==========================================================================
  {
    id: 'viewing-processes',
    number: '12.1',
    title: 'Viewing Processes (ps, ps aux, ps -ef, pstree & Process States)',
    shortTitle: 'Viewing Processes',
    icon: '👥🆔',
    pastelBg: 'bg-blue-50',
    borderColor: 'border-blue-300',
    accentText: 'text-blue-950',
    badgeBg: 'bg-blue-100 text-blue-900',
    laymanHeadline:
      'Every running program in Linux is a living worker called a "Process" with its own national ID number (PID), parent ID (PPID), and life status (Running, Sleeping, or Zombie).',
    laymanExplanation:
      'When you double-click an app or type a command in Linux, the file on your hard drive is loaded into RAM and comes to life as an active Process. Linux assigns every process a unique Process ID (PID). The very first process born when Linux boots is PID 1 (systemd / init), which acts like the great-grandparent of all other processes in the entire operating system! Every process has a Parent Process ID (PPID) that spawned it (via "fork"). You can inspect active processes with "ps" (shows processes in your current terminal), "ps aux" (BSD style: shows all processes across all users with CPU/MEM columns), "ps -ef" (Standard UNIX style: shows UID, PID, PPID, and full command path), or "pstree" (displays the family tree hierarchy). Processes cycle through 5 universal states: R (Running/Runnable on CPU), S (Sleeping: waiting for user input or an event), D (Uninterruptible Disk Sleep: waiting for hardware disk I/O, cannot be killed!), T (Stopped/Paused by Ctrl+Z), and Z (Zombie: a finished child process whose parent forgot to read its exit certificate!).',
    laymanPoints: [
      {
        term: 'PID (Process ID)',
        meaning:
          'A unique number (like a national ID or passport number) given to every running program to track, control, and communicate with it.'
      },
      {
        term: 'PPID (Parent Process ID)',
        meaning:
          'The ID number of the mother program that created this process. For example, your bash shell creates the "ls" process.'
      },
      {
        term: 'PID 1 (systemd / init)',
        meaning:
          'The first process created by the Linux Kernel during boot. It is the root ancestor of every background service and user program.'
      },
      {
        term: 'ps aux vs ps -ef',
        meaning:
          '"ps aux" shows User, %CPU, %MEM, and live status (BSD style). "ps -ef" shows User, PID, PPID, and the parent relationship (Standard UNIX style).'
      },
      {
        term: 'pstree',
        meaning:
          'Draws a visual family tree diagram showing how processes branch out from PID 1 (systemd -> sshd -> bash -> python3).'
      },
      {
        term: 'Process States (R, S, D, Z, T)',
        meaning:
          'R = Running on CPU; S = Sleeping (idle); D = Deep hardware disk wait; T = Paused/Stopped; Z = Zombie (dead child waiting for parent acknowledgement).'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Living Household Helpers & The Family Ancestor Tree',
      icon: '🏠🧑‍🍳🌳',
      summary:
        '“Every helper working in Sam’s house has a numbered badge (PID). The House Butler (systemd, PID 1) hired the Head Chef, who hired the Dishwasher. When a helper finishes chores, they hand their report card back to their boss!”',
      points: [
        {
          name: 'PID & PPID = Staff Badges & Boss Badges',
          emoji: '🏷️👔',
          desc: 'The Kitchen Chef has Badge #104 (PID), and his badge lists Boss #1 (PPID = Butler systemd). The Dishwasher has Badge #210, and his badge lists Boss #104.'
        },
        {
          name: 'ps aux = Taking a Morning Roll Call Snapshot',
          emoji: '📋📸',
          desc: 'The clipboard snapshot showing every worker on the property, what room they are in, and how much energy (%CPU) they are burning right now.'
        },
        {
          name: 'pstree = The Household Organizational Chart',
          emoji: '🌳📐',
          desc: 'The wall chart showing the butler branching to the chef, the gardener, and the security guard, and who answers to whom.'
        },
        {
          name: 'Zombie Process (Z) = The Ghost with an Unclaimed Report Card',
          emoji: '🧟📑',
          desc: 'A child helper finished sweeping the floor, died, and is standing in the hallway holding his report card because the chef fell asleep and forgot to sign it!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Construction Site (Mjengo) Crew & Supervisor Register!',
      icon: '🇰🇪🏗️👷🏾‍♂️',
      summary:
        '“At a major construction site in Kilimani, the Site Engineer (PID 1) hires the Foremen (PPID), who hire the Fundis and Watu wa Mkono (PIDs), and the site security desk keeps a daily roll call of who is active, resting, or idle!”',
      points: [
        {
          name: 'PID = The Daily Gate Kipande / Badge Number',
          emoji: '🪪👷🏾',
          desc: 'Every worker entering the mjengo gate gets a daily serial number: Fundi wa Mawe is #45, his assistant is #82, and the site clerk can call any fundi by their badge number.'
        },
        {
          name: 'pstree = The Mjengo Chain of Command',
          emoji: '🏗️🪜',
          desc: 'Site Engineer (PID 1) -> Electrical Foreman (PID 12) -> Electrician (PID 35) -> Apprentice (PID 91).'
        },
        {
          name: 'Process State R vs S = Kupiga Kazi vs Kungoja Simiti',
          emoji: '🔨⏳',
          desc: 'State R is the fundi actively hammering nails on the roof. State S is the mason resting under a tree waiting for the concrete mixer to arrive.'
        },
        {
          name: 'Zombie (Z) = Fundi Calling for His Daily Wage (Voucher)',
          emoji: '🧟💵',
          desc: 'A casual laborer finished mixing gravel at 4 PM, but the contractor went to buy tea without clearing his voucher. He stays listed on the site book as a Zombie until cleared!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The 3 Process State Poses!"',
      instruction: 'Act out the 3 main process states right now in 5 seconds:',
      steps: [
        '1️⃣ Jog in place briskly 🏃 — say: "State R: Running on CPU!"',
        '2️⃣ Close your eyes and tilt your head on folded hands 😴 — say: "State S: Sleeping & Waiting!"',
        '3️⃣ Stick both arms straight out stiff like Frankenstein 🧟 — say: "State Z: Zombie finished, waiting for Parent!"'
      ],
      whyItWorks:
        'Physical movement bridges abstract OS process states into tangible physical postures. You will instantly recognize "R", "S", and "Z" columns in top and ps!'
    },
    quickTakeaway:
      'In Linux, every task is a Process with a unique PID and parent PPID (originating from systemd PID 1). View snapshots with "ps aux" or "ps -ef", view hierarchies with "pstree", and watch for Zombie (Z) or Disk-sleep (D) states.'
  },

  // ==========================================================================
  // 12.2 REAL-TIME & ENHANCED PROCESS MONITORING
  // ==========================================================================
  {
    id: 'realtime-process-monitoring',
    number: '12.2',
    title: 'Real-Time & Enhanced Process Monitoring (top, htop & Load Average)',
    shortTitle: 'top vs htop',
    icon: '📊🚀',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    laymanHeadline:
      '"top" is the built-in live hospital monitor for Linux, while "htop" is the sleek color touchscreen upgrade with per-core CPU bars, mouse support, and scrollable process trees.',
    laymanExplanation:
      'While "ps" takes a single still photograph of running programs, "top" and "htop" are live streaming video cameras updating every 1 to 3 seconds! When you launch "top", the header displays: (1) System uptime and the 3 Load Average numbers (1-min, 5-min, 15-min), (2) Total task counts, (3) CPU state percentages (%us user, %sy system, %id idle, %wa waiting for disk I/O), and (4) RAM & Swap utilization. Inside "top", you can press interactive hotkeys without exiting: press "M" to sort by Memory usage, press "P" to sort by CPU usage, press "k" to kill a PID, or press "q" to quit. For an even more intuitive visual experience, enterprise admins install "htop": it provides color progress bars for every CPU core, full mouse clicking support, arrow-key scrolling, visual tree view (F5), real-time process search (F3), and an interactive signal menu (F9) so you never have to remember signal numbers!',
    laymanPoints: [
      {
        term: 'top (Table of Processes)',
        meaning:
          'The universal, built-in real-time process viewer installed on every Linux distribution since Unix beginnings.'
      },
      {
        term: 'htop (Enhanced top)',
        meaning:
          'A colorful interactive task manager featuring per-CPU core meters, mouse click support, scrolling, and easy function-key shortcuts (F1–F10).'
      },
      {
        term: '%wa (I/O Wait)',
        meaning:
          'Percentage of time CPU sits twiddling its thumbs waiting for slow hard drive reads/writes. High %wa indicates a disk bottleneck, not a weak CPU!'
      },
      {
        term: 'Load Average (1, 5, 15 min)',
        meaning:
          'The average number of processes waiting for CPU time. Compare it with your CPU core count (run "nproc"): 4.0 on a 4-core machine is 100% capacity.'
      },
      {
        term: 'Hotkeys in top (P, M, k, q)',
        meaning:
          'Shift+P sorts by CPU; Shift+M sorts by RAM memory; "k" prompts for a PID to kill; "q" quits.'
      },
      {
        term: 'Hotkeys in htop (F3, F5, F9, F10)',
        meaning:
          'F3 searches processes; F5 toggles tree view; F9 opens the signal kill menu; F10 exits safely.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Living Activity Monitor & Digital Thermostat Screen',
      icon: '🏠📺🎛️',
      summary:
        '“top is the blinking LED electric meter on the wall, while htop is the luxury tablet dashboard showing color-coded room temperatures and letting you tap to switch off appliances!”',
      points: [
        {
          name: 'top = The Black-and-White LED Power Box',
          emoji: '📟⬛',
          desc: 'Reliable, never breaks down, found in every basement in the world. Displays raw numbers updating every few seconds.'
        },
        {
          name: 'htop = The Modern iPad Smart Home Controller',
          emoji: '📱🌈',
          desc: 'Beautiful neon bars showing each kitchen stove burner (CPU cores), touch-scrollable lists, and color warnings when a space heater gets too hot.'
        },
        {
          name: 'Shift+P vs Shift+M = Finding the Biggest Power & Water Consumers',
          emoji: '🔍⚡',
          desc: 'Pressing Shift+P puts the hungriest appliance at the top of the list (e.g. air conditioner). Pressing Shift+M puts the appliance with the biggest water reservoir at the top.'
        },
        {
          name: 'I/O Wait (%wa) = Delivery Truck Stuck in the Driveway Gate',
          emoji: '🚛🚧',
          desc: 'The chef has both hands free and ready to cook, but he is forced to pause because the delivery van carrying tomatoes is stuck at the narrow driveway.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Matatu Fleet GPS Control Room at Kencom CBD!',
      icon: '🇰🇪🚌🗺️',
      summary:
        '“The Sacco dispatch office monitors 50 matatus live on screen: seeing engine RPM (CPU), passenger loading (%MEM), Thika highway traffic jams (Load Average), and radioing an overheating bus to pull over!”',
      points: [
        {
          name: 'top = The Fleet Radio & Logbook Screen',
          emoji: '📻📋',
          desc: 'The continuous live radio ticker updating: "KBZ 412 speeding at 110 km/h, KCD 890 idling at Odeon Stage, KCA 104 in heavy traffic."'
        },
        {
          name: 'htop = The Sacco Color GPS Multi-Screen Dashboard',
          emoji: '🖥️🚦',
          desc: 'Color bars showing all 4 lanes of Thika Superhighway (4 CPU cores), green bars for smooth traffic, red bars for severe congestion, and clickable bus icons.'
        },
        {
          name: 'Load Average = Traffic Snarl-up at Museum Hill',
          emoji: '🚗🚛',
          desc: 'If the roundabout has 2 lanes and 2 vehicles passing per minute, traffic flows (Load 2.0). If 8 vehicles are trying to squeeze through 2 lanes, traffic stalls (Load 8.0).'
        },
        {
          name: 'F9 Kill Menu = Sacco Dispatcher Calling Conductor to Park the Bus',
          emoji: '🛑📱',
          desc: 'The dispatcher selects the smoky matatu on screen, taps F9, and sends the signal: "Simama kwa petrol station mara moja!"'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The htop Core Flex!"',
      instruction: 'Do this 5-second mental muscle lock for htop:',
      steps: [
        '1️⃣ Hold up 4 fingers on your left hand 🖖 — say: "4 CPU Cores: htop shows every core!"',
        '2️⃣ Tap your index finger like clicking a mouse 👆 — say: "htop has mouse support & F-keys!"',
        '3️⃣ Press an imaginary key with your right thumb ⌨️ — say: "Shift+P for CPU, Shift+M for Memory!"'
      ],
      whyItWorks:
        'Associating 4 fingers with multi-core visualization and the clicking motion with htop’s mouse capability eliminates confusion between plain top and modern htop.'
    },
    quickTakeaway:
      'Use "top" anywhere for quick system health checks. Install "htop" for colorful per-core CPU bars, tree views (F5), and signal menus (F9). Check Load Average against your CPU core count (nproc).'
  },

  // ==========================================================================
  // 12.3 MANAGING PROCESSES & SIGNALS
  // ==========================================================================
  {
    id: 'managing-processes-and-signals',
    number: '12.3',
    title: 'Managing Processes & Signals (kill, killall, pkill & Signal Codes)',
    shortTitle: 'Kill & Signals',
    icon: '🛑📡',
    pastelBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    accentText: 'text-rose-950',
    badgeBg: 'bg-rose-100 text-rose-900',
    laymanHeadline:
      'The "kill" command does not just kill programs—it sends radio signals (messages) to processes! You can politely ask them to save (SIGTERM 15) or forcefully rip their power cord (SIGKILL 9).',
    laymanExplanation:
      'In Linux, processes communicate and receive orders using "Signals" (numbered software interrupts). When you run "kill 1420", you are not smashing the program with a hammer; by default, Linux sends Signal 15 (SIGTERM), which stands for "Terminate gracefully". This politely asks the program: "Please finish writing your current file, save open user tabs, close database connections, and exit cleanly." If a rogue program is completely frozen in an infinite loop, it might ignore SIGTERM. That is when you deploy the nuclear option: Signal 9 (SIGKILL via "kill -9 1420"). The Linux Kernel intercepts SIGKILL directly—the application never even gets a chance to object—and its memory is erased in microseconds! Linux provides over 60 signals, but DevOps engineers rely on 5 core signals: SIGHUP (1: Hang Up / Reload config file without restarting), SIGINT (2: Interrupt / Ctrl+C), SIGKILL (9: Forceful immediate execution), SIGTERM (15: Polite graceful shutdown), and SIGSTOP (19: Pause execution without closing). To manage processes easily, use "kill <PID>" (by ID number), "killall <name>" (kills all processes sharing that exact binary name), or "pkill -f <pattern>" (matches full command line text).',
    laymanPoints: [
      {
        term: 'Signal 15 (SIGTERM - Default)',
        meaning:
          'The polite knock on the door. Asks the process to save state, flush file buffers, and terminate cleanly. Always try this first!'
      },
      {
        term: 'Signal 9 (SIGKILL)',
        meaning:
          'The unblockable executioner. Handled directly by the Linux Kernel. The process cannot catch, ignore, or block this signal.'
      },
      {
        term: 'Signal 1 (SIGHUP)',
        meaning:
          'Hang Up. Tells server daemons (like Nginx, Apache, or SSHD) to re-read their configuration files without dropping existing web visitors.'
      },
      {
        term: 'Signal 2 (SIGINT - Ctrl+C)',
        meaning:
          'Interrupt signal generated when you press Ctrl+C in your terminal to cancel the currently running foreground command.'
      },
      {
        term: 'Signal 19 (SIGSTOP) vs 18 (SIGCONT)',
        meaning:
          'SIGSTOP freezes/pauses the process like pressing pause on Netflix; SIGCONT unpauses and resumes it seamlessly.'
      },
      {
        term: 'kill vs killall vs pkill',
        meaning:
          '"kill 412" targets by PID number; "killall firefox" targets by exact process name; "pkill -f my_script" targets by flexible keyword pattern.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The House Intercom Paging System & Master Breaker',
      icon: '🏠📢🔌',
      summary:
        '“The intercom lets Sam send different messages to helpers: a polite dinner bell (SIGTERM 15), a recipe update memo (SIGHUP 1), or flipping the master circuit breaker on an overheating oven (SIGKILL 9)!”',
      points: [
        {
          name: 'SIGTERM (15) = "Closing Time, Please Pack Your Bags"',
          emoji: '🔔🚪',
          desc: 'Sam chimes the kitchen bell at 6 PM. The chef wipes the counter, puts leftover cheese in the fridge, clocks out, and walks out the front door.'
        },
        {
          name: 'SIGKILL (9) = Ripping the Power Cord Out of the Wall Socket',
          emoji: '⚡🛑',
          desc: 'The microwave starts smoking and the buttons freeze! You don’t read the manual or press Cancel—you yank the plug straight out of the wall instantly.'
        },
        {
          name: 'SIGHUP (1) = Slipping a New Menu Under the Kitchen Door',
          emoji: '📜🍲',
          desc: 'The chef keeps cooking dinner for guests without stopping, but glances at the new recipe card and starts cooking the new soup recipe immediately.'
        },
        {
          name: 'killall vs pkill = Announcing to All Gardeners vs Searching by Name',
          emoji: '📣👥',
          desc: '"killall gardener" tells every gardener in the backyard to stop; "pkill -f hedge" finds whichever worker is currently trimming the hedge.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Restaurant Supervisor & Bouncer Protocols at Westlands!',
      icon: '🇰🇪🍽️💂🏾',
      summary:
        '“Managing busy restaurant staff and unruly customers follows 3 strict protocols: the polite bill request (SIGTERM 15), the bouncer forcefully ejecting a troublemaker (SIGKILL 9), and the manager handing out the new happy hour price list (SIGHUP 1)!”',
      points: [
        {
          name: 'SIGTERM (15) = "Last Call at the Counter, Tafadhali"',
          emoji: '🧾🙏🏾',
          desc: 'The waiter politely brings the bill to the table at 11 PM: customers finish their drinks, pay via M-Pesa, collect their jackets, and exit peacefully.'
        },
        {
          name: 'SIGKILL (9) = The 6-Foot Bouncer Picking Up an Agitator by the Collar',
          emoji: '🥊🚪',
          desc: 'A customer starts throwing glasses and refuses to listen. The bouncers don’t debate or negotiate: they lift him up and toss him out past the security gate in 2 seconds!'
        },
        {
          name: 'SIGHUP (1) = Changing the Lunch Chalkboard Menu at Mama Oliech',
          emoji: '📋🐟',
          desc: 'The jiko keeps burning and ugali keeps cooking, but Mama updates the chalkboard prices so all new orders use the new price without closing the kitchen.'
        },
        {
          name: 'pkill -u visitor = Telling All Day Visitors to Leave the Compound',
          emoji: '📢🏡',
          desc: 'The estate caretaker using the loudspeaker: "Wageni wote wa siku, muda wenu umeisha!" to dismiss everyone in that category simultaneously.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The 15 vs 9 Hand Gestures!"',
      instruction: 'Do the polite vs nuclear signal lock with your hands:',
      steps: [
        '1️⃣ Place your palm flat in a gentle stop gesture ✋ — say: "Signal 15 (SIGTERM): Please save & exit politely!"',
        '2️⃣ Make a swift karate chop with your right hand 🥋 — shout: "Signal 9 (SIGKILL): Kernel executioner, zero mercy!"',
        '3️⃣ Roll your hands in a circle 🔄 — say: "Signal 1 (SIGHUP): Reload configuration live!"'
      ],
      whyItWorks:
        'Gentle palm = 15; Karate chop = 9; Circle roll = 1 reload. Your body creates instant muscle memory so you never accidentally use kill -9 when a graceful kill -15 was needed.'
    },
    quickTakeaway:
      'Always start with "kill <PID>" (polite SIGTERM 15) so apps save their data. Only escalate to "kill -9 <PID>" (forceful SIGKILL) if the process is completely frozen. Use "killall" for exact names and "pkill" for patterns.'
  },

  // ==========================================================================
  // 12.4 CONTROLLING PROCESS PRIORITY (NICE & RENICE)
  // ==========================================================================
  {
    id: 'controlling-process-priority',
    number: '12.4',
    title: 'Controlling Process Priority (nice, renice & The -20 to +19 Scale)',
    shortTitle: 'Nice & Renice',
    icon: '⚖️🎩',
    pastelBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    accentText: 'text-purple-950',
    badgeBg: 'bg-purple-100 text-purple-900',
    laymanHeadline:
      'In Linux, "Niceness" is a politeness scale from -20 to +19: very nice processes (+19) politely step aside and give up CPU time, while rude/selfish VIP processes (-20) demand CPU attention first!',
    laymanExplanation:
      'Your Linux CPU handles hundreds of processes simultaneously by dividing time into tiny fractions of a second (time slices) governed by the Completely Fair Scheduler (CFS). But what if you are encoding a huge 4K video in the background and you do not want it to lag your live web browser or database? That is where "Niceness" (NI) comes in! The Linux niceness scale ranges from -20 to +19 (default is 0). The counterintuitive rule that trips up every beginner is: HIGH NICENESS (+19) means the process is super sweet, gentle, and polite—it steps aside and lets other programs use the CPU first. LOW NICENESS (-20) means the process is rude, impatient, and selfish—it pushes its way to the front of the line! Only the root superuser (sudo) can grant negative nice values (-20 to -1), because prioritizing one process takes CPU power away from others. Regular users can only make their own processes nicer (0 to +19). Use "nice -n <val> <command>" to launch a brand new program with priority, and use "renice <val> -p <PID>" to change the priority of an already running process on the fly.',
    laymanPoints: [
      {
        term: 'Niceness Scale (-20 to +19)',
        meaning:
          '-20 = Highest priority (least nice, grabs CPU time slices first). +19 = Lowest priority (most nice, only runs when CPU is idle).'
      },
      {
        term: 'Default Niceness (0)',
        meaning:
          'Every normal command launched in a Linux terminal starts with a default niceness value of 0 (standard equal priority).'
      },
      {
        term: 'Root Privilege for Negative Values',
        meaning:
          'Only root (sudo) can assign negative niceness (-1 to -20) or decrease niceness (making a process less polite).'
      },
      {
        term: 'nice -n <val> <command>',
        meaning:
          'Launches a brand new command with a customized priority (e.g. "nice -n 19 tar -czf backup.tar.gz /data").'
      },
      {
        term: 'renice <val> -p <PID>',
        meaning:
          'Modifies the priority of an existing, already running process without restarting it (e.g. "sudo renice -5 -p 1420").'
      },
      {
        term: 'PR vs NI in top',
        meaning:
          'NI is the user-configured niceness (-20 to +19); PR is the actual dynamic kernel internal priority (usually PR = 20 + NI).'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Queue at the Single Kitchen Microwave',
      icon: '🏠🍲🎩',
      summary:
        '“Sam’s house has 5 family members waiting to warm food. The polite kid with Niceness +19 says: ‘Go ahead, warm your soup first! I have plenty of time!’ While the hungry toddler with Niceness -20 screams and jumps to the front!”',
      points: [
        {
          name: 'Niceness +19 = The Polite Polite Guest',
          emoji: '😇🍵',
          desc: '“I’m just brewing evening tea, no rush at all! You warm your dinner first, I’ll wait until the kitchen is completely empty.” Perfect for background overnight backups.'
        },
        {
          name: 'Niceness -20 = The VIP Emergency Doctor',
          emoji: '🚨👨‍⚕️',
          desc: '“I have a medical emergency in 3 minutes, let me use the microwave right now!” The house rules yield to the doctor immediately.'
        },
        {
          name: 'nice -n 19 tar = Gentle Background Chores',
          emoji: '🧹📦',
          desc: 'Telling the room vacuum robot: "Clean the hallway, but only vacuum when nobody is walking through the corridor."'
        },
        {
          name: 'renice = Calling the Hallway to Promote or Demote Someone in Line',
          emoji: '📢🚶',
          desc: 'The mother walks into the kitchen and says: "Uncle Bob needs to leave for the airport, let him cut the line to the front (renice -10)!"'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: Boarding a Busy Matatu at Kencom vs VIP Presidential Escort on Uhuru Highway!',
      icon: '🇰🇪🚐🚓',
      summary:
        '“On Kenyan roads, normal cars have Niceness 0. A humble lorry carrying sand has Niceness +19 (drives on the slow left lane yielding to everyone), while an Ambulance with sirens has Niceness -20 (all traffic clears the way immediately)!”',
      points: [
        {
          name: 'Niceness +19 = The Sand Lorry on the Climbing Lane',
          emoji: '🚛🐢',
          desc: 'Driving up the Kinungi hill on the slow lane: whenever a fast car or bus approaches, the lorry yields space so others pass smoothly without traffic jams.'
        },
        {
          name: 'Niceness -20 = The Red Cross Ambulance with Sirens',
          emoji: '🚑🚨',
          desc: 'Traffic police at Nyayo Stadium clear the roundabout immediately: "Gari zote simama, gari la wagonjwa lipite kwanza!" Only the government (sudo) can activate sirens.'
        },
        {
          name: 'nice -n 15 = Running a Heavy Data Backup Overnight on Wi-Fi',
          emoji: '🌙💾',
          desc: 'Setting your big file download so your family can stream YouTube and make WhatsApp calls without their videos buffering.'
        },
        {
          name: 'renice -p 891 = Upgrading the M-Pesa Payment Server Priority',
          emoji: '💳⚡',
          desc: 'When Friday evening rush hour starts, the supermarket manager gives top priority to the till point server so customer payments clear in 1 second.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The Polite Bow vs VIP Chest Poomf!"',
      instruction: 'Anchor the counterintuitive niceness scale in your body:',
      steps: [
        '1️⃣ Take a polite gentle bow with hands clasped 🙏 — say: "High Nice (+19): So polite, you go first!"',
        '2️⃣ Puff your chest out like a proud VIP bodyguard 🦸 — say: "Negative Nice (-20): VIP priority, clear the way!"',
        '3️⃣ Stand neutral with hands at your side 🧍 — say: "Zero (0): Standard everyday default!"'
      ],
      whyItWorks:
        'Because positive numbers usually mean "bigger/faster" in math, people mistakenly think +19 is fast. Physical bowing immediately locks in that positive niceness = polite yielding.'
    },
    quickTakeaway:
      'Niceness ranges from -20 (highest priority/VIP) to +19 (lowest priority/polite). Launch with "nice -n <val> <cmd>" and adjust running tasks with "sudo renice <val> -p <PID>".'
  },

  // ==========================================================================
  // 12.5 MANAGING BACKGROUND AND FOREGROUND JOBS
  // ==========================================================================
  {
    id: 'background-and-foreground-jobs',
    number: '12.5',
    title: 'Managing Background and Foreground Jobs (&, Ctrl+Z, jobs, bg, fg & nohup)',
    shortTitle: 'Jobs, bg & fg',
    icon: '🤹⚡',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-900',
    laymanHeadline:
      'Job control lets you multitask in a single terminal: push long commands to the background with "&" or "Ctrl+Z", check your task roster with "jobs", bring them back with "fg", and keep them alive after closing your laptop with "nohup"!',
    laymanExplanation:
      'When you run a command like "sleep 100" in your terminal, it runs in the FOREGROUND—meaning your command prompt is hijacked and you cannot type anything else until it finishes. But Linux gives you superpowers to juggle multiple tasks at once! (1) Append an ampersand "&" at the end of any command (e.g., "tar -czf backup.tar.gz /data &") to launch it directly into the BACKGROUND; your terminal prompt returns instantly so you can keep working! (2) If a foreground command is already running and holding your terminal hostage, press "Ctrl+Z" to freeze/suspend it (Signal 19 SIGSTOP), then type "bg" (background) to let it continue running behind the scenes! (3) Type "jobs -l" to see all background jobs managed by your current shell session, numbered like [1]+ and [2]-. (4) Type "fg %1" (foreground) to pull Job #1 back to your screen whenever you want to interact with it again. (5) Crucial Production Tip: If you close your terminal or lose SSH connection, the kernel sends SIGHUP and kills all your background jobs! To make a background job survive terminal closure or laptop sleep, prefix it with "nohup" (No Hang Up) or detach it with "disown": "nohup python3 long_script.py > output.log 2>&1 &".',
    laymanPoints: [
      {
        term: 'Foreground Process',
        meaning:
          'A program attached directly to your terminal keyboard and screen. You must wait for it to finish before typing another command.'
      },
      {
        term: 'Background Process (&)',
        meaning:
          'Adding "&" at the end of a command detaches standard input and runs the task behind the curtain, freeing your prompt instantly.'
      },
      {
        term: 'Ctrl+Z (Suspend)',
        meaning:
          'Freezes and pauses the current foreground command, placing it in a stopped background state so you can inspect or resume it.'
      },
      {
        term: 'jobs -l',
        meaning:
          'Lists all active background jobs running in your current terminal session with their Job Number [1], PID, and state (Running/Stopped).'
      },
      {
        term: 'bg %1 vs fg %1',
        meaning:
          '"bg %1" tells paused Job #1 to start running in the background; "fg %1" brings Job #1 back to the foreground of your screen.'
      },
      {
        term: 'nohup & disown',
        meaning:
          'Immunity from terminal hang-up (SIGHUP). Ensures long-running scripts keep working even after you disconnect your SSH session or shut your laptop.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Kitchen Butler Multitasking with Appliances',
      icon: '🏠🍳🧺',
      summary:
        '“Sam doesn’t stand in front of the washing machine for 45 minutes staring at the spin cycle! He presses Start, leaves it washing in the background (&), chops vegetables at the kitchen counter, and pulls the laundry out when it beeps (fg)!”',
      points: [
        {
          name: 'Foreground = Stirring the Delicate Custard Pot',
          emoji: '🥣👀',
          desc: 'Both hands and your full attention are glued to the stove. You cannot answer the front door or check your phone until the custard is done.'
        },
        {
          name: 'Background (&) = Tossing Wet Clothes into the Washing Machine',
          emoji: '🧺⚡',
          desc: 'You load the laundry, press Start with "&", and immediately walk away to read a book while the machine hums quietly in the laundry room.'
        },
        {
          name: 'Ctrl+Z & bg = Answering a Sudden Knock at the Front Door',
          emoji: '⏸️🚪',
          desc: 'You are vacuuming the carpet. The doorbell rings: you press the vacuum pause button (Ctrl+Z), talk to the courier, and then tap the robot switch (bg) to finish vacuuming alone.'
        },
        {
          name: 'nohup = Setting the Slow-Cooker Stew Before Going to Work',
          emoji: '🍲🏢',
          desc: 'Even if you leave the house and lock the front door behind you (closing SSH), the slow-cooker keeps simmering happily until dinner time!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: Multitasking at the Local Cyber Café & Laundromat!',
      icon: '🇰🇪💻🧺',
      summary:
        '“At the cyber café, you don’t stare blankly at a 500-page color print job for 30 minutes! You click Print in the background (&), browse your email, check pending jobs on the printer queue, and walk over to collect the stack (fg)!”',
      points: [
        {
          name: 'Foreground = Keying in KRA iTax PIN Interactively',
          emoji: '⌨️🔒',
          desc: 'You are typing security questions and OTP codes on the screen. The browser has your 100% focus until submission is complete.'
        },
        {
          name: 'Background (&) = Downloading a 5GB Software Update',
          emoji: '📥🚀',
          desc: 'Adding "&" so the giant download runs quietly in the background while you continue typing your CV in LibreOffice without freezing.'
        },
        {
          name: 'jobs -l = Checking the Cyber Café Printer Queue',
          emoji: '📋🖨️',
          desc: 'Looking at the printer screen: Job [1] (KRA returns) is Running; Job [2] (CV photocopy) is Paused.'
        },
        {
          name: 'nohup = Leaving the Overnight M-Pesa Reconciliation Batch Running',
          emoji: '🌙🧾',
          desc: 'The accountant launches the financial reconciliation script at 6 PM with "nohup", shuts down his laptop, and catches a matatu home—knowing the server will finish the job by morning.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The Background Toss & Foreground Catch!"',
      instruction: 'Act out backgrounding and foregrounding with your hands:',
      steps: [
        '1️⃣ Throw an imaginary ball over your shoulder with your thumb 👍 — say: "& or bg: Toss it to the background!"',
        '2️⃣ Reach out with both hands and pull an imaginary rope towards your chest 🤲 — say: "fg: Bring it back to foreground!"',
        '3️⃣ Cross your fingers over your chest 🛡️ — say: "nohup: Immune to terminal hang-up!"'
      ],
      whyItWorks:
        'Tossing behind your shoulder mirrors "&" and "bg", pulling toward your chest mirrors "fg", and the shield gesture anchors "nohup" immunity.'
    },
    quickTakeaway:
      'Add "&" to run commands in the background. Press "Ctrl+Z" to freeze a foreground task, then type "bg" to resume it behind the scenes or "fg %1" to bring it back. Use "nohup" to keep jobs running after logout.'
  },

  // ==========================================================================
  // 12.6 MONITORING DISK USAGE
  // ==========================================================================
  {
    id: 'monitoring-disk-usage',
    number: '12.6',
    title: 'Monitoring Disk Usage (df -h, df -i Inodes, du -sh & ncdu)',
    shortTitle: 'Disk Usage',
    icon: '💽📦',
    pastelBg: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    accentText: 'text-cyan-950',
    badgeBg: 'bg-cyan-100 text-cyan-900',
    laymanHeadline:
      '"df -h" tells you how full your whole apartment building is, while "du -sh" lets you walk into each room to find which giant cardboard box is taking up all the closet space!',
    laymanExplanation:
      'Disk fullness is one of the most common causes of unexpected server crashes: when a Linux partition reaches 100%, databases refuse to write records, web servers stop logging, and SSH logins fail. Linux provides two fundamental commands to conquer storage: (1) "df -h" (Disk Free, Human-readable in GB/MB): Shows every mounted storage drive, total size, used space, available space, and percentage fullness. (2) "df -i" (Inodes): A legendary Linux gotcha! Even if you have 50 GB of free space, if a rogue program creates 2 million tiny empty text files, you will run out of "Inodes" (file index cards), causing "No space left on device" errors! (3) "du -sh *" (Disk Usage, Summary, Human-readable): Shows the exact storage footprint of each folder and file in your current directory. A professional sysadmin combines du with sort: "du -sh /var/log/* | sort -h" to immediately expose which runaway log file bloated your server. For modern interactive exploration, "ncdu" (NCurses Disk Usage) gives you an interactive visual folder browser where you can navigate directories with arrow keys and delete bloated caches with a single press of "d"!',
    laymanPoints: [
      {
        term: 'df -h (Disk Free)',
        meaning:
          'Reports overall partition storage capacity, showing Total, Used, and Available megabytes/gigabytes across all mounted drives.'
      },
      {
        term: 'df -i (Inode Count)',
        meaning:
          'Checks available Inodes (file tracking cards). You can run out of disk capacity if Inodes reach 100%, even with gigabytes of free bytes remaining!'
      },
      {
        term: 'du -sh * (Disk Usage Summary)',
        meaning:
          'Scans and summarizes the physical disk space consumed by each folder and file in the current working directory.'
      },
      {
        term: 'du -h --max-depth=1',
        meaning:
          'Displays directory sizes only one level deep, preventing your terminal from being spammed by thousands of sub-sub-folders.'
      },
      {
        term: 'du -sh /var/* | sort -h',
        meaning:
          'The ultimate detective pipeline! Sorts folders from smallest to largest in human-readable units (K, M, G) to spotlight disk hogs instantly.'
      },
      {
        term: 'ncdu (NCurses Disk Usage)',
        meaning:
          'A super-fast interactive terminal disk browser with visual progress bars, arrow-key navigation, and instant file deletion.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Attic Storage Gauge & The Cardboard Box Audit',
      icon: '🏠📦🔍',
      summary:
        '“df -h is the exterior electronic gauge showing Sam’s attic is 95% full. du -sh is Sam walking into the attic with a tape measure to discover that 4 old photo albums are taking up 80% of the shelf!”',
      points: [
        {
          name: 'df -h = The Attic Ceiling Red Light',
          emoji: '🚨🏠',
          desc: 'The sensor warning: "Attic capacity is at 48 GB out of 50 GB! Warning: only 2 GB remaining before boxes collapse!"'
        },
        {
          name: 'df -i = The Recipe Card Index Box',
          emoji: '📇🏷️',
          desc: 'You have plenty of room in your kitchen drawers, but your index box only came with 1,000 label cards. Once card #1,000 is used, you cannot name or store a single new item!'
        },
        {
          name: 'du -sh * = Measuring Each Trunk in the Storage Room',
          emoji: '📏🧳',
          desc: 'Holding up the tape measure: "Trunk A is 200MB, Trunk B is 1.5GB, Trunk C is 24GB (Aha! Here is the culprit!)."'
        },
        {
          name: 'ncdu = A Walk-Through Virtual Reality Tour of the Closet',
          emoji: '🕶️🚪',
          desc: 'Walking through closet doors with arrow keys, opening sub-drawers with Enter, and tossing unwanted junk straight into the recycling bin with "d".'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Rooftop Roto Water Tank & Warehouse Gunia Inventory!',
      icon: '🇰🇪🚰🌾',
      summary:
        '“df -h is checking the water level glass tube on your 10,000-liter rooftop Roto tank. du -sh is walking inside the wholesale warehouse in Gikomba to check which sacks of maize and beans are overloading the floor!”',
      points: [
        {
          name: 'df -h = Tapping the Plastic Roto Tank on the Roof',
          emoji: '🚰📏',
          desc: 'Tapping the tank with a knuckle to hear where the hollow sound starts: "Tuko 80% full, maji inakaribia kumwagika!"'
        },
        {
          name: 'df -i = The Wholesale Receipt Book Pages (Inodes)',
          emoji: '🧾📖',
          desc: 'Even if the wholesale store has 5 tons of empty space, if the clerk’s official receipt book runs out of blank pages, no new bag can be registered or entered into the gate!'
        },
        {
          name: 'du -sh /var/log/* = Checking Each Gunia in the Stoor',
          emoji: '🌾⚖️',
          desc: 'Weighing each sack on the hanging scale: Gunia ya Mchele is 50kg, Gunia ya Ndengu is 20kg, Gunia ya Mahindi ya Zamani is 400kg.'
        },
        {
          name: 'ncdu = The Smart Warehouse Tablet Inventory Scanner',
          emoji: '📱🛒',
          desc: 'The storekeeper uses a handheld barcode scanner with arrow keys to see exactly which aisle and shelf has bloated unsold inventory and clears it out.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The Tank Tap & Scale Weigh!"',
      instruction: 'Do this 2-step physical memory check for df vs du:',
      steps: [
        '1️⃣ Tap an imaginary rooftop tank high above your head 🚰 — say: "df -h: Disk Free overall partition capacity!"',
        '2️⃣ Hold both hands down like balancing two heavy grocery bags ⚖️ — say: "du -sh: Disk Usage measuring specific folders!"'
      ],
      whyItWorks:
        'Reaching high up links "df" to high-level partition overview. Balancing bags low links "du" to weighing individual folders inside the directory.'
    },
    quickTakeaway:
      'Check overall storage with "df -h" (and check inode limits with "df -i"). Find space hogs using "du -sh * | sort -h" or launch "ncdu" for interactive arrow-key navigation and cleanup.'
  }
];
