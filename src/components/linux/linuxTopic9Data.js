// Topic 9: Networking Services (3 Subtopics)
// DHCP (The Automatic Welcome Desk), DNS (The Phonebook / Librarian), FTP (The Delivery Truck)
// Borrows helpful CCNA analogies (DORA Welcome Desk, APIPA DIY badge, DHCP Relay chute,
// DNS Phonebook & Cache TTL, TCP ports) while keeping the Linux Cozy House 100% standalone.

export const linuxTopic9Subtopics = [
  // ==========================================================================
  // 9.1 DHCP
  // ==========================================================================
  {
    id: 'dhcp-service',
    number: '9.1',
    title: 'Dynamic Host Configuration Protocol (DHCP)',
    shortTitle: 'DHCP',
    icon: '🪪🛎️',
    pastelBg: 'bg-sky-50',
    borderColor: 'border-sky-300',
    accentText: 'text-sky-950',
    badgeBg: 'bg-sky-100 text-sky-900',
    laymanHeadline:
      'DHCP is the friendly gatekeeper that automatically hands every new phone, laptop, or TV an IP address (plus the gateway and DNS info) the moment it joins the network—so nobody has to type settings by hand.',
    laymanExplanation:
      'Imagine 50 guests arriving at a party and the host having to write a name tag for each one by hand—slow and full of mistakes (two guests might even get the same tag!). DHCP solves this. A DHCP Server (often your home router, or a Linux server running isc-dhcp-server / Kea) keeps a pool of free addresses. When a new device connects, it shouts "I need an address!" and the server lends it one for a set time (a lease), along with the Subnet Mask, Default Gateway (main gate), and DNS server (phonebook). This 4-step chat is called DORA: Discover → Offer → Request → Acknowledge. When the lease expires, the address returns to the pool for someone else.',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Gatekeeper Handing Out Temporary House Keys',
      icon: '🏠🔑',
      summary:
        '“DHCP is the gatekeeper at Sam’s front gate who automatically hands every visitor a labeled key (IP address) from a hook board—no need for Sam to cut keys by hand!”',
      points: [
        {
          name: 'The Key Hook Board = The Address Pool (Range)',
          emoji: '🪝🔑',
          desc: 'The gatekeeper has a board with keys numbered 192.168.1.100 to 192.168.1.200. Each new visitor takes one free key. No two visitors ever get the same key, so there are no clashes!'
        },
        {
          name: 'DORA = The 4-Step Gate Chat',
          emoji: '🗣️4️⃣',
          desc: '1. Discover: Visitor shouts "Any gatekeeper here? I need a key!"\n2. Offer: Gatekeeper replies "Take key #105!"\n3. Request: Visitor says "Yes please, I’ll take #105!"\n4. Acknowledge: Gatekeeper writes it in the logbook: "#105 is yours for 24 hours."'
        },
        {
          name: 'The Lease = Borrowing the Key for a Set Time',
          emoji: '⏳📒',
          desc: 'Keys are borrowed, not owned. Halfway through the lease, the visitor politely asks to renew. If the visitor leaves and never comes back, the key returns to the hook board for the next guest.'
        },
        {
          name: 'Reservations = A Key With Your Name Engraved',
          emoji: '🏷️🖨️',
          desc: 'For the family printer or a server that must always be found at the same spot, the gatekeeper reserves a key tied to its permanent MAC plate—so it gets #50 every single time.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: The Office Building Reception Handing Out Visitor Badges!',
      icon: '🇰🇪🪪',
      summary:
        '“Walk into any office block in Upper Hill: the receptionist hands you a numbered visitor badge, tells you which lift to use and where the directory is, and collects the badge when you leave!”',
      points: [
        {
          name: 'Reception Desk = DHCP Server',
          emoji: '🛎️👩🏾‍💼',
          desc: 'The receptionist keeps a tray of badges #100–#200. Every visitor gets the next free badge, plus directions: "The main exit is Gate A (Default Gateway) and the building directory is on Floor 1 (DNS)."'
        },
        {
          name: 'DORA = "Habari, nisaidie badge?" → "Chukua #105" → "Sawa, #105!" → "Imeandikwa!"',
          emoji: '🗣️📝',
          desc: 'You ask for a badge (Discover), she offers #105 (Offer), you accept it (Request), and she writes your name and time in the visitor book (Acknowledge).'
        },
        {
          name: 'APIPA 169.254.x.x = Writing Your Own Paper Badge When Reception Is Closed',
          emoji: '📄😕',
          desc: 'Borrowed from CCNA: if no receptionist answers, your device makes its own "169.254.x.x" paper badge. It only works for chatting in the lobby—you can’t leave the building (no internet). Seeing 169.254 means "DHCP server is not answering!"'
        },
        {
          name: 'DHCP Relay = The Askari Who Phones Reception on Another Floor',
          emoji: '📞🏢',
          desc: 'If reception is on a different floor (another subnet), the floor Askari (router with ip helper/relay) forwards your badge request upstairs and brings the badge back down to you.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "D-O-R-A Hand Wave!"',
      instruction: 'Act out the 4 DHCP steps with your hands right now:',
      steps: [
        '1️⃣ Cup your hands around your mouth 📣 — say: "D = Discover (Anyone there?)"',
        '2️⃣ Hold out an open palm 🤲 — say: "O = Offer (Take #105!)"',
        '3️⃣ Point to yourself 👉😊 — say: "R = Request (I’ll take it!)"',
        '4️⃣ Give a thumbs-up 👍 — say: "A = Acknowledge (It’s yours for 24 hours!)"'
      ]
    },
    quickTakeaway:
      'DHCP automatically lends IP address + Mask + Gateway + DNS using DORA (Discover, Offer, Request, Acknowledge). Addresses are leased, not owned. Seeing 169.254.x.x means DHCP failed!'
  },

  // ==========================================================================
  // 9.2 DNS
  // ==========================================================================
  {
    id: 'dns-service',
    number: '9.2',
    title: 'Domain Name System (DNS)',
    shortTitle: 'DNS',
    icon: '📖🔎',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-900',
    laymanHeadline:
      'DNS is the internet’s phonebook: it turns easy names like google.com into the number addresses (IP addresses) that computers actually use.',
    laymanExplanation:
      'Computers find each other using numbers like 142.251.42.78, but humans are much better at remembering names like google.com. DNS is the giant shared phonebook that translates names into numbers. When you type a website name, your computer first checks its own notes (/etc/hosts and its memory cache). If it doesn’t know, it asks a DNS Resolver (listed in /etc/resolv.conf, e.g. 8.8.8.8). The resolver walks down the phonebook hierarchy: the Root servers ("." – who handles .com?) → the TLD servers (".com" – who handles google.com?) → the Authoritative server for google.com ("Here is the exact address!"). The answer is saved for a while (TTL) so the next lookup is instant. On Linux you test DNS with dig, nslookup, host, and resolvectl, and you can run your own DNS server with BIND9 (named).',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Librarian With the Giant Phonebook',
      icon: '🏠📚',
      summary:
        '“You tell the librarian a friend’s name (google.com); she looks it up in the phonebook and hands you their house number (142.251.42.78)!”',
      points: [
        {
          name: 'Step 1: Your Own Sticky Notes (/etc/hosts & Cache)',
          emoji: '📝🧠',
          desc: 'Before asking anyone, Sam checks his fridge sticky notes (/etc/hosts) and his memory (cache). If he already knows the address, he goes straight there—super fast!'
        },
        {
          name: 'Step 2: The Librarian (DNS Resolver in /etc/resolv.conf)',
          emoji: '👩‍🏫📖',
          desc: 'If Sam doesn’t know, he asks the neighborhood librarian (resolver like 8.8.8.8 or 1.1.1.1). She does all the running around for him.'
        },
        {
          name: 'Step 3: The Library Floors (Root → .com TLD → Authoritative)',
          emoji: '🏛️⬇️',
          desc: 'The librarian asks the Head Library (Root "."): "Who knows .com?" → goes to the .com Section (TLD): "Who knows google.com?" → reaches Google’s own record keeper (Authoritative Name Server): "google.com = 142.251.42.78!"'
        },
        {
          name: 'Record Types = Different Kinds of Phonebook Entries',
          emoji: '🗂️🏷️',
          desc: '• A = name → IPv4 address\n• AAAA = name → IPv6 address\n• CNAME = nickname that points to another name (www → google.com)\n• MX = where to deliver this name’s email\n• NS = which record keeper is in charge\n• PTR = reverse lookup (number → name)\n• TXT = notes and verification text'
        },
        {
          name: 'TTL = How Long You May Trust Your Sticky Note',
          emoji: '⏱️📝',
          desc: 'Each answer comes with a Time-To-Live (e.g. 300 seconds). Sam may reuse the sticky note until it expires, then he must ask the librarian again in case the friend moved house.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Saving Contacts on Your Phone & Asking the Stage Directory!',
      icon: '🇰🇪📱',
      summary:
        '“You never memorize 0722 xxx xxx—you just tap ‘Mama’ in your contacts. DNS is the contacts list for the whole internet!”',
      points: [
        {
          name: 'Your Phone Contacts = /etc/hosts & Local Cache',
          emoji: '📱👩🏾',
          desc: 'Names you saved yourself ("Mama", "Fundi Musa") are dialed instantly without asking anyone—just like entries in /etc/hosts or the DNS cache.'
        },
        {
          name: 'The Resolver = Calling Safaricom Customer Care / A Well-Connected Friend',
          emoji: '☎️🤝',
          desc: 'For a number you don’t have, you ask a well-connected friend (resolver 8.8.8.8). They make all the follow-up calls for you and come back with the answer.'
        },
        {
          name: 'Root → TLD → Authoritative = County → Town → Shop Owner',
          emoji: '🗺️🏪',
          desc: 'Like asking: "Which county is .ke in?" → "Which town office handles co.ke?" → finally the shop owner who says "Naivas is at Plot 142.251.42.78!" Each level only knows the next level down.'
        },
        {
          name: 'When DNS Breaks = "I know the plot number but not the name"',
          emoji: '🚧🤔',
          desc: 'If ping 8.8.8.8 works but ping google.com fails, the roads are fine—only the phonebook is broken! Check /etc/resolv.conf or run resolvectl status.'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Name In, Number Out!"',
      instruction: 'Feel DNS translation in your hands:',
      steps: [
        '1️⃣ Hold up your LEFT hand like a name card 🪪 — say: "google.com (The Name)!"',
        '2️⃣ Flip it over like turning a phonebook page 📖 — say: "DNS looks it up: Root → .com → Google!"',
        '3️⃣ Hold up fingers like digits on your RIGHT hand 🔢 — say: "142.251.42.78 (The Number)!"'
      ]
    },
    quickTakeaway:
      'DNS = Phonebook that turns names into IP addresses. Lookup order: /etc/hosts & cache → resolver (/etc/resolv.conf) → Root → TLD → Authoritative. Test with dig, nslookup, host, resolvectl.'
  },

  // ==========================================================================
  // 9.3 FTP
  // ==========================================================================
  {
    id: 'ftp-service',
    number: '9.3',
    title: 'File Transfer Protocol (FTP)',
    shortTitle: 'FTP',
    icon: '🚚📦',
    pastelBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    accentText: 'text-rose-950',
    badgeBg: 'bg-rose-100 text-rose-900',
    laymanHeadline:
      'FTP is the delivery truck that carries files (boxes) between computers: you can upload (put) files to a server or download (get) files from it.',
    laymanExplanation:
      'FTP is one of the oldest ways to move files between a client (your computer) and a server (another computer). On Linux, a popular FTP server is vsftpd ("Very Secure FTP Daemon"), and you connect with the ftp, lftp, or FileZilla client. FTP uses two "lanes": a Control lane on Port 21 (where you give instructions like ls, cd, get, put) and a Data lane (Port 20 in Active mode, or a random high port in Passive mode) where the actual boxes travel. Big warning: plain FTP sends your username, password, and files as readable plain text—anyone watching the road can read them! For safety, modern Linux users prefer SFTP (file transfer over SSH, Port 22), scp, or FTPS (FTP wrapped in TLS encryption).',
    originalAnalogy: {
      title: 'Original House Analogy (Made Extra Simple): The Delivery Truck Between Houses',
      icon: '🏠🚚🏠',
      summary:
        '“You phone the warehouse office (Port 21) to say what you want, and a delivery truck drives the boxes (files) along a separate lane (data channel)!”',
      points: [
        {
          name: 'Client & Server = Your House & The Warehouse',
          emoji: '🏠🏭',
          desc: 'The FTP Server (vsftpd) is a warehouse full of boxes. Your FTP client (ftp, lftp, FileZilla) is the phone you use to place orders.'
        },
        {
          name: 'Two Lanes: Control (Port 21) & Data (Port 20 / Passive Port)',
          emoji: '☎️🛣️',
          desc: '• Control lane (Port 21) = the phone line where you give instructions: login, ls, cd.\n• Data lane = the road where the truck actually carries boxes. Active mode: the warehouse drives to you from Port 20. Passive mode: you drive to the warehouse at a door it tells you—friendlier for home firewalls.'
        },
        {
          name: 'get = Bring a Box Home, put = Send a Box Away',
          emoji: '⬇️⬆️',
          desc: '• get report.pdf = download one box\n• put photo.jpg = upload one box\n• mget *.txt / mput *.jpg = many boxes at once\n• binary = treat boxes as sealed (images, zips); ascii = plain text\n• bye = hang up'
        },
        {
          name: 'Plain FTP = An Open Truck With No Cover 😬',
          emoji: '🚚👀',
          desc: 'Everyone on the road can read the labels and even your password note taped to the windscreen! SFTP (over SSH, Port 22) and FTPS (TLS) are the locked, armored trucks.'
        }
      ]
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Sending Mzigo With a Matatu Sacco Parcel Office (G4S vs Open Pickup)!',
      icon: '🇰🇪📦🚐',
      summary:
        '“You call the Sacco parcel office to book (Port 21), then the mzigo travels on the matatu (data lane). Plain FTP is an open pickup; SFTP is a sealed G4S van!”',
      points: [
        {
          name: 'Booking Office Phone (Port 21) vs. The Matatu Carrying the Mzigo (Data Lane)',
          emoji: '📞🚐',
          desc: 'You first talk to the clerk at the parcel office (control on Port 21): "Login, show me what parcels are waiting (ls)." Then the actual parcels ride a separate matatu (data channel).'
        },
        {
          name: 'get & put = Collecting vs. Sending Mzigo Upcountry',
          emoji: '⬇️⬆️',
          desc: 'get = collect the parcel your cousin sent from Kisumu. put = send your parcel to the Kisumu office. mget/mput = a whole gunia of parcels at once!'
        },
        {
          name: 'Anonymous FTP = The Public Notice Board at the Stage',
          emoji: '📋🌍',
          desc: 'Some servers let anyone log in as "anonymous" to download public files—like free timetables pinned at the stage. Great for sharing, dangerous if you allow uploads!'
        },
        {
          name: 'FTP vs SFTP = Open Pickup Truck vs. Sealed G4S Cash Van',
          emoji: '🛻🔐',
          desc: 'Plain FTP carries your M-Pesa PIN and documents in the open where anyone at the roadside can read them. SFTP (sftp user@server) and scp use the sealed SSH van on Port 22—always choose the sealed van for private files!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Phone 21, Pull Down, Push Up, Lock It!"',
      instruction: 'Lock FTP into muscle memory:',
      steps: [
        '1️⃣ Hold your hand to your ear like a phone ☎️ — say: "Port 21 = Control (Give instructions)!"',
        '2️⃣ Pull an imaginary box DOWN towards you ⬇️📦 — say: "get = Download!"',
        '3️⃣ Push the box UP and away ⬆️📦 — say: "put = Upload!"',
        '4️⃣ Turn an imaginary key 🔐 — say: "Use SFTP on Port 22 for secrets!"'
      ]
    },
    quickTakeaway:
      'FTP moves files: Control on Port 21, Data on Port 20 (Active) or a high port (Passive). get = download, put = upload. Plain FTP is unencrypted—prefer SFTP/scp (SSH, Port 22) or FTPS. Common server: vsftpd.'
  }
];
