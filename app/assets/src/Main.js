import Core from "./Core.js";

const client = ZAFClient.init();

client.metadata().then((metadata) => {

  Core.getInfoTicket();
});

client.on('app.registered', function(e) {
 document.getElementById("button-cep").addEventListener("click", Core.searchCEP);
});

const Main = async () => {
  const App = document.getElementById("app");
  let appBody = `
  <div id="main-content">
    <h1>Insira um endereço</h1>

    <section>
      <input name="cep" id="input-cep" type="text" maxlength="8" placeholder="CEP"/>
      <button id="button-cep">Inserir CEP</button>

    </section>

    <p style="display:none; text-align: center;" id="loading">Carregando...</p>

  </div>`;

  // Write App
  App.innerHTML = appBody;
};

export default Main;
