// Topic 16: Creating and Running Shell Scripts (6 Subtopics)
// 16.1 Creating a Shell Script (nano/vim, .sh convention, chmod +x, ./ execution & $PATH security)
// 16.2 Defining the Shell Script Interpreter (The Shebang #!, magic bytes 0x23 0x21, /bin/bash vs /usr/bin/env bash)
// 16.3 Comments in the Shell Script (# Single-line, inline, header blocks, debug toggling & heredoc blocks)
// 16.4 Storing and Displaying Messages in a Shell Script (Variables, no-spaces rule, echo, escape codes & printf)
// 16.5 Storing the Output of Commands (Command substitution $(cmd) vs backticks, nesting & capturing dynamic values)
// 16.6 Exit Codes of Shell Commands (The $? status, 0=success, 1-255=error, 126/127/137 codes, && and || logic)

export const linuxTopic16Subtopics = [
  // ==========================================================================
  // 16.1 CREATING A SHELL SCRIPT
  // ==========================================================================
  {
    id: 'creating-a-shell-script',
    number: '16.1',
    title: 'Creating and Running a Shell Script (chmod +x, ./ & Path Security)',
    shortTitle: 'Creating a Script',
    icon: '📜✍️',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    laymanHeadline:
      'A shell script is just a plain text file containing Linux commands. To turn it into a runnable program, you grant it an execution ticket with "chmod +x" and run it with "./"!',
    laymanExplanation:
      'Writing a script in Linux takes only three straightforward steps:\n1. Write the Commands in a Text File: Use any editor (like "nano backup.sh" or "vim deploy.sh"). By convention, scripts end with the ".sh" extension so humans and editors know it is a shell script.\n2. Grant the Execution Ticket ("chmod +x"): When you create a new file in Linux, it only has read and write permissions (-rw-r--r--). If you try to run it directly, Linux will reject you with "Permission denied". Running "chmod +x backup.sh" adds the executable "x" bit (-rwxr-xr-x), granting the operating system permission to launch it as a program!\n3. Running the Script ("./backup.sh"): To run a script in your current folder, you MUST prefix it with "./" (e.g. "./backup.sh").\n• Why is the "./" Required? (Linux Security Feature): In Windows or old DOS, the operating system automatically searched the current folder for programs. In Linux, the current directory (".") is intentionally EXCLUDED from your "$PATH" search list. If "." was in your path, an attacker could leave a malicious program named "ls" in a public folder, and the moment you typed "ls", their trap script would run! The "./" explicitly tells Linux: "I know what I am doing—execute the file right here in this specific folder!"\n• Alternative: Running with "bash backup.sh" bypasses the need for "chmod +x" because you are passing the text file as an argument into the already-executable "/bin/bash" binary.',
    laymanPoints: [
      {
        term: 'The .sh File Extension',
        meaning:
          'A universal naming convention for shell scripts. While Linux doesn\'t strictly enforce extensions, .sh enables syntax highlighting in text editors.'
      },
      {
        term: 'chmod +x (Execution Permission)',
        meaning:
          'Turns a static text file into a runnable program by switching on the execution ("x") bit in the Linux file permission flags.'
      },
      {
        term: 'The "./" Prefix (Current Directory)',
        meaning:
          'Explicitly tells Linux to look inside the active folder ("."), bypassing the system $PATH search directories for safety.'
      },
      {
        term: 'Why "." is NOT in $PATH (Security Shield)',
        meaning:
          'Prevents accidental execution of spoofed commands (like a fake "sl" or malicious "ls") placed in public folders by rogue users.'
      },
      {
        term: 'bash myscript.sh vs ./myscript.sh',
        meaning:
          'Running "bash script.sh" reads the file through an existing shell process, whereas "./script.sh" launches an independent child process using the shebang.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Laminated Chore Card with the House Stamp',
      icon: '🏠📋',
      summary:
        '“Writing a list of chores on a napkin doesn’t make it an official house law until the owner signs it with the official Master Stamp!”',
      points: [
        {
          name: 'Writing the Chores on Paper = Creating backup.sh in nano',
          emoji: '✍️📄',
          desc: 'You sit at the kitchen table and write: "1. Water flowers; 2. Take out recycling; 3. Lock back door". At this stage, it is just paper sitting on the counter.'
        },
        {
          name: 'The Official Execution Stamp = chmod +x',
          emoji: '🔖🛡️',
          desc: 'Before the house butler will obey the written paper, you must stamp it with the embossed green "APPROVED FOR ACTION" wax seal. Without that seal, the butler says: "Permission Denied!"'
        },
        {
          name: 'Pointing Right at the Kitchen Counter = The "./" Prefix',
          emoji: '👉📍',
          desc: 'When you tell the butler "Run the chore list", you point your finger right at the counter ("./") so he doesn\'t go wandering into the garage looking for other chore sheets.'
        },
        {
          name: 'The Neighborhood Rule = Why "." is not in $PATH',
          emoji: '🏘️🚫',
          desc: 'The house security guard only runs tools stored in the locked city tool-shed (/usr/bin). If any stranger drops a random piece of paper on your doorstep, the guard refuses to execute it automatically.'
        },
        {
          name: 'Reading the List Out Loud = bash myscript.sh',
          emoji: '🗣️📖',
          desc: 'Instead of stamping the paper and letting it run on its own, you pick it up and read every line out loud to Chef Bash yourself.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Matatu Sacco Route Authorization Stamp',
      icon: '🇰🇪🚐',
      summary:
        '“A driver writing a trip schedule on a notebook cannot leave the stage until the Sacco Chairman stamps it with official NTSA authorization!”',
      points: [
        {
          name: 'Drafting the Route Plan = nano safari.sh',
          emoji: '📝🪑',
          desc: 'The conductor sits at the tea kiosk writing: "Stage 1: Kencom; Stage 2: Community; Stage 3: Kenyatta Hospital". Just notes in a blue exercise book.'
        },
        {
          name: 'The Official Sacco Rubber Stamp = chmod +x',
          emoji: '📑🖋️',
          desc: 'The conductor takes the book to the Sacco desk. The manager presses the heavy purple ink rubber stamp: "AUTHORIZED ROAD SERVICE". Now the vehicle is legally clear to move!'
        },
        {
          name: 'Pointing to the Local Bay = The "./" Prefix',
          emoji: '👉🚏',
          desc: 'The stage marshall shouts: "Hii gari iko hapa hapa nambari 3!" (this exact matatu right here in Bay 3). It specifies the local vehicle, not one parked across town.'
        },
        {
          name: 'Strict Stage Regulations = Why "." is excluded from $PATH',
          emoji: '👮🛡️',
          desc: 'Traffic police will not allow any unregistered vehicle to suddenly join the highway just because it is parked nearby. It must be certified in the official route directory.'
        },
        {
          name: 'Hiring a Relief Driver = bash safari.sh',
          emoji: '🧑‍✈️🚐',
          desc: 'Even if the vehicle doesn\'t have its own driver certified yet, a licensed master driver steps into the cabin and drives the route for you.'
        }
      ]
    },
    somaticMove: {
      name: 'The Wax-Seal Stamp & Point',
      action:
        'Slam your right fist into your open left palm like an official rubber stamp ("CHMOD +X!"), then immediately point both index fingers down at your shoes ("./ RIGHT HERE!").',
      whyItWorks:
        'Physically links the permission grant (stamp) with the current-directory location anchor ("./" at your feet).'
    },
    quickTakeaway:
      'Write commands in a file, grant execution rights with "chmod +x script.sh", and run it with "./script.sh" to safely execute within your current directory!'
  },

  // ==========================================================================
  // 16.2 DEFINING THE SHELL SCRIPT INTERPRETER
  // ==========================================================================
  {
    id: 'defining-script-interpreter',
    number: '16.2',
    title: 'Defining the Shell Script Interpreter (The Shebang #!)',
    shortTitle: 'The Shebang Interpreter',
    icon: '⚡🎩',
    pastelBg: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    accentText: 'text-cyan-950',
    badgeBg: 'bg-cyan-100 text-cyan-900',
    laymanHeadline:
      'The Shebang (#!) is the very first line of a script: it tells the Linux kernel which program (bash, python, or sh) must read and execute the rest of the file.',
    laymanExplanation:
      'When you tell Linux to execute "./backup.sh", the Linux kernel inspects the raw binary bytes at the very beginning of the file.\n• Magic Bytes (0x23 0x21): The characters "#" (hash, ASCII 0x23) and "!" (bang, ASCII 0x21) together are called the "Shebang" (or Hash-Bang). When the Linux kernel\'s program loader ("execve") sees these two magic bytes at the very top of line 1, it stops treating the file as compiled machine code and knows: "This is a script! Let me launch the interpreter specified right after the #!"\n• Common Shebang Variants:\n  1. "#!/bin/bash": Direct absolute path to the Bourne Again Shell. Universal across standard Linux distros (Ubuntu, Debian, Fedora, CentOS, Arch).\n  2. "#!/bin/sh": Points to the POSIX system shell (often a symlink to dash on Ubuntu or bash on CentOS). Faster and minimal, but disables advanced bash arrays and [[ ]] test brackets.\n  3. "#!/usr/bin/env bash" (The Portable Standard): Instead of hardcoding "/bin/bash", this tells the "/usr/bin/env" utility to search your active "$PATH" for wherever bash is installed. This makes scripts portable across Linux, macOS (where Homebrew installs bash in /usr/local/bin or /opt/homebrew), and BSD systems!\n  4. Other Languages: The same shebang powers other scripting languages: "#!/usr/bin/python3", "#!/usr/bin/perl", or "#!/usr/bin/node".\n• What happens if the Shebang is Missing? If line 1 has no shebang, the shell running in your active terminal will attempt to parse the file using its own syntax, which can lead to mysterious syntax errors if a script written for bash is parsed by dash or zsh!',
    laymanPoints: [
      {
        term: 'The Shebang (#!)',
        meaning:
          'The character pair (hash + exclamation mark) on line 1, column 1 that identifies the file\'s required execution interpreter.'
      },
      {
        term: 'Magic Bytes (0x23 0x21)',
        meaning:
          'The binary header signature that instructs the Linux kernel execve() loader to execute an interpreter binary with this script as an argument.'
      },
      {
        term: '#!/bin/bash',
        meaning:
          'Hardcoded absolute path to the standard GNU bash interpreter on Linux machines.'
      },
      {
        term: '#!/usr/bin/env bash (Portability)',
        meaning:
          'Dynamic path resolution: searches the user\'s current $PATH to find bash regardless of operating system directory variations.'
      },
      {
        term: 'Language Agnostic Header',
        meaning:
          'The exact same shebang mechanism launches Python (#!/usr/bin/env python3), Node.js, Ruby, or Perl scripts seamlessly in Linux.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Language Flag at the Top of the Letter',
      icon: '🏠🚩',
      summary:
        '“Before the house manager opens a sealed instruction envelope, he looks at the flag stamped on the top corner to hand it to the right translator!”',
      points: [
        {
          name: 'The Corner Stamp = The Shebang (#!)',
          emoji: '🏷️✉️',
          desc: 'A prominent red wax seal at the very top of page 1. It says: "DO NOT GUESS! HAND THIS SHEET TO CHEF BASH".'
        },
        {
          name: 'Calling Chef Bash by Name = #!/bin/bash',
          emoji: '🧑‍🍳🚪',
          desc: 'The envelope says: "Deliver directly to Room #1 (The Main Kitchen) where Chef Bash is standing".'
        },
        {
          name: 'The Universal Dispatcher = #!/usr/bin/env bash',
          emoji: '🛎️🧭',
          desc: 'Instead of assuming Chef Bash is in Room #1, the letter asks the House Concierge: "Please find wherever Chef Bash is on duty right now across the estate!"'
        },
        {
          name: 'Handing it to the Python Chef = #!/usr/bin/env python3',
          emoji: '🐍🍳',
          desc: 'By changing the stamp to Python, the house manager hands the recipe to Chef Python in the pastry room instead of Chef Bash!'
        },
        {
          name: 'A Missing Flag = Missing Shebang',
          emoji: '❓📄',
          desc: 'If no flag is on the envelope, whichever random helper picks it up tries reading it. If a French helper tries reading Swahili, chaotic mistakes happen!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Destination Board on a Long-Distance Bus',
      icon: '🇰🇪🚌',
      summary:
        '“A passenger at Machakos Country Bus doesn’t read the whole engine blueprint—they look at the bright yellow destination board on the windshield!”',
      points: [
        {
          name: 'The Windshield Destination Board = The Shebang (#!)',
          emoji: '🪧🚍',
          desc: 'The big painted metal sign above the front windshield: "NAIROBI ─── KISUMU ─── BUSIA". It tells everyone what kind of journey this bus handles.'
        },
        {
          name: 'The Standard Sacco Driver = #!/bin/bash',
          emoji: '🧑‍✈️🛣️',
          desc: 'Assigning the regular senior driver who knows the Nakuru-Eldoret highway potholes like the back of his hand.'
        },
        {
          name: 'The GPS Fleet Dispatcher = #!/usr/bin/env bash',
          emoji: '🛰️📱',
          desc: 'The central digital Sacco app that finds the best available certified driver on duty regardless of whether he is parked in Machakos, Kitale, or Mombasa.'
        },
        {
          name: 'Changing to a Cargo Lorry = #!/usr/bin/env python3',
          emoji: '🚛📦',
          desc: 'Changing the destination board from "14-Seater Passenger Matatu" to "10-Tonne Tipper Lorry"—the road system accepts both because the sign clarifies the vehicle.'
        },
        {
          name: 'A Blank Windshield = No Shebang',
          emoji: '🌫️🚐',
          desc: 'A bus with no board or stickers. Passengers crowd around arguing whether it is going to Rongai, Thika, or Kitengela.'
        }
      ]
    },
    somaticMove: {
      name: 'The Hash-Bang Salute',
      action:
        'Cross your forearms in an "X" shape like a Hash symbol (#), then throw your right hand straight up like an exclamation point (!), shouting "SHEBANG!"',
      whyItWorks:
        'Gives an immediate visual and motor anchor to the two essential characters (# and !) that must sit on line 1 of every production script.'
    },
    quickTakeaway:
      'Line 1 MUST begin with "#!/bin/bash" or "#!/usr/bin/env bash". It instructs the Linux kernel which interpreter must execute your script!'
  },

  // ==========================================================================
  // 16.3 COMMENTS IN THE SHELL SCRIPT
  // ==========================================================================
  {
    id: 'comments-in-shell-script',
    number: '16.3',
    title: 'Comments in the Shell Script (Notes, Debugging & Multi-Line Blocks)',
    shortTitle: 'Comments in Scripts',
    icon: '💬📝',
    pastelBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    accentText: 'text-purple-950',
    badgeBg: 'bg-purple-100 text-purple-900',
    laymanHeadline:
      'Comments are explanatory notes starting with "#" that Linux completely ignores during execution—written for future humans (including you in 6 months)!',
    laymanExplanation:
      'In shell scripting, any line or portion of a line that begins with the hash symbol ("#") is treated as a comment (with the sole exception of the shebang on line 1).\n• Why Comments Matter: Code explains *HOW* a script works; comments explain *WHY* it was written that way. Six months from now, you will forget why a specific backup folder was excluded or why a 5-second sleep delay was added!\n• The 4 Styles of Shell Comments:\n  1. Full Single-Line Comments: Occupies the entire line to explain the next block of code (e.g. "# Verify database connection before proceeding").\n  2. Inline Comments: Sits at the end of a command on the same line (e.g. "PORT=8080 # default listening port for web server"). The shell executes the command up to the "#" and ignores everything to the right.\n  3. Header Metadata Block: A professional comment block at the very top of the script listing Author, Date, Script Version, Description, and Example Usage.\n  4. Debugging & Toggling Code: When troubleshooting an error, you don\'t need to delete lines of code—simply prefix them with "#" to temporarily deactivate them (known as "commenting out code").\n• Multi-Line Comment Trick: While bash has no official "/* ... */" syntax like C or JavaScript, developers use null commands with heredocs (": << \'EOF\' ... EOF") or single-quote blocks to comment out 20 lines at once without typing "#" on every single line!',
    laymanPoints: [
      {
        term: 'The Hash Symbol (#)',
        meaning:
          'Tells the shell parser to ignore all remaining characters on that line from the hash symbol to the newline character.'
      },
      {
        term: 'Inline Comments',
        meaning:
          'Placed at the end of an executable command line to explain what a tricky parameter, port number, or flag does.'
      },
      {
        term: 'Header Metadata Block',
        meaning:
          'Top-of-script documentation listing Script Name, Author, Creation Date, License, and Expected Input Parameters.'
      },
      {
        term: 'Commenting Out Code',
        meaning:
          'Temporarily disabling a command by prepending "#" during testing, without having to permanently delete the code.'
      },
      {
        term: 'Heredoc Multi-Line Block (: << \'EOF\')',
        meaning:
          'A clever bash technique using the null command (:) and a heredoc delimiter to silence multiple paragraphs of notes.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): Yellow Sticky Notes in the House Recipe Book',
      icon: '🏠🗒️',
      summary:
        '“The ingredients and cooking steps are for the stove; the yellow sticky notes are friendly tips for whoever cooks dinner next week!”',
      points: [
        {
          name: 'The Yellow Sticky Note = The Hash Symbol (#)',
          emoji: '🟡📝',
          desc: 'A bright yellow Post-it note stuck next to Step 3 saying: "Careful, oven knob sticks slightly—turn counter-clockwise!" Chef Bash skips reading the note into the frying pan.'
        },
        {
          name: 'The Recipe Card Header = Script Header Block',
          emoji: '📑🏷️',
          desc: 'The top of grandma\'s recipe: "Grandma\'s Beef Stew, Created Dec 1984, Serves 6 people, Takes 45 mins". Not an ingredient, but essential context.'
        },
        {
          name: 'A Note on the Same Line = Inline Comment',
          emoji: '👉🧂',
          desc: 'Writing "Add 2 teaspoons salt" followed by a note: "(Use sea salt, not table salt)". The pot only receives the salt.'
        },
        {
          name: 'Taping Over Step 4 = Commenting Out Code',
          emoji: '🩹🚫',
          desc: 'If guests are allergic to chili peppers, you put a piece of masking tape over Step 4 ("Add chili"). The recipe still has the step for next time, but tonight it is skipped.'
        },
        {
          name: 'The Folded Blank Envelope = Heredoc Multi-Line Block',
          emoji: '✉️📦',
          desc: 'A folded piece of cardstock clipping 10 pages together marked "DO NOT OPEN UNTIL HOLIDAYS". The chef flips past the whole bundle in one second.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Shopkeeper’s Daily Inventory Ledger Notes',
      icon: '🇰🇪📓',
      summary:
        '“In a busy duka, the shopkeeper writes the sales totals in black ink, but scribbles personal reminders in red pencil between the lines!”',
      points: [
        {
          name: 'Red Pencil Marginalia = The Hash Symbol (#)',
          emoji: '✏️📕',
          desc: 'Next to the sugar entry, the duka owner writes in red: "Supplier price went up by 10 bob on Tuesday". When calculating profits, he only adds the black numbers.'
        },
        {
          name: 'The Front Cover Log = Header Documentation',
          emoji: '📖🏷️',
          desc: 'The front page of the hardback Kasuku ledger: "Mama Njeri Duka No. 4, Githurai 44, Opened Jan 2026, Auditor: Maina".'
        },
        {
          name: 'A Note on the Receipt = Inline Comment',
          emoji: '🧾🖊️',
          desc: 'Under the milk sale: "Paid via M-Pesa Till 41029". It explains the payment method without altering the 60 bob total.'
        },
        {
          name: 'Drawing a Light Pencil Line Through an Order = Commenting Out Code',
          emoji: '✏️🚫',
          desc: 'A customer ordered 3 sodas, but changed their mind to tea. You draw a light pencil line through the soda line so you don\'t charge them, but remember what they asked.'
        },
        {
          name: 'Stapling Old Month Pages Together = Heredoc Block',
          emoji: '📎📦',
          desc: 'Stapling 15 pages of last month\'s records together so the accountant flips straight to current transactions without reading old details.'
        }
      ]
    },
    somaticMove: {
      name: 'The Finger-to-Lips Shhh (Silent Comment)',
      action:
        'Hold an index finger to your lips ("Shhh..."), then pretend to scribble a quick note in the air with a pen ("# Secret Note for Humans Only!").',
      whyItWorks:
        'Reinforces the mental model that comments are completely silent to the machine compiler/interpreter while speaking loudly to human readers.'
    },
    quickTakeaway:
      'Comments begin with "#". Linux ignores them, but they explain WHY code was written, document parameters, and let you temporarily silence lines during testing!'
  },

  // ==========================================================================
  // 16.4 STORING AND DISPLAYING MESSAGES IN A SHELL SCRIPT
  // ==========================================================================
  {
    id: 'storing-displaying-messages',
    number: '16.4',
    title: 'Storing and Displaying Messages (Variables, echo & printf)',
    shortTitle: 'Variables & Displaying Messages',
    icon: '📦💬',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-900',
    laymanHeadline:
      'Variables are labeled jars that store text and numbers. In bash, you MUST NOT put spaces around the "=" sign, and you read values back using the "$" prefix!',
    laymanExplanation:
      'Managing data and communicating with users are the twin foundations of scripting:\n• Storing Data in Variables:\n  Assigning data is done with "NAME=value" (e.g. "SERVER=\"web01.cozy.internal\"" or "RETRIES=3").\n  CRITICAL BASH RULE: Never put spaces around the "=" sign! If you write "SERVER = web01", bash thinks "SERVER" is a command and "=" is an argument, throwing an immediate "command not found" error!\n• Reading Variables with "$": To read back the value inside the jar, prepend a dollar sign ("$NAME" or "${NAME}"). The curly brace form "${NAME}_backup" is essential when appending text directly to a variable name so bash doesn\'t search for a non-existent variable called "$NAME_backup".\n• Displaying Messages with "echo":\n  - "echo \"Hello World\"": Prints text followed by an automatic newline.\n  - "echo -n \"Enter name: \"": Prints text WITHOUT a newline (keeps cursor on the same line for prompts).\n  - "echo -e \"Line 1\\nLine 2\\tTabbed\"": Enables interpretation of backslash escapes like "\\n" (newline) and "\\t" (tab).\n• Colorful Terminal Alerts (ANSI Codes): Using "echo -e \"\\e[32m[SUCCESS]\\e[0m All systems green\"" prints vibrant green text on Linux terminals!\n• Formatted Output with "printf": While "echo" has quirks across different UNIX shells, "printf" offers standardized, rock-solid formatting with width alignment (e.g. \'printf "%-12s: %s\\n" "Disk" "/dev/sda1"\').',
    laymanPoints: [
      {
        term: 'The Strict No-Spaces Rule',
        meaning:
          'In bash, "VAR=value" is variable assignment. "VAR = value" fails with a command-not-found error because spaces define command arguments.'
      },
      {
        term: 'The $ Dereference Prefix',
        meaning:
          'Writing VAR refers to the name of the variable. Writing $VAR tells bash to extract and evaluate the actual value stored inside.'
      },
      {
        term: 'Curly Braces (${VAR})',
        meaning:
          'Protects variable boundaries during string concatenation (e.g. "${FILE}_backup.tar.gz" instead of "$FILE_backup.tar.gz").'
      },
      {
        term: 'echo -e (Escape Sequences)',
        meaning:
          'Enables special characters like \\n for line breaks, \\t for indentation tabs, and \\e[31m for terminal color highlights.'
      },
      {
        term: 'printf Formatter',
        meaning:
          'A reliable C-style formatting tool that aligns tables and formats decimal numbers with precise padding and column widths.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): Labeled Pantry Storage Jars & The Living Room Chalkboard',
      icon: '🏠🏷️',
      summary:
        '“Variables are labeled glass jars in Chef Bash’s pantry; echo and printf are how he writes today’s menu on the front blackboard!”',
      points: [
        {
          name: 'The Glass Jar with a Label = Variable (FOOD="Rice")',
          emoji: '🫙🏷️',
          desc: 'A clear glass jar in the kitchen with a sticker that says "FOOD". Inside the jar sits a scoop of Basmati Rice. The label is the variable name; the rice is the value.'
        },
        {
          name: 'No Gaps Allowed on the Sticker = No spaces around "="',
          emoji: '🩹🚫',
          desc: 'If you leave a physical gap between the sticker and the jar, the sticker falls on the floor and the helper thinks you gave him two broken pieces.'
        },
        {
          name: 'Opening the Jar with the Magic Key = The $ Sign',
          emoji: '🔑✨',
          desc: 'Saying "FOOD" just mentions the label. Saying "$FOOD" unlocks the jar, pulls out the rice, and pours it into the cooking pot!'
        },
        {
          name: 'The Chalkboard Megaphone = The echo Command',
          emoji: '📢🖍️',
          desc: 'Chef Bash stepping onto the porch with a megaphone shouting: "echo \"Lunch is served!\"" so everyone in the rooms hears the announcement.'
        },
        {
          name: 'The Laser-Engraved Menu Board = printf',
          emoji: '📐📋',
          desc: 'A neatly carved wooden plaque where dish names and prices align into clean columns with matching decimal points.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: Labeled M-Pesa Cash Tills & The Cybercafé Price Blackboard',
      icon: '🇰🇪🏪',
      summary:
        '“Variables are the labeled cash compartments in the till drawer; echo and printf are the bold price signs displayed on the shop window!”',
      points: [
        {
          name: 'The Labeled Wooden Cash Slot = Variable (FLOAT=50000)',
          emoji: '🗄️💵',
          desc: 'A wooden divider in the cash drawer marked "FLOAT". Inside sits 50,000 Kenyan shillings. The divider holds the value until needed for customer withdrawals.'
        },
        {
          name: 'Tight Elastic Band = No spaces around "="',
          emoji: '📎⚡',
          desc: 'The cash notes must be strapped tightly against the divider card with an elastic band. If they drift apart, loose notes slip into the wrong bin.'
        },
        {
          name: 'Cashing Out the Float = The $ Sign',
          emoji: '🤲💰',
          desc: 'Saying "FLOAT" refers to the account name on paper. Saying "$FLOAT" takes the actual crisp bank notes out of the drawer and hands them across the glass counter.'
        },
        {
          name: 'The Bold Cardboard Sign = The echo Command',
          emoji: '🪧📢',
          desc: 'A handwritten manila placard hung on the grille: "PRINTING 10 BOB, SCANNING 20 BOB". It announces status clearly to everyone walking past.'
        },
        {
          name: 'The Printed Official Receipt = printf',
          emoji: '🧾🖨️',
          desc: 'The dot-matrix ETR fiscal receipt where Item Name, Quantity, VAT Tax, and Subtotal line up with exact character spacing.'
        }
      ]
    },
    somaticMove: {
      name: 'The Jar-Cap Twist & Shout',
      action:
        'Pretend to screw a tight lid onto a mason jar with both hands ("NO SPACES!"), then reach in with one hand pulling out the contents and shout "DOLLAR VALUE!"',
      whyItWorks:
        'Anchors the strict syntax rule that variable assignment is tight with no gaps, and extraction requires the $ reach-in motion.'
    },
    quickTakeaway:
      'Store data with "VAR=\"value\"" (NO SPACES around =). Retrieve data with "$VAR" or "${VAR}". Print messages with "echo" or formatted tables with "printf"!'
  },

  // ==========================================================================
  // 16.5 STORING THE OUTPUT OF COMMANDS
  // ==========================================================================
  {
    id: 'storing-command-output',
    number: '16.5',
    title: 'Storing the Output of Commands (Command Substitution $())',
    shortTitle: 'Command Output Storage',
    icon: '📥🔄',
    pastelBg: 'bg-teal-50',
    borderColor: 'border-teal-300',
    accentText: 'text-teal-950',
    badgeBg: 'bg-teal-100 text-teal-900',
    laymanHeadline:
      'Command Substitution takes the printed text result of any Linux command and captures it inside a variable so your script can make intelligent decisions!',
    laymanExplanation:
      'Hardcoding values like dates, IP addresses, or file counts makes scripts brittle and fragile. Scripts become truly powerful when they can query Linux in real-time and store the answer inside a variable!\n• Modern Command Substitution ("$(command)"):\n  When bash sees "$(command)", it runs the command inside a temporary subshell, captures whatever text would have been printed to stdout, strips off the trailing newline, and substitutes the text right into your assignment.\n  Examples:\n  - "TODAY=$(date +%Y-%m-%d)": Captures today\'s date (e.g. "2026-11-11") so your backup file is named "backup_2026-11-11.tar.gz".\n  - "FILE_COUNT=$(ls -1 /var/log | wc -l)": Counts files on the fly.\n  - "MY_IP=$(hostname -I | awk \'{print $1}\')": Discovers the server\'s active LAN address.\n• Modern "$()" vs Legacy Backticks (\`command\`):\n  In ancient UNIX scripts, command substitution was written with backticks: "TODAY=\`date\`". While backticks still work for backwards compatibility, they are deprecated and dangerous because nesting backticks requires ugly backslash escaping (\\\`cmd\\\`). In contrast, modern "$()" supports clean, effortless nesting: "PARENT_DIR=$(dirname $(realpath \"$0\"))"!\n• Safety Quoting: Always wrap command substitutions in double quotes ("VAR=\"$(cmd)\"") to prevent word-splitting and globbing if the command\'s output contains spaces or special characters.',
    laymanPoints: [
      {
        term: 'Command Substitution $(...)',
        meaning:
          'Runs a command in a child subshell, captures its standard output, and places the resulting text into a variable or string.'
      },
      {
        term: 'Dynamic Scripting',
        meaning:
          'Allows scripts to adapt to their environment (inspecting current date, free RAM, logged-in user, or active IP) rather than using static hardcoded values.'
      },
      {
        term: 'Legacy Backticks (\`cmd\`)',
        meaning:
          'The vintage 1970s syntax for command substitution. Disfavored today because nested backticks require confusing backslash escapes.'
      },
      {
        term: 'Effortless Nesting',
        meaning:
          'Modern $() allows clean composition where the output of one command is fed into another: $(basename $(dirname "$PATH")).'
      },
      {
        term: 'Double-Quote Protection',
        meaning:
          'Wrapping "$(cmd)" in quotes preserves whitespace and line breaks, preventing bash from splitting output into separate words.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Kitchen Scale & Polaroid Snapshot',
      icon: '🏠⚖️',
      summary:
        '“Instead of guessing how heavy the potato sack is, Chef Bash weighs it on the scale, snaps a Polaroid photo, and clips the photo to his recipe card!”',
      points: [
        {
          name: 'The Live Measurement = The Linux Command (date or df)',
          emoji: '⏱️📏',
          desc: 'Chef Bash looking at the grandfather clock on the wall to see the time, or setting a flour bag on the kitchen scale to see the weight.'
        },
        {
          name: 'The Polaroid Camera Catcher = The $() Wrapper',
          emoji: '📸✨',
          desc: 'The $( ) parentheses are like a camera lens snapping a photo of the clock hands. It freezes that instant measurement into a physical printout.'
        },
        {
          name: 'Filing the Photo in a Folder = TODAY=$(date +%F)',
          emoji: '📁🏷️',
          desc: 'Taking the printed photo and sliding it into the clear pocket marked "TODAY". From now on, whenever he refers to $TODAY, he uses that exact timestamp.'
        },
        {
          name: 'The Scratched Magnifying Glass = Legacy Backticks (\`cmd\`)',
          emoji: '🔍🩹',
          desc: 'An old brass magnifying glass from 1975. It worked, but if you tried stacking two magnifying glasses together, the image got blurry and scratched.'
        },
        {
          name: 'Nesting Cameras = $(dirname $(realpath "$0"))',
          emoji: '🪆📸',
          desc: 'Taking a photo of a photo smoothly through modern clear glass without distortion or glare.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: Weighing Sacks at the Maize Posho Mill (Kipande)',
      icon: '🇰🇪🌽',
      summary:
        '“The posho mill operator doesn’t write a fake grain weight on your receipt—he puts the gunia on the scale, reads the needle, and writes the exact kilos down!”',
      points: [
        {
          name: 'The Heavy Platform Spring Scale = The Command (wc -l or du -sh)',
          emoji: '⚖️🌾',
          desc: 'The iron spring balance at the mill. You hoist the gunia of dry maize onto the iron plate; the mechanical needle swings to 90 KG.'
        },
        {
          name: 'The Weighmaster’s Eye = The $( ) Syntax',
          emoji: '👀📝',
          desc: 'The weighmaster looking directly at the scale needle, reading the live measurement, and holding that number in his head.'
        },
        {
          name: 'Writing Kilos on the Yellow Card = KILOS=$(scale_cmd)',
          emoji: '✍️🎫',
          desc: 'He takes his ballpoint pen and writes: "90 KG" on your collection card. Now your milling fee is calculated from that recorded variable.'
        },
        {
          name: 'Old Carbon-Copy Smudge = Backticks (\`cmd\`)',
          emoji: '📄🖤',
          desc: 'Old purple carbon paper from 1980 that smudges if you try to make 3 copies at once. Hard to read and messy to correct.'
        },
        {
          name: 'Real-Time Dynamic Pricing = DATE=$(date +%d-%b)',
          emoji: '📅🏷️',
          desc: 'Every morning, the duka owner stamps today\'s date at the top of the price sheet so yesterday\'s maize price doesn\'t cause arguments.'
        }
      ]
    },
    somaticMove: {
      name: 'The Butterfly Catch & Pocket',
      action:
        'Reach both hands into the air and clamp your fingers shut like catching a flying butterfly ("$(COMMAND) CAUGHT!"), then slide that fist straight into your pocket ("STORED IN VARIABLE!").',
      whyItWorks:
        'Creates an instinctive memory that command substitution catches live ephemeral terminal output and securely stashes it into a persistent variable.'
    },
    quickTakeaway:
      'Capture command results using "VAR=\"$(command)\"" (e.g. TODAY=$(date +%F)). Avoid legacy backticks and always quote the result to handle spaces safely!'
  },

  // ==========================================================================
  // 16.6 EXIT CODES OF SHELL COMMANDS
  // ==========================================================================
  {
    id: 'exit-codes-of-commands',
    number: '16.6',
    title: 'Exit Codes of Shell Commands (The $? Status & Conditional Logic)',
    shortTitle: 'Exit Codes ($?)',
    icon: '🚦🚥',
    pastelBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    accentText: 'text-rose-950',
    badgeBg: 'bg-rose-100 text-rose-900',
    laymanHeadline:
      'Every single Linux command returns a hidden traffic light score when it finishes: 0 means Green (Success!), while any number from 1 to 255 means Red (Error)!',
    laymanExplanation:
      'Whenever a Linux program or command terminates, it sends an integer number between 0 and 255 back to the operating system kernel. This number is called the "Exit Status" or "Exit Code".\n• The Golden Linux Rule of Exit Codes:\n  - "0 = SUCCESS" (Green Light): The task finished cleanly with zero errors.\n  - "1 to 255 = FAILURE" (Red Light): Something went wrong! Non-zero numbers indicate errors, warnings, or abnormal termination.\n• Inspecting Exit Status with "$?":\n  Bash stores the exit code of the most recently executed command in a special automatic variable named "$?". If you run "ls /tmp" and immediately run "echo $?", it prints "0". If you run "ls /non_existent_folder" and then "echo $?", it prints "2" (No such file or directory)!\n• Common Standard Linux Exit Codes to Know:\n  - 0: Success / OK.\n  - 1: General catch-all error (e.g. division by zero, permission issue).\n  - 2: Misuse of shell builtins (missing arguments or bad options).\n  - 126: Command invoked cannot execute (permission denied / not executable).\n  - 127: Command not found (typo in command name or binary not installed in $PATH).\n  - 130: Script terminated by user via "Ctrl + C" (128 + Signal 2 SIGINT).\n  - 137: Process forcefully killed by SIGKILL 9 or OOM-Killer (128 + Signal 9).\n• Conditional Chaining with "&&" and "||":\n  - "cmd1 && cmd2": Run cmd2 ONLY IF cmd1 succeeded (exit code 0). Example: "mkdir backup && cd backup".\n  - "cmd1 || cmd2": Run cmd2 ONLY IF cmd1 failed (exit code != 0). Example: "ping -c 1 server || echo \"Server Down!\"".\n• Script Exit Control ("exit 0" vs "exit 1"): In your own scripts, use "exit 0" to signal successful completion to calling scripts, and "exit 1" to signal failure!',
    laymanPoints: [
      {
        term: 'The $? Special Variable',
        meaning:
          'Holds the integer exit status (0-255) of the most recently executed foreground command.'
      },
      {
        term: 'Exit Code 0 (Success)',
        meaning:
          'Universal UNIX convention indicating that a command completed its task flawlessly without errors.'
      },
      {
        term: 'Exit Code 127 (Command Not Found)',
        meaning:
          'Standard error returned when the typed command does not exist in any of the $PATH directories or aliases.'
      },
      {
        term: 'Conditional AND (&&)',
        meaning:
          'Executes the second command only if the first command succeeds ($? is 0). Used for safe sequential operations.'
      },
      {
        term: 'Conditional OR (||)',
        meaning:
          'Executes the fallback command only if the primary command fails ($? is non-zero). Used for alert notifications.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Green and Red Thumbs-Up Traffic Light',
      icon: '🏠🚦',
      summary:
        '“Every time Chef Bash finishes an errand, he holds up a wooden paddle: Green Thumbs-Up (0) for victory, or Red Thumbs-Down (1) for trouble!”',
      points: [
        {
          name: 'The Green Paddle = Exit Code 0 (Success)',
          emoji: '🟢👍',
          desc: 'Chef Bash walks out of the pantry holding up a clean green paddle with a "0". It means: "All groceries purchased, pantry fully stocked, zero problems!"'
        },
        {
          name: 'The Red Paddle = Exit Code 1..255 (Error)',
          emoji: '🔴👎',
          desc: 'Chef Bash holding up a red paddle marked "2". It means: "Grocery store was closed when I arrived!"'
        },
        {
          name: 'The Inspection Window = The $? Variable',
          emoji: '🪟❓',
          desc: 'Looking through the kitchen sliding window immediately after an order to see which paddle is currently resting on the counter.'
        },
        {
          name: 'The Missing Tool Alarm = Exit Code 127',
          emoji: '🧰❓',
          desc: 'You asked for an "egg-poacher", but no such tool exists in the kitchen shed. Chef Bash flashes code 127: "Tool not found!"'
        },
        {
          name: 'The Safety Interlock Rule = cmd1 && cmd2',
          emoji: '🔗🛡️',
          desc: '"Unlock front gate && Drive car onto driveway". If the gate padlock refuses to open, you NEVER hit the gas pedal into the closed metal gate!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The M-Pesa SMS Confirmation vs Failed Transaction Alert',
      icon: '🇰🇪📱',
      summary:
        '“When you send money on M-Pesa, you don’t walk away until Safaricom returns either a Green Confirmation Code (0) or a Red Insufficient Funds Code (1)!”',
      points: [
        {
          name: 'The Successful M-Pesa SMS = Exit Code 0',
          emoji: '🟢📩',
          desc: '"Confirmed. Ksh 1,500 sent to Peter Mwangi on 11/11/26... M-Pesa balance is...". Code 0: Transaction completed cleanly.'
        },
        {
          name: 'The Insufficient Funds Alert = Exit Code 1..255',
          emoji: '🔴⚠️',
          desc: '"Failed. You have insufficient funds to complete this transaction...". Non-zero code: Process halted, money was not sent.'
        },
        {
          name: 'Checking Transaction History = echo $?',
          emoji: '📜📱',
          desc: 'Pressing *334# to check mini-statement immediately after a transaction to verify if the payment actually went through.'
        },
        {
          name: 'Wrong Paybill Number = Exit Code 127 (Not Found)',
          emoji: '🔢🚫',
          desc: 'Entering a 5-digit Paybill number that has never been registered by any business. Safaricom returns: "Invalid Business Number".'
        },
        {
          name: 'Safe Sequential Buying = Pay && Take Goods',
          emoji: '🛍️🤝',
          desc: '"Send M-Pesa && Hand over the shoes". The shopkeeper only hands you the package if and only if the SMS confirmation buzzer chimes code 0!'
        }
      ]
    },
    somaticMove: {
      name: 'The Traffic Light Thumbs Check ($?)',
      action:
        'Give a vigorous thumbs-up in front of your chest and shout "ZERO MEANS GREEN!", then flip your thumb down to the floor and shout "NON-ZERO MEANS ERROR!"',
      whyItWorks:
        'Counteracts the common beginner intuition that 1 means true/success. Physically cements that 0 is success and non-zero is failure in UNIX shell scripting.'
    },
    quickTakeaway:
      'Linux commands return an exit code stored in "$?". 0 means success; 1-255 means error. Chain commands safely with "&&" (on success) and "||" (on failure)!'
  }
];
