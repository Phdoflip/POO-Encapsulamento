import { useState } from 'react';
import './App.css';
import { ContaBancaria } from './models/contabancaria';

interface Transacao {
  tipo: 'Depósito' | 'Saque';
  valor: number;
  data: string;
}

function App() {
  const [conta] = useState(new ContaBancaria());
  const [saldo, setSaldo] = useState(conta.verSaldo());
  const [valorDeposito, setValorDeposito] = useState<number>(0);
  const [valorSaque, setValorSaque] = useState<number>(0);
  const [mensagem, setMensagem] = useState<string>("");
  const [tipoMensagem, setTipoMensagem] = useState<'sucesso' | 'erro' | ''>("");
  const [extrato, setExtrato] = useState<Transacao[]>([]);

  const formatarMoeda = (valor: number) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const mostrarMensagem = (texto: string, tipo: 'sucesso' | 'erro') => {
    setMensagem(texto);
    setTipoMensagem(tipo);
    setTimeout(() => {
      setMensagem("");
      setTipoMensagem("");
    }, 3000);
  };

  const adicionarTransacao = (tipo: 'Depósito' | 'Saque', valor: number) => {
    const novaTransacao: Transacao = {
      tipo,
      valor,
      data: new Date().toLocaleString('pt-BR')
    };
    setExtrato([novaTransacao, ...extrato]);
  };

  const depositar = () => {
    if (valorDeposito > 0) {
      conta.depositar(valorDeposito);
      setSaldo(conta.verSaldo());
      adicionarTransacao('Depósito', valorDeposito);
      setValorDeposito(0);
      mostrarMensagem("Depósito realizado com sucesso!", "sucesso");
    } else {
      mostrarMensagem("Digite um valor válido para depósito.", "erro");
    }
  };

  const sacar = () => {
    if (valorSaque <= 0) {
      mostrarMensagem("Digite um valor válido para saque.", "erro");
    } else if (valorSaque > saldo) {
      mostrarMensagem("Saldo insuficiente para saque.", "erro");
    } else {
      conta.sacar(valorSaque);
      setSaldo(conta.verSaldo());
      adicionarTransacao('Saque', valorSaque);
      setValorSaque(0);
      mostrarMensagem("Saque realizado com sucesso!", "sucesso");
    }
  };

  return (
    <div className="container">
      <div className="card">

        {/* Cabeçalho */}
        <header className="header">
          <img src="/banco-front-end.png" alt="Banco do Front-End" className="logo" />
          <h1>Banco do Front-End</h1>
        </header>

        {/* Saldo */}
        <div className="saldo-container">
          <p>Saldo disponível</p>
          <h2 className="saldo">{formatarMoeda(saldo)}</h2>
        </div>

        {/* Mensagem de Feedback */}
        {mensagem && (
          <p className={`mensagem ${tipoMensagem}`}>
            {mensagem}
          </p>
        )}

        {/* Operações */}
        <div className="operacoes">
          <div className="operacao">
            <input 
              type="number" 
              value={valorDeposito} 
              onChange={(e) => setValorDeposito(Number(e.target.value))} 
              placeholder="Valor depósito"
            />
            <button className="btn deposito" onClick={depositar}>Depositar</button>
          </div>

          <div className="operacao">
            <input 
              type="number" 
              value={valorSaque} 
              onChange={(e) => setValorSaque(Number(e.target.value))} 
              placeholder="Valor saque"
            />
            <button className="btn saque" onClick={sacar}>Sacar</button>
          </div>
        </div>

        {/* Extrato */}
        <div className="extrato">
          <h3>Extrato de Transações</h3>
          {extrato.length === 0 ? (
            <p className="extrato-vazio">Nenhuma transação realizada</p>
          ) : (
            <ul>
              {extrato.map((t, index) => (
                <li key={index} className={t.tipo === 'Depósito' ? 'deposito-item' : 'saque-item'}>
                  <span>{t.tipo}</span>
                  <span>{formatarMoeda(t.valor)}</span>
                  <small>{t.data}</small>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
