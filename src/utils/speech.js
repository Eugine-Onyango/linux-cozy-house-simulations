// Speech synthesis helper for reading questions and choices aloud
export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.log('Speech cancel error:', e);
    }
  }
}

export function speakQuestionWithOptions(questionText, options, onEndCallback) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  stopSpeech();

  // Build clean spoken text: question + options (A, B, C, D) without correct answer revelation
  let speechText = `Question: ${questionText}. `;
  if (Array.isArray(options) && options.length > 0) {
    speechText += 'Options are: ';
    options.forEach((opt, idx) => {
      const letter = String.fromCharCode(65 + idx);
      const text = typeof opt === 'string' ? opt : (opt?.text || '');
      speechText += `Option ${letter}: ${text}. `;
    });
  }

  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.rate = 0.95; // Slightly measured, friendly and clear
  utterance.pitch = 1.0;
  utterance.lang = 'en-US';

  // Try to pick a natural English voice if available
  try {
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Online')));
      if (preferred) {
        utterance.voice = preferred;
      }
    }
  } catch (e) {}

  if (typeof onEndCallback === 'function') {
    utterance.onend = () => onEndCallback();
    utterance.onerror = () => onEndCallback();
  }

  try {
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (e) {
    console.log('Speech error:', e);
    return false;
  }
}
