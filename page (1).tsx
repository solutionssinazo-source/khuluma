"use client";

import { useState } from "react";

// This tool does NOT file anything with a court. It only helps a survivor
// prepare the information required for DVA Form 2/6, then produces a
// print-ready summary she can take (or have a Form 7 practitioner take)
// to her nearest Magistrate's Court.

type FormState = {
  fullName: string;
  idOrDob: string;
  homeAddress: string;
  contactNumber: string;
  respondentName: string;
  relationship: string;
  incidentSummary: string;
  wantsCounsellorToApply: boolean; // Form 7 route
};

const initial: FormState = {
  fullName: "",
  idOrDob: "",
  homeAddress: "",
  contactNumber: "",
  respondentName: "",
  relationship: "",
  incidentSummary: "",
  wantsCounsellorToApply: false,
};

export default function ProtectionOrderAssist() {
  const [form, setForm] = useState<FormState>(initial);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const update = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  const steps = [
    {
      label: "Your details",
      render: () => (
        <div className="flex flex-col gap-3">
          <input className="border p-2 rounded" placeholder="Full name"
            value={form.fullName} onChange={(e) => update({ fullName: e.target.value })} />
          <input className="border p-2 rounded" placeholder="ID number or date of birth"
            value={form.idOrDob} onChange={(e) => update({ idOrDob: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Home or temporary address"
            value={form.homeAddress} onChange={(e) => update({ homeAddress: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Contact number (optional)"
            value={form.contactNumber} onChange={(e) => update({ contactNumber: e.target.value })} />
        </div>
      ),
    },
    {
      label: "About the respondent",
      render: () => (
        <div className="flex flex-col gap-3">
          <input className="border p-2 rounded" placeholder="Respondent's full name"
            value={form.respondentName} onChange={(e) => update({ respondentName: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Your relationship to them"
            value={form.relationship} onChange={(e) => update({ relationship: e.target.value })} />
        </div>
      ),
    },
    {
      label: "What happened",
      render: () => (
        <div className="flex flex-col gap-3">
          <textarea className="border p-2 rounded h-32" placeholder="Briefly describe the incident(s). You will expand on this in person at court \u2014 this is just a starting summary."
            value={form.incidentSummary} onChange={(e) => update({ incidentSummary: e.target.value })} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.wantsCounsellorToApply}
              onChange={(e) => update({ wantsCounsellorToApply: e.target.checked })} />
            I would like a CounselEase counsellor to apply on my behalf (Form 7)
          </label>
        </div>
      ),
    },
  ];

  if (done) {
    return (
      <main className="max-w-xl mx-auto p-6 print:p-0">
        <h1 className="text-xl font-bold mb-4" style={{ color: "#00311E" }}>
          Summary for your court visit
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          This is not a court filing. Print or screenshot this and bring it, along with your ID,
          to your nearest Magistrate&apos;s Court to complete Form 2/6 with a clerk of the court.
        </p>
        <dl className="text-sm space-y-2">
          <div><dt className="font-semibold">Full name</dt><dd>{form.fullName}</dd></div>
          <div><dt className="font-semibold">ID / DOB</dt><dd>{form.idOrDob}</dd></div>
          <div><dt className="font-semibold">Address</dt><dd>{form.homeAddress}</dd></div>
          <div><dt className="font-semibold">Contact</dt><dd>{form.contactNumber || "\u2014"}</dd></div>
          <div><dt className="font-semibold">Respondent</dt><dd>{form.respondentName}</dd></div>
          <div><dt className="font-semibold">Relationship</dt><dd>{form.relationship}</dd></div>
          <div><dt className="font-semibold">Summary of incident(s)</dt><dd>{form.incidentSummary}</dd></div>
          {form.wantsCounsellorToApply && (
            <div className="text-green-700">
              You've indicated you'd like a CounselEase counsellor to apply on your behalf via Form 7.
              Your counsellor will need your written consent at the time of application.
            </div>
          )}
        </dl>
        <button onClick={() => window.print()} className="mt-6 px-4 py-2 rounded text-white"
          style={{ backgroundColor: "#00311E" }}>
          Print / Save
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-2" style={{ color: "#00311E" }}>
        Prepare for a protection order
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        This helps you organise what you'll need. It does not submit anything, and no one else
        can see what you type here. Step {step + 1} of {steps.length}: {steps[step].label}
      </p>
      {steps[step].render()}
      <div className="flex justify-between mt-6">
        <button disabled={step === 0} onClick={() => setStep((s) => s - 1)}
          className="px-4 py-2 rounded border disabled:opacity-30">
          Back
        </button>
        <button
          onClick={() => (step === steps.length - 1 ? setDone(true) : setStep((s) => s + 1))}
          className="px-4 py-2 rounded text-white" style={{ backgroundColor: "#00311E" }}>
          {step === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </main>
  );
}
