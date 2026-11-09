// ============================================================================
// TOPIC 6: PACKAGE MANAGEMENT (5 SUBTOPICS)
// Learn how software is installed, updated, and removed on different Linux distributions:
// 6.1 Package Managers & systemctl
// 6.2 apt-get Package Manager (Debian/Ubuntu)
// 6.3 dpkg – Debian Package Manager
// 6.4 dnf Package Manager (Fedora/RHEL 8+)
// 6.5 yum Package Manager (CentOS/RHEL)
// ============================================================================

export const linuxTopic6Subtopics = [
  {
    id: 'package-managers-and-systemctl',
    number: '6.1',
    title: 'Package Managers & systemctl',
    shortTitle: '1. Stores & systemctl',
    icon: '🛒',
    badgeBg: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    pastelBg: 'bg-emerald-50/80',
    borderColor: 'border-emerald-300',
    laymanHeadline:
      'A Package Manager is your personal shopping assistant that buys, updates, and removes apps (along with all their required screws & batteries), while `systemctl` is the TV remote control that switches those apps ON and OFF!',
    laymanExplanation:
      'On Windows, you often hunt around sketchy websites to download installers. In Linux, you never have to do that! Every Linux distribution has an official, virus-checked "App Store" managed from your terminal. You simply tell your Package Manager what you want, and it brings the app plus every helper part it needs ("dependencies"). Once an appliance (like a web server or Wi-Fi service) is installed in your house, `systemd` is the electrical wiring and `systemctl` is your universal remote control to turn it on, off, or set it to start automatically every morning!',
    originalAnalogy: {
      title: '🏠 Neighborhood Stores (Package Managers) + Universal Remote (`systemctl`)',
      icon: '🛒📱',
      summary:
        'Imagine your Linux House needs a new Coffee Maker (an app) and a way to switch it on. The Package Manager is the Store Shopper who delivers the Coffee Maker with filters and screws included ("dependencies"), and `systemctl` is the remote control on your counter!',
      points: [
        {
          emoji: '🏬',
          name: 'Different Houses Shop at Different Stores',
          simple:
            '• **Ubuntu/Debian House** → Shops at the **APT Supermarket** (`apt` / `apt-get` + `dpkg` delivery van).\n• **Fedora/CentOS/RHEL House** → Shops at the **DNF / YUM Hardware Store** (`.rpm` boxes).\n• **Arch House** → **Pacman** DIY Store (`pacman -Syu`).\n• **openSUSE House** → **Zypper** Department Store (`zypper in`).'
        },
        {
          emoji: '🔩',
          name: 'Dependencies (The Screws, Batteries & Instructions Included!)',
          simple:
            'When you order a bookshelf or game, it needs screws and graphics libraries to work. Package managers automatically pack all those hidden helper parts ("dependencies") in the delivery box so nothing is missing!'
        },
        {
          emoji: '⚡',
          name: 'systemd (The House Electrical Wiring)',
          simple:
            '`systemd` is the smart electrical panel inside the walls that powers up your house fast at startup and makes sure the fridge has power before the ice-maker starts.'
        },
        {
          emoji: '📱',
          name: 'systemctl (Your Universal Appliance Remote Control)',
          simple:
            '• `sudo systemctl start apache2` → Press the green **ON** button!\n• `sudo systemctl stop apache2` → Press the red **OFF** button!\n• `sudo systemctl enable apache2` → Auto-turn ON whenever the house wakes up!\n• `systemctl status apache2` → Check if the green indicator light is healthy!'
        }
      ]
    },
    kenyanAnalogy: {
      title: '🇰🇪 Naivas/Hardware Personal Shopper + The KPLC Smart Switchboard',
      icon: '🛍️💡',
      summary:
        'Think of ordering a new TV or water pump for your home in Nairobi. Instead of walking around Luthuli Avenue looking for cables, bolts, and plugs separately, your personal shopper brings the complete kit ready to work (`dependencies`), and you control the power from your wall switchboard (`systemctl`)!',
      points: [
        {
          emoji: '🛒',
          name: 'Naivas Supermarket (apt) vs. Builders Hardware (dnf/yum)',
          simple:
            'Every estate has its favourite supplier! Ubuntu homes order from the Naivas/Carrefour Supermarket (`apt-get`), while Fedora/RedHat homes order from the big Hardware Store (`dnf` / `yum`).'
        },
        {
          emoji: '🔋',
          name: 'Free Batteries & Cables Included (Dependencies)',
          simple:
            'When you buy a new GoTV decoder, the shop automatically packs the remote, batteries, HDMI cable, and dish bracket—those are **dependencies**!'
        },
        {
          emoji: '🎛️',
          name: 'systemctl (The Plot Caretaker’s Master Switchboard)',
          simple:
            '`systemctl start` flips the borehole water pump ON right now; `systemctl stop` switches it OFF; `systemctl enable` puts it on an automatic morning timer; and `systemctl status` checks the meter light!'
        }
      ]
    },
    bodyMove: {
      title: '🤸 5-Second Body Move: Push the Trolley & Click the Remote!',
      instruction:
        'Pretend to push a supermarket trolley forward for 2 seconds ("Package Manager — Buy & Pack Dependencies!"), then point an imaginary TV remote control forward and click your thumb ("systemctl start — Power ON!").',
      whyItWorks:
        'Separating the "shopping trolley" gesture (installing software) from the "TV remote click" (starting/stopping running services) makes the difference between Package Managers and `systemctl` crystal clear!'
    },
    quickTakeaway:
      'Package Managers (`apt-get`, `dnf`, `yum`) buy, update, and remove apps + dependencies; `systemctl` (`start`, `stop`, `enable`, `status`) controls running services!'
  },
  {
    id: 'apt-get-package-manager',
    number: '6.2',
    title: 'apt-get Package Manager (Debian/Ubuntu)',
    shortTitle: '2. apt-get (Ubuntu)',
    icon: '🏪',
    badgeBg: 'bg-amber-100 text-amber-950 border-amber-300',
    pastelBg: 'bg-amber-50/80',
    borderColor: 'border-amber-300',
    laymanHeadline:
      '`apt-get` is the friendly Supermarket Store Manager for Debian, Ubuntu, and Linux Mint! You give them your parent’s key (`sudo`), and they fetch, upgrade, or return any software for you.',
    laymanExplanation:
      'In Ubuntu and Debian houses, software comes in `.deb` boxes stored in giant online warehouses called "repositories." Before buying anything, you run `sudo apt-get update` so the Store Manager refreshes today’s catalog. Then `sudo apt-get install` buys the item (and all its dependencies), `sudo apt-get upgrade` upgrades your existing items to the newest versions, and `remove` or `purge` returns items you no longer want!',
    originalAnalogy: {
      title: '🏠 Sam’s Ubuntu Supermarket Manager (`sudo apt-get`)',
      icon: '🏪📋',
      summary:
        'Imagine walking up to the Store Manager (`apt-get`) at the Ubuntu Supermarket while holding your parent’s golden permission key (`sudo`). Every command is a polite request to the manager!',
      points: [
        {
          emoji: '📖',
          name: '1. sudo apt-get update (Refresh the Store Catalog)',
          simple:
            '"Store Manager, check what new items arrived in the warehouse today!" (Doesn’t install anything yet—just updates the price & version list!)'
        },
        {
          emoji: '🛍️',
          name: '2. sudo apt-get install vlc (Buy New Item + Screws)',
          simple:
            '"Bring me the VLC movie player and all the helper parts (dependencies) it needs!" Add `-y` (`sudo apt-get -y install vlc`) to say "Yes automatically, don’t ask me twice!" or `-s` to simulate a dry-run receipt.'
        },
        {
          emoji: '🔄',
          name: '3. sudo apt-get upgrade (Replace Old Appliances with Newer Models)',
          simple:
            'Walks through your house and upgrades every installed program to its newest version from the catalog! (`dist-upgrade` does a major house renovation).'
        },
        {
          emoji: '🗑️',
          name: '4. remove vs. purge vs. autoremove & autoclean',
          simple:
            '• `remove game`: Returns the game to the store, but **keeps your saved settings notebook** on the shelf.\n• `purge game`: Returns the game **AND throws away all its settings files**!\n• `autoremove`: Cleans out leftover screws/parts from old items you already returned.\n• `clean` / `autoclean`: Sweeps empty cardboard delivery boxes out of your garage!'
        }
      ]
    },
    kenyanAnalogy: {
      title: '🇰🇪 Ordering from the Naivas / Quickmart Branch Manager in Ubuntu Estate',
      icon: '🛒🧾',
      summary:
        'Think of the Naivas Supermarket Manager in your estate. First you check the new weekly leaflet (`apt-get update`), then you order your electronics (`apt-get install`), upgrade old items (`apt-get upgrade`), or clear empty cartons from the store (`autoclean`)!',
      points: [
        {
          emoji: '🔑',
          name: 'Why "sudo" Comes First',
          simple:
            'Just like a child needs Mom or Dad’s M-Pesa PIN (`sudo`) to approve buying a new blender for the house, Linux requires `sudo` before installing or removing system software.'
        },
        {
          emoji: '📓',
          name: 'remove (Keep Receipt/Settings) vs. purge (Wipe Everything)',
          simple:
            '`apt-get remove` takes back the decoder but leaves your channel list notebook on the table in case you buy another one later; `apt-get purge` takes the decoder AND burns the channel notebook!'
        },
        {
          emoji: '🧹',
          name: 'autoremove & autoclean (Clearing the Stoo)',
          simple:
            '`autoremove` clears spare parts left behind by old machines, and `autoclean` clears old delivery cartons so your stoo (disk space) stays spacious!'
        }
      ]
    },
    bodyMove: {
      title: '🤸 5-Second Body Move: Flip the Catalog, Grab the Box, Sweep the Garage!',
      instruction:
        'Open your hands like a book ("apt-get update — Check Catalog!"), reach out and pull a box toward your chest ("apt-get install — Bring It Home!"), then brush your hands off clean ("autoremove — Clean Leftovers!").',
      whyItWorks:
        'Acting out the 3-step supermarket routine (`update` catalog → `install` box → `autoremove` cleanup) locks the golden Ubuntu workflow into your body!'
    },
    quickTakeaway:
      'Always run `sudo apt-get update` first to refresh the catalog, then `sudo apt-get install <pkg>`, `upgrade`, `remove` (keeps configs), or `purge` (wipes configs)!'
  },
  {
    id: 'dpkg-debian-package-manager',
    number: '6.3',
    title: 'dpkg – Debian Package Manager',
    shortTitle: '3. dpkg (.deb Van)',
    icon: '🚚',
    badgeBg: 'bg-sky-100 text-sky-950 border-sky-300',
    pastelBg: 'bg-sky-50/80',
    borderColor: 'border-sky-300',
    laymanHeadline:
      '`dpkg` is the actual Delivery Driver who unloads `.deb` package boxes at your door! It installs single `.deb` files directly on your computer, while `apt-get` is the Store Manager who coordinates it.',
    laymanExplanation:
      'What happens when you download a file ending in `.deb` (like `google-chrome.deb`) directly from a website onto your laptop? You hand that box directly to `dpkg` using `sudo dpkg -i google-chrome.deb`! Just remember one big catch: `dpkg` is a delivery driver who only drops off the single box in your hand—it does NOT go to the store to fetch missing screws (dependencies). If `dpkg` complains about missing parts, `sudo apt-get -f install` (`--fix-broken`) comes to the rescue!',
    originalAnalogy: {
      title: '🏠 The Delivery Driver (`dpkg`) vs. The Store Manager (`apt-get`)',
      icon: '🚚📦',
      summary:
        'In Sam’s Ubuntu House, `apt-get` is the smart Store Manager at the supermarket, while `dpkg` is the muscles-on-the-ground Delivery Driver who actually carries `.deb` boxes through your front door and unpacks them!',
      points: [
        {
          emoji: '📦',
          name: 'sudo dpkg -i package.deb (-i = Install This Box)',
          simple:
            'Hands a `.deb` box sitting in your Downloads room directly to the Delivery Driver and says: "Unpack and install this box right now!"'
        },
        {
          emoji: '⚠️',
          name: 'The Missing Screws Catch (No Automatic Dependencies!)',
          simple:
            'Because `dpkg` only looks at the single box in its hands, if that box needs 3 extra screws (`dependencies`) that aren’t in your house yet, `dpkg` stops and says: "Dependency problems — missing parts!"'
        },
        {
          emoji: '🦸',
          name: 'The Rescue Command: sudo apt-get -f install (--fix-broken)',
          simple:
            'Whenever `dpkg -i` gets stuck because of missing screws, call the Store Manager with `sudo apt-get -f install`! They immediately fetch the missing dependencies and finish the job!'
        },
        {
          emoji: '📋',
          name: 'dpkg -l (Check Delivery Log) & sudo dpkg -r (Remove)',
          simple:
            '`dpkg -l` lists every `.deb` box ever delivered to your house, and `sudo dpkg -r package` tells the driver to remove an installed package.'
        }
      ]
    },
    kenyanAnalogy: {
      title: '🇰🇪 The Boda-Boda Rider Delivering a Single `.deb` Carton to Your Gate',
      icon: '🛵📦',
      summary:
        'Imagine a friend sends you a boxed solar lamp (`lamp.deb`) via a boda-boda rider (`dpkg`). The rider (`dpkg -i`) drops off the exact box you gave him—but if the box is missing a battery inside, the rider cannot manufacture one! You call the Naivas Manager (`apt-get -f install`) to send the missing battery!',
      points: [
        {
          emoji: '🛵',
          name: 'sudo dpkg -i chrome.deb (Direct Boda Drop-Off)',
          simple:
            'Installs a local `.deb` file you already have on your flash disk or Downloads folder—even without browsing the online catalog.'
        },
        {
          emoji: '🛠️',
          name: 'How apt-get and dpkg Work as a Team',
          simple:
            'Even when you run `sudo apt-get install vlc`, behind the scenes `apt-get` downloads the `.deb` boxes and hands them to `dpkg` to unpack at your door!'
        },
        {
          emoji: '📓',
          name: 'dpkg -l | grep chrome (Check the Gate Delivery Book)',
          simple:
            'Checks the occurrence/delivery book to confirm if Chrome is already installed in the compound.'
        }
      ]
    },
    bodyMove: {
      title: '🤸 5-Second Body Move: Carry the Box & Call the Rescue!',
      instruction:
        'Pretend to lift a heavy `.deb` box and set it down on your desk ("dpkg -i — Deliver the .deb Box!"). Then raise one hand like calling the store manager ("apt-get -f install — Bring the Missing Screws!").',
      whyItWorks:
        'Connecting `dpkg -i` (the box drop-off) with `apt-get -f install` (the missing-screw rescue) means you will never panic when you see a `.deb` dependency error!'
    },
    quickTakeaway:
      '`sudo dpkg -i file.deb` installs a local `.deb` file, `dpkg -l` lists installed packages, and `sudo apt-get -f install` fixes any missing dependencies!'
  },
  {
    id: 'dnf-package-manager',
    number: '6.4',
    title: 'dnf Package Manager (Fedora/RHEL 8+)',
    shortTitle: '4. dnf (Fedora/RHEL 8+)',
    icon: '🚀',
    badgeBg: 'bg-purple-100 text-purple-950 border-purple-300',
    pastelBg: 'bg-purple-50/80',
    borderColor: 'border-purple-300',
    laymanHeadline:
      '`dnf` (Dandified YUM) is the sleek, modern Hardware Store with digital touchscreen kiosks for Fedora, RHEL 8+, AlmaLinux, and Rocky Linux!',
    laymanExplanation:
      'When you visit a Fedora or modern Red Hat Enterprise Linux (RHEL 8/9) house, you don’t use `apt-get` or `.deb` boxes! Instead, Red Hat family houses use `.rpm` (Red Hat Package Manager) boxes and shop at the modern `dnf` Hardware Store. `dnf` is the faster, smarter younger cousin of `yum`—it searches digital catalogs quickly, resolves dependencies automatically, and keeps your tools up to date!',
    originalAnalogy: {
      title: '🏠 The Modern Touchscreen Hardware Store (`dnf`)',
      icon: '🚀🏪',
      summary:
        'Imagine the neighborhood Hardware Store got a massive upgrade: digital touchscreens, smart inventory algorithms, and express checkout lanes! That modern store is `dnf`—the default store for Fedora and RHEL 8+ houses.',
      points: [
        {
          emoji: '🔍',
          name: 'sudo dnf check-update & dnf search editor',
          simple:
            'Taps the digital touchscreen kiosk to see which tools in your house have newer versions waiting, or searches the store aisles for any text editor!'
        },
        {
          emoji: '🛍️',
          name: 'sudo dnf install firefox (Express Order + All RPM Parts)',
          simple:
            'Orders Firefox (in `.rpm` format) along with every helper library it needs, using `dnf`’s smart dependency solver!'
        },
        {
          emoji: '⚡',
          name: 'sudo dnf upgrade (Express Checkout Upgrade)',
          simple:
            'Upgrades all installed packages in your Fedora/RHEL house to the latest versions quickly and safely without broken builds.'
        },
        {
          emoji: '🗑️',
          name: 'sudo dnf remove firefox & sudo dnf autoremove',
          simple:
            'Returns an unwanted tool to the modern hardware store and cleans up any leftover helper brackets that are no longer needed!'
        }
      ]
    },
    kenyanAnalogy: {
      title: '🇰🇪 Shopping at a Modern Digital Builders Megastore in Westlands/Karen',
      icon: '🏗️💻',
      summary:
        'Think of walking into a modern, computerized Builders Hardware megastore in Nairobi. Instead of waiting for a clerk to flip through dusty ledger books (`yum`), `dnf` scans barcodes instantly, bundles all required `.rpm` bolts and brackets, and checks you out in seconds!',
      points: [
        {
          emoji: '📦',
          name: 'Uses .rpm Boxes (Instead of .deb Boxes)',
          simple:
            'Just like Safaricom and Airtel use different SIM cards, Debian/Ubuntu uses `.deb` boxes while Fedora/RedHat/CentOS uses `.rpm` boxes!'
        },
        {
          emoji: '🚀',
          name: 'Why Fedora & RHEL 8+ Switched from yum to dnf',
          simple:
            '`dnf` uses less memory, calculates dependencies much faster, and never gets confused when two tools need different bolts.'
        },
        {
          emoji: '🪄',
          name: 'Easy Command Translation from apt to dnf',
          simple:
            'Already know `apt`? Good news! `sudo dnf install`, `sudo dnf upgrade`, `sudo dnf remove`, and `sudo dnf autoremove` use almost the exact same English words!'
        }
      ]
    },
    bodyMove: {
      title: '🤸 5-Second Body Move: The Fast Touchscreen Tap!',
      instruction:
        'Tap the air rapidly with two fingers like using a futuristic touchscreen kiosk ("Tap-Tap-Tap — sudo dnf install!"), then give a thumbs-up ("Fast Modern Hardware Store!").',
      whyItWorks:
        'The rapid touchscreen tap reminds you that `dnf` is the modern, high-speed upgrade to the classic hardware store for Fedora and RHEL 8+!'
    },
    quickTakeaway:
      '`dnf` is the modern package manager for Fedora & RHEL 8+ (`.rpm` packages): `sudo dnf install`, `sudo dnf upgrade`, `sudo dnf remove`, and `sudo dnf check-update`!'
  },
  {
    id: 'yum-package-manager',
    number: '6.5',
    title: 'yum Package Manager (CentOS/RHEL)',
    shortTitle: '5. yum (CentOS/RHEL)',
    icon: '🧰',
    badgeBg: 'bg-rose-100 text-rose-950 border-rose-300',
    pastelBg: 'bg-rose-50/80',
    borderColor: 'border-rose-300',
    laymanHeadline:
      '`yum` (Yellowdog Updater, Modified) is the classic, trusted neighborhood Hardware Store that has served CentOS and Red Hat Enterprise Linux (RHEL) houses since 2003!',
    laymanExplanation:
      'Before `dnf` arrived, `yum` was the king of Red Hat, CentOS, and Fedora houses—and millions of enterprise servers still use `yum` commands every single day! Just like `dnf`, `yum` works with `.rpm` packages, automatically gathers all required dependencies (screws and brackets), manages store catalogs ("repositories"), and keeps a local inventory list (`sudo yum makecache`) so you can install, update, and remove software reliably.',
    originalAnalogy: {
      title: '🏠 The Classic Wooden-Shelf Neighborhood Hardware Store (`yum`)',
      icon: '🧰🪵',
      summary:
        'Imagine a beloved, traditional neighborhood hardware store with wooden shelves, paper catalogs, and a wise veteran clerk who knows every bolt by heart. That’s `yum`—serving CentOS and RHEL houses for over 20 years!',
      points: [
        {
          emoji: '📦',
          name: 'sudo yum makecache (Update the Local Inventory List)',
          simple:
            'Saves a fresh copy of the warehouse catalog on your store counter so you don’t have to call the main warehouse every time you look up a tool!'
        },
        {
          emoji: '🔩',
          name: 'sudo yum install game (Order Tool + All Required Screws)',
          simple:
            'The veteran hardware clerk fetches the `.rpm` package AND automatically includes every dependency bracket and library needed so there are zero missing parts!'
        },
        {
          emoji: '🔄',
          name: 'sudo yum update (Upgrade All House Fixtures)',
          simple:
            'Checks every installed `.rpm` item in your house and upgrades them to the latest version!'
        },
        {
          emoji: '🗑️',
          name: 'sudo yum remove game (Return Item to the Hardware Store)',
          simple:
            'Uninstalls the software cleanly and takes it back to the hardware store.'
        }
      ]
    },
    kenyanAnalogy: {
      title: '🇰🇪 The Trusted Veteran Hardware & Agrovet Store in Town (`yum`)',
      icon: '🛠️🏪',
      summary:
        'Think of that famous, long-standing Hardware & Agrovet shop in town that has suppliedmabati, cement, and water pipes since 2003. Even if newer malls (`dnf`) have opened, veteran fundis and company servers still walk in and place `yum` orders every day!',
      points: [
        {
          emoji: '🤝',
          name: 'yum and dnf Speak the Same Language!',
          simple:
            'On modern RHEL 8/9 and Fedora systems, even if you type `sudo yum install`, the store politely forwards your order to `dnf` automatically—so your `yum` muscle memory works forever!'
        },
        {
          emoji: '📋',
          name: 'sudo yum makecache (Writing Down the Stock List)',
          simple:
            'Like the hardware shopkeeper updating the stock chalkboard in the morning so customers can check prices immediately.'
        },
        {
          emoji: '🗺️',
          name: 'Complete Linux Store Map in One Glance',
          simple:
            '• **Ubuntu / Debian**: `apt-get` + `dpkg` (`.deb` boxes)\n• **Fedora / RHEL 8+**: `dnf` (`.rpm` boxes)\n• **CentOS / Older RHEL**: `yum` (`.rpm` boxes)'
        }
      ]
    },
    bodyMove: {
      title: '🤸 5-Second Body Move: Hammer the Nail & Check the Clipboard!',
      instruction:
        'Pretend to hammer a sturdy nail twice ("Bang! Bang! — sudo yum install!") and then tap an imaginary clipboard ("yum makecache — Classic Hardware Store!").',
      whyItWorks:
        'Hammering a sturdy nail connects `yum` with the classic, rock-solid CentOS/RHEL hardware store!'
    },
    quickTakeaway:
      '`yum` is the classic CentOS/RHEL package manager for `.rpm` packages: `sudo yum makecache`, `sudo yum install`, `sudo yum update`, and `sudo yum remove`!'
  }
];
