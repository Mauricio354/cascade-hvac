"use client";

import { useState, useRef, useEffect } from "react";
import "./chatwidget.css";

// Strip markdown and clean up bot responses for chat display
function formatBotText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // strip bold markdown
    .replace(/^#{1,3}\s+/gm, "")     // strip heading markers
    .replace(/^- /gm, "\u2022 ")     // dashes to bullets
    .replace(/\n{3,}/g, "\n\n")      // collapse excess newlines
    .replace(/\n/g, "<br>");          // newlines to HTML
}

const QUICK_ACTIONS = [
  "What HVAC services do you offer?",
  "Do you serve the Calgary area?",
  "How do I request a free quote?",
];

const QUICK_ACTIONS_SECOND = [
  "Quels services CVC offrez-vous?",
  "Desservez-vous la r\u00E9gion de Calgary?",
  "Comment demander un devis gratuit?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [lang, setLang] = useState("en");
  const [showBadge, setShowBadge] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [apiHistory, setApiHistory] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingType, setBookingType] = useState("");

  // Refs
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);
  const userMsgRef = useRef(null);
  const inputRef = useRef(null);

  // What to do after next render: "bottom" or "to-user-msg"
  const scrollIntent = useRef(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 500);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showMenu) return;
    const handleClick = () => setShowMenu(false);
    const timer = setTimeout(() => document.addEventListener("click", handleClick), 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick);
    };
  }, [showMenu]);

  // Load Cal.com embed script for popup booking
  useEffect(() => {
    if (typeof window === "undefined" || window.Cal) return;
    (function (C, A, L) {
      var p = function (a, ar) { a.q.push(ar); };
      var d = C.document;
      C.Cal = C.Cal || function () {
        var cal = C.Cal;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (arguments[0] === L) {
          var api = function () { p(api, arguments); };
          var namespace = arguments[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], arguments);
            p(cal, ["initNamespace", namespace]);
          } else { p(cal, arguments); }
          return;
        }
        p(cal, arguments);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    window.Cal("init", { origin: "https://cal.com" });
    window.Cal("ui", { styles: { branding: { brandColor: "#0094cc" } } });
  }, []);

  // Welcome message
  useEffect(() => {
    setMessages([
      {
        role: "bot",
        text: "Welcome to Cascade HVAC! I\u2019m your AI assistant. Whether you need heating, cooling, ventilation, ductwork, or maintenance \u2014 I\u2019m here to help. How can I assist you today?",
      },
    ]);
  }, []);

  // Scroll handler — runs every render
  useEffect(() => {
    if (!scrollIntent.current) return;

    const intent = scrollIntent.current;
    scrollIntent.current = null;

    const timer = setTimeout(() => {
      if (intent === "bottom" && bottomRef.current) {
        bottomRef.current.scrollIntoView({ block: "end" });
      } else if (intent === "to-user-msg" && userMsgRef.current) {
        userMsgRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);

    return () => clearTimeout(timer);
  });

  // Lock/unlock body scroll on mobile
  useEffect(() => {
    if (isOpen) {
      setShowBadge(false);
      if (isMobile) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.top = `-${window.scrollY}px`;
      }
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
        inputRef.current?.focus();
      }, 50);
    } else {
      if (isMobile) {
        const scrollY = document.body.style.top;
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [isOpen, isMobile]);

  // Send message
  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setShowQuick(false);

    const userMsg = { role: "user", text: text.trim() };
    const updated = [...messages, userMsg];

    scrollIntent.current = "bottom";

    setMessages(updated);
    setInput("");
    setLoading(true);

    const history = [
      ...apiHistory,
      { role: "user", content: text.trim() },
    ];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, lang }),
      });
      const data = await res.json();
      setLoading(false);

      scrollIntent.current = "to-user-msg";

      if (data.error) {
        setMessages((prev) => [...prev, { role: "bot", text: `\u26A0\uFE0F ${data.error}` }]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
        if (data.history) {
          setApiHistory(data.history);
        }
      }
    } catch {
      setLoading(false);
      scrollIntent.current = "to-user-msg";
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Connection error. Please try again in a moment." },
      ]);
    }
  };

  // Open Cal.com popup with prefilled booking data
  const openCalBooking = () => {
    if (!bookingName.trim() || !bookingEmail.trim()) return;
    const notes = [
      bookingPhone && `Phone: ${bookingPhone}`,
      bookingType && `Interested in: ${bookingType}`,
    ].filter(Boolean).join("\n");

    if (window.Cal) {
      window.Cal("modal", {
        // TODO: Replace with Cascade HVAC's Cal.com link once set up
        calLink: "cascade-hvac/consultation",
        config: {
          layout: "month_view",
          name: bookingName.trim(),
          email: bookingEmail.trim(),
          notes: notes || undefined,
        },
      });
    } else {
      const params = new URLSearchParams({
        name: bookingName.trim(),
        email: bookingEmail.trim(),
        ...(notes && { notes }),
      });
      window.open(
        `https://cal.com/cascade-hvac/consultation?${params}`,
        "_blank"
      );
    }
  };

  const resetChat = () => {
    setMessages([{
      role: "bot",
      text: lang === "fr"
        ? "Bienvenue chez Cascade HVAC! Je suis votre assistant IA. Que ce soit pour le chauffage, la climatisation, la ventilation ou l\u2019entretien \u2014 je suis l\u00E0 pour vous aider. Comment puis-je vous aider aujourd\u2019hui?"
        : "Welcome to Cascade HVAC! I\u2019m your AI assistant. Whether you need heating, cooling, ventilation, ductwork, or maintenance \u2014 I\u2019m here to help. How can I assist you today?",
    }]);
    setApiHistory([]);
    setShowQuick(true);
    setShowBookingForm(false);
    setBookingName("");
    setBookingEmail("");
    setBookingPhone("");
    setBookingType("");
    setShowMenu(false);
  };

  const quickActions = lang === "fr" ? QUICK_ACTIONS_SECOND : QUICK_ACTIONS;

  // Find the index of the last user message (for scroll anchor)
  const lastUserMsgIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "user") return i;
    }
    return -1;
  })();

  return (
    <>
      {/* CHAT WINDOW */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            ...(isMobile
              ? { top: 10, left: 10, right: 10, bottom: 10, borderRadius: 16, width: "auto" }
              : { bottom: 100, right: 28, width: 390, maxHeight: "min(580px, calc(100vh - 140px))", borderRadius: 16 }),
            background: "#fff",
            boxShadow: "0 24px 80px rgba(0,152,212,0.22), 0 0 0 1px rgba(0,152,212,0.08)",
            display: "flex",
            flexDirection: "column",
            zIndex: 99999,
            overflow: "hidden",
            fontFamily: "'DM Sans', sans-serif",
            animation: "urSlideIn 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              background: "linear-gradient(135deg, #024C68, #0176a2)",
              padding: "20px 20px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 56,
                  height: 44,
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                  padding: 4,
                }}
              >
                <img
                  src="/logo.png"
                  alt="Cascade HVAC"
                  style={{ width: 48, height: "auto", objectFit: "contain", filter: "invert(1) hue-rotate(180deg)", mixBlendMode: "screen", imageRendering: "crisp-edges" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#fff",
                    letterSpacing: 0.2,
                  }}
                >
                  Cascade HVAC Ltd
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 2,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      background: "#68D391",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  />
                  {lang === "fr" ? "En ligne" : "Online"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  display: "flex",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <button
                  onClick={() => setLang("en")}
                  style={{
                    background: lang === "en" ? "rgba(255,255,255,0.25)" : "transparent",
                    border: "none",
                    color: lang === "en" ? "#fff" : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "5px 10px",
                    letterSpacing: 0.5,
                    transition: "all 0.2s",
                  }}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("fr")}
                  style={{
                    background: lang === "fr" ? "rgba(255,255,255,0.25)" : "transparent",
                    border: "none",
                    color: lang === "fr" ? "#fff" : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "5px 10px",
                    letterSpacing: 0.5,
                    transition: "all 0.2s",
                  }}
                >
                  FR
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  style={{
                    background: showMenu ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "rgba(255,255,255,0.8)",
                    cursor: "pointer",
                    fontSize: 20,
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s",
                    letterSpacing: 1,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = showMenu ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)")}
                >
                  &#8942;
                </button>
                {showMenu && (
                  <div className="ur-dropdown">
                    <button onClick={resetChat}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        <line x1="9" y1="10" x2="15" y2="10"/>
                      </svg>
                      {lang === "fr" ? "Nouvelle conversation" : "New Chat"}
                    </button>
                    <button onClick={resetChat}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 4 23 10 17 10"/>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                      </svg>
                      {lang === "fr" ? "Rafra\u00EEchir" : "Refresh"}
                    </button>
                    <button
                      className="ur-dropdown-exit"
                      onClick={() => {
                        setShowMenu(false);
                        setIsOpen(false);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      {lang === "fr" ? "Quitter" : "Exit"}
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  color: "rgba(255,255,255,0.8)",
                  cursor: "pointer",
                  fontSize: 18,
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              >
                &#10005;
              </button>
            </div>
          </div>

          {/* BOOK CONSULTATION BAR */}
          <div
            className="ur-booking-bar"
            onClick={() => {
              setShowBookingForm(!showBookingForm);
              setShowMenu(false);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0094cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "#0094cc" }}>
              {lang === "fr" ? "R\u00E9server une consultation" : "Book a Consultation"}
            </span>
          </div>

          {/* BOOKING FORM PANEL */}
          {showBookingForm && (
            <div
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                background: "#F5F6F8",
                padding: "16px",
                animation: "urSlideDown 0.25s ease",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  border: "1px solid #E8EBF0",
                  boxShadow: "0 1px 4px rgba(0,152,212,0.06)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 16px 10px",
                    borderBottom: "1px solid #E8EBF0",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#0094cc" }}>
                    {lang === "fr" ? "R\u00E9server une consultation" : "Book a Consultation"}
                  </div>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 18,
                      color: "#6B7B8D",
                      padding: 4,
                      lineHeight: 1,
                    }}
                  >
                    &#10005;
                  </button>
                </div>
                  <div
                    style={{
                      padding: "12px 16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {[
                      { ph: lang === "fr" ? "Votre nom *" : "Your name *", val: bookingName, set: setBookingName, type: "text" },
                      { ph: lang === "fr" ? "Adresse courriel *" : "Email address *", val: bookingEmail, set: setBookingEmail, type: "email" },
                      { ph: lang === "fr" ? "Num\u00E9ro de t\u00E9l\u00E9phone" : "Phone number", val: bookingPhone, set: setBookingPhone, type: "tel" },
                    ].map((f, idx) => (
                      <input
                        key={idx}
                        type={f.type}
                        placeholder={f.ph}
                        value={f.val}
                        onChange={(e) => f.set(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1px solid #E8EBF0",
                          borderRadius: 8,
                          fontSize: 14,
                          fontFamily: "'DM Sans', sans-serif",
                          outline: "none",
                          color: "#2D3748",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0094cc")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EBF0")}
                      />
                    ))}
                    <select
                      value={bookingType}
                      onChange={(e) => setBookingType(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid #E8EBF0",
                        borderRadius: 8,
                        fontSize: 14,
                        fontFamily: "'DM Sans', sans-serif",
                        outline: "none",
                        color: bookingType ? "#2D3748" : "#9CA3AF",
                        background: "#fff",
                        boxSizing: "border-box",
                        appearance: "none",
                      }}
                    >
                      <option value="" disabled>
                        {lang === "fr" ? "Type de service?" : "What type of service?"}
                      </option>
                      <option value="HVAC Installation">{lang === "fr" ? "Installation CVC" : "HVAC Installation"}</option>
                      <option value="Furnace Replacement">{lang === "fr" ? "Remplacement de fournaise" : "Furnace Replacement"}</option>
                      <option value="Ductwork & Fabrication">{lang === "fr" ? "Conduits et fabrication" : "Ductwork & Fabrication"}</option>
                      <option value="Maintenance & Repairs">{lang === "fr" ? "Entretien et r\u00E9parations" : "Maintenance & Repairs"}</option>
                      <option value="Air Quality">{lang === "fr" ? "Qualit\u00E9 de l\u2019air" : "Air Quality"}</option>
                      <option value="Commercial / Industrial">{lang === "fr" ? "Commercial / Industriel" : "Commercial / Industrial"}</option>
                      <option value="Other">{lang === "fr" ? "Autre" : "Other"}</option>
                    </select>
                  </div>
                  <div style={{ padding: "8px 16px 16px" }}>
                    <button
                      onClick={openCalBooking}
                      disabled={!bookingName.trim() || !bookingEmail.trim()}
                      style={{
                        width: "100%",
                        padding: "12px",
                        background:
                          bookingName.trim() && bookingEmail.trim()
                            ? "#1A1A2E"
                            : "#CBD5E0",
                        color: "#fff",
                        border: "none",
                        borderRadius: 10,
                        fontWeight: 700,
                        fontSize: 14,
                        fontFamily: "'DM Sans', sans-serif",
                        cursor:
                          bookingName.trim() && bookingEmail.trim()
                            ? "pointer"
                            : "not-allowed",
                        transition: "opacity 0.2s",
                      }}
                    >
                      {lang === "fr" ? "Choisir un horaire" : "Choose a Time"}
                    </button>
                  </div>
                </div>
            </div>
          )}

          {/* MESSAGES */}
          {!showBookingForm && (
            <div
              ref={scrollRef}
              className="ur-scroll"
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                padding: "28px 16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                background: "#F5F6F8",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  ref={i === lastUserMsgIndex ? userMsgRef : null}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "85%",
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    animation: "urMsgIn 0.25s ease",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      fontSize: 14,
                      lineHeight: 1.55,
                      borderRadius:
                        msg.role === "user"
                          ? "16px 16px 4px 16px"
                          : "16px 16px 16px 4px",
                      ...(msg.role === "user"
                        ? {
                            background: "#0094cc",
                            color: "#fff",
                          }
                        : {
                            background: "#fff",
                            color: "#2D3748",
                            boxShadow: "0 1px 4px rgba(0,152,212,0.06)",
                            border: "1px solid #E8EBF0",
                          }),
                    }}
                    dangerouslySetInnerHTML={{
                      __html:
                        msg.role === "bot"
                          ? formatBotText(msg.text)
                          : msg.text.replace(/\n/g, "<br>"),
                    }}
                  />
                  <div
                    style={{
                      fontSize: 10,
                      color: "#6B7B8D",
                      marginTop: 4,
                      paddingLeft: 4,
                      paddingRight: 4,
                      textAlign: msg.role === "user" ? "right" : "left",
                    }}
                  >
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}

            {/* Typing indicator */}
            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  maxWidth: "85%",
                  animation: "urMsgIn 0.25s ease",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #E8EBF0",
                    borderRadius: "16px 16px 16px 4px",
                    padding: "12px 16px",
                    display: "flex",
                    gap: 4,
                  }}
                >
                  {[0, 1, 2].map((n) => (
                    <div
                      key={n}
                      style={{
                        width: 7,
                        height: 7,
                        background: "#0094cc",
                        opacity: 0.4,
                        borderRadius: "50%",
                        animation: "urTypeBounce 1.4s infinite",
                        animationDelay: `${n * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

              {/* Bottom anchor */}
              <div ref={bottomRef} style={{ height: 1, flexShrink: 0 }} />
            </div>
          )}

          {/* SUGGESTION CHIPS */}
          {showQuick && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                padding: "0 16px 14px",
                background: "#F5F6F8",
                flexShrink: 0,
              }}
            >
              {quickActions.map((q, i) => (
                <button
                  key={i}
                  className="ur-chip"
                  onClick={() => sendMessage(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* INPUT */}
          <div
            style={{
              display: "flex",
              gap: 8,
              padding: isMobile ? "12px 12px" : "14px 16px",
              borderTop: "1px solid #E8EBF0",
              background: "#fff",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={
                lang === "fr"
                  ? "Posez une question sur nos services..."
                  : "Ask about our HVAC services..."
              }
              style={{
                flex: 1,
                padding: "10px 16px",
                border: "1px solid #E8EBF0",
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                color: "#2D3748",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#0094cc")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EBF0")}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                width: 42,
                height: 42,
                background: "#0094cc",
                border: "none",
                borderRadius: 12,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: loading || !input.trim() ? 0.5 : 1,
                transition: "transform 0.15s, opacity 0.2s",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          {/* DISCLAIMER */}
          <div
            style={{
              textAlign: "center",
              fontSize: 10,
              color: "#6B7B8D",
              padding: isMobile ? "8px 16px calc(12px + env(safe-area-inset-bottom, 0px))" : "8px 16px 12px",
              background: "#fff",
              flexShrink: 0,
            }}
          >
            {lang === "fr"
              ? "Propuls\u00E9 par IA \u00B7 Pour un devis, appelez 403.264.4622"
              : "Powered by AI \u00B7 For quotes, call 403.264.4622"}
          </div>
        </div>
      )}

      {/* FLOATING BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: isMobile ? 16 : 28,
            right: isMobile ? 16 : 28,
            width: isMobile ? 56 : 64,
            height: isMobile ? 56 : 64,
            background: "#0094cc",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 100000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 24px rgba(0,152,212,0.35)",
            animation: "urPulse 2.5s infinite",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {showBadge && (
            <div
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                width: 22,
                height: 22,
                background: "#F5A623",
                border: "2px solid #fff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                color: "#0176a2",
              }}
            >
              1
            </div>
          )}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
            <circle cx="8" cy="10" r="1.2" />
            <circle cx="12" cy="10" r="1.2" />
            <circle cx="16" cy="10" r="1.2" />
          </svg>
        </button>
      )}
    </>
  );
}
