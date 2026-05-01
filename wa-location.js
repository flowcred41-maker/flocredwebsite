// FLOCRED — Smart WhatsApp with auto-location detection
// When customer clicks any WA link, we try to get their location
// and include it in the WhatsApp message pre-fill

window.FC_WA = {
  // Build WhatsApp URL with location pre-filled
  openWithLocation: function(source, loanType) {
    source = source || 'website';
    loanType = loanType || '';
    
    // Try browser geolocation first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          // Got coordinates — reverse geocode using free API
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          
          // Use Nominatim (free, no key needed)
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
            .then(r => r.json())
            .then(data => {
              const suburb = data.address?.suburb || data.address?.neighbourhood || '';
              const city = data.address?.city || data.address?.town || data.address?.county || 'Delhi NCR';
              const state = data.address?.state || '';
              const locationStr = suburb ? `${suburb}, ${city}` : city;
              
              const msg = `Hi ARIA 👋\n\nI'm from *${locationStr}*${loanType ? ` and need a *${loanType}*` : ''}.\n\nSource: ${source}`;
              window.open(`https://wa.me/919319369315?text=${encodeURIComponent(msg)}`, '_blank');
              
              // Also fire dataLayer event with location
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: 'wa_click_with_location',
                source: source,
                city: city,
                suburb: suburb,
                loan_type: loanType
              });
            })
            .catch(() => FC_WA._openFallback(source, loanType));
        },
        function() {
          // Permission denied or error — use fallback with location request in message
          FC_WA._openFallback(source, loanType);
        },
        { timeout: 5000, maximumAge: 300000 }
      );
    } else {
      FC_WA._openFallback(source, loanType);
    }
  },

  _openFallback: function(source, loanType) {
    // Ask customer to share location in the message
    const msg = `Hi ARIA 👋${loanType ? `\n\nI need a *${loanType}*.` : ''}\n\n📍 Please tap the 📎 attachment icon and select *Location* to share where you are — ARIA gives better advice with your location.\n\nSource: ${source}`;
    window.open(`https://wa.me/919319369315?text=${encodeURIComponent(msg)}`, '_blank');
  }
};

// Intercept all WA links on page and enhance them
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href*="wa.me/919319369315"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Detect loan type from page URL
      const path = window.location.pathname;
      let loanType = '';
      if (path.includes('personal-loan')) loanType = 'Personal Loan';
      else if (path.includes('home-loan')) loanType = 'Home Loan';
      else if (path.includes('business-loan')) loanType = 'Business Loan';
      else if (path.includes('car-loan')) loanType = 'Car Loan';
      else if (path.includes('holiday-in-emi')) loanType = 'Holiday in EMI';
      else if (path.includes('equity-shield')) loanType = 'Equity Shield';
      else if (path.includes('nri-loans')) loanType = 'NRI Loan';
      else if (path.includes('cibil')) loanType = 'CIBIL Score Help';
      
      // Get source from link context
      const source = link.dataset.source || link.closest('[data-source]')?.dataset.source || 'website';
      
      FC_WA.openWithLocation(source, loanType);
    });
  });
});
