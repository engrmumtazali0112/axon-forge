// src/components/ServicesSection.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCubes, FaDatabase, FaCreditCard, FaCodeBranch, FaShieldAlt, FaThLarge,
  FaBrain, FaMagic, FaCommentDots, FaFileInvoice, FaRobot, FaChartLine,
  FaMobileAlt, FaFingerprint, FaStore, FaBell, FaWallet, FaWifi,
  FaCloud, FaRocket, FaTachometerAlt, FaDocker, FaKey, FaServer,
  FaChartBar, FaTable, FaProjectDiagram, FaSearch, FaSync,
  FaPlug, FaExchangeAlt, FaBolt, FaLock, FaCode,
} from "react-icons/fa";
import "./ServicesSection.css";

/*
  Node positions around the centre hub, in % of the diagram stage.
  Index 0-2 get their label ABOVE the tile, 3-5 BELOW (keeps labels off the spokes).
*/
const POS = [
  { x: 50, y: 11 },
  { x: 16, y: 31 },
  { x: 84, y: 31 },
  { x: 16, y: 69 },
  { x: 84, y: 69 },
  { x: 50, y: 88 },
];

const COLORS = ["#4f6fb5", "#d6336c", "#2f9e44", "#2b9a8f", "#e8590c", "#9c36b5"];

const SERVICES = [
  {
    id: "01",
    title: "Web Apps & SaaS",
    tagline: "Turn a manual process or spreadsheet workflow into a product you can sell.",
    description:
      "Backend-heavy web apps, SaaS platforms and online stores on Django, FastAPI, React and Next.js, with billing, roles and admin built in.",
    areas: [
      "Django, FastAPI & Node.js backends",
      "React & Next.js front ends",
      "Stripe payments & subscriptions",
      "Multi-tenant SaaS architecture",
    ],
    hub: FaCubes,
    nodes: [
      { icon: FaCubes, label: "Multi-tenant", sub: "One platform, many customers" },
      { icon: FaDatabase, label: "Your data", sub: "Exportable, never locked" },
      { icon: FaCreditCard, label: "Billing", sub: "Stripe & subscriptions" },
      { icon: FaCodeBranch, label: "Audit trail", sub: "Every change logged" },
      { icon: FaShieldAlt, label: "Permissions", sub: "Role-based access" },
      { icon: FaThLarge, label: "Admin panel", sub: "Manage without code" },
    ],
  },
  {
    id: "02",
    title: "AI & Machine Learning",
    tagline: "Automate the work that currently eats your team's week.",
    description:
      "LLM features, document extraction, AI assistants and predictive models, shipped as working products rather than notebooks.",
    areas: [
      "LLM & generative AI features",
      "RAG assistants over your data",
      "Computer vision with PyTorch & OpenCV",
      "Workflow automation agents",
    ],
    hub: FaBrain,
    nodes: [
      { icon: FaMagic, label: "Generative AI", sub: "Drafting & summarising" },
      { icon: FaCommentDots, label: "Assistants", sub: "For staff or customers" },
      { icon: FaSearch, label: "Your data", sub: "Answers from your docs" },
      { icon: FaRobot, label: "Agents", sub: "Multi-step workflows" },
      { icon: FaFileInvoice, label: "Extraction", sub: "Invoices & forms" },
      { icon: FaChartLine, label: "Prediction", sub: "Forecast & score" },
    ],
  },
  {
    id: "03",
    title: "Mobile App Development",
    tagline: "Reach customers on iOS and Android without paying for two teams.",
    description:
      "Cross-platform Flutter apps with Firebase auth, push notifications and REST integration, ready for both stores.",
    areas: [
      "Flutter for Android & iOS",
      "Play Store & App Store release",
      "Firebase auth & push notifications",
      "Offline-first data sync",
    ],
    hub: FaMobileAlt,
    nodes: [
      { icon: FaCode, label: "One codebase", sub: "Android + iOS" },
      { icon: FaFingerprint, label: "Sign-in", sub: "Biometric & social" },
      { icon: FaStore, label: "Store release", sub: "Play Store & App Store" },
      { icon: FaBell, label: "Push", sub: "Timely notifications" },
      { icon: FaWifi, label: "Offline", sub: "Works without signal" },
      { icon: FaWallet, label: "In-app pay", sub: "Payments & plans" },
    ],
  },
  {
    id: "04",
    title: "Cloud & DevOps",
    tagline: "Stop losing nights to deploys, downtime and surprise hosting bills.",
    description:
      "AWS infrastructure with CI/CD, containers, caching and monitoring, so releases become routine and pages load fast.",
    areas: [
      "AWS architecture & deployment",
      "Docker & CI/CD pipelines",
      "Caching, CDN & performance tuning",
      "Monitoring, logging & alerting",
    ],
    hub: FaCloud,
    nodes: [
      { icon: FaRocket, label: "CI/CD", sub: "Boring, repeatable deploys" },
      { icon: FaTachometerAlt, label: "Speed", sub: "Caching & CDN" },
      { icon: FaDocker, label: "Containers", sub: "Docker & orchestration" },
      { icon: FaChartLine, label: "Cost control", sub: "Reviewed every month" },
      { icon: FaBolt, label: "Monitoring", sub: "Alerted before you are" },
      { icon: FaKey, label: "Secrets", sub: "Managed & rotated" },
    ],
  },
  {
    id: "05",
    title: "Data Analytics & Databases",
    tagline: "Turn raw data into decisions people actually use.",
    description:
      "ETL pipelines, dashboards and well-designed databases across relational and NoSQL systems.",
    areas: [
      "ETL pipelines with Pandas",
      "Power BI & Tableau dashboards",
      "PostgreSQL, MySQL & MongoDB design",
      "Query optimisation",
    ],
    hub: FaChartBar,
    nodes: [
      { icon: FaSync, label: "Pipelines", sub: "Clean, load, repeat" },
      { icon: FaChartBar, label: "Dashboards", sub: "Power BI & Tableau" },
      { icon: FaTable, label: "Reports", sub: "Scheduled & shareable" },
      { icon: FaDatabase, label: "Schema design", sub: "Built to grow" },
      { icon: FaBolt, label: "Query tuning", sub: "Fast at scale" },
      { icon: FaServer, label: "SQL & NoSQL", sub: "Right store per job" },
    ],
  },
  {
    id: "06",
    title: "API Integration",
    tagline: "Connect the tools you already use so data moves without copy-paste.",
    description:
      "REST and GraphQL APIs and webhooks that join your services and move data reliably between them.",
    areas: [
      "REST & GraphQL API design",
      "Third-party & payment integrations",
      "Webhooks & event-driven sync",
      "Authentication & rate limiting",
    ],
    hub: FaProjectDiagram,
    nodes: [
      { icon: FaPlug, label: "REST", sub: "Clean, documented endpoints" },
      { icon: FaCode, label: "GraphQL", sub: "Ask for what you need" },
      { icon: FaCreditCard, label: "Payments", sub: "Stripe & gateways" },
      { icon: FaExchangeAlt, label: "Webhooks", sub: "Real-time events" },
      { icon: FaLock, label: "Auth", sub: "Keys, OAuth & JWT" },
      { icon: FaSync, label: "Sync", sub: "Retries & reconciliation" },
    ],
  },
];

