/**
 * Production-Level To-Do App
 * Complete JavaScript Implementation
 * Features: Add, Edit, Delete, Filter, Search, Priority, Due Dates, Local Storage
 */

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================
const CONFIG = {
    STORAGE_KEY: 'todoAppData',
    ANIMATION_DURATION: 300,
    MAX_TASK_LENGTH: 100,
    DEBOUNCE_DELAY: 300,
};

const PRIORITY_LEVELS = {
    low: { label: 'Low', value: 'low', order: 3 },
    medium: { label: 'Medium', value: 'medium', order: 2 },
    high: { label: 'High', value: 'high', order: 1 },
};

// ============================================
// DOM ELEMENTS CACHE
// ============================================
const DOM = {
    todoForm: document.getElementById('todoForm'),
    todoInput: document.getElementById('todoInput'),
    addBtn: document.getElementById('addBtn'),
    todoList: document.getElementById('todoList'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    searchInput: document.getElementById('searchInput'),
    prioritySelect: document.getElementById('prioritySelect'),
    dueDateInput: document.getElementById('dueDateInput'),
    emptyState: document.getElementById('emptyState'),
    errorMessage: document.getElementById('errorMessage'),
    loadingIndicator: document.getElementById('loadingIndicator'),
    clearCompletedBtn: document.getElementById('clearCompletedBtn'),
    clearAllBtn: document.getElementById('clearAllBtn'),
    totalCount: document.getElementById('totalCount'),
    activeCount: document.getElementById('activeCount'),
    completedCount: document.getElementById('completedCount'),
};

// ============================================
// APP STATE MANAGEMENT
// ============================================
const AppState = {
    tasks: [],
    currentFilter: 'all',
    searchQuery: '',
    editingId: null,

    init() {
        this.loadFromStorage();
        if (this.tasks.length === 0) {
            this.addDefaultTasks();
        }
    },

    loadFromStorage() {
        try {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            this.tasks = stored ? JSON.parse(stored) : [];
            console.log('✓ Tasks loaded from storage:', this.tasks.length);
        } catch (error) {
            console.error('✗ Error loading from storage:', error);
            this.tasks = [];
            showError('Failed to load tasks from storage');
        }
    },

    saveToStorage() {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.tasks));
            console.log('✓ Tasks saved to storage');
        } catch (error) {
            console.error('✗ Error saving to storage:', error);
            showError('Failed to save tasks to storage');
        }
    },

    addDefaultTasks() {
        const defaultTasks = [
            {
                id: generateId(),
                text: 'Welcome to Task Manager!',
                completed: false,
                priority: 'high',
                dueDate: '',
                createdAt: new Date().toISOString(),
            },
            {
                id: generateId(),
                text: 'Click the checkbox to mark tasks complete',
                completed: false,
                priority: 'medium',
                dueDate: '',
                createdAt: new Date().toISOString(),
            },
        ];
        this.tasks = defaultTasks;
        this.saveToStorage();
    },

    addTask(text, priority = 'medium', dueDate = '') {
        if (!text.trim()) {
            showError('Task cannot be empty');
            return null;
        }

        if (text.length > CONFIG.MAX_TASK_LENGTH) {
            showError(`Task must be less than ${CONFIG.MAX_TASK_LENGTH} characters`);
            return null;
        }

        const task = {
            id: generateId(),
            text: text.trim(),
            completed: false,
            priority,
            dueDate,
            createdAt: new Date().toISOString(),
        };

        this.tasks.unshift(task);
        this.saveToStorage();
        console.log('✓ Task added:', task);
        return task;
    },

    updateTask(id, updates) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            showError('Task not found');
            return false;
        }

        Object.assign(task, updates);
        this.saveToStorage();
        console.log('✓ Task updated:', task);
        return true;
    },

    deleteTask(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1) {
            showError('Task not found');
            return false;
        }

        const deleted = this.tasks.splice(index, 1);
        this.saveToStorage();
        console.log('✓ Task deleted:', deleted[0]);
        return true;
    },

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
            console.log(`✓ Task toggled: ${task.text} (${task.completed ? 'done' : 'pending'})`);
        }
    },

    getFilteredTasks() {
        let filtered = this.tasks;

        // Apply filter
        if (this.currentFilter === 'active') {
            filtered = filtered.filter(t => !t.completed);
        } else if (this.currentFilter === 'completed') {
            filtered = filtered.filter(t => t.completed);
        }

        // Apply search
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(t => t.text.toLowerCase().includes(query));
        }

        return filtered;
    },

    getStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const active = total - completed;

        return { total, completed, active };
    },

    clearCompleted() {
        const initial = this.tasks.length;
        this.tasks = this.tasks.filter(t => !t.completed);
        const removed = initial - this.tasks.length;
        this.saveToStorage();
        console.log(`✓ Cleared ${removed} completed tasks`);
        return removed;
    },

    clearAll() {
        const count = this.tasks.length;
        this.tasks = [];
        this.saveToStorage();
        console.log(`✓ Cleared all ${count} tasks`);
        return count;
    },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate unique ID for tasks
 */
