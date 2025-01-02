'use client'
import React, { useEffect, useState } from 'react'

// Define the structure of a financial record
interface FinancialRecord {
  id: number
  projectName: string
  budget: number
  receivedAmount: number
  pendingAmount: number
  expenses: number
  profitOrLoss: string
}

// Dummy data for the table
const dummyData: FinancialRecord[] = [
  {
    id: 1,
    projectName: 'Alpha Build',
    budget: 50000,
    receivedAmount: 20000,
    pendingAmount: 30000,
    expenses: 10000,
    profitOrLoss: '10,000 (Profit)'
  },
  {
    id: 2,
    projectName: 'Beta Release',
    budget: 30000,
    receivedAmount: 30000,
    pendingAmount: 0,
    expenses: 15000,
    profitOrLoss: '15,000 (Profit)'
  },
  {
    id: 3,
    projectName: 'Gamma Design',
    budget: 40000,
    receivedAmount: 10000,
    pendingAmount: 30000,
    expenses: 20000,
    profitOrLoss: '-10,000 (Loss)'
  }
]

const FinancialModulePage: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialRecord[]>([])

  useEffect(() => {
    // Fetch financial data from an API (replace with your API endpoint)
    // For demo purposes, we'll use the dummy data
    setFinancialData(dummyData)
  }, [])

  const handleViewDetails = (id: number) => {
    console.log(`View details for project ID: ${id}`)

    // Navigate to a detailed page or show a modal
  }

  const handleUpdateRecord = (id: number) => {
    console.log(`Update financial record for project ID: ${id}`)

    // Show a form/modal to update the record
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Financial Management Module</h1>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 px-4 py-2'>ID</th>
              <th className='border border-gray-300 px-4 py-2'>Project Name</th>
              <th className='border border-gray-300 px-4 py-2'>Budget</th>
              <th className='border border-gray-300 px-4 py-2'>Received Amount</th>
              <th className='border border-gray-300 px-4 py-2'>Pending Amount</th>
              <th className='border border-gray-300 px-4 py-2'>Expenses</th>
              <th className='border border-gray-300 px-4 py-2'>Profit/Loss</th>
              <th className='border border-gray-300 px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {financialData.map(record => (
              <tr key={record.id} className='hover:bg-gray-50'>
                <td className='border border-gray-300 px-4 py-2 text-center'>{record.id}</td>
                <td className='border border-gray-300 px-4 py-2'>{record.projectName}</td>
                <td className='border border-gray-300 px-4 py-2 text-right'>${record.budget.toLocaleString()}</td>
                <td className='border border-gray-300 px-4 py-2 text-right'>
                  ${record.receivedAmount.toLocaleString()}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-right'>
                  ${record.pendingAmount.toLocaleString()}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-right'>${record.expenses.toLocaleString()}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 text-right ${
                    record.profitOrLoss.includes('Loss') ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {record.profitOrLoss}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'
                    onClick={() => handleViewDetails(record.id)}
                  >
                    View
                  </button>
                  <button
                    className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
                    onClick={() => handleUpdateRecord(record.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FinancialModulePage
