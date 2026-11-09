// ============================================================================
// TOPIC 5: ARCHIVING AND COMPRESSING (6 SUBTOPICS)
// Designed for neurodivergent, ADHD, kid, senior, and tactile learners:
// - Simple Layman's English (zero scary jargon)
// - Dual Analogies: Simplified Original House Analogy + Kenyan Everyday Analogy
// - 5-Second Body & Mind Micro-Actions for muscle memory
// ============================================================================

export const linuxTopic5Subtopics = [
  {
    id: 'tar-archiving',
    number: '5.1',
    title: 'Creating and Extracting Archives using tar',
    shortTitle: '1. tar (Archiving)',
    icon: '📦',
    badgeBg: 'bg-amber-100 text-amber-950 border-amber-300',
    pastelBg: 'bg-amber-50/80',
    borderColor: 'border-amber-300',
    laymanHeadline:
      '`tar` (Tape Archive) is your big cardboard moving box! It gathers 10 or 100 loose files and tapes them together into ONE neat bundle called a `.tar` file (a "tarball").',
    laymanExplanation:
      'Have you ever tried carrying 20 loose oranges in your bare hands? They roll everywhere! `tar` puts all those loose files into ONE single box (`archive.tar`) so you can carry or back them up easily. Important secret: plain `tar` by itself only BUNDLES items together—it does not shrink their size yet! You use `-c` to Create a box, `-t` to peek inside, and `-x` to Extract (unpack) the box.',
    originalAnalogy: {
      title: '🏠 Packing Loose Household Items into One Moving Box (`tar`)',
      icon: '📦🏷️',
      summary:
        'Imagine moving bedrooms in Sam’s House. Instead of carrying 15 books one by one down the stairs, you pack all 15 books into one taped cardboard box labeled `books.tar`!',
      points: [
        {
          emoji: '📥',
          name: 'tar -cvf box.tar files/ (Pack the Box)',
          simple:
            '`-c` = Create a new box, `-v` = Verbose (read out each item as you pack it), `-f` = Filename of the box (`box.tar`). All items are now inside one neat `.tar` container!'
        },
        {
          emoji: '👀',
          name: 'tar -tvf box.tar (X-Ray Peek Inside)',
          simple:
            '`-t` = Table of contents! Like reading the packing list taped on the outside of the box without cutting the tape open.'
        },
        {
          emoji: '📤',
          name: 'tar -xvf box.tar (Unpack the Box)',
          simple:
            '`-x` = Extract! Cuts the tape and places all your items neatly back onto the table.'
        },
        {
          emoji: '⚖️',
          name: 'Archiving vs. Compressing (The Big Secret!)',
          simple:
            'Ten 1-pound books inside a `tar` box still weigh 10 pounds! `tar` bundles many items into 1 file; compression tools (`gzip`, `bzip2`, `xz`) are the vacuum sealers that shrink the weight!'
        }
      ]
    },
    kenyanAnalogy: {
      title: '🇰🇪 Tying Up-Country Shopping into One Gunia / Carton for the Bus',
      icon: '🚌🌾',
      summary:
        'Imagine travelling to Kakamega or Kisii by EasyCoach bus. The conductor won’t let you board holding 12 loose packets of unga, sugar, cooking oil, and thermos flasks—you tie them all into ONE labeled carton or gunia (`mzigo.tar`)!',
      points: [
        {
          emoji: '📦',
          name: 'tar -cvf mzigo.tar unga.txt sukari.txt (Tie the Gunia)',
          simple:
            'You gather all loose shopping items (`-c`), call out each item as it goes in (`-v`), and write the label `mzigo.tar` on the sack (`-f`). Now the bus clerk handles just ONE parcel!'
        },
        {
          emoji: '📋',
          name: 'tar -tvf mzigo.tar (Check the Delivery Note)',
          simple:
            'Before untying the sisal rope, you check the list on top (`-t`) to confirm nothing was forgotten in Nairobi.'
        },
        {
          emoji: '🏠',
          name: 'tar -xvf mzigo.tar (Untie the Gunia at Home)',
          simple:
            'When you reach Shags (up-country), `-x` unties the sack and unpacks every item onto the kitchen table!'
        },
        {
          emoji: '💡',
          name: 'Easy Memory Trick for Flags',
          simple:
            'Remember **"Pack (-cvf) vs. Unpack (-xvf)"** — `c` is Create, `x` is eXtract, and `f` always goes last right before the `.tar` filename!'
        }
      ]
    },
    bodyMove: {
      title: '🤸 5-Second Body Move: The Box Packer & Unpacker!',
      instruction:
        'Scoop your arms wide as if gathering 10 loose items on a table and hug them tight into one box while saying "tar -cvf — Pack into One Box!". Then fling your arms open wide and say "tar -xvf — Extract and Unpack!"',
      whyItWorks:
        'Hugging inward (`-c` create) and flinging outward (`-x` extract) anchors the two most important `tar` flags in your body immediately!'
    },
    quickTakeaway:
      '`tar` bundles many files/folders into 1 `.tar` file: `tar -cvf` packs, `tar -tvf` peeks inside, and `tar -xvf` unpacks!'
  },
  {
    id: 'gzip-compression',
    number: '5.2',
    title: 'Compressing Files using gzip',
    shortTitle: '2. gzip (Fast Shrink)',
    icon: '🗜️',
    badgeBg: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    pastelBg: 'bg-emerald-50/80',
    borderColor: 'border-emerald-300',
    laymanHeadline:
      '`gzip` (GNU Zip) is your fast everyday vacuum sealer! It squeezes all the empty air out of a file so it takes up way less space and adds `.gz` to the end.',
    laymanExplanation:
      'While `tar` puts items into a box, `gzip` actually SHRINKS a file so it takes up 60%–70% less disk space! By default, `gzip report.txt` replaces `report.txt` with a smaller `report.txt.gz` (unless you add `-k` to keep both). And when you combine `tar` + `gzip` together (`tar -czvf`), you get the famous `.tar.gz` bundle—packed AND vacuum-sealed in one step!',
    originalAnalogy: {
      title: '🏠 The Vacuum-Storage Bag for Fluffy Blankets (`gzip`)',
      icon: '🛏️💨',
      summary:
        'Imagine a giant, puffy winter comforter that takes up your whole closet. You put it inside a `gzip` vacuum bag, suck the air out, and—WHOOSH!—it flattens to the size of a pancake (`.gz`)!',
      points: [
        {
          emoji: '💨',
          name: 'gzip notes.txt -> notes.txt.gz (Vacuum-Seal One Item)',
          simple:
            'Squeezes `notes.txt` down to a tiny `.gz` file in a fraction of a second. Notice that by default, the puffy original is replaced by the flat `.gz` bag!'
        },
        {
          emoji: '👯',
          name: 'gzip -k notes.txt (Keep Original Too!)',
          simple:
            'Adding `-k` ("Keep") tells the vacuum sealer: "Make me a flat `.gz` version, AND leave my original open file on the shelf too!"'
        },
        {
          emoji: '⚡',
          name: 'gzip -1 (Fastest) vs. gzip -9 (Tightest Squeeze)',
          simple:
            'Dial `-1` when you are in a rush and want quick shrinking, or dial `-9` when you want the vacuum pump to squeeze out every last drop of air!'
        },
        {
          emoji: '🎁',
          name: 'tar -czvf backup.tar.gz folder/ (Box + Vacuum Together!)',
          simple:
            'Adding `-z` to `tar` tells Linux: "First pack the whole folder into a `.tar` box, then immediately vacuum-seal it with `gzip` into `.tar.gz`!"'
        }
      ]
    },
    kenyanAnalogy: {
      title: '🇰🇪 Pressing a Fluffy Mitumba Bale or Foam Mattress for Transport',
      icon: '🧥🚜',
      summary:
        'Think of buying a big high-density mattress at a supermarket or pressing a bale of jackets at Gikomba. Before pressing, it fills a whole Probox; after `gzip` vacuum-rolling it, it fits under one matatu seat (`.gz`)!',
      points: [
        {
          emoji: '🗜️',
          name: 'gzip (Fast Everyday Compactor)',
          simple:
            'The quickest, most popular compressor in Linux! Almost every website and software package uses `.gz` because it is super fast and shrinks well.'
        },
        {
          emoji: '🛡️',
          name: 'gzip -k (Keep a Counter Copy)',
          simple:
            'Like sealing a sack of maize for storage (`-k`) while leaving a small open tin on the kitchen counter for tonight’s ugali.'
        },
        {
          emoji: '📊',
          name: 'gzip -l file.gz (Check How Much Space You Saved)',
          simple:
            'Shows you the before-and-after weight on the weighing scale (e.g., "Shrank from 100 MB down to 32 MB — 68% saved!").'
        },
        {
          emoji: '📦',
          name: 'The Famous .tar.gz ("Tarball")',
          simple:
            '`gzip` only shrinks ONE file at a time. So to shrink a whole room of files, we first tie them into one gunia with `tar`, then shrink that gunia with `gzip` (`tar -czvf`)!'
        }
      ]
    },
    bodyMove: {
      title: '🤸 5-Second Body Move: The Vacuum Squeeze!',
      instruction:
        'Puff your cheeks full of air and hold your hands wide apart like a giant fluffy pillow. Then press your hands flat together while letting out a long "PSSSSSHHH — gzip .gz!"',
      whyItWorks:
        'Making the vacuum-air sound ("Pssshhh — .gz!") links the `z` in `gzip` (`-z` flag) with shrinking air out of a file!'
    },
    quickTakeaway:
      '`gzip file` shrinks a file into `file.gz` (use `gzip -k` to keep the original, or `tar -czvf box.tar.gz folder/` to bundle and shrink a folder).'
  },
  {
    id: 'gunzip-decompression',
    number: '5.3',
    title: 'Decompressing Files using gunzip',
    shortTitle: '3. gunzip (Un-Shrink)',
    icon: '🎈',
    badgeBg: 'bg-sky-100 text-sky-950 border-sky-300',
    pastelBg: 'bg-sky-50/80',
    borderColor: 'border-sky-300',
    laymanHeadline:
      '`gunzip` (GNU Unzip) is the air-release valve! It opens a flat `.gz` vacuum-sealed file so it puffs right back up to its normal, readable size.',
    laymanExplanation:
      'Once a file is squished into `report.txt.gz`, you cannot edit it neatly until you let the air back in! Running `gunzip report.txt.gz` (or `gzip -d report.txt.gz`) pops the vacuum seal, restores the full `report.txt` file, and removes the `.gz` extension. Want to read a `.gz` text file without even un-shrinking it? Use `zcat`!',
    originalAnalogy: {
      title: '🏠 Opening the Vacuum Valve so the Duvet Puffs Back Up (`gunzip`)',
      icon: '🎈🛏️',
      summary:
        'Winter has arrived! You take your flat `duvet.txt.gz` out of the closet, twist open the `gunzip` valve, and—POP!—air rushes back in and your warm fluffy duvet (`duvet.txt`) is ready to use!',
      points: [
        {
          emoji: '🎈',
          name: 'gunzip notes.txt.gz -> notes.txt',
          simple:
            'Restores `notes.txt.gz` back to normal `notes.txt`! Just like `gzip`, it replaces the `.gz` file with the full-size original (unless you add `-k`).'
        },
        {
          emoji: '🔄',
          name: 'gzip -d (The Exact Same Tool!)',
          simple:
            '`gunzip` and `gzip -d` (`-d` = Decompress) do the exact same thing! Use whichever name feels friendlier to your brain.'
        },
        {
          emoji: '👓',
          name: 'zcat notes.txt.gz (Peek Without Unpacking!)',
          simple:
            'Like reading a letter through the clear plastic vacuum bag without breaking the seal! `zcat` prints the text inside a `.gz` file while leaving it compressed.'
        },
        {
          emoji: '📦',
          name: 'tar -xzvf backup.tar.gz (Un-Shrink + Unpack Box Together!)',
          simple:
            'If someone hands you a `.tar.gz` box, `tar -xzvf` inflates the vacuum bag (`-z`) AND unpacks the box (`-x`) in one single step!'
        }
      ]
    },
    kenyanAnalogy: {
      title: '🇰🇪 Cutting the Straps on a Pressed Mattress or Bale at Home',
      icon: '✂️🛏️',
      summary:
        'When you bring a rolled-up, vacuum-packed foam mattress home to your bedroom in Roysambu and snip the plastic seal (`gunzip`), it goes "WHOOSH!" and expands to fill the whole 5x6 bed!',
      points: [
        {
          emoji: '✂️',
          name: 'gunzip report.txt.gz (Snip the Seal)',
          simple:
            'Turns `report.txt.gz` back into the full, ready-to-use `report.txt` document.'
        },
        {
          emoji: '👯',
          name: 'gunzip -k report.txt.gz (Inflate a Copy, Keep the Sealed Bale)',
          simple:
            'Adding `-k` gives you the open readable file on your table while keeping the compact `.gz` backup in the store!'
        },
        {
          emoji: '🔍',
          name: 'zcat mpesa_jan.txt.gz (Quick Glass Peek)',
          simple:
            'Lets the cybercafé or sacco clerk read last year’s compressed M-Pesa statement on screen without inflating the file on the hard drive!'
        }
      ]
    },
    bodyMove: {
      title: '🤸 5-Second Body Move: The Mattress Pop-Up!',
      instruction:
        'Start with your hands pressed flat together. Pretend to twist an air valve, make a big "POP! WHOOOOSH!" sound, and spread your arms wide open as you say "gunzip — Full Size Again!"',
      whyItWorks:
        'Pairing the physical expansion motion with `gunzip` makes it the natural twin opposite of the `gzip` squeeze!'
    },
    quickTakeaway:
      '`gunzip file.gz` (or `gzip -d file.gz`) inflates a compressed `.gz` file back to its normal size and removes `.gz`!'
  },
  {
    id: 'zip-and-unzip',
    number: '5.4',
    title: 'Compressing and Extracting Files using zip and unzip',
    shortTitle: '4. zip & unzip',
    icon: '🧳',
    badgeBg: 'bg-purple-100 text-purple-950 border-purple-300',
    pastelBg: 'bg-purple-50/80',
    borderColor: 'border-purple-300',
    laymanHeadline:
      '`zip` and `unzip` are your universal zippered travel suitcase! Unlike `tar` + `gzip` (which are two tools), `zip` packs AND shrinks in one step and opens easily on Windows, Mac, and Linux!',
    laymanExplanation:
      'Why do we have `zip` if we already have `tar` and `gzip`? Two huge reasons! First, `zip` does BOTH jobs at once (bundles multiple files AND compresses them into `.zip`). Second, every Windows and Mac computer in the world can open a `.zip` file with a double-click! Bonus: `zip` automatically KEEPS your original files untouched on your desk!',
    originalAnalogy: {
      title: '🏠 The Zippered Travel Suitcase That Every House Understands (`zip` / `unzip`)',
      icon: '🧳🤐',
      summary:
        'Imagine visiting your cousin who lives in a Windows House. If you pack your gifts in a zippered suitcase (`photos.zip`), they can unzip it right away! Plus, packing a `.zip` leaves your original items safe on your shelf.',
      points: [
        {
          emoji: '🤐',
          name: 'zip trip.zip pic1.jpg pic2.jpg (Pack & Zip Files)',
          simple:
            'Puts copies of `pic1.jpg` and `pic2.jpg` into `trip.zip` and squeezes them smaller—while leaving your original photos untouched on your desk!'
        },
        {
          emoji: '🏘️',
          name: 'zip -r project.zip my_folder/ (Zip a Whole Room!)',
          simple:
            'Adding `-r` (Recursive) packs an entire folder and every subfolder inside it into `project.zip`.'
        },
        {
          emoji: '👀',
          name: 'unzip -l project.zip (Peek Inside the Suitcase)',
          simple:
            '`-l` (List) lets you peek inside the zippered suitcase to see what files are packed without unzipping them onto the floor.'
        },
        {
          emoji: '🔓',
          name: 'unzip project.zip (Unzip the Suitcase!)',
          simple:
            'Pulls the zipper open and extracts all the files and rooms neatly into your current folder (or use `unzip project.zip -d /tmp` to unpack into a specific room)!'
        }
      ]
    },
    kenyanAnalogy: {
      title: '🇰🇪 The Metal Box / Zippered School Bag Shared Between Cybercafés',
      icon: '🎒💻',
      summary:
        'When a student in Eldoret or Nairobi emails 10 KRA/HELB documents to a cybercafé running Windows, they pack them into `documents.zip`. Any computer in Kenya—Windows, Mac, Android phone, or Linux—can `unzip` it immediately!',
      points: [
        {
          emoji: '🎒',
          name: 'zip -r helb_forms.zip forms/ (Zip the School Bag)',
          simple:
            'Bundles and shrinks the entire `forms/` folder into one `helb_forms.zip` attachment ready for WhatsApp or email.'
        },
        {
          emoji: '👯',
          name: 'Original Files Stay Safe by Default!',
          simple:
            'Unlike `gzip` (which replaces your original file unless you say `-k`), `zip` always leaves your original files sitting safely on the counter!'
        },
        {
          emoji: '📂',
          name: 'unzip helb_forms.zip (Open the Bag at the Cyber)',
          simple:
            'Unpacks all the forms in one second so the attendant can print them!'
        }
      ]
    },
    bodyMove: {
      title: '🤸 5-Second Body Move: The Suitcase Zipper!',
      instruction:
        'Pretend to zip a big travel bag shut from left to right while making a loud "ZIIIIIIP! — zip -r!" sound. Then zip it back open from right to left and say "UNZIIIIIP! — Works Everywhere!"',
      whyItWorks:
        'The left-to-right and right-to-left zipper gesture locks `zip -r` and `unzip` into your muscle memory!'
    },
    quickTakeaway:
      '`zip -r bag.zip folder/` bundles and shrinks into `.zip` (keeping originals safe!), and `unzip bag.zip` unpacks it!'
  },
  {
    id: 'bzip2-compression',
    number: '5.5',
    title: 'High-Compression Archiving using bzip2',
    shortTitle: '5. bzip2 (Strong Press)',
    icon: '🚜',
    badgeBg: 'bg-teal-100 text-teal-950 border-teal-300',
    pastelBg: 'bg-teal-50/80',
    borderColor: 'border-teal-300',
    laymanHeadline:
      '`bzip2` is the Heavy-Duty Hydraulic Press! It squeezes files even tighter and smaller than `gzip` (creating `.bz2` files), trading a few extra seconds of time for extra space savings.',
    laymanExplanation:
      'Think of `bzip2` as `gzip`’s stronger older sibling! If `gzip` shrinks a 100 MB logbook down to 32 MB, `bzip2` presses it down to around 24 MB (`file.bz2`). To un-press it, you use `bunzip2` (or `bzip2 -d`). And when paired with `tar`, you use the `-j` flag (`tar -cjvf archive.tar.bz2 folder/`)!',
    originalAnalogy: {
      title: '🏠 The Heavy-Duty Garage Compactor (`bzip2` & `bunzip2`)',
      icon: '🚜📦',
      summary:
        'When your kitchen vacuum sealer (`gzip`) isn’t strong enough for thick winter coats, you wheel out the Heavy-Duty Garage Compactor (`bzip2`). It hums a little longer, but squishes the box noticeably smaller (`.bz2`)!',
      points: [
        {
          emoji: '🚜',
          name: 'bzip2 big_log.txt -> big_log.txt.bz2',
          simple:
            'Uses the Burrows-Wheeler block-sorting press to squeeze `big_log.txt` smaller than `gzip` can! (Add `-k` if you want to keep the original file too.)'
        },
        {
          emoji: '🎈',
          name: 'bunzip2 big_log.txt.bz2 (Release the Heavy Press)',
          simple:
            'Un-presses `.bz2` back to the full original `big_log.txt` file (same as `bzip2 -d`).'
        },
        {
          emoji: '📦',
          name: 'tar -cjvf backup.tar.bz2 folder/ (Remember "-j" for bzip2!)',
          simple:
            'Want to pack a folder with `tar` AND press it with `bzip2`? Use the `-j` flag: `tar -cjvf` creates a `.tar.bz2` high-compression archive!'
        }
      ]
    },
    kenyanAnalogy: {
      title: '🇰🇪 The Industrial Hydraulic Cotton/Mitumba Bale Press in Industrial Area',
      icon: '🏭🗜️',
      summary:
        'At a warehouse in Nairobi’s Industrial Area, a hand roller (`gzip`) shrinks a bale fast, but the heavy hydraulic machine press (`bzip2`) crushes the bale much tighter (`.bz2`) so more bales fit onto one lorry!',
      points: [
        {
          emoji: '⚖️',
          name: 'Why Choose bzip2 Over gzip?',
          simple:
            'When internet bundles (MBs) or flash disk space are tight, `bzip2` squeezes text and code 15%–25% smaller than `gzip`!'
        },
        {
          emoji: '🔓',
          name: 'bunzip2 & bzcat (Open or Peek)',
          simple:
            '`bunzip2` un-straps the heavy bale back to normal size, while `bzcat` lets you read a `.bz2` text file on screen without unpacking it!'
        },
        {
          emoji: '💡',
          name: 'Flag Memory Trick: -z vs. -j',
          simple:
            'In `tar`, `-z` is for `gZip` (`.tar.gz`), and `-j` is for `bzip2` (`.tar.bz2`)!'
        }
      ]
    },
    bodyMove: {
      title: '🤸 5-Second Body Move: The Hydraulic Two-Hand Press!',
      instruction:
        'Raise both hands high above your head, then push down slowly with all your imaginary muscles—"HUMMMMMM-CRUNCH! bzip2 .bz2 — Extra Tight!"',
      whyItWorks:
        'Pushing down slowly with tension teaches your brain that `bzip2` takes a tiny bit more muscle/time than `gzip` to get a tighter, smaller file!'
    },
    quickTakeaway:
      '`bzip2` squeezes tighter than `gzip` to make `.bz2` files, `bunzip2` unpacks them, and `tar -cjvf` makes `.tar.bz2` archives!'
  },
  {
    id: 'xz-compression',
    number: '5.6',
    title: 'High-Efficiency Compression using xz',
    shortTitle: '6. xz (Ultra Shrink)',
    icon: '💎',
    badgeBg: 'bg-rose-100 text-rose-950 border-rose-300',
    pastelBg: 'bg-rose-50/80',
    borderColor: 'border-rose-300',
    laymanHeadline:
      '`xz` is the Champion Diamond Compactor! It gives the highest compression of all—shrinking large software and Linux kernels into ultra-tiny `.xz` files.',
    laymanExplanation:
      'When you download official Linux kernels, Ubuntu images, or huge archives online, they almost always end in `.tar.xz`! Why? Because `xz` squeezes files into the smallest possible size (often half the size of `gzip`!). It takes more CPU work while compressing, but decompressing with `unxz` (or `xz -d`) is super fast! With `tar`, it uses the capital `-J` flag (`tar -cJvf`).',
    originalAnalogy: {
      title: '🏠 The Space-Age Diamond Shrink Ray (`xz` & `unxz`)',
      icon: '💎🚀',
      summary:
        'Imagine packing an entire room of furniture to ship across the ocean. `gzip` is a vacuum bag, `bzip2` is a garage press, and `xz` is a Space-Age Diamond Compactor that shrinks the whole load into a tiny pocket cube (`.xz`)!',
      points: [
        {
          emoji: '💎',
          name: 'xz big_archive.tar -> big_archive.tar.xz',
          simple:
            'Uses the powerful LZMA2 algorithm to shrink files to the smallest size in Linux! Add `-k` (`xz -k`) if you want to keep the uncompressed original too.'
        },
        {
          emoji: '🎈',
          name: 'unxz file.xz (or xz -d file.xz)',
          simple:
            'Unpacks the ultra-tiny `.xz` cube back into the full-size file rapidly!'
        },
        {
          emoji: '📦',
          name: 'tar -cJvf release.tar.xz folder/ (Capital -J for Giant Squeeze!)',
          simple:
            'Notice the CAPITAL `-J`! Lowercase `-z` = `gzip`, lowercase `-j` = `bzip2`, and CAPITAL `-J` = `xz` (`.tar.xz`)!'
        },
        {
          emoji: '🏆',
          name: 'The 3-Speed Compression Ladder',
          simple:
            '1️⃣ `gzip` (`.gz`): Fastest speed, good shrink. 2️⃣ `bzip2` (`.bz2`): Medium speed, stronger shrink. 3️⃣ `xz` (`.xz`): Slowest to pack, SMALLEST file size champion!'
        }
      ]
    },
    kenyanAnalogy: {
      title: '🇰🇪 Mombasa Port Export Compactor (Maximum Cargo in Minimum Space)',
      icon: '🚢⚓',
      summary:
        'When exporting tea or coffee from Mombasa Port to the whole world, every centimetre in the shipping container costs money. `xz` is the port’s ultimate high-pressure compactor—packing once carefully so millions of people can download tiny `.tar.xz` files using very little data bundles!',
      points: [
        {
          emoji: '📱',
          name: 'Saves Precious Safaricom/Airtel Data Bundles!',
          simple:
            'Because `xz` shrinks a 100 MB software package down to ~16 MB, anyone downloading it saves over 80 MB of mobile data!'
        },
        {
          emoji: '🔓',
          name: 'unxz & xzcat (Unpack or Read)',
          simple:
            '`unxz` restores the full file, and `xzcat` lets you inspect text inside an `.xz` file without decompressing it to disk.'
        },
        {
          emoji: '🧠',
          name: 'Easy Way to Remember tar Flags (-z, -j, -J)',
          simple:
            '`-z` = g**z**ip (fast everyday), `-j` = bzip2 (medium press), capital `-J` = **xz** (Jumbo compression champion)!'
        }
      ]
    },
    bodyMove: {
      title: '🤸 5-Second Body Move: The Diamond Cube Squeeze!',
      instruction:
        'Stretch your arms as wide as you can ("100 Megabytes!"), then bring your hands all the way together until your fingertips pinch a tiny imaginary diamond ("xz -J — Tiny 16MB Diamond!").',
      whyItWorks:
        'Going from the widest arm span to a tiny fingertip pinch cements `xz` (and capital `-J`) as the ultimate space-saving champion!'
    },
    quickTakeaway:
      '`xz` gives the smallest file size (`.xz`), `unxz` unpacks it, and `tar -cJvf` (capital `-J`) creates `.tar.xz` archives!'
  }
];
