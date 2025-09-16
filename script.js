// Expense data
const expenseData = [
    { day: "mon", amount: 17.45 },
    { day: "tue", amount: 34.91 },
    { day: "wed", amount: 52.36 },
    { day: "thu", amount: 31.07 },
    { day: "fri", amount: 23.39 },
    { day: "sat", amount: 43.28 },
    { day: "sun", amount: 25.48 }
];

// Get current day of the week
function getCurrentDay() {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const today = new Date();
    return days[today.getDay()];
}

// Generate the spending chart
function generateChart() {
    const chartContainer = document.getElementById('spending-chart');
    const currentDay = getCurrentDay();
    const maxAmount = Math.max(...expenseData.map(item => item.amount));
    
    // Clear existing content
    chartContainer.innerHTML = '';
    
    expenseData.forEach(item => {
        // Create bar container
        const barContainer = document.createElement('div');
        barContainer.className = 'spending-chart__bar';
        barContainer.setAttribute('data-label', item.day);
        barContainer.setAttribute('data-amount', item.amount.toFixed(2));
        
        // Add active class for current day
        if (item.day === currentDay) {
            barContainer.classList.add('active');
        }
        
        // Calculate height (proportional to the amount)
        const heightPercentage = (item.amount / maxAmount) * 100;
        const maxHeight = 150; // Maximum height in pixels
        const barHeight = (heightPercentage / 100) * maxHeight;
        barContainer.style.height = `${barHeight}px`;
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = `$${item.amount.toFixed(2)}`;
        barContainer.appendChild(tooltip);
        
        // Create day label
        const dayLabel = document.createElement('div');
        dayLabel.className = 'day-label';
        dayLabel.textContent = item.day;
        barContainer.appendChild(dayLabel);
        
        // Add to chart
        chartContainer.appendChild(barContainer);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    generateChart();
});

// Update chart if window is resized
window.addEventListener('resize', function() {
    generateChart();
});
