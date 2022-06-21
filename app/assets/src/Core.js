const client = ZAFClient.init();

let ticket_id;



const getInfoTicket = async () => {
  try {
    const result = await client.get('ticket')
    ticket_id = result.ticket.id
  } catch (e) {
    console.log(`Error request ${e}`);
  }
}

const searchCEP = async () => {
    const cep = document.getElementById("input-cep").value;
    const button = document.getElementById("button-cep");
    const loading = document.getElementById("loading");
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
      console.log("Ticket atualizado com sucesso");
    }).catch(function (e) {
      console.log(`Erro: ${e}`);
    }).finally(function () {
      button.disabled = false;
      loading.style.display = "none";
    });
};

const Core = {
  searchCEP,
  getInfoTicket,

};

export default Core;
