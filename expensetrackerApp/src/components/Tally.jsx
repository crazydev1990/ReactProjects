
import React, { useEffect, useMemo, useState } from 'react';

const COUNTRY_CONFIG = {
  India: { currency: 'INR', symbol: '₹' },
  USA: { currency: 'USD', symbol: '$' },
  UK: { currency: 'GBP', symbol: '£' },
  UAE: { currency: 'AED', symbol: 'د.إ' },
  Canada: { currency: 'CAD', symbol: 'C$' },
  Australia: { currency: 'AUD', symbol: 'A$' },
  Germany: { currency: 'EUR', symbol: '€' },
  France: { currency: 'EUR', symbol: '€' },
  Singapore: { currency: 'SGD', symbol: 'S$' },
  Japan: { currency: 'JPY', symbol: '¥' }
};

const DEFAULT_LEDGERS = [
  { id: 1, name: 'Cash Account', group: 'Cash-in-Hand', openingBalance: 50000 },
  { id: 2, name: 'SBI Bank A/c', group: 'Bank Accounts', openingBalance: 120000 },
  { id: 3, name: 'Rajesh Traders', group: 'Sundry Debtors', openingBalance: 0 },
  { id: 4, name: 'Gujarat Electronics', group: 'Sundry Creditors', openingBalance: 0 },
  { id: 5, name: 'Salary Expense', group: 'Indirect Expenses', openingBalance: 0 },
  { id: 6, name: 'Salary Payable', group: 'Current Liabilities', openingBalance: 0 }
];

const DEFAULT_PAY_HEADS = [
  { id: 1, name: 'Basic Salary', type: 'Earning' },
  { id: 2, name: 'HRA', type: 'Earning' },
  { id: 3, name: 'DA', type: 'Earning' },
  { id: 4, name: 'Conveyance Allowance', type: 'Earning' },
  { id: 5, name: 'Medical Allowance', type: 'Earning' },
  { id: 6, name: 'Special Allowance', type: 'Earning' },
  { id: 7, name: 'Bonus', type: 'Earning' },
  { id: 8, name: 'Overtime', type: 'Earning' },
  { id: 9, name: 'PF / Retirement', type: 'Deduction' },
  { id: 10, name: 'ESI / Insurance', type: 'Deduction' },
  { id: 11, name: 'Professional / Local Tax', type: 'Deduction' },
  { id: 12, name: 'Income Tax / TDS', type: 'Deduction' },
  { id: 13, name: 'Other Deduction', type: 'Deduction' }
];

const initialEmployee = {
  name: '',
  employeeCode: '',
  email: '',
  phone: '',
  country: 'India',
  state: '',
  department: '',
  designation: '',
  joiningDate: new Date().toISOString().slice(0, 10),
  bankName: '',
  accountNumber: '',
  taxId: '',
  salary: '',
  hra: '0',
  da: '0',
  allowance: '0',
  bonus: '0',
  deduction: '0',
  workingDays: '26',
  overtimeRate: '0'
};

const initialVoucher = {
  type: 'Sales',
  party: '',
  amount: '',
  gstRate: '18',
  narration: '',
  date: new Date().toISOString().slice(0, 10)
};

