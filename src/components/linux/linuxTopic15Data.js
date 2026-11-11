// Topic 15: Shell Scripting Fundamentals (5 Subtopics)
// 15.1 Linux Shell (Command Line Interpreter, Interactive vs Non-Interactive, Environment & Startup)
// 15.2 Kernel (Operating System Core, Rings, Process Scheduling, Memory & System Calls)
// 15.3 Different Shells (sh, bash, zsh, ksh, csh/tcsh, fish & /etc/shells)
// 15.4 Difference between Shell and Kernel (User Space vs Kernel Space, Crash Boundaries & Syscalls)
// 15.5 The Terminal (Hardware TTYs, Virtual Consoles /dev/tty1-6, PTYs /dev/pts/* & Terminal Emulators)

export const linuxTopic15Subtopics = [
  // ==========================================================================
  // 15.1 LINUX SHELL
  // ==========================================================================
  {
    id: 'linux-shell',
    number: '15.1',
    title: 'Linux Shell (The Command Interpreter & Automation Engine)',
    shortTitle: 'Linux Shell',
    icon: '🐚⚡',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    laymanHeadline:
      'The Linux Shell is your computer butler and translator: it listens to words you type, translates them into system requests, and can run written chore recipes (scripts) while you sleep.',
    laymanExplanation:
      'A computer CPU only understands ones and zeros (binary machine instructions). You, as a human, speak natural language and simple command words like "mkdir", "ls", or "rm".\n• The Command Line Interpreter (CLI): The Shell is a program that sits between you and the deep operating system. It prints a prompt (like "sam@linux:~$ "), waits for you to type, parses your syntax, checks if commands exist, and asks the operating system kernel to execute them.\n• Two Modes of Operation:\n  1. Interactive Mode: You type a single command, hit Enter, and receive immediate visual feedback (the Read-Eval-Print Loop or REPL).\n  2. Non-Interactive / Scripting Mode: You write 50 commands into a text file ending in ".sh", add executable permissions with "chmod +x", and run it. The shell reads from the file line-by-line from top to bottom, making complex backups, system updates, and server setups happen in seconds with zero human typing!\n• Builtins vs External Binaries: Commands like "cd", "echo", and "pwd" are built directly inside the shell code itself for blazing speed ("type cd"). Commands like "ls", "grep", and "top" are independent binary programs residing on disk in "/usr/bin/".\n• Shell Environment: The shell holds memory variables like "$SHELL", "$PATH", and "$USER". The famous "$PATH" variable is a colon-separated list of folders the shell searches whenever you type a command name!',
    laymanPoints: [
      {
        term: 'Command Line Interpreter (CLI)',
        meaning:
          'A text-based user interface program that reads human text instructions, checks syntax, expands wildcards, and delegates execution to the OS kernel.'
      },
      {
        term: 'Interactive REPL Mode',
        meaning:
          'The shell prompt ($ for standard users, # for root) waiting for you to type live commands with immediate real-time feedback.'
      },
      {
        term: 'Non-Interactive (Scripting) Mode',
        meaning:
          'Automating repetitive workflows by saving commands in a .sh file. The shell executes every line sequentially without requiring manual user input.'
      },
      {
        term: 'Shell Builtins vs External Binaries',
        meaning:
          'Builtins (cd, exit, alias) run internally inside the shell process memory for speed. External binaries (ls, ping) are compiled files executed from disk.'
      },
      {
        term: 'The $PATH Search Directory',
        meaning:
          'An environment variable listing the exact directories (/usr/bin, /usr/local/bin) where the shell searches for program files when you type a command.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): Chef Bash, The Helpful House Butler',
      icon: '🏠🧑‍🍳',
      summary:
        '“You never crawl inside the house walls to touch electrical cables yourself—you speak to Chef Bash at the counter, or leave him a written chore card!”',
      points: [
        {
          name: 'The Kitchen Order Counter = The Shell Prompt ($)',
          emoji: '🛎️💬',
          desc: 'The clean wooden counter where Chef Bash stands waiting. When you walk up and say "ls" (show me what groceries are in the pantry), he immediately nods and replies.'
        },
        {
          name: 'Spoken Orders = Interactive Mode',
          emoji: '🗣️🍳',
          desc: 'Asking Chef Bash for one cup of tea. He brews it, sets it on the counter, and immediately waits for your next spoken request.'
        },
        {
          name: 'The Written Morning Chore Card = Shell Script (.sh file)',
          emoji: '📜📋',
          desc: 'Instead of standing there giving 20 orders every morning, you pin a written recipe card to the corkboard: "1. Boil kettle; 2. Toast bread; 3. Take out trash; 4. Lock gate". Chef Bash reads it top-to-bottom automatically!'
        },
        {
          name: 'Pocket Tools vs Shed Tools = Builtin vs External Commands',
          emoji: '🔦🛠️',
          desc: 'Chef Bash has a pocket notebook and pen in his apron (Builtins like "cd" and "echo" right on hand). For a lawnmower ("grep" or "tar"), he walks out to the tool shed in /usr/bin/.'
        },
        {
          name: 'The Address Book = The $PATH Variable',
          emoji: '🗺️📍',
          desc: 'When you ask for a tool, Chef Bash flips through his approved address list (/usr/bin, /usr/local/bin) to find the right room where that tool lives.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Head Matatu Stage Marshall & Booking Clerk',
      icon: '🇰🇪🚐',
      summary:
        '“At a bustling Nairobi bus terminal, passengers don’t crawl under the matatu to fiddle with the driveshaft—they deal with the Stage Marshall!”',
      points: [
        {
          name: 'The Booking Window Prompt = The Shell Prompt ($)',
          emoji: '🪟🎫',
          desc: 'The clerk sitting behind the glass at the 2NK or Super Metro booking office, waiting with a pen for you to step forward and speak.'
        },
        {
          name: 'Walk-in Ticket Order = Interactive Mode',
          emoji: '🗣️💵',
          desc: 'You say: "Nipe ticket moja ya Nakuru" (give me one Nakuru ticket). He prints it, hands it over, and says: "Next customer please!"'
        },
        {
          name: 'The Daily Route Dispatch Sheet = Shell Scripting (.sh)',
          emoji: '📑⏰',
          desc: 'At 5:00 AM, the Sacco manager hands the marshall a clipboard listing the 20 scheduled trips for the day. The marshall runs every trip automatically without calling the manager for every matatu.'
        },
        {
          name: 'Whistle vs Toolbox = Builtins vs External Commands',
          emoji: '🪈🔧',
          desc: 'The marshall keeps his whistle in his mouth (Builtin command, instant sound). When a tyre needs a jack, he sends a boy to the mechanic shed (External binary in /usr/bin).'
        },
        {
          name: 'Approved Stage Routes = The $PATH Environment',
          emoji: '🛣️🧭',
          desc: 'The city council map showing which official stages (Railways, Kencom, Ambassador) the Sacco is authorized to pick passengers from.'
        }
      ]
    },
    somaticMove: {
      name: 'The Butler Counter Tap (Interactive vs Scripting)',
      action:
        'Stand tall. Tap one finger on your desk twice like typing a single live command, then sweep your hand straight down in one smooth stroke from head to waist like scanning a 10-line script!',
      whyItWorks:
        'Physically links the quick single tap to Interactive REPL mode and the top-to-bottom sweep to automated batch scripting execution.'
    },
    quickTakeaway:
      'The Shell is the interpreter between you and the kernel. It runs live typed commands (interactive) or reads files line-by-line to automate tasks (scripting)!'
  },

  // ==========================================================================
  // 15.2 THE KERNEL
  // ==========================================================================
  {
    id: 'linux-kernel',
    number: '15.2',
    title: 'The Kernel (The Heart, Brain & Master Resource Controller)',
    shortTitle: 'The Kernel',
    icon: '🧠⚙️',
    pastelBg: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    accentText: 'text-cyan-950',
    badgeBg: 'bg-cyan-100 text-cyan-900',
    laymanHeadline:
      'The Kernel is the hidden master engine of Linux: it lives in protected memory, talks directly to raw metal chips, and shares CPU time and RAM fairly among all programs.',
    laymanExplanation:
      'When you power on a computer, the very first software that takes complete control of the machine is the Kernel (the file named "/boot/vmlinuz"). The kernel is the true operating system core; everything else—including your web browser, terminal, and desktop wallpaper—are just user programs running on top of it!\n• The Hardware Gatekeeper: No user application is ever allowed to touch hard drive platters, RAM chips, or network cables directly. If an app wants to save a file, it MUST knock on the kernel’s door and ask politely using a "System Call" (syscall).\n• The 4 Master Kernel Pillars:\n  1. Process Scheduler: Slices every second into milliseconds so hundreds of programs (Spotify, Chrome, bash) share the CPU without freezing each other.\n  2. Memory Management (MMU): Gives each program its own private sandbox of virtual memory so a crash in a game cannot corrupt your saved documents.\n  3. Hardware Device Drivers: Translates universal commands into hardware-specific signals for Intel CPUs, Realtek Wi-Fi, NVIDIA GPUs, and NVMe SSDs.\n  4. Virtual File System (VFS): Organizes disks, USB sticks, and RAM files into one seamless tree under the root ("/") folder.\n• Kernel Space (Ring 0) vs User Space (Ring 3): The CPU hardware enforces strict privilege rings. The kernel runs in Ring 0 (unrestricted hardware power). All user programs and shells run in Ring 3 (sandboxed). If a Ring 3 program tries an illegal operation, the CPU blocks it with a Segmentation Fault (SIGSEGV)!',
    laymanPoints: [
      {
        term: 'Kernel Space (Ring 0)',
        meaning:
          'The highest-privilege CPU execution ring where the kernel lives with unrestricted direct access to memory chips, CPU registers, and hardware.'
      },
      {
        term: 'Process Scheduler',
        meaning:
          'The kernel engine that allocates tiny time slices (quantum) of CPU execution to hundreds of processes so they appear to run simultaneously.'
      },
      {
        term: 'Virtual Memory & MMU',
        meaning:
          'Isolates each process inside its own protected memory sandbox, preventing buggy apps from reading or corrupting each other’s data.'
      },
      {
        term: 'Device Drivers',
        meaning:
          'Kernel software modules that translate generic read/write requests into electrical commands for specific motherboards, drives, and network chips.'
      },
      {
        term: 'System Calls (Syscalls)',
        meaning:
          'The strictly guarded API gateway (like open, read, write, fork) that user programs use to request privileged hardware actions from the kernel.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Concrete Foundation & Power Generator Room',
      icon: '🏠⚡',
      summary:
        '“The Kernel is the reinforced basement generator room that keeps water running, electricity flowing, and the roof from collapsing!”',
      points: [
        {
          name: 'The Locked Basement = Kernel Space (Ring 0)',
          emoji: '🔐🏗️',
          desc: 'A heavy steel door in the basement where only the master building engineer is allowed. Inside are the main electrical transformers, water mains, and gas lines.'
        },
        {
          name: 'The Living Rooms = User Space (Ring 3)',
          emoji: '🛋️📺',
          desc: 'Where you, your family, and guests live. You can move chairs and play music, but you cannot rewire the house high-voltage cables directly.'
        },
        {
          name: 'The Wall Intercom = System Calls (Syscalls)',
          emoji: '📻🛎️',
          desc: 'When you want hot water in the bathroom, you don’t go light the gas boiler yourself. You press the wall intercom and ask the basement engineer: "Please send 50 liters of hot water!"'
        },
        {
          name: 'The Electricity Meter & Circuit Breakers = Process Scheduler',
          emoji: '⚡⚖️',
          desc: 'Ensures the kitchen oven, air conditioner, and living room TV all get steady voltage without one greedy gadget causing a blackout.'
        },
        {
          name: 'Private Bedroom Closets = Virtual Memory Management',
          emoji: '🚪📦',
          desc: 'Each person has their own private locked closet. Guest A cannot accidentally or maliciously put their clothes in Guest B’s closet!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: Mama Pima & The Back Kitchen Stove Room',
      icon: '🇰🇪👩‍🍳',
      summary:
        '“In a busy kibandaski, customers never touch the red-hot jiko or boiling oil—Mama Pima controls the fire from the back kitchen!”',
      points: [
        {
          name: 'The Hot Cooking Area = Kernel Space (Ring 0)',
          emoji: '🔥🍲',
          desc: 'The smoking kitchen floor with boiling bone soup, blazing charcoal jikos, and sharp butcher knives. Only Mama Pima and her certified cooks have access.'
        },
        {
          name: 'The Customer Dining Benches = User Space (Ring 3)',
          emoji: '🪑🍽️',
          desc: 'Where customers sit peacefully on wooden benches eating their meals without risk of getting burned by boiling stew.'
        },
        {
          name: 'The Kitchen Hatch Counter = System Call (Syscall)',
          emoji: '🛎️🥘',
          desc: 'When a customer wants beef stew, the waiter knocks on the small kitchen sliding window and shouts the order. The food is passed back safely across the hatch.'
        },
        {
          name: 'Charcoal Fire Allocation = The Process Scheduler',
          emoji: '🪵⏱️',
          desc: 'Mama Pima shifts the big sufurias around: 10 minutes on high heat for beans, 5 minutes for tea, so all 6 dishes finish on time.'
        },
        {
          name: 'Separate Serving Plates = Memory Management',
          emoji: '🍽️🛡️',
          desc: 'Each customer gets their own clean enamel plate. Customer 1 cannot dip their spoon into Customer 2’s plate without a fight!'
        }
      ]
    },
    somaticMove: {
      name: 'The Kernel Chest Thump (Heart & Shield)',
      action:
        'Pat your chest twice firmly with a closed fist ("Thump-Thump" = The Heart of the OS), then push both palms forward like a security shield holding back wild apps!',
      whyItWorks:
        'Reinforces that the kernel is both the pulsing central heart of the computer and the strict security barrier protecting hardware resources.'
    },
    quickTakeaway:
      'The Kernel is the low-level heart of Linux (Ring 0). It manages CPU scheduling, RAM allocation, and hardware drivers while protecting the system from rogue apps!'
  },

  // ==========================================================================
  // 15.3 DIFFERENT SHELLS
  // ==========================================================================
  {
    id: 'different-shells',
    number: '15.3',
    title: 'Different Shells (sh, bash, zsh, ksh, csh/tcsh & fish)',
    shortTitle: 'Different Shells',
    icon: '🐚🌈',
    pastelBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    accentText: 'text-purple-950',
    badgeBg: 'bg-purple-100 text-purple-900',
    laymanHeadline:
      'Just like there are different styles of cars (workhorse trucks, racecars, smart electric cars), Linux offers multiple shells tailored for speed, power, or beginner ease.',
    laymanExplanation:
      'Because Linux is modular, you are never locked into just one command interpreter. You can install multiple shells and choose your favorite for interactive work, while keeping a standard shell for production scripts!\n• The Major Shell Families:\n  1. sh (Bourne Shell - /bin/sh): Written by Stephen Bourne at Bell Labs in 1979. The granddaddy of UNIX shells. It defines the POSIX standard. Extremely lightweight, fast, and available on virtually every UNIX system on Earth, but lacks modern conveniences like tab auto-completion or arrow-key history.\n  2. bash (Bourne Again Shell - /bin/bash): Created by Brian Fox for the GNU Project. The undisputed standard default shell across Linux distributions (Ubuntu, Debian, Fedora, CentOS). Backwards-compatible with sh, but adds command history, tab completion, bash arrays, string manipulation, and arithmetic expansion.\n  3. zsh (Z Shell - /bin/zsh): A modern powerhouse shell (default on macOS since Catalina). Famous for Oh My Zsh, advanced fuzzy tab-completion (navigating directories with arrow keys), git status badges, and syntax theme plugins.\n  4. ksh (Korn Shell - /bin/ksh): Created by David Korn at Bell Labs. Combines Bourne shell compatibility with C-shell interactive power; widely used on commercial enterprise UNIX (AIX, Solaris, HP-UX).\n  5. csh / tcsh (C Shell): Designed with syntax mirroring the C programming language. Popular in academic computing in the 1980s, but avoided for modern scripting due to quoting bugs.\n  6. fish (Friendly Interactive Shell): The futuristic, zero-config shell. Features full-color syntax highlighting as you type, intelligent autosuggestions based on history, and web-based configuration.\n• Checking & Changing Shells: Run "echo $SHELL" to view your current login shell, "cat /etc/shells" to see all installed shells on the machine, and "chsh -s /bin/zsh" to switch your permanent default shell!',
    laymanPoints: [
      {
        term: 'sh (Bourne Shell)',
        meaning:
          'The original 1979 UNIX POSIX standard shell. Ultra-lightweight and universal, ideal for portable system boot scripts.'
      },
      {
        term: 'bash (Bourne Again Shell)',
        meaning:
          'The universal Linux standard. Combines POSIX compliance with rich interactive features, command history, and tab completion.'
      },
      {
        term: 'zsh (Z Shell)',
        meaning:
          'High-performance interactive shell with fuzzy auto-completion, rich themes, git branch integration, and Oh My Zsh support.'
      },
      {
        term: 'fish (Friendly Interactive)',
        meaning:
          'Modern beginner-friendly shell with instant color syntax highlighting, auto-suggestions, and web browser config out-of-the-box.'
      },
      {
        term: '/etc/shells & chsh',
        meaning:
          'The configuration file listing all valid authorized login shells on the system, and the command used to switch your default shell.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The 5 Different Butler Uniforms & Personalities',
      icon: '🏠👔',
      summary:
        '“The foundation of your house never changes, but you can hire whichever butler personality suits your working style best!”',
      points: [
        {
          name: 'The Traditional Vintage Butler = sh',
          emoji: '📜🎩',
          desc: 'Speaks minimal, formal English from 1979. Never makes a mistake and works with lightning speed, but refuses to guess what you want before you finish speaking.'
        },
        {
          name: 'The Universal Reliable Swiss Army Knife Butler = bash',
          emoji: '🧑‍🍳🔧',
          desc: 'The friendly butler who has worked in 90% of all Linux houses for 30 years. Remembers everything you ordered yesterday (history) and completes your sentences (tab completion).'
        },
        {
          name: 'The High-Tech Stylish Butler with Neon Glasses = zsh',
          emoji: '🕶️✨',
          desc: 'Wears customized designer jackets (themes), predicts whole folder paths with fuzzy logic, and tells you what git branch your house project is on before you even ask.'
        },
        {
          name: 'The Smart AI Assistant Butler = fish',
          emoji: '🐟🤖',
          desc: 'Colors your words in green if the pantry has that ingredient and red if it doesn’t, auto-completing your thoughts in light grey before you finish typing.'
        },
        {
          name: 'The Butler Agency Registry = /etc/shells',
          emoji: '📋🏢',
          desc: 'The official laminated list on the house wall showing which registered butlers are certified to hold keys to the front door.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: Different Vehicles for Different Journeys Across Kenya',
      icon: '🇰🇪🚗',
      summary:
        '“Whether you board a rugged Land Cruiser, a reliable Probox, or an Nganya matatu with LED screens, they all drive on the same Kenyan asphalt!”',
      points: [
        {
          name: 'The Classic Toyota Hilux Pickup = sh',
          emoji: '🛻🌾',
          desc: 'No air conditioning, manual windows, but it will start on the first crank in Turkana, Moyale, or Mombasa without failing. Universal and unbreakable.'
        },
        {
          name: 'The Universal Toyota Probox / Fielder = bash',
          emoji: '🚗📦',
          desc: 'Found in every single county from Kisumu to Nyeri. It can carry luggage, run taxi errands, and every single mechanic knows how to fix it with their eyes closed.'
        },
        {
          name: 'The Custom "Nganya" Manyanga Matatu = zsh',
          emoji: '🚐🔊',
          desc: 'Pimped out with neon LED lights, custom graffiti, heavy bass subwoofers, and TV screens showing music videos. Modern, flashy, and everyone loves riding it!'
        },
        {
          name: 'The Modern Smart Hybrid Car = fish',
          emoji: '🚙⚡',
          desc: 'Comes with lane assist, heads-up display, and blind-spot monitors that beep in color to keep you from hitting the curb even if you just got your driving license yesterday.'
        },
        {
          name: 'The NTSA Vehicle Registry = /etc/shells',
          emoji: '📑👮',
          desc: 'The official government registry of certified roadworthy vehicle categories allowed to operate as public service transports on Kenyan highways.'
        }
      ]
    },
    somaticMove: {
      name: 'The 4-Flavor Steering Wheel Shift',
      action:
        'Pretend to grab a car steering wheel. Shift gears 4 times: 1st gear (stiff sh), 2nd gear (steady bash), 3rd gear (flashy zsh with a wrist flip), and 4th gear (smooth glide fish)!',
      whyItWorks:
        'Associates physical gear shifts with the evolution and spectrum of shell capabilities from minimal sh to hyper-modern fish.'
    },
    quickTakeaway:
      'sh is universal and lightweight; bash is the trusted Linux default; zsh offers custom themes and fuzzy completion; fish brings zero-config auto-suggestions!'
  },

  // ==========================================================================
  // 15.4 DIFFERENCE BETWEEN SHELL AND KERNEL
  // ==========================================================================
  {
    id: 'difference-shell-and-kernel',
    number: '15.4',
    title: 'Difference between Shell and Kernel (The Great Boundary)',
    shortTitle: 'Shell vs Kernel',
    icon: '⚖️🛡️',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-900',
    laymanHeadline:
      'The Shell is the outer protective shell (the translator), while the Kernel is the inner core (the motor). If your shell crashes, your window closes; if the kernel crashes, the entire computer halts!',
    laymanExplanation:
      'Many beginners confuse the Shell and the Kernel because they often hear them used together. But they are completely distinct layers separated by a rock-hard CPU hardware security boundary!\n• The Architecture Divide:\n  1. Position: The Shell lives on the OUTSIDE (User Space / Ring 3). The Kernel lives on the INSIDE (Kernel Space / Ring 0).\n  2. Audience: The Shell talks directly to HUMANS and scripts via text (keyboard stdin, screen stdout). The Kernel talks directly to HARDWARE silicon (CPU registers, motherboard buses, network chips).\n  3. Quantity: You can run dozens of shells simultaneously (5 open terminal tabs = 5 bash processes running under different PIDs). But there is strictly only ONE kernel running on the physical computer managing all of them!\n  4. Crash Consequence: If you write a buggy shell command or trigger an infinite loop that kills bash ("kill -9 $$"), only that single terminal tab closes—the computer and all other users keep running smoothly! But if the Kernel encounters an unrecoverable hardware fault or memory corruption, it suffers a "Kernel Panic" and the entire operating system halts instantly with flashing keyboard lights!\n  5. The Bridge Between Them: How do they communicate? Through System Calls (syscalls)! When bash needs to print a word, it does not touch the monitor—it asks the kernel via "write()". When bash needs to make a folder, it asks the kernel via "mkdir()".',
    laymanPoints: [
      {
        term: 'User Space vs Kernel Space',
        meaning:
          'Shells run in sandboxed User Space (Ring 3) without direct hardware access. The Kernel runs in Kernel Space (Ring 0) with total machine authority.'
      },
      {
        term: 'Multiple Shells vs Single Kernel',
        meaning:
          'A system can run dozens of shells simultaneously for different users, but only one monolithic kernel manages the entire computer hardware.'
      },
      {
        term: 'Crash Boundary & Isolation',
        meaning:
          'A crashed shell only closes one terminal window. A crashed kernel triggers a catastrophic Kernel Panic, halting the entire operating system.'
      },
      {
        term: 'Translator vs Engine',
        meaning:
          'The shell interprets human command strings (ls -la) and turns them into system calls. The kernel executes the actual disk read and memory copy.'
      },
      {
        term: 'Interchangeability',
        meaning:
          'You can switch shells instantly (bash to zsh to fish) without rebooting. Replacing the kernel requires rebooting into a new vmlinuz image.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Front Desk Receptionist vs The Foundation Civil Engineer',
      icon: '🏠⚖️',
      summary:
        '“If the front-desk receptionist spills a cup of coffee, she wipes her desk and keeps working. If the foundation cracks, the whole building collapses!”',
      points: [
        {
          name: 'The Front Desk Receptionist = The Shell',
          emoji: '👩‍💼🛎️',
          desc: 'Polite, speaks human languages, answers customer phone calls, and translates human requests into standard official work order forms.'
        },
        {
          name: 'The Foundation Civil Engineer = The Kernel',
          emoji: '👷‍♂️🏗️',
          desc: 'Wears a hard hat in the deep basement maintenance tunnels. Doesn’t talk to customers; calculates steel beam load weight and monitors electrical generators.'
        },
        {
          name: 'The Official Work Order = System Calls (Syscalls)',
          emoji: '📝📋',
          desc: 'The receptionist cannot knock down a wall herself. She fills out Work Order #42 ("Please create a new room") and passes it through the reinforced glass window to the engineer.'
        },
        {
          name: 'A Fainting Receptionist vs A Basement Explosion',
          emoji: '☕💥',
          desc: 'If the receptionist faints (shell crash), the supervisor hires a new receptionist in 2 seconds. If the basement transformer explodes (kernel panic), the entire building goes pitch black!'
        },
        {
          name: 'Many Reception Desks = Multiple Shells',
          emoji: '🏢🪑',
          desc: 'A large estate can have 10 reception desks operating at different gates (different users in different terminals), all supported by the same single concrete foundation underneath.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: Kenya Power (KPLC) Customer Care Desk vs Olkaria Geothermal Turbines',
      icon: '🇰🇪⚡',
      summary:
        '“You buy electricity tokens from the customer service attendant, but the raw gigawatts are generated by massive steam turbines deep underground!”',
      points: [
        {
          name: 'The Customer Service Teller = The Shell',
          emoji: '👨‍💼🖥️',
          desc: 'The person at the Stima Plaza banking hall who listens to you say: "Niko na shida ya stima kwa ploti" (I have a power outage). He types your meter number into his computer.'
        },
        {
          name: 'The High-Voltage Geothermal Turbines = The Kernel',
          emoji: '🌋⚡',
          desc: 'The massive roaring steam turbines in Naivasha pumping 220,000 volts across national grid pylons. Powerful, hazardous, and running 24/7.'
        },
        {
          name: 'The Dispatch Work Order = System Calls (Syscalls)',
          emoji: '📄📻',
          desc: 'The teller at the counter cannot climb a utility pole. He radios the Olkaria grid control room to switch the feeder transformer.'
        },
        {
          name: 'Teller System Logoff vs National Grid Collapse',
          emoji: '💻🔌',
          desc: 'If the teller’s desktop monitor goes blank (shell exit), you simply walk to Counter #2. But if the national grid trips (kernel panic), the entire country from Mombasa to Kisumu experiences a total blackout!'
        },
        {
          name: 'Many Branch Offices = Multiple Shells',
          emoji: '🏬📍',
          desc: 'KPLC has branches in Nakuru, Eldoret, and Machakos (many shells), but all branches feed into the exact same single national power grid (one kernel).'
        }
      ]
    },
    somaticMove: {
      name: 'The Wall-Knock System Call',
      action:
        'Hold your left hand flat in front of your chest like a thick concrete wall (The Kernel boundary). Use your right knuckles to knock firmly on your palm twice ("Knock-Knock = Syscall request to the kernel!").',
      whyItWorks:
        'Solidifies the muscle memory that user-space shells never enter kernel space directly—they must knock on the syscall interface to get work done.'
    },
    quickTakeaway:
      'The Shell is the outer human translator (User Space, Ring 3). The Kernel is the inner hardware engine (Kernel Space, Ring 0). They communicate exclusively through System Calls!'
  },

  // ==========================================================================
  // 15.5 THE TERMINAL
  // ==========================================================================
  {
    id: 'linux-terminal',
    number: '15.5',
    title: 'The Terminal (Hardware TTYs, Virtual Consoles & Terminal Emulators)',
    shortTitle: 'The Terminal',
    icon: '🖥️📟',
    pastelBg: 'bg-teal-50',
    borderColor: 'border-teal-300',
    accentText: 'text-teal-950',
    badgeBg: 'bg-teal-100 text-teal-900',
    laymanHeadline:
      'The Terminal is the screen and keyboard glass: historically a heavy physical typewriter, today a sleek software window that connects your fingertips to the shell.',
    laymanExplanation:
      'People often say "open the terminal" and "open the shell" as if they are the exact same thing. But historically and architecturally, they are distinct pieces of technology that plug into each other!\n• The Physical Terminal (TTY - TeleTYpewriter): In the 1960s and 70s, computers were room-sized mainframes. Users sat at heavy physical electromechanical typewriters with keyboards and rolling paper rolls (like the Teletype Model 33) or CRT screens (like the DEC VT100) plugged into the computer with physical serial cables. These hardware devices were called Terminals.\n• Linux Virtual Consoles (/dev/tty1 to /dev/tty6): Linux still honors this history directly! Even on a headless Linux server with zero desktop installed, the Linux kernel provides 6 independent fullscreen text consoles. If you press "Ctrl + Alt + F2" on a native Linux computer, your graphical desktop vanishes and you drop into a pure black-and-white hardware-level virtual console running on "/dev/tty2"! Press "Ctrl + Alt + F1" or "Ctrl + Alt + F7" to return to your desktop.\n• Terminal Emulators (PTY - Pseudo-Terminal): On modern graphical desktops (GNOME, KDE, macOS, Windows), you don’t use a physical VT100 hardware screen. Instead, you launch an app like GNOME Terminal, Alacritty, Kitty, or Windows Terminal. This app is a "Terminal Emulator"—a graphical window that pretends to be a vintage hardware terminal!\n• The Complete Pipeline Formula:\n  Keyboard Finger Keystroke → Terminal Emulator Window → Pseudo-Terminal Master/Slave (/dev/pts/0) → Shell (bash) → System Calls → Linux Kernel → Hardware CPU & RAM.\n• Essential Terminal Commands: "tty" (prints your active terminal name like /dev/pts/1), "who" or "w" (shows which terminals are logged in), "clear" or "Ctrl + L" (clears the display screen), and "reset" (restores scrambled terminal escape codes).',
    laymanPoints: [
      {
        term: 'Physical Terminal (TTY)',
        meaning:
          'Historical physical hardware (keyboard + CRT screen or typewriter) connected via serial wire to a remote mainframe computer.'
      },
      {
        term: 'Virtual Consoles (/dev/tty1-6)',
        meaning:
          'Built-in fullscreen text-only consoles provided by the Linux kernel, switchable using Ctrl+Alt+F1 through F6.'
      },
      {
        term: 'Terminal Emulator (GNOME, Kitty, Alacritty)',
        meaning:
          'A graphical desktop application that emulates a traditional hardware terminal and connects your keyboard to the shell.'
      },
      {
        term: 'Pseudo-Terminal Slave (/dev/pts/*)',
        meaning:
          'Virtual device endpoints created dynamically whenever you open a new terminal window or connect remotely via SSH.'
      },
      {
        term: 'The tty & reset Commands',
        meaning:
          '"tty" reports your current terminal device path, while "reset" fixes a terminal that has garbled text after printing binary data.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Telephone Instrument vs The Person Talking',
      icon: '🏠☎️',
      summary:
        '“The Terminal is the telephone handset you hold to your ear; the Shell is the friendly person talking on the other end of the line!”',
      points: [
        {
          name: 'The Heavy Rotary Wall Phone = Hardware Terminal (TTY)',
          emoji: '☎️🔌',
          desc: 'The old physical rotary dial telephone bolted to the hallway wall in 1975 with thick copper cables. It had no intelligence—it just captured voice vibrations.'
        },
        {
          name: 'The Modern Smartphone Glass App = Terminal Emulator',
          emoji: '📱🎨',
          desc: 'Your modern touch screen running a software phone app with dark mode, custom font sizes, and colorful themes, emulating the old rotary telephone.'
        },
        {
          name: 'The Voice Answering the Call = The Shell (bash)',
          emoji: '🗣️🧑‍🍳',
          desc: 'The Butler picking up the line when you dial. The phone handset (terminal) doesn’t know what your words mean; the Butler (shell) understands and carries out your orders.'
        },
        {
          name: 'The House Intercom Stations = Virtual Consoles (/dev/tty1-6)',
          emoji: '📻🏢',
          desc: 'Direct hardwired speaker boxes mounted in the basement, garage, and kitchen. Even if the house Wi-Fi drops, the wired intercom stations always work.'
        },
        {
          name: 'Wiping the Glass = clear & reset',
          emoji: '🧽🧼',
          desc: 'When kitchen steam or greasy fingerprints fog up your smartphone screen, you wipe it clean with a microfiber cloth so you can read clearly again.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Red Public Phone Booth vs The Mobile Safaricom App',
      icon: '🇰🇪📞',
      summary:
        '“The Terminal is the microphone and speaker booth; the Shell is the customer care agent in Nairobi processing your service!”',
      points: [
        {
          name: 'The Kenyatta Avenue Red Coin Phone Booth = Hardware TTY',
          emoji: '☎️🪙',
          desc: 'The heavy cast-iron Telkom Kenya phone booth on the street corner with a coiled metal cord and coin slot. You dialed numbers and heard audio tones.'
        },
        {
          name: 'The Modern Safaricom / Airtel Smartphone App = Terminal Emulator',
          emoji: '📱✨',
          desc: 'The sleek glass touchscreen app on your Android or iPhone where you type digits, select custom wallpapers, and split tabs.'
        },
        {
          name: 'The M-Pesa Customer Care Agent = The Shell (bash)',
          emoji: '🎧🧑‍💼',
          desc: 'The real person at the customer care center listening to your voice and reversing a wrong transaction. The phone booth didn’t reverse the money—the agent did!'
        },
        {
          name: 'Police Post Wired Radio = Virtual Consoles (/dev/tty1-6)',
          emoji: '📻👮',
          desc: 'The direct VHF two-way walkie-talkie at the police station base. It doesn’t need 4G or internet data—it connects straight to headquarters on emergency channel 2.'
        },
        {
          name: 'Cleaning the Counter Glass = The clear Command',
          emoji: '🧽🧹',
          desc: 'The cybercafé attendant wiping dust off the glass screen between customers so the text doesn’t look blurry.'
        }
      ]
    },
    somaticMove: {
      name: 'The Terminal Glass Wipe (clear & reset)',
      action:
        'Extend both hands with palms facing out. Wipe an imaginary glass screen in big circles from center to edges, then shout "CLEAR!" to reset your focus!',
      whyItWorks:
        'Physically connects the concept of the terminal as a visual display glass emulator with the habit of using Ctrl+L / clear to restore clean workspace clarity.'
    },
    quickTakeaway:
      'The Terminal is the display window and keyboard interface (TTY/PTY). It passes your keystrokes to the Shell, which interprets commands and asks the Kernel to act!'
  }
];
