import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Volume2,
  VolumeX,
  CheckCircle2,
  Play,
  Home,
  Unlock,
  Lock,
  Map,
  Compass,
  ArrowRight,
  ArrowLeft,
  Wrench,
  Search
} from 'lucide-react';
import {
  linuxTopic1Subtopics,
  linuxTopic2Subtopics,
  all11LinuxTopicsRoadmap,
  distroMatcherCharacters,
  architectureLayersData,
  unixVsLinuxScenarios,
  linuxRoomsDirectoryData
} from './linuxTopicsData';
import {
  basic25LinuxCommands,
  commandGroupsMeta
} from './linuxCommands25Data';
import { linuxTopic4Subtopics } from './linuxTopic4Data';
import { linuxTopic5Subtopics } from './linuxTopic5Data';
import { linuxTopic6Subtopics } from './linuxTopic6Data';
import { linuxTopic7Subtopics } from './linuxTopic7Data';
import { linuxTopic8Subtopics } from './linuxTopic8Data';
import { linuxTopic9Subtopics } from './linuxTopic9Data';
import { linuxTopic10Subtopics } from './linuxTopic10Data';
import { linuxTopic11Subtopics } from './linuxTopic11Data';
import { linuxTopic12Subtopics } from './linuxTopic12Data';
import { sounds } from '../../utils/audio';
import { stopSpeech } from '../../utils/speech';

export default function LinuxCozyHouseHub() {
  // Top-level view: 'topic1' ... 'topic12' | 'roadmap'
  // Default to 'topic12' so the user immediately sees Topic 12: Process Management!
  const [mainTab, setMainTab] = useState('topic12');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active subtopic IDs for Topic 1, Topic 2, Topic 4, Topic 5, Topic 6, Topic 7, Topic 8, Topic 9, Topic 10, Topic 11, and Topic 12
  const [activeTopic1SubId, setActiveTopic1SubId] = useState('distributions');
  const [activeTopic2SubId, setActiveTopic2SubId] = useState('file-system');
  const [activeTopic4SubId, setActiveTopic4SubId] = useState('file-management');
  const [activeTopic5SubId, setActiveTopic5SubId] = useState('tar-archiving');
  const [activeTopic6SubId, setActiveTopic6SubId] = useState('package-managers-and-systemctl');
  const [activeTopic7SubId, setActiveTopic7SubId] = useState('user-management-overview');
  const [activeTopic8SubId, setActiveTopic8SubId] = useState('configuring-network-interfaces');
  const [activeTopic9SubId, setActiveTopic9SubId] = useState('dhcp-service');
  const [activeTopic10SubId, setActiveTopic10SubId] = useState('linux-firewall-overview');
  const [activeTopic11SubId, setActiveTopic11SubId] = useState('centos-network-interfaces');
  const [activeTopic12SubId, setActiveTopic12SubId] = useState('viewing-processes');

  // Topic 3 (25 Basic Commands) states
  const [selectedCmdGroup, setSelectedCmdGroup] = useState('all');
  const [selectedCmdNum, setSelectedCmdNum] = useState(1); // 1..25
  const [cmdSearch, setCmdSearch] = useState('');
  const [triedCommands, setTriedCommands] = useState({ 1: true });
  const [cmdSimTriggered, setCmdSimTriggered] = useState(false);

  // Analogy filter: 'both' | 'original' | 'kenyan'
  const [analogyFilter, setAnalogyFilter] = useState('both');

  // Read-aloud & voice pacing state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingBoxId, setSpeakingBoxId] = useState(null);
  const [speechRate, setSpeechRate] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('linux_speech_rate') : null;
      return saved ? parseFloat(saved) : 0.95;
    } catch {
      return 0.95;
    }
  });

  const handleSetSpeechRate = (newRate) => {
    setSpeechRate(newRate);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('linux_speech_rate', String(newRate));
      }
    } catch {
      // ignore
    }
  };

  // Completed 5-second body micro-actions
  const [completedBodyMoves, setCompletedBodyMoves] = useState({});

  // ==========================================================================
  // TOPIC 1 TOYBOX STATES
  // ==========================================================================
  const [activeNeighborIndex, setActiveNeighborIndex] = useState(0);
  const [neighborSolved, setNeighborSolved] = useState({});
  const [neighborFeedback, setNeighborFeedback] = useState(null);

  const [selectedLayerLevel, setSelectedLayerLevel] = useState(2);
  const [archAnimStep, setArchAnimStep] = useState(null);
  const [selectedKernelHelper, setSelectedKernelHelper] = useState('scheduler');

  const [activeComparisonId, setActiveComparisonId] = useState('price');
  const [gateTested, setGateTested] = useState({ price: true });

  // ==========================================================================
  // TOPIC 2 TOYBOX STATES (LINUX FILE SYSTEM - 5 SUBTOPICS)
  // ==========================================================================
  const [sortedItems, setSortedItems] = useState({});
  const [sorterFeedback, setSorterFeedback] = useState(
    'Tap any item in the basket below to put it on its proper shelf!'
  );
  const [activeTreePath, setActiveTreePath] = useState('/home/sam/photos');
  const [selectedRoomPath, setSelectedRoomPath] = useState('/home');
  const [simCurrentRoom, setSimCurrentRoom] = useState('/home/sam');
  const [simShowHidden, setSimShowHidden] = useState(false);
  const [simLastCommand, setSimLastCommand] = useState('pwd');
  const [simBubbleMessage, setSimBubbleMessage] = useState(
    '⌚ Sam checked his GPS watch (pwd): "I am standing in /home/sam (Sam’s Bedroom)!"'
  );
  const [pathQuizAnswers, setPathQuizAnswers] = useState({});

  // ==========================================================================
  // TOPIC 4 TOYBOX STATES (FILE MANAGEMENT & PERMISSIONS - 5 SUBTOPICS)
  // ==========================================================================
  // 4.1 File Management Workbench
  const [t4DeskFiles, setT4DeskFiles] = useState([
    { name: 'chapati_recipe.txt', type: 'txt', lines: ['1. Warm water & salt', '2. Knead soft dough', '3. Fry until golden brown!'] },
    { name: 'mombasa_trip.jpg', type: 'jpg', lines: ['[Sunny Beach Photo 📸]'] }
  ]);
  const [t4CommandLog, setT4CommandLog] = useState('$ ls\nchapati_recipe.txt  mombasa_trip.jpg');
  const [t4DeskMessage, setT4DeskMessage] = useState(
    'Tap any action button below to create, read, photocopy, rename, wildcard-grab, or safely shred files on your desk!'
  );

  // 4.2 Directory Management Room Contractor
  const [t4RoomsBuilt, setT4RoomsBuilt] = useState([
    { path: 'kitchen/', items: 0, note: 'Empty Single Room' },
    { path: 'bedroom/', items: 2, note: 'Has 2 items inside (bed.txt, lamp.jpg)' }
  ]);
  const [t4DirCmdLog, setT4DirCmdLog] = useState('$ ls -F\nkitchen/  bedroom/');
  const [t4DirMessage, setT4DirMessage] = useState(
    'Try building a single room (mkdir), a 3-floor nested suite at once (mkdir -p), or see why rmdir refuses to demolish a room with furniture inside!'
  );

  // 4.3 Permissions 10-Slot Decoder
  const [t4SelectedBadgePreset, setT4SelectedBadgePreset] = useState('-rwxr-xr--');
  const [t4SelectedSlotZone, setT4SelectedSlotZone] = useState('owner');

  // 4.4 chmod Interactive 3-Wheel Padlock Calculator
  const [chmodBits, setChmodBits] = useState({
    u: { r: true, w: true, x: true },   // 7
    g: { r: true, w: false, x: true },  // 5
    o: { r: true, w: false, x: false }  // 4
  });
  const [chmodTargetFile, setChmodTargetFile] = useState('backup_script.sh');

  // 4.5 chown Interactive Title Deed & Nameplate Transfer Station
  const [chownOwner, setChownOwner] = useState('sam');
  const [chownGroup, setChownGroup] = useState('family');
  const [chownRecursive, setChownRecursive] = useState(false);
  const [chownAppliedMsg, setChownAppliedMsg] = useState(
    'Pick a new Owner and Group below to transfer the Title Deed / Door Nameplate!'
  );

  // ==========================================================================
  // TOPIC 5 TOYBOX STATES (ARCHIVING AND COMPRESSING - 6 SUBTOPICS)
  // ==========================================================================
  // 5.1 tar Moving Box Packer & Unpacker
  const [t5TarState, setT5TarState] = useState('loose'); // 'loose' | 'packed_tar' | 'packed_targz'
  const [t5TarLog, setT5TarLog] = useState(
    '$ ls -lh\n-rw-r--r-- 30M unga_recipe.txt\n-rw-r--r-- 40M mombasa_photos.jpg\n-rw-r--r-- 30M benga_music.mp3\n[3 loose items sitting on the table — Total: 100 MB]'
  );
  const [t5TarMsg, setT5TarMsg] = useState(
    'Tap "tar -cvf" below to pack all 3 loose items into ONE neat moving box (mzigo.tar)!'
  );

  // 5.2 gzip Fast Vacuum Sealer
  const [t5GzipCompressed, setT5GzipCompressed] = useState(false);
  const [t5GzipKeepOrig, setT5GzipKeepOrig] = useState(false);
  const [t5GzipLevel, setT5GzipLevel] = useState(6); // 1, 6, 9

  // 5.3 gunzip Air-Valve Inflator
  const [t5GunzipState, setT5GunzipState] = useState('compressed'); // 'compressed' | 'inflated' | 'peeked'

  // 5.4 zip & unzip Universal Suitcase
  const [t5ZipState, setT5ZipState] = useState('ready'); // 'ready' | 'zipped' | 'peeked' | 'unzipped'

  // 5.5 bzip2 Heavy-Duty Bale Press
  const [t5BzipMode, setT5BzipMode] = useState('bzip2'); // 'raw' | 'gzip' | 'bzip2' | 'tar_bz2'

  // 5.6 xz Diamond Compactor & 4-Way Compression Race
  const [t5SelectedCompressor, setT5SelectedCompressor] = useState('xz'); // 'tar' | 'gzip' | 'bzip2' | 'xz'

  // ==========================================================================
  // TOPIC 6 TOYBOX STATES (PACKAGE MANAGEMENT - 5 SUBTOPICS)
  // ==========================================================================
  // 6.1 Package Managers & systemctl Universal Remote
  const [t6SelectedService, setT6SelectedService] = useState('apache2');
  const [t6ServiceRunning, setT6ServiceRunning] = useState(true);
  const [t6ServiceEnabled, setT6ServiceEnabled] = useState(true);
  const [t6SystemctlLog, setT6SystemctlLog] = useState(
    '$ systemctl status apache2\n● apache2.service - The Apache Web Server Appliance\n   Loaded: loaded (enabled; starts automatically at morning boot)\n   Active: active (running) 🟢'
  );

  // 6.2 apt-get Ubuntu Supermarket Manager
  const [t6AptCatalogFresh, setT6AptCatalogFresh] = useState(false);
  const [t6AptInstalled, setT6AptInstalled] = useState(['firefox']);
  const [t6AptConfigs, setT6AptConfigs] = useState(['firefox.conf']);
  const [t6AptLog, setT6AptLog] = useState(
    '$ sudo apt-get update\n[Tip: Click "1. sudo apt-get update" first to refresh today’s supermarket catalog!]'
  );

  // 6.3 dpkg Delivery Driver & Fix-Broken Rescue
  const [t6DpkgState, setT6DpkgState] = useState('ready'); // 'ready' | 'missing_deps' | 'fixed' | 'removed'

  // 6.4 dnf Modern Touchscreen Hardware Store
  const [t6DnfAction, setT6DnfAction] = useState('install');

  // 6.5 yum Classic Hardware Store & Store Comparison
  const [t6YumAction, setT6YumAction] = useState('install');

  // ==========================================================================
  // TOPIC 7 TOYBOX STATES (USER & GROUP MANAGEMENT - 12 SUBTOPICS)
  // ==========================================================================
  // 7.1 User Management Overview (/etc/passwd, /etc/shadow, usermod)
  const [t7SelectedFileTab, setT7SelectedFileTab] = useState('passwd'); // 'passwd' | 'shadow' | 'usermod'
  // 7.2 Creating Users (useradd Blueprint Builder)
  const [t7UseraddName, setT7UseraddName] = useState('kamau');
  const [t7UseraddFlags, setT7UseraddFlags] = useState({
    m: true,
    s: true,
    c: true,
    u: false,
    e: false
  });
  // 7.3 Creating Users Interactively (adduser Receptionist Wizard)
  const [t7AdduserStep, setT7AdduserStep] = useState(1); // 1 | 2 | 3
  // 7.4 Deleting Users (userdel vs userdel -r)
  const [t7DeleteMode, setT7DeleteMode] = useState('keep_home'); // 'keep_home' | 'remove_home'
  // 7.5 Managing User Passwords (passwd Locksmith)
  const [t7PasswdAction, setT7PasswdAction] = useState('reset'); // 'own' | 'reset' | 'lock' | 'unlock' | 'expire' | 'days'
  // 7.6 Viewing User Information (id, who, w, last, awk)
  const [t7InfoTool, setT7InfoTool] = useState('id'); // 'id' | 'who_w' | 'last' | 'awk'
  // 7.7 Group Management Overview (Primary vs Secondary Badges)
  const [t7SelectedResident, setT7SelectedResident] = useState('alice'); // 'alice' | 'bob' | 'wanjiku'
  // 7.8 Managing Groups (usermod -aG, gpasswd -d/-M, groupmod)
  const [t7GroupModAction, setT7GroupModAction] = useState('append'); // 'append' | 'replace_warn' | 'gpasswd_m' | 'gpasswd_d' | 'groupmod'
  // 7.9 Creating Groups (groupadd & addgroup)
  const [t7CreatedGroups, setT7CreatedGroups] = useState([
    { name: 'gardeners', gid: 1002 },
    { name: 'cooks', gid: 1003 }
  ]);
  // 7.10 Deleting Groups (groupdel & Primary Group Guard)
  const [t7GroupDelChoice, setT7GroupDelChoice] = useState('secondary'); // 'secondary' | 'primary_guard'
  // 7.11 Checking User Group Membership (4 Methods)
  const [t7CheckMethod, setT7CheckMethod] = useState('groups'); // 'groups' | 'id_ng' | 'etc_group' | 'getent'
  // 7.12 Managing Administrative Access (sudo Golden Key & visudo)
  const [t7SudoKeyOption, setT7SudoKeyOption] = useState('run'); // 'run' | 'list' | 'extend' | 'return' | 'visudo' | 'su_vs_sudo'

  // ==========================================================================
  // TOPIC 8 TOYBOX STATES (LINUX NETWORKING & FIREWALLS - 7 SUBTOPICS)
  // ==========================================================================
  // 8.1 Configuring Network Interfaces & Firewalls
  const [t8AddressMethod, setT8AddressMethod] = useState('static'); // 'static' | 'dhcp'
  const [t8FirewallTool, setT8FirewallTool] = useState('iptables_fixed'); // 'iptables_wrong' | 'iptables_fixed' | 'firewalld' | 'ufw'
  // 8.2 Managing IP Addresses and Interfaces (ip, ifconfig, ethtool, hostname)
  const [t8IpToolAction, setT8IpToolAction] = useState('ip_a'); // 'ip_a' | 'ip_link_up' | 'ip_addr_add' | 'ifconfig' | 'ethtool' | 'hostname'
  const [t8GateUp, setT8GateUp] = useState(true);
  // 8.3 Managing Network Connections (nmcli & nmtui)
  const [t8NmStep, setT8NmStep] = useState('step1_devices'); // 'step1_devices' | 'step2_ip_gw_dns' | 'step3_method' | 'step4_restart_verify' | 'nmtui_form'
  // 8.4 Testing Network Connectivity (ping, nslookup, dig, host, arp)
  const [t8TestTool, setT8TestTool] = useState('ping'); // 'ping' | 'nslookup' | 'dig' | 'host' | 'arp'
  // 8.5 Monitoring Network Connections (netstat, tcpdump, iftop)
  const [t8MonitorTool, setT8MonitorTool] = useState('netstat_tulnp'); // 'netstat_tulnp' | 'netstat_states' | 'tcpdump' | 'iftop'
  // 8.6 Inspecting Socket Statistics (ss)
  const [t8SsOption, setT8SsOption] = useState('ss_tulnp'); // 'ss_tulnp' | 'ss_summary' | 'ss_estab' | 'ss_port22' | 'ss_vs_netstat'
  // 8.7 Tracing Network Routes (traceroute, tracepath, mtr, ip route)
  const [t8RouteTool, setT8RouteTool] = useState('traceroute_ok'); // 'ip_route' | 'traceroute_ok' | 'traceroute_block' | 'tracepath' | 'mtr'

  // ==========================================================================
  // TOPIC 9 TOYBOX STATES (NETWORKING SERVICES - 3 SUBTOPICS)
  // ==========================================================================
  // 9.1 DHCP: DORA step-through (0 = not started, 1..4 = D,O,R,A) + Linux tool view
  const [t9DoraStep, setT9DoraStep] = useState(0);
  const [t9DhcpView, setT9DhcpView] = useState('client'); // 'client' | 'server' | 'leases' | 'apipa'
  // 9.2 DNS: lookup journey step (0..6) + record type
  const [t9DnsStep, setT9DnsStep] = useState(0);
  const [t9DnsRecord, setT9DnsRecord] = useState('A'); // 'A' | 'AAAA' | 'CNAME' | 'MX' | 'NS' | 'PTR' | 'TXT'
  // 9.3 FTP: session log + security view
  const [t9FtpLog, setT9FtpLog] = useState(['# Tap "open" to phone the warehouse office on Port 21!']);
  const [t9FtpConnected, setT9FtpConnected] = useState(false);
  const [t9FtpSecureView, setT9FtpSecureView] = useState('ftp'); // 'ftp' | 'sftp'

  // ==========================================================================
  // TOPIC 10 TOYBOX STATES (LINUX FIREWALL - 4 SUBTOPICS)
  // ==========================================================================
  // 10.1 Linux Firewall: Packet Inspector Simulator
  const [t10PacketType, setT10PacketType] = useState('ssh_allowed'); // 'ssh_allowed' | 'web_allowed' | 'hacker_blocked' | 'established' | 'custom'
  // 10.2 Setting Up Firewalls: 3-Manager Control Station
  const [t10SelectedManager, setT10SelectedManager] = useState('ufw'); // 'ufw' | 'firewalld' | 'iptables'
  const [t10ManagerStatus, setT10ManagerStatus] = useState(true);
  // 10.3 Basic iptables Commands: Interactive Rule Builder
  const [t10Table, setT10Table] = useState('filter'); // 'filter' | 'nat' | 'mangle'
  const [t10Chain, setT10Chain] = useState('INPUT'); // 'INPUT' | 'OUTPUT' | 'FORWARD'
  const [t10Target, setT10Target] = useState('ACCEPT'); // 'ACCEPT' | 'DROP' | 'REJECT' | 'LOG'
  const [t10Port, setT10Port] = useState('22');
  const [t10Protocol, setT10Protocol] = useState('tcp');
  // 10.4 Managing Firewall Configuration: Rule Order & Permanent Save Lab
  const [t10RuleOrderMode, setT10RuleOrderMode] = useState('fixed'); // 'bug' | 'fixed' | 'save' | 'zones'

  // ==========================================================================
  // TOPIC 11 TOYBOX STATES (MONITORING & TROUBLESHOOTING - 3 SUBTOPICS)
  // ==========================================================================
  // 11.1 CentOS Interface Configurator
  const [t11CentosIface, setT11CentosIface] = useState('ens33');
  const [t11CentosBootproto, setT11CentosBootproto] = useState('static'); // 'static' | 'dhcp'
  const [t11CentosOnboot, setT11CentosOnboot] = useState(true);
  const [t11CentosIp, setT11CentosIp] = useState('192.168.1.50');
  const [t11CentosGateway, setT11CentosGateway] = useState('192.168.1.1');
  const [t11CentosDns, setT11CentosDns] = useState('8.8.8.8');
  const [t11CentosView, setT11CentosView] = useState('ifcfg'); // 'ifcfg' | 'nmcli' | 'nmtui'
  const [t11CentosTested, setT11CentosTested] = useState(false);

  // 11.2 Network Troubleshooting Detective Ladder
  const [t11TroubleScenario, setT11TroubleScenario] = useState('dns_broken'); // 'cable_down' | 'no_ip' | 'gateway_lost' | 'dns_broken' | 'port_closed'
  const [t11TroubleSolved, setT11TroubleSolved] = useState(false);

  // 11.3 System Monitoring & Process Killer
  const [t11MonTab, setT11MonTab] = useState('top'); // 'top' | 'free' | 'df' | 'logs'
  const [t11RogueKilled, setT11RogueKilled] = useState(false);

  // ==========================================================================
  // TOPIC 12 TOYBOX STATES (PROCESS MANAGEMENT - 6 SUBTOPICS)
  // ==========================================================================
  // 12.1 Viewing Processes & States
  const [t12ViewMode, setT12ViewMode] = useState('ps_aux'); // 'ps_aux' | 'pstree' | 'states'
  const [t12SelectedState, setT12SelectedState] = useState('R'); // 'R' | 'S' | 'D' | 'Z' | 'T'
  // 12.2 top vs htop
  const [t12HtopSort, setT12HtopSort] = useState('cpu'); // 'cpu' | 'mem' | 'pid'
  const [t12HtopTree, setT12HtopTree] = useState(false);
  // 12.3 Signals & Killer
  const [t12TargetPid, setT12TargetPid] = useState(412);
  const [t12SelectedSignal, setT12SelectedSignal] = useState(15);
  const [t12KilledPids, setT12KilledPids] = useState({});
  const [t12SignalOutput, setT12SignalOutput] = useState('');
  // 12.4 Niceness Priority
  const [t12NiceVal, setT12NiceVal] = useState(0); // -20..+19
  // 12.5 Background & Foreground Jobs
  const [t12JobStatus, setT12JobStatus] = useState('stopped'); // 'fg_running' | 'stopped' | 'bg_running' | 'done'
  const [t12JobNohup, setT12JobNohup] = useState(false);
  // 12.6 Disk Usage
  const [t12DiskMode, setT12DiskMode] = useState('df'); // 'df' | 'inodes' | 'du' | 'ncdu'
  const [t12DeletedCulprit, setT12DeletedCulprit] = useState(false);

  // Determine current active subtopics list and current subtopic object for Topic 1..12
  const currentSubtopicsList =
    mainTab === 'topic1'
      ? linuxTopic1Subtopics
      : mainTab === 'topic2'
      ? linuxTopic2Subtopics
      : mainTab === 'topic4'
      ? linuxTopic4Subtopics
      : mainTab === 'topic5'
      ? linuxTopic5Subtopics
      : mainTab === 'topic6'
      ? linuxTopic6Subtopics
      : mainTab === 'topic7'
      ? linuxTopic7Subtopics
      : mainTab === 'topic8'
      ? linuxTopic8Subtopics
      : mainTab === 'topic9'
      ? linuxTopic9Subtopics
      : mainTab === 'topic10'
      ? linuxTopic10Subtopics
      : mainTab === 'topic11'
      ? linuxTopic11Subtopics
      : linuxTopic12Subtopics;
  const activeSubtopicId =
    mainTab === 'topic1'
      ? activeTopic1SubId
      : mainTab === 'topic2'
      ? activeTopic2SubId
      : mainTab === 'topic4'
      ? activeTopic4SubId
      : mainTab === 'topic5'
      ? activeTopic5SubId
      : mainTab === 'topic6'
      ? activeTopic6SubId
      : mainTab === 'topic7'
      ? activeTopic7SubId
      : mainTab === 'topic8'
      ? activeTopic8SubId
      : mainTab === 'topic9'
      ? activeTopic9SubId
      : mainTab === 'topic10'
      ? activeTopic10SubId
      : mainTab === 'topic11'
      ? activeTopic11SubId
      : activeTopic12SubId;
  const setActiveSubtopicId = (id) => {
    if (mainTab === 'topic1') setActiveTopic1SubId(id);
    else if (mainTab === 'topic2') setActiveTopic2SubId(id);
    else if (mainTab === 'topic4') setActiveTopic4SubId(id);
    else if (mainTab === 'topic5') setActiveTopic5SubId(id);
    else if (mainTab === 'topic6') setActiveTopic6SubId(id);
    else if (mainTab === 'topic7') setActiveTopic7SubId(id);
    else if (mainTab === 'topic8') setActiveTopic8SubId(id);
    else if (mainTab === 'topic9') setActiveTopic9SubId(id);
    else if (mainTab === 'topic10') setActiveTopic10SubId(id);
    else if (mainTab === 'topic11') setActiveTopic11SubId(id);
    else setActiveTopic12SubId(id);
  };

  const currentSubtopic =
    currentSubtopicsList.find((s) => s.id === activeSubtopicId) ||
    currentSubtopicsList[0];

  // Current active command object for Topic 3 (1..25)
  const currentCommandObj =
    basic25LinuxCommands.find((c) => c.num === selectedCmdNum) ||
    basic25LinuxCommands[0];

  const filtered25Commands = basic25LinuxCommands.filter((c) => {
    const matchesGroup =
      selectedCmdGroup === 'all' || c.group === selectedCmdGroup;
    const q = cmdSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      c.cmd.toLowerCase().includes(q) ||
      c.fullName.toLowerCase().includes(q) ||
      c.layman.toLowerCase().includes(q) ||
      String(c.num) === q;
    return matchesGroup && matchesSearch;
  });

  // Stop speech when switching subtopics, commands, or tabs
  useEffect(() => {
    stopSpeech();
    setIsSpeaking(false);
    setSpeakingBoxId(null);
    setCmdSimTriggered(false);
  }, [
    activeTopic1SubId,
    activeTopic2SubId,
    activeTopic4SubId,
    activeTopic5SubId,
    activeTopic6SubId,
    activeTopic7SubId,
    activeTopic8SubId,
    activeTopic9SubId,
    activeTopic10SubId,
    activeTopic11SubId,
    activeTopic12SubId,
    selectedCmdNum,
    mainTab
  ]);

  // Topic 1.2 Architecture Live Journey Timer
  useEffect(() => {
    if (archAnimStep === null) return;
    const layerSequence = [4, 3, 2, 1, 2, 3, 4];
    if (archAnimStep >= layerSequence.length) {
      sounds.playSuccess();
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } });
      const endTimer = setTimeout(() => setArchAnimStep(null), 1600);
      return () => clearTimeout(endTimer);
    }
    setSelectedLayerLevel(layerSequence[archAnimStep]);
    const timer = setTimeout(() => {
      sounds.playPop();
      setArchAnimStep((prev) => (prev !== null ? prev + 1 : null));
    }, 1100);
    return () => clearTimeout(timer);
  }, [archAnimStep]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playPop();
  };

  // Independent Box-by-Box Read-Aloud helper: strictly reads ONLY that box and stops!
  const speakBoxText = (boxId, textToRead) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speakingBoxId === boxId) {
      stopSpeech();
      setIsSpeaking(false);
      setSpeakingBoxId(null);
      return;
    }
    stopSpeech();
    setIsSpeaking(true);
    setSpeakingBoxId(boxId);

    const clean = (textToRead || '')
      .replace(/[#*`_~]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingBoxId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingBoxId(null);
    };
    window.speechSynthesis.speak(utterance);
  };

  // Full Subtopic Read-Aloud (reads the whole page if requested)
  const handleReadAloud = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking && speakingBoxId === 'full-page') {
      stopSpeech();
      setIsSpeaking(false);
      setSpeakingBoxId(null);
      return;
    }
    stopSpeech();
    const headline = currentSubtopic.laymanHeadline || currentSubtopic.badge || '';
    const explanation = currentSubtopic.laymanExplanation || currentSubtopic.plainEnglish || '';
    const origSummary =
      currentSubtopic.originalAnalogy?.summary ||
      currentSubtopic.originalAnalogy?.intro ||
      '';
    const kenyanSummary =
      currentSubtopic.kenyanAnalogy?.summary ||
      currentSubtopic.kenyanAnalogy?.intro ||
      '';
    const textToRead = `${currentSubtopic.title}. In simple terms: ${headline}. ${explanation}. Original House Analogy: ${origSummary}. Kenyan Analogy: ${kenyanSummary}.`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingBoxId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingBoxId(null);
    };
    setIsSpeaking(true);
    setSpeakingBoxId('full-page');
    window.speechSynthesis.speak(utterance);
  };

  // Full Command Read-Aloud for Topic 3 (25 Commands)
  const handleReadCommandAloud = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking && speakingBoxId === 'full-cmd') {
      stopSpeech();
      setIsSpeaking(false);
      setSpeakingBoxId(null);
      return;
    }
    stopSpeech();
    const c = currentCommandObj;
    const textToRead = `Command number ${c.num}: ${c.cmd}, which stands for ${c.fullName}. In plain English: ${c.layman}. Original House Analogy: ${c.houseAnalogy}. Kenyan Analogy: ${c.kenyanAnalogy}. 5-Second Body Move: ${c.bodyMove}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingBoxId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingBoxId(null);
    };
    setIsSpeaking(true);
    setSpeakingBoxId('full-cmd');
    window.speechSynthesis.speak(utterance);
  };

  // Celebrate 5-second body action
  const handleCompleteBodyMove = (moveKey) => {
    sounds.playSuccess();
    confetti({ particleCount: 55, spread: 70, origin: { y: 0.65 } });
    setCompletedBodyMoves((prev) => ({ ...prev, [moveKey]: true }));
  };

  // Topic 1.1 Neighbor Matcher handler
  const currentNeighbor = distroMatcherCharacters[activeNeighborIndex];
  const handlePickDistroForNeighbor = (distroKey) => {
    if (distroKey === currentNeighbor.bestDistro) {
      sounds.playSuccess();
      confetti({ particleCount: 40, spread: 55, origin: { y: 0.7 } });
      setNeighborSolved((prev) => ({ ...prev, [currentNeighbor.id]: true }));
      setNeighborFeedback({
        type: 'success',
        text: currentNeighbor.successMessage
      });
    } else {
      sounds.playPop();
      setNeighborFeedback({
        type: 'hint',
        text: 'Almost! Look closely at what they need—try another house style below! (No penalty, keep exploring!)'
      });
    }
  };

  // Topic 2.4 Navigation Simulator rooms map
  const navRoomsMap = {
    '/': {
      title: '/ (Main Front Door / Estate Main Gate)',
      emoji: '🚪',
      items: ['📁 home', '📁 etc', '📁 bin', '📁 var'],
      hiddenItems: ['🔒 .house_blueprint'],
      doors: [
        { label: '👟 cd home (Enter /home Hallway)', target: '/home', cmd: 'cd home' },
        { label: '👟 cd etc (Enter /etc Settings)', target: '/etc', cmd: 'cd etc' }
      ],
      parent: '/'
    },
    '/home': {
      title: '/home (Family Bedrooms Hallway / Residents Court)',
      emoji: '🏘️',
      items: ['📁 sam', '📁 wanjiku'],
      hiddenItems: ['🔒 .court_notice'],
      doors: [
        { label: '👟 cd sam (Enter Sam’s Bedroom)', target: '/home/sam', cmd: 'cd sam' }
      ],
      parent: '/'
    },
    '/home/sam': {
      title: '/home/sam (Sam’s Cozy Bedroom / Personal House)',
      emoji: '🛏️',
      items: ['📁 kitchen', '📁 photos', '📄 ugali_recipe.txt'],
      hiddenItems: ['🕵️ .bashrc (Secret Control Panel)', '🔑 .secret_diary.txt'],
      doors: [
        { label: '👟 cd kitchen (Walk into Kitchen)', target: '/home/sam/kitchen', cmd: 'cd kitchen' },
        { label: '👟 cd photos (Open Photos Room)', target: '/home/sam/photos', cmd: 'cd photos' }
      ],
      parent: '/home'
    },
    '/home/sam/kitchen': {
      title: '/home/sam/kitchen (Sam’s Kitchen / Jiko Area)',
      emoji: '🍳',
      items: ['🍵 chai_masala.txt', '🥞 chapati_list.txt'],
      hiddenItems: ['🍪 .hidden_mandazi_jar'],
      doors: [],
      parent: '/home/sam'
    },
    '/home/sam/photos': {
      title: '/home/sam/photos (Sam’s Photo Album Drawer)',
      emoji: '🖼️',
      items: ['📸 mombasa_trip.jpg', '📸 graduation.png'],
      hiddenItems: ['🎁 .surprise_party_photo.jpg'],
      doors: [],
      parent: '/home/sam'
    },
    '/etc': {
      title: '/etc (House Settings Cabinet / KPLC Meter Box)',
      emoji: '⚙️',
      items: ['📋 passwd (Family Registry)', '🛡️ sudoers (House Rules)'],
      hiddenItems: ['🔒 .lock_config'],
      doors: [],
      parent: '/'
    }
  };

  return (
    <div className="linux-night-hub min-h-screen bg-[#090d16] text-slate-100 flex flex-col relative selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      {/* DEDICATED STANDALONE LINUX COZY HOUSE HEADER (100% Independent • Night Mode Only) */}
      <header className="sticky top-0 z-50 bg-[#0c1222]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand Title */}
          <button
            onClick={() => {
              sounds.playPop();
              setMainTab('topic10');
            }}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-500 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 group-hover:shadow-emerald-500/40 transition-all border border-emerald-400/40">
              🏡
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-black text-base sm:text-xl text-white tracking-tight">
                <span>Sam’s Linux House & Kenyan Mtaa</span>
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-700/60 ml-1">
                  🌙 Night Mode
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-400">
                Starlit Mtaa • Friendly & Cozy • Dual Analogies • Neurodivergent Safe
              </p>
            </div>
          </button>

          {/* Standalone Topic Switcher + Audio Toggle */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('topic1');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'topic1'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>🏡</span>
              <span>Topic 1 (3)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('topic2');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'topic2'
                  ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white border-sky-400/60 shadow-[0_0_15px_rgba(14,165,233,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>🧭</span>
              <span>Topic 2 (5)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('topic3');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'topic3'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>🧰</span>
              <span>Topic 3 (25)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('topic4');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'topic4'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white border-rose-400/60 shadow-[0_0_15px_rgba(244,63,94,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>🔑</span>
              <span>Topic 4 (5)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('topic5');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'topic5'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-teal-400/60 shadow-[0_0_15px_rgba(20,184,166,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>📦</span>
              <span>Topic 5 (6)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('topic6');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'topic6'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400/60 shadow-[0_0_15px_rgba(99,102,241,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>🛒</span>
              <span>Topic 6 (5)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('topic7');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'topic7'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-400/60 shadow-[0_0_15px_rgba(249,115,22,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>👨‍👩‍👧‍👦</span>
              <span>Topic 7 (12)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('topic8');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'topic8'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>🌐</span>
              <span>Topic 8 (7)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('topic9');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'topic9'
                  ? 'bg-gradient-to-r from-sky-700 to-indigo-700 text-white border-sky-400/60 shadow-[0_0_15px_rgba(3,105,161,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>🛎️</span>
              <span>Topic 9 (3)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('topic10');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'topic10'
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-400/60 shadow-[0_0_15px_rgba(239,68,68,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>🛡️</span>
              <span>Topic 10: Firewall (4)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('topic11');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'topic11'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-700 text-white border-teal-400/60 shadow-[0_0_15px_rgba(20,184,166,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>🩺</span>
              <span>Topic 11: Monitor & Troubleshoot (3)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('topic12');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'topic12'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-400/60 shadow-[0_0_15px_rgba(59,130,246,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span>⚙️</span>
              <span>Topic 12: Process Mgmt (6)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('roadmap');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border transition-all flex items-center gap-1 ${
                mainTab === 'roadmap'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.35)] scale-105'
                  : 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 border-slate-700/60 hover:border-slate-500 hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>🗺️ All</span>
            </button>

            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              className={`px-2.5 py-1.5 sm:py-2 rounded-2xl font-bold text-xs border transition-all flex items-center gap-1 ${
                soundEnabled
                  ? 'bg-[#131b2e] border-amber-500/40 text-amber-300 shadow-sm'
                  : 'bg-[#131b2e] border-slate-700/60 text-slate-500'
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 flex-1 w-full relative z-10">
        {/* WARM COZY HERO BANNER (STARLIT KENYAN MTAA & NIGHT HOUSE) */}
        <div className="bg-gradient-to-br from-[#12192c] via-[#0f1424] to-[#090d16] rounded-3xl p-5 sm:p-7 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 relative z-10">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 flex items-center gap-1.5">
                  <span>🏠🇰🇪</span>
                  <span>
                    {mainTab === 'topic1'
                      ? 'Topic 1 • Understanding Linux Basics'
                      : mainTab === 'topic2'
                      ? 'Topic 2 • Linux File System & Navigation'
                      : mainTab === 'topic3'
                      ? 'Topic 3 • The 25 Basic Everyday Linux Commands (#1–#25)'
                      : mainTab === 'topic4'
                      ? 'Topic 4 • File Management & Permissions (5 Subtopics)'
                      : mainTab === 'topic5'
                      ? 'Topic 5 • Archiving and Compressing (6 Subtopics)'
                      : mainTab === 'topic6'
                      ? 'Topic 6 • Package Management & systemctl (5 Subtopics)'
                      : mainTab === 'topic7'
                      ? 'Topic 7 • User and Group Management (12 Subtopics)'
                      : mainTab === 'topic8'
                      ? 'Topic 8 • Linux Networking (7 Subtopics)'
                      : mainTab === 'topic9'
                      ? 'Topic 9 • Networking Services (3 Subtopics)'
                      : mainTab === 'topic10'
                      ? 'Topic 10 • Linux Firewall (4 Subtopics)'
                      : mainTab === 'topic11'
                      ? 'Topic 11 • Monitoring & Troubleshooting (3 Subtopics)'
                      : mainTab === 'topic12'
                      ? 'Topic 12 • Process Management (6 Subtopics)'
                      : 'Complete Linux Curriculum Map'}
                  </span>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs shadow-inner">
                  ✨ Simple English • Dual Analogies • 5-Sec Body Move • Playable Toybox
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {mainTab === 'topic1'
                  ? 'Topic 1: Understanding Linux Basics 🏡🍲'
                  : mainTab === 'topic2'
                  ? 'Topic 2: Linux File System & Navigation 🗄️🌳🧭'
                  : mainTab === 'topic3'
                  ? 'Topic 3: The 25 Basic Linux Commands Toolbox 🧰✨'
                  : mainTab === 'topic4'
                  ? 'Topic 4: File Management & Permissions 📄🏗️🔐🔢👑'
                  : mainTab === 'topic5'
                  ? 'Topic 5: Archiving & Compressing 📦🗜️🎈🧳🚜💎'
                  : mainTab === 'topic6'
                  ? 'Topic 6: Package Management & systemctl 🛒🏪🚚🚀🧰'
                  : mainTab === 'topic7'
                  ? 'Topic 7: User & Group Management 👨‍👩‍👧‍👦🏗️🛎️🔐🪪🏷️🔑'
                  : mainTab === 'topic8'
                  ? 'Topic 8: Linux Networking 🌐🪪🧑‍💼✊📹⚡🗺️'
                  : mainTab === 'topic9'
                  ? 'Topic 9: Networking Services 🪪📖🚚'
                  : mainTab === 'topic10'
                  ? 'Topic 10: Linux Firewall & Security Gatekeepers 🛡️⚙️📕📝'
                  : mainTab === 'topic11'
                  ? 'Topic 11: Monitoring & Troubleshooting 🖥️🩺📊💓'
                  : mainTab === 'topic12'
                  ? 'Topic 12: Process Management ⚙️👥📊🛑⚖️🤹💽'
                  : 'All Linux Topics & Subtopics Roadmap 🗺️'}
              </h1>

              <p className="text-slate-300 font-medium text-sm sm:text-base leading-relaxed">
                {mainTab === 'topic1'
                  ? 'Explore Linux Distributions, the 4-layer Architecture, and Linux vs. Unix using Sam’s Cozy House and everyday Kenyan life!'
                  : mainTab === 'topic2'
                  ? 'Discover how Linux organizes files like a neat house or duka, how every folder hangs from the Root (/) Main Gate, what lives in the 7 key rooms, how to walk around with pwd/ls/cd, and Absolute vs. Relative paths!'
                  : mainTab === 'topic3'
                  ? 'Every Linux command is just a friendly hand tool in your toolbox! Click any of the 25 commands below (#1 ls through #25 wc) to hear how it works, see its House & Kenyan analogies, do a 5-second body move, and test it live!'
                  : mainTab === 'topic4'
                  ? 'Master how to create, photocopy, move, and shred files & rooms, read the 10-letter door lock badge (-rwxr-xr--), dial 3-wheel padlocks with chmod (4+2+1=7), and transfer ownership title deeds with chown!'
                  : mainTab === 'topic5'
                  ? 'Learn how to pack loose files into one moving box (tar), vacuum-seal them smaller (gzip), pop them back open (gunzip), share zippered suitcases across Windows & Linux (zip/unzip), and use heavy-duty presses (bzip2 & xz)!'
                  : mainTab === 'topic6'
                  ? 'Learn how software is installed, updated, and removed across Linux distributions! Explore Package Managers & the systemctl remote control, the Ubuntu Supermarket (apt-get), the .deb Delivery Van (dpkg), the modern Fedora Hardware Store (dnf), and the classic CentOS/RHEL Hardware Store (yum)!'
                  : mainTab === 'topic7'
                  ? 'Master all 12 subtopics of User and Group Management! Meet the House Guestbook (/etc/passwd) & Locked Password Safe (/etc/shadow), build rooms with useradd & friendly adduser, remove users with userdel, manage passwords with passwd, scan IDs with id/who/w/last/awk, organize team badges with groupadd/usermod -aG/groupdel/groups/getent, and safely borrow the Golden Master Key with sudo & visudo!'
                  : mainTab === 'topic8'
                  ? 'From configuring IP addresses and managing network interfaces to testing connectivity (ping, nslookup, dig, arp), monitoring live traffic (netstat, tcpdump, iftop), inspecting high-speed sockets (ss), and tracing network routes (traceroute, tracepath, mtr, ip route)!'
                  : mainTab === 'topic9'
                  ? 'Meet the three helpers every network depends on: the Gatekeeper who hands out addresses automatically (DHCP), the Librarian who turns names into numbers (DNS), and the Delivery Truck that carries files between computers (FTP)—plus why the sealed SFTP van beats the open FTP pickup!'
                  : mainTab === 'topic10'
                  ? 'Master the complete Linux Firewall security system! Explore packet filtering, compare the 3 managers (iptables, firewalld, UFW), learn the essential iptables commands (Tables, Chains, Options & Targets), and conquer rule order and permanent saving!'
                  : mainTab === 'topic11'
                  ? 'Configure CentOS network interfaces with ONBOOT=yes (nmcli/nmtui), climb the 5-step network diagnostic troubleshooting ladder (ping, traceroute, ss, dig, tcpdump), and monitor system vital signs (CPU load, free RAM, df disk space, and kill -9)!'
                  : mainTab === 'topic12'
                  ? 'Master Linux Process Management from creation to termination! Explore ps aux & pstree hierarchies, compare live top and htop monitors, master kill & signal codes (SIGTERM 15 vs SIGKILL 9), fine-tune CPU priority with nice & renice (-20 to +19), juggle background and foreground jobs (&, Ctrl+Z, jobs, bg, fg, nohup), and audit disk storage with df -h and du -sh!'
                  : 'Browse all topics from your Linux curriculum. Topics 1 through 12 are fully interactive right now!'}
              </p>
            </div>

            {/* Quick Topic Jump Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-1.5 shrink-0">
              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic1');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic1'
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-500/25 scale-[1.02]'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span>🏡 1. Basics</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">3</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic2');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic2'
                    ? 'bg-sky-600 text-white border-sky-400 shadow-md shadow-sky-500/25 scale-[1.02]'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span>🧭 2. File Sys</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">5</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic3');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic3'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/25 scale-[1.02]'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span>🧰 3. Commands</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">25</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic4');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic4'
                    ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-500/25 scale-[1.02]'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span>🔑 4. Perms</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">5</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic5');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic5'
                    ? 'bg-teal-600 text-white border-teal-400 shadow-md shadow-teal-500/25 scale-[1.02]'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span>📦 5. Archive</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">6</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic6');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic6'
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/25 scale-[1.02]'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span>🛒 6. Packages</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">5</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic7');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic7'
                    ? 'bg-orange-600 text-white border-orange-400 shadow-md shadow-orange-500/25 scale-[1.02]'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span>👨‍👩‍👧‍👦 7. Users</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">12</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic8');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic8'
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-500/25 scale-[1.02]'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span>🌐 8. Net</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">7</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic9');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic9'
                    ? 'bg-sky-700 text-white border-sky-400 shadow-md shadow-sky-500/25 scale-[1.02]'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span>🛎️ 9. Svc</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">3</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic10');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic10'
                    ? 'bg-red-600 text-white border-red-400 shadow-md shadow-red-500/25 scale-[1.02]'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span>🛡️ 10. Firewall</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">4</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic11');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic11'
                    ? 'bg-teal-600 text-white border-teal-400 shadow-md shadow-teal-500/25 scale-[1.02]'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span>🩺 11. Monitor & Trouble</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">3</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic12');
                }}
                className={`col-span-2 px-3 py-1.5 rounded-2xl font-black text-xs border transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic12'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span>⚙️ 12. Process Management (Jobs, Signals, Priority, Disk)</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">6</span>
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================================
           VIEW A: ALL TOPICS ROADMAP
           ===================================================================== */}
        {mainTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {all11LinuxTopicsRoadmap.map((topic) => {
                const isPlayable = topic.status === 'playable';
                return (
                  <div
                    key={topic.id}
                    onClick={() => {
                      if (isPlayable && topic.topicKey) {
                        sounds.playSuccess();
                        setMainTab(topic.topicKey);
                      }
                    }}
                    className={`rounded-3xl p-5 sm:p-6 border-4 transition-all flex flex-col justify-between space-y-4 ${
                      isPlayable
                        ? 'bg-emerald-50/90 border-emerald-400 shadow-md cursor-pointer hover:scale-[1.01]'
                        : 'bg-white border-amber-200/80 shadow-sm'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black ${
                            isPlayable
                              ? 'bg-emerald-600 text-white'
                              : 'bg-amber-100 text-amber-950'
                          }`}
                        >
                          Topic #{topic.id}{' '}
                          {isPlayable ? '• 🎮 PLAYABLE NOW (Click to Open)' : '• Upcoming'}
                        </span>
                        <span className="text-2xl">{topic.icon}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-slate-900">
                        {topic.title}
                      </h3>

                      <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                        {topic.laymanSummary}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                          Subtopics ({topic.subtopics.length}):
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {topic.subtopics.map((sub, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs"
                            >
                              • {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pt-3 border-t-2 border-slate-200/70 text-xs">
                      <div className="bg-amber-50/90 p-2.5 rounded-xl border border-amber-200 text-amber-950">
                        <span className="font-black">🏠 House Analogy: </span>
                        <span className="font-semibold">{topic.houseAnalogy}</span>
                      </div>
                      <div className="bg-emerald-50/90 p-2.5 rounded-xl border border-emerald-200 text-emerald-950">
                        <span className="font-black">🇰🇪 Kenyan Analogy: </span>
                        <span className="font-semibold">{topic.kenyanAnalogy}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================================
           VIEW B: TOPIC 3 — THE 25 BASIC LINUX COMMANDS TOOLBOX (#1 TO #25)
           ===================================================================== */}
        {mainTab === 'topic3' && (
          <div className="space-y-6">
            {/* STEP 1: SHELF FILTER TABS + SEARCH + ANALOGY SWITCHER */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border-4 border-purple-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-purple-600" />
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-purple-950">
                    Pick a Tool Shelf (or Click Any Command #1–#25 Below):
                  </span>
                </div>

                {/* Analogy Filter + Progress */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 font-black text-xs">
                    Tools Explored: {Object.keys(triedCommands).length} / 25 ⭐
                  </span>

                  <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-2xl border-2 border-amber-200">
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setAnalogyFilter('both');
                      }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                        analogyFilter === 'both'
                          ? 'bg-amber-500 text-white'
                          : 'text-amber-900 hover:bg-amber-100'
                      }`}
                    >
                      🌟 Both
                    </button>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setAnalogyFilter('original');
                      }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                        analogyFilter === 'original'
                          ? 'bg-amber-500 text-white'
                          : 'text-amber-900 hover:bg-amber-100'
                      }`}
                    >
                      🏠 House
                    </button>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setAnalogyFilter('kenyan');
                      }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                        analogyFilter === 'kenyan'
                          ? 'bg-emerald-600 text-white'
                          : 'text-emerald-900 hover:bg-emerald-100'
                      }`}
                    >
                      🇰🇪 Kenyan
                    </button>
                  </div>
                </div>
              </div>

              {/* 6 Shelf Filter Buttons + Search Box */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  {commandGroupsMeta.map((grp) => {
                    const isActive = selectedCmdGroup === grp.id;
                    return (
                      <button
                        key={grp.id}
                        onClick={() => {
                          sounds.playPop();
                          setSelectedCmdGroup(grp.id);
                          if (grp.id !== 'all') {
                            const firstInGrp = basic25LinuxCommands.find(
                              (c) => c.group === grp.id
                            );
                            if (firstInGrp) {
                              setSelectedCmdNum(firstInGrp.num);
                              setTriedCommands((prev) => ({
                                ...prev,
                                [firstInGrp.num]: true
                              }));
                            }
                          }
                        }}
                        className={`px-3 py-2 rounded-2xl text-xs font-black border-2 transition-all ${
                          isActive
                            ? 'bg-purple-600 text-white border-purple-700 shadow-sm scale-105'
                            : 'bg-purple-50/70 hover:bg-purple-100 text-purple-950 border-purple-200'
                        }`}
                      >
                        {grp.title}
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full sm:w-56">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={cmdSearch}
                    onChange={(e) => setCmdSearch(e.target.value)}
                    placeholder="Find tool (e.g. grep, 17)..."
                    className="w-full pl-9 pr-3 py-2 rounded-2xl border-2 border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* CHUNKY VISUAL GRID OF THE COMMANDS */}
              <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-5 gap-2.5 pt-1">
                {filtered25Commands.map((c) => {
                  const isSelected = c.num === selectedCmdNum;
                  const isTried = triedCommands[c.num];
                  const moveDone = completedBodyMoves[`cmd-${c.num}`];
                  return (
                    <button
                      key={c.num}
                      onClick={() => {
                        sounds.playPop();
                        setSelectedCmdNum(c.num);
                        setTriedCommands((prev) => ({ ...prev, [c.num]: true }));
                      }}
                      className={`p-3 rounded-2xl border-3 text-left transition-all flex flex-col justify-between gap-1.5 ${
                        isSelected
                          ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-purple-800 shadow-md scale-[1.03]'
                          : isTried
                          ? 'bg-emerald-50/70 hover:bg-emerald-100/80 text-slate-800 border-emerald-300'
                          : 'bg-amber-50/60 hover:bg-amber-100/70 text-slate-800 border-amber-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-white/25 text-white'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          #{c.num}
                        </span>
                        <span className="text-xl">{c.icon}</span>
                      </div>

                      <div>
                        <div className="font-mono text-base sm:text-lg font-black tracking-tight">
                          {c.cmd}
                        </div>
                        <div
                          className={`text-[11px] font-bold truncate ${
                            isSelected ? 'text-purple-100' : 'text-slate-600'
                          }`}
                        >
                          {c.fullName}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-black pt-1">
                        <span>{isTried ? '✓ Viewed' : 'Tap me'}</span>
                        {moveDone && <span>🤸</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: ACTIVE COMMAND DEEP-DIVE CARD (PLAIN ENGLISH + DUAL ANALOGIES + BODY MOVE + LIVE TOYBOX) */}
            <div className="bg-emerald-50/70 rounded-3xl p-5 sm:p-7 border-4 border-emerald-300 shadow-sm space-y-5">
              {/* Top Header of Active Command */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-emerald-200/80 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="text-4xl sm:text-5xl bg-white p-3.5 rounded-3xl border-3 border-emerald-300 shadow-sm shrink-0">
                    {currentCommandObj.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-purple-600 text-white text-xs font-black">
                        Tool #{currentCommandObj.num} of 25
                      </span>
                      <span className="px-3 py-0.5 rounded-full bg-emerald-200 text-emerald-950 text-xs font-black">
                        {currentCommandObj.fullName}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-mono font-black text-slate-900 mt-1">
                      {currentCommandObj.cmd}
                    </h2>
                  </div>
                </div>

                {/* Read Aloud + Pace Control + Prev/Next Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <div className="flex items-center gap-1.5 bg-[#0d121f] px-2.5 py-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
                    <span className="text-[11px] font-extrabold text-slate-400 shrink-0">
                      Pace:
                    </span>
                    <div className="inline-flex rounded-xl p-0.5 bg-slate-900/90 border border-slate-800">
                      {[
                        { rate: 0.75, label: '0.75x', title: 'Slow & Gentle' },
                        { rate: 0.95, label: '0.95x', title: 'Cozy & Clear (Default)' },
                        { rate: 1.15, label: '1.15x', title: 'Normal' },
                        { rate: 1.35, label: '1.35x', title: 'Brisk' }
                      ].map((sp) => (
                        <button
                          key={sp.rate}
                          onClick={() => handleSetSpeechRate(sp.rate)}
                          title={sp.title}
                          className={`px-2 py-0.5 rounded-lg text-xs font-black transition-all ${
                            Math.abs(speechRate - sp.rate) < 0.05
                              ? 'bg-amber-400 text-slate-950 shadow-sm scale-105'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                        >
                          {sp.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleReadCommandAloud}
                    className={`px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all flex items-center gap-2 shadow-sm ${
                      isSpeaking && speakingBoxId === 'full-cmd'
                        ? 'bg-rose-500 text-white border-rose-600 animate-voice-pulse'
                        : 'bg-white hover:bg-amber-50 text-slate-800 border-slate-300'
                    }`}
                    title="Read all sections for this command"
                  >
                    {isSpeaking && speakingBoxId === 'full-cmd' ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Stop Voice</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-600" />
                        <span>🔊 Read Tool #{currentCommandObj.num}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      sounds.playPop();
                      const prevNum = selectedCmdNum > 1 ? selectedCmdNum - 1 : 25;
                      setSelectedCmdNum(prevNum);
                      setTriedCommands((prev) => ({ ...prev, [prevNum]: true }));
                    }}
                    className="p-2 rounded-2xl bg-white hover:bg-slate-100 border-2 border-slate-300 text-slate-800 font-black text-xs"
                    title="Previous Tool"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      sounds.playPop();
                      const nextNum = selectedCmdNum < 25 ? selectedCmdNum + 1 : 1;
                      setSelectedCmdNum(nextNum);
                      setTriedCommands((prev) => ({ ...prev, [nextNum]: true }));
                    }}
                    className="px-3 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs flex items-center gap-1 shadow-sm"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Plain Layman Explanation + Real Example (Independent Read-Aloud for Each) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div
                  className={`lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border-2 shadow-sm space-y-2 transition-all ${
                    speakingBoxId === 'cmd-layman'
                      ? 'speak-box-active border-emerald-400'
                      : 'border-emerald-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>In Simple Layman’s English:</span>
                    </div>
                    <button
                      onClick={() =>
                        speakBoxText(
                          'cmd-layman',
                          `Command ${currentCommandObj.cmd}. In simple layman terms: ${currentCommandObj.layman}`
                        )
                      }
                      className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all flex items-center gap-1 shrink-0 ${
                        speakingBoxId === 'cmd-layman'
                          ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                          : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border-emerald-500/40'
                      }`}
                      title="Read layman explanation aloud and stop"
                    >
                      {speakingBoxId === 'cmd-layman' ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                      <span>{speakingBoxId === 'cmd-layman' ? 'Stop' : 'Read'}</span>
                    </button>
                  </div>
                  <p className="text-base sm:text-xl font-black text-slate-900 leading-snug">
                    {currentCommandObj.layman}
                  </p>
                </div>

                <div
                  className={`lg:col-span-5 bg-amber-50 rounded-2xl p-4 sm:p-5 border-2 shadow-sm space-y-1.5 transition-all ${
                    speakingBoxId === 'cmd-example'
                      ? 'speak-box-active border-amber-400'
                      : 'border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-black uppercase tracking-wider text-amber-900">
                      📝 Everyday Example Command:
                    </div>
                    <button
                      onClick={() =>
                        speakBoxText(
                          'cmd-example',
                          `Example command: ${currentCommandObj.exampleCmd}. Translation: ${currentCommandObj.exampleMeaning}`
                        )
                      }
                      className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all flex items-center gap-1 shrink-0 ${
                        speakingBoxId === 'cmd-example'
                          ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                      }`}
                      title="Read example command aloud and stop"
                    >
                      {speakingBoxId === 'cmd-example' ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                      <span>{speakingBoxId === 'cmd-example' ? 'Stop' : 'Read'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-sm sm:text-base font-black bg-slate-900 text-amber-300 px-3.5 py-2 rounded-xl">
                    $ {currentCommandObj.exampleCmd}
                  </div>
                  <p className="text-xs sm:text-sm font-extrabold text-amber-950 pt-1">
                    💬 Translation: {currentCommandObj.exampleMeaning}
                  </p>
                </div>
              </div>

              {/* DUAL ANALOGIES FOR THIS COMMAND (EACH BOX INDEPENDENT) */}
              <div
                className={`grid grid-cols-1 ${
                  analogyFilter === 'both' ? 'md:grid-cols-2' : 'md:grid-cols-1'
                } gap-4`}
              >
                {(analogyFilter === 'both' || analogyFilter === 'original') && (
                  <div
                    className={`bg-amber-50/95 rounded-3xl p-5 border-4 space-y-2 shadow-sm transition-all ${
                      speakingBoxId === 'cmd-house'
                        ? 'speak-box-active border-amber-400'
                        : 'border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200 text-amber-950 text-xs font-black">
                        <span>🏠 Original House Analogy</span>
                      </div>
                      <button
                        onClick={() =>
                          speakBoxText(
                            'cmd-house',
                            `Original House Analogy for ${currentCommandObj.cmd}: ${currentCommandObj.houseAnalogy}`
                          )
                        }
                        className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all flex items-center gap-1 shrink-0 ${
                          speakingBoxId === 'cmd-house'
                            ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                        }`}
                        title="Read house analogy aloud and stop"
                      >
                        {speakingBoxId === 'cmd-house' ? (
                          <VolumeX className="w-3.5 h-3.5" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                        <span>{speakingBoxId === 'cmd-house' ? 'Stop' : 'Read'}</span>
                      </button>
                    </div>
                    <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-relaxed">
                      {currentCommandObj.houseAnalogy}
                    </p>
                  </div>
                )}

                {(analogyFilter === 'both' || analogyFilter === 'kenyan') && (
                  <div
                    className={`bg-white rounded-3xl p-5 border-4 space-y-2 shadow-sm transition-all ${
                      speakingBoxId === 'cmd-kenyan'
                        ? 'speak-box-active-emerald border-emerald-400'
                        : 'border-emerald-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-200 text-emerald-950 text-xs font-black">
                        <span>🇰🇪 Kenyan Everyday Analogy</span>
                      </div>
                      <button
                        onClick={() =>
                          speakBoxText(
                            'cmd-kenyan',
                            `Kenyan Everyday Analogy for ${currentCommandObj.cmd}: ${currentCommandObj.kenyanAnalogy}`
                          )
                        }
                        className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all flex items-center gap-1 shrink-0 ${
                          speakingBoxId === 'cmd-kenyan'
                            ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                            : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border-emerald-300'
                        }`}
                        title="Read Kenyan analogy aloud and stop"
                      >
                        {speakingBoxId === 'cmd-kenyan' ? (
                          <VolumeX className="w-3.5 h-3.5" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                        <span>{speakingBoxId === 'cmd-kenyan' ? 'Stop' : 'Read'}</span>
                      </button>
                    </div>
                    <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-relaxed">
                      {currentCommandObj.kenyanAnalogy}
                    </p>
                  </div>
                )}
              </div>

              {/* 5-SECOND BODY MOVE FOR THIS COMMAND (INDEPENDENT READ-ALOUD) */}
              <div
                className={`bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 rounded-3xl p-5 border-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
                  speakingBoxId === 'cmd-body'
                    ? 'speak-box-active-purple border-purple-400'
                    : 'border-purple-300'
                }`}
              >
                <div className="space-y-1.5 w-full sm:w-auto">
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-purple-200 text-purple-950 text-xs font-black">
                      <span>
                        🤸🧠 5-Second Muscle Memory Move for "{currentCommandObj.cmd}"
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        speakBoxText(
                          'cmd-body',
                          `5-Second Muscle Memory Move for ${currentCommandObj.cmd}: ${currentCommandObj.bodyMove}`
                        )
                      }
                      className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all flex items-center gap-1 shrink-0 ${
                        speakingBoxId === 'cmd-body'
                          ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                          : 'bg-purple-100 hover:bg-purple-200 text-purple-950 border-purple-300'
                      }`}
                      title="Read body move aloud and stop"
                    >
                      {speakingBoxId === 'cmd-body' ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                      <span>{speakingBoxId === 'cmd-body' ? 'Stop' : 'Read'}</span>
                    </button>
                  </div>
                  <p className="text-sm sm:text-base font-black text-purple-950 pt-0.5">
                    {currentCommandObj.bodyMove}
                  </p>
                </div>

                <button
                  onClick={() => handleCompleteBodyMove(`cmd-${currentCommandObj.num}`)}
                  className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm border-3 transition-all shrink-0 shadow-md active:scale-95 flex items-center gap-2 ${
                    completedBodyMoves[`cmd-${currentCommandObj.num}`]
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-purple-600 hover:bg-purple-700 text-white border-purple-800'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {completedBodyMoves[`cmd-${currentCommandObj.num}`]
                      ? '🎉 Move Locked In!'
                      : '🙌 I Did This Move!'}
                  </span>
                </button>
              </div>

              {/* INTERACTIVE PLAYABLE WORKSHOP: TRY THIS COMMAND LIVE! */}
              <div className="bg-white rounded-3xl p-5 border-4 border-sky-300 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-black">
                      🎮 Live Tool Tester • Zero Typing Required
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Press the Big Button to Use <code className="text-purple-700">{currentCommandObj.cmd}</code> Inside Sam’s House!
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      setCmdSimTriggered(true);
                      setTriedCommands((prev) => ({
                        ...prev,
                        [currentCommandObj.num]: true
                      }));
                    }}
                    className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm border-2 border-emerald-800 shadow-md active:scale-95 flex items-center gap-2 shrink-0"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>
                      ▶️ Test Tool #{currentCommandObj.num}: "{currentCommandObj.exampleCmd}"
                    </span>
                  </button>
                </div>

                <div
                  className={`rounded-2xl p-4 border-3 transition-all space-y-2 ${
                    cmdSimTriggered
                      ? 'bg-slate-900 text-white border-emerald-500 shadow-md'
                      : 'bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-amber-300 border-b border-slate-700 pb-2">
                    <span>sam@cozy-house:~$ {currentCommandObj.exampleCmd}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-sans font-black">
                      {cmdSimTriggered ? '✅ Executed!' : 'Ready'}
                    </span>
                  </div>
                  <pre className="font-mono text-xs sm:text-sm font-bold text-emerald-300 whitespace-pre-wrap leading-relaxed pt-1">
                    {currentCommandObj.simVisualOutput}
                  </pre>
                  <div className="bg-white/10 rounded-xl p-2.5 text-xs font-bold text-amber-200">
                    🏠 What Just Happened: {currentCommandObj.simStory}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
           VIEW C: TOPIC 1, TOPIC 2, TOPIC 4, TOPIC 5, TOPIC 6, TOPIC 7, OR TOPIC 8 PLAYGROUND
           ===================================================================== */}
        {(mainTab === 'topic1' ||
          mainTab === 'topic2' ||
          mainTab === 'topic4' ||
          mainTab === 'topic5' ||
          mainTab === 'topic6' ||
          mainTab === 'topic7' ||
          mainTab === 'topic8' ||
          mainTab === 'topic9' ||
          mainTab === 'topic10' ||
          mainTab === 'topic11' ||
          mainTab === 'topic12') && (
          <div className="space-y-6">
            {/* STEP 1: SUBTOPIC SELECTOR CARDS */}
            <div className="bg-[#111728]/95 rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>
                    Pick a Subtopic in{' '}
                    {mainTab === 'topic1'
                      ? 'Topic 1 (3 Subtopics)'
                      : mainTab === 'topic2'
                      ? 'Topic 2: Linux File System (5 Subtopics)'
                      : mainTab === 'topic4'
                      ? 'Topic 4: File Management & Permissions (5 Subtopics)'
                      : mainTab === 'topic5'
                      ? 'Topic 5: Archiving and Compressing (6 Subtopics)'
                      : mainTab === 'topic6'
                      ? 'Topic 6: Package Management (5 Subtopics)'
                      : mainTab === 'topic7'
                      ? 'Topic 7: User and Group Management (12 Subtopics)'
                      : mainTab === 'topic8'
                      ? 'Topic 8: Linux Networking (7 Subtopics)'
                      : mainTab === 'topic9'
                      ? 'Topic 9: Networking Services (3 Subtopics)'
                      : mainTab === 'topic10'
                      ? 'Topic 10: Linux Firewall (4 Subtopics)'
                      : mainTab === 'topic11'
                      ? 'Topic 11: Monitoring & Troubleshooting (3 Subtopics)'
                      : 'Topic 12: Process Management (6 Subtopics)'}
                    :
                  </span>
                </span>

                <div className="flex flex-wrap items-center gap-1.5 bg-[#0b0f19] p-1.5 rounded-2xl border border-slate-800">
                  <button
                    onClick={() => {
                      sounds.playPop();
                      setAnalogyFilter('both');
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                      analogyFilter === 'both'
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    🌟 Both Analogies
                  </button>
                  <button
                    onClick={() => {
                      sounds.playPop();
                      setAnalogyFilter('original');
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                      analogyFilter === 'original'
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    🏠 Original House Only
                  </button>
                  <button
                    onClick={() => {
                      sounds.playPop();
                      setAnalogyFilter('kenyan');
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                      analogyFilter === 'kenyan'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    🇰🇪 Kenyan Analogy Only
                  </button>
                </div>
              </div>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  currentSubtopicsList.length === 3
                    ? 'lg:grid-cols-3'
                    : currentSubtopicsList.length === 4
                    ? 'lg:grid-cols-4'
                    : currentSubtopicsList.length === 6
                    ? 'lg:grid-cols-3 xl:grid-cols-6'
                    : currentSubtopicsList.length === 7
                    ? 'lg:grid-cols-4 xl:grid-cols-7'
                    : 'lg:grid-cols-5'
                } gap-2.5`}
              >
                {currentSubtopicsList.map((sub) => {
                  const isSelected = sub.id === activeSubtopicId;
                  const moveDone = completedBodyMoves[sub.id];
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        sounds.playPop();
                        setActiveSubtopicId(sub.id);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 text-white border-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.02]'
                          : 'bg-[#151c2f]/90 hover:bg-[#1c263f] text-slate-200 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-2xl bg-slate-800/90 p-1.5 rounded-xl shadow-inner border border-slate-700/60 shrink-0">
                          {sub.icon}
                        </span>
                        <span
                          className={`text-[11px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-800 text-slate-300 border border-slate-700 font-mono'
                          }`}
                        >
                          {sub.number}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-black leading-snug">
                          {sub.shortTitle}
                        </div>
                        {moveDone && (
                          <div
                            className={`text-[10px] font-black mt-1 ${
                              isSelected ? 'text-yellow-300' : 'text-emerald-400'
                            }`}
                          >
                            ✅ Body Move Done
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: SIMPLE LAYMAN EXPLANATION + READ ALOUD SPEAKER */}
            <div className="bg-[#0e1626]/95 rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-2xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-[#131d33] border border-slate-700/60 flex items-center justify-center text-3xl shadow-inner shrink-0">
                    {currentSubtopic.icon}
                  </span>
                  <div>
                    <span className="px-3 py-0.5 rounded-full text-xs font-black bg-teal-950/80 text-teal-300 border border-teal-700/60">
                      Subtopic {currentSubtopic.number} • Plain Layman’s English
                    </span>
                    <h2 className="text-xl sm:text-3xl font-black text-white mt-1">
                      {currentSubtopic.title}
                    </h2>
                  </div>
                </div>

                {/* Pace Controller + Full Page Read-Aloud Button */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <div className="flex items-center gap-1.5 bg-[#0d121f] px-2.5 py-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
                    <span className="text-[11px] font-extrabold text-slate-400 shrink-0">
                      Pace:
                    </span>
                    <div className="inline-flex rounded-xl p-0.5 bg-slate-900/90 border border-slate-800">
                      {[
                        { rate: 0.75, label: '0.75x', title: 'Slow & Gentle' },
                        { rate: 0.95, label: '0.95x', title: 'Cozy & Clear (Default)' },
                        { rate: 1.15, label: '1.15x', title: 'Normal' },
                        { rate: 1.35, label: '1.35x', title: 'Brisk' }
                      ].map((sp) => (
                        <button
                          key={sp.rate}
                          onClick={() => handleSetSpeechRate(sp.rate)}
                          title={sp.title}
                          className={`px-2 py-0.5 rounded-lg text-xs font-black transition-all ${
                            Math.abs(speechRate - sp.rate) < 0.05
                              ? 'bg-amber-400 text-slate-950 shadow-sm scale-105'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                        >
                          {sp.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleReadAloud}
                    className={`px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm border transition-all flex items-center gap-2 shrink-0 shadow-sm ${
                      isSpeaking && speakingBoxId === 'full-page'
                        ? 'bg-rose-500 text-white border-rose-600 animate-voice-pulse'
                        : 'bg-[#131d33] hover:bg-[#1a2744] text-slate-200 border-slate-700 hover:text-white'
                    }`}
                    title="Read all core sections on this subtopic from start to finish"
                  >
                    {isSpeaking && speakingBoxId === 'full-page' ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Stop Page Voice</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-400" />
                        <span>🔊 Read This Page to Me</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 10-SECOND IDEA BOX (WITH INDEPENDENT READ-ALOUD) */}
              <div
                className={`bg-[#0c1322]/90 rounded-2xl p-4 sm:p-5 border transition-all space-y-3 ${
                  speakingBoxId === 'idea-box'
                    ? 'speak-box-active border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.25)]'
                    : 'border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>The Simple 10-Second Idea:</span>
                  </div>
                  <button
                    onClick={() =>
                      speakBoxText(
                        'idea-box',
                        `The Simple 10-Second Idea: ${
                          currentSubtopic.laymanHeadline || currentSubtopic.badge
                        }. ${
                          currentSubtopic.laymanExplanation || currentSubtopic.plainEnglish
                        }`
                      )
                    }
                    className={`px-3 py-1 rounded-xl font-black text-xs border transition-all flex items-center gap-1.5 shrink-0 ${
                      speakingBoxId === 'idea-box'
                        ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                        : 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border-emerald-600/40'
                    }`}
                    title="Read this idea box aloud and stop"
                  >
                    {speakingBoxId === 'idea-box' ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>🔊 Read Idea</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-base sm:text-xl font-black text-white leading-snug">
                  “{currentSubtopic.laymanHeadline || currentSubtopic.badge}”
                </p>
                <p className="text-sm sm:text-base font-medium text-slate-300 leading-relaxed pt-1">
                  {currentSubtopic.laymanExplanation || currentSubtopic.plainEnglish}
                </p>

                {Array.isArray(currentSubtopic.laymanPoints) &&
                  currentSubtopic.laymanPoints.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {currentSubtopic.laymanPoints.map((lp, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-2xl border space-y-1 transition-all ${
                            speakingBoxId === `lp-${idx}`
                              ? 'speak-box-active bg-[#1a233a] border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.25)]'
                              : 'bg-[#101728] border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="font-mono font-black text-xs sm:text-sm text-amber-300">
                              • {lp.term}
                            </div>
                            <button
                              onClick={() =>
                                speakBoxText(`lp-${idx}`, `${lp.term}: ${lp.meaning}`)
                              }
                              className={`px-2 py-0.5 rounded-lg text-[11px] font-black border transition-all flex items-center gap-1 shrink-0 ${
                                speakingBoxId === `lp-${idx}`
                                  ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                                  : 'bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border-amber-600/40'
                              }`}
                              title={`Read ${lp.term} aloud and stop`}
                            >
                              {speakingBoxId === `lp-${idx}` ? (
                                <VolumeX className="w-3 h-3" />
                              ) : (
                                <Volume2 className="w-3 h-3" />
                              )}
                              <span>{speakingBoxId === `lp-${idx}` ? 'Stop' : 'Read'}</span>
                            </button>
                          </div>
                          <div className="text-xs font-semibold text-slate-300 leading-relaxed">
                            {lp.meaning}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* DUAL ANALOGIES */}
              <div
                className={`grid grid-cols-1 ${
                  analogyFilter === 'both' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
                } gap-5 pt-2`}
              >
                {(analogyFilter === 'both' || analogyFilter === 'original') && (
                  <div className="bg-[#0c1322]/90 rounded-3xl p-5 sm:p-6 border-2 border-amber-500/40 shadow-xl flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 text-amber-300 border border-amber-600/50 text-xs font-black">
                        <span>{currentSubtopic.originalAnalogy?.icon || '🏠'}</span>
                        <span>Original Analogy (Simplified & Cozy)</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-amber-400">
                        {currentSubtopic.originalAnalogy?.title}
                      </h3>

                      {/* Summary Box with Independent Read-Aloud */}
                      <div
                        className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                          speakingBoxId === 'orig-summary'
                            ? 'speak-box-active bg-[#1a233a] border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.25)]'
                            : 'bg-[#101728] border-amber-500/30'
                        }`}
                      >
                        <p className="text-sm font-semibold text-amber-200 leading-relaxed">
                          {currentSubtopic.originalAnalogy?.summary ||
                            currentSubtopic.originalAnalogy?.intro}
                        </p>
                        <button
                          onClick={() =>
                            speakBoxText(
                              'orig-summary',
                              `Original House Analogy: ${
                                currentSubtopic.originalAnalogy?.title
                              }. ${
                                currentSubtopic.originalAnalogy?.summary ||
                                currentSubtopic.originalAnalogy?.intro
                              }`
                            )
                          }
                          className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all flex items-center gap-1 shrink-0 ${
                            speakingBoxId === 'orig-summary'
                              ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                              : 'bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border-amber-600/40'
                          }`}
                          title="Read analogy summary aloud and stop"
                        >
                          {speakingBoxId === 'orig-summary' ? (
                            <VolumeX className="w-3.5 h-3.5" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                          <span>
                            {speakingBoxId === 'orig-summary' ? 'Stop' : 'Read Intro'}
                          </span>
                        </button>
                      </div>

                      {/* Each Item Card with Independent Read-Aloud */}
                      <div className="space-y-2.5 pt-1">
                        {(
                          currentSubtopic.originalAnalogy?.points ||
                          currentSubtopic.originalAnalogy?.cards ||
                          []
                        ).map((pt, idx) => (
                          <div
                            key={idx}
                            className={`bg-[#101728] rounded-2xl p-3.5 border flex items-start justify-between gap-3 shadow-sm transition-all ${
                              speakingBoxId === `orig-pt-${idx}`
                                ? 'speak-box-active border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.25)]'
                                : 'border-slate-800 hover:border-amber-500/40'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl shrink-0 mt-0.5">{pt.emoji}</span>
                              <div>
                                <div className="font-black text-white text-sm sm:text-base">
                                  {pt.name}
                                </div>
                                <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-relaxed mt-0.5 whitespace-pre-line">
                                  {pt.desc || pt.simple}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                speakBoxText(
                                  `orig-pt-${idx}`,
                                  `${pt.name}. ${pt.desc || pt.simple}`
                                )
                              }
                              className={`px-2 py-1 rounded-xl text-xs font-black border transition-all flex items-center gap-1 shrink-0 mt-0.5 ${
                                speakingBoxId === `orig-pt-${idx}`
                                  ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700/60 hover:text-white'
                              }`}
                              title={`Read ${pt.name} aloud and stop`}
                            >
                              {speakingBoxId === `orig-pt-${idx}` ? (
                                <VolumeX className="w-3.5 h-3.5" />
                              ) : (
                                <Volume2 className="w-3.5 h-3.5" />
                              )}
                              <span>
                                {speakingBoxId === `orig-pt-${idx}` ? 'Stop' : 'Read'}
                              </span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {(analogyFilter === 'both' || analogyFilter === 'kenyan') && (
                  <div className="bg-[#0c1322]/90 rounded-3xl p-5 sm:p-6 border-2 border-emerald-500/40 shadow-xl flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-600/50 text-xs font-black">
                        <span>{currentSubtopic.kenyanAnalogy?.icon || '🇰🇪'}</span>
                        <span>Kenyan Everyday Analogy (Mtaa & Home Life)</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-emerald-400">
                        {currentSubtopic.kenyanAnalogy?.title}
                      </h3>

                      {/* Summary Box with Independent Read-Aloud */}
                      <div
                        className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                          speakingBoxId === 'kenyan-summary'
                            ? 'speak-box-active-emerald bg-[#1a233a] border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.25)]'
                            : 'bg-[#101728] border-emerald-500/30'
                        }`}
                      >
                        <p className="text-sm font-semibold text-emerald-200 leading-relaxed">
                          {currentSubtopic.kenyanAnalogy?.summary ||
                            currentSubtopic.kenyanAnalogy?.intro}
                        </p>
                        <button
                          onClick={() =>
                            speakBoxText(
                              'kenyan-summary',
                              `Kenyan Everyday Analogy: ${
                                currentSubtopic.kenyanAnalogy?.title
                              }. ${
                                currentSubtopic.kenyanAnalogy?.summary ||
                                currentSubtopic.kenyanAnalogy?.intro
                              }`
                            )
                          }
                          className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all flex items-center gap-1 shrink-0 ${
                            speakingBoxId === 'kenyan-summary'
                              ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                              : 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border-emerald-600/40'
                          }`}
                          title="Read Kenyan analogy intro aloud and stop"
                        >
                          {speakingBoxId === 'kenyan-summary' ? (
                            <VolumeX className="w-3.5 h-3.5" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                          <span>
                            {speakingBoxId === 'kenyan-summary' ? 'Stop' : 'Read Intro'}
                          </span>
                        </button>
                      </div>

                      {/* Each Item Card with Independent Read-Aloud */}
                      <div className="space-y-2.5 pt-1">
                        {(
                          currentSubtopic.kenyanAnalogy?.points ||
                          currentSubtopic.kenyanAnalogy?.cards ||
                          []
                        ).map((pt, idx) => (
                          <div
                            key={idx}
                            className={`bg-[#101728] rounded-2xl p-3.5 border flex items-start justify-between gap-3 shadow-sm transition-all ${
                              speakingBoxId === `kenyan-pt-${idx}`
                                ? 'speak-box-active-emerald border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.25)]'
                                : 'border-slate-800 hover:border-emerald-500/40'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl shrink-0 mt-0.5">{pt.emoji}</span>
                              <div>
                                <div className="font-black text-white text-sm sm:text-base">
                                  {pt.name}
                                </div>
                                <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-relaxed mt-0.5 whitespace-pre-line">
                                  {pt.desc || pt.simple}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                speakBoxText(
                                  `kenyan-pt-${idx}`,
                                  `${pt.name}. ${pt.desc || pt.simple}`
                                )
                              }
                              className={`px-2 py-1 rounded-xl text-xs font-black border transition-all flex items-center gap-1 shrink-0 mt-0.5 ${
                                speakingBoxId === `kenyan-pt-${idx}`
                                  ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700/60 hover:text-white'
                              }`}
                              title={`Read ${pt.name} aloud and stop`}
                            >
                              {speakingBoxId === `kenyan-pt-${idx}` ? (
                                <VolumeX className="w-3.5 h-3.5" />
                              ) : (
                                <Volume2 className="w-3.5 h-3.5" />
                              )}
                              <span>
                                {speakingBoxId === `kenyan-pt-${idx}` ? 'Stop' : 'Read'}
                              </span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 5-SECOND BODY & MIND MICRO-ACTION (WITH INDEPENDENT READ-ALOUD) */}
              {(() => {
                const bodyAct =
                  currentSubtopic.bodyMicroAction || currentSubtopic.bodyMove || {};
                return (
                  <div
                    className={`bg-gradient-to-br from-[#181329] via-[#141224] to-[#0d0f1a] rounded-3xl p-5 sm:p-6 border shadow-xl transition-all ${
                      speakingBoxId === 'body-action-box'
                        ? 'speak-box-active-purple border-purple-400'
                        : 'border-purple-500/40'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 max-w-3xl">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-700/60 text-xs font-black">
                            <span>🤸🧠</span>
                            <span>
                              Body & Mind Memory Lock (Great for ADHD & Hands-On Learners!)
                            </span>
                          </div>

                          <button
                            onClick={() =>
                              speakBoxText(
                                'body-action-box',
                                `5-Second Body and Mind Memory Lock: ${
                                  bodyAct.title
                                }. Instruction: ${bodyAct.instruction}. Steps: ${(
                                  bodyAct.steps || []
                                ).join('. ')}. ${
                                  bodyAct.whyItWorks
                                    ? 'Why this locks into memory: ' + bodyAct.whyItWorks
                                    : ''
                                }`
                              )
                            }
                            className={`px-3 py-1 rounded-xl font-black text-xs border transition-all flex items-center gap-1.5 shrink-0 ${
                              speakingBoxId === 'body-action-box'
                                ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                                : 'bg-purple-900/60 hover:bg-purple-800 text-purple-200 border-purple-500/50'
                            }`}
                            title="Read this 5-second body move aloud and stop"
                          >
                            {speakingBoxId === 'body-action-box' ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5" />
                                <span>Stop</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>Read Move Aloud</span>
                              </>
                            )}
                          </button>
                        </div>

                        <h3 className="text-lg sm:text-xl font-black text-white">
                          {bodyAct.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-bold text-slate-300">
                          {bodyAct.instruction}
                        </p>
                        {Array.isArray(bodyAct.steps) && bodyAct.steps.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {bodyAct.steps.map((step, i) => (
                              <div
                                key={i}
                                className="bg-[#181f33]/90 p-3 rounded-2xl border border-purple-500/30 text-xs sm:text-sm font-extrabold text-slate-100 shadow-sm"
                              >
                                {step}
                              </div>
                            ))}
                          </div>
                        )}
                        {bodyAct.whyItWorks && (
                          <div className="bg-[#181f33]/90 p-3 rounded-2xl border border-purple-500/30 text-xs sm:text-sm font-extrabold text-purple-300 shadow-sm">
                            💡 Why this locks into memory: {bodyAct.whyItWorks}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 flex flex-col items-center gap-2">
                        <button
                          onClick={() => handleCompleteBodyMove(currentSubtopic.id)}
                          className={`px-5 py-3.5 rounded-2xl font-black text-sm border-2 transition-all shadow-lg active:scale-95 flex items-center gap-2 ${
                            completedBodyMoves[currentSubtopic.id]
                              ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.35)] animate-bounce'
                          }`}
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          <span>
                            {completedBodyMoves[currentSubtopic.id]
                              ? '🎉 Body Move Locked In!'
                              : '🙌 I Did This 5-Sec Move!'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* TOPIC 1 & 2 TOYBOXES */}
            {activeSubtopicId === 'distributions' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-emerald-300 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-emerald-100 pb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">
                      🎮 Interactive Toybox 1.1 • Zero-Stress Game
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      Match the Neighbor to Their Perfect Linux House (Distro)! 🏘️🍲
                    </h3>
                  </div>
                  <div className="bg-emerald-50 px-4 py-2 rounded-2xl border-2 border-emerald-200 text-emerald-950 font-black text-xs sm:text-sm shrink-0">
                    Neighbors Helped: {Object.keys(neighborSolved).length} / 4 ⭐
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {distroMatcherCharacters.map((char, idx) => {
                    const isCurrent = idx === activeNeighborIndex;
                    const isDone = neighborSolved[char.id];
                    return (
                      <button
                        key={char.id}
                        onClick={() => {
                          sounds.playPop();
                          setActiveNeighborIndex(idx);
                          setNeighborFeedback(null);
                        }}
                        className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-2.5 ${
                          isCurrent
                            ? 'bg-amber-100 border-amber-500 text-amber-950 font-black shadow-sm scale-[1.02]'
                            : 'bg-slate-50 hover:bg-amber-50/60 border-slate-200 text-slate-700 font-bold'
                        }`}
                      >
                        <span className="text-2xl">{char.avatar}</span>
                        <div className="min-w-0">
                          <div className="text-xs truncate">{char.name.split(' (')[0]}</div>
                          <div className="text-[10px] text-emerald-700 font-black">
                            {isDone ? '✅ Matched!' : 'Tap to help'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-amber-50/90 rounded-3xl p-5 border-4 border-amber-300 flex flex-col sm:flex-row items-center gap-4">
                  <div className="text-5xl bg-white p-4 rounded-3xl border-2 border-amber-300 shadow-sm shrink-0">
                    {currentNeighbor.avatar}
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="text-xs font-black uppercase tracking-wider text-amber-900">
                      Neighbor #{activeNeighborIndex + 1}: {currentNeighbor.name}
                    </div>
                    <p className="text-base sm:text-lg font-black text-slate-900">
                      {currentNeighbor.quote}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        key: 'ubuntu',
                        name: 'Ubuntu',
                        emoji: '🏡🍛',
                        houseTag: 'Cozy Furnished Cottage',
                        kenyanTag: 'Ready Ugali at Mama Oliech',
                        desc: 'Friendly, pre-decorated, ready for beginners on Day 1!',
                        bg: 'bg-orange-50 hover:bg-orange-100 border-orange-300'
                      },
                      {
                        key: 'fedora',
                        name: 'Fedora',
                        emoji: '🏢☕',
                        houseTag: 'Modern Tech Studio',
                        kenyanTag: 'Kilimani Tech Café',
                        desc: 'Packed with the newest coding & builder tools!',
                        bg: 'bg-sky-50 hover:bg-sky-100 border-sky-300'
                      },
                      {
                        key: 'arch',
                        name: 'Arch Linux',
                        emoji: '🏗️🌽',
                        houseTag: 'DIY Custom Mansion',
                        kenyanTag: 'Posho Mill Custom Grind',
                        desc: 'Bare foundation + raw bricks—build every wall your way!',
                        bg: 'bg-purple-50 hover:bg-purple-100 border-purple-300'
                      },
                      {
                        key: 'kali',
                        name: 'Kali Linux',
                        emoji: '🛡️🚓',
                        houseTag: 'Security Inspector House',
                        kenyanTag: 'G4S Patrol Command Van',
                        desc: 'Pre-loaded with lock testers & ethical security tools!',
                        bg: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300'
                      }
                    ].map((d) => (
                      <button
                        key={d.key}
                        onClick={() => handlePickDistroForNeighbor(d.key)}
                        className={`p-4 rounded-2xl border-4 text-left transition-all flex flex-col justify-between space-y-3 shadow-sm active:scale-95 ${d.bg}`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-3xl">{d.emoji}</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-800 font-black text-xs border border-slate-200">
                              Pick Me
                            </span>
                          </div>
                          <div className="text-lg font-black text-slate-900">{d.name}</div>
                          <div className="text-xs font-extrabold text-amber-900">
                            🏠 {d.houseTag}
                          </div>
                          <div className="text-xs font-extrabold text-emerald-900">
                            🇰🇪 {d.kenyanTag}
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-slate-700 pt-2 border-t border-slate-200/80">
                          {d.desc}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-800 text-amber-200 rounded-2xl p-3 text-center font-black text-xs sm:text-sm border-4 border-slate-700">
                    🧱 SHARED SOLID FOUNDATION UNDER ALL 4: THE LINUX KERNEL (Same Core Engine / Same Simba Cement Slab!) 🧱
                  </div>
                </div>

                {neighborFeedback && (
                  <div
                    className={`rounded-2xl p-4 border-2 font-extrabold text-sm sm:text-base flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      neighborFeedback.type === 'success'
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                        : 'bg-amber-100 border-amber-400 text-amber-950'
                    }`}
                  >
                    <span>{neighborFeedback.text}</span>
                    {neighborFeedback.type === 'success' && activeNeighborIndex < 3 && (
                      <button
                        onClick={() => {
                          sounds.playPop();
                          setActiveNeighborIndex((prev) => prev + 1);
                          setNeighborFeedback(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-black text-xs shrink-0"
                      >
                        Next Neighbor →
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeSubtopicId === 'architecture' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-sky-300 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-sky-100 pb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-black">
                      🎮 Interactive Toybox 1.2 • Live 4-Layer House & Kibanda Cutaway
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      Watch How Your Order Travels Through All 4 Layers! 🏗️🍽️
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      sounds.playPop();
                      setArchAnimStep(0);
                    }}
                    disabled={archAnimStep !== null}
                    className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm border-2 shadow-md transition-all flex items-center gap-2 shrink-0 ${
                      archAnimStep !== null
                        ? 'bg-amber-500 text-white border-amber-700 animate-pulse'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-800 active:scale-95'
                    }`}
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>
                      {archAnimStep !== null
                        ? '⏳ Travelling Through Layers...'
                        : '▶️ Watch Live Order (Apps → Shell → Kernel → Hardware)!'}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-6 space-y-2.5">
                    {architectureLayersData.map((layer) => {
                      const isSelected = selectedLayerLevel === layer.level;
                      return (
                        <button
                          key={layer.id}
                          onClick={() => {
                            sounds.playPop();
                            setSelectedLayerLevel(layer.level);
                          }}
                          className={`w-full p-4 rounded-2xl border-4 text-left transition-all flex items-center justify-between gap-3 ${
                            isSelected
                              ? `${layer.activeColor} shadow-md scale-[1.02]`
                              : `${layer.color} hover:opacity-95`
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-3xl bg-white/90 p-2 rounded-xl shadow-sm shrink-0">
                              {layer.emoji}
                            </span>
                            <div>
                              <div className="text-sm sm:text-base font-black">
                                {layer.name}
                              </div>
                              <div
                                className={`text-xs font-bold ${
                                  isSelected ? 'text-white/90' : 'text-slate-700'
                                }`}
                              >
                                {layer.whatItIs}
                              </div>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-xl bg-white/90 text-slate-900 font-black text-xs shrink-0">
                            {isSelected ? '👀 Viewing' : 'Tap'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    {(() => {
                      const activeLayer =
                        architectureLayersData.find((l) => l.level === selectedLayerLevel) ||
                        architectureLayersData[2];
                      return (
                        <div className="bg-amber-50/80 rounded-3xl p-5 border-4 border-amber-300 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 font-black text-xs">
                              Currently Inspecting: {activeLayer.shortName}
                            </span>
                            <span className="text-3xl">{activeLayer.emoji}</span>
                          </div>

                          {archAnimStep !== null && (
                            <div className="bg-emerald-600 text-white p-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-sm">
                              {archAnimStep <= 3
                                ? activeLayer.liveStepDown
                                : activeLayer.liveStepUp}
                            </div>
                          )}

                          <h4 className="text-lg sm:text-xl font-black text-slate-900">
                            {activeLayer.name}
                          </h4>

                          <div className="space-y-2 text-xs sm:text-sm">
                            <div className="bg-white p-3.5 rounded-2xl border-2 border-amber-200 font-bold text-amber-950">
                              {activeLayer.houseRole}
                            </div>
                            <div className="bg-white p-3.5 rounded-2xl border-2 border-emerald-200 font-bold text-emerald-950">
                              {activeLayer.kenyanRole}
                            </div>
                          </div>

                          <div className="bg-white rounded-2xl p-4 border-2 border-sky-200 space-y-2.5">
                            <div className="text-xs font-black uppercase tracking-wider text-sky-900">
                              🔍 Inside Layer 2 (The Kernel’s 3 Secret Helpers — Tap to Meet Them!):
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                {
                                  id: 'scheduler',
                                  label: '⏰ Time Manager',
                                  tech: 'Process Scheduler'
                                },
                                {
                                  id: 'mmu',
                                  label: '🗄️ Closet Manager',
                                  tech: 'Memory (MMU)'
                                },
                                {
                                  id: 'vfs',
                                  label: '🗂️ Master Drawer Map',
                                  tech: 'Virtual File System'
                                }
                              ].map((h) => (
                                <button
                                  key={h.id}
                                  onClick={() => {
                                    sounds.playPop();
                                    setSelectedKernelHelper(h.id);
                                  }}
                                  className={`p-2 rounded-xl border-2 text-center font-black text-xs transition-all ${
                                    selectedKernelHelper === h.id
                                      ? 'bg-sky-600 text-white border-sky-700'
                                      : 'bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100'
                                  }`}
                                >
                                  <div>{h.label}</div>
                                  <div className="text-[10px] opacity-85">({h.tech})</div>
                                </button>
                              ))}
                            </div>
                            <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-slate-800">
                              {selectedKernelHelper === 'scheduler' &&
                                '⏰ Process Scheduler (Time Manager): Decides which app gets a turn on the CPU chip so no app starves! (Mama Pima sharing the jiko fire fairly).'}
                              {selectedKernelHelper === 'mmu' &&
                                '🗄️ Memory Management Unit (Smart Closet): Gives each running program its own safe private room in RAM memory so they never crash into each other!'}
                              {selectedKernelHelper === 'vfs' &&
                                '🗂️ Virtual File System (Master Drawer Map): Lets you open files from a hard drive, USB flash disk, or folder seamlessly!'}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {activeSubtopicId === 'linux-vs-unix' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-amber-300 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-amber-100 pb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                      🎮 Interactive Toybox 1.3 • Two-Compound Gate Tester
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      Test the Unix Locked Gate vs. the Linux Open Harambee Gate! 🔒🔓
                    </h3>
                  </div>

                  <div className="bg-amber-50 px-4 py-2 rounded-2xl border-2 border-amber-200 text-amber-950 font-black text-xs sm:text-sm shrink-0">
                    Scenarios Tested: {Object.keys(gateTested).length} / 4 🔍
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {unixVsLinuxScenarios.map((sc) => {
                    const isActive = sc.id === activeComparisonId;
                    const isDone = gateTested[sc.id];
                    return (
                      <button
                        key={sc.id}
                        onClick={() => {
                          sounds.playPop();
                          setActiveComparisonId(sc.id);
                          setGateTested((prev) => ({ ...prev, [sc.id]: true }));
                        }}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-2 ${
                          isActive
                            ? 'bg-amber-500 text-white border-amber-700 font-black shadow-sm scale-[1.02]'
                            : 'bg-amber-50/70 hover:bg-amber-100 text-slate-800 border-amber-200 font-bold'
                        }`}
                      >
                        <span className="text-xs sm:text-sm">{sc.question}</span>
                        {isDone && (
                          <span className="text-xs bg-white text-emerald-700 px-2 py-0.5 rounded-full font-black">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {(() => {
                  const activeScenario =
                    unixVsLinuxScenarios.find((s) => s.id === activeComparisonId) ||
                    unixVsLinuxScenarios[0];
                  return (
                    <div className="space-y-4">
                      <div className="bg-slate-100 rounded-2xl p-4 border-2 border-slate-200 text-center">
                        <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                          Everyday Situation:
                        </div>
                        <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                          “{activeScenario.prompt}”
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="bg-rose-50/90 rounded-3xl p-5 border-4 border-rose-300 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-rose-200 text-rose-950 font-black text-xs">
                              🏰🔒 THE UNIX COMPOUND (Private Club)
                            </span>
                            <Lock className="w-6 h-6 text-rose-600" />
                          </div>
                          <div className="text-base sm:text-lg font-black text-rose-950">
                            {activeScenario.unixResult.badge}
                          </div>
                          <p className="text-sm font-semibold text-slate-800 bg-white p-4 rounded-2xl border-2 border-rose-200">
                            {activeScenario.unixResult.text}
                          </p>
                        </div>

                        <div className="bg-emerald-50/90 rounded-3xl p-5 border-4 border-emerald-400 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-950 font-black text-xs">
                              🏡🔓 THE LINUX COMPOUND (Harambee Open House)
                            </span>
                            <Unlock className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div className="text-base sm:text-lg font-black text-emerald-950">
                            {activeScenario.linuxResult.badge}
                          </div>
                          <p className="text-sm font-semibold text-slate-800 bg-white p-4 rounded-2xl border-2 border-emerald-200">
                            {activeScenario.linuxResult.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {activeSubtopicId === 'file-system' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-emerald-300 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-emerald-100 pb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">
                      🎮 Interactive Toybox 2.1 • Organize the House & Duka!
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      Learn the 3 Types of Things in a Linux File System! 🗄️🧺
                    </h3>
                  </div>
                  <div className="bg-emerald-50 px-4 py-2 rounded-2xl border-2 border-emerald-200 text-emerald-950 font-black text-xs sm:text-sm shrink-0">
                    Items Sorted: {Object.keys(sortedItems).length} / 6 ✨
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  {[
                    {
                      id: 'bedroom_dir',
                      label: '/home/sam',
                      emoji: '🚪',
                      type: 'Directory (Room / Shelf)',
                      explain: '✅ /home/sam is a Directory (Room)! It holds Sam’s files and smaller folders inside it.'
                    },
                    {
                      id: 'recipe_file',
                      label: 'chapati_recipe.txt',
                      emoji: '📄',
                      type: 'General File (Item)',
                      explain: '✅ chapati_recipe.txt is a General File! It is a note/item sitting on a shelf inside a room.'
                    },
                    {
                      id: 'usb_dev',
                      label: '/dev/sdb1 (USB Flash)',
                      emoji: '🔌',
                      type: 'Device File (Wall Plug)',
                      explain: '✅ /dev/sdb1 is a Device File! Linux treats your plugged-in USB flash drive like a special plug file inside /dev!'
                    },
                    {
                      id: 'photo_file',
                      label: 'family_photo.jpg',
                      emoji: '🖼️',
                      type: 'General File (Item)',
                      explain: '✅ family_photo.jpg is a General File! Picture, music, and text items are all General Files.'
                    },
                    {
                      id: 'kitchen_dir',
                      label: '/etc (Settings)',
                      emoji: '🗄️',
                      type: 'Directory (Room / Shelf)',
                      explain: '✅ /etc is a Directory (Cabinet Room)! It stores all the house rulebooks inside it.'
                    },
                    {
                      id: 'printer_dev',
                      label: '/dev/lp0 (Printer)',
                      emoji: '🖨️',
                      type: 'Device File (Wall Plug)',
                      explain: '✅ /dev/lp0 is a Device File! Even a physical printer is accessed like a file in Linux!'
                    }
                  ].map((item) => {
                    const isSorted = sortedItems[item.id];
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          sounds.playSuccess();
                          setSortedItems((prev) => ({ ...prev, [item.id]: item.type }));
                          setSorterFeedback(item.explain);
                        }}
                        className={`p-3.5 rounded-2xl border-3 text-center transition-all flex flex-col items-center justify-between gap-2 ${
                          isSorted
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black scale-[1.02]'
                            : 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-slate-800 font-bold'
                        }`}
                      >
                        <span className="text-3xl">{item.emoji}</span>
                        <div className="text-xs font-black">{item.label}</div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200">
                          {isSorted ? `✓ ${item.type.split(' (')[0]}` : 'Tap to Inspect'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-300 font-black text-emerald-950 text-xs sm:text-sm text-center">
                  {sorterFeedback}
                </div>
              </div>
            )}

            {activeSubtopicId === 'file-hierarchy-structure' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-sky-300 shadow-sm space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-black">
                    🎮 Interactive Toybox 2.2 • Upside-Down Family Tree Explorer
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Tap Any Branch Below to Trace Its Path From Root ( / )! 🌳🚪
                  </h3>
                </div>

                <div className="bg-sky-50/70 rounded-3xl p-5 border-3 border-sky-200 space-y-5">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setActiveTreePath('/');
                      }}
                      className={`px-6 py-3 rounded-2xl border-4 font-black text-sm sm:text-base transition-all shadow-md flex items-center gap-2 ${
                        activeTreePath.startsWith('/')
                          ? 'bg-amber-500 text-white border-amber-700 scale-105'
                          : 'bg-white text-slate-800 border-slate-300'
                      }`}
                    >
                      <span>🚪🚧</span>
                      <span>/ (Root = Main Front Door / Main Compound Gate)</span>
                    </button>
                    <div className="h-6 w-1 bg-sky-400" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      {
                        path: '/home',
                        label: '/home',
                        sub: 'Bedrooms / Houses',
                        emoji: '🛏️',
                        childPath: '/home/sam/photos',
                        childLabel: '↳ /home/sam/photos'
                      },
                      {
                        path: '/etc',
                        label: '/etc',
                        sub: 'Settings / Meter Box',
                        emoji: '⚙️',
                        childPath: '/etc/passwd',
                        childLabel: '↳ /etc/passwd (Registry)'
                      },
                      {
                        path: '/bin',
                        label: '/bin',
                        sub: 'Toolbox / Jembe Shed',
                        emoji: '🧰',
                        childPath: '/bin/ls',
                        childLabel: '↳ /bin/ls (Magnifier)'
                      },
                      {
                        path: '/var',
                        label: '/var',
                        sub: 'Guard’s OB Logbook',
                        emoji: '📓',
                        childPath: '/var/log',
                        childLabel: '↳ /var/log (Gate Logs)'
                      }
                    ].map((branch) => {
                      const isSelected = activeTreePath.startsWith(branch.path);
                      return (
                        <div
                          key={branch.path}
                          className="flex flex-col items-center space-y-2"
                        >
                          <button
                            onClick={() => {
                              sounds.playSuccess();
                              setActiveTreePath(branch.childPath);
                            }}
                            className={`w-full p-3.5 rounded-2xl border-3 text-center transition-all ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-800 font-black shadow-md scale-[1.03]'
                                : 'bg-white hover:bg-emerald-50 text-slate-800 border-sky-300 font-bold'
                            }`}
                          >
                            <div className="text-2xl">{branch.emoji}</div>
                            <div className="text-sm font-black mt-1">{branch.label}</div>
                            <div
                              className={`text-[11px] ${
                                isSelected ? 'text-emerald-100' : 'text-slate-500'
                              }`}
                            >
                              {branch.sub}
                            </div>
                          </button>

                          <div className="h-4 w-0.5 bg-sky-300" />

                          <button
                            onClick={() => {
                              sounds.playSuccess();
                              setActiveTreePath(branch.childPath);
                            }}
                            className={`w-full p-2.5 rounded-xl border-2 text-xs font-extrabold text-center transition-all ${
                              activeTreePath === branch.childPath
                                ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-sm'
                                : 'bg-white/80 border-slate-200 text-slate-600'
                            }`}
                          >
                            {branch.childLabel}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-white rounded-2xl p-4 border-2 border-sky-300 space-y-2">
                    <div className="text-xs font-black uppercase tracking-wider text-sky-900">
                      🔍 Live Path Decoder for:{' '}
                      <code className="bg-amber-100 px-2 py-0.5 rounded text-amber-950">
                        {activeTreePath}
                      </code>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-700">
                      {activeTreePath === '/' &&
                        '🚪 You are standing right at the Main Front Gate ( / ) at the very top of the tree!'}
                      {activeTreePath === '/home/sam/photos' &&
                        '🚪 Start at Main Gate ( / ) ➔ Enter Bedrooms Hallway ( home ) ➔ Open Door ( / ) ➔ Enter Sam’s Room ( sam ) ➔ Open Door ( / ) ➔ Open Photos Drawer ( photos )!'}
                      {activeTreePath === '/etc/passwd' &&
                        '🚪 Start at Main Gate ( / ) ➔ Enter Settings Cabinet ( etc ) ➔ Open Door ( / ) ➔ Read the Family Registry Book ( passwd )!'}
                      {activeTreePath === '/bin/ls' &&
                        '🚪 Start at Main Gate ( / ) ➔ Enter Everyday Toolbox ( bin ) ➔ Open Door ( / ) ➔ Grab the Magnifying Glass tool ( ls )!'}
                      {activeTreePath === '/var/log' &&
                        '🚪 Start at Main Gate ( / ) ➔ Enter Storage & OB Shed ( var ) ➔ Open Door ( / ) ➔ Open the Security Guard’s Logbook folder ( log )!'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSubtopicId === 'directory-structure' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-amber-300 shadow-sm space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                    🎮 Interactive Toybox 2.3 • Open Any Room Door!
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Tap Any of the 7 Linux Rooms to Peek Inside! 🏡🇰🇪
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                  {linuxRoomsDirectoryData.map((rm) => {
                    const isActive = rm.path === selectedRoomPath;
                    return (
                      <button
                        key={rm.path}
                        onClick={() => {
                          sounds.playPop();
                          setSelectedRoomPath(rm.path);
                        }}
                        className={`p-3 rounded-2xl border-3 text-center transition-all flex flex-col items-center gap-1.5 ${
                          isActive
                            ? 'bg-amber-500 text-white border-amber-700 font-black shadow-md scale-105'
                            : 'bg-amber-50/70 hover:bg-amber-100 text-slate-800 border-amber-200 font-bold'
                        }`}
                      >
                        <span className="text-2xl">{rm.emoji}</span>
                        <span className="text-sm font-black">{rm.path}</span>
                      </button>
                    );
                  })}
                </div>

                {(() => {
                  const rm =
                    linuxRoomsDirectoryData.find((r) => r.path === selectedRoomPath) ||
                    linuxRoomsDirectoryData[1];
                  return (
                    <div className="bg-amber-50/90 rounded-3xl p-5 border-4 border-amber-300 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      <div className="md:col-span-7 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl bg-white p-3 rounded-2xl border-2 border-amber-300 shadow-sm">
                            {rm.emoji}
                          </span>
                          <div>
                            <div className="text-xs font-black uppercase text-amber-800">
                              Room Directory Path:
                            </div>
                            <h4 className="text-2xl font-black text-slate-900">
                              {rm.name}
                            </h4>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base font-bold text-slate-800">
                          {rm.whatLivesHere}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                          <div className="bg-white p-3 rounded-2xl border-2 border-amber-200 font-extrabold text-amber-950">
                            🏠 House: {rm.houseRole}
                          </div>
                          <div className="bg-white p-3 rounded-2xl border-2 border-emerald-200 font-extrabold text-emerald-950">
                            🇰🇪 Kenyan: {rm.kenyanRole}
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-5 bg-white rounded-2xl p-4 border-2 border-amber-200 space-y-2">
                        <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                          🔦 Items Inside {rm.path} Right Now:
                        </div>
                        <div className="space-y-1.5">
                          {rm.insideItems.map((it, idx) => (
                            <div
                              key={idx}
                              className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 font-extrabold text-xs sm:text-sm text-slate-800"
                            >
                              • {it}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {activeSubtopicId === 'navigation-commands' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-purple-300 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-purple-100 pb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black">
                      🎮 Interactive Toybox 2.4 • Walk Sam Around the House!
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      Try the Big 3 Tools: <code className="text-purple-700">pwd</code>,{' '}
                      <code className="text-emerald-700">ls</code>, and{' '}
                      <code className="text-amber-700">cd</code>! ⌚🔍👟
                    </h3>
                  </div>

                  <div className="bg-purple-50 px-4 py-2 rounded-2xl border-2 border-purple-200 text-purple-950 font-black text-xs sm:text-sm">
                    Current Room: <code>{simCurrentRoom}</code>
                  </div>
                </div>

                {(() => {
                  const roomObj = navRoomsMap[simCurrentRoom] || navRoomsMap['/home/sam'];
                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      <div className="lg:col-span-6 space-y-4">
                        <div className="bg-purple-50/80 rounded-2xl p-4 border-2 border-purple-200 space-y-3">
                          <div className="text-xs font-black uppercase tracking-wider text-purple-900">
                            🛠️ Step 1: Check Location & Look Around
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <button
                              onClick={() => {
                                sounds.playPop();
                                setSimLastCommand('pwd');
                                setSimBubbleMessage(
                                  `⌚ GPS Watch (pwd) says: You are currently standing inside "${simCurrentRoom}"!`
                                );
                              }}
                              className="p-3 rounded-2xl bg-white hover:bg-purple-100 border-2 border-purple-300 font-black text-xs text-purple-950 shadow-sm active:scale-95"
                            >
                              ⌚ Run <code>pwd</code>
                              <div className="text-[10px] font-bold text-slate-500 mt-0.5">
                                "Where am I?"
                              </div>
                            </button>

                            <button
                              onClick={() => {
                                sounds.playPop();
                                setSimShowHidden(false);
                                setSimLastCommand('ls');
                                setSimBubbleMessage(
                                  `🔍 Magnifying Glass (ls): Showing normal visible items inside ${simCurrentRoom}!`
                                );
                              }}
                              className="p-3 rounded-2xl bg-white hover:bg-emerald-100 border-2 border-emerald-300 font-black text-xs text-emerald-950 shadow-sm active:scale-95"
                            >
                              🔍 Run <code>ls</code>
                              <div className="text-[10px] font-bold text-slate-500 mt-0.5">
                                "Look around room"
                              </div>
                            </button>

                            <button
                              onClick={() => {
                                sounds.playSuccess();
                                setSimShowHidden(true);
                                setSimLastCommand('ls -a');
                                setSimBubbleMessage(
                                  `🕵️ Secret Peek (ls -a): Lifted the carpet! Now you can see secret dot-files (.hidden) too!`
                                );
                              }}
                              className="p-3 rounded-2xl bg-white hover:bg-amber-100 border-2 border-amber-300 font-black text-xs text-amber-950 shadow-sm active:scale-95"
                            >
                              🕵️ Run <code>ls -a</code>
                              <div className="text-[10px] font-bold text-slate-500 mt-0.5">
                                "Peek under rug!"
                              </div>
                            </button>
                          </div>
                        </div>

                        <div className="bg-amber-50/80 rounded-2xl p-4 border-2 border-amber-200 space-y-3">
                          <div className="text-xs font-black uppercase tracking-wider text-amber-900">
                            👟 Step 2: Walk Through Doors (cd)
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {roomObj.doors.map((d) => (
                              <button
                                key={d.target}
                                onClick={() => {
                                  sounds.playPop();
                                  setSimCurrentRoom(d.target);
                                  setSimShowHidden(false);
                                  setSimLastCommand(d.cmd);
                                  setSimBubbleMessage(
                                    `👟 Walked forward (${d.cmd}) into ${d.target}!`
                                  );
                                }}
                                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm active:scale-95"
                              >
                                {d.label}
                              </button>
                            ))}

                            <button
                              onClick={() => {
                                sounds.playPop();
                                const nextRoom = roomObj.parent;
                                setSimCurrentRoom(nextRoom);
                                setSimShowHidden(false);
                                setSimLastCommand('cd ..');
                                setSimBubbleMessage(
                                  `🔙 Stepped 1 room backward (cd ..) to ${nextRoom}!`
                                );
                              }}
                              className="px-4 py-2.5 rounded-2xl bg-white hover:bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-xs shadow-sm active:scale-95"
                            >
                              🔙 <code>cd ..</code> (Step Back 1 Room)
                            </button>

                            <button
                              onClick={() => {
                                sounds.playSuccess();
                                setSimCurrentRoom('/home/sam');
                                setSimShowHidden(false);
                                setSimLastCommand('cd ~');
                                setSimBubbleMessage(
                                  '🏡 Magic Teleport (cd ~): "Rudi Nyumbani!" Instantly back in /home/sam!'
                                );
                              }}
                              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-sm active:scale-95"
                            >
                              🏡 <code>cd ~</code> (Teleport to Bedroom!)
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-5 border-4 border-slate-700 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-3xl">{roomObj.emoji}</span>
                            <div>
                              <div className="text-[11px] font-bold text-amber-300 uppercase">
                                Friendly Kitchen Counter (Terminal)
                              </div>
                              <div className="text-sm sm:text-base font-black text-white">
                                {roomObj.title}
                              </div>
                            </div>
                          </div>
                          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono font-black text-xs">
                            $ {simLastCommand}
                          </span>
                        </div>

                        <div className="bg-slate-800 rounded-2xl p-3.5 border border-slate-600 text-amber-200 font-bold text-xs sm:text-sm">
                          {simBubbleMessage}
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs font-black uppercase text-slate-400">
                            Items Visible in This Room (
                            {simShowHidden ? 'ls -a (with hidden)' : 'ls'}):
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {roomObj.items.map((it, i) => (
                              <span
                                key={i}
                                className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-600 text-white font-bold text-xs"
                              >
                                {it}
                              </span>
                            ))}
                            {simShowHidden &&
                              roomObj.hiddenItems.map((hit, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 border-2 border-amber-400 text-amber-200 font-black text-xs animate-pulse"
                                >
                                  {hit} (Hidden!)
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {activeSubtopicId === 'absolute-vs-relative-paths' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-rose-300 shadow-sm space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-black">
                    🎮 Interactive Toybox 2.5 • Red Arrow vs. Blue Arrow Path Detective!
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Compare Both Routes & Spot the Slash Trick! 🔴🛣️🔵
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-rose-50 rounded-3xl p-5 border-4 border-rose-300 space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-200 text-rose-950 font-black text-xs">
                      <span>🔴 ABSOLUTE PATH</span>
                      <span>• Starts with /</span>
                    </div>
                    <div className="font-mono text-base sm:text-lg font-black text-rose-900 bg-white p-3 rounded-2xl border-2 border-rose-200">
                      /home/sam/photos/mombasa.jpg
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-700">
                      Starts all the way at the <strong>Main Front Gate ( / )</strong>. Works no matter which room you are standing in right now!
                    </p>
                  </div>

                  <div className="bg-sky-50 rounded-3xl p-5 border-4 border-sky-300 space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-200 text-sky-950 font-black text-xs">
                      <span>🔵 RELATIVE PATH</span>
                      <span>• NO / at the start!</span>
                    </div>
                    <div className="font-mono text-base sm:text-lg font-black text-sky-900 bg-white p-3 rounded-2xl border-2 border-sky-200">
                      photos/mombasa.jpg
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-700">
                      Starts right from <strong>Sam’s shoes inside /home/sam</strong>! Because you are already in `/home/sam`, you just open `photos/mombasa.jpg`!
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50/70 rounded-3xl p-5 border-2 border-amber-200 space-y-3">
                  <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-950">
                    🕵️ Quick 5-Second Game: Tap "Absolute" or "Relative" for Each Path!
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: 'p1',
                        path: '/etc/passwd',
                        correct: 'absolute',
                        reason: 'Starts with "/" at the front gate!'
                      },
                      {
                        id: 'p2',
                        path: 'kitchen/chapati.txt',
                        correct: 'relative',
                        reason: 'No "/" at the very start—starts from your current room!'
                      },
                      {
                        id: 'p3',
                        path: '/var/log/auth.log',
                        correct: 'absolute',
                        reason: 'Starts with "/" at the main gate!'
                      },
                      {
                        id: 'p4',
                        path: '../wanjiku/notes.txt',
                        correct: 'relative',
                        reason: 'Starts with ".." (one step back from here), not "/"!'
                      }
                    ].map((card) => {
                      const picked = pathQuizAnswers[card.id];
                      const isRight = picked === card.correct;
                      return (
                        <div
                          key={card.id}
                          className="bg-white rounded-2xl p-4 border-2 border-amber-200 flex flex-col justify-between gap-3 shadow-sm"
                        >
                          <div className="font-mono text-sm sm:text-base font-black text-slate-900 bg-slate-100 px-3 py-2 rounded-xl">
                            {card.path}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (card.correct === 'absolute') sounds.playSuccess();
                                else sounds.playPop();
                                setPathQuizAnswers((prev) => ({
                                  ...prev,
                                  [card.id]: 'absolute'
                                }));
                              }}
                              className={`flex-1 py-2 rounded-xl font-black text-xs border-2 transition-all ${
                                picked === 'absolute'
                                  ? card.correct === 'absolute'
                                    ? 'bg-emerald-600 text-white border-emerald-700'
                                    : 'bg-rose-100 text-rose-900 border-rose-300'
                                  : 'bg-rose-50 hover:bg-rose-100 text-rose-950 border-rose-200'
                              }`}
                            >
                              🔴 Absolute (Starts with /)
                            </button>
                            <button
                              onClick={() => {
                                if (card.correct === 'relative') sounds.playSuccess();
                                else sounds.playPop();
                                setPathQuizAnswers((prev) => ({
                                  ...prev,
                                  [card.id]: 'relative'
                                }));
                              }}
                              className={`flex-1 py-2 rounded-xl font-black text-xs border-2 transition-all ${
                                picked === 'relative'
                                  ? card.correct === 'relative'
                                    ? 'bg-emerald-600 text-white border-emerald-700'
                                    : 'bg-rose-100 text-rose-900 border-rose-300'
                                  : 'bg-sky-50 hover:bg-sky-100 text-sky-950 border-sky-200'
                              }`}
                            >
                              🔵 Relative (From Here)
                            </button>
                          </div>
                          {picked && (
                            <div
                              className={`text-xs font-extrabold ${
                                isRight ? 'text-emerald-700' : 'text-amber-800'
                              }`}
                            >
                              {isRight ? `✅ Spot on! ${card.reason}` : `💡 Hint: ${card.reason}`}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================
               TOPIC 4 PLAYABLE TOYBOXES (5 SUBTOPICS)
               ================================================================= */}

            {/* TOYBOX 4.1: FILE MANAGEMENT WORKBENCH */}
            {activeSubtopicId === 'file-management' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-amber-300 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                      🎮 Interactive Toybox 4.1 • Sam’s Desk & Cybercafé Workbench
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      Tap a Tool to Create, Read, Copy, Move, Wildcard-Grab, or Shred Files! 📄🖨️🗑️
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playPop();
                      setT4DeskFiles([
                        {
                          name: 'chapati_recipe.txt',
                          type: 'txt',
                          lines: [
                            '1. Warm water & salt',
                            '2. Knead soft dough',
                            '3. Fry until golden brown!'
                          ]
                        },
                        { name: 'mombasa_trip.jpg', type: 'jpg', lines: ['[Sunny Beach Photo 📸]'] }
                      ]);
                      setT4CommandLog('$ ls\nchapati_recipe.txt  mombasa_trip.jpg');
                      setT4DeskMessage('🔄 Desk reset! Ready for you to test every file tool.');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs border border-slate-300"
                  >
                    🔄 Reset Desk
                  </button>
                </div>

                {/* Live Desk Visual + Action Buttons */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-amber-50/70 rounded-3xl p-4 sm:p-5 border-2 border-amber-200 space-y-4">
                    <div className="text-xs font-black uppercase tracking-wider text-amber-900">
                      🪵 Items Currently Sitting on Your Desk ({t4DeskFiles.length}):
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {t4DeskFiles.map((f, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-2xl p-3 border-2 border-amber-300 shadow-sm flex items-center gap-3"
                        >
                          <span className="text-2xl">
                            {f.type === 'jpg' ? '🖼️' : '📄'}
                          </span>
                          <div className="min-w-0">
                            <div className="font-mono text-xs sm:text-sm font-black text-slate-900 truncate">
                              {f.name}
                            </div>
                            <div className="text-[11px] font-bold text-slate-500">
                              {f.lines.length} line(s) inside
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs font-black uppercase tracking-wider text-amber-900 pt-1">
                      🧰 Click Any File Management Tool:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          if (!t4DeskFiles.some((f) => f.name === 'mpesa_log.txt')) {
                            setT4DeskFiles((prev) => [
                              ...prev,
                              {
                                name: 'mpesa_log.txt',
                                type: 'txt',
                                lines: ['10:00 AM - Sent Ksh 500', '02:30 PM - Received Ksh 1,200']
                              }
                            ]);
                          }
                          setT4CommandLog(
                            '$ touch mpesa_log.txt\n[Created fresh blank sheet mpesa_log.txt!]'
                          );
                          setT4DeskMessage(
                            '✨ touch mpesa_log.txt: Like tapping the desk to lay down a fresh blank sheet of paper!'
                          );
                        }}
                        className="p-2.5 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-300 text-left font-black text-xs text-slate-800 transition-all"
                      >
                        ✨ <span className="font-mono text-emerald-700">touch mpesa_log.txt</span>{' '}
                        (Create File)
                      </button>

                      <button
                        onClick={() => {
                          sounds.playPop();
                          setT4CommandLog(
                            '$ cat chapati_recipe.txt\n1. Warm water & salt\n2. Knead soft dough\n3. Fry until golden brown!\n\n$ tac chapati_recipe.txt\n3. Fry until golden brown!\n2. Knead soft dough\n1. Warm water & salt'
                          );
                          setT4DeskMessage(
                            '📖 cat reads top-to-bottom; tac (cat spelled backwards!) reads bottom-to-top so you see the newest line first!'
                          );
                        }}
                        className="p-2.5 rounded-2xl bg-white hover:bg-sky-50 border-2 border-sky-300 text-left font-black text-xs text-slate-800 transition-all"
                      >
                        📖 <span className="font-mono text-sky-700">cat vs. tac</span> (Read Forward &
                        Backward)
                      </button>

                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          if (!t4DeskFiles.some((f) => f.name === 'chapati_backup.txt')) {
                            setT4DeskFiles((prev) => [
                              ...prev,
                              {
                                name: 'chapati_backup.txt',
                                type: 'txt',
                                lines: [
                                  '1. Warm water & salt',
                                  '2. Knead soft dough',
                                  '3. Fry until golden brown!'
                                ]
                              }
                            ]);
                          }
                          setT4CommandLog(
                            '$ cp chapati_recipe.txt chapati_backup.txt\n[Photocopied! Both original and twin copy stay on the desk]'
                          );
                          setT4DeskMessage(
                            '🖨️ cp (Copy): The Photocopier! Your original stays safe AND a brand-new twin copy appears!'
                          );
                        }}
                        className="p-2.5 rounded-2xl bg-white hover:bg-purple-50 border-2 border-purple-300 text-left font-black text-xs text-slate-800 transition-all"
                      >
                        🖨️ <span className="font-mono text-purple-700">cp recipe.txt backup.txt</span>{' '}
                        (Photocopy)
                      </button>

                      <button
                        onClick={() => {
                          sounds.playPop();
                          setT4DeskFiles((prev) =>
                            prev.map((f) =>
                              f.name === 'mombasa_trip.jpg'
                                ? { ...f, name: 'diani_holiday.jpg' }
                                : f
                            )
                          );
                          setT4CommandLog(
                            '$ mv mombasa_trip.jpg diani_holiday.jpg\n[Renamed/Moved! No extra copy created]'
                          );
                          setT4DeskMessage(
                            '📦 mv (Move / Rename): Picks up the item and gives it a new name tag (or moves it to another room) without duplicating!'
                          );
                        }}
                        className="p-2.5 rounded-2xl bg-white hover:bg-amber-50 border-2 border-amber-300 text-left font-black text-xs text-slate-800 transition-all"
                      >
                        📦 <span className="font-mono text-amber-800">mv mombasa.jpg diani.jpg</span>{' '}
                        (Rename/Move)
                      </button>

                      <button
                        onClick={() => {
                          sounds.playPop();
                          const txtMatches = t4DeskFiles
                            .filter((f) => f.name.endsWith('.txt'))
                            .map((f) => f.name);
                          setT4CommandLog(
                            `$ ls *.txt\n${txtMatches.join('  ') || '(No .txt files)'}\n[Wildcard * matched every file ending in .txt at once!]`
                          );
                          setT4DeskMessage(
                            '🧲 *.txt (Star Wildcard Magnet): Grabs every single file ending in .txt in one swoop!'
                          );
                        }}
                        className="p-2.5 rounded-2xl bg-white hover:bg-indigo-50 border-2 border-indigo-300 text-left font-black text-xs text-slate-800 transition-all"
                      >
                        🧲 <span className="font-mono text-indigo-700">ls *.txt</span> (Wildcard Magnet)
                      </button>

                      <button
                        onClick={() => {
                          sounds.playPop();
                          setT4DeskFiles((prev) =>
                            prev.filter((f) => f.name !== 'chapati_backup.txt')
                          );
                          setT4CommandLog(
                            '$ rm -i chapati_backup.txt\nrm: remove regular file "chapati_backup.txt"? y\n[Safely shredded after asking permission!]'
                          );
                          setT4DeskMessage(
                            '🗑️ rm -i (Safe Shredder): Remember rm has NO Recycle Bin! Using -i asks "Are you sure? (y/n)" before shredding.'
                          );
                        }}
                        className="p-2.5 rounded-2xl bg-white hover:bg-rose-50 border-2 border-rose-300 text-left font-black text-xs text-slate-800 transition-all"
                      >
                        🗑️ <span className="font-mono text-rose-700">rm -i chapati_backup.txt</span>{' '}
                        (Safe Shred)
                      </button>
                    </div>
                  </div>

                  {/* Live Terminal Screen */}
                  <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-4 sm:p-5 border-4 border-slate-700 text-white flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                        🖥️ Live Terminal Output
                      </div>
                      <pre className="font-mono text-xs sm:text-sm font-bold text-emerald-300 whitespace-pre-wrap bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                        {t4CommandLog}
                      </pre>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3 text-xs font-bold text-amber-200 leading-relaxed">
                      💡 {t4DeskMessage}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TOYBOX 4.2: DIRECTORY MANAGEMENT ROOM CONTRACTOR */}
            {activeSubtopicId === 'directory-management' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-sky-300 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-black">
                      🎮 Interactive Toybox 4.2 • Room & Compound Contractor
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      Build Single Rooms (`mkdir`), 3-Floor Suites (`mkdir -p`), or Test Empty vs. Full Demolition! 🏗️🏠
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playPop();
                      setT4RoomsBuilt([
                        { path: 'kitchen/', items: 0, note: 'Empty Single Room' },
                        { path: 'bedroom/', items: 2, note: 'Has 2 items inside (bed.txt, lamp.jpg)' }
                      ]);
                      setT4DirCmdLog('$ ls -F\nkitchen/  bedroom/');
                      setT4DirMessage('🔄 Compound reset! Try the contractor buttons below.');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs border border-slate-300"
                  >
                    🔄 Reset Compound
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-sky-50/70 rounded-3xl p-4 sm:p-5 border-2 border-sky-200 space-y-4">
                    <div className="text-xs font-black uppercase tracking-wider text-sky-950">
                      🏘️ Rooms Currently Standing in Your Compound ({t4RoomsBuilt.length}):
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {t4RoomsBuilt.map((r, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-2xl p-3 border-2 border-sky-300 shadow-sm flex items-start gap-2.5"
                        >
                          <span className="text-2xl">{r.items > 0 ? '📦' : '📁'}</span>
                          <div>
                            <div className="font-mono text-xs sm:text-sm font-black text-slate-900">
                              {r.path}
                            </div>
                            <div className="text-[11px] font-bold text-slate-600">{r.note}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          if (!t4RoomsBuilt.some((r) => r.path === 'kibanda/')) {
                            setT4RoomsBuilt((prev) => [
                              ...prev,
                              { path: 'kibanda/', items: 0, note: 'Empty Single Room' }
                            ]);
                          }
                          setT4DirCmdLog('$ mkdir kibanda\n[Built 1 new empty room: kibanda/]');
                          setT4DirMessage(
                            '🧱 mkdir kibanda: Builds one fresh empty room right where you are standing!'
                          );
                        }}
                        className="p-2.5 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-300 text-left font-black text-xs"
                      >
                        🧱 <span className="font-mono text-emerald-700">mkdir kibanda</span> (Build 1
                        Room)
                      </button>

                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          if (!t4RoomsBuilt.some((r) => r.path === 'boma/simba/stoo/')) {
                            setT4RoomsBuilt((prev) => [
                              ...prev,
                              {
                                path: 'boma/simba/stoo/',
                                items: 1,
                                note: '3-Level Nested Suite (Parent + Child + Inner Room)'
                              }
                            ]);
                          }
                          setT4DirCmdLog(
                            '$ mkdir -p boma/simba/stoo\n[Built boma/ -> simba/ -> stoo/ all in one go!]'
                          );
                          setT4DirMessage(
                            '🏗️ mkdir -p boma/simba/stoo: The "-p" (Parent) flag builds the outer compound, cottage, and inner store all at once!'
                          );
                        }}
                        className="p-2.5 rounded-2xl bg-white hover:bg-sky-50 border-2 border-sky-300 text-left font-black text-xs"
                      >
                        🏗️ <span className="font-mono text-sky-700">mkdir -p boma/simba/stoo</span>{' '}
                        (Nested Suite)
                      </button>

                      <button
                        onClick={() => {
                          sounds.playPop();
                          setT4RoomsBuilt((prev) => prev.filter((r) => r.path !== 'kitchen/'));
                          setT4DirCmdLog(
                            '$ rmdir kitchen\n[Removed empty room kitchen/]\n\n$ rmdir bedroom\nrmdir: failed to remove "bedroom": Directory not empty!'
                          );
                          setT4DirMessage(
                            '🧹 rmdir only removes EMPTY rooms (like kitchen/), and politely refuses to touch bedroom/ because it still has furniture inside!'
                          );
                        }}
                        className="p-2.5 rounded-2xl bg-white hover:bg-amber-50 border-2 border-amber-300 text-left font-black text-xs"
                      >
                        🧹 <span className="font-mono text-amber-800">rmdir kitchen vs bedroom</span>{' '}
                        (Empty Check)
                      </button>

                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          if (!t4RoomsBuilt.some((r) => r.path === 'bedroom_backup/')) {
                            setT4RoomsBuilt((prev) => [
                              ...prev,
                              {
                                path: 'bedroom_backup/',
                                items: 2,
                                note: 'Full Twin Copy (with all furniture inside!)'
                              }
                            ]);
                          }
                          setT4DirCmdLog(
                            '$ cp -r bedroom bedroom_backup\n[Cloned the entire bedroom/ AND all 2 items inside!]'
                          );
                          setT4DirMessage(
                            '🖨️ cp -r (Recursive Copy): Because folders hold items inside, "-r" tells Linux to copy the room AND everything inside it!'
                          );
                        }}
                        className="p-2.5 rounded-2xl bg-white hover:bg-purple-50 border-2 border-purple-300 text-left font-black text-xs"
                      >
                        🖨️ <span className="font-mono text-purple-700">cp -r bedroom backup</span>{' '}
                        (Clone Whole Room)
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-4 sm:p-5 border-4 border-slate-700 text-white flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="text-[11px] font-black uppercase tracking-wider text-sky-300">
                        🖥️ Contractor Terminal Output
                      </div>
                      <pre className="font-mono text-xs sm:text-sm font-bold text-emerald-300 whitespace-pre-wrap bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                        {t4DirCmdLog}
                      </pre>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3 text-xs font-bold text-amber-200 leading-relaxed">
                      💡 {t4DirMessage}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TOYBOX 4.3: 10-CHARACTER PERMISSIONS BADGE DECODER */}
            {activeSubtopicId === 'permissions' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-emerald-300 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">
                      🎮 Interactive Toybox 4.3 • The 10-Character Door Badge Decoder
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      Tap Any Preset or Zone Below to Decode `-rwxr-xr--` Like a Pro! 🔐🔍
                    </h3>
                  </div>

                  {/* Preset Selector */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { code: '-rwxr-xr--', label: '📄 Script (-rwxr-xr--)' },
                      { code: 'drwxr-xr-x', label: '📁 Folder (drwxr-xr-x)' },
                      { code: 'drwxrwxrwt', label: '📌 /tmp Sticky Bit (drwxrwxrwt)' }
                    ].map((p) => (
                      <button
                        key={p.code}
                        onClick={() => {
                          sounds.playPop();
                          setT4SelectedBadgePreset(p.code);
                        }}
                        className={`px-3 py-1.5 rounded-xl font-black text-xs border-2 transition-all ${
                          t4SelectedBadgePreset === p.code
                            ? 'bg-emerald-600 text-white border-emerald-700'
                            : 'bg-emerald-50 text-emerald-950 border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color-Coded 4-Part Interactive Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    {
                      zone: 'type',
                      title: 'Slot 1: Item Type',
                      chars: t4SelectedBadgePreset.slice(0, 1),
                      color: 'bg-amber-100 border-amber-400 text-amber-950',
                      meaning:
                        t4SelectedBadgePreset[0] === 'd'
                          ? '"d" = Directory (A Room/Folder)'
                          : '"-" = Regular File (Paper/Photo/Script)'
                    },
                    {
                      zone: 'owner',
                      title: 'Slots 2–4: Owner (u)',
                      chars: t4SelectedBadgePreset.slice(1, 4),
                      color: 'bg-emerald-100 border-emerald-400 text-emerald-950',
                      meaning:
                        '👤 Owner (You / Shop Owner): Full rwx (Read=4 + Write=2 + Execute=1 = 7)!'
                    },
                    {
                      zone: 'group',
                      title: 'Slots 5–7: Group (g)',
                      chars: t4SelectedBadgePreset.slice(4, 7),
                      color: 'bg-sky-100 border-sky-400 text-sky-950',
                      meaning:
                        '👨‍👩‍👧‍👦 Group (Family / Chama): Can Read & Enter/Run (r-x = 5 or rwx = 7)!'
                    },
                    {
                      zone: 'others',
                      title: 'Slots 8–10: Others (o)',
                      chars: t4SelectedBadgePreset.slice(7, 10),
                      color: 'bg-purple-100 border-purple-400 text-purple-950',
                      meaning: t4SelectedBadgePreset.endsWith('t')
                        ? '📌 "t" = Sticky Bit! Everyone can post in /tmp, but only the owner can delete their own file!'
                        : '🌍 Others (Visitors): Can only look (r-- = 4) or enter (r-x = 5), never edit!'
                    }
                  ].map((part) => (
                    <button
                      key={part.zone}
                      onClick={() => {
                        sounds.playPop();
                        setT4SelectedSlotZone(part.zone);
                      }}
                      className={`p-4 rounded-3xl border-4 text-left transition-all flex flex-col justify-between gap-2 ${
                        part.color
                      } ${
                        t4SelectedSlotZone === part.zone
                          ? 'ring-4 ring-emerald-500 scale-[1.02] shadow-md'
                          : 'opacity-90 hover:opacity-100'
                      }`}
                    >
                      <div className="text-xs font-black uppercase tracking-wider">{part.title}</div>
                      <div className="font-mono text-3xl sm:text-4xl font-black tracking-widest bg-white/90 px-3 py-2 rounded-2xl text-center shadow-sm">
                        {part.chars}
                      </div>
                      <div className="text-xs font-bold leading-snug">{part.meaning}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TOYBOX 4.4: CHMOD 3-WHEEL PADLOCK DIALER */}
            {activeSubtopicId === 'chmod-command' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-purple-300 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black">
                      🎮 Interactive Toybox 4.4 • 3-Wheel Padlock Calculator (`chmod`)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      Flip the Switches (`4`, `2`, `1`) to Build Any `chmod` Lock Code Live! 🔢🔓
                    </h3>
                  </div>

                  {/* Famous Presets */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      {
                        label: '⚡ chmod 755 (Public Script)',
                        bits: {
                          u: { r: true, w: true, x: true },
                          g: { r: true, w: false, x: true },
                          o: { r: true, w: false, x: true }
                        }
                      },
                      {
                        label: '🔒 chmod 700 (Private Vault)',
                        bits: {
                          u: { r: true, w: true, x: true },
                          g: { r: false, w: false, x: false },
                          o: { r: false, w: false, x: false }
                        }
                      },
                      {
                        label: '📄 chmod 644 (Standard Document)',
                        bits: {
                          u: { r: true, w: true, x: false },
                          g: { r: true, w: false, x: false },
                          o: { r: true, w: false, x: false }
                        }
                      }
                    ].map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          sounds.playSuccess();
                          setChmodBits(preset.bits);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-950 border-2 border-purple-300 font-black text-xs"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {(() => {
                  const calcWheel = (w) => (w.r ? 4 : 0) + (w.w ? 2 : 0) + (w.x ? 1 : 0);
                  const strWheel = (w) => `${w.r ? 'r' : '-'}${w.w ? 'w' : '-'}${w.x ? 'x' : '-'}`;
                  const uNum = calcWheel(chmodBits.u);
                  const gNum = calcWheel(chmodBits.g);
                  const oNum = calcWheel(chmodBits.o);
                  const fullOctal = `${uNum}${gNum}${oNum}`;
                  const fullBadge = `-${strWheel(chmodBits.u)}${strWheel(chmodBits.g)}${strWheel(
                    chmodBits.o
                  )}`;

                  return (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          {
                            key: 'u',
                            title: 'Wheel 1: Owner (u)',
                            subtitle: '🏠 You / Shop Owner',
                            num: uNum,
                            color: 'bg-emerald-50 border-emerald-300'
                          },
                          {
                            key: 'g',
                            title: 'Wheel 2: Group (g)',
                            subtitle: '👨‍👩‍👧‍👦 Family / Chama',
                            num: gNum,
                            color: 'bg-sky-50 border-sky-300'
                          },
                          {
                            key: 'o',
                            title: 'Wheel 3: Others (o)',
                            subtitle: '🌍 Visitors / Public',
                            num: oNum,
                            color: 'bg-amber-50 border-amber-300'
                          }
                        ].map((wheel) => (
                          <div
                            key={wheel.key}
                            className={`rounded-3xl p-4 sm:p-5 border-4 ${wheel.color} space-y-3`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-black text-slate-900 text-base">
                                  {wheel.title}
                                </div>
                                <div className="text-xs font-bold text-slate-600">
                                  {wheel.subtitle}
                                </div>
                              </div>
                              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-300 font-mono text-2xl font-black flex items-center justify-center shadow-sm">
                                {wheel.num}
                              </div>
                            </div>

                            <div className="space-y-2">
                              {[
                                { bit: 'r', label: '👀 Read (r)', points: 4 },
                                { bit: 'w', label: '✏️ Write (w)', points: 2 },
                                { bit: 'x', label: '🏃 Execute (x)', points: 1 }
                              ].map((b) => {
                                const isOn = chmodBits[wheel.key][b.bit];
                                return (
                                  <button
                                    key={b.bit}
                                    onClick={() => {
                                      sounds.playPop();
                                      setChmodBits((prev) => ({
                                        ...prev,
                                        [wheel.key]: {
                                          ...prev[wheel.key],
                                          [b.bit]: !prev[wheel.key][b.bit]
                                        }
                                      }));
                                    }}
                                    className={`w-full p-2.5 rounded-2xl border-2 font-black text-xs flex items-center justify-between transition-all ${
                                      isOn
                                        ? 'bg-purple-600 text-white border-purple-800 shadow-sm'
                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                    }`}
                                  >
                                    <span>{b.label}</span>
                                    <span className="font-mono px-2 py-0.5 rounded-lg bg-black/15">
                                      {isOn ? `+${b.points} ON` : '0 OFF'}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Live Resulting Command Banner */}
                      <div className="bg-slate-900 text-white rounded-3xl p-5 border-4 border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="text-xs font-black uppercase tracking-wider text-purple-300">
                            🔑 Live Generated Linux Lock Command:
                          </div>
                          <div className="font-mono text-xl sm:text-3xl font-black text-emerald-300">
                            $ chmod {fullOctal} {chmodTargetFile}
                          </div>
                        </div>
                        <div className="bg-white/10 px-4 py-3 rounded-2xl border border-white/15 text-center">
                          <div className="text-[11px] font-black uppercase text-amber-200">
                            Door Badge Preview (`ls -l`)
                          </div>
                          <div className="font-mono text-lg sm:text-2xl font-black text-white tracking-wider">
                            {fullBadge}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* TOYBOX 4.5: CHOWN TITLE DEED & DOOR NAMEPLATE TRANSFER STATION */}
            {activeSubtopicId === 'chown-command' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-rose-300 shadow-sm space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-black">
                    🎮 Interactive Toybox 4.5 • Title Deed & Nameplate Transfer (`chown`)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Pick a New Owner & Group to Transfer the Official Title Deed! 👑📜🏷️
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-rose-50/70 rounded-3xl p-5 border-2 border-rose-200 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-xs font-black uppercase tracking-wider text-rose-950">
                          1️⃣ Pick New Owner (Before the Colon):
                        </div>
                        {['sam', 'wanjiku', 'kamau', 'root'].map((u) => (
                          <button
                            key={u}
                            onClick={() => {
                              sounds.playPop();
                              setChownOwner(u);
                              setChownAppliedMsg(
                                `👑 Title Deed updated! New Owner is now "${u}" and Group is "${chownGroup}".`
                              );
                            }}
                            className={`w-full p-2.5 rounded-2xl border-2 font-black text-xs text-left flex items-center justify-between ${
                              chownOwner === u
                                ? 'bg-rose-600 text-white border-rose-800 shadow-sm'
                                : 'bg-white text-slate-800 border-rose-200 hover:bg-rose-100/50'
                            }`}
                          >
                            <span>👤 Owner: {u}</span>
                            {chownOwner === u && <span>✓ Selected</span>}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-black uppercase tracking-wider text-rose-950">
                          2️⃣ Pick New Group (After the Colon):
                        </div>
                        {['family', 'staff', 'chama', 'developers'].map((g) => (
                          <button
                            key={g}
                            onClick={() => {
                              sounds.playPop();
                              setChownGroup(g);
                              setChownAppliedMsg(
                                `👨‍👩‍👧‍👦 Group Badge updated! Owner is "${chownOwner}" and Team Group is "${g}".`
                              );
                            }}
                            className={`w-full p-2.5 rounded-2xl border-2 font-black text-xs text-left flex items-center justify-between ${
                              chownGroup === g
                                ? 'bg-purple-600 text-white border-purple-800 shadow-sm'
                                : 'bg-white text-slate-800 border-purple-200 hover:bg-purple-100/50'
                            }`}
                          >
                            <span>🏷️ Group: :{g}</span>
                            {chownGroup === g && <span>✓ Selected</span>}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        setChownRecursive((prev) => !prev);
                      }}
                      className={`w-full p-3 rounded-2xl border-2 font-black text-xs flex items-center justify-between transition-all ${
                        chownRecursive
                          ? 'bg-emerald-600 text-white border-emerald-800'
                          : 'bg-white text-slate-800 border-slate-300'
                      }`}
                    >
                      <span>
                        🏘️ Include `-R` (Recursive — Transfer the whole compound & every file inside)
                      </span>
                      <span>{chownRecursive ? '✅ -R ON' : 'OFF'}</span>
                    </button>
                  </div>

                  {/* Official Title Deed Preview & Terminal */}
                  <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-5 border-4 border-slate-700 text-white flex flex-col justify-between space-y-4">
                    <div className="bg-amber-100 text-slate-900 rounded-2xl p-4 border-4 border-amber-400 space-y-1.5">
                      <div className="text-[11px] font-black uppercase tracking-wider text-amber-900">
                        📜 Official Door Nameplate / Plot Title Deed
                      </div>
                      <div className="text-lg font-black">
                        {chownRecursive ? '🏘️ /home/duka_records/ (All Inside)' : '📄 duka_ledger.txt'}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-mono text-xs font-black">
                          Owner: {chownOwner}
                        </span>
                        <span className="px-2.5 py-1 rounded-xl bg-purple-600 text-white font-mono text-xs font-black">
                          Group: {chownGroup}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[11px] font-black uppercase tracking-wider text-emerald-300">
                        🖥️ Live Command Run by Caretaker (`sudo`):
                      </div>
                      <pre className="font-mono text-xs sm:text-sm font-bold text-emerald-300 bg-slate-950 p-3 rounded-2xl border border-slate-800 whitespace-pre-wrap">
                        {`$ sudo chown ${chownRecursive ? '-R ' : ''}${chownOwner}:${chownGroup} ${
                          chownRecursive ? 'duka_records/' : 'duka_ledger.txt'
                        }\n-rw-r--r-- 1 ${chownOwner} ${chownGroup} 4096 Nov 9 duka_ledger.txt`}
                      </pre>
                    </div>

                    <div className="bg-white/10 rounded-xl p-2.5 text-xs font-bold text-amber-200">
                      💡 {chownAppliedMsg}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================
               TOPIC 5 PLAYABLE TOYBOXES (6 SUBTOPICS: ARCHIVING & COMPRESSING)
               ================================================================= */}

            {/* TOYBOX 5.1: TAR MOVING BOX PACKER & UNPACKER */}
            {activeSubtopicId === 'tar-archiving' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-amber-300 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                      🎮 Interactive Toybox 5.1 • The `tar` Moving Box & Gunia Packer
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      Pack Loose Items (`-cvf`), X-Ray Peek Inside (`-tvf`), or Unpack (`-xvf`)! 📦🚌
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-amber-50/70 rounded-3xl p-4 sm:p-5 border-2 border-amber-200 space-y-4">
                    {/* Visual Box Stage */}
                    <div className="bg-white rounded-2xl p-4 border-2 border-amber-300 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                          {t5TarState === 'loose'
                            ? '🪵 3 Loose Items on Your Table (Total: 100 MB)'
                            : t5TarState === 'packed_tar'
                            ? '📦 Packed Inside 1 Box: mzigo.tar (100 MB — Bundled, Not Shrunk Yet!)'
                            : '🗜️ Packed & Vacuum-Sealed: mzigo.tar.gz (32 MB — Bundled + Shrunk!)'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 font-mono text-xs font-black">
                          {t5TarState === 'packed_targz' ? '32 MB' : '100 MB'}
                        </span>
                      </div>

                      {t5TarState === 'loose' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                            <div className="text-2xl">🌽</div>
                            <div className="font-mono text-xs font-black">unga_recipe.txt</div>
                            <div className="text-[10px] font-bold text-slate-500">30 MB</div>
                          </div>
                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                            <div className="text-2xl">📸</div>
                            <div className="font-mono text-xs font-black">mombasa_photos.jpg</div>
                            <div className="text-[10px] font-bold text-slate-500">40 MB</div>
                          </div>
                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                            <div className="text-2xl">🎵</div>
                            <div className="font-mono text-xs font-black">benga_music.mp3</div>
                            <div className="text-[10px] font-bold text-slate-500">30 MB</div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-emerald-100 border-3 border-amber-400 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-4xl">
                              {t5TarState === 'packed_targz' ? '🗜️' : '📦'}
                            </span>
                            <div>
                              <div className="font-mono text-base sm:text-lg font-black text-slate-900">
                                {t5TarState === 'packed_targz' ? 'mzigo.tar.gz' : 'mzigo.tar'}
                              </div>
                              <div className="text-xs font-bold text-slate-700">
                                Holds all 3 files neatly inside ONE single parcel!
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 4 Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setT5TarState('packed_tar');
                          setT5TarLog(
                            '$ tar -cvf mzigo.tar unga_recipe.txt mombasa_photos.jpg benga_music.mp3\nunga_recipe.txt\nmombasa_photos.jpg\nbenga_music.mp3\n[Created 1 archive box: mzigo.tar (100 MB)]'
                          );
                          setT5TarMsg(
                            '📦 tar -cvf: (-c Create, -v Verbose list, -f Filename). Notice all 3 files are now in 1 box, and the weight is still 100 MB!'
                          );
                        }}
                        className="p-3 rounded-2xl bg-white hover:bg-amber-100 border-2 border-amber-300 text-left font-black text-xs"
                      >
                        📥 <span className="font-mono text-amber-900">tar -cvf mzigo.tar ...</span>{' '}
                        (Pack Box)
                      </button>

                      <button
                        onClick={() => {
                          sounds.playPop();
                          setT5TarLog(
                            '$ tar -tvf mzigo.tar\n-rw-r--r-- sam/family 30M unga_recipe.txt\n-rw-r--r-- sam/family 40M mombasa_photos.jpg\n-rw-r--r-- sam/family 30M benga_music.mp3\n[Peeked inside without unpacking!]'
                          );
                          setT5TarMsg(
                            '👀 tar -tvf: (-t Table of contents). Reads the delivery list taped on the box without opening it!'
                          );
                        }}
                        className="p-3 rounded-2xl bg-white hover:bg-sky-50 border-2 border-sky-300 text-left font-black text-xs"
                      >
                        👀 <span className="font-mono text-sky-800">tar -tvf mzigo.tar</span> (Peek
                        Inside)
                      </button>

                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setT5TarState('packed_targz');
                          setT5TarLog(
                            '$ tar -czvf mzigo.tar.gz unga_recipe.txt mombasa_photos.jpg benga_music.mp3\n[Packed into 1 box AND vacuum-sealed with gzip: 100 MB -> 32 MB!]'
                          );
                          setT5TarMsg(
                            '🗜️ tar -czvf: Adding "-z" calls gzip automatically so your box is bundled AND shrunk to 32 MB!'
                          );
                        }}
                        className="p-3 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-300 text-left font-black text-xs"
                      >
                        🗜️ <span className="font-mono text-emerald-800">tar -czvf mzigo.tar.gz</span>{' '}
                        (Pack + Shrink!)
                      </button>

                      <button
                        onClick={() => {
                          sounds.playPop();
                          setT5TarState('loose');
                          setT5TarLog(
                            '$ tar -xvf mzigo.tar\nunga_recipe.txt\nmombasa_photos.jpg\nbenga_music.mp3\n[Unpacked all 3 items back onto the kitchen table!]'
                          );
                          setT5TarMsg(
                            '📤 tar -xvf: (-x eXtract). Unties the gunia/box and lays every item neatly back on the table!'
                          );
                        }}
                        className="p-3 rounded-2xl bg-white hover:bg-purple-50 border-2 border-purple-300 text-left font-black text-xs"
                      >
                        📤 <span className="font-mono text-purple-800">tar -xvf mzigo.tar</span>{' '}
                        (Unpack Box)
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-4 sm:p-5 border-4 border-slate-700 text-white flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                        🖥️ Live `tar` Terminal Output
                      </div>
                      <pre className="font-mono text-xs sm:text-sm font-bold text-emerald-300 whitespace-pre-wrap bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                        {t5TarLog}
                      </pre>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3 text-xs font-bold text-amber-200 leading-relaxed">
                      💡 {t5TarMsg}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TOYBOX 5.2: GZIP FAST VACUUM SEALER */}
            {activeSubtopicId === 'gzip-compression' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-emerald-300 shadow-sm space-y-5">
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">
                    🎮 Interactive Toybox 5.2 • The `gzip` Vacuum-Sealer Machine
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Squeeze a 100 MB Fluffy Duvet File & Test `-k` (Keep Original) + Speed Dial (`-1` to `-9`)! 🗜️💨
                  </h3>
                </div>

                {(() => {
                  const compressedSize =
                    t5GzipLevel === 1 ? 38 : t5GzipLevel === 6 ? 32 : 28;
                  const cmdStr = `gzip ${t5GzipKeepOrig ? '-k ' : ''}${
                    t5GzipLevel !== 6 ? `-${t5GzipLevel} ` : ''
                  }duvet_report.txt`;

                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      <div className="lg:col-span-7 bg-emerald-50/70 rounded-3xl p-5 border-2 border-emerald-200 space-y-4">
                        {/* Visual Meter */}
                        <div className="bg-white rounded-2xl p-4 border-2 border-emerald-300 space-y-3">
                          <div className="flex items-center justify-between text-xs font-black">
                            <span>
                              {t5GzipCompressed
                                ? `🗜️ Vacuum-Sealed: duvet_report.txt.gz (${compressedSize} MB)`
                                : '🛏️ Puffy Original: duvet_report.txt (100 MB)'}
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900">
                              {t5GzipCompressed
                                ? `Saved ${100 - compressedSize}% Space!`
                                : 'Uncompressed (100%)'}
                            </span>
                          </div>

                          <div className="w-full h-7 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 p-1">
                            <div
                              style={{
                                width: `${t5GzipCompressed ? compressedSize : 100}%`
                              }}
                              className={`h-full rounded-xl transition-all duration-500 ${
                                t5GzipCompressed ? 'bg-emerald-600' : 'bg-amber-500'
                              }`}
                            />
                          </div>

                          {t5GzipCompressed && t5GzipKeepOrig && (
                            <div className="text-xs font-extrabold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                              👯 Because `-k` (Keep) is ON, both `duvet_report.txt` (100 MB) AND
                              `duvet_report.txt.gz` ({compressedSize} MB) are on your shelf!
                            </div>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => {
                              sounds.playSuccess();
                              setT5GzipCompressed(true);
                            }}
                            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm"
                          >
                            🗜️ Run `{cmdStr}` (Vacuum Squeeze!)
                          </button>

                          <button
                            onClick={() => {
                              sounds.playPop();
                              setT5GzipCompressed(false);
                            }}
                            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 font-black text-xs"
                          >
                            🔄 Reset to 100 MB Original
                          </button>

                          <button
                            onClick={() => {
                              sounds.playPop();
                              setT5GzipKeepOrig((prev) => !prev);
                            }}
                            className={`px-3.5 py-2.5 rounded-2xl font-black text-xs border-2 transition-all ${
                              t5GzipKeepOrig
                                ? 'bg-purple-600 text-white border-purple-800'
                                : 'bg-white text-slate-800 border-slate-300'
                            }`}
                          >
                            👯 `-k` Keep Original: {t5GzipKeepOrig ? 'ON' : 'OFF'}
                          </button>
                        </div>

                        {/* Compression Level Dial 1 / 6 / 9 */}
                        <div className="space-y-1.5">
                          <div className="text-xs font-black uppercase tracking-wider text-emerald-950">
                            ⚡ Pick Vacuum Squeeze Strength (`-1` Fast vs `-9` Tightest):
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { lvl: 1, title: '-1 (Fastest)', desc: '38 MB • Instant' },
                              { lvl: 6, title: '-6 (Default)', desc: '32 MB • Balanced' },
                              { lvl: 9, title: '-9 (Tightest)', desc: '28 MB • Max Squeeze' }
                            ].map((opt) => (
                              <button
                                key={opt.lvl}
                                onClick={() => {
                                  sounds.playPop();
                                  setT5GzipLevel(opt.lvl);
                                  setT5GzipCompressed(true);
                                }}
                                className={`p-2.5 rounded-2xl border-2 text-left transition-all ${
                                  t5GzipLevel === opt.lvl
                                    ? 'bg-emerald-600 text-white border-emerald-800 shadow-sm'
                                    : 'bg-white text-slate-800 border-emerald-200'
                                }`}
                              >
                                <div className="font-mono text-xs font-black">{opt.title}</div>
                                <div className="text-[10px] font-bold opacity-90">{opt.desc}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-5 border-4 border-slate-700 text-white flex flex-col justify-between space-y-3">
                        <div className="space-y-2">
                          <div className="text-[11px] font-black uppercase tracking-wider text-emerald-300">
                            🖥️ Live `gzip` Terminal
                          </div>
                          <pre className="font-mono text-xs sm:text-sm font-bold text-emerald-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 whitespace-pre-wrap">
                            {t5GzipCompressed
                              ? `$ ${cmdStr}\n$ ls -lh\n${
                                  t5GzipKeepOrig
                                    ? '-rw-r--r-- 100M duvet_report.txt\n'
                                    : ''
                                }-rw-r--r--  ${compressedSize}M duvet_report.txt.gz`
                              : '$ ls -lh\n-rw-r--r-- 100M duvet_report.txt'}
                          </pre>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-3 text-xs font-bold text-amber-200">
                          💡 By default, `gzip` replaces `duvet_report.txt` with
                          `duvet_report.txt.gz`. Turn ON `-k` above whenever you want to keep both!
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TOYBOX 5.3: GUNZIP AIR-VALVE INFLATOR */}
            {activeSubtopicId === 'gunzip-decompression' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-sky-300 shadow-sm space-y-5">
                <div>
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-black">
                    🎮 Interactive Toybox 5.3 • The `gunzip` Mattress & Duvet Inflator
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Pop the Vacuum Valve (`gunzip`) or Peek Through the Plastic Bag (`zcat`)! 🎈🛏️
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-sky-50/70 rounded-3xl p-5 border-2 border-sky-200 space-y-4">
                    <div className="bg-white rounded-2xl p-4 border-2 border-sky-300 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">
                          {t5GunzipState === 'inflated' ? '🛏️' : '🗜️'}
                        </span>
                        <div>
                          <div className="font-mono text-base sm:text-lg font-black text-slate-900">
                            {t5GunzipState === 'inflated'
                              ? 'mpesa_statement.txt (100 MB — Full Size!)'
                              : 'mpesa_statement.txt.gz (32 MB — Vacuum Sealed)'}
                          </div>
                          <div className="text-xs font-bold text-slate-600">
                            {t5GunzipState === 'inflated'
                              ? '🎈 Air let back in! Ready to edit and print.'
                              : 'Sealed tight in a .gz bag.'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setT5GunzipState('inflated');
                        }}
                        className="p-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs text-left shadow-sm"
                      >
                        🎈 <div className="font-mono">gunzip mpesa.txt.gz</div>
                        <div className="text-[10px] opacity-90">Pop Valve & Un-Shrink!</div>
                      </button>

                      <button
                        onClick={() => {
                          sounds.playPop();
                          setT5GunzipState('peeked');
                        }}
                        className="p-3 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 border-2 border-amber-300 font-black text-xs text-left"
                      >
                        👓 <div className="font-mono text-amber-900">zcat mpesa.txt.gz</div>
                        <div className="text-[10px] text-slate-600">Read Without Unpacking!</div>
                      </button>

                      <button
                        onClick={() => {
                          sounds.playPop();
                          setT5GunzipState('compressed');
                        }}
                        className="p-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-300 font-black text-xs text-left"
                      >
                        🔄 <div className="font-mono">Re-seal (.gz)</div>
                        <div className="text-[10px] text-slate-500">Reset to 32 MB .gz</div>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-5 border-4 border-slate-700 text-white flex flex-col justify-between space-y-3">
                    <pre className="font-mono text-xs sm:text-sm font-bold text-emerald-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 whitespace-pre-wrap">
                      {t5GunzipState === 'inflated'
                        ? '$ gunzip mpesa_statement.txt.gz\n$ ls -lh\n-rw-r--r-- 100M mpesa_statement.txt\n[.gz removed & full file restored!]'
                        : t5GunzipState === 'peeked'
                        ? '$ zcat mpesa_statement.txt.gz\nTX101: Received Ksh 2,500 from Wanjiku\nTX102: Paid KPLC Token Ksh 1,000\n[File stays compressed as .gz on disk!]'
                        : '$ ls -lh\n-rw-r--r-- 32M mpesa_statement.txt.gz'}
                    </pre>
                    <div className="bg-white/10 rounded-2xl p-3 text-xs font-bold text-amber-200">
                      💡 Remember: `gunzip file.gz` and `gzip -d file.gz` are 100% identical twins!
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TOYBOX 5.4: ZIP & UNZIP UNIVERSAL SUITCASE */}
            {activeSubtopicId === 'zip-and-unzip' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-purple-300 shadow-sm space-y-5">
                <div>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black">
                    🎮 Interactive Toybox 5.4 • Universal Zippered Suitcase (`zip` & `unzip`)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Bundle + Shrink in One Step & Keep Originals Safe on Windows, Mac & Linux! 🧳🤐
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-purple-50/70 rounded-3xl p-5 border-2 border-purple-200 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setT5ZipState('zipped');
                        }}
                        className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs text-left shadow-sm"
                      >
                        🤐 <div className="font-mono">zip -r helb.zip forms/</div>
                        <div className="text-[10px] opacity-90">Pack & Shrink Whole Folder</div>
                      </button>

                      <button
                        onClick={() => {
                          sounds.playPop();
                          setT5ZipState('peeked');
                        }}
                        className="p-3 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 border-2 border-amber-300 font-black text-xs text-left"
                      >
                        👀 <div className="font-mono text-amber-900">unzip -l helb.zip</div>
                        <div className="text-[10px] text-slate-600">Peek Inside Suitcase</div>
                      </button>

                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setT5ZipState('unzipped');
                        }}
                        className="p-3 rounded-2xl bg-white hover:bg-emerald-50 text-slate-800 border-2 border-emerald-300 font-black text-xs text-left"
                      >
                        🔓 <div className="font-mono text-emerald-800">unzip helb.zip</div>
                        <div className="text-[10px] text-slate-600">Unzip Suitcase Anywhere!</div>
                      </button>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border-2 border-purple-200 text-xs font-bold text-slate-700 space-y-1.5">
                      <div className="font-black text-purple-950 text-sm">
                        🌟 Why Learners Love `zip` & `unzip`:
                      </div>
                      <div>
                        1️⃣ <strong>2-in-1 Tool:</strong> Packs multiple files AND compresses them at
                        the same time!
                      </div>
                      <div>
                        2️⃣ <strong>Originals Stay Untouched:</strong> Unlike `gzip`, `zip` never
                        deletes your original files!
                      </div>
                      <div>
                        3️⃣ <strong>Cross-Platform:</strong> Opens on every Windows, Mac, Android, and
                        Linux machine!
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-5 border-4 border-slate-700 text-white flex flex-col justify-between space-y-3">
                    <pre className="font-mono text-xs sm:text-sm font-bold text-emerald-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 whitespace-pre-wrap">
                      {t5ZipState === 'zipped'
                        ? '$ zip -r helb.zip forms/\n  adding: forms/id_card.pdf (deflated 64%)\n  adding: forms/kra_pin.pdf (deflated 70%)\n[Created helb.zip AND kept forms/ safe!]'
                        : t5ZipState === 'peeked'
                        ? '$ unzip -l helb.zip\nArchive:  helb.zip\n  Length      Name\n---------    ----\n   450000    forms/id_card.pdf\n   320000    forms/kra_pin.pdf'
                        : t5ZipState === 'unzipped'
                        ? '$ unzip helb.zip\nArchive:  helb.zip\n  inflating: forms/id_card.pdf\n  inflating: forms/kra_pin.pdf\n[Unpacked cleanly!]'
                        : '$ ls\nforms/ (Ready to pack into a .zip suitcase)'}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* TOYBOX 5.5: BZIP2 HEAVY-DUTY HYDRAULIC PRESS */}
            {activeSubtopicId === 'bzip2-compression' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-teal-300 shadow-sm space-y-5">
                <div>
                  <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-black">
                    🎮 Interactive Toybox 5.5 • The `bzip2` Hydraulic Bale Press
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Compare `gzip` (32 MB) vs. `bzip2` (24 MB) & Test `tar -cjvf`! 🚜🗜️
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'bzip2',
                      cmd: 'bzip2 -k bale_records.txt',
                      result: 'bale_records.txt.bz2 (24 MB)',
                      desc: '🚜 Heavy Hydraulic Press: Squeezes 100 MB down to 24 MB (smaller than gzip!).'
                    },
                    {
                      id: 'bunzip2',
                      cmd: 'bunzip2 bale_records.txt.bz2',
                      result: 'bale_records.txt (100 MB)',
                      desc: '🎈 Releases the hydraulic press and restores the full 100 MB file.'
                    },
                    {
                      id: 'tar_bz2',
                      cmd: 'tar -cjvf backup.tar.bz2 folder/',
                      result: 'backup.tar.bz2 (24 MB)',
                      desc: '📦 Remember "-j" for bzip2! Packs the folder with tar AND presses it with bzip2!'
                    }
                  ].map((card) => (
                    <button
                      key={card.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT5BzipMode(card.id);
                      }}
                      className={`p-4 rounded-3xl border-4 text-left transition-all flex flex-col justify-between gap-2 ${
                        t5BzipMode === card.id
                          ? 'bg-teal-600 text-white border-teal-800 shadow-md scale-[1.02]'
                          : 'bg-teal-50/70 text-slate-800 border-teal-200 hover:bg-teal-100'
                      }`}
                    >
                      <div className="font-mono text-xs sm:text-sm font-black">{card.cmd}</div>
                      <div className="px-2.5 py-1 rounded-xl bg-black/15 font-mono text-xs font-black">
                        → {card.result}
                      </div>
                      <div className="text-xs font-bold leading-snug">{card.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TOYBOX 5.6: XZ DIAMOND COMPACTOR & 4-WAY COMPRESSION RACE */}
            {activeSubtopicId === 'xz-compression' && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-rose-300 shadow-sm space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-black">
                    🎮 Interactive Toybox 5.6 • The Ultimate 4-Way Compression Race (`tar` vs `gzip` vs `bzip2` vs `xz`)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Click Any Tool Below to Compare Size, Speed, and `tar` Flag (`-z`, `-j`, `-J`) on a 100 MB Folder! 💎🏆
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      id: 'tar',
                      name: '1. Plain tar (.tar)',
                      sizeMB: 100,
                      speed: '⚡ Instant (0.1s)',
                      tarFlag: 'tar -cvf box.tar dir/',
                      unpackCmd: 'tar -xvf box.tar',
                      analogy: '📦 Cardboard Box (Bundled only, 0% shrunk)',
                      barColor: 'bg-amber-500'
                    },
                    {
                      id: 'gzip',
                      name: '2. gzip (.tar.gz)',
                      sizeMB: 32,
                      speed: '🏃 Super Fast (0.8s)',
                      tarFlag: 'tar -czvf box.tar.gz dir/',
                      unpackCmd: 'gunzip / tar -xzvf',
                      analogy: '💨 Everyday Vacuum Bag (-z flag • 68% saved)',
                      barColor: 'bg-emerald-600'
                    },
                    {
                      id: 'bzip2',
                      name: '3. bzip2 (.tar.bz2)',
                      sizeMB: 24,
                      speed: '🚜 Medium (2.1s)',
                      tarFlag: 'tar -cjvf box.tar.bz2 dir/',
                      unpackCmd: 'bunzip2 / tar -xjvf',
                      analogy: '🏭 Hydraulic Bale Press (-j flag • 76% saved)',
                      barColor: 'bg-teal-600'
                    },
                    {
                      id: 'xz',
                      name: '4. xz (.tar.xz) 👑',
                      sizeMB: 16,
                      speed: '💎 Careful Press (4.5s)',
                      tarFlag: 'tar -cJvf box.tar.xz dir/',
                      unpackCmd: 'unxz / tar -xJvf',
                      analogy: '💎 Diamond Compactor (Capital -J • 84% saved!)',
                      barColor: 'bg-rose-600'
                    }
                  ].map((tool) => {
                    const isPicked = t5SelectedCompressor === tool.id;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => {
                          sounds.playSuccess();
                          setT5SelectedCompressor(tool.id);
                        }}
                        className={`p-4 rounded-3xl border-4 text-left transition-all flex flex-col justify-between gap-3 ${
                          isPicked
                            ? 'bg-slate-900 text-white border-rose-500 shadow-md scale-[1.02]'
                            : 'bg-slate-50 hover:bg-rose-50/60 text-slate-900 border-slate-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="font-black text-sm sm:text-base">{tool.name}</div>
                          <div className="text-xs font-bold opacity-85">{tool.analogy}</div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-black">
                            <span>Final Size:</span>
                            <span className="font-mono text-sm text-amber-400">
                              {tool.sizeMB} MB / 100 MB
                            </span>
                          </div>
                          <div className="w-full h-4 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
                            <div
                              style={{ width: `${tool.sizeMB}%` }}
                              className={`h-full rounded-full ${tool.barColor}`}
                            />
                          </div>
                        </div>

                        <div className="space-y-1 pt-1 border-t border-slate-400/20 text-[11px] font-mono">
                          <div>Speed: {tool.speed}</div>
                          <div className="font-bold text-emerald-400">{tool.tarFlag}</div>
                          <div className="opacity-80">Unpack: {tool.unpackCmd}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 6.1: PACKAGE MANAGERS & SYSTEMCTL UNIVERSAL REMOTE
                ================================================================= */}
            {activeSubtopicId === 'package-managers-and-systemctl' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-violet-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-violet-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-violet-700 bg-violet-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 6.1
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Personal Shoppers & Universal `systemctl` Appliance Remote Control
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Every Linux distribution has its own Personal Shopper (Package Manager) that delivers boxes with all missing screws (dependencies) included. Once an appliance is installed, use the `systemctl` remote control below to run it!
                    </p>
                  </div>
                </div>

                {/* Quick Store Directory Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      store: 'Ubuntu / Debian',
                      mgr: 'apt-get & dpkg (.deb)',
                      analogy: '🛒 Friendly Supermarket + Delivery Van',
                      kenya: 'Naivas / Quickmart + Rider'
                    },
                    {
                      store: 'Fedora / RHEL 8+',
                      mgr: 'dnf & rpm (.rpm)',
                      analogy: '🖥️ Modern Touchscreen Hardware Store',
                      kenya: 'Digital Carrefour Kiosk'
                    },
                    {
                      store: 'CentOS / Older RHEL',
                      mgr: 'yum & rpm (.rpm)',
                      analogy: '🪵 Classic Wooden-Shelf Hardware Store',
                      kenya: 'Trusted Town Agrovet / Wholesale'
                    },
                    {
                      store: 'Arch / openSUSE',
                      mgr: 'pacman / zypper',
                      analogy: '🧰 Fast DIY Warehouse / Boutique',
                      kenya: 'Industrial Area / Specialty Shop'
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-violet-50/70 border-2 border-violet-200 space-y-1"
                    >
                      <div className="text-xs font-black text-violet-900">{item.store}</div>
                      <div className="font-mono text-xs font-black text-emerald-700 bg-white px-2 py-0.5 rounded inline-block border border-violet-200">
                        {item.mgr}
                      </div>
                      <div className="text-xs font-bold text-slate-700">{item.analogy}</div>
                      <div className="text-[11px] font-bold text-amber-800">🇰🇪 {item.kenya}</div>
                    </div>
                  ))}
                </div>

                {/* Pick an Appliance to Control with systemctl */}
                <div className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-200 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                      1. Pick a House / Mtaa Background Appliance (Service):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'apache2', label: '🌐 apache2 (Web Server TV)', kenya: 'Cybercafé Router' },
                        { id: 'ssh', label: '🔑 ssh (Remote Doorbell)', kenya: 'Gate Intercom' },
                        { id: 'mysql', label: '🗄️ mysql (Kitchen Fridge DB)', kenya: 'M-Pesa Ledger Safe' }
                      ].map((srv) => (
                        <button
                          key={srv.id}
                          onClick={() => {
                            sounds.playPop();
                            setT6SelectedService(srv.id);
                            setT6SystemctlLog(
                              `$ systemctl status ${srv.id}\n● ${srv.id}.service - ${srv.label} (${srv.kenya})\n   Loaded: loaded (${
                                t6ServiceEnabled ? 'enabled at morning boot' : 'disabled at boot'
                              })\n   Active: ${t6ServiceRunning ? 'active (running) 🟢' : 'inactive (dead) 🔴'}`
                            );
                          }}
                          className={`px-3 py-1.5 rounded-xl font-black text-xs border-2 transition-all ${
                            t6SelectedService === srv.id
                              ? 'bg-violet-600 text-white border-violet-700 shadow-sm'
                              : 'bg-white text-slate-800 border-slate-300 hover:bg-violet-50'
                          }`}
                        >
                          {srv.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Remote Control Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        setT6ServiceRunning(true);
                        setT6SystemctlLog(
                          `$ sudo systemctl start ${t6SelectedService}\n✅ Turned ON ${t6SelectedService} right now! The green power light is glowing.`
                        );
                      }}
                      className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs text-left shadow-sm"
                    >
                      <div>🟢 start</div>
                      <div className="text-[11px] opacity-90 font-normal">Turn ON right now</div>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playPop();
                        setT6ServiceRunning(false);
                        setT6SystemctlLog(
                          `$ sudo systemctl stop ${t6SelectedService}\n🛑 Turned OFF ${t6SelectedService} right now. Appliance is resting.`
                        );
                      }}
                      className="p-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs text-left shadow-sm"
                    >
                      <div>🔴 stop</div>
                      <div className="text-[11px] opacity-90 font-normal">Turn OFF right now</div>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        setT6ServiceRunning(true);
                        setT6SystemctlLog(
                          `$ sudo systemctl restart ${t6SelectedService}\n🔄 Switched OFF and back ON fresh! Great after changing big settings.`
                        );
                      }}
                      className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs text-left shadow-sm"
                    >
                      <div>🔄 restart</div>
                      <div className="text-[11px] opacity-90 font-normal">Reboot appliance</div>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        setT6ServiceEnabled(true);
                        setT6SystemctlLog(
                          `$ sudo systemctl enable ${t6SelectedService}\n⏰ Set Auto-Start Timer! ${t6SelectedService} will turn ON automatically every time the computer boots up.`
                        );
                      }}
                      className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs text-left shadow-sm"
                    >
                      <div>⏰ enable</div>
                      <div className="text-[11px] opacity-90 font-normal">Auto-start at boot</div>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playPop();
                        setT6ServiceEnabled(false);
                        setT6SystemctlLog(
                          `$ sudo systemctl disable ${t6SelectedService}\n🔕 Cancelled Auto-Start Timer! ${t6SelectedService} will stay OFF when the computer boots up.`
                        );
                      }}
                      className="p-3 rounded-2xl bg-slate-600 hover:bg-slate-700 text-white font-black text-xs text-left shadow-sm"
                    >
                      <div>🔕 disable</div>
                      <div className="text-[11px] opacity-90 font-normal">No auto-start at boot</div>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playPop();
                        setT6SystemctlLog(
                          `$ systemctl status ${t6SelectedService}\n● ${t6SelectedService}.service\n   Loaded: ${
                            t6ServiceEnabled ? 'enabled (auto-starts at boot ⏰)' : 'disabled (manual start only 🔕)'
                          }\n   Active: ${
                            t6ServiceRunning ? 'active (running right now 🟢)' : 'inactive (stopped right now 🔴)'
                          }`
                        );
                      }}
                      className="p-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs text-left shadow-sm"
                    >
                      <div>🔍 status</div>
                      <div className="text-[11px] opacity-90 font-normal">Check light & logs</div>
                    </button>
                  </div>

                  {/* Live Appliance Status Screen */}
                  <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-2">
                      <span className="text-amber-300 font-black">
                        🎛️ Universal `systemctl` Screen ({t6SelectedService}):
                      </span>
                      <div className="flex items-center gap-2 font-sans text-xs font-black">
                        <span
                          className={`px-2.5 py-0.5 rounded-full ${
                            t6ServiceRunning
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                          }`}
                        >
                          {t6ServiceRunning ? '🟢 Power: RUNNING' : '🔴 Power: STOPPED'}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full ${
                            t6ServiceEnabled
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/40'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {t6ServiceEnabled ? '⏰ Boot Timer: ENABLED' : '🔕 Boot Timer: DISABLED'}
                        </span>
                      </div>
                    </div>
                    <pre className="whitespace-pre-wrap leading-relaxed">{t6SystemctlLog}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 6.2: APT-GET UBUNTU SUPERMARKET MANAGER
                ================================================================= */}
            {activeSubtopicId === 'apt-get-package-manager' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-emerald-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-emerald-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 6.2
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Ubuntu / Debian `apt-get` Supermarket Manager Simulator
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Test the difference between `update` (refresh catalog) and `upgrade` (bring new boxes), and see how `remove` keeps your saved settings while `purge` wipes them clean!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      setT6AptCatalogFresh(true);
                      setT6AptLog(
                        `$ sudo apt-get update\nHit:1 http://archive.ubuntu.com jammy InRelease\nGet:2 http://security.ubuntu.com jammy-security [110 kB]\nReading package lists... Done ✅\n📖 Supermarket Price & Stock Catalog is now 100% FRESH!`
                      );
                    }}
                    className="p-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs text-left shadow-sm space-y-1"
                  >
                    <div className="text-sm">1. 📖 sudo apt-get update</div>
                    <div className="opacity-90 font-normal">
                      Refreshes the store price & stock catalog (does NOT install apps yet)
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      if (!t6AptInstalled.includes('vlc')) {
                        setT6AptInstalled([...t6AptInstalled, 'vlc']);
                      }
                      if (!t6AptConfigs.includes('vlc.conf')) {
                        setT6AptConfigs([...t6AptConfigs, 'vlc.conf']);
                      }
                      setT6AptLog(
                        `$ sudo apt-get install vlc\nReading package lists... Done\nThe following additional dependencies (screws) will be installed:\n  libvlc5 libvlccore9\nSetting up vlc (3.0.18) ... ✅\n🎬 VLC Media Player + all helper screws installed AND vlc.conf settings saved!`
                      );
                    }}
                    className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs text-left shadow-sm space-y-1"
                  >
                    <div className="text-sm">2. 🛒 sudo apt-get install vlc</div>
                    <div className="opacity-90 font-normal">
                      Fetches VLC + all dependency screws and sets it up in your house
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      setT6AptLog(
                        `$ sudo apt-get upgrade\nCalculating upgrade... Done\nUpgrading: ${t6AptInstalled.join(
                          ', '
                        )} to newest 2026 models! 🚀\nAll installed appliances in your house are now sparkling new.`
                      );
                    }}
                    className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs text-left shadow-sm space-y-1"
                  >
                    <div className="text-sm">3. 🚀 sudo apt-get upgrade</div>
                    <div className="opacity-90 font-normal">
                      Upgrades every installed app in your house to the newest version
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playPop();
                      setT6AptInstalled(t6AptInstalled.filter((item) => item !== 'vlc'));
                      setT6AptLog(
                        `$ sudo apt-get remove vlc\nRemoving vlc (3.0.18) ...\n📌 Notice: vlc program was removed, BUT your saved diary settings (vlc.conf) are STILL kept safe on your shelf in case you reinstall it later!`
                      );
                    }}
                    className="p-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs text-left shadow-sm space-y-1"
                  >
                    <div className="text-sm">4. 📦 sudo apt-get remove vlc</div>
                    <div className="opacity-90 font-normal">
                      Removes the VLC app, but KEEPS your saved `vlc.conf` settings
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playPop();
                      setT6AptInstalled(t6AptInstalled.filter((item) => item !== 'vlc'));
                      setT6AptConfigs(t6AptConfigs.filter((item) => item !== 'vlc.conf'));
                      setT6AptLog(
                        `$ sudo apt-get purge vlc\nPurging configuration files for vlc (3.0.18) ... 🧹\nBoth the VLC app AND its saved vlc.conf settings were completely wiped clean!`
                      );
                    }}
                    className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs text-left shadow-sm space-y-1"
                  >
                    <div className="text-sm">5. 🧹 sudo apt-get purge vlc</div>
                    <div className="opacity-90 font-normal">
                      Removes the VLC app AND deletes its `vlc.conf` settings completely
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      setT6AptLog(
                        `$ sudo apt-get autoremove && sudo apt-get autoclean\nRemoving leftover orphan screws (libvlc-old)...\nSweeping empty cardboard boxes from /var/cache/apt/archives... ✨\nYour storeroom is spotless!`
                      );
                    }}
                    className="p-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs text-left shadow-sm space-y-1"
                  >
                    <div className="text-sm">6. ✨ autoremove & autoclean</div>
                    <div className="opacity-90 font-normal">
                      Sweeps away leftover unused screws and old `.deb` cardboard boxes
                    </div>
                  </button>
                </div>

                {/* Live House Shelf Status + Terminal Output */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 space-y-2">
                    <div className="text-xs font-black uppercase text-emerald-900">
                      🏠 Your Ubuntu House Shelf:
                    </div>
                    <div className="text-xs font-bold text-slate-700">
                      Catalog Status:{' '}
                      <span
                        className={
                          t6AptCatalogFresh
                            ? 'text-emerald-700 font-black'
                            : 'text-amber-700 font-black'
                        }
                      >
                        {t6AptCatalogFresh ? '✅ Freshly Updated' : '⏳ Old Catalog'}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-700">
                      Installed Apps:{' '}
                      <span className="font-mono text-emerald-800">
                        {t6AptInstalled.length ? t6AptInstalled.join(', ') : '(none)'}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-700">
                      Saved Config Diaries:{' '}
                      <span className="font-mono text-indigo-800">
                        {t6AptConfigs.length ? t6AptConfigs.join(', ') : '(none)'}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                    <pre className="whitespace-pre-wrap leading-relaxed">{t6AptLog}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 6.3: DPKG DELIVERY DRIVER & FIX-BROKEN RESCUE
                ================================================================= */}
            {activeSubtopicId === 'dpkg-debian-package-manager' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-amber-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-amber-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 6.3
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The `.deb` Delivery Driver (`dpkg`) & Missing-Screws Rescue Game
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Watch what happens when the `dpkg` delivery driver unpacks a local `.deb` box that needs extra helper screws, and how `sudo apt-get -f install` saves the day!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      sounds.playPop();
                      setT6DpkgState('missing_deps');
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      t6DpkgState === 'missing_deps'
                        ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                        : 'bg-amber-50 hover:bg-amber-100 text-slate-900 border-amber-200'
                    }`}
                  >
                    <div className="font-black text-sm">
                      Step 1: 🚚 sudo dpkg -i chrome.deb
                    </div>
                    <div className="text-xs mt-1 opacity-90">
                      Driver unpacks the local `.deb` box in your living room, but notices 2 helper screws are missing!
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      setT6DpkgState('fixed');
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      t6DpkgState === 'fixed'
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-slate-900 border-emerald-200'
                    }`}
                  >
                    <div className="font-black text-sm">
                      Step 2: 🛒 sudo apt-get -f install
                    </div>
                    <div className="text-xs mt-1 opacity-90">
                      Call the Supermarket Manager to automatically fetch the missing screws and finish assembly!
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playPop();
                      setT6DpkgState('removed');
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      t6DpkgState === 'removed'
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-slate-900 border-indigo-200'
                    }`}
                  >
                    <div className="font-black text-sm">
                      Step 3: 📋 dpkg -l & dpkg -r chrome
                    </div>
                    <div className="text-xs mt-1 opacity-90">
                      Check the house inventory list (`-l`) or ask the driver to unbolt the package (`-r`).
                    </div>
                  </button>
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  {t6DpkgState === 'ready' && (
                    <pre className="whitespace-pre-wrap">
{`$ ls -lh Downloads/
-rw-r--r-- 1 sam sam 92M chrome.deb
👉 Click Step 1 above to ask the dpkg driver to unpack chrome.deb!`}
                    </pre>
                  )}
                  {t6DpkgState === 'missing_deps' && (
                    <pre className="whitespace-pre-wrap text-amber-300">
{`$ sudo dpkg -i chrome.deb
Unpacking chrome (120.0) ...
⚠️ dpkg: dependency problems prevent configuration of chrome:
  chrome depends on libu2f-udev; however: Package libu2f-udev is not installed.
  chrome depends on fonts-liberation; however: Package fonts-liberation is not installed.

🚚 Driver says: "I only unpack the box in my hands! I cannot go online to buy missing screws."
👉 Now click Step 2 (sudo apt-get -f install) to rescue it!`}
                    </pre>
                  )}
                  {t6DpkgState === 'fixed' && (
                    <pre className="whitespace-pre-wrap text-emerald-300">
{`$ sudo apt-get -f install
Reading package lists... Done
Correcting dependencies... Done 🛠️
Installing missing screws: libu2f-udev, fonts-liberation
Setting up chrome (120.0) ... Done! ✅
🎉 Hooray! The Supermarket Manager delivered the missing screws and finished building Chrome!`}
                    </pre>
                  )}
                  {t6DpkgState === 'removed' && (
                    <pre className="whitespace-pre-wrap text-sky-300">
{`$ dpkg -l | grep chrome
ii  chrome   120.0   amd64   Fast Web Browser

$ sudo dpkg -r chrome
Removing chrome (120.0) ... Done! 📦`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 6.4: DNF MODERN TOUCHSCREEN HARDWARE STORE (FEDORA/RHEL 8+)
                ================================================================= */}
            {activeSubtopicId === 'dnf-package-manager' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-sky-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-sky-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-sky-900 bg-sky-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 6.4
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Fedora / RHEL 8+ `dnf` Digital Touchscreen Hardware Kiosk (`.rpm`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Tap any command on the modern `dnf` kiosk below to see how Fedora and Red Hat Enterprise Linux 8+ manage `.rpm` packages at lightning speed!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      id: 'check',
                      title: '🔍 dnf check-update',
                      desc: 'Check if newer .rpm models are in stock',
                      output: `$ sudo dnf check-update\nFedora 39 - x86_64 - Updates   4.8 MB/s\nfirefox.x86_64   121.0-1.fc39   updates\n✨ Kiosk automatically synced catalog in 1.2 seconds!`
                    },
                    {
                      id: 'install',
                      title: '🛒 dnf install htop',
                      desc: 'Install an .rpm app + all dependencies',
                      output: `$ sudo dnf install htop\nResolving Dependencies (Fast SAT Solver)...\nInstalling:\n  htop   x86_64   3.2.2-2.fc39   fedora   178 k\nComplete! ✅ htop is ready to use.`
                    },
                    {
                      id: 'upgrade',
                      title: '🚀 dnf upgrade',
                      desc: 'Upgrade all .rpm packages cleanly',
                      output: `$ sudo dnf upgrade\nUpgrading:\n  firefox   x86_64   121.0-1.fc39\nComplete! ✅ All Fedora/RHEL 8+ apps are up to date.`
                    },
                    {
                      id: 'remove',
                      title: '🗑️ dnf remove htop',
                      desc: 'Uninstall an .rpm package + unused screws',
                      output: `$ sudo dnf remove htop\nRemoving:\n  htop   x86_64   3.2.2-2.fc39\nFreed space: 512 k\nComplete! ✅ Removed cleanly.`
                    }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT6DnfAction(item.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t6DnfAction === item.id
                          ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                          : 'bg-sky-50 hover:bg-sky-100 text-slate-900 border-sky-200'
                      }`}
                    >
                      <div className="font-mono font-black text-xs sm:text-sm">{item.title}</div>
                      <div className="text-xs mt-1 opacity-90">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  <pre className="whitespace-pre-wrap">
                    {
                      [
                        {
                          id: 'check',
                          output: `$ sudo dnf check-update\nFedora 39 - x86_64 - Updates   4.8 MB/s\nfirefox.x86_64   121.0-1.fc39   updates\n✨ Kiosk automatically synced catalog in 1.2 seconds!`
                        },
                        {
                          id: 'install',
                          output: `$ sudo dnf install htop\nResolving Dependencies (Fast SAT Solver)...\nInstalling:\n  htop   x86_64   3.2.2-2.fc39   fedora   178 k\nComplete! ✅ htop is ready to use.`
                        },
                        {
                          id: 'upgrade',
                          output: `$ sudo dnf upgrade\nUpgrading:\n  firefox   x86_64   121.0-1.fc39\nComplete! ✅ All Fedora/RHEL 8+ apps are up to date.`
                        },
                        {
                          id: 'remove',
                          output: `$ sudo dnf remove htop\nRemoving:\n  htop   x86_64   3.2.2-2.fc39\nFreed space: 512 k\nComplete! ✅ Removed cleanly.`
                        }
                      ].find((x) => x.id === t6DnfAction)?.output
                    }
                  </pre>
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 6.5: YUM CLASSIC HARDWARE STORE & ALL-DISTRO CHEAT SHEET
                ================================================================= */}
            {activeSubtopicId === 'yum-package-manager' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-rose-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-rose-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 6.5
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Classic `yum` Hardware Counter & Complete Store Comparison Table
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Test the classic `yum` commands used on CentOS 7 and older Red Hat servers, and compare all Linux Package Managers side-by-side!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      id: 'makecache',
                      title: '📖 yum makecache',
                      desc: 'Download fresh .rpm store catalog',
                      out: `$ sudo yum makecache\nLoaded plugins: fastestmirror\nMetadata Cache Created ✅\nClassic wooden counter ledger is now up to date!`
                    },
                    {
                      id: 'install',
                      title: '🛒 yum install httpd',
                      desc: 'Install Apache web server (.rpm)',
                      out: `$ sudo yum install httpd\nResolving Dependencies --> Running transaction check\nInstalled: httpd.x86_64 0:2.4.6-99.el7.centos\nComplete! ✅`
                    },
                    {
                      id: 'update',
                      title: '🚀 yum update',
                      desc: 'Update all installed .rpm packages',
                      out: `$ sudo yum update\nUpdating all CentOS/RHEL packages to latest stable .rpm releases...\nComplete! ✅`
                    },
                    {
                      id: 'remove',
                      title: '🗑️ yum remove httpd',
                      desc: 'Uninstall package cleanly',
                      out: `$ sudo yum remove httpd\nRemoved: httpd.x86_64 0:2.4.6-99.el7.centos\nComplete! ✅`
                    }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT6YumAction(btn.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t6YumAction === btn.id
                          ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                          : 'bg-rose-50 hover:bg-rose-100 text-slate-900 border-rose-200'
                      }`}
                    >
                      <div className="font-mono font-black text-xs sm:text-sm">{btn.title}</div>
                      <div className="text-xs mt-1 opacity-90">{btn.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  <pre className="whitespace-pre-wrap">
                    {
                      [
                        {
                          id: 'makecache',
                          out: `$ sudo yum makecache\nLoaded plugins: fastestmirror\nMetadata Cache Created ✅\nClassic wooden counter ledger is now up to date!`
                        },
                        {
                          id: 'install',
                          out: `$ sudo yum install httpd\nResolving Dependencies --> Running transaction check\nInstalled: httpd.x86_64 0:2.4.6-99.el7.centos\nComplete! ✅`
                        },
                        {
                          id: 'update',
                          out: `$ sudo yum update\nUpdating all CentOS/RHEL packages to latest stable .rpm releases...\nComplete! ✅`
                        },
                        {
                          id: 'remove',
                          out: `$ sudo yum remove httpd\nRemoved: httpd.x86_64 0:2.4.6-99.el7.centos\nComplete! ✅`
                        }
                      ].find((x) => x.id === t6YumAction)?.out
                    }
                  </pre>
                </div>

                {/* Side-by-Side Comparison Cheat Sheet */}
                <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-800 font-black">
                        <th className="p-3 border-b">Everyday Job</th>
                        <th className="p-3 border-b text-emerald-800">Ubuntu/Debian (`apt-get`)</th>
                        <th className="p-3 border-b text-amber-800">Local Box (`dpkg`)</th>
                        <th className="p-3 border-b text-sky-800">Fedora/RHEL 8+ (`dnf`)</th>
                        <th className="p-3 border-b text-rose-800">CentOS/RHEL 7 (`yum`)</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono divide-y divide-slate-200 bg-white">
                      <tr>
                        <td className="p-3 font-sans font-black text-slate-800">1. Refresh Catalog</td>
                        <td className="p-3 text-emerald-700">apt-get update</td>
                        <td className="p-3 text-slate-400">(offline tool)</td>
                        <td className="p-3 text-sky-700">dnf check-update</td>
                        <td className="p-3 text-rose-700">yum makecache</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-sans font-black text-slate-800">2. Install App</td>
                        <td className="p-3 text-emerald-700">apt-get install pkg</td>
                        <td className="p-3 text-amber-700">dpkg -i file.deb</td>
                        <td className="p-3 text-sky-700">dnf install pkg</td>
                        <td className="p-3 text-rose-700">yum install pkg</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-sans font-black text-slate-800">3. Upgrade All</td>
                        <td className="p-3 text-emerald-700">apt-get upgrade</td>
                        <td className="p-3 text-slate-400">(use apt-get)</td>
                        <td className="p-3 text-sky-700">dnf upgrade</td>
                        <td className="p-3 text-rose-700">yum update</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-sans font-black text-slate-800">4. Remove App</td>
                        <td className="p-3 text-emerald-700">apt-get remove pkg</td>
                        <td className="p-3 text-amber-700">dpkg -r pkg</td>
                        <td className="p-3 text-sky-700">dnf remove pkg</td>
                        <td className="p-3 text-rose-700">yum remove pkg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 7.1: USER MANAGEMENT OVERVIEW (/etc/passwd, /etc/shadow, usermod)
                ================================================================= */}
            {activeSubtopicId === 'user-management-overview' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-orange-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-orange-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-orange-800 bg-orange-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 7.1
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      House Guestbook (`/etc/passwd`), Locked Safe (`/etc/shadow`) & `usermod` Renovator
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Click the 3 stations below to inspect the 7 colon-separated columns of `/etc/passwd`, peek inside the encrypted `/etc/shadow` safe, or renovate a user’s room number & login name with `usermod`!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'passwd',
                      title: '📖 1. /etc/passwd (Guestbook)',
                      sub: 'Readable by everyone • 7 columns separated by colons (:)'
                    },
                    {
                      id: 'shadow',
                      title: '🔐 2. /etc/shadow (Locked Vault)',
                      sub: 'Root-only safe • Encrypted password hashes & expiry dates'
                    },
                    {
                      id: 'usermod',
                      title: '🛠️ 3. usermod (Room Renovator)',
                      sub: 'Change UID (-u), Primary GID (-g), Login (-l), or Home (-d)'
                    }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT7SelectedFileTab(tab.id);
                      }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        t7SelectedFileTab === tab.id
                          ? 'bg-orange-600 text-white border-orange-700 shadow-sm'
                          : 'bg-orange-50 hover:bg-orange-100 text-slate-900 border-orange-200'
                      }`}
                    >
                      <div className="font-black text-sm">{tab.title}</div>
                      <div className="text-xs mt-1 opacity-90">{tab.sub}</div>
                    </button>
                  ))}
                </div>

                {t7SelectedFileTab === 'passwd' && (
                  <div className="space-y-3">
                    <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                      <div className="text-amber-300 font-bold mb-1">
                        $ head -n 3 /etc/passwd && tail -n 2 /etc/passwd
                      </div>
                      <pre className="whitespace-pre-wrap leading-relaxed">
{`root:x:0:0:root:/root:/bin/bash                 # 👑 Parent / Landlord (UID 0)
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin # 🤖 Web Appliance (System User)
sam:x:1000:1000:Sam Mtaa:/home/sam:/bin/bash    # 🧑 Regular Resident (UID 1000)
wanjiku:x:1001:1001:Wanjiku:/home/wanjiku:/bin/bash`}
                      </pre>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center text-xs">
                      {[
                        { f: '1. sam', m: 'Username' },
                        { f: '2. x', m: 'Code in /etc/shadow' },
                        { f: '3. 1000', m: 'UID (Room #)' },
                        { f: '4. 1000', m: 'Primary GID' },
                        { f: '5. Sam Mtaa', m: 'Comment (-c)' },
                        { f: '6. /home/sam', m: 'Home Bedroom' },
                        { f: '7. /bin/bash', m: 'Login Shell' }
                      ].map((col, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-amber-50 border-2 border-amber-200"
                        >
                          <div className="font-mono font-black text-orange-800">{col.f}</div>
                          <div className="text-[11px] font-bold text-slate-700 mt-0.5">{col.m}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {t7SelectedFileTab === 'shadow' && (
                  <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo grep sam /etc/shadow
sam:$6$k9Qp8...scrambled_hash...:19670:0:99999:7:::

🔐 Why it’s safe:
• Only root can read /etc/shadow!
• Even if someone sees the hash ($6$...), your actual password is scrambled with SHA-512.
• Also stores password expiry days (99999) and warning days (7).`}
                    </pre>
                  </div>
                )}

                {t7SelectedFileTab === 'usermod' && (
                  <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`# 1. Repaint someone’s Room Number (UID):
$ sudo usermod -u 2000 bob
$ sudo chown -R 2000:bob /home/bob   # Re-key furniture locks to match new UID!

# 2. Change someone’s Primary Role Badge (GID):
$ sudo usermod -g 1005 bob

# 3. Rename the Nameplate on the Door (Login Name):
$ sudo usermod -l john_wick john_doe

# 4. Move Someone to a New Bedroom Location (Home Dir):
$ sudo usermod -d /home/new_bob -m bob`}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* =================================================================
                TOYBOX 7.2: CREATING USERS (`useradd` BLUEPRINT BUILDER)
                ================================================================= */}
            {activeSubtopicId === 'creating-users-useradd' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-emerald-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-emerald-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 7.2
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Interactive `useradd` Room Contractor Blueprint Builder
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Pick a resident name and toggle the blueprint flags below (`-m`, `-s`, `-c`, `-u`, `-e`) to watch `sudo useradd` assemble the exact command and build their room!
                    </p>
                  </div>
                </div>

                {/* Pick Resident Name */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black uppercase text-slate-700">
                    Pick Resident Name:
                  </span>
                  {['kamau', 'alice', 'bob', 'guest_intern'].map((name) => (
                    <button
                      key={name}
                      onClick={() => {
                        sounds.playPop();
                        setT7UseraddName(name);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-mono font-black text-xs border-2 transition-all ${
                        t7UseraddName === name
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-emerald-50'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>

                {/* Toggle Flags */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {[
                    {
                      key: 'm',
                      flag: '-m',
                      title: 'Build /home Bedroom',
                      desc: 'Creates /home/' + t7UseraddName + ' & copies /etc/skel'
                    },
                    {
                      key: 's',
                      flag: '-s /bin/bash',
                      title: 'Set Bash Butler Shell',
                      desc: 'Assigns friendly /bin/bash terminal'
                    },
                    {
                      key: 'c',
                      flag: `-c "Resident ${t7UseraddName}"`,
                      title: 'Door Nameplate (-c)',
                      desc: 'Adds full name description comment'
                    },
                    {
                      key: 'u',
                      flag: '-u 1500',
                      title: 'Custom UID #1500',
                      desc: 'Paints custom Room Number 1500'
                    },
                    {
                      key: 'e',
                      flag: '-e 2026-12-31',
                      title: 'Expiry Date (-e)',
                      desc: 'Temporary pass expires Dec 31, 2026'
                    }
                  ].map((item) => {
                    const active = t7UseraddFlags[item.key];
                    return (
                      <button
                        key={item.key}
                        onClick={() => {
                          sounds.playPop();
                          setT7UseraddFlags((prev) => ({
                            ...prev,
                            [item.key]: !prev[item.key]
                          }));
                        }}
                        className={`p-3 rounded-2xl border-2 text-left transition-all ${
                          active
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-emerald-50'
                        }`}
                      >
                        <div className="font-mono font-black text-xs">{item.flag}</div>
                        <div className="font-black text-xs mt-1">{item.title}</div>
                        <div className="text-[11px] opacity-90 mt-0.5">{item.desc}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Live Command Output */}
                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm space-y-2">
                  <div className="text-amber-300 font-bold">
                    👷 Contractor Blueprint Command:
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo useradd ${t7UseraddFlags.m ? '-m ' : '-M '}${
                      t7UseraddFlags.s ? '-s /bin/bash ' : ''
                    }${t7UseraddFlags.c ? `-c "Resident ${t7UseraddName}" ` : ''}${
                      t7UseraddFlags.u ? '-u 1500 ' : ''
                    }${t7UseraddFlags.e ? '-e 2026-12-31 ' : ''}${t7UseraddName}
$ sudo passwd ${t7UseraddName}

✅ Result in /etc/passwd:
${t7UseraddName}:x:${t7UseraddFlags.u ? '1500' : '1002'}:1002:${
                      t7UseraddFlags.c ? `Resident ${t7UseraddName}` : ''
                    }:${t7UseraddFlags.m ? `/home/${t7UseraddName}` : '(no bedroom -M)'}:${
                      t7UseraddFlags.s ? '/bin/bash' : '/bin/sh'
                    }${t7UseraddFlags.e ? '\n⏳ Account Expiry Date set to: 2026-12-31' : ''}`}
                  </pre>
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 7.3: CREATING USERS INTERACTIVELY (`adduser` WIZARD)
                ================================================================= */}
            {activeSubtopicId === 'creating-users-interactively-adduser' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-sky-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-sky-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-sky-900 bg-sky-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 7.3
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Friendly Hotel / Sacco Receptionist Wizard (`sudo adduser wanjiku`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Click through the 3 steps of `sudo adduser wanjiku` below to see how it automatically builds `/home/wanjiku`, asks for her password, and fills out her profile!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      step: 1,
                      title: 'Step 1: 🛎️ Run sudo adduser wanjiku',
                      desc: 'Automatically assigns UID/GID, creates /home/wanjiku, and copies /etc/skel'
                    },
                    {
                      step: 2,
                      title: 'Step 2: 🔐 Interactive Password Prompt',
                      desc: 'Receptionist politely asks you to type Wanjiku’s password right on the spot!'
                    },
                    {
                      step: 3,
                      title: 'Step 3: 📝 Nameplate Details & [Y/n]',
                      desc: 'Asks for Full Name, Room #, Phone #, and confirms [Y/n]!'
                    }
                  ].map((s) => (
                    <button
                      key={s.step}
                      onClick={() => {
                        sounds.playSuccess();
                        setT7AdduserStep(s.step);
                      }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        t7AdduserStep === s.step
                          ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                          : 'bg-sky-50 hover:bg-sky-100 text-slate-900 border-sky-200'
                      }`}
                    >
                      <div className="font-black text-sm">{s.title}</div>
                      <div className="text-xs mt-1 opacity-90">{s.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  {t7AdduserStep === 1 && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo adduser wanjiku
Adding user 'wanjiku' ...
Adding new group 'wanjiku' (1003) ...
Adding new user 'wanjiku' (1003) with group 'wanjiku' ...
Creating home directory '/home/wanjiku' ...
Copying files from '/etc/skel' ...
👉 Notice: You didn’t need -m or -s flags — adduser did it all automatically!`}
                    </pre>
                  )}
                  {t7AdduserStep === 2 && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`New password: ********
Retype new password: ********
passwd: password updated successfully ✅
👉 Notice: Unlike useradd (where the door stays locked until you run passwd separately), adduser asks for the password right away!`}
                    </pre>
                  )}
                  {t7AdduserStep === 3 && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`Changing the user information for wanjiku
Enter the new value, or press ENTER for the default
        Full Name []: Wanjiku Mwangi
        Room Number []: B-12
        Work Phone []: 0712-345-678
        Home Phone []:
        Other []: Sacco Treasurer
Is the information correct? [Y/n] Y
🎉 Done! Wanjiku’s room, password, and nameplate are 100% ready!`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 7.4: DELETING USERS (`userdel` VS `userdel -r`)
                ================================================================= */}
            {activeSubtopicId === 'deleting-users-userdel' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-rose-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-rose-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 7.4
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Move-Out Simulator: `sudo userdel bob` vs `sudo userdel -r bob`
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Compare what happens to Bob’s `/home/bob` bedroom when you remove him WITHOUT `-r` versus WITH `-r`!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      sounds.playPop();
                      setT7DeleteMode('keep_home');
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      t7DeleteMode === 'keep_home'
                        ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                        : 'bg-amber-50 hover:bg-amber-100 text-slate-900 border-amber-200'
                    }`}
                  >
                    <div className="font-mono font-black text-sm">
                      1. 📝 sudo userdel bob (OR sudo deluser bob)
                    </div>
                    <div className="text-xs mt-1 opacity-90">
                      Crosses Bob out of the `/etc/passwd` guestbook, BUT keeps `/home/bob` intact so you don’t lose his project files!
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      setT7DeleteMode('remove_home');
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      t7DeleteMode === 'remove_home'
                        ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                        : 'bg-rose-50 hover:bg-rose-100 text-slate-900 border-rose-200'
                    }`}
                  >
                    <div className="font-mono font-black text-sm">
                      2. 🧹 sudo userdel -r bob (OR deluser --remove-home bob)
                    </div>
                    <div className="text-xs mt-1 opacity-90">
                      Crosses Bob out of the guestbook AND completely sweeps out `/home/bob` and `/var/mail/bob`!
                    </div>
                  </button>
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  {t7DeleteMode === 'keep_home' ? (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo userdel bob
$ grep bob /etc/passwd
(no output — Bob can no longer log in 🔒)

$ ls -ld /home/bob
drwxr-xr-x 4 1002 1002 4096 Nov 09 /home/bob
📦 Bedroom Status: /home/bob is STILL HERE with Bob’s old reports inside!`}
                    </pre>
                  ) : (
                    <pre className="whitespace-pre-wrap leading-relaxed text-rose-300">
{`$ sudo userdel -r bob
userdel: bob mail spool (/var/mail/bob) removed
userdel: /home/bob removed

$ ls -ld /home/bob
ls: cannot access '/home/bob': No such file or directory 🧹
✨ Bedroom Status: Both Bob’s login account AND /home/bob were completely wiped!`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 7.5: MANAGING USER PASSWORDS (`passwd` LOCKSMITH)
                ================================================================= */}
            {activeSubtopicId === 'managing-user-passwords-passwd' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-violet-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-violet-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-violet-800 bg-violet-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 7.5
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The House Locksmith Keypad (`passwd` Options Simulator)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Test all 6 locksmith tools: changing your own code, resetting a forgotten code, locking (`-l`), unlocking (`-u`), forcing reset on next login (`-e`), and setting 30-day expiry (`-x 30`)!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: 'own',
                      cmd: 'passwd',
                      label: '🔢 Change My Own Code',
                      out: `$ passwd\nChanging password for sam.\nCurrent password: ********\nNew password: **********\npasswd: password updated successfully ✅`
                    },
                    {
                      id: 'reset',
                      cmd: 'sudo passwd alice',
                      label: '🆘 Admin Reset (Forgotten PIN)',
                      out: `$ sudo passwd alice\nNew password: **********\nRetype new password: **********\npasswd: password updated successfully ✅\n(Admin reset Alice’s code without needing her old password!)`
                    },
                    {
                      id: 'lock',
                      cmd: 'sudo passwd -l charlie',
                      label: '🔒 Lock Account (-l)',
                      out: `$ sudo passwd -l charlie\npasswd: password expiry information changed.\n🔒 Added '!' in front of Charlie’s hash in /etc/shadow — Charlie’s door is temporarily LOCKED!`
                    },
                    {
                      id: 'unlock',
                      cmd: 'sudo passwd -u charlie',
                      label: '🔓 Unlock Account (-u)',
                      out: `$ sudo passwd -u charlie\npasswd: password expiry information changed.\n🔓 Removed '!' lock — Charlie can log into his room again! (Also works with: sudo usermod -U charlie)`
                    },
                    {
                      id: 'expire',
                      cmd: 'sudo passwd -e bob',
                      label: '⚡ Force Reset Next Login (-e)',
                      out: `$ sudo passwd -e bob\npasswd: password expiry information changed.\n⚡ Next time Bob logs in, Linux will immediately force him to pick a brand-new secret code!`
                    },
                    {
                      id: 'days',
                      cmd: 'sudo passwd -x 30 david',
                      label: '📅 Expire Every 30 Days (-x)',
                      out: `$ sudo passwd -x 30 david\npasswd: password expiry information changed.\n📅 David’s door code will now expire every 30 days (inspect anytime with: chage -l david).`
                    }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT7PasswdAction(item.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t7PasswdAction === item.id
                          ? 'bg-violet-600 text-white border-violet-700 shadow-sm'
                          : 'bg-violet-50 hover:bg-violet-100 text-slate-900 border-violet-200'
                      }`}
                    >
                      <div className="font-mono font-black text-xs">{item.cmd}</div>
                      <div className="text-xs font-bold mt-1">{item.label}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    {
                      [
                        {
                          id: 'own',
                          out: `$ passwd\nChanging password for sam.\nCurrent password: ********\nNew password: **********\npasswd: password updated successfully ✅`
                        },
                        {
                          id: 'reset',
                          out: `$ sudo passwd alice\nNew password: **********\nRetype new password: **********\npasswd: password updated successfully ✅\n(Admin reset Alice’s code without needing her old password!)`
                        },
                        {
                          id: 'lock',
                          out: `$ sudo passwd -l charlie\npasswd: password expiry information changed.\n🔒 Added '!' in front of Charlie’s hash in /etc/shadow — Charlie’s door is temporarily LOCKED!`
                        },
                        {
                          id: 'unlock',
                          out: `$ sudo passwd -u charlie\npasswd: password expiry information changed.\n🔓 Removed '!' lock — Charlie can log into his room again! (Also works with: sudo usermod -U charlie)`
                        },
                        {
                          id: 'expire',
                          out: `$ sudo passwd -e bob\npasswd: password expiry information changed.\n⚡ Next time Bob logs in, Linux will immediately force him to pick a brand-new secret code!`
                        },
                        {
                          id: 'days',
                          out: `$ sudo passwd -x 30 david\npasswd: password expiry information changed.\n📅 David’s door code will now expire every 30 days (inspect anytime with: chage -l david).`
                        }
                      ].find((x) => x.id === t7PasswdAction)?.out
                    }
                  </pre>
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 7.6: VIEWING USER INFORMATION (`id`, `who`, `w`, `last`, `awk`)
                ================================================================= */}
            {activeSubtopicId === 'viewing-user-information' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-teal-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-teal-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 7.6
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Security Desk Scanner (`id`), Live Monitor (`who`/`w`), History (`last`) & Librarian (`awk`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Click any of the 4 inspection stations below to see how Linux checks user identities, active sessions, login history, and guestbook records!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      id: 'id',
                      title: '🪪 1. id & Flags',
                      desc: 'Check UID (-u), GID (-g), Groups (-G), Names (-n)'
                    },
                    {
                      id: 'who_w',
                      title: '📹 2. whoami, who & w',
                      desc: 'See who is inside the house right now & what they are doing'
                    },
                    {
                      id: 'last',
                      title: '📓 3. last (Gate History)',
                      desc: 'Check past arrival & departure times in the logbook'
                    },
                    {
                      id: 'awk',
                      title: '📚 4. awk Librarian',
                      desc: 'Extract clean username lists from /etc/passwd'
                    }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT7InfoTool(btn.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t7InfoTool === btn.id
                          ? 'bg-teal-600 text-white border-teal-700 shadow-sm'
                          : 'bg-teal-50 hover:bg-teal-100 text-slate-900 border-teal-200'
                      }`}
                    >
                      <div className="font-black text-xs sm:text-sm">{btn.title}</div>
                      <div className="text-xs mt-1 opacity-90">{btn.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  {t7InfoTool === 'id' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ id alice
uid=1001(alice) gid=1001(alice) groups=1001(alice),27(sudo),1002(gardeners)

$ id -u alice     # Room Number (UID) only:
1001
$ id -g alice     # Main Badge (Primary GID) only:
1001
$ id -nG alice    # All Role Badge Names (-n converts numbers to names):
alice sudo gardeners`}
                    </pre>
                  )}
                  {t7InfoTool === 'who_w' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ whoami
sam

$ who
sam      pts/0        2026-11-09 08:15 (192.168.1.10)
wanjiku  pts/1        2026-11-09 09:02 (192.168.1.24)

$ w
USER     TTY      FROM             LOGIN@   IDLE   WHAT
sam      pts/0    192.168.1.10     08:15    0.00s  w
wanjiku  pts/1    192.168.1.24     09:02    1:12m  vim budget_sacco.txt`}
                    </pre>
                  )}
                  {t7InfoTool === 'last' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ last -n 3
wanjiku  pts/1   192.168.1.24   Mon Nov 9 09:02   still logged in
sam      pts/0   192.168.1.10   Mon Nov 9 08:15   still logged in
bob      pts/2   192.168.1.40   Sun Nov 8 14:20 - 17:45  (03:25)`}
                    </pre>
                  )}
                  {t7InfoTool === 'awk' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`# Ask the Librarian (awk) to split /etc/passwd by ':' and list human residents (UID >= 1000):
$ awk -F: '$3 >= 1000 {print "Resident:", $1, "| Room UID:", $3}' /etc/passwd
Resident: sam | Room UID: 1000
Resident: alice | Room UID: 1001
Resident: wanjiku | Room UID: 1003`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 7.7: GROUP MANAGEMENT OVERVIEW (PRIMARY VS SECONDARY)
                ================================================================= */}
            {activeSubtopicId === 'group-management-overview' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-indigo-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-indigo-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-800 bg-indigo-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 7.7
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Primary Badge vs Secondary Team Badges Explorer (`/etc/group`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Click any resident below to inspect their 1 Primary Group badge vs their extra Secondary Group badges and see which rooms unlock!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'alice',
                      name: '👩🏾 Alice (Parent & Gardener)',
                      primary: 'alice (GID 1001)',
                      secondary: ['parents (1002)', 'cooks (1003)', 'gardeners (1004)'],
                      rooms: '✅ Alice’s Bedroom, ✅ Kitchen, ✅ Garden Shed, ✅ Garage'
                    },
                    {
                      id: 'bob',
                      name: '👨🏾 Bob (Cook & Tech Support)',
                      primary: 'bob (GID 1005)',
                      secondary: ['cooks (1003)', 'techsupport (1006)'],
                      rooms: '✅ Bob’s Bedroom, ✅ Kitchen, ✅ Server Closet'
                    },
                    {
                      id: 'wanjiku',
                      name: '👩🏾‍💼 Wanjiku (Sacco Admin)',
                      primary: 'wanjiku (GID 1007)',
                      secondary: ['sudo (27)', 'welfare_chama (1008)'],
                      rooms: '✅ Wanjiku’s Apartment, ✅ Sacco Office, ✅ Master Key Cabinet'
                    }
                  ].map((res) => (
                    <button
                      key={res.id}
                      onClick={() => {
                        sounds.playPop();
                        setT7SelectedResident(res.id);
                      }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        t7SelectedResident === res.id
                          ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                          : 'bg-indigo-50 hover:bg-indigo-100 text-slate-900 border-indigo-200'
                      }`}
                    >
                      <div className="font-black text-sm">{res.name}</div>
                      <div className="text-xs mt-1 opacity-90">
                        🥇 Primary: <span className="font-mono">{res.primary}</span>
                      </div>
                      <div className="text-xs mt-1 opacity-90">
                        🎖️ Secondary: <span className="font-mono">{res.secondary.join(', ')}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  <pre className="whitespace-pre-wrap leading-relaxed">
{`# Inside /etc/group (Format -> group_name : password_placeholder : GID : member_list):
parents:x:1002:alice
cooks:x:1003:alice,bob
gardeners:x:1004:alice
techsupport:x:1006:bob
welfare_chama:x:1008:wanjiku

🔓 Doors Unlocked for ${t7SelectedResident.toUpperCase()}:
${
  t7SelectedResident === 'alice'
    ? '✅ /home/alice (Primary) + /kitchen (cooks) + /garden (gardeners) + /garage (parents)'
    : t7SelectedResident === 'bob'
    ? '✅ /home/bob (Primary) + /kitchen (cooks) + /tech_closet (techsupport)'
    : '✅ /home/wanjiku (Primary) + /sacco_office (welfare_chama) + Golden Master Key (sudo)'
}`}
                  </pre>
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 7.8: MANAGING GROUPS (`usermod -aG`, `gpasswd`, `groupmod`)
                ================================================================= */}
            {activeSubtopicId === 'managing-groups-usermod-gpasswd' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-amber-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-amber-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 7.8
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Badge Wall Manager (`usermod -aG` vs `-G`, `gpasswd -M/-d` & `groupmod`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      See why `-aG` (Append) is a lifesaver compared to plain `-G`, and test adding/removing team members with `gpasswd`!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                  {[
                    {
                      id: 'append',
                      cmd: 'usermod -aG admins bob',
                      title: '✅ Safe Append (-aG)',
                      out: `Before: bob : bob cooks gardeners\n$ sudo usermod -aG admins bob\nAfter : bob : bob cooks gardeners admins 🎉\n(Kept cooks & gardeners AND added admins!)`
                    },
                    {
                      id: 'replace_warn',
                      cmd: 'usermod -G admins bob',
                      title: '⚠️ Without -a (Replaces!)',
                      out: `Before: bob : bob cooks gardeners\n$ sudo usermod -G admins bob\nAfter : bob : bob admins 😱\n(Warning: Forgetting -a wiped out cooks & gardeners! Always use -aG!)`
                    },
                    {
                      id: 'gpasswd_m',
                      cmd: 'gpasswd -M alice,bob cooks',
                      title: '👥 Set Team Roster (-M)',
                      out: `$ sudo gpasswd -M alice,bob,wanjiku cooks\n✅ Added Alice, Bob, and Wanjiku to the 'cooks' team all in one command!`
                    },
                    {
                      id: 'gpasswd_d',
                      cmd: 'gpasswd -d alice cooks',
                      title: '✂️ Remove 1 Member (-d)',
                      out: `$ sudo gpasswd -d alice cooks\nRemoving user alice from group cooks\n✅ Unpinned 'cooks' badge from Alice while keeping her other badges safe!`
                    },
                    {
                      id: 'groupmod',
                      cmd: 'groupmod -g 501 -n chefs cooks',
                      title: '🏷️ Rename / Change GID',
                      out: `$ sudo groupmod -g 501 -n chefs cooks\n✅ Updated badge GID to 501 and renamed team from 'cooks' to 'chefs'!`
                    }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT7GroupModAction(btn.id);
                      }}
                      className={`p-3 rounded-2xl border-2 text-left transition-all ${
                        t7GroupModAction === btn.id
                          ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                          : 'bg-amber-50 hover:bg-amber-100 text-slate-900 border-amber-200'
                      }`}
                    >
                      <div className="font-mono font-black text-xs">{btn.cmd}</div>
                      <div className="text-xs font-bold mt-1">{btn.title}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    {
                      [
                        {
                          id: 'append',
                          out: `Before: bob : bob cooks gardeners\n$ sudo usermod -aG admins bob\nAfter : bob : bob cooks gardeners admins 🎉\n(Kept cooks & gardeners AND added admins!)`
                        },
                        {
                          id: 'replace_warn',
                          out: `Before: bob : bob cooks gardeners\n$ sudo usermod -G admins bob\nAfter : bob : bob admins 😱\n(Warning: Forgetting -a wiped out cooks & gardeners! Always use -aG!)`
                        },
                        {
                          id: 'gpasswd_m',
                          out: `$ sudo gpasswd -M alice,bob,wanjiku cooks\n✅ Added Alice, Bob, and Wanjiku to the 'cooks' team all in one command!`
                        },
                        {
                          id: 'gpasswd_d',
                          out: `$ sudo gpasswd -d alice cooks\nRemoving user alice from group cooks\n✅ Unpinned 'cooks' badge from Alice while keeping her other badges safe!`
                        },
                        {
                          id: 'groupmod',
                          out: `$ sudo groupmod -g 501 -n chefs cooks\n✅ Updated badge GID to 501 and renamed team from 'cooks' to 'chefs'!`
                        }
                      ].find((x) => x.id === t7GroupModAction)?.out
                    }
                  </pre>
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 7.9: CREATING GROUPS (`groupadd` & `addgroup`)
                ================================================================= */}
            {activeSubtopicId === 'creating-groups-groupadd' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-emerald-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-emerald-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 7.9
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Badge Minting Machine (`sudo groupadd` & `sudo addgroup`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Click any button below to mint a brand-new team badge and add it to the `/etc/group` registry!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      if (!t7CreatedGroups.find((g) => g.name === 'developers')) {
                        setT7CreatedGroups([
                          ...t7CreatedGroups,
                          { name: 'developers', gid: 1004 }
                        ]);
                      }
                    }}
                    className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs text-left shadow-sm"
                  >
                    <div className="font-mono text-sm">1. sudo groupadd developers</div>
                    <div className="opacity-90 font-normal mt-1">
                      Creates `developers` with the next automatic GID (1004)
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      if (!t7CreatedGroups.find((g) => g.name === 'sacco_audit')) {
                        setT7CreatedGroups([
                          ...t7CreatedGroups,
                          { name: 'sacco_audit', gid: 2050 }
                        ]);
                      }
                    }}
                    className="p-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs text-left shadow-sm"
                  >
                    <div className="font-mono text-sm">2. sudo groupadd -g 2050 sacco_audit</div>
                    <div className="opacity-90 font-normal mt-1">
                      Creates `sacco_audit` with custom GID number 2050 (`-g`)
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      if (!t7CreatedGroups.find((g) => g.name === 'nyumba_kumi')) {
                        setT7CreatedGroups([
                          ...t7CreatedGroups,
                          { name: 'nyumba_kumi', gid: 1005 }
                        ]);
                      }
                    }}
                    className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs text-left shadow-sm"
                  >
                    <div className="font-mono text-sm">3. sudo addgroup nyumba_kumi</div>
                    <div className="opacity-90 font-normal mt-1">
                      Friendly Ubuntu/Debian helper that prints confirmation
                    </div>
                  </button>
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  <div className="text-amber-300 font-bold mb-1">
                    📋 Live `/etc/group` Whiteboard:
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    {t7CreatedGroups
                      .map((g) => `${g.name}:x:${g.gid}:`)
                      .join('\n')}
                  </pre>
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 7.10: DELETING GROUPS (`groupdel` & PRIMARY GUARD)
                ================================================================= */}
            {activeSubtopicId === 'deleting-groups-groupdel' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-rose-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-rose-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 7.10
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Disbanding a Team (`groupdel`) vs Primary Group Safety Guard
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Test deleting a secondary team badge (`gardeners`) versus trying to delete someone’s active Primary Group (`alice`)!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      sounds.playSuccess();
                      setT7GroupDelChoice('secondary');
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      t7GroupDelChoice === 'secondary'
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-slate-900 border-emerald-200'
                    }`}
                  >
                    <div className="font-mono font-black text-sm">
                      1. ✅ sudo groupdel gardeners (Secondary Team)
                    </div>
                    <div className="text-xs mt-1 opacity-90">
                      Disbands the `gardeners` team cleanly. Alice and Bob stay 100% safe in their bedrooms!
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playPop();
                      setT7GroupDelChoice('primary_guard');
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      t7GroupDelChoice === 'primary_guard'
                        ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                        : 'bg-rose-50 hover:bg-rose-100 text-slate-900 border-rose-200'
                    }`}
                  >
                    <div className="font-mono font-black text-sm">
                      2. 🛡️ sudo groupdel alice (Active Primary Group!)
                    </div>
                    <div className="text-xs mt-1 opacity-90">
                      Watch Linux step in and block deleting a group that is still a resident’s Primary Group!
                    </div>
                  </button>
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  {t7GroupDelChoice === 'secondary' ? (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo groupdel gardeners
(or on Ubuntu: sudo delgroup gardeners)

✅ Group 'gardeners' removed from /etc/group!
🧑🏾‍🌾 Resident Check: Alice and Bob still have their accounts and files — only the 'gardeners' team badge was retired.`}
                    </pre>
                  ) : (
                    <pre className="whitespace-pre-wrap leading-relaxed text-amber-300">
{`$ sudo groupdel alice
groupdel: cannot remove the primary group of user 'alice' 🛡️

🏠 Safety Guard Triggered!
Because 'alice' is still living in the house and using 'alice' (GID 1001) as her Primary Group badge, Linux refuses to delete it until you change her primary group (usermod -g) or remove user alice first!`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 7.11: CHECKING USER GROUP MEMBERSHIP (4 METHODS)
                ================================================================= */}
            {activeSubtopicId === 'checking-user-group-membership' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-purple-300 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-purple-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 7.11
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Sam’s 4 Group-Checking Stations (`groups`, `id`, `/etc/group`, `getent`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Click each of the 4 stations from Sam’s House story to see how they check Alice’s role badges!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      id: 'groups',
                      title: '1. 🎖️ groups alice',
                      sub: 'Check the Badge Hook on Alice’s Door'
                    },
                    {
                      id: 'id_ng',
                      title: '2. 🪪 id / id -nG alice',
                      sub: 'Swipe Alice’s ID Card at the Reader'
                    },
                    {
                      id: 'etc_group',
                      title: '3. 📖 grep alice /etc/group',
                      sub: 'Search the Leather Master Registry Book'
                    },
                    {
                      id: 'getent',
                      title: '4. 🧑‍💼 getent group',
                      sub: 'Ask the House Manager (Works on Network Too!)'
                    }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT7CheckMethod(m.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t7CheckMethod === m.id
                          ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                          : 'bg-purple-50 hover:bg-purple-100 text-slate-900 border-purple-200'
                      }`}
                    >
                      <div className="font-mono font-black text-xs sm:text-sm">{m.title}</div>
                      <div className="text-xs mt-1 opacity-90">{m.sub}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  {t7CheckMethod === 'groups' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ groups alice
alice : alice parents cooks gardeners

💡 Tip: Type 'groups' with no username to see YOUR OWN badges!`}
                    </pre>
                  )}
                  {t7CheckMethod === 'id_ng' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ id alice
uid=1001(alice) gid=1001(alice) groups=1001(alice),1002(parents),1003(cooks),1004(gardeners)

$ id -G -n alice
alice parents cooks gardeners`}
                    </pre>
                  )}
                  {t7CheckMethod === 'etc_group' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ grep -w alice /etc/group
alice:x:1001:
parents:x:1002:alice,bob
cooks:x:1003:alice,charlie
gardeners:x:1004:alice`}
                    </pre>
                  )}
                  {t7CheckMethod === 'getent' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ getent group | grep -w alice
alice:x:1001:
parents:x:1002:alice,bob
cooks:x:1003:alice,charlie
gardeners:x:1004:alice
✨ Why House Manager (getent) is great: It checks /etc/group AND network directories (LDAP/AD)!`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 7.12: MANAGING ADMINISTRATIVE ACCESS (`sudo`, `visudo`, `su`)
                ================================================================= */}
            {activeSubtopicId === 'managing-administrative-access-sudo' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-amber-400 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-amber-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 7.12
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The Golden Master Key Station (`sudo`, `-l`, `-v`, `-k`, `visudo` & `/var/log/auth.log`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Test borrowing the Parent’s Golden Key with `sudo`, checking your allowed chores (`sudo -l`), extending the 5-minute timer (`sudo -v`), returning the key early (`sudo -k`), and editing `/etc/sudoers` safely with `sudo visudo`!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: 'run',
                      cmd: 'sudo apt install game',
                      label: '🔑 Borrow Key for 1 Task',
                      out: `$ sudo apt install game\n[sudo] password for sam: ******** (Sam enters HIS OWN password!)\nInstalling game... Done! ✅\n📓 Logged in /var/log/auth.log: USER=sam COMMAND=/usr/bin/apt install game`
                    },
                    {
                      id: 'list',
                      cmd: 'sudo -l',
                      label: '📋 Check Fridge Rules (-l)',
                      out: `$ sudo -l\nUser sam may run the following commands on cozy-house:\n    (ALL : ALL) ALL\n✅ Allowed: Fix sink, install appliances, manage users.`
                    },
                    {
                      id: 'extend',
                      cmd: 'sudo -v',
                      label: '⏰ Extend Key Timer 5m (-v)',
                      out: `$ sudo -v\n⏰ Refreshed your Golden Key timestamp for another 5 minutes without running a command!`
                    },
                    {
                      id: 'return',
                      cmd: 'sudo -k  (or sudo -K)',
                      label: '🪝 Return Key Early (-k)',
                      out: `$ sudo -k\n🔒 Returned the Golden Master Key to the wall hook immediately! Next sudo command will ask for your password again.`
                    },
                    {
                      id: 'visudo',
                      cmd: 'sudo visudo',
                      label: '🛡️ Safe Rulebook Editor',
                      out: `$ sudo visudo\nOpening /etc/sudoers.tmp with syntax checker...\n# Grant Alice full sudo access:\nalice   ALL=(ALL:ALL) ALL\n# Or add Alice to the sudo group:\n$ sudo usermod -aG sudo alice\n✅ Syntax OK! Saved safely without locking out the house.`
                    },
                    {
                      id: 'su_vs_sudo',
                      cmd: 'sudo -u / sudo -p / su -',
                      label: '⚖️ sudo Flags & sudo vs su',
                      out: `# Run as another resident (-u) or custom prompt (-p):\n$ sudo -u alice -p "Enter Sam’s code: " touch /home/alice/note.txt\n\n# Why sudo is safer than su:\n• sudo = Borrow key temporarily with YOUR password + full audit trail in /var/log/auth.log\n• su - = Switch permanently to root using ROOT’s password (risky!)`
                    }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT7SudoKeyOption(item.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t7SudoKeyOption === item.id
                          ? 'bg-amber-500 text-white border-amber-700 shadow-sm'
                          : 'bg-amber-50 hover:bg-amber-100 text-slate-900 border-amber-200'
                      }`}
                    >
                      <div className="font-mono font-black text-xs">{item.cmd}</div>
                      <div className="text-xs font-bold mt-1">{item.label}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    {
                      [
                        {
                          id: 'run',
                          out: `$ sudo apt install game\n[sudo] password for sam: ******** (Sam enters HIS OWN password!)\nInstalling game... Done! ✅\n📓 Logged in /var/log/auth.log: USER=sam COMMAND=/usr/bin/apt install game`
                        },
                        {
                          id: 'list',
                          out: `$ sudo -l\nUser sam may run the following commands on cozy-house:\n    (ALL : ALL) ALL\n✅ Allowed: Fix sink, install appliances, manage users.`
                        },
                        {
                          id: 'extend',
                          out: `$ sudo -v\n⏰ Refreshed your Golden Key timestamp for another 5 minutes without running a command!`
                        },
                        {
                          id: 'return',
                          out: `$ sudo -k\n🔒 Returned the Golden Master Key to the wall hook immediately! Next sudo command will ask for your password again.`
                        },
                        {
                          id: 'visudo',
                          out: `$ sudo visudo\nOpening /etc/sudoers.tmp with syntax checker...\n# Grant Alice full sudo access:\nalice   ALL=(ALL:ALL) ALL\n# Or add Alice to the sudo group:\n$ sudo usermod -aG sudo alice\n✅ Syntax OK! Saved safely without locking out the house.`
                        },
                        {
                          id: 'su_vs_sudo',
                          out: `# Run as another resident (-u) or custom prompt (-p):\n$ sudo -u alice -p "Enter Sam’s code: " touch /home/alice/note.txt\n\n# Why sudo is safer than su:\n• sudo = Borrow key temporarily with YOUR password + full audit trail in /var/log/auth.log\n• su - = Switch permanently to root using ROOT’s password (risky!)`
                        }
                      ].find((x) => x.id === t7SudoKeyOption)?.out
                    }
                  </pre>
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 8.1: CONFIGURING NETWORK INTERFACES & FIREWALLS
                ================================================================= */}
            {activeSubtopicId === 'configuring-network-interfaces' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-cyan-400 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-cyan-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-cyan-900 bg-cyan-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 8.1
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      House Entrances, Static vs. DHCP Address & The Firewall Rule Order Lab (`iptables`, `firewalld`, `ufw`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Compare Static IP vs. DHCP Welcome Desk, then test the Security Guard’s Top-to-Bottom Rulebook (`iptables -I` vs `-A`), `firewalld` Zones, and `ufw`!
                    </p>
                  </div>
                </div>

                {/* Part A: Static vs DHCP Toggle */}
                <div className="bg-cyan-50/70 rounded-2xl p-4 border-2 border-cyan-200 space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-cyan-950">
                    1️⃣ Pick Your House Address System (Door `enp0s3` + `wlan0` + `lo`):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        setT8AddressMethod('static');
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t8AddressMethod === 'static'
                          ? 'bg-cyan-600 text-white border-cyan-800 shadow-sm'
                          : 'bg-white hover:bg-cyan-100 text-slate-900 border-cyan-200'
                      }`}
                    >
                      <div className="font-black text-xs sm:text-sm">
                        🪧 Static IP (`ipv4.method manual` — Permanent Plot #)
                      </div>
                      <div className="text-xs mt-1 opacity-90">
                        Fixed address (192.168.1.5/24) + Main Gate (192.168.1.1) + DNS Phonebook (8.8.8.8). Best for servers & shops!
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        setT8AddressMethod('dhcp');
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t8AddressMethod === 'dhcp'
                          ? 'bg-cyan-600 text-white border-cyan-800 shadow-sm'
                          : 'bg-white hover:bg-cyan-100 text-slate-900 border-cyan-200'
                      }`}
                    >
                      <div className="font-black text-xs sm:text-sm">
                        🪪 DHCP (`ipv4.method auto` — Welcome Desk Visitor Badge)
                      </div>
                      <div className="text-xs mt-1 opacity-90">
                        Automatic temporary badge via DORA (Discover → Offer → Request → Acknowledge). Best for laptops & guests!
                      </div>
                    </button>
                  </div>
                </div>

                {/* Part B: Firewall Manager & Rule Order Lab */}
                <div className="space-y-2.5">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                    2️⃣ Pick a Firewall Guard & Test the Famous Top-to-Bottom Rule Order Problem:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {[
                      {
                        id: 'iptables_wrong',
                        title: '❌ iptables (Wrong Order)',
                        sub: 'DROP rule above ACCEPT SSH rule'
                      },
                      {
                        id: 'iptables_fixed',
                        title: '✅ iptables -I (Fixed Order!)',
                        sub: 'Insert SSH exception at Line #1'
                      },
                      {
                        id: 'firewalld',
                        title: '🗺️ firewalld (Zones Tablet)',
                        sub: 'Public / Home / DMZ Zones + --reload'
                      },
                      {
                        id: 'ufw',
                        title: '📱 UFW (Friendly App)',
                        sub: 'ufw allow ssh / ufw enable'
                      }
                    ].map((fw) => (
                      <button
                        key={fw.id}
                        onClick={() => {
                          sounds.playSuccess();
                          setT8FirewallTool(fw.id);
                        }}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                          t8FirewallTool === fw.id
                            ? 'bg-slate-900 text-amber-300 border-slate-950 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-200'
                        }`}
                      >
                        <div className="font-mono font-black text-xs">{fw.title}</div>
                        <div className="text-xs mt-1 opacity-90">{fw.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    {t8AddressMethod === 'static'
                      ? `# 🏠 House Doors & Static IP Setup:\n• Front Wired Door (enp0s3): 192.168.1.5/24 (Permanent Plot #) | Gateway: 192.168.1.1 | DNS: 8.8.8.8\n• Back Wi-Fi Door (wlan0):   192.168.1.7/24 (Wireless Drone Door)\n• Secret Hallway (lo):       127.0.0.1/8    (Internal Family Loopback)\n--------------------------------------------------------------------------------\n`
                      : `# 🪪 House Doors & DHCP Welcome Desk (DORA Handshake):\n1. DISCOVER: "Hodi! Any DHCP Server here?" → 2. OFFER: "Take 192.168.1.105!"\n3. REQUEST:  "I'll take 192.168.1.105!"    → 4. ACK:   "Signed for 24 hours!"\n--------------------------------------------------------------------------------\n`}
                    {t8FirewallTool === 'iptables_wrong' &&
                      `# ❌ THE TOP-TO-BOTTOM RULE ORDER MISTAKE:\n$ sudo iptables -A INPUT -s 192.168.1.3 -j DROP\n$ sudo iptables -A INPUT -s 192.168.1.3 -p tcp --dport 22 -j ACCEPT\n\nGuard's Rulebook (INPUT Chain):\n  Line 1: DROP   all  -- 192.168.1.3  anywhere   <-- Guard checks Line 1 FIRST and blocks Mr. X!\n  Line 2: ACCEPT tcp  -- 192.168.1.3  anywhere tcp dpt:ssh  <-- NEVER REACHED!\n\nResult when Mr. X tries 'ssh sam@192.168.1.5': ❌ Connection Timed Out!`}
                    {t8FirewallTool === 'iptables_fixed' &&
                      `# ✅ THE FIX: Insert (-I) the specific SSH exception at Line #1 ABOVE the general DROP!\n$ sudo iptables -I INPUT 1 -s 192.168.1.3 -p tcp --dport 22 -j ACCEPT\n$ sudo iptables -A INPUT -s 192.168.1.3 -j DROP\n$ sudo sh -c "iptables-save > /etc/iptables/rules.v4"   # Save in waterproof notebook!\n\nGuard's Rulebook (INPUT Chain):\n  Line 1: ACCEPT tcp  -- 192.168.1.3  anywhere tcp dpt:ssh  <-- Checked FIRST! ✅ SSH Allowed!\n  Line 2: DROP   all  -- 192.168.1.3  anywhere              <-- Blocks all other ports from Mr. X!`}
                    {t8FirewallTool === 'firewalld' &&
                      `# 🗺️ MODERN SECURITY MANAGER (firewalld Zones):\n$ sudo systemctl start firewalld && sudo systemctl enable firewalld\n$ sudo firewall-cmd --zone=public --add-interface=enp0s3 --permanent\n$ sudo firewall-cmd --zone=public --add-service=ssh --permanent\n$ sudo firewall-cmd --zone=public --add-port=80/tcp --permanent\n$ sudo firewall-cmd --reload\n\nActive Zones:\n  public (interfaces: enp0s3) --> services: ssh, dhcpv6-client | ports: 80/tcp ✅`}
                    {t8FirewallTool === 'ufw' &&
                      `# 📱 FRIENDLY SECURITY MANAGER (UFW - Uncomplicated Firewall):\n$ sudo ufw enable\n$ sudo ufw allow ssh\n$ sudo ufw allow 80/tcp\n$ sudo ufw deny 8080\n$ sudo ufw status\nStatus: active\nTo          Action      From\n--          ------      ----\n22/tcp      ALLOW       Anywhere   (SSH Side Door Open ✅)\n80/tcp      ALLOW       Anywhere   (Web Front Door Open ✅)\n8080        DENY        Anywhere   (Door 8080 Padlocked 🚫)`}
                  </pre>
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 8.2: MANAGING IP ADDRESSES AND INTERFACES
                ================================================================= */}
            {activeSubtopicId === 'managing-ip-addresses-and-interfaces' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-emerald-400 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-emerald-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 8.2
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The Door & Address Plate Workbench (`ip a`, `ip link`, `ifconfig`, `ethtool`, `hostnamectl`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Click any tool below to inspect MAC licence plates vs. IP plot numbers, bolt or unbolt the front gate (`UP`/`DOWN`), test pipe speed (`ethtool`), or paint the mailbox sign (`hostnamectl`)!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: 'ip_a',
                      cmd: 'ip addr show  (ip a)',
                      label: '📱 Scan All Doors & IPs'
                    },
                    {
                      id: 'ip_link_up',
                      cmd: t8GateUp ? 'sudo ip link set enp0s3 down' : 'sudo ip link set enp0s3 up',
                      label: t8GateUp ? '🔒 Bolt Front Gate DOWN' : '🔓 Swing Front Gate UP'
                    },
                    {
                      id: 'ip_addr_add',
                      cmd: 'sudo ip addr add 192.168.1.50/24 dev enp0s3',
                      label: '🪧 Hang Extra IP Plate'
                    },
                    {
                      id: 'ifconfig',
                      cmd: 'ifconfig enp0s3',
                      label: '📋 Classic Door Inspector'
                    },
                    {
                      id: 'ethtool',
                      cmd: 'ethtool enp0s3',
                      label: '🔧 Plumber’s Pipe Gauge'
                    },
                    {
                      id: 'hostname',
                      cmd: 'hostnamectl set-hostname LinuxHome',
                      label: '📬 Mailbox Nameplate'
                    }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => {
                        sounds.playSuccess();
                        if (btn.id === 'ip_link_up') {
                          setT8GateUp((prev) => !prev);
                        }
                        setT8IpToolAction(btn.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t8IpToolAction === btn.id
                          ? 'bg-emerald-600 text-white border-emerald-800 shadow-sm'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-slate-900 border-emerald-200'
                      }`}
                    >
                      <div className="font-mono font-black text-xs">{btn.cmd}</div>
                      <div className="text-xs font-bold mt-1">{btn.label}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  {t8IpToolAction === 'ip_a' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 state UNKNOWN
    inet 127.0.0.1/8 scope host lo              <-- 🏠 Internal Hallway (Loopback)
2: enp0s3: <BROADCAST,MULTICAST,${t8GateUp ? 'UP,LOWER_UP' : 'DOWN'}> mtu 1500 state ${t8GateUp ? 'UP 🟢' : 'DOWN 🔴'}
    link/ether 08:00:27:ab:cd:ef brd ff:ff:ff:ff:ff:ff  <-- 🚗 Permanent MAC Number Plate
    inet 192.168.1.5/24 brd 192.168.1.255 scope global enp0s3 <-- 📍 Current IP Plot Number
3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP 🟢
    link/ether 00:1c:bf:99:88:77 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.7/24 scope global wlan0`}
                    </pre>
                  )}
                  {t8IpToolAction === 'ip_link_up' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo ip link set enp0s3 ${t8GateUp ? 'up' : 'down'}
$ ip link show enp0s3
2: enp0s3: <BROADCAST,MULTICAST${t8GateUp ? ',UP,LOWER_UP' : ''}> mtu 1500 state ${t8GateUp ? 'UP 🟢 (Front Gate Unlocked & Wide Open!)' : 'DOWN 🔴 (Front Gate Padlocked Shut!)'}
💡 Click the button again to toggle the gate back!`}
                    </pre>
                  )}
                  {t8IpToolAction === 'ip_addr_add' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo ip addr add 192.168.1.50/24 dev enp0s3
$ ip -4 addr show enp0s3
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> state UP
    inet 192.168.1.5/24 scope global enp0s3
    inet 192.168.1.50/24 scope global secondary enp0s3  <-- 🪧 Extra Address Plate Attached!

# To remove it later:
$ sudo ip addr del 192.168.1.50/24 dev enp0s3`}
                    </pre>
                  )}
                  {t8IpToolAction === 'ifconfig' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ ifconfig enp0s3
enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.5  netmask 255.255.255.0  broadcast 192.168.1.255
        ether 08:00:27:ab:cd:ef  txqueuelen 1000  (Ethernet)
        RX packets 1420  bytes 1854320 (1.8 MB)
        TX packets 980   bytes 412000 (412.0 KB)
📋 Classic Door Inspector: Shows IP, Subnet Mask (255.255.255.0 = /24), MAC, and packages received/sent!`}
                    </pre>
                  )}
                  {t8IpToolAction === 'ethtool' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ ethtool enp0s3
Settings for enp0s3:
        Speed: 1000Mb/s          <-- 🚰 High-Pressure Gigabit Pipe!
        Duplex: Full             <-- 🌉 Two-Way Highway Bridge (Send & Receive at once!)
        Port: Twisted Pair
        Link detected: yes       <-- 🔌 Physical Ethernet Cable is plugged in tight!`}
                    </pre>
                  )}
                  {t8IpToolAction === 'hostname' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ hostname
LinuxHome

$ sudo hostnamectl set-hostname Sam-Cozy-Boma
$ hostnamectl
   Static hostname: Sam-Cozy-Boma
         Icon name: computer-vm
  Operating System: Ubuntu 24.04 LTS
📬 Your house mailbox now proudly displays "Sam-Cozy-Boma" on the network!`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 8.3: MANAGING NETWORK CONNECTIONS (`nmcli` & `nmtui`)
                ================================================================= */}
            {activeSubtopicId === 'managing-network-connections' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-indigo-400 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-indigo-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-900 bg-indigo-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 8.3
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The NetworkManager Office (`nmcli` Permanent Setup & `nmtui` Interactive Form)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Step through Sam’s permanent connection setup with `nmcli` or open the friendly `nmtui` text menu!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {[
                    {
                      id: 'step1_devices',
                      title: '1️⃣ nmcli d',
                      sub: 'Check All Doors & Status'
                    },
                    {
                      id: 'step2_ip_gw_dns',
                      title: '2️⃣ nmcli con mod',
                      sub: 'Set IP, Gateway & DNS'
                    },
                    {
                      id: 'step3_method',
                      title: '3️⃣ ipv4.method',
                      sub: 'manual (Static) vs auto'
                    },
                    {
                      id: 'step4_restart_verify',
                      title: '4️⃣ down / up & show',
                      sub: 'Restart Door & Verify ID'
                    },
                    {
                      id: 'nmtui_form',
                      title: '5️⃣ 🖥️ nmtui Form',
                      sub: 'Interactive Text Menu'
                    }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT8NmStep(s.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t8NmStep === s.id
                          ? 'bg-indigo-600 text-white border-indigo-800 shadow-sm'
                          : 'bg-indigo-50 hover:bg-indigo-100 text-slate-900 border-indigo-200'
                      }`}
                    >
                      <div className="font-mono font-black text-xs">{s.title}</div>
                      <div className="text-xs mt-1 opacity-90">{s.sub}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  {t8NmStep === 'step1_devices' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ nmcli d
DEVICE   TYPE      STATE                   CONNECTION
enp0s3   ethernet  connected               enp0s3
wlan0    wifi      connected               CozyHome_WiFi
lo       loopback  connected (externally)  lo

💡 Walked around the compound: Front wired gate (enp0s3) and Wi-Fi door (wlan0) are ready!`}
                    </pre>
                  )}
                  {t8NmStep === 'step2_ip_gw_dns' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`# Step 2: Give your house a Permanent Plot Number (IP), Main Estate Gate (Gateway) & Phonebook (DNS):
$ sudo nmcli connection modify enp0s3 ipv4.addresses 192.168.1.5/24
$ sudo nmcli connection modify enp0s3 ipv4.gateway 192.168.1.1
$ sudo nmcli connection modify enp0s3 ipv4.dns "8.8.8.8 8.8.4.4"

✅ Saved directly into /etc/NetworkManager/system-connections/enp0s3.nmconnection!`}
                    </pre>
                  )}
                  {t8NmStep === 'step3_method' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`# Step 3: Choose Permanent Address (manual) OR Temporary Welcome Desk Badge (auto):
$ sudo nmcli connection modify enp0s3 ipv4.method manual   # Locks in your permanent Static IP!

# (Or if you ever want to switch back to automatic DHCP:)
$ sudo nmcli connection modify enp0s3 ipv4.method auto`}
                    </pre>
                  )}
                  {t8NmStep === 'step4_restart_verify' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`# Step 4: Close & Reopen the Gate so the new Address Plate takes effect:
$ sudo nmcli connection down enp0s3 && sudo nmcli connection up enp0s3
Connection 'enp0s3' successfully activated.

$ nmcli device show enp0s3
GENERAL.DEVICE:     enp0s3
IP4.ADDRESS[1]:     192.168.1.5/24    ✅
IP4.GATEWAY:        192.168.1.1       ✅
IP4.DNS[1]:         8.8.8.8           ✅`}
                    </pre>
                  )}
                  {t8NmStep === 'nmtui_form' && (
                    <pre className="whitespace-pre-wrap leading-relaxed text-sky-200">
{`$ sudo nmtui
┌─────────────────────────┤ NetworkManager TUI ├─────────────────────────┐
│  Edit Connection: [ enp0s3                                          ]  │
│  IPv4 CONFIGURATION: <Manual>                                          │
│    Addresses: [ 192.168.1.5/24                                      ]  │
│    Gateway:   [ 192.168.1.1                                         ]  │
│    DNS:       [ 8.8.8.8, 8.8.4.4                                    ]  │
│  [X] Automatically connect                                             │
│                                              < OK >     < Cancel >     │
└────────────────────────────────────────────────────────────────────────┘
🖥️ Zero commands to memorize — just use Arrow Keys, type in the boxes, and hit Enter on <OK>!`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 8.4: TESTING NETWORK CONNECTIVITY (`ping`, `nslookup`, `dig`, `host`, `arp`)
                ================================================================= */}
            {activeSubtopicId === 'testing-network-connectivity' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-amber-400 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-amber-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 8.4
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The Network Detective Kit (`ping`, `nslookup`, `dig`, `host` & `arp -a`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Knock on Google’s door (`ping`), look up addresses in the DNS Phonebook (`nslookup`, `dig`, `host`), and inspect your Local Street Map (`arp -a`)!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'ping', cmd: 'ping -c 4 google.com', label: '✊ Door Knocker' },
                    { id: 'nslookup', cmd: 'nslookup google.com', label: '📖 Phonebook Clerk' },
                    { id: 'dig', cmd: 'dig google.com', label: '🏛️ Town Hall Deed' },
                    { id: 'host', cmd: 'host google.com', label: '⚡ Quick Lookup' },
                    { id: 'arp', cmd: 'arp -a  (or ip neigh)', label: '📣 Local Street Map' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT8TestTool(t.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t8TestTool === t.id
                          ? 'bg-amber-500 text-white border-amber-700 shadow-sm'
                          : 'bg-amber-50 hover:bg-amber-100 text-slate-900 border-amber-200'
                      }`}
                    >
                      <div className="font-mono font-black text-xs">{t.cmd}</div>
                      <div className="text-xs font-bold mt-1">{t.label}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  {t8TestTool === 'ping' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ ping -c 4 google.com
PING google.com (142.250.185.206) 56(84) bytes of data.
64 bytes from 142.250.185.206: icmp_seq=1 ttl=115 time=12.3 ms  <-- Knock #1: Answered in 12.3ms!
64 bytes from 142.250.185.206: icmp_seq=2 ttl=115 time=11.9 ms  <-- Knock #2: Answered in 11.9ms!
64 bytes from 142.250.185.206: icmp_seq=3 ttl=115 time=12.1 ms  <-- Knock #3: Answered in 12.1ms!
64 bytes from 142.250.185.206: icmp_seq=4 ttl=115 time=12.0 ms  <-- Knock #4: Answered in 12.0ms!

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms ✅`}
                    </pre>
                  )}
                  {t8TestTool === 'nslookup' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ nslookup google.com
Server:         8.8.8.8
Address:        8.8.8.8#53        <-- Asked the Google Public Phonebook (Port 53)

Non-authoritative answer:
Name:   google.com
Address: 142.250.185.206          <-- 📖 Found Google's IPv4 Plot Number!
Name:   google.com
Address: 2a00:1450:4001:82f::200e <-- 📖 Found Google's IPv6 Futuristic Plot Number!`}
                    </pre>
                  )}
                  {t8TestTool === 'dig' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ dig google.com
;; QUESTION SECTION:
;google.com.                    IN      A

;; ANSWER SECTION:
google.com.             300     IN      A       142.250.185.206   <-- 🏛️ Official A-Record + 300s Cache TTL

;; Query time: 14 msec
;; SERVER: 8.8.8.8#53(8.8.8.8) (UDP)
💡 Tip: Run 'dig +short google.com' when you just want the clean IP number by itself!`}
                    </pre>
                  )}
                  {t8TestTool === 'host' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ host google.com
google.com has address 142.250.185.206
google.com has IPv6 address 2a00:1450:4001:82f::200e
google.com mail is handled by 10 smtp.google.com.`}
                    </pre>
                  )}
                  {t8TestTool === 'arp' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ arp -a
_gateway (192.168.1.1) at 00:11:22:33:44:55 [ether] on enp0s3   <-- 🚧 Main Estate Router Gate
alice-laptop (192.168.1.2) at aa:bb:cc:11:22:33 [ether] on enp0s3 <-- 💻 Neighbor Alice's MAC Plate
bob-phone (192.168.1.3) at dd:ee:ff:44:55:66 [ether] on enp0s3    <-- 📱 Neighbor Bob's MAC Plate

$ ip neigh
192.168.1.1 dev enp0s3 lladdr 00:11:22:33:44:55 REACHABLE
📣 Matches every neighbor's Local IP Plot Number to their permanent MAC Vehicle Number Plate!`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 8.5: MONITORING NETWORK CONNECTIONS (`netstat`, `tcpdump`, `iftop`)
                ================================================================= */}
            {activeSubtopicId === 'monitoring-network-connections' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-rose-400 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-rose-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 8.5
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The House Security Monitor (`netstat -tulnp`, `tcpdump` & `iftop`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      See which service doors (ports) are open, whether visitors came by tracked TCP Van or fast UDP Boda-Boda, and inspect live packets at the gate!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    {
                      id: 'netstat_tulnp',
                      cmd: 'sudo netstat -tulnp',
                      label: '📺 Open Doors & Programs'
                    },
                    {
                      id: 'netstat_states',
                      cmd: 'netstat -ant',
                      label: '🤝 LISTEN vs ESTABLISHED'
                    },
                    {
                      id: 'tcpdump',
                      cmd: 'sudo tcpdump -i enp0s3 -n',
                      label: '📹 Gate Packet Camera'
                    },
                    {
                      id: 'iftop',
                      cmd: 'sudo iftop -i enp0s3',
                      label: '💧 Live Bandwidth Meter'
                    }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT8MonitorTool(m.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t8MonitorTool === m.id
                          ? 'bg-rose-600 text-white border-rose-800 shadow-sm'
                          : 'bg-rose-50 hover:bg-rose-100 text-slate-900 border-rose-200'
                      }`}
                    >
                      <div className="font-mono font-black text-xs">{m.cmd}</div>
                      <div className="text-xs font-bold mt-1">{m.label}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  {t8MonitorTool === 'netstat_tulnp' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo netstat -tulnp
Proto Local Address     Foreign Address   State    PID/Program name
tcp   0.0.0.0:80        0.0.0.0:*         LISTEN   1120/nginx          <-- 🚐 TCP Front Web Door (:80)
tcp   0.0.0.0:22        0.0.0.0:*         LISTEN   894/sshd            <-- 🚐 TCP Side SSH Door (:22)
udp   127.0.0.1:53      0.0.0.0:*         LISTEN   750/systemd-resolve <-- 🛵 UDP DNS Phonebook (:53)

🔑 Flag Decoder: -t (TCP Vans) | -u (UDP Bikes) | -l (Listening Doors) | -n (Numbers) | -p (Program/PID)`}
                    </pre>
                  )}
                  {t8MonitorTool === 'netstat_states' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ netstat -ant
Proto Local Address        Foreign Address       State
tcp   0.0.0.0:22           0.0.0.0:*             LISTEN       <-- 🟢 Door unlocked, waiting for guests
tcp   192.168.1.5:22       192.168.1.2:54321     ESTABLISHED  <-- 🤝 Neighbor Alice is actively inside SSH!
tcp   192.168.1.5:80       203.0.113.9:49100     TIME_WAIT    <-- ⏳ Web visitor said goodbye, closing door`}
                    </pre>
                  )}
                  {t8MonitorTool === 'tcpdump' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo tcpdump -i enp0s3 -n port 80 -c 3
tcpdump: verbose output suppressed, listening on enp0s3
14:20:01.102 IP 192.168.1.2.51234 > 192.168.1.5.80: Flags [S], seq 1001       <-- 1️⃣ TCP Handshake SYN ("Sasa?")
14:20:01.103 IP 192.168.1.5.80 > 192.168.1.2.51234: Flags [S.], seq 500, ack 1002 <-- 2️⃣ SYN-ACK ("Poa, twende!")
14:20:01.104 IP 192.168.1.2.51234 > 192.168.1.5.80: Flags [.], ack 1          <-- 3️⃣ ACK ("Connected!")
3 packets captured right at the front gate!`}
                    </pre>
                  )}
                  {t8MonitorTool === 'iftop' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo iftop -i enp0s3
192.168.1.5  <=>  142.250.185.206 (google.com)       12.4Mb   10.8Mb   11.2Mb
192.168.1.5  <=>  192.168.1.2     (alice-laptop)      1.2Mb    950Kb    1.0Mb
--------------------------------------------------------------------------------
TX (Sent):     13.6Mb peak | RX (Received): 11.7Mb peak | TOTAL: 25.3Mb
💧 Shows live pipe usage so you immediately spot who is hogging the bandwidth!`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 8.6: INSPECTING SOCKET STATISTICS (`ss`)
                ================================================================= */}
            {activeSubtopicId === 'inspecting-socket-statistics' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-purple-400 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-purple-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-purple-900 bg-purple-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 8.6
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The High-Speed Kernel Socket Scanner (`ss -tulnp`, `ss -s` & Socket Filter Lab)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Query the Linux Kernel directly with `ss` to inspect public (`0.0.0.0`) vs. private (`127.0.0.1`) sockets, view instant summaries (`ss -s`), and filter active connections!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'ss_tulnp', cmd: 'sudo ss -tulnp', label: '⚡ All Listening Sockets' },
                    { id: 'ss_summary', cmd: 'ss -s', label: '📊 Instant Scoreboard' },
                    { id: 'ss_estab', cmd: 'ss -t state established', label: '🤝 Active Chats Only' },
                    { id: 'ss_port22', cmd: 'ss -tuln sport = :22', label: '🔑 Check Port 22 SSH' },
                    { id: 'ss_vs_netstat', cmd: 'ss vs netstat', label: '🚀 Why ss is 10x Faster' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT8SsOption(item.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t8SsOption === item.id
                          ? 'bg-purple-600 text-white border-purple-800 shadow-sm'
                          : 'bg-purple-50 hover:bg-purple-100 text-slate-900 border-purple-200'
                      }`}
                    >
                      <div className="font-mono font-black text-xs">{item.cmd}</div>
                      <div className="text-xs font-bold mt-1">{item.label}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  {t8SsOption === 'ss_tulnp' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo ss -tulnp
Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process
tcp   LISTEN 0      511    0.0.0.0:80          0.0.0.0:*         users:(("nginx",pid=1120,fd=6))  <-- 🌍 Public Street Counter
tcp   LISTEN 0      128    0.0.0.0:22          0.0.0.0:*         users:(("sshd",pid=894,fd=3))    <-- 🌍 Public SSH Door
tcp   LISTEN 0      70     127.0.0.1:3306      0.0.0.0:*         users:(("mysqld",pid=1402,fd=21))<-- 🏠 Family-Only Database!
udp   UNCONN 0      0      127.0.0.53%lo:53    0.0.0.0:*         users:(("systemd-resolve",pid=750))`}
                    </pre>
                  )}
                  {t8SsOption === 'ss_summary' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ ss -s
Total: 184
TCP:   48 (estab 42, closed 4, orphaned 0, timewait 4)

Transport Total     IP        IPv6
RAW       1         0         1
UDP       12        8         4
TCP       44        39        5
📊 Instant 1-millisecond health check of every socket in your house!`}
                    </pre>
                  )}
                  {t8SsOption === 'ss_estab' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ ss -t state established
Recv-Q Send-Q   Local Address:Port      Peer Address:Port
0      0        192.168.1.5:ssh         192.168.1.2:54321     <-- Alice connected to SSH!
0      0        192.168.1.5:48910       142.250.185.206:https <-- Sam browsing Google over HTTPS!`}
                    </pre>
                  )}
                  {t8SsOption === 'ss_port22' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ ss -tuln sport = :22
Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port
tcp    LISTEN  0       128      0.0.0.0:22           0.0.0.0:*
tcp    LISTEN  0       128      [::]:22              [::]:*
🔑 Pinpoint filter: Confirms Port 22 (SSH) is open on both IPv4 and IPv6!`}
                    </pre>
                  )}
                  {t8SsOption === 'ss_vs_netstat' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`# 🚀 WHY 'ss' REPLACED 'netstat' IN MODERN LINUX:
• netstat (Old net-tools): Slowly reads text files inside /proc/net/tcp line by line.
• ss      (Modern iproute2): Uses 'netlink' to query the Linux Kernel memory directly!
• Bonus:  'ss -tulnp' uses the exact same flags you already know from 'netstat -tulnp'!`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 8.7: TRACING NETWORK ROUTES (`traceroute`, `tracepath`, `mtr`, `ip route`)
                ================================================================= */}
            {activeSubtopicId === 'tracing-network-routes' && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-teal-400 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-teal-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-teal-900 bg-teal-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 8.7
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The Matatu Stage Hop Tracker & Road Map (`ip route`, `traceroute`, `tracepath` & `mtr`)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Check your local road map (`ip route`), then track a package hop-by-hop across every highway junction (`traceroute`, `tracepath`, `mtr`) to spot roadblocks!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'ip_route', cmd: 'ip route  (or route -n)', label: '🪧 House Road Map' },
                    { id: 'traceroute_ok', cmd: 'traceroute google.com', label: '🚌 5-Stage Clear Route' },
                    { id: 'traceroute_block', cmd: 'traceroute (Roadblock)', label: '🚧 Spot the * * * Jam' },
                    { id: 'tracepath', cmd: 'tracepath google.com', label: '📏 Check MTU Width' },
                    { id: 'mtr', cmd: 'mtr --report google.com', label: '🚁 Live Loss% Tracker' }
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        sounds.playSuccess();
                        setT8RouteTool(r.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        t8RouteTool === r.id
                          ? 'bg-teal-600 text-white border-teal-800 shadow-sm'
                          : 'bg-teal-50 hover:bg-teal-100 text-slate-900 border-teal-200'
                      }`}
                    >
                      <div className="font-mono font-black text-xs">{r.cmd}</div>
                      <div className="text-xs font-bold mt-1">{r.label}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                  {t8RouteTool === 'ip_route' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ ip route show
default via 192.168.1.1 dev enp0s3 proto static metric 100   <-- 🚧 Default Gateway (All Other Towns -> Main Gate!)
192.168.1.0/24 dev enp0s3 proto kernel scope link src 192.168.1.5 <-- 🏘️ Local Street Neighbors (Stay in compound!)

$ route -n
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG    100    0        0 enp0s3
192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 enp0s3`}
                    </pre>
                  )}
                  {t8RouteTool === 'traceroute_ok' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ traceroute google.com
traceroute to google.com (142.250.185.206), 30 hops max, 60 byte packets
 1  _gateway (192.168.1.1)         1.8 ms   1.6 ms   1.5 ms   <-- 🏠 Stage 1: Home Router Gate
 2  10.20.0.1 (10.20.0.1)          5.4 ms   5.1 ms   5.3 ms   <-- 🏘️ Stage 2: Estate Fiber Box
 3  nbo-core-01.isp.ke (197.248.1.1) 9.8 ms 9.5 ms   9.7 ms   <-- 🏙️ Stage 3: Nairobi Central Exchange
 4  72.14.237.14 (72.14.237.14)   11.9 ms  12.1 ms  11.8 ms   <-- 🌐 Stage 4: Google Edge Peering
 5  142.250.185.206               12.3 ms  12.0 ms  12.1 ms   <-- 🎯 Stage 5: Arrived at Google!`}
                    </pre>
                  )}
                  {t8RouteTool === 'traceroute_block' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ traceroute broken-site.com
traceroute to broken-site.com (198.51.100.42), 30 hops max
 1  _gateway (192.168.1.1)         1.9 ms   1.7 ms   1.6 ms   <-- ✅ Home Gate is fine!
 2  10.20.0.1 (10.20.0.1)          5.6 ms   5.4 ms   5.5 ms   <-- ✅ Estate Fiber Box is fine!
 3  * * *                                                     <-- 🚨 Hop 3 Timed Out (Roadblock / Firewall Drop!)
 4  * * *
💡 Detective Verdict: Your home Wi-Fi and router (Hop 1) are innocent—the roadblock is out at Hop 3!`}
                    </pre>
                  )}
                  {t8RouteTool === 'tracepath' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ tracepath google.com
 1?: [LOCALHOST]                      pmtu 1500               <-- 📏 Parcel Width Limit (MTU) = 1500 bytes
 1:  _gateway                                              1.842ms
 2:  10.20.0.1                                             5.310ms
 3:  142.250.185.206                                      12.290ms reached
     Resume: pmtu 1500 hops 3 back 3 ✅ (No sudo needed!)`}
                    </pre>
                  )}
                  {t8RouteTool === 'mtr' && (
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ mtr --report --report-cycles 5 google.com
HOST: Sam-Cozy-Boma               Loss%   Snt   Last   Avg  Best  Wrst StDev
  1.|-- _gateway                   0.0%     5    1.8   1.7   1.5   2.0   0.2
  2.|-- 10.20.0.1                  0.0%     5    5.3   5.2   5.0   5.5   0.2
  3.|-- nbo-core-01.isp.ke         0.0%     5    9.7   9.6   9.4   9.9   0.2
  4.|-- 142.250.185.206            0.0%     5   12.1  12.1  11.9  12.3   0.1
🚁 Live Helicopter Report: Combines ping + traceroute to show exact Packet Loss% at every hop!`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================
                TOYBOX 9.1: DHCP — DORA WELCOME DESK
                ================================================================= */}
            {activeSubtopicId === 'dhcp-service' && (() => {
              const doraSteps = [
                {
                  letter: 'D',
                  name: 'Discover',
                  from: '💻 New Laptop',
                  to: '📢 Everyone (Broadcast)',
                  bubble: '“Hodi! Is there a DHCP gatekeeper here? I need an address!”',
                  tech: 'DHCPDISCOVER  src 0.0.0.0:68 → dst 255.255.255.255:67 (MAC 08:00:27:ab:cd:ef)'
                },
                {
                  letter: 'O',
                  name: 'Offer',
                  from: '🛎️ DHCP Server',
                  to: '💻 New Laptop',
                  bubble: '“Karibu! You can have 192.168.1.105, gate 192.168.1.1, phonebook 8.8.8.8—for 24 hours.”',
                  tech: 'DHCPOFFER  yiaddr 192.168.1.105  router 192.168.1.1  dns 8.8.8.8  lease 86400s'
                },
                {
                  letter: 'R',
                  name: 'Request',
                  from: '💻 New Laptop',
                  to: '📢 Everyone (Broadcast)',
                  bubble: '“Asante! I officially request 192.168.1.105 please!”',
                  tech: 'DHCPREQUEST  requested-ip 192.168.1.105  server-id 192.168.1.1'
                },
                {
                  letter: 'A',
                  name: 'Acknowledge',
                  from: '🛎️ DHCP Server',
                  to: '💻 New Laptop',
                  bubble: '“Imeandikwa! 192.168.1.105 is yours until tomorrow. Welcome to the network!” 🎉',
                  tech: 'DHCPACK  192.168.1.105 bound to 08:00:27:ab:cd:ef — renewal (T1) in 12h'
                }
              ];
              return (
                <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-sky-400 shadow-md space-y-5">
                  <div className="border-b-2 border-sky-100 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-sky-900 bg-sky-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 9.1
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The DORA Welcome Desk — Get Your Laptop an Address!
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Tap “Next Step” to walk a brand-new laptop through all 4 DHCP steps, then explore the real Linux commands below.
                    </p>
                  </div>

                  {/* DORA progress letters */}
                  <div className="grid grid-cols-4 gap-2">
                    {doraSteps.map((s, i) => (
                      <div
                        key={s.letter}
                        className={`rounded-2xl p-3 text-center border-2 transition-all ${
                          t9DoraStep > i
                            ? 'bg-sky-600 text-white border-sky-800 scale-105 shadow-sm'
                            : 'bg-sky-50 text-sky-900 border-sky-200'
                        }`}
                      >
                        <div className="text-2xl sm:text-3xl font-black">{s.letter}</div>
                        <div className="text-[11px] sm:text-xs font-bold">{s.name}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-sky-50/70 rounded-2xl p-4 border-2 border-sky-200 min-h-[120px] flex flex-col justify-center">
                    {t9DoraStep === 0 ? (
                      <p className="text-sm font-bold text-slate-700 text-center">
                        💻 A new laptop just joined the Wi-Fi with address <span className="font-mono">0.0.0.0</span> (no badge yet!). Tap <b>Next Step</b> to begin.
                      </p>
                    ) : (
                      (() => {
                        const s = doraSteps[t9DoraStep - 1];
                        return (
                          <div className="space-y-2">
                            <div className="text-xs font-black text-sky-900">
                              Step {t9DoraStep}: {s.name} — {s.from} ➡️ {s.to}
                            </div>
                            <div className="bg-white rounded-2xl p-3 border-2 border-sky-200 text-sm sm:text-base font-extrabold text-slate-800">
                              💬 {s.bubble}
                            </div>
                            <div className="font-mono text-[11px] sm:text-xs text-slate-600">{s.tech}</div>
                          </div>
                        );
                      })()
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        if (t9DoraStep < 4) {
                          const next = t9DoraStep + 1;
                          setT9DoraStep(next);
                          if (next === 4) {
                            sounds.playSuccess();
                            confetti({ particleCount: 50, spread: 65, origin: { y: 0.7 } });
                          } else {
                            sounds.playPop();
                          }
                        }
                      }}
                      disabled={t9DoraStep >= 4}
                      className="px-4 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-black text-sm shadow-sm"
                    >
                      {t9DoraStep >= 4 ? '✅ Address Received!' : '➡️ Next Step'}
                    </button>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setT9DoraStep(0);
                      }}
                      className="px-4 py-2.5 rounded-2xl bg-white hover:bg-sky-50 text-sky-900 border-2 border-sky-300 font-black text-sm"
                    >
                      🔄 Start Again
                    </button>
                  </div>

                  {/* Linux DHCP tools */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'client', cmd: 'sudo dhclient -r / -v', label: '💻 Client: Release & Renew' },
                      { id: 'server', cmd: '/etc/dhcp/dhcpd.conf', label: '🛎️ Server: Key Hook Board' },
                      { id: 'leases', cmd: 'dhcpd.leases', label: '📒 Server Logbook' },
                      { id: 'apipa', cmd: '169.254.x.x', label: '😕 No Reception (APIPA)' }
                    ].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          sounds.playSuccess();
                          setT9DhcpView(v.id);
                        }}
                        className={`p-3 rounded-2xl border-2 text-left transition-all ${
                          t9DhcpView === v.id
                            ? 'bg-sky-600 text-white border-sky-800 shadow-sm'
                            : 'bg-sky-50 hover:bg-sky-100 text-slate-900 border-sky-200'
                        }`}
                      >
                        <div className="font-mono font-black text-xs">{v.cmd}</div>
                        <div className="text-xs font-bold mt-1">{v.label}</div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                    <pre className="whitespace-pre-wrap leading-relaxed">
                      {t9DhcpView === 'client' &&
                        `# 💻 On the client: hand back your badge, then ask for a fresh one
$ sudo dhclient -r enp0s3          # Release the current lease (return the key)
$ sudo dhclient -v enp0s3          # Run DORA again (verbose shows each step)
DHCPDISCOVER on enp0s3 to 255.255.255.255 port 67
DHCPOFFER of 192.168.1.105 from 192.168.1.1
DHCPREQUEST for 192.168.1.105 on enp0s3
DHCPACK of 192.168.1.105 from 192.168.1.1
bound to 192.168.1.105 -- renewal in 43200 seconds.

# NetworkManager way (from Topic 8.3):
$ sudo nmcli connection modify enp0s3 ipv4.method auto && sudo nmcli con up enp0s3`}
                      {t9DhcpView === 'server' &&
                        `# 🛎️ On a Linux DHCP server (isc-dhcp-server):
$ sudo apt install isc-dhcp-server
$ sudo nano /etc/dhcp/dhcpd.conf

subnet 192.168.1.0 netmask 255.255.255.0 {
  range 192.168.1.100 192.168.1.200;        # 🪝 Key hook board (the pool)
  option routers 192.168.1.1;               # 🚧 Main gate (Default Gateway)
  option domain-name-servers 8.8.8.8;       # 📖 Phonebook (DNS)
  default-lease-time 86400;                 # ⏳ 24-hour lease
}
host office-printer {                        # 🏷️ Reservation: same key every time
  hardware ethernet 00:1a:2b:3c:4d:5e;
  fixed-address 192.168.1.50;
}

$ sudo systemctl restart isc-dhcp-server && sudo systemctl enable isc-dhcp-server`}
                      {t9DhcpView === 'leases' &&
                        `# 📒 The gatekeeper's logbook of who borrowed which key:
$ cat /var/lib/dhcp/dhcpd.leases
lease 192.168.1.105 {
  starts 2 2026/11/10 08:00:00;
  ends   3 2026/11/11 08:00:00;
  binding state active;
  hardware ethernet 08:00:27:ab:cd:ef;
  client-hostname "sams-laptop";
}`}
                      {t9DhcpView === 'apipa' &&
                        `# 😕 When NO DHCP server answers the Discover shout:
$ ip a show enp0s3
    inet 169.254.37.12/16 scope link enp0s3   <-- Self-made paper badge!

🩺 Diagnosis: "169.254.x.x" = DHCP server unreachable.
✅ Check: Is the cable/Wi-Fi connected? Is the DHCP server running?
   $ sudo systemctl status isc-dhcp-server
   Is a router relay needed for another subnet (DHCP Relay / ip helper)?`}
                    </pre>
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 9.2: DNS — THE NAME LOOKUP JOURNEY
                ================================================================= */}
            {activeSubtopicId === 'dns-service' && (() => {
              const dnsJourney = [
                {
                  who: '📝 /etc/hosts (Fridge Sticky Notes)',
                  q: 'Do I already have www.google.com written down?',
                  a: '❌ Not here. (Only "127.0.0.1 localhost" and "192.168.1.50 printer".)'
                },
                {
                  who: '🧠 Local Cache (Memory)',
                  q: 'Did I look this up recently?',
                  a: '❌ No fresh sticky note (TTL expired). Must ask the librarian.'
                },
                {
                  who: '👩‍🏫 Resolver 8.8.8.8 (from /etc/resolv.conf)',
                  q: 'Librarian, please find www.google.com for me!',
                  a: '👍 “Sawa, I’ll do the running around for you.”'
                },
                {
                  who: '🏛️ Root Server ( . )',
                  q: 'Who handles .com names?',
                  a: '➡️ “Go ask the .com TLD servers (a.gtld-servers.net).”'
                },
                {
                  who: '🗂️ TLD Server ( .com )',
                  q: 'Who handles google.com?',
                  a: '➡️ “Google’s own record keepers: ns1.google.com.”'
                },
                {
                  who: '🏢 Authoritative Server (ns1.google.com)',
                  q: 'What is the address of www.google.com?',
                  a: '✅ “www.google.com = 142.251.42.78 (TTL 300s).” Saved to cache & returned! 🎉'
                }
              ];
              const records = {
                A: `$ dig +short google.com A\n142.251.42.78            <-- Name → IPv4 house number`,
                AAAA: `$ dig +short google.com AAAA\n2a00:1450:4001:82f::200e <-- Name → IPv6 house number`,
                CNAME: `$ dig +short www.github.com CNAME\ngithub.com.              <-- Nickname pointing to the real name`,
                MX: `$ dig +short gmail.com MX\n5 gmail-smtp-in.l.google.com.   <-- Where to deliver email (lower number = first choice)`,
                NS: `$ dig +short google.com NS\nns1.google.com.\nns2.google.com.          <-- Who is in charge of this name`,
                PTR: `$ dig +short -x 8.8.8.8\ndns.google.               <-- Reverse lookup: number → name`,
                TXT: `$ dig +short google.com TXT\n"v=spf1 include:_spf.google.com ~all"   <-- Notes & verification text`
              };
              return (
                <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-amber-400 shadow-md space-y-5">
                  <div className="border-b-2 border-amber-100 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 9.2
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Follow the Librarian! The 6-Stop DNS Lookup Journey
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Sam types <span className="font-mono">www.google.com</span>. Tap “Next Stop” to watch the name turn into a number, then explore the phonebook entry types.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {dnsJourney.map((stop, i) => {
                      const shown = t9DnsStep > i;
                      const current = t9DnsStep === i + 1;
                      return (
                        <div
                          key={i}
                          className={`rounded-2xl p-3 border-2 transition-all ${
                            current
                              ? 'bg-amber-100 border-amber-500 shadow-sm'
                              : shown
                              ? 'bg-amber-50/70 border-amber-200'
                              : 'bg-slate-50 border-slate-200 opacity-50'
                          }`}
                        >
                          <div className="text-xs sm:text-sm font-black text-slate-900">
                            Stop {i + 1}: {stop.who}
                          </div>
                          {shown && (
                            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1 space-y-0.5">
                              <div>❓ {stop.q}</div>
                              <div>💬 {stop.a}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        if (t9DnsStep < dnsJourney.length) {
                          const next = t9DnsStep + 1;
                          setT9DnsStep(next);
                          if (next === dnsJourney.length) {
                            sounds.playSuccess();
                            confetti({ particleCount: 50, spread: 65, origin: { y: 0.7 } });
                          } else {
                            sounds.playPop();
                          }
                        }
                      }}
                      disabled={t9DnsStep >= dnsJourney.length}
                      className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-black text-sm shadow-sm"
                    >
                      {t9DnsStep >= dnsJourney.length ? '✅ Name Resolved!' : '➡️ Next Stop'}
                    </button>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setT9DnsStep(0);
                      }}
                      className="px-4 py-2.5 rounded-2xl bg-white hover:bg-amber-50 text-amber-900 border-2 border-amber-300 font-black text-sm"
                    >
                      🔄 Look Up Again
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                      📇 Phonebook Entry Types (DNS Records) — tap one:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(records).map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            sounds.playPop();
                            setT9DnsRecord(r);
                          }}
                          className={`px-3.5 py-2 rounded-xl border-2 font-mono font-black text-xs transition-all ${
                            t9DnsRecord === r
                              ? 'bg-amber-500 text-white border-amber-700'
                              : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-200'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`${records[t9DnsRecord]}

# 🐧 Handy Linux DNS files & tools:
$ cat /etc/hosts            # Your own sticky notes (checked first)
$ cat /etc/resolv.conf      # Which librarian (resolver) to ask, e.g. nameserver 8.8.8.8
$ resolvectl status         # systemd-resolved: current DNS servers per interface
$ resolvectl flush-caches   # Throw away old sticky notes
$ sudo apt install bind9    # Run your OWN DNS server (named) with zone files`}
                    </pre>
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 9.3: FTP — THE DELIVERY TRUCK SESSION
                ================================================================= */}
            {activeSubtopicId === 'ftp-service' && (() => {
              const ftpCmds = [
                {
                  id: 'open',
                  label: '☎️ open',
                  needsConn: false,
                  lines: [
                    'ftp> open files.cozyhouse.ke',
                    'Connected to files.cozyhouse.ke (Port 21 – Control lane).',
                    '220 (vsFTPd 3.0.5)',
                    'Name: sam',
                    '331 Please specify the password.',
                    'Password: ********',
                    '230 Login successful. ✅'
                  ]
                },
                {
                  id: 'ls',
                  label: '👀 ls',
                  needsConn: true,
                  lines: [
                    'ftp> ls',
                    '227 Entering Passive Mode (192,168,1,20,195,80) → data lane opened on port 50000',
                    '-rw-r--r--  1 sam  sam   2.1M  report.pdf',
                    '-rw-r--r--  1 sam  sam   4.3M  mombasa_trip.jpg',
                    'drwxr-xr-x  2 sam  sam   4096  backups'
                  ]
                },
                {
                  id: 'cd',
                  label: '🚶 cd backups',
                  needsConn: true,
                  lines: ['ftp> cd backups', '250 Directory successfully changed.']
                },
                {
                  id: 'binary',
                  label: '📦 binary',
                  needsConn: true,
                  lines: ['ftp> binary', '200 Switching to Binary mode. (Sealed boxes for images/zips!)']
                },
                {
                  id: 'get',
                  label: '⬇️ get report.pdf',
                  needsConn: true,
                  lines: [
                    'ftp> get report.pdf',
                    '150 Opening BINARY mode data connection for report.pdf (2.1 MB).',
                    '226 Transfer complete. ⬇️ Box delivered to your house!'
                  ]
                },
                {
                  id: 'put',
                  label: '⬆️ put chapati.txt',
                  needsConn: true,
                  lines: [
                    'ftp> put chapati_recipe.txt',
                    '150 Ok to send data.',
                    '226 Transfer complete. ⬆️ Box sent to the warehouse!'
                  ]
                },
                {
                  id: 'mget',
                  label: '🧺 mget *.jpg',
                  needsConn: true,
                  lines: [
                    'ftp> mget *.jpg',
                    'mget mombasa_trip.jpg? y',
                    '226 Transfer complete. 🧺 Many boxes at once!'
                  ]
                },
                {
                  id: 'bye',
                  label: '👋 bye',
                  needsConn: true,
                  lines: ['ftp> bye', '221 Goodbye. (Control lane on Port 21 closed.)']
                }
              ];
              return (
                <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-rose-400 shadow-md space-y-5">
                  <div className="border-b-2 border-rose-100 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 9.3
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Drive the FTP Delivery Truck — Then Compare It With the Sealed SFTP Van!
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Start with <span className="font-mono">open</span>, then browse, download (get), and upload (put) boxes. No wrong moves—just explore!
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-black">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        t9FtpConnected ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {t9FtpConnected ? '🟢 Connected to warehouse (Port 21)' : '⚪ Not connected yet'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {ftpCmds.map((c) => {
                      const disabled = c.needsConn ? !t9FtpConnected : t9FtpConnected;
                      return (
                        <button
                          key={c.id}
                          disabled={disabled}
                          onClick={() => {
                            if (c.id === 'open') setT9FtpConnected(true);
                            if (c.id === 'bye') setT9FtpConnected(false);
                            if (c.id === 'get' || c.id === 'put' || c.id === 'mget') {
                              sounds.playSuccess();
                            } else {
                              sounds.playPop();
                            }
                            setT9FtpLog((prev) =>
                              [...(c.id === 'open' ? [] : prev), ...c.lines].slice(-22)
                            );
                          }}
                          className={`p-3 rounded-2xl border-2 text-left font-mono font-black text-xs transition-all ${
                            disabled
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                              : 'bg-rose-50 hover:bg-rose-100 text-slate-900 border-rose-200'
                          }`}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm min-h-[140px]">
                    <pre className="whitespace-pre-wrap leading-relaxed">{t9FtpLog.join('\n')}</pre>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                      🔐 What can a nosy stranger on the road see? (packet capture view)
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          sounds.playPop();
                          setT9FtpSecureView('ftp');
                        }}
                        className={`p-3 rounded-2xl border-2 text-left transition-all ${
                          t9FtpSecureView === 'ftp'
                            ? 'bg-rose-600 text-white border-rose-800'
                            : 'bg-rose-50 hover:bg-rose-100 text-slate-900 border-rose-200'
                        }`}
                      >
                        <div className="font-black text-xs sm:text-sm">🛻 Plain FTP (Port 21)</div>
                        <div className="text-xs mt-1 opacity-90">Open pickup truck</div>
                      </button>
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setT9FtpSecureView('sftp');
                        }}
                        className={`p-3 rounded-2xl border-2 text-left transition-all ${
                          t9FtpSecureView === 'sftp'
                            ? 'bg-emerald-600 text-white border-emerald-800'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-slate-900 border-emerald-200'
                        }`}
                      >
                        <div className="font-black text-xs sm:text-sm">🔐 SFTP / scp (SSH Port 22)</div>
                        <div className="text-xs mt-1 opacity-90">Sealed G4S van</div>
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                    <pre className="whitespace-pre-wrap leading-relaxed">
                      {t9FtpSecureView === 'ftp'
                        ? `$ sudo tcpdump -A -i enp0s3 port 21
USER sam
PASS chapati2026        <-- 😱 Password readable by anyone on the road!
RETR report.pdf

⚠️ Plain FTP sends usernames, passwords, and files as readable text.
Server setup (only for trusted/internal use): sudo apt install vsftpd
  /etc/vsftpd.conf → anonymous_enable=NO, local_enable=YES, write_enable=YES`
                        : `$ sudo tcpdump -A -i enp0s3 port 22
..k8$Fq@#..z!Lp0^w..Rt%..   <-- 🔐 Scrambled! Nobody can read your password or files.

✅ Same jobs, sealed van:
$ sftp sam@files.cozyhouse.ke      # interactive: ls, cd, get, put, bye (just like ftp!)
$ scp report.pdf sam@files.cozyhouse.ke:/home/sam/   # one-line copy
$ lftp -u sam ftps://files.cozyhouse.ke             # FTPS = FTP wrapped in TLS`}
                    </pre>
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 10.1: LINUX FIREWALL — PACKET INSPECTOR SIMULATOR
                ================================================================= */}
            {activeSubtopicId === 'linux-firewall-overview' && (() => {
              const packetScenarios = {
                ssh_allowed: {
                  title: '🔑 Alice (Remote Worker) SSH to Port 22',
                  src: '192.168.1.5',
                  dst: 'Your Server (Port 22)',
                  proto: 'TCP',
                  state: 'NEW',
                  verdict: '✅ ACCEPT',
                  badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
                  story: '“Alice’s laptop knocks on the SSH door (Port 22). The guard checks the guest list: Alice is an authorized remote worker. Barrier lifts!”'
                },
                web_allowed: {
                  title: '🌐 Web Visitor (Customer) to Port 80',
                  src: '41.89.20.10',
                  dst: 'Your Server (Port 80)',
                  proto: 'TCP',
                  state: 'NEW',
                  verdict: '✅ ACCEPT',
                  badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
                  story: '“A customer arrives at the front shop entrance (Port 80 HTTP). The store is open for business. Welcome in!”'
                },
                hacker_blocked: {
                  title: '🚨 Intruder (Mr. X) Scanning Port 4444',
                  src: '192.168.52.1',
                  dst: 'Your Server (Port 4444)',
                  proto: 'TCP',
                  state: 'NEW',
                  verdict: '❌ DROP (Black Hole)',
                  badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
                  story: '“A suspicious stranger tries to wiggle a closed window. Rule says DROP: the guard ignores them completely. Mr. X gets zero response and connection times out!”'
                },
                established: {
                  title: '🧠 Stateful Return Packet from Google',
                  src: '142.251.42.78',
                  dst: 'Your Server (High Port 54321)',
                  proto: 'TCP',
                  state: 'ESTABLISHED / RELATED',
                  verdict: '✅ ACCEPT (Stateful)',
                  badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
                  story: '“Google delivers web images you requested 2 seconds ago. Because the firewall remembers you initiated this connection, it waves the response through automatically!”'
                }
              };

              const currentScenario = packetScenarios[t10PacketType];

              return (
                <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-red-400 shadow-md space-y-5">
                  <div className="border-b-2 border-red-100 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-red-900 bg-red-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 10.1
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The Gate Packet Inspector — Test Visitors at the Barrier!
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Tap different incoming visitor packets to watch how the firewall checks Source IP, Destination Port, Protocol, and Connection State!
                    </p>
                  </div>

                  {/* Scenario selection buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {Object.entries(packetScenarios).map(([key, item]) => (
                      <button
                        key={key}
                        onClick={() => {
                          sounds.playPop();
                          setT10PacketType(key);
                        }}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                          t10PacketType === key
                            ? 'bg-red-600 text-white border-red-800 shadow-sm'
                            : 'bg-red-50 hover:bg-red-100 text-slate-900 border-red-200'
                        }`}
                      >
                        <div className="font-black text-xs sm:text-sm">{item.title}</div>
                      </button>
                    ))}
                  </div>

                  {/* Packet details card */}
                  <div className="bg-red-50/70 rounded-2xl p-4 border-2 border-red-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-200 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-red-950">
                        Packet Inspection Tag:
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-black border ${currentScenario.badgeColor}`}>
                        Verdict: {currentScenario.verdict}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-red-200">
                        <div className="text-[10px] font-black uppercase text-slate-500">Source IP</div>
                        <div className="font-mono font-bold text-slate-900">{currentScenario.src}</div>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-red-200">
                        <div className="text-[10px] font-black uppercase text-slate-500">Destination Door</div>
                        <div className="font-mono font-bold text-slate-900">{currentScenario.dst}</div>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-red-200">
                        <div className="text-[10px] font-black uppercase text-slate-500">Vehicle (Protocol)</div>
                        <div className="font-mono font-bold text-slate-900">{currentScenario.proto}</div>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-red-200">
                        <div className="text-[10px] font-black uppercase text-slate-500">Connection State</div>
                        <div className="font-mono font-bold text-slate-900">{currentScenario.state}</div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-3 border border-red-200 text-xs sm:text-sm font-bold text-slate-800">
                      💂‍♂️ Gatekeeper Decision: {currentScenario.story}
                    </div>
                  </div>

                  <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`# 🛡️ Stateful Inspection Rule in Linux:
$ sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
$ sudo iptables -A INPUT -p tcp --dport 22 -s 192.168.1.5 -j ACCEPT
$ sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
$ sudo iptables -A INPUT -s 192.168.52.1 -j DROP
$ sudo iptables -P INPUT DROP   # 🔒 Default Deny: everything else is blocked!`}
                    </pre>
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 10.2: SETTING UP FIREWALLS (3 MANAGERS)
                ================================================================= */}
            {activeSubtopicId === 'setting-up-firewalls' && (() => {
              const managers = {
                ufw: {
                  name: 'UFW (Uncomplicated Firewall)',
                  badge: 'Beginner & Ubuntu/Debian Favorite',
                  install: 'sudo apt install ufw',
                  enable: 'sudo ufw enable',
                  status: 'sudo ufw status verbose',
                  sampleRule: 'sudo ufw allow 22/tcp',
                  pros: 'Super simple, human commands, enabled in 5 seconds',
                  cons: 'Less granular for complex multi-homed enterprise routing'
                },
                firewalld: {
                  name: 'firewalld (Dynamic Zone Manager)',
                  badge: 'Modern & RHEL / CentOS / Fedora Default',
                  install: 'sudo dnf install firewalld',
                  enable: 'sudo systemctl enable --now firewalld',
                  status: 'sudo firewall-cmd --state && sudo firewall-cmd --get-active-zones',
                  sampleRule: 'sudo firewall-cmd --zone=public --add-service=http --permanent && sudo firewall-cmd --reload',
                  pros: 'Zone-based, updates live (--reload) without dropping active connections',
                  cons: 'More command flags to learn than UFW'
                },
                iptables: {
                  name: 'iptables (Classic Veteran Tool)',
                  badge: 'Full Granular Kernel Control',
                  install: 'sudo apt install iptables iptables-persistent  (or dnf install iptables)',
                  enable: 'sudo systemctl enable --now netfilter-persistent',
                  status: 'sudo iptables -L -v -n',
                  sampleRule: 'sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT',
                  pros: 'Absolute control over every table, chain, and packet byte',
                  cons: 'Requires precise rule ordering and explicit permanent saving'
                }
              };

              const currentMgr = managers[t10SelectedManager];

              return (
                <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-amber-400 shadow-md space-y-5">
                  <div className="border-b-2 border-amber-100 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 10.2
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The 3-Manager Control Station — Setup & Service Toggle
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Switch between UFW, firewalld, and iptables to see how each security manager is installed, enabled at boot, and controlled!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {Object.entries(managers).map(([key, item]) => (
                      <button
                        key={key}
                        onClick={() => {
                          sounds.playSuccess();
                          setT10SelectedManager(key);
                        }}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                          t10SelectedManager === key
                            ? 'bg-amber-500 text-white border-amber-700 shadow-sm'
                            : 'bg-amber-50 hover:bg-amber-100 text-slate-900 border-amber-200'
                        }`}
                      >
                        <div className="font-black text-xs sm:text-sm">{item.name}</div>
                        <div className="text-[11px] mt-1 opacity-90">{item.badge}</div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-amber-50/70 rounded-2xl p-4 border-2 border-amber-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-black text-sm text-amber-950">
                        {currentMgr.name} — Control Dashboard
                      </div>
                      <button
                        onClick={() => {
                          sounds.playPop();
                          setT10ManagerStatus((prev) => !prev);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                          t10ManagerStatus
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-rose-600 text-white shadow-sm'
                        }`}
                      >
                        {t10ManagerStatus ? '🟢 Active & Guarding' : '🔴 Stopped (Inactive)'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                        <span className="font-black text-amber-950">🌟 Pros: </span>
                        <span className="font-semibold text-slate-700">{currentMgr.pros}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                        <span className="font-black text-amber-950">⚠️ Consideration: </span>
                        <span className="font-semibold text-slate-700">{currentMgr.cons}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`# 1. Install ${currentMgr.name}:
$ ${currentMgr.install}

# 2. Enable & Start at Boot:
$ ${currentMgr.enable}

# 3. Check Live Status:
$ ${currentMgr.status}
Status: ${t10ManagerStatus ? 'active (running) 🟢' : 'inactive (dead) 🔴'}

# 4. Add a sample rule:
$ ${currentMgr.sampleRule}`}
                    </pre>
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 10.3: BASIC IPTABLES COMMANDS (RULE BUILDER)
                ================================================================= */}
            {activeSubtopicId === 'basic-iptables-commands' && (() => {
              const builtCommand = `sudo iptables -t ${t10Table} -A ${t10Chain} -p ${t10Protocol} --dport ${t10Port} -j ${t10Target}`;

              return (
                <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-emerald-400 shadow-md space-y-5">
                  <div className="border-b-2 border-emerald-100 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 10.3
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      The iptables Rule Builder & Terminal Sandbox
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Assemble an iptables command piece by piece by choosing your Table, Chain, Protocol, Port, and Target stamp!
                    </p>
                  </div>

                  {/* Interactive selectors */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Table */}
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-700">1. Table (-t)</label>
                      <select
                        value={t10Table}
                        onChange={(e) => {
                          sounds.playPop();
                          setT10Table(e.target.value);
                        }}
                        className="w-full p-2.5 rounded-xl border-2 border-emerald-300 font-mono text-xs font-bold bg-emerald-50/50"
                      >
                        <option value="filter">filter (Guest List)</option>
                        <option value="nat">nat (Mailroom Redirect)</option>
                        <option value="mangle">mangle (Delivery Priority)</option>
                      </select>
                    </div>

                    {/* Chain */}
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-700">2. Chain</label>
                      <select
                        value={t10Chain}
                        onChange={(e) => {
                          sounds.playPop();
                          setT10Chain(e.target.value);
                        }}
                        className="w-full p-2.5 rounded-xl border-2 border-emerald-300 font-mono text-xs font-bold bg-emerald-50/50"
                      >
                        <option value="INPUT">INPUT (Front Door)</option>
                        <option value="OUTPUT">OUTPUT (Back Door)</option>
                        <option value="FORWARD">FORWARD (Transit Hall)</option>
                      </select>
                    </div>

                    {/* Port */}
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-700">3. Port Door</label>
                      <select
                        value={t10Port}
                        onChange={(e) => {
                          sounds.playPop();
                          setT10Port(e.target.value);
                        }}
                        className="w-full p-2.5 rounded-xl border-2 border-emerald-300 font-mono text-xs font-bold bg-emerald-50/50"
                      >
                        <option value="22">Port 22 (SSH)</option>
                        <option value="80">Port 80 (HTTP Web)</option>
                        <option value="443">Port 443 (HTTPS Secure)</option>
                        <option value="53">Port 53 (DNS)</option>
                        <option value="3306">Port 3306 (MySQL DB)</option>
                      </select>
                    </div>

                    {/* Target */}
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-700">4. Target (-j)</label>
                      <select
                        value={t10Target}
                        onChange={(e) => {
                          sounds.playPop();
                          setT10Target(e.target.value);
                        }}
                        className="w-full p-2.5 rounded-xl border-2 border-emerald-300 font-mono text-xs font-bold bg-emerald-50/50"
                      >
                        <option value="ACCEPT">ACCEPT (Welcome in)</option>
                        <option value="DROP">DROP (Silently ignore)</option>
                        <option value="REJECT">REJECT (Turn away)</option>
                        <option value="LOG">LOG (Record in OB book)</option>
                      </select>
                    </div>
                  </div>

                  {/* Assembled command card */}
                  <div className="bg-emerald-50/80 rounded-2xl p-4 border-2 border-emerald-300 space-y-2">
                    <div className="text-xs font-black text-emerald-950 uppercase">Assembled iptables Command:</div>
                    <div className="font-mono font-black text-sm text-emerald-900 bg-white p-3 rounded-xl border border-emerald-200">
                      $ {builtCommand}
                    </div>
                  </div>

                  {/* Output viewer */}
                  <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                    <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo iptables -L ${t10Chain} -v -n --line-numbers
Chain ${t10Chain} (policy DROP 140 packets, 8400 bytes)
num   pkts bytes target     prot opt in     out     source               destination
1       45  2800 ${t10Target.padEnd(10)} ${t10Protocol}  --  *      *       0.0.0.0/0            0.0.0.0/0           tcp dpt:${t10Port}

# Handy rulebook commands:
$ sudo iptables -L -v -n        # 📖 Read entire rulebook
$ sudo iptables -D ${t10Chain} 1          # ❌ Delete rule #1
$ sudo iptables -F              # 🧹 Flush all rules clean
$ sudo iptables -P INPUT DROP   # 🔒 Set default policy to DROP`}
                    </pre>
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 10.4: MANAGING FIREWALL CONFIGURATION (RULE ORDER & PERSISTENCE)
                ================================================================= */}
            {activeSubtopicId === 'managing-firewall-configuration' && (() => {
              return (
                <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-purple-400 shadow-md space-y-5">
                  <div className="border-b-2 border-purple-100 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-900 bg-purple-100 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 10.4
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      Rule Order Problem, Permanent Saving & firewalld Zones
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">
                      Explore the famous Top-to-Bottom rule ordering trap, test how to insert exceptions at Line 1, save rules permanently, and manage firewalld zones!
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'bug', label: '❌ Rule Order Bug', sub: 'General DROP above ACCEPT' },
                      { id: 'fixed', label: '✅ Fixed Order (-I 1)', sub: 'Specific exception at Line 1' },
                      { id: 'save', label: '💾 Permanent Save', sub: 'iptables-persistent & rules.v4' },
                      { id: 'zones', label: '🗺️ firewalld Zones', sub: '--permanent & --reload' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => {
                          sounds.playSuccess();
                          setT10RuleOrderMode(mode.id);
                        }}
                        className={`p-3 rounded-2xl border-2 text-left transition-all ${
                          t10RuleOrderMode === mode.id
                            ? 'bg-purple-600 text-white border-purple-800 shadow-sm'
                            : 'bg-purple-50 hover:bg-purple-100 text-slate-900 border-purple-200'
                        }`}
                      >
                        <div className="font-mono font-black text-xs">{mode.label}</div>
                        <div className="text-[11px] mt-1 opacity-90">{mode.sub}</div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-900 text-emerald-300 rounded-2xl p-4 font-mono text-xs sm:text-sm">
                    {t10RuleOrderMode === 'bug' && (
                      <pre className="whitespace-pre-wrap leading-relaxed text-rose-300">
{`# ❌ THE TOP-TO-BOTTOM TRAP:
$ sudo iptables -A INPUT -s 192.168.1.3 -j DROP
$ sudo iptables -A INPUT -s 192.168.1.3 -p tcp --dport 22 -j ACCEPT

Guard's Rulebook:
  Line 1: DROP   all  -- 192.168.1.3   anywhere   <-- First match WINS! Mr. X is blocked here!
  Line 2: ACCEPT tcp  -- 192.168.1.3   anywhere tcp dpt:22 <-- NEVER CHECKED!

Outcome: Mr. X tries to SSH to port 22 -> ❌ Connection timed out!`}
                      </pre>
                    )}

                    {t10RuleOrderMode === 'fixed' && (
                      <pre className="whitespace-pre-wrap leading-relaxed text-emerald-300">
{`# ✅ THE FIX: Insert (-I) specific exceptions at Line 1 ABOVE general blocks:
$ sudo iptables -I INPUT 1 -s 192.168.1.3 -p tcp --dport 22 -j ACCEPT
$ sudo iptables -A INPUT -s 192.168.1.3 -j DROP

Guard's Rulebook:
  Line 1: ACCEPT tcp  -- 192.168.1.3   anywhere tcp dpt:22 <-- Checked FIRST! ✅ SSH allowed!
  Line 2: DROP   all  -- 192.168.1.3   anywhere            <-- Blocks all other doors from Mr. X!

Outcome: Mr. X connects to SSH successfully, but cannot touch any other port!`}
                      </pre>
                    )}

                    {t10RuleOrderMode === 'save' && (
                      <pre className="whitespace-pre-wrap leading-relaxed text-sky-300">
{`# 💾 SAVING RULES PERMANENTLY (The Waterproof Notebook):
# In memory, iptables rules vanish when power restarts!

# Debian / Ubuntu:
$ sudo apt install iptables-persistent
$ sudo iptables-save | sudo tee /etc/iptables/rules.v4
$ sudo ip6tables-save | sudo tee /etc/iptables/rules.v6
# To restore later:
$ sudo iptables-restore < /etc/iptables/rules.v4

# RHEL / CentOS:
$ sudo dnf install iptables-services
$ sudo systemctl enable iptables
$ sudo service iptables save   # Writes to /etc/sysconfig/iptables`}
                      </pre>
                    )}

                    {t10RuleOrderMode === 'zones' && (
                      <pre className="whitespace-pre-wrap leading-relaxed text-amber-300">
{`# 🗺️ MANAGING firewalld ZONES & PERMANENCE:
$ sudo firewall-cmd --get-active-zones
public
  interfaces: enp0s3

# Add rule permanently:
$ sudo firewall-cmd --zone=public --add-service=http --permanent
$ sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent

# Reload live WITHOUT dropping active SSH connections:
$ sudo firewall-cmd --reload
success ✅

# Verify zone settings:
$ sudo firewall-cmd --zone=public --list-all`}
                      </pre>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 11.1: CONFIGURE NETWORK INTERFACES IN CENTOS
                ================================================================= */}
            {activeSubtopicId === 'centos-network-interfaces' && (() => {
              return (
                <div className="bg-[#111728]/95 rounded-3xl p-5 sm:p-6 border-4 border-indigo-400 shadow-xl space-y-5">
                  <div className="border-b-2 border-indigo-900/60 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-300 bg-indigo-950/80 border border-indigo-700/60 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 11.1
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-white mt-1">
                      CentOS Interface Configurator (ifcfg vs nmcli vs nmtui)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-300">
                      Configure your enterprise CentOS/RHEL network card, test the famous <code>ONBOOT=yes</code> rule, and see how ifcfg files translate to nmcli commands!
                    </p>
                  </div>

                  {/* Interface Control Panel */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-indigo-300">
                        Device / Interface:
                      </label>
                      <div className="flex gap-2">
                        {['ens33', 'eth0'].map((dev) => (
                          <button
                            key={dev}
                            onClick={() => {
                              sounds.playPop();
                              setT11CentosIface(dev);
                              setT11CentosTested(false);
                            }}
                            className={`flex-1 py-2 px-3 rounded-xl font-mono font-black text-xs border transition-all ${
                              t11CentosIface === dev
                                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                                : 'bg-[#182035] text-slate-300 border-slate-700 hover:bg-[#202b48]'
                            }`}
                          >
                            {dev}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-indigo-300">
                        Boot Protocol (BOOTPROTO):
                      </label>
                      <div className="flex gap-2">
                        {[
                          { id: 'static', label: 'Static (Fixed)' },
                          { id: 'dhcp', label: 'DHCP (Auto)' }
                        ].map((proto) => (
                          <button
                            key={proto.id}
                            onClick={() => {
                              sounds.playPop();
                              setT11CentosBootproto(proto.id);
                              setT11CentosTested(false);
                            }}
                            className={`flex-1 py-2 px-3 rounded-xl font-black text-xs border transition-all ${
                              t11CentosBootproto === proto.id
                                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                                : 'bg-[#182035] text-slate-300 border-slate-700 hover:bg-[#202b48]'
                            }`}
                          >
                            {proto.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-indigo-300">
                        Start on Boot (ONBOOT):
                      </label>
                      <div className="flex gap-2">
                        {[
                          { val: true, label: '✅ ONBOOT=yes (Safe)', color: 'bg-emerald-600 border-emerald-400' },
                          { val: false, label: '❌ ONBOOT=no (Trap!)', color: 'bg-rose-600 border-rose-400' }
                        ].map((opt) => (
                          <button
                            key={String(opt.val)}
                            onClick={() => {
                              sounds.playPop();
                              setT11CentosOnboot(opt.val);
                              setT11CentosTested(false);
                            }}
                            className={`flex-1 py-2 px-2.5 rounded-xl font-black text-xs border transition-all ${
                              t11CentosOnboot === opt.val
                                ? `${opt.color} text-white shadow-md`
                                : 'bg-[#182035] text-slate-300 border-slate-700 hover:bg-[#202b48]'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Manual IP Fields when static */}
                  {t11CentosBootproto === 'static' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0d121f] p-3.5 rounded-2xl border border-slate-800">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">
                          IP Address (IPADDR):
                        </label>
                        <input
                          type="text"
                          value={t11CentosIp}
                          onChange={(e) => setT11CentosIp(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">
                          Default Gateway (GATEWAY):
                        </label>
                        <input
                          type="text"
                          value={t11CentosGateway}
                          onChange={(e) => setT11CentosGateway(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">
                          Primary DNS (DNS1):
                        </label>
                        <input
                          type="text"
                          value={t11CentosDns}
                          onChange={(e) => setT11CentosDns(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-mono text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* View Tabs: ifcfg File vs nmcli vs nmtui */}
                  <div className="flex gap-2 border-b border-slate-800 pb-2">
                    {[
                      { id: 'ifcfg', label: `📄 /etc/sysconfig/network-scripts/ifcfg-${t11CentosIface}` },
                      { id: 'nmcli', label: '⚡ nmcli Command Equivalents' },
                      { id: 'nmtui', label: '📱 nmtui Terminal GUI Preview' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          sounds.playPop();
                          setT11CentosView(tab.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                          t11CentosView === tab.id
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-900/80 text-slate-400 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Code Screen */}
                  <div className="bg-[#0a0d16] p-4 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm">
                    {t11CentosView === 'ifcfg' && (
                      <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed">
{`# File: /etc/sysconfig/network-scripts/ifcfg-${t11CentosIface}
TYPE=Ethernet
DEVICE=${t11CentosIface}
NAME=${t11CentosIface}
BOOTPROTO=${t11CentosBootproto}
ONBOOT=${t11CentosOnboot ? 'yes' : 'no'}    # <-- ${t11CentosOnboot ? '✅ Awakens automatically on boot!' : '❌ Will stay SLEEPING after reboot!'}
${t11CentosBootproto === 'static' ? `IPADDR=${t11CentosIp}
PREFIX=24
GATEWAY=${t11CentosGateway}
DNS1=${t11CentosDns}
DNS2=1.1.1.1` : `# Network router will provide automatic IP via DHCP`}
DEFROUTE=yes`}
                      </pre>
                    )}

                    {t11CentosView === 'nmcli' && (
                      <pre className="text-cyan-300 whitespace-pre-wrap leading-relaxed">
{`# ⚡ The Modern DevOps nmcli Commands:
$ sudo nmcli connection show
$ sudo nmcli connection modify ${t11CentosIface} connection.autoconnect ${t11CentosOnboot ? 'yes' : 'no'}
${t11CentosBootproto === 'static'
  ? `$ sudo nmcli connection modify ${t11CentosIface} ipv4.method manual
$ sudo nmcli connection modify ${t11CentosIface} ipv4.addresses ${t11CentosIp}/24
$ sudo nmcli connection modify ${t11CentosIface} ipv4.gateway ${t11CentosGateway}
$ sudo nmcli connection modify ${t11CentosIface} ipv4.dns "${t11CentosDns} 1.1.1.1"`
  : `$ sudo nmcli connection modify ${t11CentosIface} ipv4.method auto`}

# Activate changes live without rebooting:
$ sudo nmcli connection up ${t11CentosIface}
Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/1) ✅`}
                      </pre>
                    )}

                    {t11CentosView === 'nmtui' && (
                      <pre className="text-yellow-300 whitespace-pre-wrap leading-relaxed">
{`┌──────────────────────┤ NetworkManager TUI ├──────────────────────┐
│                                                                 │
│  Profile name: ${t11CentosIface}                                               │
│  Device:       ${t11CentosIface} (00:0c:29:1f:3a:b2)                            │
│                                                                 │
│  IPv4 CONFIGURATION <${t11CentosBootproto === 'static' ? 'Manual' : 'Automatic'}>                                 │
│    Addresses: ${t11CentosBootproto === 'static' ? `${t11CentosIp}/24` : '<dynamic>'}                                 │
│    Gateway:   ${t11CentosBootproto === 'static' ? t11CentosGateway : '<dynamic>'}                                    │
│    DNS servers: ${t11CentosBootproto === 'static' ? t11CentosDns : '<dynamic>'}                                  │
│                                                                 │
│  [${t11CentosOnboot ? 'X' : ' '}] Automatically connect (ONBOOT)                       │
│  [X] Available to all users                                     │
│                                                                 │
│                                      <OK>          <Cancel>     │
└─────────────────────────────────────────────────────────────────┘`}
                      </pre>
                    )}
                  </div>

                  {/* Reboot Test Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <button
                      onClick={() => {
                        if (t11CentosOnboot) {
                          sounds.playSuccess();
                          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
                        } else {
                          sounds.playPop();
                        }
                        setT11CentosTested(true);
                      }}
                      className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm border-2 border-indigo-400 shadow-md flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>🔄 Reboot CentOS Server to Test Link!</span>
                    </button>

                    {t11CentosTested && (
                      <div
                        className={`p-3 rounded-2xl text-xs sm:text-sm font-black border flex items-center gap-2 ${
                          t11CentosOnboot
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500'
                            : 'bg-rose-950/80 text-rose-300 border-rose-500 animate-pulse'
                        }`}
                      >
                        {t11CentosOnboot ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>
                              🎉 SERVER ONLINE! Interface {t11CentosIface} auto-awakened with {t11CentosBootproto === 'static' ? t11CentosIp : 'DHCP IP'}!
                            </span>
                          </>
                        ) : (
                          <>
                            <span>❌ NO INTERNET AFTER REBOOT! Interface {t11CentosIface} is asleep because ONBOOT=no. Fix: Flip to ONBOOT=yes!</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 11.2: NETWORK CONFIGURATION AND TROUBLESHOOTING
                ================================================================= */}
            {activeSubtopicId === 'network-troubleshooting' && (() => {
              const scenarios = {
                dns_broken: {
                  title: '🌐 DNS Breakdown (ping 8.8.8.8 works, google.com fails)',
                  symptom: 'Server can ping numbers (8.8.8.8) but "curl https://google.com" returns "Could not resolve host"!',
                  checks: { link: true, ip: true, gw: true, pubIp: true, dns: false },
                  fixCmd: 'echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf',
                  fixExplanation: 'Your DNS phonebook was empty or pointing to a dead nameserver. Writing a valid nameserver (8.8.8.8) into /etc/resolv.conf instantly restored domain lookups!'
                },
                cable_down: {
                  title: '🔌 Layer 1 Down (Cable unplugged or interface down)',
                  symptom: 'Cannot reach any machine. "ip link show eth0" shows state DOWN!',
                  checks: { link: false, ip: false, gw: false, pubIp: false, dns: false },
                  fixCmd: 'sudo ip link set eth0 up',
                  fixExplanation: 'The network interface card was administratively disabled. Bringing it UP initialized the physical link light!'
                },
                no_ip: {
                  title: '🆔 DHCP Failed (No IP Address or 169.254 APIPA)',
                  symptom: 'Interface is UP, but "ip addr" has no valid 192.168.x.x address.',
                  checks: { link: true, ip: false, gw: false, pubIp: false, dns: false },
                  fixCmd: 'sudo dhclient -v eth0',
                  fixExplanation: 'Running dhclient sent a fresh DORA request to the DHCP server and leased a valid IP address (192.168.1.120)!'
                },
                gateway_lost: {
                  title: '🚪 Missing Default Gateway (No route to host)',
                  symptom: 'Can ping neighboring machines in the same room, but cannot reach the internet!',
                  checks: { link: true, ip: true, gw: false, pubIp: false, dns: false },
                  fixCmd: 'sudo ip route add default via 192.168.1.1',
                  fixExplanation: 'Packets did not know which door led to the outside world. Adding the default gateway (192.168.1.1) restored outbound routing!'
                },
                port_closed: {
                  title: '🔒 Inactive Service (Web Server down on Port 80)',
                  symptom: 'Network ping works, but visitors cannot open your website. "ss -tulnp | grep :80" is empty!',
                  checks: { link: true, ip: true, gw: true, pubIp: true, dns: true, webPort: false },
                  fixCmd: 'sudo systemctl start nginx',
                  fixExplanation: 'The network and DNS were 100% fine—the Nginx web server service was simply stopped! Starting Nginx opened listening port 80.'
                }
              };

              const currentScen = scenarios[t11TroubleScenario];

              return (
                <div className="bg-[#111728]/95 rounded-3xl p-5 sm:p-6 border-4 border-teal-400 shadow-xl space-y-5">
                  <div className="border-b-2 border-teal-900/60 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-teal-300 bg-teal-950/80 border border-teal-700/60 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 11.2
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-white mt-1">
                      The 5-Step Network Detective Ladder
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-300">
                      Pick a real-world server network crisis, watch the 5 diagnostic checks test the stack from Layer 1 to DNS, and apply the surgical fix!
                    </p>
                  </div>

                  {/* Pick Scenario */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'dns_broken', label: '1. DNS Dead', icon: '🌐' },
                      { id: 'cable_down', label: '2. Link Down', icon: '🔌' },
                      { id: 'no_ip', label: '3. No IP Lease', icon: '🆔' },
                      { id: 'gateway_lost', label: '4. Lost Gateway', icon: '🚪' },
                      { id: 'port_closed', label: '5. Port Closed', icon: '🔒' }
                    ].map((sc) => (
                      <button
                        key={sc.id}
                        onClick={() => {
                          sounds.playPop();
                          setT11TroubleScenario(sc.id);
                          setT11TroubleSolved(false);
                        }}
                        className={`p-2.5 rounded-2xl border text-center transition-all ${
                          t11TroubleScenario === sc.id
                            ? 'bg-teal-600 text-white border-teal-400 shadow-md font-black scale-105'
                            : 'bg-[#182035] text-slate-300 border-slate-700 hover:bg-[#202b48]'
                        }`}
                      >
                        <div className="text-lg">{sc.icon}</div>
                        <div className="text-xs mt-1">{sc.label}</div>
                      </button>
                    ))}
                  </div>

                  {/* Symptom Banner */}
                  <div className="bg-[#172036] p-3.5 rounded-2xl border border-teal-500/30 flex items-start gap-3">
                    <span className="text-2xl shrink-0 mt-0.5">⚠️</span>
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider text-amber-400">
                        {currentScen.title}
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
                        {currentScen.symptom}
                      </p>
                    </div>
                  </div>

                  {/* 5-Step Diagnostic Status Ladder */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                    {[
                      {
                        step: 'Step 1: Link',
                        cmd: 'ip link show',
                        ok: t11TroubleSolved || currentScen.checks.link,
                        label: 'Layer 1 Cable'
                      },
                      {
                        step: 'Step 2: Address',
                        cmd: 'ip addr show',
                        ok: t11TroubleSolved || currentScen.checks.ip,
                        label: 'Layer 3 Local IP'
                      },
                      {
                        step: 'Step 3: Gateway',
                        cmd: 'ping -c 2 192.168.1.1',
                        ok: t11TroubleSolved || currentScen.checks.gw,
                        label: 'Local Router'
                      },
                      {
                        step: 'Step 4: Internet IP',
                        cmd: 'ping -c 2 8.8.8.8',
                        ok: t11TroubleSolved || currentScen.checks.pubIp,
                        label: 'Global WAN'
                      },
                      {
                        step: 'Step 5: DNS Name',
                        cmd: 'dig google.com',
                        ok: t11TroubleSolved || (currentScen.checks.dns !== false),
                        label: 'Nameservers'
                      }
                    ].map((st, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-2xl border transition-all ${
                          st.ok
                            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                            : 'bg-rose-950/60 border-rose-500/60 text-rose-300 animate-pulse'
                        }`}
                      >
                        <div className="text-[10px] font-mono font-bold uppercase opacity-80">
                          {st.step}
                        </div>
                        <div className="text-xs font-black mt-1 flex items-center justify-between">
                          <span>{st.label}</span>
                          <span>{st.ok ? '✅ PASS' : '❌ FAIL'}</span>
                        </div>
                        <div className="font-mono text-[10px] text-slate-400 mt-1 truncate">
                          $ {st.cmd}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Fix Station */}
                  <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="text-xs font-black uppercase tracking-wider text-teal-400">
                      🛠️ Recommended Surgical Fix:
                    </div>
                    <div className="font-mono text-xs sm:text-sm bg-slate-900 text-amber-300 p-3 rounded-xl border border-slate-800">
                      $ {currentScen.fixCmd}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          confetti({ particleCount: 60, spread: 70, origin: { y: 0.65 } });
                          setT11TroubleSolved(true);
                        }}
                        className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all flex items-center gap-2 ${
                          t11TroubleSolved
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-teal-600 hover:bg-teal-700 text-white border-teal-400 animate-bounce'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t11TroubleSolved ? '🎉 Problem Resolved!' : '⚡ Apply Fix & Run Diagnostics'}</span>
                      </button>

                      {t11TroubleSolved && (
                        <p className="text-xs font-bold text-emerald-300 max-w-lg">
                          💡 {currentScen.fixExplanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 11.3: SYSTEM MONITORING (CPU, RAM, DISK & PROCESS KILLER)
                ================================================================= */}
            {activeSubtopicId === 'system-monitoring' && (() => {
              return (
                <div className="bg-[#111728]/95 rounded-3xl p-5 sm:p-6 border-4 border-emerald-400 shadow-xl space-y-5">
                  <div className="border-b-2 border-emerald-900/60 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 11.3
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-white mt-1">
                      Live System Vital Signs & Task Manager Simulator
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-300">
                      Monitor server vital signs in real time! Spot rogue CPU hogs in <code>top</code>, test <code>kill -9</code> to rescue the server, and inspect <code>free -h</code> RAM buffers and <code>df -h</code> disk partitions!
                    </p>
                  </div>

                  {/* 3 Real-time Gauges (CPU, RAM, Disk) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-[#151c30] p-4 rounded-2xl border border-slate-700/70 space-y-2">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-slate-300 flex items-center gap-1.5">
                          <span>💓 CPU & Load Average:</span>
                        </span>
                        <span className={t11RogueKilled ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}>
                          {t11RogueKilled ? '4.2% (Load: 0.12)' : '98.6% (Load: 4.85) ⚠️'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            t11RogueKilled ? 'bg-emerald-500 w-[4%]' : 'bg-rose-500 w-[99%]'
                          }`}
                        />
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {t11RogueKilled ? 'Cozy & calm • 4 Cores idle' : 'HIGH LOAD: Rogue process running!'}
                      </div>
                    </div>

                    <div className="bg-[#151c30] p-4 rounded-2xl border border-slate-700/70 space-y-2">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-slate-300 flex items-center gap-1.5">
                          <span>🧠 RAM Memory:</span>
                        </span>
                        <span className="text-cyan-400">
                          {t11RogueKilled ? '2.1 GB / 8.0 GB (26%)' : '6.4 GB / 8.0 GB (80%)'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            t11RogueKilled ? 'bg-cyan-500 w-[26%]' : 'bg-amber-500 w-[80%]'
                          }`}
                        />
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        Buff/Cache: 3.8 GB • Swap: 0 MB
                      </div>
                    </div>

                    <div className="bg-[#151c30] p-4 rounded-2xl border border-slate-700/70 space-y-2">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-slate-300 flex items-center gap-1.5">
                          <span>💽 Disk Space (/dev/sda1):</span>
                        </span>
                        <span className="text-amber-400">42% (21 GB / 50 GB)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[42%]" />
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        29 GB Free • Healthy filesystem
                      </div>
                    </div>
                  </div>

                  {/* Tool Tabs */}
                  <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
                    {[
                      { id: 'top', label: '📊 top / htop (Process Manager)' },
                      { id: 'free', label: '🧠 free -h (RAM & Buffers)' },
                      { id: 'df', label: '💽 df -h & du -sh (Storage)' },
                      { id: 'logs', label: '📜 journalctl -xe & dmesg' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          sounds.playPop();
                          setT11MonTab(tab.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                          t11MonTab === tab.id
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-slate-900/80 text-slate-400 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Views */}
                  {t11MonTab === 'top' && (
                    <div className="space-y-3">
                      <div className="bg-[#0b0f19] p-3.5 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto">
                        <div className="text-slate-400 pb-2 border-b border-slate-800 flex justify-between">
                          <span>PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND</span>
                          <span>Tasks: {t11RogueKilled ? '142 total' : '143 total, 1 RUNNING'}</span>
                        </div>
                        <div className="space-y-1.5 pt-2">
                          {!t11RogueKilled ? (
                            <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-500 text-rose-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span>412 hacker    20   0  890420 412580  12540 R  98.4  14.2   4:12.80 python3 rogue_miner.py 🚨</span>
                              <div className="flex gap-1.5 shrink-0">
                                <button
                                  onClick={() => {
                                    sounds.playSuccess();
                                    setT11RogueKilled(true);
                                    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-slate-950 font-black text-[11px]"
                                  title="SIGTERM graceful termination"
                                >
                                  kill -15 412
                                </button>
                                <button
                                  onClick={() => {
                                    sounds.playSuccess();
                                    setT11RogueKilled(true);
                                    confetti({ particleCount: 70, spread: 80, origin: { y: 0.65 } });
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-black text-[11px] animate-pulse"
                                  title="SIGKILL forceful termination"
                                >
                                  kill -9 412
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 flex items-center justify-between">
                              <span>✅ PID 412 terminated! Rogue miner ejected from CPU.</span>
                              <button
                                onClick={() => setT11RogueKilled(false)}
                                className="text-[11px] underline text-slate-400 hover:text-white"
                              >
                                Re-spawn miner to test again
                              </button>
                            </div>
                          )}
                          <div className="text-slate-300 p-1 flex justify-between">
                            <span>891 www-data  20   0  145200  28400   9400 S   0.4   0.3   0:15.12 nginx: worker process</span>
                          </div>
                          <div className="text-slate-300 p-1 flex justify-between">
                            <span>1024 postgres  20   0  380500  84100  32100 S   1.2   1.0   1:02.40 postgres: checkpointer</span>
                          </div>
                          <div className="text-slate-400 p-1 flex justify-between">
                            <span>1560 root      20   0   45200   9100   6200 S   0.1   0.1   0:05.10 systemd-journald</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {t11MonTab === 'free' && (
                    <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300">
                      <pre className="whitespace-pre-wrap leading-relaxed">
{`$ free -h
               total        used        free      shared  buff/cache   available
Mem:           7.8Gi       2.1Gi       1.9Gi       140Mi       3.8Gi       5.4Gi
Swap:          2.0Gi          0B       2.0Gi

💡 Pro-Tip for Linux Engineers:
Do NOT panic if "free" looks small (1.9Gi)!
Notice "buff/cache" (3.8Gi): Linux borrows unused RAM to cache recently read disk files so apps open 100x faster.
When an application asks for memory, Linux instantly evaporates the cache and gives it to the app!
Always check "available" (5.4Gi)—that is your real true breathing room!`}
                      </pre>
                    </div>
                  )}

                  {t11MonTab === 'df' && (
                    <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-amber-300">
                      <pre className="whitespace-pre-wrap leading-relaxed">
{`$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   21G   29G  42% /           <-- 29G healthy free space
/dev/sda2       1.0G  240M  760M  24% /boot       <-- Kernel boot files
/dev/sdb1       200G   45G  155G  23% /home       <-- User home folders
tmpfs           3.9G     0  3.9G   0% /dev/shm

# How to find who is eating your disk space:
$ sudo du -sh /var/log/* | sort -h
4.0K    /var/log/alternatives.log
120K    /var/log/auth.log
14M     /var/log/journal
18G     /var/log/giant_debug.log   <-- 🚨 Found the 18GB culprit!`}
                      </pre>
                    </div>
                  )}

                  {t11MonTab === 'logs' && (
                    <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300">
                      <pre className="whitespace-pre-wrap leading-relaxed">
{`$ sudo journalctl -xe --no-pager | tail -n 8
Nov 10 14:15:02 cozy-house systemd[1]: Starting Nginx Web Server...
Nov 10 14:15:03 cozy-house nginx[891]: [notice] Configuration test successful
Nov 10 14:15:03 cozy-house systemd[1]: Started Nginx Web Server. ✅
Nov 10 14:15:10 cozy-house sshd[2410]: Accepted publickey for sam from 192.168.1.5 port 52410 ssh2

$ dmesg -T | tail -n 4
[Sun Nov 10 14:10:00 2026] eth0: Link is Up - 1000Mbps/Full - flow control rx/tx
[Sun Nov 10 14:10:01 2026] IPv6: ADDRCONF(NETDEV_CHANGE): eth0: link becomes ready`}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 12.1: VIEWING PROCESSES (ps aux, pstree & PROCESS STATES)
                ================================================================= */}
            {activeSubtopicId === 'viewing-processes' && (() => {
              const statesMeta = {
                R: { label: 'R (Running / Runnable)', desc: 'Actively executing on CPU or waiting in run queue for its time slice.', color: 'text-emerald-400 border-emerald-500 bg-emerald-950/60' },
                S: { label: 'S (Interruptible Sleep)', desc: 'Sleeping while waiting for an event (keystroke, network packet, or timer). Wakes up immediately when signaled.', color: 'text-blue-400 border-blue-500 bg-blue-950/60' },
                D: { label: 'D (Uninterruptible Sleep)', desc: 'Deep hardware sleep waiting for disk I/O. CANNOT be killed even with kill -9 until hardware responds!', color: 'text-amber-400 border-amber-500 bg-amber-950/60' },
                Z: { label: 'Z (Zombie / Defunct)', desc: 'Child process that finished execution, but whose parent process has not yet read its exit status with wait().', color: 'text-rose-400 border-rose-500 bg-rose-950/60' },
                T: { label: 'T (Stopped / Suspended)', desc: 'Temporarily frozen by job control (Ctrl+Z) or by receiving a SIGSTOP signal.', color: 'text-purple-400 border-purple-500 bg-purple-950/60' }
              };

              return (
                <div className="bg-[#111728]/95 rounded-3xl p-5 sm:p-6 border-4 border-blue-400 shadow-xl space-y-5">
                  <div className="border-b-2 border-blue-900/60 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-blue-300 bg-blue-950/80 border border-blue-700/60 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 12.1
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-white mt-1">
                      Process Explorer (ps aux vs pstree & The 5 Process States)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-300">
                      Explore live process snapshots, inspect how PID 1 (systemd) parents the entire operating system, and demystify the 5 process state letters (R, S, D, Z, T)!
                    </p>
                  </div>

                  {/* Mode Tabs */}
                  <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
                    {[
                      { id: 'ps_aux', label: '📋 ps aux (Snapshot Table)' },
                      { id: 'pstree', label: '🌳 pstree (Family Hierarchy)' },
                      { id: 'states', label: '🧬 The 5 Process States (R, S, D, Z, T)' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          sounds.playPop();
                          setT12ViewMode(tab.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                          t12ViewMode === tab.id
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-900/80 text-slate-400 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {t12ViewMode === 'ps_aux' && (
                    <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto space-y-2">
                      <div className="text-slate-400 pb-1 border-b border-slate-800 flex justify-between font-bold">
                        <span>USER       PID  %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND</span>
                      </div>
                      <div className="text-cyan-300 space-y-1">
                        <div>root         1   0.0  0.2 168920 13420 ?        Ss   10:00   0:02 /sbin/init splash</div>
                        <div>root       840   0.0  0.1  15800  7120 ?        Ss   10:01   0:00 /usr/sbin/sshd -D</div>
                        <div>sam       1120   0.0  0.1  10240  5200 pts/0    Ss   10:05   0:01 -bash</div>
                        <div>sam       1420   0.4  0.8  45120 18400 pts/0    R+   10:12   0:00 ps aux</div>
                        <div>postgres  1024   0.1  1.2 380500 84100 ?        S    10:02   0:15 postgres: checkpointer</div>
                        <div className="text-rose-400">sam       1890   0.0  0.0      0     0 pts/0    Z+   10:20   0:00 [backup.sh] &lt;defunct&gt; 🧟</div>
                      </div>
                      <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
                        💡 STAT Column Guide: <b>S</b> = Sleep, <b>R</b> = Running, <b>s</b> = Session Leader, <b>+</b> = Foreground Process Group, <b>Z</b> = Zombie.
                      </div>
                    </div>
                  )}

                  {t12ViewMode === 'pstree' && (
                    <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 space-y-2">
                      <pre className="whitespace-pre-wrap leading-relaxed">
{`$ pstree -p
systemd(1) ──┬── systemd-journal(410)
             ├── NetworkManager(620)
             ├── sshd(840) ──── sshd(1110) ──── bash(1120) ──── python3(1420)
             ├── nginx(891) ───┬── nginx(892)
             │                 └── nginx(893)
             └── postgres(1024) ─── postgres(1025)

💡 Notice how every branch traces back to PID 1 (systemd)!
When you launch python3 in your terminal, its parent (PPID) is bash(1120), whose parent is sshd(1110).`}
                      </pre>
                    </div>
                  )}

                  {t12ViewMode === 'states' && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {['R', 'S', 'D', 'Z', 'T'].map((stKey) => (
                          <button
                            key={stKey}
                            onClick={() => {
                              sounds.playPop();
                              setT12SelectedState(stKey);
                            }}
                            className={`px-3 py-1.5 rounded-xl font-mono font-black text-xs border transition-all ${
                              t12SelectedState === stKey
                                ? 'bg-blue-600 text-white border-blue-400 shadow-md scale-105'
                                : 'bg-[#182035] text-slate-300 border-slate-700 hover:bg-[#202b48]'
                            }`}
                          >
                            State {stKey}
                          </button>
                        ))}
                      </div>

                      <div className={`p-4 rounded-2xl border ${statesMeta[t12SelectedState].color}`}>
                        <div className="font-mono font-black text-sm sm:text-base">
                          {statesMeta[t12SelectedState].label}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold mt-1 text-slate-200">
                          {statesMeta[t12SelectedState].desc}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 12.2: REAL-TIME & ENHANCED PROCESS MONITORING (top vs htop)
                ================================================================= */}
            {activeSubtopicId === 'realtime-process-monitoring' && (() => {
              return (
                <div className="bg-[#111728]/95 rounded-3xl p-5 sm:p-6 border-4 border-emerald-400 shadow-xl space-y-5">
                  <div className="border-b-2 border-emerald-900/60 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 12.2
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-white mt-1">
                      Interactive htop Color Dashboard Simulator
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-300">
                      Experience the multi-core CPU meters of htop, sort columns with Shift+P / Shift+M, and toggle the tree view with F5!
                    </p>
                  </div>

                  {/* 4 CPU Core Visual Meters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#0a0e1a] p-4 rounded-2xl border border-slate-800">
                    {[
                      { core: '1 [||||||||||||||||||||||||||        62.4%]', pct: 'w-[62%]', col: 'bg-emerald-500' },
                      { core: '2 [||||||||||||||                    34.1%]', pct: 'w-[34%]', col: 'bg-emerald-500' },
                      { core: '3 [||||||||||||||||||||||||||||||||  88.5%]', pct: 'w-[88%]', col: 'bg-amber-500' },
                      { core: '4 [|||||                             12.0%]', pct: 'w-[12%]', col: 'bg-emerald-500' }
                    ].map((c, i) => (
                      <div key={i} className="font-mono text-xs text-slate-300 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span>CPU Core {i + 1}</span>
                          <span className="text-emerald-400">{c.core.split(']').pop().trim()}</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div className={`h-full ${c.col} ${c.pct} transition-all`} />
                        </div>
                      </div>
                    ))}
                    <div className="sm:col-span-2 pt-2 border-t border-slate-800/80 flex flex-wrap justify-between text-xs font-mono text-cyan-300">
                      <span>Mem: 2.14G/7.84G [|||||||||||      27.3%]</span>
                      <span>Swp: 0K/2.00G [                     0.0%]</span>
                      <span>Load average: 1.42 0.88 0.52 (4 Cores)</span>
                    </div>
                  </div>

                  {/* Action Toolbar */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-slate-400">Sort By:</span>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setT12HtopSort('cpu');
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-mono font-black border transition-all ${
                        t12HtopSort === 'cpu'
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      Shift+P (%CPU)
                    </button>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setT12HtopSort('mem');
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-mono font-black border transition-all ${
                        t12HtopSort === 'mem'
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      Shift+M (%MEM)
                    </button>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setT12HtopTree(!t12HtopTree);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-mono font-black border transition-all ${
                        t12HtopTree
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      F5 (Tree View: {t12HtopTree ? 'ON' : 'OFF'})
                    </button>
                  </div>

                  {/* htop Process View */}
                  <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto">
                    <div className="text-slate-400 pb-1.5 border-b border-slate-800 flex justify-between font-bold">
                      <span>  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command</span>
                    </div>
                    <div className="space-y-1 pt-1.5 text-slate-200">
                      {t12HtopSort === 'cpu' ? (
                        <>
                          <div className="text-amber-400"> 1420 sam        20   0  520M  180M 32.1M R 78.4  2.3  1:12.40 ffmpeg -i input.mp4 output.mkv</div>
                          <div> 1024 postgres   20   0  380M 84.1M 32.1M S  4.2  1.1  0:45.10 postgres: worker process</div>
                          <div>  891 www-data   20   0  145M 28.4M  9.4M S  1.1  0.4  0:12.30 nginx: worker process</div>
                        </>
                      ) : (
                        <>
                          <div className="text-cyan-400"> 2100 mysql      20   0 1.2G  680M 45.0M S  0.8  8.7  4:20.10 /usr/sbin/mysqld</div>
                          <div> 1420 sam        20   0  520M  180M 32.1M R 78.4  2.3  1:12.40 ffmpeg -i input.mp4 output.mkv</div>
                          <div> 1024 postgres   20   0  380M 84.1M 32.1M S  4.2  1.1  0:45.10 postgres: worker process</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 12.3: MANAGING PROCESSES & SIGNALS
                ================================================================= */}
            {activeSubtopicId === 'managing-processes-and-signals' && (() => {
              const signalOptions = [
                { sig: 15, name: 'SIGTERM', desc: 'Polite request to terminate. Process flushes files and exits cleanly.' },
                { sig: 9, name: 'SIGKILL', desc: 'Kernel hammer! Unblockable immediate termination with zero warning.' },
                { sig: 1, name: 'SIGHUP', desc: 'Hangup signal. Re-reads configuration file without dropping users.' },
                { sig: 19, name: 'SIGSTOP', desc: 'Freezes process execution in place (like pause on a video).' },
                { sig: 18, name: 'SIGCONT', desc: 'Resumes frozen process execution right where it paused.' }
              ];

              return (
                <div className="bg-[#111728]/95 rounded-3xl p-5 sm:p-6 border-4 border-rose-400 shadow-xl space-y-5">
                  <div className="border-b-2 border-rose-900/60 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-300 bg-rose-950/80 border border-rose-700/60 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 12.3
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-white mt-1">
                      Signal Transmitter & Process Killer Lab
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-300">
                      Send different Linux signals to PID 412 (<code>python3 heavy_app.py</code>) and witness how it reacts to SIGTERM 15, SIGKILL 9, SIGHUP 1, and SIGSTOP 19!
                    </p>
                  </div>

                  {/* Pick Signal */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {signalOptions.map((opt) => (
                      <button
                        key={opt.sig}
                        onClick={() => {
                          sounds.playPop();
                          setT12SelectedSignal(opt.sig);
                          setT12SignalOutput('');
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          t12SelectedSignal === opt.sig
                            ? 'bg-rose-600 text-white border-rose-400 shadow-md font-black'
                            : 'bg-[#182035] text-slate-300 border-slate-700 hover:bg-[#202b48]'
                        }`}
                      >
                        <div className="font-mono text-xs font-black">
                          kill -{opt.sig}
                        </div>
                        <div className="text-[11px] opacity-90 mt-0.5">{opt.name}</div>
                      </button>
                    ))}
                  </div>

                  {/* Fire Button & Output */}
                  <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="font-mono text-xs sm:text-sm text-amber-300">
                        Target: PID 412 (<code>python3 heavy_app.py</code>)
                      </div>
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          confetti({ particleCount: 50, spread: 60, origin: { y: 0.65 } });
                          if (t12SelectedSignal === 15) {
                            setT12SignalOutput('✅ kill -15 sent! PID 412 caught SIGTERM: saved open state to disk and exited cleanly (Exit Code 0).');
                          } else if (t12SelectedSignal === 9) {
                            setT12SignalOutput('⚡ kill -9 sent! Linux Kernel forcefully nuked PID 412 instantly. Process destroyed with no chance to reply.');
                          } else if (t12SelectedSignal === 1) {
                            setT12SignalOutput('🔄 kill -1 sent! PID 412 caught SIGHUP: reloaded configuration file successfully without dropping active tasks!');
                          } else if (t12SelectedSignal === 19) {
                            setT12SignalOutput('⏸️ kill -19 sent! PID 412 caught SIGSTOP: process is now FROZEN in state T (Stopped). Send -18 to unfreeze!');
                          } else {
                            setT12SignalOutput('▶️ kill -18 sent! PID 412 caught SIGCONT: process unfrozen and resumed running smoothly!');
                          }
                        }}
                        className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm border-2 border-rose-400 flex items-center gap-2"
                      >
                        <span>🚀 Send Signal {t12SelectedSignal} to PID 412</span>
                      </button>
                    </div>

                    {t12SignalOutput && (
                      <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/50 text-emerald-300 font-mono text-xs sm:text-sm">
                        {t12SignalOutput}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 12.4: CONTROLLING PROCESS PRIORITY (NICE & RENICE)
                ================================================================= */}
            {activeSubtopicId === 'controlling-process-priority' && (() => {
              // Calculate simulated CPU share based on niceness (-20 to +19)
              // -20 gives ~95%, 0 gives ~50%, +19 gives ~5%
              const cpuShare = Math.round(50 - (t12NiceVal * 2.3));

              return (
                <div className="bg-[#111728]/95 rounded-3xl p-5 sm:p-6 border-4 border-purple-400 shadow-xl space-y-5">
                  <div className="border-b-2 border-purple-900/60 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-300 bg-purple-950/80 border border-purple-700/60 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 12.4
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-white mt-1">
                      The Niceness Scale Dial (-20 VIP to +19 Polite)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-300">
                      Drag the niceness slider from -20 to +19 and see how the Linux CPU Scheduler shifts time slices between polite background tasks and aggressive VIP tasks!
                    </p>
                  </div>

                  {/* Slider Control */}
                  <div className="bg-[#151c30] p-4 rounded-2xl border border-slate-700/70 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-purple-300">
                        Niceness Value (NI):
                      </span>
                      <span className="font-mono font-black text-base px-3 py-1 rounded-xl bg-purple-900/80 text-white border border-purple-500">
                        {t12NiceVal > 0 ? `+${t12NiceVal}` : t12NiceVal} {t12NiceVal < 0 ? '🚨 (VIP / Selfish)' : t12NiceVal > 0 ? '😇 (Very Polite)' : '⚖️ (Default)'}
                      </span>
                    </div>

                    <input
                      type="range"
                      min="-20"
                      max="19"
                      value={t12NiceVal}
                      onChange={(e) => {
                        sounds.playPop();
                        setT12NiceVal(parseInt(e.target.value, 10));
                      }}
                      className="w-full accent-purple-500 cursor-pointer"
                    />

                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>-20 (VIP / Grab CPU)</span>
                      <span>0 (Normal Default)</span>
                      <span>+19 (Polite / Step Aside)</span>
                    </div>
                  </div>

                  {/* Simulated CPU Share Meter */}
                  <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-mono font-bold">
                      <span className="text-slate-300">Simulated CPU Time Slice for Video Encoding:</span>
                      <span className="text-purple-300">{cpuShare}% of CPU capacity</span>
                    </div>
                    <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                        style={{ width: `${cpuShare}%` }}
                      />
                    </div>
                    <div className="font-mono text-xs text-slate-400 pt-2 space-y-1">
                      <div># To launch with this priority:</div>
                      <div className="text-emerald-300">$ {t12NiceVal < 0 ? 'sudo ' : ''}nice -n {t12NiceVal} ffmpeg -i movie.mp4 output.mkv</div>
                      <div># To change priority on a running process:</div>
                      <div className="text-cyan-300">$ {t12NiceVal < 0 ? 'sudo ' : ''}renice {t12NiceVal} -p 104</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 12.5: MANAGING BACKGROUND AND FOREGROUND JOBS
                ================================================================= */}
            {activeSubtopicId === 'background-and-foreground-jobs' && (() => {
              return (
                <div className="bg-[#111728]/95 rounded-3xl p-5 sm:p-6 border-4 border-amber-400 shadow-xl space-y-5">
                  <div className="border-b-2 border-amber-900/60 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-700/60 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 12.5
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-white mt-1">
                      Terminal Multitasking & Job Control Simulator
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-300">
                      Step through the classic job control workflow: freeze a foreground command with <code>Ctrl+Z</code>, push it to background with <code>bg</code>, pull it back with <code>fg</code>, and protect it with <code>nohup</code>!
                    </p>
                  </div>

                  {/* 4 Interactive Step Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setT12JobStatus('fg_running');
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        t12JobStatus === 'fg_running'
                          ? 'bg-amber-600 text-white border-amber-400 shadow-md font-black'
                          : 'bg-[#182035] text-slate-300 border-slate-700 hover:bg-[#202b48]'
                      }`}
                    >
                      <div className="text-xs font-black">1. Start in FG</div>
                      <div className="text-[11px] opacity-80 mt-0.5">$ tar -czf backup.tar.gz</div>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playPop();
                        setT12JobStatus('stopped');
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        t12JobStatus === 'stopped'
                          ? 'bg-amber-600 text-white border-amber-400 shadow-md font-black'
                          : 'bg-[#182035] text-slate-300 border-slate-700 hover:bg-[#202b48]'
                      }`}
                    >
                      <div className="text-xs font-black">2. Press Ctrl+Z</div>
                      <div className="text-[11px] opacity-80 mt-0.5">Suspend / Freeze Job</div>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        setT12JobStatus('bg_running');
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        t12JobStatus === 'bg_running'
                          ? 'bg-amber-600 text-white border-amber-400 shadow-md font-black'
                          : 'bg-[#182035] text-slate-300 border-slate-700 hover:bg-[#202b48]'
                      }`}
                    >
                      <div className="text-xs font-black">3. Run "bg %1"</div>
                      <div className="text-[11px] opacity-80 mt-0.5">Resume in Background</div>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        setT12JobStatus('done');
                        confetti({ particleCount: 50, spread: 60, origin: { y: 0.65 } });
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        t12JobStatus === 'done'
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md font-black'
                          : 'bg-[#182035] text-slate-300 border-slate-700 hover:bg-[#202b48]'
                      }`}
                    >
                      <div className="text-xs font-black">4. Run "fg %1"</div>
                      <div className="text-[11px] opacity-80 mt-0.5">Pull to Foreground</div>
                    </button>
                  </div>

                  {/* Terminal Simulation Console */}
                  <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm">
                    {t12JobStatus === 'fg_running' && (
                      <div className="text-amber-300 space-y-1">
                        <div>sam@cozy-house:~$ tar -czf backup.tar.gz /home/sam/data</div>
                        <div className="text-slate-400 animate-pulse">[Terminal Locked... Keyboard standard input belongs to tar. Press Ctrl+Z to freeze!]</div>
                      </div>
                    )}
                    {t12JobStatus === 'stopped' && (
                      <div className="text-slate-200 space-y-1">
                        <div>sam@cozy-house:~$ ^Z</div>
                        <div className="text-purple-300">[1]+  Stopped                 tar -czf backup.tar.gz /home/sam/data</div>
                        <div>sam@cozy-house:~$ jobs -l</div>
                        <div className="text-cyan-300">[1]+  1420 Stopped (SIGTSTP)   tar -czf backup.tar.gz /home/sam/data</div>
                        <div className="text-emerald-400">✅ Prompt freed! Type "bg %1" to resume running in the background.</div>
                      </div>
                    )}
                    {t12JobStatus === 'bg_running' && (
                      <div className="text-slate-200 space-y-1">
                        <div>sam@cozy-house:~$ bg %1</div>
                        <div className="text-emerald-300">[1]+ tar -czf backup.tar.gz /home/sam/data &</div>
                        <div>sam@cozy-house:~$ jobs</div>
                        <div className="text-cyan-300">[1]+  Running                 tar -czf backup.tar.gz /home/sam/data &</div>
                        <div className="text-yellow-300">🎉 It is running silently behind the scenes! You can keep typing commands in your terminal!</div>
                      </div>
                    )}
                    {t12JobStatus === 'done' && (
                      <div className="text-slate-200 space-y-1">
                        <div>sam@cozy-house:~$ fg %1</div>
                        <div className="text-cyan-300">tar -czf backup.tar.gz /home/sam/data</div>
                        <div className="text-emerald-400">Compression complete! Exit Code: 0 (Success) ✅</div>
                        <div>sam@cozy-house:~$ _</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* =================================================================
                TOYBOX 12.6: MONITORING DISK USAGE
                ================================================================= */}
            {activeSubtopicId === 'monitoring-disk-usage' && (() => {
              return (
                <div className="bg-[#111728]/95 rounded-3xl p-5 sm:p-6 border-4 border-cyan-400 shadow-xl space-y-5">
                  <div className="border-b-2 border-cyan-900/60 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-700/60 px-3 py-1 rounded-full">
                      🎮 Playable Toybox 12.6
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-white mt-1">
                      Disk Detective & Space Recovery Station (df -h vs du -sh)
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-300">
                      Explore partition capacity with <code>df -h</code>, understand Inode exhaustion with <code>df -i</code>, and use <code>du -sh *</code> to track down and delete a rogue 24GB log file!
                    </p>
                  </div>

                  {/* Mode Tabs */}
                  <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
                    {[
                      { id: 'df', label: '💽 df -h (Partition View)' },
                      { id: 'inodes', label: '🏷️ df -i (Inode Limits)' },
                      { id: 'du', label: '🔍 du -sh * (Find Bloatware)' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          sounds.playPop();
                          setT12DiskMode(tab.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                          t12DiskMode === tab.id
                            ? 'bg-cyan-600 text-white shadow-md'
                            : 'bg-slate-900/80 text-slate-400 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {t12DiskMode === 'df' && (
                    <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm">
                      <pre className="whitespace-pre-wrap leading-relaxed text-cyan-300">
{`$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   ${t12DeletedCulprit ? '12G   38G  24%' : '48G  2.0G  96% ⚠️'} /
/dev/sda2       1.0G  240M  760M  24% /boot
/dev/sdb1       200G   45G  155G  23% /home
tmpfs           3.9G     0  3.9G   0% /dev/shm

${t12DeletedCulprit ? '✅ Root partition has 38GB of free space! Everything is breathing easy.' : '🚨 WARNING: Root partition is 96% FULL! Switch to the "du -sh" tab to find who ate the disk space!'}`}
                      </pre>
                    </div>
                  )}

                  {t12DiskMode === 'inodes' && (
                    <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-yellow-300">
                      <pre className="whitespace-pre-wrap leading-relaxed">
{`$ df -i
Filesystem       Inodes   IUsed   IFree IUse% Mounted on
/dev/sda1       3276800  412580 2864220   13% /
/dev/sda2         65536     320   65216    1% /boot
/dev/sdb1      13107200  891000 12216200   7% /home

💡 What are Inodes?
Every single file, folder, and symlink in Linux requires 1 Inode (index card).
Even if your hard drive has 100 GB of free bytes, if a broken script creates millions of 0-byte files and uses up 100% of your Inodes, Linux will throw:
"No space left on device" and refuse to save anything!`}
                      </pre>
                    </div>
                  )}

                  {t12DiskMode === 'du' && (
                    <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm space-y-3">
                      <div className="text-slate-300">
                        $ sudo du -sh /var/log/* | sort -h
                      </div>
                      <div className="space-y-1 text-slate-300">
                        <div>12K     /var/log/dpkg.log</div>
                        <div>450K    /var/log/auth.log</div>
                        <div>12M     /var/log/syslog</div>
                        {!t12DeletedCulprit ? (
                          <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-500 text-rose-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <span>24G     /var/log/bloated_debug.log 🚨 (Found the disk hog!)</span>
                            <button
                              onClick={() => {
                                sounds.playSuccess();
                                setT12DeletedCulprit(true);
                                confetti({ particleCount: 70, spread: 80, origin: { y: 0.65 } });
                              }}
                              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs"
                            >
                              🗑️ sudo rm -f bloated_debug.log
                            </button>
                          </div>
                        ) : (
                          <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 flex items-center justify-between">
                            <span>✅ Deleted bloated_debug.log! 24 GB reclaimed instantly.</span>
                            <button
                              onClick={() => setT12DeletedCulprit(false)}
                              className="text-[11px] underline text-slate-400 hover:text-white"
                            >
                              Recreate file to test again
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* BOTTOM QUICK SUMMARY & NEXT SUBTOPIC FOOTER (NIGHT MODE + INDEPENDENT READ-ALOUD) */}
            <div
              className={`bg-gradient-to-r from-[#141b2e] via-[#101626] to-[#0c101d] rounded-3xl p-5 border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
                speakingBoxId === 'pocket-takeaway'
                  ? 'speak-box-active border-amber-400'
                  : 'border-amber-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner shrink-0">
                  💡
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-amber-400">
                    Pocket Takeaway to Remember:
                  </div>
                  <div className="text-sm sm:text-base font-black text-white">
                    {currentSubtopic.quickTakeaway}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    speakBoxText(
                      'pocket-takeaway',
                      `Pocket Takeaway to Remember: ${currentSubtopic.quickTakeaway}`
                    )
                  }
                  className={`px-3 py-2 rounded-2xl font-black text-xs border transition-all flex items-center gap-1.5 shadow-sm ${
                    speakingBoxId === 'pocket-takeaway'
                      ? 'bg-rose-500 text-white border-rose-400 animate-voice-pulse'
                      : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40'
                  }`}
                  title="Read this takeaway aloud and stop"
                >
                  {speakingBoxId === 'pocket-takeaway' ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>🔊 Read Takeaway</span>
                    </>
                  )}
                </button>
                {(() => {
                  const idx = currentSubtopicsList.findIndex(
                    (s) => s.id === activeSubtopicId
                  );
                  const nextSub = currentSubtopicsList[idx + 1];
                  if (nextSub) {
                    return (
                      <button
                        onClick={() => {
                          sounds.playPop();
                          setActiveSubtopicId(nextSub.id);
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
                      >
                        <span>
                          Next: {nextSub.number} {nextSub.shortTitle}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    );
                  }
                  if (mainTab === 'topic1') {
                    return (
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setMainTab('topic2');
                          setActiveTopic2SubId('file-system');
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
                      >
                        <span>Go to Topic 2: Linux File System</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    );
                  }
                  if (mainTab === 'topic2') {
                    return (
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setMainTab('topic3');
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
                      >
                        <span>Go to Topic 3: 25 Basic Commands</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    );
                  }
                  if (mainTab === 'topic4') {
                    return (
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setMainTab('topic5');
                          setActiveTopic5SubId('tar-archiving');
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
                      >
                        <span>Go to Topic 5: Archiving & Compressing</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    );
                  }
                  if (mainTab === 'topic5') {
                    return (
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setMainTab('topic6');
                          setActiveTopic6SubId('package-managers-and-systemctl');
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
                      >
                        <span>Go to Topic 6: Package Management</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    );
                  }
                  if (mainTab === 'topic6') {
                    return (
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setMainTab('topic7');
                          setActiveTopic7SubId('user-management-overview');
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
                      >
                        <span>Go to Topic 7: User & Group Management</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    );
                  }
                  if (mainTab === 'topic7') {
                    return (
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setMainTab('topic8');
                          setActiveTopic8SubId('configuring-network-interfaces');
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
                      >
                        <span>Go to Topic 8: Linux Networking</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    );
                  }
                  if (mainTab === 'topic8') {
                    return (
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setMainTab('topic9');
                          setActiveTopic9SubId('dhcp-service');
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
                      >
                        <span>Go to Topic 9: Networking Services</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    );
                  }
                  if (mainTab === 'topic9') {
                    return (
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setMainTab('topic10');
                          setActiveTopic10SubId('linux-firewall-overview');
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
                      >
                        <span>Go to Topic 10: Linux Firewall</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    );
                  }
                  if (mainTab === 'topic10') {
                    return (
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setMainTab('topic11');
                          setActiveTopic11SubId('centos-network-interfaces');
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
                      >
                        <span>Go to Topic 11: Monitoring & Troubleshooting</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    );
                  }
                  if (mainTab === 'topic11') {
                    return (
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setMainTab('topic12');
                          setActiveTopic12SubId('viewing-processes');
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
                      >
                        <span>Go to Topic 12: Process Management</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    );
                  }
                  return (
                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        setMainTab('roadmap');
                      }}
                      className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5"
                    >
                      <span>View All Topics Roadmap</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
