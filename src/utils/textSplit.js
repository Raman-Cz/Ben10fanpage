export function splitTextIntoWords(element) {
  if (!element) return [];
  
  const words = [];
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  let currentParent = null;
  let wordIndex = 0;
  
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.textContent;
    const parent = node.parentNode;
    
    if (parent === currentParent) {
      wordIndex++;
    } else {
      currentParent = parent;
      wordIndex = 0;
    }
    
    if (text.trim()) {
      const wordElements = text.split(/(\s+)/).map((part) => {
        if (part.match(/^\s+$/)) {
          return part;
        }
        
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = part;
        return span;
      });
      
      words.push({
        element: node,
        parent: parent,
        wordElements,
        wordIndex: wordIndex
      });
    }
  }
  
  return words;
}

export function wrapWordsInSpan(element, className = "word") {
  if (!element) return;
  
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  const nodesToReplace = [];
  
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.textContent.trim()) {
      nodesToReplace.push(node);
    }
  }
  
  nodesToReplace.forEach((node) => {
    const fragment = document.createDocumentFragment();
    const text = node.textContent;
    
    text.split(/(\s+)/).forEach((part) => {
      if (part.match(/^\s+$/)) {
        fragment.appendChild(document.createTextNode(part));
      } else {
        const span = document.createElement("span");
        span.className = className;
        span.textContent = part;
        fragment.appendChild(span);
      }
    });
    
    node.parentNode.replaceChild(fragment, node);
  });
}

export function splitHeadingWords(heading) {
  if (!heading) return;
  
  const text = heading.textContent;
  heading.innerHTML = "";
  
  text.split(/(\s+)/).forEach((part) => {
    if (part.match(/^\s+$/)) {
      heading.appendChild(document.createTextNode(part));
    } else {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = part;
      heading.appendChild(span);
    }
  });
}