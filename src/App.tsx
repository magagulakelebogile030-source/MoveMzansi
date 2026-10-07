import { useEffect, useState } from "react";

type Screen = "home" | "circle" | "communities" | "races" | "profile" | "prepare" | "run" | "summary" | "record" | "activitySummary" | "connectData";
type Language = "isiXhosa" | "isiZulu" | "Sesotho" | "Setswana" | "Sepedi" | "itsonga" | "Afrikaans" | "English";
type ProfileData = { firstName: string; lastName: string; city: string; province: string };
type ActivityType = "Run" | "Walk" | "Cycle" | "Swim" | "Strength Training" | "Hike" | "Yoga" | "Football" | "Tennis" | "Other";
type Goal =
  | "Improve my running"
  | "Improve my overall fitness"
  | "Build strength"
  | "Manage my weight"
  | "Train for an event"
  | "Build consistency"
  | "Improve my wellbeing"
  | "Other";
type IconName =
  | "home"
  | "shield"
  | "users"
  | "medal"
  | "user"
  | "bell"
  | "chevron"
  | "arrow"
  | "check"
  | "pin"
  | "clock"
  | "route"
  | "pace"
  | "pause"
  | "stop"
  | "plus"
  | "message"
  | "calendar"
  | "share"
  | "settings"
  | "spark"
  | "heart"
  | "download"
  | "swim"
  | "strength";

const photo =
  "https://images.unsplash.com/photo-1581596326248-f55ac7852760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080";
const cityPhoto =
  "https://images.unsplash.com/photo-1545510120-66374ff70e4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080";

