import React, { useState } from "react";
import axios from "axios";

function App() {
  // seta um estado inicial de um campo
  const [field, setfield] = useState({});

  function handleChange(event) {
    // spread operator: ele copia todo o valor que já existia dentro do campo e adiciona mais outros campos
    setfield({ ...field, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log({ field });
  }

  async function handlecep() {
    if (field.cep.length !== 8) {
      return;
    }
    // manda o que o usuário digitou no campo de cep como parâmetro pra API
    const response = await axios.get(
      "https://viacep.com.br/ws/" + field.cep + "/json/"
    );

    console.log(response);

    // copia todos os campos existentes dentro de field + os campos que voltam da api
    setfield({
      ...field,
      rua: response.data.logradouro,
      comp: response.data.complemento,
      cidade: response.data.localidade,
      estado: response.data.uf,
      bairro: response.data.bairro,
    });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Nome Completo
          <input
            name="name"
            onChange={handleChange}
            type="text"
            pattern="[a-zA-Z]+"
            required
            minLength="4"
          />
        </label>
        <label>
          CPF
          <input
            name="CPF"
            onChange={handleChange}
            type="text"
            pattern="[0-9]+"
            required
            minLength="11"
            maxLength="11"
          />
        </label>
        <label>
          E-mail{" "}
          <input name="email" onChange={handleChange} type="email" required />
        </label>
        <div>
          <h2>Endereco</h2>
          <label>
            Cep
            <input
              value={field.cep || ""}
              onBlur={handlecep}
              name="cep"
              onChange={handleChange}
              type="text"
              required
              pattern="[0-9]+"
              minLength="8"
              maxLength="8"
            />
          </label>
          <br></br>
          <label>
            Rua
            <input
              value={field.rua || ""}
              name="rua"
              onChange={handleChange}
              type="text"
              required
            />
          </label>
          <br></br>
          <label>
            Numero
            <input
              value={field.num || ""}
              name="num"
              onChange={handleChange}
              type="text"
              required
            />
          </label>
          <br></br>
          <label>
            Complemento
            <input
              value={field.comp || ""}
              name="comp"
              onChange={handleChange}
              type="text"
            />
          </label>
          <br></br>
          <label>
            Bairro
            <input
              value={field.bairro || ""}
              name="bairro"
              onChange={handleChange}
              type="text"
              required
            />
          </label>
          <br></br>
          <label>
            Cidade
            <input
              value={field.cidade || ""}
              name="cidade"
              onChange={handleChange}
              type="text"
              required
            />
          </label>
          <br></br>
          <label>
            Estado
            <input
              value={field.estado || ""}
              name="estado"
              onChange={handleChange}
              type="text"
              required
            />
          </label>
          <br></br>
        </div>
        <br></br>
        <button type="submit">Enviar</button>
        <br></br>
      </form>
    </div>
  );
}

export default App;
