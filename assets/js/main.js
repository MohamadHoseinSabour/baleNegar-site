document.addEventListener('DOMContentLoaded', () => {
  // --- CONSTANTS & MOCK DATA ---
  const mockVariables = {
    '{order_id}': '#4812',
    '{customer_name}': 'محمدحسین صبور',
    '{order_total}': '۴۸۰,۰۰۰',
    '{items_list}': '\n  - افزونه بله‌نگار (۱ عدد)\n  - لایسنس طلایی (۱ عدد)',
    '{comment_author}': 'مریم حسینی',
    '{comment_content}': 'آیا این افزونه با پی‌اچ‌پی نسخه ۸.۲ سازگار است؟ من روی هاست اختصاصی تست کردم.',
    '{post_title}': 'چگونه هزینه‌های فروشگاه ووکامرس خود را کاهش دهیم؟',
    '{product_name}': 'افزونه هوشمند بله‌نگار نسخه حرفه‌ای',
    '{stock_qty}': '۳ عدد',
    '{backup_time}': 'امروز ساعت ۰۴:۱۵ صبح',
    '{backup_size}': '۱۲۴ مگابایت',
  };

  const defaultTemplates = {
    orders: '🛍️ سفارش جدید ثبت شد!\n\n🔹 شماره سفارش: {order_id}\n👤 خریدار: {customer_name}\n💵 مبلغ پرداختی: {order_total} تومان\n📦 اقلام سبد خرید: {items_list}\n\n✅ وضعیت: پرداخت موفق',
    comments: '💬 دیدگاه جدید منتظر تایید!\n\n✍️ نویسنده: {comment_author}\n📝 متن دیدگاه: {comment_content}\n\n📖 در نوشته: {post_title}',
    stock: '⚠️ هشدار کمبود موجودی در انبار!\n\n📦 محصول: {product_name}\n🚨 موجودی باقی‌مانده: {stock_qty} (کمتر از آستانه مجاز)',
    backup: '💾 گزارش عملیات پشتیبان‌گیری:\n\n✅ فایل پشتیبان سایت با موفقیت ایجاد و ذخیره شد.\n⏱️ زمان: {backup_time}\n📂 حجم فایل: {backup_size}\n🔌 افزونه پشتیبان‌ساز: UpdraftPlus'
  };

  // --- STICKY HEADER & MOBILE MENU ---
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all open items
      faqItems.forEach(i => i.classList.remove('open'));
      
      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // --- CHAT SIMULATOR LOGIC (MOBILE MOCKUP) ---
  const chatArea = document.getElementById('chat-simulator-area');
  const typingIndicator = document.getElementById('simulator-typing');
  const controlCards = document.querySelectorAll('.control-card');

  // Simulator scenarios
  const scenarios = {
    orders: {
      message: '🛍️ سفارش جدید ثبت شد!\n\n🔹 شماره سفارش: #4812\n👤 خریدار: محمدحسین صبور\n💵 مبلغ پرداختی: ۴۸۰,۰۰۰ تومان\n📦 اقلام سبد خرید: \n  - افزونه بله‌نگار (۱ عدد)\n  - لایسنس طلایی (۱ عدد)\n\n✅ وضعیت: پرداخت موفق',
      buttons: [
        { text: '⏳ در حال پردازش', action: 'processing' },
        { text: '✅ تکمیل سفارش', action: 'complete' },
        { text: '📝 ثبت یادداشت', action: 'note' }
      ]
    },
    comments: {
      message: '💬 دیدگاه جدید منتظر تایید!\n\n✍️ نویسنده: مریم حسینی (m.hoseini@gmail.com)\n📝 متن دیدگاه:\n"آیا این افزونه با پی‌اچ‌پی نسخه ۸.۲ سازگار است؟ من روی هاست اختصاصی تست کردم."\n\n📖 در نوشته: چگونه هزینه‌های ووکامرس را کاهش دهیم؟',
      buttons: [
        { text: '✅ تایید دیدگاه', action: 'approve-comment' },
        { text: '🗑️ انتقال به زباله‌دان', action: 'trash-comment' },
        { text: '✍️ پاسخ سریع', action: 'reply-comment' }
      ]
    },
    stock: {
      message: '⚠️ هشدار کمبود موجودی در انبار!\n\n📦 محصول: افزونه هوشمند بله‌نگار نسخه حرفه‌ای\n🚨 موجودی باقی‌مانده: ۳ عدد (کمتر از آستانه مجاز ۵ عدد)\n\n🔔 لطفاً نسبت به شارژ انبار اقدام کنید.',
      buttons: [
        { text: '🔗 ویرایش محصول', action: 'edit-product' },
        { text: '🔄 بررسی مجدد', action: 'check-stock' }
      ]
    },
    backup: {
      message: '💾 گزارش عملیات پشتیبان‌گیری:\n\n✅ فایل پشتیبان سایت با موفقیت ایجاد و به گوگل درایو متصل شد.\n⏱️ زمان: امروز ساعت ۰۴:۱۵ صبح\n📂 حجم فایل: ۱۲۴ مگابایت\n🔌 افزونه پشتیبان‌ساز: UpdraftPlus',
      buttons: [
        { text: '📥 دانلود گزارش خطا', action: 'download-log' },
        { text: '⚙️ تنظیمات بکاپ', action: 'backup-settings' }
      ]
    }
  };

  function formatMessageText(text) {
    return text.replace(/\n/g, '<br>');
  }

  function showMessage(key) {
    // Show typing indicator
    chatArea.appendChild(typingIndicator);
    typingIndicator.style.display = 'flex';
    chatArea.scrollTop = chatArea.scrollHeight;

    setTimeout(() => {
      // Hide typing indicator
      typingIndicator.style.display = 'none';
      
      const scenario = scenarios[key];
      
      // Create message bubble element
      const bubble = document.createElement('div');
      bubble.className = 'message-bubble message-received';
      
      const content = document.createElement('div');
      content.innerHTML = formatMessageText(scenario.message);
      bubble.appendChild(content);

      // Create inline keyboard
      if (scenario.buttons && scenario.buttons.length > 0) {
        const keyboard = document.createElement('div');
        keyboard.className = 'inline-keyboard';
        
        scenario.buttons.forEach(btn => {
          const button = document.createElement('button');
          button.className = 'inline-btn';
          button.innerText = btn.text;
          button.dataset.action = btn.action;
          
          button.addEventListener('click', (e) => {
            handleInlineAction(e.target, btn.action);
          });
          
          keyboard.appendChild(button);
        });
        
        bubble.appendChild(keyboard);
      }

      // Add time
      const timeSpan = document.createElement('span');
      timeSpan.className = 'message-time';
      const now = new Date();
      timeSpan.innerText = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      bubble.appendChild(timeSpan);

      // Append bubble to chat area
      chatArea.appendChild(bubble);
      chatArea.scrollTop = chatArea.scrollHeight;
    }, 1000);
  }

  function handleInlineAction(buttonElement, action) {
    if (buttonElement.classList.contains('inline-btn-clicked')) return;

    const originalText = buttonElement.innerText;
    buttonElement.innerHTML = '⌛ ...';
    buttonElement.style.pointerEvents = 'none';

    setTimeout(() => {
      buttonElement.innerHTML = '✓ انجام شد';
      buttonElement.className = 'inline-btn inline-btn-clicked';
      
      // Add response message from System/User in chat
      const responseBubble = document.createElement('div');
      responseBubble.className = 'message-bubble message-sent';
      
      let replyText = '';
      switch (action) {
        case 'processing':
          replyText = 'وضعیت سفارش به «در حال پردازش» تغییر یافت. ⏳';
          break;
        case 'complete':
          replyText = 'سفارش تکمیل شد! پیامک تکمیل ارسال گردید. ✅';
          break;
        case 'note':
          replyText = 'یادداشت جدید به سفارش ووکامرس اضافه شد. 📝';
          break;
        case 'approve-comment':
          replyText = 'دیدگاه مریم حسینی با موفقیت تایید و در سایت منتشر شد. 💬';
          break;
        case 'trash-comment':
          replyText = 'دیدگاه به زباله‌دان وردپرس منتقل شد. 🗑️';
          break;
        case 'reply-comment':
          replyText = 'پاسخ مدیر سایت: "سلام، بله کاملا سازگار است." ارسال و ثبت شد. ✍️';
          break;
        case 'edit-product':
          replyText = 'هدایت به صفحه ویرایش محصول در وردپرس... 🔗';
          break;
        case 'check-stock':
          replyText = 'موجودی انبار بررسی شد. وضعیت محصول: در حال فروش. 🔄';
          break;
        case 'download-log':
          replyText = 'فایل لاگ بکاپ‌های موفق در قالب فایل zip دانلود شد. 📥';
          break;
        case 'backup-settings':
          replyText = 'هدایت به بخش پیکربندی افزونه پشتیبان‌گیر سایت... ⚙️';
          break;
        default:
          replyText = 'عملیات با موفقیت انجام شد. 🌟';
      }

      responseBubble.innerHTML = `<div>${replyText}</div>`;
      
      const timeSpan = document.createElement('span');
      timeSpan.className = 'message-time';
      const now = new Date();
      timeSpan.innerText = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      responseBubble.appendChild(timeSpan);

      chatArea.appendChild(responseBubble);
      chatArea.scrollTop = chatArea.scrollHeight;
    }, 800);
  }

  let hasAnimatedChatSimulator = false;

  // Handle sidebar control card clicks
  controlCards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('active')) return;
      
      hasAnimatedChatSimulator = true;

      controlCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const scenarioKey = card.dataset.scenario;
      
      // Clear previous chats (except header elements if any, keep simulator-typing element)
      chatArea.innerHTML = '';
      chatArea.appendChild(typingIndicator);
      
      showMessage(scenarioKey);
    });
  });

  // Load first scenario (orders) when the simulator section is scrolled into view
  const simulatorSection = document.getElementById('simulator');
  const chatSimulatorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimatedChatSimulator) {
        hasAnimatedChatSimulator = true;
        showMessage('orders');
        chatSimulatorObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  if (simulatorSection) {
    chatSimulatorObserver.observe(simulatorSection);
  }

  // --- ADMIN PANEL SIMULATOR (TEMPLATE EDITOR) ---
  const adminTabs = document.querySelectorAll('.admin-tab');
  const adminTextarea = document.getElementById('admin-textarea');
  const variableChips = document.querySelectorAll('.variable-chip');
  const livePreviewMessage = document.getElementById('admin-live-preview-message');
  
  const adminPreviewContainer = document.getElementById('admin-preview-container');
  const adminPreviewBubble = document.getElementById('admin-preview-bubble');
  const adminPreviewTyping = document.getElementById('admin-preview-typing');
  let hasAnimatedAdminPreview = false;

  let activeTemplateKey = 'orders';

  function showAdminBubbleImmediately() {
    if (hasAnimatedAdminPreview) return;
    hasAnimatedAdminPreview = true;
    if (adminPreviewTyping) adminPreviewTyping.style.display = 'none';
    if (adminPreviewBubble) adminPreviewBubble.style.display = 'block';
  }

  function updateLivePreview() {
    let templateText = adminTextarea.value;
    
    // Replace all placeholders with sample mock data
    Object.keys(mockVariables).forEach(placeholder => {
      const regex = new RegExp(placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
      templateText = templateText.replace(regex, mockVariables[placeholder]);
    });

    livePreviewMessage.innerHTML = formatMessageText(templateText);
  }

  // Handle Tab Switch
  adminTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      showAdminBubbleImmediately();
      
      adminTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      activeTemplateKey = tab.dataset.tab;
      adminTextarea.value = defaultTemplates[activeTemplateKey];
      
      // Toggle visible variable chips based on selected tab
      variableChips.forEach(chip => {
        const allowedTabs = chip.dataset.tabs.split(',');
        if (allowedTabs.includes(activeTemplateKey)) {
          chip.style.display = 'inline-flex';
        } else {
          chip.style.display = 'none';
        }
      });

      updateLivePreview();
    });
  });

  // Insert Variable at Cursor Position in Textarea
  variableChips.forEach(chip => {
    chip.addEventListener('click', () => {
      showAdminBubbleImmediately();
      
      const varName = chip.dataset.var;
      const startPos = adminTextarea.selectionStart;
      const endPos = adminTextarea.selectionEnd;
      const text = adminTextarea.value;

      adminTextarea.value = text.substring(0, startPos) + varName + text.substring(endPos, text.length);
      adminTextarea.focus();
      
      // Reset cursor position to right after the inserted variable
      const newCursorPos = startPos + varName.length;
      adminTextarea.setSelectionRange(newCursorPos, newCursorPos);

      updateLivePreview();
    });
  });

  // Update preview on typing
  adminTextarea.addEventListener('input', () => {
    showAdminBubbleImmediately();
    updateLivePreview();
  });

  // Initialize Admin Editor with Orders tab and preview
  adminTextarea.value = defaultTemplates.orders;
  updateLivePreview();

  // Live Preview Scroll Animation (Intersection Observer)
  const adminPreviewObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimatedAdminPreview) {
        hasAnimatedAdminPreview = true;
        
        // Show typing indicator
        if (adminPreviewTyping) adminPreviewTyping.style.display = 'flex';
        if (adminPreviewBubble) adminPreviewBubble.style.display = 'none';

        setTimeout(() => {
          if (adminPreviewTyping) adminPreviewTyping.style.display = 'none';
          if (adminPreviewBubble) adminPreviewBubble.style.display = 'block';
        }, 1200);

        adminPreviewObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  if (adminPreviewContainer) {
    adminPreviewObserver.observe(adminPreviewContainer);
  }

  // Highlight scroll animation (Intersection Observer for animated cards)
  const observeElements = document.querySelectorAll('.feature-card, .control-card, .spec-card, .comparison-table-container');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // --- CTA SAVINGS CALCULATOR ---
  const calcSlider = document.getElementById('calc-slider');
  const calcValDisplay = document.getElementById('calc-val-display');
  const calcSmsCost = document.getElementById('calc-sms-cost');
  const calcTotalSavings = document.getElementById('calc-total-savings');

  if (calcSlider) {
    const formatNumber = (num) => {
      // Format number to Persian numerals and add comma separators
      const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      const formattedNum = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return formattedNum.replace(/\d/g, d => persianDigits[parseInt(d)]);
    };

    const updateCalculator = () => {
      const val = parseInt(calcSlider.value);
      calcValDisplay.innerText = formatNumber(val) + ' پیام';

      // Assume 120 Tomans per SMS
      const smsCostMonthly = val * 120;
      const annualSavings = smsCostMonthly * 12;

      calcSmsCost.innerText = formatNumber(smsCostMonthly) + ' تومان';
      calcTotalSavings.innerText = formatNumber(annualSavings) + ' تومان';
    };

    calcSlider.addEventListener('input', updateCalculator);
    // Initialize calculator values
    updateCalculator();
  }
});