const ServiceCard = ({ service, index }) => {
  const [active, setActive] = useState(0);
  const Hub = service.hub;
  const ActiveIcon = service.nodes[active].icon;

  // cycle the highlighted node, like a "currently building" indicator
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const t = setInterval(
      () => setActive((a) => (a + 1) % service.nodes.length),
      2200
    );
    return () => clearInterval(t);
  }, [service.nodes.length]);

  return (
    <div className="svc-card-wrap" style={{ "--i": index }}>
      <article className="svc-card">
        {/* LEFT: hub & spoke diagram */}
        <div className="svc-visual">
          <span className="svc-badge">{service.id}</span>

          <div className="svc-stage" aria-hidden="true">
            <svg
              className="svc-lines"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {service.nodes.map((n, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="49"
                  x2={POS[i].x}
                  y2={POS[i].y}
                  stroke={COLORS[i]}
                  className={i === active ? "is-on" : ""}
                />
              ))}
            </svg>

            <div className="svc-hub">
              <Hub />
            </div>

            {service.nodes.map((n, i) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.label}
                  className={`svc-node ${i < 3 ? "above" : "below"} ${
                    i === active ? "is-active" : ""
                  }`}
                  style={{
                    left: `${POS[i].x}%`,
                    top: `${POS[i].y}%`,
                    "--c": COLORS[i],
                  }}
                >
                  <span className="svc-tile">
                    <Icon />
                    <i className="svc-dot" />
                  </span>
                  <span className="svc-label">
                    <b>{n.label}</b>
                    <small>{n.sub}</small>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="svc-chip" aria-hidden="true">
            <ActiveIcon />
            <span>
              Working on: <b>{service.nodes[active].label}</b>
            </span>
          </div>
        </div>

        {/* RIGHT: copy */}
        <div className="svc-body">
          <div className="svc-body-top">
            <h3 className="svc-name">{service.title}</h3>
            <Link
              to="/contact"
              className="svc-go"
              aria-label={`Talk about ${service.title}`}
            >
              <FaArrowRight />
            </Link>
          </div>

          <p className="svc-tagline">{service.tagline}</p>
          <p className="svc-desc">{service.description}</p>

          <h4 className="svc-areas-title">Expert areas</h4>
          <ul className="svc-areas">
            {service.areas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
};

const ServicesSection = ({ showAllLink = false }) => {
  return (
    <section id="services" className="svc-section">
      <div className="svc-wrap">
        <div className="svc-head">
          <div className="svc-head-text">
            <span className="svc-eyebrow">What we do</span>
            <h2 className="svc-title">
              Six services. One team. No hand-offs between vendors.
            </h2>
            <p className="svc-sub">
              Most clients start with one and add more as the product grows, all
              with the same team.
            </p>
          </div>
          {showAllLink && (
            <Link to="/services" className="svc-all">
              All services <FaArrowRight />
            </Link>
          )}
        </div>

        {/* Each card is sticky, so the next one slides up and covers it */}
        <div className="svc-stack">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;