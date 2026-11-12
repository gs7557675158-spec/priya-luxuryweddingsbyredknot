const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'site');
const I = n => `assets/img/${n}.jpg`;

const sketch = (cls = '') => `<svg class="sketch ${cls}" viewBox="0 0 200 220" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
<path d="M20 210V110M180 210V110M20 110c0-30 20-45 40-45M180 110c0-30-20-45-40-45M60 65c0-25 10-35 40-50 30 15 40 25 40 50M100 15V2M96 6h8M60 210V120c0-22 18-30 40-30s40 8 40 30v90M72 210V126c0-14 12-20 28-20s28 6 28 20v84M10 210h180M30 150h20M150 150h20M40 130v-15M160 130v-15M100 40c-8 0-14 6-14 14M100 40c8 0 14 6 14 14"/></svg>`;
const bird = `<svg class="bird" viewBox="0 0 40 20" fill="none" stroke="currentColor" stroke-width="1"><path d="M2 12c8-10 14-8 18 0 4-8 10-10 18 0"/></svg>`;

const NAV = [['index', 'Home'], ['about', 'About'], ['services', 'Services'], ['portfolio', 'Portfolio'], ['testimonials', 'Testimonials'], ['contact', 'Contact'], ['faqs', 'FAQs']];

const layout = (file, title, body) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Tied Once by RedKnot</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body class="page-${file}">
<header class="site-header${file === 'index' ? ' on-hero' : file === 'services' ? ' on-hero dark' : ''}">
  <a class="logo" href="index.html"><span class="logo-t">TIED ONCE</span><span class="logo-s">Luxury Weddings by RedKnot</span></a>
  <nav class="nav">${NAV.map(([f, l]) => `<a href="${f}.html"${f === file ? ' class="active"' : ''}>${l}</a>`).join('')}</nav>
