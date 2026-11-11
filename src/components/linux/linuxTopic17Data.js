// Topic 17: Bash Scripting, Variables, Functions & Operators (6 Subtopics)
// 17.1 Shell Variables & Rules for Variable Definition (Valid names, case sensitivity, no-spaces rule, export & env)
// 17.2 Bash Variable Types & Scope (Strings, integers declare -i, readonly, indexed & associative arrays)
// 17.3 Working & Running Bash Scripts (Subshell vs source/., execution lifecycle, debugging with bash -x & -n)
// 17.4 Functions in Bash (Definition syntax, positional args $1/$2, local scope, return vs echo capture)
// 17.5 Difference between Shell (sh) and Bash (POSIX sh vs GNU bash, [[ ]] vs [ ], arrays, string slicing)
// 17.6 Basic Operators in Bash (Arithmetic $(( )), numeric -eq/-gt, string ==/-z, file tests -f/-d/-x)

export const linuxTopic17Subtopics = [
  // ==========================================================================
  // 17.1 SHELL VARIABLES & RULES FOR VARIABLE DEFINITION
  // ==========================================================================
  {
    id: 'shell-variables-and-rules',
    number: '17.1',
    title: 'Shell Variables & Rules for Variable Definition (Naming, Syntax & Scope)',
    shortTitle: 'Shell Variables & Rules',
    icon: '📦🏷️',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    laymanHeadline:
      'Shell variables are named memory containers. Like custom labeled jars in a kitchen, they obey strict naming laws: no spaces around "=", no starting with numbers, and UPPERCASE is different from lowercase!',
    laymanExplanation:
      'In Linux shell scripting, variables hold temporary values in memory during execution. But unlike casual English writing, the shell parser enforces strict syntactic rules:\n• The 4 Core Rules of Variable Definition:\n  1. The Sacred No-Spaces Rule: You MUST write "NAME=\"value\"". If you add spaces ("NAME = value"), bash splits them into a command and arguments, throwing "NAME: command not found"!\n  2. Permitted Characters: Variable names can only contain letters (a-z, A-Z), numbers (0-9), and underscores ("_"). Hyphens, dots, and spaces are illegal ("my-var" ❌, "my_var" ✅).\n  3. Cannot Start With a Number: "2nd_server" is illegal! Names must start with a letter or an underscore ("server_2" ✅, "_temp" ✅).\n  4. Case Sensitivity: "PORT", "Port", and "port" are three completely separate variables in Linux memory!\n• Variable Categories:\n  - User-Defined Local Variables: Created inside your script (e.g. "backup_dir=\"/tmp/backups\""). Only available to the current shell process; child scripts cannot see them.\n  - Environment Variables (Exported): Promoted using "export DB_HOST=\"10.0.0.5\"". When exported, all child processes, Python scripts, or programs launched from this shell inherit the variable!\n  - System / Preset Variables: Maintained automatically by Linux, such as "$USER" (current login), "$HOME" (user home directory), "$PWD" (active folder), and "$$" (active process PID).',
    laymanPoints: [
      {
        term: 'The No-Spaces Rule (NAME=value)',
        meaning:
          'In bash, "=" binds the variable and value into a single token. Adding spaces turns it into a command lookup which immediately fails.'
      },
      {
        term: 'Identifier Naming Rules',
        meaning:
          'Names must start with a letter or underscore, and may only contain alphanumeric characters and underscores (e.g., BACKUP_DIR_01).'
      },
      {
        term: 'Case Sensitivity',
        meaning:
          'Linux treats USER, User, and user as three distinct memory addresses. Convention uses UPPERCASE for exported/globals and snake_case for locals.'
      },
      {
        term: 'export (Environment Promotion)',
        meaning:
          'Shares a local variable down into all child subshells and subprocesses launched by this script (e.g., export API_KEY="xyz").'
      },
      {
        term: 'Built-in Environment Variables',
        meaning:
          'Preset system variables like $HOME, $USER, $SHELL, $PATH, and $$ that provide instant contextual information about the OS.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Pantry Label Maker & Glass Jars',
      icon: '🏠🏷️',
      summary:
        '“Chef Bash has a strict label maker in the pantry: labels must be glued tight with no air gaps, and letters in caps mean house-wide supplies!”',
      points: [
        {
          name: 'The Tight Sticker = NAME="Basmati"',
          emoji: '🏷️🫙',
          desc: 'The sticker is pressed flat against the glass jar with zero air bubbles or gaps. If you leave a space, the sticker falls on the floor and Chef Bash gets confused.'
        },
        {
          name: 'Letter First Rule = server_1 not 1_server',
          emoji: '🔤🔢',
          desc: 'Every jar must have a readable name tag before you add a shelf number. You write "Spice_1", never "1_Spice"!'
        },
        {
          name: 'Capital Letters = House-Wide Pantry (Exported)',
          emoji: '🏛️📢',
          desc: 'Jars with bold ALL-CAPS labels (like WATER or ELECTRICITY) are placed in the central hallway so every bedroom guest and helper can use them.'
        },
        {
          name: 'Lowercase Letters = Chef Bash’s Private Spices (Local)',
          emoji: '🧑‍🍳🤫',
          desc: 'Small handwritten jars in Chef Bash’s private apron pocket. When guest helpers enter the kitchen, they cannot see or touch his private spices.'
        },
        {
          name: 'The Golden House Blueprints = System Variables ($HOME, $USER)',
          emoji: '📜🏡',
          desc: 'Pre-printed architectural signs bolted to the walls showing who lives here ($USER) and where the front entrance is located ($HOME).'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Shopkeeper’s Labeled M-Pesa Tills & Cash Drawers',
      icon: '🇰🇪🏪',
      summary:
        '“At a bustling Nairobi kiosk, money compartments must have clear, legible tags without loose tape so the cashier balances accounts in seconds!”',
      points: [
        {
          name: 'Tight Elastic Band on Notes = No-Spaces Assignment',
          emoji: '📎💵',
          desc: 'Notes are bound tightly with an elastic band directly against the label divider. If loose notes float between slots, the register short-changes customers.'
        },
        {
          name: 'Clear Sacco Names = Legal Identifiers',
          emoji: '📝🚏',
          desc: 'A stage booking book lists "SUPER_METRO_01". Writing "1_METRO" or "SUPER-METRO" with a dash gets rejected by the Sacco auditor.'
        },
        {
          name: 'The Big Chalkboard = export (Visible to All)',
          emoji: '🪧📢',
          desc: 'Writing "MAIZE_FLOUR=210" on the big outdoor blackboard so every customer and shop assistant in the estate knows the price.'
        },
        {
          name: 'The Pocket Diary = Local Script Variable',
          emoji: '📓✍️',
          desc: 'The owner’s small pocket ledger tracking personal tea expenses. Assistants running the counter have no access to it.'
        },
        {
          name: 'The KPLC & Safaricom Till Numbers = Preset System Variables',
          emoji: '📱🔢',
          desc: 'Pre-registered business Till and Paybill numbers that never change during daily sales ($USER, $PWD, $HOME).'
        }
      ]
    },
    somaticMove: {
      name: 'The Tight-Snap Clamp',
      action:
        'Clamp your two hands together firmly like a vice with fingers interlaced ("SNAP! NO SPACES!"), then trace an imaginary capital letter in the air with your chin ("UPPERCASE EXPORT!").',
      whyItWorks:
        'Physically ingrains the habit of eliminating spaces around the equals sign and associating uppercase identifiers with global exported settings.'
    },
    quickTakeaway:
      'Variable names must start with a letter or underscore and have NO spaces around "=" (VAR="val"). Use "export" to share variables with child processes!'
  },

  // ==========================================================================
  // 17.2 BASH VARIABLE TYPES & SCOPE
  // ==========================================================================
  {
    id: 'bash-variable-types-and-scope',
    number: '17.2',
    title: 'Bash Variable Types & Scope (Strings, Integers, Arrays & Readonly)',
    shortTitle: 'Variable Types & Scope',
    icon: '🗃️🔢',
    pastelBg: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    accentText: 'text-cyan-950',
    badgeBg: 'bg-cyan-100 text-cyan-900',
    laymanHeadline:
      'In Bash, every variable starts as simple text (strings), but you can use "declare" to unlock integers, locked constants (readonly), and multi-item grocery lists (arrays)!',
    laymanExplanation:
      'Unlike strongly-typed languages like C++ or Java, Bash is dynamically typed and treats all variables as text strings by default. However, Bash provides the powerful "declare" builtin to assign specialized data behaviors:\n• The 5 Primary Bash Variable Types:\n  1. String Variables (Default): Text wrapped in quotes (e.g. "GREETING=\"Habari Yako\"").\n  2. Integer Variables ("declare -i"): Tells bash to treat the variable as an integer. Arithmetic expressions calculate automatically without needing $(( )) (e.g. "declare -i COUNT=5; COUNT+=1" makes COUNT equal 6!).\n  3. Read-Only Constants ("readonly" or "declare -r"): Locks the variable permanently so no script line can overwrite or unset it (e.g. "readonly PI=3.1415"). Perfect for API keys and database ports!\n  4. Indexed Arrays ("declare -a" or "FRUITS=(\"Mango\" \"Banana\" \"Orange\")"): Holds an ordered list of items accessed by 0-based numbers. "${FRUITS[0]}" returns "Mango", and "${FRUITS[@]}" returns all items.\n  5. Associative Arrays ("declare -A"): Powerful key-value dictionaries (hash maps) available in modern Bash 4+. Instead of numbers, you index items by words (e.g. "declare -A CAPITAL; CAPITAL[Kenya]=\"Nairobi\"; echo ${CAPITAL[Kenya]}").\n• Positional Parameters (Special Script Variables): When someone runs your script as "./deploy.sh staging web01", Bash automatically populates special variables:\n  - "$0": The script name itself ("./deploy.sh").\n  - "$1", "$2": The first and second arguments ("staging", "web01").\n  - "$#": Total number of arguments passed (2).\n  - "$@": All arguments as a separate list.',
    laymanPoints: [
      {
        term: 'Strings as Default',
        meaning:
          'Unless declared otherwise, bash treats every variable as a sequence of characters, converting to numbers only during arithmetic.'
      },
      {
        term: 'declare -i (Integer Mode)',
        meaning:
          'Enforces integer arithmetic behavior so mathematical expressions evaluate automatically during assignment.'
      },
      {
        term: 'readonly / declare -r',
        meaning:
          'Creates write-protected constants. Any attempt to modify or unset a readonly variable throws an error.'
      },
      {
        term: 'Indexed Arrays (FRUITS=("Apple" "Banana"))',
        meaning:
          'Ordered lists indexed by 0, 1, 2. Access single items with ${ARR[0]} or print the whole array with ${ARR[@]}.'
      },
      {
        term: 'Positional Parameters ($1, $2, $#)',
        meaning:
          'Special automatic variables populated from command-line arguments passed when the script was launched.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): Different Containers in the Kitchen Workshop',
      icon: '🏠🗃️',
      summary:
        '“In Chef Bash’s pantry, not everything goes into a single glass jar—some items need locked safes, egg cartons with numbered slots, or labeled index cards!”',
      points: [
        {
          name: 'The Text Paper Bag = Standard String',
          emoji: '🛍️📄',
          desc: 'A plain paper bag with words written on it: "Welcome Home". Flexible, holds any letters or sentences easily.'
        },
        {
          name: 'The Abacus Calculator = declare -i (Integer)',
          emoji: '🧮🔢',
          desc: 'A wooden abacus with counting beads. You slide beads back and forth (5 + 1 = 6) strictly for numbers, not words.'
        },
        {
          name: 'The Welded Iron Safe = readonly (Constants)',
          emoji: '🔒🧱',
          desc: 'A heavy metal lockbox holding the master house security code. Once the lid is welded shut, no helper or guest can alter it.'
        },
        {
          name: 'The 12-Slot Egg Carton = Indexed Array',
          emoji: '🥚📦',
          desc: 'A cardboard carton with numbered indentations (Slot 0, Slot 1, Slot 2). You pull out Egg #0 (Mango) or look at the whole tray (${CARTON[@]}).'
        },
        {
          name: 'The Delivery Box Slips = Positional Parameters ($1, $2)',
          emoji: '📦🚚',
          desc: 'When the delivery truck arrives with 2 boxes, Package #1 is the groceries and Package #2 is the tools ($1 and $2).'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Hardware Store (Fundi) Organizer Bins',
      icon: '🇰🇪🛠️',
      summary:
        '“A Nairobi hardware fundi doesn’t dump nails, paint cans, and customer invoices into one bucket—he organizes them by type!”',
      points: [
        {
          name: 'The Receipt Pad = String Variable',
          emoji: '🧾✍️',
          desc: 'The receipt book where the clerk writes customer names and descriptions in plain handwriting.'
        },
        {
          name: 'The Weighbridge Scale = declare -i (Integer)',
          emoji: '⚖️🧱',
          desc: 'The cement bag counter. It only understands whole numbers (5 bags, 10 bags) for math calculations.'
        },
        {
          name: 'The Glass Counter Display Padlock = readonly Constant',
          emoji: '🔐💎',
          desc: 'The locked glass showcase holding expensive brass padlocks. The price is fixed by the manufacturer and cannot be bargained down.'
        },
        {
          name: 'The Segmented Screw Box = Indexed Array',
          emoji: '🔩🗃️',
          desc: 'A plastic tray with slots 0 to 5 holding 1-inch nails in slot 0, 2-inch nails in slot 1, and roofing screws in slot 2.'
        },
        {
          name: 'Passengers in Matatu Seats = Positional Parameters ($1, $2, $3)',
          emoji: '🚐👥',
          desc: 'Passenger #1 sitting in the front shotgun seat, Passenger #2 behind the driver, and $# telling the conductor the stage count (14 passengers).'
        }
      ]
    },
    somaticMove: {
      name: 'The 3-Box Sort (String, Number, Array)',
      action:
        'Mime opening a soft envelope (String), then tap your knuckles together like a calculator ("1-2-3 INTEGER!"), then open your arms wide like an egg carton ("ARRAY TRAY!").',
      whyItWorks:
        'Anchors the three primary data containers in Bash through distinct tactile hand positions.'
    },
    quickTakeaway:
      'Variables default to strings. Use "declare -i" for integers, "readonly" for immutable constants, and "ARR=(\"a\" \"b\")" for indexed lists!'
  },

  // ==========================================================================
  // 17.3 WORKING & RUNNING BASH SCRIPTS
  // ==========================================================================
  {
    id: 'working-and-running-bash-scripts',
    number: '17.3',
    title: 'Working & Running Bash Scripts (Subshells, Sourcing & Debugging)',
    shortTitle: 'Running Scripts & Debugging',
    icon: '🚀🛠️',
    pastelBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    accentText: 'text-purple-950',
    badgeBg: 'bg-purple-100 text-purple-900',
    laymanHeadline:
      'Running a script can spawn a private temporary helper (subshell) OR run directly inside your current room (sourcing). Adding "bash -x" turns on X-Ray debugging vision!',
    laymanExplanation:
      'Understanding HOW Bash executes a script saves hours of debugging headaches:\n• The Internal Execution Pipeline: When Bash reads a script line, it performs 6 distinct parsing passes: (1) Tokenization into words, (2) Variable expansion ($VAR), (3) Command substitution ($(cmd)), (4) Arithmetic evaluation ($((x+1))), (5) Pathname expansion / Globbing (*.log), and (6) Execution via system calls.\n• Subshell Execution vs Sourcing ("source" / "."):\n  - Subshell ("./script.sh" or "bash script.sh"): The kernel clones a fresh child shell process. The script runs inside this sandbox. When it finishes, the child process exits. Any variables it created or directory changes ("cd /var/www") vanish when the script ends!\n  - Sourcing ("source script.sh" or ". script.sh"): Runs the script directly INSIDE YOUR CURRENT ACTIVE SHELL. If the script defines "DB_PORT=5432" or runs "cd /opt", those changes permanently remain in your active terminal after it finishes! (This is why "~/.bashrc" is always sourced, never executed with ./).\n• Production Debugging Flags (The Pro Toolkit):\n  - "bash -x script.sh" (X-Ray Tracing): Prints every single command to your terminal preceded by "+" with all variables fully expanded BEFORE execution. You see exactly what bash is doing!\n  - "bash -n script.sh" (Dry-Run Syntax Check): Scans the script for syntax errors (missing "fi", unclosed quotes) without actually executing a single command!\n  - "set -e" (Strict Error Exit): Instructs the script to abort immediately if any command returns a non-zero exit code, preventing catastrophic cascade failures.',
    laymanPoints: [
      {
        term: 'Subshell Execution (./script.sh)',
        meaning:
          'Spawns a child shell process to run the script. Variable assignments and cd commands do not affect your parent terminal.'
      },
      {
        term: 'Sourcing (source or .)',
        meaning:
          'Executes script commands directly within the current active shell process, preserving variables and environment changes.'
      },
      {
        term: 'bash -x (Execution Trace)',
        meaning:
          'X-Ray debugging mode that prints every line with variables expanded before running it, highlighting exactly where logic breaks.'
      },
      {
        term: 'bash -n (Syntax Dry Run)',
        meaning:
          'Parses the script for syntax errors without executing any commands, ideal for pre-deployment CI/CD checks.'
      },
      {
        term: 'set -euo pipefail',
        meaning:
          'The golden bash defensive preamble: exits on error (-e), errors on unassigned variables (-u), and tracks piped failures.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Temporary Guest Helper vs Remodeling the Master Living Room',
      icon: '🏠🧹',
      summary:
        '“Running with ./ is like hiring a temporary day cleaner who leaves at 5 PM; sourcing is like permanently painting the living room walls yourself!”',
      points: [
        {
          name: 'The Day Cleaner in a Separate Room = Subshell (./script.sh)',
          emoji: '🧹🚪',
          desc: 'A temporary helper steps into the house, carries out chores, and walks out the gate. Any furniture he moved in his head is forgotten the moment he exits.'
        },
        {
          name: 'Permanent House Remodeling = Sourcing (source script.sh)',
          emoji: '🎨🛋️',
          desc: 'You invite a contractor to paint the living room wall blue. When he leaves, the wall remains blue forever in your active living room!'
        },
        {
          name: 'The Glass House Tour = X-Ray Debugging (bash -x)',
          emoji: '🔍✨',
          desc: 'Turning on all chandelier lights and reading every step through magnifying glasses so you catch the exact moment a plate slips.'
        },
        {
          name: 'The Blueprint Proofread = Dry Run (bash -n)',
          emoji: '📐📄',
          desc: 'Checking the architectural drawing for missing doors before laying a single brick or spending a single shilling.'
        },
        {
          name: 'The Emergency Fire Sprinkler = set -e',
          emoji: '🚨💧',
          desc: 'If grease splatters on the stove, the kitchen alarm immediately rings and halts everything before the whole house catches fire.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: Hiring an Outside Fundi vs Giving House Keys to Family',
      icon: '🇰🇪👷',
      summary:
        '“Subshell execution is like hiring an outside plumber who finishes and takes his tools away; sourcing is like adopting a new house rule with your family!”',
      points: [
        {
          name: 'The Outside Fundi = Subshell (./script.sh)',
          emoji: '🧰🚐',
          desc: 'A mechanic comes to repair the matatu alternator. He tests it, packs his spanners, and leaves. Your glove compartment remains untouched.'
        },
        {
          name: 'The Permanent Sacco Rule = Sourcing (. ~/.bashrc)',
          emoji: '📑🖊️',
          desc: 'The Sacco members vote to change fare to 50 bob. The new fare rule applies immediately to all drivers right there in the stage room.'
        },
        {
          name: 'Police Vehicle Inspection = bash -x',
          emoji: '👮📋',
          desc: 'NTSA officers checking the engine number, brake fluid, and speed governor in broad daylight before letting the vehicle on the road.'
        },
        {
          name: 'Checking the Logbook at the Office = bash -n',
          emoji: '🏢📄',
          desc: 'The clerk verifying your insurance sticker and driving license at the desk without turning on the vehicle engine.'
        },
        {
          name: 'The Conductor Emergency Whistle = set -e',
          emoji: '🪈🛑',
          desc: 'A loud whistle blow the second a tyre punctures—the driver immediately hits the brakes instead of driving on the rim.'
        }
      ]
    },
    somaticMove: {
      name: 'The Subshell Bubble Pop & Source Hug',
      action:
        'Mime blowing a soap bubble away from you and popping it with a clap ("SUBSHELL DIES!"), then pull your hands to your chest in a warm hug ("SOURCE STAYS WITH ME!").',
      whyItWorks:
        'Creates an unforgettable physical distinction between isolated child subshells that disappear and sourced scripts that stay in your active environment.'
    },
    quickTakeaway:
      'Running "./script.sh" uses an isolated subshell. "source script.sh" updates your current shell environment. Debug with "bash -x" to trace every line!'
  },

  // ==========================================================================
  // 17.4 FUNCTIONS IN BASH
  // ==========================================================================
  {
    id: 'functions-in-bash',
    number: '17.4',
    title: 'Functions in Bash (Definition, Arguments, Local Scope & Return Values)',
    shortTitle: 'Functions in Bash',
    icon: '🧩📦',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-900',
    laymanHeadline:
      'A function is a reusable mini-script inside your script: give it a name, pass it arguments ($1, $2), keep its variables private with "local", and call it whenever you want!',
    laymanExplanation:
      'Instead of repeating the same 10 lines of backup or logging code 5 times in a script, you bundle them into a Bash Function (following the DRY principle: Don\'t Repeat Yourself!):\n• The Two Ways to Define a Function:\n  1. Modern Standard: "my_function() { ... }" (Recommended, POSIX compatible).\n  2. Keyword Syntax: "function my_function { ... }".\n• Function Arguments ($1, $2, $#): Functions do NOT take arguments inside the parentheses like Python or C! Instead, you pass arguments separated by spaces when calling it ("log_message \"Database connected\" \"INFO\""). Inside the function body, "$1" becomes "Database connected" and "$2" becomes "INFO"!\n• Local Scope ("local"): By default in Bash, all variables defined inside functions are GLOBAL! If your function modifies a variable named "COUNT", it overwrites the "COUNT" in the rest of your script! To prevent this disaster, ALWAYS declare function variables with "local var_name=\"value\"".\n• The Golden Return Rule (exit status vs stdout):\n  - "return 0" (or 1): The "return" command in Bash ONLY sets an exit status code between 0 and 255 (inspected with $?). It cannot return text strings like Python!\n  - Returning Text/Data: To return actual data from a function, have the function "echo" the result, and capture it where you call it using command substitution: "RESULT=$(calculate_tax 5000)".',
    laymanPoints: [
      {
        term: 'Function Definition Syntax',
        meaning:
          'Declared with "func_name() { ... }". Parentheses remain empty; parameters are passed dynamically when called.'
      },
      {
        term: 'Positional Arguments in Functions',
        meaning:
          'Inside a function, $1 and $2 refer to the function\'s own parameters, temporarily shadowing the script\'s top-level arguments.'
      },
      {
        term: 'The local Keyword',
        meaning:
          'Restricts variable scope strictly to the function body, preventing accidental variable pollution of the global script memory.'
      },
      {
        term: 'return (Status Codes Only)',
        meaning:
          'Terminates the function and returns an integer exit code (0-255). It cannot return strings or complex objects.'
      },
      {
        term: 'Data Return via stdout Capture',
        meaning:
          'To return text or arrays from a function, print the result with echo and capture it using RESULT=$(func_name).'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Kitchen Recipe Cards & Private Chef Apron Pockets',
      icon: '🏠🧑‍🍳',
      summary:
        '“A function is a laminated recipe index card in Chef Bash’s drawer—he pulls it out, follows the steps with fresh ingredients, and returns a clean plate!”',
      points: [
        {
          name: 'The Laminated Recipe Card = Function Definition',
          emoji: '📋✍️',
          desc: 'A card titled "make_tea()". You don\'t brew tea when writing the card; you brew tea only when someone shouts: "make_tea()!"'
        },
        {
          name: 'The Fresh Ingredients Handed In = Parameters ($1, $2)',
          emoji: '🍃🥛',
          desc: 'You hand Chef Bash green tea leaves ($1) and honey ($2). He uses them for this batch without altering the pantry bulk sugar.'
        },
        {
          name: 'Chef’s Private Apron Pocket = The local Keyword',
          emoji: '🧑‍🍳🪡',
          desc: 'Chef Bash keeps a private stirring spoon marked "local". When he finishes, the spoon goes back in his pocket, leaving the family silver spoons untouched.'
        },
        {
          name: 'The Thumbs-Up Signal = return 0 (Exit Status)',
          emoji: '👍🟢',
          desc: 'Chef Bash flashes a thumbs-up (0) meaning: "Tea was brewed with zero burns!" It is a status indicator, not the tea itself.'
        },
        {
          name: 'Handing Over the Teacup = echo "$tea" & RESULT=$(make_tea)',
          emoji: '🍵🤲',
          desc: 'He slides the warm teacup across the counter into your waiting hands. You take the result and drink it!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Specialized Cybercafé Laminating Machine Routine',
      icon: '🇰🇪🖨️',
      summary:
        '“Instead of setting up the hot laminating machine from scratch for every customer, the attendant creates a standard 3-step routine!”',
      points: [
        {
          name: 'The 3-Step Routine = Function Definition',
          emoji: '📑⚡',
          desc: 'A sign on the wall: "laminate_doc() { Heat rollers; Insert pouch; Seal edges }". Ready to trigger whenever a client steps up.'
        },
        {
          name: 'Customer ID Card Handed Over = Argument $1',
          emoji: '🪪🤲',
          desc: 'The customer hands over their National ID ($1) and 50 shillings ($2). The routine operates on that exact card.'
        },
        {
          name: 'The Attendant’s Scissors = The local Variable',
          emoji: '✂️🏷️',
          desc: 'The attendant keeps his private scissors on a lanyard around his neck ("local"). Other staff cannot accidentally move it.'
        },
        {
          name: 'Machine Beep = return 0 (Success)',
          emoji: '🔔✅',
          desc: 'The machine chimes a clean beep (Code 0), indicating the roller temperature was perfect and no plastic melted.'
        },
        {
          name: 'Handing Over the Sealed ID = echo "$laminated_id"',
          emoji: '🪪✨',
          desc: 'The attendant hands the glossy sealed ID across the glass partition to the customer ($RESULT).'
        }
      ]
    },
    somaticMove: {
      name: 'The Funnel Pour & Slide',
      action:
        'Form an open circle with your left hand like a recipe funnel (Function), drop two imaginary sugar cubes into it with your right hand ("$1 and $2!"), then slide your right flat palm forward ("SERVE RESULT!").',
      whyItWorks:
        'Physically links the parameter input motion ($1, $2 into the function) with the output delivery motion (returning data via stdout).'
    },
    quickTakeaway:
      'Functions bundle reusable code: "name() { ... }". Always declare variables with "local" to avoid bugs, and capture text results with "VAL=$(name "$1")"!'
  },

  // ==========================================================================
  // 17.5 DIFFERENCE BETWEEN SHELL (SH) AND BASH
  // ==========================================================================
  {
    id: 'difference-shell-sh-and-bash',
    number: '17.5',
    title: 'Difference between Shell (sh) and Bash (POSIX Standard vs GNU Power)',
    shortTitle: 'Shell (sh) vs Bash',
    icon: '⚖️⚡',
    pastelBg: 'bg-teal-50',
    borderColor: 'border-teal-300',
    accentText: 'text-teal-950',
    badgeBg: 'bg-teal-100 text-teal-900',
    laymanHeadline:
      '"sh" is the universal vintage bicycle from 1979 (minimal and lightweight); "bash" is the modern motorcycle with gears, digital dashboard, and turbo boosters!',
    laymanExplanation:
      'Many scripts begin with "#!/bin/sh", while others begin with "#!/bin/bash". Knowing the difference prevents scripts from breaking across distributions:\n• The Historical Origin:\n  - "sh" (Bourne Shell): Created by Stephen Bourne at Bell Labs in 1979. It became the foundation of the official POSIX standard (IEEE 1003.1). On modern systems like Ubuntu/Debian, "/bin/sh" is actually symlinked to "dash" (a tiny, lightning-fast POSIX shell designed strictly for boot speed).\n  - "bash" (Bourne Again Shell): Created by Brian Fox for the GNU Project in 1989. It is a superset of sh—meaning everything valid in sh works in bash, but bash adds massive programming capabilities!\n• The 5 Major Superpowers Bash Has Over sh:\n  1. Advanced Testing ("[[ ]]" vs "[ ]"): In sh, you must use "[ ... ]" (which breaks on empty variables without quotes). In bash, "[[ ... ]]" supports regex matching ("=~"), wildcards, and never word-splits empty strings!\n  2. Arrays: Bash has indexed and associative arrays ("ARR=(a b c)"). POSIX sh has ZERO array support!\n  3. String Manipulation: Bash can slice and replace strings internally without calling external sed or awk ("${VAR:0:4}", "${VAR//old/new}", "${VAR^^}"). In sh, you must invoke slow child processes.\n  4. Arithmetic Expansion: Bash does math with "$((x + 1))". Ancient sh required the external "expr" binary.\n  5. Process Substitution: Bash can pipe outputs as temporary file descriptors: "diff <(sort file1) <(sort file2)".\n• The Rule of Thumb: Use "#!/bin/sh" only when writing ultra-portable scripts for embedded devices, Alpine Linux containers, or minimal system boot scripts. Use "#!/usr/bin/env bash" for all everyday automation, DevOps, and production engineering!',
    laymanPoints: [
      {
        term: 'POSIX sh (Standard Specification)',
        meaning:
          'The portable baseline specification from 1979. Extremely lightweight and fast, but lacks modern language features.'
      },
      {
        term: 'GNU bash (Rich Superset)',
        meaning:
          'The default full-featured interactive shell and scripting engine on Linux, expanding sh with arrays, regex, and string operations.'
      },
      {
        term: '[[ ... ]] vs [ ... ]',
        meaning:
          'Bash\'s [[ ]] keyword is safer than sh\'s [ ] test command, supporting regular expressions (=~) and wildcard pattern matching.'
      },
      {
        term: 'Array Support',
        meaning:
          'Bash supports both indexed (0-based) and associative (key-value) arrays, whereas POSIX sh does not support arrays at all.'
      },
      {
        term: 'Portability vs Features',
        meaning:
          'Choose #!/bin/sh for lightweight Alpine containers and system bootloaders; choose #!/usr/bin/env bash for powerful server automation.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Vintage Manual Bicycle vs The Modern Electric Cargo Bike',
      icon: '🏠🚲',
      summary:
        '“sh is a lightweight vintage bicycle with single-speed pedals; bash is an electric cargo bike with 21 gears, headlights, and basket storage!”',
      points: [
        {
          name: 'The Vintage Single-Speed Bicycle = sh',
          emoji: '🚲⚙️',
          desc: 'Lightweight, simple steel frame from 1979. It has no gears or battery, but it will ride smoothly down any narrow alleyway on Earth without breaking.'
        },
        {
          name: 'The Modern Electric Cargo Bike = bash',
          emoji: '🛵⚡',
          desc: 'Equipped with an electric motor (arrays), digital speedometer (string slicing), headlights ([[ ]] testing), and saddlebags for groceries.'
        },
        {
          name: 'Fragile Wire Basket vs Bolted Steel Box = [ ] vs [[ ]]',
          emoji: '🧺📦',
          desc: 'In sh, your wire basket ([ ]) spills groceries if you hit a bump (unquoted variable). In bash, the bolted container ([[ ]]) keeps everything safe.'
        },
        {
          name: 'Multi-Shelf Organizer = Arrays in Bash',
          emoji: '🗄️📚',
          desc: 'Bash lets you stack 10 separate book slots on the bike rack. The vintage bike forces you to balance one single book in your lap.'
        },
        {
          name: 'When to Ride Which Bike',
          emoji: '🛣️🏁',
          desc: 'Ride the simple bike (sh) when squeezing into a tiny crawlspace (Alpine Docker container). Ride the electric bike (bash) for everyday heavy city hauling!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Classic Black "Boda Boda" Bicycle vs The 150cc Boxer Motorcycle',
      icon: '🇰🇪🏍️',
      summary:
        '“sh is the classic black village bicycle with a carrier rack; bash is the modern Bajaj Boxer motorcycle that powers Nairobi delivery logistics!”',
      points: [
        {
          name: 'The Black Village Bicycle (Boda Boda) = sh',
          emoji: '🚲🌾',
          desc: 'The traditional black single-gear bicycle in Western Kenya. Needs zero fuel, never breaks down, and every village fundi can fix it with a piece of wire.'
        },
        {
          name: 'The 150cc Boxer Motorcycle = bash',
          emoji: '🏍️📦',
          desc: 'Fast, carries 3 sacks of potatoes, climbs steep hills in 4th gear, and has LED indicators and electric starter.'
        },
        {
          name: 'Rope Tied on the Carrier vs Metal Top-Box = [ ] vs [[ ]]',
          emoji: '🪢📦',
          desc: 'In sh, items tied with sisal rope ([ ]) slip loose if you hit a pothole. In bash, the locked top-box ([[ ]]) secures everything watertight.'
        },
        {
          name: 'Delivery Pouch Compartments = Arrays in Bash',
          emoji: '🎒🍱',
          desc: 'The Boxer bike has side panniers for hot food, cold drinks, and parcel deliveries (arrays). The bicycle only has one flat rear rack.'
        },
        {
          name: 'Choosing Your Vehicle',
          emoji: '🛣️⛽',
          desc: 'Use the bicycle (sh) when crossing a narrow river footbridge with zero fuel. Take the motorcycle (bash) to deliver 50 orders across town!'
        }
      ]
    },
    somaticMove: {
      name: 'The Pedal vs Throttle Twist',
      action:
        'Mime slow steady pedal pumping with your feet ("sh = SIMPLE POSIX!"), then grab two motorcycle handles and twist your right wrist forward with a engine rev ("BASH = TURBO POWER!").',
      whyItWorks:
        'Contrasts the minimal endurance of basic POSIX sh with the feature-rich acceleration of modern bash scripting.'
    },
    quickTakeaway:
      'sh is the minimal 1979 POSIX baseline without arrays; bash is the rich GNU superset with [[ ]], arrays, string slicing, and arithmetic!'
  },

  // ==========================================================================
  // 17.6 BASIC OPERATORS IN BASH
  // ==========================================================================
  {
    id: 'basic-operators-in-bash',
    number: '17.6',
    title: 'Basic Operators in Bash (Arithmetic, Comparison, String & File Tests)',
    shortTitle: 'Operators in Bash',
    icon: '➕🔍',
    pastelBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    accentText: 'text-rose-950',
    badgeBg: 'bg-rose-100 text-rose-900',
    laymanHeadline:
      'Operators are the math calculators and comparison balance scales of Bash: calculate numbers with "$(( ))", compare quantities with "-eq" or "-gt", and inspect files with "-f" or "-d"!',
    laymanExplanation:
      'To make decisions and perform calculations, scripts use 4 essential categories of operators:\n• 1. Arithmetic Operators (Math with "$(( ... ))"):\n  Perform math using the double parentheses syntax: "$((A + B))", "$((A - B))", "$((A * B))", "$((A / B))" (integer division), and "$((A % B))" (remainder / modulo). Example: "TOTAL=$((PRICE * QUANTITY))".\n• 2. Numeric Comparison Operators (Used in [ ] and [[ ]]):\n  Bash uses letters instead of mathematical symbols for numbers:\n  - "-eq": Equal to ($A -eq $B)\n  - "-ne": Not equal to\n  - "-gt": Greater than ($A -gt 10)\n  - "-ge": Greater than or equal to\n  - "-lt": Less than ($A -lt 100)\n  - "-le": Less than or equal to\n• 3. String Comparison Operators:\n  Used to test words, passwords, and user input:\n  - "==": Strings are identical ("$PASSWORD" == "secret")\n  - "!=": Strings are not identical\n  - "-z": True if string is EMPTY (length is zero; e.g. [ -z "$INPUT" ])\n  - "-n": True if string is NOT empty\n• 4. File Test Operators (The SysAdmin Superpower!):\n  Check file characteristics before writing or deleting:\n  - "-f /path/file": True if file EXISTS and is a REGULAR file.\n  - "-d /path/dir": True if path EXISTS and is a DIRECTORY.\n  - "-e /path": True if path exists (file, folder, or socket).\n  - "-s /path": True if file exists and has size GREATER than 0 bytes.\n  - "-r", "-w", "-x": True if file is readable, writable, or executable by you!',
    laymanPoints: [
      {
        term: 'Arithmetic Expansion $((A + B))',
        meaning:
          'Evaluates mathematical calculations (+, -, *, /, %, **) natively inside bash without calling external tools.'
      },
      {
        term: 'Numeric Comparisons (-eq, -gt, -lt)',
        meaning:
          'Special flags used to compare integer values. Never use < or > inside single [ ] brackets as they trigger file redirection!'
      },
      {
        term: 'String Empty Check (-z vs -n)',
        meaning:
          '-z tests if a string is completely empty (zero characters); -n tests if a string contains at least one character.'
      },
      {
        term: 'File Exists & Type (-f vs -d)',
        meaning:
          '-f verifies that a path is a regular file; -d verifies that a path is a folder directory.'
      },
      {
        term: 'File Permissions (-r, -w, -x)',
        meaning:
          'Tests whether the active user running the script has permission to read, write, or execute the target file.'
      }
    ],
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Kitchen Measuring Spoons, Scales & Door Key Checkers',
      icon: '🏠⚖️',
      summary:
        '“Operators are the measuring tape, kitchen scale, and lock testing tools Chef Bash uses before cooking or opening doors!”',
      points: [
        {
          name: 'The Measuring Cup Math = Arithmetic $((A + B))',
          emoji: '🥛➕',
          desc: 'Pouring 2 cups of milk plus 3 cups of water into the pot to calculate a total of 5 cups ($((2 + 3))).'
        },
        {
          name: 'The Balance Scale = Numeric Comparison (-eq, -gt)',
          emoji: '⚖️🔢',
          desc: 'Placing weight on a scale to see if the flour bag is greater than 10 KG (-gt 10) before loading it onto the shelf.'
        },
        {
          name: 'The Empty Flour Tin = String Check (-z)',
          emoji: '🫙📭',
          desc: 'Tapping the tin with a wooden spoon. If it echoes hollow (-z), the container is empty and needs a refill!'
        },
        {
          name: 'Testing if the Front Door Exists = File Test (-f / -d)',
          emoji: '🚪🔍',
          desc: 'Knocking on a door to check if it is a solid wood pantry door (-f) or a large hallway corridor opening (-d).'
        },
        {
          name: 'Testing the Key in the Lock = Permission Test (-x)',
          emoji: '🔑✅',
          desc: 'Jiggling your key in the deadbolt to see if you have official permission to turn the handle and enter (-x).'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Everyday Analogy: The Weighbridge Inspector, Fuel Gauge & Security Gatekeeper',
      icon: '🇰🇪⛽',
      summary:
        '“Operators are the digital fuel gauge, axle load sensor, and estate security gate inspection padlocks!”',
      points: [
        {
          name: 'The Petrol Pump Total = Arithmetic $((LITERS * PRICE))',
          emoji: '⛽💵',
          desc: 'The digital pump multiplying 10 liters by 215 shillings to show a total of 2,150 KES on the display meter.'
        },
        {
          name: 'Mlolongo Weighbridge Sensor = Numeric Comparison (-gt 54T)',
          emoji: '🚛⚖️',
          desc: 'The truck drives onto the highway weighbridge. If total weight is greater than 54 tonnes (-gt 54), the alarm sounds and a fine is issued.'
        },
        {
          name: 'Empty Tank Warning Light = String Test (-z)',
          emoji: '🪫🚨',
          desc: 'The orange fuel light blinking on the matatu dashboard. If fuel level is zero (-z), you cannot start the journey to Nakuru.'
        },
        {
          name: 'Checking Estate Plot Boundary = File Test (-f vs -d)',
          emoji: '🧱🏡',
          desc: 'Looking at a Ruiru land plot to see if it is a completed stone house (-f) or an open building plot foundation (-d).'
        },
        {
          name: 'The Gated Community Security Padlock = Permission Test (-r, -w, -x)',
          emoji: '🔐👮',
          desc: 'The guard at the barrier arm checking whether your car has the estate resident sticker (-x) before lifting the gate.'
        }
      ]
    },
    somaticMove: {
      name: 'The Balance Scale & Door Knock',
      action:
        'Hold both hands out like an old balance scale tilting left and right ("-GT / -LT COMPARE!"), then knock on your desk twice like checking a sturdy wooden door ("-F FILE EXISTS!").',
      whyItWorks:
        'Connects the concept of relational comparisons to a physical balance scale, and file testing to physically rapping knuckles on a surface.'
    },
    quickTakeaway:
      'Do math with "$((A + B))". Compare numbers with "-eq/-gt/-lt". Test strings with "==/-z". Test files and directories with "-f/-d/-x"!'
  }
];
