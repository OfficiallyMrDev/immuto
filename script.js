function checkAnswer() {
    const coef1 = parseInt(document.getElementById('coef1').value);
    const coef2 = parseInt(document.getElementById('coef2').value);
    const coef3 = parseInt(document.getElementById('coef3').value);

    if (coef1 === 2 && coef2 === 1 && coef3 === 2) {
        window.location.href = 'success.html';
    } else {
        alert('Try again! The equation is not balanced correctly.');
    }
}