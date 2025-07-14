// Copy code button logic for code blocks

document.addEventListener('DOMContentLoaded', function() {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach(function(pre) {
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-btn';
    copyButton.textContent = 'Copy Code';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    // Insert button at the top of the code block
    pre.insertBefore(copyButton, pre.firstChild);
    // Add click event
    copyButton.addEventListener('click', function() {
      const code = pre.querySelector('code');
      const textToCopy = code ? code.textContent : pre.textContent;
      // Copy to clipboard
      navigator.clipboard.writeText(textToCopy).then(function() {
        // Change button text temporarily
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        // Reset after 2 seconds
        setTimeout(function() {
          copyButton.textContent = originalText;
          copyButton.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy: ', err);
        copyButton.textContent = 'Failed';
        setTimeout(function() {
          copyButton.textContent = 'Copy Code';
        }, 2000);
      });
    });
  });
}); 