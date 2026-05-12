/* ═══════════════════════════════════════════════════════════
   MUMBAI BUS VMS — script.js
   Complete dashboard logic, mock data, charts, AI simulation
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────
// 1.  MOCK DATA — 28 BUSES
// ─────────────────────────────────────
const TODAY = new Date();

function daysFromToday(n) {
  const d = new Date(TODAY);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function daysAgo(n) { return daysFromToday(-n); }

const DEPOTS = ['Oshiwara', 'Backbay', 'Vikhroli', 'Dharavi', 'Goregaon', 'Mulund', 'Kurla'];
const VENDORS = ['Tata Motors Ltd', 'Ashok Leyland', 'SRM Transport Co.', 'Mumbai Green Fleet', 'BEST Maintenance Div', 'IndoAuto Services'];
const DRIVERS = ['Ramesh Patil', 'Suresh Yadav', 'Anil Desai', 'Manish Sawant', 'Prakash Kore', 'Vikas Shinde', 'Deepak Nair', 'Santosh Gharat', 'Rohit Talekar', 'Nilesh Jadhav', 'Pankaj Mehta', 'Arjun Kamble'];

const busFleet = [
  { busNo:'MH-01-EV-101', depot:'Oshiwara', type:'EV', status:'Active',     battery:82, driver:'Ramesh Patil',   maintDue: daysFromToday(12),  insurance: daysFromToday(210), fitness: daysFromToday(180), contract: daysFromToday(45),  lastService: daysAgo(28),  vendor:'Tata Motors Ltd' },
  { busNo:'MH-01-EV-102', depot:'Oshiwara', type:'EV', status:'Charging',   battery:34, driver:'Suresh Yadav',   maintDue: daysFromToday(5),   insurance: daysFromToday(15),  fitness: daysFromToday(22),  contract: daysFromToday(18),  lastService: daysAgo(40),  vendor:'Tata Motors Ltd' },
  { busNo:'MH-01-EV-103', depot:'Backbay',  type:'EV', status:'Active',     battery:91, driver:'Anil Desai',     maintDue: daysFromToday(45),  insurance: daysFromToday(300), fitness: daysFromToday(220), contract: daysFromToday(120), lastService: daysAgo(15),  vendor:'Mumbai Green Fleet' },
  { busNo:'MH-01-EV-221', depot:'Vikhroli', type:'EV', status:'Breakdown',  battery:12, driver:'Manish Sawant',  maintDue: daysFromToday(-3),  insurance: daysFromToday(-5),  fitness: daysFromToday(30),  contract: daysFromToday(60),  lastService: daysAgo(90),  vendor:'BEST Maintenance Div' },
  { busNo:'MH-01-EV-222', depot:'Vikhroli', type:'EV', status:'Maintenance',battery:55, driver:'Prakash Kore',   maintDue: daysFromToday(0),   insurance: daysFromToday(60),  fitness: daysFromToday(-2),  contract: daysFromToday(25),  lastService: daysAgo(60),  vendor:'BEST Maintenance Div' },
  { busNo:'MH-01-EV-223', depot:'Dharavi',  type:'EV', status:'Active',     battery:78, driver:'Vikas Shinde',   maintDue: daysFromToday(30),  insurance: daysFromToday(150), fitness: daysFromToday(120), contract: daysFromToday(90),  lastService: daysAgo(20),  vendor:'Tata Motors Ltd' },
  { busNo:'MH-01-EV-224', depot:'Goregaon', type:'EV', status:'Charging',   battery:21, driver:'Deepak Nair',    maintDue: daysFromToday(8),   insurance: daysFromToday(200), fitness: daysFromToday(180), contract: daysFromToday(200), lastService: daysAgo(35),  vendor:'Mumbai Green Fleet' },
  { busNo:'MH-01-EV-305', depot:'Mulund',   type:'EV', status:'Active',     battery:68, driver:'Santosh Gharat', maintDue: daysFromToday(60),  insurance: daysFromToday(270), fitness: daysFromToday(200), contract: daysFromToday(300), lastService: daysAgo(10),  vendor:'Tata Motors Ltd' },
  { busNo:'MH-01-EV-306', depot:'Mulund',   type:'EV', status:'Active',     battery:95, driver:'Rohit Talekar',  maintDue: daysFromToday(90),  insurance: daysFromToday(340), fitness: daysFromToday(290), contract: daysFromToday(180), lastService: daysAgo(5),   vendor:'Mumbai Green Fleet' },
  { busNo:'MH-01-EV-307', depot:'Kurla',    type:'EV', status:'Idle',       battery:44, driver:'Nilesh Jadhav',  maintDue: daysFromToday(3),   insurance: daysFromToday(28),  fitness: daysFromToday(15),  contract: daysFromToday(7),   lastService: daysAgo(55),  vendor:'BEST Maintenance Div' },
  { busNo:'MH-01-DS-401', depot:'Oshiwara', type:'Diesel', status:'Active',  battery:null, driver:'Pankaj Mehta',  maintDue: daysFromToday(20),  insurance: daysFromToday(90),  fitness: daysFromToday(75),  contract: daysFromToday(50),  lastService: daysAgo(25),  vendor:'Ashok Leyland' },
  { busNo:'MH-01-DS-402', depot:'Backbay',  type:'Diesel', status:'Active',  battery:null, driver:'Arjun Kamble',  maintDue: daysFromToday(40),  insurance: daysFromToday(220), fitness: daysFromToday(190), contract: daysFromToday(130), lastService: daysAgo(18),  vendor:'Ashok Leyland' },
  { busNo:'MH-01-DS-403', depot:'Vikhroli', type:'Diesel', status:'Maintenance', battery:null, driver:'Ramesh Patil', maintDue: daysFromToday(-10), insurance: daysFromToday(130), fitness: daysFromToday(100), contract: daysFromToday(70),  lastService: daysAgo(75),  vendor:'IndoAuto Services' },
  { busNo:'MH-01-DS-404', depot:'Dharavi',  type:'Diesel', status:'Active',  battery:null, driver:'Suresh Yadav',  maintDue: daysFromToday(55),  insurance: daysFromToday(180), fitness: daysFromToday(150), contract: daysFromToday(160), lastService: daysAgo(12),  vendor:'SRM Transport Co.' },
  { busNo:'MH-01-DS-405', depot:'Goregaon', type:'Diesel', status:'Idle',    battery:null, driver:'Anil Desai',    maintDue: daysFromToday(7),   insurance: daysFromToday(-8),  fitness: daysFromToday(50),  contract: daysFromToday(22),  lastService: daysAgo(48),  vendor:'IndoAuto Services' },
  { busNo:'MH-01-DS-501', depot:'Mulund',   type:'Diesel', status:'Active',  battery:null, driver:'Manish Sawant', maintDue: daysFromToday(100), insurance: daysFromToday(310), fitness: daysFromToday(270), contract: daysFromToday(220), lastService: daysAgo(8),   vendor:'Ashok Leyland' },
  { busNo:'MH-01-DS-502', depot:'Kurla',    type:'Diesel', status:'Breakdown', battery:null, driver:'Prakash Kore', maintDue: daysFromToday(-15), insurance: daysFromToday(50),  fitness: daysFromToday(-12), contract: daysFromToday(40),  lastService: daysAgo(100), vendor:'SRM Transport Co.' },
  { busNo:'MH-01-CNG-601', depot:'Oshiwara', type:'CNG', status:'Active',   battery:null, driver:'Vikas Shinde',   maintDue: daysFromToday(15),  insurance: daysFromToday(100), fitness: daysFromToday(80),  contract: daysFromToday(55),  lastService: daysAgo(22),  vendor:'BEST Maintenance Div' },
  { busNo:'MH-01-CNG-602', depot:'Backbay',  type:'CNG', status:'Active',   battery:null, driver:'Deepak Nair',    maintDue: daysFromToday(70),  insurance: daysFromToday(240), fitness: daysFromToday(210), contract: daysFromToday(150), lastService: daysAgo(11),  vendor:'Ashok Leyland' },
  { busNo:'MH-01-CNG-603', depot:'Vikhroli', type:'CNG', status:'Maintenance', battery:null, driver:'Santosh Gharat', maintDue: daysFromToday(1), insurance: daysFromToday(30), fitness: daysFromToday(20),  contract: daysFromToday(12),  lastService: daysAgo(65),  vendor:'SRM Transport Co.' },
  { busNo:'MH-01-CNG-604', depot:'Dharavi',  type:'CNG', status:'Active',   battery:null, driver:'Rohit Talekar',  maintDue: daysFromToday(50),  insurance: daysFromToday(195), fitness: daysFromToday(160), contract: daysFromToday(110), lastService: daysAgo(14),  vendor:'Mumbai Green Fleet' },
  { busNo:'MH-01-CNG-605', depot:'Goregaon', type:'CNG', status:'Active',   battery:null, driver:'Nilesh Jadhav',  maintDue: daysFromToday(80),  insurance: daysFromToday(260), fitness: daysFromToday(230), contract: daysFromToday(190), lastService: daysAgo(6),   vendor:'IndoAuto Services' },
  { busNo:'MH-01-CNG-701', depot:'Mulund',   type:'CNG', status:'Idle',     battery:null, driver:'Pankaj Mehta',   maintDue: daysFromToday(10),  insurance: daysFromToday(22),  fitness: daysFromToday(18),  contract: daysFromToday(9),   lastService: daysAgo(44),  vendor:'Ashok Leyland' },
  { busNo:'MH-01-CNG-702', depot:'Kurla',    type:'CNG', status:'Active',   battery:null, driver:'Arjun Kamble',   maintDue: daysFromToday(120), insurance: daysFromToday(360), fitness: daysFromToday(320), contract: daysFromToday(260), lastService: daysAgo(3),   vendor:'SRM Transport Co.' },
  { busNo:'MH-01-EV-408', depot:'Backbay',   type:'EV', status:'Active',    battery:73, driver:'Ramesh Patil',    maintDue: daysFromToday(25),  insurance: daysFromToday(140), fitness: daysFromToday(100), contract: daysFromToday(80),  lastService: daysAgo(17),  vendor:'Tata Motors Ltd' },
  { busNo:'MH-01-DS-601', depot:'Goregaon',  type:'Diesel', status:'Active', battery:null, driver:'Suresh Yadav', maintDue: daysFromToday(60),  insurance: daysFromToday(200), fitness: daysFromToday(170), contract: daysFromToday(120), lastService: daysAgo(9),   vendor:'IndoAuto Services' },
  { busNo:'MH-01-CNG-801', depot:'Dharavi',  type:'CNG', status:'Active',   battery:null, driver:'Anil Desai',    maintDue: daysFromToday(35),  insurance: daysFromToday(170), fitness: daysFromToday(130), contract: daysFromToday(95),  lastService: daysAgo(16),  vendor:'BEST Maintenance Div' },
  { busNo:'MH-01-EV-509', depot:'Kurla',     type:'EV', status:'Charging',  battery:58, driver:'Manish Sawant',   maintDue: daysFromToday(18),  insurance: daysFromToday(110), fitness: daysFromToday(90),  contract: daysFromToday(65),  lastService: daysAgo(23),  vendor:'Mumbai Green Fleet' },
];

// Service history per bus (simulated)
const serviceHistoryDB = {};
busFleet.forEach(b => {
  const entries = [];
  for(let i=0;i<4;i++){
    const ago = (i+1)*20 + Math.floor(Math.random()*10);
    const works = [
      'Oil change and filter replacement',
      'Brake pad inspection and replacement',
      'Engine coolant flush',
      'Tire rotation and alignment',
      'Battery terminal cleaning',
      'AC system service',
      'Transmission fluid change',
    ];
    entries.push({
      date: daysAgo(ago),
      desc: works[Math.floor(Math.random()*works.length)],
      cost: `₹${(Math.floor(Math.random()*15)+2)*1000}`,
    });
  }
  serviceHistoryDB[b.busNo] = entries;
});

// ─────────────────────────────────────
// 2.  HELPERS
// ─────────────────────────────────────
function daysDiff(dateStr) {
  const d = new Date(dateStr);
  const diff = Math.round((d - TODAY) / 86400000);
  return diff;
}
function formatDate(str) {
  if(!str) return '—';
  const d = new Date(str);
  return d.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}
function statusClass(status) {
  return 'badge badge-' + status.toLowerCase().replace(' ','-');
}
function typeClass(t) {
  return `badge badge-${t.toLowerCase()}`;
}

function batteryHealth(pct) {
  if(pct >= 60) return 'healthy';
  if(pct >= 25) return 'medium';
  return 'critical';
}

function riskScore(bus) {
  let score = 0;
  const md = daysDiff(bus.maintDue);
  const ins = daysDiff(bus.insurance);
  const fit = daysDiff(bus.fitness);
  const con = daysDiff(bus.contract);
  if(md < 0)   score += 35; else if(md < 7) score += 25; else if(md < 14) score += 10;
  if(ins < 0)  score += 25; else if(ins < 15) score += 15;
  if(fit < 0)  score += 20; else if(fit < 15) score += 12;
  if(con < 0)  score += 10; else if(con < 30) score += 5;
  if(bus.status === 'Breakdown')   score += 20;
  if(bus.status === 'Maintenance') score += 5;
  if(bus.type === 'EV' && bus.battery !== null && bus.battery < 25) score += 15;
  return Math.min(score, 99);
}

function riskLevel(score) {
  if(score >= 60) return 'critical';
  if(score >= 35) return 'high';
  if(score >= 15) return 'medium';
  return 'low';
}

function animateCounter(el, target, duration=1200) {
  const start = performance.now();
  const startVal = 0;
  function update(ts) {
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + (target - startVal) * eased);
    if(progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ─────────────────────────────────────
// 3.  COMPUTED STATS
// ─────────────────────────────────────
function computeStats() {
  const total       = busFleet.length;
  const active      = busFleet.filter(b => b.status === 'Active').length;
  const maintenance = busFleet.filter(b => b.status === 'Maintenance').length;
  const evBuses     = busFleet.filter(b => b.type === 'EV').length;
  const expiredDocs = busFleet.filter(b => daysDiff(b.insurance) < 0 || daysDiff(b.fitness) < 0).length;
  const battAlert   = busFleet.filter(b => b.battery !== null && b.battery < 25).length;
  const contrExp    = busFleet.filter(b => daysDiff(b.contract) <= 30).length;
  const breakdown   = busFleet.filter(b => b.status === 'Breakdown').length;
  return { total, active, maintenance, evBuses, expiredDocs, battAlert, contrExp, breakdown };
}

// ─────────────────────────────────────
// 4.  ALERTS GENERATOR
// ─────────────────────────────────────
function generateAlerts() {
  const alerts = [];
  busFleet.forEach(b => {
    const insDays = daysDiff(b.insurance);
    const fitDays = daysDiff(b.fitness);
    const maintDays = daysDiff(b.maintDue);
    const conDays = daysDiff(b.contract);

    if(insDays < 0)
      alerts.push({ sev:'critical', icon:'fa-shield-alt', title:`Insurance Expired — ${b.busNo}`, desc:`Insurance expired ${Math.abs(insDays)} days ago. Immediate action required.`, time: 'Now', bus: b.busNo });
    else if(insDays <= 15)
      alerts.push({ sev:'high', icon:'fa-shield-alt', title:`Insurance Expiring Soon — ${b.busNo}`, desc:`Insurance expires in ${insDays} days (${formatDate(b.insurance)}).`, time: 'Today', bus: b.busNo });

    if(fitDays < 0)
      alerts.push({ sev:'critical', icon:'fa-certificate', title:`Fitness Certificate Expired — ${b.busNo}`, desc:`Fitness cert expired ${Math.abs(fitDays)} days ago. Bus should be grounded.`, time: 'Now', bus: b.busNo });
    else if(fitDays <= 15)
      alerts.push({ sev:'high', icon:'fa-certificate', title:`Fitness Certificate Expiring — ${b.busNo}`, desc:`Fitness cert expires in ${fitDays} days.`, time: 'Today', bus: b.busNo });

    if(maintDays < 0)
      alerts.push({ sev:'critical', icon:'fa-tools', title:`Maintenance Overdue — ${b.busNo}`, desc:`Maintenance overdue by ${Math.abs(maintDays)} days.`, time: 'Now', bus: b.busNo });
    else if(maintDays <= 7)
      alerts.push({ sev:'high', icon:'fa-tools', title:`Maintenance Due Soon — ${b.busNo}`, desc:`Scheduled maintenance in ${maintDays} day(s).`, time: 'Today', bus: b.busNo });

    if(conDays < 0)
      alerts.push({ sev:'critical', icon:'fa-file-contract', title:`Contract Expired — ${b.busNo}`, desc:`Contract with ${b.vendor} expired ${Math.abs(conDays)} days ago.`, time: 'Now', bus: b.busNo });
    else if(conDays <= 30)
      alerts.push({ sev:'medium', icon:'fa-file-contract', title:`Contract Expiring — ${b.busNo}`, desc:`Contract with ${b.vendor} expires in ${conDays} days.`, time: 'Today', bus: b.busNo });

    if(b.battery !== null) {
      if(b.battery < 15)
        alerts.push({ sev:'critical', icon:'fa-battery-empty', title:`Critical Battery — ${b.busNo}`, desc:`Battery at ${b.battery}%. Immediate charging required.`, time: 'Now', bus: b.busNo });
      else if(b.battery < 25)
        alerts.push({ sev:'high', icon:'fa-battery-quarter', title:`Low Battery — ${b.busNo}`, desc:`Battery at ${b.battery}%. Connect to charger soon.`, time: 'Today', bus: b.busNo });
    }
    if(b.status === 'Breakdown')
      alerts.push({ sev:'critical', icon:'fa-exclamation-triangle', title:`Bus Breakdown — ${b.busNo}`, desc:`${b.busNo} at ${b.depot} depot is in breakdown. Recovery needed.`, time: 'Now', bus: b.busNo });
  });
  return alerts;
}

// ─────────────────────────────────────
// 5.  DOM REFERENCES
// ─────────────────────────────────────
const $ = id => document.getElementById(id);

// ─────────────────────────────────────
// 6.  CLOCK
// ─────────────────────────────────────
function updateClock() {
  const now = new Date();
  $('liveClock').textContent = now.toLocaleTimeString('en-IN', { hour12: false });
  $('liveDate').textContent = now.toLocaleDateString('en-IN', { weekday:'short', day:'2-digit', month:'short', year:'numeric' });
  $('settingsLastSync').textContent = now.toLocaleTimeString('en-IN');
}
setInterval(updateClock, 1000);
updateClock();

// ─────────────────────────────────────
// 7.  THEME TOGGLE
// ─────────────────────────────────────
let isDark = true;
function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  $('themeIcon').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  $('darkModeCheck').checked = isDark;
  // Re-render charts on theme change
  setTimeout(() => { renderAllCharts(); }, 100);
}
$('themeToggle').addEventListener('click', () => { isDark = !isDark; applyTheme(); });
$('darkModeCheck').addEventListener('change', e => { isDark = e.target.checked; applyTheme(); });

// ─────────────────────────────────────
// 8.  SIDEBAR NAVIGATION
// ─────────────────────────────────────
const navItems = document.querySelectorAll('.nav-item[data-section]');
function activateSection(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const sec = $('section-' + sectionId);
  if(sec) sec.classList.add('active');

  navItems.forEach(n => {
    n.classList.toggle('active', n.dataset.section === sectionId);
    // indicator
    const ind = n.querySelector('.nav-indicator');
    if(ind) ind.remove();
    if(n.dataset.section === sectionId) {
      const ind2 = document.createElement('div');
      ind2.className = 'nav-indicator';
      n.appendChild(ind2);
    }
  });
  const labels = { dashboard:'Dashboard', fleet:'Fleet Table', ev:'EV Battery', maintenance:'Maintenance AI', analytics:'Analytics', contracts:'Contracts', alerts:'Alerts', assistant:'AI Assistant', settings:'Settings' };
  $('breadcrumbCurrent').textContent = labels[sectionId] || sectionId;

  if(sectionId === 'analytics') { setTimeout(renderAnalyticsCharts, 100); }
}
navItems.forEach(n => n.addEventListener('click', e => {
  e.preventDefault();
  activateSection(n.dataset.section);
  // close mobile sidebar
  if(window.innerWidth <= 800) {
    $('sidebar').classList.remove('mobile-open');
    $('sidebarOverlay').classList.remove('open');
  }
}));

$('sidebarToggle').addEventListener('click', () => {
  const s = $('sidebar');
  s.classList.toggle('mobile-open');
  $('sidebarOverlay').classList.toggle('open', s.classList.contains('mobile-open'));
});
$('sidebarOverlay').addEventListener('click', () => {
  $('sidebar').classList.remove('mobile-open');
  $('sidebarOverlay').classList.remove('open');
});

// ─────────────────────────────────────
// 9.  STAT CARDS
// ─────────────────────────────────────
const CARD_CONFIGS = [
  { key:'total',       label:'Total Buses',       icon:'fa-bus',                gradient:'linear-gradient(135deg,#1565c0,#0d47a1)', trend:'Fleet Size' },
  { key:'active',      label:'Active Buses',       icon:'fa-check-circle',       gradient:'linear-gradient(135deg,#1b5e20,#004d40)', trend:'Operational' },
  { key:'maintenance', label:'In Maintenance',     icon:'fa-tools',              gradient:'linear-gradient(135deg,#e65100,#bf360c)', trend:'In Service Bay' },
  { key:'breakdown',   label:'Breakdown',          icon:'fa-exclamation-circle', gradient:'linear-gradient(135deg,#b71c1c,#880e4f)', trend:'Needs Recovery' },
  { key:'evBuses',     label:'EV Buses',           icon:'fa-bolt',               gradient:'linear-gradient(135deg,#006064,#004d40)', trend:'Electric Fleet' },
  { key:'expiredDocs', label:'Expired Documents',  icon:'fa-file-times',         gradient:'linear-gradient(135deg,#4a148c,#311b92)', trend:'Action Required' },
  { key:'battAlert',   label:'Battery Alerts',     icon:'fa-battery-quarter',    gradient:'linear-gradient(135deg,#37474f,#263238)', trend:'EV Low Charge' },
  { key:'contrExp',    label:'Contracts Expiring', icon:'fa-file-contract',      gradient:'linear-gradient(135deg,#880e4f,#4a148c)', trend:'Within 30 Days' },
];

function renderStatCards() {
  const stats = computeStats();
  const grid = $('statsGrid');
  grid.innerHTML = '';
  CARD_CONFIGS.forEach(cfg => {
    const val = stats[cfg.key];
    const card = document.createElement('div');
    card.className = 'stat-card';
    card.style.background = cfg.gradient;
    card.innerHTML = `
      <div class="stat-icon"><i class="fas ${cfg.icon}"></i></div>
      <div class="stat-value" data-target="${val}">0</div>
      <div class="stat-label">${cfg.label}</div>
      <div class="stat-trend">${cfg.trend}</div>
      <i class="fas ${cfg.icon} stat-bg-icon"></i>
    `;
    grid.appendChild(card);
    setTimeout(() => {
      animateCounter(card.querySelector('.stat-value'), val);
    }, 100);
  });
}

// ─────────────────────────────────────
// 10.  EFFICIENCY SCORE
// ─────────────────────────────────────
let effRingChart = null;
function renderEfficiency() {
  const stats = computeStats();
  const activeRatio = stats.active / stats.total;
  const docOk = (stats.total - stats.expiredDocs) / stats.total;
  const battOk = (stats.evBuses - stats.battAlert) / Math.max(stats.evBuses,1);
  const score = Math.round((activeRatio*0.4 + docOk*0.35 + battOk*0.25)*100);

  const el = $('efficiencyScore');
  animateCounter(el, score);

  const ctx = $('efficiencyRing').getContext('2d');
  const color = score >= 75 ? '#00e676' : score >= 50 ? '#ffa726' : '#ff1744';
  if(effRingChart) effRingChart.destroy();
  effRingChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [score, 100 - score],
        backgroundColor: [color, isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'],
        borderWidth: 0,
        hoverOffset: 4,
      }]
    },
    options: {
      cutout: '78%',
      plugins: { legend: { display:false }, tooltip: { enabled:false } },
      animation: { animateRotate: true, duration: 1400 }
    }
  });

  const breakdown = [
    { label:'Active Rate',   val: Math.round(activeRatio*100), color: '#00e676' },
    { label:'Doc Compliance',val: Math.round(docOk*100),       color: '#4fc3f7' },
    { label:'Battery Health',val: Math.round(battOk*100),      color: '#ff9800' },
    { label:'Fleet Uptime',  val: Math.round((1-stats.breakdown/stats.total)*100), color: '#ce93d8' },
  ];
  $('effBreakdown').innerHTML = breakdown.map(b => `
    <div class="eff-item">
      <div class="eff-item-label">${b.label}</div>
      <div class="eff-item-val" style="color:${b.color}">${b.val}%</div>
      <div class="eff-item-bar"><div class="eff-item-bar-fill" style="width:${b.val}%;background:${b.color}"></div></div>
    </div>
  `).join('');
}

// ─────────────────────────────────────
// 11.  CHARTS
// ─────────────────────────────────────
const chartInstances = {};

function getChartDefaults() {
  return {
    color: isDark ? '#7a9acc' : '#2c4a7a',
    gridColor: isDark ? 'rgba(80,140,255,0.08)' : 'rgba(41,121,255,0.08)',
    fontFamily: "'Rajdhani', sans-serif",
  };
}

function destroyChart(key) {
  if(chartInstances[key]) { chartInstances[key].destroy(); delete chartInstances[key]; }
}

function renderFleetPieChart() {
  const ctx = $('fleetPieChart');
  if(!ctx) return;
  destroyChart('fleetPie');
  const s = computeStats();
  const stats = busFleet.reduce((acc, b) => {
    acc[b.status] = (acc[b.status]||0) + 1; return acc;
  }, {});
  const labels = Object.keys(stats);
  const colors = { Active:'#00e676', Maintenance:'#ffa726', Charging:'#00e5ff', Idle:'#90a4ae', Breakdown:'#ff1744' };
  const cd = getChartDefaults();
  chartInstances.fleetPie = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data: labels.map(l=>stats[l]), backgroundColor: labels.map(l=>colors[l]||'#4fc3f7'), borderWidth:2, borderColor: isDark ? '#0c1428' : '#e3eaf8', hoverOffset:6 }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position:'bottom', labels:{ color: cd.color, font:{ family: cd.fontFamily, size:12 }, padding:16, usePointStyle:true } },
        tooltip: { backgroundColor: isDark ? '#111d35':'#fff', titleColor: isDark?'#e8f0ff':'#0a1628', bodyColor: isDark?'#7a9acc':'#2c4a7a', borderColor: 'rgba(80,140,255,0.2)', borderWidth:1 }
      }
    }
  });
}

function renderMaintTrendChart() {
  const ctx = $('maintTrendChart');
  if(!ctx) return;
  destroyChart('maintTrend');
  const months = ['Dec','Jan','Feb','Mar','Apr','May'];
  const cd = getChartDefaults();
  chartInstances.maintTrend = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        { label:'Scheduled', data:[3,5,4,7,6,5], borderColor:'#4fc3f7', backgroundColor:'rgba(79,195,247,0.1)', tension:0.4, fill:true, pointBackgroundColor:'#4fc3f7', pointRadius:4 },
        { label:'Emergency',  data:[1,2,1,3,1,2], borderColor:'#ff4569', backgroundColor:'rgba(255,69,105,0.1)', tension:0.4, fill:true, pointBackgroundColor:'#ff4569', pointRadius:4 },
        { label:'Completed',  data:[4,6,5,9,7,6], borderColor:'#00e676', backgroundColor:'rgba(0,230,118,0.08)', tension:0.4, fill:true, pointBackgroundColor:'#00e676', pointRadius:4 },
      ]
    },
    options: {
      responsive:true,
      plugins: { legend:{ labels:{ color:cd.color, font:{family:cd.fontFamily,size:11}, usePointStyle:true } }, tooltip:{backgroundColor:isDark?'#111d35':'#fff',titleColor:isDark?'#e8f0ff':'#0a1628',bodyColor:isDark?'#7a9acc':'#2c4a7a'} },
      scales: {
        x: { ticks:{color:cd.color, font:{family:cd.fontFamily}}, grid:{color:cd.gridColor} },
        y: { ticks:{color:cd.color, font:{family:cd.fontFamily}}, grid:{color:cd.gridColor}, beginAtZero:true }
      }
    }
  });
}

function renderDepotPerfChart() {
  const ctx = $('depotPerfChart');
  if(!ctx) return;
  destroyChart('depotPerf');
  const depotCounts = {};
  busFleet.forEach(b => { depotCounts[b.depot] = (depotCounts[b.depot]||0)+1; });
  const depots = Object.keys(depotCounts);
  const cd = getChartDefaults();
  const active = depots.map(d => busFleet.filter(b=>b.depot===d&&b.status==='Active').length);
  const inact  = depots.map(d => busFleet.filter(b=>b.depot===d&&b.status!=='Active').length);
  chartInstances.depotPerf = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: depots,
      datasets: [
        { label:'Active', data:active, backgroundColor:'rgba(0,230,118,0.7)', borderRadius:4 },
        { label:'Others', data:inact,  backgroundColor:'rgba(255,70,105,0.6)', borderRadius:4 },
      ]
    },
    options: {
      responsive:true,
      plugins:{ legend:{ labels:{ color:cd.color, font:{family:cd.fontFamily,size:11}, usePointStyle:true } }, tooltip:{backgroundColor:isDark?'#111d35':'#fff'} },
      scales: {
        x:{ stacked:true, ticks:{color:cd.color, font:{family:cd.fontFamily,size:10}}, grid:{display:false} },
        y:{ stacked:true, ticks:{color:cd.color, font:{family:cd.fontFamily}}, grid:{color:cd.gridColor}, beginAtZero:true }
      }
    }
  });
}

function renderBatteryBarChart() {
  const ctx = $('batteryBarChart');
  if(!ctx) return;
  destroyChart('battBar');
  const evs = busFleet.filter(b=>b.type==='EV');
  const cd = getChartDefaults();
  const colors = evs.map(b => b.battery >= 60 ? '#00e676' : b.battery >= 25 ? '#ffa726' : '#ff1744');
  chartInstances.battBar = new Chart(ctx, {
    type:'bar',
    data:{ labels: evs.map(b=>b.busNo.replace('MH-01-','')), datasets:[{ label:'Battery %', data: evs.map(b=>b.battery), backgroundColor:colors, borderRadius:4 }] },
    options:{
      responsive:true,
      plugins:{ legend:{display:false}, tooltip:{backgroundColor:isDark?'#111d35':'#fff',callbacks:{label:ctx=>`${ctx.parsed.y}%`}} },
      scales:{ x:{ticks:{color:cd.color,font:{family:cd.fontFamily,size:10}},grid:{display:false}}, y:{ticks:{color:cd.color,font:{family:cd.fontFamily},callback:v=>v+'%'},grid:{color:cd.gridColor},max:100,beginAtZero:true} }
    }
  });
}

function renderAnalyticsCharts() {
  // Type donut
  const ctx1 = $('typeDonutChart');
  if(ctx1) {
    destroyChart('typeDonut');
    const types = { EV:0, Diesel:0, CNG:0 };
    busFleet.forEach(b=>types[b.type]++);
    const cd = getChartDefaults();
    chartInstances.typeDonut = new Chart(ctx1, {
      type:'doughnut',
      data:{ labels:Object.keys(types), datasets:[{ data:Object.values(types), backgroundColor:['#00e5ff','#ffa726','#66bb6a'], borderWidth:2, borderColor:isDark?'#0c1428':'#e3eaf8', hoverOffset:6 }] },
      options:{ responsive:true, plugins:{ legend:{position:'bottom',labels:{color:cd.color,font:{family:cd.fontFamily,size:12},usePointStyle:true}}, tooltip:{backgroundColor:isDark?'#111d35':'#fff'} } }
    });
  }
  // EV battery analytics
  const ctx2 = $('evBatteryAnalyticsChart');
  if(ctx2) {
    destroyChart('evBattAnal');
    const evs = busFleet.filter(b=>b.type==='EV');
    const cd = getChartDefaults();
    chartInstances.evBattAnal = new Chart(ctx2, {
      type:'bar',
      data:{ labels:evs.map(b=>b.busNo.replace('MH-01-','')), datasets:[{ label:'Battery Level', data:evs.map(b=>b.battery), backgroundColor: evs.map(b=>b.battery>=60?'rgba(0,230,118,0.7)':b.battery>=25?'rgba(255,167,38,0.7)':'rgba(255,23,68,0.7)'), borderRadius:4 }] },
      options:{ responsive:true, plugins:{legend:{display:false},tooltip:{backgroundColor:isDark?'#111d35':'#fff',callbacks:{label:c=>`${c.parsed.y}%`}}}, scales:{x:{ticks:{color:cd.color,font:{family:cd.fontFamily,size:10}},grid:{display:false}},y:{ticks:{color:cd.color,callbacks:{label:v=>v+'%'}},grid:{color:cd.gridColor},max:100,beginAtZero:true}} }
    });
  }
  // Health index
  const ctx3 = $('healthIndexChart');
  if(ctx3) {
    destroyChart('healthIdx');
    const cd = getChartDefaults();
    chartInstances.healthIdx = new Chart(ctx3, {
      type:'line',
      data:{ labels:['Dec','Jan','Feb','Mar','Apr','May'],
        datasets:[
          { label:'Fleet Health Index', data:[72,68,74,70,76,80], borderColor:'#4fc3f7', backgroundColor:'rgba(79,195,247,0.12)', tension:0.5, fill:true, pointRadius:5, pointBackgroundColor:'#4fc3f7' },
          { label:'Target', data:[80,80,80,80,80,80], borderColor:'rgba(0,230,118,0.5)', borderDash:[6,4], tension:0, pointRadius:0 }
        ]
      },
      options:{ responsive:true, plugins:{legend:{labels:{color:cd.color,font:{family:cd.fontFamily,size:11},usePointStyle:true}},tooltip:{backgroundColor:isDark?'#111d35':'#fff'}}, scales:{x:{ticks:{color:cd.color,font:{family:cd.fontFamily}},grid:{color:cd.gridColor}},y:{ticks:{color:cd.color},grid:{color:cd.gridColor},min:50,max:100}} }
    });
  }
}

function renderAllCharts() {
  renderFleetPieChart();
  renderMaintTrendChart();
  renderDepotPerfChart();
  renderBatteryBarChart();
  renderEfficiency();
}

// ─────────────────────────────────────
// 12.  FLEET TABLE
// ─────────────────────────────────────
let fleetData = [...busFleet];
let sortCol = null, sortDir = 1;

function expiryBadge(dateStr) {
  const d = daysDiff(dateStr);
  if(d < 0) return `<span class="badge badge-critical">Expired</span>`;
  if(d <= 15) return `<span class="badge badge-high">${d}d</span>`;
  if(d <= 30) return `<span class="badge badge-medium">${d}d</span>`;
  return `<span style="color:var(--text-muted);font-size:0.8rem">${formatDate(dateStr)}</span>`;
}

function renderFleetTable() {
  const search = ($('fleetSearch')?.value || '').toLowerCase();
  const fStatus = $('filterStatus')?.value || '';
  const fType   = $('filterType')?.value || '';
  const fDepot  = $('filterDepot')?.value || '';

  let data = fleetData.filter(b => {
    const s = `${b.busNo} ${b.depot} ${b.driver} ${b.type} ${b.status}`.toLowerCase();
    if(search && !s.includes(search)) return false;
    if(fStatus && b.status !== fStatus) return false;
    if(fType   && b.type   !== fType)   return false;
    if(fDepot  && b.depot  !== fDepot)  return false;
    return true;
  });

  if(sortCol) {
    data.sort((a,b) => {
      let va = a[sortCol] ?? '', vb = b[sortCol] ?? '';
      if(typeof va === 'string') va = va.toLowerCase();
      if(typeof vb === 'string') vb = vb.toLowerCase();
      if(va < vb) return -1 * sortDir;
      if(va > vb) return  1 * sortDir;
      return 0;
    });
  }

  const tbody = $('fleetTableBody');
  tbody.innerHTML = data.map(b => `
    <tr>
      <td>${b.busNo}</td>
      <td>${b.depot}</td>
      <td><span class="${typeClass(b.type)}">${b.type}</span></td>
      <td><span class="${statusClass(b.status)}">${b.status}</span></td>
      <td>${b.battery !== null ? `<span style="color:${b.battery>=60?'#00e676':b.battery>=25?'#ffa726':'#ff1744'};font-family:var(--font-mono);font-weight:700">${b.battery}%</span>` : '<span style="color:var(--text-muted)">N/A</span>'}</td>
      <td>${b.driver}</td>
      <td>${expiryBadge(b.maintDue)}</td>
      <td>${expiryBadge(b.insurance)}</td>
      <td>${expiryBadge(b.fitness)}</td>
      <td>${expiryBadge(b.contract)}</td>
      <td><span style="font-family:var(--font-mono);font-size:0.78rem;color:var(--text-muted)">${formatDate(b.lastService)}</span></td>
      <td><button class="btn-detail" onclick="openBusModal('${b.busNo}')"><i class="fas fa-eye"></i> View</button></td>
    </tr>
  `).join('');
  $('tableCount').textContent = `Showing ${data.length} of ${busFleet.length} buses`;
}

// Populate depot filter
const depotSel = $('filterDepot');
[...new Set(busFleet.map(b=>b.depot))].sort().forEach(d => {
  const opt = document.createElement('option'); opt.value = d; opt.textContent = d; depotSel.appendChild(opt);
});

['fleetSearch','filterStatus','filterType','filterDepot'].forEach(id => {
  const el = $(id); if(el) el.addEventListener('input', renderFleetTable);
});

// Sorting
document.querySelectorAll('#fleetTable thead th[data-col]').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if(sortCol === col) sortDir *= -1;
    else { sortCol = col; sortDir = 1; }
    renderFleetTable();
  });
});

// Export CSV
$('exportCsvBtn').addEventListener('click', () => {
  const headers = ['Bus No','Depot','Type','Status','Battery %','Driver','Maint Due','Insurance','Fitness','Contract','Last Service'];
  const rows = busFleet.map(b => [b.busNo,b.depot,b.type,b.status,b.battery??'N/A',b.driver,b.maintDue,b.insurance,b.fitness,b.contract,b.lastService]);
  const csv = [headers, ...rows].map(r=>r.join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv,' + encodeURIComponent(csv);
  a.download = 'mumbai_vms_fleet.csv';
  a.click();
});

// ─────────────────────────────────────
// 13.  EV BATTERY GRID
// ─────────────────────────────────────
const evBuses = busFleet.filter(b => b.type === 'EV');
// Live battery state (simulated)
const evBatteryLive = {};
evBuses.forEach(b => { evBatteryLive[b.busNo] = b.battery; });

function renderEVGrid() {
  const grid = $('evGrid');
  grid.innerHTML = evBuses.map(b => {
    const pct = evBatteryLive[b.busNo];
    const health = batteryHealth(pct);
    const isCharging = b.status === 'Charging';
    const isCrit = health === 'critical';
    return `
      <div class="ev-card ${isCharging?'charging-active':''} ${isCrit?'critical-bat':''}" id="evcard-${b.busNo.replace(/\W/g,'_')}">
        <div class="ev-card-header">
          <div>
            <div class="ev-bus-no">${b.busNo}</div>
            <div class="ev-depot">${b.depot}</div>
          </div>
          <span class="badge badge-${b.status.toLowerCase()}">${b.status}</span>
        </div>
        <div class="ev-battery-wrap">
          <div class="ev-battery-percent" style="color:${health==='healthy'?'#00e676':health==='medium'?'#ffa726':'#ff1744'}" id="evpct-${b.busNo.replace(/\W/g,'_')}">${pct}%</div>
          <div class="ev-battery-bar-track">
            <div class="ev-battery-bar-fill ${health}" style="width:${pct}%" id="evbar-${b.busNo.replace(/\W/g,'_')}"></div>
          </div>
        </div>
        <div class="ev-status-row">
          <span>${isCharging ? '<span style="color:var(--accent-cyan)">Charging…</span>' : b.driver}</span>
          ${isCharging ? '<i class="fas fa-bolt ev-charging-icon"></i>' : `<span style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted)">${batteryHealth(pct).toUpperCase()}</span>`}
        </div>
      </div>
    `;
  }).join('');
}

// Simulate live battery changes
function simulateBatteryUpdates() {
  evBuses.forEach(b => {
    const id = b.busNo.replace(/\W/g,'_');
    const el = $('evpct-'+id);
    const bar = $('evbar-'+id);
    if(!el || !bar) return;
    let pct = evBatteryLive[b.busNo];
    if(b.status === 'Charging') {
      pct = Math.min(100, pct + Math.random()*1.5);
    } else {
      pct = Math.max(5, pct - Math.random()*0.5);
    }
    evBatteryLive[b.busNo] = Math.round(pct);
    el.textContent = Math.round(pct) + '%';
    bar.style.width = Math.round(pct) + '%';
    const h = batteryHealth(Math.round(pct));
    bar.className = `ev-battery-bar-fill ${h}`;
    const color = h==='healthy'?'#00e676':h==='medium'?'#ffa726':'#ff1744';
    el.style.color = color;
  });
}

// ─────────────────────────────────────
// 14.  AI MAINTENANCE SECTION
// ─────────────────────────────────────
const AI_RECOMMENDATIONS = [
  "AI detected high failure probability for Bus MH-01-EV-221 — Schedule immediate inspection.",
  "Predictive model suggests MH-01-DS-502 brake system at risk. Maintenance recommended within 48 hrs.",
  "3 buses show anomalous engine temperature patterns. Recommend diagnostic scan.",
  "Battery degradation detected in MH-01-EV-102 — Consider cell replacement.",
  "AI forecasts 18% increase in breakdown risk across Vikhroli depot next 7 days.",
];
let aiRecoIdx = 0;

function renderAIMaintenance() {
  // High risk list
  const sorted = [...busFleet].map(b => ({ bus:b, score: riskScore(b) })).sort((a,b)=>b.score-a.score);
  const high = sorted.slice(0,8);

  $('highRiskList').innerHTML = high.map(({bus,score}) => {
    const lvl = riskLevel(score);
    const issues = [];
    if(daysDiff(bus.maintDue)<7) issues.push('Maintenance due');
    if(daysDiff(bus.insurance)<0) issues.push('Insurance expired');
    if(daysDiff(bus.fitness)<0)   issues.push('Fitness expired');
    if(bus.status==='Breakdown')  issues.push('Breakdown');
    if(bus.battery!==null && bus.battery<25) issues.push(`Battery ${bus.battery}%`);
    return `
      <div class="risk-item risk-${lvl}">
        <div class="risk-bus-no">${bus.busNo}</div>
        <div class="risk-details"><div class="risk-issue">${issues.join(' · ') || 'Multiple factors'}</div><small style="color:var(--text-muted)">${bus.depot}</small></div>
        <div class="risk-score-wrap">
          <div class="risk-score ${score>=60?'high-score':score>=35?'med-score':'low-score'}">${score}</div>
          <div><span class="badge badge-${lvl}">${lvl}</span></div>
        </div>
      </div>
    `;
  }).join('');

  // Upcoming maintenance
  const upcoming = [...busFleet].filter(b=>daysDiff(b.maintDue)>=0&&daysDiff(b.maintDue)<=30).sort((a,b)=>daysDiff(a.maintDue)-daysDiff(b.maintDue)).slice(0,8);
  $('upcomingMaintList').innerHTML = upcoming.map(b => {
    const d = daysDiff(b.maintDue);
    return `
      <div class="maint-item">
        <div class="maint-bus">${b.busNo}</div>
        <div class="maint-due">${b.depot} — ${formatDate(b.maintDue)}</div>
        <div class="maint-days">${d===0?'TODAY':d+'d'}</div>
      </div>
    `;
  }).join('');

  // Maintenance table
  const search = ($('maintSearch')?.value||'').toLowerCase();
  const data = [...busFleet].map(b=>({bus:b,score:riskScore(b)})).sort((a,b)=>b.score-a.score);
  const filtered = data.filter(({bus})=>`${bus.busNo} ${bus.depot}`.toLowerCase().includes(search));
  $('maintTableBody').innerHTML = filtered.map(({bus,score})=>{
    const lvl = riskLevel(score);
    const nd = daysDiff(bus.maintDue);
    const priority = nd<0?'Overdue':nd<7?'Urgent':nd<30?'Soon':'Scheduled';
    const prCls = nd<0?'critical':nd<7?'high':nd<30?'medium':'low';
    return `
      <tr>
        <td>${bus.busNo}</td>
        <td>${bus.depot}</td>
        <td><span style="font-family:var(--font-mono);font-size:0.78rem;color:var(--text-muted)">${formatDate(bus.lastService)}</span></td>
        <td>${expiryBadge(bus.maintDue)}</td>
        <td><span style="font-family:var(--font-display);font-size:1rem;font-weight:700;color:${score>=60?'#ff1744':score>=35?'#ffa726':'#ffd740'}">${score}</span></td>
        <td><span class="badge badge-${prCls}">${priority}</span></td>
        <td><button class="btn-detail" onclick="openBusModal('${bus.busNo}')"><i class="fas fa-eye"></i></button></td>
      </tr>
    `;
  }).join('');
}

$('maintSearch')?.addEventListener('input', renderAIMaintenance);

// Rotating AI recommendations
function cycleAIReco() {
  const el = $('aiRecoText');
  if(!el) return;
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = AI_RECOMMENDATIONS[aiRecoIdx % AI_RECOMMENDATIONS.length];
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = '1';
    aiRecoIdx++;
  }, 400);
}
setInterval(cycleAIReco, 5000);
cycleAIReco();

// ─────────────────────────────────────
// 15.  ALERTS PANEL
// ─────────────────────────────────────
let allAlerts = generateAlerts();
let alertFilter = 'all';

function renderAlerts() {
  const list = $('alertsList');
  const icons = { critical:'fa-exclamation-circle', high:'fa-exclamation-triangle', medium:'fa-info-circle', low:'fa-check-circle' };
  const filtered = alertFilter === 'all' ? allAlerts : allAlerts.filter(a=>a.sev===alertFilter);
  list.innerHTML = filtered.length === 0 ? '<div style="text-align:center;padding:40px;color:var(--text-muted)"><i class="fas fa-check-circle" style="font-size:2rem;margin-bottom:8px;display:block;color:var(--accent-green)"></i>No alerts in this category</div>'
    : filtered.map((a,i) => `
      <div class="alert-card sev-${a.sev}" style="animation-delay:${i*0.04}s">
        <i class="fas ${a.icon || icons[a.sev]} alert-icon"></i>
        <div class="alert-content">
          <div class="alert-title">${a.title}</div>
          <div class="alert-desc">${a.desc}</div>
          <div class="alert-time"><i class="fas fa-clock"></i> ${a.time}</div>
        </div>
        <div class="alert-meta">
          <span class="badge badge-${a.sev}">${a.sev.toUpperCase()}</span>
        </div>
      </div>
    `).join('');

  // Update badge
  const critCount = allAlerts.filter(a=>a.sev==='critical').length;
  $('alertBadge').textContent = critCount;
  $('notifCount').textContent = critCount;
  updateNotifDropdown();
}

document.querySelectorAll('.alert-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.alert-filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    alertFilter = btn.dataset.sev;
    renderAlerts();
  });
});

$('clearAlertsBtn').addEventListener('click', () => { allAlerts = []; renderAlerts(); });

// ─────────────────────────────────────
// 16.  NOTIFICATION DROPDOWN
// ─────────────────────────────────────
function updateNotifDropdown() {
  const list = $('notifList');
  const sevColors = { critical:'#ff1744', high:'#ffa726', medium:'#ffe57f', low:'#00e676' };
  const criticals = allAlerts.filter(a=>a.sev==='critical').slice(0,10);
  list.innerHTML = criticals.length === 0
    ? '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:0.85rem">No critical alerts</div>'
    : criticals.map(a=>`
        <div class="notif-item">
          <div class="notif-dot" style="background:${sevColors[a.sev]}"></div>
          <div class="notif-text">${a.title}</div>
          <div class="notif-ts">Now</div>
        </div>
      `).join('');
}

$('notifBtn').addEventListener('click', e => {
  e.stopPropagation();
  $('notifDropdown').classList.toggle('open');
});
document.addEventListener('click', () => $('notifDropdown').classList.remove('open'));
$('notifClear').addEventListener('click', e => { e.stopPropagation(); $('notifDropdown').classList.remove('open'); });

// ─────────────────────────────────────
// 17.  CONTRACTS TABLE
// ─────────────────────────────────────
function renderContracts() {
  const search = ($('contractSearch')?.value||'').toLowerCase();
  const filter = $('contractFilter')?.value||'';

  const data = busFleet.filter(b => {
    const s = `${b.busNo} ${b.vendor}`.toLowerCase();
    if(search && !s.includes(search)) return false;
    const d = daysDiff(b.contract);
    if(filter==='expiring' && !(d>=0&&d<=30)) return false;
    if(filter==='expired'  && d>=0) return false;
    if(filter==='active'   && d<0)  return false;
    return true;
  });

  const types = ['Bus Hire Contract', 'Maintenance SLA', 'Fuel Supply', 'Driver Service', 'Fleet Insurance'];
  $('contractTableBody').innerHTML = data.map((b,i)=>{
    const d = daysDiff(b.contract);
    const startDate = new Date(b.contract); startDate.setFullYear(startDate.getFullYear()-1);
    const statusClass2 = d<0?'badge-critical':d<=30?'badge-high':'badge-active';
    const statusLabel  = d<0?'Expired':d<=30?'Expiring':'Active';
    const daysClass    = d<0?'expired':d<=30?'expiring':'ok';
    return `
      <tr>
        <td>${b.busNo}</td>
        <td>${b.vendor}</td>
        <td>${types[i%types.length]}</td>
        <td><span style="font-family:var(--font-mono);font-size:0.78rem;color:var(--text-muted)">${formatDate(startDate.toISOString().slice(0,10))}</span></td>
        <td><span style="font-family:var(--font-mono);font-size:0.78rem">${formatDate(b.contract)}</span></td>
        <td><span class="contract-days ${daysClass}">${d<0?`${Math.abs(d)}d ago`:d+'d left'}</span></td>
        <td><span class="badge ${statusClass2}">${statusLabel}</span></td>
      </tr>
    `;
  }).join('');
}
['contractSearch','contractFilter'].forEach(id=>{ const el=$(id); if(el) el.addEventListener('input',renderContracts); });

// ─────────────────────────────────────
// 18.  AI ASSISTANT CHAT
// ─────────────────────────────────────
const QUICK_QUESTIONS = [
  { icon:'fa-tools',        q:'Which buses need urgent maintenance?' },
  { icon:'fa-battery-quarter', q:'Show low battery EV buses' },
  { icon:'fa-file-contract',q:'Which contracts expire this month?' },
  { icon:'fa-exclamation-triangle', q:'Show breakdown buses' },
  { icon:'fa-shield-alt',   q:'Which insurance policies are expired?' },
  { icon:'fa-chart-line',   q:'What is the fleet efficiency score?' },
  { icon:'fa-warehouse',    q:'Show busiest depot' },
  { icon:'fa-bolt',         q:'How many EV buses are charging?' },
];

function renderQuickQuestions() {
  $('quickQList').innerHTML = QUICK_QUESTIONS.map(q=>
    `<button class="quick-q-btn" onclick="sendChat('${q.q}')"><i class="fas ${q.icon}"></i>${q.q}</button>`
  ).join('');
}

function aiAnswer(q) {
  const lower = q.toLowerCase();
  if(lower.includes('urgent maintenance') || lower.includes('overdue')) {
    const buses = busFleet.filter(b=>daysDiff(b.maintDue)<7).map(b=>b.busNo).join(', ');
    return `⚠️ Buses requiring urgent maintenance (due within 7 days):\n${buses || 'None at this time'}`;
  }
  if(lower.includes('low battery') || lower.includes('battery')) {
    const buses = busFleet.filter(b=>b.battery!==null&&b.battery<25).map(b=>`${b.busNo} (${b.battery}%)`).join(', ');
    return `🔋 Low battery EV buses (< 25%):\n${buses || 'None — all batteries are healthy!'}`;
  }
  if(lower.includes('contract')) {
    const buses = busFleet.filter(b=>daysDiff(b.contract)<=30).map(b=>`${b.busNo} (${daysDiff(b.contract)}d)`).join(', ');
    return `📄 Contracts expiring within 30 days:\n${buses || 'No contracts expiring soon'}`;
  }
  if(lower.includes('breakdown')) {
    const buses = busFleet.filter(b=>b.status==='Breakdown').map(b=>b.busNo).join(', ');
    return `🚨 Buses in breakdown: ${buses || 'None — good news!'}`;
  }
  if(lower.includes('insurance')) {
    const buses = busFleet.filter(b=>daysDiff(b.insurance)<0).map(b=>b.busNo).join(', ');
    return `🛡️ Buses with expired insurance:\n${buses || 'All insurance policies are valid'}`;
  }
  if(lower.includes('efficiency') || lower.includes('score')) {
    const s = computeStats();
    const score = Math.round((s.active/s.total*0.4 + (s.total-s.expiredDocs)/s.total*0.35 + (s.evBuses-s.battAlert)/Math.max(s.evBuses,1)*0.25)*100);
    return `📊 Current Fleet Efficiency Score: ${score}/100\n\n• Active buses: ${s.active}/${s.total}\n• Expired docs: ${s.expiredDocs}\n• Battery alerts: ${s.battAlert}`;
  }
  if(lower.includes('depot')) {
    const counts = {};
    busFleet.forEach(b=>counts[b.depot]=(counts[b.depot]||0)+1);
    const top = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];
    return `🏭 Busiest depot: ${top[0]} with ${top[1]} buses\n\nDepot breakdown:\n${Object.entries(counts).map(([d,c])=>`• ${d}: ${c} buses`).join('\n')}`;
  }
  if(lower.includes('charging') || lower.includes('ev')) {
    const charging = busFleet.filter(b=>b.status==='Charging');
    return `⚡ EV buses currently charging: ${charging.length}\n${charging.map(b=>`• ${b.busNo} at ${b.battery}%`).join('\n') || 'None charging'}`;
  }
  const stats = computeStats();
  return `🚌 Fleet Summary:\n• Total: ${stats.total} buses\n• Active: ${stats.active}\n• In Maintenance: ${stats.maintenance}\n• Breakdowns: ${stats.breakdown}\n• EV Fleet: ${stats.evBuses}\n\nAsk me anything about maintenance, batteries, contracts, or fleet performance!`;
}

function addMsg(text, isUser) {
  const body = $('chatBody');
  const div = document.createElement('div');
  div.className = `chat-msg ${isUser?'user-msg':'ai-msg'}`;
  div.innerHTML = `<div class="msg-bubble">${text.replace(/\n/g,'<br>')}</div><div class="msg-time">${isUser?'You':'FLEET-AI'} · ${new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</div>`;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function showTyping() {
  const body = $('chatBody');
  const div = document.createElement('div');
  div.className = 'chat-msg ai-msg';
  div.id = 'typingIndicator';
  div.innerHTML = `<div class="msg-bubble typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function removeTyping() { const el=$('typingIndicator'); if(el) el.remove(); }

window.sendChat = function(q) {
  const inp = $('chatInput');
  if(inp) inp.value = '';
  addMsg(q, true);
  showTyping();
  setTimeout(() => {
    removeTyping();
    addMsg(aiAnswer(q), false);
  }, 800 + Math.random()*600);
};

$('chatSend').addEventListener('click', () => {
  const v = $('chatInput').value.trim();
  if(v) sendChat(v);
});
$('chatInput').addEventListener('keydown', e => { if(e.key==='Enter') { const v=e.target.value.trim(); if(v) sendChat(v); } });

function renderAIInsights() {
  const stats = computeStats();
  const score = Math.round((stats.active/stats.total*0.4+(stats.total-stats.expiredDocs)/stats.total*0.35+(stats.evBuses-stats.battAlert)/Math.max(stats.evBuses,1)*0.25)*100);
  $('aiInsightsSummary').innerHTML = [
    { label:'Fleet Score', val:`${score}/100` },
    { label:'Active Ratio', val:`${Math.round(stats.active/stats.total*100)}%` },
    { label:'Critical Alerts', val:`${allAlerts.filter(a=>a.sev==='critical').length}` },
    { label:'Buses At Risk', val:`${busFleet.filter(b=>riskScore(b)>=35).length}` },
  ].map(i=>`<div class="ai-insight-item"><div class="ai-insight-label">${i.label}</div><div class="ai-insight-val">${i.val}</div></div>`).join('');
}

// ─────────────────────────────────────
// 19.  SERVICE MODAL
// ─────────────────────────────────────
window.openBusModal = function(busNo) {
  const bus = busFleet.find(b=>b.busNo===busNo);
  if(!bus) return;
  const hist = serviceHistoryDB[busNo] || [];
  const score = riskScore(bus);
  const lvl = riskLevel(score);
  $('modalTitle').innerHTML = `<i class="fas fa-bus" style="color:var(--accent-cyan)"></i> ${bus.busNo}`;
  $('modalBody').innerHTML = `
    <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
      <span class="${statusClass(bus.status)}">${bus.status}</span>
      <span class="${typeClass(bus.type)}">${bus.type}</span>
      <span class="badge badge-${lvl}">Risk: ${score} (${lvl.toUpperCase()})</span>
    </div>
    <div class="modal-info-grid">
      <div class="modal-info-item"><label>Depot</label><span>${bus.depot}</span></div>
      <div class="modal-info-item"><label>Driver</label><span>${bus.driver}</span></div>
      <div class="modal-info-item"><label>Vendor</label><span>${bus.vendor}</span></div>
      ${bus.battery!==null?`<div class="modal-info-item"><label>Battery</label><span style="color:${batteryHealth(bus.battery)==='healthy'?'#00e676':batteryHealth(bus.battery)==='medium'?'#ffa726':'#ff1744'}">${bus.battery}%</span></div>`:''}
      <div class="modal-info-item"><label>Insurance Expiry</label><span>${formatDate(bus.insurance)}</span></div>
      <div class="modal-info-item"><label>Fitness Certificate</label><span>${formatDate(bus.fitness)}</span></div>
      <div class="modal-info-item"><label>Contract Expiry</label><span>${formatDate(bus.contract)}</span></div>
      <div class="modal-info-item"><label>Maintenance Due</label><span>${formatDate(bus.maintDue)}</span></div>
      <div class="modal-info-item"><label>Last Service</label><span>${formatDate(bus.lastService)}</span></div>
    </div>
    <div class="modal-section-title">Service History</div>
    ${hist.map(h=>`<div class="service-history-item"><div class="service-date">${formatDate(h.date)}</div><div class="service-desc">${h.desc}</div><div class="service-cost">${h.cost}</div></div>`).join('')}
  `;
  $('serviceModal').classList.add('open');
};
$('modalClose').addEventListener('click', () => $('serviceModal').classList.remove('open'));
$('serviceModal').addEventListener('click', e => { if(e.target===$('serviceModal')) $('serviceModal').classList.remove('open'); });

// ─────────────────────────────────────
// 20.  REFRESH BUTTON
// ─────────────────────────────────────
$('refreshBtn').addEventListener('click', () => {
  $('refreshBtn').querySelector('i').style.animation = 'spin 0.6s linear';
  setTimeout(()=>{ $('refreshBtn').querySelector('i').style.animation=''; }, 600);
  renderAll();
});

// ─────────────────────────────────────
// 21.  LIVE SIMULATION
// ─────────────────────────────────────
setInterval(() => {
  simulateBatteryUpdates();
  renderBatteryBarChart();
}, 4000);

setInterval(() => {
  $('lastUpdated').textContent = 'Updated ' + new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
}, 10000);

// ─────────────────────────────────────
// 22.  INIT
// ─────────────────────────────────────
function renderAll() {
  renderStatCards();
  renderAllCharts();
  renderFleetTable();
  renderEVGrid();
  renderAIMaintenance();
  renderAlerts();
  renderContracts();
  renderAIInsights();
  renderQuickQuestions();
}

// spin animation
const style = document.createElement('style');
style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);

// Boot!
renderAll();
