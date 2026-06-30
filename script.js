
        // ============================================================
        //  1. YEAR
        // ============================================================
        document.getElementById('year').textContent = new Date().getFullYear();

        // ============================================================
        //  2. SMOOTH REVEAL
        // ============================================================
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

        // ============================================================
        //  3. STATS COUNTER
        // ============================================================
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.getAttribute('data-target'));
                    let count = 0;
                    const speed = target / 40;

                    const updateCount = () => {
                        count += speed;
                        if (count < target) {
                            counter.innerText = target % 1 === 0 ? Math.ceil(count) : count.toFixed(1);
                            setTimeout(updateCount, 30);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                    obs.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

        // ============================================================
        //  4. PORTFOLIO FILTER
        // ============================================================
        const buttons = document.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll('.portfolio-card');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                items.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // ============================================================
        //  5. CONTACT FORM — MAILTO (No third‑party)
        // ============================================================
        const RECIPIENT = 'vishalkumbharrr@gmail.com'; // ← change to your email

        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();

            // --- Gather fields ---
            const name = document.getElementById('userName').value.trim();
            const email = document.getElementById('userEmail').value.trim();
            const phone = document.getElementById('userPhone').value.trim();
            const message = document.getElementById('userMessage').value.trim();

            // --- Validate ---
            if (!name || !email || !phone || !message) {
                showToast('⚠️ Please fill in all required fields.', 'error');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('⚠️ Please enter a valid email address.', 'error');
                return;
            }
            if (!/^[\d\s\-\+\(\)]{7,20}$/.test(phone)) {
                showToast('⚠️ Please enter a valid phone number.', 'error');
                return;
            }

            // --- Build mailto link ---
            const subject = encodeURIComponent('New Contact from VK Digital');
            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone}\n\n` +
                `Message:\n${message}`
            );

            const mailtoLink = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;

            // --- Open email client ---
            window.location.href = mailtoLink;

            // --- Show success toast and reset form ---
            showToast('✅ Your email client has been opened. Please send the message.', 'success');
            this.reset();
        });

        // ============================================================
        //  6. TOAST NOTIFICATION
        // ============================================================
        function showToast(message, type = 'success') {
            const existing = document.querySelectorAll('.toast-custom');
            existing.forEach(t => t.remove());

            const toast = document.createElement('div');
            toast.className = `toast-custom ${type}`;
            toast.innerHTML = `
                    <div style="display:flex;align-items:center;gap:12px;">
                        <span style="font-size:1.2rem;">${type === 'success' ? '✅' : '❌'}</span>
                        <span>${message}</span>
                    </div>
                `;
            document.body.appendChild(toast);

            requestAnimationFrame(() => {
                toast.classList.add('show');
            });

            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 400);
            }, 5000);
        }

        // ============================================================
        //  7. FLOATING BUTTONS
        // ============================================================
        const PHONE = '919607177067'; // <-- Change to your phone number (with country code)

        document.getElementById('whatsappBtn').addEventListener('click', function(e) {
            e.preventDefault();
            window.open(`https://wa.me/${PHONE}`, '_blank');
        });

        document.getElementById('callBtn').addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `tel:+${PHONE}`;
        });

        // ============================================================
        //  8. NAVBAR SCROLL EFFECT
        // ============================================================
        const nav = document.getElementById('mainNav');
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        });
   