</header>
<main>
${body}
</main>
<script src="js/main.js"></script>
</body>
</html>
`;

const btn = (t, href = 'contact.html', cls = '') => `<a class="btn ${cls}" href="${href}">${t}</a>`;
const hero = (img, inner, cls = '') => `<section class="hero ${cls}"><img class="bg" src="${I(img)}" alt=""><div class="shade"></div><div class="hero-in">${inner}</div></section>`;

const pages = {};

/* HOME */
const orn = `<svg class="orn" viewBox="0 0 390 40" fill="none" stroke="currentColor" stroke-width=".8" preserveAspectRatio="none"><path d="M0 34C60 30 120 14 190 14M390 34C330 30 270 14 200 14"/><path d="M5 38C70 34 130 22 186 20M385 38C320 34 260 22 204 20" opacity=".6"/><path d="M195 8l5 6-5 6-5-6z" fill="currentColor"/></svg>`;
function garland(w, step, cls) {
  let g = '', i = 0;
  for (let x = step / 2; x < w; x += step, i++) {
    const h = 40 + ((i * 37) % 90), red = i % 3 !== 1;
    g += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#3d5a2a" stroke-width="1.2"/>`;
    for (let k = 0; k < Math.floor(h / 12); k++) g += `<circle cx="${x + (k % 2 ? 3 : -3)}" cy="${8 + k * 12}" r="${red ? 4.2 : 3}" fill="${red ? '#a3142d' : '#6f8f3a'}"/>`;
  }
  return `<svg class="garland ${cls}" viewBox="0 0 ${w} 220" preserveAspectRatio="xMidYMin slice" aria-hidden="true">${g}</svg>`;
}
const gazebo =`<svg class="gazebo" viewBox="0 0 200 200" fill="none" stroke="#fff" stroke-width="1.2" opacity=".75"><path d="M100 6v22M94 14h12M100 28c-26 6-48 26-52 46h104c-4-20-26-40-52-46zM40 74h120M52 74v100M148 74v100M76 74v100M124 74v100M100 74v100M40 174h120M46 82h108"/></svg>`;
const birdLg = `<svg class="bird-lg" viewBox="0 0 120 60" fill="none" stroke="#c9a46a" stroke-width="1" opacity=".55"><path d="M4 40c20-8 36-6 52 4 6-16 22-30 42-34-6 6-10 12-12 20 10-4 20-6 30-4-10 4-18 10-24 18-8 10-18 14-30 12-14-2-26-8-34-16-8 0-16 0-24-4z"/><path d="M56 44l-14 14M62 46l-4 12"/></svg>`;
const ico = {
  craft: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1"><path d="M9 38c-2-4 0-8 3-11l14-14c3-3 8-3 9-1 1 2-1 6-4 9L17 35c-3 3-6 5-8 3z"/><path d="M39 38c2-4 0-8-3-11L22 13c-3-3-8-3-9-1-1 2 1 6 4 9l14 14c3 3 6 5 8 3z"/><circle cx="24" cy="25" r="2"/><path d="M13 14l5 5M35 14l-5 5" opacity=".7"/></svg>`,
  creative: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1"><circle cx="24" cy="24" r="19"/><circle cx="24" cy="24" r="16" opacity=".5"/><text x="24" y="30" text-anchor="middle" font-family="Cormorant Garamond,serif" font-style="italic" font-size="17" fill="currentColor" stroke="none">RK</text></svg>`,
  flawless: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1"><g><ellipse cx="24" cy="24" rx="4.5" ry="13" transform="rotate(0 24 24)"/><ellipse cx="24" cy="24" rx="4.5" ry="13" transform="rotate(45 24 24)"/><ellipse cx="24" cy="24" rx="4.5" ry="13" transform="rotate(90 24 24)"/><ellipse cx="24" cy="24" rx="4.5" ry="13" transform="rotate(135 24 24)"/></g><circle cx="24" cy="24" r="3.2"/><circle cx="24" cy="24" r="8" opacity=".5"/><path d="M24 4v3M24 41v3M4 24h3M41 24h3" opacity=".7"/></svg>`,
  hospitality: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1"><path d="M10 40C8 28 14 16 24 8M38 40C40 28 34 16 24 8"/><path d="M12 32c4-1 6-4 6-8-4 1-6 4-6 8zM12 22c4-1 5-4 5-8-4 1-5 4-5 8zM36 32c-4-1-6-4-6-8 4 1 6 4 6 8zM36 22c-4-1-5-4-5-8 4 1 5 4 5 8zM24 8c-2 3-2 6 0 9 2-3 2-6 0-9z"/><path d="M17 41h14" opacity=".7"/></svg>`
};
pages.index = ['Home', `
<section class="hero hero-home"><img class="bg" src="${I('hero')}" alt=""><div class="arch-frame"></div>${garland(390, 32, 'g-m')}${garland(1440, 42, 'g-d')}<div class="shade home-shade"></div>
  <div class="hero-in reveal">
    <h1>A knot is how<br>a family says:<br>it holds.</h1>
    <p class="kicker">PRIVATE WORLDS.<br>BEAUTIFULLY ORCHESTRATED.</p>
    <div class="btns">${btn('EXPLORE OUR WORLD', 'about.html')}${btn('ENQUIRE NOW', 'contact.html', 'light')}</div>
  </div>
  ${orn}
</section>
<section class="intro">
  ${birdLg}
  <div class="intro-text reveal">
    <h2>Extraordinary<br>Weddings.<br>Thoughtfully Crafted.</h2>
    <p>A confluence of culture, beauty and impeccable execution — for celebrations that are deeply personal and truly unforgettable.</p>
  </div>
  <div class="intro-img"><img src="${I('lake')}" alt="">${gazebo}</div>
</section>
<section class="pillars">
  <div class="reveal">${ico.craft}<span>WEDDING<br>CRAFT</span></div>
  <div class="reveal">${ico.creative}<span>CREATIVE<br>DIRECTION</span></div>
  <div class="reveal">${ico.flawless}<span>FLAWLESS<br>EXECUTION</span></div>
  <div class="reveal">${ico.hospitality}<span>BESPOKE<br>HOSPITALITY</span></div>
</section>
<section class="film"><img class="bg" src="${I('courtyard')}" alt=""><div class="shade film-shade"></div>
  <div class="film-in reveal"><h2>Moments become<br>legacies here.</h2><button class="play" aria-label="Watch our film"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 7.5l7 4.5-7 4.5z"/></svg></button><span class="film-l">WATCH OUR FILM</span></div>
</section>
`];

