// ========== 1. YEAR ==========
document.getElementById('year').textContent = new Date().getFullYear();

// ========== 2. SMOOTH REVEAL ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

// ========== 3. STATS COUNTER ==========
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

// ========== 4. PORTFOLIO FILTER ==========
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

// =====================================================
// ========== 5. CONTACT FORM (Formspree) =============
// =====================================================

// 🔥 YAHAN APNI FORMPREE ID DAALEIN (SIRF YAHI EK JAGAH CHANGE KARNA HAI)
const FORMSPREE_ID = 'vishalkumbharrr@gmail.com'; // <-- Apni ID yahan paste karein

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const btn = document.getElementById('submitBtn');
    const originalText = btn.innerHTML;

    // --- Validation ---
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const message = document.getElementById('userMessage').value.trim();

    if (!name || !email || !phone || !message) {
        showToast('⚠️ Please fill in all required fields.', 'error');
        return;
    }

    // Email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('⚠️ Please enter a valid email address.', 'error');
        return;
    }

    // Phone format check (basic)
    if (!/^[\d\s\-\+\(\)]{7,20}$/.test(phone)) {
        showToast('⚠️ Please enter a valid phone number.', 'error');
        return;
    }

    // --- Prepare Data ---
    const formData = new FormData(form);
    // Formspree expects these field names: name, email, message
    // We're using name="name", name="email", name="message" in HTML

    try {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showToast('✅ Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
            form.reset();
        } else {
            const errorData = await response.json();
            showToast('❌ ' + (errorData.error || 'Something went wrong. Please try again.'), 'error');
        }
    } catch (error) {
        showToast('❌ Network error. Please check your internet connection.', 'error');
        console.error('Form submission error:', error);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
});

// =====================================================
// ========== 6. TOAST NOTIFICATION SYSTEM =============
// =====================================================

function showToast(message, type = 'success') {
    // Remove existing toasts
    const existing = document.querySelectorAll('.toast-custom');
    existing.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast-custom ${type}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 99999;
        background: #1f2833;
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 14px;
        padding: 16px 24px;
        color: white;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0,0,0,0.6);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1.2);
        max-width: 420px;
        backdrop-filter: blur(20px);
        background: rgba(31, 40, 51, 0.95);
        border-left: 4px solid ${type === 'success' ? '#2ecc71' : '#e74c3c'};
    `;

    const icon = type === 'success' ? '✅' : '❌';
    toast.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-size:1.2rem;">${icon}</span>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(toast);

    // Show with animation
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 5000);
}

// ===== FLOATING BUTTONS =====
const PHONE_NUMBER = '919607177067'; // <-- Apna number daalein (country code + number, 91 ke baad 10 digit)

document.getElementById('whatsappBtn').addEventListener('click', function(e) {
    e.preventDefault();
    window.open(`https://wa.me/${919607177067}`, '_blank');
});

document.getElementById('callBtn').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = `tel:+${PHONE_NUMBER}`;
});