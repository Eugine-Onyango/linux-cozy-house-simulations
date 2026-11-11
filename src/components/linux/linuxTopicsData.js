// Complete Linux Cozy House & Kenyan Mtaa Curriculum Data
// Topic 1: Understanding Linux Basics (3 Subtopics)
// Topic 2: Linux File System (5 Subtopics)
// Plus the full Linux Topics Roadmap

export const linuxTopic1Subtopics = [
  {
    id: 'distributions',
    number: '1.1',
    title: 'Distributions (Distros)',
    shortTitle: 'Distributions',
    icon: '🏘️',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    laymanHeadline: 'Different "flavors" or styles of Linux made for different kinds of people—all sharing the exact same engine underneath.',
    laymanExplanation:
      'Think of "Linux" as the core engine (the foundation). Because Linux is free for anyone to use, helpful teams around the world have packaged that core engine with different wallpapers, menus, and starter tools so you don’t have to build a computer system from scratch. Each ready-to-use package is called a Distribution (or "Distro" for short). Whether you are a complete beginner, a programmer, or a security guard, there is a distro already decorated just for you!',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): Different House Styles on the Same Foundation',
      icon: '🏡🧱',
      summary: '“Every Linux distro sits on the exact same strong concrete foundation (the Linux Kernel), but the rooms and furniture on top are styled differently!”',
      points: [
        {
          name: 'Ubuntu (The Cozy Furnished Cottage)',
          emoji: '🏡',
          desc: 'Everything is already painted, the sofa is in the living room, and the lights turn on with one switch. You just unlock the door and move right in! Best for beginners.'
        },
        {
          name: 'Fedora (The Modern Tech Apartment)',
          emoji: '🏢',
          desc: 'Comes with a built-in workshop and the newest smart-home gadgets already installed. Great for software builders and creators.'
        },
        {
          name: 'Arch Linux (The DIY Custom Mansion)',
          emoji: '🏗️',
          desc: 'You get the strong concrete foundation, a pile of bricks, and a blueprint. You build every wall and choose every light switch yourself. Great for experts who love total control!'
        },
        {
          name: 'Kali Linux (The Security Inspector’s House)',
          emoji: '🛡️',
          desc: 'Pre-packed with lockpicks, alarm testers, and magnifying glasses so ethical security guards can test if houses are safe.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Same Maize Flour (Unga) / Same Simba Foundation, Different Everyday Styles!',
      icon: '🇰🇪🍲',
      summary: '“Think of the core Linux foundation as pure Maize Flour (Unga) or a Simba Cement slab. Different Distros are how different Kenyan places prepare it for your lifestyle!”',
      points: [
        {
          name: 'Ubuntu = Ready Ugali Platter at a Friendly Mama Oliech / Cozy Estate Maisonette',
          emoji: '🍛🏡',
          desc: 'Like walking into a welcoming local restaurant where warm ugali, sukuma wiki, and stew are already cooked and served on a clean plate—or moving into a ready Nyayo Estate home where KPLC tokens and water taps already work on Day 1!'
        },
        {
          name: 'Fedora = A Sleek Kilimani / Westlands Tech Café & Studio',
          emoji: '☕💻',
          desc: 'Always has the newest espresso machine, fast fiber Wi-Fi, and power extensions at every seat so developers and creatives can plug in and build new things immediately.'
        },
        {
          name: 'Arch Linux = Buying Maize & Grinding at the Local Posho Mill (Kipande / DIY Plot in Ruiru)',
          emoji: '🌽⚙️',
          desc: 'Like buying your own dry maize, telling the posho mill operator exactly how fine to grind it (Grade 1 or Grade 2), and cooking it in your own sufuria—or buying a 50x100 plot in Kitengela and hiring a fundi to build every room your way!'
        },
        {
          name: 'Kali Linux = A G4S / Security Patrol Command Van',
          emoji: '🚓🔦',
          desc: 'Same vehicle engine underneath, but packed with spotlights, walkie-talkies, and security scanners to test compound locks and catch intruders.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "3 Roofs, 1 Foundation!"',
      instruction:
        'Let’s lock "Distributions" into your hands so you never forget it! Follow these 3 quick moves right where you are sitting:',
      steps: [
        '1️⃣ Hold your LEFT hand flat like a solid table — say out loud: "Same Linux Foundation!"',
        '2️⃣ With your RIGHT hand, make a cozy little roof ⛺ on top — say: "Ubuntu Cottage (Ready to use)!"',
        '3️⃣ Now mimic hammering a brick 🔨 on top of that same flat left hand — say: "Arch Linux (Build it yourself)!"'
      ]
    },
    quickTakeaway: 'Distro = Same Linux core underneath + different starter look and tools on top!'
  },
  {
    id: 'architecture',
    number: '1.2',
    title: 'Architecture (How Linux is Built)',
    shortTitle: 'Architecture',
    icon: '🏗️',
    pastelBg: 'bg-sky-50',
    borderColor: 'border-sky-300',
    accentText: 'text-sky-950',
    badgeBg: 'bg-sky-100 text-sky-900',
    laymanHeadline: 'Linux is stacked like a 4-layer sandwich (or a 4-part team) so you never have to speak machine code to wires and chips.',
    laymanExplanation:
      'Inside your computer, there are physical metal parts (chips, screen, battery). You cannot talk to metal chips directly! So Linux organizes itself into 4 simple layers from bottom to top: (1) Hardware at the bottom, (2) the Kernel right above it acting as the quiet manager, (3) the Shell acting as your helpful translator/waiter, and (4) Applications at the top (like your web browser, games, or music player) that you touch every day.',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The 4 Levels of Sam’s Magical House',
      icon: '🏠🧑‍🍳',
      summary: '“From the ground under the house up to the appliances you enjoy, 4 friendly layers work together every time you click or type!”',
      points: [
        {
          name: 'Layer 1 (Bottom): Hardware = The Land, Bricks, Pipes & Wires',
          emoji: '🔌🧱',
          desc: 'The physical water pipes, electrical wires, and storage closets built into the house. Powerful, but they can’t think on their own.'
        },
        {
          name: 'Layer 2 (Middle-Low): Kernel = The Concrete Foundation & Quiet House Manager',
          emoji: '🏗️📋',
          desc: 'Sits right on the pipes and wires. It has 3 helper departments: a Time Manager (Process Scheduler) so appliances share power fairly, a Smart Closet Organizer (Memory Manager), and a Master Drawer Map (Virtual File System).'
        },
        {
          name: 'Layer 3 (Middle-High): Shell = Chef Bash, the Helpful Butler at the Counter',
          emoji: '🧑‍🍳🛎️',
          desc: 'You stand at the Kitchen Counter (Terminal) and tell the Butler (Shell) what you want in simple words like "ls" (look around). The Butler translates your wish and tells the Foundation (Kernel) to make it happen!'
        },
        {
          name: 'Layer 4 (Top): Applications & Utilities = Your Everyday Appliances',
          emoji: '📺🎵',
          desc: 'The coffee maker, TV, calculator, and photo album you actually see and use in the rooms.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: A Busy Local Restaurant ("Kibandaski" / Hotel) with 4 Clear Roles',
      icon: '🇰🇪🍽️',
      summary: '“When you order chapati and beans at a busy Kenyan restaurant, you don’t walk into the smoky kitchen and grab a hot sufuria yourself—4 layers work as a team!”',
      points: [
        {
          name: 'Layer 1 (Bottom): Hardware = The Jiko, Charcoal Fire, Sufurias & Water Tank',
          emoji: '🔥🍲',
          desc: 'The physical cooking pots, heat, and ingredients in the back kitchen. Essential, but too hot and raw for a customer to touch directly!'
        },
        {
          name: 'Layer 2 (Middle-Low): Kernel = Mama Pima (The Head Kitchen Boss Inside)',
          emoji: '👩‍🍳⚖️',
          desc: 'Mama Pima rules the kitchen! She shares the jiko fire fairly between pots (Process Scheduler), arranges plates on the shelf (Memory Manager), and knows which sufuria holds ndengu or beef (File System).'
        },
        {
          name: 'Layer 3 (Middle-High): Shell = The Friendly Waiter at the Counter',
          emoji: '🤵📝',
          desc: 'You sit at the counter (Terminal) and tell the Waiter (Shell): "Niletee chapati mbili!" The waiter takes your human message to Mama Pima (Kernel) in the kitchen and brings back the result.'
        },
        {
          name: 'Layer 4 (Top): Applications = The Menu & Delicious Meal on Your Table',
          emoji: '🍽️📱',
          desc: 'The hot chapatis, tea, WhatsApp, or browser sitting right in front of you ready to enjoy!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The 4-Layer Tap From Floor to Sky!"',
      instruction:
        'Use your body to trace how a message climbs the 4 layers of Linux Architecture:',
      steps: [
        '1️⃣ Stomp your FEET on the floor 🦶 — say: "1. Hardware (The Jiko & Wires)!"',
        '2️⃣ Pat your KNEES with both hands 🦵 — say: "2. Kernel (The Foundation & Mama Pima)!"',
        '3️⃣ Cup your HANDS around your mouth 🗣️ — say: "3. Shell (The Waiter & Butler)!"',
        '4️⃣ Wave your HANDS high in the air 🙌 — say: "4. Apps (The Meal & Programs)!"'
      ]
    },
    quickTakeaway: 'You talk to Apps or the Shell (Waiter/Butler) → Shell talks to the Kernel (Kitchen Boss/Foundation) → Kernel controls the Hardware (Jiko/Wires)!'
  },
  {
    id: 'linux-vs-unix',
    number: '1.3',
    title: 'Linux Vs Unix',
    shortTitle: 'Linux Vs Unix',
    icon: '🔓',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-900',
    laymanHeadline: 'Unix is the older, expensive, locked-up grandparent; Linux is the free, open-door cousin that everyone in the world is invited to improve!',
    laymanExplanation:
      'A long time ago (in the 1970s), scientists created a smart operating system called Unix. It worked great, but big companies locked it up, charged lots of money for it, and forbade people from looking at how it was built. In 1991, a student named Linus Torvalds said, "Let’s build a brand-new system inspired by Unix, but make it 100% FREE and OPEN so anyone on Earth can use it, study the blueprints, and make it better!" That open, community-built system is Linux.',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Locked Private Estate vs. The Open Community House',
      icon: '🔒🏠🔓',
      summary: '“Unix has a ‘PRIVATE PROPERTY – PAY TO ENTER’ padlock on the gate; Linux has a warm ‘WELCOME – FREE BLUEPRINTS FOR ALL!’ sign on the front porch.”',
      points: [
        {
          name: 'Unix = The Strict, Locked Corporate Mansion',
          emoji: '🏰🔒',
          desc: 'Owned by big companies (like IBM or Apple’s macOS core). You must buy a costly ticket to live there, only works on special expensive land (specific hardware), and you are never allowed to see or share the house blueprints.'
        },
        {
          name: 'Linux = The Friendly "Open House" Anyone Can Copy & Improve',
          emoji: '🏡🔓',
          desc: 'Inspired by the neat room layout of Unix, but built fresh for everyone! The door is wide open, the blueprints are free on the kitchen table (Open Source), and it can be built anywhere—from a tiny wristwatch to a giant supercomputer.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Exclusive Members-Only Muthaiga Club vs. A Community "Harambee" Hall & Open Soko!',
      icon: '🇰🇪🤝',
      summary: '“Unix is like an expensive, secret members-only club; Linux is a Harambee project where every fundi across Kenya and the world shares the blueprint for free!”',
      points: [
        {
          name: 'Unix = Exclusive Private Club / Secret Corporate Recipe',
          emoji: '🎩🔐',
          desc: 'Imagine a high-end private club where membership costs millions of shillings, you can only drive in with one specific brand of car, and the kitchen recipe is locked in a bank vault. If a student asks to see how the jiko is built so they can learn, the askari says "Hapana! Top secret!"'
        },
        {
          name: 'Linux = Community "Harambee" Design / Open-Source M-Pesa & Android Spirit',
          emoji: '🌍🙌',
          desc: 'Imagine a smart youth sees how neat that club is and starts a Harambee blueprint! Every fundi in Nairobi, Eldoret, Kisumu, and around the world is allowed to copy the plan for Ksh 0, fix any leaky roof together, and put it on everything—from a boda-boda rider’s Kabambe/Android smartphone to Safaricom’s biggest cloud servers!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Locked Arms vs. Open Harambee Arms!"',
      instruction:
        'Feel the difference between Unix and Linux in your muscles in 5 seconds:',
      steps: [
        '1️⃣ Cross your arms tightly across your chest 🙅‍♂️ and make a serious face — say: "UNIX: Private, Locked, and Expensive!"',
        '2️⃣ Now fling your arms wide open with a big warm smile 🤗 — say: "LINUX: Free, Open Blueprints, Built Together!"'
      ]
    },
    quickTakeaway: 'Unix = Older, Closed-Source, Paid, Company-Owned. Linux = Inspired by Unix, 100% Free & Open-Source, Runs on Everything!'
  }
];

// ============================================================================
// TOPIC 2: LINUX FILE SYSTEM (5 SUBTOPICS)
// ============================================================================
export const linuxTopic2Subtopics = [
  {
    id: 'file-system',
    number: '2.1',
    title: 'File System (What It Is)',
    shortTitle: 'File System',
    icon: '🗄️',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    laymanHeadline: 'The neat filing system that organizes your computer into rooms (folders) and items (files) so nothing gets lost in a messy heap.',
    laymanExplanation:
      'Imagine if you threw all your clothes, spoons, school books, and photos into one giant pile in the middle of the floor—finding one sock would take hours! A "File System" is simply the way Linux arranges your storage into labeled rooms (called Directories or Folders) and items inside those rooms (called Files). In fact, Linux has one golden rule that makes life super simple: "In Linux, EVERYTHING is treated like a file or a folder!"',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): A House With Labeled Rooms & Drawers',
      icon: '🏠📦',
      summary: '“Instead of dumping everything on the lawn, your Linux House divides space into Rooms (Directories) and Items inside Rooms (Files)!”',
      points: [
        {
          name: 'Directories (Folders) = The Rooms & Cabinets',
          emoji: '🚪🏡',
          desc: 'Places like the Bedroom, Kitchen, and Garage that hold other smaller boxes or items inside them.'
        },
        {
          name: 'General Files = Everyday Items Inside the Rooms',
          emoji: '📄🖼️',
          desc: 'Your recipe cards (text files), family photos (images), and music tapes sitting neatly on shelves inside a room.'
        },
        {
          name: 'Device Files = Wall Sockets for Plugging in Gadgets',
          emoji: '🔌🖨️',
          desc: 'Even your printer, keyboard, and USB flash drive show up as special "plug files" inside a room called /dev!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: A Well-Organized Wholesale Duka / Supermarket vs. A Messy Gunia Heap!',
      icon: '🇰🇪🏪',
      summary: '“If Mama Mboga or a local duka keeper mixes sugar,omo, royco, and coins in one sack, business stops! The File System is the neat shelf and crate system.”',
      points: [
        {
          name: 'Directories (Folders) = Labeled Duka Shelves & Storage Crates',
          emoji: '🧺🏷️',
          desc: 'One shelf is labeled "Unga & Grains", another is "Soaps", and the counter drawer is "M-Pesa Float & Receipts".'
        },
        {
          name: 'Files = The Actual Packets & Record Books on Each Shelf',
          emoji: '📘🍵',
          desc: 'A 2kg packet of Pembe flour, a bottle of Elianto oil, or the Black Counter Book where daily sales are written.'
        },
        {
          name: 'Why It Matters = Instant Finding in 2 Seconds!',
          emoji: '⚡😊',
          desc: 'When a customer asks for Kericho Gold tea leaves, you don’t dig through a pile—you reach straight to the Tea Shelf!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Heap vs. Shelf!"',
      instruction:
        'Use your hands to feel what a File System does in 5 seconds:',
      steps: [
        '1️⃣ Scrunch both hands into a tangled ball in front of your tummy 🧶 — say: "No File System = Messy Heap!"',
        '2️⃣ Now open your palms flat side-by-side like neat shelves 🤲 — say: "File System = Neat Rooms (Folders) & Items (Files)!"'
      ]
    },
    quickTakeaway: 'File System = How Linux organizes everything into Rooms (Directories/Folders) and Items (Files)!'
  },
  {
    id: 'file-hierarchy-structure',
    number: '2.2',
    title: 'File Hierarchy Structure (The Upside-Down Tree)',
    shortTitle: 'Hierarchy Structure',
    icon: '🌳',
    pastelBg: 'bg-sky-50',
    borderColor: 'border-sky-300',
    accentText: 'text-sky-950',
    badgeBg: 'bg-sky-100 text-sky-900',
    laymanHeadline: 'Every single folder and file in Linux hangs from ONE single main entrance at the very top called Root ( / ).',
    laymanExplanation:
      'In Windows, you might see separate islands like Drive C: and Drive D:. Linux is much cleaner! Linux connects everything into ONE giant family tree (called the Filesystem Hierarchy). At the very top of this upside-down tree sits a single forward slash: "/". That slash is called "Root". Every folder, every photo, and even every plugged-in flash disk branches downward from that one "/" door!',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): One Main Front Door ( / ) Leading to All Hallways',
      icon: '🚪🌳',
      summary: '“There is only ONE front door to Sam’s House, written as a single slash ( / ). You must pass through / to reach any room!”',
      points: [
        {
          name: 'The Root Slash ( / ) = The Main Front Door of the House',
          emoji: '🚪✨',
          desc: 'Everything starts here! When you see "/" at the very beginning, think: "Stand at the Main Front Door."'
        },
        {
          name: 'First-Floor Hallway Doors (/home, /etc, /bin, /var)',
          emoji: '🚪🚪',
          desc: 'Right inside the front door "/", the main hallway branches into big rooms like /home (Bedrooms) and /etc (Settings).'
        },
        {
          name: 'Rooms Inside Rooms (/home/sam/photos)',
          emoji: '🛏️🖼️',
          desc: 'Notice how "/" is used in two ways: the FIRST "/" is the Main Front Door, and the slashes in the middle are doorways connecting parent rooms to child rooms!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: One Main Compound Gate ( / ) in a Family Boma or Gated Estate',
      icon: '🇰🇪🚧',
      summary: '“In a secure Kenyan estate or traditional Boma, there is ONE Main Gate ( / ) at the road—every inner court, house, and kitchen store branches from that single gate!”',
      points: [
        {
          name: 'Top Level ( / ) = The Main Estate Barrier Gate',
          emoji: '🚧🛡️',
          desc: 'Nobody jumps over the fence! Every path in the compound begins at the Main Gate ( / ).'
        },
        {
          name: 'Main Courts (/home, /etc, /usr) = Branches off the Main Drive',
          emoji: '🛣️🏘️',
          desc: 'From the Main Gate (/), the cabro driveway splits into Court A (/home for residents), the Caretaker Office (/etc), and the Borehole Pump House (/var).'
        },
        {
          name: 'Inside a House (/home/akinyi/documents) = Gate → Court → House → Cupboard',
          emoji: '🏡🗄️',
          desc: 'To get Akinyi’s birth certificate, you go: Main Gate (/) → Residents Court (home) → Akinyi’s House (akinyi) → Documents Drawer (documents)!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Draw the Upside-Down Tree!"',
      instruction:
        'Lock the Linux Hierarchy Tree into your muscles:',
      steps: [
        '1️⃣ Raise one hand high above your head and slash diagonally ( / ) — say: "Root ( / ) sits at the VERY TOP!"',
        '2️⃣ Bring both hands down like branches spreading out to your shoulders and waist — say: "All folders branch DOWN from Root!"'
      ]
    },
    quickTakeaway: 'Linux is an upside-down tree: Root ( / ) is the single Main Gate at the top, and every room branches underneath it!'
  },
  {
    id: 'directory-structure',
    number: '2.3',
    title: 'Directory Structure (Meet the Rooms)',
    shortTitle: 'Directory Structure',
    icon: '🗺️',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-900',
    laymanHeadline: 'Every Linux computer has the exact same room names right inside the front door—learn these 7 rooms and you’ll never feel lost!',
    laymanExplanation:
      'At first, short folder names like "/etc", "/bin", or "/var" look like strange secret codes. Why didn’t they just call them "Settings" or "Tools"? Because 50 years ago, old keyboards were slow and memory was tiny, so scientists used 3-letter nicknames! Once you know what each room nickname means in real life, every Linux computer feels like your own home.',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): Floor Plan of Sam’s 7 Essential Rooms',
      icon: '🏡📐',
      summary: '“Step inside the front door ( / ) and meet the 7 rooms you will visit in Sam’s Linux House!”',
      points: [
        {
          name: '/home = Family Bedrooms (e.g., /home/sam)',
          emoji: '🛏️🧸',
          desc: 'Every regular user gets their own private bedroom inside /home to keep their downloads, music, and homework safe.'
        },
        {
          name: '/root = The Parent / Superuser’s Private Master Suite',
          emoji: '👑🛏️',
          desc: 'The private bedroom for the Root administrator (UID 0). Don’t confuse "/root" (a bedroom) with "/" (the front door of the whole house)!'
        },
        {
          name: '/etc ("Et Cetera / Settings") = The House Settings & Fuse Cabinet',
          emoji: '⚙️🗄️',
          desc: 'Holds all the rulebooks and configuration files for the house—like the Family Registry (/etc/passwd) and House Rules (/etc/sudoers).'
        },
        {
          name: '/bin & /usr = The Everyday Toolbox & Big Library',
          emoji: '🧰📚',
          desc: '/bin holds basic hand tools like ls, cp, and mkdir. /usr is the giant library holding pre-installed apps and games.'
        },
        {
          name: '/var ("Variable") & /tmp ("Temporary") = Logbook Shed & Sticky-Note Pad',
          emoji: '📓🗑️',
          desc: '/var stores things that grow every day like Security Camera Logs (/var/log). /tmp is a kitchen scratchpad wiped clean when you reboot!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: A Kenyan Boarding School / Gated Compound Map',
      icon: '🇰🇪🏫',
      summary: '“Think of Linux as a well-run Kenyan school compound where every building has a clear job!”',
      points: [
        {
          name: '/home = Student Dormitories / Tenants’ Quarters (/home/kamau)',
          emoji: '🏘️🎒',
          desc: 'Where Kamau, Amina, and Otieno each have their own personal metal box, mattress, and personal items.'
        },
        {
          name: '/root = The Principal’s / Caretaker’s Private Office Suite',
          emoji: '🔑🏛️',
          desc: 'Only the head boss has the key to /root! Regular students stay in /home.'
        },
        {
          name: '/etc = The Admin Registry & KPLC Meter Box',
          emoji: '📋⚡',
          desc: 'Contains the official school register (/etc/passwd), bell timetable, and power settings.'
        },
        {
          name: '/bin = The Jembe, Panga & Spanner Tool Shed',
          emoji: '🛠️🪓',
          desc: 'Where all the daily working tools (commands like ls, cd, cp, rm) are kept ready for action.'
        },
        {
          name: '/var = The Watchman’s Occurrence Book (OB) at the Gate',
          emoji: '👮🏾‍♂️📖',
          desc: 'Inside /var/log, the Askari writes down every single login attempt and delivery truck that visits day or night!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "4 Rooms Body Point!"',
      instruction:
        'Act out the 4 most famous Linux rooms so their 3-letter names stick forever:',
      steps: [
        '1️⃣ Rest your head on your hands like a pillow 😴 — say: "/home = My Bedroom!"',
        '2️⃣ Tap your forehead like adjusting brain settings ⚙️ — say: "/etc = Settings & Rules Cabinet!"',
        '3️⃣ Pretend to hammer a nail 🔨 — say: "/bin = My Toolbox of Commands!"',
        '4️⃣ Pretend to write in a watchman’s book ✍️ — say: "/var = Security Logbook!"'
      ]
    },
    quickTakeaway: '/ = Front Gate | /home = Bedrooms | /etc = Settings Cabinet | /bin = Toolbox | /var = Guard’s Logbook | /tmp = Temporary Scratchpad!'
  },
  {
    id: 'navigation-commands',
    number: '2.4',
    title: 'File System Navigation Commands (pwd, ls, cd)',
    shortTitle: 'Navigation Commands',
    icon: '🧭',
    pastelBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    accentText: 'text-purple-950',
    badgeBg: 'bg-purple-100 text-purple-900',
    laymanHeadline: 'Just 3 tiny words—pwd, ls, and cd—let you check where you are, look around, and walk into any room in Linux!',
    laymanExplanation:
      'When you open a command screen (Terminal), there are no folders to double-click with a mouse. How do you move around? You use the "Big 3 Navigation Trio": First, ask "Where am I standing?" with pwd. Second, ask "What is inside this room?" with ls. Third, walk into any room you want with cd! If you ever wander too far, typing cd ~ (or just cd) teleports you straight back to your bedroom!',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): Your GPS Watch, Magnifying Glass & Walking Shoes',
      icon: '⌚🔍👟',
      summary: '“Hold these 3 everyday tools in your hands whenever you walk around Sam’s House!”',
      points: [
        {
          name: '1. pwd ("Print Working Directory") = Your GPS Wristwatch',
          emoji: '⌚📍',
          desc: 'Answers: "Which room am I standing in right now?" Prints out your exact location like /home/sam/kitchen.'
        },
        {
          name: '2. ls ("List") = Your Magnifying Glass / Room Light Switch',
          emoji: '🔍💡',
          desc: 'Answers: "What items and doors are in this room?" Bonus: "ls -a" lifts the carpet to reveal secret hidden files starting with a dot (.secret)!'
        },
        {
          name: '3. cd ("Change Directory") = Your Walking Shoes',
          emoji: '👟🚪',
          desc: 'Walks you into another room! "cd kitchen" walks into the kitchen; "cd .." takes 1 step backward out to the hallway; "cd ~" teleports you straight to your bedroom!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Pinning Your Stage (pwd), Checking the Stall (ls), & Walking/Boda (cd)',
      icon: '🇰🇪🛵',
      summary: '“Moving around Linux is just like navigating town or your home compound!”',
      points: [
        {
          name: 'pwd = Asking the Conductor "Tuko Stage Gani?" / Checking Live Pin',
          emoji: '📍🚌',
          desc: 'Before you make a move, check where you are standing! pwd tells you: "/Nairobi/Kilimani/Yaya".'
        },
        {
          name: 'ls = Looking at What’s Displayed on the Mama Mboga Stall',
          emoji: '🍅👀',
          desc: '"ls" shows the tomatoes and onions on top; "ls -l" shows the price tag and weight of each; "ls -a" peeks under the table for the reserved avocados!'
        },
        {
          name: 'cd = Walking Through a Gate (and "cd ~" = Rudi Nyumbani!)',
          emoji: '🚶🏾‍♂️🏡',
          desc: '"cd duka" walks into the shop; "cd .." steps back outside to the veranda; and "cd ~" is the magic "Rudi Nyumbani" button that takes you straight to your own bedroom from anywhere!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The Big 3 Navigation Dance!"',
      instruction:
        'Do these 3 quick gestures in 5 seconds—your hands will remember pwd, ls, and cd forever:',
      steps: [
        '1️⃣ Tap your wrist like checking a GPS watch ⌚ — say: "pwd = Where am I?"',
        '2️⃣ Make a circle with your fingers over your eye like a magnifying glass 🔍 — say: "ls = Look around!"',
        '3️⃣ Walk two steps with your fingers on the desk ✌️ — say: "cd = Walk into a room (and cd .. steps back)!"'
      ]
    },
    quickTakeaway: 'pwd = Where am I? | ls = What is in here? (ls -a shows hidden items) | cd = Walk into a room (cd .. = step back, cd ~ = go home)!'
  },
  {
    id: 'absolute-vs-relative-paths',
    number: '2.5',
    title: 'Absolute and Relative Pathnames in UNIX / Linux',
    shortTitle: 'Absolute vs Relative Paths',
    icon: '🛣️',
    pastelBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    accentText: 'text-rose-950',
    badgeBg: 'bg-rose-100 text-rose-900',
    laymanHeadline: 'Two simple ways to give directions: start all the way from the Main Gate (Absolute = starts with / ), or start from right where you are standing (Relative = no / at the start)!',
    laymanExplanation:
      'A "Pathname" is just a road map of folders separated by slashes that leads to a file or room. How do you tell the computer which road to take? You can use an ABSOLUTE path (which always begins with "/" at the front door and lists every room along the way) OR a RELATIVE path (which starts right from your current shoes and only lists the remaining steps). Both reach the exact same place!',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Red Arrow from the Front Door vs. The Blue Arrow from Your Feet',
      icon: '🔴🏠🔵',
      summary: '“Imagine you are already standing in the Living Room and want to grab a book on the Coffee Table:”',
      points: [
        {
          name: 'Absolute Path (Starts with / ) = Directions from the Front Door',
          emoji: '🔴🚪',
          desc: 'Example: "/living_room/coffee_table/book". Even if you are in the attic or basement, starting from the Front Door (/) works 100% of the time!'
        },
        {
          name: 'Relative Path (NO / at the start) = Directions from Where You Stand Now',
          emoji: '🔵👟',
          desc: 'Example: "coffee_table/book". Since you are ALREADY standing inside living_room, you don’t walk back to the front door—you just step straight to the coffee table!'
        },
        {
          name: 'Special Dot Shortcuts: "." (Right Here) and ".." (One Room Back)',
          emoji: '🔙✨',
          desc: 'One dot (.) means "this exact room I am standing in". Two dots (..) means "step back one door to the parent hallway"!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Directions from Jomo Kenyatta Statue (Town Center) vs. "Just Next Door From Here!"',
      icon: '🇰🇪🗺️',
      summary: '“How do you direct a friend to Java House at Sarit Centre? It depends on where your friend is standing!”',
      points: [
        {
          name: 'Absolute Path (Starts with / ) = Full Address from the Main Gate',
          emoji: '🛣️📍',
          desc: '"/Nairobi/Westlands/Sarit_Centre/Java_House". Notice the "/" at the very start! Anyone from Mombasa, Nakuru, or Rongai can follow this full address without getting lost.'
        },
        {
          name: 'Relative Path (No / at the start) = Shortcut from Your Current Spot',
          emoji: '👉🏾☕',
          desc: 'If you and your friend are ALREADY standing inside "Westlands", you just say: "Sarit_Centre/Java_House" (no leading slash!). Shorter and faster!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The Slash Rule!"',
      instruction:
        'Here is the 1-second trick to tell Absolute and Relative paths apart on any exam or terminal:',
      steps: [
        '1️⃣ Point all the way back to the room door behind you and draw a slash "/" — say: "Starts with / = ABSOLUTE (From the Main Gate)!"',
        '2️⃣ Point straight down at your own shoes 👟 — say: "NO / at the start = RELATIVE (From my own shoes)!"'
      ]
    },
    quickTakeaway: 'Golden Rule: Does it start with "/" at the very beginning? YES = Absolute Path (from Root gate). NO = Relative Path (from your current room)!'
  }
];

// Master Topics List for easy switching in the UI
export const linuxPlayableTopics = [
  {
    id: 'topic1',
    number: 1,
    title: 'Topic 1: Understanding Linux Basics',
    shortTitle: '1. Linux Basics',
    emoji: '🏡',
    description:
      'What Linux is, why it comes in different styles (Distributions), how its 4 layers work together (Architecture), and how it differs from Unix.',
    subtopics: linuxTopic1Subtopics
  },
  {
    id: 'topic2',
    number: 2,
    title: 'Topic 2: Linux File System & Navigation',
    shortTitle: '2. Linux File System',
    emoji: '🧭',
    description:
      'How Linux organizes rooms and items (File System), the upside-down tree from Root (Hierarchy), the 7 essential rooms (Directory Structure), walking with pwd/ls/cd, and Absolute vs. Relative paths!',
    subtopics: linuxTopic2Subtopics
  }
];

export const all11LinuxTopicsRoadmap = [
  {
    id: 1,
    topicKey: 'topic1',
    title: 'Understanding Linux Basics',
    status: 'playable',
    icon: '🏠',
    subtopics: ['Distributions', 'Architecture', 'Linux Vs Unix'],
    laymanSummary: 'What Linux is, why it comes in different styles (Distros), how its 4 layers work together (Architecture), and how it differs from Unix.',
    houseAnalogy: 'Choosing a house style (Ubuntu Cottage vs Arch Mansion), the 4 house levels (Hardware -> Kernel Foundation -> Shell Butler -> Appliances), and Open House vs Locked Mansion.',
    kenyanAnalogy: 'Ready Ugali at Mama Oliech vs Posho Mill DIY grind; Kibanda 4-person team (Jiko -> Mama Pima -> Waiter -> Meal); Private Club vs Harambee Open Hall.'
  },
  {
    id: 2,
    topicKey: 'topic2',
    title: 'Linux File System & Navigation',
    status: 'playable',
    icon: '🧭',
    subtopics: [
      'File System',
      'File Hierarchy Structure',
      'Directory Structure',
      'File System Navigation Commands',
      'Absolute and Relative Pathnames in UNIX'
    ],
    laymanSummary: 'How folders are arranged like rooms in a house starting from the front door (/), what each room holds, how to walk around with pwd/ls/cd, and Absolute vs. Relative directions.',
    houseAnalogy: 'Front door (/), bedrooms (/home), settings cabinet (/etc), GPS watch (pwd), magnifying glass (ls), walking through doors (cd), and directions from the front gate vs from your current room.',
    kenyanAnalogy: 'Wholesale Duka shelves, Gated Boma from Main Gate (/), Boarding school rooms, checking your stage (pwd), and full town address vs "right here next door".'
  },
  {
    id: 3,
    topicKey: 'topic3',
    title: 'Linux Commands (25 Basic Everyday Tools)',
    status: 'playable',
    icon: '🧰',
    subtopics: [
      '#1–5: ls, pwd, mkdir, cd, rmdir (Room & Walking Tools)',
      '#6–10: cat, cp, mv, rm, uname (Paper, Moving & Blueprint Tools)',
      '#11–15: locate, touch, ln, clear, ps (Finding, Links & Tidying)',
      '#16–20: man, grep, echo, wget, whoami (Manuals, Word-Hunt & Web)',
      '#21–25: sort, cal, whereis, df, wc (Sorting, Calendar & Storage)'
    ],
    laymanSummary: 'Your 25 everyday hand tools for looking around, building rooms, copying/moving notes, searching words, downloading from the web, and checking storage.',
    houseAnalogy: 'A friendly 25-piece household toolbox: magnifying glass (ls), GPS watch (pwd), hammer (mkdir), photocopier (cp), duster (clear), detective highlighter (grep), and closet gauge (df).',
    kenyanAnalogy: 'Everyday tools at home and the duka: checking the Mama Mboga stall (ls), cybercafé photocopy (cp), mkokoteni shifting (mv), Glovo boda delivery (wget), and tapping the roof Roto water tank (df).'
  },
  {
    id: 4,
    title: 'File Management & Permissions',
    status: 'playable',
    topicKey: 'topic4',
    icon: '🔑',
    subtopics: [
      '4.1 File Management (touch, cat, tac, cp, mv, rm & Wildcards)',
      '4.2 Directory Management (mkdir, mkdir -p, cp -r, rmdir, rm -r)',
      '4.3 Permissions (Owner u, Group g, Others o, r=4 w=2 x=1 & Sticky Bit)',
      '4.4 Changing Permissions using chmod (Octal 755/700 & Symbolic u+x)',
      '4.5 Changing Ownership using chown (sudo chown owner:group & -R)'
    ],
    laymanSummary: 'Creating, copying, moving, and deleting files & rooms, plus putting 3-wheel locks (chmod) and nameplates (chown) on doors so only the right people can enter.',
    houseAnalogy: 'Photocopier (cp), moving boxes (mv), wood-chipper shredder (rm), Room Builder (mkdir -p), 3-dial padlock (r=4, w=2, x=1 / chmod), and Door Nameplate transfer (chown).',
    kenyanAnalogy: 'Cybercafé attendant photocopying & stapling forms, building a boma with nested rooms (mkdir -p), M-Pesa agent shop padlock dials (chmod 755/700), and handing over a plot Title Deed (chown).'
  },
  {
    id: 5,
    title: 'Archiving and Compressing',
    status: 'playable',
    topicKey: 'topic5',
    icon: '📦',
    subtopics: [
      '5.1 Creating and Extracting Archives using tar (tar -cvf, -tvf, -xvf)',
      '5.2 Compressing Files using gzip (.gz, gzip -k, tar -czvf)',
      '5.3 Decompressing Files using gunzip (gunzip, gzip -d, zcat)',
      '5.4 Compressing and Extracting Files using zip and unzip (zip -r, unzip)',
      '5.5 High-Compression Archiving using bzip2 (.bz2, bunzip2, tar -cjvf)',
      '5.6 High-Efficiency Compression using xz (.xz, unxz, tar -cJvf)'
    ],
    laymanSummary: 'Packing many loose files into one neat box (tar) and vacuum-sealing them smaller to save space and mobile data bundles (gzip, gunzip, zip/unzip, bzip2, xz).',
    houseAnalogy: 'Taping items into one moving box (tar), vacuum-sealing winter blankets (gzip/gunzip), zippered travel suitcases (zip/unzip), garage press (bzip2), and diamond shrink-ray (xz).',
    kenyanAnalogy: 'Tying up-country shopping into one gunia for the EasyCoach bus (tar), vacuum-pressing a mattress or Gikomba mitumba bale (gzip/gunzip), universal cybercafé zip bag (zip), and Mombasa Port export compactor (xz).'
  },
  {
    id: 6,
    title: 'Package Management',
    status: 'playable',
    topicKey: 'topic6',
    icon: '🛒',
    subtopics: [
      '6.1 Package Managers & systemctl (Stores, Dependencies & Appliance Remote)',
      '6.2 apt-get Package Manager (Debian/Ubuntu Supermarket Manager)',
      '6.3 dpkg – Debian Package Manager (.deb Delivery Driver & Fix-Broken Rescue)',
      '6.4 dnf Package Manager (Fedora/RHEL 8+ Modern Touchscreen Hardware Store)',
      '6.5 yum Package Manager (CentOS/RHEL Classic Hardware Store)'
    ],
    laymanSummary: 'How software is installed, updated, and removed across Linux distributions with all required screws/batteries (dependencies), plus controlling services with systemctl.',
    houseAnalogy: 'Ordering furniture from the Ubuntu Supermarket (apt-get) delivered by the dpkg van with screws included (dependencies), shopping at the DNF/YUM Hardware Store, and using the systemctl remote control.',
    kenyanAnalogy: 'Ordering household goods from Naivas/Carrefour (apt-get) delivered by a boda rider (dpkg) with free batteries included, shopping at a modern Builders Hardware megastore (dnf/yum), and flipping the KPLC switchboard (systemctl).'
  },
  {
    id: 7,
    title: 'User and Group Management',
    status: 'playable',
    topicKey: 'topic7',
    icon: '👨‍👩‍👧‍👦',
    subtopics: [
      '7.1 User Management (User Types, /etc/passwd, /etc/shadow, usermod)',
      '7.2 Creating Users (useradd & Blueprint Flags)',
      '7.3 Creating Users Interactively (adduser Friendly Receptionist)',
      '7.4 Deleting Users (userdel & userdel -r)',
      '7.5 Managing User Passwords (passwd, -l, -u, -e, -x)',
      '7.6 Viewing User Information (id, who, w, last, awk)',
      '7.7 Group Management (Primary vs Secondary Groups & /etc/group)',
      '7.8 Managing Groups (usermod -aG, gpasswd -d/-M, groupmod)',
      '7.9 Creating Groups (groupadd & addgroup)',
      '7.10 Deleting Groups (groupdel & delgroup)',
      '7.11 Checking User Group Membership (groups, id, /etc/group, getent)',
      '7.12 Managing Administrative Access (sudo, su, visudo, /etc/sudoers)'
    ],
    laymanSummary: 'Managing family members, bedrooms, role badges, secret passwords, and borrowing the parent’s Golden Master Key (sudo) safely.',
    houseAnalogy: 'Family Guestbook (/etc/passwd), Locked Password Safe (/etc/shadow), Room Contractor (useradd), Friendly Receptionist (adduser), Locksmith (passwd), Security Guard (id), Librarian (awk), Role Badges (groups), and Parent’s Master Key (sudo/visudo).',
    kenyanAnalogy: 'Estate Caretaker & Nyumba Kumi Register (/etc/passwd), M-Pesa PIN Vault (/etc/shadow), Mjengo Fundi (useradd), Sacco Receptionist (adduser), Gate Kipande Check (id/who/last), Estate Chamas (/etc/group), and Borrowing the Caretaker’s Master Key with Sign-In Log (sudo).'
  },
  {
    id: 8,
    title: 'Linux Networking',
    status: 'playable',
    topicKey: 'topic8',
    icon: '🌐',
    subtopics: [
      '8.1 Configuring Network Interfaces (Interfaces, Static vs DHCP, Gateway & DNS)',
      '8.2 Managing IP Addresses and Interfaces (ip, ifconfig, ethtool, hostname)',
      '8.3 Managing Network Connections (NetworkManager, nmcli & nmtui)',
      '8.4 Testing Network Connectivity (ping, nslookup, dig, host & arp)',
      '8.5 Monitoring Network Connections (netstat -tulnp, tcpdump & iftop)',
      '8.6 Inspecting Socket Statistics (ss -tulnp, ss -s & Socket States)',
      '8.7 Tracing Network Routes (traceroute, tracepath, mtr & ip route)'
    ],
    laymanSummary: 'Configuring IP addresses, managing network interfaces, testing connectivity, monitoring traffic, inspecting sockets, and tracing routes.',
    houseAnalogy: 'House doors (enp0s3/wlan0/lo), mailbox numbers (IP/DHCP), door knocker (ping), phonebook (dig/nslookup), security monitor (netstat/ss), and delivery tracker (traceroute).',
    kenyanAnalogy: 'Compound gates & Plot numbers (Static IP vs Reception Visitor Badge DHCP), flashing a friend ("Uko hapo?" ping), G4S van (TCP) vs Boda-Boda (UDP), KPLC smart scanner (ss), and tracking every matatu stage along the highway (traceroute).'
  },
  {
    id: 9,
    title: 'Networking Services',
    status: 'playable',
    topicKey: 'topic9',
    icon: '🛎️',
    subtopics: [
      '9.1 Dynamic Host Configuration Protocol (DHCP – DORA, Leases, Reservations, APIPA)',
      '9.2 Domain Name System (DNS – /etc/hosts, Resolver, Root → TLD → Authoritative, Records, TTL)',
      '9.3 File Transfer Protocol (FTP – Ports 21/20, Active vs Passive, get/put, vsftpd, SFTP)'
    ],
    laymanSummary: 'The three helper services every network relies on: automatic addresses (DHCP), name-to-number lookups (DNS), and moving files between computers (FTP).',
    houseAnalogy: 'The Gatekeeper handing out temporary house keys (DHCP), the Librarian with the giant phonebook (DNS), and the Delivery Truck carrying boxes between houses (FTP).',
    kenyanAnalogy: 'The office reception handing out visitor badges (DHCP), your phone contacts list & well-connected friend (DNS), and the Matatu Sacco parcel office sending mzigo upcountry (FTP vs sealed G4S van SFTP).'
  },
  {
    id: 10,
    title: 'Linux Firewall',
    status: 'playable',
    topicKey: 'topic10',
    icon: '🛡️',
    subtopics: [
      '10.1 Linux Firewall (The Security Gatekeeper & Packet Filtering)',
      '10.2 Setting up firewalls (iptables, firewalld & UFW)',
      '10.3 Basic iptables commands (Tables, Chains, Options & Targets)',
      '10.4 Managing firewall configuration (Rule Order, Persistence & Zones)'
    ],
    laymanSummary: 'Protecting your Linux system with dedicated gatekeepers: packet filtering, comparing the 3 security managers, mastering iptables tables & chains, and solving rule order & permanent saving.',
    houseAnalogy: 'The Security Gatekeeper checking visitor ID cards (Source/Dest/Port), hiring the right security manager (iptables/firewalld/UFW), the Guard’s 5 binders and 3 checkpoints (INPUT/OUTPUT/FORWARD), and copying rules into the waterproof notebook so they don’t wash away when it rains.',
    kenyanAnalogy: 'The Gated Estate Askari & Barrier at the Nyumba Kumi gate, choosing between the G4S sergeant vs smart tablet vs estate caretaker, the Askari’s Occurrence Book (OB) and verdict stamps (ACCEPT/DROP/REJECT), and putting emergency exceptions at Line 1 of the clipboard before broad night curfews.'
  },
  {
    id: 11,
    title: 'Monitoring & Troubleshooting',
    status: 'playable',
    topicKey: 'topic11',
    icon: '🩺',
    subtopics: [
      '11.1 Configure network interfaces in CentOS (nmcli, nmtui, /etc/sysconfig/network-scripts & ONBOOT)',
      '11.2 Network configuration and troubleshooting (The 5-Step Diagnostic Ladder & 7 Core Tools)',
      '11.3 System Monitoring (CPU, RAM, Disk, Load Average, Processes & Logs)'
    ],
    laymanSummary: 'Diagnosing network drops from physical link to DNS, configuring enterprise CentOS network interfaces with ONBOOT=yes, and checking the system pulse with top, free, df, and journalctl.',
    houseAnalogy: 'The Basement Utility Breaker panel (CentOS ifcfg & ONBOOT), the 5-Step Water Pipe Leak Detective, and the Smart-House Health Dashboard & Circuit Breaker (CPU, RAM, Disk, and unplugging runaway appliances with kill -9).',
    kenyanAnalogy: 'Registering a KPLC Smart Meter & Nairobi Water connection in Ruiru (CentOS ONBOOT), diagnosing why the cyber café M-Pesa till stopped working, and the Matatu Driver & Sacco Mechanic Dashboard (RPM, passenger seats, luggage boot, and conductor ejecting a troublemaker).'
  },
  {
    id: 12,
    title: 'Process Management',
    status: 'playable',
    topicKey: 'topic12',
    icon: '⚙️',
    subtopics: [
      '12.1 Viewing Processes (ps, ps aux, ps -ef, pstree & Process States: R, S, D, Z, T)',
      '12.2 Real-Time & Enhanced Process Monitoring (top vs htop, Load Average & Hotkeys)',
      '12.3 Managing Processes & Signals (kill, killall, pkill, SIGTERM 15 & SIGKILL 9)',
      '12.4 Controlling Process Priority (nice & renice: The -20 to +19 Politeness Scale)',
      '12.5 Managing Background & Foreground Jobs (&, Ctrl+Z, jobs, bg, fg & nohup)',
      '12.6 Monitoring Disk Usage (df -h, df -i Inodes, du -sh & ncdu)'
    ],
    laymanSummary: 'Inspect running workers (ps, top, htop), master Linux signal codes (kill -15 vs -9), balance CPU politeness with nice/renice (-20 to +19), juggle background/foreground tasks (&, Ctrl+Z, bg, fg, nohup), and hunt storage bloat with df -h and du -sh.',
    houseAnalogy: 'Staff badges and family hierarchy (pstree), the digital thermostat screen (top/htop), the household intercom paging and master power breaker (kill/signals), waiting in line for the kitchen microwave (nice/renice), running laundry in the background (&), and auditing attic trunks (df vs du).',
    kenyanAnalogy: 'The construction site (mjengo) worker register (ps/pstree), the Sacco fleet GPS dashboard (top/htop), restaurant bouncers ejecting troublemakers (kill -9), sand lorries yielding to ambulance sirens on Thika highway (nice/renice), cyber café background printing (&, bg, fg), and checking rooftop Roto water tanks and Gikomba warehouse gunias (df vs du).'
  },
  {
    id: 13,
    title: 'System Services & systemd',
    status: 'playable',
    topicKey: 'topic13',
    icon: '⚡',
    subtopics: [
      '13.1 Systemd Introduction (PID 1, Daemons, Units: .service, .target, .socket, .timer & Cgroups)',
      '13.2 Linux Boot Process (BIOS/UEFI → MBR/GPT → GRUB2 → Kernel & initramfs → Targets)',
      '13.3 Controlling Systemd Services (Service Lifecycle, Active, Inactive, Failed & Masking)',
      '13.4 Systemctl Command Masterclass (start, stop, reload, restart, enable --now & Unit Files)',
      '13.5 Journalctl & Centralized Logging (Binary Journal, -u, -f, -xe, -b, -p err & Vacuum)'
    ],
    laymanSummary: 'Understand how Linux boots and controls every background worker: PID 1 architecture, the 5-stage boot sequence, active vs enabled service states, the systemctl master remote, and black-box diagnostics with journalctl -xe.',
    houseAnalogy: 'The high-tech Smart Home Automation Hub & Butler (systemd PID 1), waking up the estate step-by-step from electrical breaker to living room chandelier (boot sequence), universal appliance remote (systemctl), and tamper-proof digital house diary (journalctl).',
    kenyanAnalogy: 'The Chief Plaza & Estate Caretaker (PID 1), dispatching a long-distance 14-seater matatu at 5:00 AM (boot process), the KPLC substation master breaker & water pump padlock (systemctl & masking), and the police station Occurrence Book / matatu dashcam (journalctl).'
  },
  {
    id: 14,
    title: 'System Monitoring',
    status: 'playable',
    topicKey: 'topic14',
    icon: '📊',
    subtopics: [
      '14.1 Checking Disk Space (df -h, Inodes with df -i, du -sh & ncdu)',
      '14.2 Monitoring Memory Usage (free -h, Buff/Cache, Swap & OOM Killer)',
      '14.3 Viewing CPU Information (lscpu, /proc/cpuinfo, Sockets, Cores & Threads)',
      '14.4 Checking System Uptime and Load (uptime, w & Load Average 1m/5m/15m)',
      '14.5 Monitoring CPU and I/O Performance (iostat, vmstat, %iowait & sar)',
      '14.6 Listing Open Files and Processes (lsof, lsof -i, fuser & Drive Unmounting)'
    ],
    laymanSummary: 'Keep Linux systems rock-solid and responsive: audit disk space and inode limits (df/du/ncdu), decode available memory vs buff/cache (free -h), inspect CPU topology (lscpu), interpret multi-core load averages (uptime/w), isolate %iowait bottlenecks (vmstat/iostat), and hunt open file locks with lsof and fuser.',
    houseAnalogy: 'The master house health check: measuring attic weight (df) vs trunk scales (du), clearing magazines off the coffee table (RAM buff/cache), counting master chefs (lscpu), reading the toll bridge traffic meter (load average), waiting on the slow grocery boy (%iowait), and finding the lost keyholder wedging the door (lsof).',
    kenyanAnalogy: 'The Gikomba warehouse inventory (df/du/inodes), the M-Pesa counter float vs under-desk safe (free/swap/OOM), the Industrial Area metal welding fundis (lscpu), the Thika Superhighway rush hour traffic lanes (uptime load), the cybercafé attendant waiting on the slow printer (%iowait), and the matatu conductor clearing the passenger blocking the stage door (lsof/fuser).'
  },
  {
    id: 15,
    title: 'Shell Scripting',
    status: 'playable',
    topicKey: 'topic15',
    icon: '📜⚡',
    subtopics: [
      '15.1 Linux Shell (Command Line Interpreter, Interactive vs Scripting, Environment & Startup)',
      '15.2 Kernel (Operating System Core, Rings, Process Scheduling, Memory & System Calls)',
      '15.3 Different Shells (sh, bash, zsh, ksh, csh/tcsh, fish & /etc/shells)',
      '15.4 Difference between Shell and Kernel (User Space vs Kernel Space, Crash Boundaries & Syscalls)',
      '15.5 The Terminal (Hardware TTYs, Virtual Consoles /dev/tty1-6, PTYs /dev/pts/* & Terminal Emulators)'
    ],
    laymanSummary: 'Demystify how humans, scripts, and hardware communicate: master the command interpreter (Shell), the low-level operating system engine (Kernel), compare shell flavors (sh, bash, zsh, fish), explore the strict Ring 0 vs Ring 3 security divide, and trace physical TTYs to modern terminal emulators.',
    houseAnalogy: 'Chef Bash waiting at the kitchen counter (Shell) versus the locked basement electrical foundation (Kernel), picking your favorite butler uniform (bash/zsh/fish), the official work order intercom (syscalls), and talking through a smartphone glass app instead of an old rotary telephone (Terminal Emulator).',
    kenyanAnalogy: 'The customer service booking clerk (Shell) versus the Olkaria high-voltage geothermal turbine generators (Kernel), switching from a rugged pickup to a pimped-out Nganya matatu (bash to zsh), official KPLC dispatch work orders (syscalls), and calling from a mobile smartphone rather than a vintage red street coin booth (Terminal).'
  },
  {
    id: 16,
    title: 'Creating and Running Shell Scripts',
    status: 'playable',
    topicKey: 'topic16',
    icon: '📜✍️',
    subtopics: [
      '16.1 Creating a Shell Script (nano/vim, .sh convention, chmod +x, ./ execution & $PATH security)',
      '16.2 Defining the Shell Script Interpreter (The Shebang #!, magic bytes 0x23 0x21, /bin/bash vs /usr/bin/env bash)',
      '16.3 Comments in the Shell Script (# Single-line, inline, header blocks, debug toggling & heredocs)',
      '16.4 Storing and Displaying Messages in a Shell Script (Variables, no-spaces rule, echo, escape codes & printf)',
      '16.5 Storing the Output of Commands (Command substitution $(cmd) vs backticks, nesting & capturing dynamic values)',
      '16.6 Exit Codes of Shell Commands (The $? status, 0=success, 1-255=error, 126/127/137 codes, && and || logic)'
    ],
    laymanSummary: 'Write and run your first automated Linux scripts: master file creation and the crucial chmod +x permission, define the shebang (#!) interpreter header, document with clear comments, store data in variables (no spaces around =), capture dynamic command output with $(), and verify success using exit codes ($?).',
    houseAnalogy: 'Writing signed chore cards for Chef Bash (creating scripts), the corner interpreter flag (shebang), yellow sticky notes (comments), labeled pantry storage jars (variables), measuring clock and scales ($() command capture), and holding up green vs red traffic paddles ($? exit codes).',
    kenyanAnalogy: 'Drafting an official Matatu Sacco route schedule (creating scripts), the yellow windshield destination board (shebang), Kasuku ledger red pencil margin notes (comments), M-Pesa cash till compartments (variables), Posho Mill spring balance scale measurements ($() output), and Safaricom green confirmation SMS vs red transaction failure alerts ($? exit codes).'
  },
  {
    id: 17,
    title: 'Variables, Functions & Operators in Bash',
    status: 'playable',
    topicKey: 'topic17',
    icon: '📦🧩',
    subtopics: [
      '17.1 Shell Variables & Rules for Variable Definition (Valid names, case sensitivity, no-spaces rule, export & env)',
      '17.2 Bash Variable Types & Scope (Strings, integers declare -i, readonly, indexed & associative arrays)',
      '17.3 Working & Running Bash Scripts (Subshell vs source/., execution lifecycle, debugging with bash -x & -n)',
      '17.4 Functions in Bash (Definition syntax, positional args $1/$2, local scope, return vs echo capture)',
      '17.5 Difference between Shell (sh) and Bash (POSIX sh vs GNU bash, [[ ]] vs [ ], arrays, string slicing)',
      '17.6 Basic Operators in Bash (Arithmetic $(( )), numeric -eq/-gt, string ==/-z, file tests -f/-d/-x)'
    ],
    laymanSummary: 'Master the core programming powers of Bash: enforce variable definition rules and export environments, utilize specialized types (integers, arrays, readonly), master subshell execution vs sourcing, build reusable functions with local scope, understand the superpowers of bash over vintage sh, and compute math and file tests with operators.',
    houseAnalogy: 'Chef Bash’s pantry label maker (variable rules), specialized kitchen storage containers (types & arrays), hiring day helpers vs remodeling walls (subshell vs source), laminated recipe routine cards (functions), vintage manual bicycle vs electric cargo bike (sh vs bash), and measuring spoons & door deadbolt testers (operators).',
    kenyanAnalogy: 'M-Pesa till drawer note dividers (variable rules), hardware fundi organizer bins (types & arrays), hiring an outside mechanic vs permanent Sacco rules (subshell vs sourcing), specialized cybercafé laminating machine routines (functions), black village boda boda bicycle vs 150cc Boxer motorcycle (sh vs bash), and highway weighbridge sensors & petrol pump totals (operators).'
  },
  {
    id: 18,
    title: 'Advanced Linux & Cloud/DevOps',
    status: 'upcoming',
    icon: '🐳',
    subtopics: [
      'Loadable Kernel Modules (LKMs - Plug-in Foundation Tools)',
      'Docker Containers (Self-Contained Portable Rooms)',
      'Web Servers: Apache (Many Waiters) vs. Nginx (Fast Queue Counter)'
    ],
    laymanSummary: 'Packing apps into portable rooms that run anywhere (Docker) and running fast web shops for thousands of visitors (Nginx vs Apache).',
    houseAnalogy: 'Portable mini-rooms in the attic (Docker), plug-in foundation tools (LKMs), and a sit-down restaurant with many waiters (Apache) vs a fast-food counter (Nginx).',
    kenyanAnalogy: 'A fitted shipping-container duka that can be lifted by lorry to any town and opened immediately (Docker), and a traditional hotel with many waiters (Apache) vs a fast supermarket express checkout (Nginx).'
  },
  {
    id: 19,
    title: 'Linux in Cloud & DevOps',
    status: 'upcoming',
    icon: '☁️',
    subtopics: [
      'The Cloud Neighborhood (AWS, Azure, GCP running on Linux)',
      'Blueprint Sharing (Git) & Remote Keys (SSH)',
      'Automated Builders (Terraform Blueprints, Ansible Robots & Cron Timers)'
    ],
    laymanSummary: 'Renting houses in a giant sky neighborhood and using friendly robots to build, copy, and guard hundreds of computers at once.',
    houseAnalogy: 'A whole neighborhood of Linux houses built from Terraform blueprints, maintained by Ansible robots and scheduled Cron watering timers.',
    kenyanAnalogy: 'Expanding from one local shop to 50 branches across East Africa using one master architectural plan (Terraform), automatic stock-refill helpers (Ansible), and a night timer switch (Cron).'
  }
];

// ============================================================================
// INTERACTIVE TOYBOX DATA FOR TOPIC 1 & TOPIC 2
// ============================================================================
export const distroMatcherCharacters = [
  {
    id: 'bibi-grace',
    name: 'Shosho Grace (First-Time Learner)',
    avatar: '👵🏾',
    quote: '“I just want a warm, friendly computer where the browser, photos, and buttons are already set up and ready to use today!”',
    bestDistro: 'ubuntu',
    successMessage: 'Spot on! Ubuntu is the Cozy Furnished Cottage (or ready Ugali platter at Mama Oliech)—everything works right out of the box with zero stress!'
  },
  {
    id: 'kevin-dev',
    name: 'Kevin (App Builder & Coder)',
    avatar: '🧑🏾‍💻',
    quote: '“I build modern mobile and web apps in Kilimani. I want a sleek setup that already has the newest developer tools and workshop gadgets built in!”',
    bestDistro: 'fedora',
    successMessage: 'Yes! Fedora is the Modern Tech Apartment (or sleek Westlands Tech Café) packed with the latest tools for software creators!'
  },
  {
    id: 'fundi-musa',
    name: 'Fundi Musa (DIY Customizer)',
    avatar: '👷🏾‍♂️',
    quote: '“Don’t give me pre-made furniture! Give me the bare concrete slab and raw bricks so I can build every wall and switch myself from scratch!”',
    bestDistro: 'arch',
    successMessage: 'Nailed it! Arch Linux is the DIY Custom Mansion (or grinding your own maize at the posho mill)—you build every piece exactly how you like it!'
  },
  {
    id: 'askari-faith',
    name: 'Inspector Faith (Cyber Security Guard)',
    avatar: '🕵🏾‍♀️',
    quote: '“My job is testing bank and house locks to make sure hackers cannot break in. I need a kit pre-loaded with security testing tools!”',
    bestDistro: 'kali',
    successMessage: 'Awesome! Kali Linux is the Security Inspector’s House (or G4S Command Van) pre-packed with ethical security testing tools!'
  }
];

export const architectureLayersData = [
  {
    level: 4,
    id: 'apps',
    name: 'Layer 4 (Top): Applications & Utilities',
    shortName: '4. Applications',
    emoji: '🎵📺',
    color: 'bg-amber-100 border-amber-400 text-amber-950',
    activeColor: 'bg-amber-500 text-white border-amber-700',
    whatItIs: 'The everyday apps you see and touch (Web Browser, Music Player, Calculator, Games).',
    houseRole: '🏠 House Analogy: The Coffee Maker, TV, and Photo Albums inside your rooms.',
    kenyanRole: '🇰🇪 Kenyan Analogy: The delicious plate of Chapati & Chai sitting on your table!',
    liveStepDown: '1️⃣ You tap "Play Music / Order Chapati" on the top layer!',
    liveStepUp: '7️⃣ Hooray! The music plays (and hot chapatis arrive on your table)!'
  },
  {
    level: 3,
    id: 'shell',
    name: 'Layer 3 (Upper-Middle): The Shell (Chef Bash)',
    shortName: '3. Shell (Butler / Waiter)',
    emoji: '🧑‍🍳🤵',
    color: 'bg-purple-100 border-purple-400 text-purple-950',
    activeColor: 'bg-purple-600 text-white border-purple-800',
    whatItIs: 'The friendly translator that listens to your simple commands at the Terminal counter and turns them into instructions for the Kernel.',
    houseRole: '🏠 House Analogy: Chef Bash the Butler standing at the Kitchen Counter (Terminal) with a notepad.',
    kenyanRole: '🇰🇪 Kenyan Analogy: The friendly Waiter at the counter who listens when you say "Niletee chapati mbili!" and takes the order to the kitchen.',
    liveStepDown: '2️⃣ The Shell (Butler / Waiter) hears your request and translates it into a clear kitchen order!',
    liveStepUp: '6️⃣ The Shell hands the finished result back up to you with a smile!'
  },
  {
    level: 2,
    id: 'kernel',
    name: 'Layer 2 (Lower-Middle): The Linux Kernel',
    shortName: '2. Kernel (Foundation / Boss)',
    emoji: '🏗️👩‍🍳',
    color: 'bg-emerald-100 border-emerald-400 text-emerald-950',
    activeColor: 'bg-emerald-600 text-white border-emerald-800',
    whatItIs: 'The heart and foundation of Linux! It sits quietly between the Shell and the physical Hardware, managing time, memory space, and files.',
    houseRole: '🏠 House Analogy: The Strong Concrete Foundation & House Manager with 3 helpers: Time Manager (Process Scheduler), Closet Organizer (Memory Manager), and Master Drawer Map (Virtual File System).',
    kenyanRole: '🇰🇪 Kenyan Analogy: Mama Pima (The Head Kitchen Boss) who controls the jiko fire fairly, arranges the shelves, and knows which sufuria holds what.',
    liveStepDown: '3️⃣ The Kernel (Foundation / Mama Pima) schedules the job, grabs space in Memory, and tells the Hardware what to do!',
    liveStepUp: '5️⃣ The Kernel collects the result from the Hardware and passes it up to the Shell!'
  },
  {
    level: 1,
    id: 'hardware',
    name: 'Layer 1 (Bottom): Physical Hardware',
    shortName: '1. Hardware (Wires / Jiko)',
    emoji: '🔌🔥',
    color: 'bg-sky-100 border-sky-400 text-sky-950',
    activeColor: 'bg-sky-600 text-white border-sky-800',
    whatItIs: 'The real physical parts you can touch: CPU brain chip, RAM memory sticks, Hard Drive storage, Screen, and Speaker wires.',
    houseRole: '🏠 House Analogy: The physical land, bricks, electrical wires, and water pipes underneath the house.',
    kenyanRole: '🇰🇪 Kenyan Analogy: The physical Jiko, glowing charcoal fire, sufurias, and water tank in the back kitchen.',
    liveStepDown: '4️⃣ BZZT! 🔥 The physical Hardware (CPU, Disk & Speakers / The Jiko Fire) does the real physical work!',
    liveStepUp: '4️⃣ BZZT! 🔥 The physical Hardware finishes the job!'
  }
];

export const unixVsLinuxScenarios = [
  {
    id: 'price',
    question: '💰 Cost to Enter & Use',
    prompt: 'You are a student or small cybercafé owner in Eldoret with Ksh 0 budget. Can you install and use it legally for free?',
    unixResult: {
      badge: '❌ UNIX: Locked & Expensive',
      text: '“Pole! Private Property!” Traditional Unix requires expensive corporate licenses costing thousands of dollars.'
    },
    linuxResult: {
      badge: '✅ LINUX: 100% Free Forever!',
      text: '“Karibu! Come right in!” You can download, install, and run Linux on 1 computer or 1,000 computers for Ksh 0!'
    }
  },
  {
    id: 'blueprints',
    question: '📐 Peeking at the Blueprints (Source Code)',
    prompt: 'You are curious how the kitchen foundation works and want to look at the blueprints or add a custom room.',
    unixResult: {
      badge: '🔒 UNIX: Top Secret Vault',
      text: '“Do Not Touch!” The blueprints (source code) are locked away by the company that owns it. Only their paid staff can see inside.'
    },
    linuxResult: {
      badge: '🔓 LINUX: Open Blueprints on the Table!',
      text: '“Harambee Spirit!” Every single line of the blueprint is open for anyone in the world to read, learn from, fix, and customize.'
    }
  },
  {
    id: 'devices',
    question: '📱 Where Can You Build It?',
    prompt: 'You want an operating system that can run on an old laptop, a boda-boda rider’s Android phone, a smart TV, AND a giant bank server.',
    unixResult: {
      badge: '🏢 UNIX: Picky & Heavy',
      text: 'Traditional Unix was built mainly for specific, expensive giant company servers and workstations.'
    },
    linuxResult: {
      badge: '🌍 LINUX: Runs Everywhere!',
      text: 'From tiny smartwatches and Android phones to home laptops and giant Safaricom/AWS cloud servers—Linux fits everywhere!'
    }
  },
  {
    id: 'sharing',
    question: '🎁 Making Copies for Your Friends & School',
    prompt: 'Your friend Alice loves your setup and asks if you can burn a copy for her computer and 20 school lab machines.',
    unixResult: {
      badge: '🚫 UNIX: Strictly Forbidden',
      text: 'Copying proprietary Unix without buying a license for each machine breaks copyright law.'
    },
    linuxResult: {
      badge: '🎉 LINUX: Share With the Whole Village!',
      text: 'Linux actively encourages you to share copies with your friends, neighbors, and schools!'
    }
  }
];

// Topic 2 Interactive Data: 7 Standard Directories in the House / Compound
export const linuxRoomsDirectoryData = [
  {
    path: '/',
    name: 'Root ( / )',
    emoji: '🚪',
    houseRole: 'The Main Front Door',
    kenyanRole: 'Main Estate Barrier Gate',
    insideItems: ['home/', 'etc/', 'bin/', 'var/', 'tmp/', 'root/'],
    whatLivesHere: 'The starting point of the whole computer! Every other room branches from this single front gate.'
  },
  {
    path: '/home',
    name: '/home',
    emoji: '🛏️',
    houseRole: 'Family Bedrooms (/home/sam)',
    kenyanRole: 'Residents’ Houses / Student Dorms (/home/wanjiku)',
    insideItems: ['sam/', 'wanjiku/', 'photos.jpg', 'chapati_recipe.txt'],
    whatLivesHere: 'Your personal cozy room! This is where your own documents, photos, music, and downloads live safely.'
  },
  {
    path: '/etc',
    name: '/etc',
    emoji: '⚙️',
    houseRole: 'Settings & Rules Cabinet',
    kenyanRole: 'Caretaker Registry & KPLC Meter Box',
    insideItems: ['passwd (Family Registry)', 'sudoers (House Rules)', 'hostname'],
    whatLivesHere: 'System-wide configuration files and rulebooks! No personal photos here—just settings that tell the house how to behave.'
  },
  {
    path: '/bin',
    name: '/bin & /usr/bin',
    emoji: '🧰',
    houseRole: 'Everyday Toolbox',
    kenyanRole: 'Jembe, Panga & Spanner Tool Shed',
    insideItems: ['ls (Magnifying Glass)', 'cd (Walking Shoes)', 'cp (Photocopier)', 'mkdir (Room Builder)'],
    whatLivesHere: 'Essential command tools ("binaries") that you and the system use every day to get work done.'
  },
  {
    path: '/var',
    name: '/var',
    emoji: '📓',
    houseRole: 'Security Camera Logbook & Storage Shed',
    kenyanRole: 'Watchman’s Occurrence Book (OB) at the Gate',
    insideItems: ['log/auth.log (Who logged in)', 'log/syslog', 'mail/'],
    whatLivesHere: 'Variable data that changes and grows all day long—especially security logs (/var/log) and website files!'
  },
  {
    path: '/tmp',
    name: '/tmp',
    emoji: '📝',
    houseRole: 'Kitchen Sticky-Note Scratchpad',
    kenyanRole: 'Classroom Chalkboard (Wiped Every Evening)',
    insideItems: ['draft_note.tmp', 'browser_cache.tmp'],
    whatLivesHere: 'Temporary scratch files needed by programs for a few minutes. Gets wiped clean automatically when the computer restarts!'
  },
  {
    path: '/root',
    name: '/root',
    emoji: '👑',
    houseRole: 'Parent / Superuser Master Suite',
    kenyanRole: 'Principal’s / Caretaker’s Private Quarters',
    insideItems: ['secret_admin_notes.txt', 'backup_plan.sh'],
    whatLivesHere: 'The private home folder for the "root" superuser (admin). Regular users live in /home, while the boss lives in /root!'
  }
];