/* ABOUT */
pages.about = ['About', `
<section class="hero hero-about"><img class="bg" src="${I('redcouple')}" alt=""><div class="shade maroon"></div>
  <div class="hero-in reveal"><h1>More than<br>weddings.<br>A philosophy<br>of belonging.</h1><span class="rule"></span>
  <blockquote>“We believe the most extraordinary weddings are not just seen, but felt — in the people, the places and the moments in between.”</blockquote></div>
</section>
<section class="story">
  <div class="story-text reveal"><h3 class="eyebrow">THE REDKNOT STORY</h3>
  <p>With over 18 years of experience in the events industry, RedKnot has crafted large-scale, high-impact experiences. The deep understanding of creative production, hospitality and on-ground execution now shapes our approach to weddings — where every detail is considered, every moment is intentional and every celebration is uniquely yours.</p><p>Today, we channel that knowledge, creative sensibility and operational precision into crafting extraordinary weddings.</p>${btn('OUR APPROACH', 'services.html')}</div>
  <div class="story-imgs"><img class="reveal" src="${I('cityglow')}" alt=""><img class="reveal" src="${I('arch')}" alt=""></div>
</section>
<section class="drives">
  <svg class="bird-s b1" viewBox="0 0 120 50" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 42C20 34 36 30 52 28C46 22 52 14 64 10C60 16 62 20 68 22C84 20 100 18 116 8C104 18 92 28 78 32C70 34 62 33 56 31C40 36 24 40 4 42Z"/><path d="M52 28C56 30 60 30 64 28"/></svg><svg class="bird-s b2" viewBox="0 0 130 80" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 56C24 52 40 54 56 46C68 40 78 28 84 8C90 4 94 10 92 18C90 30 84 40 94 46C104 52 116 46 120 38C124 30 116 24 110 28C104 32 108 40 114 38"/><path d="M60 50C72 54 84 52 92 60C100 68 112 66 122 58"/><path d="M96 14C100 8 104 4 108 2"/><path d="M70 44C76 40 80 34 82 26"/></svg>
  <h2 class="reveal">What Drives Us</h2>
  <div class="drive-list">
    <div class="drive reveal"><svg viewBox="0 0 90 100" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M45 30C38 40 38 52 45 60C52 52 52 40 45 30Z"/><path d="M45 38C41 44 41 50 45 54C49 50 49 44 45 38Z"/><path d="M45 60C32 58 22 50 20 38C32 38 42 46 45 60Z"/><path d="M45 60C58 58 68 50 70 38C58 38 48 46 45 60Z"/><path d="M16 30C8 24 8 14 14 8C22 12 24 22 16 30Z"/><path d="M74 30C82 24 82 14 76 8C68 12 66 22 74 30Z"/><path d="M45 60C40 72 34 80 28 90M45 60C50 72 56 80 62 90"/><path d="M30 72C36 66 40 72 45 66C50 72 54 66 60 72"/><circle cx="45" cy="22" r="3.4"/><path d="M45 30V25M20 38C24 30 30 28 36 30M70 38C66 30 60 28 54 30"/></svg><div><h4>PEOPLE FIRST</h4><p>Because every celebration begins with a story.</p></div></div>
    <div class="drive reveal"><svg viewBox="0 0 90 100" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M45 8C49 22 52 30 58 40C70 44 80 47 88 50C78 53 70 56 58 60C52 70 49 80 45 94C41 80 38 70 32 60C20 56 12 53 2 50C10 47 20 44 32 40C38 30 41 22 45 8Z"/><path d="M45 38C46 46 48 48 56 50C48 52 46 54 45 62C44 54 42 52 34 50C42 48 44 46 45 38Z"/><circle cx="45" cy="21" r="2.6"/><path d="M45 25C43 29 47 33 45 36"/></svg><div><h4>PURPOSEFUL CREATIVITY</h4><p>Design that feels personal, not predictable.</p></div></div>
    <div class="drive reveal"><svg viewBox="0 0 90 100" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="14.0" cy="79.6" r="3.4"/><circle cx="18.2" cy="82.6" r="3.4"/><circle cx="16.6" cy="87.6" r="3.4"/><circle cx="11.4" cy="87.6" r="3.4"/><circle cx="9.8" cy="82.6" r="3.4"/><circle cx="14" cy="84" r="1.5"/><circle cx="32.6" cy="80.4" r="3.4"/><circle cx="34.2" cy="85.4" r="3.4"/><circle cx="30.0" cy="88.4" r="3.4"/><circle cx="25.8" cy="85.4" r="3.4"/><circle cx="27.4" cy="80.4" r="3.4"/><circle cx="30" cy="84" r="1.5"/><circle cx="46.0" cy="79.6" r="3.4"/><circle cx="50.2" cy="82.6" r="3.4"/><circle cx="48.6" cy="87.6" r="3.4"/><circle cx="43.4" cy="87.6" r="3.4"/><circle cx="41.8" cy="82.6" r="3.4"/><circle cx="46" cy="84" r="1.5"/><circle cx="64.6" cy="80.4" r="3.4"/><circle cx="66.2" cy="85.4" r="3.4"/><circle cx="62.0" cy="88.4" r="3.4"/><circle cx="57.8" cy="85.4" r="3.4"/><circle cx="59.4" cy="80.4" r="3.4"/><circle cx="62" cy="84" r="1.5"/><circle cx="78.0" cy="79.6" r="3.4"/><circle cx="82.2" cy="82.6" r="3.4"/><circle cx="80.6" cy="87.6" r="3.4"/><circle cx="75.4" cy="87.6" r="3.4"/><circle cx="73.8" cy="82.6" r="3.4"/><circle cx="78" cy="84" r="1.5"/><circle cx="22.0" cy="65.6" r="3.4"/><circle cx="26.2" cy="68.6" r="3.4"/><circle cx="24.6" cy="73.6" r="3.4"/><circle cx="19.4" cy="73.6" r="3.4"/><circle cx="17.8" cy="68.6" r="3.4"/><circle cx="22" cy="70" r="1.5"/><circle cx="40.6" cy="66.4" r="3.4"/><circle cx="42.2" cy="71.4" r="3.4"/><circle cx="38.0" cy="74.4" r="3.4"/><circle cx="33.8" cy="71.4" r="3.4"/><circle cx="35.4" cy="66.4" r="3.4"/><circle cx="38" cy="70" r="1.5"/><circle cx="54.0" cy="65.6" r="3.4"/><circle cx="58.2" cy="68.6" r="3.4"/><circle cx="56.6" cy="73.6" r="3.4"/><circle cx="51.4" cy="73.6" r="3.4"/><circle cx="49.8" cy="68.6" r="3.4"/><circle cx="54" cy="70" r="1.5"/><circle cx="72.6" cy="66.4" r="3.4"/><circle cx="74.2" cy="71.4" r="3.4"/><circle cx="70.0" cy="74.4" r="3.4"/><circle cx="65.8" cy="71.4" r="3.4"/><circle cx="67.4" cy="66.4" r="3.4"/><circle cx="70" cy="70" r="1.5"/><circle cx="30.0" cy="51.6" r="3.4"/><circle cx="34.2" cy="54.6" r="3.4"/><circle cx="32.6" cy="59.6" r="3.4"/><circle cx="27.4" cy="59.6" r="3.4"/><circle cx="25.8" cy="54.6" r="3.4"/><circle cx="30" cy="56" r="1.5"/><circle cx="48.6" cy="52.4" r="3.4"/><circle cx="50.2" cy="57.4" r="3.4"/><circle cx="46.0" cy="60.4" r="3.4"/><circle cx="41.8" cy="57.4" r="3.4"/><circle cx="43.4" cy="52.4" r="3.4"/><circle cx="46" cy="56" r="1.5"/><circle cx="62.0" cy="51.6" r="3.4"/><circle cx="66.2" cy="54.6" r="3.4"/><circle cx="64.6" cy="59.6" r="3.4"/><circle cx="59.4" cy="59.6" r="3.4"/><circle cx="57.8" cy="54.6" r="3.4"/><circle cx="62" cy="56" r="1.5"/><circle cx="38.0" cy="38.6" r="3.4"/><circle cx="42.2" cy="41.6" r="3.4"/><circle cx="40.6" cy="46.6" r="3.4"/><circle cx="35.4" cy="46.6" r="3.4"/><circle cx="33.8" cy="41.6" r="3.4"/><circle cx="38" cy="43" r="1.5"/><circle cx="56.6" cy="39.4" r="3.4"/><circle cx="58.2" cy="44.4" r="3.4"/><circle cx="54.0" cy="47.4" r="3.4"/><circle cx="49.8" cy="44.4" r="3.4"/><circle cx="51.4" cy="39.4" r="3.4"/><circle cx="54" cy="43" r="1.5"/><circle cx="46.0" cy="26.6" r="3.4"/><circle cx="50.2" cy="29.6" r="3.4"/><circle cx="48.6" cy="34.6" r="3.4"/><circle cx="43.4" cy="34.6" r="3.4"/><circle cx="41.8" cy="29.6" r="3.4"/><circle cx="46" cy="31" r="1.5"/><path d="M54 22C56 10 68 4 74 10C78 16 72 20 68 16"/><circle cx="70" cy="12" r="1.2"/><path d="M52 26C48 20 44 18 40 20"/></svg><div><h4>SEAMLESS EXECUTION</h4><p>So you can be fully present, always.</p></div></div>
  </div>
</section>
<section class="closer bw"><img class="bg" src="${I('hands')}" alt=""><div class="shade"></div>
  <h2 class="reveal">Different families.<br>Different stories.<br>Always extraordinary.</h2>
</section>`];

