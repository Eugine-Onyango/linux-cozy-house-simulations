// Topic 4: File Management & Permissions (5 Subtopics)
// 4.1 File Management
// 4.2 Directory Management
// 4.3 Permissions
// 4.4 Changing Permissions using chmod
// 4.5 Changing Ownership using chown

export const linuxTopic4Subtopics = [
  {
    id: 'file-management',
    number: '4.1',
    title: 'File Management (Creating, Copying, Moving & Deleting Files)',
    shortTitle: 'File Management',
    icon: '📄',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    laymanHeadline: 'Managing files in Linux is just like handling papers on your desk: create a blank sheet (touch), read it (cat), photocopy it (cp), move/rename it (mv), or shred it (rm)!',
    laymanExplanation:
      'Every day on a computer, you do 5 simple things with your files: create new ones, read what is inside them, make backup copies, move or rename them, and delete old ones you no longer need. Linux gives you 5 tiny, fast tools for these exact jobs—plus a magic Star shortcut (*) called a Wildcard that lets you grab dozens of matching files in 1 second!',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): Your 5-Tool Desk Organizer Kit',
      icon: '🏠🗂️',
      summary: '“Imagine standing at your study desk in Sam’s House with 5 everyday stationery tools right in front of you:”',
      points: [
        {
          name: '1. Create & Read: touch (Blank Notebook) & cat / tac (Read Aloud)',
          emoji: '📝📖',
          desc: '"touch note.txt" places a fresh blank page on your desk. "cat note.txt" reads it aloud from top to bottom (while "tac" — cat spelled backward! — reads it from the bottom line up to the top!).'
        },
        {
          name: '2. Duplicate & Move: cp (Photocopier) & mv (Furniture Mover / Relabeler)',
          emoji: '🖨️🚚',
          desc: '"cp a.txt b.txt" makes a photocopy twin so you have two files. "mv a.txt /kitchen/" carries the file into the kitchen, or "mv old.txt new.txt" peels off the old sticker and renames it!'
        },
        {
          name: '3. Delete Safely: rm (Wood-Chipper Shredder) & rm -i (Polite Safety Guard)',
          emoji: '🗑️⚠️',
          desc: '"rm file.txt" shreds a file permanently with NO Recycle Bin! Adding "-i" ("rm -i file.txt") puts a polite safety guard on the shredder who asks "Are you sure? (y/n)" before deleting.'
        },
        {
          name: '4. Bonus: Wildcard Star (*) = "All Items Matching This Pattern!"',
          emoji: '🌟🕵️',
          desc: '"cp *.jpg /photos/" means "Copy ALL files ending with .jpg into the photos room at once!" And any file starting with a dot (like ".secret") is a Hidden File tucked under the rug!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Running a Busy Local Cybercafé ("Cyber") & Duka Counter',
      icon: '🇰🇪🖨️',
      summary: '“Think of managing files like serving customers at a busy town Cybercafé and Duka:”',
      points: [
        {
          name: 'touch & cat = Opening a Fresh Kasuku Book & Reading the M-Pesa Statement',
          emoji: '📘📱',
          desc: '"touch" puts a new unruled Kasuku notebook on the counter. "cat" reads the customer’s statement from morning to night, while "tac" reads from the latest transaction at the bottom upward!'
        },
        {
          name: 'cp vs. mv = Kyocera Photocopy vs. Shifting with a Mkokoteni',
          emoji: '🖨️🛒',
          desc: '"cp" is photocopying a customer’s ID card on the Kyocera machine (they keep the original ID + get a new copy). "mv" is loading a sack onto a mkokoteni and moving it to the back store (still 1 sack, just in a new room or with a new label!).'
        },
        {
          name: 'rm vs. rm -i = Tossing Paper into a Hot Jiko Fire 🔥',
          emoji: '🔥🛑',
          desc: '"rm" throws an old receipt straight into the glowing charcoal jiko—no recovery! "rm -i" is your careful assistant asking "Boss, nichome hii karatasi kweli? (y/n)" before dropping it in!'
        },
        {
          name: 'Wildcard (*) = "Weka Picha Zote!" (Grab All Matching Files at Once)',
          emoji: '⚡📂',
          desc: 'Instead of copying 50 wedding photos one by one onto a flash disk, "cp *.jpg /flash" scoops every single photo ending in .jpg in one second!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Tap, Twin, Slide, Shred!"',
      instruction:
        'Act out the 4 core file actions with your hands in 5 seconds:',
      steps: [
        '1️⃣ Tap the table with 1 finger 👉 — say: "touch = Create a blank file!"',
        '2️⃣ Press palms together then open both hands 🤲 — say: "cp = Make a photocopy twin!"',
        '3️⃣ Slide both hands from Left to Right ➡️ — say: "mv = Move it or Rename it!"',
        '4️⃣ Cross your arms in a stop sign 🙅 — say: "rm -i = Ask me before shredding forever!"'
      ]
    },
    quickTakeaway: 'touch = Create blank | cat = Read | cp = Copy twin | mv = Move or Rename | rm = Delete forever (use rm -i to ask first!) | * = All matching files!'
  },
  {
    id: 'directory-management',
    number: '4.2',
    title: 'Directory Management (Building, Copying & Removing Rooms)',
    shortTitle: 'Directory Management',
    icon: '🏗️',
    pastelBg: 'bg-sky-50',
    borderColor: 'border-sky-300',
    accentText: 'text-sky-950',
    badgeBg: 'bg-sky-100 text-sky-900',
    laymanHeadline: 'Directories (folders) are rooms that hold items inside them—so to copy or delete a whole room with its furniture, you add the magic "-r" (Recursive / Whole-Room) flag!',
    laymanExplanation:
      'Managing folders (Directories) is almost like managing files, with one super important difference: a folder can have other folders and files sitting inside it! Because Linux wants to protect you from accidentally copying or deleting a room full of treasures by mistake, normal "cp" and "rm" will pause if you point them at a folder. To tell Linux "Yes, include the room AND everything inside it!", you add "-r" (or "-R", which stands for Recursive).',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The House Contractor’s Room Rules',
      icon: '🏡🔨',
      summary: '“How Sam builds, duplicates, and demolishes rooms in the Linux House:”',
      points: [
        {
          name: '1. Build One Room vs. Connected Rooms: mkdir vs. mkdir -p',
          emoji: '🔨🚪',
          desc: '"mkdir kitchen" builds 1 room. "mkdir -p house/kitchen/pantry" uses the magic "-p" (Parents) flag to build the outer hallway, the kitchen, and the pantry inside it all in one go!'
        },
        {
          name: '2. Copy a Whole Room & Its Furniture: cp -r',
          emoji: '📦🖨️',
          desc: 'You cannot push a whole room into a paper photocopier! You must use "cp -r kitchen backup_kitchen" ("-r" = Recursive) so the crew copies the room AND every shelf and item inside it.'
        },
        {
          name: '3. Move or Rename a Room: mv',
          emoji: '🏷️🚚',
          desc: '"mv old_room new_room" easily renames a room door or moves a room without needing any special flags!'
        },
        {
          name: '4. Demolish an Empty Room (rmdir) vs. A Full Room (rm -r)',
          emoji: '🏗️💥',
          desc: '"rmdir" is the polite bulldozer that ONLY removes a room if it is 100% empty. If you want to demolish a room AND all the files inside it at once, you use "rm -r room_name" (or "rm -rf" — extreme caution!).'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Building a Homestead ("mkdir -p") & Shifting a Whole Duka ("-r")',
      icon: '🇰🇪🏘️',
      summary: '“Think of a directory as a physical shop structure or cottage, and files as the goods inside:”',
      points: [
        {
          name: 'mkdir -p = Turnkey "Pamoja" Construction Plan',
          emoji: '🧱🏡',
          desc: 'When you type "mkdir -p boma/simba/stoo", the fundi doesn’t complain that "boma" isn’t built yet—the "-p" flag tells the fundi to build the main boma, the simba cottage inside it, and the store room all at once!'
        },
        {
          name: 'Why "-r" (Recursive) is Needed for cp -r and rm -r',
          emoji: '🚛📦',
          desc: 'Imagine telling a loader "Carry that duka!" They will ask: "Just the empty iron-sheet kiosk, or with all the unga, sugar, and shelves inside?" Adding "-r" means: "Pamoja na kila kitu ndani!" (Include the room and everything inside it!).'
        },
        {
          name: 'rmdir vs. rm -r = Folding an Empty Carton vs. Clearing a Full Store',
          emoji: '📦🧹',
          desc: '"rmdir" refuses to fold a carton box if there is still one packet of tea leaves inside. "rm -r" clears the box and everything inside it in one sweep!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Nest the Rooms (-p) & Hug the Whole Room (-r)!"',
      instruction:
        'Lock the two most famous directory flags (-p and -r) into your muscles:',
      steps: [
        '1️⃣ Stack your hands one ahead of the other (1 ➔ 2 ➔ 3) — say: "mkdir -p = Build Parent & Child rooms together!"',
        '2️⃣ Sweep both arms wide in a giant circle like hugging a whole room 🤗 — say: "-r (Recursive) = The room AND everything inside it!"'
      ]
    },
    quickTakeaway: 'mkdir = Build 1 room | mkdir -p = Build nested rooms at once | cp -r = Copy whole room | rmdir = Remove EMPTY room | rm -r = Remove room + everything inside!'
  },
  {
    id: 'permissions',
    number: '4.3',
    title: 'Permissions (Locks, Keys & The 10-Character Badge)',
    shortTitle: 'Permissions',
    icon: '🔐',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-900',
    laymanHeadline: 'Every file and folder has a 3-part lock that decides what the Owner (u), the Group (g), and Others (o) are allowed to do: Read (r=4), Write (w=2), or Execute (x=1)!',
    laymanExplanation:
      'When you run "ls -l" to inspect a room, Linux shows a 10-character badge next to every item, like "-rwxr-xr--". It looks like a secret code at first, but it is actually super simple! The first letter tells you if it is a file (-) or a directory (d). The next 9 letters are split into 3 trios of 3 letters each: Trio 1 is for the Owner (u), Trio 2 is for the Group (g), and Trio 3 is for Others (o)!',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): 3 Keyrings (Who) & 3 Lock Actions (What)',
      icon: '🔑🚪',
      summary: '“Every door and notebook in Sam’s House checks WHO is holding the key and WHAT they want to do:”',
      points: [
        {
          name: 'The 3 "WHO" Keyholders: User/Owner (u), Group (g), Others (o)',
          emoji: '👤👨‍👩‍👧🌍',
          desc: '• Owner (u) = Sam (the homeowner who created it).\n• Group (g) = Family members sharing a role badge.\n• Others (o) = Guests or strangers visiting from outside.'
        },
        {
          name: 'The 3 "WHAT" Actions: Read (r = 4), Write (w = 2), Execute (x = 1)',
          emoji: '👀✍️▶️',
          desc: '• Read (r = 4): Look at the book or peek inside the room.\n• Write (w = 2): Edit the book, or add/delete items in the room.\n• Execute (x = 1): Turn on/run an appliance (script), or walk through a room door!'
        },
        {
          name: 'How to Read "-rwxr-xr--" in 3 Seconds',
          emoji: '🔍🏷️',
          desc: '[-] = It’s a File (not a "d" directory) | [rwx] = Owner can Read, Write & Run | [r-x] = Group can Read & Run (no writing!) | [r--] = Others can only Read!'
        },
        {
          name: '3 Bonus VIP Locks: SUID (u+s), SGID (g+s), & Sticky Bit (+t)',
          emoji: '🌟🛡️',
          desc: '• SUID = Temporarily borrow the Owner’s key to run a tool (like changing your own password).\n• SGID = Every new item placed in a shared family room automatically belongs to the family group.\n• Sticky Bit (+t on /tmp) = On a shared bulletin board, anyone can pin a note, but ONLY you can delete your own note!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: M-Pesa Shop & Compound Access Rules (Owner, Staff Group, Wageni)',
      icon: '🇰🇪🔐',
      summary: '“Think of an M-Pesa shop or family shamba with 3 clear access levels:”',
      points: [
        {
          name: '1. Owner (u = Mwenye Duka): rwx (4 + 2 + 1 = 7)',
          emoji: '👑📒',
          desc: 'The shop owner can Read the float book (r=4), Write new records (w=2), and Operate the M-Pesa agent phone (x=1).'
        },
        {
          name: '2. Group (g = Trusted Shop Staff / Chama): r-x (4 + 0 + 1 = 5)',
          emoji: '🤝🏪',
          desc: 'The assistant can Read the price list (r=4) and Open the shop door to work (x=1), but cannot alter or erase the master contract (w=0)!'
        },
        {
          name: '3. Others (o = Customers / Wageni Outside): r-- (4 + 0 + 0 = 4)',
          emoji: '🚶🏾‍♂️🪧',
          desc: 'Customers standing outside the glass window can ONLY Read (r=4) the M-Pesa tariff poster—they cannot write on it or step behind the counter!'
        },
        {
          name: 'Sticky Bit (+t) = The Community Noticeboard at the Market!',
          emoji: '📌📋',
          desc: 'Anyone in the market can pin their poster on the public board (/tmp), but the askari ensures you can ONLY pull down your own poster—never your neighbor’s!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Hold Up 4 – 2 – 1 Fingers!"',
      instruction:
        'Use your fingers right now to memorize the permission numbers forever:',
      steps: [
        '1️⃣ Hold up 4 fingers 🖐️ and point to your eyes 👀 — say: "Read (r) = 4!"',
        '2️⃣ Hold up 2 fingers ✌️ like holding a pen ✍️ — say: "Write (w) = 2!"',
        '3️⃣ Hold up 1 finger ☝️ like pressing a power button ⚡ — say: "Execute (x) = 1! (4 + 2 + 1 = 7!)"'
      ]
    },
    quickTakeaway: 'Who: Owner (u), Group (g), Others (o) | What: Read (r=4), Write (w=2), Execute (x=1), None (-=0) | Total Full Access = 4+2+1 = 7!'
  },
  {
    id: 'chmod-command',
    number: '4.4',
    title: 'Changing Permissions using chmod (The Locksmith Tool)',
    shortTitle: 'chmod (Change Locks)',
    icon: '🛠️',
    pastelBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    accentText: 'text-purple-950',
    badgeBg: 'bg-purple-100 text-purple-900',
    laymanHeadline: 'chmod is the friendly Locksmith tool that adds or removes locks using either simple letters (chmod u+x) or 3-digit padlock numbers (chmod 755, chmod 700)!',
    laymanExplanation:
      'Whenever you create a new script that won’t run, or a private diary you want to hide from guests, you call "chmod" (Change Mode). You can give chmod instructions in two ways: the Letter Way (Symbolic Mode like "u+x" to add execute for the owner, or "o-w" to take away write from others) OR the 3-Digit Number Way (Octal Mode like "755" or "700" by adding 4 for Read, 2 for Write, and 1 for Execute).',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): Calling the Locksmith (Letters vs. 3-Digit Padlock)',
      icon: '🧰🔒',
      summary: '“Tell the House Locksmith (chmod) who gets keys to your cabinet!”',
      points: [
        {
          name: 'Way 1: The Easy Letter Way (u/g/o/a  + / - / =  r/w/x)',
          emoji: '🔤🔑',
          desc: '• "chmod u+x jump.sh" ➔ Give Owner (u) the power (+) to Run (x) the script!\n• "chmod g-w notes.txt" ➔ Take away (-) Write permission (w) from the Group (g).\n• "chmod o=r photo.jpg" ➔ Set (=) Guests/Others (o) to Read-only (r).'
        },
        {
          name: 'Way 2: The 3-Digit Padlock Number Way (4 + 2 + 1)',
          emoji: '🔢🔐',
          desc: 'Add 4 (Read) + 2 (Write) + 1 (Execute) for each of the 3 people [Owner][Group][Others]:\n• chmod 700 diary.txt ➔ Owner=7 (rwx), Group=0 (---), Others=0 (---) [Strictly Private!]\n• chmod 755 app.sh ➔ Owner=7 (rwx), Group=5 (r-x), Others=5 (r-x) [Standard App/Room!]\n• chmod 644 story.txt ➔ Owner=6 (rw-), Group=4 (r--), Others=4 (r--) [Standard Readable File!]'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Setting a 3-Wheel Brass Padlock on Your Duka or M-Pesa Till!',
      icon: '🇰🇪🔓',
      summary: '“Picture a 3-wheel combination padlock where Wheel 1 = You (Owner), Wheel 2 = Family/Staff (Group), and Wheel 3 = Wageni (Others):”',
      points: [
        {
          name: 'chmod 700 = "Siri Yangu Pekee!" (Private Safe Box)',
          emoji: '🤫🔐',
          desc: 'Wheel 1 is set to 7 (4+2+1 = Full access for You), Wheel 2 is 0 (Family locked out), Wheel 3 is 0 (Visitors locked out). Perfect for private PINs and secret notes!'
        },
        {
          name: 'chmod 755 = "Duka iko Wazi!" (Open Shop Display)',
          emoji: '🏪👀',
          desc: 'You (7) can restock and change prices; Staff (5 = 4+1) and Customers (5 = 4+1) can enter the shop and look at items, but nobody can rewrite your price book!'
        },
        {
          name: 'chmod +x = Plugging the Jiko / Blender into the Wall Socket!',
          emoji: '🔌⚡',
          desc: 'When you write a new script file, it starts unplugged (no "x"). Running "chmod +x script.sh" flips the switch ON so it can run like a machine!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Turn the Key (+x) & Flash 7-5-5!"',
      instruction:
        'Do these two quick hand moves so chmod is locked in forever:',
      steps: [
        '1️⃣ Pretend to turn a key in a lock 🔑 — say: "chmod +x turns a script ON!"',
        '2️⃣ Flash 7 fingers, then 5 fingers, then 5 fingers 🖐️ — say: "chmod 755 = 7 for Me (rwx), 5 for Group (r-x), 5 for Others (r-x)!"'
      ]
    },
    quickTakeaway: 'chmod changes locks! Symbolic: u/g/o/a + or - r/w/x (e.g. chmod u+x). Numeric (4+2+1): 700 (Private), 755 (Public App/Folder), 644 (Standard File)!'
  },
  {
    id: 'chown-command',
    number: '4.5',
    title: 'Changing Ownership using chown (Handing Over the Title Deed)',
    shortTitle: 'chown (Change Owner)',
    icon: '📜',
    pastelBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    accentText: 'text-rose-950',
    badgeBg: 'bg-rose-100 text-rose-900',
    laymanHeadline: 'While chmod changes the locks on a door, chown changes WHO OWNS the room or file (the Owner and the Group nameplate)!',
    laymanExplanation:
      'Sometimes Sam creates a file or folder, and then wants to give it to Alice so Alice becomes the rightful owner. That is what "chown" (Change Owner) does! Because transferring ownership is an official house rule, you usually put "sudo" in front of it: "sudo chown alice file.txt" makes Alice the new owner, and "sudo chown alice:developers file.txt" changes BOTH the owner (alice) and the group (developers) in one move!',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): Changing the Nameplate on a Bedroom Door',
      icon: '🏷️🏠',
      summary: '“chmod changes the keyhole; chown changes the Owner Nameplate on the door!”',
      points: [
        {
          name: '1. Change the Owner Only: sudo chown alice report.txt',
          emoji: '👩🏽📄',
          desc: 'Erases Sam’s name on the report.txt ownership tag and writes "alice" as the new owner!'
        },
        {
          name: '2. Change BOTH Owner and Group (with a colon ":"): sudo chown alice:family report.txt',
          emoji: '👩🏽👨‍👩‍👧',
          desc: 'The colon ":" separates the person from the group! Left of ":" is the new Owner (alice); right of ":" is the new Group (family).'
        },
        {
          name: '3. Transfer a Whole Room & Everything Inside It: sudo chown -R',
          emoji: '🏡📦',
          desc: 'Moving Alice into a bedroom full of furniture? Use "sudo chown -R alice:family /home/alice" so the room AND every single book and photo inside it now belong to Alice!'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Transferring a Car Logbook on NTSA TIMS or a Shamba Title Deed!',
      icon: '🇰🇪🚗',
      summary: '“Changing the car alarm is chmod; transferring the NTSA Logbook to a new buyer’s name is chown!”',
      points: [
        {
          name: 'chmod vs. chown = Padlock vs. Official Title Deed / Logbook',
          emoji: '📜🔑',
          desc: 'When you sell a Toyota Fielder or transfer a plot in Nakuru, you go to the registrar (sudo) and transfer the official ownership name: "sudo chown wanjiku fielder.txt"!'
        },
        {
          name: 'owner:group = Individual Owner + Sacco/Chama Name',
          emoji: '🚌🤝',
          desc: '"sudo chown kamau:supermetro bus.txt" registers Kamau as the individual owner AND SuperMetro as the Sacco group!'
        },
        {
          name: 'chown -R = Transferring the Shamba AND All Houses/Trees Inside It',
          emoji: '🌳🏡',
          desc: 'Adding "-R" (Recursive) ensures the title transfer covers the main plot folder plus every single cottage and crop inside that plot!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Hand Over the Logbook / Title Deed!"',
      instruction:
        'Feel the difference between chmod (locks) and chown (ownership) with your hands:',
      steps: [
        '1️⃣ Hold an imaginary Title Deed with both hands 📜 and hand it forward with a smile — say: "chown = Change the Owner!"',
        '2️⃣ Tap left hand ("Owner"), tap two fingers in the middle (":"), tap right hand ("Group") — say: "chown owner:group!"'
      ]
    },
    quickTakeaway: 'chmod = Changes the LOCKS (rwx / 755). chown = Changes the OWNER & GROUP nameplate (sudo chown alice:family file.txt, add -R for whole folder)!'
  }
];
