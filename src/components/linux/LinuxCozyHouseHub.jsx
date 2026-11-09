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
import { sounds } from '../../utils/audio';
import { stopSpeech } from '../../utils/speech';

export default function LinuxCozyHouseHub() {
  // Top-level view: 'topic1' | 'topic2' | 'topic3' | 'topic4' | 'topic5' | 'topic6' | 'topic7' | 'roadmap'
  // Default to 'topic7' so the user immediately sees Topic 7: User and Group Management!
  const [mainTab, setMainTab] = useState('topic7');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active subtopic IDs for Topic 1, Topic 2, Topic 4, Topic 5, Topic 6, and Topic 7
  const [activeTopic1SubId, setActiveTopic1SubId] = useState('distributions');
  const [activeTopic2SubId, setActiveTopic2SubId] = useState('file-system');
  const [activeTopic4SubId, setActiveTopic4SubId] = useState('file-management');
  const [activeTopic5SubId, setActiveTopic5SubId] = useState('tar-archiving');
  const [activeTopic6SubId, setActiveTopic6SubId] = useState('package-managers-and-systemctl');
  const [activeTopic7SubId, setActiveTopic7SubId] = useState('user-management-overview');

  // Topic 3 (25 Basic Commands) states
  const [selectedCmdGroup, setSelectedCmdGroup] = useState('all');
  const [selectedCmdNum, setSelectedCmdNum] = useState(1); // 1..25
  const [cmdSearch, setCmdSearch] = useState('');
  const [triedCommands, setTriedCommands] = useState({ 1: true });
  const [cmdSimTriggered, setCmdSimTriggered] = useState(false);

  // Analogy filter: 'both' | 'original' | 'kenyan'
  const [analogyFilter, setAnalogyFilter] = useState('both');

  // Read-aloud state
  const [isSpeaking, setIsSpeaking] = useState(false);

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

  // Determine current active subtopics list and current subtopic object for Topic 1, Topic 2, Topic 4, Topic 5, Topic 6 & Topic 7
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
      : linuxTopic7Subtopics;
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
      : activeTopic7SubId;
  const setActiveSubtopicId = (id) => {
    if (mainTab === 'topic1') setActiveTopic1SubId(id);
    else if (mainTab === 'topic2') setActiveTopic2SubId(id);
    else if (mainTab === 'topic4') setActiveTopic4SubId(id);
    else if (mainTab === 'topic5') setActiveTopic5SubId(id);
    else if (mainTab === 'topic6') setActiveTopic6SubId(id);
    else setActiveTopic7SubId(id);
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
    setCmdSimTriggered(false);
  }, [
    activeTopic1SubId,
    activeTopic2SubId,
    activeTopic4SubId,
    activeTopic5SubId,
    activeTopic6SubId,
    activeTopic7SubId,
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

  // Friendly Read-Aloud helper for Topic 1 & Topic 2
  const handleReadAloud = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }
    stopSpeech();
    const textToRead = `${currentSubtopic.title}. In simple terms: ${currentSubtopic.laymanHeadline}. ${currentSubtopic.laymanExplanation}. Original House Analogy: ${currentSubtopic.originalAnalogy.summary}. Kenyan Analogy: ${currentSubtopic.kenyanAnalogy.summary}.`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.93;
    utterance.pitch = 1.02;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Friendly Read-Aloud helper for Topic 3 (25 Commands)
  const handleReadCommandAloud = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }
    stopSpeech();
    const c = currentCommandObj;
    const textToRead = `Command number ${c.num}: ${c.cmd}, which stands for ${c.fullName}. In plain English: ${c.layman}. Original House Analogy: ${c.houseAnalogy}. Kenyan Analogy: ${c.kenyanAnalogy}. 5-Second Body Move: ${c.bodyMove}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.93;
    utterance.pitch = 1.02;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
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
    <div className="min-h-screen bg-amber-50/50 text-slate-800 flex flex-col">
      {/* DEDICATED STANDALONE LINUX COZY HOUSE HEADER (100% Independent) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-4 border-amber-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand Title */}
          <button
            onClick={() => {
              sounds.playPop();
              setMainTab('topic6');
            }}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-amber-500 flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform">
              🏡
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-black text-base sm:text-xl text-slate-900 tracking-tight">
                <span>Sam’s Linux House & Kenyan Mtaa</span>
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-slate-500">
                Friendly • Hands-On • Dual Analogies • Neurodivergent & Beginner Safe
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
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border-2 transition-all flex items-center gap-1 ${
                mainTab === 'topic1'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm scale-105'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-300'
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
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border-2 transition-all flex items-center gap-1 ${
                mainTab === 'topic2'
                  ? 'bg-sky-600 text-white border-sky-700 shadow-sm scale-105'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-950 border-sky-300'
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
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border-2 transition-all flex items-center gap-1 ${
                mainTab === 'topic3'
                  ? 'bg-purple-600 text-white border-purple-700 shadow-sm scale-105'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-950 border-purple-300'
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
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border-2 transition-all flex items-center gap-1 ${
                mainTab === 'topic4'
                  ? 'bg-rose-600 text-white border-rose-700 shadow-sm scale-105'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-950 border-rose-300'
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
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border-2 transition-all flex items-center gap-1 ${
                mainTab === 'topic5'
                  ? 'bg-teal-600 text-white border-teal-700 shadow-sm scale-105'
                  : 'bg-teal-50 hover:bg-teal-100 text-teal-950 border-teal-300'
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
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border-2 transition-all flex items-center gap-1 ${
                mainTab === 'topic6'
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm scale-105'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border-indigo-300'
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
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border-2 transition-all flex items-center gap-1 ${
                mainTab === 'topic7'
                  ? 'bg-orange-600 text-white border-orange-700 shadow-sm scale-105'
                  : 'bg-orange-50 hover:bg-orange-100 text-orange-950 border-orange-300'
              }`}
            >
              <span>👨‍👩‍👧‍👦</span>
              <span>Topic 7: Users & Groups (12)</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setMainTab('roadmap');
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl font-extrabold text-xs border-2 transition-all flex items-center gap-1 ${
                mainTab === 'roadmap'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm scale-105'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>🗺️ All</span>
            </button>

            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              className={`px-2.5 py-1.5 sm:py-2 rounded-2xl font-bold text-xs border-2 transition-all flex items-center gap-1 ${
                soundEnabled
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-slate-100 border-slate-300 text-slate-500'
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 flex-1 w-full">
        {/* WARM COZY HERO BANNER */}
        <div className="bg-gradient-to-r from-amber-100 via-emerald-50 to-sky-100 rounded-3xl p-5 sm:p-7 border-4 border-amber-300 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-amber-500 text-white font-black text-xs sm:text-sm shadow-sm flex items-center gap-1.5">
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
                      : 'Complete Linux Curriculum Map'}
                  </span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 border-2 border-emerald-300 text-emerald-900 font-extrabold text-xs">
                  ✨ Simple English • Dual Analogies • 5-Sec Body Move • Playable Toybox
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
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
                  : 'All Linux Topics & Subtopics Roadmap 🗺️'}
              </h1>

              <p className="text-slate-700 font-semibold text-sm sm:text-base leading-relaxed">
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
                  : 'Browse all topics from your Linux curriculum. Topics 1 through 7 are fully interactive right now!'}
              </p>
            </div>

            {/* Quick Topic Jump Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-1.5 shrink-0">
              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic1');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border-2 transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic1'
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-emerald-50'
                }`}
              >
                <span>🏡 1. Basics</span>
                <span className="px-1.5 py-0.5 rounded-full bg-black/10 text-[10px]">3</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic2');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border-2 transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic2'
                    ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-sky-50'
                }`}
              >
                <span>🧭 2. File Sys</span>
                <span className="px-1.5 py-0.5 rounded-full bg-black/10 text-[10px]">5</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic3');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border-2 transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic3'
                    ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-purple-50'
                }`}
              >
                <span>🧰 3. Commands</span>
                <span className="px-1.5 py-0.5 rounded-full bg-black/10 text-[10px]">25</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic4');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border-2 transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic4'
                    ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-rose-50'
                }`}
              >
                <span>🔑 4. Perms</span>
                <span className="px-1.5 py-0.5 rounded-full bg-black/10 text-[10px]">5</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic5');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border-2 transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic5'
                    ? 'bg-teal-600 text-white border-teal-700 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-teal-50'
                }`}
              >
                <span>📦 5. Archive</span>
                <span className="px-1.5 py-0.5 rounded-full bg-black/10 text-[10px]">6</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic6');
                }}
                className={`px-3 py-1.5 rounded-2xl font-black text-xs border-2 transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic6'
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-indigo-50'
                }`}
              >
                <span>🛒 6. Packages</span>
                <span className="px-1.5 py-0.5 rounded-full bg-black/10 text-[10px]">5</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setMainTab('topic7');
                }}
                className={`col-span-2 px-3 py-1.5 rounded-2xl font-black text-xs border-2 transition-all flex items-center justify-between gap-2 ${
                  mainTab === 'topic7'
                    ? 'bg-orange-600 text-white border-orange-700 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-orange-50'
                }`}
              >
                <span>👨‍👩‍👧‍👦 7. Users & Groups</span>
                <span className="px-1.5 py-0.5 rounded-full bg-black/10 text-[10px]">12</span>
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

                {/* Read Aloud + Prev/Next Buttons */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={handleReadCommandAloud}
                    className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all flex items-center gap-2 shadow-sm ${
                      isSpeaking
                        ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                        : 'bg-white hover:bg-amber-50 text-slate-800 border-slate-300'
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Stop Voice</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-600" />
                        <span>🔊 Read Tool #{currentCommandObj.num} to Me</span>
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
                    className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 border-2 border-slate-300 text-slate-800 font-black text-xs"
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
                    className="px-3.5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs flex items-center gap-1 shadow-sm"
                  >
                    <span>Next Tool</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Plain Layman Explanation + Real Example */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border-2 border-emerald-200 shadow-sm space-y-2">
                  <div className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>In Simple Layman’s English:</span>
                  </div>
                  <p className="text-base sm:text-xl font-black text-slate-900 leading-snug">
                    {currentCommandObj.layman}
                  </p>
                </div>

                <div className="lg:col-span-5 bg-amber-50 rounded-2xl p-4 sm:p-5 border-2 border-amber-300 shadow-sm space-y-1.5">
                  <div className="text-xs font-black uppercase tracking-wider text-amber-900">
                    📝 Everyday Example Command:
                  </div>
                  <div className="font-mono text-sm sm:text-base font-black bg-slate-900 text-amber-300 px-3.5 py-2 rounded-xl">
                    $ {currentCommandObj.exampleCmd}
                  </div>
                  <p className="text-xs sm:text-sm font-extrabold text-amber-950 pt-1">
                    💬 Translation: {currentCommandObj.exampleMeaning}
                  </p>
                </div>
              </div>

              {/* DUAL ANALOGIES FOR THIS COMMAND */}
              <div
                className={`grid grid-cols-1 ${
                  analogyFilter === 'both' ? 'md:grid-cols-2' : 'md:grid-cols-1'
                } gap-4`}
              >
                {(analogyFilter === 'both' || analogyFilter === 'original') && (
                  <div className="bg-amber-50/95 rounded-3xl p-5 border-4 border-amber-300 space-y-2 shadow-sm">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200 text-amber-950 text-xs font-black">
                      <span>🏠 Original House Analogy (Made Simple)</span>
                    </div>
                    <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-relaxed">
                      {currentCommandObj.houseAnalogy}
                    </p>
                  </div>
                )}

                {(analogyFilter === 'both' || analogyFilter === 'kenyan') && (
                  <div className="bg-white rounded-3xl p-5 border-4 border-emerald-400 space-y-2 shadow-sm">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-200 text-emerald-950 text-xs font-black">
                      <span>🇰🇪 Kenyan Everyday Analogy</span>
                    </div>
                    <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-relaxed">
                      {currentCommandObj.kenyanAnalogy}
                    </p>
                  </div>
                )}
              </div>

              {/* 5-SECOND BODY MOVE FOR THIS COMMAND */}
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 rounded-3xl p-5 border-4 border-purple-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-purple-200 text-purple-950 text-xs font-black">
                    <span>🤸🧠 5-Second Muscle Memory Move for "{currentCommandObj.cmd}"</span>
                  </div>
                  <p className="text-sm sm:text-base font-black text-purple-950">
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
           VIEW C: TOPIC 1, TOPIC 2, TOPIC 4, TOPIC 5, TOPIC 6, OR TOPIC 7 PLAYGROUND
           ===================================================================== */}
        {(mainTab === 'topic1' ||
          mainTab === 'topic2' ||
          mainTab === 'topic4' ||
          mainTab === 'topic5' ||
          mainTab === 'topic6' ||
          mainTab === 'topic7') && (
          <div className="space-y-6">
            {/* STEP 1: SUBTOPIC SELECTOR CARDS */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border-4 border-amber-200 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-600" />
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
                      : 'Topic 7: User and Group Management (12 Subtopics)'}
                    :
                  </span>
                </span>

                <div className="flex flex-wrap items-center gap-1.5 bg-amber-50 p-1 rounded-2xl border-2 border-amber-200">
                  <button
                    onClick={() => {
                      sounds.playPop();
                      setAnalogyFilter('both');
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                      analogyFilter === 'both'
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'text-amber-900 hover:bg-amber-100'
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
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'text-amber-900 hover:bg-amber-100'
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
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-emerald-900 hover:bg-emerald-100'
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
                    : currentSubtopicsList.length === 6
                    ? 'lg:grid-cols-3 xl:grid-cols-6'
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
                      className={`p-3.5 rounded-2xl border-4 text-left transition-all flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-700 shadow-md scale-[1.02]'
                          : 'bg-amber-50/60 hover:bg-amber-100/70 text-slate-800 border-amber-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-2xl bg-white/90 p-1.5 rounded-xl shadow-sm shrink-0">
                          {sub.icon}
                        </span>
                        <span
                          className={`text-[11px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-white/25 text-white'
                              : 'bg-amber-200/80 text-amber-950'
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
                              isSelected ? 'text-yellow-200' : 'text-emerald-700'
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
            <div
              className={`rounded-3xl p-5 sm:p-7 border-4 ${currentSubtopic.pastelBg} ${currentSubtopic.borderColor} shadow-sm space-y-4`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-200/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl bg-white p-3 rounded-2xl shadow-sm border-2 border-slate-200">
                    {currentSubtopic.icon}
                  </span>
                  <div>
                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-black ${currentSubtopic.badgeBg}`}
                    >
                      Subtopic {currentSubtopic.number} • Plain Layman’s English
                    </span>
                    <h2 className="text-xl sm:text-3xl font-black text-slate-900 mt-1">
                      {currentSubtopic.title}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={handleReadAloud}
                  className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all flex items-center gap-2 shrink-0 shadow-sm ${
                    isSpeaking
                      ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                      : 'bg-white hover:bg-amber-50 text-slate-800 border-slate-300'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Stop Reading Aloud</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-600" />
                      <span>🔊 Read This Page to Me</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-200 shadow-sm space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>The Simple 10-Second Idea:</span>
                </div>
                <p className="text-base sm:text-xl font-black text-slate-900 leading-snug">
                  “{currentSubtopic.laymanHeadline}”
                </p>
                <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed pt-1">
                  {currentSubtopic.laymanExplanation}
                </p>
              </div>

              {/* DUAL ANALOGIES */}
              <div
                className={`grid grid-cols-1 ${
                  analogyFilter === 'both' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
                } gap-5 pt-2`}
              >
                {(analogyFilter === 'both' || analogyFilter === 'original') && (
                  <div className="bg-amber-50/90 rounded-3xl p-5 sm:p-6 border-4 border-amber-300 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200 text-amber-950 text-xs font-black">
                        <span>{currentSubtopic.originalAnalogy.icon}</span>
                        <span>Original Analogy (Simplified & Cozy)</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-amber-950">
                        {currentSubtopic.originalAnalogy.title}
                      </h3>

                      <p className="text-sm font-extrabold text-amber-900 bg-white/90 p-3.5 rounded-2xl border-2 border-amber-200">
                        {currentSubtopic.originalAnalogy.summary}
                      </p>

                      <div className="space-y-2.5 pt-1">
                        {currentSubtopic.originalAnalogy.points.map((pt, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-2xl p-3.5 border-2 border-amber-200/90 flex items-start gap-3 shadow-sm"
                          >
                            <span className="text-2xl shrink-0 mt-0.5">{pt.emoji}</span>
                            <div>
                              <div className="font-black text-slate-900 text-sm sm:text-base">
                                {pt.name}
                              </div>
                              <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed mt-0.5">
                                {pt.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {(analogyFilter === 'both' || analogyFilter === 'kenyan') && (
                  <div className="bg-emerald-50/90 rounded-3xl p-5 sm:p-6 border-4 border-emerald-400 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-200 text-emerald-950 text-xs font-black">
                        <span>{currentSubtopic.kenyanAnalogy.icon}</span>
                        <span>Kenyan Everyday Analogy (Mtaa & Home Life)</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-emerald-950">
                        {currentSubtopic.kenyanAnalogy.title}
                      </h3>

                      <p className="text-sm font-extrabold text-emerald-900 bg-white/90 p-3.5 rounded-2xl border-2 border-emerald-200">
                        {currentSubtopic.kenyanAnalogy.summary}
                      </p>

                      <div className="space-y-2.5 pt-1">
                        {currentSubtopic.kenyanAnalogy.points.map((pt, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-2xl p-3.5 border-2 border-emerald-200/90 flex items-start gap-3 shadow-sm"
                          >
                            <span className="text-2xl shrink-0 mt-0.5">{pt.emoji}</span>
                            <div>
                              <div className="font-black text-slate-900 text-sm sm:text-base">
                                {pt.name}
                              </div>
                              <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed mt-0.5">
                                {pt.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 5-SECOND BODY & MIND MICRO-ACTION */}
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 rounded-3xl p-5 sm:p-6 border-4 border-purple-300 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-200 text-purple-950 text-xs font-black">
                      <span>🤸🧠</span>
                      <span>Body & Mind Memory Lock (Great for ADHD & Hands-On Learners!)</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-purple-950">
                      {currentSubtopic.bodyMicroAction.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-slate-700">
                      {currentSubtopic.bodyMicroAction.instruction}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {currentSubtopic.bodyMicroAction.steps.map((step, i) => (
                        <div
                          key={i}
                          className="bg-white/95 p-3 rounded-2xl border-2 border-purple-200 text-xs sm:text-sm font-extrabold text-slate-800 shadow-sm"
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleCompleteBodyMove(currentSubtopic.id)}
                      className={`px-5 py-3.5 rounded-2xl font-black text-sm border-4 transition-all shadow-md active:scale-95 flex items-center gap-2 ${
                        completedBodyMoves[currentSubtopic.id]
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : 'bg-purple-600 hover:bg-purple-700 text-white border-purple-800 animate-bounce'
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

            {/* BOTTOM QUICK SUMMARY & NEXT SUBTOPIC FOOTER */}
            <div className="bg-amber-100/80 rounded-3xl p-5 border-4 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💡</span>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-amber-900">
                    Pocket Takeaway to Remember:
                  </div>
                  <div className="text-sm sm:text-base font-black text-slate-900">
                    {currentSubtopic.quickTakeaway}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
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
