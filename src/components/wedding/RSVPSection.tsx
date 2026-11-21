"use client";

import React, { useState } from "react";
import { triggerConfetti } from "@/lib/confetti";
import { WeddingData } from "@/data/weddingData";

interface RSVPSectionProps {
  data: WeddingData;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ data }) => {
  const [attendance, setAttendance] = useState<"accept" | "decline" | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1");
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    data.events.map((e) => e.name)
  );
  const [dietary, setDietary] = useState("Pure Vegetarian");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleToggleEvent = (eventName: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventName)
        ? prev.filter((e) => e !== eventName)
        : [...prev, eventName]
    );
  };

  const fireConfetti = () => {
    triggerConfetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#c8973e", "#f3dd9b", "#9a2328", "#fcf8ef", "#d4af37"],
    });
  };

  const getWhatsAppUrl = () => {
    const rawPhone = data.connect.rsvp.whatsappNumber || data.connect.rsvp.contacts[0]?.phone || "";
    const cleanPhone = rawPhone.replace(/[^0-9]/g, "");
    const eventsStr = attendance === "accept" && selectedEvents.length > 0 ? selectedEvents.join(", ") : "All Celebrations";
    const text = `*Namaste! Wedding RSVP - ${data.couple.groom.first} & ${data.couple.bride.first}*\n` +
      `• *Guest Name*: ${name.trim() || "Guest"}\n` +
      `• *Phone*: ${phone.trim() || "N/A"}\n` +
      `• *Attendance*: ${attendance === "accept" ? "Joyfully Attending 🎉" : "Regretfully Declining 🙏"}\n` +
      (attendance === "accept" ? `• *Guests Count*: ${guests}\n` : "") +
      (attendance === "accept" ? `• *Attending Functions*: ${eventsStr}\n` : "") +
      (attendance === "accept" ? `• *Dietary*: ${dietary}\n` : "") +
      (message.trim() ? `• *Wishes*: "${message.trim()}"\n` : "");

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendance) {
      setError("Please choose whether you will attend.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    setError("");
    setSubmitted(true);
    if (attendance === "accept") {
      fireConfetti();
    }
  };

  const handleDirectWhatsApp = () => {
    if (!attendance) {
      setError("Please select 'Joyfully Accept' or 'Regretfully Decline' first.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name before sending via WhatsApp.");
      return;
    }
    setError("");
    fireConfetti();
    window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="sec velvet rsvp" id="rsvp">
      <div className="inner">
        <img
          loading="lazy"
          decoding="async"
          className="rsvp-scroll reveal"
          src="/assets/el/scroll.webp"
          alt=""
          aria-hidden="true"
        />
        <p className="eyebrow eyebrow-lt reveal">Kindly reply</p>
        <h2 className="h2 h2-lt reveal font-playfair">RSVP</h2>
        <p className="rv-lead reveal">
          Please let us know if you can join our special day.
        </p>

        <div id="rsvp-wrap" className="reveal">
          <div className="rv-choices flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto mb-6">
            <button
              type="button"
              className={`rv-ch flex-1 ${attendance === "accept" ? "is-selected" : ""}`}
              id="ryes"
              aria-pressed={attendance === "accept"}
              onClick={() => {
                setAttendance("accept");
                setError("");
              }}
            >
              <span className="rv-ico">
                <svg viewBox="0 0 24 24">
                  <polyline
                    points="20 6 9 17 4 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="rv-lbl">Joyfully Accept</span>
            </button>
            <button
              type="button"
              className={`rv-ch flex-1 ${attendance === "decline" ? "is-selected" : ""}`}
              id="rno"
              aria-pressed={attendance === "decline"}
              onClick={() => {
                setAttendance("decline");
                setError("");
              }}
            >
              <span className="rv-ico">
                <svg viewBox="0 0 24 24">
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="rv-lbl">Regretfully Decline</span>
            </button>
          </div>

          {!submitted ? (
            <form
              className={`rv-form ${attendance ? "active" : ""}`}
              id="rsvp-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="ff" id="ff-name">
                <label className="f-lbl" htmlFor="f-name">
                  Full Name *
                </label>
                <input
                  className="f-in"
                  id="f-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="ff" id="ff-ph">
                <label className="f-lbl" htmlFor="f-ph">
                  Phone / WhatsApp Number *
                </label>
                <input
                  className="f-in"
                  id="f-ph"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 98100 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {attendance === "accept" && (
                <>
                  <div className="ff" id="ff-g">
                    <label className="f-lbl" htmlFor="f-g">
                      Number of Guests Attending
                    </label>
                    <input
                      className="f-in"
                      id="f-g"
                      type="number"
                      inputMode="numeric"
                      placeholder="Including yourself (e.g. 2)"
                      min="1"
                      max="10"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    />
                  </div>

                  <div className="ff" id="ff-events">
                    <label className="f-lbl">Ceremonies You Will Grace</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left mt-1">
                      {data.events.map((ev) => {
                        const isChecked = selectedEvents.includes(ev.name);
                        return (
                          <label
                            key={ev.id}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors border text-xs ${isChecked
                              ? "bg-gold/15 border-gold text-cream"
                              : "bg-black/20 border-gold/30 text-gold-lt hover:border-gold/60"
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleEvent(ev.name)}
                              className="accent-[#c8973e] w-4 h-4 rounded"
                            />
                            <span className="font-serif leading-tight">
                              {ev.name}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="ff" id="ff-diet">
                    <label className="f-lbl" htmlFor="f-diet">
                      Dietary Preference
                    </label>
                    <select
                      className="f-in"
                      id="f-diet"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      style={{ cursor: "pointer", background: "#3b0c10" }}
                    >
                      <option value="Pure Vegetarian" style={{ background: "#3b0c10" }}>
                        Pure Vegetarian
                      </option>
                      <option value="Jain (No Root Vegetables)" style={{ background: "#3b0c10" }}>
                        Jain (No Onion / Garlic / Root)
                      </option>
                      <option value="Non-Vegetarian" style={{ background: "#3b0c10" }}>
                        Non-Vegetarian
                      </option>
                      <option value="No Specific Preference" style={{ background: "#3b0c10" }}>
                        No Specific Preference
                      </option>
                    </select>
                  </div>
                </>
              )}

              <div className="ff" id="ff-msg">
                <label className="f-lbl" htmlFor="f-msg">
                  Warm Wishes & Blessings <span className="f-opt">(Optional)</span>
                </label>
                <textarea
                  className="f-ta"
                  id="f-msg"
                  placeholder="Share your love and blessings for Aarav & Ananya..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {error && (
                <p className="f-err" id="f-err" role="alert">
                  {error}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="submit" className="btn-sub flex-1" id="f-sub">
                  <span>Submit RSVP</span>
                </button>
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="btn-sub flex-1"
                  style={{
                    background: "linear-gradient(180deg, #1fa855, #128c7e)",
                    borderColor: "rgba(255, 255, 255, 0.4)",
                  }}
                  title="Send pre-filled RSVP directly to the family on WhatsApp"
                >
                  <span>💬 RSVP on WhatsApp</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="rv-ok is-visible" id="rv-ok" role="status">
              <div className="ok-r">
                <svg viewBox="0 0 24 24">
                  <polyline
                    points="20 6 9 17 4 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="ok-t font-playfair" id="ok-t">
                Shukriya! (Thank You)
              </p>
              <p className="ok-x" id="ok-x">
                {attendance === "accept"
                  ? "Your blessing and presence mean the world to us. We eagerly await celebrating together!"
                  : "Thank you for letting us know. Your heartfelt blessings remain with us!"}
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-5">
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="btn btn-sm"
                  style={{
                    background: "linear-gradient(180deg, #1fa855, #128c7e)",
                    color: "#fff",
                  }}
                >
                  <span>💬 Send Copy via WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-sm btn-outline"
                  style={{ borderColor: "rgba(240, 211, 138, 0.6)", color: "#f6e4b4" }}
                >
                  <span>Edit RSVP</span>
                </button>
              </div>
            </div>
          )}

          <div className="rv-contact" id="rvContact">
            <p className="rc-lbl">For Any Assistance, Kindly Connect With</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {data.connect.rsvp.contacts.map((contact, idx) => (
                <a
                  key={`contact-${idx}`}
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs border border-gold/40 text-gold-lt hover:border-gold hover:text-white transition-all bg-black/20"
                  title={`Call ${contact.name}`}
                >
                  <span className="font-semibold text-cream">{contact.name}</span>
                  {contact.relation && (
                    <span className="text-[10px] opacity-75">({contact.relation})</span>
                  )}
                  <span className="font-mono text-gold underline ml-1">{contact.phone}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

