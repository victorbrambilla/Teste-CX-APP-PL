const client = ZAFClient.init();

let ticket_id;
let requester_id


const getInfoTicket = async () => {
  try {
    const result = await client.get('ticket')
    ticket_id = result.ticket.id
    requester_id = result.ticket.requester.id
  } catch (e) {
    console.log(`Error request ${e}`);
  }
}

const searchCEP = async () => {
    const cep = document.getElementById("input-cep").value;
    const button = document.getElementById("button-cep");
    const errorCep= document.querySelector(".section-cep #error");
    const successCep= document.querySelector(".section-cep #success");
    const loading = document.getElementById("loading");

    successCep.style.display = "none";
    if(cep.length !== 8){
      errorCep.style.display = "block";
      return errorCep.innerHTML = `<p style="color: #ff00000; font-weight: 500; color: red; font-size: 1rem;">CEP inválido!</p>`;
    }
    button.disabled = true;
    loading.style.display = "block";
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    const { logradouro, bairro, localidade, uf, complemento } = data;
    const body ={
      ticket :{
        comment:{
          html_body: `<p style="color: #ff00000; font-weight: 500; color: #04363c; font-size: 1rem; text-align: center;">Endereço</p>
          <p>${logradouro}, ${complemento}</p>
          <p>${bairro}, ${localidade}/${uf}</p>
          <p>${cep}</p>`
        }
      }
    }

    client.request({
      method: 'PUT',
      url: `/api/v2/tickets/${ticket_id}`,
      contentType: 'application/json',
      data: JSON.stringify(body),
      secure: true
    }).then(function (data) {
      successCep.style.display = "block";
      successCep.innerHTML = `<p style="color: #ff00000; font-weight: 500; color: green; font-size: 1rem; ">Ticket atualizado com sucesso!</p>`;
      console.log("Ticket atualizado com sucesso");

    }).catch(function (e) {
      console.log(`Erro: ${e}`);
      loading.style.display = "none";
    }).finally(function () {
      button.disabled = false;
      loading.style.display = "none";
      errorCep.style.display = "none";
    });
};
const getTickets = async () => {
  const button = document.getElementById("button-tickets");
  const loading = document.getElementById("loading");
  try {
    button.style.display = "none";
    loading.style.display = "block";

    const result = await client.request(`/api/v2/users/${requester_id}/tickets/requested`)
    const tickets = result.tickets
    const list = tickets.map(function (ticket) {
      return `
      <li>
        <div style="border: 1px solid #04363c;">
          <b>Título:</b> ${ticket.subject} <br>
          <b>Status:</b> ${ticket.status} <br>
          <b>Data:</b> ${ticket.created_at} <br>
        </div>
      </li>

      `;
    })

    document.getElementById('list-tickets').innerHTML = list;
    loading.style.display = "none";

  } catch (e) {
    const error = '<li>Não foi possível buscar os tickets</li>'
    console.log(`Error request ${e}`);
    loading.style.display = "none";
    document.getElementById('list-tickets').innerHTML = error;
  }
}
const Core = {
  searchCEP,
  getInfoTicket,
  getTickets
};

export default Core;
