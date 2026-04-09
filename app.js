// ── CONFIG ────────────────────────────────────────────────
const GROQ_KEY   = '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';
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const GROQ_URL   = 'https://api.groq.com/openai/v1/chat/completions';

// ── STATE ─────────────────────────────────────────────────
let currentTone   = 'Professional';
let currentLang   = 'English';
let currentExcuse = '';
let lastExcuse    = ''; // tracked to avoid repeats

// ── TONE & LANG BUTTONS ───────────────────────────────────
document.querySelectorAll('.tone-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTone = btn.dataset.tone;
  });
});

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLang = btn.dataset.lang;
  });
});

// ── EXCUSE VARIETY SEEDS (pick random to force variation) ─
const seedsEN = [
  "Use a stomach issue or food poisoning — ate something bad last night.",
  "Phone died and charger was not working, missed all alarms and notifications.",
  "Had a really bad headache or migraine since last night, could not get up.",
  "Internet was down, could not access anything or inform anyone in time.",
  "Had a fever since morning, took medicine and slept, did not realise the time.",
  "Electricity went out, phone died, alarm did not ring.",
  "Had loose motion since last night, was not in a condition to go anywhere.",
  "Woke up extremely late because could not sleep the whole night.",
  "Was stuck in really bad traffic for over an hour, could not do anything.",
  "Had a terrible cold and sore throat, could barely get out of bed.",
];

const seedsHI = [
  "Raat se pet kharab tha, bathroom baar baar jaana pad raha tha.",
  "Phone ki battery khatam ho gayi thi, charger bhi kaam nahi kar raha tha, alarm nahi baja.",
  "Raat bhar neend nahi aayi, subah ankh hi nahi khuli.",
  "Kal raat kuch ulta seedha kha liya tha, tabiyat bilkul theek nahi thi.",
  "Bijli chali gayi thi, phone charge nahi tha, kisi ko inform bhi nahi kar paya.",
  "Sir mein bahut tez dard tha raat se, uthne ki condition hi nahi thi.",
  "Bohot tez bukhar aa gaya tha achanak, 101 se upar tha.",
  "Traffic mein ek ghante se zyada phansa raha, kuch nahi ho sakta tha.",
  "Net nahi tha pure ghar mein, kisi ko message bhi nahi bhej paya.",
  "Aankh hi nahi khuli, pata nahi alarm kyun nahi baja.",
];