function generateId() {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Show error message
 */
function showError(message) {
    const errorEl = DOM.errorMessage;
    errorEl.textContent = message;
    errorEl.classList.add('show');
    
    setTimeout(() => {
        errorEl.classList.remove('show');
    }, 5000);
}

/**
 * Show loading indicator
 */
function showLoading() {
    DOM.loadingIndicator.classList.add('show');
}

/**
 * Hide loading indicator
 */
function hideLoading() {
    DOM.loadingIndicator.classList.remove('show');
}

/**
 * Format date to readable format
 */
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}

/**
 * Check if date is overdue
 */
function isOverdue(dateString) {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
}

/**
 * Debounce function
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

/**
 * Create HTML for a single task
 */
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''} ${task.priority}-priority`;
    li.setAttribute('role', 'listitem');
    li.setAttribute('data-task-id', task.id);

    const formattedDate = formatDate(task.dueDate);
    const isTaskOverdue = isOverdue(task.dueDate) && !task.completed;

    li.innerHTML = `
        <div class="checkbox-container">
            <input 
                type="checkbox" 
                class="checkbox" 
                ${task.completed ? 'checked' : ''}
                aria-label="Toggle task completion"
            >
        </div>

        <div class="todo-content">
            <div class="todo-text">${escapeHtml(task.text)}</div>
            <div class="todo-meta">
                <span class="priority-badge ${task.priority}">
                    ${PRIORITY_LEVELS[task.priority].label}
                </span>
                ${
                    formattedDate
                        ? `<span class="duedate-badge ${isTaskOverdue ? 'overdue' : ''}">
                            📅 ${formattedDate}
                           </span>`
                        : ''
                }
            </div>
        </div>

        <div class="todo-actions">
            <button 
                class="todo-btn edit-btn" 
                aria-label="Edit task"
                title="Edit"
            >
                ✎
            </button>
            <button 
                class="todo-btn delete-btn" 
                aria-label="Delete task"
                title="Delete"
            >
                ✕
            </button>
        </div>
    `;

    // Event listeners
    const checkbox = li.querySelector('.checkbox');
    checkbox.addEventListener('change', () => handleToggleTask(task.id));

    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => handleEditTask(task));

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => handleDeleteTask(task.id));

    return li;
}

/**
 * Render the task list
 */
function renderTasks() {
    const filtered = AppState.getFilteredTasks();
    DOM.todoList.innerHTML = '';

    if (filtered.length === 0) {
        DOM.emptyState.style.display = 'block';
    } else {
        DOM.emptyState.style.display = 'none';
        filtered.forEach(task => {
            const taskEl = createTaskElement(task);
            DOM.todoList.appendChild(taskEl);
        });
    }

    updateStats();
}

/**
 * Update statistics display
 */
function updateStats() {
    const stats = AppState.getStats();
    DOM.totalCount.textContent = stats.total;
    DOM.activeCount.textContent = stats.active;
    DOM.completedCount.textContent = stats.completed;
}

/**
 * Update filter button states
 */
function updateFilterButtons() {
    DOM.filterBtns.forEach(btn => {
        const isActive = btn.getAttribute('data-filter') === AppState.currentFilter;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive);
    });
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle adding a new task
 */
function handleAddTask(e) {
    e.preventDefault();

    const text = DOM.todoInput.value;
    const priority = DOM.prioritySelect.value;
    const dueDate = DOM.dueDateInput.value;

    if (!text.trim()) {
        showError('Please enter a task');
        DOM.todoInput.focus();
        return;
    }

    const task = AppState.addTask(text, priority, dueDate);
    if (task) {
        DOM.todoInput.value = '';
        DOM.prioritySelect.value = 'medium';
        DOM.dueDateInput.value = '';
        renderTasks();
        DOM.todoInput.focus();
    }
}

/**
 * Handle toggling task completion
 */
function handleToggleTask(id) {
    AppState.toggleTask(id);
    renderTasks();
}

/**
 * Handle editing a task
 */
function handleEditTask(task) {
    DOM.todoInput.value = task.text;
    DOM.prioritySelect.value = task.priority;
    DOM.dueDateInput.value = task.dueDate;
    AppState.editingId = task.id;

    // Update button text
    DOM.addBtn.querySelector('.btn-text').textContent = 'Update Task';
    DOM.addBtn.classList.add('editing');
    DOM.todoInput.focus();
}

/**
 * Handle updating a task (when editing)
 */
function handleUpdateTask(e) {
    e.preventDefault();

    if (!AppState.editingId) {
        handleAddTask(e);
        return;
    }

    const text = DOM.todoInput.value;
    const priority = DOM.prioritySelect.value;
    const dueDate = DOM.dueDateInput.value;

    if (!text.trim()) {
        showError('Task text cannot be empty');
        return;
    }

    AppState.updateTask(AppState.editingId, {
        text: text.trim(),
        priority,
        dueDate,
    });

    // Reset form
    DOM.todoInput.value = '';
    DOM.prioritySelect.value = 'medium';
    DOM.dueDateInput.value = '';
    DOM.addBtn.querySelector('.btn-text').textContent = 'Add Task';
    DOM.addBtn.classList.remove('editing');
    AppState.editingId = null;

    renderTasks();
    DOM.todoInput.focus();
}

/**
 * Handle deleting a task
 */
function handleDeleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        AppState.deleteTask(id);
        renderTasks();
    }
}

/**
 * Handle filter button clicks
 */
function handleFilterChange(e) {
    if (e.target.classList.contains('filter-btn')) {
        AppState.currentFilter = e.target.getAttribute('data-filter');
        updateFilterButtons();
        renderTasks();
    }
}

/**
 * Handle search input with debouncing
 */
const handleSearch = debounce((query) => {
    AppState.searchQuery = query.toLowerCase();
    renderTasks();
}, CONFIG.DEBOUNCE_DELAY);

/**
 * Handle clearing completed tasks
 */
function handleClearCompleted() {
    const count = AppState.getStats().completed;
    if (count === 0) {
        showError('No completed tasks to clear');
        return;
    }

    if (confirm(`Delete ${count} completed task(s)?`)) {
        AppState.clearCompleted();
        renderTasks();
    }
}

/**
 * Handle clearing all tasks
 */
function handleClearAll() {
    const count = AppState.tasks.length;
    if (count === 0) {
        showError('No tasks to clear');
        return;
    }

    if (confirm(`Delete all ${count} task(s)? This cannot be undone.`)) {
        AppState.clearAll();
        renderTasks();
    }
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupEventListeners() {
    // Form submission
    DOM.todoForm.addEventListener('submit', (e) => {
        if (AppState.editingId) {
            handleUpdateTask(e);
        } else {
            handleAddTask(e);
        }
    });

    // Filter buttons
    document.querySelector('.filter-buttons').addEventListener('click', handleFilterChange);

    // Search input
    DOM.searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    // Clear buttons
    DOM.clearCompletedBtn.addEventListener('click', handleClearCompleted);
    DOM.clearAllBtn.addEventListener('click', handleClearAll);

    // Prevent body scroll on loading indicator
    DOM.loadingIndicator.addEventListener('click', (e) => {
        if (e.target === DOM.loadingIndicator) {
            // Do nothing - prevent closing
        }
    });

    console.log('✓ Event listeners set up');
}

// ============================================
// INITIALIZATION
// ============================================

function initializeApp() {
    console.log('🚀 Initializing To-Do App...');

    try {
        // Initialize state
        AppState.init();

        // Set up event listeners
        setupEventListeners();

        // Initial render
        renderTasks();
        updateFilterButtons();
        updateStats();

        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        DOM.dueDateInput.setAttribute('min', today);

        console.log('✓ App initialized successfully');
    } catch (error) {
        console.error('✗ Error during initialization:', error);
        showError('Failed to initialize the app');
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: Focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        DOM.searchInput.focus();
    }

    // Escape: Clear search and exit edit mode
    if (e.key === 'Escape') {
        if (AppState.editingId) {
            DOM.todoInput.value = '';
            DOM.prioritySelect.value = 'medium';
            DOM.dueDateInput.value = '';
            DOM.addBtn.querySelector('.btn-text').textContent = 'Add Task';
            DOM.addBtn.classList.remove('editing');
            AppState.editingId = null;
        }
        if (DOM.searchInput.value) {
            DOM.searchInput.value = '';
            AppState.searchQuery = '';
            renderTasks();
        }
    }
});

// ============================================
// EXPORT FOR TESTING (optional)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppState,
        DOM,
        CONFIG,
        generateId,
        showError,
        formatDate,
        isOverdue,
        escapeHtml,
        renderTasks,
        updateStats,
        handleAddTask,
        handleToggleTask,
        handleDeleteTask,
        handleClearCompleted,
        handleClearAll,
    };
}

// ============================================
// START APP
// ============================================

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
