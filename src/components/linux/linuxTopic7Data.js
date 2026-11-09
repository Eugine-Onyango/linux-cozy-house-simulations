// ============================================================================
// TOPIC 7: USER AND GROUP MANAGEMENT (12 SUBTOPICS)
// Designed for: Kids, Seniors, Neurodivergent / ADHD Learners, Visual & Kinesthetic Minds
// Includes: Simple Layman English + Simplified House Analogy + Kenyan Analogy + 5-Sec Body Move
// ============================================================================

export const linuxTopic7Subtopics = [
  // --------------------------------------------------------------------------
  // SUBTOPIC 7.1: USER MANAGEMENT
  // --------------------------------------------------------------------------
  {
    id: 'user-management-overview',
    number: '7.1',
    title: 'User Management',
    shortTitle: '1. User Management',
    icon: '👨‍👩‍👧‍👦',
    badge: 'Who Lives in the House & Key Registers',
    plainEnglish:
      'In Linux, every person (and even background helper apps!) has their own user account. User Management means deciding who gets to live in the computer, what room number (UID) they get, where their personal bedroom folder (/home/username) is, and keeping the official house guestbook (/etc/passwd) and locked password vault (/etc/shadow) organized.',
    laymanPoints: [
      {
        term: 'Root User (UID 0 — The Superuser)',
        meaning:
          'The all-powerful Parent or Landlord of the system. Root has UID 0 and can enter any room, install anything, or demolish the whole house.'
      },
      {
        term: 'Regular Users (UID 1000+)',
        meaning:
          'Everyday family members or tenants (like sam, alice, wanjiku). Each gets their own private bedroom (/home/sam) and can only change their own things.'
      },
      {
        term: 'System / Service Accounts (UID 1–999)',
        meaning:
          'Silent household appliances (like the apache web server or mysql database) that run chores in the background and never log in like a human.'
      },
      {
        term: '/etc/passwd & /etc/shadow (Guestbook & Safe)',
        meaning:
          '/etc/passwd is the public House Guestbook listing every username, UID, GID, home folder, and shell. /etc/shadow is the locked steel safe that stores scrambled (encrypted) passwords.'
      },
      {
        term: 'usermod (Renovating a Resident’s Details)',
        meaning:
          'Changes an existing user’s settings: usermod -l renames their login, usermod -u changes their UID room number, and usermod -d moves their home bedroom.'
      }
    ],
    originalAnalogy: {
      title: '🏠 Original Analogy (Made Super Simple): Managing Family Members & The House Guestbook',
      intro:
        'Imagine your Linux computer is a big family house:',
      cards: [
        {
          emoji: '👑',
          name: 'Root (Parent) vs Regular Users (Kids) vs System Accounts (Appliances)',
          simple:
            'The Parent (root, Room #0) holds keys to the entire house. Kids (regular users, Room #1000+) have keys only to their own bedrooms (/home/alice). Appliances (system accounts) are the fridge and washing machine quietly doing their job.'
        },
        {
          emoji: '📖',
          name: '/etc/passwd = The Family Guestbook on the Hallway Table',
          simple:
            'Anyone in the house can read this book to see who lives here: "sam:x:1000:1000:Sam:/home/sam:/bin/bash" (Name : Password-in-Safe : Room UID : Main Badge GID : Note : Bedroom Path : Butler Shell).'
        },
        {
          emoji: '🔐',
          name: '/etc/shadow = The Locked Password Vault & /etc/skel = The Starter Bedroom Kit',
          simple:
            'Actual secret door codes are locked inside /etc/shadow so nobody can peek at them. And whenever a newcomer moves in, Linux copies default welcome furniture from /etc/skel into their new bedroom!'
        }
      ],
      takeaway:
        'User Management is simply keeping track of who lives in the house (/etc/passwd), locking their secret codes in the vault (/etc/shadow), and renovating their room details with usermod!'
    },
    kenyanAnalogy: {
      title: '🇰🇪 Kenyan Analogy: The Apartment Caretaker, Tenant Register & Nyumba Kumi Book',
      intro:
        'Picture a well-organized Kenyan residential apartment court in Nairobi or Eldoret:',
      cards: [
        {
          emoji: '🏢',
          name: 'Landlord (Root UID 0), Tenants (Regular Users 1000+) & Borehole Pump (System User)',
          simple:
            'The Landlord/Caretaker (root) has House #0 and master access. Tenants like Wanjiku (UID 1001) and Otieno (UID 1002) have their own private apartments (/home/wanjiku). The automatic borehole pump is a system account.'
        },
        {
          emoji: '📋',
          name: '/etc/passwd = The Gate Tenant Register Book',
          simple:
            'Lists every tenant’s name, House Number (UID), Chama/Group number (GID), apartment door (/home/wanjiku), and preferred language (/bin/bash).'
        },
        {
          emoji: '🛡️',
          name: '/etc/shadow = The Caretaker’s Locked Steel Safe',
          simple:
            'Stores every tenant’s scrambled secret gate PIN and expiry date so no visitor at the gate can ever read another person’s PIN!'
        }
      ],
      takeaway:
        'Just like an estate caretaker registers tenants in the gate book (/etc/passwd) and keeps PINs locked in the office safe (/etc/shadow), Linux keeps user records neat and secure!'
    },
    bodyMove: {
      title: '5-Second Body & Mind Move: Open the Guestbook, Lock the Safe!',
      instruction:
        'Open both palms flat like reading a big book ("/etc/passwd — The Public Guestbook!"), then clench both fists tight in front of your chest and twist an imaginary key ("/etc/shadow — The Locked Password Safe!").',
      whyItWorks:
        'Contrasting open palms (/etc/passwd is readable) with locked fists (/etc/shadow is locked tight) makes the two most famous Linux user files unforgettable.'
    },
    quickTakeaway:
      'Users have a UID (0 = root, 1000+ = regular users). Public user info lives in /etc/passwd, encrypted passwords live in /etc/shadow, and usermod updates a user’s details.'
  },

  // --------------------------------------------------------------------------
  // SUBTOPIC 7.2: CREATING USERS
  // --------------------------------------------------------------------------
  {
    id: 'creating-users-useradd',
    number: '7.2',
    title: 'Creating Users (`useradd`)',
    shortTitle: '2. Creating Users (useradd)',
    icon: '🏗️',
    badge: 'Fast Command-Line Room Contractor',
    plainEnglish:
      'When you want to create a new user quickly with a single command (or inside an automated script), you use `sudo useradd`. Think of `useradd` as a fast, silent construction contractor: you hand him a blueprint with flags (like `-m` to build the home bedroom, `-s` to pick the shell, or `-c` to write a nameplate), and he builds the account in one second without asking any questions!',
    laymanPoints: [
      {
        term: 'sudo useradd -m username (Build User + Home Bedroom)',
        meaning:
          'Creates the user and (-m) builds their personal bedroom folder at /home/username, copying starter files from /etc/skel.'
      },
      {
        term: '-c "Full Name" & -s /bin/bash',
        meaning:
          '-c writes a friendly nameplate comment on their door (e.g., "Alice Wanjiku"), and -s picks their default butler shell (like /bin/bash).'
      },
      {
        term: '-u 1500, -g group, -G extra_groups',
        meaning:
          '-u sets a custom Room Number (UID), -g sets their Primary Group badge, and -G pins extra Secondary Group badges on their shirt.'
      },
      {
        term: '-d /custom/path & -e YYYY-MM-DD',
        meaning:
          '-d builds their bedroom in a custom location, and -e sets an expiration date (great for temporary interns or visitors!).'
      }
    ],
    originalAnalogy: {
      title: '🏠 Original Analogy (Made Super Simple): The Silent Express Room Contractor (`useradd`)',
      intro:
        'Imagine hiring a super-fast contractor named `useradd` to build a new bedroom in your house:',
      cards: [
        {
          emoji: '👷',
          name: 'Silent & Instant (Follows Your Blueprint Flags)',
          simple:
            '`useradd` does not stop to chat. If you say `sudo useradd -m -s /bin/bash -c "Bob Builder" bob`, he immediately builds `/home/bob`, puts `/bin/bash` inside, writes "Bob Builder" on the door, and finishes!'
        },
        {
          emoji: '🛏️',
          name: 'Don’t Forget `-m` (Build the Bedroom!) & `passwd` (Set the Door Code!)',
          simple:
            'On some Linux systems, plain `useradd bob` registers Bob’s name in the guestbook without building a bedroom (`-m` guarantees the `/home/bob` room is built). And the door starts locked until you run `sudo passwd bob`!'
        }
      ],
      takeaway:
        '`useradd` is the fast, silent contractor who builds a user account in one line using blueprint flags like `-m`, `-s`, `-c`, `-u`, and `-e`!'
    },
    kenyanAnalogy: {
      title: '🇰🇪 Kenyan Analogy: Giving the Estate Fundi a Written Blueprint (`useradd`)',
      intro:
        'Think of handing a written work order to an experienced Kenyan mjengo fundi:',
      cards: [
        {
          emoji: '🧱',
          name: 'One Written Instruction = Job Done Silently',
          simple:
            'You write on a slip: `sudo useradd -m -c "Kamau Shop" -s /bin/bash kamau`. The fundi doesn’t ask you 10 questions — he builds room `/home/kamau` (`-m`), paints "Kamau Shop" on the door (`-c`), and hands you the receipt!'
        },
        {
          emoji: '⏳',
          name: 'Temporary Intern Pass (`-e 2026-12-31`)',
          simple:
            'If a college attaché joins your Nairobi office for 3 months, adding `-e 2026-12-31` automatically deactivates their gate pass on December 31st!'
        }
      ],
      takeaway:
        'When you want speed, custom flags, or automation in scripts, `sudo useradd -m` is your go-to fundi!'
    },
    bodyMove: {
      title: '5-Second Body & Mind Move: Hammer the Blueprint!',
      instruction:
        'Tap your fist three times on your palm like hammering a nail ("useradd! -m for bedroom! -s for shell!") and give a sharp nod ("Done in one line!").',
      whyItWorks:
        'The fast 3-tap hammer motion links `useradd` with silent, one-line construction using flags.'
    },
    quickTakeaway:
      'Use `sudo useradd -m -s /bin/bash -c "Name" username` to create a user and their `/home` folder in one fast command, then set their password with `sudo passwd username`.'
  },

  // --------------------------------------------------------------------------
  // SUBTOPIC 7.3: CREATING USERS INTERACTIVELY
  // --------------------------------------------------------------------------
  {
    id: 'creating-users-interactively-adduser',
    number: '7.3',
    title: 'Creating Users Interactively (`adduser`)',
    shortTitle: '3. Interactive Users (adduser)',
    icon: '🛎️',
    badge: 'Friendly Step-by-Step Receptionist',
    plainEnglish:
      'Don’t want to memorize flags like `-m`, `-s`, or `-c`? On Debian and Ubuntu systems, `sudo adduser username` acts like a warm, friendly hotel receptionist! When you run it, it automatically creates the user, builds `/home/username`, sets the `/bin/bash` shell, asks you to type a password right away, and politely asks for their Full Name, Room Number, and Phone Number step by step.',
    laymanPoints: [
      {
        term: 'sudo adduser username (The Friendly Wizard)',
        meaning:
          'A high-level interactive script (powered by Perl around useradd) that guides you through creating a user with friendly questions.'
      },
      {
        term: 'What adduser Does Automatically',
        meaning:
          '1) Assigns the next UID & primary group, 2) Creates /home/username and copies /etc/skel, 3) Sets /bin/bash as shell, 4) Prompts you for the password twice, and 5) Asks for Full Name & contact info.'
      },
      {
        term: 'useradd vs adduser — What’s the Difference?',
        meaning:
          'useradd is the low-level silent tool that needs flags (-m, -s) and is universal across all distros. adduser (on Debian/Ubuntu) is the friendly interactive questionnaire that does everything for you!'
      }
    ],
    originalAnalogy: {
      title: '🏠 Original Analogy (Made Super Simple): The Friendly Hotel Receptionist (`adduser`)',
      intro:
        'Compare the silent contractor (`useradd`) with a warm, smiling Front-Desk Receptionist (`adduser`):',
      cards: [
        {
          emoji: '🛎️',
          name: 'Asks Polite Questions One by One',
          simple:
            'You only type `sudo adduser alice`. The receptionist smiles and says: "Building `/home/alice`! Now please type Alice’s new door password... Great! What is Alice’s Full Name? Room Number? Work Phone? Is this information correct? [Y/n]"'
        },
        {
          emoji: '✨',
          name: 'Ready to Move In Immediately',
          simple:
            'Because `adduser` builds the bedroom AND asks for the password during the conversation, Alice can log into her room the very second you press `Y`!'
        }
      ],
      takeaway:
        '`adduser` is the friendly interactive receptionist who builds the bedroom, sets the password, and fills out the nameplate by asking you simple questions!'
    },
    kenyanAnalogy: {
      title: '🇰🇪 Kenyan Analogy: The Warm Huduma Centre / Sacco Customer Care Desk (`adduser`)',
      intro:
        'Imagine opening a new account at a friendly Kenyan Sacco or Huduma Centre desk:',
      cards: [
        {
          emoji: '😊',
          name: 'Guided Step-by-Step Registration',
          simple:
            'Instead of leaving you to fill out complicated codes alone, the attendant (`sudo adduser wanjiku`) opens your file, sets up your folder, asks you to key in your secret PIN twice, asks for your Full Name and Phone Number, and confirms: "Is everything correct? [Y/n]"'
        },
        {
          emoji: '🤝',
          name: 'Zero Forgotten Steps',
          simple:
            'You never accidentally forget to build the `/home/wanjiku` room or forget to set a PIN, because the attendant walks you through every step!'
        }
      ],
      takeaway:
        'For everyday humans on Ubuntu/Debian, `sudo adduser username` is the easiest, friendliest way to welcome a new user!'
    },
    bodyMove: {
      title: '5-Second Body & Mind Move: Ring the Receptionist Bell!',
      instruction:
        'Tap one finger down ("Ding! Ring the hotel bell — adduser!"), hold an imaginary microphone to your mouth ("What is your password? What is your full name?"), and give a big thumbs-up ("Y for Yes!").',
      whyItWorks:
        'Acting out the receptionist’s Q&A conversation makes it impossible to confuse interactive `adduser` with silent `useradd`.'
    },
    quickTakeaway:
      '`useradd` = silent contractor (needs flags like `-m` + separate `passwd`). `adduser` = friendly interactive wizard that builds `/home`, asks for the password, and fills in user details automatically!'
  },

  // --------------------------------------------------------------------------
  // SUBTOPIC 7.4: DELETING USERS
  // --------------------------------------------------------------------------
  {
    id: 'deleting-users-userdel',
    number: '7.4',
    title: 'Deleting Users (`userdel` & `deluser`)',
    shortTitle: '4. Deleting Users',
    icon: '🚚',
    badge: 'Moving Out Safely',
    plainEnglish:
      'When someone leaves your house or company, you remove their user account using `sudo userdel` (or `sudo deluser` on Ubuntu/Debian). You have an important choice: do you just cross their name out of the guestbook while keeping their bedroom files safe for review, or do you add `-r` (`sudo userdel -r username`) to demolish their `/home/username` bedroom and mail spool completely?',
    laymanPoints: [
      {
        term: 'sudo userdel username (Keep Bedroom Files)',
        meaning:
          'Removes the user from `/etc/passwd`, `/etc/shadow`, and `/etc/group`, so they can no longer log in — BUT leaves `/home/username` intact on the disk.'
      },
      {
        term: 'sudo userdel -r username (Remove User + Bedroom)',
        meaning:
          'The `-r` (remove) flag deletes the user account AND permanently deletes their `/home/username` directory and `/var/mail/username`.'
      },
      {
        term: 'deluser & --remove-home (Debian/Ubuntu Friendly Tool)',
        meaning:
          'On Debian/Ubuntu, you can also run `sudo deluser username` (keeps home) or `sudo deluser --remove-home username` (removes home).'
      }
    ],
    originalAnalogy: {
      title: '🏠 Original Analogy (Made Super Simple): Crossing Name Off Guestbook vs Clearing the Bedroom',
      intro:
        'Imagine a guest or family member moving out of your Linux house:',
      cards: [
        {
          emoji: '📝',
          name: 'Plain `sudo userdel bob` = Take Back Key, Keep Room Intact',
          simple:
            'You erase Bob from the house guestbook so he cannot open the front door anymore, but all his notebooks and photos inside `/home/bob` stay untouched so you can archive them.'
        },
        {
          emoji: '🚜',
          name: '`sudo userdel -r bob` = Take Back Key AND Empty the Bedroom',
          simple:
            'Adding `-r` tells the moving crew to erase Bob from the guestbook AND completely clear out his `/home/bob` bedroom and mailbox!'
        }
      ],
      takeaway:
        'Use `userdel username` when you still need their old files, and `userdel -r username` when you want their account and `/home` folder completely gone!'
    },
    kenyanAnalogy: {
      title: '🇰🇪 Kenyan Analogy: Tenant Vacating the Plot (`userdel` vs `userdel -r`)',
      intro:
        'Think of a tenant moving out of an estate plot in Kasarani:',
      cards: [
        {
          emoji: '🔑',
          name: '`sudo userdel otieno` = Deactivate Gate Pass, Keep Items Stored',
          simple:
            'The caretaker crosses Otieno out of the gate book so he cannot enter, but keeps his room (`/home/otieno`) locked until the office checks the company laptops he left inside.'
        },
        {
          emoji: '🧹',
          name: '`sudo userdel -r otieno` = Full Move-Out & Sweep Clean (`-r`)',
          simple:
            'The `-r` flag means the canter lorry has carried everything away and the caretaker sweeps `/home/otieno` completely empty and ready for the next tenant!'
        }
      ],
      takeaway:
        'Remember `-r` = **R**emove **R**oom! Without `-r`, only the login name is removed while `/home/username` stays behind.'
    },
    bodyMove: {
      title: '5-Second Body & Mind Move: Cross Out vs Sweep Out!',
      instruction:
        'Draw a single X in the air with one finger ("userdel — cross name off the list!"), then sweep both arms wide ("userdel -r — sweep the whole bedroom clean!").',
      whyItWorks:
        'Separating the finger cross-out (`userdel`) from the two-arm room sweep (`userdel -r`) makes the `-r` flag crystal clear.'
    },
    quickTakeaway:
      '`sudo userdel username` removes the user login but keeps `/home/username`. `sudo userdel -r username` deletes the user login AND their `/home/username` folder!'
  },

  // --------------------------------------------------------------------------
  // SUBTOPIC 7.5: MANAGING USER PASSWORDS
  // --------------------------------------------------------------------------
  {
    id: 'managing-user-passwords-passwd',
    number: '7.5',
    title: 'Managing User Passwords (`passwd` & `chage`)',
    shortTitle: '5. Managing Passwords',
    icon: ' 🔐',
    badge: 'The House Locksmith',
    plainEnglish:
      'The `passwd` command is your house locksmith! Regular users can type `passwd` by itself to change their own secret door code. Administrators can type `sudo passwd username` to reset anyone’s forgotten password, lock a door temporarily (`-l`), unlock it (`-u`), force a user to pick a new password on their next login (`-e`), or set an expiry timer (`-x 30`).',
    laymanPoints: [
      {
        term: 'passwd vs sudo passwd username',
        meaning:
          '`passwd` changes YOUR OWN password (asks for your old password first). `sudo passwd alice` lets the admin reset Alice’s password WITHOUT needing her old password.'
      },
      {
        term: 'sudo passwd -l & sudo passwd -u (Lock & Unlock Account)',
        meaning:
          '`-l` puts a temporary padlock (`!` in `/etc/shadow`) on a user’s account so they cannot log in. `-u` removes the padlock and lets them back in.'
      },
      {
        term: 'sudo passwd -e username (Expire Immediately)',
        meaning:
          'Forces the user to choose a brand-new password the very next time they log in (great after giving a new employee a temporary starter password!).'
      },
      {
        term: 'sudo passwd -x 30 & chage -l username (Password Aging)',
        meaning:
          '`passwd -x 30` makes the password expire every 30 days. `chage -l username` inspects all password expiration dates on a user’s card.'
      }
    ],
    originalAnalogy: {
      title: '🏠 Original Analogy (Made Super Simple): The Master Locksmith Station (`passwd`)',
      intro:
        'Imagine the house locksmith who manages the digital keypad on every bedroom door:',
      cards: [
        {
          emoji: '🔢',
          name: 'Resetting a Forgotten Code (`sudo passwd alice`)',
          simple:
            'If Alice forgets her bedroom code, the Parent doesn’t need to guess her old code — they just call `sudo passwd alice` and program a fresh code into `/etc/shadow`!'
        },
        {
          emoji: '🔒',
          name: 'Holiday Padlock (`-l` / `-u`) & First-Day Reset (`-e`)',
          simple:
            'If Charlie goes on a 2-month trip, `sudo passwd -l charlie` snaps a red safety lock onto his door. When he returns, `sudo passwd -u charlie` unlocks it! And `-e` tells Bob: "Change your temporary code as soon as you step inside!"'
        }
      ],
      takeaway:
        '`passwd` is the locksmith who updates encrypted codes in `/etc/shadow`, locks/unlocks accounts (`-l`/`-u`), and sets expiration rules (`-e`/`-x`)!'
    },
    kenyanAnalogy: {
      title: '🇰🇪 Kenyan Analogy: M-Pesa / Bank PIN Reset, Temporary Block & First-Time PIN Change',
      intro:
        'Think of how Safaricom M-Pesa or your Kenyan bank app handles secret PINs:',
      cards: [
        {
          emoji: '📱',
          name: 'Customer Care Reset (`sudo passwd`) + Force New PIN (`passwd -e`)',
          simple:
            'When you forget your PIN, Safaricom resets it (`sudo passwd wanjiku`) and sends a one-time starter PIN that forces you to choose your own secret PIN the moment you open the menu (`sudo passwd -e wanjiku`)!'
        },
        {
          emoji: '🛑',
          name: 'Temporarily Freezing & Unfreezing an Line (`-l` and `-u`)',
          simple:
            '`sudo passwd -l` freezes the account temporarily if someone is away on leave, and `sudo passwd -u` unfreezes it when they return to work!'
        }
      ],
      takeaway:
        'Never edit `/etc/shadow` by hand — always let the `passwd` locksmith safely scramble and manage PINs for you!'
    },
    bodyMove: {
      title: '5-Second Body & Mind Move: Punch the Keypad, Snap the Lock!',
      instruction:
        'Tap four imaginary buttons in the air ("Beep-boop-beep-boop — passwd!"), click an imaginary padlock shut ("-l locks it!"), then pull it open ("-u unlocks it!").',
      whyItWorks:
        'The keypad + padlock hand motion connects `passwd` with both changing codes and locking/unlocking accounts (`-l` / `-u`).'
    },
    quickTakeaway:
      '`passwd` changes your own password; `sudo passwd user` resets a user’s password; `-l` locks, `-u` unlocks, `-e` forces reset on next login, and `-x DAYS` sets expiry.'
  },

  // --------------------------------------------------------------------------
  // SUBTOPIC 7.6: VIEWING USER INFORMATION
  // --------------------------------------------------------------------------
  {
    id: 'viewing-user-information',
    number: '7.6',
    title: 'Viewing User Information (`id`, `who`, `w`, `last`, `awk`)',
    shortTitle: '6. Viewing User Info',
    icon: '🪪',
    badge: 'ID Scanner, Sign-In Book & Librarian',
    plainEnglish:
      'How do you check who a user is, who is inside the house right now, or who visited last week? Linux gives you a Security Guard ID scanner (`id` and `whoami`), a Live Hallway Camera (`who` and `w`), a Visitor History Logbook (`last`), and a Smart Librarian (`awk`) who can scan `/etc/passwd` and pull out clean lists of usernames!',
    laymanPoints: [
      {
        term: 'id username (Official ID Card Scanner)',
        meaning:
          'Shows a user’s UID (room number), primary GID (main role badge), and all secondary groups. Flags: `-u` (UID only), `-g` (primary GID), `-G` (all GIDs), `-n` (show names instead of numbers).'
      },
      {
        term: 'whoami, who, and w (Who Is Here Right Now?)',
        meaning:
          '`whoami` tells you your own current username. `who` lists everyone currently logged into the house. `w` shows who is logged in AND what chore/command they are running right now!'
      },
      {
        term: 'last (The Front-Door Visitor History Book)',
        meaning:
          'Reads the login history log to show who logged in recently, when they arrived, and when they logged out.'
      },
      {
        term: "awk -F: '{print $1}' /etc/passwd (The Smart Librarian)",
        meaning:
          'Uses `:` as the column splitter (`-F:`) to read `/etc/passwd` and print only column 1 (all usernames) or filter regular human users (`$3 >= 1000`).'
      }
    ],
    originalAnalogy: {
      title: '🏠 Original Analogy (Made Super Simple): The Security Guard (`id`), Hallway Monitor (`w`) & Librarian (`awk`)',
      intro:
        'In your Linux house, four friendly helpers answer any question about residents:',
      cards: [
        {
          emoji: '👮',
          name: 'The ID Card Scanner (`id alice` / `id -nG alice`)',
          simple:
            'Swipe Alice’s card at the desk: `uid=1001(alice) gid=1001(alice) groups=1001(alice),1002(cooks),27(sudo)`. Add `-u` for just her room number or `-nG` for just her badge names!'
        },
        {
          emoji: '📹',
          name: 'Live Hallway Monitor (`who` & `w`) & History Book (`last`)',
          simple:
            '`who` shows who is inside the house right now. `w` shows who is inside AND what appliance they are using right now. `last` shows everyone who visited this month!'
        },
        {
          emoji: '📚',
          name: 'The Guestbook Librarian (`awk -F:`)',
          simple:
            'Instead of reading messy colon-separated lines in `/etc/passwd`, ask the Librarian: `awk -F: \'$3 >= 1000 {print $1}\' /etc/passwd` — "Show me only the names of human family members!"'
        }
      ],
      takeaway:
        'Use `id` for ID cards, `who`/`w` for who is online right now, `last` for past visits, and `awk -F:` to neatly filter the guestbook!'
      },
    kenyanAnalogy: {
      title: '🇰🇪 Kenyan Analogy: Kipande Scanner (`id`), Office Attendance Register (`who`/`w`) & Gate Logbook (`last`)',
      intro:
        'Picture the security desk at a busy Nairobi commercial building or university campus:',
      cards: [
        {
          emoji: '🪪',
          name: 'Scanning the National ID / Staff Badge (`id wanjiku`)',
          simple:
            'The askari scans Wanjiku’s badge (`id wanjiku`) and immediately sees her Staff Number (`uid=1001`), main department (`gid=1001`), and all committees she belongs to (`groups=...`).'
        },
        {
          emoji: '📖',
          name: 'Today’s Sign-In Sheet (`who` / `w`) vs Past Month’s Gate Book (`last`)',
          simple:
            '`who` shows who is inside the building right now; `w` shows which desk and computer program they are actively typing on; `last` flips back through the gate book to see who entered yesterday or last Friday!'
        }
      ],
      takeaway:
        'Whether checking one person’s Kipande (`id`), seeing who is on shift (`w`), or filtering the master register (`awk`), you always have full visibility!'
    },
    bodyMove: {
      title: '5-Second Body & Mind Move: Flash Your ID Badge & Look Around!',
      instruction:
        'Hold an imaginary ID badge up to your chest ("id — check my card!"), shade your eyes with your hand and look left and right ("who & w — who is in the room right now?"), then thumb over your shoulder ("last — who was here yesterday?").',
      whyItWorks:
        'Chest badge (`id`) + looking around now (`who`/`w`) + pointing back in time (`last`) anchors all three inspection tools in 5 seconds.'
    },
    quickTakeaway:
      '`id` shows UID/GID/groups; `who` & `w` show who is logged in right now; `last` shows login history; `awk -F: \'{print $1}\' /etc/passwd` lists all usernames.'
  },

  // --------------------------------------------------------------------------
  // SUBTOPIC 7.7: GROUP MANAGEMENT
  // --------------------------------------------------------------------------
  {
    id: 'group-management-overview',
    number: '7.7',
    title: 'Group Management',
    shortTitle: '7. Group Management',
    icon: '🏷️',
    badge: 'Team Role Badges & Shared Rooms',
    plainEnglish:
      'Imagine having 50 people in your house or company: unlocking the kitchen door for each person one by one would take forever! Instead, Linux uses **Groups** (Role Badges). You put a "Cooks" lock on the kitchen door once, and then anyone wearing the **cooks** badge automatically gets inside! Every user has one **Primary Group** (main badge) and can wear many **Secondary Groups** (extra team badges).',
    laymanPoints: [
      {
        term: 'Why Groups Exist (Shared Access Made Easy)',
        meaning:
          'Instead of managing permissions person-by-person, you grant permission to a group (like `developers` or `gardeners`) and simply add team members to that group.'
      },
      {
        term: 'Primary Group (`-g` — Your Main Role Badge)',
        meaning:
          'Every user has exactly ONE primary group (stored in `/etc/passwd`). When you create a new file, it automatically belongs to your primary group.'
      },
      {
        term: 'Secondary / Supplementary Groups (`-G` / `-aG` — Extra Badges)',
        meaning:
          'Extra teams a user belongs to (stored in `/etc/group`), like `sudo`, `docker`, `cooks`, or `gardeners`, granting access to shared rooms and tools.'
      },
      {
        term: '/etc/group & /etc/gshadow (The Role Board & Vault)',
        meaning:
          '`/etc/group` lists every group as `group_name:x:GID:member1,member2`. `/etc/gshadow` securely stores group passwords and group admins.'
      }
    ],
    originalAnalogy: {
      title: '🏠 Original Analogy (Made Super Simple): Primary Badge vs Extra Team Badges',
      intro:
        'In our cozy Linux house, every resident wears badges on their shirt:',
      cards: [
        {
          emoji: '🥇',
          name: 'Primary Group = Your Personal Bedroom Badge',
          simple:
            'When Alice joins the house, Linux gives her a personal Primary Badge (`alice`, GID 1001) that matches her own bedroom.'
        },
        {
          emoji: '🎖️',
          name: 'Secondary Groups = Extra Chore & Hobby Badges (`cooks`, `gardeners`)',
          simple:
            'Alice can also pin on the `cooks` badge (to enter the shared kitchen) and the `gardeners` badge (to unlock the garden shed). All these team lists are written on the `/etc/group` whiteboard!'
        }
      ],
      takeaway:
        'Primary Group = your 1 main identity badge. Secondary Groups = all the extra team badges pinned to your shirt for shared rooms!'
    },
    kenyanAnalogy: {
      title: '🇰🇪 Kenyan Analogy: Your Personal Plot Number vs Estate Chamas & Committees',
      intro:
        'Think of life in a Kenyan estate or workplace:',
      cards: [
        {
          emoji: '🏠',
          name: 'Primary Group = Your Household / Main Department',
          simple:
            'Every resident belongs first to their own household unit (e.g., `wanjiku:1001`). Any item she buys for her house belongs to her household by default.'
        },
        {
          emoji: '🤝',
          name: 'Secondary Groups = Joining Estate Chamas & Welfare Teams (`/etc/group`)',
          simple:
            'Wanjiku can also join the **Estate Security Committee**, the **Youth Chama**, and the **Church Choir**. Being on the `/etc/group` list for those committees gives her immediate access to their shared store and whatsapp records!'
        }
      ],
      takeaway:
        'Groups let you manage 5 or 500 people effortlessly — just add them to the Chama list in `/etc/group`!'
    },
    bodyMove: {
      title: '5-Second Body & Mind Move: Tap Your Main Badge, Pin Extra Badges!',
      instruction:
        'Tap the center of your chest ("One Primary Group — my main badge!"), then tap your left shoulder, right shoulder, and sleeve ("Secondary Groups — extra team badges for Cooks, Gardeners, and Admins!").',
      whyItWorks:
        'Physically tapping one center spot vs multiple shoulder spots locks in the difference between 1 Primary Group and multiple Secondary Groups.'
    },
    quickTakeaway:
      'Every user has 1 Primary Group (main badge) and up to dozens of Secondary Groups (extra team badges), all recorded in `/etc/group`.'
  },

  // --------------------------------------------------------------------------
  // SUBTOPIC 7.8: MANAGING GROUPS
  // --------------------------------------------------------------------------
  {
    id: 'managing-groups-usermod-gpasswd',
    number: '7.8',
    title: 'Managing Groups (`usermod`, `gpasswd`, `groupmod`)',
    shortTitle: '8. Managing Groups',
    icon: '🛠️',
    badge: 'Adding, Removing & Renaming Team Badges',
    plainEnglish:
      'Once you have groups in your house, how do you add people to a team, remove someone from a team, or rename a team badge? You use `sudo usermod -aG` to pin an extra badge onto someone without losing their old badges, `sudo gpasswd -d` to unpin a badge, `sudo gpasswd -M` to set an entire team roster at once, and `sudo groupmod` to change a group’s name or GID number!',
    laymanPoints: [
      {
        term: 'sudo usermod -aG group user (Add Extra Badge Safely!)',
        meaning:
          'The `-aG` (Append to Groups) flag adds a user to a new secondary group WHILE KEEPING all their existing badges. (Warning: `-G` without `-a` replaces their extra badges!)'
      },
      {
        term: 'sudo gpasswd -d user group (Remove One Member)',
        meaning:
          'Cleanly unpins a single group badge from a user (removes them from that team) without deleting their account.'
      },
      {
        term: 'sudo gpasswd -M user1,user2 group (Set Full Team Roster)',
        meaning:
          'Assigns multiple members to a group all at once in a single command.'
      },
      {
        term: 'sudo groupmod -n new_name old_name & -g new_gid',
        meaning:
          '`groupmod -n` renames a group badge, and `groupmod -g` updates a group’s official ID number (GID).'
      }
    ],
    originalAnalogy: {
      title: '🏠 Original Analogy (Made Super Simple): Pinning Badges (`-aG`), Unpinning (`gpasswd -d`) & Badge Maker (`groupmod`)',
      intro:
        'Think of managing the badge wall in your Linux house:',
      cards: [
        {
          emoji: '📌',
          name: 'Golden Rule: Always Use `-aG` (Append!), Not Just `-G`',
          simple:
            '`sudo usermod -aG cooks bob` pins the "cooks" badge next to Bob’s existing badges. If you forget the `a` and type `usermod -G cooks bob`, you rip off all of Bob’s other extra badges and leave him with ONLY "cooks"!'
        },
        {
          emoji: '✂️',
          name: 'Team Roster Tools (`gpasswd -M`, `gpasswd -d`, `groupmod`)',
          simple:
            '`gpasswd -M alice,bob gardeners` puts both Alice and Bob on the gardening team at once. `gpasswd -d alice gardeners` takes Alice off the gardening team. `groupmod -g 501 parents` updates the badge’s ID number!'
        }
      ],
      takeaway:
        'Remember: `-aG` = **A**ppend **G**roup (keep old badges + add new one), and `gpasswd -d` removes someone from a group!'
    },
    kenyanAnalogy: {
      title: '🇰🇪 Kenyan Analogy: Adding Members to a Chama Without Kicking Them Out of Others (`usermod -aG`)',
      intro:
        'Imagine the Secretary managing several Welfare & Sacco committees in an estate:',
      cards: [
        {
          emoji: '➕',
          name: '`usermod -aG` = Add to Welfare Chama While Keeping Youth Chama',
          simple:
            'If Otieno is already in the `youth` and `security` committees, running `sudo usermod -aG welfare otieno` adds him to `welfare` while keeping him in `youth` and `security`!'
        },
        {
          emoji: '📋',
          name: '`gpasswd -M` (Register Whole Committee) & `gpasswd -d` (Step Down)',
          simple:
            'After elections, `sudo gpasswd -M wanjiku,otieno,kamau welfare` registers the whole committee in one go. If Kamau steps down from that committee, `sudo gpasswd -d kamau welfare` removes him from just that list!'
        }
      ],
      takeaway:
        'Never forget the little `a` in `usermod -aG` — it stands for **Append** so your user keeps all their existing team memberships!'
    },
    bodyMove: {
      title: '5-Second Body & Mind Move: Pin with "-aG", Unpin with "gpasswd -d"!',
      instruction:
        'Pat your chest where your old badges are ("Keep my old badges with -a!"), pin a new badge next to them ("Add new Group with -G — that’s -aG!"), then pinch and unclip one badge ("gpasswd -d removes one badge!").',
      whyItWorks:
        'Patting existing badges before pinning the new one physically prevents the #1 Linux mistake (running `-G` without `-a`).'
    },
    quickTakeaway:
      'Use `sudo usermod -aG group user` to add a user to a group safely, `sudo gpasswd -d user group` to remove them from a group, and `sudo groupmod` to rename or re-number a group.'
  },

  // --------------------------------------------------------------------------
  // SUBTOPIC 7.9: CREATING GROUPS
  // --------------------------------------------------------------------------
  {
    id: 'creating-groups-groupadd',
    number: '7.9',
    title: 'Creating Groups (`groupadd` & `addgroup`)',
    shortTitle: '9. Creating Groups',
    icon: '🆕',
    badge: 'Forming a Brand-New Team',
    plainEnglish:
      'Before you can pin a new team badge onto anyone, you first create the team itself! You use `sudo groupadd groupname` (universal across all Linux distros) or `sudo addgroup groupname` (friendly Debian/Ubuntu helper) to register a brand-new group in `/etc/group`. You can even pick a specific badge ID number with `-g` (`sudo groupadd -g 2050 developers`).',
    laymanPoints: [
      {
        term: 'sudo groupadd groupname (Universal Team Creator)',
        meaning:
          'Creates a new group in `/etc/group` and automatically assigns it the next available Group ID (GID).'
      },
      {
        term: 'sudo groupadd -g 2050 groupname (Custom GID Number)',
        meaning:
          'Creates a new group with a specific GID number (e.g., 2050) so team IDs match across multiple servers.'
      },
      {
        term: 'sudo addgroup groupname (Debian/Ubuntu Friendly Alias)',
        meaning:
          'The Debian/Ubuntu wrapper around `groupadd` that prints a friendly confirmation message like "Adding group `developers` (GID 1005)... Done."'
      }
    ],
    originalAnalogy: {
      title: '🏠 Original Analogy (Made Super Simple): Minting a Brand-New Role Badge for the House Shelf',
      intro:
        'Imagine your family decides to start a new "Bakers" or "Gardeners" team in the house:',
      cards: [
        {
          emoji: '🏅',
          name: '`sudo groupadd gardeners` = Add a New Row on the Role Whiteboard',
          simple:
            'The Badge Maker stamps a brand-new "gardeners" badge, gives it an official ID number (like GID 1004), and writes `gardeners:x:1004:` at the bottom of the `/etc/group` whiteboard!'
        },
        {
          emoji: '🔢',
          name: 'Custom Badge Number (`sudo groupadd -g 2050 bakers`)',
          simple:
            'If you want the Bakers badge to have exact number #2050, add `-g 2050` when minting the badge!'
        }
      ],
      takeaway:
        '`groupadd` (and `addgroup`) creates the new team badge on the shelf so it is ready for members to join!'
    },
    kenyanAnalogy: {
      title: '🇰🇪 Kenyan Analogy: Registering a New Chama or Estate Committee (`groupadd`)',
      intro:
        'Picture residents in a Kenyan estate deciding to form a new "Solar Water Committee":',
      cards: [
        {
          emoji: '📜',
          name: 'Opening the Official Chama Page (`sudo groupadd solar_team`)',
          simple:
            'Before adding members, the caretaker opens a fresh page in the `/etc/group` register book titled `solar_team` with Certificate Number (GID) 1005!'
        },
        {
          emoji: '🤝',
          name: '`groupadd` vs `addgroup`',
          simple:
            'Both register the exact same Chama! `groupadd` works quietly on every Linux system (Ubuntu, Red Hat, Fedora), while `addgroup` on Ubuntu gives you a polite spoken confirmation.'
        }
      ],
      takeaway:
        'Step 1 is always `sudo groupadd teamname` to form the team; Step 2 is `sudo usermod -aG teamname username` to add members!'
    },
    bodyMove: {
      title: '5-Second Body & Mind Move: Stamp the New Team Badge!',
      instruction:
        'Bring your right fist down into your left palm like a heavy rubber stamp ("KA-CHUNK! groupadd — new team created!"), then hold it up proudly ("Ready for members!").',
      whyItWorks:
        'The rubber-stamp action anchors `groupadd` / `addgroup` as minting and registering a brand-new group.'
    },
    quickTakeaway:
      'Use `sudo groupadd groupname` (or `sudo addgroup groupname` on Ubuntu/Debian) to create a new group in `/etc/group`. Use `-g GID` to pick a custom group ID number.'
  },

  // --------------------------------------------------------------------------
  // SUBTOPIC 7.10: DELETING GROUPS
  // --------------------------------------------------------------------------
  {
    id: 'deleting-groups-groupdel',
    number: '7.10',
    title: 'Deleting Groups (`groupdel` & `delgroup`)',
    shortTitle: '10. Deleting Groups',
    icon: '🗑️',
    badge: 'Disbanding an Old Team Safely',
    plainEnglish:
      'When a project finishes or a team is no longer needed, you disband the group using `sudo groupdel groupname` (or `sudo delgroup groupname` on Debian/Ubuntu). Good news: deleting a group only removes that team badge from `/etc/group` — it NEVER deletes the human users who wore that badge! (One safety rule: Linux won’t let you delete a group if it is still someone’s Primary Group until you change or remove that user first.)',
    laymanPoints: [
      {
        term: 'sudo groupdel groupname (Disband a Team)',
        meaning:
          'Removes the group entry from `/etc/group` and `/etc/gshadow`. All human user accounts remain 100% safe.'
      },
      {
        term: 'sudo delgroup groupname (Debian/Ubuntu Friendly Tool)',
        meaning:
          'The Debian/Ubuntu equivalent of `groupdel` (and supports `sudo delgroup --only-if-empty groupname` so you only delete a team if nobody is inside it).'
      },
      {
        term: 'Safety Rule: Cannot Delete an Active Primary Group',
        meaning:
          'If `alice` still uses `alice` as her Primary Group (main bedroom badge), Linux protects her and refuses to `groupdel alice` unless Alice’s primary group is changed or Alice moves out.'
      }
    ],
    originalAnalogy: {
      title: '🏠 Original Analogy (Made Super Simple): Disbanding a House Club Without Evicting Anyone',
      intro:
        'Imagine the summer gardening season is over, or the temporary "Party Committee" is finished:',
      cards: [
        {
          emoji: '🧹',
          name: '`sudo groupdel party_team` = Erase the Club from the Whiteboard',
          simple:
            'The House Manager erases `party_team` from the `/etc/group` whiteboard and recycles the club badges. Alice and Bob still live happily in their bedrooms — they just have one less badge!'
        },
        {
          emoji: '🛡️',
          name: 'Built-In Safety Guard (Primary Group Protection)',
          simple:
            'If you accidentally try to delete someone’s main personal badge (`Primary Group`), Linux says: "Hold on! Cannot remove the primary group of user `alice`!"'
        }
      ],
      takeaway:
        '`groupdel` disbands the team badge cleanly without hurting any user accounts or personal files!'
    },
    kenyanAnalogy: {
      title: '🇰🇪 Kenyan Analogy: Dissolving a Completed Wedding / Harambee Committee (`groupdel`)',
      intro:
        'Think of a temporary Kenyan Wedding or Harambee WhatsApp Committee after the event succeeds:',
      cards: [
        {
          emoji: '🎉',
          name: 'Close the Committee (`sudo groupdel wedding_committee`)',
          simple:
            'Once the wedding is over, the admin closes the `wedding_committee` group (`sudo groupdel wedding_committee`). Wanjiku, Otieno, and Kamau still keep their phones and estate houses — only the temporary committee is closed!'
        },
        {
          emoji: '🔒',
          name: 'Cannot Close a Household’s Primary Registration',
          simple:
            'You can close a side committee anytime, but you cannot delete a tenant’s primary household registration while the tenant still lives there!'
        }
      ],
      takeaway:
        '`sudo groupdel groupname` (or `sudo delgroup groupname`) disbands a secondary team cleanly and safely.'
    },
    bodyMove: {
      title: '5-Second Body & Mind Move: Wipe the Team Line Off the Board!',
      instruction:
        'Pretend to hold a whiteboard eraser and wipe one horizontal line across the air ("groupdel — erase the old team line!"), then point to yourself and smile ("Members stay safe!").',
      whyItWorks:
        'Wiping a single line on the whiteboard while smiling reinforces that `groupdel` only removes the group entry, not the users.'
    },
    quickTakeaway:
      '`sudo groupdel groupname` (or `delgroup`) removes a group from `/etc/group` without deleting any user accounts, and refuses to delete a group if it is still a user’s Primary Group.'
  },

  // --------------------------------------------------------------------------
  // SUBTOPIC 7.11: CHECKING USER GROUP MEMBERSHIP
  // --------------------------------------------------------------------------
  {
    id: 'checking-user-group-membership',
    number: '7.11',
    title: 'Checking User Group Membership (`groups`, `id`, `/etc/group`, `getent`)',
    shortTitle: '11. Checking Group Membership',
    icon: '🔍',
    badge: '4 Ways to Check Who Is on Which Team',
    plainEnglish:
      'Before someone tries to enter a shared folder or run a team tool, how do you verify which role badges they are wearing? Your curriculum gives you **4 easy ways** to check group membership: 1) `groups username` (quick badge list), 2) `id username` or `id -nG username` (full ID card with numbers & names), 3) `grep username /etc/group` (reading the Master Registry Book), and 4) `getent group` (asking the House Manager directly)!',
    laymanPoints: [
      {
        term: 'Method 1: groups & groups username (Quick Badge Check)',
        meaning:
          'Typing `groups` shows your own role badges; `groups alice` shows all role badges Alice is wearing (`alice : alice parents cooks gardeners`).'
      },
      {
        term: 'Method 2: id username & id -nG username (The ID Card Reader)',
        meaning:
          '`id alice` shows UID, primary GID, and all group IDs + names. `id -nG alice` prints a clean list of just her group names.'
      },
      {
        term: 'Method 3: grep -w alice /etc/group (The Master Registry Book)',
        meaning:
          'Searches the `/etc/group` file directly to find every team page where `alice` is written down, or `grep -w gardeners /etc/group` to see everyone on the gardeners team!'
      },
      {
        term: 'Method 4: getent group | grep -w alice (Asking the House Manager)',
        meaning:
          'Queries the system’s official name service (works for both local `/etc/group` files AND network directories like LDAP/Active Directory).'
      }
    ],
    originalAnalogy: {
      title: '🏠 Original Analogy (Made Super Simple): Badge Hook (`groups`), ID Scanner (`id`), Registry Book (`/etc/group`) & House Manager (`getent`)',
      intro:
        'Remember Sam’s dinner & garden story from your curriculum notes? Sam used all 4 stations in the house:',
      cards: [
        {
          emoji: '🎖️',
          name: '1. Badge Wall (`groups alice`) & 2. ID Card Scanner (`id -nG alice`)',
          simple:
            'Looking at Alice’s door hook (`groups alice`) or swiping her ID card (`id alice`) immediately shows Sam that Alice has the `parents`, `cooks`, and `gardeners` badges!'
        },
        {
          emoji: '📖',
          name: '3. Master Registry (`/etc/group`) & 4. House Manager (`getent group`)',
          simple:
            'When Sam wants to see EVERYONE who can water the garden, he checks `/etc/group` (`grep gardeners /etc/group`) or asks the House Manager (`getent group gardeners`) and sees `gardeners:x:1003:alice,bob,charlie`!'
        }
      ],
      takeaway:
        'Checking one person? Use `groups alice` or `id alice`. Checking a whole team or big network house? Use `/etc/group` or `getent group`!'
    },
    kenyanAnalogy: {
      title: '🇰🇪 Kenyan Analogy: 4 Ways to Confirm If Wanjiku Is in the Estate Chama',
      intro:
        'Imagine verifying committee membership in a Kenyan Sacco or estate:',
      cards: [
        {
          emoji: '🪪',
          name: '1. Check Her Lapel Badges (`groups`) or 2. Scan Her Kipande (`id`)',
          simple:
            'Quickly look at her membership card (`groups wanjiku`) or scan her full ID with numbers (`id wanjiku`) to see every Chama she belongs to.'
        },
        {
          emoji: '📚',
          name: '3. Open the Ledger Book (`/etc/group`) or 4. Ask the Secretary (`getent group`)',
          simple:
            'Flip to the `cooks` page in the `/etc/group` book (`grep cooks /etc/group`) or ask the digital Sacco Secretary (`getent group cooks`) to read out all registered members on that team!'
        }
      ],
      takeaway:
        'All 4 methods agree because they all read from the official house registry — pick whichever fits your task!'
    },
    bodyMove: {
      title: '5-Second Body & Mind Move: Count the 4 Group-Check Stations on Your Fingers!',
      instruction:
        'Hold up 4 fingers one by one: 1 ("groups — check the badges!"), 2 ("id — swipe the ID card!"), 3 ("/etc/group — open the registry book!"), 4 ("getent — ask the house manager!").',
      whyItWorks:
        'Counting the 4 methods on 4 fingers gives you an instant mental checklist for any exam or real-world server check.'
    },
    quickTakeaway:
      '4 ways to check group membership: 1) `groups user`, 2) `id user` (or `id -nG user`), 3) `grep -w user /etc/group`, and 4) `getent group | grep -w user`.'
  },

  // --------------------------------------------------------------------------
  // SUBTOPIC 7.12: MANAGING ADMINISTRATIVE ACCESS
  // --------------------------------------------------------------------------
  {
    id: 'managing-administrative-access-sudo',
    number: '7.12',
    title: 'Managing Administrative Access (`sudo`, `su`, `visudo`, `/etc/sudoers`)',
    shortTitle: '12. Admin Access (sudo & visudo)',
    icon: '🔑',
    badge: 'Borrowing the Golden Master Key Safely',
    plainEnglish:
      'Logging in all day as the all-powerful `root` user is dangerous — one typo could accidentally break the house! Instead, Linux uses **`sudo`** (*Superuser Do*): it lets an authorized user **temporarily borrow the Parent’s Golden Master Key** for just ONE important task using their *own* password, logs the action in `/var/log/auth.log`, and automatically locks the key again after a few minutes! The rules for who can borrow the key live in `/etc/sudoers`, which you always edit safely using **`sudo visudo`**.',
    laymanPoints: [
      {
        term: 'sudo vs su (Borrowing the Key vs Becoming the Parent)',
        meaning:
          '`sudo command` borrows root power for one task using YOUR password and logs who did it. `su -` switches you permanently into the root user (requires sharing the root password and is much riskier).'
      },
      {
        term: 'Granting Admin Access (The sudo / wheel Group & visudo)',
        meaning:
          'Add a user to the `sudo` group on Ubuntu/Debian (`sudo usermod -aG sudo alice`) or `wheel` on Fedora/RHEL, or edit `/etc/sudoers` safely with `sudo visudo` (which checks for syntax typos before saving!).'
      },
      {
        term: 'Essential sudo Flags (-l, -v, -k, -K, -u, -s, -b, -p, -n)',
        meaning:
          '`-l` lists your allowed rules; `-v` extends the 5-minute key timer; `-k` / `-K` returns the key early; `-u user` runs as another user; `-s` opens a root shell; `-b` runs in background; `-p` customizes the prompt.'
      },
      {
        term: 'Audit Trail (/var/log/auth.log) & Environment Variables',
        meaning:
          'Every `sudo` command is recorded in `/var/log/auth.log` with `SUDO_USER` and `SUDO_COMMAND`, while safe variables like `EDITOR`, `VISUAL`, `HOME`, and `PATH` keep tools secure.'
      }
    ],
    originalAnalogy: {
      title: '🏠 Original Analogy (Made Super Simple): Borrowing the Golden Master Key (`sudo`) & The Fridge Rulebook (`visudo`)',
      intro:
        'Imagine the Golden Master Key hanging in a locked glass box in the kitchen:',
      cards: [
        {
          emoji: '🔑',
          name: '`sudo` (5-Minute Borrowed Key) vs `su` (Giving Away the Parent Key)',
          simple:
            'With `sudo`, Sam enters his OWN bedroom code to borrow the Golden Key for one chore (`sudo apt install plumbing-tools`). A 5-minute timer starts: `sudo -v` adds 5 more minutes, and `sudo -k` hangs the key back on the hook immediately!'
        },
        {
          emoji: '📋',
          name: '`sudo -l` (Read Fridge Rules) & `sudo visudo` (Safe Rulebook Editor)',
          simple:
            '`sudo -l` checks the fridge whiteboard to see which chores you are allowed to do. And when the Parent edits the `/etc/sudoers` rulebook, they ALWAYS use `sudo visudo` — a smart spell-checking pen that refuses to save if a typo would lock everyone out of the house!'
        },
        {
          emoji: '📓',
          name: 'The Security Guard’s Audit Book (`/var/log/auth.log`)',
          simple:
            'Every single time someone borrows the `sudo` key, the guard writes down `SUDO_USER=sam` and `SUDO_COMMAND=/usr/bin/apt install...` in `/var/log/auth.log` so everyone stays accountable!'
        }
      ],
      takeaway:
        '`sudo` keeps your Linux house safe: use your own password, borrow the Golden Key only when needed, return it with `sudo -k`, and always edit `/etc/sudoers` with `sudo visudo`!'
    },
    kenyanAnalogy: {
      title: '🇰🇪 Kenyan Analogy: Borrowing the Caretaker’s Master Key with Sign-In Log (`sudo`) vs Handing Over the Title Deed (`su`)',
      intro:
        'Picture how a well-run Kenyan apartment block or bank branch handles high-security keys:',
      cards: [
        {
          emoji: '🗝️',
          name: '`sudo` = Signing the Gate Ledger with Your Own ID to Open the Meter Box',
          simple:
            'When technician Kamau needs to reset the KPLC main token meter, the caretaker doesn’t hand him the permanent landlord key (`su`). Instead, Kamau verifies his own ID (`sudo`), opens the meter box for 5 minutes (`sudo -v` extends time, `sudo -k` returns the key immediately), and the gate askari logs it in `/var/log/auth.log`!'
        },
        {
          emoji: '🛡️',
          name: 'Adding an Assistant Caretaker (`usermod -aG sudo`) & `visudo`',
          simple:
            'To make Wanjiku an official assistant admin on Ubuntu, you run `sudo usermod -aG sudo wanjiku` (or `wheel` on Red Hat/Fedora). And if you want Kamau to ONLY restart the borehole pump and nothing else, you safely write that rule in `/etc/sudoers` using `sudo visudo`!'
        }
      ],
      takeaway:
        '`sudo` gives you accountable, temporary superpower with a full audit log in `/var/log/auth.log` — and `sudo visudo` protects `/etc/sudoers` from typos!'
    },
    bodyMove: {
      title: '5-Second Body & Mind Move: Borrow the Golden Key, Turn It, Hang It Back!',
      instruction:
        'Reach up and grab an imaginary Golden Key off a wall hook ("sudo — borrow the master key!"), turn it in front of you ("sudo -v extends the timer!"), then hang it back on the hook and wipe your hands ("sudo -k returns the key early!").',
      whyItWorks:
        'Grabbing, turning, and hanging back the key turns `sudo`, `sudo -v`, and `sudo -k` into a physical story you can feel in your hands.'
    },
    quickTakeaway:
      'Use `sudo` to borrow admin power temporarily (`-l` list rules, `-v` extend timer, `-k` return key, `-u` run as another user). Grant admin access via `usermod -aG sudo user` or `sudo visudo`.'
  }
];
