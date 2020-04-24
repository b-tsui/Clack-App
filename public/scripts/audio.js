const input = document.getElementById("messages");

input.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('audio').play();
    }
});