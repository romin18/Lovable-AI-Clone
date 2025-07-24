export const testCryptoDashboardHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CryptoTrade Pro - Advanced Trading Dashboard</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg-primary: #0a0a0f;
      --bg-secondary: #131318;
      --bg-tertiary: #1a1a22;
      --text-primary: #ffffff;
      --text-secondary: #b4b4b8;
      --text-muted: #6b6b7d;
      --green: #22c55e;
      --red: #ef4444;
      --blue: #3b82f6;
      --purple: #8b5cf6;
      --yellow: #fbbf24;
      --border: rgba(255, 255, 255, 0.1);
      --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.4);
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, var(--bg-primary) 0%, #1a1a2e 100%);
      color: var(--text-primary);
      overflow-x: hidden;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid var(--border);
      margin-bottom: 30px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      font-weight: bold;
      background: linear-gradient(135deg, var(--blue), var(--purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav {
      display: flex;
      gap: 30px;
    }

    .nav a {
      color: var(--text-secondary);
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .nav a:hover, .nav a.active {
      color: var(--text-primary);
      background: rgba(59, 130, 246, 0.1);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .balance {
      text-align: right;
    }

    .balance-label {
      font-size: 12px;
      color: var(--text-muted);
    }

    .balance-value {
      font-size: 18px;
      font-weight: bold;
      color: var(--green);
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 30px;
      margin-bottom: 30px;
    }

    .main-content {
      display: grid;
      gap: 20px;
    }

    .card {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      box-shadow: var(--shadow);
    }

    .card-header {
      display: flex;
      justify-content: between;
      align-items: center;
      margin-bottom: 20px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 600;
    }

    .portfolio-overview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .portfolio-item {
      background: var(--bg-tertiary);
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }

    .portfolio-value {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .portfolio-change {
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    .portfolio-change.positive {
      color: var(--green);
    }

    .portfolio-change.negative {
      color: var(--red);
    }

    .chart-container {
      height: 400px;
      background: var(--bg-tertiary);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .chart-placeholder {
      color: var(--text-muted);
      text-align: center;
    }

    .sidebar {
      display: grid;
      gap: 20px;
    }

    .watchlist {
      max-height: 400px;
      overflow-y: auto;
    }

    .coin-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      cursor: pointer;
      transition: background 0.2s;
    }

    .coin-item:hover {
      background: rgba(255, 255, 255, 0.02);
    }

    .coin-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .coin-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--blue), var(--purple));
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 12px;
    }

    .coin-details {
      display: flex;
      flex-direction: column;
      text-align: right;
    }

    .coin-price {
      font-weight: 600;
    }

    .coin-change {
      font-size: 12px;
    }

    .coin-change.positive {
      color: var(--green);
    }

    .coin-change.negative {
      color: var(--red);
    }

    .trading-panel {
      background: var(--bg-tertiary);
      padding: 20px;
      border-radius: 8px;
    }

    .tab-buttons {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }

    .tab-button {
      flex: 1;
      padding: 10px;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .tab-button.active {
      background: var(--green);
      color: white;
    }

    .trade-form {
      display: grid;
      gap: 15px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-label {
      font-size: 14px;
      color: var(--text-secondary);
    }

    .form-input {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 12px;
      color: var(--text-primary);
      font-size: 16px;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--blue);
    }

    .trade-button {
      padding: 14px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .trade-button.buy {
      background: var(--green);
      color: white;
    }

    .trade-button.sell {
      background: var(--red);
      color: white;
    }

    .trade-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .market-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
    }

    .stat-item {
      text-align: center;
      padding: 15px;
      background: var(--bg-tertiary);
      border-radius: 8px;
    }

    .stat-value {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .stat-label {
      font-size: 12px;
      color: var(--text-muted);
    }

    .recent-trades {
      max-height: 300px;
      overflow-y: auto;
    }

    .trade-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .trade-time {
      font-size: 12px;
      color: var(--text-muted);
    }

    .orders-table {
      width: 100%;
      border-collapse: collapse;
    }

    .orders-table th,
    .orders-table td {
      text-align: left;
      padding: 12px 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .orders-table th {
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 500;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
    }

    .status-badge.filled {
      background: rgba(34, 197, 94, 0.2);
      color: var(--green);
    }

    .status-badge.pending {
      background: rgba(251, 191, 36, 0.2);
      color: var(--yellow);
    }

    .animated-line {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--green), transparent);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.5; transform: translateX(-100%); }
      50% { opacity: 1; transform: translateX(0%); }
    }

    .glow {
      animation: glow 2s ease-in-out infinite alternate;
    }

    @keyframes glow {
      from { box-shadow: 0 0 5px var(--green); }
      to { box-shadow: 0 0 20px var(--green); }
    }

    @media (max-width: 1200px) {
      .grid {
        grid-template-columns: 1fr;
      }
      
      .portfolio-overview {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 15px;
      }
      
      .header {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }
      
      .nav {
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .portfolio-overview {
        grid-template-columns: 1fr;
      }
      
      .market-stats {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <div class="logo">
        ₿ CryptoTrade Pro
      </div>
      <nav class="nav">
        <a href="#" class="active">Dashboard</a>
        <a href="#">Markets</a>
        <a href="#">Portfolio</a>
        <a href="#">Orders</a>
        <a href="#">Analytics</a>
      </nav>
      <div class="user-info">
        <div class="balance">
          <div class="balance-label">Total Balance</div>
          <div class="balance-value">$124,532.89</div>
        </div>
        <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
          JD
        </div>
      </div>
    </header>

    <!-- Portfolio Overview -->
    <div class="portfolio-overview">
      <div class="portfolio-item">
        <div class="portfolio-value">$124,532.89</div>
        <div class="portfolio-change positive">
          ↗ +$3,241.50 (+2.67%)
        </div>
        <div style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">Total Portfolio</div>
      </div>
      <div class="portfolio-item">
        <div class="portfolio-value">+15.6%</div>
        <div class="portfolio-change positive">
          ↗ +$16,892.34
        </div>
        <div style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">Total P&L</div>
      </div>
      <div class="portfolio-item">
        <div class="portfolio-value">$28.5B</div>
        <div class="portfolio-change positive">
          ↗ +12.4%
        </div>
        <div style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">24h Volume</div>
      </div>
      <div class="portfolio-item">
        <div class="portfolio-value">67</div>
        <div class="portfolio-change positive">
          ↗ Greed
        </div>
        <div style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">Fear & Greed</div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid">
      <!-- Main Content -->
      <div class="main-content">
        <!-- Chart Section -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Bitcoin (BTC/USD)</h3>
            <div style="display: flex; gap: 15px; align-items: center;">
              <span style="font-size: 24px; font-weight: bold;">$42,850.23</span>
              <span style="color: var(--green); font-size: 14px;">↗ +2.45% (+$1,024.50)</span>
            </div>
          </div>
          <div class="chart-container">
            <div class="animated-line"></div>
            <div class="chart-placeholder">
              <div style="font-size: 48px; margin-bottom: 10px;">📈</div>
              <div>Interactive Trading Chart</div>
              <div style="font-size: 12px; margin-top: 5px; color: var(--text-muted);">
                Real-time price data with advanced indicators
              </div>
            </div>
          </div>
        </div>

        <!-- Market Statistics -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Market Overview</h3>
          </div>
          <div class="market-stats">
            <div class="stat-item">
              <div class="stat-value" style="color: var(--green);">$1.2T</div>
              <div class="stat-label">Market Cap</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">46.8%</div>
              <div class="stat-label">BTC Dominance</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">18,642</div>
              <div class="stat-label">Active Coins</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">487</div>
              <div class="stat-label">Exchanges</div>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Orders</h3>
          </div>
          <table class="orders-table">
            <thead>
              <tr>
                <th>Pair</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BTC/USD</td>
                <td style="color: var(--green);">Buy</td>
                <td>0.025 BTC</td>
                <td>$42,150.00</td>
                <td><span class="status-badge filled">Filled</span></td>
                <td class="trade-time">2m ago</td>
              </tr>
              <tr>
                <td>ETH/USD</td>
                <td style="color: var(--red);">Sell</td>
                <td>1.5 ETH</td>
                <td>$2,890.00</td>
                <td><span class="status-badge pending">Pending</span></td>
                <td class="trade-time">5m ago</td>
              </tr>
              <tr>
                <td>SOL/USD</td>
                <td style="color: var(--green);">Buy</td>
                <td>10 SOL</td>
                <td>$98.50</td>
                <td><span class="status-badge filled">Filled</span></td>
                <td class="trade-time">12m ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Watchlist -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Watchlist</h3>
          </div>
          <div class="watchlist">
            <div class="coin-item">
              <div class="coin-info">
                <div class="coin-icon">₿</div>
                <div>
                  <div style="font-weight: 600;">Bitcoin</div>
                  <div style="font-size: 12px; color: var(--text-muted);">BTC</div>
                </div>
              </div>
              <div class="coin-details">
                <div class="coin-price">$42,850.23</div>
                <div class="coin-change positive">+2.45%</div>
              </div>
            </div>
            <div class="coin-item">
              <div class="coin-info">
                <div class="coin-icon">Ξ</div>
                <div>
                  <div style="font-weight: 600;">Ethereum</div>
                  <div style="font-size: 12px; color: var(--text-muted);">ETH</div>
                </div>
              </div>
              <div class="coin-details">
                <div class="coin-price">$2,856.12</div>
                <div class="coin-change negative">-1.23%</div>
              </div>
            </div>
            <div class="coin-item">
              <div class="coin-info">
                <div class="coin-icon">◎</div>
                <div>
                  <div style="font-weight: 600;">Solana</div>
                  <div style="font-size: 12px; color: var(--text-muted);">SOL</div>
                </div>
              </div>
              <div class="coin-details">
                <div class="coin-price">$98.45</div>
                <div class="coin-change positive">+5.67%</div>
              </div>
            </div>
            <div class="coin-item">
              <div class="coin-info">
                <div class="coin-icon">●</div>
                <div>
                  <div style="font-weight: 600;">Cardano</div>
                  <div style="font-size: 12px; color: var(--text-muted);">ADA</div>
                </div>
              </div>
              <div class="coin-details">
                <div class="coin-price">$0.4892</div>
                <div class="coin-change positive">+3.21%</div>
              </div>
            </div>
            <div class="coin-item">
              <div class="coin-info">
                <div class="coin-icon">◆</div>
                <div>
                  <div style="font-weight: 600;">Polygon</div>
                  <div style="font-size: 12px; color: var(--text-muted);">MATIC</div>
                </div>
              </div>
              <div class="coin-details">
                <div class="coin-price">$0.8245</div>
                <div class="coin-change negative">-0.89%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trading Panel -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Quick Trade</h3>
          </div>
          <div class="trading-panel">
            <div class="tab-buttons">
              <button class="tab-button active">Buy</button>
              <button class="tab-button">Sell</button>
            </div>
            <form class="trade-form">
              <div class="form-group">
                <label class="form-label">Amount (BTC)</label>
                <input type="number" class="form-input" placeholder="0.00" step="0.00001">
              </div>
              <div class="form-group">
                <label class="form-label">Price (USD)</label>
                <input type="number" class="form-input" placeholder="42,850.23">
              </div>
              <div class="form-group">
                <label class="form-label">Total (USD)</label>
                <input type="number" class="form-input" placeholder="0.00" readonly>
              </div>
              <button type="submit" class="trade-button buy glow">
                Buy BTC
              </button>
            </form>
          </div>
        </div>

        <!-- Recent Trades -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Trades</h3>
          </div>
          <div class="recent-trades">
            <div class="trade-item">
              <div>
                <div style="font-weight: 600; color: var(--green);">Buy 0.025 BTC</div>
                <div class="trade-time">2 minutes ago</div>
              </div>
              <div style="text-align: right;">
                <div style="font-weight: 600;">$1,071.25</div>
                <div style="font-size: 12px; color: var(--text-muted);">@ $42,850</div>
              </div>
            </div>
            <div class="trade-item">
              <div>
                <div style="font-weight: 600; color: var(--red);">Sell 1.5 ETH</div>
                <div class="trade-time">15 minutes ago</div>
              </div>
              <div style="text-align: right;">
                <div style="font-weight: 600;">$4,284.18</div>
                <div style="font-size: 12px; color: var(--text-muted);">@ $2,856</div>
              </div>
            </div>
            <div class="trade-item">
              <div>
                <div style="font-weight: 600; color: var(--green);">Buy 10 SOL</div>
                <div class="trade-time">1 hour ago</div>
              </div>
              <div style="text-align: right;">
                <div style="font-weight: 600;">$984.50</div>
                <div style="font-size: 12px; color: var(--text-muted);">@ $98.45</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Simple interactivity for demo
    document.addEventListener('DOMContentLoaded', function() {
      // Tab switching
      const tabButtons = document.querySelectorAll('.tab-button');
      const tradeButton = document.querySelector('.trade-button');
      
      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          tabButtons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          
          if (this.textContent === 'Buy') {
            tradeButton.textContent = 'Buy BTC';
            tradeButton.className = 'trade-button buy glow';
          } else {
            tradeButton.textContent = 'Sell BTC';
            tradeButton.className = 'trade-button sell glow';
          }
        });
      });

      // Price updates simulation
      function updatePrices() {
        const priceElements = document.querySelectorAll('.coin-price');
        priceElements.forEach(element => {
          const currentPrice = parseFloat(element.textContent.replace('$', '').replace(',', ''));
          const change = (Math.random() - 0.5) * 0.01;
          const newPrice = currentPrice * (1 + change);
          
          if (element.textContent.includes('Bitcoin') || element.parentElement.parentElement.querySelector('[style*="Bitcoin"]')) {
            element.textContent = '$' + newPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
          }
        });
      }

      // Update prices every 3 seconds
      setInterval(updatePrices, 3000);

      // Form interactions
      const amountInput = document.querySelector('input[placeholder="0.00"]');
      const priceInput = document.querySelector('input[placeholder="42,850.23"]');
      const totalInput = document.querySelector('input[readonly]');

      function updateTotal() {
        const amount = parseFloat(amountInput.value) || 0;
        const price = parseFloat(priceInput.value.replace(',', '')) || 0;
        const total = amount * price;
        totalInput.value = total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      }

      amountInput.addEventListener('input', updateTotal);
      priceInput.addEventListener('input', updateTotal);
    });
  </script>
</body>
</html>` 