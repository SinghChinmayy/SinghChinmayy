// Search bar, autocomplete, and modal logic for footer and mobile
// Requires Lunr.js to be loaded before this script

(function() {
  // Add SNS entries to the search index
  const snsDocs = [
    { title: 'Email', url: 'mailto:hello@chinmaysingh.me', content: 'Contact Chinmay Singh by email', type: 'SNS' },
    { title: 'LinkedIn', url: 'https://linkedin.com/in/singhchinmay', content: 'Chinmay Singh on LinkedIn', type: 'SNS' },
    { title: 'GitHub', url: 'https://github.com/SinghChinmayy', content: 'Chinmay Singh on GitHub', type: 'SNS' },
    { title: 'Instagram', url: 'https://www.instagram.com/singhchinmayy/', content: 'Chinmay Singh on Instagram', type: 'SNS' }
  ];
  let idx = null;
  let documents = [];
  let filteredDocs = [];
  let selectedIdx = -1;
  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      documents = data.concat(snsDocs);
      idx = lunr(function () {
        this.ref('url');
        this.field('title', { boost: 10 });
        this.field('content');
        this.field('type');
        this.field('tags');
        this.field('categories');
        documents.forEach(function (doc) {
          this.add(doc);
        }, this);
      });
    });
  var input = document.getElementById('footer-search-input');
  var resultsContainer = document.getElementById('footer-results-container');
  var clearBtn = document.getElementById('footer-search-clear');
  function renderResults(results) {
    resultsContainer.innerHTML = '';
    if (!results || results.length === 0) {
      resultsContainer.innerHTML = '<li style="color:#888; padding:0.5em;">No results found.</li>';
      return;
    }
    results.slice(0, 7).forEach((result, i) => {
      const doc = documents.find(d => d.url === result.ref);
      let typeLabel = '';
      if (doc.type === 'Blog') typeLabel = '<span style="color:#8b4513; font-size:0.95em;">[Blog]</span>';
      else if (doc.type === 'SNS') typeLabel = '<span style="color:#b8860b; font-size:0.95em;">[SNS]</span>';
      const snippet = doc.content.length > 60 ? doc.content.substring(0, 60) + '...' : doc.content;
      resultsContainer.innerHTML += `<li class="footer-search-result${i === selectedIdx ? ' selected' : ''}" tabindex="-1" style="padding:0.5em 0.7em; border-bottom:1px dotted #d1bfa3; background:${i === selectedIdx ? '#f5ecd7' : 'none'};"><a href="${doc.url}" style="font-weight:600; color:#1565c0; text-decoration:underline;">${doc.title}</a> ${typeLabel}<br><span style="color:#555; font-size:0.98em;">${snippet}</span></li>`;
    });
  }
  function doSearch(query) {
    if (!idx || !query) {
      resultsContainer.innerHTML = '';
      filteredDocs = [];
      selectedIdx = -1;
      return;
    }
    // Always do fuzzy search, even for single character
    const fuzzyQuery = query.split(/\s+/).map(w => w + '~1').join(' ');
    const results = idx.search(fuzzyQuery);
    filteredDocs = results;
    selectedIdx = -1;
    renderResults(results);
  }
  if (input) {
    input.addEventListener('input', function(e) {
      doSearch(e.target.value);
      clearBtn.style.display = e.target.value ? 'block' : 'none';
    });
    input.addEventListener('focus', function() {
      if (input.value) clearBtn.style.display = 'block';
    });
    input.addEventListener('blur', function() {
      setTimeout(() => { clearBtn.style.display = 'none'; }, 200);
    });
    clearBtn.addEventListener('click', function() {
      input.value = '';
      clearBtn.style.display = 'none';
      resultsContainer.innerHTML = '';
      input.focus();
    });
    // Keyboard navigation
    input.addEventListener('keydown', function(e) {
      const resultsList = resultsContainer.querySelectorAll('.footer-search-result');
      if (!resultsList.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIdx = (selectedIdx + 1) % resultsList.length;
        renderResults(filteredDocs);
        resultsList[selectedIdx].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIdx = (selectedIdx - 1 + resultsList.length) % resultsList.length;
        renderResults(filteredDocs);
        resultsList[selectedIdx].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        if (selectedIdx >= 0 && resultsList[selectedIdx]) {
          const link = resultsList[selectedIdx].querySelector('a');
          if (link) link.click();
        }
      }
    });
  }
  // Ctrl+K to focus search bar
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });
  // Touch-friendly: increase tap area
  if (clearBtn) {
    clearBtn.style.touchAction = 'manipulation';
  }
  // Mobile modal logic
  var isMobile = window.matchMedia('(max-width: 900px)').matches;
  var footerInput = document.getElementById('footer-search-input');
  var footerClear = document.getElementById('footer-search-clear');
  var footerAutocomplete = document.getElementById('footer-autocomplete');
  var footerResults = document.getElementById('footer-results-container');
  var modal = document.getElementById('mobile-search-modal');
  var modalInput = document.getElementById('mobile-search-input');
  var modalClear = document.getElementById('mobile-search-clear');
  var modalAutocomplete = document.getElementById('mobile-autocomplete');
  var modalResults = document.getElementById('mobile-results-container');
  var modalClose = document.getElementById('mobile-search-close');
  // Show modal on mobile focus
  if (footerInput && isMobile) {
    footerInput.addEventListener('focus', function(e) {
      setTimeout(function() {
        modal.style.display = 'flex';
        modalInput.value = '';
        modalResults.innerHTML = '';
        modalAutocomplete.innerHTML = '';
        modalInput.focus();
      }, 100);
      setTimeout(function() { footerInput.blur(); }, 200);
    });
  }
  // Modal close logic
  if (modalClose) {
    modalClose.addEventListener('click', function() {
      modal.style.display = 'none';
      footerInput.blur();
    });
  }
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        footerInput.blur();
      }
    });
  }
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex' && e.key === 'Escape') {
      modal.style.display = 'none';
      footerInput.blur();
    }
  });
  // Mobile search logic (reuse desktop logic, but for modal elements)
  function renderMobileResults(results) {
    modalResults.innerHTML = '';
    if (!results || results.length === 0) {
      modalResults.innerHTML = '<li style="color:#888; padding:0.5em;">No results found.</li>';
      return;
    }
    results.slice(0, 7).forEach((result, i) => {
      const doc = documents.find(d => d.url === result.ref);
      let typeLabel = '';
      if (doc.type === 'Blog') typeLabel = '<span style="color:#8b4513; font-size:0.95em;">[Blog]</span>';
      else if (doc.type === 'SNS') typeLabel = '<span style="color:#b8860b; font-size:0.95em;">[SNS]</span>';
      const snippet = doc.content.length > 60 ? doc.content.substring(0, 60) + '...' : doc.content;
      modalResults.innerHTML += `<li class="footer-search-result" tabindex="-1" style="padding:0.5em 0.7em; border-bottom:1px dotted #d1bfa3;"><a href="${doc.url}" style="font-weight:600; color:#1565c0; text-decoration:underline;">${doc.title}</a> ${typeLabel}<br><span style="color:#555; font-size:0.98em;">${snippet}</span></li>`;
    });
  }
  function showMobileAutocomplete(query) {
    if (!query || !documents.length) {
      modalAutocomplete.style.display = 'none';
      modalAutocomplete.innerHTML = '';
      return;
    }
    const q = query.toLowerCase();
    // Debug logging
    console.log('Query:', q, 'Documents:', documents.map(d => d.title));
    // Prefix matches first, then substring matches
    const startsWith = documents.filter(d => d.title && d.title.toLowerCase().startsWith(q));
    const contains = documents.filter(d => d.title && !d.title.toLowerCase().startsWith(q) && d.title.toLowerCase().includes(q));
    const suggestions = startsWith.concat(contains).slice(0, 5);
    if (!suggestions.length) {
      modalAutocomplete.style.display = 'none';
      modalAutocomplete.innerHTML = '';
      return;
    }
    modalAutocomplete.innerHTML = suggestions.map((d, i) => `<li class="footer-autocomplete-item" data-title="${d.title.replace(/"/g, '&quot;')}" tabindex="0" style="padding:0.4em 0.7em; border-bottom:1px dotted #d1bfa3; background:#f5ecd7; cursor:pointer;${i===0?'font-weight:bold;':''}">${d.title}</li>`).join('');
    modalAutocomplete.style.display = 'block';
  }
  function doMobileSearch(query) {
    if (!idx || !query) {
      modalResults.innerHTML = '';
      return;
    }
    // Always do fuzzy search, even for single character
    const fuzzyQuery = query.split(/\s+/).map(w => w + '~1').join(' ');
    const results = idx.search(fuzzyQuery);
    renderMobileResults(results);
  }
  if (modalInput) {
    modalInput.addEventListener('input', function(e) {
      doMobileSearch(e.target.value);
      modalClear.style.display = e.target.value ? 'block' : 'none';
      showMobileAutocomplete(e.target.value);
    });
    modalInput.addEventListener('focus', function() {
      if (modalInput.value) modalClear.style.display = 'block';
      showMobileAutocomplete(modalInput.value);
    });
    modalInput.addEventListener('blur', function() {
      setTimeout(() => { modalClear.style.display = 'none'; modalAutocomplete.style.display = 'none'; }, 200);
    });
    modalClear.addEventListener('click', function() {
      modalInput.value = '';
      modalClear.style.display = 'none';
      modalResults.innerHTML = '';
      modalAutocomplete.style.display = 'none';
      modalInput.focus();
    });
    // Keyboard navigation for autocomplete
    modalInput.addEventListener('keydown', function(e) {
      const acItems = modalAutocomplete.querySelectorAll('.footer-autocomplete-item');
      if (modalAutocomplete.style.display === 'block' && acItems.length) {
        let idx = Array.from(acItems).findIndex(item => item === document.activeElement);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (idx < acItems.length - 1) acItems[idx+1].focus();
          else acItems[0].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (idx > 0) acItems[idx-1].focus();
          else acItems[acItems.length-1].focus();
        } else if (e.key === 'Enter') {
          if (idx >= 0) {
            modalInput.value = acItems[idx].dataset.title;
            modalAutocomplete.style.display = 'none';
            doMobileSearch(modalInput.value);
            modalInput.focus();
          }
        }
      }
    });
    modalAutocomplete.addEventListener('mousedown', function(e) {
      if (e.target.classList.contains('footer-autocomplete-item')) {
        modalInput.value = e.target.dataset.title;
        modalAutocomplete.style.display = 'none';
        doMobileSearch(modalInput.value);
        modalInput.focus();
      }
    });
  }
  // End mobile modal logic
})(); 