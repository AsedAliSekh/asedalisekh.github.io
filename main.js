const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Message Send Successfully!";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 4000);
        });
});



// Portfolio Migration Popup

const migrationOverlay =
    document.getElementById("migrationOverlay");

const migrationClose =
    document.getElementById("migrationClose");

// Close popup on button click
migrationClose.addEventListener("click", function () {
    migrationOverlay.style.display = "none";
});

// Close popup when clicking outside the notice
migrationOverlay.addEventListener("click", function (event) {
    if (event.target === migrationOverlay) {
        migrationOverlay.style.display = "none";
    }
});

// Close popup using Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        migrationOverlay.style.display = "none";
    }
});