const money = (value, symbol = '₹') =>
  `${symbol}${Number(value || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

const readStorage = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

const saveStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

const styles = {
  page: {
    maxWidth: '1400px',
    margin: 'auto',
    color: '#e2e8f0',
    fontFamily: 'Arial, sans-serif'
  },
  panel: {
    background: '#0f172a',
    border: '1px solid #263449',
    borderRadius: '12px',
    padding: '18px',
    marginBottom: '16px'
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '11px',
    borderRadius: '7px',
    border: '1px solid #334155',
    background: '#020617',
    color: '#fff',
    outline: 'none'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    color: '#cbd5e1',
    marginBottom: '6px'
  },
  button: {
    border: 'none',
    borderRadius: '7px',
    padding: '10px 15px',
    background: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  secondary: {
    border: '1px solid #475569',
    borderRadius: '7px',
    padding: '9px 13px',
    background: '#1e293b',
    color: '#e2e8f0',
    cursor: 'pointer'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '650px'
  },
  th: {
    background: '#1e293b',
    color: '#cbd5e1',
    textAlign: 'left',
    padding: '12px',
    fontSize: '12px',
    borderBottom: '1px solid #334155'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #263449',
    fontSize: '13px'
  }
};

function Field({ label, children }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', ...props }) {
  return (
    <Field label={label}>
      <input
        style={styles.input}
        type={type}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        {...props}
      />
    </Field>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <Field label={label}>
      <select
        style={styles.input}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function Tally() {
  const [activeView, setActiveView] = useState('dashboard');

  // Accounting states
  const [ledgers, setLedgers] = useState(() =>
    readStorage('tally_ledgers', DEFAULT_LEDGERS)
  );
  const [vouchers, setVouchers] = useState(() =>
    readStorage('tally_vouchers', [])
  );
  const [newLedgerName, setNewLedgerName] = useState('');
  const [newLedgerGroup, setNewLedgerGroup] = useState('Sundry Debtors');
  const [voucherForm, setVoucherForm] = useState(initialVoucher);

  // Payroll states
  const [employees, setEmployees] = useState(() =>
    readStorage('tally_employees', [])
  );
  const [attendance, setAttendance] = useState(() =>
    readStorage('tally_attendance', [])
  );
  const [leaveRecords, setLeaveRecords] = useState(() =>
    readStorage('tally_leave_records', [])
  );
  const [payrolls, setPayrolls] = useState(() =>
    readStorage('tally_payrolls', [])
  );
  const [payHeads, setPayHeads] = useState(() =>
    readStorage('tally_pay_heads', DEFAULT_PAY_HEADS)
  );

  const [employeeForm, setEmployeeForm] = useState(initialEmployee);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [attendanceForm, setAttendanceForm] = useState({
    employeeId: '',
    date: new Date().toISOString().slice(0, 10),
    status: 'Present',
    overtimeHours: '0'
  });
  const [leaveForm, setLeaveForm] = useState({
    employeeId: '',
    fromDate: '',
    toDate: '',
    type: 'Casual Leave',
    days: '1',
    status: 'Pending'
  });
  const [payrollMonth, setPayrollMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [newPayHead, setNewPayHead] = useState({
    name: '',
    type: 'Earning'
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    saveStorage('tally_ledgers', ledgers);
  }, [ledgers]);

  useEffect(() => {
    saveStorage('tally_vouchers', vouchers);
  }, [vouchers]);

  useEffect(() => {
    saveStorage('tally_employees', employees);
  }, [employees]);

  useEffect(() => {
    saveStorage('tally_attendance', attendance);
  }, [attendance]);

  useEffect(() => {
    saveStorage('tally_leave_records', leaveRecords);
  }, [leaveRecords]);

  useEffect(() => {
    saveStorage('tally_payrolls', payrolls);
  }, [payrolls]);

  useEffect(() => {
    saveStorage('tally_pay_heads', payHeads);
  }, [payHeads]);

  const currencySymbol = COUNTRY_CONFIG[selectedCountry]?.symbol || '₹';

  const totalSales = vouchers
    .filter(v => v.type === 'Sales')
    .reduce((sum, v) => sum + Number(v.total || v.amount || 0), 0);

  const totalPurchase = vouchers
    .filter(v => v.type === 'Purchase')
    .reduce((sum, v) => sum + Number(v.total || v.amount || 0), 0);

  const totalSalary = payrolls.reduce(
    (sum, p) => sum + Number(p.netSalary || 0),
    0
  );

  const currentPayrolls = payrolls.filter(
    p => p.month === payrollMonth
  );

  const countryEmployees = employees.filter(
    e => e.country === selectedCountry
  );

  const attendanceForMonth = useMemo(
    () => attendance.filter(a => a.date?.slice(0, 7) === payrollMonth),
    [attendance, payrollMonth]
  );

  const updateEmployeeField = (field, value) => {
    setEmployeeForm(prev => ({ ...prev, [field]: value }));
  };

  const showMessage = text => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 3000);
  };

  // ---------------- ACCOUNTING ----------------

  const addLedger = e => {
    e.preventDefault();

    if (!newLedgerName.trim()) {
      showMessage('Please enter ledger name.');
      return;
    }

    if (ledgers.some(l =>
      l.name.toLowerCase() === newLedgerName.trim().toLowerCase()
    )) {
      showMessage('Ledger already exists.');
      return;
    }

    setLedgers(prev => [
      ...prev,
      {
        id: Date.now(),
        name: newLedgerName.trim(),
        group: newLedgerGroup,
        openingBalance: 0
      }
    ]);

    setNewLedgerName('');
    showMessage('Ledger created successfully.');
  };

  const addVoucher = e => {
    e.preventDefault();

    const amount = Number(voucherForm.amount);

    if (!voucherForm.party || !amount || amount <= 0) {
      showMessage('Select party and enter a valid amount.');
      return;
    }

    const gst = ['Sales', 'Purchase'].includes(voucherForm.type)
      ? amount * Number(voucherForm.gstRate) / 100
      : 0;

    const voucher = {
      id: Date.now(),
      ...voucherForm,
      amount,
      gst,
      total: amount + gst,
      createdAt: new Date().toISOString()
    };

    setVouchers(prev => [voucher, ...prev]);
    setVoucherForm(initialVoucher);
    showMessage('Voucher saved successfully.');
  };

  // ---------------- EMPLOYEE MANAGEMENT ----------------

  const saveEmployee = e => {
    e.preventDefault();

    if (!employeeForm.name.trim() || !employeeForm.employeeCode.trim()) {
      showMessage('Employee name and employee code are required.');
      return;
    }

    if (
      employees.some(emp =>
        emp.employeeCode.toLowerCase() ===
          employeeForm.employeeCode.trim().toLowerCase() &&
        emp.id !== editingEmployeeId
      )
    ) {
      showMessage('Employee code already exists.');
      return;
    }

    const employee = {
      ...employeeForm,
      id: editingEmployeeId || Date.now(),
      salary: Number(employeeForm.salary || 0),
      hra: Number(employeeForm.hra || 0),
      da: Number(employeeForm.da || 0),
      allowance: Number(employeeForm.allowance || 0),
      bonus: Number(employeeForm.bonus || 0),
      deduction: Number(employeeForm.deduction || 0),
      workingDays: Number(employeeForm.workingDays || 26),
      overtimeRate: Number(employeeForm.overtimeRate || 0)
    };

    if (editingEmployeeId) {
      setEmployees(prev =>
        prev.map(emp => emp.id === editingEmployeeId ? employee : emp)
      );
      showMessage('Employee updated.');
    } else {
      setEmployees(prev => [...prev, employee]);
      showMessage('Employee added.');
    }

    setEmployeeForm(initialEmployee);
    setEditingEmployeeId(null);
  };

  const editEmployee = employee => {
    setEmployeeForm({
      ...initialEmployee,
      ...employee,
      salary: String(employee.salary ?? 0),
      hra: String(employee.hra ?? 0),
      da: String(employee.da ?? 0),
      allowance: String(employee.allowance ?? 0),
      bonus: String(employee.bonus ?? 0),
      deduction: String(employee.deduction ?? 0),
      workingDays: String(employee.workingDays ?? 26),
      overtimeRate: String(employee.overtimeRate ?? 0)
    });
    setEditingEmployeeId(employee.id);
    setActiveView('employees');
  };

  const deleteEmployee = id => {
    if (!window.confirm('Delete this employee?')) return;
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    showMessage('Employee deleted.');
  };

  // ---------------- ATTENDANCE ----------------

  const saveAttendance = e => {
    e.preventDefault();

    if (!attendanceForm.employeeId) {
      showMessage('Please select an employee.');
      return;
    }

    const record = {
      ...attendanceForm,
      id: Date.now(),
      overtimeHours: Number(attendanceForm.overtimeHours || 0)
    };

    setAttendance(prev => [
      record,
      ...prev.filter(a =>
        !(a.employeeId === record.employeeId && a.date === record.date)
      )
    ]);

    showMessage('Attendance saved.');
  };

  // ---------------- LEAVE MANAGEMENT ----------------

  const saveLeave = e => {
    e.preventDefault();

    if (!leaveForm.employeeId || !leaveForm.fromDate || !leaveForm.toDate) {
      showMessage('Complete all leave details.');
      return;
    }

    setLeaveRecords(prev => [
      { ...leaveForm, id: Date.now(), days: Number(leaveForm.days || 1) },
      ...prev
    ]);

    setLeaveForm({
      employeeId: '',
      fromDate: '',
      toDate: '',
      type: 'Casual Leave',
      days: '1',
      status: 'Pending'
    });

    showMessage('Leave request saved.');
  };

  const updateLeaveStatus = (id, status) => {
    setLeaveRecords(prev =>
      prev.map(record =>
        record.id === id ? { ...record, status } : record
      )
    );
  };

  // ---------------- PAYROLL CALCULATION ----------------

  const calculateEmployeePayroll = employee => {
    const monthAttendance = attendanceForMonth.filter(
      a => a.employeeId === String(employee.id) ||
           a.employeeId === employee.id
    );

    const presentDays = monthAttendance.filter(
      a => a.status === 'Present'
    ).length;

    const halfDays = monthAttendance.filter(
      a => a.status === 'Half Day'
    ).length;

    const approvedLeaves = leaveRecords
      .filter(l =>
        (l.employeeId === String(employee.id) ||
         l.employeeId === employee.id) &&
        l.status === 'Approved' &&
        l.fromDate?.slice(0, 7) === payrollMonth
      )
      .reduce((sum, l) => sum + Number(l.days || 0), 0);

    const workingDays = Math.max(1, Number(employee.workingDays || 26));
    const recordedDays = presentDays + halfDays * 0.5 + approvedLeaves;
    const hasAttendance = monthAttendance.length > 0;
    const paidDays = hasAttendance
      ? Math.min(workingDays, recordedDays)
      : workingDays;

    const attendanceFactor = paidDays / workingDays;

    const basic = Number(employee.salary || 0) * attendanceFactor;
    const hra = Number(employee.hra || 0) * attendanceFactor;
    const da = Number(employee.da || 0) * attendanceFactor;
    const allowance = Number(employee.allowance || 0) * attendanceFactor;
    const bonus = Number(employee.bonus || 0);

    const overtimeHours = monthAttendance.reduce(
      (sum, a) => sum + Number(a.overtimeHours || 0),
      0
    );

    const overtime = overtimeHours * Number(employee.overtimeRate || 0);

    const grossSalary =
      basic + hra + da + allowance + bonus + overtime;

    const deductions = Number(employee.deduction || 0);
    const netSalary = Math.max(0, grossSalary - deductions);

    return {
      employeeId: employee.id,
      employeeName: employee.name,
      employeeCode: employee.employeeCode,
      country: employee.country,
      currency: COUNTRY_CONFIG[employee.country]?.currency || 'INR',
      symbol: COUNTRY_CONFIG[employee.country]?.symbol || '₹',
      month: payrollMonth,
      workingDays,
      presentDays,
      halfDays,
      approvedLeaves,
      paidDays,
      overtimeHours,
      basic,
      hra,
      da,
      allowance,
      bonus,
      overtime,
      grossSalary,
      deductions,
      netSalary
    };
  };

  const processPayroll = employee => {
    const existing = payrolls.find(
      p => p.employeeId === employee.id && p.month === payrollMonth
    );

    if (existing) {
      showMessage('Payroll already exists for this employee and month.');
      return;
    }

    const result = calculateEmployeePayroll(employee);

    setPayrolls(prev => [
      {
        ...result,
        id: Date.now(),
        status: 'Processed',
        processedAt: new Date().toISOString()
      },
      ...prev
    ]);

    showMessage(`Payroll processed for ${employee.name}.`);
  };

  const processAllPayroll = () => {
    const pendingEmployees = employees.filter(
      emp => !payrolls.some(
        p => p.employeeId === emp.id && p.month === payrollMonth
      )
    );

    if (!pendingEmployees.length) {
      showMessage('No pending employees for this month.');
      return;
    }

    const newPayrolls = pendingEmployees.map((employee, index) => ({
      ...calculateEmployeePayroll(employee),
      id: Date.now() + index,
      status: 'Processed',
      processedAt: new Date().toISOString()
    }));

    setPayrolls(prev => [...newPayrolls, ...prev]);
    showMessage(`${newPayrolls.length} payroll records processed.`);
  };

  const paySalary = payroll => {
    if (payroll.status === 'Paid') {
      showMessage('Salary is already marked as paid.');
      return;
    }

    const salaryVoucher = {
      id: Date.now(),
      type: 'Payment',
      party: payroll.employeeName,
      amount: payroll.netSalary,
      gst: 0,
      total: payroll.netSalary,
      narration: `Salary payment for ${payroll.month} - ${payroll.employeeCode}`,
      date: new Date().toISOString().slice(0, 10),
      currency: payroll.currency,
      country: payroll.country,
      source: 'Payroll'
    };

    setVouchers(prev => [salaryVoucher, ...prev]);

    setPayrolls(prev =>
      prev.map(p =>
        p.id === payroll.id
          ? { ...p, status: 'Paid', paidAt: new Date().toISOString() }
          : p
      )
    );

    showMessage('Salary marked as paid and payment voucher created.');
  };

  const addPayHead = e => {
    e.preventDefault();

    if (!newPayHead.name.trim()) {
      showMessage('Enter pay head name.');
      return;
    }

    setPayHeads(prev => [
      ...prev,
      { ...newPayHead, id: Date.now(), name: newPayHead.name.trim() }
    ]);

    setNewPayHead({ name: '', type: 'Earning' });
    showMessage('Pay head added.');
  };

  const deletePayHead = id => {
    setPayHeads(prev => prev.filter(head => head.id !== id));
  };

  // ---------------- UI HELPERS ----------------

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'vouchers', label: 'Vouchers', icon: '🧾' },
    { id: 'ledgers', label: 'Ledgers', icon: '📚' },
    { id: 'daybook', label: 'Day Book', icon: '📅' },
    { id: 'employees', label: 'Employees', icon: '👥' },
    { id: 'attendance', label: 'Attendance', icon: '🕒' },
    { id: 'leaves', label: 'Leave Management', icon: '🌴' },
    { id: 'payheads', label: 'Pay Heads', icon: '⚙️' },
    { id: 'payroll', label: 'Payroll Processing', icon: '💰' },
    { id: 'payrollreports', label: 'Payroll Reports', icon: '📈' }
  ];

  const cardStyle = {
    ...styles.panel,
    flex: '1 1 180px',
    minWidth: '150px'
  };

  const renderTable = (headers, rows) => (
    <div style={{ overflowX: 'auto' }}>
      <table style={styles.table}>
        <thead>
          <tr>
            {headers.map(header => (
              <th style={styles.th} key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={{
        ...styles.panel,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '25px', color: '#f8fafc' }}>
            Tally ERP / Prime
          </h1>
          <p style={{ color: '#94a3b8', margin: '7px 0 0' }}>
            Accounting • Inventory-ready • Global Payroll Management
          </p>
        </div>

        <div style={{
          background: '#172554',
          color: '#bfdbfe',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '12px'
        }}>
          INDIA + INTERNATIONAL PAYROLL
        </div>
      </div>

      {message && (
        <div style={{
          background: '#164e63',
          border: '1px solid #0891b2',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '14px'
        }}>
          {message}
        </div>
      )}

      <div style={{
        display: 'flex',
        gap: '7px',
        flexWrap: 'wrap',
        marginBottom: '18px'
      }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            style={{
              ...styles.secondary,
              background: activeView === item.id ? '#2563eb' : '#1e293b',
              borderColor: activeView === item.id ? '#60a5fa' : '#475569'
            }}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD */}
      {activeView === 'dashboard' && (
        <>
          <h2>Business Dashboard</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <div style={cardStyle}>
              <div style={{ color: '#94a3b8' }}>Total Ledgers</div>
              <h2>{ledgers.length}</h2>
            </div>
            <div style={cardStyle}>
              <div style={{ color: '#94a3b8' }}>Total Vouchers</div>
              <h2>{vouchers.length}</h2>
            </div>
            <div style={cardStyle}>
              <div style={{ color: '#94a3b8' }}>Sales</div>
              <h2 style={{ color: '#4ade80' }}>{money(totalSales)}</h2>
            </div>
            <div style={cardStyle}>
              <div style={{ color: '#94a3b8' }}>Purchases</div>
              <h2 style={{ color: '#fbbf24' }}>{money(totalPurchase)}</h2>
            </div>
            <div style={cardStyle}>
              <div style={{ color: '#94a3b8' }}>Employees</div>
              <h2>{employees.length}</h2>
            </div>
            <div style={cardStyle}>
              <div style={{ color: '#94a3b8' }}>Payroll Processed</div>
              <h2>{payrolls.length}</h2>
            </div>
            <div style={cardStyle}>
              <div style={{ color: '#94a3b8' }}>Total Net Payroll</div>
              <h2>{money(totalSalary)}</h2>
            </div>
          </div>

          <div style={styles.panel}>
            <h3>Quick Actions</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
              {[
                ['Create Voucher', 'vouchers'],
                ['Create Ledger', 'ledgers'],
                ['Add Employee', 'employees'],
                ['Mark Attendance', 'attendance'],
                ['Process Payroll', 'payroll'],
                ['Payroll Reports', 'payrollreports']
              ].map(([label, view]) => (
                <button
                  key={view}
                  style={styles.button}
                  onClick={() => setActiveView(view)}
                >
                  + {label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* VOUCHERS */}
      {activeView === 'vouchers' && (
        <>
          <h2>Voucher Entry</h2>

          <form onSubmit={addVoucher} style={styles.panel}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: '14px'
            }}>
              <Select
                label="Voucher Type"
                value={voucherForm.type}
                onChange={value =>
                  setVoucherForm(prev => ({ ...prev, type: value }))
                }
                options={['Sales', 'Purchase', 'Receipt', 'Payment'].map(x => ({
                  value: x, label: x
                }))}
              />

              <Select
                label="Party / Ledger"
                value={voucherForm.party}
                onChange={value =>
                  setVoucherForm(prev => ({ ...prev, party: value }))
                }
                options={[
                  { value: '', label: 'Select Ledger' },
                  ...ledgers.map(l => ({ value: l.name, label: l.name }))
                ]}
              />

              <Input
                label="Date"
                type="date"
                value={voucherForm.date}
                onChange={value =>
                  setVoucherForm(prev => ({ ...prev, date: value }))
                }
              />

              <Input
                label="Amount"
                type="number"
                value={voucherForm.amount}
                onChange={value =>
                  setVoucherForm(prev => ({ ...prev, amount: value }))
                }
              />

              {['Sales', 'Purchase'].includes(voucherForm.type) && (
                <Select
                  label="GST Rate"
                  value={voucherForm.gstRate}
                  onChange={value =>
                    setVoucherForm(prev => ({ ...prev, gstRate: value }))
                  }
                  options={[0, 5, 12, 18, 28].map(x => ({
                    value: String(x), label: `${x}%`
                  }))}
                />
              )}

              <Input
                label="Narration"
                value={voucherForm.narration}
                onChange={value =>
                  setVoucherForm(prev => ({ ...prev, narration: value }))
                }
              />
            </div>

            <button style={{ ...styles.button, marginTop: '16px' }}>
              Save Voucher
            </button>
          </form>

          <div style={styles.panel}>
            <h3>Voucher Register</h3>
            {renderTable(
              ['Date', 'Type', 'Party', 'Amount', 'GST', 'Total'],
              vouchers.map(v => (
                <tr key={v.id}>
                  <td style={styles.td}>{v.date}</td>
                  <td style={styles.td}>{v.type}</td>
                  <td style={styles.td}>{v.party}</td>
                  <td style={styles.td}>{money(v.amount, v.currency === 'USD' ? '$' : '₹')}</td>
                  <td style={styles.td}>{money(v.gst || 0)}</td>
                  <td style={styles.td}>{money(v.total || v.amount)}</td>
                </tr>
              ))
            )}
            {!vouchers.length && <p style={{ color: '#94a3b8' }}>No vouchers found.</p>}
          </div>
        </>
      )}

      {/* LEDGERS */}
      {activeView === 'ledgers' && (
        <>
          <h2>Ledger Management</h2>

          <form onSubmit={addLedger} style={styles.panel}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: '12px'
            }}>
              <Input
                label="Ledger Name"
                value={newLedgerName}
                onChange={setNewLedgerName}
              />
              <Select
                label="Ledger Group"
                value={newLedgerGroup}
                onChange={setNewLedgerGroup}
                options={[
                  'Capital Account',
                  'Current Assets',
                  'Current Liabilities',
                  'Bank Accounts',
                  'Cash-in-Hand',
                  'Sundry Debtors',
                  'Sundry Creditors',
                  'Direct Expenses',
                  'Indirect Expenses',
                  'Direct Incomes',
                  'Indirect Incomes',
                  'Fixed Assets'
                ].map(x => ({ value: x, label: x }))}
              />
            </div>
            <button style={{ ...styles.button, marginTop: '14px' }}>
              Create Ledger
            </button>
          </form>

          <div style={styles.panel}>
            {renderTable(
              ['Ledger Name', 'Group', 'Opening Balance'],
              ledgers.map(l => (
                <tr key={l.id}>
                  <td style={styles.td}>{l.name}</td>
                  <td style={styles.td}>{l.group}</td>
                  <td style={styles.td}>{money(l.openingBalance)}</td>
                </tr>
              ))
            )}
          </div>
        </>
      )}

      {/* DAY BOOK */}
      {activeView === 'daybook' && (
        <>
          <h2>Day Book</h2>
          <div style={styles.panel}>
            {renderTable(
              ['Date', 'Voucher Type', 'Party', 'Narration', 'Amount'],
              vouchers.map(v => (
                <tr key={v.id}>
                  <td style={styles.td}>{v.date}</td>
                  <td style={styles.td}>{v.type}</td>
                  <td style={styles.td}>{v.party}</td>
                  <td style={styles.td}>{v.narration || '-'}</td>
                  <td style={styles.td}>{money(v.total || v.amount)}</td>
                </tr>
              ))
            )}
            {!vouchers.length && <p>No transactions recorded.</p>}
          </div>
        </>
      )}

      {/* EMPLOYEES */}
      {activeView === 'employees' && (
        <>
          <h2>Employee Management</h2>

          <form onSubmit={saveEmployee} style={styles.panel}>
            <h3>{editingEmployeeId ? 'Edit Employee' : 'Add New Employee'}</h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))',
              gap: '13px'
            }}>
              <Input label="Employee Name *" value={employeeForm.name}
                onChange={v => updateEmployeeField('name', v)} />
              <Input label="Employee Code *" value={employeeForm.employeeCode}
                onChange={v => updateEmployeeField('employeeCode', v)} />
              <Input label="Email" type="email" value={employeeForm.email}
                onChange={v => updateEmployeeField('email', v)} />
              <Input label="Phone" value={employeeForm.phone}
                onChange={v => updateEmployeeField('phone', v)} />

              <Select label="Country" value={employeeForm.country}
                onChange={v => updateEmployeeField('country', v)}
                options={Object.keys(COUNTRY_CONFIG).map(x => ({
                  value: x, label: `${x} (${COUNTRY_CONFIG[x].currency})`
                }))} />

              <Input label="State / Province / Region" value={employeeForm.state}
                onChange={v => updateEmployeeField('state', v)} />
              <Input label="Department" value={employeeForm.department}
                onChange={v => updateEmployeeField('department', v)} />
              <Input label="Designation" value={employeeForm.designation}
                onChange={v => updateEmployeeField('designation', v)} />
              <Input label="Joining Date" type="date" value={employeeForm.joiningDate}
                onChange={v => updateEmployeeField('joiningDate', v)} />
              <Input label="Bank Name" value={employeeForm.bankName}
                onChange={v => updateEmployeeField('bankName', v)} />
              <Input label="Bank Account / IBAN" value={employeeForm.accountNumber}
                onChange={v => updateEmployeeField('accountNumber', v)} />
              <Input label="Tax ID / PAN / SSN / NI Number" value={employeeForm.taxId}
                onChange={v => updateEmployeeField('taxId', v)} />
            </div>

            <h3 style={{ marginTop: '22px' }}>Salary Structure</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
              gap: '13px'
            }}>
              <Input label="Basic Salary" type="number" value={employeeForm.salary}
                onChange={v => updateEmployeeField('salary', v)} />
              <Input label="HRA" type="number" value={employeeForm.hra}
                onChange={v => updateEmployeeField('hra', v)} />
              <Input label="DA" type="number" value={employeeForm.da}
                onChange={v => updateEmployeeField('da', v)} />
              <Input label="Other Allowance" type="number" value={employeeForm.allowance}
                onChange={v => updateEmployeeField('allowance', v)} />
              <Input label="Bonus" type="number" value={employeeForm.bonus}
                onChange={v => updateEmployeeField('bonus', v)} />
              <Input label="Monthly Deduction" type="number" value={employeeForm.deduction}
                onChange={v => updateEmployeeField('deduction', v)} />
              <Input label="Working Days Per Month" type="number" value={employeeForm.workingDays}
                onChange={v => updateEmployeeField('workingDays', v)} />
              <Input label="Overtime Rate / Hour" type="number" value={employeeForm.overtimeRate}
                onChange={v => updateEmployeeField('overtimeRate', v)} />
            </div>

            <div style={{ display: 'flex', gap: '9px', marginTop: '16px', flexWrap: 'wrap' }}>
              <button style={styles.button}>
                {editingEmployeeId ? 'Update Employee' : 'Save Employee'}
              </button>
              {editingEmployeeId && (
                <button
                  type="button"
                  style={styles.secondary}
                  onClick={() => {
                    setEditingEmployeeId(null);
                    setEmployeeForm(initialEmployee);
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div style={styles.panel}>
            <h3>Employee List ({employees.length})</h3>
            {renderTable(
              ['Code', 'Name', 'Country', 'Department', 'Designation', 'Basic Salary', 'Actions'],
              employees.map(emp => (
                <tr key={emp.id}>
                  <td style={styles.td}>{emp.employeeCode}</td>
                  <td style={styles.td}>{emp.name}</td>
                  <td style={styles.td}>{emp.country}</td>
                  <td style={styles.td}>{emp.department || '-'}</td>
                  <td style={styles.td}>{emp.designation || '-'}</td>
                  <td style={styles.td}>
                    {money(emp.salary, COUNTRY_CONFIG[emp.country]?.symbol)}
                  </td>
                  <td style={styles.td}>
                    <button style={styles.secondary} onClick={() => editEmployee(emp)}>Edit</button>{' '}
                    <button
                      style={{ ...styles.secondary, color: '#fca5a5' }}
                      onClick={() => deleteEmployee(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
            {!employees.length && <p style={{ color: '#94a3b8' }}>No employees added yet.</p>}
          </div>
        </>
      )}

      {/* ATTENDANCE */}
      {activeView === 'attendance' && (
        <>
          <h2>Attendance Management</h2>

          <form onSubmit={saveAttendance} style={styles.panel}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
              gap: '12px'
            }}>
              <Select label="Employee" value={attendanceForm.employeeId}
                onChange={v => setAttendanceForm(p => ({ ...p, employeeId: v }))}
                options={[
                  { value: '', label: 'Select Employee' },
                  ...employees.map(e => ({
                    value: String(e.id), label: `${e.employeeCode} - ${e.name}`
                  }))
                ]} />
              <Input label="Date" type="date" value={attendanceForm.date}
                onChange={v => setAttendanceForm(p => ({ ...p, date: v }))} />
              <Select label="Attendance Status" value={attendanceForm.status}
                onChange={v => setAttendanceForm(p => ({ ...p, status: v }))}
                options={['Present', 'Absent', 'Half Day', 'Weekly Off', 'Holiday', 'Leave'].map(x => ({
                  value: x, label: x
                }))} />
              <Input label="Overtime Hours" type="number" value={attendanceForm.overtimeHours}
                onChange={v => setAttendanceForm(p => ({ ...p, overtimeHours: v }))} />
            </div>
            <button style={{ ...styles.button, marginTop: '14px' }}>
              Save Attendance
            </button>
          </form>

          <div style={styles.panel}>
            <h3>Attendance Register</h3>
            {renderTable(
              ['Date', 'Employee', 'Status', 'Overtime Hours'],
              attendance.map(a => (
                <tr key={a.id}>
                  <td style={styles.td}>{a.date}</td>
                  <td style={styles.td}>
                    {employees.find(e => String(e.id) === String(a.employeeId))?.name || 'Employee'}
                  </td>
                  <td style={styles.td}>{a.status}</td>
                  <td style={styles.td}>{a.overtimeHours}</td>
                </tr>
              ))
            )}
            {!attendance.length && <p>No attendance records.</p>}
          </div>
        </>
      )}

      {/* LEAVE */}
      {activeView === 'leaves' && (
        <>
          <h2>Leave Management</h2>

          <form onSubmit={saveLeave} style={styles.panel}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
              gap: '12px'
            }}>
              <Select label="Employee" value={leaveForm.employeeId}
                onChange={v => setLeaveForm(p => ({ ...p, employeeId: v }))}
                options={[
                  { value: '', label: 'Select Employee' },
                  ...employees.map(e => ({
                    value: String(e.id), label: e.name
                  }))
                ]} />
              <Select label="Leave Type" value={leaveForm.type}
                onChange={v => setLeaveForm(p => ({ ...p, type: v }))}
                options={['Casual Leave', 'Sick Leave', 'Earned Leave', 'Unpaid Leave', 'Other'].map(x => ({
                  value: x, label: x
                }))} />
              <Input label="From Date" type="date" value={leaveForm.fromDate}
                onChange={v => setLeaveForm(p => ({ ...p, fromDate: v }))} />
              <Input label="To Date" type="date" value={leaveForm.toDate}
                onChange={v => setLeaveForm(p => ({ ...p, toDate: v }))} />
              <Input label="Number of Days" type="number" value={leaveForm.days}
                onChange={v => setLeaveForm(p => ({ ...p, days: v }))} />
            </div>
            <button style={{ ...styles.button, marginTop: '14px' }}>Submit Leave</button>
          </form>

          <div style={styles.panel}>
            <h3>Leave Register</h3>
            {renderTable(
              ['Employee', 'Type', 'From', 'To', 'Days', 'Status', 'Action'],
              leaveRecords.map(l => (
                <tr key={l.id}>
                  <td style={styles.td}>
                    {employees.find(e => String(e.id) === String(l.employeeId))?.name || 'Employee'}
                  </td>
                  <td style={styles.td}>{l.type}</td>
                  <td style={styles.td}>{l.fromDate}</td>
                  <td style={styles.td}>{l.toDate}</td>
                  <td style={styles.td}>{l.days}</td>
                  <td style={styles.td}>{l.status}</td>
                  <td style={styles.td}>
                    <select
                      style={{ ...styles.input, minWidth: '110px' }}
                      value={l.status}
                      onChange={e => updateLeaveStatus(l.id, e.target.value)}
                    >
                      {['Pending', 'Approved', 'Rejected'].map(x => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
            {!leaveRecords.length && <p>No leave records.</p>}
          </div>
        </>
      )}

      {/* PAY HEADS */}
      {activeView === 'payheads' && (
        <>
          <h2>Pay Heads & Salary Components</h2>

          <form onSubmit={addPayHead} style={styles.panel}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: '12px'
            }}>
              <Input label="Pay Head Name" value={newPayHead.name}
                onChange={v => setNewPayHead(p => ({ ...p, name: v }))} />
              <Select label="Pay Head Type" value={newPayHead.type}
                onChange={v => setNewPayHead(p => ({ ...p, type: v }))}
                options={[
                  { value: 'Earning', label: 'Earning' },
                  { value: 'Deduction', label: 'Deduction' }
                ]} />
            </div>
            <button style={{ ...styles.button, marginTop: '14px' }}>Add Pay Head</button>
          </form>

          <div style={styles.panel}>
            {renderTable(
              ['Pay Head', 'Type', 'Action'],
              payHeads.map(head => (
                <tr key={head.id}>
                  <td style={styles.td}>{head.name}</td>
                  <td style={styles.td}>{head.type}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.secondary}
                      onClick={() => deletePayHead(head.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </div>
        </>
      )}

      {/* PAYROLL PROCESSING */}
      {activeView === 'payroll' && (
        <>
          <h2>Payroll Processing</h2>

          <div style={styles.panel}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: '12px',
              alignItems: 'end'
            }}>
              <Input label="Payroll Month" type="month" value={payrollMonth}
                onChange={setPayrollMonth} />
              <Select label="Country Filter" value={selectedCountry}
                onChange={setSelectedCountry}
                options={Object.keys(COUNTRY_CONFIG).map(x => ({
                  value: x,
                  label: `${x} - ${COUNTRY_CONFIG[x].currency}`
                }))} />
              <div>
                <button style={styles.button} onClick={processAllPayroll}>
                  Process All Pending Payroll
                </button>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '12px' }}>
              Attendance available for the selected month is used in the salary calculation.
              If no attendance is entered for an employee, configured working days are assumed.
            </p>
          </div>

          <div style={styles.panel}>
            <h3>{selectedCountry} Employees</h3>
            {renderTable(
              ['Employee', 'Basic', 'Working Days', 'Gross', 'Deduction', 'Net Salary', 'Action'],
              countryEmployees.map(emp => {
                const result = calculateEmployeePayroll(emp);
                const alreadyProcessed = payrolls.some(
                  p => p.employeeId === emp.id && p.month === payrollMonth
                );

                return (
                  <tr key={emp.id}>
                    <td style={styles.td}>{emp.name}<br /><small>{emp.employeeCode}</small></td>
                    <td style={styles.td}>{money(emp.salary, result.symbol)}</td>
                    <td style={styles.td}>{result.paidDays} / {result.workingDays}</td>
                    <td style={styles.td}>{money(result.grossSalary, result.symbol)}</td>
                    <td style={styles.td}>{money(result.deductions, result.symbol)}</td>
                    <td style={styles.td}>{money(result.netSalary, result.symbol)}</td>
                    <td style={styles.td}>
                      <button
                        disabled={alreadyProcessed}
                        style={{
                          ...styles.button,
                          opacity: alreadyProcessed ? 0.5 : 1,
                          cursor: alreadyProcessed ? 'not-allowed' : 'pointer'
                        }}
                        onClick={() => processPayroll(emp)}
                      >
                        {alreadyProcessed ? 'Processed' : 'Process'}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
            {!countryEmployees.length && (
              <p style={{ color: '#94a3b8' }}>No employees in this country. Add employees first.</p>
            )}
          </div>

          <div style={styles.panel}>
            <h3>Processed Payroll - {payrollMonth}</h3>
            {renderTable(
              ['Employee', 'Country', 'Gross', 'Deductions', 'Net Salary', 'Status', 'Action'],
              currentPayrolls.map(p => (
                <tr key={p.id}>
                  <td style={styles.td}>{p.employeeName}</td>
                  <td style={styles.td}>{p.country}</td>
                  <td style={styles.td}>{money(p.grossSalary, p.symbol)}</td>
                  <td style={styles.td}>{money(p.deductions, p.symbol)}</td>
                  <td style={styles.td}>{money(p.netSalary, p.symbol)}</td>
                  <td style={styles.td}>{p.status}</td>
                  <td style={styles.td}>
                    {p.status !== 'Paid' ? (
                      <button style={styles.button} onClick={() => paySalary(p)}>
                        Mark Paid
                      </button>
                    ) : 'Paid'}
                  </td>
                </tr>
              ))
            )}
            {!currentPayrolls.length && <p>No payroll processed for this month.</p>}
          </div>
        </>
      )}

      {/* PAYROLL REPORTS */}
      {activeView === 'payrollreports' && (
        <>
          <h2>Payroll Reports</h2>

          <div style={styles.panel}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: '12px'
            }}>
              <Input label="Report Month" type="month" value={payrollMonth}
                onChange={setPayrollMonth} />
              <Select label="Country" value={selectedCountry}
                onChange={setSelectedCountry}
                options={Object.keys(COUNTRY_CONFIG).map(x => ({
                  value: x, label: x
                }))} />
            </div>
          </div>

          <div style={styles.panel}>
            <h3>Salary Register - {payrollMonth}</h3>
            {renderTable(
              ['Employee', 'Code', 'Country', 'Paid Days', 'Basic', 'HRA', 'DA', 'Allowance', 'Bonus', 'Overtime', 'Gross', 'Deduction', 'Net', 'Status'],
              payrolls
                .filter(p => p.month === payrollMonth && p.country === selectedCountry)
                .map(p => (
                  <tr key={p.id}>
                    <td style={styles.td}>{p.employeeName}</td>
                    <td style={styles.td}>{p.employeeCode}</td>
                    <td style={styles.td}>{p.country}</td>
                    <td style={styles.td}>{p.paidDays}/{p.workingDays}</td>
                    <td style={styles.td}>{money(p.basic, p.symbol)}</td>
                    <td style={styles.td}>{money(p.hra, p.symbol)}</td>
                    <td style={styles.td}>{money(p.da, p.symbol)}</td>
                    <td style={styles.td}>{money(p.allowance, p.symbol)}</td>
                    <td style={styles.td}>{money(p.bonus, p.symbol)}</td>
                    <td style={styles.td}>{money(p.overtime, p.symbol)}</td>
                    <td style={styles.td}>{money(p.grossSalary, p.symbol)}</td>
                    <td style={styles.td}>{money(p.deductions, p.symbol)}</td>
                    <td style={styles.td}>{money(p.netSalary, p.symbol)}</td>
                    <td style={styles.td}>{p.status}</td>
                  </tr>
                ))
            )}
          </div>

          <div style={styles.panel}>
            <h3>Payroll Summary</h3>
            {(() => {
              const records = payrolls.filter(
                p => p.month === payrollMonth && p.country === selectedCountry
              );
              const symbol = COUNTRY_CONFIG[selectedCountry]?.symbol || '₹';
              const gross = records.reduce((sum, p) => sum + p.grossSalary, 0);
              const deductions = records.reduce((sum, p) => sum + p.deductions, 0);
              const net = records.reduce((sum, p) => sum + p.netSalary, 0);

              return (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={cardStyle}>
                    <div>Employees</div>
                    <h2>{records.length}</h2>
                  </div>
                  <div style={cardStyle}>
                    <div>Gross Salary</div>
                    <h2>{money(gross, symbol)}</h2>
                  </div>
                  <div style={cardStyle}>
                    <div>Total Deductions</div>
                    <h2>{money(deductions, symbol)}</h2>
                  </div>
                  <div style={cardStyle}>
                    <div>Net Salary</div>
                    <h2>{money(net, symbol)}</h2>
                  </div>
                </div>
              );
            })()}
          </div>

          <div style={styles.panel}>
            <h3>Attendance Summary - {payrollMonth}</h3>
            {renderTable(
              ['Employee', 'Present', 'Absent', 'Half Day', 'Overtime'],
              employees
                .filter(e => e.country === selectedCountry)
                .map(emp => {
                  const records = attendanceForMonth.filter(
                    a => String(a.employeeId) === String(emp.id)
                  );
                  return (
                    <tr key={emp.id}>
                      <td style={styles.td}>{emp.name}</td>
                      <td style={styles.td}>{records.filter(a => a.status === 'Present').length}</td>
                      <td style={styles.td}>{records.filter(a => a.status === 'Absent').length}</td>
                      <td style={styles.td}>{records.filter(a => a.status === 'Half Day').length}</td>
                      <td style={styles.td}>
                        {records.reduce((sum, a) => sum + Number(a.overtimeHours || 0), 0)}
                      </td>
                    </tr>
                  );
                })
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Tally;