/* SERVICES */
const svc = [
  ['01', 'CREATIVE DIRECTION', 'We shape a unique creative vision that reflects your story, style and sense of celebration.', null],
  ['02', 'PLANNING & PRODUCTION', 'End-to-end planning with meticulous attention to detail and flawless delivery on ground', 'flowers'],
  ['03', 'DESIGN & DÉCOR', 'Bespoke environments that bring your vision to life — from concept to creation', 'cityglow'],
  ['04', 'DESTINATION MANAGEMENT', 'Seamless logistics, travel and on-ground coordination for extraordinary destination weddings.', 'lakepalace'],
  ['05', 'HOSPITALITY & GUEST EXPERIENCE', 'Thoughtful hospitality that makes every guest feel at home.', 'hall'],
  ['06', 'ENTERTAINMENT & CELEBRITY MANAGEMENT', 'Curated experience with leading talent to create unforgettable moments.', 'nightpalace'],
];
pages.services = ['Services', `
<section class="hero hero-services"><img class="bg" src="${I('citypalace')}" alt=""><div class="shade light"></div>
  <div class="hero-in reveal"><h1>Every detail<br>thoughtfully<br>orchestrated.</h1>
  <p>To the first idea to the final farewell we bring together the creativity, the precision and care to craft celebrations that are seamless, immersive and deeply meaningful</p></div>
</section>
<section class="svc-list">
${svc.map(([n, t, d, img], i) => `<article class="svc ${i % 2 ? 'flip' : ''} reveal"><div class="svc-t"><span class="num">${n}</span><h3>${t}</h3><p>${d}</p></div><div class="svc-i">${img ? `<img src="${I(img)}" alt="">` : `<div class="paper">${sketch('sk-svc')}</div>`}</div></article>`).join('\n')}
</section>
<section class="cta-block">${sketch('sk-cta')}<h2 class="reveal">Let's craft your celebration.</h2>${btn('ENQUIRE NOW')}</section>`];