function randomSeed(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── GENERATE ──────────────────────────────────────────────
async function generate() {
  const situation = document.getElementById('situation').value;
  const btn       = document.getElementById('genBtn');
  const btnText   = document.getElementById('btnText');
  const resultEl  = document.getElementById('result');
  const textEl    = document.getElementById('resultText');
  const badgeEl   = document.getElementById('resultBadge');

  btn.disabled           = true;
  btnText.innerHTML      = '<span class="dot">●</span><span class="dot">●</span><span class="dot">●</span>';
  resultEl.style.display = 'block';
  textEl.style.cssText   = 'font-style:normal;font-size:13px;color:rgba(244,240,255,0.38)';
  textEl.textContent     = 'Cooking up your excuse...';

  badgeEl.className   = 'result-badge';
  if (currentTone === 'Dramatic') badgeEl.classList.add('tone-dramatic');
  if (currentTone === 'Funny')    badgeEl.classList.add('tone-funny');
  badgeEl.textContent = `${currentTone} · ${currentLang}`;

  // ── SYSTEM PROMPTS ─────────────────────────────────────
  const systemEN = `You write short excuses that sound like a real Indian student or working person said them.
STRICT rules:
- Max 2 sentences. Shorter is better.
- Sound completely human — like a student texting their teacher or friend
- Use realistic, common reasons: stomach issues, headache, fever, phone dead, internet down, traffic, couldn't sleep, loose motion — things that actually happen to people
- NO relatives visiting, NO functions, NO pujas, NO dramatic stories
- Keep the language simple and casual — not formal, not AI-sounding
- Every excuse must feel different from the last one
- Return ONLY the excuse. No intro, no label, nothing else.`;

  const systemHI = `Tu ek Indian student hai jo apne liye ek chhota sa believable excuse likh raha hai.
STRICT rules:
- Max 2 sentences. Jitna chhota ho sake utna better.
- Bilkul natural Hinglish mein likho — jaise WhatsApp pe teacher ko message karte hain
- Sirf realistic reasons use karo: pet kharab, sir dard, bukhar, phone dead, net nahi tha, traffic, neend nahi aayi, loose motion — jo actually hota hai
- NO relatives, NO functions, NO pooja, NO ghar mein kuch hua — ye sab overused hai
- Simple aur seedha likho — dramatic ya formal mat likho
- Har baar alag excuse dena
- Sirf excuse likho. Koi intro nahi, koi label nahi.`;

  // ── TONE GUIDES ────────────────────────────────────────
  const toneEN = {
    Professional: 'Calm and polite. Something a student would actually message their teacher. Sounds genuine and mature.',
    Dramatic:     'Bit emotional and urgent. Like you really went through something bad today. Not over the top, but clearly struggling.',
    Funny:        'Slightly absurd but still based on something real. Makes the reader smile but is still technically believable.'
  };
  const toneHI = {
    Professional: 'Polite aur seedha — jaise teacher ko formally message kar rahe ho. Believable lagni chahiye.',
    Dramatic:     'Thoda emotional — jaise sach mein bahut bura din tha. Overdone nahi, bas genuinely pareshaan lagte ho.',
    Funny:        'Thoda funny but real — hasaane wala but fir bhi possible lage. Ekdum bakwaas nahi honi chahiye.'
  };

  const seed    = currentLang === 'Hinglish' ? randomSeed(seedsHI) : randomSeed(seedsEN);
  const system  = currentLang === 'Hinglish' ? systemHI : systemEN;
  const toneG   = currentLang === 'Hinglish' ? toneHI : toneEN;

  // Include last excuse so Groq avoids repeating it
  const avoidLine = lastExcuse
    ? (currentLang === 'Hinglish'
        ? `\nPichhli baar ye excuse diya tha (dobara mat dena): "${lastExcuse}"`
        : `\nLast excuse was (do NOT repeat this): "${lastExcuse}"`)
    : '';

  const userMsg = currentLang === 'Hinglish'
    ? `Situation: "${situation}"\nTone: ${currentTone} — ${toneG[currentTone]}\nHint: ${seed}${avoidLine}\nAbhi excuse likho:`
    : `Situation: "${situation}"\nTone: ${currentTone} — ${toneG[currentTone]}\nHint: ${seed}${avoidLine}\nWrite the excuse now:`;

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_KEY}`
      },
      body: JSON.stringify({
        model:       GROQ_MODEL,
        max_tokens:  130,
        temperature: 1.1,   // higher = more varied each time
        top_p:       0.95,
        messages: [
          { role: 'system', content: system },
          { role: 'user',   content: userMsg }
        ]
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'Groq error');
    }

    const data    = await res.json();
    currentExcuse = data.choices[0].message.content.trim();
    lastExcuse    = currentExcuse; // remember for next call

    textEl.style.cssText = '';
    textEl.textContent   = currentExcuse;

  } catch(err) {
    textEl.style.cssText = 'font-style:normal;font-size:13px;color:#fb7185';
    textEl.textContent   = '⚠️ Something went wrong — try again!';
    console.error('ExcuseMe:', err);
  }

  btn.disabled      = false;
  btnText.innerHTML = 'Generate another ✨';
}

// ── COPY ──────────────────────────────────────────────────
async function copyExcuse() {
  if (!currentExcuse) return;
  const btn  = document.getElementById('copyBtn');
  const span = btn.querySelector('span');
  try { await navigator.clipboard.writeText(currentExcuse); }
  catch {
    const ta = document.createElement('textarea');
    ta.value = currentExcuse;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  btn.classList.add('copied');
  span.textContent = 'Copied ✓';
  setTimeout(() => { btn.classList.remove('copied'); span.textContent = 'Copy'; }, 2200);
}

// ── SHARE ─────────────────────────────────────────────────
function shareWhatsApp() {
  if (!currentExcuse) return;
  window.open('https://wa.me/?text=' + encodeURIComponent(
    `My excuse (${currentTone}, ${currentLang}):\n\n"${currentExcuse}"\n\n— ExcuseMe 🫠`
  ), '_blank');
}

function shareTwitter() {
  if (!currentExcuse) return;
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(
    `My ${currentTone.toLowerCase()} excuse 🫠\n\n"${currentExcuse}"\n\n#ExcuseMe #StudentLife`
  ), '_blank');
}