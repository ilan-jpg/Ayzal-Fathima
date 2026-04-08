document.addEventListener('DOMContentLoaded', () => {
    
  const apifyBtn = document.getElementById('apify-btn');
  const proposalSection = document.getElementById('proposal-section');
  const liveFeed = document.getElementById('live-feed');
  const engineStatus = document.getElementById('engine-status');
  
  const aiGenBtn = document.getElementById('ai-gen-btn');
  const customMsg = document.getElementById('custom-msg');
  const sendOutreachBtn = document.getElementById('send-outreach-btn');

  if (apifyBtn) {
    function addFeedItem(text, type) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second:'2-digit' });
      
      const li = document.createElement('li');
      li.className = `feed-item type-${type} reveal`;
      li.innerHTML = `
        <span class="time">${timeStr}</span>
        <span class="desc">${text}</span>
      `;
      liveFeed.prepend(li);
    }

    apifyBtn.addEventListener('click', () => {
      liveFeed.innerHTML = ''; // clear feed
      
      apifyBtn.disabled = true;
      apifyBtn.innerHTML = 'Connecting to Apify...';
      apifyBtn.classList.remove('btn-outline');
      apifyBtn.style.background = 'rgba(255,255,255,0.05)';
      
      engineStatus.textContent = 'Scraping';
      engineStatus.className = 'badge green';

      addFeedItem('Initializing Apify Web Scraper...', 'info');
      
      setTimeout(() => { addFeedItem('Bypassing captchas and proxy rotation...', 'info'); }, 800);
      setTimeout(() => { addFeedItem('Extracting WhatsApp & Instagram handles...', 'found'); }, 1800);
      setTimeout(() => { addFeedItem('Verifying contact details against parameters...', 'info'); }, 2800);
      
      setTimeout(() => {
        addFeedItem('SUCCESS: Scraped 100 potential quality leads.', 'found');
        engineStatus.textContent = 'Awaiting Proposal';
        engineStatus.className = 'badge';
        
        // Hide the scrape button and show proposal section
        apifyBtn.style.display = 'none';
        proposalSection.style.display = 'block';
      }, 4000);
    });

    aiGenBtn.addEventListener('click', () => {
      customMsg.value = "Hi there! 👋 I noticed your recent activity and incredible growth. Our agency helps businesses like yours acquire clients on autopilot without manual outreach. Do you have a quick moment this week to discuss a custom acquisition system for your team?";
      
      addFeedItem('✨ AI dynamically generated highly-converting proposal text.', 'found');
    });

    sendOutreachBtn.addEventListener('click', () => {
      if(!customMsg.value.trim()) {
        alert('Please enter a proposal or use the AI Auto-Generate feature!');
        return;
      }
      
      // Hide proposal UI to show progress
      proposalSection.innerHTML = '<h3 class="text-center" style="margin-top:40px;">Deploying to Backend... <br> <small style="font-size:0.8rem;font-weight:normal;color:#888;">Check engine feed</small></h3>';
      
      engineStatus.textContent = 'Deploying';
      engineStatus.className = 'badge green';
      addFeedItem('Transferring payload to backend worker sequence...', 'info');
      
      let count = 1;
      const sendInterval = setInterval(() => {
        if(count <= 6) { // Simulate first few sent out of 100
          const targets = ['Insta DM', 'WhatsApp'];
          const target = targets[Math.floor(Math.random() * targets.length)];
          addFeedItem(`[${count}/100] Proposal shipped via ${target}`, 'sent');
          count++;
        } else {
          clearInterval(sendInterval);
          addFeedItem('Backend is now handling the remaining 94 deployments autonomously.', 'info');
          engineStatus.textContent = 'Campaign Live';
        }
      }, 800);
    });
  }

});
