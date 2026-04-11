import { useEffect, useState, useRef } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";

/* ── constants ──────────────────────────────────────────────── */
const CF_HANDLE = "Mominul_Moon";
const GH_HANDLE = "MominulMoon";

const CF_INFO_URL = `https://codeforces.com/api/user.info?handles=${CF_HANDLE}`;
const CF_RATING_URL = `https://codeforces.com/api/user.rating?handle=${CF_HANDLE}`;
const GH_USER_URL = `https://api.github.com/users/${GH_HANDLE}`;
const GH_REPOS_URL = `https://api.github.com/users/${GH_HANDLE}/repos?per_page=100`;

/* ── rank colour map ────────────────────────────────────────── */
const RANK_COLORS = {
  newbie: "#808080",
  pupil: "#008000",
  specialist: "#03A89E",
  expert: "#0000FF",
  "candidate master": "#AA00AA",
  master: "#FF8C00",
  "international master": "#FF8C00",
  grandmaster: "#FF0000",
  "international grandmaster": "#FF0000",
  "legendary grandmaster": "#FF0000",
};

/* ── tiny helpers ───────────────────────────────────────────── */
function rankColor(rank = "") {
  return RANK_COLORS[rank.toLowerCase()] ?? "var(--accent-primary)";
}

function capitalize(str = "") {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ── animated counter ───────────────────────────────────────── */
function AnimatedNumber({ value, duration = 1.4 }) {
  const [display, setDisplay] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const controls = useAnimation();

  useEffect(() => {
    let start = 0;
    const end = Number(value);
    if (!end) return;
    const step = Math.ceil(end / (duration * 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else setDisplay(start);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{display.toLocaleString()}</span>;
}

/* ── stat card ──────────────────────────────────────────────── */
function StatCard({ icon, label, value, sub, color, delay = 0, href }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const inner = (
    <motion.div
      ref={ref}
      className="stats-card"
      style={{ "--card-accent": color }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div className="stats-card__icon">{icon}</div>
      <div className="stats-card__body">
        <p className="stats-card__label">{label}</p>
        <p className="stats-card__value">
          {inView ? <AnimatedNumber value={value} /> : 0}
        </p>
        {sub && <p className="stats-card__sub">{sub}</p>}
      </div>
      <div className="stats-card__glow" />
    </motion.div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="stats-card-link"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

/* ── badge pill ─────────────────────────────────────────────── */
function RankBadge({ rank }) {
  return (
    <span className="rank-badge" style={{ "--rank-color": rankColor(rank) }}>
      {capitalize(rank)}
    </span>
  );
}

/* ── section header ─────────────────────────────────────────── */
function SectionHeader({ title, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className="stats-platform-header"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {title}
    </motion.div>
  );
}

/* ── sparkline (mini rating graph) ─────────────────────────── */
function Sparkline({ data }) {
  if (!data || data.length < 2) return null;
  const ratings = data.map((d) => d.newRating);
  const min = Math.min(...ratings);
  const max = Math.max(...ratings);
  const W = 220,
    H = 50,
    pad = 4;

  const pts = ratings
    .map((r, i) => {
      const x = pad + (i / (ratings.length - 1)) * (W - pad * 2);
      const y = pad + ((max - r) / (max - min || 1)) * (H - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const last = ratings[ratings.length - 1];
  const trend = last > ratings[0] ? "#10b981" : "#ef4444";

  return (
    <div className="sparkline-wrap">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="sparkline"
      >
        <polyline
          points={pts}
          fill="none"
          stroke={trend}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sparkline-label" style={{ color: trend }}>
        {last > ratings[0] ? "↑" : "↓"} {Math.abs(last - ratings[0])} pts
        overall
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════════════════ */
export default function Stats() {
  const [cf, setCf] = useState(null);
  const [gh, setGh] = useState(null);
  const [cfErr, setCfErr] = useState(false);
  const [ghErr, setGhErr] = useState(false);

  /* fetch Codeforces */
  useEffect(() => {
    Promise.all([fetch(CF_INFO_URL), fetch(CF_RATING_URL)])
      .then(async ([infoRes, ratingRes]) => {
        const info = await infoRes.json();
        const rating = await ratingRes.json();
        if (info.status !== "OK") throw new Error("CF info failed");
        const user = info.result[0];
        const hist = rating.status === "OK" ? rating.result : [];
        setCf({ user, history: hist });
      })
      .catch(() => setCfErr(true));
  }, []);

  /* fetch GitHub */
  useEffect(() => {
    Promise.all([fetch(GH_USER_URL), fetch(GH_REPOS_URL)])
      .then(async ([userRes, reposRes]) => {
        const user = await userRes.json();
        const repos = await reposRes.json();
        const stars = Array.isArray(repos)
          ? repos.reduce((s, r) => s + (r.stargazers_count || 0), 0)
          : 0;
        setGh({
          user,
          stars,
          repoCount: Array.isArray(repos) ? repos.length : user.public_repos,
        });
      })
      .catch(() => setGhErr(true));
  }, []);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="stats" className="section stats-section">
      <div className="container">
        {/* Section title */}
        <motion.h2
          ref={headerRef}
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Competitive & Dev Stats
        </motion.h2>

        {/* ── Codeforces ───────────────────────────────────────── */}
        <div className="stats-platform-block">
          <SectionHeader
            title={
              <a
                href={`https://codeforces.com/profile/${CF_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-title cf"
              >
                <svg
                  className="platform-logo"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.5 7.5A1.5 1.5 0 013 6V3a1.5 1.5 0 013 0v3a1.5 1.5 0 01-1.5 1.5zm7.5 13.5A1.5 1.5 0 0110.5 19V3a1.5 1.5 0 013 0v16a1.5 1.5 0 01-1.5 1.5zm7.5-9A1.5 1.5 0 0118 10.5V3a1.5 1.5 0 013 0v7.5a1.5 1.5 0 01-1.5 1.5z" />
                </svg>
                Codeforces
                <span className="platform-handle">@{CF_HANDLE}</span>
              </a>
            }
          />

          <AnimatePresence mode="wait">
            {cfErr ? (
              <motion.p
                key="cf-err"
                className="stats-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Could not load Codeforces data — please try again later.
              </motion.p>
            ) : !cf ? (
              <motion.div
                key="cf-skeleton"
                className="stats-skeleton-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="stats-skeleton" />
                ))}
              </motion.div>
            ) : (
              <motion.div key="cf-data">
                {/* rank badge row */}
                <motion.div
                  className="rank-row"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.45 }}
                >
                  <RankBadge rank={cf.user.rank ?? "Newbie"} />
                  <Sparkline data={cf.history} />
                </motion.div>

                <div className="stats-cards-row">
                  <StatCard
                    icon="🏆"
                    label="Current Rating"
                    value={cf.user.rating ?? 0}
                    sub={`Max: ${cf.user.maxRating ?? 0}`}
                    color="#00d4ff"
                    delay={0.1}
                    href={`https://codeforces.com/profile/${CF_HANDLE}`}
                  />
                  <StatCard
                    icon="⭐"
                    label="Max Rating"
                    value={cf.user.maxRating ?? 0}
                    sub={capitalize(cf.user.maxRank ?? "")}
                    color="#f59e0b"
                    delay={0.18}
                    href={`https://codeforces.com/profile/${CF_HANDLE}`}
                  />
                  <StatCard
                    icon="🎯"
                    label="Contests"
                    value={cf.history.length}
                    sub="participated"
                    color="#a78bfa"
                    delay={0.26}
                    href={`https://codeforces.com/contests/with/${CF_HANDLE}`}
                  />
                  <StatCard
                    icon="✅"
                    label="Contribution"
                    value={cf.user.contribution ?? 0}
                    sub="community pts"
                    color="#10b981"
                    delay={0.34}
                    href={`https://codeforces.com/profile/${CF_HANDLE}`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── GitHub ───────────────────────────────────────────── */}
        <div className="stats-platform-block">
          <SectionHeader
            title={
              <a
                href={`https://github.com/${GH_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-title gh"
              >
                <svg
                  className="platform-logo"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-1.93c-3.19.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.18a10.97 10.97 0 012.87-.39c.97.01 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.07 0 4.41-2.68 5.37-5.24 5.65.41.36.78 1.06.78 2.14v3.17c0 .31.2.66.79.55A10.51 10.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
                GitHub
                <span className="platform-handle">@{GH_HANDLE}</span>
              </a>
            }
            delay={0.05}
          />

          <AnimatePresence mode="wait">
            {ghErr ? (
              <motion.p
                key="gh-err"
                className="stats-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Could not load GitHub data — please try again later.
              </motion.p>
            ) : !gh ? (
              <motion.div
                key="gh-skeleton"
                className="stats-skeleton-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="stats-skeleton" />
                ))}
              </motion.div>
            ) : (
              <motion.div key="gh-data">
                {/* GitHub contribution image */}
                <motion.div
                  className="gh-contribution-wrap"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <img
                    src={`https://ghchart.rshah.org/00d4ff/${GH_HANDLE}`}
                    alt="GitHub contribution chart"
                    className="gh-chart"
                  />
                </motion.div>

                <div className="stats-cards-row">
                  <StatCard
                    icon="📦"
                    label="Public Repos"
                    value={gh.repoCount}
                    sub="open-source"
                    color="#00d4ff"
                    delay={0.1}
                    href={`https://github.com/${GH_HANDLE}?tab=repositories`}
                  />
                  <StatCard
                    icon="👥"
                    label="Followers"
                    value={gh.user.followers ?? 0}
                    sub="developers"
                    color="#f59e0b"
                    delay={0.18}
                    href={`https://github.com/${GH_HANDLE}?tab=followers`}
                  />
                  <StatCard
                    icon="⭐"
                    label="Total Stars"
                    value={gh.stars}
                    sub="across repos"
                    color="#a78bfa"
                    delay={0.26}
                    href={`https://github.com/${GH_HANDLE}`}
                  />
                  <StatCard
                    icon="🔀"
                    label="Following"
                    value={gh.user.following ?? 0}
                    sub="developers"
                    color="#10b981"
                    delay={0.34}
                    href={`https://github.com/${GH_HANDLE}?tab=following`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
