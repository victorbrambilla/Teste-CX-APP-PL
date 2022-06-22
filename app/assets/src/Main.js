import Core from "./Core.js";

const client = ZAFClient.init();

client.metadata().then((metadata) => {

  Core.getInfoTicket();
});

client.on('app.registered', function(e) {
 document.getElementById("button-cep").addEventListener("click", Core.searchCEP);
  document.getElementById("button-tickets").addEventListener("click", Core.getTickets);
});

const Main = async () => {
  const App = document.getElementById("app");
  let appBody = `
  <div id="main-content">
    <h1 style="color: #ff00000; font-weight: 500; color: #04363c; font-size: 1rem; text-align: center; margin-top:20px">Atualizar ticket</h1>

    <section class="section-cep">
      <input name="cep" id="input-cep" type="text" maxlength="8" placeholder="CEP"/>
      <button id="button-cep"  style="background-color: 04363c;color: white; padding: 1px; border-radius: 5px;">Inserir CEP</button>
      <div id="error" style="display: none;"></div>
      <div id="success" style="display: none;"></div>
    </section>

    <section>
      <h2 style="color: #ff00000; font-weight: 500; color: #04363c; font-size: 1rem; text-align: center; margin-top:20px">Últimos tickets</h2>
      <button id="button-tickets" style="background-color: 04363c;color: white; padding: 1px; border-radius: 5px;">Buscar</button>
      <ul id="list-tickets"></ul>
    </section>

    <p style="display:none; text-align: center;" id="loading">Carregando...</p>

  </div>`;

  // Write App
  App.innerHTML = appBody;
};

export default Main;
