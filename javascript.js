const display = document.getElementById("display");
const btn = document.querySelectorAll(".btn");
btn.forEach((botao) => {
  botao.addEventListener("click", () => {
    const valor = botao.value;

    if (botao.value === "C") {
      display.value = "";
    } else if (botao.value === "=") {
      if (display.value === "") {
        display.value = "";
      } else {
        try {
          display.value = display.value.replaceAll("%", "/100");
          display.value = eval(display.value);
        } catch {
          display.value = "ERROR";
        }
      }
    } else if (botao.value === "+/-") {
      if (!display.value) return;
      const valorAtual = display.value;

      const posMais = valorAtual.lastIndexOf("+");
      const posMult = valorAtual.lastIndexOf("*");
      const posDiv = valorAtual.lastIndexOf("/");

      const posMenos = valorAtual.slice(1).lastIndexOf("-");
      const posMenosReal = posMenos === -1 ? -1 : posMenos + 1;
      const pos = Math.max(posMais, posMenosReal, posMult, posDiv);
      let semrepiticao = display.value;
      if (pos === -1) {
        if (valorAtual.startsWith("-")) {
          display.value = valorAtual.slice(1);
        } else {
          display.value = "-" + valorAtual;
        }
      } else {
        const antes = valorAtual.slice(0, pos + 1);
        const numero = valorAtual.slice(pos + 1);
        if (numero.startsWith("(-")) {
          const numeroPositivo = numero.slice(2, -1);
          display.value = antes + numeroPositivo;
        } else if (display.value.includes("(")) {
          display.value = semrepiticao;
        } else {
          display.value = antes + "(-" + numero + ")";
        }
        console.log(numero);
      }
    } else if (botao.value === "AC") {
      if (display.value === "ERROR") {
        display.value = "";
      } else {
        display.value = display.value.slice(0, -1);
      }
    } else {
      const ultimo = display.value[display.value.length - 1];
      const operadores = "+-*/%";
      if (operadores.includes(ultimo) && operadores.includes(valor)) {
        return;
      } else {
        display.value += valor;
      }
    }
  });
});
