// The 25 Basic Linux Commands (in exact 1-25 order requested by the user)
// Each command has:
// - Plain Layman Explanation
// - Original House Analogy (made extra simple)
// - Kenyan Everyday Analogy
// - 5-Second Body Move
// - Interactive Live House / Duka Action Output

export const basic25LinuxCommands = [
  {
    num: 1,
    cmd: 'ls',
    fullName: 'List',
    group: 'group-1-5',
    icon: '🔍',
    layman: 'Shows you all the files (items) and folders (doors) sitting inside your current room.',
    exampleCmd: 'ls',
    exampleMeaning: '“Look around this room and list everything you see.”',
    houseAnalogy:
      'Using a magnifying glass (or flipping on the room light) to see what items are on the floor and which doors lead to other rooms.',
    kenyanAnalogy:
      'Standing at a Mama Mboga stall or local duka counter and scanning all the tomatoes, onions, and packets of unga displayed on top of the table.',
    bodyMove: 'Make a circle with your fingers over one eye like a magnifying glass 🔍 and look left to right — say: "ls = Look & List!"',
    simActionTitle: '🔦 Flipped on the Magnifying Glass (ls)!',
    simVisualOutput: '📁 bedroom/   📁 kitchen/   📄 chapati_recipe.txt   🖼️ family_photo.jpg',
    simStory: 'Sam looked around the room and spotted 2 doors (bedroom, kitchen) and 2 items!'
  },
  {
    num: 2,
    cmd: 'pwd',
    fullName: 'Print Working Directory',
    group: 'group-1-5',
    icon: '⌚',
    layman: 'Tells you the exact address (folder path) of the room you are standing in right now.',
    exampleCmd: 'pwd',
    exampleMeaning: '“Where am I standing right now?” → Answers: /home/sam',
    houseAnalogy:
      'Glancing at your GPS wristwatch inside a big house to see which room you are currently standing in.',
    kenyanAnalogy:
      'Asking the matatu conductor "Tuko stage gani?" or checking your live WhatsApp location pin (/Nairobi/Kilimani/Yaya) before you alight.',
    bodyMove: 'Tap your wrist twice like checking a GPS watch ⌚ and point down at your feet — say: "pwd = Where am I standing?"',
    simActionTitle: '⌚ Checked Your GPS Watch (pwd)!',
    simVisualOutput: '/home/sam/living_room',
    simStory: 'Your GPS watch beeped: You are standing inside /home/sam/living_room!'
  },
  {
    num: 3,
    cmd: 'mkdir',
    fullName: 'Make Directory',
    group: 'group-1-5',
    icon: '🔨',
    layman: 'Builds a brand-new empty folder (room) so you can store things inside it.',
    exampleCmd: 'mkdir projects',
    exampleMeaning: '“Build a new empty room called projects.”',
    houseAnalogy:
      'Using a hammer and nails to build a brand-new room or cabinet in your house and putting a nameplate on the door.',
    kenyanAnalogy:
      'Calling a fundi to build a new wooden shelf in your duka or putting up a new room ("Simba") in the family homestead.',
    bodyMove: 'Hammer your fist gently onto your palm 3 times 🔨 — say: "mkdir = Make a New Room!"',
    simActionTitle: '🔨 Built a Brand-New Room (mkdir projects)!',
    simVisualOutput: '✅ Created new room: 📁 projects/ (Empty and ready for items!)',
    simStory: 'Clang, clang! Sam hammered together a fresh new room called "projects"!'
  },
  {
    num: 4,
    cmd: 'cd',
    fullName: 'Change Directory',
    group: 'group-1-5',
    icon: '👟',
    layman: 'Walks you out of your current folder and into another folder (room).',
    exampleCmd: 'cd kitchen   (or "cd .." to step back out)',
    exampleMeaning: '“Walk through the door into the kitchen room.”',
    houseAnalogy:
      'Turning the doorknob and walking into another room in the house. ("cd .." takes one step backward into the hallway; "cd ~" teleports straight to your bedroom!).',
    kenyanAnalogy:
      'Walking from the sitting room into the jiko kitchen—or saying "Rudi Nyumbani" (cd ~) to go straight back to your own house from anywhere in town!',
    bodyMove: 'Walk your index and middle fingers across the table like two little legs ✌️ — say: "cd = Walk into another room!"',
    simActionTitle: '👟 Walked Into the Room (cd kitchen)!',
    simVisualOutput: '🚶🏾‍♂️ You walked from /home/sam ➔ into /home/sam/kitchen!',
    simStory: 'Sam opened the kitchen door and stepped inside!'
  },
  {
    num: 5,
    cmd: 'rmdir',
    fullName: 'Remove Directory',
    group: 'group-1-5',
    icon: '🏗️',
    layman: 'Safely tears down a folder (room), ONLY if that room is completely empty inside.',
    exampleCmd: 'rmdir old_empty_shed',
    exampleMeaning: '“Demolish old_empty_shed, but only if nothing is inside it!”',
    houseAnalogy:
      'A polite wrecking ball with a safety sensor: it checks inside the room first, and if it sees even one sock on the floor, it refuses to knock the room down!',
    kenyanAnalogy:
      'Folding up an empty carton box or dismantling an empty market stall at the end of the day—you must remove all the tomatoes first before folding the stall!',
    bodyMove: 'Peek into your cupped hand 👀, blow it empty 💨, then clap it flat 👏 — say: "rmdir = Remove an EMPTY room!"',
    simActionTitle: '🏗️ Checked & Removed Empty Room (rmdir old_empty_shed)!',
    simVisualOutput: '✅ Verified room was empty ➔ Safely removed 📁 old_empty_shed!',
    simStory: 'Because old_empty_shed had zero files inside, rmdir neatly took it down!'
  },
  {
    num: 6,
    cmd: 'cat',
    fullName: 'Concatenate / Read File Aloud',
    group: 'group-6-10',
    icon: '📖',
    layman: 'Opens a text file and prints all the words inside it right onto your screen so you can read it quickly.',
    exampleCmd: 'cat grocery_list.txt',
    exampleMeaning: '“Read the entire grocery_list.txt note out loud on screen.”',
    houseAnalogy:
      'Unrolling a scroll or opening a recipe notebook and reading every line out loud to everyone in the room.',
    kenyanAnalogy:
      'Opening the duka’s "Deni Book" (credit notebook) or a WhatsApp message and reading the whole list of items out loud: "Unga 2, Maziwa 3, Sukari 1..."',
    bodyMove: 'Hold both hands open in front of your face like opening a storybook 📖 — say: "cat = Read the file out loud!"',
    simActionTitle: '📖 Read the Notebook Out Loud (cat grocery_list.txt)!',
    simVisualOutput: '1. Unga wa Dola (2kg)\n2. Sukuma Wiki (2 bunches)\n3. Kericho Gold Tea Leaves',
    simStory: 'Sam used cat to read the whole shopping list without needing to open a heavy editor!'
  },
  {
    num: 7,
    cmd: 'cp',
    fullName: 'Copy',
    group: 'group-6-10',
    icon: '🖨️',
    layman: 'Makes an exact duplicate copy of a file or folder so you have two of them.',
    exampleCmd: 'cp note.txt backup_note.txt',
    exampleMeaning: '“Photocopy note.txt and call the new copy backup_note.txt.”',
    houseAnalogy:
      'Putting a recipe card into a household photocopier machine: the original stays safe in your hand, and a twin copy comes out!',
    kenyanAnalogy:
      'Going to a local cybercafé ("Cyber") to photocopy your National ID or KCSE certificate—you keep your original ID and get a fresh copy!',
    bodyMove: 'Hold up 1 finger on your left hand ☝️, press palms together, and hold up 1 finger on BOTH hands ☝️☝️ — say: "cp = Photocopy twin!"',
    simActionTitle: '🖨️ Photocopied the File (cp note.txt backup_note.txt)!',
    simVisualOutput: '📄 note.txt (Original Kept!)  ➕  📄 backup_note.txt (New Twin Copy!)',
    simStory: 'Whirrrr! The photocopier made an exact duplicate so Sam has a safe backup!'
  },
  {
    num: 8,
    cmd: 'mv',
    fullName: 'Move / Rename',
    group: 'group-6-10',
    icon: '🚚',
    layman: 'Does two jobs: either moves an item from one room to another, OR changes the item’s name!',
    exampleCmd: 'mv sofa.txt /living_room/   (or mv old.txt new.txt)',
    exampleMeaning: '“Carry sofa.txt into the living room (or relabel old.txt to new.txt).”',
    houseAnalogy:
      'Carrying a chair from the bedroom into the kitchen (Moving), OR peeling off an old sticker on a jar and writing a new name on it (Renaming).',
    kenyanAnalogy:
      'Hiring a mkokoteni (handcart) or pick-up when shifting houses ("kuhama") to carry your sofa to the new house—there is still only ONE sofa, just in a new place!',
    bodyMove: 'Pretend to pick up a box on your left 📦 and set it down on your right — say: "mv = Move it or Rename it!"',
    simActionTitle: '🚚 Moved & Relabeled (mv draft.txt /kitchen/menu.txt)!',
    simVisualOutput: '📦 Picked up draft.txt ➔ Placed inside /kitchen as 📄 menu.txt!',
    simStory: 'Sam carried the file into the kitchen and gave it a fresh new name!'
  },
  {
    num: 9,
    cmd: 'rm',
    fullName: 'Remove / Delete File',
    group: 'group-6-10',
    icon: '🗑️',
    layman: 'Permanently deletes a file. Careful: Linux has NO Recycle Bin for rm—once it is gone, it is gone forever!',
    exampleCmd: 'rm old_receipt.txt',
    exampleMeaning: '“Shred old_receipt.txt permanently (No Undo!).”',
    houseAnalogy:
      'A powerful wood-chipper shredder bin with a red warning sign ⚠️: anything you drop inside turns into sawdust immediately with no undo button!',
    kenyanAnalogy:
      'Tossing an old piece of paper straight into a hot jiko fire 🔥—you cannot reach back into the charcoal to pull the paper out! (Tip: Use "rm -i" so it asks "Uko sure?" first!).',
    bodyMove: 'Pretend to crumple a piece of paper 🗞️, toss it away, and dust off your hands — say: "rm = Shred forever, be careful!"',
    simActionTitle: '🗑️ Shredded Old Trash (rm old_receipt.txt)!',
    simVisualOutput: '🔥 Poof! old_receipt.txt was permanently deleted from the shelf.',
    simStory: 'Sam carefully checked the filename first and shredded the unneeded receipt!'
  },
  {
    num: 10,
    cmd: 'uname',
    fullName: 'Unix Name / System Info',
    group: 'group-6-10',
    icon: '📐',
    layman: 'Shows you the official engineering stamp and version of your Linux house foundation (Kernel).',
    exampleCmd: 'uname -a',
    exampleMeaning: '“Show me all the details about this computer’s Linux foundation.”',
    houseAnalogy:
      'Checking the metal builder’s plaque on the house foundation wall that says when the house was built and which Kernel version holds it up.',
    kenyanAnalogy:
      'Opening the bonnet of a Toyota Hilux or checking the logbook sticker on the windshield to see the exact engine model and year of manufacture.',
    bodyMove: 'Salute or tap an imaginary badge on your chest 🪪 — say: "uname = Check the house foundation plaque!"',
    simActionTitle: '📐 Checked the House Foundation Plaque (uname -a)!',
    simVisualOutput: 'Linux sams-cottage 6.8.0-ubuntu-generic x86_64 GNU/Linux',
    simStory: 'The foundation plaque says: Linux Kernel 6.8 running on Sam’s 64-bit cottage!'
  },
  {
    num: 11,
    cmd: 'locate',
    fullName: 'Locate File by Name',
    group: 'group-11-15',
    icon: '🗂️',
    layman: 'Finds any file across the entire computer in a split second by checking a pre-made index book.',
    exampleCmd: 'locate pasport_photo.jpg',
    exampleMeaning: '“Check the master house index book and tell me every room that has passport_photo.jpg.”',
    houseAnalogy:
      'Instead of walking into 50 rooms one by one, you check the Master Household Index Binder at the front desk that lists where every item was last seen.',
    kenyanAnalogy:
      'Asking the supermarket attendant at Naivas "Where is ginger?" and they type it into their counter computer to instantly tell you: "Aisle 4, Shelf B!"',
    bodyMove: 'Run your finger quickly down your palm like scanning an index list 📋 and snap your fingers — say: "locate = Instant index search!"',
    simActionTitle: '🗂️ Checked the Instant Master Index (locate chapati)!',
    simVisualOutput: '📍 Found in 0.01s:\n/home/sam/kitchen/chapati_recipe.txt\n/home/sam/photos/chapati_fest.jpg',
    simStory: 'In less than a blink, the house index book pointed straight to both chapati files!'
  },
  {
    num: 12,
    cmd: 'touch',
    fullName: 'Touch / Create Blank File',
    group: 'group-11-15',
    icon: '📝',
    layman: 'Places a brand-new, empty blank sheet of paper (file) on the shelf, ready for you to write in later.',
    exampleCmd: 'touch shopping_list.txt',
    exampleMeaning: '“Place a fresh blank notebook called shopping_list.txt on the table.”',
    houseAnalogy:
      'Reaching out your hand to gently place a fresh, blank notebook on the desk (or tapping an existing notebook to update its "last touched" time stamp).',
    kenyanAnalogy:
      'Buying a fresh, unruled Kasuku exercise book at the bookshop and writing the subject name on the cover before the first lesson starts!',
    bodyMove: 'Gently tap the desk in front of you with one fingertip 👉 — say: "touch = Create a fresh blank file!"',
    simActionTitle: '📝 Placed a Fresh Blank Notebook (touch kasuku_notes.txt)!',
    simVisualOutput: '✨ Created 0-byte blank file: 📄 kasuku_notes.txt (Timestamp: Just Now)',
    simStory: 'Sam tapped the desk and a crisp, blank notebook appeared!'
  },
  {
    num: 13,
    cmd: 'ln',
    fullName: 'Link (Create Shortcut)',
    group: 'group-11-15',
    icon: '🪧',
    layman: 'Creates a handy shortcut signpost in one room that points straight to a file in another room.',
    exampleCmd: 'ln -s /kitchen/recipe.txt ~/recipe_shortcut',
    exampleMeaning: '“Put a sticky-note shortcut on my bedroom desk that opens the kitchen recipe.”',
    houseAnalogy:
      'Putting a sticky note on the living room table ("ln -s" = Soft Link) with an arrow saying "Click here to jump straight to the cookbook in the kitchen!"',
    kenyanAnalogy:
      'Putting a painted wooden signpost along the main road ("➔ Mama Oliech Hotel 100m Inside") that directs visitors straight to the real hotel without moving the building!',
    bodyMove: 'Hook your two index fingers together like a chain link 🔗 — say: "ln = Link & Shortcut Signpost!"',
    simActionTitle: '🪧 Placed a Shortcut Signpost (ln -s)!',
    simVisualOutput: '🔗 recipe_shortcut ➔ points straight to /home/sam/kitchen/chapati_recipe.txt!',
    simStory: 'Now Sam can open the kitchen recipe right from the bedroom without walking!'
  },
  {
    num: 14,
    cmd: 'clear',
    fullName: 'Clear Terminal Screen',
    group: 'group-11-15',
    icon: '🧹',
    layman: 'Wipes your cluttered terminal screen clean so you have a fresh, calm space to work—without deleting any of your actual files!',
    exampleCmd: 'clear',
    exampleMeaning: '“Wipe the chalkboard clean so my eyes can relax.”',
    houseAnalogy:
      'Taking a soft duster and wiping the kitchen chalkboard clean after writing lots of notes—your house and rooms are untouched, just the board is fresh!',
    kenyanAnalogy:
      'The class prefect wiping the blackboard clean with a duster between Maths and English lessons so the board isn’t confusing and crowded!',
    bodyMove: 'Wave your open hand Left-Right-Left in the air like wiping a blackboard 🧽 — say: "clear = Wipe the screen clean!"',
    simActionTitle: '🧹 Wiped the Chalkboard Clean (clear)!',
    simVisualOutput: '✨ [Fresh, calm, empty screen ready for your next thought!] ✨',
    simStory: 'Swish, swish! All the old text clutter vanished so Sam’s eyes feel calm and focused!'
  },
  {
    num: 15,
    cmd: 'ps',
    fullName: 'Process Status',
    group: 'group-11-15',
    icon: '⚙️',
    layman: 'Shows you a quick list of which programs (appliances/workers) are currently switched on and running.',
    exampleCmd: 'ps',
    exampleMeaning: '“Which appliances and helpers are actively working right now?”',
    houseAnalogy:
      'Checking the kitchen fridge chore chart to see which appliances are currently humming (e.g., PID 101: Butler Bash, PID 204: Music Player).',
    kenyanAnalogy:
      'The farm manager or restaurant boss checking who is currently on duty in the kitchen: "Cook #1 is frying mandazi, Cook #2 is boiling chai!"',
    bodyMove: 'Roll your forearms around each other like a spinning machine wheel ⚙️ — say: "ps = Which programs are running?"',
    simActionTitle: '⚙️ Checked Running Appliances List (ps)!',
    simVisualOutput: 'PID    TTY      TIME     CMD\n1042   pts/0    00:00:01 bash (Chef Butler)\n1189   pts/0    00:00:05 music_player',
    simStory: 'Sam checked the duty roster: Chef Bash and the Music Player are currently running!'
  },
  {
    num: 16,
    cmd: 'man',
    fullName: 'Manual Pages (Help Guide)',
    group: 'group-16-20',
    icon: '📘',
    layman: 'Opens the built-in instruction guidebook for ANY Linux command so you never have to memorize every option!',
    exampleCmd: 'man ls',
    exampleMeaning: '“Open the instruction manual book for the ls tool.”',
    houseAnalogy:
      'Pulling the official Owner’s Manual booklet off the shelf whenever you forget what a button on your microwave or tool does.',
    kenyanAnalogy:
      'Opening the little user leaflet inside a new phone box—or asking the friendly hardware shopkeeper "Hii kifaa inatumikaje?" (How do I use this tool?).',
    bodyMove: 'Tap your chin thoughtfully 🤔 then open your hands like reading a guidebook 📘 — say: "man = Open the User Manual!"',
    simActionTitle: '📘 Opened the Official Tool Manual (man ls)!',
    simVisualOutput: '📖 MANUAL FOR LS(1):\nName: ls - list directory contents\n-a : Show hidden files under the rug\n-l : Show long detailed list (Press Q to close manual)',
    simStory: 'Whenever Sam forgets a flag, typing "man [command]" opens the friendly manual!'
  },
  {
    num: 17,
    cmd: 'grep',
    fullName: 'Global Regular Expression Print (Word Hunter)',
    group: 'group-16-20',
    icon: '🕵️',
    layman: 'Hunts inside a big file (or long list) and highlights ONLY the lines that contain the exact word you are looking for!',
    exampleCmd: 'grep "milk" grocery_list.txt',
    exampleMeaning: '“Search inside grocery_list.txt and show me only the lines that mention milk.”',
    houseAnalogy:
      'A sharp-eyed detective with a yellow highlighter pen who scans a 500-page cookbook in 1 second and highlights only the lines that say "chocolate"!',
    kenyanAnalogy:
      'Looking for your cousin’s name on a 20-page printed Chama or Sacco members list—instead of reading every name, you run your finger down looking ONLY for "Onyango"!',
    bodyMove: 'Point your index finger like a detective spotting a clue 🎯 — say: "grep = Hunt for a word inside a file!"',
    simActionTitle: '🕵️ Detective Word-Hunt Complete (grep "chai" menu.txt)!',
    simVisualOutput: '🎯 Line 4: Masala Chai — Ksh 50\n🎯 Line 12: Tangawizi Chai — Ksh 40\n(Skipped 50 other lines that didn’t say "chai"!)',
    simStory: 'Instead of reading 50 lines, grep pulled out the exact 2 lines mentioning "chai"!'
  },
  {
    num: 18,
    cmd: 'echo',
    fullName: 'Echo / Speak Text Out',
    group: 'group-16-20',
    icon: '📢',
    layman: 'Repeats whatever message you type right back onto the screen (or writes that message onto a sticky note file!).',
    exampleCmd: 'echo "Karibu Nyumbani!"',
    exampleMeaning: '“Make the butler say Karibu Nyumbani! out loud on the screen.”',
    houseAnalogy:
      'Telling your friendly butler to announce a message out loud in the hallway—or using `echo "Buy milk" >> list.txt` to jot a quick note onto a paper!',
    kenyanAnalogy:
      'Shouting "Woooi!" across the valley in Kericho and hearing your exact voice bounce back—or a matatu tout calling out the stage message!',
    bodyMove: 'Cup both hands around your mouth like a megaphone 📣 — say: "echo = Repeat my message out loud!"',
    simActionTitle: '📢 Butler Announced Your Message (echo "Karibu Nyumbani!")!',
    simVisualOutput: '🗣️ Karibu Nyumbani!',
    simStory: 'Chef Bash smiled and echoed your exact words right onto the screen!'
  },
  {
    num: 19,
    cmd: 'wget',
    fullName: 'Web Get (Internet Downloader)',
    group: 'group-16-20',
    icon: '🛵',
    layman: 'Downloads a file or photo straight from an internet web link into your current room.',
    exampleCmd: 'wget https://example.com/menu.pdf',
    exampleMeaning: '“Go to the internet and bring menu.pdf straight to my room.”',
    houseAnalogy:
      'Ordering an item from an online catalog and having a delivery rider drop the package right inside your front door!',
    kenyanAnalogy:
      'Ordering supplies via a Glovo / Jumia boda-boda rider—you give them the shop link, and the rider brings the parcel straight to your compound gate!',
    bodyMove: 'Reach your hand up in the air and pull an imaginary parcel down to your desk 📦 — say: "wget = Grab it from the web!"',
    simActionTitle: '🛵 Boda Delivery Arrived From the Web (wget)!',
    simVisualOutput: '🌐 Connecting... 100% [===================>] Saved 📄 menu.pdf to your room!',
    simStory: 'Zoom! wget fetched the file from the internet and placed it neatly on your shelf!'
  },
  {
    num: 20,
    cmd: 'whoami',
    fullName: 'Who Am I?',
    group: 'group-16-20',
    icon: '🪪',
    layman: 'Tells you which user account you are currently logged in as (e.g., "sam" or "root").',
    exampleCmd: 'whoami',
    exampleMeaning: '“Check my name badge—who am I logged in as right now?”',
    houseAnalogy:
      'Looking down at the name badge pinned to your sweater to remember if you are currently wearing your normal "sam" badge or the "root" parent badge!',
    kenyanAnalogy:
      'Checking which M-Pesa agent till or staff account is currently signed in on the shop phone before serving a customer!',
    bodyMove: 'Point both thumbs at your own chest 😊 — say: "whoami = Check my own name tag!"',
    simActionTitle: '🪪 Looked at Your Name Tag (whoami)!',
    simVisualOutput: 'sam',
    simStory: 'Your name badge says: You are currently logged in as "sam"!'
  },
  {
    num: 21,
    cmd: 'sort',
    fullName: 'Sort Lines in Order',
    group: 'group-21-25',
    icon: '🔤',
    layman: 'Arranges a jumbled list of lines into neat A-to-Z alphabetical order (or 1-to-10 number order).',
    exampleCmd: 'sort names.txt',
    exampleMeaning: '“Arrange all the names in names.txt neatly from A to Z.”',
    houseAnalogy:
      'A helpful librarian who takes a messy stack of recipe cards or books and lines them up on the shelf from A (Apples) to Z (Zucchini).',
    kenyanAnalogy:
      'A teacher arranging class exam papers in alphabetical order from "Achieng" and "Baraza" all the way down to "Wanjiru" and "Zawadi"!',
    bodyMove: 'Mime moving 3 invisible blocks in the air into a neat stair-step row 📶 — say: "sort = Arrange A to Z!"',
    simActionTitle: '🔤 Arranged the List A-to-Z (sort guests.txt)!',
    simVisualOutput: 'Before: Zawadi, Amina, Kamau, Baraka\nAfter sort:\n1. Amina\n2. Baraka\n3. Kamau\n4. Zawadi',
    simStory: 'In an instant, sort lined up all the guest names neatly from A to Z!'
  },
  {
    num: 22,
    cmd: 'cal',
    fullName: 'Calendar',
    group: 'group-21-25',
    icon: '📅',
    layman: 'Pops up a neat little monthly calendar right inside your terminal so you can check today’s date or day of the week.',
    exampleCmd: 'cal',
    exampleMeaning: '“Show me this month’s wall calendar.”',
    houseAnalogy:
      'Glancing up at the paper calendar hanging on the kitchen wall to see which day of the week the 15th falls on.',
    kenyanAnalogy:
      'Checking the free wall calendar from the local bank or agrovet hanging in your sitting room to see when the next market day or public holiday is!',
    bodyMove: 'Draw a square in the air and tap a date in the middle 📅 — say: "cal = Check the Wall Calendar!"',
    simActionTitle: '📅 Glanced at the Kitchen Wall Calendar (cal)!',
    simVisualOutput: '    November 2026\nSu Mo Tu We Th Fr Sa\n 1  2  3  4  5  6  7\n 8 [9] 10 11 12 13 14\n15 16 17 18 19 20 21',
    simStory: 'A tidy calendar popped up right on the counter with today highlighted!'
  },
  {
    num: 23,
    cmd: 'whereis',
    fullName: 'Where Is This Tool Stored?',
    group: 'group-21-25',
    icon: '🗺️',
    layman: 'Tells you which toolbox room holds a specific command tool AND where its instruction manual is stored.',
    exampleCmd: 'whereis python',
    exampleMeaning: '“Which toolbox shelf holds the python tool and its manual?”',
    houseAnalogy:
      'Checking a treasure map of your house workshops that points to the exact shelf where a tool (`ls`, `python`, `grep`) and its manual book live.',
    kenyanAnalogy:
      'Asking the mechanic at a busy garage "Spanner namba 12 iko wapi?" and he points straight to the red metal toolbox on the wall!',
    bodyMove: 'Shade your eyes and point straight ahead to a distant spot 👉 — say: "whereis = Which toolbox holds this command?"',
    simActionTitle: '🗺️ Located the Tool & Its Manual (whereis ls)!',
    simVisualOutput: 'ls: /usr/bin/ls (The Tool)   /usr/share/man/man1/ls.1.gz (The Manual)',
    simStory: 'whereis showed Sam both the toolbox (/usr/bin/ls) and the manual shelf!'
  },
  {
    num: 24,
    cmd: 'df',
    fullName: 'Disk Free (Storage Space Check)',
    group: 'group-21-25',
    icon: '📊',
    layman: 'Shows you how full your computer’s storage drive is and how much free space you have left (Tip: `df -h` shows it in easy GB/MB!).',
    exampleCmd: 'df -h',
    exampleMeaning: '“How much free storage space is left in my house closets?”',
    houseAnalogy:
      'Opening your house storage closets and checking the gauge: "Closet 1 is 30% full (plenty of room!); Closet 2 is 90% full (time to tidy up!)."',
    kenyanAnalogy:
      'Climbing up to tap the black 5,000-litre Roto/Kentank water tank on the plot roof (or checking the maize granary / ghala) to see how much space is full and how much is empty!',
    bodyMove: 'Hold your hands wide apart 🙌 then bring them halfway together — say: "df = Check how much storage space is free!"',
    simActionTitle: '📊 Checked the House Storage Gauge (df -h)!',
    simVisualOutput: 'Filesystem      Size  Used  Avail  Use%\n/dev/sda1       100G   32G    68G   32% (Plenty of space left! 🟢)',
    simStory: 'Only 32% of the house storage is used—68 GB is still wide open!'
  },
  {
    num: 25,
    cmd: 'wc',
    fullName: 'Word Count (Lines, Words & Letters Counter)',
    group: 'group-21-25',
    icon: '🔢',
    layman: 'Counts how many lines, how many words, and how many characters are inside a file in one second!',
    exampleCmd: 'wc story.txt   (or "wc -l" for lines, "wc -w" for words)',
    exampleMeaning: '“Count the lines, words, and letters inside story.txt.”',
    houseAnalogy:
      'A fast-counting librarian who flips through a guestbook or story notebook and immediately tells you: "There are 10 lines, 45 words, and 260 letters!"',
    kenyanAnalogy:
      'Counting bags of maize loaded onto a lorry or counting how many guests signed the harambee visitor book (`wc -l guests.txt`) without losing track!',
    bodyMove: 'Tap your thumb to your 1st, 2nd, and 3rd fingers (1, 2, 3!) 🔢 — say: "wc = Count Lines, Words, and Letters!"',
    simActionTitle: '🔢 Counted Lines, Words & Letters (wc story.txt)!',
    simVisualOutput: '  12 Lines   |   85 Words   |   490 Characters   (story.txt)',
    simStory: 'In a flash, wc counted 12 lines and 85 words inside Sam’s story!'
  }
];