/* PORTFOLIO */
const chap = [['01', 'Welcome Evening', 'nightpalace'], ['02', 'Haldi & Mehendi', 'arch'], ['03', 'Cocktail', 'mandap'], ['04', 'The Wedding', 'aisle'], ['05', 'Farewell', 'boatcouple']];
pages.portfolio = ['Portfolio', `
<section class="hero hero-port"><img class="bg" src="${I('cityglow')}" alt=""><div class="shade"></div>
  <div class="hero-in reveal"><h1>Weddings<br>as unique<br>as the people<br>who celebrate them.</h1><span class="rule"></span></div>
  <div class="explore reveal"><p class="kicker sm">EXPLORE BY CHAPTER</p><p class="sub">A glimpse into the different moments that come together to create an unforgettable wedding experience</p></div>
</section>
<section class="chapters">
${chap.map(([n, t, img]) => `<a class="chapter reveal" href="contact.html"><img src="${I(img)}" alt=""><div class="shade"></div><div class="ch-t"><span>${n}</span><h3>${t}</h3></div><span class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M7 12h10M13 8l4 4-4 4"/></svg></span></a>`).join('\n')}
</section>
<section class="cta-block sm">${sketch('sk-cta')}<h2 class="reveal">Stories that stay with you.</h2>${btn('VIEW ALL WEDDINGS', 'contact.html')}</section>`];

/* TESTIMONIALS */
const tm = [
  ['A & R', 'Delhi', 'From the first conversation to the final farewell, everything felt effortless. The team understood and respected our vision and brought it to life beyond our expectations.', 'archframe'],
  ['S & K', 'Udaipur', 'Every function felt different, yet beautifully connected. The attention to detail, the guest experience and the overall execution were simply incredible.', 'couple', 'bw'],
  ['P & R', 'Jaipur', 'They turned our ideas into something far more magical than we imagined. What stood out most was their calm and assured we felt throughout the journey.', 'flowers'],
  ['M & A', 'Goa', 'Our wedding was a true reflection of who we are — elegant, personal and full of heart. We’re so grateful for the care, creativity and dedication of the entire team.', 'hall'],
];
pages.testimonials = ['Testimonials', `
<section class="t-intro">${bird}
  <div class="reveal"><h1>In their<br>words.</h1><p>Real people. Real emotions.<br>A few thoughts from families<br>who’ve had the honour to celebrate with.</p></div>
  <img class="t-hero reveal" src="${I('table')}" alt=""><div class="t-fade"></div>
</section>
<section class="t-list">
${tm.map(([n, c, q, img, f], i) => `<article class="tm ${i % 2 ? 'flip' : ''} reveal"><div class="tm-t"><span class="qm">“</span><p>${q}</p><strong>${n}</strong><em>${c}</em></div><img class="${f || ''}" src="${I(img)}" alt=""></article>`).join('\n')}
</section>
<section class="cta-block sm">${sketch('sk-cta')}<h2 class="reveal">Your story could be next.</h2>${btn('ENQUIRE NOW')}</section>`];

/* CONTACT */
pages.contact = ['Contact', `
<section class="hero hero-contact"><img class="bg" src="${I('archcouple')}" alt=""><div class="shade"></div>
  <div class="hero-in reveal"><h1>Let's begin<br>a conversation.</h1><p>Tell us a little about your celebration,<br>and we'll take it from there.</p></div>
</section>
<section class="form-wrap">
  <form class="enq" id="enq" novalidate>
    <input type="text" name="name" placeholder="Full Name *" required>
    <input type="email" name="email" placeholder="Email Address *" required>
    <input type="tel" name="phone" placeholder="Phone Number *" required>
    <input type="text" name="date" placeholder="Wedding Date (if decided)">
    <input type="text" name="location" placeholder="Location (if decided)">
    <textarea name="message" placeholder="Tell us about your celebration"></textarea>
    <button type="submit" class="btn wide">SUBMIT ENQUIRY</button>
    <p class="note">Your information is safe with us. We respect your privacy and will only use these details to connect with you about your celebration.</p>
    <p class="thanks" hidden>Thank you — we will be in touch shortly.</p>
  </form>
</section>
<section class="contact-end">${sketch('sk-c1')}${sketch('sk-c2')}<h2 class="reveal">Extraordinary<br>begins with<br>a single conversation.</h2><span class="rule"></span><div class="ce-img"><img src="${I('flowers')}" alt=""><div class="fade"></div></div></section>`];

/* FAQS */
const faq = [
  ['What services do you offer?', 'We offer creative direction, planning and production, design and décor, destination management, hospitality and guest experience, and entertainment and celebrity management.'],
  ['Do you plan destination weddings?', 'Yes. Our destination management service covers logistics, travel and on-ground coordination.'],
  ['How early should we start planning?', 'The earlier the better. Reach out as soon as you have an idea of your celebration, and we will guide you from there.'],
  ['Can you help with décor, entertainment and hospitality as well?', 'Yes. Design and décor, entertainment and guest hospitality are part of our services.'],
  ['Do you work with specific venues?', 'We work with venues that suit your story and vision, in India and beyond.'],
  ['How do we get started?', 'Share a little about your celebration through our enquiry form and we will take it from there.'],
  ['What happens after we submit an enquiry?', 'Our team will connect with you to understand your celebration and discuss next steps.'],
  ['Do you take on a limited number of weddings?', 'Please get in touch with us to discuss availability for your dates.'],
  ['Can you work with our preferred vendors?', 'Please share your preferences with us and we will discuss how best to bring them together.'],
  ['What makes Tied Once by RedKnot different?', 'With over 38 years of experience in the events industry, RedKnot brings creative, production, hospitality and on-ground execution together for every celebration.'],
];
pages.faqs = ['FAQs', `
<section class="faq-hero"><div class="faq-img"><img src="${I('arch')}" alt=""><div class="fade b"></div></div>
  <div class="faq-head reveal"><h1>Questions<br>you may have.</h1><p>Here are some quick answers to help you understand our process, services and approach.</p></div>
</section>
<section class="faq-list">
${faq.map(([q, a]) => `<details class="faq reveal"><summary>${q}<i></i></summary><p>${a}</p></details>`).join('\n')}
</section>
<section class="faq-end">${sketch('sk-f1')}<div class="fe-img"><img src="${I('pavilion')}" alt=""><div class="fade"></div></div>
  <div class="fe-t reveal"><h2>Still have a question?</h2><p>We're here to help.</p>${btn('GET IN TOUCH', 'contact.html')}</div></section>`];

fs.mkdirSync(OUT, { recursive: true });
for (const [file, [title, body]] of Object.entries(pages)) fs.writeFileSync(path.join(OUT, file + '.html'), layout(file, title, body));
console.log('built', Object.keys(pages).length, 'pages');