function Icon({ name, size = 20, strokeWidth = 1.8 }: { name: IconName; size?: number; strokeWidth?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: <><path d="m3 11 9-7 9 7" /><path d="M5.5 9.5V20h13V9.5M9.5 20v-6h5v6" /></>,
    shield: <><path d="M12 3 4.5 6v5.5c0 4.6 3.1 7.8 7.5 9.5 4.4-1.7 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="m8.8 12 2 2 4.4-4.5" /></>,
    users: <><path d="M16 20v-1.5c0-2.5-2-4.5-4.5-4.5h-3C6 14 4 16 4 18.5V20" /><circle cx="10" cy="8" r="3.5" /><path d="M17 11a3 3 0 1 0-1.8-5.4M18 14.5c1.4.7 2 1.9 2 3.5v1" /></>,
    medal: <><circle cx="12" cy="15" r="6" /><path d="m9 10-3-7h5l1 4 1-4h5l-3 7M9.5 15l1.5 1.5 3.5-3.5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21c.6-4.2 3.2-6.5 7.5-6.5s6.9 2.3 7.5 6.5" /></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8Z" /><path d="M10 21h4" /></>,
    chevron: <path d="m9 5 7 7-7 7" />,
    arrow: <><path d="m15 18-6-6 6-6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
    route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" /></>,
    pace: <><path d="M4 15a8 8 0 1 1 16 0" /><path d="m12 15 4-5M7 18h10" /></>,
    pause: <><path d="M9 7v10M15 7v10" /></>,
    stop: <rect x="7" y="7" width="10" height="10" rx="2" />,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    message: <path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2.2V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v8Z" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></>,
    share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.3 10.8 7.4-4.5M8.3 13.2l7.4 4.5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19 13.5v-3l-2-.7-.6-1.4.9-1.9-2.1-2.1-1.9.9-1.4-.6-.7-2h-3l-.7 2-1.4.6-1.9-.9-2.1 2.1.9 1.9-.6 1.4-2 .7v3l2 .7.6 1.4-.9 1.9 2.1 2.1 1.9-.9 1.4.6.7 2h3l.7-2 1.4-.6 1.9.9 2.1-2.1-.9-1.9.6-1.4 2-.7Z" /></>,
    spark: <><path d="m12 2 1.3 5.7L19 9l-5.7 1.3L12 16l-1.3-5.7L5 9l5.7-1.3L12 2Z" /><path d="m19 15 .6 2.4L22 18l-2.4.6L19 21l-.6-2.4L16 18l2.4-.6L19 15Z" /></>,
    heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />,
    download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M5 20h14" /></>,
    swim: <><path d="M2 17c2 0 2-1.5 4-1.5S8 17 10 17s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M4 21c2 0 2-1.5 4-1.5S10 21 12 21s2-1.5 4-1.5S18 21 20 21" /><circle cx="16" cy="5" r="2" /><path d="m7 14 4-6 5 3 4-1" /></>,
    strength: <><path d="M6 9v6M3 10v4M18 9v6M21 10v4M6 12h12" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const contacts = [
  { id: 1, name: "Lerato", relation: "Sister", initials: "LM", color: "bg-[#F2B8A8]", photo: "https://images.unsplash.com/photo-1636302926027-9619142d7173?crop=faces&fit=crop&h=120&w=120&q=80" },
  { id: 2, name: "Siyanda", relation: "Run mate", initials: "SN", color: "bg-[#B8D8CF]", photo: "https://images.unsplash.com/photo-1512372923090-7b14fb496d44?crop=faces&fit=crop&h=120&w=120&q=80" },
  { id: 3, name: "Mom", relation: "Family", initials: "MM", color: "bg-[#C8C1E8]", photo: "https://images.unsplash.com/photo-1533056344954-8acef6d63650?crop=faces&fit=crop&h=120&w=120&q=80" },
];

const languages: { name: Language; greeting: string; code: string }[] = [
  { name: "isiXhosa", greeting: "Molo", code: "XH" },
  { name: "isiZulu", greeting: "Sawubona", code: "ZU" },
  { name: "Sesotho", greeting: "Dumela", code: "ST" },
  { name: "Setswana", greeting: "Dumela", code: "TN" },
  { name: "Sepedi", greeting: "Dumela", code: "NS" },
  { name: "itsonga", greeting: "Avuxeni", code: "TS" },
  { name: "Afrikaans", greeting: "Hallo", code: "AF" },
  { name: "English", greeting: "Hello", code: "EN" },
];

const fitnessGoals: Goal[] = [
  "Improve my running",
  "Improve my overall fitness",
  "Build strength",
  "Manage my weight",
  "Train for an event",
  "Build consistency",
  "Improve my wellbeing",
  "Other",
];

const activityTypes: { name: ActivityType; icon: IconName; tone: string }[] = [
  { name: "Run", icon: "route", tone: "sage" },
  { name: "Walk", icon: "pace", tone: "sand" },
  { name: "Cycle", icon: "route", tone: "blue" },
  { name: "Swim", icon: "swim", tone: "aqua" },
  { name: "Strength Training", icon: "strength", tone: "lilac" },
  { name: "Hike", icon: "pin", tone: "clay" },
  { name: "Yoga", icon: "spark", tone: "rose" },
  { name: "Football", icon: "users", tone: "grass" },
  { name: "Tennis", icon: "medal", tone: "sun" },
  { name: "Other", icon: "plus", tone: "stone" },
];

function Header({ title, onBack, action }: { title: string; onBack?: () => void; action?: React.ReactNode }) {
  return (
    <header className="flex h-16 items-center justify-between px-5">
      <div className="w-10">{onBack && <button className="icon-button" onClick={onBack} aria-label="Go back"><Icon name="arrow" /></button>}</div>
      <h1 className="text-[16px] font-bold tracking-[-0.02em]">{title}</h1>
      <div className="flex w-10 justify-end">{action}</div>
    </header>
  );
}

function BottomNav({ screen, go }: { screen: Screen; go: (screen: Screen) => void }) {
  const items: { label: string; icon: IconName; target: Screen }[] = [
    { label: "Home", icon: "home", target: "home" },
    { label: "Circle", icon: "shield", target: "circle" },
    { label: "Feed", icon: "users", target: "communities" },
    { label: "Races", icon: "medal", target: "races" },
    { label: "You", icon: "user", target: "profile" },
  ];
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button key={item.label} onClick={() => go(item.target)} className={screen === item.target ? "nav-item active" : "nav-item"}>
          <Icon name={item.icon} size={21} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function Onboarding({ profile, onComplete }: { profile: ProfileData; onComplete: (goals: Goal[], nutrition: boolean) => void }) {
  const [selected, setSelected] = useState<Goal[]>([]);
  const [step, setStep] = useState<"goals" | "nutrition">("goals");
  const [nutrition, setNutrition] = useState(false);
  const toggle = (goal: Goal) => setSelected((items) => items.includes(goal) ? items.filter((item) => item !== goal) : [...items, goal]);
  const continueOnboarding = () => {
    if (selected.includes("Manage my weight")) setStep("nutrition");
    else onComplete(selected, false);
  };
  return (
    <div className="onboarding">
      <div className="onboarding-brand"><span><Icon name="spark" size={18} /></span><strong>MOVE MZANSI</strong></div>
      {step === "goals" ? (
        <main className="onboarding-content">
          <p className="eyebrow">LET’S MAKE IT YOURS</p>
          <h1>What are you<br />working towards?</h1>
          <p className="onboarding-copy">Choose one or more goals, {profile.firstName}. We’ll shape your insights, milestones and recommendations around what matters to you.</p>
          <div className="goal-grid">
            {fitnessGoals.map((goal) => {
              const active = selected.includes(goal);
              return <button key={goal} onClick={() => toggle(goal)} className={active ? "active" : ""}><span>{goal}</span><i>{active && <Icon name="check" size={14} strokeWidth={2.5} />}</i></button>;
            })}
          </div>
          <button disabled={!selected.length} onClick={continueOnboarding} className="primary-button mt-7">Personalise my experience <Icon name="chevron" size={17} /></button>
          <p className="mt-3 text-center text-[9px] leading-4 text-[#7a837f]">You can change your goals any time in your profile.</p>
        </main>
      ) : (
        <main className="onboarding-content">
          <button onClick={() => setStep("goals")} className="icon-button mb-7" aria-label="Go back"><Icon name="arrow" /></button>
          <span className="round-icon"><Icon name="spark" size={22} /></span>
          <p className="eyebrow mt-6">OPTIONAL TOOLS</p>
          <h1>Support your goals,<br />your way.</h1>
          <p className="onboarding-copy">Nutrition can be one part of weight management, but it doesn’t have to be. Choose whether you’d like these tools in your experience.</p>
          <button onClick={() => setNutrition(!nutrition)} className={`nutrition-choice ${nutrition ? "active" : ""}`}>
            <span><Icon name="check" size={18} /></span>
            <div><strong>Add nutrition tools</strong><p>Optional calorie, meal and nutrition tracking</p></div>
            <i>{nutrition ? "On" : "Off"}</i>
          </button>
          <div className="info-note mt-4"><Icon name="shield" size={18} /><p><strong>No pressure, no assumptions</strong><br />Your feed, achievements and core fitness experience stay focused on movement—not calories.</p></div>
          <button onClick={() => onComplete(selected, nutrition)} className="primary-button mt-8">Continue to Home <Icon name="chevron" size={17} /></button>
          <button onClick={() => onComplete(selected, false)} className="text-button">Continue without nutrition tools</button>
        </main>
      )}
    </div>
  );
}

function Home({ go, profile, language, setLanguage, goals, nutritionEnabled, recordActivity, connectedCount }: { go: (screen: Screen) => void; profile: ProfileData; language: Language; setLanguage: (language: Language) => void; goals: Goal[]; nutritionEnabled: boolean; recordActivity: (activity: ActivityType) => void; connectedCount: number }) {
  const [showLanguages, setShowLanguages] = useState(false);
  const [liked, setLiked] = useState(false);
  const [sharedAchievement, setSharedAchievement] = useState(false);
  const activeLanguage = languages.find((item) => item.name === language) ?? languages[0];
  const goalMessage = goals.includes("Train for an event")
    ? "Event goal · Building towards FNB Run Your City"
    : goals.includes("Build strength")
      ? "Strength goal · 2 of 3 sessions complete"
      : goals.includes("Build consistency")
        ? "Consistency goal · Active 6 days in a row"
        : "Your plan · A balanced week across every activity";
  return (
    <div className="screen-with-nav">
      <div className="px-5 pt-4">
        <div className="relative mb-8 flex items-center justify-between">
          <div>
            <p className="eyebrow">THURSDAY, 12 JUNE</p>
            <h1 className="mt-1 text-[28px] font-extrabold tracking-[-0.045em]">{activeLanguage.greeting}, {profile.firstName}.</h1>
            <p className="move-manifesto">TRACK · SHARE · CONNECT · DISCOVER · STAY SAFE</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowLanguages(!showLanguages)} className="language-button" aria-label={`Language: ${language}`} aria-expanded={showLanguages}>
              <span>{activeLanguage.code}</span>
            </button>
            <button className="icon-button relative" aria-label="Notifications">
              <Icon name="bell" />
              <span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full bg-[#ff5c35] ring-2 ring-[#f7f7f2]" />
            </button>
          </div>
          {showLanguages && (
            <div className="language-menu">
              <div className="mb-2 px-1">
                <strong>Greeting language</strong>
                <p>Choose how the app welcomes you</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {languages.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => { setLanguage(item.name); setShowLanguages(false); }}
                    className={item.name === language ? "active" : ""}
                  >
                    <span>{item.greeting}</span>
                    <small>{item.name}</small>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button onClick={() => go("prepare")} className="safe-card group">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white"><Icon name="shield" size={23} /></div>
              <span className="status-chip"><span className="h-1.5 w-1.5 rounded-full bg-[#bdfb62]" /> Ready</span>
            </div>
            <div className="text-left">
              <p className="mb-1 text-[13px] font-medium text-white/65">Run freely. Stay connected.</p>
              <div className="flex items-end justify-between">
                <h2 className="text-[26px] font-extrabold tracking-[-0.04em] text-white">Start Safe Run</h2>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#bdfb62] text-[#102e24] transition-transform group-hover:translate-x-1"><Icon name="chevron" size={18} /></span>
              </div>
            </div>
          </div>
          <svg className="absolute -right-7 top-0 h-full w-56 opacity-20" viewBox="0 0 200 180" fill="none"><path d="M197 8C117 8 155 72 93 74S77 152 2 166" stroke="white" strokeWidth="28" strokeLinecap="round" /><path d="M197 8C117 8 155 72 93 74S77 152 2 166" stroke="#BDFB62" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 7" /></svg>
        </button>
        <button onClick={() => go("circle")} className="safe-circle-note w-full"><Icon name="shield" size={13} /> Safety Circle ready · 3 contacts connected</button>

        <section className="todays-move">
          <div className="section-heading !mb-2"><div><p className="eyebrow">TODAY’S MOVE</p><h2 className="!mt-1">What are you doing today?</h2></div><span className="record-label">Record activity</span></div>
          <div className="activity-picker-grid">
            {activityTypes.map((activity) => (
              <button key={activity.name} onClick={() => recordActivity(activity.name)}>
                <span className={`activity-pick-icon ${activity.tone}`}><Icon name={activity.icon} size={17} /></span>
                <small>{activity.name}</small>
              </button>
            ))}
          </div>
          <p className="activity-picker-note"><Icon name="shield" size={12} /> Choose Run to record normally, or use Safe Run above for live Safety Circle sharing.</p>
        </section>

        <section className="mt-7">
          <div className="section-heading"><h2>This week</h2><button onClick={() => go("profile")}>View activity</button></div>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="metric-card"><span>Distance</span><strong>18.4<small> km</small></strong><em>+12%</em></div>
            <div className="metric-card"><span>Runs</span><strong>3</strong><em>On track</em></div>
            <div className="metric-card"><span>Streak</span><strong>6<small> days</small></strong><em>Best: 11</em></div>
          </div>
          <button onClick={() => go("profile")} className="goal-progress"><span><Icon name="spark" size={14} /></span><p>{goalMessage}</p><Icon name="chevron" size={14} /></button>
          <div className="achievement-banner">
            <span className="achievement-medal"><Icon name="medal" size={20} /></span>
            <button onClick={() => go("profile")} className="flex-1 text-left"><small>NEW PERSONAL BEST</small><strong>Fastest 5K · 24:18</strong><p>1:42 faster than your previous best</p></button>
            <button onClick={() => setSharedAchievement(true)} className="achievement-share">{sharedAchievement ? "Shared" : "Share"}</button>
          </div>
          <button onClick={() => go("connectData")} className={`import-row ${connectedCount ? "complete" : ""}`}>
            <span><Icon name={connectedCount ? "check" : "download"} size={15} /></span>
            <p><strong>{connectedCount ? `${connectedCount} fitness ${connectedCount === 1 ? "service" : "services"} connected` : "Connect your fitness data"}</strong><small>{connectedCount ? "Manage imported activity and health data" : "Bring activity data into Move Mzansi"}</small></p>
            <Icon name="chevron" size={14} />
          </button>
          {nutritionEnabled && <button onClick={() => go("profile")} className="nutrition-link"><Icon name="spark" size={13} /> Nutrition check-in <span>Optional</span><Icon name="chevron" size={13} /></button>}
        </section>

        <section className="mt-8">
          <div className="section-heading"><h2>Up next</h2><button onClick={() => go("races")}>See races</button></div>
          <button onClick={() => go("races")} className="race-row w-full text-left">
            <div className="date-tile"><strong>22</strong><span>JUN</span></div>
            <div className="min-w-0 flex-1"><h3>FNB Run Your City</h3><p>Cape Town · 10 km · 7 people you follow</p></div>
            <Icon name="chevron" size={17} />
          </button>
        </section>

        <section className="mt-8 pb-5">
          <div className="section-heading"><h2>Your feed</h2><button onClick={() => go("communities")}>See all</button></div>
          <article className="feed-preview">
            <button onClick={() => go("communities")} className="flex w-full items-center gap-3 px-4 pt-4 text-left">
              <span className="avatar bg-[#e7c39f]">TM</span>
              <span className="flex-1"><strong className="block text-[12px] font-extrabold">Thabo Maseko</strong><small className="block text-[9px] text-[#7a837f]">Morning run · Cape Town · 36 min</small></span>
              <span className="activity-badge"><Icon name="route" size={13} /> RUN</span>
            </button>
            <button onClick={() => go("communities")} className="block w-full px-4 py-3 text-left"><p className="text-[14px] font-bold">Thabo completed 8.4 km</p><p className="mt-1 text-[10px] text-[#6e7873]">A breezy loop around Green Point before work.</p></button>
            <button onClick={() => go("communities")} className="block h-36 w-full overflow-hidden"><img src={photo} alt="Morning activity along the Cape Town coast" className="h-full w-full object-cover" /></button>
            <div className="feed-actions">
              <button onClick={() => setLiked(!liked)} className={liked ? "liked" : ""}><Icon name="heart" size={16} /><span>{liked ? 43 : 42}</span></button>
              <button onClick={() => go("communities")}><Icon name="message" size={16} /><span>6</span></button>
              <button><Icon name="share" size={16} /><span>Share</span></button>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}

function Prepare({ go }: { go: (screen: Screen) => void }) {
  const [step, setStep] = useState<"circle" | "preferences" | "ready">("circle");
  const [selected, setSelected] = useState([1, 2, 3]);
  const [preference, setPreference] = useState("Normal run");
  const devicePlatform = /iPhone|iPad/i.test(navigator.userAgent)
    ? "Apple device emergency features"
    : /Android/i.test(navigator.userAgent)
      ? "Android device safety features"
      : "Device emergency features";
  const toggle = (id: number) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const back = () => {
    if (step === "ready") setStep("preferences");
    else if (step === "preferences") setStep("circle");
    else go("home");
  };
  const stepIndex = step === "circle" ? 0 : step === "preferences" ? 1 : 2;
  const preferences = [
    { name: "Normal run", detail: "Everyday running at your own pace" },
    { name: "Training run", detail: "Structured effort or planned session" },
    { name: "Run/walk", detail: "Walking intervals are part of the plan" },
    { name: "Flexible route", detail: "Explore without a fixed route" },
    { name: "Night run", detail: "Extra awareness for low-light running" },
  ];
  return (
    <div className="min-h-full bg-[#f7f7f2]">
      <Header title="Prepare your run" onBack={back} />
      <main className="px-5 pb-8">
        <div className="progress-line">{[0, 1, 2].map((index) => <span key={index} className={index <= stepIndex ? "active" : ""} />)}</div>
        {step === "circle" && <>
          <div className="mt-8">
            <span className="round-icon"><Icon name="shield" size={25} /></span>
            <h2 className="mt-5 text-[28px] font-extrabold tracking-[-0.04em]">Your Safety Circle</h2>
            <p className="mt-2 max-w-[340px] text-[13px] leading-6 text-[#68726d]">These people can stay connected to your location during your run.</p>
          </div>
          <div className="mt-7 space-y-2.5">
            {contacts.map((contact) => {
              const active = selected.includes(contact.id);
              return (
                <button key={contact.id} onClick={() => toggle(contact.id)} className={`contact-row ${active ? "selected" : ""}`}>
                  <img className="contact-photo" src={contact.photo} alt={`${contact.name} profile`} />
                  <span className="flex-1 text-left"><strong>{contact.name}</strong><small>{contact.relation} · {active ? "Connected" : "Not sharing"}</small></span>
                  <span className={`select-circle ${active ? "active" : ""}`}>{active && <Icon name="check" size={15} strokeWidth={2.5} />}</span>
                </button>
              );
            })}
            <button onClick={() => go("circle")} className="contact-row border-dashed bg-transparent">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c7ccc8]"><Icon name="plus" size={18} /></span>
              <span className="flex-1 text-left text-[14px] font-bold">Add trusted contact</span>
              <Icon name="chevron" size={17} />
            </button>
          </div>
          <button disabled={!selected.length} onClick={() => setStep("preferences")} className="primary-button mt-7">Continue <Icon name="chevron" size={18} /></button>
          <p className="mt-3 text-center text-[10px] text-[#7b827e]">{selected.length} contacts selected for this run</p>
        </>}
        {step === "preferences" && <>
          <div className="mt-8"><p className="eyebrow">HOW ARE YOU MOVING?</p><h2 className="mt-2 text-[28px] font-extrabold tracking-[-0.04em]">Run preferences</h2><p className="mt-2 text-[13px] leading-6 text-[#68726d]">A little context helps Safe Run understand your session.</p></div>
          <div className="mt-6 space-y-2">
            {preferences.map((item) => <button key={item.name} onClick={() => setPreference(item.name)} className={`preference-row ${preference === item.name ? "selected" : ""}`}><span><strong>{item.name}</strong><small>{item.detail}</small></span><i>{preference === item.name && <Icon name="check" size={14} strokeWidth={2.5} />}</i></button>)}
          </div>
          <div className="info-note mt-5"><Icon name="spark" size={18} /><p><strong>Context-aware monitoring</strong><br />Route changes, walking and normal breaks do not automatically trigger an emergency.</p></div>
          <button onClick={() => setStep("ready")} className="primary-button mt-6">Review run <Icon name="chevron" size={18} /></button>
        </>}
        {step === "ready" && <>
          <div className="ready-hero"><span><Icon name="route" size={28} /></span><p className="eyebrow">SETUP COMPLETE</p><h2>Ready when you are.</h2><p>Start easy. Your run and Safety Circle are ready to go.</p></div>
          <div className="run-summary-list">
            <div><span><Icon name="users" size={17} /></span><p>Safety Circle<small>{selected.length} connected</small></p><Icon name="check" size={17} /></div>
            <div><span><Icon name="pin" size={17} /></span><p>Location sharing<small>On during this run</small></p><b>On</b></div>
            <div><span><Icon name="route" size={17} /></span><p>Activity<small>{preference}</small></p><b>Running</b></div>
          </div>
          <section className="device-safety-card">
            <div className="device-safety-heading"><span><Icon name="shield" size={18} /></span><div><h3>Device Safety</h3><p>Safe Run works alongside your phone’s safety features.</p></div></div>
            <div className="device-safety-statuses">
              <div><span className="device-status-dot" /><p>Location services</p><strong>Active</strong></div>
              <div><span className="device-status-dot" /><p>Safety Circle</p><strong>Connected</strong></div>
              <div><span className="device-status-dot neutral" /><p>{devicePlatform}</p><strong>Available</strong></div>
            </div>
            <p className="device-safety-note">Your device controls its own emergency features. Safe Run maintains this session, shares your live location, monitors run context and provides notifications where your operating system permits.</p>
          </section>
          <button onClick={() => go("run")} className="start-run-button">START SAFE RUN</button>
          <p className="mt-3 text-center text-[9px] text-[#7b827e]">Live sharing ends automatically when you finish</p>
        </>}
      </main>
    </div>
  );
}

function MapArt({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`map-art ${compact ? "compact" : ""}`}>
      <svg viewBox="0 0 390 430" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect width="390" height="430" fill="#E9EBE2" />
        <g stroke="#fff" strokeWidth="12" opacity=".9">
          <path d="M-20 76C82 64 132 115 225 99s108-3 190 28" /><path d="M28-20c26 88 3 140 53 218s33 151 7 260" /><path d="M215-20c4 88-40 119-11 204s101 101 93 268" /><path d="M-20 331c105-25 142-3 215 21s135-17 220-9" />
        </g>
        <g stroke="#CDD2C8" strokeWidth="2" fill="none">
          <path d="M-20 76C82 64 132 115 225 99s108-3 190 28" /><path d="M28-20c26 88 3 140 53 218s33 151 7 260" /><path d="M215-20c4 88-40 119-11 204s101 101 93 268" /><path d="M-20 331c105-25 142-3 215 21s135-17 220-9" />
        </g>
        <path d="M77 337c24-42 82-17 97-64 15-45-47-50-22-101 21-44 73-21 87-64 7-22-5-39-18-54" fill="none" stroke="#153D31" strokeWidth="6" strokeLinecap="round" />
        <path d="M77 337c24-42 82-17 97-64 15-45-47-50-22-101 21-44 73-21 87-64 7-22-5-39-18-54" fill="none" stroke="#BDFB62" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 8" />
        <circle cx="77" cy="337" r="7" fill="#153D31" stroke="white" strokeWidth="3" />
        <circle cx="221" cy="54" r="10" fill="#BDFB62" stroke="#153D31" strokeWidth="4" />
        <g fill="#68726D" fontSize="9" fontFamily="Arial" fontWeight="600"><text x="245" y="142">SEA POINT</text><text x="95" y="399">PROMENADE</text><text x="30" y="221">GREEN POINT</text></g>
      </svg>
    </div>
  );
}

function Run({ go }: { go: (screen: Screen) => void }) {
  const [seconds, setSeconds] = useState(1462);
  const [paused, setPaused] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [safety, setSafety] = useState<"normal" | "check" | "escalation">("normal");
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, [paused]);
  const time = `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <div className="relative min-h-full overflow-hidden bg-[#e9ebe2]">
      <div className="run-map-transform" style={{ transform: `scale(${zoom})` }}><MapArt /></div>
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-5">
        <button onClick={() => setShowEnd(true)} className="map-button"><Icon name="arrow" /></button>
        <div className="live-pill"><span className="pulse-dot" /> SAFE RUN LIVE</div>
        <button className="map-button"><Icon name="settings" /></button>
      </div>
      <div className="map-zoom"><button onClick={() => setZoom((value) => Math.min(1.25, value + .08))}>+</button><button onClick={() => setZoom((value) => Math.max(.9, value - .08))}>−</button></div>
      <div className="run-sheet">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#d3d7d2]" />
        <div className="flex items-center justify-between">
          <button onClick={() => setSafety((value) => value === "normal" ? "check" : value === "check" ? "escalation" : "normal")} className={`safe-status ${safety}`}>
            <span><Icon name="shield" size={16} /></span>
            <div><strong>{safety === "normal" ? "Safety Circle connected" : safety === "check" ? "Safety check" : "Escalation"}</strong><small>{safety === "normal" ? "Normal · monitoring quietly" : safety === "check" ? "Checking recent activity" : "Circle notification pending"}</small></div>
          </button>
          <div className="avatar-stack"><span className="bg-[#f2b8a8]">LM</span><span className="bg-[#b8d8cf]">SN</span><em>Watching</em></div>
        </div>
        <div className="my-4 grid grid-cols-3 divide-x divide-[#e0e3dd]">
          <div className="run-metric"><strong>4.18</strong><span>KM</span></div>
          <div className="run-metric"><strong>{time.slice(3)}</strong><span>TIME</span></div>
          <div className="run-metric"><strong>5:49</strong><span>/KM PACE</span></div>
        </div>
        <div className={`context-card safety-${safety}`}><span className="flex h-8 w-8 items-center justify-center rounded-full"><Icon name={safety === "normal" ? "spark" : "shield"} size={16} /></span><p><strong>{safety === "normal" ? "Your run looks normal" : safety === "check" ? "A quick safety check" : "Preparing to update your circle"}</strong><br />{safety === "normal" ? "A short walking break was detected 3 min ago. No check-in needed." : safety === "check" ? "A longer stop and unusual movement were noticed together. If this continues, your Safety Circle may be notified." : "The concerning pattern has continued. Your Safety Circle will be updated unless your normal movement resumes."}</p></div>
        <div className="current-activity"><span className="pulse-dot" /><p>Current activity <strong>{paused ? "Paused" : "Running"}</strong></p><small>Tap safety status to preview states</small></div>
        <div className="mt-5 flex items-center justify-center gap-5">
          <button onClick={() => setPaused(!paused)} className="run-control"><Icon name={paused ? "route" : "pause"} size={24} /><span>{paused ? "Resume" : "Pause"}</span></button>
          <button onClick={() => setShowEnd(true)} className="run-control stop"><Icon name="stop" size={23} /><span>Finish</span></button>
        </div>
      </div>
      {showEnd && <div className="modal-backdrop"><div className="confirm-modal"><span className="round-icon mx-auto"><Icon name="shield" /></span><h2>Finish your run?</h2><p>We’ll stop live sharing and let Lerato and Siyanda know you finished safely.</p><button onClick={() => go("summary")} className="primary-button">Finish safely</button><button onClick={() => setShowEnd(false)} className="text-button">Keep running</button></div></div>}
    </div>
  );
}

function Summary({ go }: { go: (screen: Screen) => void }) {
  const [shared, setShared] = useState(false);
  return (
    <div className="min-h-full bg-[#f7f7f2] px-5 pb-8 pt-8">
      <div className="text-center">
        <div className="success-ring mx-auto"><Icon name="check" size={30} strokeWidth={2.5} /></div>
        <p className="eyebrow mt-5">RUN COMPLETE</p>
        <h1 className="mt-2 text-[30px] font-extrabold tracking-[-0.045em]">Run complete 🎉</h1>
        <p className="mt-2 text-[12px] leading-5 text-[#68726d]">Your Safety Circle has been notified that you finished your run.</p>
      </div>
      <div className="mt-7 overflow-hidden rounded-[24px] bg-white p-2 shadow-[0_8px_28px_rgba(29,49,42,.07)]">
        <MapArt compact />
        <div className="grid grid-cols-4 px-1 py-5">
          <div className="run-metric"><strong>4.18</strong><span>KILOMETRES</span></div>
          <div className="run-metric"><strong>24:28</strong><span>DURATION</span></div>
          <div className="run-metric"><strong>5:49</strong><span>AVG PACE</span></div>
          <div className="run-metric"><strong>318</strong><span>CALORIES</span></div>
        </div>
      </div>
      <div className="summary-achievement">
        <span><Icon name="medal" size={24} /></span><p>🎉 NEW PERSONAL BEST</p><h3>Fastest 5K</h3><strong>24:18</strong><small>You beat your previous best by 1:42.</small>
        <button onClick={() => setShared(true)}><Icon name={shared ? "check" : "share"} size={16} /> {shared ? "Shared to your feed" : "Share achievement"}</button>
      </div>
      <div className="mt-5 rounded-[17px] bg-[#edf2e8] p-4"><p className="text-[10px] leading-5 text-[#5e6e67]"><strong className="text-[#31453e]">Calm, consistent effort.</strong><br />Two walking breaks and a route change were recognised as normal parts of your run.</p></div>
      <button onClick={() => go("home")} className="primary-button mt-5">Done</button>
    </div>
  );
}

const activityMeta: Record<ActivityType, { metric: string; value: string; unit: string; milestone: string }> = {
  Run: { metric: "Pace", value: "5:54", unit: "/km", milestone: "Fastest 5K this month" },
  Walk: { metric: "Pace", value: "10:42", unit: "/km", milestone: "5-day walking streak" },
  Cycle: { metric: "Speed", value: "24.6", unit: "km/h", milestone: "82 of 100 cycling kilometres" },
  Swim: { metric: "Laps", value: "30", unit: "laps", milestone: "8.6 of 10 swimming kilometres" },
  "Strength Training": { metric: "Exercises", value: "6", unit: "moves", milestone: "12 strength sessions completed" },
  Hike: { metric: "Elevation", value: "286", unit: "m", milestone: "Highest climb this month" },
  Yoga: { metric: "Session", value: "Vinyasa", unit: "flow", milestone: "7-day wellbeing streak" },
  Football: { metric: "Session", value: "5-a-side", unit: "match", milestone: "10 hours on the pitch" },
  Tennis: { metric: "Session", value: "Singles", unit: "match", milestone: "5 tennis sessions completed" },
  Other: { metric: "Effort", value: "Moderate", unit: "session", milestone: "50 total activities" },
};

function ActivityRecorder({ activity, go }: { activity: ActivityType; go: (screen: Screen) => void }) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [pool, setPool] = useState("25 m pool");
  const [effort, setEffort] = useState("Moderate");
  const hasRoute = ["Run", "Walk", "Cycle", "Hike"].includes(activity);
  const liveMetrics: Record<ActivityType, [string, string]> = {
    Run: ["0.00 km", "-- current pace"],
    Walk: ["0.00 km", "-- current pace"],
    Cycle: ["0.0 km", "-- km/h"],
    Swim: ["0 m", "0 laps"],
    "Strength Training": ["0 sets", "0 exercises"],
    Hike: ["0.00 km", "0 m elevation"],
    Yoga: ["0 calories", `${effort} effort`],
    Football: ["0 calories", `${effort} effort`],
    Tennis: ["0 calories", `${effort} effort`],
    Other: ["0 calories", `${effort} effort`],
  };
  useEffect(() => {
    if (!recording) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [recording]);
  const timer = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const finish = () => go("activitySummary");
  return (
    <div className="min-h-full bg-[#f7f7f2] pb-8">
      <Header title={`Record ${activity}`} onBack={() => go("home")} />
      <main className="px-5">
        {activity === "Run" && (
          <button onClick={() => go("prepare")} className="recorder-safe-run">
            <span><Icon name="shield" size={20} /></span>
            <div><small>SIGNATURE SAFETY EXPERIENCE</small><strong>Start this as a Safe Run</strong><p>Share live location with your Safety Circle</p></div>
            <Icon name="chevron" size={17} />
          </button>
        )}
        <div className="recorder-heading">
          <span className={`activity-pick-icon ${activityTypes.find((item) => item.name === activity)?.tone}`}><Icon name={activityTypes.find((item) => item.name === activity)?.icon ?? "plus"} size={22} /></span>
          <div><p className="eyebrow">{recording ? "RECORDING NOW" : "TODAY’S ACTIVITY"}</p><h1>{activity}</h1></div>
          {recording && <span className="recording-live"><i /> LIVE</span>}
        </div>

        {hasRoute && <div className="recorder-map"><MapArt compact /><div className="map-location-pill"><Icon name="pin" size={13} /> Cape Town</div></div>}

        <div className="recorder-clock">
          <small>DURATION</small><strong>{timer}</strong>
          <div className="grid grid-cols-2 divide-x divide-[#e1e4de]">
            <p><span>{liveMetrics[activity][0].split(" ")[0]}</span> {liveMetrics[activity][0].split(" ").slice(1).join(" ")}</p>
            <p><span>{liveMetrics[activity][1].split(" ")[0]}</span> {liveMetrics[activity][1].split(" ").slice(1).join(" ")}</p>
          </div>
        </div>

        {activity === "Swim" && <section className="activity-detail-card"><div className="section-heading"><h2>Pool details</h2></div><div className="choice-row">{["25 m pool", "50 m pool", "Open water"].map((item) => <button key={item} onClick={() => setPool(item)} className={pool === item ? "active" : ""}>{item}</button>)}</div><div className="detail-inputs"><label>Laps<input type="number" placeholder="0" /></label><label>Distance<input type="number" placeholder="metres" /></label></div></section>}

        {activity === "Strength Training" && <section className="activity-detail-card"><div className="section-heading"><h2>Workout</h2><button><Icon name="plus" size={14} /> Exercise</button></div><div className="exercise-row"><strong>Barbell squat</strong><label>Sets<input defaultValue="4" /></label><label>Reps<input defaultValue="8" /></label><label>kg<input defaultValue="40" /></label></div><div className="exercise-row"><strong>Bench press</strong><label>Sets<input defaultValue="3" /></label><label>Reps<input defaultValue="10" /></label><label>kg<input defaultValue="25" /></label></div></section>}

        {["Yoga", "Football", "Tennis", "Other"].includes(activity) && <section className="activity-detail-card"><div className="section-heading"><h2>Session details</h2><span className="text-[8px] text-[#7a837f]">Optional</span></div><label className="session-note">{activity === "Yoga" ? "Style or focus" : activity === "Football" ? "Match or training" : activity === "Tennis" ? "Singles, doubles or practice" : "What did you do?"}<input placeholder="Add details" /></label><div className="choice-row mt-3">{["Easy", "Moderate", "Hard"].map((item) => <button key={item} onClick={() => setEffort(item)} className={effort === item ? "active" : ""}>{item}</button>)}</div></section>}

        {!recording ? <button onClick={() => setRecording(true)} className="start-activity-button">START {activity.toUpperCase()}</button> : <div className="recording-controls"><button onClick={() => setRecording(false)}><Icon name="pause" size={22} /><span>Pause</span></button><button onClick={finish} className="finish"><Icon name="stop" size={22} /><span>Finish</span></button></div>}
        <p className="mt-3 text-center text-[8px] text-[#89908c]">{activity === "Run" ? "Standard recording does not share live location. Choose Safe Run above to connect your circle." : "This activity records without Safe Run."}</p>
      </main>
    </div>
  );
}

function ActivitySummary({ activity, go }: { activity: ActivityType; go: (screen: Screen) => void }) {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [photoAdded, setPhotoAdded] = useState(false);
  const meta = activityMeta[activity];
  const distanceActivity = ["Run", "Walk", "Cycle", "Swim", "Hike"].includes(activity);
  return (
    <div className="min-h-full bg-[#f7f7f2] px-5 pb-8 pt-7">
      <div className="text-center"><div className="success-ring mx-auto"><Icon name="check" size={30} strokeWidth={2.5} /></div><p className="eyebrow mt-5">ACTIVITY COMPLETE</p><h1 className="mt-2 text-[29px] font-extrabold tracking-[-.045em]">Strong move, Naledi.</h1><p className="mt-2 text-[11px] text-[#68726d]">{activity} · Today in Cape Town</p></div>
      <div className="activity-summary-card">
        <div className="flex items-center gap-3"><span className={`activity-pick-icon ${activityTypes.find((item) => item.name === activity)?.tone}`}><Icon name={activityTypes.find((item) => item.name === activity)?.icon ?? "plus"} size={20} /></span><div><small>{activity.toUpperCase()}</small><strong>{distanceActivity ? (activity === "Swim" ? "750 m" : activity === "Cycle" ? "12.4 km" : "4.18 km") : "42:16"}</strong></div></div>
        <div className="summary-stats">
          <div><strong>42:16</strong><span>Duration</span></div>
          <div><strong>{meta.value}</strong><span>{meta.metric}</span></div>
          <div><strong>{["Yoga", "Football", "Tennis", "Other"].includes(activity) ? "Moderate" : "318"}</strong><span>{["Yoga", "Football", "Tennis", "Other"].includes(activity) ? "Effort" : "Calories"}</span></div>
        </div>
      </div>
      <div className="milestone-card"><span><Icon name="medal" size={20} /></span><div><small>PROGRESS MILESTONE</small><strong>{meta.milestone}</strong><p>Your movement is adding up across every activity.</p></div></div>
      <div className="summary-action-grid">
        <button onClick={() => setSaved(true)} className={saved ? "active" : ""}><Icon name={saved ? "check" : "download"} size={19} /><strong>{saved ? "Saved" : "Save activity"}</strong></button>
        <button onClick={() => setShared(true)} className={shared ? "active" : ""}><Icon name={shared ? "check" : "share"} size={19} /><strong>{shared ? "Shared" : "Share to feed"}</strong></button>
        <label className={photoAdded ? "active" : ""}><Icon name={photoAdded ? "check" : "plus"} size={19} /><strong>{photoAdded ? "Photo added" : "Add a photo"}</strong><input type="file" accept="image/*" onChange={() => setPhotoAdded(true)} /></label>
      </div>
      <button onClick={() => go("home")} className="primary-button mt-6">Done</button>
    </div>
  );
}

type FitnessService = "Apple Health" | "Health Connect" | "Strava";

const fitnessServices: { name: FitnessService; description: string; icon: IconName; tone: string; reason: string }[] = [
  { name: "Apple Health", description: "Activity and health data from supported Apple devices and apps", icon: "heart", tone: "apple", reason: "Import health and workout data you choose to share through Apple Health." },
  { name: "Health Connect", description: "Fitness data shared by supported Android apps and devices", icon: "plus", tone: "android", reason: "Bring supported activity and health metrics together through Health Connect." },
  { name: "Strava", description: "Your recorded activities and training history", icon: "route", tone: "strava", reason: "Import your Strava activity history so your movement lives in one place." },
];

const requestedMetrics = [
  "Activities & workouts",
  "Distance",
  "Duration",
  "Pace & speed",
  "Heart rate",
  "Calories",
  "Elevation",
  "Respiratory data",
  "Other supported metrics",
];

function ConnectFitnessData({ go, connected, setConnected }: { go: (screen: Screen) => void; connected: FitnessService[]; setConnected: (services: FitnessService[]) => void }) {
  const [pending, setPending] = useState<FitnessService | null>(null);
  const [managing, setManaging] = useState(false);
  const service = fitnessServices.find((item) => item.name === pending);
  const toggleConnection = (name: FitnessService) => {
    if (connected.includes(name)) setConnected(connected.filter((item) => item !== name));
    else setConnected([...connected, name]);
  };
  if (service) {
    return (
      <div className="min-h-full bg-[#f7f7f2] pb-8">
        <Header title={`Connect ${service.name}`} onBack={() => setPending(null)} />
        <main className="px-5">
          <div className={`service-hero ${service.tone}`}><span><Icon name={service.icon} size={28} /></span><p className="eyebrow">PERMISSION PREVIEW</p><h1>Connect {service.name}</h1><p>{service.reason}</p></div>
          <div className="connection-preview-note"><Icon name="spark" size={17} /><p><strong>This is a connection preview</strong><br />No external account or device is technically connected in this prototype.</p></div>
          <section className="permission-card">
            <div className="section-heading"><h2>Move Mzansi would request</h2></div>
            <div className="permission-grid">
              {requestedMetrics.map((metric) => <div key={metric}><span><Icon name="check" size={12} /></span>{metric}{metric === "Respiratory data" && <small>Where available</small>}</div>)}
            </div>
          </section>
          <section className="why-data-card"><span><Icon name="shield" size={18} /></span><div><h3>Why we request this data</h3><p>To build your activity history, calculate relevant progress and personalise achievements. Move Mzansi only uses data you choose to permit.</p></div></section>
          <p className="data-availability-note">The exact information available depends on your device, connected platform, operating system and permissions. You can change access through the provider or disconnect here at any time.</p>
          <button onClick={() => { toggleConnection(service.name); setPending(null); }} className="primary-button mt-6">Allow & connect <Icon name="chevron" size={17} /></button>
          <button onClick={() => setPending(null)} className="text-button">Not now</button>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-full bg-[#f7f7f2] pb-8">
      <Header title={managing ? "Manage connected data" : "Fitness data"} onBack={() => managing ? setManaging(false) : go("home")} />
      <main className="px-5">
        {!managing ? <>
          <div className="connect-data-intro"><span><Icon name="download" size={23} /></span><p className="eyebrow">YOUR DATA, TOGETHER</p><h1>Connect your fitness data</h1><p>Bring your activity data into Move Mzansi.</p></div>
          <div className="connection-preview-note"><Icon name="spark" size={17} /><p><strong>Connection interface preview</strong><br />Integrations are not technically active yet. These controls show how permission and connection will work.</p></div>
          <div className="service-list">
            {fitnessServices.map((item) => {
              const isConnected = connected.includes(item.name);
              return <div key={item.name} className="service-row"><span className={`service-icon ${item.tone}`}><Icon name={item.icon} size={20} /></span><div><strong>{item.name}</strong><p>{item.description}</p></div><button onClick={() => isConnected ? setManaging(true) : setPending(item.name)} className={isConnected ? "connected" : ""}>{isConnected ? <><Icon name="check" size={12} /> Connected</> : "Connect"}</button></div>;
            })}
          </div>
          <section className="available-data-card"><h2>Data you may be able to import</h2><div>{requestedMetrics.map((metric) => <span key={metric}>{metric}</span>)}</div><p>Availability varies by device, service and the permissions you grant.</p></section>
          <button onClick={() => setManaging(true)} className="manage-data-button"><span><Icon name="settings" size={18} /></span><div><strong>Manage connected data</strong><p>Review services and disconnect access</p></div><Icon name="chevron" size={16} /></button>
        </> : <>
          <div className="manage-data-intro"><span><Icon name="settings" size={22} /></span><h1>Manage connected data</h1><p>Review the services shown as connected in this prototype.</p></div>
          <div className="service-list mt-6">
            {fitnessServices.map((item) => {
              const isConnected = connected.includes(item.name);
              return <div key={item.name} className="service-row"><span className={`service-icon ${item.tone}`}><Icon name={item.icon} size={20} /></span><div><strong>{item.name}</strong><p>{isConnected ? "Shown as connected" : "Not connected"}</p></div>{isConnected ? <button onClick={() => toggleConnection(item.name)} className="disconnect">Disconnect</button> : <button onClick={() => setPending(item.name)}>Connect</button>}</div>;
            })}
          </div>
          <div className="info-note mt-5"><Icon name="shield" size={18} /><p><strong>You stay in control</strong><br />Disconnecting stops future imports from that service. Provider-side permissions would also be managed in your device or service settings.</p></div>
        </>}
      </main>
    </div>
  );
}

function Circle({ go }: { go: (screen: Screen) => void }) {
  const [added, setAdded] = useState(false);
  return (
    <div className="screen-with-nav px-5">
      <div className="flex items-center justify-between pt-5"><div><p className="eyebrow">LIVE RUN SHARING</p><h1 className="mt-1 text-[28px] font-extrabold tracking-[-.04em]">Safety Circle</h1></div><button onClick={() => setAdded(true)} className="icon-button"><Icon name="plus" /></button></div>
      <div className="mt-7 rounded-[24px] bg-[#163e32] p-5 text-white">
        <div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#bdfb62] text-[#153d31]"><Icon name="shield" /></span><span className="status-chip"><span className="h-1.5 w-1.5 rounded-full bg-[#bdfb62]" /> Ready</span></div>
        <h2 className="mt-8 text-xl font-bold">Your people, on your route.</h2><p className="mt-2 text-[13px] leading-5 text-white/60">Choose who gets your private live link each time you start a Safe Run.</p>
      </div>
      <div className="section-heading mt-8"><h2>Trusted contacts</h2><span className="text-xs text-[#68726d]">{contacts.length} people</span></div>
      <div className="space-y-2.5">
        {contacts.map((c, index) => <div className="contact-row" key={c.id}><img className="contact-photo" src={c.photo} alt={`${c.name} profile`} /><span className="flex-1"><strong>{c.name}</strong><small>{c.relation} · {index === 0 ? "Primary" : "Trusted contact"}</small></span><button><Icon name="chevron" size={17} /></button></div>)}
        {added && <div className="contact-row"><span className="avatar bg-[#eadcb5]">AK</span><span className="flex-1"><strong>Ayanda</strong><small>Friend · Trusted contact</small></span><Icon name="check" size={18} /></div>}
      </div>
      <div className="info-note mt-6"><Icon name="shield" size={18} /><p><strong>You stay in control</strong><br />Location is only shared during a run and every live link expires when you finish.</p></div>
    </div>
  );
}

function Communities({ go }: { go: (screen: Screen) => void }) {
  const [liked, setLiked] = useState<number[]>([1, 4]);
  const [following, setFollowing] = useState(false);
  const toggleLike = (id: number) => setLiked((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  return (
    <div className="screen-with-nav">
      <div className="flex items-end justify-between px-5 pt-5"><div><p className="eyebrow">MOVE TOGETHER</p><h1 className="mt-1 text-[28px] font-extrabold tracking-[-.04em]">Your feed</h1></div><div className="flex gap-2"><button className="icon-button" aria-label="Messages"><Icon name="message" size={18} /></button><button className="icon-button" aria-label="Find athletes"><Icon name="plus" size={18} /></button></div></div>
      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto px-5 pb-1"><button className="filter active">Following</button><button className="filter">Discover</button><button className="filter">Clubs</button><button className="filter">Groups</button><button className="filter">Challenges</button></div>
      <div className="activity-spectrum no-scrollbar">
        {["Running", "Walking", "Cycling", "Swimming", "Strength", "Hiking", "Yoga", "Football", "More"].map((activity) => <span key={activity}>{activity}</span>)}
      </div>
      <div className="mt-5 space-y-4 px-5">
        <article className="social-card">
          <div className="flex items-center gap-3 p-4"><span className="avatar bg-[#e7c39f]">TM</span><div className="flex-1"><h3>Thabo Maseko</h3><p>Morning run · Cape Town · 36 min</p></div><button onClick={() => setFollowing(!following)} className="follow-button">{following ? "Following" : "Follow"}</button></div>
          <div className="px-4 pb-3"><h2>Completed 8.4 km</h2><p>A breezy loop around Green Point before work.</p></div>
          <div className="relative h-52"><img src={photo} alt="Morning run along the Cape Town coast" className="h-full w-full object-cover" /><span className="absolute bottom-3 left-3 activity-badge !bg-white/90"><Icon name="route" size={13} /> RUNNING</span></div>
          <div className="feed-actions"><button onClick={() => toggleLike(1)} className={liked.includes(1) ? "liked" : ""}><Icon name="heart" size={17} /><span>{liked.includes(1) ? 43 : 42}</span></button><button><Icon name="message" size={17} /><span>6 comments</span></button><button><Icon name="share" size={17} /><span>Share</span></button></div>
        </article>

        <article className="social-card">
          <div className="flex items-center gap-3 p-4"><span className="avatar bg-[#b8d8cf]">LN</span><div className="flex-1"><h3>Lindiwe Naidoo</h3><p>Pool workout · Durban · 42 min</p></div><span className="activity-icon bg-[#dceef0]"><Icon name="swim" size={18} /></span></div>
          <div className="px-4 pb-4"><h2>1,500 m before sunrise</h2><p>Technique work and a strong final 200. Starting the day right.</p></div>
          <div className="feed-actions"><button onClick={() => toggleLike(2)} className={liked.includes(2) ? "liked" : ""}><Icon name="heart" size={17} /><span>{liked.includes(2) ? 29 : 28}</span></button><button><Icon name="message" size={17} /><span>4 comments</span></button><button><Icon name="share" size={17} /><span>Share</span></button></div>
        </article>

        <article className="social-card">
          <div className="flex items-center gap-3 p-4"><span className="avatar bg-[#c8c1e8]">KS</span><div className="flex-1"><h3>Kagiso Seema</h3><p>Strength training · Johannesburg · 55 min</p></div><span className="activity-icon bg-[#eee9f8]"><Icon name="strength" size={19} /></span></div>
          <div className="px-4 pb-4"><h2>Full-body strength session</h2><p>Five rounds done with the Braamfontein crew. Better together.</p></div>
          <div className="feed-actions"><button onClick={() => toggleLike(3)} className={liked.includes(3) ? "liked" : ""}><Icon name="heart" size={17} /><span>{liked.includes(3) ? 36 : 35}</span></button><button><Icon name="message" size={17} /><span>8 comments</span></button><button><Icon name="share" size={17} /><span>Share</span></button></div>
        </article>

        <article className="achievement-post">
          <div className="flex items-center gap-3"><span className="avatar bg-[#f2b8a8]">NM</span><div className="flex-1"><h3>Naledi Mokoena</h3><p>Shared a new achievement · Just now</p></div><Icon name="spark" size={18} /></div>
          <div className="achievement-post-card">
            <span><Icon name="medal" size={25} /></span>
            <p>NEW PERSONAL BEST</p>
            <h2>Your fastest 5K</h2>
            <strong>24:18</strong>
            <small>You beat your previous best by 1:42.</small>
          </div>
          <div className="feed-actions !px-0 !pb-0"><button onClick={() => toggleLike(4)} className={liked.includes(4) ? "liked" : ""}><Icon name="heart" size={17} /><span>{liked.includes(4) ? 61 : 60}</span></button><button><Icon name="message" size={17} /><span>14 comments</span></button><button><Icon name="share" size={17} /><span>Share</span></button></div>
        </article>

        <section className="club-discovery">
          <div><span className="eyebrow !text-[#7ba65e]">CLUBS & GROUPS</span><h2>Sea Point Pacers</h2><p>Saturday social run · 18 athletes going</p></div>
          <button>View club</button>
        </section>
      </div>
    </div>
  );
}

function Races({ go }: { go: (screen: Screen) => void }) {
  const races = [
    { day: "22", mon: "JUN", title: "FNB Run Your City", place: "Cape Town", dist: "10 KM", status: "Entries open" },
    { day: "06", mon: "JUL", title: "Durban Coastal Run", place: "Durban", dist: "21.1 KM", status: "Few spots left" },
    { day: "13", mon: "JUL", title: "Soweto Street Mile", place: "Johannesburg", dist: "10 KM", status: "Entries open" },
  ];
  return (
    <div className="screen-with-nav">
      <div className="px-5 pt-5"><p className="eyebrow">FIND YOUR NEXT START LINE</p><h1 className="mt-1 text-[28px] font-extrabold tracking-[-.04em]">Race discovery</h1></div>
      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto px-5"><button className="filter active">All races</button><button className="filter">Cape Town</button><button className="filter">Joburg</button><button className="filter">Durban</button></div>
      <div className="mx-5 mt-5 overflow-hidden rounded-[24px] bg-[#163e32] text-white"><div className="relative h-40"><img src={cityPhoto} alt="Cape Town city and mountain" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#163e32] to-transparent" /><span className="absolute left-4 top-4 rounded-full bg-[#bdfb62] px-3 py-1.5 text-[10px] font-extrabold text-[#153d31]">FEATURED</span></div><div className="p-5 pt-3"><h2 className="text-xl font-bold">Cape Town Marathon</h2><p className="mt-1 text-xs text-white/60">19 October · Cape Town · 42.2 km</p><button className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#153d31]">View race</button></div></div>
      <div className="mt-7 px-5"><div className="section-heading"><h2>Upcoming in Mzansi</h2></div><div className="space-y-3">{races.map((r) => <button key={r.title} className="race-list-row"><div className="date-tile"><strong>{r.day}</strong><span>{r.mon}</span></div><div className="flex-1 text-left"><h3>{r.title}</h3><p>{r.place} · {r.dist}</p><em>{r.status}</em></div><Icon name="chevron" size={17} /></button>)}</div></div>
    </div>
  );
}

function Profile({ go, profile, goals }: { go: (screen: Screen) => void; profile: ProfileData; goals: Goal[] }) {
  const [showAchievement, setShowAchievement] = useState(false);
  const [shared, setShared] = useState(false);
  return (
    <div className="screen-with-nav relative px-5">
      <div className="flex items-center justify-between pt-5"><div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2b8a8] text-sm font-extrabold">{profile.firstName[0]}{profile.lastName[0]}</span><div><h1 className="text-xl font-extrabold">{profile.firstName} {profile.lastName}</h1><p className="text-xs text-[#68726d]">{profile.city}, {profile.province}</p></div></div><button className="icon-button"><Icon name="settings" /></button></div>
      <div className="mt-7 rounded-[24px] bg-[#163e32] p-5 text-white"><p className="text-xs text-white/55">JUNE PROGRESS</p><div className="mt-2 flex items-end justify-between"><strong className="text-[34px] tracking-[-.04em]">58.2 <small className="text-sm">km</small></strong><span className="text-xs text-[#bdfb62]">72% of goal</span></div><div className="mt-4 h-2 rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-[#bdfb62]" /></div></div>
      <div className="mt-3 grid grid-cols-3 gap-2.5"><div className="metric-card"><span>Runs</span><strong>14</strong><em>This month</em></div><div className="metric-card"><span>Avg pace</span><strong>5:52</strong><em>per km</em></div><div className="metric-card"><span>Streak</span><strong>6</strong><em>days</em></div></div>
      <section className="mt-7"><div className="section-heading"><h2>Your goals</h2><button>Edit</button></div><div className="flex flex-wrap gap-2">{goals.map((goal) => <span key={goal} className="profile-goal">{goal}</span>)}</div></section>
      <section className="mt-8"><div className="section-heading"><h2>Achievements</h2><button>See all</button></div><div className="no-scrollbar flex gap-3 overflow-x-auto pb-1"><button onClick={() => setShowAchievement(true)} className="achievement min-w-[145px] text-left"><span><Icon name="medal" /></span><strong>Fastest 5K</strong><small>24:18 · New PB</small></button><div className="achievement min-w-[145px]"><span className="bg-[#e7dfc2]"><Icon name="route" /></span><strong>50K month</strong><small>Total activity</small></div><div className="achievement min-w-[145px]"><span className="bg-[#dceef0]"><Icon name="swim" /></span><strong>10K swimmer</strong><small>8.6 of 10 km</small></div></div></section>
      <section className="mt-8"><div className="section-heading"><h2>Recent runs</h2></div><div className="contact-row"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e4f3d5] text-[#315a28]"><Icon name="route" /></span><span className="flex-1"><strong>Promenade morning run</strong><small>Today · 4.18 km · 24:28</small></span><Icon name="chevron" size={17} /></div></section>
      {showAchievement && <div className="modal-backdrop !fixed"><div className="achievement-modal"><button onClick={() => setShowAchievement(false)} className="ml-auto block text-[11px] font-bold text-[#6e7873]">Close</button><span><Icon name="medal" size={29} /></span><p>NEW PERSONAL BEST</p><h2>Your fastest 5K</h2><strong>24:18</strong><small>You beat your previous best by 1:42.</small><button onClick={() => setShared(true)} className="primary-button mt-7"><Icon name={shared ? "check" : "share"} size={18} /> {shared ? "Shared to your feed" : "Share to your feed"}</button></div></div>}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [profile] = useState<ProfileData>({ firstName: "Naledi", lastName: "Mokoena", city: "Cape Town", province: "WC" });
  const [language, setLanguage] = useState<Language>("isiXhosa");
  const [onboarded, setOnboarded] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [nutritionEnabled, setNutritionEnabled] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>("Run");
  const [connectedServices, setConnectedServices] = useState<FitnessService[]>([]);
  const go = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const recordActivity = (activity: ActivityType) => {
    setSelectedActivity(activity);
    go("record");
  };
  const pages: Record<Screen, React.ReactNode> = {
    home: <Home go={go} profile={profile} language={language} setLanguage={setLanguage} goals={goals} nutritionEnabled={nutritionEnabled} recordActivity={recordActivity} connectedCount={connectedServices.length} />, prepare: <Prepare go={go} />, run: <Run go={go} />, summary: <Summary go={go} />,
    circle: <Circle go={go} />, communities: <Communities go={go} />, races: <Races go={go} />, profile: <Profile go={go} profile={profile} goals={goals} />,
    record: <ActivityRecorder activity={selectedActivity} go={go} />,
    activitySummary: <ActivitySummary activity={selectedActivity} go={go} />,
    connectData: <ConnectFitnessData go={go} connected={connectedServices} setConnected={setConnectedServices} />,
  };
  const showNav = ["home", "circle", "communities", "races", "profile"].includes(screen);
  if (!onboarded) return <div className="app-shell"><div className="phone-frame"><Onboarding profile={profile} onComplete={(selectedGoals, nutrition) => { setGoals(selectedGoals); setNutritionEnabled(nutrition); setOnboarded(true); }} /></div></div>;
  return (
    <div className="app-shell">
      <div className="phone-frame">
        {pages[screen]}
        {showNav && <BottomNav screen={screen} go={go} />}
      </div>
    </div>
  );
}
