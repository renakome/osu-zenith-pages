function showToast(message, type = 'error', duration = 5000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `alert ${getToastClass(type)} shadow-lg max-w-sm w-full mx-2 sm:mx-0`;

    const icon = getToastIcon(type);
    toast.innerHTML = `
        ${icon}
        <span class="flex-1">${message}</span>
        <div>
            <button class="btn btn-circle btn-ghost btn-sm" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
}

function getToastClass(type) {
    switch(type) {
        case 'success': return 'alert-success';
        case 'warning': return 'alert-warning';
        case 'info': return 'alert-info';
        case 'error':
        default: return 'alert-error';
    }
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return '<i class="fas fa-check-circle"></i>';
        case 'warning': return '<i class="fas fa-exclamation-triangle"></i>';
        case 'info': return '<i class="fas fa-info-circle"></i>';
        case 'error':
        default: return '<i class="fas fa-exclamation-circle"></i>';
    }
}

function logout() {
    apiRequest('/user/logout.php', { method: 'POST' })
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch(err => {
            showToast('Error logging out', 'error');
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const success = urlParams.get('success');
    const warning = urlParams.get('warning');
    const info = urlParams.get('info');

    if (error) showToast(decodeURIComponent(error), 'error');
    if (success) showToast(decodeURIComponent(success), 'success');
    if (warning) showToast(decodeURIComponent(warning), 'warning');
    if (info) showToast(decodeURIComponent(info), 'info');
});

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }

    @media (max-width: 640px) {
        .toast {
            position: fixed !important;
            top: 20px !important;
            left: 20px !important;
            right: 20px !important;
            width: auto !important;
            max-width: none !important;
            transform: none !important;
        }

        .toast > * {
            width: 100%;
            margin: 0 0 10px 0;
        }

        #toast-container {
            width: 100%;
            max-width: none;
        }
    }

    .dropdown-content {
        display: none;
    }

    .dropdown:focus-within .dropdown-content,
    .dropdown:has(input:checked) .dropdown-content {
        display: block;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.dropdown-content a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const openDropdowns = document.querySelectorAll('.dropdown:focus-within');
            openDropdowns.forEach(dropdown => {
                dropdown.blur();
            });
        });
    });

    document.addEventListener('click', function(event) {
        const dropdown = event.target.closest('.dropdown');
        const isDropdownButton = event.target.closest('.dropdown > div[tabindex]');

        if (!dropdown && !isDropdownButton) {
            const openDropdowns = document.querySelectorAll('.dropdown:focus-within');
            openDropdowns.forEach(d => d.blur());
        }
    });
});

