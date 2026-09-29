"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Rotating session token — not tied to any identity. Regenerate each app load.
function getDeviceSession() {
  if (typeof window === "undefined") return "server";
  let token = sessionStorage.getItem("khuluma_session");
  if (!token) {
    token = crypto.randomUUID();
    sessionStorage.setItem("khuluma_session", token);
  }
  return token;
}

export default function SosButton() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSos() {
    setStatus("sending");
    const { error } = await supabase.from("sos_events").insert({
      device_session: getDeviceSession(),
      escalated_to: "manual_protocol", // swap to 'GBVCC' once a live integration exists
      escalation_status: "pending",
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleSos}
        disabled={status === "sending"}
        className="w-40 h-40 rounded-full bg-red-600 text-white font-bold text-xl shadow-lg active:scale-95 transition"
      >
        {status === "sending" ? "Sending…" : "SOS"}
      </button>
      {status === "sent" && (
        <p className="text-sm text-green-700">
          Help is on the way. Call the GBV Command Centre on 0800 428 428 if you can.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong. Please call 0800 428 428 directly.
        </p>
      )}
    </div>
  );
}
