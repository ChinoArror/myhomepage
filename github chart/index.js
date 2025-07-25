// 假设您已经获取了access_token和username
async function displayGitHubChart(ChinoArror, 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) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/events/public`, {
      headers: {
        Authorization: `token ${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}`
      }
    });
    const events = await response.json();

    // 提取贡献数据 (这里只是一个例子，具体数据处理根据您的需求调整)
    const contributions = {};
    events.forEach(event => {
      if (event.type === "PushEvent") {
        const date = event.created_at.split("T")[0];
        contributions[date] = (contributions[date] || 0) + 1;
      }
    });

    // 生成图表数据 (使用Chart.js)
    const labels = Object.keys(contributions);
    const data = Object.values(contributions);
    const chartData = {
      labels: labels,
      datasets: [{
        label: '贡献次数',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    // 绘制图表
    const ctx = document.getElementById('githubChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  } catch (error) {
    console.error("获取或渲染图表时出错:", error);
  }
}

// 在页面加载后调用
document.addEventListener('DOMContentLoaded', () => {
  displayGitHubChart('ChinoArror', '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');
});