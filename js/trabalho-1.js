const input = document.getElementById('inputfile');
let x = [];
let y = [];
let derivada = [];
let output = [];

function deriva(lines) {
  const n = lines.length;

  for (let i = 0; i < n; i++) {
    split = lines[i].split(' ').map((e) => parseFloat(e));
    x.push(split[0]);
    y.push(split[1]);
  }

  const delta = x[1] - x[0];

  derivada.push((y[1] - y[0]) / delta);

  for (let i = 1; i < n - 1; i++) {
    derivada.push((y[i + 1] - y[i - 1]) / (2 * delta));
  }

  derivada.push((y[n - 1] - y[n - 2]) / delta);

  derivada = derivada.map((e) => Math.round(e));
}

input.addEventListener('change', function () {
  const fr = new FileReader();

  fr.onload = function () {
    document.getElementById('data').textContent = fr.result;
    deriva(fr.result.split('\r\n'));
  };

  fr.readAsText(this.files[0]);
});
