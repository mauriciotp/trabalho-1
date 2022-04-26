const input = document.getElementById('inputfile');
const integralBtn = document.getElementById('baixar-integral');
let x = [];
let y = [];
let integral = [0];
let output = [];

function downloadOutputForIntegral() {
  const blob = new Blob([output.join('\n')], {
    type: 'text/plain;charset=utf-8',
  });
  saveAs(blob, 'integral.txt');
}

function integra(lines) {
  const n = lines.length;

  for (let i = 0; i < n; i++) {
    const split = lines[i].split(' ').map((e) => parseFloat(e));
    x.push(split[0]);
    y.push(split[1]);
  }

  const delta = x[1] - x[0];

  for (let i = 1; i < n; i++) {
    integral.push(integral[i - 1] + delta * y[i - 1]);
  }

  for (let i = 0; i < n; i++) {
    const linha = x[i].toString() + ' ' + integral[i].toString();
    output.push(linha);
  }
}

input.addEventListener('change', function () {
  const fr = new FileReader();

  fr.onload = function () {
    integra(fr.result.split('\r\n'));
    document.getElementById('output-integral').textContent = output.join('\n');
  };

  fr.readAsText(this.files[0]);
});

integralBtn.addEventListener('click', downloadOutputForIntegral);
