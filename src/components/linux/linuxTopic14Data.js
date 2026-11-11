// Topic 14: System Monitoring (6 Subtopics)
// 14.1 Checking Disk Space (df -h, df -i Inodes, du -sh & ncdu)
// 14.2 Monitoring Memory Usage (free -h, Buff/Cache, Swap & OOM Killer)
// 14.3 Viewing CPU Information (lscpu, /proc/cpuinfo, Sockets, Cores & Threads)
// 14.4 Checking System Uptime and Load (uptime, w & Load Average 1m/5m/15m)
// 14.5 Monitoring CPU and I/O Performance (iostat, vmstat, %iowait & sar)
// 14.6 Listing Open Files and Processes (lsof, lsof -i, fuser & Unmounting Drives)

export const linuxTopic14Subtopics = [
  // ==========================================================================
  // 14.1 CHECKING DISK SPACE
  // ==========================================================================
  {
    id: 'checking-disk-space',
    number: '14.1',
    title: 'Checking Disk Space (df -h, Inodes with df -i, du -sh & ncdu)',
    shortTitle: 'Checking Disk Space',
    icon: '💽📦',
    pastelBg: 'bg-blue-50',
    borderColor: 'border-blue-300',
    accentText: 'text-blue-950',
    badgeBg: 'bg-blue-100 text-blue-900',
    laymanHeadline:
      'Checking disk space requires two perspectives: "df" asks the landlord how full the entire storage building is, while "du" measures the exact weight of each box inside your rooms.',
    laymanExplanation:
      'In Linux, you can run out of disk space in two completely different ways: filling up raw gigabytes OR running out of file index slots called "inodes"!\n• "df -h" (Disk Free - Human Readable): Shows total capacity, used space, available space, and mount points across all hard drive partitions (in GB and MB).\n• "df -i" (Inode Exhaustion): Every file and folder consumes 1 inode (an index card with metadata). If a buggy script generates 2 million tiny 1-byte files, "df -h" will say you have 80 GB free, but Linux will throw "No space left on device" errors because 100% of your inodes are exhausted!\n• "du -sh *" (Disk Usage - Summary Human): While "df" inspects partition superblocks, "du" walks folder trees to tell you exactly which folder is bloated (e.g. 18G in /var/log).\n• "ncdu" (NCurses Disk Usage): A visual interactive terminal file browser that lets you navigate folder sizes and delete culprits with one keypress!',
    laymanPoints: [
      {
        term: 'df -h (Disk Free)',
        meaning:
          'Queries the filesystem superblock for instant partition-level storage summaries (Total, Used, Available, Use%, Mounted on).'
      },
      {
        term: 'df -i (Inode Count)',
        meaning:
          'Displays the number of free vs used index cards (inodes). Zero free inodes stops file creation even with 500GB of empty space!'
      },
      {
        term: 'du -sh * (Disk Usage)',
        meaning:
          'Calculates the cumulative size of every directory in the current location to identify which folder is hoarding gigabytes.'
      },
      {
        term: 'du -h --max-depth=1',
        meaning:
          'Summarizes folder sizes strictly one level deep, preventing your terminal from being spammed with thousands of nested files.'
      },
      {
        term: 'ncdu (Interactive Auditor)',
        meaning:
          'Terminal-based visual graphical disk usage analyzer with arrow-key navigation and in-place deletion.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Attic Storage Floor & The Numbered Coat Check',
      icon: '🏠🧳🏷️',
      summary:
        '“df is checking the house blueprints to see if the attic storage floor can hold more weight. Inodes (df -i) is checking if the coat check has any plastic hanger tags left. du is placing each cardboard box on a bathroom scale!”',
      points: [
        {
          name: 'df -h = Attic Weight Limit Gauge',
          emoji: '🏗️⚖️',
          desc: 'Tells you: "The attic can hold 1,000 kg, and you have 820 kg stored (82% full)."'
        },
        {
          name: 'df -i = The Box of Numbered Plastic Hanger Tags',
          emoji: '🏷️🔢',
          desc: 'Even if the attic is almost empty, if you hang 1,000 tiny socks and use up all 1,000 tags, you cannot hang another winter coat!'
        },
        {
          name: 'du -sh = Placing Boxes on Bathroom Scales',
          emoji: '📦⚖️',
          desc: 'Box A (Holiday Decorations) is 45 kg; Box B (Old Books) is 240 kg. Now you know which box to throw out.'
        },
        {
          name: 'ncdu = Wandering the Attic with a Label Maker',
          emoji: '🔦🧹',
          desc: 'Walking room-to-room with a flashlight, sorting trunks largest to smallest, and opening the lid to trash junk.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Gikomba Wholesale Warehouse & Gunia Receipt Book',
      icon: '🇰🇪🏬🌾',
      summary:
        '“Managing Linux disk space is like running a grain and produce warehouse in Gikomba or Ruiru: checking the total floor space for sacks (df -h), checking if the clerk’s numbered receipt book has empty pages left (df -i), and weighing individual gunias (du -sh)!”',
      points: [
        {
          name: 'df -h = Warehouse Floor Capacity',
          emoji: '🏢📐',
          desc: 'The warehouse foreman looks across the room: "We have capacity for 500 bags of maize; 410 bags are stacked (82% full)."'
        },
        {
          name: 'df -i = The Clerk’s Carbon-Copy Receipt Book (Inodes)',
          emoji: '🧾✍️',
          desc: 'If the clerk issues 10,000 tiny receipts for 1-shilling sweets, the receipt book runs out. You cannot receive a lorry of maize without a receipt number!'
        },
        {
          name: 'du -sh * = Weighing Each Corner Stack with a Spring Scale',
          emoji: '⚖️🥔',
          desc: 'Stack 1 (Potatoes) = 2.4 Tonnes; Stack 2 (Rice) = 850 kg; Stack 3 (Rotten Cabbages) = 1.1 Tonnes.'
        },
        {
          name: 'ncdu = The Sacco Auditor Inspecting Each Shelf',
          emoji: '🕵️‍♂️📋',
          desc: 'The auditor walks down aisle 3, spots bloated expired boxes, and tells the loader to haul them to the dump.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The Scale vs Receipt Check!"',
      instruction: 'Lock in the difference between df and du in 5 seconds:',
      steps: [
        '1️⃣ Spread both arms wide to form a giant room box 📦 — say: "df -h: High-level filesystem capacity!"',
        '2️⃣ Point your thumb down like pressing down on a heavy scale ⚖️ — say: "du -sh: Directory weight under your feet!"',
        '3️⃣ Pinch two fingers together like pulling a receipt tag 🏷️ — say: "df -i: Don’t run out of Inodes!"'
      ],
      whyItWorks:
        'Framing "df" with wide arms (partition ceiling) versus "du" pointing down (folder scale) permanently eliminates confusing df with du!'
    },
    quickTakeaway:
      'Use "df -h" to check overall partition usage, "df -i" to verify inode availability, and "du -sh *" or "ncdu" to drill down and locate bloated directories.'
  },

  // ==========================================================================
  // 14.2 MONITORING MEMORY USAGE
  // ==========================================================================
  {
    id: 'monitoring-memory-usage',
    number: '14.2',
    title: 'Monitoring Memory Usage (free -h, Buff/Cache, Swap & OOM Killer)',
    shortTitle: 'Monitoring Memory',
    icon: '🧠⚡',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    laymanHeadline:
      'In Linux, "unused RAM is wasted RAM"—the kernel aggressively borrows free memory to cache files for lightning-fast disk access, but will instantly surrender it whenever real programs need it.',
    laymanExplanation:
      'When new Linux admins run "free -h", they often panic seeing 90% of RAM used. But Linux is designed to use empty RAM productively:\n• Total vs Used vs Free: "Total" is physical RAM. "Used" is memory actively claimed by apps (browser, web server, database). "Free" is completely untouched memory.\n• buff/cache (Disk Speedup Buffer): Instead of leaving unused RAM empty, Linux copies recently read files into memory. If an app needs that RAM 2 seconds later, Linux dumps the cache in a nanosecond! That is why the most important column is "available", NOT "free".\n• Swap Space (Virtual Hard Drive Overflow): When physical RAM gets tight, Linux swaps inactive memory pages out to the hard drive swap partition or swap file. Swap prevents immediate crashes, but hard drives are 100x slower than RAM.\n• Swappiness (/proc/sys/vm/swappiness): A dial between 0 and 100 controlling how aggressively Linux uses swap (default 60; servers often tune this to 10 or 1 to prioritize RAM).\n• Out-Of-Memory (OOM) Killer: If RAM and Swap are 100% full, the kernel unleashes the OOM Killer to sacrifice the highest-consuming rogue process (e.g. a leaking node.js or java app) to save the server from crashing!',
    laymanPoints: [
      {
        term: 'free -h (Human Readable)',
        meaning:
          'Displays total physical memory, used RAM, buffers/cache, and available RAM in GB/MB.'
      },
      {
        term: 'available vs free',
        meaning:
          '"free" is untouched empty RAM. "available" is the true metric: free RAM + memory that can be instantly reclaimed from cache.'
      },
      {
        term: 'buff/cache',
        meaning:
          'Memory borrowed by the kernel to cache disk files for instant reading. Can be reclaimed immediately by apps.'
      },
      {
        term: 'Swap Memory & Swappiness',
        meaning:
          'Emergency hard drive buffer when RAM fills up. Swappiness (0-100) dictates how eagerly Linux pages data to disk.'
      },
      {
        term: 'OOM Killer (Out Of Memory)',
        meaning:
          'Kernel emergency bodyguard that executes rogue memory-leaking processes when the system runs completely out of RAM.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Living Room Coffee Table & The Garage Overflow Box',
      icon: '🏠☕📦',
      summary:
        '“RAM is your living room coffee table where you work. When you are not using half the table, the butler stacks today’s newspapers there (cache). If you need space, he sweeps the newspapers aside in half a second. If you pile too many projects on the table, you spill over into the garage (Swap)!”',
      points: [
        {
          name: 'Used RAM = Laptop & Notebooks Actively Being Used',
          emoji: '💻📝',
          desc: 'Things you are writing on right this second—they cannot be moved without interrupting your work.'
        },
        {
          name: 'buff/cache = Today’s Magazines Stacked on the Empty Corner',
          emoji: '📰✨',
          desc: 'They make the room look full, but the moment you put down a cup of tea, the magazines are shoved aside effortlessly.'
        },
        {
          name: 'Swap = Storing Extra Notebooks in the Garage',
          emoji: '🚗📦',
          desc: 'You don’t lose your papers, but walking to the garage takes 2 minutes compared to 1 second on the coffee table.'
        },
        {
          name: 'OOM Killer = The House Safety Inspector with a Shredder',
          emoji: '🚨✂️',
          desc: 'When the coffee table is piled 10 feet high and ready to collapse, the inspector grabs the biggest stack of magazines and throws it in the fire!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The M-Pesa Counter Glass Top & Cash Reserve Drawer',
      icon: '🇰🇪🏪🗄️',
      summary:
        '“An M-Pesa shop agent has an active counter desk (RAM) and a locked under-counter drawer (Swap). The agent keeps scratch cards and daily receipts on the counter for quick access (cache), but can sweep them away if a customer arrives with cash bundles!”',
      points: [
        {
          name: 'Used RAM = Active Floating Cash & Customer Float',
          emoji: '💵🧮',
          desc: 'Money actively being counted for the transaction currently happening in front of the agent.'
        },
        {
          name: 'buff/cache = Stack of Pre-cut Safaricom Scratch Cards',
          emoji: '🎴✨',
          desc: 'Sitting on the glass counter so you don’t have to reach down into boxes every minute.'
        },
        {
          name: 'Swap = The Lower Wooden Locker with Heavy Padlocks',
          emoji: '🗄️⏳',
          desc: 'Takes much longer to open and count, but keeps the shop from turning away transactions when counter space is cramped.'
        },
        {
          name: 'OOM Killer = The Security Bouncer Clearing the Line',
          emoji: '👮🏾‍♂️🛑',
          desc: 'When the tiny agent booth is so packed people can’t breathe, the guard ejects the person carrying the largest bulky carton!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The RAM vs Cache Sweep!"',
      instruction: 'Feel the buffer/cache concept with your hands in 5 seconds:',
      steps: [
        '1️⃣ Place both palms flat on your desk — say: "Used RAM: My active work!"',
        '2️⃣ Scatter your loose pens or papers across the empty desk space — say: "buff/cache: Borrowing empty room for speed!"',
        '3️⃣ In one swift motion, sweep the pens to the side with your forearm 💨 — say: "Available RAM: Instantly reclaimed for apps!"'
      ],
      whyItWorks:
        'Physically sweeping items aside proves to your muscle memory that "cached" memory is never trapped—it is 100% available whenever apps demand it!'
    },
    quickTakeaway:
      'Do not panic if Linux RAM appears full! Always look at the "available" column in "free -h", understand that "buff/cache" accelerates disk I/O, and monitor Swap to ensure the OOM Killer is never triggered.'
  },

  // ==========================================================================
  // 14.3 VIEWING CPU INFORMATION
  // ==========================================================================
  {
    id: 'viewing-cpu-information',
    number: '14.3',
    title: 'Viewing CPU Information (lscpu, /proc/cpuinfo, Sockets, Cores & Flags)',
    shortTitle: 'Viewing CPU Info',
    icon: '💻🔬',
    pastelBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    accentText: 'text-purple-950',
    badgeBg: 'bg-purple-100 text-purple-900',
    laymanHeadline:
      'The CPU is the brain engine of Linux—use "lscpu" to inspect how many physical engine blocks (sockets) you have, how many pistons (cores) are inside each block, and whether hyper-threading gives each piston two pairs of hands.',
    laymanExplanation:
      'Understanding your CPU hardware prevents you from misconfiguring web servers, databases, and Docker containers:\n• "lscpu": The cleanest, most comprehensive CPU summary in Linux. It decodes architecture (x86_64, aarch64), clock speed (MHz), L1/L2/L3 cache sizes, and virtualization support.\n• Sockets vs Cores vs Threads: \n  - Socket: A physical silicon chip plugged into a motherboard socket (most laptops have 1; enterprise servers have 2 or 4).\n  - Core per socket: Physical independent processing units inside that silicon chip (e.g. 8 cores).\n  - Thread per core (Hyper-Threading): Intel/AMD technology allowing 1 physical core to handle 2 logical threads (e.g. 8 cores × 2 threads = 16 vCPUs!).\n• /proc/cpuinfo: The raw kernel virtual file detailing model name, cache size, stepping, and flags for every single logical processor.\n• CPU Flags (Capabilities): Important flags like "vmx" (Intel) or "svm" (AMD) show whether your CPU supports hardware virtualization for KVM/Docker, while "aes" indicates hardware encryption acceleration.',
    laymanPoints: [
      {
        term: 'lscpu',
        meaning:
          'Formatted architecture summary command reporting sockets, cores, threads, clock speed, and cache hierarchy.'
      },
      {
        term: 'Sockets vs Cores vs Threads',
        meaning:
          'Sockets = physical chips; Cores = physical silicon cores inside chip; Threads = logical virtual execution streams (vCPUs).'
      },
      {
        term: '/proc/cpuinfo',
        meaning:
          'Kernel virtual file exposing raw hardware details (model name, MHz, flags) for processor 0, 1, 2... n.'
      },
      {
        term: 'CPU Cache (L1, L2, L3)',
        meaning:
          'Ultra-fast microscopic SRAM memory on the chip die (L1 is fastest per core; L3 is shared across all cores).'
      },
      {
        term: 'Virtualization Flags (vmx / svm)',
        meaning:
          'CPU instructions that allow Linux to run nested virtual machines (vmx for Intel, svm for AMD).'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Master Kitchen Chefs & Their Two Hands',
      icon: '🏠🧑‍🍳🔪',
      summary:
        '“A CPU is like the kitchen cooking staff in Sam’s house: A Socket is a kitchen cooking island. A Core is a physical chef standing at an island. Hyper-Threading is the chef using both their left hand and right hand independently!”',
      points: [
        {
          name: 'Socket = The Physical Stainless-Steel Cooking Island',
          emoji: '🍳🏝️',
          desc: 'A server with 2 sockets has two large separate kitchen islands bolted to the floor.'
        },
        {
          name: 'Cores = The Number of Trained Chefs',
          emoji: '🧑‍🍳👩‍🍳',
          desc: 'Each island has 4 chefs. Two islands × 4 chefs = 8 real human chefs working in the kitchen.'
        },
        {
          name: 'Threads = Chefs Using Both Hands Simultaneously',
          emoji: '👐🥢',
          desc: 'Each chef holds a spatula in their left hand and a knife in their right hand, handling 16 orders at once.'
        },
        {
          name: 'L1/L2/L3 Cache = Spices on the Chef’s Apron vs Pantry',
          emoji: '🧂🏺',
          desc: 'L1 is salt in the chef’s front pocket (0.5 sec); L3 is the spice rack across the room (2 sec); RAM is running to the basement pantry (20 sec)!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Nairobi Industrial Area Metal Fabrication Workshop',
      icon: '🇰🇪🏭🧑🏾‍🏭',
      summary:
        '“Inspecting CPU architecture is like touring a busy metal fabrication workshop in Industrial Area: checking how many master welding tables exist (sockets), how many certified fundis are cutting steel (cores), and whether each fundi has an assistant helping (threads)!”',
      points: [
        {
          name: 'Socket = The Heavy Fabrication Welding Bench',
          emoji: '🛠️🏗️',
          desc: 'A commercial workshop with 2 heavy industrial benches plugged into 3-phase KPLC power.'
        },
        {
          name: 'Cores = Fundis Wa Chuma Actively Welding',
          emoji: '👨🏾‍🏭⚡',
          desc: '6 skilled welders working side by side with their own welding masks and torches.'
        },
        {
          name: 'Threads = Fundi + Mtu wa Mkono (Apprentice)',
          emoji: '🤝🔨',
          desc: 'While the fundi welds, the assistant feeds the steel rod. 6 fundis × 2 workers = 12 active hands (12 vCPUs)!'
        },
        {
          name: 'Flags (vmx/svm) = Heavy License Endorsements',
          emoji: '🪪✨',
          desc: 'Special certifications stamped on the fundi’s badge: certified for argon welding (virtualization) and laser cutting (AES).'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The Sockets, Cores & 2-Hands Pose!"',
      instruction: 'Map CPU architecture onto your upper body in 5 seconds:',
      steps: [
        '1️⃣ Tap both shoulders firmly 🏋️ — say: "Sockets: 2 physical chip sockets on the board!"',
        '2️⃣ Make two strong biceps fists 💪 — say: "Cores: Physical silicon execution cores!"',
        '3️⃣ Open both hands and wiggle all 10 fingers briskly 👐 — say: "Threads: Hyper-Threading vCPUs running in parallel!"'
      ],
      whyItWorks:
        'Shoulders (sockets) -> Biceps (cores) -> Fingers (threads) provides an anatomical hierarchy that makes CPU calculation questions effortless!'
    },
    quickTakeaway:
      'Run "lscpu" for an immediate breakdown of your CPU architecture, physical sockets, silicon cores, and hyper-threaded vCPUs, and check "flags" for virtualization support.'
  },

  // ==========================================================================
  // 14.4 CHECKING SYSTEM UPTIME AND LOAD
  // ==========================================================================
  {
    id: 'system-uptime-and-load',
    number: '14.4',
    title: 'Checking System Uptime and Load (uptime, w & The 1/5/15-Minute Load Average)',
    shortTitle: 'Uptime & Load Average',
    icon: '⏱️📈',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-900',
    laymanHeadline:
      'The "Load Average" is not a percentage—it is the average number of vehicles waiting on a bridge over 1, 5, and 15 minutes: if you have 4 CPU cores, a load of 4.00 means 100% capacity with zero traffic jams!',
    laymanExplanation:
      'To check how long a system has been running without a reboot and how busy it is, type "uptime" or "w":\n• "uptime": Reports the current time, how many days/hours the machine has been up, number of logged-in users, and the three "Load Averages" (1 min, 5 min, 15 min).\n• What is Load Average? It represents the average number of processes that are either actively using the CPU (State R) OR waiting for disk I/O (State D).\n• The Golden Rule of CPU Cores:\n  - On a 1-core machine: Load 0.50 means 50% utilized; Load 1.00 means 100% full capacity; Load 2.50 means the CPU is overloaded and 1.5 processes are queued waiting for turns.\n  - On a 4-core machine: Load 4.00 is 100% full capacity! Load 8.00 means traffic is backed up double.\n• Reading the 3 Numbers (Trend Analysis):\n  - If numbers are "1.20, 2.50, 4.80": Load is DECREASING (traffic jam is clearing up).\n  - If numbers are "5.40, 2.10, 0.90": Load is SPIKING FAST (something just started hoarding the CPU)!\n• "w": Shows uptime plus a breakdown of who is logged in, their terminal (pts/0), IP address, and what command they are currently running.',
    laymanPoints: [
      {
        term: 'uptime',
        meaning:
          'One-line summary displaying system run duration, active user sessions, and 1/5/15-minute load averages.'
      },
      {
        term: 'w Command',
        meaning:
          'Enhanced uptime that also reveals who is logged in, from which IP, idle time, and what program they are executing.'
      },
      {
        term: 'Load Average (1, 5, 15 min)',
        meaning:
          'Average count of processes running on CPU or waiting in uninterruptible disk sleep over 1, 5, and 15 minutes.'
      },
      {
        term: 'Core Capacity Rule',
        meaning:
          'Max healthy load equals your total CPU core count (e.g. 4 cores = 4.00 load is 100% capacity with 0 queue delay).'
      },
      {
        term: 'Load Trend Direction',
        meaning:
          'Comparing the 1m vs 15m numbers shows whether a traffic spike is escalating or resolving.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Single-Lane Toll Bridge & The Traffic Jam',
      icon: '🏠🌉🚗',
      summary:
        '“Think of CPU cores as lanes on a bridge. On a 4-lane bridge, 4 cars crossing smoothly is a Load of 4.00 (perfect 100% capacity). If you see 8 cars, 4 are driving across and 4 are stuck honking in line waiting for space!”',
      points: [
        {
          name: 'Load 0.50 on 1 Lane = Half-Empty Road',
          emoji: '🚗🛣️',
          desc: 'One car passes every two minutes; plenty of room for any new family car to cruise right through.'
        },
        {
          name: 'Load 4.00 on 4 Lanes = Smooth Rush Hour',
          emoji: '🚗🚕🚙🚐',
          desc: 'Every lane has exactly one car driving across. Zero delay, but absolutely no empty space left.'
        },
        {
          name: 'Load 8.00 on 4 Lanes = A Backed-Up Traffic Jam',
          emoji: '🚦😤',
          desc: '4 cars are on the bridge, and 4 more cars are stuck behind the toll booth waiting for their turn.'
        },
        {
          name: '1m vs 15m Trend = Is the Jam Clearing or Growing?',
          emoji: '📈📉',
          desc: 'Load 8.0, 4.0, 1.0 means an accident just happened! Load 1.0, 4.0, 8.0 means the tow truck just hauled the wreck away.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Thika Superhighway Toll Plaza & Matatu Lanes',
      icon: '🇰🇪🛣️🚐',
      summary:
        '“Imagine the 4 express barrier gates at the Nairobi Expressway or Thika Superhighway: If 4 cars pass simultaneously through the 4 gates, Load is 4.00. If 12 matatus arrive at once, 4 are passing and 8 are stuck in a queue!”',
      points: [
        {
          name: 'Load 1.00 on 4 Lanes = Off-Peak Smooth Sailing at 2:00 PM',
          emoji: '🚐💨',
          desc: 'One matatu passing through Gate 1; the other 3 gates are open and waiting for vehicles.'
        },
        {
          name: 'Load 4.00 on 4 Lanes = Friday 5:30 PM Rush Hour',
          emoji: '🚐🚕🚗🚙',
          desc: 'All 4 barrier gates are spinning at maximum speed. Perfect efficiency with zero delay.'
        },
        {
          name: 'Load 10.00 on 4 Lanes = Roundabout Gridlock at Nyayo Stadium',
          emoji: '🚨😤',
          desc: '4 vehicles passing the barrier while 6 cars are bumper-to-bumper behind them blowing horns.'
        },
        {
          name: 'w Command = Checking Which Matatu Driver is Stalled at Gate 2',
          emoji: '👮🏾‍♂️🔎',
          desc: 'The highway patrol screen identifies: Driver Otieno on PTS/1 running a stalled engine (heavy process).'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The 3 Traffic Trend Fingers!"',
      instruction: 'Read load trends with 3 fingers in 5 seconds:',
      steps: [
        '1️⃣ Hold up 3 fingers horizontally (1 min, 5 min, 15 min) 🖐️ — say: "1 minute, 5 minutes, 15 minutes!"',
        '2️⃣ Point your thumb upward 📈 — say: "1m higher than 15m? Load is SPIKING!"',
        '3️⃣ Point your thumb downward 📉 — say: "1m lower than 15m? Traffic is CLEARING!"'
      ],
      whyItWorks:
        'Visualizing the 3 timestamps left-to-right with an upward or downward thumb instantly decodes whether a server is recovering or crashing!'
    },
    quickTakeaway:
      'Check system uptime with "uptime" or "w", and remember that Load Average represents queued processes: healthy maximum load equals your total core count.'
  },

  // ==========================================================================
  // 14.5 MONITORING CPU AND I/O PERFORMANCE
  // ==========================================================================
  {
    id: 'cpu-and-io-performance',
    number: '14.5',
    title: 'Monitoring CPU and I/O Performance (iostat, vmstat, %iowait & sar)',
    shortTitle: 'CPU & I/O Performance',
    icon: '📊📉',
    pastelBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    accentText: 'text-rose-950',
    badgeBg: 'bg-rose-100 text-rose-900',
    laymanHeadline:
      'When a computer feels slow, it is almost never the CPU calculation that is choked—it is usually the CPU sitting with folded arms waiting for a slow hard drive to finish reading data (%iowait)!',
    laymanExplanation:
      'High load does not always mean a runaway math loop. Advanced Linux performance tools pinpoint the exact bottleneck:\n• vmstat (Virtual Memory Statistics): Run "vmstat 1 5" to sample memory, swap, and CPU every 1 second. Key columns:\n  - r (run queue): Count of processes waiting for CPU (if higher than core count, CPU is saturated).\n  - b (blocked queue): Count of processes frozen waiting for disk I/O!\n  - si / so (swap in / swap out): If numbers are greater than 0, your system is desperately thrashing swap memory.\n• %iowait (The Sneaky Bottleneck): In top or iostat, %iowait shows the percentage of time the CPU was idle because ALL active processes were waiting for slow storage disks to return data. A high %iowait means you need faster SSDs or database indexing, NOT a faster CPU!\n• iostat (I/O Statistics): From the sysstat package. Reports read/write throughput (kB/s) and wait times (%util) per disk device (e.g. /dev/sda or /dev/nvme0n1).\n• sar (System Activity Reporter): The ultimate historical flight recorder that collects performance metrics 24/7 so you can inspect what happened yesterday at 3:00 AM!',
    laymanPoints: [
      {
        term: 'vmstat (Virtual Memory Stats)',
        meaning:
          'Reports processes (r/b), memory, swap in/out (si/so), disk I/O, and CPU states every N seconds.'
      },
      {
        term: '%iowait Metric',
        meaning:
          'Percentage of time the CPU sits idle doing nothing because it is blocked waiting for slow storage disk I/O.'
      },
      {
        term: 'Run Queue (r) vs Blocked (b)',
        meaning:
          '"r" is processes waiting for CPU turns; "b" is processes completely frozen waiting for disk read/writes.'
      },
      {
        term: 'iostat',
        meaning:
          'Monitors storage device read/write throughput (kB/s) and saturation percentage (%util).'
      },
      {
        term: 'sar (Historical Reporter)',
        meaning:
          'Logs and replays historical system performance metrics (CPU, RAM, network, I/O) over days and weeks.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Speedy Master Chef Waiting on a Slow Grocery Boy',
      icon: '🏠🧑‍🍳🚲',
      summary:
        '“%iowait is like having an Olympic Michelin-star chef who can chop vegetables in 3 seconds, but is forced to sit in a kitchen chair staring at the clock because the neighborhood grocery boy is riding a slow bicycle from the farm!”',
      points: [
        {
          name: '%user = Chef Actively Chopping Vegetables',
          emoji: '🔪🥕',
          desc: 'CPU spending time running your user programs (web apps, databases, python scripts).'
        },
        {
          name: '%system = Chef Cleaning Knives & Sanitizing Counters',
          emoji: '🧼🧽',
          desc: 'CPU spending time handling Linux kernel system calls, memory allocation, and networking.'
        },
        {
          name: '%iowait = Chef Tapping Fingers Waiting on the Grocery Delivery',
          emoji: '⏳📦',
          desc: 'The chef has recipes ready, but cannot do anything until the slow hard drive delivers the data file.'
        },
        {
          name: 'vmstat b column = People Standing in Line Outside the Kitchen',
          emoji: '🚪👥',
          desc: 'The "blocked" queue: customers waiting for meals that cannot be cooked until ingredients arrive.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Cybercafé Attendant & The Jammed Dot-Matrix Printer',
      icon: '🇰🇪🖥️🖨️',
      summary:
        '“In a busy Nairobi cybercafé, the attendant has a blazing fast Core i7 laptop, but customers are shouting because the 10-year-old dot-matrix printer is groaning at 1 page every 2 minutes (%iowait)!”',
      points: [
        {
          name: '%user = Attendant Typing Customer Passports Rapidly',
          emoji: '⌨️🏃🏾‍♂️',
          desc: 'Productive work getting done on the screen at 100 words per minute.'
        },
        {
          name: '%iowait = Attendant Staring at the Slow Grunting Printer',
          emoji: '🖨️😫',
          desc: 'He cannot touch the next customer form until the slow printer finishes spooling the last receipt.'
        },
        {
          name: 'vmstat si/so = Shuffling Extra Boxes Out to the Corridor',
          emoji: '📦🚶🏾‍♂️',
          desc: 'When the cyber desk is full of paper, running back and forth to the hallway storeroom (swap thrashing).'
        },
        {
          name: 'iostat = Checking How Many Kilobytes the Flash Drive is Transferring',
          emoji: '💾⏱️',
          desc: 'Measuring why customer Otieno’s cheap roadside flash drive takes 20 minutes to copy a PDF file.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The %iowait Tapping Fingers Pose!"',
      instruction: 'Physically experience the %iowait bottleneck in 5 seconds:',
      steps: [
        '1️⃣ Type furiously in mid-air with both hands 💨 — say: "%user: CPU is crunching code fast!"',
        '2️⃣ Freeze instantly, cross your arms, and tap your foot impatiently ⏳ — say: "%iowait: CPU is idle, frozen waiting on slow disk I/O!"'
      ],
      whyItWorks:
        'Going from furious typing to dead-stop foot tapping anchors that %iowait is an I/O storage problem, NOT a lack of CPU power!'
    },
    quickTakeaway:
      'Use "vmstat 1" and "iostat" to pinpoint bottlenecks: high "r" means CPU saturation, while high "%iowait" and high "b" mean storage disk I/O is choking system performance.'
  },

  // ==========================================================================
  // 14.6 LISTING OPEN FILES AND PROCESSES
  // ==========================================================================
  {
    id: 'listing-open-files-and-processes',
    number: '14.6',
    title: 'Listing Open Files and Processes (lsof, lsof -i, fuser & Drive Unmounting)',
    shortTitle: 'Listing Open Files (lsof)',
    icon: '📂🔍',
    pastelBg: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    accentText: 'text-cyan-950',
    badgeBg: 'bg-cyan-100 text-cyan-900',
    laymanHeadline:
      'In Linux, "Everything is a file"—which means "lsof" (List Open Files) reveals not just text documents, but active network ports, listening web sockets, and hidden processes blocking USB drives from unmounting!',
    laymanExplanation:
      'Because Linux treats hard drives, directories, pipes, and network sockets as files, "lsof" is one of the most powerful diagnostic tools in existence:\n• "lsof": Lists every open file across the entire OS, including which process holds it, the PID, the user, and file descriptor.\n• "lsof -i": Shows all open Internet sockets! Run "lsof -i :80" or "lsof -i :22" to instantly reveal which program is listening on port 80 or 22.\n• "lsof -u sam": Lists every file and socket opened by user "sam".\n• "lsof +D /var/log": Recursively identifies every process holding open a file inside /var/log.\n• Solving the "Target is busy" Unmount Trap: Have you ever tried to run "umount /media/usb" and Linux refused with "device is busy"? Run "lsof /media/usb" or "fuser -vm /media/usb" to find the exact shell or text editor holding the mount point hostage, then kill it with "fuser -km /media/usb"!',
    laymanPoints: [
      {
        term: 'lsof (List Open Files)',
        meaning:
          'Diagnostic command reporting all open files, pipes, sockets, and the processes holding them.'
      },
      {
        term: 'lsof -i :port',
        meaning:
          'Filters for open network sockets by port (e.g. -i :80 shows the web server listening on HTTP).'
      },
      {
        term: 'lsof +D /dir',
        meaning:
          'Recursively searches a directory tree for any open file locks preventing backups or deletions.'
      },
      {
        term: 'fuser -vm /mount',
        meaning:
          'Identifies the exact PID and user locking a storage drive, showing why "umount: device is busy" occurs.'
      },
      {
        term: 'fuser -km /mount',
        meaning:
          'Pro rescue weapon: instantly kills all processes locking a storage drive so it can be unmounted cleanly.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Master Keyholder & The Door Wedge Jam',
      icon: '🏠🗝️🚪',
      summary:
        '“lsof is the master security monitor showing who is holding every room key, who is reading which recipe book, and why you can’t close the garage door because a teenager left their sneaker wedged under the track!”',
      points: [
        {
          name: 'lsof = The Master Room Keyholder Board',
          emoji: '📋🔑',
          desc: 'Shows that Chef Sam is holding Room 3 (kitchen), Butler James has Room 1 (front gate), and the cleaner is holding a broom closet.'
        },
        {
          name: 'lsof -i = Who is Talking on Which Intercom Extension?',
          emoji: '📞🏠',
          desc: 'Tells you immediately: "Extension 22 is being used by the front gate askari talking to a visitor."'
        },
        {
          name: 'Device is Busy = The Sneaker Under the Garage Door',
          emoji: '👟🚪',
          desc: 'You press the garage door button to close it (umount), but it beeps red because someone left a terminal open inside /mnt/backup!'
        },
        {
          name: 'fuser -km = Kicking the Sneaker Away',
          emoji: '👢💥',
          desc: 'Evicts the person holding the door and closes the garage door safely.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Matatu Stage Conductor & The Passenger Blocking the Door',
      icon: '🇰🇪🚐🚪',
      summary:
        '“lsof is the Sacco stage master knowing which passenger has boarded which seat. When the matatu driver wants to pull out of the OTC stage (umount), the conductor yells: "Hold on! Someone is still standing on the footboard with a sack of potatoes!" (Device is busy)!”',
      points: [
        {
          name: 'lsof = Sacco Manifest of Active Passenger Seats',
          emoji: '🪑📋',
          desc: 'Every passenger, their seat number, and whether they are carrying luggage or holding the window open.'
        },
        {
          name: 'lsof -i :80 = Who is Operating the M-Pesa Till Right Now?',
          emoji: '📱🏪',
          desc: 'Pinpoints the exact cashier logged into Till 80 so two workers don’t fight over the same machine.'
        },
        {
          name: 'umount: Target is Busy = Passenger Standing on the Footboard',
          emoji: '🧍🏾‍♂️🚐',
          desc: 'The matatu cannot drive off because a passenger is standing half-in, half-out in the doorway.'
        },
        {
          name: 'fuser -km = Conductor Tapping the Roof: "Shuka Kwanza!"',
          emoji: '🔊👋',
          desc: 'The conductor tells the passenger to step down so the matatu can close its sliding door and leave the stage!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The Door-Block Unjam Kick!"',
      instruction: 'Master the "device is busy" rescue in 5 seconds:',
      steps: [
        '1️⃣ Put one hand up flat like a stop sign ✋ — say: "umount: Target is busy! Someone is inside!"',
        '2️⃣ Put your hands to your eyes like binoculars 🔍 — say: "lsof /mnt: Find the holding process PID!"',
        '3️⃣ Make a quick karate swipe with your hand 🥋 — say: "fuser -km: Eject the process and unmount cleanly!"'
      ],
      whyItWorks:
        'Acting out the stop sign, detective binoculars, and karate chop permanently cements the diagnostic sequence for Linux’s most common unmounting error!'
    },
    quickTakeaway:
      'In Linux, everything is a file: use "lsof -i :port" to discover what process is bound to a network port, and "lsof /mount" or "fuser -km" to resolve "target is busy" unmount errors.'
  }
];
