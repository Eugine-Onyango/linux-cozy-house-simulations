// Topic 8: Linux Networking (7 Subtopics)
// Configuring IP addresses and managing network interfaces to setting up firewalls,
// monitoring traffic, and enabling communication between devices and servers.
// Includes borrowed CCNA networking analogies (Houses & Roads, Gated LAN Compound,
// TCP G4S Van vs. UDP Boda-Boda, DHCP Welcome Desk, NAT Apartment Mailboxes, ARP Megaphone,
// Matatu Stage Hops, and Askari Gate Rulebooks) while keeping the Linux Cozy House 100% standalone.

export const linuxTopic8Subtopics = [
  // ==========================================================================
  // 8.1 CONFIGURING NETWORK INTERFACES (& FIREWALLS)
  // ==========================================================================
  {
    id: 'configuring-network-interfaces',
    number: '8.1',
    title: 'Configuring Network Interfaces & Firewalls',
    shortTitle: 'Configuring Interfaces',
    icon: '🚪🛡️',
    pastelBg: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    accentText: 'text-cyan-950',
    badgeBg: 'bg-cyan-100 text-cyan-900',
    laymanHeadline:
      'Setting up your computer’s doors (network interfaces), giving your house a plot address (Static or DHCP), pointing to the main gate (Gateway) & phonebook (DNS), and placing a security guard (Firewall) at every entrance!',
    laymanExplanation:
      'A single computer all alone is like a house with bricked-up walls—no messages can get in or out! To connect to your neighborhood (LAN) and the world (Internet), your Linux house needs Doors (Network Interfaces like eth0, enp0s3, or wlan0), a Unique Address (IP Address + Subnet Mask), a Main Street Gate (Default Gateway router), and a Phonebook (DNS) to translate website names like google.com into numbers. Finally, because opening doors invites strangers, you configure a Firewall Guard (iptables, firewalld, or UFW) right at the doors to decide who is welcome and who is blocked!',
    originalAnalogy: {
      title:
        'House & Smart-City Analogy: House Doors, Mailboxes, Welcome Desk & The Security Guard’s Rulebook',
      icon: '🏠🛣️🛡️',
      summary:
        '“Your network interfaces are the physical and virtual doors of Sam’s house, your IP is the mailbox number, and the Firewall is the uniformed guard checking rulebooks top-to-bottom!”',
      points: [
        {
          name: 'Network Interfaces = The Different Doors of Your House (eth0, enp0s3, wlan0, lo)',
          emoji: '🚪🏡',
          desc: '• eth0 / enp0s3 = The sturdy Front Door connected by a physical tarmac cable (Ethernet).\n• wlan0 = The glass Back Patio Door where wireless courier drones (Wi-Fi) fly in.\n• lo (127.0.0.1) = The Secret Internal Hallway (Loopback) so family members inside the house can pass notes to themselves without ever stepping outside!\n• vlan10 / ifgrp1-2 = Special colored-badge doors (Virtual Interfaces). Naming rule: start with a letter, no spaces, under 15 characters!'
        },
        {
          name: 'Static IP vs. DHCP Welcome Desk, Subnet Mask (/24), Gateway & DNS Phonebook',
          emoji: '📬🪪📖',
          desc: '• Static IP (manual) = Painting a permanent house number (e.g., 192.168.1.5) on your mailbox so servers are always found at the exact same spot.\n• DHCP (auto) = Visiting the Neighborhood Welcome Desk that automatically hands out a temporary visitor badge (Discover → Offer → Request → Acknowledge).\n• Subnet Mask (/24 or 255.255.255.0) = Tells which part of the address is your Blue Street Name (192.168.1) and which is your Yellow House Number (.5).\n• Default Gateway (192.168.1.1) = The Main Neighborhood Gate (Router) leading out to other cities.\n• DNS (8.8.8.8) = The Phonebook that looks up "google.com" and tells you its house number!'
        },
        {
          name: 'iptables = The Old-School Security Guard with 5 Rulebooks & 3 Checkpoints',
          emoji: '👮‍♂️📕',
          desc: 'Checks visitors using Tables (Filter = Main guest list, NAT = Apartment mailroom redirection, Mangle = VIP priority) and Chains (INPUT = Front gate arriving, OUTPUT = Back gate leaving, FORWARD = Passing through hallway). Actions: ACCEPT (Welcome!), DROP (Pretend nobody is home), REJECT (Send "No entry" note). CRITICAL RULE: The guard reads rules TOP-TO-BOTTOM (-I inserts at top, -A appends at bottom), and you must save rules in a waterproof notebook (iptables-save)!'
        },
        {
          name: 'firewalld (Zones Tablet) & UFW (Friendly Smartphone App)',
          emoji: '📱🗺️',
          desc: '• firewalld = The Modern Manager who divides your property into Zones (Public front yard, Home living room, DMZ guest room) and updates rules live (--reload).\n• UFW (Uncomplicated Firewall) = The Beginner-Friendly Guard with 1-tap commands like "sudo ufw allow ssh" and "sudo ufw enable"!'
        }
      ]
    },
    kenyanAnalogy: {
      title:
        'Kenyan Mtaa Analogy: Compound Gates, Plot Numbers, Nyumba Kumi Court, Posta Directory & The Gate Askari!',
      icon: '🇰🇪🏘️💂🏾‍♂️',
      summary:
        '“Connecting your boma in a gated estate court (LAN): setting your Plot Number, knowing the Main Barrier Gate (Gateway), using the M-Pesa/Phonebook Directory (DNS), and giving the Askari clear entry rules!”',
      points: [
        {
          name: 'Interfaces = Main Steel Gate (enp0s3), Rooftop Dish (wlan0) & Internal Compound Path (lo)',
          emoji: '🚧📡',
          desc: 'In your homestead, enp0s3 is the main tarmac driveway gate, wlan0 is the wireless air link, and lo (127.0.0.1) is the kitchen-to-sitting-room corridor where you walk without ever leaving the house!'
        },
        {
          name: 'Title Deed Plot Number (Static IP) vs. Office Reception Visitor Badge (DHCP)',
          emoji: '🪧🪪',
          desc: 'A supermarket or M-Pesa wakala shop needs a permanent Plot Number (Static IP: 192.168.1.5) so customers always find it. A customer walking into a Nairobi office building just gets a temporary plastic visitor badge at the reception desk (DHCP)! The Estate Barrier (192.168.1.1) is your Default Gateway out to Thika Superhighway.'
        },
        {
          name: 'The Askari’s Clipboard (iptables): Order Matters Top-to-Bottom!',
          emoji: '💂🏾‍♂️📋',
          desc: 'If you tell the estate Askari on Line 1: "Block Kamau (DROP)" and on Line 2: "Let Kamau deliver milk to Door 22 (ACCEPT)", the Askari reads Line 1 first, chases Kamau away, and never reads Line 2! You must put the specific exception at Line 1 (iptables -I INPUT 1) above the general block!'
        },
        {
          name: 'Compound Security Zones (firewalld) & 1-Button Guard (UFW)',
          emoji: '🛡️🔐',
          desc: 'firewalld separates the Roadside Verandah (Public Zone) from the Family Sitting Room (Home Zone), while UFW lets you simply tell the watchman: "sudo ufw allow ssh" (Fungulia fundi mlango wa nyuma!).'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Door, Address, Gate & Askari Stop!"',
      instruction:
        'Lock the 4 pillars of configuring network interfaces and firewalls into your hands right now:',
      steps: [
        '1️⃣ Swing your RIGHT arm open like a front door 🚪 — say: "Interface (enp0s3 / wlan0)!"',
        '2️⃣ Slap an imaginary badge onto your chest 🪪 — say: "IP Address + Gateway + DNS!"',
        '3️⃣ Hold up your LEFT palm like a traffic Askari signaling STOP ✋ — say: "Firewall (Check rules Top-to-Bottom)!"'
      ]
    },
    quickTakeaway:
      'Configure Interfaces = Name your Door (enp0s3/wlan0) + Set IP/Mask, Gateway & DNS + Guard the door with iptables/firewalld/UFW (putting specific ACCEPT rules ABOVE general DROP rules)!'
  },

  // ==========================================================================
  // 8.2 MANAGING IP ADDRESSES AND INTERFACES
  // ==========================================================================
  {
    id: 'managing-ip-addresses-and-interfaces',
    number: '8.2',
    title: 'Managing IP Addresses and Interfaces (ip, ifconfig, ethtool, hostname)',
    shortTitle: 'IPs & Interfaces',
    icon: '🪪🔧',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-950',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    laymanHeadline:
      'Inspecting your computer’s doors, turning doors ON or OFF, attaching or removing IP address plates with the modern "ip" tool (and classic "ifconfig"), checking cable speed with "ethtool", and naming your house with "hostname".',
    laymanExplanation:
      'Once your network doors exist, how do you check if they have an address, open a closed door, or check if the physical cable is healthy? Linux gives you the modern Swiss-Army tool called "ip" (which replaced the older "ifconfig" clipboard). With "ip a" you see every door’s IPv4/IPv6 plot number and permanent MAC hardware plate; with "ip link set dev eth0 up/down" you unlock or lock a door; with "ethtool" you check the physical wire speed; and with "hostname" you read or change your house’s name sign!',
    originalAnalogy: {
      title:
        'House & Smart-City Analogy: The Door Inspector, Address Plates, Plumber’s Gauge & Mailbox Name',
      icon: '🏠🪪🧰',
      summary:
        '“Walk around your house with the modern ip tablet (or classic ifconfig clipboard) to check door locks, hang address plates, test water pressure (ethtool), and paint the mailbox name (hostname)!”',
      points: [
        {
          name: 'ip addr show (or ip a) = The Modern Digital Door & Address Scanner',
          emoji: '📱🚪',
          desc: 'Shows every entrance (1: lo, 2: enp0s3, 3: wlan0), whether the door is open (state UP) or closed (state DOWN), its permanent factory licence plate (link/ether MAC address), and its street number (inet 192.168.1.5/24).'
        },
        {
          name: 'ip addr add / del & ip link set up / down = Hanging Plates & Opening Doors',
          emoji: '🪧🔓',
          desc: '• sudo ip addr add 192.168.1.50/24 dev enp0s3 = Screw a new address plate onto the front door.\n• sudo ip addr del 192.168.1.50/24 dev enp0s3 = Unscrew that address plate.\n• sudo ip link set enp0s3 up (or down) = Unlock and swing the door open (UP) or bolt it shut (DOWN).'
        },
        {
          name: 'ifconfig = The Classic Door Inspector Clipboard',
          emoji: '📋🕰️',
          desc: 'The older tool from the net-tools kit (ifconfig, ifconfig eth0 up/down). Still loved by veteran homeowners, though modern Linux houses prefer the faster "ip" command!'
        },
        {
          name: 'ethtool (Plumber’s Pipe Gauge) & hostname / hostnamectl (Mailbox Nameplate)',
          emoji: '🔧📬',
          desc: '• ethtool enp0s3 = Checks physical wire health: Speed (1000Mb/s), Duplex (Full = two-way highway bridge where traffic flows both ways at once), and Link detected (yes = cable is plugged in!).\n• hostname & sudo hostnamectl set-hostname cozy-house = Checks or paints the friendly name on your front mailbox!'
        }
      ]
    },
    kenyanAnalogy: {
      title:
        'Kenyan Mtaa Analogy: Vehicle Logbook Plate (MAC) vs. Plot Number (IP), Gate Lock, Water Pressure & Boma Sign!',
      icon: '🇰🇪🚗🚰',
      summary:
        '“Every door has a permanent NTSA Chassis/Number Plate (MAC) and a current Town Plot Number (IP), plus a gate bolt (up/down) and pipe pressure gauge (ethtool)!”',
      points: [
        {
          name: 'MAC Address vs. IP Address (Shown in ip a / ifconfig)',
          emoji: '🚗📍',
          desc: 'Borrowed from our road rules: link/ether (MAC Address like 08:00:27:ab:cd:ef) is like a car’s permanent NTSA number plate KDA 123X—it is stamped at the factory and never changes. inet (IP Address like 192.168.1.5) is the current Estate & Plot Number where the car is parked today!'
        },
        {
          name: 'ip link set eth0 up / down = Opening or Padlocking the Compound Gate',
          emoji: '🔓🔒',
          desc: 'Even if your plot has an address sign, nobody can enter if the iron gate is padlocked (state DOWN)! Running "sudo ip link set enp0s3 up" tells the watchman to unbolt and swing the gate wide open (state UP).'
        },
        {
          name: 'ethtool enp0s3 = Nairobi Water Pipe Pressure & Two-Way Bridge Check',
          emoji: '🚰🌉',
          desc: 'When the internet feels slow, ethtool checks the physical pipe: Is the pipe connected (Link detected: yes)? Is water flowing at high pressure (1000Mb/s)? Is it a modern two-way highway bridge (Full Duplex) instead of a narrow one-way footbridge (Half Duplex)?'
        },
        {
          name: 'hostname & hostnamectl = The Painted Signboard at Your Gate',
          emoji: '🪧🏡',
          desc: 'Instead of neighbors calling your place "Plot 192.168.1.5", hostnamectl paints "Mama-Wanjiku-Boma" on the gatepost so everyone knows whose home it is!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "ip a Scan, Gate UP, Pipe Full!"',
      instruction:
        'Do these 3 quick gestures to lock IP & Interface commands into muscle memory:',
      steps: [
        '1️⃣ Hold both hands open like reading a tablet 📱 — say: "ip a (See MAC plate & IP number)!"',
        '2️⃣ Push both thumbs high in the air 👍👍 — say: "ip link set up (Open the Gate)!"',
        '3️⃣ Move your hands past each other in opposite directions like a 2-way highway 双向 🚗🚙 — say: "ethtool (Full Duplex & 1000Mb/s)!"'
      ]
    },
    quickTakeaway:
      'Use "ip a" (or "ifconfig") to see IPs & MAC plates, "ip addr add/del" to change IPs, "ip link set up/down" to open/close doors, "ethtool" to inspect the cable, and "hostnamectl" to name your computer!'
  },

  // ==========================================================================
  // 8.3 MANAGING NETWORK CONNECTIONS (nmcli & nmtui)
  // ==========================================================================
  {
    id: 'managing-network-connections',
    number: '8.3',
    title: 'Managing Network Connections (NetworkManager, nmcli & nmtui)',
    shortTitle: 'Managing Connections',
    icon: '🧑‍💼📋',
    pastelBg: 'bg-indigo-50',
    borderColor: 'border-indigo-300',
    accentText: 'text-indigo-950',
    badgeBg: 'bg-indigo-100 text-indigo-900',
    laymanHeadline:
      'Using your full-time House Connections Manager (NetworkManager) via quick commands (nmcli) or a friendly fill-in-the-blanks screen (nmtui) so your network settings survive every reboot!',
    laymanExplanation:
      'When you add an IP address using raw "ip addr add", it is like writing your house number in chalk—if it rains (your computer reboots), the chalk washes away! To make settings permanent and manage Wi-Fi and Ethernet profiles smoothly, Linux uses a smart service called NetworkManager. You can talk to NetworkManager in two easy ways: type fast one-line instructions with "nmcli" (NetworkManager Command-Line), or open a cozy arrow-key form on your screen with "nmtui" (NetworkManager Text User Interface)!',
    originalAnalogy: {
      title:
        'Original House Analogy: The House Management Office (nmcli Walkie-Talkie & nmtui Paper Form)',
      icon: '🏢📝🔄',
      summary:
        '“NetworkManager is your permanent House Connections Manager: nmcli gives him crisp 6-step instructions, and nmtui opens a friendly form where you just fill in the blanks!”',
      points: [
        {
          name: 'Step 1: Find Your Doors & Profiles (nmcli d & nmcli con show)',
          emoji: '🔍🚪',
          desc: 'Run "nmcli d" (or "nmcli device status") to walk around the house and see every door (enp0s3, wlan0, lo) and whether it is connected. Run "nmcli connection show" to see saved connection blueprints.'
        },
        {
          name: 'Steps 2–5: Set Address, Gateway, DNS & Method with nmcli con mod',
          emoji: '🛠️📬',
          desc: '• nmcli connection modify enp0s3 ipv4.addresses 192.168.1.5/24 (Set permanent house number)\n• nmcli connection modify enp0s3 ipv4.gateway 192.168.1.1 (Set neighborhood gate)\n• nmcli connection modify enp0s3 ipv4.dns "8.8.8.8 8.8.4.4" (Install Google phonebooks)\n• nmcli connection modify enp0s3 ipv4.method manual (Use permanent Static IP, or "auto" for DHCP Welcome Desk!)'
        },
        {
          name: 'Step 6: Restart the Door & Verify (nmcli con down/up & nmcli device show)',
          emoji: '🔄✅',
          desc: 'Close and reopen the door so the new nameplate takes effect: "nmcli connection down enp0s3 && nmcli connection up enp0s3". Then inspect your official House ID card with "nmcli device show enp0s3"!'
        },
        {
          name: 'nmtui = The Friendly Interactive Office Form (Zero Commands to Memorize!)',
          emoji: '🖥️⌨️',
          desc: 'Don’t feel like typing long commands? Just type "nmtui" and press Enter! A neat blue menu pops up right in your terminal where you use arrow keys to pick "Edit a connection", type your IP, or "Activate a connection" in seconds.'
        }
      ]
    },
    kenyanAnalogy: {
      title:
        'Kenyan Mtaa Analogy: The Estate Caretaker’s Official Ledger (nmcli) & Huduma Counter Form (nmtui)!',
      icon: '🇰🇪🏢📝',
      summary:
        '“Writing in chalk washes away when it rains (reboot); registering your plot details with the Estate Caretaker (nmcli / nmtui) locks them permanently into the estate file folder!”',
      points: [
        {
          name: 'Why NetworkManager Beats Chalk: Permanent Files in /etc/NetworkManager/',
          emoji: '📁🔒',
          desc: 'When you tell the Caretaker (nmcli) to update your plot address, he writes it into permanent files inside /etc/NetworkManager/system-connections/. Even if KPLC power goes off and comes back on (reboot), your plot number, main barrier gate, and phonebook are still there!'
        },
        {
          name: 'nmcli = Sending Direct SMS Instructions to the Caretaker',
          emoji: '📲⚡',
          desc: 'In 6 quick lines (nmcli d → modify ipv4.addresses → modify ipv4.gateway → modify ipv4.dns → modify ipv4.method manual → down/up), you configure an entire CentOS, RHEL, or Ubuntu server without touching a mouse—and you can even connect to Wi-Fi with "nmcli dev wifi connect"!'
        },
        {
          name: 'nmtui = Filling a Guided Huduma Centre / Sacco Paper Form',
          emoji: '📋✍️',
          desc: 'Like walking up to a friendly Huduma Centre desk where the clerk hands you a printed form with labeled boxes: [IP Address], [Gateway], [DNS Servers], and an [OK] button at the bottom!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Modify, Down, Up — Permanent!"',
      instruction:
        'Act out the famous nmcli workflow with your hands in 5 seconds:',
      steps: [
        '1️⃣ Pretend to write on a clipboard ✍️ — say: "nmcli connection modify (Write IP, Gateway, DNS)!"',
        '2️⃣ Pull an imaginary lever DOWN 👇 — say: "nmcli connection down (Close gate)!"',
        '3️⃣ Push that lever UP high 👆 — say: "nmcli connection up (Reopen with new permanent address)!"'
      ]
    },
    quickTakeaway:
      'NetworkManager keeps your connections permanent across reboots! Use "nmcli" for fast command-line setup (modify -> down -> up) or "nmtui" for a friendly interactive menu.'
  },

  // ==========================================================================
  // 8.4 TESTING NETWORK CONNECTIVITY (ping, nslookup, dig, host, arp)
  // ==========================================================================
  {
    id: 'testing-network-connectivity',
    number: '8.4',
    title: 'Testing Network Connectivity (ping, nslookup, dig, host & arp)',
    shortTitle: 'Testing Connectivity',
    icon: '✊📖',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-900',
    laymanHeadline:
      'Knocking on another computer’s door to see if they are home (ping), looking up website addresses in the phonebook (nslookup, dig, host), and checking who lives next door on your local street (arp).',
    laymanExplanation:
      'When the internet feels broken, don’t guess—use your 3-step detective kit! First, knock on a door with "ping" (it sends a tiny ICMP "Are you there?" note and times how many milliseconds the "Yes, I’m home!" reply takes). Second, if you can ping numbers (like 8.8.8.8) but website names (like google.com) won’t open, check the DNS Phonebook using "nslookup", "dig", or "host". Third, to see which neighbor devices are connected right inside your local room or Wi-Fi court, check your Neighborhood Street Map with "arp -a" (or "ip neigh")!',
    originalAnalogy: {
      title:
        'House & Smart-City Analogy: The Door Knocker (ping), Phonebook & Town Hall Records (nslookup/dig), and Street Map (arp)',
      icon: '✊📖🗺️',
      summary:
        '“Knock on the door with ping, look up names in the phonebook with nslookup/dig, and match local house numbers to vehicle licence plates with arp!”',
      points: [
        {
          name: 'ping = The Wooden Door Knocker ("Ping?" → "Pong!")',
          emoji: '✊🚪',
          desc: 'Running "ping -c 4 google.com" knocks 4 times on Google’s door. Each reply ("64 bytes from 142.250.185.206: icmp_seq=1 time=12.3 ms") proves the road works and tells you how fast the round-trip is! If it says "100% packet loss", nobody answered.'
        },
        {
          name: 'nslookup & host = The Friendly Neighborhood Phonebook Directory',
          emoji: '📖☎️',
          desc: 'Humans remember names like "google.com", but roads use numbers like "142.250.185.206". Running "nslookup google.com" (or "host google.com") asks the DNS directory clerk: "What is Google’s house number?"'
        },
        {
          name: 'dig = Visiting Town Hall for Complete Official Property Records',
          emoji: '🏛️📜',
          desc: 'When a simple lookup isn’t enough, "dig google.com" pulls the full property deed: QUESTION SECTION (what you asked), ANSWER SECTION (the A record IP and TTL cache timer), and which DNS server answered in how many milliseconds!'
        },
        {
          name: 'arp -a (or ip neigh) = The Local Street Map & Megaphone Notebook',
          emoji: '📣🗺️',
          desc: 'Borrowed from CCNA’s "Life of a Packet": inside your local street (LAN), your house calls out on a megaphone (ARP Request): "Who lives at 192.168.1.1?" The router answers with its permanent MAC licence plate, and "arp -a" shows your notebook of all nearby neighbors!'
        }
      ]
    },
    kenyanAnalogy: {
      title:
        'Kenyan Mtaa Analogy: Flashing a Friend ("Uko Hapo?"), M-Pesa Name Check, Ardhi House Search & Nyumba Kumi Register!',
      icon: '🇰🇪📞📒',
      summary:
        '“Flash a friend’s phone to see if it rings (ping), check the name-to-number directory (nslookup/dig), and see every boda plate parked inside your estate court (arp -a)!”',
      points: [
        {
          name: 'ping = Calling Out at the Gate: "Hodi! Uko Hapo?" → "Karibu! Niko!"',
          emoji: '🗣️⚡',
          desc: 'Like flashing a friend or shouting "Hodi!" at a neighbor’s gate with a stopwatch. If they shout back "Karibu!" in 12 milliseconds, the path is clear! Pro Tip: First ping your own gate (192.168.1.1), then ping 8.8.8.8, then ping google.com to isolate any fault.'
        },
        {
          name: 'nslookup vs. dig = Asking the Receptionist vs. Pulling the Official Land Search',
          emoji: '🏢📄',
          desc: 'nslookup is like asking a quick question at the inquiry window: "Which plot is Naivas on?" dig is like getting the official stamped search certificate showing the exact plot number, expiry timer (TTL), and registry server!'
        },
        {
          name: 'arp -a / ip neigh = Matching Plot Numbers (IP) to Boda Number Plates (MAC)',
          emoji: '🛵🪪',
          desc: 'Inside your gated estate court, the watchman keeps a list matching each house number (192.168.1.2, 192.168.1.3) to the resident’s permanent vehicle number plate (MAC address). Type "arp -a" or "ip neigh" to read that exact list!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Knock-Knock (ping), Flip Book (dig), Wave to Neighbor (arp)!"',
      instruction:
        'Perform the 3 connectivity test moves in 5 seconds:',
      steps: [
        '1️⃣ Knock twice in the air with your fist ✊✊ — say: "ping (Are you home? 12ms)!"',
        '2️⃣ Open your hands like a phonebook and point your finger 📖👉 — say: "nslookup & dig (Name to IP number)!"',
        '3️⃣ Cup your hand like a megaphone to the side 📣 — say: "arp -a (Who is on my local street)!"'
      ]
    },
    quickTakeaway:
      'ping knocks on doors to test reachability & speed; nslookup/dig/host test the DNS phonebook; arp -a (or ip neigh) lists devices on your local LAN matching IP to MAC!'
  },

  // ==========================================================================
  // 8.5 MONITORING NETWORK CONNECTIONS (netstat, tcpdump, iftop)
  // ==========================================================================
  {
    id: 'monitoring-network-connections',
    number: '8.5',
    title: 'Monitoring Network Connections (netstat, tcpdump & iftop)',
    shortTitle: 'Monitoring Connections',
    icon: '📹🚦',
    pastelBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    accentText: 'text-rose-950',
    badgeBg: 'bg-rose-100 text-rose-900',
    laymanHeadline:
      'Watching your House Security Monitor (netstat) to see which service doors (ports) are open, who is currently inside, whether they came by tracked TCP van or fast UDP bike, and recording live packets at the gate (tcpdump & iftop).',
    laymanExplanation:
      'Your computer has one main IP address (house number), but inside that house are thousands of numbered service doors called Ports (like Port 22 for SSH remote login, Port 80 for HTTP web, Port 443 for secure HTTPS web, and Port 53 for DNS). Visitors arrive using two main delivery styles: TCP (careful, tracked delivery with a 3-way handshake) or UDP (fast, no-frills drop-off). Monitoring tools like "netstat -tulnp", "tcpdump", and "iftop" let you sit in the security room and watch every open door and every visitor live!',
    originalAnalogy: {
      title:
        'House & Smart-City Analogy: The Security Camera Screen (netstat), Red TCP Vans vs. Blue UDP Bikes, & Gate Recorder (tcpdump)',
      icon: '📺🚚🚲',
      summary:
        '“netstat -tulnp is your live TV monitor showing every open port door, every TCP van or UDP bike, and which program opened the door!”',
      points: [
        {
          name: 'TCP (Tracked Delivery Car) vs. UDP (Fast Courier Bicycle) & Port Doors',
          emoji: '🚗🚲🚪',
          desc: '• TCP = A careful delivery van that does a 3-step greeting (SYN → SYN-ACK → ACK) and gets a signed receipt for every box (used for Web pages, SSH, and Email).\n• UDP = A fast bicycle messenger who tosses the parcel over the fence without stopping (used for live video streaming, gaming, and DNS lookups).\n• Ports = Specific numbered doors on your house (22 = SSH side door, 80/443 = Web front door).'
        },
        {
          name: 'netstat -tulnp = The Famous 5-Letter Security Monitor Combo',
          emoji: '🖥️🔍',
          desc: '• -t = Show TCP vans\n• -u = Show UDP bikes\n• -l = Show LISTENING doors (open doors waiting for visitors)\n• -n = Show pure numbers (192.168.1.5:80) so it prints instantly without slow name lookups\n• -p = Show the Program name/PID standing behind the door (e.g., nginx or sshd)!'
        },
        {
          name: 'Connection States: LISTEN vs. ESTABLISHED vs. TIME_WAIT',
          emoji: '🟢🤝⏳',
          desc: '• LISTEN = Door is unlocked and a waiter is standing there waiting for guests.\n• ESTABLISHED = A visitor is actively inside the room talking right now!\n• TIME_WAIT = The visitor just said goodbye and the door is closing safely.'
        },
        {
          name: 'tcpdump (Gate Packet Camera) & iftop (Live Water Flow Meter)',
          emoji: '📹💧',
          desc: '• sudo tcpdump -i enp0s3 -n port 80 = Stands right at the front gate and prints every single packet envelope passing through!\n• sudo iftop = Shows a live bar chart of which neighbor or website is using the most internet pipe bandwidth right now.'
        }
      ]
    },
    kenyanAnalogy: {
      title:
        'Kenyan Mtaa Analogy: G4S Van (TCP) vs. Boda-Boda (UDP), Shop Counters (Ports), & The Watchman’s CCTV Screen (netstat)!',
      icon: '🇰🇪🚐🛵📹',
      summary:
        '“Check which shop counters (ports) are open, whether goods arrived by signed Wells Fargo/G4S van (TCP) or fast Boda-Boda (UDP), and inspect the gate CCTV (tcpdump)!”',
      points: [
        {
          name: 'TCP = Signed G4S / Fargo Courier Van vs. UDP = Fast Boda-Boda Rider',
          emoji: '🚐🛵',
          desc: 'Borrowed from our CCNA transport rules: TCP calls you first ("Sasa? Unanipata? Twende!") and makes you sign a delivery book for every carton—zero missing items! UDP is a fast boda rider who shouts your name, drops the parcel at the gate, and speeds off—super fast for live football streams or voice calls!'
        },
        {
          name: 'netstat -tulnp = The Chief Askari’s Master CCTV Board',
          emoji: '📺💂🏾‍♂️',
          desc: 'With one command ("sudo netstat -tulnp"), the Chief Askari sees every open counter in the building: Counter 22 (SSH) guarded by sshd, Counter 80 (Web) guarded by nginx, and whether any stranger is secretly hiding inside an unapproved room!'
        },
        {
          name: 'tcpdump & iftop = Inspecting Mzigo Envelopes & KPLC/Water Meter Load',
          emoji: '📦⚡',
          desc: 'If the cybercafé internet suddenly crawls, "iftop" shows which computer is downloading a huge file, while "tcpdump" lets you inspect the exact sender and receiver stickers on the parcels passing the gate!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Handshake Van (TCP), Zoom Bike (UDP), Security Screen (netstat -tulnp)!"',
      instruction:
        'Feel TCP, UDP, and netstat in your hands right now:',
      steps: [
        '1️⃣ Shake your own hands firmly 3 times 🤝 — say: "TCP (-t): 3-Way Handshake & Signed Receipt!"',
        '2️⃣ Zoom your right hand past your face like a fast motorbike 🛵💨 — say: "UDP (-u): Fast Drop & Go!"',
        '3️⃣ Frame your hands like a TV screen in front of your eyes 📺 — say: "netstat -tulnp (See all open doors & programs)!"'
      ]
    },
    quickTakeaway:
      'Use "sudo netstat -tulnp" to see all TCP (-t) and UDP (-u) listening doors (-l) with numeric addresses (-n) and program names (-p); use "tcpdump" to capture packets and "iftop" to watch live bandwidth!'
  },

  // ==========================================================================
  // 8.6 INSPECTING SOCKET STATISTICS (ss)
  // ==========================================================================
  {
    id: 'inspecting-socket-statistics',
    number: '8.6',
    title: 'Inspecting Socket Statistics (The Modern "ss" Command)',
    shortTitle: 'Socket Statistics (ss)',
    icon: '⚡🔌',
    pastelBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    accentText: 'text-purple-950',
    badgeBg: 'bg-purple-100 text-purple-900',
    laymanHeadline:
      'Using "ss" (Socket Statistics)—the super-fast, modern laser scanner that asks the Linux Kernel directly about every open socket (IP + Port plug) and active connection!',
    laymanExplanation:
      'What is a "Socket"? A socket is simply the combination of an IP Address + a Port Number (like 192.168.1.5:22)—just like a wall socket where a conversation plugs in! While the older "netstat" tool had to slowly read text files on a busy server, the modern "ss" (Socket Statistics) tool talks directly to the Linux Kernel foundation (via netlink). Best of all, "ss" uses the exact same friendly flags as netstat (like "sudo ss -tulnp"), plus it can show instant health summaries ("ss -s") and filter connections by state or port in a split second!',
    originalAnalogy: {
      title:
        'Original House Analogy: Wall Sockets & The High-Speed Laser Intercom to the House Foundation (ss)',
      icon: '🔌⚡🏗️',
      summary:
        '“A socket is where a visitor’s phone line plugs into a specific room door (IP:Port). While netstat walks around reading paper clipboards, ss asks the House Foundation (Kernel) directly at lightning speed!”',
      points: [
        {
          name: 'What is a Socket? = House Number (IP) + Room Door (Port)',
          emoji: '🏠🔌',
          desc: 'When Alice (192.168.1.2:54321) connects to Sam’s SSH door (192.168.1.5:22), those two endpoints form a plugged-in Socket pair! Every web tab, chat app, and server door uses a socket.'
        },
        {
          name: 'Why "ss" Replaced "netstat" = Direct Kernel Intercom vs. Slow Paper Ledger',
          emoji: '🚀📋',
          desc: 'When 10,000 visitors are inside a big house, netstat gets slow because it reads /proc text files line-by-line. "ss" (part of the modern iproute2 kit alongside "ip") queries the Kernel memory directly and answers instantaneously!'
        },
        {
          name: 'sudo ss -tulnp = Same Beloved Flags, 10x Faster Output',
          emoji: '🎯⚡',
          desc: 'Just like netstat, "-t" = TCP, "-u" = UDP, "-l" = Listening sockets, "-n" = Numeric ports, and "-p" = Process/Program name! Look at "Local Address:Port" to see which doors are open (e.g., 0.0.0.0:80 or 127.0.0.1:3306).'
        },
        {
          name: 'ss -s (Instant Summary Card) & Smart State Filtering',
          emoji: '📊🔎',
          desc: '• ss -s = Prints a neat 5-line scoreboard of Total sockets, TCP Established, Closed, Orphaned, and Time-Wait!\n• ss -t state established = Shows ONLY active live conversations.\n• ss -tuln sport = :22 = Checks specifically if the SSH door (port 22) is open!'
        }
      ]
    },
    kenyanAnalogy: {
      title:
        'Kenyan Mtaa Analogy: KPLC Smart Digital Meter Scanner (ss) vs. Manual Meter Reader Book (netstat)!',
      icon: '🇰🇪⚡📟',
      summary:
        '“netstat is like an old meter reader flipping through paper books plot-by-plot; ss is a digital scanner that beams straight into the main control board in 1 millisecond!”',
      points: [
        {
          name: 'Socket = Plot Number + Specific Shop Counter (e.g., 192.168.1.5:443)',
          emoji: '🏪🔢',
          desc: 'Think of a big building in CBD (192.168.1.5): Counter :80 is the Reception, Counter :22 is the Manager’s Office, and Counter :3306 is the Back Vault (Database). Each Plot + Counter combination is one Socket!'
        },
        {
          name: '0.0.0.0:80 (Open to the Whole Street) vs. 127.0.0.1:3306 (Family Only!)',
          emoji: '🌍🏠',
          desc: 'When "ss -tulnp" shows "0.0.0.0:80", that shop counter faces the public street so anyone can visit. When it shows "127.0.0.1:3306", that counter is inside the private family corridor (lo)—strangers outside can never touch your database!'
        },
        {
          name: 'ss -s = The Caretaker’s 1-Second Morning Summary Report',
          emoji: '📈✅',
          desc: 'Instead of reading 500 lines of visitors, typing "ss -s" gives the Caretaker an instant tally: "Total connections: 184 | Active TCP vans inside (estab): 42 | Waiting to close (timewait): 6".'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Plug the Socket, Flash the Laser (ss)!"',
      instruction:
        'Lock "Socket Statistics (ss)" into your hands in 5 seconds:',
      steps: [
        '1️⃣ Make a 2-prong plug with your RIGHT index & middle fingers ✌️ and plug them into your LEFT palm 🔌 — say: "Socket = IP Address + Port Number!"',
        '2️⃣ Snap your fingers fast ⚡ — say: "ss -tulnp (Direct from the Kernel in 1 millisecond)!"',
        '3️⃣ Hold up 5 fingers like a scoreboard 🖐️ — say: "ss -s (Instant Socket Summary)!"'
      ]
    },
    quickTakeaway:
      'A Socket = IP + Port. "ss" is the fast modern replacement for netstat: use "sudo ss -tulnp" to inspect open ports & processes, "ss -s" for a quick summary, and "ss -t state established" for active connections!'
  },

  // ==========================================================================
  // 8.7 TRACING NETWORK ROUTES (traceroute, tracepath, mtr, ip route / route)
  // ==========================================================================
  {
    id: 'tracing-network-routes',
    number: '8.7',
    title: 'Tracing Network Routes (traceroute, tracepath, mtr & ip route)',
    shortTitle: 'Tracing Routes',
    icon: '🗺️🚌',
    pastelBg: 'bg-teal-50',
    borderColor: 'border-teal-300',
    accentText: 'text-teal-950',
    badgeBg: 'bg-teal-100 text-teal-900',
    laymanHeadline:
      'Following your message step-by-step across every highway junction (router hop) from your house to the destination with "traceroute", "tracepath", and "mtr", and checking your local road map with "ip route" (and "route -n").',
    laymanExplanation:
      'When you send a message to a faraway website like google.com, it doesn’t fly there in one giant leap! Instead, it drives from your house to your home router (Hop 1), then to your internet provider’s junction (Hop 2), across regional highway routers (Hops 3, 4, 5...), and finally arrives at Google. If a website won’t load or feels slow, "ping" only tells you it’s broken—but "traceroute" (along with "tracepath" and "mtr") shows you every single stop along the highway and the exact junction where the traffic jam is happening!',
    originalAnalogy: {
      title:
        'House & Smart-City Analogy: The Package Delivery Tracker (traceroute), Road Width Tester (tracepath) & GPS Map (ip route)',
      icon: '🚚🗺️🪧',
      summary:
        '“ip route is the road map inside your house deciding which gate to exit; traceroute tracks your delivery van across every city roundabout (hop) with a stopwatch!”',
      points: [
        {
          name: 'ip route show (or route -n) = Your House’s Internal Road Map (Routing Table)',
          emoji: '🪧🛣️',
          desc: 'Before a package even leaves your porch, Linux checks its Routing Table:\n• "192.168.1.0/24 dev enp0s3" = For neighbors on our local street, walk straight out the front door!\n• "default via 192.168.1.1" = For ALL other cities in the world (Default Route 0.0.0.0/0), drive through the Main Neighborhood Gate (192.168.1.1)!'
        },
        {
          name: 'traceroute = The Step-by-Step Delivery Tracker (Using TTL Hop Stamps!)',
          emoji: '📦⏱️',
          desc: 'How does "traceroute google.com" discover every router along the way? It sends test packages with a self-destruct hop counter (TTL = 1, then TTL = 2, then TTL = 3...). Each router roundabout along the highway stamps its name/IP and 3 stopwatch times (e.g., "2.1 ms  1.9 ms  2.0 ms"). If a hop shows "* * *", that router is either blocking test notes or the road is broken right there!'
        },
        {
          name: 'tracepath = The No-Sudo Tracker That Also Measures Bridge Width (MTU)',
          emoji: '📏🚚',
          desc: 'Unlike traceroute, "tracepath google.com" never needs sudo privileges and also checks the MTU (Maximum Transmission Unit— usually 1500 bytes), making sure your delivery boxes aren’t too wide for any tunnel along the route!'
        },
        {
          name: 'mtr (My Traceroute) = The Live Helicopter Traffic Report (ping + traceroute Combined!)',
          emoji: '🚁📊',
          desc: 'Running "mtr google.com" opens a live updating screen that continuously pings every single hop at once, showing you the exact percentage of lost packages (Loss%) at every router in real time!'
        }
      ]
    },
    kenyanAnalogy: {
      title:
        'Kenyan Mtaa Analogy: Tracking a Matatu Stage-by-Stage Along the Highway (traceroute) & KENHA Signboards (ip route)!',
      icon: '🇰🇪🚌🛣️',
      summary:
        '“ip route is the KENHA direction sign at your estate junction; traceroute stamps every matatu stage from Your Gate → Waiyaki Way → Nakuru → Eldoret so you see where the jam is!”',
      points: [
        {
          name: 'ip route / route -n = The Junction Signboard: Local Court vs. Highway Gate',
          emoji: '🪧🚧',
          desc: 'When sending a boda rider from your house: if the parcel is for Plot 192.168.1.20 inside the same estate court, the rider stays inside the compound. If it is for Mombasa or Google, the "default via 192.168.1.1" sign says: "Exit through the Main Estate Barrier Gate onto the highway!"'
        },
        {
          name: 'traceroute = Stamping Every Matatu Stage (Hop 1, Hop 2, Hop 3...)',
          emoji: '🚌🎫',
          desc: 'Imagine sending a parcel upcountry and getting a WhatsApp timestamp at every stage:\n• Hop 1 (192.168.1.1): Home Zuku/Safaricom Router Gate — 2 ms\n• Hop 2 (10.20.0.1): Local Estate Fiber Box — 6 ms\n• Hop 3 (197.248.x.x): Nairobi Central Exchange — 11 ms\n• Hop 4 (* * *): Roadblock or silent guard at the junction!\nYou immediately know whether the delay is inside your house (Hop 1) or far away on the highway!'
        },
        {
          name: 'tracepath & mtr = Checking Lorry Height Limit (MTU) & Live Traffic Radio',
          emoji: '🚛📻',
          desc: 'tracepath checks that your cargo lorry isn’t too tall for any footbridge (pmtu 1500), while mtr is like a live traffic radio watching every stage continuously to spot a sudden roadblock!'
        }
      ]
    },
    bodyMicroAction: {
      title: '5-Second Body Lock: "Hop 1, Hop 2, Hop 3 — Destination!"',
      instruction:
        'Use your hand like a matatu hopping from stage to stage in 5 seconds:',
      steps: [
        '1️⃣ Point to your desk 🏠 — say: "ip route (Check Default Gateway 192.168.1.1)!"',
        '2️⃣ Hop your hand in 3 arcs across the air 🐸➡️🐸➡️🐸 — say: "traceroute: Hop 1 (Home Gate)... Hop 2 (ISP)... Hop 3 (Destination)!"',
        '3️⃣ Give a big thumbs-up 👍 — say: "tracepath & mtr (Track every stage live)!"'
      ]
    },
    quickTakeaway:
      'Use "ip route" (or "route -n") to check your Default Gateway road map; use "traceroute", "tracepath", or "mtr" to trace every router hop along the path and pinpoint where traffic is slow or blocked!'
  }
];