export const commandGroupsMeta = [
  {
    id: 'all',
    title: '🌟 All 25 Commands (1–25)',
    shortTitle: 'All 25',
    desc: 'See and click all 25 everyday tools side by side!'
  },
  {
    id: 'group-1-5',
    title: '🚪 #1–5: Room & Walking Tools',
    shortTitle: '#1–5 Rooms',
    desc: 'ls, pwd, mkdir, cd, rmdir — Looking, checking GPS, building rooms & walking!'
  },
  {
    id: 'group-6-10',
    title: '📄 #6–10: Paper, Moving & Blueprint',
    shortTitle: '#6–10 Files',
    desc: 'cat, cp, mv, rm, uname — Reading, photocopying, moving, trashing & blueprints!'
  },
  {
    id: 'group-11-15',
    title: '🧹 #11–15: Finding, Links & Tidying',
    shortTitle: '#11–15 Find & Tidy',
    desc: 'locate, touch, ln, clear, ps — Fast search, blank notes, shortcuts, wiping board & chores!'
  },
  {
    id: 'group-16-20',
    title: '🕵️ #16–20: Manuals, Hunting & Web',
    shortTitle: '#16–20 Search & Web',
    desc: 'man, grep, echo, wget, whoami — Manuals, word-hunting, speaking, web delivery & ID badge!'
  },
  {
    id: 'group-21-25',
    title: '📊 #21–25: Sorting, Calendar & Space',
    shortTitle: '#21–25 Organize & Count',
    desc: 'sort, cal, whereis, df, wc — A-to-Z sorting, calendar, tool finder, tank gauge & word count!'
  }
];
