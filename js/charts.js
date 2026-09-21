let genreChart = null;
let statusChart = null;

function updateGenreChart() {
  const books = window.books;

  const genreCanvas = document.getElementById("genreChart");
  const genreEmpty = document.getElementById("genreEmpty");

  if (books.length === 0) {
    if (genreChart) {
      genreChart.destroy();
      genreChart = null;
    }

    genreCanvas.style.display = "none";
    genreEmpty.style.display = "flex";

    return;
  }

  genreCanvas.style.display = "block";
  genreEmpty.style.display = "none";

  const genreCounts = {};

  books.forEach((book) => {
    if (!book.genre) return;

    genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
  });

  const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);

  const labels = sortedGenres.map((item) => item[0]);
  const data = sortedGenres.map((item) => item[1]);

  if (genreChart) {
    genreChart.destroy();
  }

  const ctx = document.getElementById("genreChart");

  genreChart = new Chart(ctx, {
    type: "bar",
    maintainAspectRatio: false,

    data: {
      labels,

      datasets: [
        {
          label: "Books",

          data,

          backgroundColor: [
            "#A8C686", // Soft Matcha
            "#7FA87A", // Sage Green
            "#5E8C61", // Forest Sage
            "#8DB596", // Tea Green
            "#B7D3A8", // Light Moss
            "#6B8E6B", // Olive Green
            "#93B48B", // Mint Sage
            "#4F6B4F", // Pine Green
            "#C8DDB5", // Pale Matcha
            "#739E73", // Herbal Green
          ],

          borderRadius: 8,
        },
      ],
    },

    options: {
      indexAxis: "y",

      responsive: true,

      plugins: {
        legend: {
          display: false,
        },
      },

      scales: {
        x: {
          beginAtZero: true,

          ticks: {
            precision: 0,
          },
        },
      },
    },
  });
}

function updateStatusChart() {

  const books = window.books;

  const statusCanvas = document.getElementById("statusChart");
  const statusEmpty = document.getElementById("statusEmpty");

  if (books.length === 0) {
    if (statusChart) {
      statusChart.destroy();
      statusChart = null;
    }

    statusCanvas.style.display = "none";
    statusEmpty.style.display = "flex";

    return;
  }

  statusCanvas.style.display = "block";
  statusEmpty.style.display = "none";

  const statusCounts = {
    TBR: 0,
    Reading: 0,
    Completed: 0,
    DNF: 0,
  };

  books.forEach((book) => {
    if (statusCounts.hasOwnProperty(book.status)) {
      statusCounts[book.status]++;
    }
  });

  if (statusChart) {
    statusChart.destroy();
  }

  const ctx = document.getElementById("statusChart");

  statusChart = new Chart(ctx, {
    type: "doughnut",

    data: {
      labels: Object.keys(statusCounts),

      datasets: [
        {
          data: Object.values(statusCounts),

          backgroundColor: [
            "#A6C261", // To Read
            "#7FA87A", // Reading
            "#4F6B4F", // Completed
            "#B85C5C", // Dropped
          ],

          borderWidth: 2,

          borderColor: "#FFFFFF",
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      cutout: "65%",

      plugins: {
        legend: {
          position: "bottom",

          align: "justify",

          labels: {
            usePointStyle: true,

            pointStyle: "circle",

            boxWidth: 8,

            boxHeight: 8,

            padding: 12,

            font: {
              family: "DM Sans",

              size: 11,
            },
          },
        },
      },
    },
  });
}