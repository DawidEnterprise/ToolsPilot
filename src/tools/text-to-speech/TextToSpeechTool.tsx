"use client";
import { useState, useEffect } from "react";

export function TextToSpeechTool() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIdx, setVoiceIdx] = useState(0);
  const [rate, setRate] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const load = () => setVoices(speechSynthesis.getVoices());
    load();
    speechSynthesis.onvoiceschanged = load;
  }, []);

  const speak = () => {
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    if (voices[voiceIdx]) utter.voice = voices[voiceIdx];
    utter.rate = rate;
    utter.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utter);
  };

  const stop = () => { speechSynthesis.cancel(); setSpeaking(false); };

  return (
    <div className="space-y-4">
      <textarea className="textarea-field" placeholder="Enter text to speak..." value={text} onChange={e => setText(e.target.value)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Voice</label>
          <select className="input-field text-sm" value={voiceIdx} onChange={e => setVoiceIdx(+e.target.value)}>
            {voices.map((v, i) => <option key={i} value={i}>{v.name} ({v.lang})</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Speed: {rate}x</label>
          <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} className="w-full" />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={speak} className="btn-primary text-sm" disabled={!text || speaking}>Speak</button>
        <button onClick={stop} className="btn-secondary text-sm" disabled={!speaking}>Stop</button>
      </div>
    </div>
  );
}
