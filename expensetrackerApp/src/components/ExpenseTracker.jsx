import React, { useState } from 'react';

function ExpenseTracker() {
  // ૧. સાદા સ્ટેટ્સ: ખર્ચનું નામ, રકમ, પ્રકાર (income/expense) અને લિસ્ટ
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // 'income' અથવા 'expense'
  const [transactions, setTransactions] = useState([]);

  // 🚀 ૨. નવો હિસાબ (Transaction) ઉમેરવાનું ફંક્શન
  const handleAddTransaction = (e) => {
    e.preventDefault();

    if (title.trim() === '' || amount === '' || Number(amount) <= 0) {
      alert('Please enter valid title and amount!');
      return;
    }

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      type: type
    };

    // નવો હિસાબ લિસ્ટમાં સૌથી ઉપર ઉમેરો
    setTransactions([newItem, ...transactions]);

    // ફોર્મ ખાલી કરો
    setTitle('');
    setAmount('');
  };

  // 🗑️ ૩. હિસાબ ડીલીટ કરવાનું ફંક્શન
  const handleDelete = (id) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  // 📊 ૪. કુલ આવક (Income), ખર્ચ (Expense) અને બેલેન્સની ગણતરી
  const totalIncome = transactions
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div style={{ maxWidth: '450px', margin: '0 auto', padding: '25px', backgroundColor: '#0f172a', borderRadius: '24px', border: '2px solid #22c55e', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      
      <h3 style={{ color: '#4ade80', margin: '0 0 5px 0', textAlign: 'center' }}>
        Simple Expense Tracker 💰
      </h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '11px', color: '#64748b', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
        Track Income & Daily Expenses
      </p>

      {/* 💳 બેલેન્સ કાર્ડ (Balance, Income, Expense) */}
      <div style={{ backgroundColor: '#020617', padding: '16px', borderRadius: '16px', border: '1px solid #1e293b', marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>YOUR BALANCE</div>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: balance >= 0 ? '#38bdf8' : '#ef4444', margin: '4px 0 12px 0' }}>
          ₹ {balance}
        </div>

        <div style={{ display: 'flex', borderTop: '1px solid #1e293b', paddingTop: '12px' }}>
          <div style={{ flex: 1, borderRight: '1px solid #1e293b' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>INCOME</span>
            <strong style={{ color: '#4ade80', fontSize: '16px' }}>+ ₹{totalIncome}</strong>
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>EXPENSE</span>
            <strong style={{ color: '#f87171', fontSize: '16px' }}>- ₹{totalExpense}</strong>
          </div>
        </div>
      </div>

      {/* ✍️ નવો ખર્ચ / આવક ઉમેરવાનું ફોર્મ */}
      <form onSubmit={handleAddTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        
        {/* Income અથવા Expense પસંદ કરો */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '14px' }}
        >
          <option value="expense">🔴 Expense </option>
          <option value="income">🟢 Income </option>
        </select>

        <input
          type="text"
          placeholder="Enter title (e.g. Tea, Salary, Recharge)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '14px' }}
        />

        <input
          type="number"
          placeholder="Enter amount in ₹ (e.g. 500)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '14px' }}
        />

        <button
          type="submit"
          style={{ padding: '12px', backgroundColor: '#22c55e', color: '#000', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          ➕ Add Transaction
        </button>
      </form>

      {/* 📋 હિસાબનું લિસ્ટ (History) */}
      <div style={{ textAlign: 'left' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#94a3b8' }}>
          History ({transactions.length})
        </h4>

        {transactions.length === 0 ? (
          <p style={{ color: '#475569', fontSize: '13px', textAlign: 'center', padding: '15px', backgroundColor: '#020617', borderRadius: '10px' }}>
            No transactions yet. Add your first income or expense!
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
            {transactions.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#020617',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  borderLeft: item.type === 'income' ? '4px solid #22c55e' : '4px solid #ef4444'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.title}</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: item.type === 'income' ? '#4ade80' : '#f87171', fontWeight: 'bold', fontSize: '14px' }}>
                    {item.type === 'income' ? `+ ₹${item.amount}` : `- ₹${item.amount}`}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px' }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default ExpenseTracker;
