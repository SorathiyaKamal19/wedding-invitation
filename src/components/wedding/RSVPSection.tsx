"use client";

import React, { useState } from "react";
import { WeddingData } from "@/data/weddingData";

interface RSVPSectionProps {
  data: WeddingData;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ data }) => {
  const [attendance, setAttendance] = useState<"accept" | "decline" | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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
          <div className="rv-choices">
            <button
              type="button"
              className={`rv-ch ${attendance === "accept" ? "is-selected" : ""}`}
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
              className={`rv-ch ${attendance === "decline" ? "is-selected" : ""}`}
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
                  Phone Number *
                </label>
                <input
                  className="f-in"
                  id="f-ph"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 00000 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {attendance === "accept" && (
                <div className="ff" id="ff-g">
                  <label className="f-lbl" htmlFor="f-g">
                    Number of Guests
                  </label>
                  <input
                    className="f-in"
                    id="f-g"
                    type="number"
                    inputMode="numeric"
                    placeholder="Including yourself"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
              )}

              <div className="ff" id="ff-msg">
                <label className="f-lbl" htmlFor="f-msg">
                  Message <span className="f-opt">(Optional)</span>
                </label>
                <textarea
                  className="f-ta"
                  id="f-msg"
                  placeholder="Share a warm wish..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {error && (
                <p className="f-err" id="f-err" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="btn-sub" id="f-sub">
                Send RSVP
              </button>
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
                Thank you!
              </p>
              <p className="ok-x" id="ok-x">
                {attendance === "accept"
                  ? "We look forward to celebrating with you."
                  : "Thank you for letting us know. You will be missed!"}
              </p>
            </div>
          )}

          <div className="rv-contact" id="rvContact">
            <p className="rc-lbl">For Queries, Contact</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {data.connect.rsvp.contacts.map((contact, idx) => (
                <a
                  key={`contact-${idx}`}
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-gold/40 text-gold-lt hover:border-gold hover:text-white transition-colors"
                >
                  <span>{contact.name}:</span>
                  <span className="font-mono">{contact.phone}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

