import { useState } from 'react';
import './App.css';
import { ContaBancaria } from './models/contabancaria';

function App() {
  const [conta] = useState(new ContaBancaria());
  const [saldo, setSaldo] = useState(conta.verSaldo());
  const [valorDeposito, setValorDeposito] = useState<number>(0);
  const [valorSaque, setValorSaque] = useState<number>(0);

  const depositar = () => {
    conta.depositar(valorDeposito);
    setSaldo(conta.verSaldo());
    setValorDeposito(0);
  };

  const sacar = () => {
    conta.sacar(valorSaque);
    setSaldo(conta.verSaldo());
    setValorSaque(0);
  };

  return (
    <div className="container">
      <h2 className="saldo">Saldo disponível: R$ {saldo}</h2>

      {/* Campo de Depósito */}
      <div className="operacao">
        <input 
          type="number" 
          value={valorDeposito} 
          onChange={(e) => setValorDeposito(Number(e.target.value))} 
          placeholder="Valor depósito"
        />
        <button onClick={depositar}>Depositar</button>
      </div>

      {/* Campo de Saque */}
      <div className="operacao">
        <input 
          type="number" 
          value={valorSaque} 
          onChange={(e) => setValorSaque(Number(e.target.value))} 
          placeholder="Valor saque"
        />
        <button onClick={sacar}>Sacar</button>
      </div>
    </div>
  );
}

export default App;
