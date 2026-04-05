export function splitCharsAndWords(element) {
  if (!element) return { chars: [], words: [] };

  const text = element.textContent.trim();
  element.innerHTML = "";
  element.style.display = "inline-block"; // Helps with layout
  
  const words = [];
  const chars = [];

  text.split(/(\s+)/).forEach((part) => {
    if (part.match(/^\s+$/)) {
      element.appendChild(document.createTextNode(part));
    } else {
      // Wrapper for overflow masking
      const maskWrap = document.createElement("span");
      maskWrap.className = "text-mask-wrap";
      maskWrap.style.display = "inline-block";
      maskWrap.style.overflow = "hidden";
      maskWrap.style.verticalAlign = "top";

      const wordSpan = document.createElement("span");
      wordSpan.className = "word-inner";
      wordSpan.style.display = "inline-block";
      wordSpan.style.willChange = "transform";
      
      // Also split into chars if needed
      part.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.style.display = "inline-block";
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
        chars.push(charSpan);
      });

      maskWrap.appendChild(wordSpan);
      element.appendChild(maskWrap);
      words.push(wordSpan);
    }
  });

  return { words, chars };
}

export function wrapWordsInSpan(element, className = "word") {
  if (!element) return;
  // Fallback for simple word split
  const text = element.textContent;
  element.innerHTML = "";
  text.split(/(\s+)/).forEach(part => {
    if (part.match(/^\s+$/)) {
       element.appendChild(document.createTextNode(part));
    } else {
      const span = document.createElement("span");
      span.className = className;
      span.style.display = "inline-block";
      span.textContent = part;
      element.appendChild(span);
    }
  });
}

export function splitHeadingWords(heading) {
  if (!heading) return;
  const { words } = splitCharsAndWords(heading);
  return words;
}