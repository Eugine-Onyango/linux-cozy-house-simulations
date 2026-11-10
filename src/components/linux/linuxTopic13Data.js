// Topic 13: System Services & systemd (5 Subtopics)
// 13.1 Systemd Introduction (PID 1, Daemons, Units: .service, .target, .socket, .timer, cgroups, why systemd replaced SysVinit & Upstart)
// 13.2 Linux Boot Process (The 5 Boot Stages: BIOS/UEFI → MBR/GPT → GRUB2 Bootloader → Kernel & initramfs → systemd Targets: multi-user.target vs graphical.target)
// 13.3 Controlling Systemd Services (Service Lifecycle, States: active, inactive, failed, enabled vs disabled, masking rogue services)
// 13.4 Systemctl Command Masterclass (start, stop, restart, reload, enable, disable, status, daemon-reload, list-units, and unit files)
// 13.5 Journalctl & Centralized Logging (Binary Journal, journalctl -u, journalctl -f, journalctl -xe, journalctl -b, --since, priority filters -p err)

export const linuxTopic13Subtopics = [
  // ==========================================================================
  // 13.1 SYSTEMD INTRODUCTION
  // ==========================================================================
  {
    id: 'systemd-introduction',
    number: '13.1',
    title: 'Systemd Introduction (PID 1, Daemons, Unit Types & Parallel Boot)',
    shortTitle: 'Systemd Introduction',
    icon: '⚡🏛️',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    laymanHeadline:
      'systemd is the Chief Executive Butler of Linux (PID 1)—the first program to wake up when your computer boots, responsible for managing every background worker (daemon) and organizing services into neat unit files.',
    laymanExplanation:
      'Before modern Linux, old systems used "SysVinit", which was like a single tired butler walking through a long checklist one item at a time (first start network, wait 10 seconds, then start database, wait 15 seconds, then start web server). If one script got stuck, your whole computer froze during boot! In 2010, systemd was invented to modernize Linux. It acts as Process ID 1 (PID 1) and boots services in parallel at lightning speed by activating sockets simultaneously. In systemd, everything is managed as a "Unit" configured in clean, declarative text files. The most common unit types are: .service (background daemons like web or database servers), .target (grouping checkpoints like multi-user or graphical mode), .socket (network listeners waiting for incoming connections), and .timer (cron-like scheduled alarms). Additionally, systemd uses Linux cgroups (Control Groups) to track every process spawned by a service, ensuring that when you stop a service, none of its child processes get orphaned or hide in memory!',
    laymanPoints: [
      {
        term: 'PID 1 (Root of All Processes)',
        meaning:
          'The very first user-space program executed by the Linux Kernel during boot. It acts as the ancestor of every other service and user process.'
      },
      {
        term: 'Daemon (Background Service)',
        meaning:
          'A long-running program that sits quietly in the background without a terminal window, waiting to handle tasks (e.g., sshd, nginx, mysqld).'
      },
      {
        term: 'Unit Files (.service, .target, .socket, .timer)',
        meaning:
          'Structured configuration files where systemd describes how to launch, monitor, dependency-check, and restart services.'
      },
      {
        term: 'Parallel Activation vs SysVinit',
        meaning:
          'SysVinit ran slow sequential shell scripts one by one. systemd starts dozens of services simultaneously using socket and D-Bus activation.'
      },
      {
        term: 'Cgroups (Control Groups)',
        meaning:
          'Kernel feature used by systemd to bundle a service and all its children into a sandbox to track CPU, RAM, and kill rogue child forks cleanly.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Master Home Automation System & Butler',
      icon: '🏠🤖📋',
      summary:
        '“In Sam’s house, systemd is the high-tech smart home central hub. Instead of one butler running around lighting candles room-by-room, the central computer flips the switches for heat, lights, security, and kitchen appliances all at once!”',
      points: [
        {
          name: 'PID 1 = The Central Automation Control Box',
          emoji: '🎛️⚡',
          desc: 'The master power unit mounted in the hallway. It wakes up first when electricity arrives and turns on all smart rooms.'
        },
        {
          name: '.service Units = Individual Appliances',
          emoji: '❄️🔥',
          desc: 'Specific appliances running quietly: refrigerator.service (always cold), furnace.service (heating on demand), and waterpump.service.'
        },
        {
          name: '.target Units = Pre-Programmed House Scenes',
          emoji: '🌅🎬',
          desc: 'Scene presets: "Morning Mode" turns on coffee and lights (multi-user.target); "Party Mode" turns on 4K TVs and soundbars (graphical.target).'
        },
        {
          name: 'Cgroups = Appliance Power Strips',
          emoji: '🔌🛡️',
          desc: 'Each appliance plugs into a dedicated smart circuit. If the refrigerator fan malfunctions, flipping the switch cuts power to both the fan and its motor instantly.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Smart Commercial Plaza & Modern Estate Caretaker!',
      icon: '🇰🇪🏢👷🏾‍♂️',
      summary:
        '“Think of a mega shopping mall in Nairobi (like Two Rivers or Sarit Centre). In the old days, one elderly askari had to unlock each iron shutter one by one. Today, the Chief Building Manager (PID 1) touches a digital console and activates elevators, water pumps, CCTV, and backup generators simultaneously!”',
      points: [
        {
          name: 'PID 1 = The Head Mall Building Manager',
          emoji: '👔🏢',
          desc: 'The main administrator who holds the master keys, boots up the plaza at 6:00 AM, and supervises every department head.'
        },
        {
          name: 'SysVinit vs systemd = Old Padlocks vs Central Master Switch',
          emoji: '🗝️⚡',
          desc: 'Old SysVinit was the caretaker walking floor-by-floor unlocking 50 padlocks. systemd is pressing the master building automation button.'
        },
        {
          name: '.service = Dedicated Mall Utilities (KPLC Generator, Nairobi Water Pump)',
          emoji: '⛽💧',
          desc: 'Critical continuous background utilities: generator.service kicks in, borehole.service maintains water pressure, and elevator.service runs 24/7.'
        },
        {
          name: '.timer = The Automatic Parking & Lighting Timer',
          emoji: '⏱️🅿️',
          desc: 'Like the plaza lights set to trigger automatically at 6:30 PM sharp every evening without someone having to flip a physical switch.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The Parallel Hands Launch!"',
      instruction: 'Experience parallel boot activation in 5 seconds:',
      steps: [
        '1️⃣ First, tap one finger at a time slowly: 1... 2... 3... 4... — say: "Old SysVinit: Slow sequential scripts!"',
        '2️⃣ Now spread both hands wide and push all 10 fingers forward simultaneously with a quick breath 💥 — say: "systemd PID 1: Parallel Socket Activation!"'
      ],
      whyItWorks:
        'Contrasting sluggish sequential finger taps against a simultaneous burst locks in why systemd made Linux boot in seconds instead of minutes!'
    },
    quickTakeaway:
      'systemd is the modern Linux init system and service manager running as PID 1. It replaces old sequential SysVinit scripts with declarative unit files (.service, .target, .socket, .timer) and parallel socket activation.'
  },

  // ==========================================================================
  // 13.2 LINUX BOOT PROCESS
  // ==========================================================================
  {
    id: 'linux-boot-process',
    number: '13.2',
    title: 'Linux Boot Process (BIOS/UEFI → MBR/GPT → GRUB2 → Kernel & initramfs → Targets)',
    shortTitle: 'Linux Boot Process',
    icon: '🚀🪜',
    pastelBg: 'bg-blue-50',
    borderColor: 'border-blue-300',
    accentText: 'text-blue-950',
    badgeBg: 'bg-blue-100 text-blue-900',
    laymanHeadline:
      'The Linux boot process is a 5-step baton relay race: Hardware checks itself (UEFI), passes the baton to the bootloader (GRUB2), which wakes up the Kernel in RAM, mounts the root disk (/), and hands ultimate control to systemd (PID 1).',
    laymanExplanation:
      'Have you ever wondered what happens in the 10 seconds between pressing the computer power button and seeing the Linux login screen? It is a strictly choreographed 5-stage relay race:\n1. BIOS / UEFI: Performs POST (Power-On Self Test) to verify RAM, CPU, and storage hardware, then looks up the boot drive priority.\n2. MBR / GPT: Reads the first sector or EFI system partition on your disk to locate the bootloader.\n3. GRUB2 Bootloader: Displays the purple/black menu if you dual-boot, loads the chosen Linux kernel image (vmlinuz) and temporary RAM filesystem (initramfs) into memory.\n4. Kernel & initramfs: The compressed kernel unpacks itself, detects hardware drivers using initramfs, mounts the real root filesystem (/) read-only, checks its integrity, and executes the first program: /sbin/init (which is symlinked to systemd).\n5. systemd & Targets: systemd takes over as PID 1, mounts filesystems read-write from /etc/fstab, brings up network interfaces, and activates the target state—either multi-user.target (standard text console / server) or graphical.target (full desktop GUI with display manager like GDM or LightDM).',
    laymanPoints: [
      {
        term: 'Stage 1: BIOS / UEFI & POST',
        meaning:
          'Firmware chip on the motherboard tests physical hardware integrity and selects which hard drive or USB to boot from.'
      },
      {
        term: 'Stage 2: MBR / GPT Partition Table',
        meaning:
          'Points to the drive partition holding the boot code. Modern systems use GPT with an EFI System Partition (ESP).'
      },
      {
        term: 'Stage 3: GRUB2 Bootloader',
        meaning:
          'The Grand Unified Bootloader that presents the boot menu, allows editing kernel boot parameters, and loads the kernel into RAM.'
      },
      {
        term: 'Stage 4: Kernel (vmlinuz) & initramfs',
        meaning:
          'The heart of the OS. Uses temporary RAM drivers (initramfs) to discover your hard drive controller, mounts "/", and launches PID 1.'
      },
      {
        term: 'Stage 5: systemd Targets (multi-user vs graphical)',
        meaning:
          'systemd reaches its milestone target: multi-user.target (console server) or graphical.target (desktop GUI login window).'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: Waking Up Sam’s Smart Estate',
      icon: '🏠🔑🪞',
      summary:
        '“Waking up Sam’s house is like opening a secure gated mansion in the morning: power lines test the wiring, the gatekeeper checks the master key, the butler unlocks the front door, and turns on the living room chandelier!”',
      points: [
        {
          name: 'BIOS/UEFI = Power Company Testing the Main Circuit',
          emoji: '💡🔌',
          desc: 'Checking that the electrical breaker works, bulbs are not blown, and the backup generator battery is charged.'
        },
        {
          name: 'GRUB2 = The Gate Security Guard Picking Which Door to Open',
          emoji: '💂🏽‍♂️🚪',
          desc: 'The guard asks: "Are we opening the regular family entrance, or the maintenance workshop door?" (Kernel selector).'
        },
        {
          name: 'Kernel & initramfs = The Master Key Unlocking the Front Door',
          emoji: '🔑🏠',
          desc: 'The kernel grabs its temporary keyring (initramfs), finds the front door lock (/), turns it, and steps inside.'
        },
        {
          name: 'systemd Targets = Turning on Lights & Appliances',
          emoji: '🛋️📺',
          desc: 'Level 3 is turning on basic office desk lamps (multi-user); Level 5 is turning on the big home cinema projector (graphical.target).'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: Starting an Interstate Long-Distance Matatu at 5:00 AM!',
      icon: '🇰🇪🚐🛣️',
      summary:
        '“Starting a 14-seater matatu at the Nairobi OTC stage follows the exact same 5 stages: dashboard battery check, driver turn of the key, starter motor spinning, engine firing up, and conductor shouting destination!”',
      points: [
        {
          name: 'Stage 1: BIOS/UEFI = Dashboard Battery & Oil Indicator Lights',
          emoji: '🔋🪔',
          desc: 'The driver turns the key halfway: battery light glows, fuel needle rises, brake fluid check passes (POST).'
        },
        {
          name: 'Stage 2 & 3: GRUB2 = The Stage Dispatcher Deciding the Route',
          emoji: '📋🛣️',
          desc: 'The Sacco clerk chooses: "Route A: Thika Superhighway Express (Normal Kernel)" or "Route B: Old Murram Road (Recovery Mode)".'
        },
        {
          name: 'Stage 4: Kernel & initramfs = The Diesel Engine Roaring to Life',
          emoji: '⚙️💨',
          desc: 'The starter motor turns, diesel fires in all 4 cylinders, alternator charges, and the transmission connects to the wheels.'
        },
        {
          name: 'Stage 5: systemd Targets = Conductor Opening the Door for Passengers',
          emoji: '🎫👥',
          desc: 'multi-user.target is cargo-only delivery van; graphical.target is passengers seated, neon LED lights on, and reggae music playing!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The 5-Step Boot Elevator Crouch-to-Jump!"',
      instruction: 'Trace the 5 boot stages with your body in 5 seconds:',
      steps: [
        '1️⃣ Crouch down low with hands on knees — whisper: "1. UEFI POST & 2. GRUB2 Bootloader!"',
        '2️⃣ Rise halfway up to your waist — say: "3. Kernel & initramfs mounting root disk!"',
        '3️⃣ Leap straight up with hands raised high 🙌 — shout: "5. systemd reached Graphical Target!"'
      ],
      whyItWorks:
        'Rising from the floor to a full jump physically maps the lowest hardware firmware level up to the highest graphical desktop layer in memory!'
    },
    quickTakeaway:
      'The Linux boot sequence follows 5 stages: BIOS/UEFI (hardware test) → MBR/GPT (partition table) → GRUB2 (bootloader & kernel selection) → Kernel & initramfs (hardware drivers & mounting root) → systemd (PID 1 reaching multi-user or graphical target).'
  },

  // ==========================================================================
  // 13.3 CONTROLLING SYSTEMD SERVICES
  // ==========================================================================
  {
    id: 'controlling-systemd-services',
    number: '13.3',
    title: 'Controlling Systemd Services (Service Lifecycle, States & Masking)',
    shortTitle: 'Service Lifecycle & States',
    icon: '🔄🚦',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-900',
    laymanHeadline:
      'A systemd service is never just "on" or "off"—it has an active runtime state (running right now vs dead) AND a boot persistence state (enabled to auto-start vs disabled), plus a super-lock called "masking".',
    laymanExplanation:
      'The biggest trap for Linux beginners is confusing "Active" with "Enabled". In systemd:\n• Active vs Inactive: Refers to RIGHT NOW. Is the program currently consuming RAM and CPU? "active (running)" means alive; "inactive (dead)" means stopped; "failed" means it crashed or exited with an error code.\n• Enabled vs Disabled: Refers to TOMORROW. When you reboot the computer next Tuesday, should systemd automatically start this service? "enabled" creates a symlink in /etc/systemd/system/*.wants/ so it launches at boot; "disabled" deletes that symlink.\n• Masked (The Ultimate Lock): Sometimes you want to guarantee that a conflicting service NEVER runs—not at boot, not manually by another admin, and not even if another program requests it as a dependency. When you "mask" a service, systemd creates a symlink from its unit file directly to /dev/null (the Linux digital black hole). Even running "systemctl start" will throw an immediate access denied error until unmasked!',
    laymanPoints: [
      {
        term: 'Active (running)',
        meaning:
          'The daemon process has at least one active PID alive in RAM and is actively listening or executing tasks.'
      },
      {
        term: 'Active (exited)',
        meaning:
          'Common for one-shot setup tasks: the script ran successfully, finished its job, exited with code 0, and remains marked as complete.'
      },
      {
        term: 'Failed',
        meaning:
          'The service crashed, timed out, could not read its config file, or exited with an error status (code 1, 2, etc.).'
      },
      {
        term: 'Enabled vs Disabled',
        meaning:
          'Enabled = Auto-starts on next boot (symlink created in .wants). Disabled = Will NOT auto-start on reboot.'
      },
      {
        term: 'Masked (/dev/null Symlink)',
        meaning:
          'The strongest lock in systemd: links the unit file to /dev/null, making it impossible to start manually or automatically.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Living Room Air Conditioner & The Child-Proof Lock',
      icon: '🏠❄️🔒',
      summary:
        '“Think of your home air conditioner: You can turn it on right now (Active), set the schedule to turn on every morning at 7:00 AM (Enabled), or unplug it and put a padlock over the wall outlet so nobody can turn it on (Masked)!”',
      points: [
        {
          name: 'Active = Air Conditioner is Blowing Cold Air Right Now',
          emoji: '❄️💨',
          desc: 'The motor is humming and fans are spinning (consuming electricity and CPU in RAM).'
        },
        {
          name: 'Enabled = The Morning 7:00 AM Smart Schedule',
          emoji: '⏰📅',
          desc: 'Even if you turn it off tonight, your morning alarm clock will automatically turn it back on when the house wakes up.'
        },
        {
          name: 'Failed = The Breaker Tripped or Filter Clogged',
          emoji: '⚠️💥',
          desc: 'The machine tried to spin, made a loud noise, and shut down with a flashing red warning LED.'
        },
        {
          name: 'Masked = Padlocking the Circuit Breaker with a Master Tag',
          emoji: '🔒🚫',
          desc: 'Safety lockout! Even if someone presses the remote control power button, no electricity can reach the unit.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Estate Water Pump & The Caretaker’s Padlock',
      icon: '🇰🇪💧🔒',
      summary:
        '“At a rental apartment block in Roysambu, the electric borehole water pump has 3 clear operational conditions: pumping water right now, set to auto-fill the roof tank every dawn, or padlocked by the landlord for maintenance!”',
      points: [
        {
          name: 'Active = Water Gushing Into the Rooftop Tanks Right Now',
          emoji: '🚰💦',
          desc: 'You can hear the pump motor humming in the basement (process is running with an active PID).'
        },
        {
          name: 'Enabled = Automatic Float Switch at 5:00 AM',
          emoji: '⏲️🏗️',
          desc: 'Whenever KPLC power restores after a blackout, the pump automatically starts filling the overhead reserve tank.'
        },
        {
          name: 'Disabled = Manual Switch Only',
          emoji: '🔘🤚',
          desc: 'The pump will not start by itself when power comes back; the caretaker must physically walk downstairs and press the green button.'
        },
        {
          name: 'Masked = Padlocked with Heavy Viro Chain during Pipe Repairs',
          emoji: '⛓️🚫',
          desc: 'The plumber locked the master switchbox so no tenant or watchman can accidentally press it and flood the basement.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The Enabled vs Active Hand-Shake!"',
      instruction: 'Separate "Active" from "Enabled" with your hands in 5 seconds:',
      steps: [
        '1️⃣ Make a fast running motion with your right fist ✊ — say: "Active: Running RIGHT NOW!"',
        '2️⃣ Point your left index finger forward like an alarm clock ⏰ — say: "Enabled: Auto-starts on next REBOOT!"',
        '3️⃣ Cross both forearms in a big tight X 🙅‍♂️ — say: "Masked: Locked to /dev/null!"'
      ],
      whyItWorks:
        'Using separate hands for "now" (right fist) and "future boot" (left clock) permanently fixes the #1 beginner mistake in Linux administration exams!'
    },
    quickTakeaway:
      'Service states have two distinct dimensions: Runtime status (active, inactive, failed) and Boot persistence (enabled, disabled). Masking links a unit file to /dev/null, rendering it completely un-startable.'
  },

  // ==========================================================================
  // 13.4 SYSTEMCTL COMMAND MASTERCLASS
  // ==========================================================================
  {
    id: 'systemctl-command',
    number: '13.4',
    title: 'Systemctl Command Masterclass (Control, Reload, Enable & Unit Files)',
    shortTitle: 'systemctl Command',
    icon: '🎛️⚙️',
    pastelBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    accentText: 'text-purple-950',
    badgeBg: 'bg-purple-100 text-purple-900',
    laymanHeadline:
      '"systemctl" is your single master remote control for the entire operating system—use it to start, stop, restart, reload, inspect health status, and write unit blueprints.',
    laymanExplanation:
      'In modern Linux, you almost never launch background services directly from their binary path. Instead, you issue instructions to systemd using the "systemctl" command:\n• Starting & Stopping: "sudo systemctl start <svc>" and "sudo systemctl stop <svc>".\n• Restart vs Reload: "systemctl restart <svc>" kills the old process and starts a brand new one (brief downtime). "systemctl reload <svc>" tells the running daemon to re-read its configuration file without dropping current client connections (zero downtime!).\n• Boot Persistence: "sudo systemctl enable <svc>" creates the boot symlink; "sudo systemctl enable --now <svc>" starts it immediately AND enables it for future boots in one single command!\n• Health Inspection: "systemctl status <svc>" shows the active state, PID, memory usage, cgroup tree, and the most recent 10 log entries.\n• Unit File Blueprint: Custom services live in /etc/systemd/system/<name>.service. It has 3 sections:\n  - [Unit]: Description, dependencies (After=network.target, Requires=db.service).\n  - [Service]: ExecStart=/usr/bin/my-app, Restart=always, User=sam.\n  - [Install]: WantedBy=multi-user.target (tells systemd which target links it).\nWhenever you edit a unit file, you MUST run "sudo systemctl daemon-reload" so systemd re-scans disk files into memory!',
    laymanPoints: [
      {
        term: 'systemctl start / stop',
        meaning:
          'Powers on or gracefully powers off a service daemon immediately in current memory.'
      },
      {
        term: 'restart vs reload (Graceful)',
        meaning:
          'Restart drops existing connections and resets. Reload re-reads configuration files with ZERO connection drops.'
      },
      {
        term: 'enable --now',
        meaning:
          'Pro power flag: enables the service for auto-boot AND starts it immediately right now in one command.'
      },
      {
        term: 'systemctl daemon-reload',
        meaning:
          'Re-reads all unit files from disk into systemd RAM after creating or editing /etc/systemd/system/*.service.'
      },
      {
        term: 'Unit File Sections ([Unit], [Service], [Install])',
        meaning:
          '[Unit] defines descriptions and order; [Service] defines what binary to execute; [Install] defines which target it belongs to.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Universal Smart TV Remote & Appliance Blueprint',
      icon: '🏠📺📄',
      summary:
        '“systemctl is like having one universal master remote control on the kitchen counter: buttons to turn appliances on/off, a status display showing energy draw, and an instruction booklet for wiring new gadgets into the walls!”',
      points: [
        {
          name: 'start / stop = Green Power Button & Red Off Button',
          emoji: '🟢🔴',
          desc: 'Press green to start the dishwasher; press red to turn off the garden sprinkler.'
        },
        {
          name: 'reload vs restart = Changing Station vs Power Cycling',
          emoji: '📻🔄',
          desc: 'Reload is tuning the radio to a new frequency while music keeps playing; restart is unplugging the wall cord and waiting 10 seconds.'
        },
        {
          name: 'status = The Remote’s LCD Diagnostic Screen',
          emoji: '📟📊',
          desc: 'Shows green dot (running), active PID, how many watts it is pulling, and the last 5 operational notes.'
        },
        {
          name: 'daemon-reload = Syncing New Remotes with the Central Hub',
          emoji: '📡🔄',
          desc: 'After programming a new gadget code into your remote, you press "Sync" so the hub knows the new button exists.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The KPLC Substation Master Switch & Sacco Vehicle Tracker',
      icon: '🇰🇪⚡📟',
      summary:
        '“Managing systemctl is like an engineer sitting at the Nairobi KPLC power distribution substation: flipping feeder breakers on and off, checking load meters, and registering newly connected residential estates!”',
      points: [
        {
          name: 'systemctl status = The Live Telemetry Dashboard',
          emoji: '🖥️📈',
          desc: 'The engineer checks Feeder 4 (Kilimani): Active (green), current megawatt draw, and timestamp of last tripped switch.'
        },
        {
          name: 'enable --now = Signing Permanent Connection & Flipping On',
          emoji: '📝⚡',
          desc: 'Connecting power to a new hospital wing and energizing the transformer immediately without waiting for tomorrow.'
        },
        {
          name: 'reload = Updating Power Tariffs Without Cutting Electricity',
          emoji: '💡📉',
          desc: 'KPLC updates the billing software while lights in homes stay on without a single flicker.'
        },
        {
          name: 'daemon-reload = Refreshing the Substation Wiring Blueprint',
          emoji: '🗺️🔄',
          desc: 'After adding a new transformer unit in Kitengela, the supervisor refreshes the central dispatch map.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The systemctl Remote Click & Spin!"',
      instruction: 'Master systemctl commands with your hands in 5 seconds:',
      steps: [
        '1️⃣ Point an imaginary TV remote forward and click your thumb firmly 🔘 — say: "systemctl start & enable --now!"',
        '2️⃣ Spin your index finger in a small tight circle 🔄 — say: "systemctl reload: zero-downtime refresh!"',
        '3️⃣ Clap both hands together sharply 👏 — say: "Edited unit file? sudo systemctl daemon-reload!"'
      ],
      whyItWorks:
        'Physical clicking and clapping reinforces muscle memory for the mandatory `daemon-reload` command, which trips up 80% of junior Linux engineers!'
    },
    quickTakeaway:
      'The "systemctl" command controls systemd services, targets, and units. Use "systemctl status" to inspect, "reload" for graceful zero-downtime config updates, "enable --now" for instant boot persistence, and "daemon-reload" after editing unit files.'
  },

  // ==========================================================================
  // 13.5 JOURNALCTL & CENTRALIZED LOGGING
  // ==========================================================================
  {
    id: 'journalctl',
    number: '13.5',
    title: 'Journalctl & Centralized Logging (Binary Journal, Filters, -xe & Vacuum)',
    shortTitle: 'Journalctl & Logs',
    icon: '📜🔍',
    pastelBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    accentText: 'text-rose-950',
    badgeBg: 'bg-rose-100 text-rose-900',
    laymanHeadline:
      '"journalctl" is the black-box flight recorder of Linux—a high-speed, tamper-resistant digital diary that collects every log message from the kernel, bootloader, and services into one searchable index.',
    laymanExplanation:
      'In traditional Linux, log files were plain text files scattered across /var/log/ (like /var/log/syslog, /var/log/messages, /var/log/auth.log). If a hacker broke in, they could easily edit or erase lines with a text editor. systemd introduced "systemd-journald", which writes logs in a specialized binary format. Binary logs cannot be edited with a text editor, are indexed for blazing-fast searches, and capture rich metadata (like exact PID, UID, and service unit name).\nYou query this black box using "journalctl":\n• Service Logs: "journalctl -u nginx" shows only logs produced by the nginx web server.\n• Live Monitoring: "journalctl -f" tails new log entries in real time as they arrive (like tail -f).\n• Debugging Crashes: "journalctl -xe" (eXplain and jump to End) displays full error catalog descriptions whenever a service fails to start.\n• Boot Filtering: "journalctl -b" shows logs from the current boot; "journalctl -b -1" shows logs from the previous boot (invaluable for diagnosing sudden server reboots or crashes!).\n• Severity Filtering: "journalctl -p err" filters for errors only, hiding harmless informational noise.\n• Disk Space Management: Clean up old logs with "sudo journalctl --vacuum-size=500M" or "--vacuum-time=2weeks"!',
    laymanPoints: [
      {
        term: 'Binary Journal (systemd-journald)',
        meaning:
          'High-speed structured binary log database stored in /run/log/journal/ (volatile RAM) or /var/log/journal/ (persistent disk).'
      },
      {
        term: 'journalctl -u <unit>',
        meaning:
          'Filters and displays log messages generated exclusively by one specific service unit (e.g., -u sshd).'
      },
      {
        term: 'journalctl -f (Follow)',
        meaning:
          'Keeps the terminal open and prints new incoming log lines in real time as events happen.'
      },
      {
        term: 'journalctl -xe (eXplain & End)',
        meaning:
          'Jumps directly to the end of the log and pulls in extra catalog documentation explaining WHY an error occurred.'
      },
      {
        term: 'journalctl -b & -p err',
        meaning:
          '-b filters by boot session (current or past). -p err displays only error/critical alerts, ignoring info messages.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy: The Automated CCTV & House Diary Flight Recorder',
      icon: '🏠📹📔',
      summary:
        '“journalctl is like a digital flight recorder installed in Sam’s house: every door sensor, smoke detector, and kitchen appliance automatically logs its events into a secure, tamper-proof digital black box!”',
      points: [
        {
          name: 'Binary Journal = Tamper-Proof Digital Video Vault',
          emoji: '🔒💾',
          desc: 'Unlike an open paper notebook on a desk that anyone can scribble on or rip pages from, the black box is encrypted and indexed.'
        },
        {
          name: 'journalctl -u = Filtering Footage by Specific Room Camera',
          emoji: '🎥🔎',
          desc: 'Press "Kitchen Camera Only" to see only events from the stove.service without scrolling through backyard footage.'
        },
        {
          name: 'journalctl -f = Watching the Live Security Feed',
          emoji: '🔴📡',
          desc: 'Sitting in front of the live monitor watching door chimes pop up the instant a visitor taps the front porch.'
        },
        {
          name: 'journalctl -xe = Red Siren Alert with Troubleshooting Manual',
          emoji: '🚨📖',
          desc: 'When the furnace fails, -xe doesn’t just say "Failed"—it points you to Page 42: "Igniter coil out of gas, check valve 3!"'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Police Station Occurrence Book (OB) & Matatu Sacco Dashcam',
      icon: '🇰🇪🚔📼',
      summary:
        '“Every Kenyan police station or security office has an Occurrence Book (OB). In modern Linux, journalctl is the digital Occurrence Book where every system event gets a recorded timestamp, OB number, and incident report!”',
      points: [
        {
          name: 'OB Number = The Journal Metadata Index',
          emoji: '📓✍️',
          desc: 'Every incident gets logged with exact time, badge number of the officer (PID), and category (OB No. 24/11/2026).'
        },
        {
          name: 'journalctl -u = Searching OB Entries for One Specific Matatu',
          emoji: '🚐📑',
          desc: 'The Sacco chairman says: "Show me only incident reports filed for Matatu KBZ 123X this month" (-u matatu.service).'
        },
        {
          name: 'journalctl -b -1 = Investigating Yesterday’s Midnight Breakdown',
          emoji: '🌙🛠️',
          desc: 'Looking back at the previous shift’s log before the engine overheated and stalled on Uhuru Highway.'
        },
        {
          name: 'journalctl --vacuum-size = Archiving Old Heavy OB Ledgers',
          emoji: '📚🧹',
          desc: 'Transferring old paper ledgers from 6 months ago to the archive storeroom so the front desk stays neat and clean.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "The -xe Detective Lens Pose!"',
      instruction: 'Channel your inner troubleshooting detective in 5 seconds:',
      steps: [
        '1️⃣ Put one hand over your eye like a detective magnifying glass 🧐 — say: "journalctl -u: Focus on ONE unit!"',
        '2️⃣ Point both index fingers down to the floor at the End of the log 👇 — say: "-e: Jump to the END!"',
        '3️⃣ Slap your forehead with an open palm 💡 — say: "-x: eXplain the failure catalog!"'
      ],
      whyItWorks:
        'The magnifying glass + pointing to the end + the forehead realization permanently imprints "journalctl -xe", the most important Linux troubleshooting command in existence!'
    },
    quickTakeaway:
      'systemd-journald provides centralized binary logging accessed via "journalctl". Master "journalctl -u <svc>" for service logs, "-f" for live streaming, "-xe" for detailed error diagnostics, and "--vacuum-size" to reclaim disk space.'
  }
];
